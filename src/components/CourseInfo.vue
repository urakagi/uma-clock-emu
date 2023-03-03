<template>
  <div>
    <div>
      {{ $t("chart.slope") }}：
      <span v-for="slope in this.slopes" :key="slope" :class="'box ' + slopeClass(slope)">
      {{ slope }}
    </span>
    </div>
    <div>
      {{ $t("chart.corner") }}：
      <span v-for="corner in this.corners" :key="corner" class="box corner">
      {{ corner }}
    </span>
    </div>
    <div>
      {{ $t("chart.straight") }}：
      <span v-for="straight in this.straights" :key="straight" class="box straight">
      {{ straight }}
    </span>
    </div>
    <div>
      {{
        $t("chart.phaseSeparators",
            [(this.trackDetail.distance / 6).toFixed(0)
              , (this.trackDetail.distance * 2 / 3).toFixed(0)])
      }}
    </div>
    <div>
      {{ $t("message.displayStatusCheck") }}：{{ displayStatusCheck }} | {{
        $t("message.minTime")
      }}：{{ formatTime($parent.trackDetail.finishTimeMin, 1) }}／{{
        $t("message.maxTime")
      }}：{{ formatTime($parent.trackDetail.finishTimeMax, 1) }}
    </div>
  </div>
</template>

<script>
import MixinCourseData from "./data/MixinCourseData"

export default {
  name: "CourseInfo",
  props: ['track'],
  mixins: [MixinCourseData],
  computed: {
    trackDetail() {
      if (!this.track.location) {
        return {
          distance: 0, surface: 1, turn: 1, distanceType: 1,
          courseSetStatus: [], corners: [], straights: [], slopes: [],
        }
      }
      return this.trackData[this.track.location].courses[this.track.course]
    },
    corners() {
      const ret = []
      for (const c of this.trackDetail.corners) {
        ret.push(`${c.start}m～${c.start + c.length}m`)
      }
      return ret
    },
    straights() {
      const ret = []
      for (const c of this.trackDetail.straights) {
        ret.push(`${c.start}m～${c.end}m`)
      }
      return ret
    },
    slopes() {
      const ret = []
      for (const slope of this.trackDetail.slopes) {
        const s =  slope.slope > 0 ? `↑${slope.slope * 0.0001}` : `↓${-slope.slope * 0.0001}`
        ret.push(`${slope.start}m～${slope.start + slope.length}m (${s})`)
      }
      return ret
    },
    displayStatusCheck() {
      const STATUS = ['', this.$t("message.speed"), this.$t("message.stamina"), this.$t("message.power"), this.$t("message.guts"), this.$t("message.wisdom")]
      const check = this.$parent.trackDetail.courseSetStatus
      switch (check.length) {
        case 0:
          return this.$t("message.none")
        case 1:
          return STATUS[check[0]]
        case 2:
        default:
          return STATUS[check[0]] + '、' + STATUS[check[1]]
      }
    },
  },
  methods: {
    slopeClass(slope) {
      return slope.indexOf('↑') > 0 ? 'up-slope' : 'down-slope'
    },
  }
}
</script>

<style scoped>
.box {
  border: solid 1px;
  border-radius: 5px;
  padding: 1px 4px;
  margin: 1px 2px;
}

.corner {
  display: inline-block;
  background: rgba(225, 190, 255, 0.2);
}

.straight {
  display: inline-block;
  background: rgba(210, 235, 255, 0.2);
}

.up-slope {
  display: inline-block;
  background: rgba(240, 235, 105, 0.2);
}

.down-slope {
  display: inline-block;
  background: rgba(125, 255, 190, 0.2);
}
</style>
