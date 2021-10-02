<script>
import TrackData from './course_data.json'

export default {
  name: "MixinCourseData",
  data: function () {
    return {
      'trackData': TrackData
    }
  },
  computed: {
    courseLength() {
      return this.trackDetail.distance
    },
    currentSlope() {
      return this.getSlope(this.position)
    }
  },
  methods: {
    toPosition(distanceLeft) {
      return this.trackDetail.distance - distanceLeft
    },
    cornerEnd(corner) {
      return corner.start + corner.length
    },
    getSlope(position) {
      if (!position) {
        position = this.position
      }
      const slopePoints = this.trackDetail.slopes
      const t = 1000 * position / this.courseLength
      const i = Math.floor(t)
      return 100 * (slopePoints[i] + (slopePoints[i + 1] - slopePoints[i]) * (t - i))
    },
    getStraights(track) {
      if (!track) {
        track = this.trackDetail
      }
      return track.straights
    }
  }
}
</script>

<style scoped>

</style>
