<template>
  <div>
    <div>
      {{ $t("message.totalStatus") }}：{{ totalStatus }}／{{ $t("message.displayStatusCheck") }}：{{ displayStatusCheck }}／{{ $t("message.minTime") }}：{{formatTime($parent.trackDetail.finishTimeMin, 1)}}／{{ $t("message.maxTime") }}：{{formatTime($parent.trackDetail.finishTimeMax, 1)}}
    </div>
    <div>
      {{ $t("message.corrected") }}：{{ $t("message.speed") }}{{ $parent.modifiedSpeed.toFixed(1) }} ／{{
        $t("message.stamina")
      }}{{ $parent.modifiedStamina.toFixed(1) }} ／{{ $t("message.power") }}{{ $parent.modifiedPower.toFixed(1) }}
      ／{{ $t("message.guts") }}{{ $parent.modifiedGuts.toFixed(1) }} ／{{ $t("message.wisdom") }}{{
        $parent.modifiedWisdom.toFixed(1)
      }}
    </div>
    <div>
      {{ $t("message.startHP") }}：{{ $parent.spMax.toFixed(1) }}／{{ $t("message.rareHP") }}≒{{ getEqualStamina(550) }}{{ $t("message.stamina") }}／{{ $t("message.normalHP") }}≒{{
        getEqualStamina(150)
      }}{{ $t("message.stamina") }}／{{ $t("message.spurtCoeff") }}：{{ $parent.spurtSpCoef.toFixed(3) }}
    </div>
    <div>
      {{ $t("message.skillActivateRate") }}：{{ $parent.skillActivateRate.toFixed(1) }}％／{{
        $t("message.temperamentRate")
      }}：{{ $parent.temptationRate.toFixed(1) }}％
    </div>
    <div>
      {{ $t("message.v0") }}：{{ $parent.v0.toFixed(2) }}／{{ $t("message.a0") }}：{{ $parent.a0.toFixed(3) }}
    </div>
    <div>
      {{ $t("message.startSpeed") }}：{{ $parent.v1.toFixed(2) }}／{{ $t("message.startAccel") }}：{{ $parent.a1.toFixed(3) }} ｜
      {{ $t("message.midSpeed") }}：{{ $parent.v2.toFixed(2) }}／{{ $t("message.midAccel") }}：{{ $parent.a2.toFixed(3) }}
    </div>
    <div>
      {{ $t("message.finalSpeed") }}：{{ $parent.v3.toFixed(2) }}／{{ $t("message.finalAccel") }}：{{ $parent.a3.toFixed(3) }} ｜
      {{ $t("message.maxSpurtSpeed") }}：{{ $parent.maxSpurtSpeed.toFixed(2) }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CalculatedValues",
  computed: {
    totalStatus() {
      return parseInt(this.$parent.umaStatus.speed) + parseInt(this.$parent.umaStatus.stamina)
          + parseInt(this.$parent.umaStatus.power) + parseInt(this.$parent.umaStatus.guts)
          + parseInt(this.$parent.umaStatus.wisdom)
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
    getEqualStamina(value) {
      return Math.floor(this.$parent.spMax * value
          / 10000.0 / 0.8 / this.$parent.styleSpCoef[this.$parent.umaStatus.style])
    },
  }
}
</script>

<style scoped>

</style>