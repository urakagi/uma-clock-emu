const {
    SurfaceLimit, StyleLimit, DistanceLimit,
    SURFACE, STYLE, DISTANCE
} = require('./constants')

function normalSkillData(thiz) {
    return {
        passive: [
            {
                normal: {id: 200022, name: '左回り○', value: 40},
                rare: {id: 200021, name: '左回り◎', value: 60},
                status: ['speed'],
                courseLimit: {
                    'turn': [2]
                },
            },
            {
                normal: {id: 200012, name: '右回り○', value: 40},
                rare: {id: 200011, name: '右回り◎', value: 60},
                status: ['speed'],
                courseLimit: {
                    'turn': [1]
                },
            },
            {
                normal: {name: '季節ウマ娘○', value: 40},
                rare: {name: '季節ウマ娘◎', value: 60},
                status: ['speed'],
                emulatorTypeLimit: ['cm'],
                check: function () {
                    return thiz.emulatorType === 'cm'
                }
            },
            {
                normal: {id: 200272, name: 'おひとり様○', value: 60},
                rare: {id: 200271, name: 'おひとり様◎', value: 80},
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
                normal: {id: 200262, name: '外枠得意○', value: 40},
                rare: {id: 200261, name: '外枠得意◎', value: 60},
                status: ['speed'],
                tooltip: '発動率44%として扱う(チャンピオンズミーティング基準)',
                triggerRate: 4.0 / 9,
                check: function () {
                    return true
                }
            },
            {
                normal: {id: 201631, name: 'シンパシー', value: 40},
                status: ['speed'],
                check: function () {
                    return true
                }
            },
            {
                normal: {id: 201641, name: '一匹狼', value: 40},
                status: ['speed'],
                check: function () {
                    return true
                }
            },
            {
                normal: {id: 200082, name: '札幌レース場○', value: 40},
                rare: {id: 200081, name: '札幌レース場◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'raceTrackId': [10001]
                },
            },
            {
                normal: {id: 200092, name: '函館レース場○', value: 40},
                rare: {id: 200091, name: '函館レース場◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'raceTrackId': [10002]
                },
            },
            {
                normal: {id: 200112, name: '新潟レース場○', value: 40},
                rare: {id: 200111, name: '新潟レース場◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'raceTrackId': [10003]
                },
            },
            {
                normal: {id: 200102, name: '福島レース場○', value: 40},
                rare: {id: 200101, name: '福島レース場◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'raceTrackId': [10004]
                },
            },
            {
                normal: {id: 200042, name: '中山レース場○', value: 40},
                rare: {id: 200041, name: '中山レース場◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'raceTrackId': [10005]
                },
            },
            {
                normal: {id: 200032, name: '東京レース場○', value: 40},
                rare: {id: 200031, name: '東京レース場◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'raceTrackId': [10006]
                },
            },
            {
                normal: {id: 200072, name: '中京レース場○', value: 40},
                rare: {id: 200071, name: '中京レース場◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'raceTrackId': [10007]
                },
            },
            {
                normal: {id: 200062, name: '京都レース場○', value: 40},
                rare: {id: 200061, name: '京都レース場◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'raceTrackId': [10008]
                },
            },
            {
                normal: {id: 200052, name: '阪神レース場○', value: 40},
                rare: {id: 200051, name: '阪神レース場◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'raceTrackId': [10009]
                },
            },
            {
                normal: {id: 200122, name: '小倉レース場○', value: 40},
                rare: {id: 200121, name: '小倉レース場◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'raceTrackId': [10010]
                },
            },
            {
                normal: {id: 200952, name: '大井レース場○', value: 40},
                rare: {id: 200951, name: '大井レース場◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'raceTrackId': [10101]
                },
            },
            {
                normal: {id: 200132, name: '根幹距離○', value: 40},
                rare: {id: 200131, name: '根幹距離◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'distance': [1200, 1600, 2000, 2400, 2800, 3200, 3600]
                },
            },
            {
                normal: {id: 200142, name: '非根幹距離○', value: 40},
                rare: {id: 200141, name: '非根幹距離◎', value: 60},
                status: ['stamina'],
                courseLimit: {
                    'distance': [1000, 1100, 1300, 1400, 1500, 1700, 1800, 1900, 2100, 2200
                        , 2300, 2500, 2600, 2700, 2900, 3000, 3100, 3300, 3400, 3500]
                },
            },
            {
                normal: {id: 200152, name: '良バ場○', value: 40},
                rare: {id: 200151, name: '良バ場◎', value: 60},
                surfaceConditionLimit: ['0'],
                status: ['power'],
                check: function () {
                    return thiz.track.surfaceCondition === '0'
                }
            },
            {
                normal: {id: 200162, name: '道悪○', value: 40},
                rare: {id: 200161, name: '道悪◎', value: 60},
                surfaceConditionLimit: ['1', '2', '3'],
                status: ['power'],
                check: function () {
                    return thiz.track.surfaceCondition !== '0'
                }
            },
            {
                normal: {id: 200282, name: '対抗意識○', value: 40},
                rare: {id: 200281, name: '対抗意識◎', value: 60},
                status: ['power'],
                check: function () {
                    return true
                }
            },
            {
                normal: {name: '天気の日○', value: 40},
                rare: {name: '天気の日◎', value: 60},
                status: ['guts'],
                emulatorTypeLimit: ['cm'],
                check: function () {
                    return thiz.emulatorType === 'cm'
                }
            },
            {
                normal: {id: 200292, name: '徹底マーク○', value: 40},
                rare: {id: 200291, name: '徹底マーク◎', value: 60},
                status: ['guts'],
                check: function () {
                    return true
                }
            },
            {
                normal: {id: 200252, name: '内枠得意○', value: 40},
                rare: {id: 200251, name: '内枠得意◎', value: 60},
                status: ['wisdom'],
                tooltip: '発動率33%として扱う(チャンピオンズミーティング基準)',
                triggerRate: 3.0 / 9,
                check: function () {
                    return true
                }
            },
            {
                normal: {id: 201522, name: '逃げのコツ○', value: 40},
                rare: {id: 201521, name: '逃げのコツ◎', value: 60},
                status: ['wisdom'],
                styleLimit: [1],
                check: function () {
                    return thiz.isRunningStyle(STYLE.NIGE)
                }
            },
            {
                normal: {id: 201532, name: '先行のコツ○', value: 40},
                rare: {id: 201531, name: '先行のコツ◎', value: 60},
                status: ['wisdom'],
                styleLimit: [2],
                check: function () {
                    return thiz.isRunningStyle(2)
                }
            },
            {
                normal: {id: 201542, name: '差しのコツ○', value: 40},
                rare: {id: 201541, name: '差しのコツ◎', value: 60},
                status: ['wisdom'],
                styleLimit: [3],
                check: function () {
                    return thiz.isRunningStyle(3)
                }
            },
            {
                normal: {id: 201552, name: '追込のコツ○', value: 40},
                rare: {id: 201551, name: '追込のコツ◎', value: 60},
                status: ['wisdom'],
                styleLimit: [4],
                check: function () {
                    return thiz.isRunningStyle(4)
                }
            },
            {
                normal: {id: 201562, name: 'ラッキーセブン', value: 40},
                rare: {id: 201561, name: 'スーパーラッキーセブン', value: 60},
                status: ['speed', 'stamina', 'power'],
                tooltip: '発動率1/18として扱う(チャンピオンズミーティング基準)',
                triggerRate: 1.0 / 18,
                check: function () {
                    return true
                }
            },
            {
                normal: {id: 200172, name: '春ウマ娘○', value: 40},
                rare: {id: 200171, name: '春ウマ娘◎', value: 60},
                status: ['speed'],
                tooltip: '発動率40%として扱う。',
                emulatorTypeLimit: ['team'],
                check: function () {
                    return thiz.season === 0
                }
            },
            {
                normal: {id: 200182, name: '夏ウマ娘○', value: 40},
                rare: {id: 200181, name: '夏ウマ娘◎', value: 60},
                status: ['speed'],
                tooltip: '発動率20%として扱う。',
                emulatorTypeLimit: ['team'],
                check: function () {
                    return thiz.season === 1
                }
            },
            {
                normal: {id: 200192, name: '秋ウマ娘○', value: 40},
                rare: {id: 200191, name: '秋ウマ娘◎', value: 60},
                status: ['speed'],
                tooltip: '発動率20%として扱う。',
                emulatorTypeLimit: ['team'],
                check: function () {
                    return thiz.season === 2
                }
            },
            {
                normal: {id: 200202, name: '冬ウマ娘○', value: 40},
                rare: {id: 200201, name: '冬ウマ娘◎', value: 60},
                status: ['speed'],
                tooltip: '発動率20%として扱う。',
                emulatorTypeLimit: ['team'],
                check: function () {
                    return thiz.season === 3
                }
            },
            {
                normal: {id: 200212, name: '晴れの日○', value: 40},
                rare: {id: 200211, name: '晴れの日◎', value: 60},
                status: ['guts'],
                tooltip: '発動率57.5%として扱う。',
                emulatorTypeLimit: ['team'],
                check: function () {
                    return thiz.weather === 0
                }
            },
            {
                normal: {id: 200222, name: '曇りの日○', value: 40},
                rare: {id: 200221, name: '曇りの日◎', value: 60},
                status: ['guts'],
                tooltip: '発動率30%として扱う。',
                emulatorTypeLimit: ['team'],
                check: function () {
                    return thiz.weather === 1
                }
            },
            {
                normal: {id: 200232, name: '雨の日○', value: 40},
                rare: {id: 200231, name: '雨の日◎', value: 60},
                status: ['guts'],
                tooltip: '発動率11%として扱う。',
                emulatorTypeLimit: ['team'],
                check: function () {
                    return thiz.weather === 2
                }
            },
            {
                normal: {id: 200242, name: '雪の日○', value: 40},
                rare: {id: 200241, name: '雪の日◎', value: 60},
                status: ['guts'],
                tooltip: '発動率1.5%として扱う。',
                emulatorTypeLimit: ['team'],
                check: function () {
                    return thiz.weather === 3
                }
            },
            {
                rare: {id: 200194, name: '初嵐', value: 60},
                status: ['speed', 'power'],
                check: function () {
                    return thiz.season === 2
                }
            },
            {
                rare: {id: 200174, name: '春一番', value: 60},
                status: ['speed', 'power'],
                check: function () {
                    return thiz.season === 1
                }
            },
            {
                rare: {id: 200154, name: '良バ場の鬼', value: 60},
                surfaceConditionLimit: ['0'],
                status: ['speed', 'power'],
                check: function () {
                    return thiz.track.surfaceCondition === '0'
                }
            },
            {
                rare: {id: 200014, name: '右回りの鬼', value: 60},
                courseLimit: {
                    'turn': [1]
                },
                status: ['speed', 'power'],
                check: function () {
                    return thiz.track.surfaceCondition === '0'
                }
            },
            // End of passive skills
        ],
        heal: [
            {
                normal: {id: 200352, name: 'コーナー回復○', value: 150},
                rare: {id: 200351, name: '円弧のマエストロ', value: 550},
                init: function () {
                    this.randoms = thiz.initCornerRandom()
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 200382, name: '直線回復', value: 150},
                rare: {id: 200381, name: '好転一息', value: 550},
                init: function () {
                    this.randoms = thiz.initStraightRandom()
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 200742, name: '深呼吸', value: 150},
                rare: {id: 200741, name: 'クールダウン', value: 550},
                distanceLimit: DistanceLimit.Long,
                init: function () {
                    this.randoms = thiz.initStraightRandom()
                },
                check: function (startPosition) {
                    return thiz.isDistanceType(DISTANCE.LONG) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 201571, name: 'スリーセブン', value: 150},
                check: function (startPosition) {
                    return thiz.isContainsRemainingDistance(777, startPosition)
                }
            },
            {
                normal: {id: 201621, name: 'ふり絞り', value: 150},
                check: function () {
                    return thiz.skillTriggerCount[2] + thiz.skillTriggerCount[3] >= 3
                }
            },
            {
                normal: {id: 201482, name: '下校の楽しみ', value: 150},
                rare: {id: 201481, name: '下校後のスペシャリスト', value: 550},
                styleLimit: [4],
                check: function () {
                    return thiz.accTimePassed(10) && thiz.isRunningStyle(4)
                        && thiz.isInSlope('down')
                }
            },
            {
                normal: {id: 201282, name: '勢い任せ', value: 150},
                rare: {id: 201281, name: 'じゃじゃウマ娘', value: 550},
                styleLimit: [1],
                check: function () {
                    return thiz.accTimePassed(10) && thiz.isRunningStyle(1)
                        && thiz.isInSlope('up')
                }
            },
            {
                normal: {id: 201352, name: '栄養補給', value: 150},
                rare: {id: 201351, name: '食いしん坊', value: 550},
                styleLimit: [2],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 200572, name: '好位追走', value: 150},
                rare: {id: 200571, name: 'レースプランナー', value: 550},
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
                normal: {id: 200662, name: '様子見', heal: 150, acceleration: 0.1},
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
                normal: {id: 201222, name: 'スタミナイーター', value: 150},
                rare: {id: 201221, name: 'スタミナグリード', value: 350},
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
                normal: {id: 200712, name: '前途洋々', value: 150},
                rare: {id: 200711, name: '切り開く者', value: 550},
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
                rare: {id: 200621, name: '眠れる獅子', value: 550},
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
                rare: {id: 201201, name: 'VIP顔パス', value: 550},
                normal: {id: 201202, name: 'パス上手', value: 150},
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
                normal: {id: 201142, name: '軽やかステップ', value: 150},
                rare: {id: 201141, name: '神業ステップ', value: 550},
                distanceLimit: [3],
                tooltip: '「スタート後20秒で発動」として扱う。大体そこら辺で内コースを取り始めるため。多分（ガバ）',
                check: function () {
                    return thiz.isDistanceType(3) && thiz.accTimePassed(20)
                }
            },
            {
                normal: {id: 200562, name: 'スタミナキープ', value: 150},
                rare: {id: 200561, name: '余裕綽々', value: 550},
                styleLimit: [2],
                init: function () {
                    this.randoms = thiz.initIntervalRandom(1.0 / 12, 1.0 / 6)
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(2)
                        && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 200692, name: '展開窺い', value: 150},
                rare: {id: 200691, name: '慧眼', value: 550},
                distanceLimit: [2],
                styleLimit: [3, 4],
                tooltip: '順位>50%は満たしていると見なす。実質差し追込限定。',
                init: function () {
                    this.randoms = thiz.initIntervalRandom(1.0 / 12, 1.0 / 6)
                },
                check: function (startPosition) {
                    return thiz.isDistanceType(2)
                        && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 201422, name: '小休憩', value: 150},
                rare: {id: 201421, name: 'リラックス', value: 550},
                styleLimit: [3],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(2)
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 200442, name: '隠れ蓑', value: 150},
                rare: {id: 200441, name: '鋼の意志', value: 550},
                init: function() {
                    this.randoms = thiz.initIntervalRandom(0, 0.666)
                },
                check: function (startPosition) {
                    thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 201492, name: '冷静', value: 150},
                rare: {id: 201491, name: '冷静沈着', value: 550},
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
                normal: {id: 200472, name: 'ペースキープ', value: 150},
                rare: {id: 200471, name: '不屈の心', value: 550},
                tooltip: '「中盤のどこか」として扱う。実戦で発動できるかどうかは各自判断すべし。',
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 200482, name: 'ウマ込み冷静', value: 150},
                rare: {id: 200481, name: 'どこ吹く風', value: 550},
                tooltip: '「中盤のどこか」として扱う。実戦で発動できるかどうかは各自判断すべし。ていうかあまり発動しないんじゃね？',
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 200762, name: '別腹タンク', value: 150},
                rare: {id: 200761, name: '火事場のバ鹿力', value: 550},
                distanceLimit: [4],
                check: function () {
                    return thiz.isDistanceType(4) && thiz.sp <= thiz.spMax * 0.3
                }
            },
            {
                normal: {id: 0, name: 'アオハル点火・体', value: 165},
                rare: {id: 0, name: 'アオハル燃焼・体', value: 605},
                tooltip: '効果1.1倍として扱う',
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 0, name: '静かな呼吸', value: 150},
                rare: {id: 0, name: '潜伏態勢', value: 550},
                styleLimit: StyleLimit.Sasi,
                init: function () {
                    this.randoms = thiz.initPhaseRandom(0, {startRate: 0.5})
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(STYLE.SASI) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 202002, name: '砂塵慣れ', heal: 150},
                styleLimit: StyleLimit.Behind,
                surfaceLimit: SurfaceLimit.Dirt,
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isSurfaceType(SURFACE.DIRT) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                rare: {id: 202071, name: '泰然自若', heal: 750, speed: -0.15},
                normal: {id: 202072, name: 'マイペース', heal: 350, speed: -0.15},
                duration: 1.2,
                distanceLimit: DistanceLimit.Long,
                tooltip: '4-7位',
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1, {endRate: 0.5})
                },
                check: function (startPosition) {
                    return thiz.isDistanceType(DISTANCE.LONG) &&
                        thiz.isInRandom(this.randoms, startPosition)
                }
            },
            // End of heal skills
        ],
        targetSpeed: [
            {
                normal: {id: 200332, name: 'コーナー巧者○', value: 0.15},
                rare: {id: 200331, name: '弧線のプロフェッサー', value: 0.35},
                duration: 2.4,
                cd: 30,
                conditions: {
                    all_corner_random: 1
                }
            },
            {
                normal: {id: 200972, name: '短距離コーナー○', value: 0.15},
                rare: {id: 200971, name: '短距離コーナー◎', value: 0.25},
                duration: 3,
                distanceLimit: [1],
                conditions: {
                    all_corner_random: 1,
                    distance_type: 1
                }
            },
            {
                normal: {id: 201042, name: 'マイルコーナー○', value: 0.15},
                rare: {id: 201041, name: 'マイルコーナー◎', value: 0.25},
                duration: 3,
                distanceLimit: [2],
                conditions: {
                    all_corner_random: 1,
                    distance_type: 2
                }
            },
            {
                normal: {id: 201112, name: '中距離コーナー○', value: 0.15},
                rare: {id: 201111, name: '中距離コーナー◎', value: 0.25},
                duration: 3,
                distanceLimit: [3],
                conditions: {
                    all_corner_random: 1,
                    distance_type: 3
                }
            },
            {
                normal: {id: 201182, name: '長距離コーナー○', value: 0.15},
                rare: {id: 201181, name: '長距離コーナー◎', value: 0.25},
                duration: 3,
                distanceLimit: [4],
                conditions: {
                    all_corner_random: 1,
                    distance_type: 4
                }
            },
            {
                normal: {id: 201252, name: '逃げコーナー○', value: 0.15},
                rare: {id: 201251, name: '逃げコーナー◎', value: 0.25},
                duration: 3,
                styleLimit: [1],
                conditions: {
                    all_corner_random: 1,
                    running_style: 1
                }
            },
            {
                normal: {id: 201322, name: '先行コーナー○', value: 0.15},
                rare: {id: 201321, name: '先行コーナー◎', value: 0.25},
                duration: 3,
                styleLimit: [2],
                conditions: {
                    all_corner_random: 1,
                    running_style: 2
                }
            },
            {
                normal: {id: 201392, name: '差しコーナー○', value: 0.15},
                rare: {id: 201391, name: '差しコーナー◎', value: 0.25},
                duration: 3,
                styleLimit: [3],
                conditions: {
                    all_corner_random: 1,
                    running_style: 3
                }
            },
            {
                normal: {id: 201462, name: '追込コーナー○', value: 0.15},
                rare: {id: 201461, name: '追込コーナー◎', value: 0.25},
                duration: 3,
                styleLimit: [4],
                conditions: {
                    all_corner_random: 1,
                    running_style: 4
                }
            },
            {
                normal: {id: 200362, name: '直線巧者', value: 0.15},
                rare: {id: 200361, name: 'ハヤテ一文字', value: 0.35},
                duration: 2.4,
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
                normal: {id: 201032, name: 'マイル直線○', value: 0.15},
                rare: {id: 201031, name: 'マイル直線◎', value: 0.25},
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
                normal: {id: 201242, name: '逃げ直線○', value: 0.15},
                rare: {id: 201241, name: '逃げ直線◎', value: 0.25},
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
                normal: {id: 201312, name: '先行直線○', value: 0.15},
                rare: {id: 201311, name: '先行直線◎', value: 0.25},
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
                normal: {id: 201382, name: '差し直線○', value: 0.15},
                rare: {id: 201381, name: '差し直線◎', value: 0.25},
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
                normal: {id: 201452, name: '追込直線○', value: 0.15},
                rare: {id: 201451, name: '追込直線◎', value: 0.25},
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
                normal: {id: 200542, name: '急ぎ足', value: 0.15},
                rare: {id: 200541, name: '脱出術', value: 0.35},
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
                normal: {id: 200592, name: '位置取り押し上げ', value: 0.15},
                rare: {id: 200591, name: '迅速果断', value: 0.35},
                duration: 2.4,
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
                normal: {id: 201272, name: '先頭プライド', value: 0.15},
                duration: 3,
                styleLimit: [1],
                init: function () {
                    this.randoms = thiz.initIntervalRandom(0, 0.3)
                },
                check: function (startPosition) {
                    return thiz.accTimePassed(5) && thiz.isRunningStyle(1)
                        && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 200582, name: '抜け出し準備', value: 0.15},
                rare: {id: 200581, name: 'スピードスター', value: 0.35},
                duration: 1.8,
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
                normal: {id: 200612, name: '外差し準備', value: 0.15},
                rare: {id: 200611, name: '昇り龍', value: 0.35},
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
                normal: {id: 201412, name: '十万バリキ', value: 0.15},
                rare: {id: 201411, name: '百万バリキ', value: 0.35},
                duration: 2.4,
                styleLimit: [3],
                conditions: {
                    up_slope_random: 1,
                    running_style: 3
                }
            },
            {
                normal: {id: 200982, name: '大きなリード', value: 0.15},
                rare: {id: 200981, name: '圧倒的リード', value: 0.35},
                duration: 3,
                distanceLimit: [1],
                styleLimit: [1],
                tooltip: '中盤に入った瞬間に1位で5馬身リードしていると見なす。見なすな。',
                check: function () {
                    return thiz.isDistanceType(1) && thiz.curretPhase === 1
                }
            },
            {
                normal: {id: 200672, name: '詰め寄り', targetSpeed: 0.15, acceleration: 0.05 },
                rare: {id: 200671, name: '電撃の煌めき', targetSpeed: 0.35, acceleration: 0.1 },
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
                normal: {id: 200682, name: '積極策', value: 0.15},
                rare: {id: 200681, name: 'マイルの支配者', value: 0.35},
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
                normal: {id: 201052, name: 'ギアシフト', value: 0.15},
                rare: {id: 201051, name: 'ギアチェンジ', value: 0.35},
                duration: 2.4,
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
                normal: {id: 201072, name: '負けん気', value: 0.15},
                rare: {id: 201071, name: '姉御肌', value: 0.35},
                duration: 2.4,
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
                normal: {id: 200722, name: 'テンポアップ', value: 0.15},
                rare: {id: 200721, name: 'キラーチューン', value: 0.35},
                duration: 2.4,
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
                normal: {id: 200732, name: '食い下がり', targetSpeed: 0.15, acceleration: 0.05},
                rare: {id: 200731, name: '勝利への執念', targetSpeed: 0.35, acceleration: 0.1},
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
                normal: {id: 200752, name: '内弁慶', value: 0.15},
                rare: {id: 200751, name: '内的体験', value: 0.35},
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
                normal: {id: 201192, name: 'リードキープ', value: 0.15},
                rare: {id: 201191, name: '先陣の心得', value: 0.35},
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
                normal: {id: 201661, name: '遊びはおしまいっ！', value: 0.15},
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
                normal: {id: 201651, name: 'スリップストリーム', value: 0.15},
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
                normal: {id: 200632, name: '仕掛け抜群', value: 0.15},
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
                rare: {id: 201211, name: '怒涛の追い上げ', value: 0.35},
                normal: {id: 201212, name: '追い上げ', value: 0.15},
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
                normal: {id: 201082, name: 'スピードイーター', value: 0.15},
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
                normal: {id: 200462, name: 'ペースアップ', value: 0.15},
                rare: {id: 200461, name: 'アガッてきた！', value: 0.35},
                duration: 1.8,
                tooltip: '「中盤のどこかで発動」として扱う。ガバガバ実装。',
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function す(startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 201672, name: 'レコメンド', value: 0.15},
                rare: {id: 201671, name: 'チャート急上昇！', value: 0.35},
                duration: 2.4,
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
                normal: {id: 200512, name: '末脚', value: 0.15},
                rare: {id: 200511, name: '全身全霊', value: 0.35},
                duration: 2.4,
                init: function () {
                    this.randoms = thiz.initPhaseRandom(3)
                },
                check: function (startPosition) {
                    return thiz.isInSpurt && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 201611, name: '尻尾上がり', value: 0.15},
                rare: {id: 201612, name: '尻尾の滝登り', value: 0.35},
                duration: 3,
                check: function () {
                    return thiz.skillTriggerCount[1] >= 3
                }
            },
            {
                normal: {id: 0, name: 'アオハル点火・速', value: 0.1725},
                rare: {id: 0, name: 'アオハル燃焼・速', value: 0.4025},
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
                normal: {id: 201702, name: 'ありったけ', value: 0.15},
                rare: {id: 201701, name: '決死の覚悟', value: 0.35},
                duration: 2.4,
                check: function () {
                    return thiz.isInStraight() && thiz.isInSpurt
                }
            },
            {
                normal: {id: 202012, name: '影打', value: 0.15},
                rare: {id: 202011, name: '真打', value: 0.35},
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
                normal: {id: 202021, name: '早仕掛け', value: 0.05},
                rare: {id: 202022, name: '強攻策', value: 0.25},
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
            {
                rare: {id: 201173, name: '烈風一閃', value: 0.35},
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
                rare: {id: 202061, name: '日本一のウマ娘', value: 0.35},
                duration: 3,
                distanceLimit: [4],
                init: function () {
                    this.randoms = thiz.initFinalCornerRandom()
                },
                check: function (startPosition) {
                    return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 201591, name: 'ウマ好み', value: 0.15},
                rare: {id: 201592, name: 'ウママニア', value: 0.35},
                duration: 3,
                tooltip: '開始5秒で即発動扱い',
                check: function () {
                    return thiz.accTimePassed(5)
                }
            },
        ],
        // End of target speed skills
        acceleration: [
            {
                normal: {id: 200342, name: 'コーナー加速○', value: 0.2},
                rare: {id: 200341, name: '曲線のソムリエ', value: 0.4},
                duration: 3,
                cd: 30,
                conditions: {
                    all_corner_random: 1
                }
            },
            {
                normal: {id: 200372, name: '直線加速', value: 0.2},
                rare: {id: 200371, name: '一陣の風', value: 0.4},
                duration: 3,
                cd: 30,
                init: function () {
                    this.randoms = thiz.initStraightRandom()
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 200532, name: '先駆け', value: 0.2},
                rare: {id: 200531, name: '先手必勝', value: 0.4},
                styleLimit: [1],
                duration: 1.2,
                check: function () {
                    return thiz.isRunningStyle(1) && thiz.currentPhase === 0
                }
            },
            {
                normal: {id: 200552, name: '押し切り準備', value: 0.2},
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
                normal: {id: 200602, name: '差し切り体勢', value: 0.2},
                rare: {id: 200601, name: '乗り換え上手', value: 0.4},
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
                normal: {id: 200642, name: '直線一気', value: 0.2},
                rare: {id: 200641, name: '迫る影', value: 0.4},
                duration: 0.9,
                styleLimit: [4],
                check: function () {
                    return thiz.isRunningStyle(4) && thiz.isInSpurt && !thiz.isInCorner()
                }
            },
            {
                normal: {id: 200652, name: 'スプリントギア', value: 0.2},
                rare: {id: 200651, name: 'スプリントターボ', value: 0.4},
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
                normal: {id: 200702, name: '上昇気流', value: 0.2},
                rare: {id: 200701, name: '豪脚', value: 0.4},
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
                normal: {id: 200992, name: '善後策', value: 0.2},
                rare: {id: 200991, name: 'プランX', value: 0.4},
                duration: 3,
                styleLimit: [1, 2],
                distanceLimit: [1],
                init: function () {
                    this.randoms = thiz.initIntervalRandom(5.0 / 12, 2.0 / 3)
                },
                check: function (startPosition) {
                    return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                normal: {id: 201062, name: 'アクセラレーション', value: 0.2},
                rare: {id: 201061, name: 'アクセル全開！', value: 0.4},
                duration: 3,
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
                normal: {id: 201292, name: '二の矢', value: 0.2},
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
                normal: {id: 201332, name: '巧みなステップ', value: 0.2},
                rare: {id: 201331, name: '技巧派', value: 0.3},
                duration: 1.8,
                styleLimit: [2],
                tooltip: '「スタート後20秒で発動」として扱う。ガバガバ実装。',
                check: function () {
                    return thiz.isRunningStyle(2) && thiz.accTimePassed(20)
                }
            },
            {
                normal: {id: 201342, name: '直滑降', value: 0.2},
                rare: {id: 201341, name: '決意の直滑降', value: 0.3},
                duration: 3,
                styleLimit: [2],
                conditions: {
                    down_slope_random: 1,
                    running_style: 2
                }
            },
            {
                normal: {id: 201581, name: '登山家', value: 0.2},
                duration: 3,
                conditions: {
                    up_slope_random: 1
                }
            },
            {
                normal: {id: 201362, name: 'まき直し', value: 0.2},
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
                normal: {id: 201402, name: 'がんばり屋', value: 0.2},
                rare: {id: 201401, name: '努力家', value: 0.3},
                duration: 4,
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
                normal: {id: 200492, name: '垂れウマ回避', value: 0.2},
                rare: {id: 200491, name: 'ノンストップガール', value: 0.4},
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
                normal: {id: 201601, name: '地固め', value: 0.2},
                duration: 3,
                tooltip: '「緑スキルや集中力系でスタートと同時に発動」として扱う',
                check: function () {
                    return true
                }
            },
            {
                normal: {id: 0, name: 'アオハル点火・力', value: 0.22},
                rare: {id: 0, name: 'アオハル燃焼・力', value: 0.44},
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
                normal: {id: 0, name: '前列狙い', value: 0.2},
                rare: {id: 0, name: '狙うは最前列！', value: 0.3},
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
                normal: {id: 201902, name: '真っ向勝負', value: 0.2},
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
                normal: {id: 0, name: 'アオハル点火・根', targetSpeed: 0.055, acceleration: 0.11},
                rare: {id: 0, name: 'アオハル燃焼・根', targetSpeed: 0.275, acceleration: 0.33},
                duration: 1.8,
                tooltip: '効果1.1倍として扱う',
                init: function () {
                    this.randoms = thiz.initPhaseRandom(2)
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                rare: {id: 210061, name: '一番星', targetSpeed: 0.3, acceleration: 0.36, heal: 420},
                normal: {id: 210062, name: '綺羅星', targetSpeed: 0.06, acceleration: 0.12, heal: 60},
                duration: 1.2,
                tooltip: '効果1.2倍(25戦↑)として扱う',
                conditions: {
                    distance_rate_after_random: 50
                }
            }
        ],
        // End of boost skills
        gate: [
            {
                normal: {id: 200432, name: '集中力', value: 0.9},
                rare: {id: 200431, name: 'コンセントレーション', value: 0.4},
                inherit: {id: 200433, name: 'ゲート難', value: 1.5},
            }
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
                    return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
                        && thiz.accTimePassed(5)
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
                    return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
                        && thiz.accTimePassed(5)
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
                all: {name: '独占力', value: -0.25},
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
                all: {name: 'まなざし', value: -0.15},
                duration: 3,
                init: function () {
                    this.randoms = thiz.initPhaseRandom(2)
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: 'アナタヲ・オイカケテ', value: -0.05},
                duration: 6,
                check: function () {
                    return thiz.position >= thiz.courseLength * 0.5
                }
            },
            {
                all: {name: 'アナタヲ・オイカケテ(継承)', value: -0.025},
                duration: 3.6,
                check: function () {
                    return thiz.position >= thiz.courseLength * 0.5
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
                    return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '逃げけん制', value: 100},
                styleLimit: [1],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(0)
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '先行けん制', value: 100},
                styleLimit: [2],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(0)
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '差しけん制', value: 100},
                styleLimit: [3],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(0)
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '追込けん制', value: 100},
                styleLimit: [4],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(0)
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '逃げ焦り', value: 100},
                styleLimit: [1],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '先行焦り', value: 100},
                styleLimit: [2],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '差し焦り', value: 100},
                styleLimit: [3],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '追込焦り', value: 100},
                styleLimit: [4],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
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
                    return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '逃亡禁止令', value: 300},
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
                all: {name: '抜け駆け禁止', value: 100},
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
                all: {name: 'ささやき', value: 100},
                distanceLimit: [3],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: 'ささやきx2', value: 200},
                distanceLimit: [3],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '魅惑のささやき', value: 300},
                distanceLimit: [3],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '魅惑のささやきx2', value: 600},
                distanceLimit: [3],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '鋭い眼光', value: 100},
                init: function () {
                    this.randoms = thiz.initPhaseRandom(2)
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '鋭い眼光x2', value: 200},
                init: function () {
                    this.randoms = thiz.initPhaseRandom(2)
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '八方にらみ', value: 300},
                init: function () {
                    this.randoms = thiz.initPhaseRandom(2)
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: '八方にらみx2', value: 600},
                init: function () {
                    this.randoms = thiz.initPhaseRandom(2)
                },
                check: function (startPosition) {
                    return thiz.isInRandom(this.randoms, startPosition)
                }
            },
            {
                all: {name: 'スタミナグリード', value: 100},
                distanceLimit: [4],
                init: function () {
                    this.randoms = thiz.initPhaseRandom(1)
                },
                check: function (startPosition) {
                    return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
                }
            },
        ]
    }
}

