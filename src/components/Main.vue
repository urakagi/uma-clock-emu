<template>
  <div class="main-frame">
    <el-form class="input-form" :inline="true">
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
          <el-option label="逃げ" value="0"></el-option>
          <el-option label="先行" value="1"></el-option>
          <el-option label="差し" value="2"></el-option>
          <el-option label="追込" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="距離適性">
        <el-select v-model="umaStatus.distanceFit" style="width: 70px;">
          <el-option label="S" value="S"></el-option>
          <el-option label="A" value="A"></el-option>
          <el-option label="B" value="B"></el-option>
          <el-option label="C" value="C"></el-option>
          <el-option label="D" value="D"></el-option>
          <el-option label="E" value="E"></el-option>
          <el-option label="F" value="F"></el-option>
          <el-option label="G" value="G"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="バ場適性">
        <el-select v-model="umaStatus.surfaceFit" style="width: 70px;">
          <el-option label="S" value="S"></el-option>
          <el-option label="A" value="A"></el-option>
          <el-option label="B" value="B"></el-option>
          <el-option label="C" value="C"></el-option>
          <el-option label="D" value="D"></el-option>
          <el-option label="E" value="E"></el-option>
          <el-option label="F" value="F"></el-option>
          <el-option label="G" value="G"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="脚質適性">
        <el-select v-model="umaStatus.styleFit" style="width: 70px;">
          <el-option label="S" value="S"></el-option>
          <el-option label="A" value="A"></el-option>
          <el-option label="B" value="B"></el-option>
          <el-option label="C" value="C"></el-option>
          <el-option label="D" value="D"></el-option>
          <el-option label="E" value="E"></el-option>
          <el-option label="F" value="F"></el-option>
          <el-option label="G" value="G"></el-option>
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
      <el-form-item>
        <el-button @click="exec">エミューレート開始</el-button>
      </el-form-item>
    </el-form>
    <el-divider/>
    <div v-html="log">
    </div>
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
      最高スパート速度：{{ v4.toFixed(2) }}
    </div>
  </div>
</template>

<script>
import MixinCourseData from "@/components/data/MixinCourseData";
import MixinConstants from "@/components/data/MixinConstants";

