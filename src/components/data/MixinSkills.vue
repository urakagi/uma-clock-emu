<script>
export default {
  name: "MixinSkills",
  data() {
    const thiz = this
    return {
      invokedSkills: [],
      coolDownMap: {},
      hasSkills: {
        heal: [1],
      },
      skills: {
        heal: [
          {
            name: '円弧のマエストロ',
            randoms: [],
            cd: 500,
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            },
            trigger: function () {
              thiz.doHeal(550)
            }
          },
          {
            name: '好転一息',
            randoms: [],
            cd: 500,
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            },
            trigger: function () {
              thiz.doHeal(550)
            }
          },
          {
            name: 'クールダウン',
            randoms: [],
            cd: 500,
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.trackDetail.distanceType === 4 && thiz.isInRandom(this.randoms, startPosition)
            },
            trigger: function () {
              thiz.doHeal(550)
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
        for (const index of this.hasSkills[type]) {
          const skill = this.skills[type][index]
          // FIXME: for debug, always pass wisdom check
          // if (Math.random() * 100 < (100000 - 9000.0 / this.umaStatus.wisdom)) {
          if (Math.random() * 100 < (100 - 9000.0 / this.umaStatus.wisdom)) {
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
          const pos = this.trackDetail.distance - this.position
          this.log += `／残り${pos.toFixed(1)}m地点<br>`
        }
      }
    },
    isInCorner(position) {
      for (const corner of this.trackDetail.corners) {
        const start = this.trackDetail.distance - corner[0]
        const end = this.trackDetail.distance - corner[1]
        if (position >= start && position <= end) {
          return true
        }
      }
      return false
    },
    initCornerRandom() {
      const ret = []
      for (const corner of this.trackDetail.corners.slice(-4)) {
        const start = this.trackDetail.distance - corner[0]
        const end = this.trackDetail.distance - corner[1]
        ret.push(Math.random() * (end - start) + start)
      }
      return ret
    },
    initStraightRandom() {
      let pos
      do {
        pos = Math.random() * this.trackDetail.distance
      } while (this.isInCorner(pos))
      return [pos]
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
    doHeal(value) {
      const heal = this.spMax * value / 10000.0
      this.sp += heal
      let waste = 0
      if (this.sp > this.spMax) {
        waste = this.sp - this.spMax
        this.sp = this.spMax
      }
      if (waste > 0) {
        this.log += `耐力が${waste.toFixed(1)}溢れ、${(heal - waste).toFixed(1)}回復した！`
      } else {
        this.log += `耐力が${heal.toFixed(1)}回復した！`
      }
    }
  }
}
</script>

<style scoped>

</style>