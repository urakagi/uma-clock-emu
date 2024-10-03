<script>
import RaceGraph from "@/components/RaceGraph";
import MixinCourseData from "@/components/data/MixinCourseData";
import MixinConstants from "@/components/data/MixinConstants";
import MixinSkills from "@/components/data/MixinSkills";
import MixinPositionKeeping from "@/components/MixinPositionKeeping.vue";
import { STYLE } from "./data/constants";
import * as RCP from "./data/release_conserve_power_constants";
import MixinKua from "@/components/MixinKua.vue";
const UMA_OBJ_VERSION = 2;

// let timer = 0;
// function pf(memo) {
//   console.log(memo, `${Date.now() - timer} ms.`);
//   timer = Date.now();
// }

export default {
  name: "MixinRaceCore",
  components: { RaceGraph },
  mixins: [
    MixinCourseData,
    MixinConstants,
    MixinSkills,
    MixinPositionKeeping,
    MixinKua,
  ],
  data() {
    return {
      umaStatus: {
        speed: "",
        stamina: "",
        power: "",
        guts: "",
        wisdom: "",
        condition: "2",
        style: "4",
        distanceFit: "A",
        surfaceFit: "A",
        styleFit: "A",
      },
      passiveBonus: {},
      passiveTriggered: 0,
      track: {
        location: "",
        course: "",
        surfaceCondition: "1",
      },
      courseList: [],
      // Results
      emulations: [],
      // Race variables
      maxEpoch: 0,
      season: -1,
      weather: -1,
      modifiedCondition: -1,
      temptationSection: -1,
      badStart: false,
      sectionTargetSpeedRandoms: [],
      frameElapsed: 0, // 15 frames per second
      position: 0,
      currentSpeed: null,
      sp: 0,
      operatingSkills: [],
      frames: [],
      startDelay: 0,
      isStartDash: false,
      delayTime: 0,
      spurtParameters: null,
      maxSpurt: false,
      downSlopeModeStart: null,
      temptationModeStart: null,
      temptationModeEnd: null,
      temptationWaste: 0,
      leadCompetitionUsage: 0,
      // UI
      skillGroups: "",
      savedUmas: {},
      umaToLoad: null,
      chartData: {},
      chartOptions: {},
      // Constants
      fitRanks: ["S", "A", "B", "C", "D", "E", "F", "G"],
      // Special cases
      oonige: false,
      kua: {
        showKuaWeights: false,
        baseSkillName: "變速",
        baseSkillPt: 96,
        downSlopeProbAccumulator: 0,
        downSlopeEndProbAccumulator: 0,
      },
    };
  },
  mounted() {
    this.updateSavedUmas();
    this.updateChart();
    if (!this.production) {
      this.umaToLoad = "test";
      this.loadUma();
      if (this.$refs.executeBlock.indicatedMaxEpoch === 1) {
        this.exec();
      }
    }
  },
  computed: {
    skillActivateAdjustment() {
      return this.$refs.executeBlock.skillActivateAdjustment;
    },
    fixRandom() {
      return this.skillActivateAdjustment === "2";
    },
    useExpectedValue() {
      return this.skillActivateAdjustment === "expected";
    },
    randomPosition() {
      return this.$refs.executeBlock.randomPosition;
    },
    leadCompetition() {
      return this.$refs.executeBlock.leadCompetition;
    },
    runningStyle() {
      return this.oonige ? STYLE.OONIGE : +this.umaStatus.style;
    },
    basicRunningStyle() {
      return +this.umaStatus.style;
    },
    locationName() {
      if (!this.track.location) {
        return "";
      }
      return this.trackData[this.track.location].name;
    },
    trackDetail() {
      if (!this.track.location) {
        return { distance: 0, surface: 1, courseSetStatus: [] };
      }
      return this.trackData[this.track.location].courses[this.track.course];
    },
    modifiedSpeed() {
      let statusCheckModifier = 1;
      const check = this.trackDetail.courseSetStatus;
      if (check.length > 0) {
        const CHECK_KEYS = ["", "speed", "stamina", "power", "guts", "wisdom"];
        for (const c of check) {
          let bonus;
          const status =
            this.umaStatus[CHECK_KEYS[c]] *
            this.condCoef[this.modifiedCondition];
          if (status <= 300) {
            bonus = 0.05;
          } else if (status <= 600) {
            bonus = 0.1;
          } else if (status <= 900) {
            bonus = 0.15;
          } else {
            bonus = 0.2;
          }
          bonus /= check.length;
          statusCheckModifier += bonus;
        }
      }

      const ret =
        this.calcExceedStatus(this.umaStatus.speed) *
          statusCheckModifier *
          this.condCoef[this.modifiedCondition] +
        this.surfaceSpeedModify[this.trackDetail.surface][
          this.track.surfaceCondition
        ] +
        this.passiveBonus.speed;
      return ret > 0 ? ret : 1;
    },
    modifiedStamina() {
      return (
        this.calcExceedStatus(this.umaStatus.stamina) *
          this.condCoef[this.modifiedCondition] +
        this.passiveBonus.stamina
      );
    },
    modifiedPower() {
      const ret =
        this.calcExceedStatus(this.umaStatus.power) *
          this.condCoef[this.modifiedCondition] +
        this.surfacePowerModify[this.trackDetail.surface][
          this.track.surfaceCondition
        ] +
        this.passiveBonus.power;
      return ret > 0 ? ret : 1;
    },
    modifiedGuts() {
      return (
        this.calcExceedStatus(this.umaStatus.guts) *
          this.condCoef[this.modifiedCondition] +
        this.passiveBonus.guts
      );
    },
    modifiedWisdom() {
      return (
        this.calcExceedStatus(this.umaStatus.wisdom) *
          this.condCoef[this.modifiedCondition] *
          this.styleFitCoef[this.umaStatus.styleFit] +
        this.passiveBonus.wisdom
      );
    },
    spMax() {
      return (
        this.trackDetail.distance +
        0.8 * this.modifiedStamina * this.styleSpCoef[this.runningStyle]
      );
    },
    spurtSpCoef() {
      return 1 + 200 / Math.sqrt(600 * this.modifiedGuts);
    },
    skillActivateRate() {
      return 100 - 9000.0 / this.umaStatus.wisdom;
    },
    temptationRate() {
      if (this.fixRandom || this.useExpectedValue) {
        return 0;
      } else {
        return (
          Math.pow(6.5 / Math.log10(0.1 * this.modifiedWisdom + 1), 2) +
          this.passiveBonus.temptationRate
        );
      }
    },
    currentPhase() {
      return this.getPhase(this.position);
    },
    currentSection() {
      return this.getSection(this.position);
    },
    baseSpeed() {
      return 20 - (this.trackDetail.distance - 2000) / 1000.0;
    },
    targetSpeed() {
      // 耐力枯渇
      if (this.sp <= 0) {
        return this.vMin;
      }
      // スタート時
      // 他に0.85倍の基準速度を下回る可能性がない（耐力枯渇してもこれよりは高い）
      if (this.currentSpeed < this.v0) {
        return this.v0;
      }
      let baseTargetSpeed;
      // スパート中
      if (
        this.spurtParameters &&
        this.position + this.spurtParameters.distance >= this.courseLength
      ) {
        baseTargetSpeed = this.spurtParameters.speed;
      } else {
        switch (this.currentPhase) {
          case 0:
          case 1:
            baseTargetSpeed =
              this.baseSpeed *
              this.styleSpeedCoef[this.runningStyle][this.currentPhase];
            break;
          case 2:
          case 3:
          default:
            baseTargetSpeed =
              this.baseSpeed * this.styleSpeedCoef[this.runningStyle][2] +
              Math.sqrt(this.modifiedSpeed / 500.0) *
                this.distanceFitSpeedCoef[this.umaStatus.distanceFit];
            baseTargetSpeed +=
              Math.pow(this.modifiedGuts * 450, 0.597) * 0.0001;
            break;
        }
        baseTargetSpeed +=
          this.baseSpeed * this.sectionTargetSpeedRandoms[this.currentSection];
      }
      // 根性補正
      let ret = baseTargetSpeed;

      // 坂
      const upSlope = this.isInSlope("up");
      if (upSlope) {
        ret -= (Math.abs(this.currentSlope) * 200.0) / this.modifiedPower;
      }
      const downSlope = this.isInSlope("down");
      if (downSlope) {
        if (this.downSlopeModeStart != null) {
          if (this.useExpectedValue) {
            ret +=
              (Math.abs(this.currentSlope) / 10.0 + 0.3) *
              this.modifiedWisdom *
              0.0004;
          } else {
            ret += Math.abs(this.currentSlope) / 10.0 + 0.3;
          }
        }
      }

      // 持続中スキル
      for (const skill of this.operatingSkills) {
        if (skill.data.targetSpeed) {
          ret += skill.data.targetSpeed;
        }
        if (skill.data.speedWithDecel) {
          ret += skill.data.speedWithDecel;
        }
        // 減速スキルの目標速度低下分
        if (skill.data.speed) {
          ret += skill.data.speed;
        }
      }
      return ret;
    },
    acceleration() {
      const c = this.isInSlope("up") ? 0.0004 : 0.0006;
      let ret =
        c *
        Math.sqrt(500 * this.modifiedPower) *
        this.styleAccelerateCoef[this.runningStyle][this.currentPhase] *
        this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit] *
        this.distanceFitAccelerateCoef[this.umaStatus.distanceFit];
      // スタート時加算
      if (this.isStartDash) {
        ret += 24;
      }
      for (const skill of this.operatingSkills) {
        /**debug**/
        if (skill.data.acceleration) {
          ret += skill.data.acceleration;
        }
      }
      return ret;
    },
    deceleration() {
      if (this.sp <= 0) {
        return -1.2;
      }
      switch (this.currentPhase) {
        case 0:
          return -1.2;
        case 1:
          return -0.8;
        case 2:
        default:
          return -1.0;
      }
    },
    maxSpurtSpeed() {
      return (
        (this.baseSpeed * (this.styleSpeedCoef[this.runningStyle][2] + 0.01) +
          Math.sqrt(this.modifiedSpeed / 500) *
            this.distanceFitSpeedCoef[this.umaStatus.distanceFit]) *
          1.05 +
        Math.sqrt(500 * this.modifiedSpeed) *
          this.distanceFitSpeedCoef[this.umaStatus.distanceFit] *
          0.002 +
        Math.pow(450 * this.modifiedGuts, 0.597) * 0.0001
      );
    },
    isInTemptation() {
      if (
        this.temptationModeStart == null ||
        this.frameElapsed < this.temptationModeStart
      ) {
        return false;
      }
      if (this.temptationModeEnd == null) {
        return true;
      }
      return this.frameElapsed <= this.temptationModeEnd;
    },
    v0() {
      return 0.85 * this.baseSpeed;
    },
    v1() {
      return this.baseSpeed * this.styleSpeedCoef[this.runningStyle][0];
    },
    v2() {
      return this.baseSpeed * this.styleSpeedCoef[this.runningStyle][1];
    },
    v3() {
      return (
        this.baseSpeed * this.styleSpeedCoef[this.runningStyle][2] +
        Math.sqrt(this.modifiedSpeed / 500) *
          this.distanceFitSpeedCoef[this.umaStatus.distanceFit]
      );
    },
    vMin() {
      if (this.isStartDash) {
        return this.startSpeed;
      }
      return 0.85 * this.baseSpeed + 0.001 * Math.sqrt(this.modifiedGuts * 200);
    },
    a0() {
      return (
        24 +
        0.0006 *
          Math.sqrt(500 * this.modifiedPower) *
          this.styleAccelerateCoef[this.runningStyle][0] *
          this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit] *
          this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
      );
    },
    a1() {
      return (
        0.0006 *
        Math.sqrt(500 * this.modifiedPower) *
        this.styleAccelerateCoef[this.runningStyle][0] *
        this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit] *
        this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
      );
    },
    a2() {
      if (this.v2 < this.v1) {
        return -0.8;
      }
      return (
        0.0006 *
        Math.sqrt(500 * this.modifiedPower) *
        this.styleAccelerateCoef[this.runningStyle][1] *
        this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit] *
        this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
      );
    },
    a3() {
      return (
        0.0006 *
        Math.sqrt(500 * this.modifiedPower) *
        this.styleAccelerateCoef[this.runningStyle][2] *
        this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit] *
        this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
      );
    },
    skillMenu() {
      const TITLE_TYPE = {
        passive: `${this.$t("skills.passive")}`,
        heal: `${this.$t("skills.heal")}`,
        speed: `${this.$t("skills.speed")}`,
        acceleration: `${this.$t("skills.acceleration")}`,
        composite: `${this.$t("skills.composite")}`,
        gate: `${this.$t("skills.gate")}`,
        decel: `${this.$t("skills.decel")}`,
        fatigue: `${this.$t("skills.fatigue")}`,
      };
      const ret = [];
      for (const type of this.types) {
        ret.push({
          title: TITLE_TYPE[type],
          type,
        });
      }
      return ret;
    },
    latestRaceTime() {
      if (this.emulations.length === 0) {
        return 0;
      } else {
        return this.emulations[this.emulations.length - 1].raceTime;
      }
    },
    avgRaceTime() {
      return this.calcAvg("all", "raceTime");
    },
    avgRaceTimeMaxSpurt() {
      return this.calcAvg("max", "raceTime");
    },
    avgRaceTimeNotMaxSpurt() {
      return this.calcAvg("notMax", "raceTime");
    },
    bestTime() {
      return this.pickEdge("all", "raceTime", "best");
    },
    worstTime() {
      return this.pickEdge("all", "raceTime", "worst");
    },
    bestTimeMaxSpurt() {
      return this.pickEdge("max", "raceTime", "best");
    },
    worstTimeMaxSpurt() {
      return this.pickEdge("max", "raceTime", "worst");
    },
    bestTimeNotMaxSpurt() {
      return this.pickEdge("notMax", "raceTime", "best");
    },
    worstTimeNotMaxSpurt() {
      return this.pickEdge("notMax", "raceTime", "worst");
    },
    timeStandardDeviation() {
      return this.calcStdDev("all", "raceTime");
    },
    timeStandardDeviationMaxSpurt() {
      return this.calcStdDev("max", "raceTime");
    },
    timeStandardDeviationNotMaxSpurt() {
      return this.calcStdDev("notMax", "raceTime");
    },
    maxSpurtRate() {
      if (this.emulations.length === 0) {
        return "-";
      }
      let maxSpurt = 0;
      for (const e of this.emulations) {
        if (e.maxSpurt) maxSpurt++;
      }
      return ((100.0 * maxSpurt) / this.emulations.length).toFixed(1);
    },
    maxSpurtSPLeft() {
      if (this.emulations.length === 0) {
        return "-";
      }
      let sum = 0.0;
      let count = 0;
      for (const e of this.emulations) {
        if (e.maxSpurt) {
          sum += e.spDiff;
          count++;
        }
      }
      if (count === 0) {
        return "-";
      }
      return (sum / count).toFixed(1);
    },
    nonMaxSpurtSPLack() {
      if (this.emulations.length === 0) {
        return "-";
      }
      let sum = 0.0;
      let count = 0;
      for (const e of this.emulations) {
        if (!e.maxSpurt) {
          sum += e.spDiff;
          count++;
        }
      }
      if (count === 0) {
        return "-";
      }
      return (-sum / count).toFixed(1);
    },
    production() {
      return process.env.NODE_ENV === "production";
    },
    chartMiddle() {
      return this.courseLength * 0.45;
    },
  },
  methods: {
    calcExceedStatus(status) {
      return status > 1200 ? 1200 + (status - 1200) / 2 : status;
    },
    locationChanged(location) {
      this.courseList = this.trackData[location].courses;
      this.track.course = Object.keys(this.courseList)[0];
      this.saveSelectedCourse();
    },
    courseChanged() {
      this.saveSelectedCourse();
    },
    saveSelectedCourse() {
      if (!this.track.location) {
        return;
      }
      localStorage.setItem(
        "selectedCourse",
        JSON.stringify({
          location: this.track.location,
          course: this.track.course,
        })
      );
    },
    exec(maxEpoch) {
      this.fullFillStatus();
      this.emulations = [];
      this.maxEpoch = maxEpoch;
      this.progressEpoch();
    },
    fullFillStatus() {
      if (this.umaStatus.speed === "") {
        this.umaStatus.speed = 1000;
      }
      if (this.umaStatus.stamina === "") {
        this.umaStatus.stamina = 2000;
      }
      if (this.umaStatus.power === "") {
        this.umaStatus.power = 1000;
      }
      if (this.umaStatus.guts === "") {
        this.umaStatus.guts = 1000;
      }
      if (this.umaStatus.wisdom === "") {
        this.umaStatus.wisdom = 1000;
      }
    },
    progressEpoch() {
      setTimeout(() => {
        for (
          const target = this.$refs.executeBlock.epoch + this.maxEpoch / 5;
          this.$refs.executeBlock.epoch < Math.min(target, this.maxEpoch);
          this.$refs.executeBlock.epoch++
        ) {
          this.start();
        }
        if (this.$refs.executeBlock.epoch < this.maxEpoch) {
          this.progressEpoch();
        } else {
          this.$refs.executeBlock.emulating = false;
        }
      }, 1);
    },
    start: function () {
      this.resetRace();
      this.initCondition();
      this.initClimate();
      if (this.emulatorType === "team") {
        this.initCourse();
      }
      this.invokeSkills(this.skillActivateAdjustment);
      if (this.fixRandom) {
        this.startDelay = 0;
      } else if (this.useExpectedValue) {
        this.startDelay = 0.05;
      } else {
        this.startDelay = Math.random() * 0.1;
      }
      this.triggerStartSkills();
      this.initSystematicSkills();
      this.initTemptation();
      this.isStartDash = true;
      this.delayTime = this.startDelay;
      this.sp = this.spMax;
      this.sectionTargetSpeedRandoms = this.initSectionTargetSpeedRandoms();
      this.progressRace();
    },
    resetRace() {
      this.frameElapsed = 0;
      this.sp = 0;
      this.position = 0;
      this.currentSpeed = this.startSpeed;
      this.passiveBonus = {};
      for (const bonus of this.passiveBonusKeys) {
        this.passiveBonus[bonus] = 0;
      }
      this.passiveTriggered = 0;
      this.operatingSkills = [];
      delete this.frames;
      this.frames = [{ skills: [] }];
      this.spurtParameters = null;
      this.maxSpurt = false;
      this.downSlopeModeStart = null;
      this.temptationModeStart = null;
      this.temptationModeEnd = null;
      this.temptationWaste = 0;
      this.modifiedCondition = -1;
      this.temptationSection = -1;
      this.season = -1;
      this.weather = -1;
      this.oonige = false;
      this.leadCompetitionUsage = 0;
    },
    initCondition() {
      if (this.umaStatus.condition <= 4) {
        this.modifiedCondition = this.umaStatus.condition;
      } else {
        // 4種ランダム
        this.modifiedCondition = Math.floor(Math.random() * 4);
      }
    },
    initClimate() {
      // 0=春だけ40%、他20%
      this.season = Math.floor(Math.random() * 5) - 1;
      if (this.season < 0) this.season = 0;
      // 0=晴れ、1=曇り、2=雨、3=雪
      const WEATHER_RATES = [0.575, 0.875, 1];
      const w = Math.random();
      for (let i = 0; i < WEATHER_RATES.length; i++) {
        if (w < WEATHER_RATES[i]) {
          this.weather = i;
          break;
        }
      }
      // 冬の雨は1/3の確率で雪にする
      if (this.weather === 2 && this.season === 3 && Math.random() < 1.0 / 3) {
        this.weather = 3;
      }
    },
    initTemptation() {
      if (Math.random() * 100 < this.temptationRate) {
        this.temptationSection = 1 + Math.floor(Math.random() * 8);
      } else {
        this.temptationSection = -1;
      }
    },

    progressRace() {
      while (this.position < this.courseLength) {
        if (this.frameElapsed > 5000) {
          break;
        }
        const startPosition = this.position;
        const startSp = this.sp;
        const startPhase = this.currentPhase;
        this.frames[this.frameElapsed].speed = this.currentSpeed;
        this.frames[this.frameElapsed].sp = this.sp;
        this.frames[this.frameElapsed].startPosition = startPosition;

        // 下り坂モードに入るか・終わるかどうかの判定
        const enterDownSlopeModeProbability = this.modifiedWisdom * 0.0004;
        // 1秒置きなので、このフレームは整数秒を含むかどうかのチェック
        const frameContainsRoundSecond =
          Math.floor(this.frameElapsed * this.frameLength) !==
          Math.floor((this.frameElapsed + 1) * this.frameLength);

        if (this.fixRandom || !this.isInSlope("down")) {
          this.downSlopeModeStart = null;
        } else if (this.useExpectedValue) {
          if (this.downSlopeModeStart == null) {
            // Always enter down slope mode, modify the speed increase instead
            this.downSlopeModeStart = this.frameElapsed;
          } else {
            this.kua.downSlopeEndProbAccumulator += 0.2;
            if (this.kua.downSlopeEndProbAccumulator >= 1) {
              this.downSlopeModeStart = null;
              this.kua.downSlopeEndProbAccumulator -= 1;
            }
          }
        } else if (!this.useExpectedValue && frameContainsRoundSecond) {
          if (this.downSlopeModeStart == null) {
            if (Math.random() < enterDownSlopeModeProbability) {
              this.downSlopeModeStart = this.frameElapsed;
            }
          } else {
            if (Math.random() < 0.2) {
              this.downSlopeModeStart = null;
            }
          }
        }

        // 掛かり処理
        if (this.isInTemptation) {
          // 掛かり終了判定
          const temptationDuration =
            (this.frameElapsed - this.temptationModeStart) * this.frameLength;
          const prevTemptationDuration =
            (this.frameElapsed - 1 - this.temptationModeStart) *
            this.frameLength;
          for (let j = 3; j < 12; j += 3) {
            if (prevTemptationDuration < j && temptationDuration >= j) {
              if (Math.random() < 0.55) {
                this.temptationModeEnd = this.frameElapsed;
              }
            }
          }
          if (temptationDuration >= 12) {
            this.temptationModeEnd = this.frameElapsed;
          }
        }
        // 掛かり開始
        if (
          this.temptationSection > 0 &&
          this.currentSection === this.temptationSection
        ) {
          this.temptationModeStart = this.frameElapsed;
          this.temptationSection = -1;
        }

        this.move(this.frameLength);
        this.frames[this.frameElapsed].movement = this.position - startPosition;
        this.frames[this.frameElapsed].consume = this.sp - startSp;
        this.frameElapsed++;

        // 終盤入り・ラストスパート計算
        if (startPhase === 1 && this.currentPhase === 2) {
          this.spurtParameters = this.calcSpurtParameter();
        }

        if (this.position >= this.courseLength) {
          break;
        }
        // Calculate target speed of next frame and do heal/fatigue
        const skillTriggered = this.checkSkillTrigger(startPosition);
        const spurting =
          this.spurtParameters != null &&
          this.position + this.spurtParameters.distance >= this.courseLength;
        this.frames.push({
          skills: skillTriggered,
          spurting,
        });

        // Remove overtime skills
        for (let i = 0; i < this.operatingSkills.length; i++) {
          const operatingSkill = this.operatingSkills[i];
          const duration =
            operatingSkill.data.durationOverwrite ??
            operatingSkill.data.duration;
          if (
            (this.frameElapsed - operatingSkill.startFrame) * this.frameLength >
            duration * this.timeCoef
          ) {
            this.operatingSkills.splice(i, 1);
            i--; // Without this line, the original next element will be skipped
            break;
          }
        }
      }
      this.goal();
    },
    move(elapsedTime) {
      if (this.delayTime > 0) {
        this.delayTime -= elapsedTime;
      }
      if (this.delayTime <= 0) {
        let timeAfterDelay = elapsedTime;
        if (this.delayTime < 0) {
          timeAfterDelay = Math.abs(this.delayTime);
          this.delayTime = 0;
        }

        this.updateSelfSpeed(elapsedTime /* NOT timeAfterDelay!! */);
        let actualSpeed = this.currentSpeed;

        // 移動距離及び耐力消耗を算出
        this.position += actualSpeed * timeAfterDelay;
        const baseSpeed = this.isStartDash ? this.currentSpeed : this.baseSpeed;
        let consume =
          this.consumePerSecond(
            baseSpeed,
            this.currentSpeed,
            this.currentPhase
          ) * elapsedTime;
        if (this.downSlopeModeStart != null) {
          consume *= 0.4;
        }
        const inLeadCompetition = this.operatingSkills.some(
          (s) => s.data.id === "leadCompetition"
        );
        if (inLeadCompetition) {
          if (this.isInTemptation) {
            if (this.oonige) {
              consume *= 7.7;
              this.temptationWaste += consume * 6.7;
              this.leadCompetitionUsage += consume * 6.7;
            } else {
              consume *= 3.6;
              this.temptationWaste += consume * 2.6;
              this.leadCompetitionUsage += consume * 2.6;
            }
          } else {
            if (this.oonige) {
              consume *= 3.5;
              this.leadCompetitionUsage += consume * 2.5;
            } else {
              consume *= 1.4;
              this.leadCompetitionUsage += consume * 0.4;
            }
          }
        } else {
          if (this.isInTemptation) {
            this.temptationWaste += consume * 0.6;
            consume *= 1.6;
          }
        }

        this.sp -= consume;
        this.updateStartDash();
      }
    },
    updateSelfSpeed(elapsedTime) {
      let newSpeed;
      if (this.currentSpeed < this.targetSpeed) {
        newSpeed = Math.min(
          this.currentSpeed + elapsedTime * this.acceleration,
          this.targetSpeed
        );
      } else {
        newSpeed = Math.max(
          this.currentSpeed + elapsedTime * this.deceleration,
          this.targetSpeed
        );
      }
      if (this.isStartDash && newSpeed > this.v0) {
        newSpeed = this.v0;
      }
      newSpeed = Math.max(Math.min(newSpeed, this.maxSpeed), this.vMin);
      if (this.speedDebuff) {
        newSpeed -= this.speedDebuff;
      }
      let speedModification = 0;
      for (const skill of this.operatingSkills) {
        // 減速スキルの現在速度低下分
        if (skill.data.speed) {
          speedModification += skill.data.speed;
        }
      }
      this.speedDebuff = speedModification;
      newSpeed += speedModification;
      this.currentSpeed = newSpeed;
    },
    updateStartDash() {
      if (this.isStartDash && this.currentSpeed >= this.v0) {
        this.isStartDash = false;
      }
    },
    calcSpurtParameter(isReCalc) {
      const maxDistance = this.trackDetail.distance - this.position;
      const spurtDistance = this.calcSpurtDistance(this.maxSpurtSpeed);
      const totalConsume = this.calcRequiredSp(this.maxSpurtSpeed);
      if (spurtDistance >= maxDistance) {
        if (this.position <= (this.courseLength * 2.0) / 3 + 5) {
          if (!isReCalc) {
            this.maxSpurt = true;
          }
        }
        return {
          distance: maxDistance,
          speed: this.maxSpurtSpeed,
          spDiff: isReCalc
            ? this.spurtParameters.spDiff
            : this.sp - totalConsume,
        };
      }
      // SPが足りない場合の処理
      const candidates = [];
      const totalConsumeV3 = this.calcRequiredSp(this.v3);
      const excessSp = this.sp - totalConsumeV3;
      if (excessSp < 0) {
        return {
          distance: 0,
          speed: this.v3,
          spDiff: isReCalc
            ? this.spurtParameters.spDiff
            : this.sp - totalConsume,
        };
      }
      for (let v = this.maxSpurtSpeed - 0.1; v >= this.v3; v -= 0.1) {
        let distanceV = this.calcSpurtDistance(v);
        if (distanceV >= maxDistance) {
          distanceV = maxDistance;
        }
        candidates.push({
          distance: distanceV,
          speed: v,
          time: distanceV / v + (maxDistance - distanceV) / this.v3,
          spDiff: isReCalc
            ? this.spurtParameters.spDiff
            : this.sp - totalConsume,
        });
      }
      candidates.sort((a, b) => {
        return a.time - b.time;
      });
      for (const i in candidates) {
        candidates[i].order = parseInt(i) + 1;
        const c = candidates[i];
        if (this.fixRandom || this.useExpectedValue) {
          return c;
        }
        if (Math.random() * 100 < 15 + 0.05 * this.modifiedWisdom) {
          return c;
        }
      }
      return candidates[candidates.length - 1];
    },
    calcSpurtDistance(v) {
      return (
        (this.sp -
          ((this.courseLength - this.position - 60) *
            20 *
            this.spConsumptionCoef[this.trackDetail.surface][
              this.track.surfaceCondition
            ] *
            this.spurtSpCoef *
            Math.pow(this.v3 - this.baseSpeed + 12, 2)) /
            144 /
            this.v3) /
          (20 *
            this.spConsumptionCoef[this.trackDetail.surface][
              this.track.surfaceCondition
            ] *
            this.spurtSpCoef *
            (Math.pow(v - this.baseSpeed + 12, 2) / 144 / v -
              Math.pow(this.v3 - this.baseSpeed + 12, 2) / 144 / this.v3)) +
        60
      );
    },
    calcRequiredSp(v) {
      return (
        ((this.courseLength - this.position - 60) *
          20 *
          this.spConsumptionCoef[this.trackDetail.surface][
            this.track.surfaceCondition
          ] *
          this.spurtSpCoef *
          Math.pow(this.v3 - this.baseSpeed + 12, 2)) /
          144 /
          this.v3 +
        (this.courseLength - this.position - 60) *
          (20 *
            this.spConsumptionCoef[this.trackDetail.surface][
              this.track.surfaceCondition
            ] *
            this.spurtSpCoef *
            (Math.pow(v - this.baseSpeed + 12, 2) / 144 / v -
              Math.pow(this.v3 - this.baseSpeed + 12, 2) / 144 / this.v3))
      );
    },
    consumePerSecond(baseSpeed, v, phase) {
      let ret =
        (20.0 *
          this.spConsumptionCoef[this.trackDetail.surface][
            this.track.surfaceCondition
          ] *
          Math.pow(v - baseSpeed + 12, 2)) /
        144;
      if (phase >= 2) {
        ret *= this.spurtSpCoef;
      }
      return ret;
    },
    isInSlope(direction, position) {
      if (!position) {
        position = this.position;
      }
      return (
        (direction === "up" && this.getSlope(position) >= 1) ||
        (direction === "down" && this.getSlope(position) <= -1)
      );
    },
    goal() {
      const excessTime =
        (this.position - this.courseLength) / this.currentSpeed;
      const raceTime = this.frameElapsed * this.frameLength - excessTime;
      const raceTimeDelta = raceTime - this.trackDetail.finishTimeMax / 1.18;

      if (this.$refs.executeBlock.epoch === this.maxEpoch - 1) {
        this.updateChart();
      }

      const emu = {
        raceTime,
        raceTimeDelta,
        maxSpurt: this.maxSpurt,
        spDiff: this.spurtParameters.spDiff,
      };
      this.emulations.push(emu);
    },
    toDisplayTime(time) {
      let ret = time * 1.18;
      const min = this.trackDetail.finishTimeMin;
      const max = this.trackDetail.finishTimeMax;
      if (ret < min) {
        ret = min - 1 + 2 * Math.random();
      } else if (ret > max) {
        ret = max - 1 + 2 * Math.random();
      }
      return ret;
    },
    calcAvg(scope, field) {
      let sum = 0;
      let count = 0;
      for (const e of this.emulations) {
        if (scope === "max" && !e.maxSpurt) {
          continue;
        } else if (scope === "notMax" && e.maxSpurt) {
          continue;
        }
        sum += e[field];
        count++;
      }
      if (count === 0) {
        return 0;
      }
      return sum / count;
    },
    calcStdDev(scope, field) {
      if (!field) {
        field = "raceTime";
      }
      const avg = this.calcAvg(scope, field);
      let sum = 0;
      let count = 0;
      for (const e of this.emulations) {
        if (scope === "max" && !e.maxSpurt) {
          continue;
        } else if (scope === "notMax" && e.maxSpurt) {
          continue;
        }
        sum += Math.pow(e[field] - avg, 2);
        count++;
      }
      if (count === 0) {
        return 0;
      }
      return Math.sqrt(sum / count);
    },
    pickEdge(scope, field, dir) {
      let ret = dir === "best" ? 999999 : -999999;
      for (const e of this.emulations) {
        if (scope === "max" && !e.maxSpurt) {
          continue;
        } else if (scope === "notMax" && e.maxSpurt) {
          continue;
        }
        if (
          (dir === "best" && e[field] < ret) ||
          (dir === "worst" && e[field] > ret)
        ) {
          ret = e[field];
        }
      }
      if (ret === 999999 || ret === -999999) {
        return 0;
      }
      return ret;
    },
    saveUma() {
      this.$prompt("ウマ名を入力して下さい", "", {
        inputValue: this.umaToLoad,
        confirmButtonText: "セーブ",
        cancelButtonText: "キャンセル",
        inputPattern: /.+/,
        inputErrorMessage: "名前を入力して下さい。",
      }).then(({ value }) => {
        const umas = JSON.parse(localStorage.getItem("umas") || "{}");
        umas[value] = this.saveUmaToObject();
        localStorage.setItem("umas", JSON.stringify(umas));
        this.$message({
          type: "success",
          message: `${value}をセーブしました。`,
        });
        this.updateSavedUmas();
        this.umaToLoad = value;
      });
    },
    saveUmaToObject() {
      const hasSkillIds = [];
      for (const type of this.types) {
        for (const section of this.raritySections) {
          for (const id of this.hasSkills[type][section]) {
            hasSkillIds.push(id);
          }
        }
      }
      hasSkillIds.push(...this.hasEvoSkills);
      return {
        version: UMA_OBJ_VERSION,
        status: this.umaStatus,
        track: this.track,
        hasSkillIds,
        selectedUnique: this.selectedUnique,
        uniqueLevel: this.uniqueLevel,
        raceType: this.raceType,
        emulations: this.emulations,
      };
    },
    loadUma() {
      const umas = JSON.parse(localStorage.getItem("umas") || "{}");
      if (this.loadUmaFromObject(umas[this.umaToLoad])) {
        this.$message({
          type: "success",
          message: `${this.umaToLoad}をロードしました。`,
        });
      } else {
        this.$message({
          type: "failed",
          message: `${this.umaToLoad}は旧データで読み込めませんでした。`,
        });
      }
    },
    loadUmaFromObject(u) {
      if (u == null || u.version == null || u.version < UMA_OBJ_VERSION) {
        return false;
      }
      this.umaStatus = u.status;
      this.locationChanged(u.track.location);
      this.track = u.track;
      this.resetHasSkills();

      const idMap = this.skills.map((x) => x.id);
      for (const id of u.hasSkillIds ?? []) {
        const skill = this.skills[idMap.indexOf(id)];
        if (skill.rarity === "evo") {
          this.hasEvoSkills.push(id);
        } else {
          const section = this.toRaritySection(skill.rarity);
          this.hasSkills[skill.type][section].push(id);
        }
      }

      if (u.selectedUnique) {
        this.selectedUnique = u.selectedUnique;
        this.uniqueLevel = u.uniqueLevel;
      }
      if (u.raceType) {
        this.raceType = u.raceType;
      }
      if (u.emulations) {
        this.emulations = u.emulations;
      }
      this.initCondition();
      return true;
    },
    exportUma() {
      navigator.clipboard
        .writeText(JSON.stringify(this.saveUmaToObject()))
        .then(() => {
          this.$message({
            type: "success",
            message: `クリップボードへのエクスポートに成功しました。`,
          });
        });
    },
    importUma(command) {
      switch (command) {
        case "tool":
          this.importUmaFromTool();
          break;
        case "game":
          this.importUmaFromGame();
          break;
      }
    },
    importUmaFromTool() {
      this.$prompt("データをここに貼り付けてください", "", {
        confirmButtonText: "インポート",
        cancelButtonText: "キャンセル",
        inputPattern: /.+/,
        inputErrorMessage: "",
      }).then(({ value }) => {
        this.loadUmaFromObject(JSON.parse(value));
        this.$message({
          type: "success",
          message: `インポートに成功しました。`,
        });
      });
    },
    importUmaFromGame() {
      this.$prompt(
        "race_horse_data もしくは trained_chara (の JSON) をここに貼り付けてください",
        "",
        {
          confirmButtonText: "インポート",
          cancelButtonText: "キャンセル",
          inputPattern: /.+/,
          inputErrorMessage: "",
        }
      ).then(({ value }) => {
        const raceHorseData = JSON.parse(value);

        this.umaStatus.stamina = raceHorseData["stamina"];
        this.umaStatus.speed = raceHorseData["speed"];
        this.umaStatus.power = raceHorseData["pow"] || raceHorseData["power"]; // 'pow' in race_horse_data, 'power' in trained_chara
        this.umaStatus.guts = raceHorseData["guts"];
        this.umaStatus.wisdom = raceHorseData["wiz"];

        const skills = raceHorseData["skill_array"];

        this.selectedUnique = "なし／発動しない"; // Reset it to unselected first
        const uniqueSkills = skills.filter((s) => s["skill_id"] < 200000);
        if (uniqueSkills.length === 1) {
          const uniqueSkill = uniqueSkills[0];
          const matchedSkill = this.uniqueSkillData.filter(
            (skill) => skill.id === uniqueSkill["skill_id"]
          )[0];
          if (matchedSkill !== undefined) {
            this.selectedUnique = matchedSkill.name;
            this.uniqueLevel = uniqueSkill["level"];
          }
        }

        const nonUniqueSkillIds = new Set(
          skills
            .filter((s) => s["skill_id"] >= 200000)
            .map((s) => s["skill_id"])
        );
        this.resetHasSkills();

        for (const type in this.skills) {
          for (const rarity in this.skills[type]) {
            for (
              let skillIdx = 0;
              skillIdx < this.skills[type][rarity].length;
              skillIdx++
            ) {
              const skill = this.skills[type][rarity][skillIdx];
              if (skill.id !== undefined) {
                if (nonUniqueSkillIds.has(skill.id)) {
                  this.hasSkills[type][rarity].push(skillIdx);
                  nonUniqueSkillIds.delete(skill.id); // So things like フラワリー☆マニューバ don't get added twice
                }
              }
            }
          }
        }

        this.initCondition();
        this.$message({
          type: "success",
          message: `インポートに成功しました。脚質と適性を調整してください。`,
        });
      });
    },
    removeUma() {
      const umas = JSON.parse(localStorage.getItem("umas") || "{}");
      delete umas[this.umaToLoad];
      localStorage.setItem("umas", JSON.stringify(umas));
      this.$message({
        type: "success",
        message: `${this.umaToLoad}を削除しました。`,
      });
      this.updateSavedUmas();
    },
    resetUma() {
      this.resetStatus();
      this.resetHasSkills();
      this.umaToLoad = "";
    },
    resetStatus() {
      this.umaStatus = {
        speed: null,
        stamina: null,
        power: null,
        guts: null,
        wisdom: null,
        condition: "2",
        style: "1",
        distanceFit: "A",
        surfaceFit: "A",
        styleFit: "A",
      };
    },
    initSectionTargetSpeedRandoms() {
      const ret = [];
      for (let i = 0; i < 24; i++) {
        const max =
          (this.modifiedWisdom / 5500.0) *
          Math.log10(this.modifiedWisdom * 0.1) *
          0.01;
        if (this.fixRandom || this.useExpectedValue) {
          ret.push(max - 0.00325);
        } else {
          ret.push(max + Math.random() * -0.0065);
        }
      }
      return ret;
    },
    updateSavedUmas() {
      this.umaToLoad = null;
      this.savedUmas = JSON.parse(localStorage.getItem("umas"));
    },
    updateChart() {
      const thiz = this;
      const labels = [];
      const dataSpeed = [];
      const dataSp = [];
      const dataPosition = [];
      const annotations = [];
      let skillYAdjust = 0;
      const nextSkillYAdjust = function () {
        skillYAdjust += 25;
        if (skillYAdjust > 50) {
          skillYAdjust = 0;
        }
      };
      const PHASE_NAMES = [
        this.$t("chart.phase1"),
        this.$t("chart.phase2"),
        this.$t("chart.phase3"),
      ];
      const SKILL_COLORS = {
        heal: "cyan",
        decel: "darkred",
        speed: "gold",
        acceleration: "orange",
        composite: "DarkOliveGreen",
        fatigue: "darkred",
        gate: "green",
        passive: "green",
      };

      // スタート
      annotations.push({
        type: "line",
        label: {
          content:
            this.startDelay >= 0.08
              ? this.$t("chart.lateStart")
              : this.$t("chart.start"),
          position: "bottom",
          enabled: true,
          xAdjust: -30,
        },
        mode: "vertical",
        scaleID: "x-axis-0",
        value: 0,
        borderColor: "yellow",
        borderWidth: 2,
        onClick: function () {
          thiz.$message(`スタートディレイ：${thiz.startDelay.toFixed(3)}秒`);
        },
      });

      // 掛かり区間
      if (this.temptationModeStart > 0) {
        annotations.push({
          type: "box",
          xMin: this.temptationModeStart,
          xMax: this.temptationModeEnd,
          yMin: 0,
          yMax: 100,
          xScaleID: "x-axis-0",
          onClick: function () {
            thiz.$message(
              `掛かり：${
                (thiz.temptationModeEnd - thiz.temptationModeStart) *
                thiz.frameLength
              }秒、余分耐力消耗：${thiz.temptationWaste.toFixed(1)}`
            );
          },
        });
      }

      let cornerIndex = 0;
      let cornerStart = -1;
      let straightStart = -1;
      let upSlopeStart = -1;
      let downSlopeStart = -1;
      // const step = Math.floor(this.frames.length / 500)
      const step = 1;
      for (let index = 0; index < this.frames.length; index += step) {
        const frame = this.frames[index];
        const label = this.formatTime(index * this.frameLength, 1);
        labels.push(label);
        dataSpeed.push(frame.speed);
        dataSp.push(frame.sp);
        dataPosition.push(frame.startPosition.toFixed(2));
        for (
          let mi = index;
          mi < index + step && mi < this.frames.length;
          mi++
        ) {
          // Skill annotations
          for (const skill of this.frames[mi].skills) {
            annotations.push({
              type: "line",
              label: {
                content: skill.data.name,
                position: "top",
                enabled: true,
                yAdjust: skillYAdjust,
              },
              mode: "vertical",
              scaleID: "x-axis-0",
              value: label,
              borderColor: SKILL_COLORS[skill.data.type],
              borderWidth: 2,
              onClick: function () {
                if (skill.detail) {
                  if ("waste" in skill.detail) {
                    if (skill.detail.waste > 0) {
                      thiz.$message(
                        `耐力${skill.detail.heal.toFixed(
                          1
                        )}回復(${skill.detail.waste.toFixed(1)}が溢れた)`
                      );
                    } else {
                      thiz.$message(`耐力${skill.detail.heal.toFixed(1)}回復`);
                    }
                  } else if ("extended" in skill.detail) {
                    thiz.$message(`x${skill.detail.extended}`);
                  }
                }
              },
            });
            nextSkillYAdjust(skillYAdjust);
          }
          // コーナー
          if (
            !this.isInCorner(this.frames[index].startPosition) &&
            this.isInCorner(
              this.frames[index].startPosition + this.frames[index].movement
            )
          ) {
            cornerStart = index;
          } else if (
            this.isInCorner(this.frames[index].startPosition) &&
            !this.isInCorner(
              this.frames[index].startPosition + this.frames[index].movement
            )
          ) {
            annotations.push({
              type: "box",
              xMin: cornerStart,
              xMax: index,
              yMin: this.courseLength * -0.1,
              yMax: this.chartMiddle,
              xScaleID: "x-axis-0",
              yScaleID: "position",
              backgroundColor: "rgba(225, 190, 255, 0.2)",
              drawTime: "beforeDatasetsDraw",
            });
            cornerIndex++;
            if (cornerIndex >= 3) {
              cornerIndex = 0;
            }
          }
        }
        // 直線
        if (
          !this.isInStraight(this.frames[index].startPosition) &&
          this.isInStraight(
            this.frames[index].startPosition + this.frames[index].movement
          )
        ) {
          straightStart = index;
        } else if (
          this.isInStraight(this.frames[index].startPosition) &&
          !this.isInStraight(
            this.frames[index].startPosition + this.frames[index].movement
          )
        ) {
          annotations.push({
            type: "box",
            xMin: straightStart,
            xMax: index,
            yMin: this.courseLength * -0.1,
            yMax: this.chartMiddle,
            xScaleID: "x-axis-0",
            yScaleID: "position",
            backgroundColor: "rgba(210, 235, 255, 0.2)",
            drawTime: "beforeDatasetsDraw",
          });
        }
        // 上り坂
        if (
          !this.isInSlope("up", this.frames[index].startPosition) &&
          this.isInSlope(
            "up",
            this.frames[index].startPosition + this.frames[index].movement
          )
        ) {
          upSlopeStart = index;
        } else if (
          this.isInSlope("up", this.frames[index].startPosition) &&
          !this.isInSlope(
            "up",
            this.frames[index].startPosition + this.frames[index].movement
          )
        ) {
          annotations.push({
            type: "box",
            xMin: upSlopeStart,
            xMax: index,
            yMin: this.chartMiddle,
            yMax: this.courseLength,
            xScaleID: "x-axis-0",
            yScaleID: "position",
            backgroundColor: "rgba(240, 235, 105, 0.2)",
            drawTime: "beforeDatasetsDraw",
          });
        }
        // 下り坂
        if (
          !this.isInSlope("down", this.frames[index].startPosition) &&
          this.isInSlope(
            "down",
            this.frames[index].startPosition + this.frames[index].movement
          )
        ) {
          downSlopeStart = index;
        } else if (
          this.isInSlope("down", this.frames[index].startPosition) &&
          !this.isInSlope(
            "down",
            this.frames[index].startPosition + this.frames[index].movement
          )
        ) {
          annotations.push({
            type: "box",
            xMin: downSlopeStart,
            xMax: index,
            yMin: this.chartMiddle,
            yMax: this.courseLength,
            xScaleID: "x-axis-0",
            yScaleID: "position",
            backgroundColor: "rgba(125, 255, 190, 0.15)",
            drawTime: "beforeDatasetsDraw",
          });
        }

        // Phase annotations
        if (index + step < this.frames.length) {
          const phase = this.getPhase(frame.startPosition);

          if (this.getPhase(this.frames[index + step].startPosition) > phase) {
            annotations.push({
              type: "line",
              label: {
                content: PHASE_NAMES[phase],
                position: "bottom",
                enabled: true,
              },
              mode: "vertical",
              scaleID: "x-axis-0",
              value: label,
              borderColor: "black",
              borderWidth: 2,
              onClick: function () {},
            });
          }
          if (
            this.getSection(this.frames[index + step].startPosition) === 10 &&
            this.getSection(frame.startPosition) === 9
          ) {
            annotations.push({
              type: "line",
              label: {
                content: this.$t("chart.positionKeepEnd"),
                position: "bottom",
                enabled: true,
              },
              mode: "vertical",
              scaleID: "x-axis-0",
              value: label,
              borderColor: "darkgreen",
              borderWidth: 2,
              onClick: function () {},
            });
          }
          const isInFinalCorner = this.isInFinalCorner(
            this.frames[index + step].startPosition
          );
          if (isInFinalCorner && !this.isInFinalCorner(frame.startPosition)) {
            annotations.push({
              type: "line",
              label: {
                content: this.$t("chart.finalCorner"),
                position: "top",
                enabled: true,
                yAdjust: skillYAdjust,
              },
              mode: "vertical",
              scaleID: "x-axis-0",
              value: label,
              borderColor: "maroon",
              borderWidth: 2,
            });
            nextSkillYAdjust(skillYAdjust);
          }
          if (!frame.spurting && this.frames[index + step].spurting) {
            annotations.push({
              type: "line",
              label: {
                content: this.$t("chart.spurt"),
                position: "bottom",
                enabled: true,
                yAdjust: 30,
              },
              mode: "vertical",
              scaleID: "x-axis-0",
              value: label,
              borderColor: "red",
              borderWidth: 2,
              onClick: function () {},
            });
          }
        }
      }

      this.chartOptions = {
        annotation: {
          drawTime: "afterDatasetsDraw",
          events: ["click"],
          annotations,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          yAxes: [
            {
              id: "sp",
              type: "linear",
              position: "left",
              ticks: {
                min: 0,
              },
            },
            {
              id: "speed",
              type: "linear",
              position: "right",
              ticks: {
                min: 15,
                max: 27,
              },
            },
            {
              id: "position",
              type: "linear",
              position: "right",
              ticks: {
                min: -this.courseLength / 10,
              },
            },
          ],
        },
        maintainAspectRatio: false,
      };
      this.chartData = {
        labels: labels,
        datasets: [
          {
            fill: false,
            label: this.$t("chart.hp"),
            yAxisID: "sp",
            borderColor: "rgb(255, 132, 99)",
            data: dataSp,
          },
          {
            fill: false,
            label: this.$t("chart.speed"),
            yAxisID: "speed",
            borderColor: "rgb(30, 21, 155)",
            data: dataSpeed,
          },
          {
            fill: false,
            label: this.$t("chart.position"),
            yAxisID: "position",
            borderColor: "rgb(215, 255, 215)",
            data: dataPosition,
          },
        ],
      };
    },
    getPhase(position) {
      if (position < this.trackDetail.distance / 6.0) {
        return 0;
      } else if (position < (this.trackDetail.distance * 2.0) / 3) {
        return 1;
      } else if (position < (this.trackDetail.distance * 5.0) / 6) {
        return 2;
      } else {
        return 3;
      }
    },
    /**脚色十分專用函數,由於我找不到叫用距離種類的方法,這裏額外提供一種**/
    getDistanceTypeByDis() {
      if (this.trackDetail.distance > 2450) {
        return 4;
      } else if (this.trackDetail.distance > 1850) {
        return 3;
      } else if (this.trackDetail.distance > 1450) {
        return 2;
      } else {
        return 1;
      }
    },
    /*回傳脚色十分脚質距離係數,我是懶狗先hardcode一個,有時間再改*/
    rcp_dis_running_style_coef() {
      this.isDistanceType();

      if (this.getDistanceTypeByDis() === 1) {
        if (this.umaStatus.style === "1") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.SHORT_NIGE;
        }
        if (this.umaStatus.style === "2") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.SHORT_SEN;
        }
        if (this.umaStatus.style === "3") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.SHORT_SASI;
        }
        if (this.umaStatus.style === "4") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.SHORT_OI;
        }
      }
      if (this.getDistanceTypeByDis() === 2) {
        if (this.umaStatus.style === "1") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.MILE_NIGE;
        }
        if (this.umaStatus.style === "2") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.MILE_SEN;
        }
        if (this.umaStatus.style === "3") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.MILE_SASI;
        }
        if (this.umaStatus.style === "4") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.MILE_OI;
        }
      }
      if (this.getDistanceTypeByDis() === 3) {
        if (this.umaStatus.style === "1") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.MIDDLE_NIGE;
        }
        if (this.umaStatus.style === "2") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.MIDDLE_SEN;
        }
        if (this.umaStatus.style === "3") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.MIDDLE_SASI;
        }
        if (this.umaStatus.style === "4") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.MIDDLE_OI;
        }
      }
      if (this.getDistanceTypeByDis() === 4) {
        if (this.umaStatus.style === "1") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.LONG_NIGE;
        }
        if (this.umaStatus.style === "2") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.LONG_SEN;
        }
        if (this.umaStatus.style === "3") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.LONG_SASI;
        }
        if (this.umaStatus.style === "4") {
          return RCP.RELEASE_CONSERVE_POWER_RUNNING_STYLE_COEF_ARR.LONG_OI;
        }
      }
      return 1;
    },
    getSection(position) {
      return Math.floor((position * 24.0) / this.courseLength);
    },
    test() {},
  },
};
</script>

<style scoped>
.main-frame {
  text-align: left;
}

.input-status {
  width: 90px;
}

.emulation-result {
  text-align: center;
}

.emulation-result th {
  padding: 2px;
  min-width: 90px;
}

.emulation-result td {
  padding: 2px;
  min-width: 90px;
}
</style>

<style>
.el-collapse-item__header {
  font-size: large;
  color: blueviolet;
}
</style>