export default {
  name: "Main",
  mixins: [MixinCourseData, MixinConstants],
  data() {
    return {
      umaStatus: {
        speed: 733,
        stamina: 1073,
        power: 980,
        guts: 1101,
        wisdom: 395,
        condition: '2',
        style: '0',
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
      // Race variables
      log: '',
      frameElapsed: 0,  // 15 frames per second
      position: -5,
      targetSpeed: 0,
      currentSpeed: 3,
      sp: 0,
      startDelay: 0,
      laps: [],
      marks: [],
      spTrace: [],
      spurtParameters: null
    }
  },
  created() {
    this.track.location = Object.keys(this.trackData)[0]
    this.locationChanged(this.track.location)
  },
  mounted() {
    this.exec()
  },
  computed: {
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
      if (this.position < this.trackDetail.distance / 6.0) {
        return 0
      } else if (this.position < this.trackDetail.distance * 2.0 / 3) {
        return 1
      } else if (this.position < this.trackDetail.distance * 5.0 / 6) {
        return 2
      } else {
        return 3
      }
    },
    baseSpeed() {
      return 20 - (this.trackDetail.distance - 2000) / 1000.0
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
    v4() {
      return (this.baseSpeed * (this.styleSpeedCoef[this.umaStatus.style][2] + 0.01) +
          Math.sqrt(this.modifiedSpeed / 500) * this.distanceFitSpeedCoef[this.umaStatus.distanceFit]) *
          1.05 + Math.sqrt(500 * this.modifiedSpeed) *
          this.distanceFitSpeedCoef[this.umaStatus.distanceFit] * 0.002
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
    }
  },
  methods: {
    locationChanged(location) {
      this.courseList = this.trackData[location]
      this.track.course = Object.keys(this.courseList)[0]
    },
    getEqualStamina(value) {
      return Math.floor(this.spMax * value / 10000.0 / 0.8 / this.styleSpCoef[this.umaStatus.style])
    },
    exec: function () {
      this.log = ''
      this.frameElapsed = 0
      this.position = -5
      this.currentSpeed = 3
      this.sp = this.spMax
      this.laps = []
      this.marks = []
      this.spTrace = []
      this.spurtParameter = {}
      this.start()
    },
    start: function () {
      const startDelay = Math.random() * 0.1
      this.log += `ゲートを出るまでの時間：${startDelay.toFixed(3)}s<br>`
      this.laps.push(0)
      this.marks.push(this.position)
      this.spTrace.push(this.spMax)
      this.progressRace()
    },
    progressRace() {
      while (this.position < this.trackDetail.distance) {
        this.frameElapsed++
        if (this.currentSpeed < this.v0) {
          this.moveStart()
        } else if (this.currentPhase === 0) {
          this.movePhase0()
        } else if (this.currentPhase === 1) {
          this.movePhase1()
        } else {
          this.movePhase23()
        }
      }
    },
    moveStart() {
      this.accelerate(this.v0, this.a0, 'スタート加速終了')
    },
    movePhase0() {
      if (this.currentSpeed < this.v1) {
        this.accelerate(this.v1, this.a1, '序盤加速終了')
      } else {
        this.cruise(this.v1)
      }
      if (this.currentPhase === 1) {
        const lap = this.updateLap()
        this.log += `序盤巡航終了：速度${this.currentSpeed.toFixed(2)}で${lap.time.toFixed(2)}s走行／移動距離${lap.distance.toFixed(1)}m／消耗耐力${lap.spUsed.toFixed(1)}<br>`
      }
    },
    movePhase1() {
      if ((this.currentSpeed < this.v2 && this.a2 > 0) || (this.currentSpeed > this.v2 && this.a2 < 0)) {
        this.accelerate(this.v2, this.a2, '中盤加速終了')
      } else {
        this.cruise(this.v2)
      }
      if (this.currentPhase === 2) {
        const lap = this.updateLap()
        this.log += `中盤巡航終了：速度${this.currentSpeed.toFixed(2)}で${lap.time.toFixed(2)}s走行／移動距離${lap.distance.toFixed(1)}m／消耗耐力${lap.spUsed.toFixed(1)}<br>`
        this.spurtParameters = this.calcSpurtParameter()
      }
    },
    movePhase23() {
      if (this.sp <= 0) {
        this.moveMinSpeed()
      } else if (this.position + this.spurtParameters.distance < this.trackDetail.distance) {
        this.moveNonSpurt()
      } else {
        this.moveSpurt()
      }
      if (this.sp <= 0 && this.spTrace[this.spTrace.length - 1] > 0) {
        const lap = this.updateLap()
        this.log += `スタミナ尽きるまで速度${this.currentSpeed.toFixed(2)}で${lap.time.toFixed(2)}s走行／移動距離${lap.distance.toFixed(1)}m／消耗耐力${lap.spUsed.toFixed(1)}<br>`
      }
    },
    moveNonSpurt() {
      if (this.currentSpeed < this.v3) {
        this.accelerate(this.v3, this.a3, '終盤加速終了')
      } else {
        this.cruise(this.spurtParameters.speed)
        if (this.position + this.spurtParameters.distance >= this.trackDetail.distance) {
          const lap = this.updateLap()
          this.log += `終盤巡航終了：速度${this.currentSpeed.toFixed(2)}で${lap.time.toFixed(2)}s走行／移動距離${lap.distance.toFixed(1)}m／消耗耐力${lap.spUsed.toFixed(1)}<br>`
        }
      }
    },
    moveSpurt() {
      if (this.currentSpeed < this.spurtParameters.speed) {
        this.accelerate(this.spurtParameters.speed, this.a3, 'スパート加速終了')
      } else {
        this.cruise(this.spurtParameters.speed)
        if (this.position >= this.trackDetail.distance) {
          const lap = this.updateLap(true)
          this.log += `ゴール！速度${this.currentSpeed.toFixed(2)}で${lap.time.toFixed(2)}sスパート、移動距離${lap.distance.toFixed(1)}m／消耗耐力${lap.spUsed.toFixed(1)}<br>`
          this.goal()
        }
      }
    },
    moveMinSpeed() {
      if (this.currentSpeed > this.vMin) {
        this.accelerate(this.vMin, -1.2, '失速減速終了')
      } else {
        this.cruise(this.vMin)
      }
      console.log('ls', this.position)
      if (this.position >= this.trackDetail.distance) {
        const lap = this.updateLap(true)
        this.log += `ゴール！失速で${lap.time.toFixed(2)}s走行、移動距離${lap.distance.toFixed(1)}m<br>`
        this.goal()
      }
    },
    accelerate(v, a, lapLog) {
      const startSpeed = this.currentSpeed
      this.currentSpeed += a / 15.0
      if ((this.currentSpeed >= v && a >= 0) || (this.currentSpeed <= v && a < 0)) {
        const accTime = (v - startSpeed) / a
        this.currentSpeed = v
        this.position += (startSpeed + v) * accTime / 2.0
        this.sp -= 20 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
            Math.pow((this.currentSpeed + startSpeed) / 2 - this.baseSpeed + 12, 2) / 144 * accTime

        const time = (this.frameElapsed - 1) / 15.0 + accTime
        let distance
        let lap
        let spUsed
        distance = this.position - this.marks[this.marks.length - 1]
        lap = time - this.laps[this.laps.length - 1]
        spUsed = this.spTrace[this.spTrace.length - 1] - this.sp
        this.log += `${lapLog}：消費${lap.toFixed(2)}s／移動距離${distance.toFixed(1)}m／消耗耐力${spUsed.toFixed(1)}<br>`
        this.laps.push(time)
        this.marks.push(this.position)
        this.spTrace.push(this.sp)
        this.position += (1 / 15.0 - accTime) * v
        this.sp -= 20 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
            Math.pow(this.currentSpeed - this.baseSpeed + 12, 2) / 144 *
            (0.66667 - accTime)
      } else {
        this.position += (startSpeed + this.currentSpeed) / 30.0
        let consume = 20 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
            (
                (Math.pow(a / 15.0 + startSpeed - this.baseSpeed + 12, 3) -
                    Math.pow(startSpeed - this.baseSpeed + 12, 3)
                ) / (432 * a)
            )
        if (this.currentPhase >= 2) {
          consume *= this.spurtSpCoef
        }
        this.sp -= consume
      }
    },
    cruise(v) {
      this.position += v / 15.0
      this.sp -= this.consumePerSecond(this.currentSpeed, this.currentPhase) / 15.0
    },
    calcSpurtParameter() {
      this.log += `残り耐力${this.sp.toFixed(1)}／`
      const maxDistance = this.trackDetail.distance / 3.0
      const maxConsume = this.consumePerSecond(this.v4, 2)
      const time = maxDistance / this.v4
      const totalConsume = time * maxConsume
      if (this.sp >= totalConsume) {
        this.log += `最長最速スパート可能(${maxDistance.toFixed(1)}m)<br>`
        return {
          distance: maxDistance,
          speed: this.v4
        }
      }
      // SPが足りない場合の処理
      const candidates = []
      const consumePerMeterV3 = this.consumePerSecond(this.v3, 2) / this.v3
      const totalConsumeV3 = maxDistance * consumePerMeterV3
      const excessSp = this.sp - totalConsumeV3
      if (excessSp < 0) {
        const distanceLeft = this.sp / consumePerMeterV3
        this.log += `耐力枯渇、残り走行可能距離${distanceLeft.toFixed(1)}m／失速距離${(maxDistance - distanceLeft).toFixed(1)}m<br>`
        return {
          distance: maxDistance,
          speed: this.a3
        }
      }
      this.log += `耐力不足、割当可能耐力${excessSp.toFixed(1)}`
      for (let v = this.v4 - 0.1; v >= this.v3; v -= 0.1) {
        const consumePerMeterV = this.consumePerSecond(v, 2) / v
        const distanceV = Math.min(excessSp / (consumePerMeterV - consumePerMeterV3), maxDistance)
        candidates.push({
          distance: distanceV,
          speed: v,
          time: distanceV / v + (maxDistance - distanceV) / this.v3
        })
      }
      candidates.sort((a, b) => {
        return a.time - b.time
      })
      for (const i in candidates) {
        const c = candidates[i]
        if (Math.random() * 100 < 15 + 0.05 * this.modifiedWisdom) {
          this.log += `<br>第${parseInt(i) + 1}順位採用／スパート距離${c.distance.toFixed(1)}m／速度${c.speed.toFixed(2)}／${(c.time - time).toFixed(2)}s遅れ<br>`
          return c
        }
      }
      this.log += `／最低順位採用<br>`
      return candidates[candidates.length - 1]
    },
    consumePerSecond(v, phase) {
      let ret = 20.0 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
          Math.pow(v - this.baseSpeed + 12, 2) / 144
      if (phase >= 2) {
        ret *= this.spurtSpCoef
      }
      return ret
    },
    updateLap(isGoal) {
      let time = this.frameElapsed / 15.0 - this.laps[this.laps.length - 1]
      let distance = this.position - this.marks[this.marks.length - 1]
      let spUsed = this.spTrace[this.spTrace.length - 1] - this.sp

      // ゴールした瞬間に巻き戻す
      if (isGoal) {
        const over = this.position - this.trackDetail.distance
        const overTime = over / this.currentSpeed
        time -= overTime
        distance -= over
        spUsed += this.consumePerSecond(this.currentSpeed, this.currentPhase) * overTime
      }

      this.laps.push(this.frameElapsed / 15.0)
      this.marks.push(this.position)
      this.spTrace.push(this.sp)
      return {time, distance, spUsed}
    },
    goal() {
      const raceTime = this.secondToDisplayTime(this.laps[this.laps.length - 1] + this.startDelay)
      let displayTime = this.secondToDisplayTime((this.laps[this.laps.length - 1] + this.startDelay) * 1.18)
      displayTime = displayTime.substring(0, displayTime.length - 1)
      this.log += `レース時間${raceTime}／ゲーム表示時間${displayTime}／余剰耐力${this.sp.toFixed(1)}<br>`
    },
    secondToDisplayTime(time) {
      const min = Math.floor(time / 60)
      const sec = Math.floor(time) % 60
      const decimal = time - Math.floor(time)
      return `${min}:${sec}.${Math.floor(decimal * 100)}`
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
</style>