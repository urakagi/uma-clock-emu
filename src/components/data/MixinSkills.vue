<script>

const {
  SurfaceLimit, StyleLimit, DistanceLimit,
  SURFACE, STYLE, DISTANCE
} = require('./constants')

export default {
  name: "MixinSkills",
  data() {
    const thiz = this
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
      skillData: {
        passive: [
          {
            normal: {id: 200022, name: '逆時針○', value: 40},
            rare: {id: 200021, name: '逆時針◎', value: 60},
            status: ['speed'],
            courseLimit: {
              'turn': [2]
            },
          },
          {
            normal: {id: 200012, name: '順時針○', value: 40},
            rare: {id: 200011, name: '順時針◎', value: 60},
            status: ['speed'],
            courseLimit: {
              'turn': [1]
            },
          },
          {
            normal: {name: '季節賽馬娘○', value: 40},
            rare: {name: '季節賽馬娘◎', value: 60},
            status: ['speed'],
            emulatorTypeLimit: ['cm'],
            check: function () {
              return thiz.emulatorType === 'cm'
            }
          },
          {
            normal: {id: 200272, name: '喜歡獨處○', value: 40},
            rare: {id: 200271, name: '喜歡獨處◎', value: 60},
            status: ['speed'],
            check: function () {
              return true
            }
          },
          {
            normal: {id: 200302, name: '伏兵○', value: 40},
            rare: {id: 200301, name: '伏兵◎', value: 60},
            status: ['speed'],
            check: function () {
              return true
            }
          },
          {
            normal: {id: 200262, name: '擅長外側閘位○', value: 40},
            rare: {id: 200261, name: '擅長外側閘位◎', value: 60},
            status: ['speed'],
            tooltip: '発動率44%として扱う(チャンピオンズミーティング基準)',
            triggerRate: 4.0 / 9,
            check: function () {
              return true
            }
          },
          {
            normal: {id: 201631, name: '同理心', value: 40},
            status: ['speed'],
            check: function () {
              return true
            }
          },
          {
            normal: {id: 201641, name: '獨行俠', value: 40},
            status: ['speed'],
            check: function () {
              return true
            }
          },
          {
            normal: {id: 200082, name: '札幌賽場○', value: 40},
            rare: {id: 200081, name: '札幌賽場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10001]
            },
          },
          {
            normal: {id: 200092, name: '函館賽場○', value: 40},
            rare: {id: 200091, name: '函館賽場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10002]
            },
          },
          {
            normal: {id: 200112, name: '新潟賽場○', value: 40},
            rare: {id: 200111, name: '新潟賽場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10003]
            },
          },
          {
            normal: {id: 200102, name: '福島賽場○', value: 40},
            rare: {id: 200101, name: '福島賽場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10004]
            },
          },
          {
            normal: {id: 200042, name: '中山賽場○', value: 40},
            rare: {id: 200041, name: '中山賽場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10005]
            },
          },
          {
            normal: {id: 200032, name: '東京賽場○', value: 40},
            rare: {id: 200031, name: '東京賽場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10006]
            },
          },
          {
            normal: {id: 200072, name: '中京賽場○', value: 40},
            rare: {id: 200071, name: '中京賽場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10007]
            },
          },
          {
            normal: {id: 200062, name: '京都賽場○', value: 40},
            rare: {id: 200061, name: '京都賽場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10008]
            },
          },
          {
            normal: {id: 200052, name: '阪神賽場○', value: 40},
            rare: {id: 200051, name: '阪神賽場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10009]
            },
          },
          {
            normal: {id: 200122, name: '小倉賽場○', value: 40},
            rare: {id: 200121, name: '小倉賽場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10010]
            },
          },
          {
            normal: {id: 200952, name: '大井賽場○', value: 40},
            rare: {id: 200951, name: '大井賽場◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10101]
            },
          },
          {
            normal: {id: 200132, name: '主要距離○', value: 40},
            rare: {id: 200131, name: '主要距離◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'distance': [1200, 1600, 2000, 2400, 2800, 3200, 3600]
            },
          },
          {
            normal: {id: 200142, name: '非主要距離○', value: 40},
            rare: {id: 200141, name: '非主要距離◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'distance': [1000, 1100, 1300, 1400, 1500, 1700, 1800, 1900, 2100, 2200
                , 2300, 2500, 2600, 2700, 2900, 3000, 3100, 3300, 3400, 3500]
            },
          },
          {
            normal: {id: 200152, name: '良好場地○', value: 40},
            rare: {id: 200151, name: '良好場地◎', value: 60},
            surfaceConditionLimit: ['0'],
            status: ['power'],
            check: function () {
              return thiz.track.surfaceCondition === '0'
            }
          },
          {
            normal: {id: 200162, name: '路況差勁○', value: 40},
            rare: {id: 200161, name: '路況差勁◎', value: 60},
            surfaceConditionLimit: ['1', '2', '3'],
            status: ['power'],
            check: function () {
              return thiz.track.surfaceCondition !== '0'
            }
          },
          {
            normal: {id: 200282, name: '對抗意識○', value: 40},
            rare: {id: 200281, name: '對抗意識◎', value: 60},
            status: ['power'],
            check: function () {
              return true
            }
          },
          {
            normal: {name: '天氣○', value: 40},
            rare: {name: '天氣◎', value: 60},
            status: ['guts'],
            emulatorTypeLimit: ['cm'],
            check: function () {
              return thiz.emulatorType === 'cm'
            }
          },
          {
            normal: {id: 200292, name: '徹底鎖定○', value: 40},
            rare: {id: 200291, name: '徹底鎖定◎', value: 60},
            status: ['guts'],
            check: function () {
              return true
            }
          },
          {
            normal: {id: 200252, name: '擅長內側閘位○', value: 40},
            rare: {id: 200251, name: '擅長內側閘位◎', value: 60},
            status: ['wisdom'],
            tooltip: '発動率33%として扱う(チャンピオンズミーティング基準)',
            triggerRate: 3.0 / 9,
            check: function () {
              return true
            }
          },
          {
            normal: {id: 201522, name: '領放的訣竅○', value: 40},
            rare: {id: 201521, name: '領放的訣竅◎', value: 60},
            status: ['wisdom'],
            styleLimit: [1],
            check: function () {
              return thiz.isRunningStyle(STYLE.NIGE)
            }
          },
          {
            normal: {id: 201532, name: '先行的訣竅○', value: 40},
            rare: {id: 201531, name: '先行的訣竅◎', value: 60},
            status: ['wisdom'],
            styleLimit: [2],
            check: function () {
              return thiz.isRunningStyle(2)
            }
          },
          {
            normal: {id: 201542, name: '差行的訣竅○', value: 40},
            rare: {id: 201541, name: '差行的訣竅◎', value: 60},
            status: ['wisdom'],
            styleLimit: [3],
            check: function () {
              return thiz.isRunningStyle(3)
            }
          },
          {
            normal: {id: 201552, name: '追逐的訣竅○', value: 40},
            rare: {id: 201551, name: '追逐的訣竅◎', value: 60},
            status: ['wisdom'],
            styleLimit: [4],
            check: function () {
              return thiz.isRunningStyle(4)
            }
          },
          {
            normal: {id: 201562, name: '幸運7', value: 40},
            rare: {id: 201561, name: '超級幸運7', value: 60},
            status: ['speed', 'stamina', 'power'],
            tooltip: '発動率1/18として扱う(チャンピオンズミーティング基準)',
            triggerRate: 1.0 / 18,
            check: function () {
              return true
            }
          },
          {
            normal: {id: 200172, name: '春賽馬娘○', value: 40},
            rare: {id: 200171, name: '春賽馬娘◎', value: 60},
            status: ['speed'],
            tooltip: '発動率40%として扱う。',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.season === 0
            }
          },
          {
            normal: {id: 200182, name: '夏賽馬娘○', value: 40},
            rare: {id: 200181, name: '夏賽馬娘◎', value: 60},
            status: ['speed'],
            tooltip: '発動率20%として扱う。',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.season === 1
            }
          },
          {
            normal: {id: 200192, name: '秋賽馬娘○', value: 40},
            rare: {id: 200191, name: '秋賽馬娘◎', value: 60},
            status: ['speed'],
            tooltip: '発動率20%として扱う。',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.season === 2
            }
          },
          {
            normal: {id: 200202, name: '冬賽馬娘○', value: 40},
            rare: {id: 200201, name: '冬賽馬娘◎', value: 60},
            status: ['speed'],
            tooltip: '発動率20%として扱う。',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.season === 3
            }
          },
          {
            normal: {id: 200212, name: '晴天○', value: 40},
            rare: {id: 200211, name: '晴天◎', value: 60},
            status: ['guts'],
            tooltip: '発動率57.5%として扱う。',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.weather === 0
            }
          },
          {
            normal: {id: 200222, name: '陰天○', value: 40},
            rare: {id: 200221, name: '陰天◎', value: 60},
            status: ['guts'],
            tooltip: '発動率30%として扱う。',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.weather === 1
            }
          },
          {
            normal: {id: 200232, name: '下雨天○', value: 40},
            rare: {id: 200231, name: '下雨天◎', value: 60},
            status: ['guts'],
            tooltip: '発動率11%として扱う。',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.weather === 2
            }
          },
          {
            normal: {id: 200242, name: '下雪天○', value: 40},
            rare: {id: 200241, name: '下雪天◎', value: 60},
            status: ['guts'],
            tooltip: '発動率1.5%として扱う。',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.weather === 3
            }
          },
          {
            rare: {id: 200194, name: '秋風', value: 60},
            status: ['speed', 'power'],
            check: function () {
              return thiz.season === 2
            }
          },
          {
            rare: {id: 200174, name: '春風起', value: 60},
            status: ['speed', 'power'],
            check: function () {
              return thiz.season === 1
            }
          },
          // End of passive skills
        ],
        heal: [
          {
            normal: {id: 200352, name: '彎道回復○', value: 150},
            rare: {id: 200351, name: '圓弧的藝術家', value: 550},
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200382, name: '直線回復', value: 150},
            rare: {id: 200381, name: '好轉歇息', value: 550},
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200742, name: '深呼吸', value: 150},
            rare: {id: 200741, name: '冷卻', value: 550},
            distanceLimit: DistanceLimit.Long,
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(DISTANCE.LONG) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201571, name: '777', value: 150},
            check: function (startPosition) {
              return thiz.isContainsRemainingDistance(777, startPosition)
            }
          },
          {
            normal: {id: 201621, name: '竭盡全力', value: 150},
            check: function () {
              return thiz.skillTriggerCount[2] + thiz.skillTriggerCount[3] >= 3
            }
          },
          {
            normal: {id: 201482, name: '放學的樂趣', value: 150},
            rare: {id: 201481, name: '放學後的專家', value: 550},
            styleLimit: [4],
            check: function () {
              return thiz.accTimePassed(10) && thiz.isRunningStyle(4)
                  && thiz.isInSlope('down')
            }
          },
          {
            normal: {id: 201282, name: '隨勢而動', value: 150},
            rare: {id: 201281, name: '強悍賽馬娘', value: 550},
            styleLimit: [1],
            check: function () {
              return thiz.accTimePassed(10) && thiz.isRunningStyle(1)
                  && thiz.isInSlope('up')
            }
          },
          {
            normal: {id: 201352, name: '補充營養', value: 150},
            rare: {id: 201351, name: '貪吃鬼', value: 550},
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200572, name: '好位追趕', value: 150},
            rare: {id: 200571, name: '賽場規劃師', value: 550},
            styleLimit: [2],
            tooltip: '順位<=50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200662, name: '靜觀其變', value: 150},
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
            normal: {id: 201222, name: '耐力獵手', value: 150},
            rare: {id: 201221, name: '耐力食取', value: 350},
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
            normal: {id: 200712, name: '前途無量', value: 150},
            rare: {id: 200711, name: '突破者', value: 550},
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
            normal: {id: 200622, name: '後方待機', value: 150},
            rare: {id: 200621, name: '沉睡的獅子', value: 550},
            styleLimit: [4],
            tooltip: '位置>=75%は満たしていると見なす。先行勢より条件が難しいので注意すべし。特にゴルシ。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            rare: {id: 201201, name: '	VIP特權通行', value: 550},
            normal: {id: 201202, name: '熟練超越', value: 150},
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
            normal: {id: 201142, name: '輕快步伐', value: 150},
            rare: {id: 201141, name: '神賜步伐', value: 550},
            distanceLimit: [3],
            tooltip: '「スタート後20秒で発動」として扱う。大体そこら辺で内コースを取り始めるため。多分（ガバ）',
            check: function () {
              return thiz.isDistanceType(3) && thiz.accTimePassed(20)
            }
          },
          {
            normal: {id: 200562, name: '維持持久力', value: 150},
            rare: {id: 200561, name: '綽綽有餘', value: 550},
            styleLimit: [2],
            tooltip: '順位<=50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.accTimePassed(5)
                  && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200692, name: '觀察情勢', value: 150},
            rare: {id: 200691, name: '慧眼', value: 550},
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
            normal: {id: 201422, name: '小休息', value: 150},
            rare: {id: 201421, name: '放鬆', value: 550},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200442, name: '隱藏身影', value: 150},
            rare: {id: 200441, name: '鋼鐵意志', value: 550},
            tooltip: '「上り坂で発動」として扱う（一番現実的な発動方法なため）。実戦でやろうとしたら自前の低パワー逃げ馬が必要で先行馬限定とか色々厳しそうだけど適当実装なので自己判断＆自己責任で。',
            check: function () {
              return thiz.accTimePassed(5) && thiz.isInSlope('up')
            }
          },
          {
            normal: {id: 201492, name: '冷静', value: 150},
            styleLimit: [4],
            tooltip: '「中盤のどこかで発動」として扱う。適当実装注意。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.accTimePassed(10) &&
                  thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200472, name: '維持步調', value: 150},
            rare: {id: 200471, name: '不屈之心', value: 550},
            tooltip: '「中盤のどこか」として扱う。実戦で発動できるかどうかは各自判断すべし。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200482, name: '混戰冷靜', value: 150},
            rare: {id: 200481, name: '充耳不聞', value: 550},
            tooltip: '「中盤のどこか」として扱う。実戦で発動できるかどうかは各自判断すべし。ていうかあまり発動しないんじゃね？',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200762, name: '第二體力條', value: 150},
            rare: {id: 200761, name: '腎上腺素爆發', value: 550},
            distanceLimit: [4],
            check: function () {
              return thiz.isDistanceType(4) && thiz.sp <= 0
            }
          },
          {
            normal: {id: 0, name: '燃燒青春・耐', value: 165},
            rare: {id: 0, name: '點燃青春・耐', value: 605},
            tooltip: '効果1.1倍として扱う',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 0, name: '安静的呼吸', value: 150},
            rare: {id: 0, name: '潛伏姿態', value: 550},
            styleLimit: StyleLimit.Sasi,
            init: function () {
              this.randoms = thiz.initPhaseRandom(0, {startRate: 0.5})
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(STYLE.SASI) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 202002, name: '習慣沙塵', heal: 150},
            styleLimit: StyleLimit.Behind,
            surfaceLimit: SurfaceLimit.Dirt,
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isSurfaceType(SURFACE.DIRT) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          // End of heal skills
        ],
        targetSpeed: [
          {
            normal: {id: 200332, name: '彎道靈巧○', value: 0.15},
            rare: {id: 200331, name: '弧線的教授', value: 0.35},
            duration: 1.8,
            cd: 30,
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200972, name: '短距離彎道○', value: 0.15},
            rare: {id: 200971, name: '短距離彎道◎', value: 0.25},
            duration: 3,
            distanceLimit: [1],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201042, name: '一哩彎道○', value: 0.15},
            rare: {id: 201041, name: '一哩彎道◎', value: 0.25},
            duration: 3,
            distanceLimit: [2],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201112, name: '中距離彎道○', value: 0.15},
            rare: {id: 201111, name: '中距離彎道◎', value: 0.25},
            duration: 3,
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201182, name: '長距離彎道○', value: 0.15},
            rare: {id: 201181, name: '長距離彎道◎', value: 0.25},
            duration: 3,
            distanceLimit: [4],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201252, name: '領頭彎道○', value: 0.15},
            rare: {id: 201251, name: '領頭彎道◎', value: 0.25},
            duration: 3,
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201322, name: '前列彎道○', value: 0.15},
            rare: {id: 201321, name: '前列彎道◎', value: 0.25},
            duration: 3,
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201392, name: '居中彎道○', value: 0.15},
            rare: {id: 201391, name: '居中彎道◎', value: 0.25},
            duration: 3,
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201462, name: '後追彎道○', value: 0.15},
            rare: {id: 201461, name: '後追彎道◎', value: 0.25},
            duration: 3,
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200362, name: '直線靈巧', value: 0.15},
            rare: {id: 200361, name: '	疾風一文字', value: 0.35},
            duration: 0.9,
            cd: 30,
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200962, name: '短距離直線○', value: 0.15},
            rare: {id: 200961, name: '短距離直線◎', value: 0.25},
            duration: 3,
            distanceLimit: [1],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201032, name: '一哩直線○', value: 0.15},
            rare: {id: 201031, name: '一哩直線◎', value: 0.25},
            duration: 3,
            distanceLimit: [2],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201102, name: '中距離直線○', value: 0.15},
            rare: {id: 201101, name: '中距離直線◎', value: 0.25},
            duration: 3,
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201172, name: '長距離直線○', value: 0.15},
            rare: {id: 201171, name: '長距離直線◎', value: 0.25},
            duration: 3,
            distanceLimit: [4],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201242, name: '領頭直線○', value: 0.15},
            rare: {id: 201241, name: '領頭直線◎', value: 0.25},
            duration: 3,
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201312, name: '前列直線○', value: 0.15},
            rare: {id: 201311, name: '前列直線◎', value: 0.25},
            duration: 3,
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201382, name: '居中直線○', value: 0.15},
            rare: {id: 201381, name: '居中直線◎', value: 0.25},
            duration: 3,
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201452, name: '後追直線○', value: 0.15},
            rare: {id: 201451, name: '後追直線◎', value: 0.25},
            duration: 3,
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200542, name: '疾行', value: 0.15},
            rare: {id: 200541, name: '逃脫術', value: 0.35},
            duration: 3,
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200592, name: '前驅取位', value: 0.15},
            rare: {id: 200591, name: '迅速果斷', value: 0.35},
            duration: 1.8,
            styleLimit: [3],
            tooltip: '順位>50%を満たしたと見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201272, name: '領者的自尊心', value: 0.15},
            duration: 3,
            styleLimit: [1],
            tooltip: '「序盤のどこかで発動」として扱う',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.accTimePassed(5) && thiz.isRunningStyle(1)
                  && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200582, name: '準備突圍', value: 0.15},
            rare: {id: 200581, name: '速度之星', value: 0.35},
            duration: 1.2,
            styleLimit: [2],
            tooltip: '順位条件の<=50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200612, name: '準備外側超前', value: 0.15},
            rare: {id: 200611, name: '昇龍', value: 0.35},
            duration: 3,
            styleLimit: [3],
            tooltip: '「最終コーナーのどこか」として扱う。当てにならない。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201412, name: '十萬衝勁', value: 0.15},
            rare: {id: 201411, name: '百萬衝勁', value: 0.35},
            duration: 1.8,
            styleLimit: [3],
            check: function () {
              return thiz.isRunningStyle(3) && thiz.isInSlope('up')
            }
          },
          {
            normal: {id: 200982, name: '大幅領先', value: 0.15},
            rare: {id: 200981, name: '壓倒性領先', value: 0.35},
            duration: 1.2,
            distanceLimit: [1],
            styleLimit: [1],
            tooltip: '中盤に入った瞬間に1位で5馬身リードしていると見なす。見なすな。',
            check: function () {
              return thiz.isDistanceType(1) && thiz.curretPhase === 1
            }
          },
          {
            normal: {id: 200672, name: '窮追不捨', value: 0.15},
            rare: {id: 200671, name: '電擊光輝', value: 0.35},
            duration: 3,
            distanceLimit: [1],
            styleLimit: [3, 4],
            tooltip: '順位>50%を満たしたと見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200682, name: '積極應對', value: 0.15},
            rare: {id: 200681, name: '一哩支配者', value: 0.35},
            duration: 3,
            distanceLimit: [2],
            styleLimit: [1, 2],
            tooltip: '順位1位を満たしたと見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
                  && thiz.accTimePassed(5)
            }
          },
          {
            normal: {id: 201052, name: '變速', value: 0.15},
            rare: {id: 201051, name: '換檔', value: 0.35},
            duration: 1.2,
            distanceLimit: [2],
            styleLimit: [1, 2],
            tooltip: '順位<=50%を満たしたと見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201072, name: '不服輸', value: 0.15},
            rare: {id: 201071, name: '御姐氣質', value: 0.35},
            duration: 1.8,
            distanceLimit: [2],
            tooltip: '「中盤のどこか」として扱う。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
                  && thiz.accTimePassed(5)
            }
          },
          {
            normal: {id: 200722, name: '加快節奏', value: 0.15},
            rare: {id: 200721, name: '致勝曲調', value: 0.35},
            duration: 0.9,
            distanceLimit: [3],
            styleLimit: [1, 2],
            tooltip: '順位<=50%を満たしたと見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200732, name: '緊咬不放', value: 0.15},
            rare: {id: 200731, name: '對勝利的執著', value: 0.35},
            duration: 3,
            distanceLimit: [3],
            tooltip: '「最終コーナーのどこか」として扱う。当てにならない。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200752, name: '內側強者', value: 0.15},
            rare: {id: 200751, name: '內在體驗', value: 0.35},
            duration: 3,
            distanceLimit: [4],
            tooltip: '内ラチ側にいると見なす。実質逃げ馬用かな？知らないけど。',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201192, name: '保持領先', value: 0.15},
            rare: {id: 201191, name: '前鋒的心得', value: 0.35},
            duration: 3,
            distanceLimit: [4],
            tooltip: '「中盤のどこか」の時に3馬身リードしていると見なす。普通は単独逃げ馬以外では夢物語。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201661, name: '遊戲到此為止了！', value: 0.15},
            duration: 3,
            tooltip: '「中盤のどこかで発動」として扱う。ガバガバ実装。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.accTimePassed(10) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201651, name: '滑流', value: 0.15},
            duration: 3,
            tooltip: '「中盤のどこかで発動」として扱う。ガバガバ実装。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.accTimePassed(10) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200632, name: '進攻時機超群', value: 0.15},
            rare: {id: 0, name: '疾風怒濤', value: 0.35},
            duration: 3,
            styleLimit: [4],
            tooltip: '位置>75%を満たしたと見なす。実戦は条件を注意すべし。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201212, name: '後來居上', value: 0.15},
            duration: 3,
            distanceLimit: [4],
            tooltip: '「終盤のどこか」として扱う。実際は加速中に消化されるのが大半。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201082, name: '速度吞噬者', value: 0.15},
            duration: 3,
            styleLimit: [1],
            distanceLimit: [2],
            tooltip: '1位条件は満たしていると見なす。どこか発動で1位要求なので実戦は安定しない。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200462, name: '加速步調', value: 0.15},
            rare: {id: 200461, name: '追上去！', value: 0.35},
            duration: 1.8,
            tooltip: '「中盤のどこかで発動」として扱う。ガバガバ実装。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201672, name: '安利', value: 0.15},
            rare: {id: 201671, name: '排名急上升！', value: 0.35},
            duration: 1.8,
            surfaceLimit: SurfaceLimit.Dirt,
            tooltip: '「中盤のどこか」として扱う。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isSurfaceType(SURFACE.DIRT) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200512, name: '尾段加速', value: 0.15},
            rare: {id: 200511, name: '全心全力', value: 0.35},
            duration: 1.8,
            init: function () {
              this.randoms = thiz.initPhaseRandom(3)
            },
            check: function (startPosition) {
              return thiz.isInSpurt && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201611, name: '豎起尾巴', value: 0.15},
            rare: {id: 201612, name: '後起之秀', value: 0.35},
            duration: 3,
            check: function () {
              return thiz.skillTriggerCount[1] >= 3
            }
          },
          {
            normal: {id: 0, name: '點燃青春・速', value: 0.1725},
            rare: {id: 0, name: '燃燒青春・速', value: 0.4025},
            duration: 1.8,
            tooltip: '効果1.15倍として扱う',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201702, name: '傾其所有', value: 0.15},
            rare: {id: 201701, name: '決死之心', value: 0.35},
            duration: 2.4,
            check: function () {
              return thiz.isInStraight() && thiz.isInSpurt
            }
          },
          {
            normal: {id: 202012, name: '熱場好戲', value: 0.15},
            rare: {id: 202011, name: '壓台好戲', value: 0.35},
            duration: 2.4,
            distanceLimit: DistanceLimit.Long,
            init: function () {
              this.randoms = thiz.initPhaseRandom(1, {
                startRate: 0.5,
                endRate: 1
              })
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) &&
                  thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 202021, name: '提早發力', value: 0.05},
            rare: {id: 202022, name: '強硬之策', value: 0.25},
            duration: 4,
            styleLimit: StyleLimit.Oi,
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) &&
                  thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            rare: {id: 201103, name: '光芒一閃', value: 0.35},
            duration: 3,
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          // End of target speed skills
        ],
        acceleration: [
          {
            normal: {id: 200342, name: '彎道加速○', value: 0.2},
            rare: {id: 200341, name: '曲線的侍酒師', value: 0.4},
            duration: 1.8,
            cd: 30,
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200372, name: '直線加速', value: 0.2},
            rare: {id: 200371, name: '快如陣風', value: 0.4},
            duration: 1.8,
            cd: 30,
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200532, name: '先鋒', value: 0.2},
            rare: {id: 200531, name: '先發必勝', value: 0.4},
            styleLimit: [1],
            duration: 1.2,
            check: function () {
              return thiz.isRunningStyle(1) && thiz.currentPhase === 0 && thiz.accTimePassed(5)
            }
          },
          {
            normal: {id: 200552, name: '準備強行衝線', value: 0.2},
            rare: {id: 200551, name: '逃亡者', value: 0.4},
            styleLimit: [1],
            duration: 3,
            tooltip: '1位は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200602, name: '居中超前姿勢', value: 0.2},
            rare: {id: 200601, name: '熟練轉換', value: 0.4},
            styleLimit: [3],
            duration: 1.8,
            tooltip: '順位>=50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200642, name: '直線一口氣', value: 0.2},
            rare: {id: 200641, name: '逼近的身影', value: 0.4},
            duration: 0.9,
            styleLimit: [4],
            check: function () {
              return thiz.isRunningStyle(4) && thiz.isInSpurt && !thiz.isInCorner()
            }
          },
          {
            normal: {id: 200652, name: '短途檔位', value: 0.2},
            rare: {id: 200651, name: '短途渦輪', value: 0.4},
            duration: 3,
            distanceLimit: [1],
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200702, name: '上昇氣流', value: 0.2},
            rare: {id: 200701, name: '強勁腳力', value: 0.4},
            duration: 3,
            styleLimit: StyleLimit.Behind,
            distanceLimit: DistanceLimit.Mile,
            tooltip: '順位>50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200992, name: '善後策略', value: 0.2},
            rare: {id: 200991, name: 'X計劃', value: 0.4},
            duration: 3,
            styleLimit: [1, 2],
            distanceLimit: [1],
            tooltip: '順位>=2及び<=50%は満たしていると見なす。いや中盤どこか発動とか意味なさすぎね？',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201062, name: '加速度', value: 0.2},
            rare: {id: 201061, name: '油門全開！', value: 0.4},
            duration: 1.2,
            distanceLimit: [2],
            tooltip: '「中盤のどこかで発動」として扱う。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201292, name: '第二對策', value: 0.2},
            duration: 3,
            styleLimit: [1],
            tooltip: '「中盤のどこかで発動」として扱う。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201332, name: '靈巧步伐', value: 0.2},
            rare: {id: 201331, name: '技巧派', value: 0.3},
            duration: 1.8,
            styleLimit: [2],
            tooltip: '「スタート後20秒で発動」として扱う。ガバガバ実装。',
            check: function () {
              return thiz.isRunningStyle(2) && thiz.accTimePassed(20)
            }
          },
          {
            normal: {id: 201342, name: '直線滑下', value: 0.2},
            rare: {id: 201341, name: '決心的速降', value: 0.3},
            duration: 3,
            styleLimit: [2],
            check: function () {
              return thiz.isRunningStyle(2) && thiz.isInSlope('down')
            }
          },
          {
            normal: {id: 201581, name: '登山家', value: 0.2},
            duration: 3,
            check: function () {
              return thiz.isInSlope('up')
            }
          },
          {
            normal: {id: 201362, name: '重振旗鼓', value: 0.2},
            duration: 3,
            styleLimit: [2],
            tooltip: '順位>50%は満たしていると見なす',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201402, name: '努力不懈', value: 0.2},
            rare: {id: 201401, name: '努力家', value: 0.3},
            duration: 3,
            styleLimit: [3],
            tooltip: '「中盤のどこか」として扱う。はいはいガバ実装ガバ実装。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200492, name: '避開力竭賽馬娘', value: 0.2},
            rare: {id: 200491, name: '不停頓女孩', value: 0.4},
            duration: 3,
            tooltip: '「終盤のどこか」として扱う。実際に発動するかどうかは自己判断で。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201601, name: '打好基礎', value: 0.2},
            duration: 3,
            tooltip: '「緑スキルや集中力系でスタートと同時に発動」として扱う',
            check: function () {
              return true
            }
          },
          {
            normal: {id: 0, name: '點燃青春・力', value: 0.22},
            rare: {id: 0, name: '燃燒青春・力', value: 0.44},
            duration: 1.2,
            tooltip: '効果1.1倍として扱う',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 0, name: '前行', value: 0.2},
            rare: {id: 0, name: '奮勇向前！', value: 0.3},
            duration: 3,
            surfaceLimit: SurfaceLimit.Dirt,
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isSurfaceType(SURFACE.DIRT) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201902, name: '正面決鬥', value: 0.2},
            styleLimit: [2],
            duration: 1.8,
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
        ],
        // End of acc skills
        boost: [
          {
            normal: {id: 0, name: '点燃青春・毅', value: {targetSpeed: 0.055, acceleration: 0.11}},
            rare: {id: 0, name: '燃烧青春・毅', value: {targetSpeed: 0.275, acceleration: 0.33}},
            duration: 1.8,
            tooltip: '効果1.1倍として扱う',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
        ],
        // End of boost skills
        gate: [
          {
            normal: {id: 200432, name: '集中力', value: 0.9},
            rare: {id: 200431, name: '全神貫注', value: 0.4},
            inherit: {id: 200433, name: 'ゲート難', value: 1.5},
          }
        ],
        speed: [
          {
            all: {name: '使領頭遲疑', value: -0.15},
            duration: 3,
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使領頭遲疑x2', value: -0.3},
            duration: 3,
            styleLimit: [1],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使前列遲疑', value: -0.15},
            duration: 3,
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使前列遲疑x2', value: -0.3},
            duration: 3,
            styleLimit: [2],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使居中遲疑', value: -0.15},
            duration: 3,
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使居中遲疑x2', value: -0.3},
            duration: 3,
            styleLimit: [3],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使後追遲疑', value: -0.15},
            duration: 3,
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使後追遲疑x2', value: -0.3},
            duration: 3,
            styleLimit: [4],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '緊盯後方', value: -0.2},
            duration: 3,
            distanceLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
                  && thiz.accTimePassed(5)
            }
          },
          {
            all: {name: '惱殺術', value: -0.25},
            duration: 3,
            distanceLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
                  && thiz.accTimePassed(5)
            }
          },
          {
            all: {name: '速度吞噬者', value: -0.15},
            duration: 3,
            distanceLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
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
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '獨佔力', value: -0.25},
            duration: 3,
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '視線', value: -0.15},
            duration: 3,
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '逐君之形', value: -0.05},
            duration: 6,
            check: function () {
              return thiz.position >= thiz.courseLength * 0.5
            }
          },
          {
            all: {name: '逐君之形(継承)', value: -0.025},
            duration: 3.6,
            check: function () {
              return thiz.position >= thiz.courseLength * 0.5
            }
          },
        ],
        fatigue: [
          {
            all: {name: '持久力吞噬者', value: 50},
            distanceLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '持久力吞噬者x2', value: 100},
            distanceLimit: [4],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '牽制領頭', value: 100},
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '牽制領頭x2', value: 200},
            styleLimit: [1],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '牽制前列', value: 100},
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '牽制前列x2', value: 200},
            styleLimit: [2],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '牽制居中', value: 100},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '牽制居中x2', value: 200},
            styleLimit: [3],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '牽制後追', value: 100},
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '牽制後追x2', value: 200},
            styleLimit: [4],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使領頭焦躁', value: 100},
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使領頭焦躁x2', value: 200},
            styleLimit: [1],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使前列焦躁', value: 100},
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使前列焦躁x2', value: 200},
            styleLimit: [2],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使居中焦躁', value: 100},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使居中焦躁x2', value: 200},
            styleLimit: [3],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使後追焦躁', value: 100},
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '使後追焦躁x2', value: 200},
            styleLimit: [4],
            tooltip: '2回同時に喰らう。通常のと加算できる。',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '禁止搶先', value: 100},
            distanceLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
                  && thiz.accTimePassed(5)
            }
          },
          {
            all: {name: '細語', value: 100},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '細語x2', value: 200},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '魅惑的細語', value: 300},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '魅惑的細語x2', value: 600},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '銳利目光', value: 100},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '銳利目光x2', value: 200},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '緊盯八方', value: 300},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '緊盯八方x2', value: 600},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '耐力食取', value: 100},
            distanceLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
        ]
      },
      uniqueSkillData: [
        {
          name: 'なし／発動しない',//billi找不到
          noInherit: true,
          check: function () {
            return false
          }
        },
        {
          id: 10321, name: 'introduction：My body',
          noInherit: true,
          heal: 350,
          tooltip: '順位条件の>=3＆<=40%は満たしていると見なす',
          check: function () {
            return thiz.position >= thiz.courseLength / 2.0 && thiz.isInCorner(thiz.position)
          }
        },
        {
          id: 100321, name: 'U=ma2',
          heal: 550,
          tooltip: '順位条件の>=3＆<=40%は満たしていると見なす',
          check: function () {
            return thiz.position >= thiz.courseLength / 2.0 && thiz.isInCorner(thiz.position)
          }
        },
        {
          id: 10451, name: '清澈之心',
          noInherit: true,
          heal: 350,
          tooltip: '順位条件の>=2＆<=40%は満たしていると見なす',
          init: function () {
            this.randoms = thiz.initPhaseRandom(1)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100451, name: '純潔之心',
          heal: 550,
          tooltip: '順位条件の>=2＆<=40%は満たしていると見なす',
          init: function () {
            this.randoms = thiz.initPhaseRandom(1)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10521, name: '雀躍不已預備～跑！',
          noInherit: true,
          heal: 350,
          tooltip: '近くにウマ娘がいる＆順位<=50%は満たしていると見なす',
          check: function () {
            return thiz.isInFinalCorner()
          }
        },
        {
          id: 100521, name: '雀躍不已的精彩時刻',
          heal: 550,
          tooltip: '近くにウマ娘がいる＆順位<=50%は満たしていると見なす',
          check: function () {
            return thiz.isInFinalCorner()
          }
        },
        {
          id: 110111, name: '卓越治癒術',
          heal: 550,
          tooltip: '中盤のどこかで発動として見なす。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(1)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 110011, name: '超級可愛♪海洋潛水',
          heal: 550,
          check: function () {
            return thiz.skillTriggerCount[1] >= 2
          }
        },
        {
          id: 0, name: '玫瑰之吻',
          heal: 550,
          tooltip: '50%地点で即発動として扱う。',
          check: function (startPosition) {
            return thiz.isContainsRemainingDistance(thiz.courseLength * 0.5, startPosition)
          }
        },
        {
          id: 10071, name: '波瀾注意砲！',
          noInherit: true,
          targetSpeed: 0.15,
          duration: 6,
          tooltip: '順位条件の<=50%は満たしていると見なす',
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5 && thiz.position <= thiz.courseLength * 0.6
          }
        },
        {
          id: 100071, name: '不沉戰艦起錨！',
          targetSpeed: 0.25,
          duration: 6,
          tooltip: '順位条件の<=50%は満たしていると見なす',
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5 && thiz.position <= thiz.courseLength * 0.6
          }
        },
        {
          id: 100131, name: '必須貫徹高貴的使命',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '位置<=30%は満たしていると見なす。',
          check: function () {
            return thiz.isInFinalCorner() || thiz.isInFinalStraight()
          }
        },
        {
          id: 100261, name: 'G00 1st.F∞;',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.temptationModeStart == null && thiz.startDelay < 0.08
                && thiz.isInFinalStraight()
          }
        },
        {
          id: 110131, name: '賭上最強之名',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終直線のどこか」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10081, name: '加速X',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「他面倒くさいの全部満たしたと見なして200mで発動する」として扱う。',
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
          }
        },
        {
          id: 100081, name: 'CUTTING×DRIVE！',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「他面倒くさいの全部満たしたと見なして200mで発動する」として扱う。',
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
          }
        },
        {
          id: 100061, name: '勝利的躍動',
          targetSpeed: 0.45,
          duration: 5,
          tooltip: '順位条件は満たしてると見なす',
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
          }
        },
        {
          id: 100171, name: '讓你見識皇帝的威勢吧',
          targetSpeed: 0.45,
          duration: 5,
          tooltip: '最終コーナーで3人追い抜きは満たしたと見なす',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          id: 10181, name: '女帝的自尊',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '他面倒くさいの全部満たしたと見なし「最終コーナーのどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100181, name: '自尊之炎',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '他面倒くさいの全部満たしたと見なし「最終コーナーのどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10351, name: '全力V字手勢！',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '他面倒くさいの全部満たしたと見なし「最終直線のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100351, name: '將勝利的獎券獻給你！',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '他面倒くさいの全部満たしたと見なし「最終直線のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10411, name: '班長＋快速＝驀進',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「レース1/2～5/6のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100411, name: '模範生×驀進＝大獲全勝',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「レース1/2～5/6のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10561, name: '請顯靈吧請顯靈吧！',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「終盤のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(2)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100561, name: '顯靈了要顯靈了請顯靈吧！',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「終盤のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(2)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10601, name: '我偶爾也能辦到的對吧？',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「ラストスパートのどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(3)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100601, name: '一定能抵達前方……！',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「ラストスパートのどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(3)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10111, name: '精誠所至',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「最終直線のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100111, name: '精誠所至金石為開',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終直線のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10611, name: 'Call me KING',
          noInherit: true,
          targetSpeed: 0.35,
          duration: 5,
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
                && thiz.temptationModeStart == null && thiz.startDelay < 0.08
          }
        },
        {
          id: 100611, name: 'Pride of KING',
          targetSpeed: 0.45,
          duration: 5,
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
                && thiz.temptationModeStart == null && thiz.startDelay < 0.08
          }
        },
        {
          id: 100011, name: '逐夢之星',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「終盤のどこかで発動する」として扱う。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(2)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100021, name: '不會讓出領先的景色……！',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          id: 100031, name: '終極帝皇舞步',
          targetSpeed: 0.45,
          duration: 5,
          tooltip: '他の条件は無視して「最終直線であれば発動する」として扱う',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          id: 100151, name: '獻給勝利女神的舞蹈',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終コーナーのどこかで発動」として扱う。まぁ発動しないけど。',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100161, name: 'Shadow Break',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終コーナーのどこかで発動」として扱う',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100231, name: '∴win Q.E.D.',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終コーナーのどこかで発動」として扱う',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100301, name: '藍薔薇追擊者',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終直線のどこかで発動」として扱う',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100501, name: 'Nemesis',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終コーナーのどこかで発動」として扱う',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 110031, name: '絕對是我',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終直線のどこかで発動」として扱う',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 110241, name: '花樣繽紛☆飛行演習(前)',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終コーナーのどこかで発動」として扱う。こちらは前の方。',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 110181, name: '暖風吹向永恆的瞬間',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「中盤のどこかで発動」として扱うが、基本的には発動しない。',
          init: function () {
            this.randoms = thiz.initPhaseRandom(1)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100121, name: '一較高下！激烈對決！',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「最終直線のどこかで発動」として扱う。',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 110041, name: '一鼓作氣♪Chu',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5 && thiz.healTriggerCount > 0
          }
        },
        {
          id: 100371, name: '漆黑之劍',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.isInFinalStraight() && thiz.temptationModeStart == null
                && thiz.startDelay < 0.08
          }
        },
        {
          id: 0, name: '禾乃登',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '50%-60%地点のどこかで発動として扱う',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 0.6)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 0, name: '尊之☆最终冲刺—(ﾟ∀ﾟ)—ﾄ!',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: 'フェイズ2のどこか発動として扱う',
          init: function () {
            this.randoms = thiz.initPhaseRandom(2)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 0, name: '以姬之名，手握勝利',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '最終直線に入ってすぐ発動として扱う',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          id: 0, name: '逐君之形',
          targetSpeed: 0.25,
          duration: 6,
          tooltip: '順位条件は満たしていると見なす',
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5
          }
        },
        {
          id: 100171, name: '喧囂之箭，擊退晦冥',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.isInFinalCorner();
          }
        },
        {
          id: 100481, name: '耶☆生動時光！',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.isInFinalStraight();
          }
        },
        {
          id: 100231, name: '來自X的禮物',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5
          }
        },
        {
          id: 100041, name: '紅焰檔位/LP1211-M',
          acceleration: 0.4,
          duration: 4,
          tooltip: '順位<=5及び<=50%は満たしていると見なす。どの脚質でも最速発動扱い。',
          check: function () {
            return thiz.isInFinalCorner() || thiz.isInFinalStraight()
          }
        },
        {
          id: 100101, name: 'VICTORY SHOT！',
          acceleration: 0.4,
          duration: 4,
          tooltip: '順位>=3及び<=50%は満たしていると見なす',
          check: function () {
            return thiz.isInFinalCorner()
          }
        },
        {
          id: 10271, name: '燃燒吧肌肉！',
          noInherit: true,
          acceleration: 0.3,
          duration: 4,
          styleLimit: [2, 3, 4],
          tooltip: '常に順位>=65%及び<=70%は満たしていると見なす。実戦は発動がより遅くなる。',
          check: function () {
            return thiz.currentPhase >= 2 && thiz.isInCorner()
          }
        },
        {
          id: 100271, name: '合成代謝開始！',
          acceleration: 0.4,
          duration: 4,
          styleLimit: [2, 3, 4],
          check: function () {
            return thiz.currentPhase >= 2 && thiz.isInCorner()
          }
        },
        {
          id: 100201, name: '釣魚×計謀',
          acceleration: 0.4,
          duration: 4,
          styleLimit: [1, 2],
          tooltip: '順位1位は満たしたと見なす',
          check: function () {
            return thiz.currentPhase >= 2 && thiz.isInCorner()
          }
        },
        {
          id: 110241, name: '花樣繽紛☆飛行演習(後)',
          acceleration: 0.4,
          duration: 4,
          tooltip: '「最終コーナーのどこかで発動」として扱う。こちらは後の方。',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100131, name: '兀鷹猛擊波',
          acceleration: 0.4,
          duration: 4,
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 0, name: 'KEEP IT REAL.',
          acceleration: 0.3,
          duration: 6,
          tooltip: '50%地点で即発動として扱う',
          check: function () {
            return thiz.position >= thiz.courseLength / 2.0
          }
        },
        {
          id: 100591, name: '超越彼方',
          acceleration: 0.4,
          duration: 4,
          styleLimit: [3, 4],
          tooltip: '常に順位>=50%及び<=70%は満たしていると見なす。',
          check: function () {
            return thiz.temptationModeStart == null &&
                ((thiz.currentPhase >= 2 && !thiz.isInFinalCorner() && thiz.isInCorner()) ||
                    (thiz.currentPhase === 1 && thiz.isInFinalCorner() && thiz.isInCorner()))
          }
        },
        {
          id: 10091, name: '赤色王牌',
          noInherit: true,
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
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100091, name: '燦爛．赤色王牌',
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
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10141, name: '熱血☆AMIGO',
          noInherit: true,
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
          id: 100141, name: '勝利者☆飛身撲',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '順位2位以内は満たしていると見なす。最終直線に入った瞬間に発動として扱う。',
          check: function () {
            return thiz.isInFinalStraight() && thiz.sp >= 0.3 * thiz.spMax
          }
        },
        {
          id: 10241, name: '勝利之吻☆',
          noInherit: true,
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
          id: 100241, name: '閃耀☆著陸',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '最終コーナーで発動として扱う',
          check: function () {
            return thiz.isInFinalCorner()
          }
        },
        {
          id: 100381, name: '＃LookatCurren',
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
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100461, name: '閃耀奪目☆STARDOM',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '中盤のコーナーではない地点と即発動としてみなす',
          check: function (startPosition) {
            return !thiz.isInCorner(startPosition) && thiz.getPhase(startPosition) === 1
          }
        },
        {
          id: 100581, name: '永不言敗',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '「終盤のコーナーのどこかで発動」として扱う',
          init: function () {
            this.randoms = thiz.initPhase2CornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 0, name: '全速☆前進!!',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '順位条件は満たしてると見なす',
          check: function () {
            return thiz.isInDistanceRate(0.45, 0.6) && thiz.isSPInRange(0, 0.7)
          }
        },
        {
          id: 0, name: '媽咪惡作劇團團轉♡',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '最終直線に入った瞬間に発動として扱う。順位条件は満たしてると見なす。',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          id: 110401, name: 'GET DOWN',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '最終コーナーに入った瞬間に発動として扱う。順位条件は満たしてると見なす。',
          check: function () {
            return thiz.isInFinalCorner();
          }
        },
        {
          id: 110061, name: '聖誕夜的奇蹟奔跑！',
          targetSpeed: 0.25,
          acceleration: 0.3,
          heal: 350,
          duration: 5,
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5 && thiz.healTriggerCount >= 3
          }
        },
        {
          id: 100221, name: '童話故事',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.position >= thiz.courseLength * 0.52
          }
        },
        {
          id: 100211, name: '白色閃電，見識一下吧！',
          targetSpeed: 0.35,
          acceleration: 0.1,
          duration: 5,
          check: function () {
            return thiz.isInStraight() && thiz.position >= thiz.courseLength * 0.5
          }
        },
        {
          id: 110521, name: '跌倒113次爬起114次',
          targetSpeed: 0.25,
          duration: 6,
          tooltip: '6秒持続として扱う',
          check: function () {
            return thiz.isInFinalCorner()
          }
        },
        {
          id: 110151, name: '惠福船歌',
          targetSpeed: 0.45,
          duration: 4,
          tooltip: '7回発動したとして扱う。じゃないと弱すぎる。',
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(400)
                && thiz.position >= thiz.toPosition(400)
          }
        },
        {
          id: 100691, hid: 900691, name: '憧憬著跨越櫻花！',
          targetSpeed: 0.35,
          duration: 5,
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(300)
                && thiz.position >= thiz.toPosition(300)
          }
        },
        {
          id: 110261, name: '可可行動',
          targetSpeed: 0.35,
          heal: 150,
          duration: 5,
          check: function () {
            return thiz.currentPhase === 1 && thiz.isInCorner()
          }
        },
        {
          id: 110371, name: '祝您胃口好♪',
          targetSpeed: 0.35,
          duration: 6,
          tooltip: '最終コーナー以降で3人追い抜きは満たしたと見なす',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        // End of unique skills
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
        copy.trigger = function () {
          let ret = null
          for (const tri of this.triggers) {
            const r = tri()
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
          copy.heal = skill.heal * (1 + (this.uniqueLevel - 1) * 0.02)
          copy.triggers.push(function () {
            return thiz.doHeal(copy.heal)
          })
          effectCount++
        }
        if (skill.targetSpeed) {
          copy.type = 'targetSpeed'
          let modification = 0.01 + (this.uniqueLevel - 2) * 0.03;
          if (modification < 0) modification = 0;
          copy.targetSpeed = skill.targetSpeed * (1 + modification)
          effectCount++
        }
        if (skill.acceleration) {
          copy.type = 'acceleration'
          copy.acceleration = skill.acceleration * (1 + (this.uniqueLevel - 1) * 0.02)
          effectCount++
        }
        if (effectCount > 1) {
          copy.type = 'boost'
        }
        if (copy.init) {
          copy.init()
        }
        this.invokedSkills.push(copy)
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
          let skillDetail = null
          if (skill.trigger) {
            skillDetail = skill.trigger()
          }
          if (skill.duration) {
            this.operatingSkills.push({data: skill, startFrame: this.frameElapsed})
            skillTriggered.push({data: skill})
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
    initStraightRandom() {
      let ret
      const straights = this.getStraights()
      const chosen = Math.floor(Math.random() * straights.length)
      ret = this.chooseRandom(straights[chosen].start, straights[chosen].end)
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
    isInFinalCorner(position) {
      if (!position) {
        position = this.position
      }
      const fc = this.trackDetail.corners[this.trackDetail.corners.length - 1]
      if (!fc) {
        return false
      }
      return position >= fc.start && position <= this.cornerEnd(fc)
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
          copy.inherit.heal = skill.heal === 550 ? 150 : 50
          const thiz = this
          copy.trigger = function () {
            return thiz.doHeal(this.heal)
          }
          skillType = 'heal'
          effectCount++
        }
        if (skill.targetSpeed) {
          copy.inherit.targetSpeed = skill.targetSpeed - 0.2
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
                  }
                }
              }
              if (skill[rarity].duration) {
                copy.duration = skill[rarity].duration
              }
              copy.type = type
              if (copy.value) {
                this.fillCommonFields(copy, type)
              }
              delete copy.normal
              delete copy.rare
              delete copy.inherit
              delete copy.all
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
          if (!copy.trigger) {
            copy.trigger = function () {
              return thiz.currentSpeed += this.speed
            }
          }
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
