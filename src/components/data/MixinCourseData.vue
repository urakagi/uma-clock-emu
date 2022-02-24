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
    slopeEnd(slope) {
      return slope.start + slope.length
    },
    getSlope(position) {
      if (!position) {
        position = this.position
      }
      for (const slope of this.trackDetail.slopes) {
        if (position >= slope.start && position <= this.slopeEnd(slope)) {
          return 0.0001 * slope.slope
        }
      }
      return 0
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
