<script>
export default {
  name: "MixinSkills",
  data() {
    const thiz = this
    return {
      invokedSkills: [],
      coolDownMap: {},
      hasSkills: {},
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
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '直線回復', value: 150},
            rare: {name: '好転一息', value: 550},
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isDistanceType(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'スリーセブン', value: 150},
            init: function () {
              this.randoms = [thiz.courseLength - 777]
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.accTimePassed(10) && thiz.isStyle(4)
                  && thiz.isContainSlopeTrigger('down', startPosition)
            }
          },
          {
            normal: {name: '勢い任せ', value: 150},
            rare: {name: 'じゃじゃウマ娘', value: 550},
            styleLimit: [1],
            check: function (startPosition) {
              return thiz.accTimePassed(10) && thiz.isStyle(1)
                  && thiz.isContainSlopeTrigger('up', startPosition)
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
              return thiz.isStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isDistanceType(1) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isDistanceType(4) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isDistanceType(3) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
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
                  thiz.isContainRandom(this.randoms, startPosition)
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
                  && thiz.isContainRandom(this.randoms, startPosition)
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
                  && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '小休憩', value: 150},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '隠れ蓑', value: 150},
            rare: {name: '鋼の意志', value: 550},
            tooltip: '「上り坂で発動」として扱う（一番現実的な発動方法なため）。実戦でやろうとしたら自前の低パワー逃げ馬が必要で先行馬限定とか色々厳しそうだけど適当実装なので自己判断＆自己責任で。',
            check: function (startPosition) {
              return thiz.accTimePassed(5) && thiz.isContainSlopeTrigger('up', startPosition)
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
                  thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isContainRandom(this.randoms, startPosition)
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
          {
            unique: {name: 'introduction: My body Lv5', value: 378},
            tooltip: '順位条件の>=3＆<=40%は満たしていると見なす',
            check: function () {
              return thiz.position >= thiz.courseLength / 2.0 && thiz.isInCorner(thiz.position)
            }
          },
          {
            unique: {name: 'U=ma2 Lv4', value: 583},
            tooltip: '順位条件の>=3＆<=40%は満たしていると見なす',
            check: function () {
              return thiz.position >= thiz.courseLength / 2.0 && thiz.isInCorner(thiz.position)
            }
          },
          {
            unique: {name: 'クリアハート Lv5', value: 378},
            tooltip: '順位条件の>=2＆<=40%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            unique: {name: 'ピュリティオブハート Lv4', value: 583},
            tooltip: '順位条件の>=2＆<=40%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            unique: {name: 'ワクワクよーいドン Lv5', value: 378},
            tooltip: '近くにウマ娘がいる＆順位<=50%は満たしていると見なす',
            check: function () {
              return thiz.isInFinalCorner()
            }
          },
          {
            unique: {name: ' ワクワククライマックス Lv4', value: 583},
            tooltip: '近くにウマ娘がいる＆順位<=50%は満たしていると見なす',
            check: function () {
              return thiz.isInFinalCorner()
            }
          },
        ],
        speed: [
          {
            normal: {name: 'コーナー巧者○', value: 0.15},
            rare: {name: '弧線のプロフェッサー', value: 0.35},
            duration: 1.8,
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
        ],
        accelerate: [
          {
            normal: {name: '直線一気', value: 0.2},
            rare: {name: '迫る影', value: 0.4},
            duration: 0.9,
            check: function () {
              return thiz.isStyle(4) && thiz.isInSpurt && thiz.isInStraight(this.position)
            }
          },
        ],
        fatigue: [
          {
            all: {name: 'スタミナイーター', value: 50},
            distanceLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: 'スタミナイーターx2', value: 100},
            distanceLimit: [4],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '逃げけん制', value: 100},
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '逃げけん制x2', value: 200},
            styleLimit: [1],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '先行けん制', value: 100},
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '先行けん制x2', value: 200},
            styleLimit: [2],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '差しけん制', value: 100},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '差しけん制x2', value: 200},
            styleLimit: [3],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '追込けん制', value: 100},
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '追込けん制x2', value: 200},
            styleLimit: [4],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '逃げ焦り', value: 100},
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '逃げ焦りx2', value: 200},
            styleLimit: [1],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '先行焦り', value: 100},
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '先行焦りx2', value: 200},
            styleLimit: [2],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '差し焦り', value: 100},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '差し焦りx2', value: 200},
            styleLimit: [3],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '追込焦り', value: 100},
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '追込焦りx2', value: 200},
            styleLimit: [4],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '抜け駆け禁止', value: 100},
            distanceLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isContainRandom(this.randoms, startPosition)
                  && thiz.accTimePassed(5)
            }
          },
          {
            all: {name: 'ささやき', value: 100},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: 'ささやきx2', value: 200},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '魅惑のささやき', value: 300},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '魅惑のささやきx2', value: 600},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '鋭い眼光', value: 100},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '鋭い眼光x2', value: 200},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '八方にらみ', value: 300},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '八方にらみx2', value: 600},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
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
    this.resetHasSkills()
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
            let invokeRate
            if (type === 'fatigue') {
              invokeRate = 80
            } else {
              // FIXME: for debug, always pass wisdom check
              // invokeRate = 100000 - 9000.0 / this.umaStatus.wisdom
              invokeRate = 100 - 9000.0 / this.umaStatus.wisdom
            }
            if (Math.random() * 100 < invokeRate) {
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
      const skillTriggered = []
      for (const skill of this.invokedSkills) {
        if (this.isInCoolDown(skill)) {
          continue
        }
        if (skill.check(startPosition)) {
          const skillDetail = skill.trigger()
          this.skillTriggerCount[this.currentPhase]++
          this.coolDownMap[skill.name] = this.frameElapsed
          skillTriggered.push({skill, detail: skillDetail})
        }
      }
      return skillTriggered
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
    isContainRandom(randoms, startPosition) {
      for (const random of randoms) {
        if (startPosition <= random && this.position >= random) {
          return true
        }
      }
      return false
    },
    isInCorner(position) {
      if (!position) {
        position = this.position
      }
      for (const corner of this.trackDetail.corners) {
        const start = this.toPosition(corner[0])
        const end = this.toPosition(corner[1])
        if (position >= start && position <= end) {
          return true
        }
      }
      return false
    },
    isInStraight(position) {
      return !this.isInCorner(position)
    },
    isInFinalCorner(position) {
      if (!position) {
        position = this.position
      }
      const fc = this.trackDetail.corners[this.trackDetail.corners.length - 1]
      return position >= fc[0] && position <= fc[1]
    },
    isInFinalStraight(position) {
      if (!position) {
        position = this.position
      }
      const fc = this.trackDetail.corners[this.trackDetail.corners.length - 1]
      return position > fc[1]
    },
    isInSpurt() {
      return !!this.spurtParameters
    },
    isContainSlopeTrigger(direction, startPosition) {
      for (const upSlope of this.trackDetail[`${direction}Slope`]) {
        if (startPosition <= this.toPosition(upSlope.end) &&
            this.position >= this.toPosition(upSlope.end)) {
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
      return detail
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
          rare: [],
          unique: [],
          all: []
        }
        for (const skill of this.skillData[type]) {
          for (const rarity of ['normal', 'rare', 'unique', 'all']) {
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
      if (!copy.cd) {
        copy.cd = 500
      }
      switch (type) {
        case 'heal':
          copy.duration = 0
          if (!copy.trigger) {
            copy.trigger = function () {
              return thiz.doHeal(this.value)
            }
          }
          break
        case 'fatigue':
          copy.duration = 0
          if (!copy.trigger) {
            copy.trigger = function () {
              return thiz.doHeal(-this.value)
            }
          }
          break
      }
    },
    resetHasSkills() {
      this.hasSkills = {
        heal: {
          rare: [],
          normal: [],
          unique: []
        },
        fatigue: {
          all: []
        }
      }
    }
  }
}
</script>

<style scoped>

</style>