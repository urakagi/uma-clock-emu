<script>
export default {
  name: "MixinSkills",
  data() {
    const thiz = this
    return {
      invokedSkills: [],
      coolDownMap: {},
      hasSkills: {
        heal: {
          rare: [0, 1, 3],
          normal: [10, 12]
        }
      },
      skillTriggerCount: [0, 0, 0, 0],
      skills: {},
      skillData: {
        heal: [
          {
            normal: {name: 'コーナー回復○', value: 150},
            rare: {name: '円弧のマエストロ', value: 550},
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '直線回復', value: 150},
            rare: {name: '好転一息', value: 550},
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '深呼吸', value: 150},
            rare: {name: 'クールダウン', value: 550},
            distanceLimit: [4],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'スリーセブン', value: 150},
            init: function () {
              this.randoms = [thiz.courseLength - 777]
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'ふり絞り', value: 150},
            check: function () {
              return thiz.skillTriggerCount[2] + thiz.skillTriggerCount[3] >= 3
            }
          },
          {
            normal: {name: '下校の楽しみ', value: 150},
            rare: {name: '下校後のスペシャリスト', value: 550},
            styleLimit: [4],
            check: function (startPosition) {
              return thiz.accTimePassed(10) && thiz.isStyle(4) && thiz.isTriggerDownhill(startPosition)
            }
          },
          {
            normal: {name: '勢い任せ', value: 150},
            rare: {name: 'じゃじゃウマ娘', value: 550},
            styleLimit: [1],
            check: function (startPosition) {
              return thiz.accTimePassed(10) && thiz.isStyle(4) && thiz.isTriggerUphill(startPosition)
            }
          },
          {
            normal: {name: '栄養補給', value: 150},
            rare: {name: '食いしん坊', value: 550},
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '好位追走', value: 150},
            rare: {name: 'レースプランナー', value: 550},
            styleLimit: [2],
            tooltip: '順位<=50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '様子見', value: 150},
            styleLimit: [3, 4],
            distanceLimit: [1],
            tooltip: '順位>50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'スタミナイーター', value: 150},
            styleLimit: [2, 3, 4],
            distanceLimit: [4],
            tooltip: '5番手かそれ以降満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '前途洋々', value: 150},
            rare: {name: '切り開く者', value: 550},
            styleLimit: [1, 2],
            distanceLimit: [3],
            tooltip: 'ランダム発動地点で1番手限定なので見た目以上に発動が厳しい。これを満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '後方待機', value: 150},
            rare: {name: '眠れる獅子', value: 550},
            styleLimit: [4],
            tooltip: '位置>=75%は満たしていると見なす。先行勢より条件が難しいので注意すべし。特にゴルシ。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'パス上手', value: 150},
            distanceLimit: [4],
            tooltip: '「序盤か中盤のどこかで発動」として扱う。適当実装注意。',
            init: function () {
              if (Math.random() < 0.333) {
                this.randoms = thiz.initPhaseRandom(0)
              } else {
                this.randoms = thiz.initPhaseRandom(1)
              }
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.accTimePassed(5) &&
                  thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '軽やかなステップ', value: 150},
            rare: {name: '神業ステップ', value: 550},
            distanceLimit: [3],
            tooltip: '「開始20秒で発動」として扱う。大体そこら辺で内コースを取り始めるため。多分（ガバ）',
            check: function () {
              return thiz.isDistanceType(3) && thiz.accTimePassed(20)
            }
          },
          {
            normal: {name: 'スタミナキープ', value: 150},
            rare: {name: '余裕綽々', value: 550},
            styleLimit: [2],
            tooltip: '順位<=50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.accTimePassed(5)
                  && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '展開窺い', value: 150},
            rare: {name: '慧眼', value: 550},
            distanceLimit: [2],
            styleLimit: [3, 4],
            tooltip: '順位>50%は満たしていると見なす。実質差し追込限定。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.accTimePassed(5)
                  && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '小休憩', value: 150},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '隠れ蓑', value: 150},
            rare: {name: '鋼の意志', value: 550},
            tooltip: '「上り坂で発動」として扱う（一番現実的な発動方法なため）。実戦でやろうとしたら自前の低パワー逃げ馬が必要で先行馬限定とか色々厳しそうだけど適当実装なので自己判断＆自己責任で。',
            check: function (startPosition) {
              return thiz.accTimePassed(5) && thiz.isTriggerUphill(startPosition)
            }
          },
          {
            normal: {name: '冷静', value: 150},
            styleLimit: [4],
            tooltip: '「中盤のどこかで発動」として扱う。適当実装注意。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(4) && thiz.accTimePassed(10) &&
                  thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'ペースキープ', value: 150},
            rare: {name: '不屈の心', value: 550},
            tooltip: '「中盤のどこか」として扱う。実戦で発動できるかどうかは各自判断すべし。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'ウマ込み冷静', value: 150},
            rare: {name: 'どこ吹く風', value: 550},
            tooltip: '「中盤のどこか」として扱う。実戦で発動できるかどうかは各自判断すべし。ていうかあまり発動しないんじゃね？',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '別腹タンク', value: 150},
            rare: {name: '火事場のバ鹿力', value: 550},
            distanceLimit: [4],
            check: function () {
              return thiz.isDistanceType(4) && thiz.sp <= 0
            }
          },
        ]
      }
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
            if (skill.styleLimit && skill.styleLimit.indexOf(this.footStyle) < 0) {
              continue
            }
            if (skill.distanceLimit && skill.distanceLimit.indexOf(this.trackDetail.distanceType) < 0) {
              continue
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
    }
  },
  created() {
    this.fillSkillData()
  },
  methods: {
    initializeSkills() {
      this.invokedSkills = []
      this.coolDownMap = {}
      this.skillTriggerCount = [0, 0, 0, 0]
      for (const type in this.hasSkills) {
        for (const rarity of Object.keys(this.hasSkills[type])) {
          for (const index of this.hasSkills[type][rarity]) {
            const skill = this.skills[type][rarity][index]
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
          this.skillTriggerCount[this.currentPhase]++
          this.coolDownMap[skill.name] = this.frameElapsed
          const pos = this.trackDetail.distance - this.position
          this.log += `／残り${pos.toFixed(1)}m地点<br>`
        }
      }
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
    initPhaseRandom(phase) {
      switch (phase) {
        case 0:
          return [Math.random() * this.courseLength / 6.0]
        case 1:
          return [this.courseLength / 6.0 + Math.random() * this.courseLength / 2]
        case 2:
          return [this.courseLength * 2 / 3.0 + Math.random() * this.courseLength / 6.0]
        case 3:
        default:
          return [this.courseLength * 5 / 6.0 + Math.random() * this.courseLength / 6.0]
      }
    },
    isInRandom(randoms, startPosition) {
      for (const random of randoms) {
        if (startPosition <= random && this.position >= random) {
          return true
        }
      }
      return false
    },
    isInCorner(position) {
      for (const corner of this.trackDetail.corners) {
        const start = this.toPosition(corner[0])
        const end = this.toPosition(corner[1])
        if (position >= start && position <= end) {
          return true
        }
      }
      return false
    },
    isTriggerUphill(startPosition) {
      for (const uphill of this.trackDetail.triggerUphill) {
        if (startPosition <= this.toPosition(uphill) &&
            this.toPosition(uphill) <= this.position) {
          return true
        }
      }
      return false
    },
    isTriggerDownhill(startPosition) {
      for (const downhill of this.trackDetail.triggerDownhill) {
        if (startPosition <= this.toPosition(downhill) &&
            this.toPosition(downhill) <= this.position) {
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
    },
    isStyle(style) {
      return this.footStyle === style
    },
    isDistanceType(distanceType) {
      return this.trackDetail.distanceType === distanceType
    },
    accTimePassed(second) {
      return this.frameElapsed >= 15 * second
    },
    fillSkillData() {
      for (const type in this.skillData) {
        this.skills[type] = {
          normal: [],
          rare: []
        }
        for (const skill of this.skillData[type]) {
          for (const rarity of ['normal', 'rare']) {
            if (rarity in skill) {
              const copy = {...skill}
              copy.name = skill[rarity].name
              copy.value = skill[rarity].value
              this.fillCommonFields(copy, type)
              this.skills[type][rarity].push(copy)
            }
          }
        }
      }
    },
    fillCommonFields(copy, type) {
      const thiz = this // thiz = Vue component instance
      switch (type) {
        case 'heal':
          copy.cd = 500
          copy.duration = 0
          copy.trigger = function () {
            thiz.doHeal(this.value)
          }
          break
      }
    }
  }
}
</script>

<style scoped>

</style>