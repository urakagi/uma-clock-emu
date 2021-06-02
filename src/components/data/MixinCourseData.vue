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
            triggerUphill: [3000, 1100],
            triggerDownhill: [2700, 800],
            uphill: [
              {start: 3100, end: 2750, altitude: 4},
              {start: 1200, end: 850, altitude: 4}
            ],
            downhill: [
              {start: 2750, end: 2600, altitude: 4},
              {start: 850, end: 700, altitude: 4}
            ]
          }
        }
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>