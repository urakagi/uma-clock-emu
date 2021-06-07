<template>
  <div class="main-frame">
    <el-form class="input-form" :inline="true">
      <el-form-item>
        <el-button @click="saveUma">セーブ</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="umaToLoad" placeholder="保存済みウマ娘">
          <el-option v-for="(data, key) in savedUmas" :label="key" :value="key" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="loadUma">ロード</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
            confirm-button-text="はい"
            cancel-button-text="いいえ"
            title="削除しますか？"
            trigger="click"
            @confirm="removeUma"
        >
          <el-button slot="reference">削除</el-button>
        </el-popconfirm>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
            confirm-button-text="はい"
            cancel-button-text="いいえ"
            title="リセットしますか？"
            trigger="click"
            @confirm="resetUma"
        >
          <el-button slot="reference">リセット</el-button>
        </el-popconfirm>
      </el-form-item>
      <br>
      <el-form-item label="スピード">
        <el-input v-model="umaStatus.speed" class="input-status"></el-input>
      </el-form-item>
      <el-form-item label="スタミナ">
        <el-input v-model="umaStatus.stamina" class="input-status"></el-input>
      </el-form-item>
      <el-form-item label="パワー">
        <el-input v-model="umaStatus.power" class="input-status"></el-input>
      </el-form-item>
      <el-form-item label="根性">
        <el-input v-model="umaStatus.guts" class="input-status"></el-input>
      </el-form-item>
      <el-form-item label="賢さ">
        <el-input v-model="umaStatus.wisdom" class="input-status"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="脚質">
        <el-select v-model="umaStatus.style" style="width: 100px;">
          <el-option label="逃げ" value="1"></el-option>
          <el-option label="先行" value="2"></el-option>
          <el-option label="差し" value="3"></el-option>
          <el-option label="追込" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="距離適性">
        <el-select v-model="umaStatus.distanceFit" style="width: 70px;">
          <el-option v-for="rank in fitRanks" :label="rank" :value="rank" :key="rank"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="バ場適性">
        <el-select v-model="umaStatus.surfaceFit" style="width: 70px;">
          <el-option v-for="rank in fitRanks" :label="rank" :value="rank" :key="rank"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="脚質適性">
        <el-select v-model="umaStatus.styleFit" style="width: 70px;">
          <el-option v-for="rank in fitRanks" :label="rank" :value="rank" :key="rank"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="調子">
        <el-select v-model="umaStatus.condition" style="width: 110px;">
          <el-option label="絶好調" value="0"></el-option>
          <el-option label="好調" value="1"></el-option>
          <el-option label="普通" value="2"></el-option>
          <el-option label="不調" value="3"></el-option>
          <el-option label="絶不調" value="4"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="コース">
        <el-select v-model="track.location" @change="locationChanged" style="width: 120px;">
          <el-option label="京都" value="kyoto"></el-option>
        </el-select>
        <el-select v-model="track.course" style="width: 170px;">
          <el-option
              v-for="(obj, key) in courseList"
              :label="obj.name"
              :value="key"
              :key="key"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="バ場状態">
        <el-select v-model="track.surfaceCondition" style="width: 90px;">
          <el-option label="良" value="0"></el-option>
          <el-option label="稍重" value="1"></el-option>
          <el-option label="重" value="2"></el-option>
          <el-option label="不良" value="3"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-collapse v-model="skillGroups">
        <el-collapse-item v-for="menu in skillMenu" :title="menu.title" :name="menu.type" :key="menu.title">
          <div v-for="rarity in rarities" :key="menu.type + rarity">
            <h3 v-if="availableSkills[menu.type][rarity].length > 0">{{ rarityString[rarity] }}</h3>
            <el-checkbox-group v-model="hasSkills[menu.type][rarity]">
              <el-tooltip
                  v-for="skill in availableSkills[menu.type][rarity]"
                  :key="skill.name"
                  :content="skill.tooltip"
                  :disabled="!('tooltip' in skill)"
              >
                <el-checkbox-button :label="skill.index">
                  {{ skill.name }}
                </el-checkbox-button>
              </el-tooltip>
            </el-checkbox-group>
          </div>
        </el-collapse-item>
      </el-collapse>
      <br>
      <el-form-item>
        <el-button @click="exec" type="success" v-loading.fullscreen.lock="emulating">エミューレート開始(100回)</el-button>
      </el-form-item>
    </el-form>
    <div>
      <h3>時計統計</h3>
      <table border="1" class="emulation-result">
        <tr>
          <th></th>
          <th>ゲーム表記</th>
          <th>実タイム</th>
          <th>標準偏差</th>
          <th>ベスト</th>
          <th>ワースト</th>
        </tr>
        <tr>
          <th>平均</th>
          <td>{{ formatTime(avgDisplayTime, 1) }}</td>
          <td>{{ formatTime(avgRaceTime, 2) }}</td>
          <td>{{ timeStandardDeviation.toFixed(3) }}</td>
          <td>{{ formatTime(bestTime, 2) }}</td>
          <td>{{ formatTime(worstTime, 2) }}</td>
        </tr>
        <tr>
          <th>最大ｽﾊﾟｰﾄ</th>
          <td>{{ formatTime(avgDisplayTimeMaxSpurt, 1) }}</td>
          <td>{{ formatTime(avgRaceTimeMaxSpurt, 2) }}</td>
          <td>{{ timeStandardDeviationMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeMaxSpurt, 2) }}</td>
          <td>{{ formatTime(worstTimeMaxSpurt, 2) }}</td>
        </tr>
        <tr>
          <th>非最大ｽﾊﾟｰﾄ</th>
          <td>{{ formatTime(avgDisplayTimeNotMaxSpurt, 1) }}</td>
          <td>{{ formatTime(avgRaceTimeNotMaxSpurt, 2) }}</td>
          <td>{{ timeStandardDeviationNotMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeNotMaxSpurt, 2) }}</td>
          <td>{{ formatTime(worstTimeNotMaxSpurt, 2) }}</td>
        </tr>
      </table>
      <h3>スパート平均</h3>
      <table border="1" class="emulation-result">
        <tr>
          <th>最大スパート率</th>
          <th>最大時耐力余剰</th>
          <th>非最大時不足分</th>
        </tr>
        <tr>
          <td>{{ maxSpurtRate }}%</td>
          <td>{{ maxSpurtSPLeft }}</td>
          <td>{{ nonMaxSpurtSPLack }}</td>
        </tr>
      </table>
    </div>
    <el-divider/>
    <race-graph :chart-data="chartData" :options="chartOptions"/>
    <el-divider/>
    <div>
      補正後：スピード{{ modifiedSpeed }} ／スタミナ{{ modifiedStamina }} ／パワー{{ modifiedPower }} ／根性{{ modifiedGuts }}
      ／賢さ{{ modifiedWisdom }}
    </div>
    <div>
      初期耐力：{{ spMax }}／金回復≒{{ getEqualStamina(550) }}スタミナ／白回復≒{{
        getEqualStamina(150)
      }}スタミナ／終盤耐力消耗係数：{{ spurtSpCoef.toFixed(3) }}
    </div>
    <div>
      スキル発動率：{{ skillActivateRate.toFixed(1) }}％／掛かり率：{{ temperamentRate.toFixed(1) }}％
    </div>
    <div>
      スタート目標速度：{{ v0.toFixed(2) }}／スタート加速度：{{ a0.toFixed(3) }}
    </div>
    <div>
      序盤目標速度：{{ v1.toFixed(2) }}／序盤加速度：{{ a1.toFixed(3) }} ｜
      中盤目標速度：{{ v2.toFixed(2) }}／中盤加速度：{{ a2.toFixed(3) }}
    </div>
    <div>
      終盤目標速度：{{ v3.toFixed(2) }}／終盤加速度：{{ a3.toFixed(3) }} ｜
      最高スパート速度：{{ maxSpurtSpeed.toFixed(2) }}
    </div>
  </div>
