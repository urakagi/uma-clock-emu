<script>

export default {
  name: "MixinSkills",
  data() {
    const thiz = this
    return {
      rarities: ['rare', 'normal', 'unique', 'inherit', 'all'],
      rarityString: {
        rare: 'レア・ノーマル上位',
        normal: 'ノーマル下位',
        unique: '固有',
        inherit: '固有(継承)',
        all: '',
      },
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
            check: function () {
              return thiz.accTimePassed(10) && thiz.isStyle(4)
                  && thiz.isInSlope('down')
            }
          },
          {
            normal: {name: '勢い任せ', value: 150},
            rare: {name: 'じゃじゃウマ娘', value: 550},
            styleLimit: [1],
            check: function () {
              return thiz.accTimePassed(10) && thiz.isStyle(1)
                  && thiz.isInSlope('up')
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
            tooltip: '「スタート後20秒で発動」として扱う。大体そこら辺で内コースを取り始めるため。多分（ガバ）',
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
            check: function () {
              return thiz.accTimePassed(5) && thiz.isInSlope('up')
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
        targetSpeed: [
          {
            normal: {name: 'コーナー巧者○', value: 0.15},
            rare: {name: '弧線のプロフェッサー', value: 0.35},
            duration: 1.8,
            cd: 30,
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '短距離コーナー○', value: 0.15},
            rare: {name: '短距離コーナー◎', value: 0.25},
            duration: 3,
            distanceLimit: [1],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'マイルコーナー○', value: 0.15},
            rare: {name: 'マイルコーナー◎', value: 0.25},
            duration: 3,
            distanceLimit: [2],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '中距離コーナー○', value: 0.15},
            rare: {name: '中距離コーナー◎', value: 0.25},
            duration: 3,
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '長距離コーナー○', value: 0.15},
            rare: {name: '長距離コーナー◎', value: 0.25},
            duration: 3,
            distanceLimit: [4],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '逃げコーナー○', value: 0.15},
            rare: {name: '逃げコーナー◎', value: 0.25},
            duration: 3,
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '先行コーナー○', value: 0.15},
            rare: {name: '先行コーナー◎', value: 0.25},
            duration: 3,
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '差しコーナー○', value: 0.15},
            rare: {name: '差しコーナー◎', value: 0.25},
            duration: 3,
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '追込コーナー○', value: 0.15},
            rare: {name: '追込コーナー◎', value: 0.25},
            duration: 3,
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '直線巧者', value: 0.15},
            rare: {name: 'ハヤテ一文字', value: 0.35},
            duration: 0.9,
            cd: 30,
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '短距離直線○', value: 0.15},
            rare: {name: '短距離直線◎', value: 0.25},
            duration: 3,
            distanceLimit: [1],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'マイル直線○', value: 0.15},
            rare: {name: 'マイル直線◎', value: 0.25},
            duration: 3,
            distanceLimit: [2],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '中距離直線○', value: 0.15},
            rare: {name: '中距離直線◎', value: 0.25},
            duration: 3,
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '長距離直線○', value: 0.15},
            rare: {name: '長距離直線◎', value: 0.25},
            duration: 3,
            distanceLimit: [4],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '逃げ直線○', value: 0.15},
            rare: {name: '逃げ直線◎', value: 0.25},
            duration: 3,
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '先行直線○', value: 0.15},
            rare: {name: '先行直線◎', value: 0.25},
            duration: 3,
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '差し直線○', value: 0.15},
            rare: {name: '差し直線◎', value: 0.25},
            duration: 3,
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '追込直線○', value: 0.15},
            rare: {name: '追込直線◎', value: 0.25},
            duration: 3,
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '急ぎ足', value: 0.15},
            rare: {name: '脱出術', value: 0.35},
            duration: 3,
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '先頭プライド', value: 0.15},
            duration: 3,
            styleLimit: [1],
            tooltip: '「序盤のどこかで発動」として扱う',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.accTimePassed(5) && thiz.isStyle(1)
                  && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '遊びはおしまいっ！', value: 0.15},
            duration: 3,
            tooltip: '「中盤のどこかで発動」として扱う。ガバガバ実装。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.accTimePassed(10) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            unique: {name: '不沈艦、抜錨ォッ！ Lv4', value: 0.2725},
            duration: 6,
            tooltip: '順位条件の<=50%は満たしていると見なす',
            check: function () {
              return thiz.position >= thiz.courseLength * 0.5 && thiz.position <= thiz.courseLength * 0.6
            }
          },
          {
            all: {name: 'スピードイーター', value: 0.15},
            duration: 3,
            distanceLimit: [2],
            tooltip: '1位条件は満たしていると見なす。どこか発動で1位要求なので実戦は安定しない。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '末脚', value: 0.15},
            rare: {name: '全身全霊', value: 0.35},
            duration: 1.8,
            init: function () {
              this.randoms = thiz.initPhaseRandom(3)
            },
            check: function (startPosition) {
              return thiz.isInSpurt && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            unique: {name: '貴顕の使命を果たすべく', value: 0.35, duration: 5},
            inherit: {name: '※貴顕の使命を果たすべく', value: 0.15, duration: 3},
            tooltip: '位置<=30%は満たしていると見なす。',
            check: function () {
              return thiz.isInFinalCorner() || thiz.isInFinalStraight()
            }
          },
          {
            unique: {name: '汝、皇帝の神威を見よ', value: 0.45, duration: 5},
            inherit: {name: '※汝、皇帝の神威を見よ', value: 0.25, duration: 3},
            tooltip: '最終コーナーで3人追い抜きは満たしたと見なす',
            check: function () {
              return thiz.isInFinalStraight()
            }
          },
        ],
        acceleration: [
          {
            normal: {name: 'コーナー加速', value: 0.2},
            rare: {name: '曲線のソムリエ', value: 0.4},
            duration: 1.8,
            cd: 30,
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '直線加速', value: 0.2},
            rare: {name: '一陣の風', value: 0.4},
            duration: 1.8,
            cd: 30,
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '先駆け', value: 0.2},
            rare: {name: '先手必勝', value: 0.4},
            styleLimit: [1],
            duration: 1.2,
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function () {
              return thiz.isStyle(1) && thiz.currentPhase === 0 && thiz.accTimePassed(5)
            }
          },
          {
            normal: {name: '押し切り準備', value: 0.2},
            rare: {name: '逃亡者', value: 0.4},
            styleLimit: [1],
            duration: 3,
            tooltip: '1位は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '差し切り体制', value: 0.2},
            rare: {name: '乗り換え上手', value: 0.4},
            styleLimit: [3],
            duration: 1.8,
            tooltip: '順位>=50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '直線一気', value: 0.2},
            rare: {name: '迫る影', value: 0.4},
            duration: 0.9,
            styleLimit: [4],
            check: function () {
              return thiz.isStyle(4) && thiz.isInSpurt && thiz.isInStraight()
            }
          },
          {
            normal: {name: 'スプリントギア', value: 0.2},
            rare: {name: 'スプリントターボ', value: 0.4},
            duration: 3,
            distanceLimit: [1],
            check: function () {
              return thiz.isDistanceType(1) && thiz.isInStraight()
            }
          },
          {
            normal: {name: '上昇気流', value: 0.2},
            rare: {name: '豪脚', value: 0.4},
            duration: 3,
            styleLimit: [3, 4],
            distanceLimit: [2],
            tooltip: '順位>50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '善後策', value: 0.2},
            rare: {name: 'プランX', value: 0.4},
            duration: 3,
            styleLimit: [1, 2],
            distanceLimit: [1],
            tooltip: '順位>=2及び<=50%は満たしていると見なす。いや中盤どこか発動とか意味なさすぎね？',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'アクセラレーション', value: 0.2},
            rare: {name: 'アクセル全開！', value: 0.4},
            duration: 1.2,
            distanceLimit: [2],
            tooltip: '「中盤のどこかで発動」として扱う。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '二の矢', value: 0.2},
            duration: 3,
            styleLimit: [1],
            tooltip: '「中盤のどこかで発動」として扱う。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '巧みなステップ', value: 0.2},
            rare: {name: '技巧派', value: 0.3},
            duration: 1.8,
            styleLimit: [2],
            tooltip: '「スタート後20秒で発動」として扱う。ガバガバ実装。',
            check: function () {
              return thiz.isStyle(2) && thiz.accTimePassed(20)
            }
          },
          {
            normal: {name: '直滑降', value: 0.2},
            rare: {name: '決意の直滑降', value: 0.3},
            duration: 3,
            styleLimit: [2],
            check: function () {
              return thiz.isStyle(2) && thiz.isInSlope('down')
            }
          },
          {
            normal: {name: '登山家', value: 0.2},
            duration: 3,
            check: function () {
              return thiz.isInSlope('up')
            }
          },
          {
            normal: {name: 'まき直し', value: 0.2},
            duration: 3,
            styleLimit: [2],
            tooltip: '順位>50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'がんばり屋', value: 0.2},
            rare: {name: '努力家', value: 0.3},
            styleLimit: [3],
            tooltip: '「中盤のどこか」として扱う。はいはいガバ実装ガバ実装。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '地固め', value: 0.2},
            duration: 3,
            tooltip: '「緑スキルや集中力系でスタートと同時に発動」として扱う',
            check: function () {
              return true
            }
          },
          {
            unique: {name: '紅焔ギア/LP1211-M', value: 0.4, duration: 4},
            inherit: {name: '※紅焔ギア/LP1211-M', value: 0.2, duration: 2.4},
            styleLimit: [1, 2],
            tooltip: '順位<=5及び<=50%は満たしていると見なす',
            check: function () {
              return thiz.isInFinalCorner() || thiz.isInFinalStraight()
            }
          },
          {
            unique: {name: 'ヴィクトリーショット！', value: 0.4, duration: 4},
            inherit: {name: '※ヴィクトリーショット！', value: 0.2, duration: 2.4},
            styleLimit: [1, 2],
            tooltip: '順位>=3及び<=50%は満たしていると見なす',
            check: function () {
              return thiz.isInFinalCorner()
            }
          },
          {
            unique: {name: '燃えろ筋肉！', value: 0.3, duration: 4},
            styleLimit: [3, 4],
            tooltip: '常に順位>=65%及び<=70%は満たしていると見なす。実戦は発動がより遅くなる。',
            check: function () {
              return thiz.currentPhase >= 2 && thiz.isInCorner()
            }
          },
          {
            unique: {name: 'レッツ・アナボリック', value: 0.4, duration: 4},
            inherit: {name: '※レッツ・アナボリック', value: 0.2, duration: 2.4},
            styleLimit: [3, 4],
            tooltip: '常に順位>=65%及び<=70%は満たしていると見なす。実戦は発動がより遅くなる。',
            check: function () {
              return thiz.currentPhase >= 2 && thiz.isInCorner()
            }
          },
        ],
        speed: [
          {
            all: {name: '逃げためらい', value: -0.15},
            duration: 3,
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '逃げためらいx2', value: -0.3},
            duration: 3,
            styleLimit: [1],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '先行ためらい', value: -0.15},
            duration: 3,
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '先行ためらいx2', value: -0.3},
            duration: 3,
            styleLimit: [2],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '差しためらい', value: -0.15},
            duration: 3,
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '差しためらいx2', value: -0.3},
            duration: 3,
            styleLimit: [3],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '追込ためらい', value: -0.15},
            duration: 3,
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '追込ためらいx2', value: -0.3},
            duration: 3,
            styleLimit: [4],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '後方釘付', value: -0.2},
            duration: 3,
            distanceLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isContainRandom(this.randoms, startPosition)
                  && this.accTimePassed(5)
            }
          },
          {
            all: {name: '悩殺術', value: -0.25},
            duration: 3,
            distanceLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isContainRandom(this.randoms, startPosition)
                  && this.accTimePassed(5)
            }
          },
          {
            all: {name: 'スピードイーター', value: -0.15},
            duration: 3,
            distanceLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '束縛', value: -0.15},
            duration: 3,
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '独占力', value: -0.25},
            duration: 3,
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: 'まなざし', value: -0.15},
            duration: 3,
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
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
    },
    isInSpurt() {
      return !!this.spurtParameters
    },
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
            if (type === 'fatigue' || type === 'speed') {
              invokeRate = 80
            } else if (rarity === 'unique') {
              invokeRate = 100
            } else {
              // FIXME: for debug, always pass wisdom check
              if (this.production) {
                invokeRate = 100 - 9000.0 / this.umaStatus.wisdom
              } else {
                invokeRate = 100000 - 9000.0 / this.umaStatus.wisdom
              }
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
          if (skill.duration) {
            this.operatingSkills[skill.type].push({data: skill, startFrame: this.frameElapsed})
            skillTriggered.push({data: skill})
          } else {
            const skillDetail = skill.trigger()
            skillTriggered.push({data: skill, detail: skillDetail})
          }
          this.skillTriggerCount[this.currentPhase]++
          this.coolDownMap[skill.name] = this.frameElapsed
        }
      }
      return skillTriggered
    },
    initCornerRandom() {
      const ret = []
      for (const corner of this.trackDetail.corners.slice(-4)) {
        const start = this.toPosition(corner[0])
        const end = this.toPosition(corner[1])
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
    initFinalCornerRandom() {
      const ret = []
      const corner = this.trackDetail.corners[this.trackDetail.corners.length - 1]
      const start = this.toPosition(corner[0])
      const end = this.toPosition(corner[1])
      ret.push(Math.random() * (end - start) + start)
      return ret
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
      return position >= this.toPosition(fc[0]) && this.toPosition(position <= fc[1])
    },
    isInFinalStraight(position) {
      if (!position) {
        position = this.position
      }
      const fc = this.trackDetail.corners[this.trackDetail.corners.length - 1]
      return position > this.toPosition(fc[1])
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
        const o = {}
        for (const rarity of this.rarities) {
          o[rarity] = []
        }
        this.skills[type] = o
        for (const skill of this.skillData[type]) {
          for (const rarity of this.rarities) {
            if (rarity in skill) {
              const copy = {...skill}
              copy.name = skill[rarity].name
              copy.value = skill[rarity].value
              if (skill[rarity].duration) {
                copy.duration = skill[rarity].duration
              }
              copy.type = type
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
        case 'speed':
        case 'targetSpeed':
        case 'acceleration':
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
      const o = {
        fatigue: {
          all: []
        },
        speed: {
          all: []
        }
      }
      const SELF_KEYS = ['heal', 'targetSpeed', 'acceleration']
      for (const key of SELF_KEYS) {
        o[key] = {
          rare: [],
          normal: [],
          unique: [],
          inherit: []
        }
      }
      this.hasSkills = o
    }
  }
}
</script>

<style scoped>

</style>