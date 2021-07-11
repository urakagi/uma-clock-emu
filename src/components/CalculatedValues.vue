<template>
  <div>
    <div>
      {{ $t("message.totalStatus") }}：{{ totalStatus }}／{{ $t("message.displayStatusCheck") }}：{{ displayStatusCheck }}／最小タイム：{{formatTime($parent.trackDetail.finishTimeMin, 1)}}／最大タイム：{{formatTime($parent.trackDetail.finishTimeMax, 1)}}
    </div>
    <div>
      補正後：{{ $t("message.speed") }}{{ $parent.modifiedSpeed.toFixed(1) }} ／{{
        $t("message.stamina")
      }}{{ $parent.modifiedStamina.toFixed(1) }} ／{{ $t("message.power") }}{{ $parent.modifiedPower.toFixed(1) }}
      ／{{ $t("message.guts") }}{{ $parent.modifiedGuts.toFixed(1) }} ／{{ $t("message.wisdom") }}{{
        $parent.modifiedWisdom.toFixed(1)
      }}
    </div>
    <div>
      初期耐力：{{ $parent.spMax.toFixed(1) }}／金回復≒{{ getEqualStamina(550) }}{{ $t("message.stamina") }}／白回復≒{{
        getEqualStamina(150)
      }}{{ $t("message.stamina") }}／終盤耐力消耗係数：{{ $parent.spurtSpCoef.toFixed(3) }}
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
      序盤目標速度：{{ $parent.v1.toFixed(2) }}／序盤加速度：{{ $parent.a1.toFixed(3) }} ｜
      中盤目標速度：{{ $parent.v2.toFixed(2) }}／中盤加速度：{{ $parent.a2.toFixed(3) }}
    </div>
    <div>
      終盤目標速度：{{ $parent.v3.toFixed(2) }}／終盤加速度：{{ $parent.a3.toFixed(3) }} ｜
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
      const STATUS = ['', 'スピード', 'スタミナ', 'パワー', '根性', '賢さ']
      const check = this.$parent.trackDetail.courseSetStatus
      switch (check.length) {
        case 0:
          return '無'
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