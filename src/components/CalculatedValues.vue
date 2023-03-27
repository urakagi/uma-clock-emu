<template>
  <div>
    <div>
      {{ $t('message.totalStatus') }}：{{ totalStatus }}／
      {{ $t('message.corrected') }}：{{ $t('message.speed')
      }}{{ $parent.modifiedSpeed.toFixed(1) }} ／{{ $t('message.stamina')
      }}{{ $parent.modifiedStamina.toFixed(1) }} ／{{ $t('message.power')
      }}{{ $parent.modifiedPower.toFixed(1) }} ／{{ $t('message.guts')
      }}{{ $parent.modifiedGuts.toFixed(1) }} ／{{ $t('message.wisdom')
      }}{{ $parent.modifiedWisdom.toFixed(1) }}
    </div>
    <div>
      {{ $t('message.startHP') }}：{{ $parent.spMax.toFixed(1) }}／{{
        $t('message.rareHP')
      }}≒{{ getEqualStamina(550) }}{{ $t('message.stamina') }}／{{
        $t('message.normalHP')
      }}≒{{ getEqualStamina(150) }}{{ $t('message.stamina') }}／{{
        $t('message.spurtCoeff')
      }}：{{ $parent.spurtSpCoef.toFixed(3) }}
    </div>
    <div>
      {{ $t('message.skillActivateRate') }}：{{
        $parent.skillActivateRate.toFixed(1)
      }}％／{{ $t('message.temperamentRate') }}：{{
        $parent.temptationRate.toFixed(1)
      }}％
    </div>
    <div>
      {{ $t('message.v0') }}：{{ $parent.v0.toFixed(2) }}／{{
        $t('message.a0')
      }}：{{ $parent.a0.toFixed(3) }}
    </div>
    <div>
      {{ $t('message.startSpeed') }}：{{ $parent.v1.toFixed(2) }}／{{
        $t('message.startAccel')
      }}：{{ $parent.a1.toFixed(3) }} ｜ {{ $t('message.midSpeed') }}：{{
        $parent.v2.toFixed(2)
      }}／{{ $t('message.midAccel') }}：{{ $parent.a2.toFixed(3) }}
    </div>
    <div>
      {{ $t('message.finalSpeed') }}：{{ $parent.v3.toFixed(2) }}／{{
        $t('message.finalAccel')
      }}：{{ $parent.a3.toFixed(3) }} ｜ {{ $t('message.maxSpurtSpeed') }}：{{
        $parent.maxSpurtSpeed.toFixed(2)
      }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatedValues',
  computed: {
    totalStatus() {
      return (
        parseInt(this.$parent.umaStatus.speed) +
        parseInt(this.$parent.umaStatus.stamina) +
        parseInt(this.$parent.umaStatus.power) +
        parseInt(this.$parent.umaStatus.guts) +
        parseInt(this.$parent.umaStatus.wisdom)
      )
    },
  },
  methods: {
    getEqualStamina(value) {
      return Math.floor(
        (this.$parent.spMax * value) /
          10000.0 /
          0.8 /
          this.$parent.styleSpCoef[this.$parent.runningStyle]
      )
    },
  },
}
</script>
