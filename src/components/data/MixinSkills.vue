<script>
export default {
  name: "MixinSkills",
  data() {
    const thiz = this
    return {
      invokedSkills: [],
      coolDownMap: {},
      hasSkills: {
        heal: [0],
      },
      skills: {
        heal: [
          {
            name: '円弧のマエストロ',
            timing: 'corner',
            randoms: [],
            cd: 500,
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            },
            trigger: function () {
              thiz.heal(550)
            }
          }
        ]
      }
    }
  },
  computed: {
    timeCoef() {
      return this.trackDetail.distance / 1000.0
    }
  },
  methods: {
    initializeSkills() {
      this.invokedSkills = []
      this.coolDownMap = {}
      for (const type in this.hasSkills) {
        for (const index in this.hasSkills[type]) {
          const skill = this.skills[type][index]
          // FIXME: for debug, always pass wisdom check
          if (Math.random() * 100 < (100000 - 9000.0 / this.umaStatus.wisdom)) {
            // if (Math.random() * 100 < (100 - 9000.0 / this.umaStatus.wisdom)) {
            if (skill.init) {
              skill.init()
            }
            this.invokedSkills.push(skill)
          }
        }
      }
    },
    checkSkillTrigger(startPosition) {
      for (const skill of this.invokedSkills) {
        if (this.isInCoolDown(skill)) {
          continue
        }
        if (skill.check(startPosition)) {
          this.log += `${skill.name}発動！`
          skill.trigger()
          this.coolDownMap[skill.name] = this.frameElapsed
        }
      }
    },
    isInCorner(startPosition) {
      for (const corner of this.trackDetail.corners) {
        const start = this.trackDetail.distance - corner[0]
        const end = this.trackDetail.distance - corner[1]
        if ((startPosition >= start && startPosition <= end ||
            this.position >= start && this.position <= end)) {
          return true
        }
      }
      return false
    },
    initCornerRandom() {
      const ret = []
      for (const corner of this.trackDetail.corners) {
        const start = this.trackDetail.distance - corner[0]
        const end = this.trackDetail.distance - corner[1]
        ret.push(Math.random() * (end - start) + start)
      }
      return ret
    },
    isInRandom(randoms, startPosition) {
      for (const random of randoms) {
        if (startPosition <= random && this.position >= random) {
          return true
        }
      }
      return false
    },
    isInCoolDown(skill) {
      if (!(skill.name in this.coolDownMap)) {
        return false
      }
      return (this.frameElapsed - this.coolDownMap[skill.name]) / 15.0 <
          skill.cd * this.timeCoef
    },
    heal(value) {
      const heal = this.spMax * value / 10000.0
      this.sp += heal
      this.log += `耐力が${heal.toFixed(1)}回復した！<br>`
    }
  }
}
</script>

<style scoped>

</style>