<script>
const SkillData = require('./skillData')

export default {
  name: "MixinSkills",
  data() {
    return {
      rarities: ['rare', 'normal', 'inherit', 'all'],
      rarityString: {
        rare: 'skills.rare',
        normal: 'skills.normal',
        inherit: 'skills.inherit',
        all: '',
      },
      invokedSkills: [],
      coolDownMap: {},
      hasSkills: {},
      selectedUnique: this.$t("skills.selectedUnique"),
      uniqueLevel: 4,
      skillTriggerCount: [0, 0, 0, 0],
      healTriggerCount: 0,
      skills: {},
      skillData: SkillData.normalSkillData(this),
      uniqueSkillData: SkillData.uniqueSkillData(this),
    }
  },
  computed: {
    availableSkills() {
      const ret = {}
      for (const type in this.skills) {
        ret[type] = {}
        for (const rarity in this.skills[type]) {
          ret[type][rarity] = []
          for (const i in this.skills[type][rarity]) {
            const skill = this.skills[type][rarity][i]
            if (skill.emulatorTypeLimit && skill.emulatorTypeLimit.indexOf(this.emulatorType) < 0) {
              continue
            }
            if (skill.styleLimit && skill.styleLimit.indexOf(this.runningStyle) < 0) {
              continue
            }
            if (skill.distanceLimit && skill.distanceLimit.indexOf(this.distanceType) < 0) {
              continue
            }
            if (skill.surfaceLimit && skill.surfaceLimit.indexOf(this.surfaceType) < 0) {
              continue
            }
            // コースと馬場状態指定はチャンミのみ
            if (this.emulatorType === 'cm') {
              if (skill.courseLimit) {
                let notMatch = true
                for (const limit in skill.courseLimit) {
                  if (skill.courseLimit[limit].indexOf(this.trackDetail[limit]) >= 0) {
                    notMatch = false
                    break
                  }
                }
                if (notMatch) {
                  continue
                }
              }
              if (skill.surfaceConditionLimit) {
                if (skill.surfaceConditionLimit.indexOf(this.track.surfaceCondition) < 0) {
                  continue
                }
              }
            }
            skill.index = parseInt(i)
            ret[type][rarity].push(skill)
          }
        }
      }
      return ret
    },
    timeCoef() {
      return this.trackDetail.distance / 1000.0
    },
    isInSpurt() {
      if (!this.spurtParameters) {
        return false
      }
      return this.spurtParameters.distance + this.position >= this.courseLength
    },
  },
  created() {
    this.fillSkillData()
    this.resetHasSkills()
  },
  methods: {
    initializeSkills(skillActivateAdjustment) {
      this.invokedSkills = []
      this.coolDownMap = {}
      this.skillTriggerCount = [0, 0, 0, 0]
      this.healTriggerCount = 0
      for (const type in this.hasSkills) {
        for (const rarity of Object.keys(this.hasSkills[type])) {
          for (const index of this.hasSkills[type][rarity]) {
            const skill = this.skills[type][rarity][index]
            // Corrupted saved uma
            if (!skill) {
              continue
            }
            let invokeRate
            if (type === 'fatigue' || type === 'speed') {
              invokeRate = 80
            } else if (type === 'passive' || skillActivateAdjustment === "1" ||
                skillActivateAdjustment === "2") {
              invokeRate = 100
            } else {
              // FIXME: for debug, always pass wisdom check
              if (this.production) {
                invokeRate = Math.max(100 - 9000.0 / this.umaStatus.wisdom, 20)
              } else {
                invokeRate = Math.max(100000 - 9000.0 / this.umaStatus.wisdom, 20)
              }
            }
            if (Math.random() * 100 < invokeRate) {
              if (skill.init) {
                skill.init()
              }
              this.initSkillConditions(skill)
              this.invokedSkills.push(skill)
            }
          }
        }
      }
      // 固有スキルは絶対invokeし、処理して振り分ける
      const thiz = this
      for (const skill of this.uniqueSkillData) {
        if (skill.name !== this.selectedUnique) {
          continue
        }
        const copy = {...skill}
        copy.name = skill.name
        copy.cd = 500
        copy.triggers = []
        if (skill.trigger) {
          copy.triggers.push(skill.trigger);
        }
        copy.trigger = function () {
          let ret = null
          for (const tri of this.triggers) {
            const r = tri(skill)
            if (r) {
              ret = r
            }
          }
          return ret
        }
        if (skill.duration) {
          copy.duration = skill.duration
        } else {
          copy.duration = 0
        }
        // New logic, so you see many backward compatibility
        let effectCount = 0
        if (skill.boost) {
          skill.targetSpeed = skill.boost.targetSpeed
          skill.acceleration = skill.boost.acceleration
        }
        if (skill.heal) {
          copy.type = 'heal'
          copy.heal = skill.heal * (1 + this.uniqueLevel * 0.02)
          copy.triggers.push(function () {
            return thiz.doHeal(copy.heal)
          })
          effectCount++
        }
        if (skill.targetSpeed) {
          copy.type = 'targetSpeed'
          copy.targetSpeed = skill.targetSpeed * (1 + this.uniqueLevel * 0.03)
          effectCount++
        }
        if (skill.acceleration) {
          copy.type = 'acceleration'
          copy.acceleration = skill.acceleration * (1 + this.uniqueLevel * 0.02)
          effectCount++
        }
        if (effectCount > 1) {
          copy.type = 'boost'
        }
        if (copy.init) {
          copy.init()
        }
        this.initSkillConditions(copy)
        this.invokedSkills.push(copy)
        break
      }
    },
    initSkillConditions(skill) {
      if (!skill.conditions) {
        return
      }
      const thiz = this
      if (!skill.checks) {
        skill.checks = []
      }
      skill.randoms = []
      for (const cond in skill.conditions) {
        const value = skill.conditions[cond]
        switch (cond) {
          case 'distance_rate_after_random':
            skill.randoms = this.initIntervalRandom(value * 0.01, 1)
            skill.checks.push(function (startPosition) {
              return thiz.isInRandom(skill.randoms, startPosition)
            })
            break
          case 'all_corner_random':
            skill.randoms = this.initAllCornerRandom()
            skill.checks.push(function (startPosition) {
              return thiz.isInRandom(skill.randoms, startPosition)
            })
            break
          case 'up_slope_random':
            skill.randoms = this.initSlopeRandom('up')
            skill.checks.push(function (startPosition) {
              return thiz.isInRandom(skill.randoms, startPosition)
            })
            break
          case 'down_slope_random':
            skill.randoms = this.initSlopeRandom('down')
            skill.checks.push(function (startPosition) {
              return thiz.isInRandom(skill.randoms, startPosition)
            })
            break
          case 'running_style':
            skill.checks.push(() => thiz.isRunningStyle(value))
            break
          case 'distance_type':
            skill.checks.push(() => thiz.isDistanceType(value))
            break
          case 'distance_rate':
            skill.checks.push(() => {
              if (value.startsWith('>=')) {
                return thiz.isInInterval(parseInt(value.substring(2)) * 0.01, 1)
              } else if (value.startsWith('<=')) {
                return thiz.IsInInterval(0, parseInt(value.substring(2)) * 0.01)
              }
            })
            break
        }
      }
      skill.check = function (startPosition) {
        for (const c of this.checks) {
          if (!c(startPosition)) return false
        }
        return true
      }
    },
    triggerStartSkills() {
      const nonStartSkills = []
      for (const skill of this.invokedSkills) {
        switch (skill.type) {
          case 'passive':
            if (skill.check()) {
              if ('triggerRate' in skill) {
                if (Math.random() < skill.triggerRate) {
                  skill.trigger()
                  this.skillTriggerCount[0]++
                  this.frames[0].skills.push({data: skill})
                }
              } else {
                skill.trigger()
                this.skillTriggerCount[0]++
                this.frames[0].skills.push({data: skill})
              }
            }
            break
          case 'gate':
            this.startDelay *= skill.value
            this.skillTriggerCount[0]++
            this.frames[0].skills.push({data: skill})
            break
          default:
            nonStartSkills.push(skill)
            break
        }
      }
      this.invokedSkills = nonStartSkills
    },
    checkSkillTrigger(startPosition) {
      const skillTriggered = []
      // 通常スキル
      for (const skill of this.invokedSkills) {
        if (this.isInCoolDown(skill)) {
          continue
        }
        if (skill.check(startPosition)) {
          let skillDetail = null
          if (skill.trigger) {
            skillDetail = skill.trigger()
          }
          if (skill.duration) {
            this.operatingSkills.push({data: skill, startFrame: this.frameElapsed})
            skillTriggered.push({data: skill, detail: skillDetail})
          } else {
            skillTriggered.push({data: skill, detail: skillDetail})
          }
          this.skillTriggerCount[this.currentPhase]++
          this.coolDownMap[skill.name] = this.frameElapsed
        }
      }
      return skillTriggered
    },
    chooseRandom(zoneStart, zoneEnd) {
      let rate
      switch (this.randomPosition) {
        case '0':
          rate = Math.random()
          break
        case '1':
          rate = 0
          break
        case '2':
          rate = 0.25
          break
        case '3':
          rate = 0.5
          break
        case '4':
          rate = 0.75
          break
        case '5':
        default:
          rate = 0.98
          break
      }

      const start = rate * (zoneEnd - zoneStart) + zoneStart
      let end = start + 10
      if (end > zoneEnd) {
        end = zoneEnd
      }
      return {start, end}
    },
    initCornerRandom() {
      const ret = []
      for (const corner of this.trackDetail.corners.slice(-4)) {
        ret.push(this.chooseRandom(corner.start, this.cornerEnd(corner)))
      }
      return ret
    },
    initAllCornerRandom() {
      const corners = this.trackDetail.corners.map(c => ({ start: c.start, length: c.length }))
      const triggers = []

      function logTrigger(min, max) {
        max = Math.max(min, max - 10)
        const start = min + Math.random() * (max - min)
        const end = start + 10
        triggers.push({start, end})
        triggers.sort((a, b) => a.start - b.start)
        return {start, end}
      }

      for (let x = 0; x < 4; x++) {
        if (corners.length < 1) {
          break
        }
        const i = Math.floor(Math.random() * corners.length)
        const corner = corners[i]
        const trigger = logTrigger(corner.start, corner.start + corner.length)
        if (corner.start + corner.length - trigger.end >= 10) {
          corner.start = trigger.end
          corner.length -= (trigger.end - corner.start)
        } else {
          corners.splice(i, 1)
        }
        corners.splice(0, i)
      }
      return triggers
    },
    initStraightRandom() {
      let ret
      const straights = this.getStraights()
      const chosen = Math.floor(Math.random() * straights.length)
      ret = this.chooseRandom(straights[chosen].start, straights[chosen].end)
      return [ret]
    },
    initSlopeRandom(dir) {
      let ret
      const slopes = this.getSlopes().filter(
          s => (s.slope > 0 && dir == 'up') || (s.slope < 0 && dir == 'down'))
      const chosen = Math.floor(Math.random() * slopes.length)
      ret = this.chooseRandom(slopes[chosen].start, slopes[chosen].start + slopes[chosen].length)
      return [ret]
    },
    initPhaseRandom(phase, options) {
      const startRate = (options && options.startRate) || 0
      const endRate = (options && options.endRate) || 1
      let zoneStart, zoneEnd
      switch (phase) {
        case 0:
          zoneStart = 0
          zoneEnd = this.courseLength / 6.0
          break
        case 1:
          zoneStart = this.courseLength / 6.0
          zoneEnd = this.courseLength * 2.0 / 3
          break
        case 2:
          zoneStart = this.courseLength * 2.0 / 3
          zoneEnd = this.courseLength * 5.0 / 6
          break
        case 3:
        default:
          zoneStart = this.courseLength * 5.0 / 6
          zoneEnd = this.courseLength
          break
      }
      const zoneLength = zoneEnd - zoneStart
      zoneStart += zoneLength * startRate
      zoneEnd -= zoneLength * (1 - endRate)
      return [this.chooseRandom(zoneStart, zoneEnd)]
    },
    initFinalCornerRandom() {
      const ret = []
      const corner = this.trackDetail.corners[this.trackDetail.corners.length - 1]
      if (!corner) {
        return []
      }
      ret.push(this.chooseRandom(corner.start, this.cornerEnd(corner)))
      return ret
    },
    initPhase2CornerRandom() {
      let start = -1
      let end = -1
      for (const corner of this.trackDetail.corners) {
        if (corner.start >= this.courseLength * 2.0 / 3) {
          if (start < 0) {
            start = corner.start
          }
        }
        if (this.cornerEnd(corner) >= this.courseLength * 2.0 / 3) {
          end = this.cornerEnd(corner)
          if (start < 0) {
            start = this.courseLength * 2.0 / 3
          }
        }
      }
      if (start < 0) {
        return []
      }
      return [this.chooseRandom(start, end)]
    },
    initFinalStraightRandom() {
      const ret = []
      const finalCorner = this.trackDetail.corners[this.trackDetail.corners.length - 1]
      if (!finalCorner) {
        return []
      }
      ret.push(this.chooseRandom(this.cornerEnd(finalCorner), this.courseLength))
      return ret
    },
    initIntervalRandom(startRate, endRate) {
      const start = this.courseLength * startRate
      const end = this.courseLength * endRate
      return [this.chooseRandom(start, end)]
    },
    isInRandom(randoms) {
      for (const random of randoms) {
        if (this.position <= random.end && this.position >= random.start) {
          return true
        }
      }
      return false
    },
    isInCorner(position, cornerNumber, interval) {
      if (!position) {
        position = this.position
      }
      for (const i in this.trackDetail.corners) {
        const corner = this.trackDetail.corners[i]
        const start = interval ? interval.start * corner.start : corner.start
        let end = this.cornerEnd(corner)
        if (interval) {
          end *= interval.end
        }
        if (position >= start && position <= end) {
          if (cornerNumber) {
            return i == this.trackDetail.corners.length + cornerNumber - 5
          } else {
            return true
          }
        }
      }
      return false
    },
    isInStraight(position) {
      if (!position) {
        position = this.position
      }
      for (const straight of this.trackDetail.straights) {
        if (position >= straight.start && position <= straight.end) {
          return true
        }
      }
      return false
    },
    isInFinalCorner(position, interval) {
      if (!position) {
        position = this.position
      }
      const fc = this.trackDetail.corners[this.trackDetail.corners.length - 1]
      if (!fc) {
        return false
      }
      const startRate = interval ? interval.start : 0
      const endRate = interval ? interval.end : 1
      const start = fc.start + startRate * fc.length
      const end = fc.start + endRate * fc.length
      return position >= start && position <= end
    },
    isInFinalStraight(position) {
      if (!position) {
        position = this.position
      }
      const fc = this.trackDetail.corners[this.trackDetail.corners.length - 1]
      if (!fc) {
        // 千直、最終直線は仕様上存在しないことになっている
        return false
      }
      return position > this.cornerEnd(fc)
    },
    isContainsRemainingDistance(remain, startPosition) {
      return startPosition <= this.toPosition(remain)
          && this.position >= this.toPosition(remain)
    },
    isInDistanceRate(startRate, endRate) {
      return this.position >= this.courseLength * startRate &&
          this.position <= this.courseLength * endRate
    },
    isSPInRange(minRate, maxRate) {
      return this.sp >= this.spMax * minRate && this.sp <= this.spMax * maxRate
    },
    isPhase(phase) {
      return this.currentPhase === phase
    },
    isStraightFrontType(type) {
      switch (type) {
        case 2:
          for (const i in this.trackDetail.straights) {
            const straight = this.trackDetail.straights[i]
            if (this.position >= straight.start && this.position <= straight.end) {
              return i == this.trackDetail.straights.length - 2
            }
          }
          break
      }
    },
    isInInterval(start, end) {
      return this.position >= this.courseLength * start
          && this.position <= this.courseLength * end
    },
    isInCoolDown(skill) {
      if (!(skill.name in this.coolDownMap)) {
        return false
      }
      return (this.frameElapsed - this.coolDownMap[skill.name]) / 15.0 <
          skill.cd * this.timeCoef
    },
    doHeal(value) {
      let detail
      const heal = this.spMax * value / 10000.0
      this.sp += heal
      let waste = 0
      if (this.sp > this.spMax) {
        waste = this.sp - this.spMax
        this.sp = this.spMax
      }
      if (waste > 0) {
        detail = {heal, waste}
      } else {
        detail = {heal, waste: 0}
      }
      if (value > 0) {
        this.healTriggerCount++
      }
      if (this.currentPhase >= 2) {
        this.spurtParameters = this.calcSpurtParameter()
      }
      return detail
    },
    isRunningStyle(style) {
      return this.runningStyle === style
    },
    isDistanceType(distanceType) {
      return this.distanceType === distanceType
    },
    isSurfaceType(surfaceType) {
      return this.surfaceType === surfaceType
    },
    accTimePassed(second) {
      return this.frameElapsed >= 15 * second
    },
    fillSkillData() {
      const thiz = this
      // First build up inherit skills
      for (const skill of this.uniqueSkillData) {
        if (skill.noInherit) {
          continue
        }
        let skillType = null
        let effectCount = 0
        const copy = {...skill}
        copy.inherit = {
          id: skill.id + 800000,
          name: skill.name,
        }
        copy.cd = 500
        if (skill.duration) {
          copy.duration = skill.duration * 0.6
        } else {
          copy.duration = 0
        }
        if (skill.boost) {
          skill.targetSpeed = skill.boost.targetSpeed
          skill.acceleration = skill.boost.acceleration
        }
        if (skill.heal) {
          let healValue
          switch (skill.heal) {
            case 750:
              healValue = 350
              break
            case 550:
              healValue = 150
              break
            case 350:
              healValue = 50
              break
          }
          copy.inherit.heal = healValue
          const thiz = this
          copy.trigger = function () {
            return thiz.doHeal(this.heal)
          }
          skillType = 'heal'
          effectCount++
        }
        if (skill.targetSpeed) {
          if (skill.targetSpeed == 0.15) {
            copy.inherit.targetSpeed = 0.035
          } else {
            copy.inherit.targetSpeed = skill.targetSpeed - 0.2
          }
          skillType = 'targetSpeed'
          effectCount++
        }
        if (skill.acceleration) {
          const value = skill.acceleration
          if (value > 0.1) {
            copy.inherit.acceleration = value - 0.2
          } else {
            copy.inherit.acceleration = 0.05
          }
          skillType = 'acceleration'
          effectCount++
        }
        if (effectCount > 1) {
          skillType = 'boost'
        }
        delete copy.id
        delete copy.name
        this.skillData[skillType].push(copy)
      }

      const EFFECTS = ['heal', 'targetSpeed', 'acceleration', 'speed', 'fatigue']
      // Then fill fields, this.skillData must already been fulfill
      for (const type in this.skillData) {
        const o = {}
        for (const rarity of this.rarities) {
          o[rarity] = []
        }
        this.skills[type] = o
        for (const skill of this.skillData[type]) {
          for (const rarity of this.rarities) {
            if (rarity in skill) {
              const copy = {...skill}
              if (copy.duration) {
                if (!copy.tooltip) copy.tooltip = ''
                copy.tooltip += ` | ${Math.round(copy.duration * 10) / 10}s`
              }
              if (skill[rarity].id) {
                copy.id = skill[rarity].id
              }
              copy.name = skill[rarity].name
              if (skill[rarity].value) {
                copy.value = skill[rarity].value
              } else {
                for (const effect of EFFECTS) {
                  if (skill[rarity][effect]) {
                    copy[effect] = skill[rarity][effect]
                    if (!copy.tooltip) copy.tooltip = ''
                    copy.tooltip += ` | ${effect}: ${Math.round(copy[effect] * 100) / 100}`
                  }
                }
              }
              if (skill[rarity].duration) {
                copy.duration = skill[rarity].duration
              }
              copy.type = type
              if (copy.value) {
                this.fillCommonFields(copy, type)
                if (!copy.tooltip) copy.tooltip = ''
                copy.tooltip += ` | ${type}: ${Math.round(copy.value * 100) / 100}`
              }
              if (!copy.cd) copy.cd = 500
              if (copy.heal) {
                copy.trigger = function () {
                  return thiz.doHeal(copy.heal)
                }
              }
              delete copy.normal
              delete copy.rare
              delete copy.inherit
              delete copy.all
              if (copy.tooltip.startsWith(' | ')) {
                copy.tooltip = copy.tooltip.substring(3)
              }
              this.skills[type][rarity].push(copy)
            }
          }
        }
      }
    },
    fillCommonFields(copy, type) {
      const thiz = this // thiz = Vue component instance
      if (!copy.cd) {
        copy.cd = 500
      }
      switch (type) {
        case 'heal':
          copy.duration = 0
          copy.heal = copy.value
          if (!copy.trigger) {
            copy.trigger = function () {
              return thiz.doHeal(this.heal)
            }
          }
          break
        case 'speed':
          copy.speed = copy.value
          break
        case 'targetSpeed':
          copy.targetSpeed = copy.value
          break
        case 'acceleration':
          copy.acceleration = copy.value
          break
        case 'fatigue':
          copy.duration = 0
          copy.fatigue = copy.value
          if (!copy.trigger) {
            copy.trigger = function () {
              return thiz.doHeal(-this.fatigue)
            }
          }
          break
        case 'passive':
          copy.trigger = function () {
            for (const status of copy.status) {
              thiz.passiveBonus[status] += copy.value
            }
          }
          if (copy.courseLimit) {
            copy.check = function () {
              let notTrigger = false
              for (const limit in copy.courseLimit) {
                if (copy.courseLimit[limit].indexOf(thiz.trackDetail[limit]) < 0) {
                  notTrigger = true
                  break
                }
              }
              return !notTrigger
            }
          }
          break
      }
      if (copy.speed) {
        const exist = copy.trigger;
        copy.trigger = function () {
          if (exist) {
            exist();
          }
          return thiz.currentSpeed += this.speed
        }
      }
    },
    resetHasSkills() {
      const o = {}
      const ENEMY_KEYS = ['fatigue', 'speed']
      for (const key of ENEMY_KEYS) {
        o[key] = {
          all: []
        }
      }
      const SELF_KEYS = ['passive', 'heal', 'targetSpeed', 'acceleration', 'boost', 'gate']
      for (const key of SELF_KEYS) {
        o[key] = {
          rare: [],
          normal: [],
          inherit: []
        }
      }
      this.hasSkills = o
    }
  }
}
</script>

