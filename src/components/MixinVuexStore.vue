<script>
export default {
  name: "MixinVuexStore",
  computed: {
    emulations: {
      get() {
        return this.$store.getters.emulations
      },
      set(value) {
        this.$store.dispatch('updateEmulations', value)
      }
    },
    indicatedMaxEpoch: {
      get() {
        return this.$store.getters.indicatedMaxEpoch
      },
      set(value) {
        this.$store.dispatch('updateIndicatedMaxEpoch', value)
      }
    },
    skillActivateAdjustment: {
      get() {
        return this.$store.getters.skillActivateAdjustment
      },
      set(value) {
        this.$store.dispatch('updateSkillActivateAdjustment', value)
      }
    },
    randomPosition: {
      get() {
        return this.$store.getters.randomPosition
      },
      set(value) {
        this.$store.dispatch('updateRandomPosition', value)
      }
    },
    emulating: {
      get() {
        return this.$store.getters.emulating
      },
      set(value) {
        this.$store.dispatch('updateEmulating', value)
      }
    },
    production: {
      get() {
        return this.$store.getters.production
      },
      set(value) {
        this.$store.dispatch('updateProduction', value)
      }
    },
    epoch: {
      get() {
        return this.$store.getters.epoch
      },
      set(value) {
        this.$store.dispatch('updateEpoch', value)
      }
    },
    runMaxEpoch: {
      get() {
        return this.$store.getters.runMaxEpoch
      },
      set(value) {
        this.$store.dispatch('updateRunMaxEpoch', value)
      }
    },
    track: {
      get() {
        return this.$store.getters.track
      },
      set(value) {
        this.$store.dispatch('updateTrack', value)
      }
    },
    chartStore: {
      get() {
        return this.$store.getters.chartStore
      },
      set(value) {
        this.$store.dispatch('updateChartStore', value)
      }
    },
  }
}
</script>
