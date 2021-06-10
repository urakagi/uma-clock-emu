<script>

export default {
  name: "MixinSkills",
  data() {
    const thiz = this
    return {
      rarities: ['rare', 'normal', 'inherit', 'all'],
      rarityString: {
        rare: 'レア・ノーマル上位',
        normal: 'ノーマル下位',
        inherit: '固有(継承)',
        all: '',
      },
      invokedSkills: [],
      coolDownMap: {},
      hasSkills: {},
      selectedUnique: 'なし／発動しない',
      uniqueLevel: 4,
      skillTriggerCount: [0, 0, 0, 0],
      skills: {},
      skillData: {
        passive: [
          {
            normal: {name: '左回り○', value: 40},
            status: ['speed'],
            courseLimit: {
              'turn': [2]
            },
          },
          {
            normal: {name: '左回り◎', value: 60},
            status: ['speed'],
            courseLimit: {
              'turn': [2]
            },
          },
          {
            normal: {name: '右回り○', value: 40},
            status: ['speed'],
            courseLimit: {
              'turn': [1]
            },
          },
          {
            normal: {name: '右回り◎', value: 60},
            status: ['speed'],
            courseLimit: {
              'turn': [1]
            },
          },
          {
            normal: {name: '季節ウマ娘○', value: 40},
            status: ['speed'],
            courseLimit: {
              'turn': [1]
            },
          },
          {
            normal: {name: '季節ウマ娘◎', value: 60},
            status: ['speed'],
            courseLimit: {
              'turn': [1]
            },
          },
          {
            normal: {name: 'おひとり様○', value: 40},
            status: ['speed'],
            courseLimit: {
              'turn': [1]
            },
          },
          {
            normal: {name: 'おひとり様◎', value: 60},
            status: ['speed'],
            courseLimit: {
              'turn': [1]
            },
          },
          {
            normal: {name: '伏兵○', value: 40},
            status: ['speed'],
            courseLimit: {
              'turn': [1]
            },
          },
          {
            normal: {name: '伏兵◎', value: 60},
            status: ['speed'],
            courseLimit: {
              'turn': [1]
            },
          },
          {
            normal: {name: '外枠得意○', value: 40},
            status: ['speed'],
            tooltip: '発動率44%として扱う(チャンピオンズミーティング基準)',
            triggerRate: 4.0 / 9,
            check: function () {
              return true
            }
          },
          {
            normal: {name: '外枠得意◎', value: 60},
            status: ['speed'],
            tooltip: '発動率44%として扱う(チャンピオンズミーティング基準)',
            triggerRate: 4.0 / 9,
            check: function () {
              return true
            }
          },
          {
            normal: {name: 'シンパシー', value: 40},
            status: ['speed'],
            check: function () {
              return true
            }
          },
          {
            normal: {name: '一匹狼', value: 40},
            status: ['speed'],
            check: function () {
              return true
            }
          },
          {
            normal: {name: '札幌レース場○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10001]
            },
          },
          {
            normal: {name: '札幌レース場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10001]
            },
          },
          {
            normal: {name: '函館レース場○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10002]
            },
          },
          {
            normal: {name: '函館レース場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10002]
            },
          },
          {
            normal: {name: '新潟レース場○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10003]
            },
          },
          {
            normal: {name: '新潟レース場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10003]
            },
          },
          {
            normal: {name: '福島レース場○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10004]
            },
          },
          {
            normal: {name: '福島レース場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10004]
            },
          },
          {
            normal: {name: '中山レース場○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10005]
            },
          },
          {
            normal: {name: '中山レース場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10005]
            },
          },
          {
            normal: {name: '東京レース場○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10006]
            },
          },
          {
            normal: {name: '東京レース場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10006]
            },
          },
          {
            normal: {name: '中京レース場○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10007]
            },
          },
          {
            normal: {name: '中京レース場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10007]
            },
          },
          {
            normal: {name: '京都レース場○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10008]
            },
          },
          {
            normal: {name: '京都レース場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10008]
            },
          },
          {
            normal: {name: '阪神レース場○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10009]
            },
          },
          {
            normal: {name: '阪神レース場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10009]
            },
          },
          {
            normal: {name: '小倉レース場○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10010]
            },
          },
          {
            normal: {name: '小倉レース場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10010]
            },
          },
          {
            normal: {name: '大井レース場○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10101]
            },
          },
          {
            normal: {name: '大井レース場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10101]
            },
          },
          {
            normal: {name: '根幹距離○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'distance': [1200, 1600, 2000, 2400, 2800, 3200, 3600]
            },
          },
          {
            normal: {name: '根幹距離◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'distance': [1200, 1600, 2000, 2400, 2800, 3200, 3600]
            },
          },
          {
            normal: {name: '非根幹距離○', value: 40},
            status: ['stamina'],
            courseLimit: {
              'distance': [1000, 1100, 1300, 1400, 1500, 1700, 1800, 1900, 2100, 2200
                , 2300, 2500, 2600, 2700, 2900, 3000, 3100, 3300, 3400, 3500]
            },
          },
          {
            normal: {name: '非根幹距離◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'distance': [1000, 1100, 1300, 1400, 1500, 1700, 1800, 1900, 2100, 2200
                , 2300, 2500, 2600, 2700, 2900, 3000, 3100, 3300, 3400, 3500]
            },
          },
          {
            normal: {name: '良馬場○', value: 40},
            surfaceConditionLimit: ['0'],
            status: ['power'],
            check: function () {
              return thiz.track.surfaceCondition === '0'
            }
          },
          {
            normal: {name: '良馬場◎', value: 60},
            surfaceConditionLimit: ['0'],
            status: ['power'],
            check: function () {
              return thiz.track.surfaceCondition === '0'
            }
          },
          {
            normal: {name: '道悪○', value: 40},
            surfaceConditionLimit: ['1', '2', '3'],
            status: ['power'],
            check: function () {
              return thiz.track.surfaceCondition !== '0'
            }
          },
          {
            normal: {name: '道悪◎', value: 60},
            surfaceConditionLimit: ['1', '2', '3'],
            status: ['power'],
            check: function () {
              return thiz.track.surfaceCondition !== '0'
            }
          },
          {
            normal: {name: '対抗意識○', value: 40},
            status: ['power'],
            check: function () {
              return true
            }
          },
          {
            normal: {name: '対抗意識◎', value: 60},
            status: ['power'],
            check: function () {
              return true
            }
          },
          {
            normal: {name: '天気の日○', value: 40},
            status: ['guts'],
            check: function () {
              return true
            }
          },
          {
            normal: {name: '天気の日◎', value: 60},
            status: ['guts'],
            check: function () {
              return true
            }
          },
          {
            normal: {name: '徹底マーク○', value: 40},
            status: ['guts'],
            check: function () {
              return true
            }
          },
          {
            normal: {name: '徹底マーク◎', value: 60},
            status: ['guts'],
            check: function () {
              return true
            }
          },
          {
            normal: {name: '内枠得意○', value: 40},
            status: ['wisdom'],
            tooltip: '発動率33%として扱う(チャンピオンズミーティング基準)',
            triggerRate: 3.0 / 9,
            check: function () {
              return true
            }
          },
          {
            normal: {name: '内枠得意◎', value: 60},
            status: ['wisdom'],
            tooltip: '発動率33%として扱う(チャンピオンズミーティング基準)',
            triggerRate: 3.0 / 9,
            check: function () {
              return true
            }
          },
          {
            normal: {name: '逃げのコツ○', value: 40},
            status: ['wisdom'],
            styleLimit: [1],
            check: function () {
              return thiz.isRunningStyle(1)
            }
          },
          {
            normal: {name: '逃げのコツ◎', value: 60},
            status: ['wisdom'],
            styleLimit: [1],
            check: function () {
              return thiz.isRunningStyle(1)
            }
          },
          {
            normal: {name: '先行のコツ○', value: 40},
            status: ['wisdom'],
            styleLimit: [2],
            check: function () {
              return thiz.isRunningStyle(2)
            }
          },
          {
            normal: {name: '先行のコツ◎', value: 60},
            status: ['wisdom'],
            styleLimit: [2],
            check: function () {
              return thiz.isRunningStyle(2)
            }
          },
          {
            normal: {name: '差しのコツ○', value: 40},
            status: ['wisdom'],
            styleLimit: [3],
            check: function () {
              return thiz.isRunningStyle(3)
            }
          },
          {
            normal: {name: '差しのコツ◎', value: 60},
            status: ['wisdom'],
            styleLimit: [3],
            check: function () {
              return thiz.isRunningStyle(3)
            }
          },
          {
            normal: {name: '追込のコツ○', value: 40},
            status: ['wisdom'],
            styleLimit: [4],
            check: function () {
              return thiz.isRunningStyle(4)
            }
          },
          {
            normal: {name: '追込のコツ◎', value: 60},
            status: ['wisdom'],
            styleLimit: [4],
            check: function () {
              return thiz.isRunningStyle(4)
            }
          },
          {
            normal: {name: 'ラッキーセブン', value: 40},
            rare: {name: 'スーパーラッキーセブン', value: 60},
            status: ['speed', 'stamina', 'power'],
            tooltip: '発動率1/18として扱う(チャンピオンズミーティング基準)',
            triggerRate: 1.0 / 18,
            check: function () {
              return true
            }
          },
        ],
        gate: [
          {
            normal: {name: '集中力', value: 0.9},
            rare: {name: 'コンセントレーション', value: 0.4}
          }
        ],
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
              return thiz.accTimePassed(10) && thiz.isRunningStyle(4)
                  && thiz.isInSlope('down')
            }
          },
          {
            normal: {name: '勢い任せ', value: 150},
            rare: {name: 'じゃじゃウマ娘', value: 550},
            styleLimit: [1],
            check: function () {
              return thiz.accTimePassed(10) && thiz.isRunningStyle(1)
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
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(2) && thiz.accTimePassed(5)
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
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(4) && thiz.accTimePassed(10) &&
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
            inherit: {name: 'U=ma2', value: 150},
            tooltip: '順位条件の>=3＆<=40%は満たしていると見なす',
            check: function () {
              return thiz.position >= thiz.courseLength / 2.0 && thiz.isInCorner(thiz.position)
            }
          },
          {
            inherit: {name: 'ピュリティオブハート', value: 150},
            heal: 583,
            tooltip: '順位条件の>=2＆<=40%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: 'ワクワククライマックス', value: 150},
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
              return thiz.isRunningStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '位置取り押し上げ', value: 0.15},
            rare: {name: '迅速果断', value: 0.35},
            duration: 1.8,
            styleLimit: [3],
            tooltip: '順位>50%を満たしたと見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.accTimePassed(5) && thiz.isRunningStyle(1)
                  && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '抜け出し準備', value: 0.15},
            rare: {name: 'スピードスター', value: 0.35},
            duration: 1.2,
            styleLimit: [2],
            tooltip: '順位条件の<=50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '外差し準備', value: 0.15},
            rare: {name: '昇り龍', value: 0.35},
            duration: 3,
            styleLimit: [3],
            tooltip: '「最終コーナーのどこか」として扱う。当てにならない。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '十万バリキ', value: 0.15},
            duration: 1.8,
            styleLimit: [3],
            check: function () {
              return thiz.isRunningStyle(3) && thiz.isInSlope('up')
            }
          },
          {
            normal: {name: '大きなリード', value: 0.15},
            rare: {name: '圧倒的リード', value: 0.35},
            duration: 1.2,
            distanceLimit: [1],
            styleLimit: [1],
            tooltip: '中盤に入った瞬間に1位で5馬身リードしていると見なす。見なすな。',
            check: function () {
              return thiz.isDistanceType(1) && thiz.curretPhase === 1
            }
          },
          {
            normal: {name: '詰め寄り', value: 0.15},
            rare: {name: '電撃の煌めき', value: 0.35},
            duration: 3,
            distanceLimit: [1],
            styleLimit: [3, 4],
            tooltip: '順位>50%を満たしたと見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '積極策', value: 0.15},
            rare: {name: 'マイルの支配者', value: 0.35},
            duration: 3,
            distanceLimit: [2],
            styleLimit: [1, 2],
            tooltip: '順位1位を満たしたと見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isContainRandom(this.randoms, startPosition)
                  && thiz.accTimePassed(5)
            }
          },
          {
            normal: {name: 'ギアシフト', value: 0.15},
            rare: {name: 'ギアチェンジ', value: 0.35},
            duration: 1.2,
            distanceLimit: [2],
            styleLimit: [1, 2],
            tooltip: '順位<=50%を満たしたと見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '負けん気', value: 0.15},
            rare: {name: '姉御肌', value: 0.35},
            duration: 1.8,
            distanceLimit: [2],
            tooltip: '「中盤のどこか」として扱う。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isContainRandom(this.randoms, startPosition)
                  && thiz.accTimePassed(5)
            }
          },
          {
            normal: {name: 'テンポアップ', value: 0.15},
            rare: {name: 'キラーチューン', value: 0.35},
            duration: 0.9,
            distanceLimit: [3],
            styleLimit: [1, 2],
            tooltip: '順位<=50%を満たしたと見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '食い下がり', value: 0.15},
            rare: {name: '勝利への執念', value: 0.35},
            duration: 3,
            distanceLimit: [3],
            tooltip: '「最終コーナーのどこか」として扱う。当てにならない。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '内弁慶', value: 0.15},
            duration: 3,
            distanceLimit: [4],
            tooltip: '内ラチ側にいると見なす。実質逃げ馬用かな？知らないけど。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'リードキープ', value: 0.15},
            rare: {name: '先陣の心得', value: 0.35},
            duration: 3,
            distanceLimit: [4],
            tooltip: '「中盤のどこか」の時に3馬身リードしていると見なす。普通は単独逃げ馬以外では夢物語。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isContainRandom(this.randoms, startPosition)
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
            normal: {name: 'スリップストリーム', value: 0.15},
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
            normal: {name: '仕掛け抜群', value: 0.15},
            duration: 3,
            styleLimit: [4],
            tooltip: '位置>75%を満たしたと見なす。実戦は条件を注意すべし。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '追い上げ', value: 0.15},
            duration: 3,
            styleLimit: [4],
            tooltip: '「終盤のどこか」として扱う。実際は加速中に消化されるのが大半。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'スピードイーター', value: 0.15},
            duration: 3,
            styleLimit: [1],
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
            normal: {name: 'ペースアップ', value: 0.15},
            rare: {name: 'アガってきた！', value: 0.35},
            duration: 1.8,
            tooltip: '「中盤のどこかで発動」として扱う。ガバガバ実装。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'レコメンド', value: 0.15},
            rare: {name: 'チャート急上昇！', value: 0.35},
            duration: 1.8,
            surfaceLimit: [2],
            tooltip: '「中盤のどこか」として扱う。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isSurfaceType(2) && thiz.isContainRandom(this.randoms, startPosition)
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
            normal: {name: '尻尾上がり', value: 0.15},
            duration: 3,
            check: function () {
              return thiz.skillTriggerCount[1] >= 3
            }
          },
          {
            inherit: {name: '不沈艦、抜錨ォッ！', value: 0.05},
            duration: 3.6,
            tooltip: '順位条件の<=50%は満たしていると見なす',
            check: function () {
              return thiz.position >= thiz.courseLength * 0.5 && thiz.position <= thiz.courseLength * 0.6
            }
          },
          {
            inherit: {name: '貴顕の使命を果たすべく', value: 0.15},
            duration: 3,
            tooltip: '位置<=30%は満たしていると見なす。',
            check: function () {
              return thiz.isInFinalCorner() || thiz.isInFinalStraight()
            }
          },
          {
            inherit: {name: 'G00 1st.F∞;', value: 0.15},
            duration: 3,
            check: function () {
              return thiz.temptationModeStart == null && thiz.startDelay < 0.08
                  && thiz.isInFinalStraight()
            }
          },
          {
            inherit: {name: '最強の名を懸けて', value: 0.15},
            duration: 3,
            tooltip: '「最終直線のどこか」として扱う。',
            init: function () {
              this.randoms = thiz.initFinalStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            tooltip: '「他面倒くさいの全部満たしたと見なして200mで発動する」として扱う。',
            check: function (startPosition) {
              return startPosition <= thiz.toPosition(200)
                  && thiz.position >= thiz.toPosition(200)
            }
          },
          {
            inherit: {name: 'カッティング✕DRIVE！', value: 0.15},
            duration: 3,
            tooltip: '「他面倒くさいの全部満たしたと見なして200mで発動する」として扱う。',
            check: function (startPosition) {
              return startPosition <= thiz.toPosition(200)
                  && thiz.position >= thiz.toPosition(200)
            }
          },
          {
            inherit: {name: '勝利の鼓動', value: 0.25},
            duration: 3,
            tooltip: '順位条件は満たしてると見なす',
            check: function (startPosition) {
              return startPosition <= thiz.toPosition(200)
                  && thiz.position >= thiz.toPosition(200)
            }
          },
          {
            inherit: {name: '汝、皇帝の神威を見よ', value: 0.25},
            duration: 3,
            tooltip: '最終コーナーで3人追い抜きは満たしたと見なす',
            check: function () {
              return thiz.isInFinalStraight()
            }
          },
          {
            tooltip: '他面倒くさいの全部満たしたと見なし「最終コーナーのどこかで発動する」として扱う。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: 'ブレイズ・オブ・プライド', value: 0.15},
            duration: 3,
            tooltip: '他面倒くさいの全部満たしたと見なし「最終コーナーのどこかで発動する」として扱う。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            tooltip: '他面倒くさいの全部満たしたと見なし「最終直線のどこかで発動する」として扱う。',
            init: function () {
              this.randoms = thiz.initFinalStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: '勝利のチケットを、君にッ！', value: 0.15},
            duration: 3,
            tooltip: '他面倒くさいの全部満たしたと見なし「最終直線のどこかで発動する」として扱う。',
            init: function () {
              this.randoms = thiz.initFinalStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: '優等生×バクシン＝大勝利ッ', value: 0.15},
            duration: 3,
            tooltip: '「レース1/2～5/6のどこかで発動する」として扱う。',
            init: function () {
              this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: '来ます来てます来させます！', value: 0.15},
            duration: 3,
            tooltip: '「終盤のどこかで発動する」として扱う。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: 'きっとその先へ…！', value: 0.15},
            duration: 3,
            tooltip: '「ラストスパートのどこかで発動する」として扱う。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(3)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: '精神一到何事か成らざらん', value: 0.15},
            duration: 3,
            tooltip: '「最終直線のどこかで発動する」として扱う。',
            init: function () {
              this.randoms = thiz.initFinalStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: 'Pride of KING', value: 0.25},
            duration: 3,
            check: function (startPosition) {
              return startPosition <= thiz.toPosition(200)
                  && thiz.position >= thiz.toPosition(200)
                  && thiz.temptationModeStart == null && thiz.startDelay < 0.08
            }
          },
          {
            inherit: {name: 'シューティングスター', value: 0.15},
            duration: 3,
            tooltip: '「終盤のどこかで発動する」として扱う。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: '先頭の景色は譲らない…！', value: 0.15},
            duration: 3,
            check: function () {
              return thiz.isInFinalStraight()
            }
          },
          {
            inherit: {name: '究極テイオーステップ', value: 0.25},
            duration: 3,
            tooltip: '他の条件は無視して「最終直線であれば発動する」として扱う',
            check: function () {
              return thiz.isInFinalStraight()
            }
          },
          {
            inherit: {name: 'ヴィットーリアに捧ぐ舞踏', value: 0.15},
            duration: 3,
            tooltip: '「最終コーナーのどこかで発動」として扱う。まぁ発動しないけど。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: 'Shadow Break', value: 0.15},
            duration: 3,
            tooltip: '「最終コーナーのどこかで発動」として扱う',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: '∴win Q.E.D.', targetSpeed: 0.15},
            duration: 3,
            tooltip: '「最終コーナーのどこかで発動」として扱う',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: 'ブルーローズチェイサー', targetSpeed: 0.15},
            duration: 3,
            tooltip: '「最終直線のどこかで発動」として扱う',
            init: function () {
              this.randoms = thiz.initFinalStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: 'Nemesis', targetSpeed: 0.15},
            duration: 3,
            tooltip: '「最終コーナーのどこかで発動」として扱う',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: '絶対に、ボクだ', targetSpeed: 0.15},
            duration: 3,
            tooltip: '「最終直線のどこかで発動」として扱う',
            init: function () {
              this.randoms = thiz.initFinalStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: 'フラワリー☆マニューバ(前)', targetSpeed: 0.15},
            duration: 3,
            tooltip: '「最終コーナーのどこかで発動」として扱う。こちらは前の方。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {name: '薫風、永遠なる瞬間を', targetSpeed: 0.15},
            duration: 3,
            tooltip: '「中盤のどこかで発動」として扱うが、基本的には発動しない。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(1) && thiz.currentPhase === 0 && thiz.accTimePassed(5)
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
              return thiz.isRunningStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '直線一気', value: 0.2},
            rare: {name: '迫る影', value: 0.4},
            duration: 0.9,
            styleLimit: [4],
            check: function () {
              return thiz.isRunningStyle(4) && thiz.isInSpurt && thiz.isInStraight()
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
              return thiz.isRunningStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: '巧みなステップ', value: 0.2},
            rare: {name: '技巧派', value: 0.3},
            duration: 1.8,
            styleLimit: [2],
            tooltip: '「スタート後20秒で発動」として扱う。ガバガバ実装。',
            check: function () {
              return thiz.isRunningStyle(2) && thiz.accTimePassed(20)
            }
          },
          {
            normal: {name: '直滑降', value: 0.2},
            rare: {name: '決意の直滑降', value: 0.3},
            duration: 3,
            styleLimit: [2],
            check: function () {
              return thiz.isRunningStyle(2) && thiz.isInSlope('down')
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
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {name: 'がんばり屋', value: 0.2},
            rare: {name: '努力家', value: 0.3},
            duration: 3,
            styleLimit: [3],
            tooltip: '「中盤のどこか」として扱う。はいはいガバ実装ガバ実装。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
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
            inherit: {name: '紅焔ギア/LP1211-M', value: 0.2},
            duration: 2.4,
            tooltip: '順位<=5及び<=50%は満たしていると見なす',
            check: function () {
              return thiz.isInFinalCorner() || thiz.isInFinalStraight()
            }
          },
          {
            inherit: {name: 'ヴィクトリーショット！', value: 0.2},
            duration: 2.4,
            styleLimit: [1, 2],
            tooltip: '順位>=3及び<=50%は満たしていると見なす',
            check: function () {
              return thiz.isInFinalCorner()
            }
          },
          {
            inherit: {name: 'レッツ・アナボリック', value: 0.2},
            duration: 2.4,
            styleLimit: [3, 4],
            tooltip: '常に順位>=65%及び<=70%は満たしていると見なす。実戦は発動がより遅くなる。',
            check: function () {
              return thiz.currentPhase >= 2 && thiz.isInCorner()
            }
          },
          {
            inherit: {name: 'アングリング×スキミング', value: 0.2},
            duration: 2.4,
            styleLimit: [1],
            tooltip: '順位1位は満たしたと見なす',
            check: function () {
              return thiz.currentPhase >= 2 && thiz.isInCorner()
            }
          },
          {
            name: 'フラワリー☆マニューバ(後)',
            acceleration: 0.2,
            duration: 2.4,
            styleLimit: [3, 4],
            tooltip: '「最終コーナーのどこかで発動」として扱う。こちらは後の方。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
        ],
        boost: [
          {
            inherit: {
              name: 'ブリリアント・レッドエース',
              value: {targetSpeed: 0.05, acceleration: 0.1}
            },
            duration: 3,
            tooltip: '「レース1/2～5/6のどこかで発動する」として扱う。',
            init: function () {
              this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {
              name: 'ブランチャ☆ガナドール',
              value: {targetSpeed: 0.05, acceleration: 0.1}
            },
            duration: 3,
            tooltip: '順位2位以内は満たしていると見なす',
            check: function () {
              return thiz.isInFinalStraight() && thiz.sp >= 0.3 * thiz.spMax
            }
          },
          {
            inherit: {
              name: 'ひらめき☆ランディング',
              value: {targetSpeed: 0.05, acceleration: 0.1}
            },
            duration: 3,
            tooltip: '条件を満たして最終直線入ったときに発動するとして扱う',
            check: function () {
              return thiz.isInFinalStraight()
            }
          },
          {
            inherit: {
              name: '#LookatCurren',
              value: {targetSpeed: 0.05, acceleration: 0.1}
            },
            duration: 3,
            tooltip: '「レース50%-65%のどこかで発動する」として扱う',
            init: function () {
              this.randoms = thiz.initIntervalRandom(0.5, 0.65)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            inherit: {
              name: 'キラキラ☆STARDOM',
              value: {targetSpeed: 0.05, acceleration: 0.1}
            },
            duration: 3,
            tooltip: '「中盤直線のどこか」として扱う',
            init: function () {
              this.randoms = thiz.initStraightRandom(1)
            },
            check: function (startPosition) {
              return thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '先行けん制', value: 100},
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '差しけん制', value: 100},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '追込けん制', value: 100},
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '逃げ焦り', value: 100},
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(1) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '先行焦り', value: 100},
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(2) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '差し焦り', value: 100},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(3) && thiz.isContainRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '追込焦り', value: 100},
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
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
              return thiz.isRunningStyle(4) && thiz.isContainRandom(this.randoms, startPosition)
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
      },
      uniqueSkillData: [
        {
          name: 'なし／発動しない',
          check: function () {
            return false
          }
        },
        {
          name: 'introduction: My body',
          heal: 350,
          tooltip: '順位条件の>=3＆<=40%は満たしていると見なす',
          check: function () {
            return thiz.position >= thiz.courseLength / 2.0 && thiz.isInCorner(thiz.position)
          }
        },
        {
          name: 'U=ma2',
          heal: 550,
          tooltip: '順位条件の>=3＆<=40%は満たしていると見なす',
          check: function () {
            return thiz.position >= thiz.courseLength / 2.0 && thiz.isInCorner(thiz.position)
          }
        },
        {
          name: 'クリアハート',
          heal: 350,
          tooltip: '順位条件の>=2＆<=40%は満たしていると見なす',
          init: function () {
            this.randoms = thiz.initPhaseRandom(1)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'ピュリティオブハート',
          heal: 550,
          tooltip: '順位条件の>=2＆<=40%は満たしていると見なす',
          init: function () {
            this.randoms = thiz.initPhaseRandom(1)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'ワクワクよーいドン',
          heal: 350,
          tooltip: '近くにウマ娘がいる＆順位<=50%は満たしていると見なす',
          check: function () {
            return thiz.isInFinalCorner()
          }
        },
        {
          name: ' ワクワククライマックス',
          heal: 550,
          tooltip: '近くにウマ娘がいる＆順位<=50%は満たしていると見なす',
          check: function () {
            return thiz.isInFinalCorner()
          }
        },
        {
          name: '波乱注意報！',
          targetSpeed: 0.15,
          duration: 6,
          tooltip: '順位条件の<=50%は満たしていると見なす',
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5 && thiz.position <= thiz.courseLength * 0.6
          }
        },
        {
          name: '不沈艦、抜錨ォッ！',
          targetSpeed: 0.25,
          duration: 6,
          tooltip: '順位条件の<=50%は満たしていると見なす',
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5 && thiz.position <= thiz.courseLength * 0.6
          }
        },
        {
          name: '貴顕の使命を果たすべく',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '位置<=30%は満たしていると見なす。',
          check: function () {
            return thiz.isInFinalCorner() || thiz.isInFinalStraight()
          }
        },
        {
          name: 'G00 1st.F∞;',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.temptationModeStart == null && thiz.startDelay < 0.08
                && thiz.isInFinalStraight()
          }
        },
        {
          name: '最強の名を懸けて',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終直線のどこか」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'アクセルX',
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「他面倒くさいの全部満たしたと見なして200mで発動する」として扱う。',
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
          }
        },
        {
          name: 'カッティング✕DRIVE！',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「他面倒くさいの全部満たしたと見なして200mで発動する」として扱う。',
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
          }
        },
        {
          name: '勝利の鼓動',
          targetSpeed: 0.45,
          duration: 5,
          tooltip: '順位条件は満たしてると見なす',
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
          }
        },
        {
          name: '汝、皇帝の神威を見よ',
          targetSpeed: 0.45,
          duration: 5,
          tooltip: '最終コーナーで3人追い抜きは満たしたと見なす',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          name: 'エンプレス・プライド',
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '他面倒くさいの全部満たしたと見なし「最終コーナーのどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'ブレイズ・オブ・プライド',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '他面倒くさいの全部満たしたと見なし「最終コーナーのどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '全力Vサインッ！',
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '他面倒くさいの全部満たしたと見なし「最終直線のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '勝利のチケットを、君にッ！',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '他面倒くさいの全部満たしたと見なし「最終直線のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '学級委員長+速さ＝バクシン',
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「レース1/2～5/6のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '優等生×バクシン＝大勝利ッ',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「レース1/2～5/6のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '来てください来てください！',
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「終盤のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(2)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '来ます来てます来させます！',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「終盤のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(2)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'アタシもたまには、ね？',
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「ラストスパートのどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(3)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'きっとその先へ…！',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「ラストスパートのどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(3)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '精神一到',
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「最終直線のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '精神一到何事か成らざらん',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終直線のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'Call me KING',
          targetSpeed: 0.35,
          duration: 5,
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
                && thiz.temptationModeStart == null && thiz.startDelay < 0.08
          }
        },
        {
          name: 'Pride of KING',
          targetSpeed: 0.45,
          duration: 5,
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
                && thiz.temptationModeStart == null && thiz.startDelay < 0.08
          }
        },
        {
          name: 'シューティングスター',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「終盤のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(2)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '先頭の景色は譲らない…！',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          name: '究極テイオーステップ',
          targetSpeed: 0.45,
          duration: 5,
          tooltip: '他の条件は無視して「最終直線であれば発動する」として扱う',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          name: 'ヴィットーリアに捧ぐ舞踏',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終コーナーのどこかで発動」として扱う。まぁ発動しないけど。',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'Shadow Break',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終コーナーのどこかで発動」として扱う',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '∴win Q.E.D.',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終コーナーのどこかで発動」として扱う',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'ブルーローズチェイサー',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終直線のどこかで発動」として扱う',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'Nemesis',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終コーナーのどこかで発動」として扱う',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '絶対に、ボクだ',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終直線のどこかで発動」として扱う',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'フラワリー☆マニューバ(前)',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終コーナーのどこかで発動」として扱う。こちらは前の方。',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '薫風、永遠なる瞬間を',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「中盤のどこかで発動」として扱うが、基本的には発動しない。',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        // Unique speed
        {
          name: '紅焔ギア/LP1211-M',
          acceleration: 0.4,
          duration: 4,
          styleLimit: [1, 2],
          tooltip: '順位<=5及び<=50%は満たしていると見なす',
          check: function () {
            return thiz.isInFinalCorner() || thiz.isInFinalStraight()
          }
        },
        {
          name: 'ヴィクトリーショット！',
          acceleration: 0.4,
          duration: 4,
          styleLimit: [1, 2],
          tooltip: '順位>=3及び<=50%は満たしていると見なす',
          check: function () {
            return thiz.isInFinalCorner()
          }
        },
        {
          name: '燃えろ筋肉！',
          acceleration: 0.3,
          duration: 4,
          styleLimit: [3, 4],
          tooltip: '常に順位>=65%及び<=70%は満たしていると見なす。実戦は発動がより遅くなる。',
          check: function () {
            return thiz.currentPhase >= 2 && thiz.isInCorner()
          }
        },
        {
          name: 'レッツ・アナボリック',
          acceleration: 0.4,
          duration: 4,
          styleLimit: [3, 4],
          tooltip: '常に順位>=65%及び<=70%は満たしていると見なす。実戦は発動がより遅くなる。',
          check: function () {
            return thiz.currentPhase >= 2 && thiz.isInCorner()
          }
        },
        {
          name: 'アングリング×スキミング',
          acceleration: 0.4,
          duration: 4,
          styleLimit: [1],
          tooltip: '順位1位は満たしたと見なす',
          check: function () {
            return thiz.currentPhase >= 2 && thiz.isInCorner()
          }
        },
        {
          name: 'フラワリー☆マニューバ(後)',
          acceleration: 0.4,
          duration: 4,
          tooltip: '「最終コーナーのどこかで発動」として扱う。こちらは後の方。',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'レッドエース',
          boost: {
            targetSpeed: 0.15,
            acceleration: 0.2
          },
          duration: 5,
          tooltip: '「レース1/2～5/6のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'ブリリアント・レッドエース',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '「レース1/2～5/6のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: '熱血☆アミーゴ',
          boost: {
            targetSpeed: 0.15,
            acceleration: 0.2
          },
          duration: 5,
          tooltip: '順位2位以内は満たしていると見なす',
          check: function () {
            return thiz.isInFinalStraight() && thiz.sp >= 0.3 * thiz.spMax
          }
        },
        {
          name: 'ブランチャ☆ガナドール',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '順位2位以内は満たしていると見なす',
          check: function () {
            return thiz.isInFinalStraight() && thiz.sp >= 0.3 * thiz.spMax
          }
        },
        {
          name: '勝利のキッス☆',
          boost: {
            targetSpeed: 0.15,
            acceleration: 0.2
          },
          duration: 5,
          tooltip: '条件を満たして最終直線入ったときに発動するとして扱う',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          name: 'ひらめき☆ランディング',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '条件を満たして最終直線入ったときに発動するとして扱う',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          name: '#LookatCurren',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '「レース50%-65%のどこかで発動する」として扱う',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 0.65)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        {
          name: 'キラキラ☆STARDOM',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '「中盤直線のどこか」として扱う',
          init: function () {
            this.randoms = thiz.initStraightRandom(1)
          },
          check: function (startPosition) {
            return thiz.isContainRandom(this.randoms, startPosition)
          }
        },
        // Unique boost
      ],
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
            if (skill.styleLimit && skill.styleLimit.indexOf(this.runningStyle) < 0) {
              continue
            }
            if (skill.distanceLimit && skill.distanceLimit.indexOf(this.trackDetail.distanceType) < 0) {
              continue
            }
            if (skill.surfaceLimit && skill.surfaceLimit.indexOf(this.trackDetail.surface) < 0) {
              continue
            }
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
      // 固有スキルは絶対invokeし、処理して振り分ける
      const thiz = this
      for (const skill of this.uniqueSkillData) {
        if (skill.name !== this.selectedUnique) {
          continue
        }
        const copy = {...skill}
        copy.name = skill.name
        copy.cd = 500
        if (skill.duration) {
          copy.duration = skill.duration
        } else {
          copy.duration = 0
        }
        const TYPES = ['heal', 'targetSpeed', 'acceleration', 'boost']
        for (const type of TYPES) {
          if (skill[type]) {
            copy.type = type
            if (typeof skill[type] === 'object') {
              copy.value = {}
              for (const key in skill[type]) {
                const multiplier = key === 'targetSpeed' ? 0.03 : 0.02
                copy.value[key] = skill[type][key] * (1 + this.uniqueLevel * multiplier)
              }
            } else {
              const multiplier = type === 'targetSpeed' ? 0.03 : 0.02
              copy.value = skill[type] * (1 + this.uniqueLevel * multiplier)
            }
            if (type === 'heal') {
              copy.trigger = function () {
                return thiz.doHeal(this.value)
              }
            }
            if (copy.init) {
              copy.init()
            }
            this.invokedSkills.push(copy)
          }
        }
        break
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
        ret.push(Math.random() * (this.cornerEnd(corner) - corner.start) + corner.start)
      }
      return ret
    },
    initStraightRandom(phaseLimit) {
      let pos
      do {
        pos = Math.random() * this.trackDetail.distance
      } while (this.isInCorner(pos) || (phaseLimit && this.getPhase(pos) !== phaseLimit))
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
      ret.push(Math.random() * (this.cornerEnd(corner) - corner.start) + corner.start)
      return ret
    },
    initFinalStraightRandom() {
      const ret = []
      const finalCorner = this.trackDetail.corners[this.trackDetail.corners.length - 1]
      const len = this.courseLength - this.cornerEnd(finalCorner)
      ret.push(Math.random() * len + this.cornerEnd(finalCorner) + 0.1)
      return ret
    },
    initIntervalRandom(startRate, endRate) {
      const start = this.courseLength * startRate
      const end = this.courseLength * endRate
      return [Math.random() * (end - start) + start]
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
        if (position >= corner.start && position <= this.cornerEnd(corner)) {
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
      return position >= fc.start && position <= this.cornerEnd(fc)
    },
    isInFinalStraight(position) {
      if (!position) {
        position = this.position
      }
      const fc = this.trackDetail.corners[this.trackDetail.corners.length - 1]
      return position > this.cornerEnd(fc)
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
    isRunningStyle(style) {
      // 1: 逃げ, 2: 先行, 3: 差し, 4: 追込
      return this.runningStyle === style
    },
    isDistanceType(distanceType) {
      // 1: 短距離, 2: マイル, 3: 中距離, 4: 長距離
      return this.trackDetail.distanceType === distanceType
    },
    isSurfaceType(surfaceType) {
      // 1: 芝, 2: ダート
      return this.trackDetail.surface === surfaceType
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
        case 'boost':
          break
        case 'fatigue':
          copy.duration = 0
          if (!copy.trigger) {
            copy.trigger = function () {
              return thiz.doHeal(-this.value)
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
    },
    resetHasSkills() {
      const o = {}
      const ENEMY_KEYS = ['fatigue', 'speed']
      for (const key of ENEMY_KEYS) {
        o[key] = {
          all: []
        }
      }
      const SELF_KEYS = ['passive', 'gate', 'heal', 'targetSpeed', 'acceleration', 'boost']
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

