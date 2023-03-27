<script>
import MixinVuexStore from "./MixinVuexStore.vue";

export default {
  name: 'MixinEmulationResult',
  mixins: [MixinVuexStore],
  computed: {
    emulationData() {
      return this.emulations;
    },
    avgRaceTime() {
      return this.calcAvg('all', 'raceTime')
    },
    avgRaceTimeMaxSpurt() {
      return this.calcAvg('max', 'raceTime')
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
      if (this.emulationData.length === 0) {
        return '-'
      }
      let maxSpurt = 0
      for (const e of this.emulationData) {
        if (e.maxSpurt) maxSpurt++
      }
      return ((100.0 * maxSpurt) / this.emulationData.length).toFixed(1)
    },
    maxSpurtSPLeft() {
      if (this.emulationData.length === 0) {
        return '-'
      }
      let sum = 0.0
      let count = 0
      for (const e of this.emulationData) {
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
      if (this.emulationData.length === 0) {
        return '-'
      }
      let sum = 0.0
      let count = 0
      for (const e of this.emulationData) {
        if (!e.maxSpurt) {
          sum += e.spDiff
          count++
        }
      }
      if (count === 0) {
        return '-'
      }
      return (-sum / count).toFixed(1)
    },
  },
  methods: {
    toDisplayTime(time) {
      let ret = time * 1.18
      const min = this.trackDetail.finishTimeMin
      const max = this.trackDetail.finishTimeMax
      if (ret < min) {
        ret = min - 1 + 2 * Math.random()
      } else if (ret > max) {
        ret = max - 1 + 2 * Math.random()
      }
      return ret
    },
    calcAvg(scope, field) {
      let sum = 0
      let count = 0
      for (const e of this.emulationData) {
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
      if (!field) {
        field = 'raceTime'
      }
      const avg = this.calcAvg(scope, field)
      let sum = 0
      let count = 0
      for (const e of this.emulationData) {
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
      let ret = dir === 'best' ? 999999 : -999999
      for (const e of this.emulationData) {
        if (scope === 'max' && !e.maxSpurt) {
          continue
        } else if (scope === 'notMax' && e.maxSpurt) {
          continue
        }
        if (
          (dir === 'best' && e[field] < ret) ||
          (dir === 'worst' && e[field] > ret)
        ) {
          ret = e[field]
        }
      }
      if (ret === 999999 || ret === -999999) {
        return 0
      }
      return ret
    },
  },
}
</script>
