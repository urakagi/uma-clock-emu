<script>
export default {
  name: "MixinConstants",
  data() {
    return {
      condCoef: {
        0: 1.04,
        1: 1.02,
        2: 1,
        3: 0.98,
        4: 0.96
      },
      surfaceSpeedModify: {
        turf: {
          0: 0,
          1: 0,
          2: 0,
          3: -50
        },
        dirt: {
          0: 0,
          1: 0,
          2: 0,
          3: -50
        }
      },
      surfacePowerModify: {
        turf: {
          0: 0,
          1: -50,
          2: -50,
          3: -50
        },
        dirt: {
          0: -100,
          1: -50,
          2: -100,
          3: -100
        }
      },
      styleFitCoef: {
        'S': 1.1,
        'A': 1,
        'B': 0.85,
        'C': 0.75,
        'D': 0.6,
        'E': 0.4,
        'F': 0.2,
        'G': 0.1,
      },
      distanceFitSpeedCoef: {
        'S': 1.05,
        'A': 1,
        'B': 0.9,
        'C': 0.8,
        'D': 0.6,
        'E': 0.4,
        'F': 0.2,
        'G': 0.1,
      },
      distanceFitAccelerateCoef: {
        'S': 1,
        'A': 1,
        'B': 1,
        'C': 1,
        'D': 1,
        'E': 0.6,
        'F': 0.5,
        'G': 0.4,
      },
      surfaceFitAccelerateCoef: {
        'S': 1.05,
        'A': 1,
        'B': 0.9,
        'C': 0.8,
        'D': 0.7,
        'E': 0.5,
        'F': 0.3,
        'G': 0.1,
      },
      styleSpCoef: {
        1: 0.95,
        2: 0.89,
        3: 1,
        4: 0.995
      },
      styleSpeedCoef: {
        1: {
          0: 1,
          1: 0.98,
          2: 0.962
        },
        2: {
          0: 0.978,
          1: 0.991,
          2: 0.975
        },
        3: {
          0: 0.938,
          1: 0.998,
          2: 0.994
        },
        4: {
          0: 0.931,
          1: 1,
          2: 1
        }
      },
      styleAccelerateCoef: {
        1: {
          0: 1,
          1: 1,
          2: 0.996
        },
        2: {
          0: 0.985,
          1: 1,
          2: 0.996
        },
        3: {
          0: 0.975,
          1: 1,
          2: 1
        },
        4: {
          0: 0.945,
          1: 1,
          2: 0.997
        }
      },
      spConsumptionCoef: {
        turf: {
          0: 1,
          1: 1,
          2: 1.02,
          3: 1.02
        },
        dirt: {
          0: 1,
          1: 1,
          2: 1.01,
          3: 1.02
        }
      }
    }
  }
}
</script>

<style scoped>

</style>