const uniqueSkillData = (thiz) =>
    [
        {
            name: '  なし／発動しない',
            noInherit: true,
            check: function () {
                return false
            }
        },
        {
            id: 10321, name: 'introduction：My body',
            noInherit: true,
            heal: 350,
            duration: 4,
            targetSpeed: 0.15,
            tooltip: '3～4位(<=40%)',
            check: function () {
                return thiz.position >= thiz.courseLength / 2.0 && thiz.isInCorner(thiz.position)
            }
        },
        {
            id: 100321, name: 'U=ma2',
            heal: 550,
            duration: 4,
            targetSpeed: 0.25,
            tooltip: '3～4位(<=40%)',
            check: function () {
                return thiz.position >= thiz.courseLength / 2.0 && thiz.isInCorner(thiz.position)
            }
        },
        {
            id: 10451, name: 'クリアハート',
            noInherit: true,
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
            id: 100451, name: 'ピュリティオブハート',
            heal: 750,
            tooltip: '2～4位(<=40%)',
            init: function () {
                this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
                return thiz.isInRandom(this.randoms, startPosition)
            }
        },
        {
            id: 10521, name: 'ワクワクよーいドン',
            noInherit: true,
            heal: 350,
            tooltip: '近くにウマ娘がいる＆順位<=50%は満たしていると見なす',
            check: function () {
                return thiz.isInFinalCorner()
            }
        },
        {
            id: 100521, name: 'ワクワククライマックス',
            heal: 550,
            tooltip: '近くにウマ娘がいる＆順位<=50%は満たしていると見なす',
            check: function () {
                return thiz.isInFinalCorner()
            }
        },
        {
            id: 110111, name: 'ゲインヒール・スペリアー',
            heal: 750,
            tooltip: '中盤のどこかで発動として見なす。',
            init: function () {
                this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
                return thiz.isInRandom(this.randoms, startPosition)
            }
        },
        {
            id: 110011, name: 'わやかわ♪マリンダイヴ',
            heal: 550,
            check: function () {
                return thiz.skillTriggerCount[1] >= 2
            }
        },
        {
            id: 0, name: 'Drain for rose',
            heal: 550,
            tooltip: '50%地点で即発動として扱う。',
            check: function (startPosition) {
                return thiz.isContainsRemainingDistance(thiz.courseLength * 0.5, startPosition)
            }
        },
        {
            id: 10071, name: '波乱注意砲！',
            noInherit: true,
            targetSpeed: 0.15,
            duration: 6,
            tooltip: '順位条件の<=50%は満たしていると見なす',
            check: function () {
                return thiz.position >= thiz.courseLength * 0.5 && thiz.position <= thiz.courseLength * 0.6
            }
        },
        {
            id: 100071, name: '不沈艦、抜錨ォッ！',
            targetSpeed: 0.25,
            duration: 6,
            tooltip: '順位条件の<=50%は満たしていると見なす',
            check: function () {
                return thiz.position >= thiz.courseLength * 0.5 && thiz.position <= thiz.courseLength * 0.6
            }
        },
        {
            id: 100131, name: '貴顕の使命を果たすべく',
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
            id: 110131, name: '最強の名を懸けて',
            targetSpeed: 0.35,
            duration: 6,
            tooltip: '「最終直線のどこか」として扱う。',
            init: function () {
                this.randoms = thiz.initFinalStraightRandom()
            },
            check: function (startPosition) {
                return thiz.isInRandom(this.randoms, startPosition)
            }
        },
        {
            id: 10081, name: 'アクセルX',
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
            id: 100081, name: 'カッティング×DRIVE！',
            targetSpeed: 0.35,
            duration: 5,
            tooltip: '「他面倒くさいの全部満たしたと見なして200mで発動する」として扱う。',
            check: function (startPosition) {
                return startPosition <= thiz.toPosition(200)
                    && thiz.position >= thiz.toPosition(200)
            }
        },
        {
            id: 100061, name: '勝利の鼓動',
            targetSpeed: 0.45,
            duration: 5,
            tooltip: '順位条件は満たしてると見なす',
            check: function (startPosition) {
                return startPosition <= thiz.toPosition(200)
                    && thiz.position >= thiz.toPosition(200)
            }
        },
        {
            id: 100171, name: '汝、皇帝の神威を見よ',
            targetSpeed: 0.45,
            duration: 5,
            tooltip: '最終コーナーで3人追い抜きは満たしたと見なす',
            check: function () {
                return thiz.isInFinalStraight()
            }
        },
        {
            id: 10181, name: 'エンプレス・プライド',
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
            id: 100181, name: 'ブレイズ・オブ・プライド',
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
            id: 10351, name: '全力Vサインッ！',
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
            id: 100351, name: '勝利のチケットを、君にッ！',
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
            id: 10411, name: '学級委員長+速さ＝バクシン',
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
            id: 100411, name: '優等生×バクシン＝大勝利ッ',
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
            id: 10561, name: '来てください来てください！',
            noInherit: true,
            targetSpeed: 0.25,
            acceleration: 0.1,
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
            id: 100561, name: '来ます来てます来させます！',
            targetSpeed: 0.35,
            acceleration: 0.1,
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
            id: 10601, name: 'アタシもたまには、ね？',
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
            id: 100601, name: 'きっとその先へ…！',
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
            id: 10111, name: '精神一到',
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
            id: 100111, name: '精神一到何事か成らざらん',
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
            tooltip: '4～6位(<=70%)',
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
            tooltip: '4～6位(<=70%)',
            check: function (startPosition) {
                return startPosition <= thiz.toPosition(200)
                    && thiz.position >= thiz.toPosition(200)
                    && thiz.temptationModeStart == null && thiz.startDelay < 0.08
            }
        },
        {
            id: 100011, name: 'シューティングスター',
            targetSpeed: 0.35,
            duration: 5,
            acceleration: 0.1,
            init: function () {
                this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
                return thiz.isInRandom(this.randoms, startPosition)
            }
        },
        {
            id: 100021, name: '先頭の景色は譲らない…！',
            targetSpeed: 0.35,
            duration: 5,
            check: function () {
                return thiz.isInInterval(0.5, 1)
            }
        },
        {
            id: 100031, name: '究極テイオーステップ',
            targetSpeed: 0.45,
            duration: 5,
            tooltip: '他の条件は無視して「最終直線であれば発動する」として扱う',
            check: function () {
                return thiz.isInFinalStraight()
            }
        },
        {
            id: 100151, name: 'ヴィットーリアに捧ぐ舞踏',
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
            targetSpeed: 0.45,
            duration: 5,
            tooltip: '競合あり、2～7位(<=75%)',
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
            id: 100301, name: 'ブルーローズチェイサー',
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
            id: 110031, name: '絶対は、ボクだ',
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
            id: 110241, name: 'フラワリー☆マニューバ(前)',
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
            id: 110181, name: '薫風、永遠なる瞬間を',
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
            id: 100121, name: 'タイマン！デッドヒート！',
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
            id: 110041, name: 'グッときて♪Chu',
            targetSpeed: 0.35,
            duration: 5,
            check: function () {
                return thiz.position >= thiz.courseLength * 0.5 && thiz.healTriggerCount > 0
            }
        },
        {
            id: 100371, name: 'Schwarze Schwert',
            targetSpeed: 0.35,
            duration: 5,
            check: function () {
                return thiz.isInFinalStraight() && thiz.temptationModeStart == null
                    && thiz.startDelay < 0.08
            }
        },
        {
            id: 0, name: '禾スナハチ登ル',
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
            id: 0, name: '尊み☆ﾗｽﾄｽﾊﾟ━━(ﾟ∀ﾟ)━━ﾄ!',
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
            id: 0, name: '姫たるもの、勝利をこの手に',
            targetSpeed: 0.35,
            duration: 5,
            tooltip: '最終直線に入ってすぐ発動として扱う',
            check: function () {
                return thiz.isInFinalStraight()
            }
        },
        {
            id: 0, name: 'アナタヲ・オイカケテ',
            targetSpeed: 0.25,
            duration: 6,
            tooltip: '順位条件は満たしていると見なす',
            check: function () {
                return thiz.position >= thiz.courseLength * 0.5
            }
        },
        {
            id: 100171, name: '翳り退く、さざめきの矢',
            targetSpeed: 0.35,
            duration: 5,
            check: function () {
                return thiz.isInFinalCorner();
            }
        },
        {
            id: 100481, name: 'YEAH☆VIVID TIME!',
            targetSpeed: 0.35,
            duration: 5,
            check: function () {
                return thiz.isInFinalStraight();
            }
        },
        {
            id: 100231, name: 'Presents from X',
            targetSpeed: 0.35,
            duration: 5,
            check: function () {
                return thiz.position >= thiz.courseLength * 0.5
            }
        },
        {
            id: 100041, name: '紅焔ギア/LP1211-M',
            acceleration: 0.4,
            duration: 4,
            tooltip: '順位<=5及び<=50%は満たしていると見なす。どの脚質でも最速発動扱い。',
            check: function () {
                return thiz.isInFinalCorner() || thiz.isInFinalStraight()
            }
        },
        {
            id: 100101, name: 'ヴィクトリーショット！',
            acceleration: 0.4,
            duration: 4,
            tooltip: '順位>=3及び<=50%は満たしていると見なす',
            check: function () {
                return thiz.isInFinalCorner({start: 0.5, end: 1})
            }
        },
        {
            id: 10271, name: '燃えろ筋肉！',
            noInherit: true,
            acceleration: 0.3,
            duration: 4,
            styleLimit: [3, 4],
            tooltip: '常に順位>=65%及び<=70%は満たしていると見なす。実戦は発動がより遅くなる。',
            check: function () {
                return thiz.currentPhase >= 2 && thiz.isInCorner()
            }
        },
        {
            id: 100271, name: 'レッツ・アナボリック！',
            acceleration: 0.4,
            duration: 4,
            styleLimit: [3, 4],
            tooltip: '常に順位>=65%及び<=70%は満たしていると見なす。実戦は発動がより遅くなる。',
            check: function () {
                return thiz.currentPhase >= 2 && thiz.isInCorner()
            }
        },
        {
            id: 100201, name: 'アングリング×スキーミング',
            acceleration: 0.4,
            duration: 4,
            styleLimit: [1, 2],
            tooltip: '順位1位は満たしたと見なす',
            check: function () {
                return thiz.currentPhase >= 2 && thiz.isInCorner()
            }
        },
        {
            id: 110241, name: 'フラワリー☆マニューバ(後)',
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
            id: 100131, name: 'コンドル猛撃波',
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
            id: 100591, name: '彼方、その先へ…',
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
            id: 10091, name: 'レッドエース',
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
            id: 100091, name: 'ブリリアント・レッドエース',
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
            id: 10141, name: '熱血☆アミーゴ',
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
            id: 100141, name: 'プランチャ☆ガナドール',
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
            id: 10241, name: '勝利のキッス☆',
            noInherit: true,
            boost: {
                targetSpeed: 0.15,
                acceleration: 0.2
            },
            duration: 5,
            tooltip: '最終コーナーで発動として扱う',
            check: function () {
                return thiz.isInFinalCorner()
            }
        },
        {
            id: 100241, name: 'ひらめき☆ランディング',
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
            id: 100381, name: '#LookatCurren',
            boost: {
                targetSpeed: 0.25,
                acceleration: 0.3
            },
            duration: 5,
            tooltip: '2～4位(<=40%)。レース50%-65%のどこかで発動。',
            init: function () {
                this.randoms = thiz.initIntervalRandom(0.5, 0.65)
            },
            check: function (startPosition) {
                return thiz.isInRandom(this.randoms, startPosition)
            }
        },
        {
            id: 100461, name: 'キラキラ☆STARDOM',
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
            id: 100581, name: 'I Never Goof Up!',
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
            id: 0, name: 'I\'M☆FULL☆SPEED!!',
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
            id: 0, name: 'ぐるぐるマミートリック♡',
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
            id: 110061, name: '聖夜のミラクルラン！',
            targetSpeed: 0.25,
            acceleration: 0.3,
            heal: 350,
            duration: 5,
            check: function () {
                return thiz.position >= thiz.courseLength * 0.5 && thiz.healTriggerCount >= 3
            }
        },
        {
            id: 100221, name: 'Fairy tale',
            targetSpeed: 0.35,
            duration: 5,
            check: function () {
                return thiz.position >= thiz.courseLength * 0.52
            }
        },
        {
            id: 100211, name: '白い稲妻、見せたるで！',
            targetSpeed: 0.35,
            acceleration: 0.1,
            duration: 5,
            check: function () {
                return thiz.isInStraight() && thiz.position >= thiz.courseLength * 0.5
            }
        },
        {
            id: 110521, name: '113転び114起き',
            targetSpeed: 0.25,
            duration: 6,
            tooltip: '6秒持続として扱う',
            check: function () {
                return thiz.isInFinalCorner()
            }
        },
        {
            id: 110151, name: '恵福バルカローレ',
            targetSpeed: 0.45,
            duration: 4,
            tooltip: '7回発動したとして扱う。じゃないと弱すぎる。',
            check: function (startPosition) {
                return startPosition <= thiz.toPosition(400)
                    && thiz.position >= thiz.toPosition(400)
            }
        },
        {
            id: 100691, hid: 900691, name: '憧れは桜を越える！',
            targetSpeed: 0.35,
            duration: 5,
            check: function (startPosition) {
                return startPosition <= thiz.toPosition(300)
                    && thiz.position >= thiz.toPosition(300)
            }
        },
        {
            id: 110261, name: 'オペレーション・Cacao',
            targetSpeed: 0.35,
            heal: 150,
            duration: 5,
            check: function () {
                return thiz.currentPhase === 1 && thiz.isInCorner()
            }
        },
        {
            id: 110371, name: 'Guten Appetit♪',
            targetSpeed: 0.35,
            duration: 6,
            tooltip: '最終コーナー以降で3人追い抜きは満たしたと見なす',
            check: function () {
                return thiz.isInFinalStraight()
            }
        },
        {
            id: 100331, name: 'ディオスクロイの流星',
            targetSpeed: 0.45,
            duration: 5,
            tooltip: '7～9位(>=80%)の場合。他の場合は他の最終直線0.35固有で代用して下さい。',
            check: function () {
                return thiz.isInFinalStraight()
            }
        },
        {
            id: 100681, name: '勝ち鬨ワッショイ！',
            targetSpeed: 0.25,
            acceleration: 0.3,
            duration: 5,
            tooltip: '1～2位',
            check: function () {
                return (thiz.isPhase(2) && thiz.isStraightFrontType(2)) ||
                    (thiz.isInInterval(0.5, 1) && thiz.isInCorner(null, 3))
            }
        },
        {
            id: 10621, name: 'レディー、どんっ！',
            noInherit: true,
            targetSpeed: 0.15,
            heal: 350,
            duration: 5,
            tooltip: '3～6位(<=70%)',
            check: function() {
                return thiz.isInInterval(0.5, 1) && thiz.isPhase(1)
            }
        },
        {
            id: 100621, name: 'どんっ、パッ、むんっ',
            targetSpeed: 0.25,
            heal: 550,
            duration: 5,
            tooltip: '3～6位(<=70%)',
            check: function() {
                return thiz.isInInterval(0.5, 1) && thiz.isPhase(1)
            }
        },
        {
            id: 100051, name: '煌星のヴォードヴィル',
            targetSpeed: 0.45,
            duration: 5,
            check: function () {
                return thiz.isInFinalStraight()
            }
        },
        {
            id: 100671, name: '晦冥を照らせ永遠の耀き',
            targetSpeed: 0.45,
            duration: 5,
            tooltip: '2～5位。発動時先頭から5m以内の場合。',
            check: function () {
                return thiz.isInFinalStraight()
            }
        },
        {
            id: 100711, name: '一期の夢、刹那の飛翔',
            targetSpeed: 0.45,
            heal: -100,
            duration: 4,
            check: function () {
                return thiz.isInFinalStraight()
            }
        },
        {
            id: 100741, name: '麗しき花信風',
            targetSpeed: 0.15,
            duration: 5,
            tooltip: '4～7位',
            conditions: {
                distance_rate: '>=50'
            },
            trigger: function(skill) {
                const map = {
                    2000: 1,
                    2400: 1.5,
                    2600: 2,
                    2800: 2.2,
                    3000: 2.5,
                    3200: 3,
                    3500: 3.5,
                    99999999: 4,
                }
                for (const key in map) {
                    if (thiz.sp < key) {
                        skill.duration *= map[key]
                        return {
                            extended: map[key].toString()
                        }
                    }
                }
            }
        }
    ].sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })
// End of unique skills

export {normalSkillData, uniqueSkillData}