</template>

<script>
import MixinCourseData from "@/components/data/MixinCourseData";
import MixinConstants from "@/components/data/MixinConstants";
import MixinSkills from "@/components/data/MixinSkills";
import RaceGraph from "@/components/RaceGraph";

const EPOCH = 1

export default {
  name: "Main",
  components: {RaceGraph},
  mixins: [MixinCourseData, MixinConstants, MixinSkills],
  data() {
    return {
      umaStatus: {
        speed: 1000,
        stamina: 1100,
        power: 1000,
        guts: 1000,
        wisdom: 1000,
        condition: '2',
        style: '1',
        distanceFit: 'A',
        surfaceFit: 'A',
        styleFit: 'A'
      },
      track: {
        location: '',
        course: '',
        surfaceCondition: '0'
      },
      courseList: [],
      // Results
      emulations: [],
      // Race variables
      events: [],
      sectionTargetSpeedRandoms: [],
      frameElapsed: 0,  // 15 frames per second
      position: 0,
      currentSpeed: 3,
      sp: 0,
      operatingSkills: {speed: [], targetSpeed: [], acceleration: []},
      frames: [],
      startDelay: 0,
      laps: [],
      marks: [],
      spTrace: [],
      spurtParameters: null,
      // UI
      skillGroups: '',
      emulating: false,
      savedUmas: {},
      umaToLoad: null,
      chartData: {},
      chartOptions: {},
      // Constants
      fitRanks: ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
    }
  },
  created() {
    this.track.location = Object.keys(this.trackData)[0]
    this.locationChanged(this.track.location)
  },
  mounted() {
    this.updateSavedUmas()
    // FIXME: For debug
    this.umaToLoad = 'test'
    this.loadUma()
    this.exec()
  },
  computed: {
    footStyle() {
      return parseInt(this.umaStatus.style)
    },
    trackDetail() {
      if (!this.track.location) {
        return {distance: 0, surface: 'turf'}
      }
      return this.trackData[this.track.location][this.track.course]
    },
    modifiedSpeed() {
      return this.umaStatus.speed * this.condCoef[this.umaStatus.condition]
          + this.surfaceSpeedModify[this.trackDetail.surface][this.track.surfaceCondition]
    },
    modifiedStamina() {
      return this.umaStatus.stamina * this.condCoef[this.umaStatus.condition]
    },
    modifiedPower() {
      return this.umaStatus.power * this.condCoef[this.umaStatus.condition]
          + this.surfacePowerModify[this.trackDetail.surface][this.track.surfaceCondition]
    },
    modifiedGuts() {
      return this.umaStatus.guts * this.condCoef[this.umaStatus.condition]
    },
    modifiedWisdom() {
      return this.umaStatus.wisdom * this.condCoef[this.umaStatus.condition]
          * this.styleFitCoef[this.umaStatus.styleFit]
    },
    spMax() {
      return this.trackDetail.distance + 0.8 * this.modifiedStamina * this.styleSpCoef[this.umaStatus.style]
    },
    spurtSpCoef() {
      return 1 + 200 / Math.sqrt(600 * this.modifiedGuts)
    },
    skillActivateRate() {
      return 100 - 9000.0 / this.umaStatus.wisdom
    },
    temperamentRate() {
      return Math.pow(6.5 / (Math.log10(0.1 * this.modifiedWisdom + 1)), 2)
    },
    currentPhase() {
      return this.getPhase(this.position)
    },
    currentSection() {
      return Math.floor(this.position * 24.0 / this.courseLength)
    },
    baseSpeed() {
      return 20 - (this.trackDetail.distance - 2000) / 1000.0
    },
    targetSpeed() {
      // 耐力枯渇
      if (this.sp <= 0) {
        return this.vMin
      }
      // スタート時
      // 他に0.85倍の基準速度を下回る可能性がない（耐力枯渇してもこれよりは高い）
      if (this.currentSpeed < 0.85 * this.baseSpeed) {
        return 0.85 * this.baseSpeed
      }
      // スパート中
      if (this.spurtParameters
          && (this.position + this.spurtParameters.distance >= this.courseLength)) {
        return this.spurtParameters.speed
      }
      let baseTargetSpeed
      switch (this.currentPhase) {
        case 0:
        case 1:
          baseTargetSpeed = this.baseSpeed * this.styleSpeedCoef[this.umaStatus.style][this.currentPhase]
          break
        case 2:
        case 3:
        default:
          baseTargetSpeed = this.baseSpeed * this.styleSpeedCoef[this.umaStatus.style][2] +
              Math.sqrt(this.modifiedSpeed / 500.0) * this.distanceFitSpeedCoef[this.umaStatus.distanceFit]
          break
      }
      let ret = baseTargetSpeed * (1 + this.sectionTargetSpeedRandoms[this.currentSection])
      for (const skill of this.operatingSkills.targetSpeed) {
        ret += skill.data.value
      }
      return ret
    },
    acceleration() {
      const c = this.isInSlope('up') ? 0.0004 : 0.0006
      let ret = c * Math.sqrt(500 * this.modifiedPower)
          * this.styleAccelerateCoef[this.umaStatus.style][this.currentPhase]
          * this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit]
          * this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
      // スタート時加算
      if (this.currentSpeed < 0.85 * this.baseSpeed) {
        ret += 24
      }
      for (const skill of this.operatingSkills.acceleration) {
        ret += skill.data.value
      }
      return ret
    },
    deceleration() {
      if (this.sp <= 0) {
        return -1.2
      }
      switch (this.currentPhase) {
        case 0:
          return -1.2
        case 1:
          return -0.8
        case 2:
        default:
          return -1.0
      }
    },
    maxSpurtSpeed() {
      return (this.baseSpeed * (this.styleSpeedCoef[this.umaStatus.style][2] + 0.01) +
          Math.sqrt(this.modifiedSpeed / 500) * this.distanceFitSpeedCoef[this.umaStatus.distanceFit]) *
          1.05 + Math.sqrt(500 * this.modifiedSpeed) *
          this.distanceFitSpeedCoef[this.umaStatus.distanceFit] * 0.002
    },
    v0() {
      return 0.85 * this.baseSpeed
    },
    v1() {
      return this.baseSpeed * (this.styleSpeedCoef[this.umaStatus.style][0] +
          (this.modifiedWisdom * Math.log10(this.modifiedWisdom / 10)) / 550000 - 0.00325)
    },
    v2() {
      return this.baseSpeed * (this.styleSpeedCoef[this.umaStatus.style][1] +
          (this.modifiedWisdom * Math.log10(this.modifiedWisdom / 10)) / 550000 - 0.00325)
    },
    v3() {
      return this.baseSpeed * (this.styleSpeedCoef[this.umaStatus.style][2] +
          (this.modifiedWisdom * Math.log10(this.modifiedWisdom / 10)) / 550000 - 0.00325) +
          Math.sqrt(this.modifiedSpeed / 500) * this.distanceFitSpeedCoef[this.umaStatus.distanceFit]
    },
    vMin() {
      return 0.85 * this.baseSpeed + 0.01 * Math.sqrt(this.modifiedGuts * 200)
    },
    a0() {
      return 24 + 0.0006 * Math.sqrt(500 * this.modifiedPower)
          * this.styleAccelerateCoef[this.umaStatus.style][0]
          * this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit]
          * this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
    },
    a1() {
      return 0.0006 * Math.sqrt(500 * this.modifiedPower)
          * this.styleAccelerateCoef[this.umaStatus.style][0]
          * this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit]
          * this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
    },
    a2() {
      if (this.v2 < this.v1) {
        return -0.8
      }
      return 0.0006 * Math.sqrt(500 * this.modifiedPower)
          * this.styleAccelerateCoef[this.umaStatus.style][1]
          * this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit]
          * this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
    },
    a3() {
      return 0.0006 * Math.sqrt(500 * this.modifiedPower)
          * this.styleAccelerateCoef[this.umaStatus.style][2]
          * this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit]
          * this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
    },
    skillMenu() {
      const TITLE_TYPE = {
        heal: '回復スキル',
        targetSpeed: '速度スキル',
        acceleration: '加速度スキル',
        speed: '喰らう減速スキル',
        fatigue: '喰らう疲労スキル'
      }
      const ret = []
      for (const type in this.skills) {
        ret.push({
          title: TITLE_TYPE[type],
          type
        })
      }
      return ret
    },
    avgDisplayTime() {
      return this.calcAvg('all', 'displayTime')
    },
    avgRaceTime() {
      return this.calcAvg('all', 'raceTime')
    },
    avgDisplayTimeMaxSpurt() {
      return this.calcAvg('max', 'displayTime')
    },
    avgRaceTimeMaxSpurt() {
      return this.calcAvg('max', 'raceTime')
    },
    avgDisplayTimeNotMaxSpurt() {
      return this.calcAvg('notMax', 'displayTime')
    },
    avgRaceTimeNotMaxSpurt() {
      return this.calcAvg('notMax', 'raceTime')
    },
    bestTime() {
      return this.pickEdge('all', 'raceTime', 'best')
    },
    worstTime() {
      return this.pickEdge('all', 'raceTime', 'worst')
    },
    bestTimeMaxSpurt() {
      return this.pickEdge('max', 'raceTime', 'best')
    },
    worstTimeMaxSpurt() {
      return this.pickEdge('max', 'raceTime', 'worst')
    },
    bestTimeNotMaxSpurt() {
      return this.pickEdge('notMax', 'raceTime', 'best')
    },
    worstTimeNotMaxSpurt() {
      return this.pickEdge('notMax', 'raceTime', 'worst')
    },
    timeStandardDeviation() {
      return this.calcStdDev('all', 'raceTime')
    },
    timeStandardDeviationMaxSpurt() {
      return this.calcStdDev('max', 'raceTime')
    },
    timeStandardDeviationNotMaxSpurt() {
      return this.calcStdDev('notMax', 'raceTime')
    },
    maxSpurtRate() {
      if (this.emulations.length === 0) {
        return '-'
      }
      let maxSpurt = 0
      for (const e of this.emulations) {
        if (e.maxSpurt) maxSpurt++
      }
      return (100.0 * maxSpurt / this.emulations.length).toFixed(1)
    },
    maxSpurtSPLeft() {
      if (this.emulations.length === 0) {
        return '-'
      }
      let sum = 0.0
      let count = 0
      for (const e of this.emulations) {
        if (e.maxSpurt) {
          sum += e.spDiff
          count++
        }
      }
      if (count === 0) {
        return '-'
      }
      return (sum / count).toFixed(1)
    },
    nonMaxSpurtSPLack() {
      if (this.emulations.length === 0) {
        return '-'
      }
      let sum = 0.0
      let count = 0
      for (const e of this.emulations) {
        if (!e.maxSpurt) {
          sum += e.spDiff
          count++
        }
      }
      if (count === 0) {
        return '-'
      }
      return (-sum / count).toFixed(1)
    }
  },
  methods: {
    locationChanged(location) {
      this.courseList = this.trackData[location]
      this.track.course = Object.keys(this.courseList)[0]
    }, getEqualStamina(value) {
      return Math.floor(this.spMax * value / 10000.0 / 0.8 / this.styleSpCoef[this.umaStatus.style])
    },
    exec: function () {
      this.emulating = true
      this.emulations = []
      setTimeout(() => {
        for (let epoch = 0; epoch < EPOCH; epoch++) {
          this.start()
        }
        this.emulating = false
      }, 100)
    },
    start: function () {
      this.resetRace()
      const startDelay = Math.random() * 0.1
      this.pushEvent('start', this.start)
      this.startDelay = startDelay
      this.laps.push(0)
      this.marks.push(this.position)
      this.spTrace.push(this.spMax)
      this.initializeSkills()
      this.progressRace()
    },
    resetRace() {
      this.events = []
      this.frameElapsed = 0
      this.position = 0
      this.currentSpeed = 3
      this.operatingSkills = {
        speed: [],
        targetSpeed: [],
        acceleration: []
      }
      this.sectionTargetSpeedRandoms = this.initSectionTargetSpeedRandoms()
      this.sp = this.spMax
      delete this.frames
      this.frames = [{skills: []}]
      this.laps = []
      this.marks = []
      this.spTrace = []
      this.spurtParameters = null
    },
    pushEvent(name, value) {
      this.events.push({
        position: this.position,
        name,
        value
      })
    },
    progressRace() {
      while (this.position < this.courseLength) {
        const startPosition = this.position
        const startSp = this.sp
        const startPhase = this.currentPhase
        this.frames[this.frameElapsed].speed = this.currentSpeed
        this.frames[this.frameElapsed].sp = this.sp
        this.frames[this.frameElapsed].startPosition = startPosition
        this.move()
        this.frames[this.frameElapsed].movement = this.position - startPosition
        this.frames[this.frameElapsed].consume = this.sp - startSp
        this.frameElapsed++

        // 終盤入り・ラストスパート計算
        if (startPhase === 1 && this.currentPhase === 2) {
          this.spurtParameters = this.calcSpurtParameter()
        }

        if (this.position >= this.courseLength) {
          break
        }
        // Calculate target speed of next frame and do heal/fatigue
        const skillTriggered = this.checkSkillTrigger(startPosition)
        const spurting = this.spurtParameters != null &&
            this.position + this.spurtParameters.distance >= this.courseLength
        this.frames.push({
          skills: skillTriggered,
          spurting
        })

        // Remove overtime skills
        for (let i = 0; i < this.operatingSkills.length; i++) {
          if ((this.frameElapsed - this.operatingSkills[i].startFrame) * this.frameLength
              > this.operatingSkills[i].skill.duration * this.timeCoef) {
            this.operatingSkills.splice(i, 1)
            i-- // Without this line, the original next element will be skipped
          }
        }
      }
      this.goal()
    },
    move() {
      const diff = this.targetSpeed - this.currentSpeed
      const startSpeed = this.currentSpeed
      const changeRate = diff >= 0 ? this.acceleration : this.deceleration
      let changeTime = diff / changeRate
      if (changeTime > this.frameLength) {
        changeTime = this.frameLength
      }
      const staticTime = this.frameLength - changeTime
      const endSpeed = startSpeed + changeTime * changeRate

      // 減速スキル分
      let realStartSpeed = startSpeed
      let realEndSpeed = endSpeed
      for (const skill of this.operatingSkills.speed) {
        realStartSpeed += skill.data.value
        realEndSpeed += skill.data.value
      }

      // 移動距離及び耐力消耗を算出
      // 速度変化中の分
      const movementChanging = (realStartSpeed + realEndSpeed) * changeTime / 2.0
      const consumeChanging = this.consumePerSecondChanging(realStartSpeed, realEndSpeed,
          changeRate, this.currentPhase)
      // 速度変化終了後の分
      const movementStatic = realEndSpeed * staticTime
      const consumeStatic = this.consumePerSecond(realEndSpeed, this.currentPhase) * staticTime

      // 反映させる
      this.currentSpeed = endSpeed
      this.position += movementChanging + movementStatic
      this.sp -= consumeChanging + consumeStatic
    },
    calcSpurtParameter() {
      const maxDistance = this.trackDetail.distance / 3.0
      const spurtDistance = this.calcSpurtDistance(this.maxSpurtSpeed)
      const totalConsume = this.calcRequiredSp(this.maxSpurtSpeed)
      if (spurtDistance >= maxDistance) {
        return {
          distance: maxDistance,
          speed: this.maxSpurtSpeed,
          spDiff: this.sp - totalConsume
        }
      }
      // SPが足りない場合の処理
      const candidates = []
      const totalConsumeV3 = this.calcRequiredSp(this.v3)
      const excessSp = this.sp - totalConsumeV3
      if (excessSp < 0) {
        return {
          distance: 0,
          speed: this.v3,
          spDiff: this.sp - totalConsume
        }
      }
      for (let v = this.maxSpurtSpeed - 0.1; v >= this.v3; v -= 0.1) {
        let distanceV = this.calcSpurtDistance(v)
        if (distanceV >= maxDistance) {
          distanceV = maxDistance
        }
        candidates.push({
          distance: distanceV,
          speed: v,
          time: distanceV / v + (maxDistance - distanceV) / this.v3,
          spDiff: this.sp - totalConsume
        })
      }
      candidates.sort((a, b) => {
        return a.time - b.time
      })
      for (const i in candidates) {
        candidates[i].order = parseInt(i) + 1
        const c = candidates[i]
        if (Math.random() * 100 < 15 + 0.05 * this.modifiedWisdom) {
          return c
        }
      }
      return candidates[candidates.length - 1]
    },
    calcSpurtDistance(v) {
      return (this.sp - (this.courseLength / 3.0 - 60) * 20 *
          this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
          this.spurtSpCoef * Math.pow(this.v3 - this.baseSpeed + 12, 2) / 144 / this.v3) / (
          20 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
          this.spurtSpCoef * (Math.pow(v - this.baseSpeed + 12, 2) / 144 / v -
          Math.pow(this.v3 - this.baseSpeed + 12, 2) /
          144 / this.v3)) + 60
    },
    calcRequiredSp(v) {
      return (this.courseLength / 3.0 - 60) * 20 *
          this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
          this.spurtSpCoef * Math.pow(this.v3 - this.baseSpeed + 12, 2) / 144 / this.v3 + (
              this.courseLength / 3.0 - 60) * (
              20 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
              this.spurtSpCoef * (Math.pow(v - this.baseSpeed + 12, 2) / 144 / v -
              Math.pow(this.v3 - this.baseSpeed + 12, 2) /
              144 / this.v3))
    },
    consumePerSecond(v, phase) {
      let ret = 20.0 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
          Math.pow(v - this.baseSpeed + 12, 2) / 144
      if (phase >= 2) {
        ret *= this.spurtSpCoef
      }
      return ret
    },
    consumePerSecondChanging(startSpeed, endSpeed, changeRate, phase) {
      let ret = 20.0 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
          (Math.pow(endSpeed - this.baseSpeed + 12, 3) - Math.pow(startSpeed - this.baseSpeed + 12, 3)) /
          (3 * changeRate) / 144
      if (phase >= 2) {
        ret *= this.spurtSpCoef
      }
      return ret
    },
    isInSlope(direction) {
      for (const slope of this.trackDetail[`${direction}Slope`]) {
        if (this.position >= this.toPosition(slope.start)
            && this.position <= this.toPosition(slope.end)
            && this.slopePercentage(slope)) {
          return true
        }
      }
      return false
    },
    goal() {
      const raceTime = this.frameElapsed * this.frameLength + this.startDelay
      const displayTime = raceTime * 1.18

      // FIXME: Change to pick some
      this.updateChart()

      const emu = {
        raceTime, displayTime,
        maxSpurt: this.spurtParameters.speed === this.maxSpurtSpeed,
        spDiff: this.spurtParameters.spDiff
      }
      this.emulations.push(emu)
    },
    formatTime(time, digit) {
      if (time === 0) {
        return '-'
      }
      const min = Math.floor(time / 60)
      let sec = Math.floor(time) % 60
      if (sec < 10) {
        sec = '0' + sec
      }
      let decimal = Math.floor((time - Math.floor(time)) * Math.pow(10, digit))
      for (let d = 1; d < digit; d++) {
        if (parseInt(decimal) < Math.pow(10, d)) {
          decimal = '0' + decimal
        }
      }
      return `${min}:${sec}.${decimal}`
    },
    calcAvg(scope, field) {
      let sum = 0
      let count = 0
      for (const e of this.emulations) {
        if (scope === 'max' && !e.maxSpurt) {
          continue
        } else if (scope === 'notMax' && e.maxSpurt) {
          continue
        }
        sum += e[field]
        count++
      }
      if (count === 0) {
        return 0
      }
      return sum / count
    },
    calcStdDev(scope, field) {
      const avg = this.calcAvg(scope, field)
      let sum = 0
      let count = 0
      for (const e of this.emulations) {
        if (scope === 'max' && !e.maxSpurt) {
          continue
        } else if (scope === 'notMax' && e.maxSpurt) {
          continue
        }
        sum += Math.pow(e[field] - avg, 2)
        count++
      }
      if (count === 0) {
        return 0
      }
      return Math.sqrt(sum / count)
    },
    pickEdge(scope, field, dir) {
      let ret = dir === 'best' ? 999999 : -1
      for (const e of this.emulations) {
        if (scope === 'max' && !e.maxSpurt) {
          continue
        } else if (scope === 'notMax' && e.maxSpurt) {
          continue
        }
        if ((dir === 'best' && e[field] < ret) || (dir === 'worst' && e[field] > ret)) {
          ret = e.raceTime
        }
      }
      if (ret === 999999 || ret < 0) {
        return 0
      }
      return ret
    },
    saveUma() {
      this.$prompt('ウマ名を入力して下さい', '', {
        inputValue: this.umaToLoad,
        confirmButtonText: 'セーブ',
        cancelButtonText: 'キャンセル',
        inputPattern: /.+/,
        inputErrorMessage: '名前を入力して下さい。'
      }).then(({value}) => {
        const umas = JSON.parse(localStorage.getItem('umas') || '{}')
        umas[value] = {
          status: this.umaStatus,
          track: this.track,
          hasSkills: this.hasSkills
        }
        localStorage.setItem('umas', JSON.stringify(umas))
        this.$message({
          type: 'success',
          message: `${value}をセーブしました。`
        })
        this.updateSavedUmas()
        this.umaToLoad = value
      })
    },
    loadUma() {
      const u = this.savedUmas[this.umaToLoad]
      this.umaStatus = u.status
      this.track = u.track
      this.hasSkills = u.hasSkills
      this.$message({
        type: 'success',
        message: `${this.umaToLoad}をロードしました。`
      })
    },
    removeUma() {
      const umas = JSON.parse(localStorage.getItem('umas') || '{}')
      delete umas[this.umaToLoad]
      localStorage.setItem('umas', JSON.stringify(umas))
      this.$message({
        type: 'success',
        message: `${this.umaToLoad}を削除しました。`
      })
      this.updateSavedUmas()
    },
    resetUma() {
      this.resetStatus()
      this.resetTrack()
      this.resetHasSkills()
      this.umaToLoad = ''
    },
    resetStatus() {
      this.umaStatus = {
        speed: null,
        stamina: null,
        power: null,
        guts: null,
        wisdom: null,
        condition: '2',
        style: '1',
        distanceFit: 'A',
        surfaceFit: 'A',
        styleFit: 'A'
      }
    },
    resetTrack() {
      this.track = {
        location: '',
        course: '',
        surfaceCondition: '0'
      }
    },
    initSectionTargetSpeedRandoms() {
      const ret = []
      for (let i = 0; i < 24; i++) {
        const max = (this.modifiedWisdom / 5500.0) * Math.log10(this.modifiedWisdom * 0.1) * 0.01
        ret.push(Math.random() * max - 0.0065)
      }
      return ret
    },
    updateSavedUmas() {
      this.umaToLoad = null
      this.savedUmas = JSON.parse(localStorage.getItem('umas'))
    },
    updateChart() {
      const thiz = this
      const labels = []
      const dataSpeed = []
      const dataSp = []
      const annotations = []
      let skillYAdjust = 0
      let phase = 0
      const PHASE_NAMES = ['←序盤|中盤→', '中盤←|終盤→', 'ﾗｽﾄｽﾊﾟｰﾄ→']
      const SKILL_COLORS = {
        heal: 'cyan',
        speed: 'darkred',
        targetSpeed: 'gold',
        acceleration: 'orange',
        fatigue: 'darkred'
      }
      const step = Math.floor(this.frames.length / 100)
      const mod = this.frames.length % step
      for (let index = mod + step - 1; index < this.frames.length; index += step) {
        const frame = this.frames[index]
        const label = this.formatTime(index * this.frameLength, 1)
        labels.push(label)
        dataSpeed.push(frame.speed)
        dataSp.push(frame.sp)
        // Phase annotations
        if (index + step < this.frames.length) {
          const framePhase = this.getPhase(this.frames[index + step].startPosition)
          if (framePhase > phase) {
            annotations.push({
              type: 'line',
              label: {
                content: PHASE_NAMES[phase],
                position: 'bottom',
                enabled: true
              },
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: label,
              borderColor: 'black',
              borderWidth: 2,
              onClick: function () {
              }
            })
            phase++
          }
          if (!frame.spurting && this.frames[index + step].spurting) {
            annotations.push({
              type: 'line',
              label: {
                content: 'スパート開始',
                position: 'bottom',
                enabled: true,
                yAdjust: 30
              },
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: label,
              borderColor: 'red',
              borderWidth: 2,
              onClick: function () {
              }
            })
          }
        }
        // Skill annotations
        for (let mi = index; mi < index + step && mi < this.frames.length; mi++) {
          for (const skill of this.frames[mi].skills) {
            annotations.push({
              type: 'line',
              label: {
                content: skill.data.name,
                position: 'top',
                enabled: true,
                yAdjust: skillYAdjust
              },
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: label,
              borderColor: SKILL_COLORS[skill.data.type],
              borderWidth: 2,
              onClick: function () {
                if (skill.detail && 'waste' in skill.detail) {
                  if (skill.detail.waste > 0) {
                    thiz.$message(`耐力${(skill.detail.heal).toFixed(1)}回復(${(skill.detail.waste).toFixed(1)}が溢れた)`)
                  } else {
                    thiz.$message(`耐力${(skill.detail.heal).toFixed(1)}回復`)
                  }
                }
              }
            })
            skillYAdjust += 30
            if (skillYAdjust > 60) {
              skillYAdjust = 0
            }
          }
        }
      }

      this.chartOptions = {
        annotation: {
          drawTime: 'afterDatasetsDraw',
          events: ['click'],
          annotations
        },
        elements: {
          point:{
            radius: 0
          }
        },
        scales: {
          yAxes: [{
            id: 'speed',
            type: 'linear',
            position: 'left',
            ticks: {
              min: 15,
              max: 25
            }
          }, {
            id: 'sp',
            type: 'linear',
            position: 'right',
          }]
        }
      }
      this.chartData = {
        labels: labels,
        datasets: [{
          fill: false,
          label: '走行速度',
          yAxisID: 'speed',
          borderColor: 'rgb(30, 21, 155)',
          data: dataSpeed
        }, {
          fill: false,
          label: '耐力',
          yAxisID: 'sp',
          borderColor: 'rgb(255, 132, 99)',
          data: dataSp
        }]
      }
    },
    getPhase(position) {
      if (position < this.trackDetail.distance / 6.0) {
        return 0
      } else if (position < this.trackDetail.distance * 2.0 / 3) {
        return 1
      } else if (position < this.trackDetail.distance * 5.0 / 6) {
        return 2
      } else {
        return 3
      }
    },
    test() {
    }
  }
}
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