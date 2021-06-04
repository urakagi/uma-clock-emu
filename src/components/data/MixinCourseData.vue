<script>
export default {
  name: "MixinTrackData",
  data: function () {
    return {
      'trackData': {
        'kyoto': {
          't3200o': {
            name: '芝3200m(外)',
            distanceType: 4,
            surface: 'turf',
            distance: 3200,
            statusCheck: [],
            corners: [[2670, 2420], [2420, 2200], [1800, 1600], [1600, 1400], [870, 620], [620, 400]],
            uphill: [
              {start: 3100, end: 3000, altitude: 2, trigger: false},
              {start: 3000, end: 2750, altitude: 2, trigger: true},
              {start: 1200, end: 1100, altitude: 2, trigger: false},
              {start: 1100, end: 850, altitude:24, trigger: true}
            ],
            downhill: [
              {start: 2750, end: 2600, altitude: 4, trigger: true},
              {start: 850, end: 700, altitude: 4, trigger: true}
            ]
          }
        }
      }
    }
  },
  computed: {
    courseLength() {
      return this.trackDetail.distance
    }
  },
  methods: {
    toPosition(distanceLeft) {
      return this.trackDetail.distance - distanceLeft
    }
  }
}
</script>

<style scoped>

</style>