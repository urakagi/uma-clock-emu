<template>
  <main-container ref="mainContainer">
    <template v-slot:course>
      <el-form-item :label="$t('message.raceType')">
        <el-select v-model="raceType" style="width: 130px">
          <el-option label="短距離" value="0"></el-option>
          <el-option label="マイル" value="1"></el-option>
          <el-option label="中距離" value="2"></el-option>
          <el-option label="長距離" value="3"></el-option>
          <el-option label="ダート" value="4"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:emulationResult>
      <table border="1" class="emulation-result">
        <tr>
          <th></th>
          <th>{{ $t('message.timeDelta') }}</th>
          <th>{{ $t('message.StandardDeviation') }}</th>
          <th>{{ $t('message.best') }}</th>
          <th>{{ $t('message.worst') }}</th>
          <th>{{ $t('message.realTime') }}</th>
          <th>{{ $t('message.best') }}</th>
          <th>{{ $t('message.worst') }}</th>
        </tr>
        <tr>
          <th>{{ $t('message.avg') }}</th>
          <td>{{ formatTime(avgRaceTimeDelta, 2) }}</td>
          <td>{{ timeDeltaStandardDeviation.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeDelta, 1) }}</td>
          <td>{{ formatTime(worstTimeDelta, 1) }}</td>
          <td>{{ formatTime(avgRaceTime, 2) }}</td>
          <td>{{ formatTime(bestTime, 2) }}</td>
          <td>{{ formatTime(worstTime, 2) }}</td>
        </tr>
        <tr>
          <th>{{ $t('message.MaxSpurt') }}</th>
          <td>{{ formatTime(avgRaceTimeDeltaMaxSpurt, 2) }}</td>
          <td>{{ timeDeltaStandardDeviationMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeDeltaMaxSpurt, 1) }}</td>
          <td>{{ formatTime(worstTimeDeltaMaxSpurt, 1) }}</td>
          <td>{{ formatTime(avgRaceTimeMaxSpurt, 2) }}</td>
          <td>{{ formatTime(bestTimeMaxSpurt, 2) }}</td>
          <td>{{ formatTime(worstTimeMaxSpurt, 2) }}</td>
        </tr>
        <tr>
          <th>{{ $t('message.NotMaxSpurt') }}</th>
          <td>{{ formatTime(avgRaceTimeDeltaNotMaxSpurt, 2) }}</td>
          <td>{{ timeDeltaStandardDeviationNotMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeDeltaNotMaxSpurt, 1) }}</td>
          <td>{{ formatTime(worstTimeDeltaNotMaxSpurt, 1) }}</td>
          <td>{{ formatTime(avgRaceTimeNotMaxSpurt, 2) }}</td>
          <td>{{ formatTime(bestTimeNotMaxSpurt, 2) }}</td>
          <td>{{ formatTime(worstTimeNotMaxSpurt, 2) }}</td>
        </tr>
      </table>
      <ul>
        <li>{{ $t('message.deltaHint') }}</li>
      </ul>
    </template>
  </main-container>
</template>

<script>
import MixinRaceCore from '@/components/MixinRaceCore'
import MixinEmulationResult from '@/components/MixinEmulationResult'
import { DISTANCE, SURFACE } from './data/constants'
import MainContainer from './MainContainer'

export default {
  name: 'TeamRace',
  components: { MainContainer },
  mixins: [MixinRaceCore, MixinEmulationResult],
  data() {
    return {
      emulatorType: 'team',
      raceType: '0',
    }
  },
  computed: {
    coursesByRaceType() {
      const ret = { 0: [], 1: [], 2: [], 3: [], 4: [] }
      for (const location in this.trackData) {
        const courses = this.trackData[location].courses
        for (const cid in courses) {
          const course = courses[cid]
          if (course.surface === 1) {
            // 唯一除外されているのは阪神3200m
            if (cid !== 10914) {
              ret[course.distanceType - 1].push({ location, cid })
            }
          } else {
            if (course.distanceType === 2) {
              ret[4].push({ location, cid })
            }
          }
        }
      }
      return ret
    },
    distanceType() {
      switch (this.raceType) {
        case '0':
          return DISTANCE.SHORT
        case '1':
          return DISTANCE.MILE
        case '2':
          return DISTANCE.MIDDLE
        case '3':
          return DISTANCE.LONG
        case '4':
        default:
          return DISTANCE.MILE
      }
    },
    surfaceType() {
      switch (this.raceType) {
        case '4':
          return SURFACE.DIRT
        default:
          return SURFACE.TURF
      }
    },
    avgRaceTimeDelta() {
      return this.calcAvg('all', 'raceTimeDelta')
    },
    avgRaceTimeDeltaMaxSpurt() {
      return this.calcAvg('max', 'raceTimeDelta')
    },
    avgRaceTimeDeltaNotMaxSpurt() {
      return this.calcAvg('notMax', 'raceTimeDelta')
    },
    bestTimeDelta() {
      return this.pickEdge('all', 'raceTimeDelta', 'best')
    },
    worstTimeDelta() {
      return this.pickEdge('all', 'raceTimeDelta', 'worst')
    },
    bestTimeDeltaMaxSpurt() {
      return this.pickEdge('max', 'raceTimeDelta', 'best')
    },
    worstTimeDeltaMaxSpurt() {
      return this.pickEdge('max', 'raceTimeDelta', 'worst')
    },
    bestTimeDeltaNotMaxSpurt() {
      return this.pickEdge('notMax', 'raceTimeDelta', 'best')
    },
    worstTimeDeltaNotMaxSpurt() {
      return this.pickEdge('notMax', 'raceTimeDelta', 'worst')
    },
    timeDeltaStandardDeviationMaxSpurt() {
      return this.calcStdDev('max', 'raceTimeDelta')
    },
    timeDeltaStandardDeviation() {
      return this.calcStdDev('all', 'raceTimeDelta')
    },
    timeDeltaStandardDeviationNotMaxSpurt() {
      return this.calcStdDev('notMax', 'raceTimeDelta')
    },
  },
  methods: {
    initCourse() {
      // コース
      const courses = this.coursesByRaceType[this.raceType]
      const c = courses[Math.floor(Math.random() * courses.length)]
      this.track.course = c.cid
      this.track.location = c.location

      // 馬場状態
      const SURFACE_RATES = [0.77, 0.87, 0.95, 1]
      const s = Math.random()
      for (let i = 0; i < SURFACE_RATES.length; i++) {
        if (s < SURFACE_RATES[i]) {
          this.track.surfaceCondition = i
          break
        }
      }
    },
  },
}
</script>
