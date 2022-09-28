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
            normal: {id: 200022, name: '반시계(좌) 방향○', value: 40},
            rare: {id: 200021, name: '반시계(좌) 방향◎', value: 60},
            status: ['speed'],
            courseLimit: {
              'turn': [2]
            },
          },
          {
            normal: {id: 200012, name: '시계(우) 방향○', value: 40},
            rare: {id: 200011, name: '시계(우) 방향◎', value: 60},
            status: ['speed'],
            courseLimit: {
              'turn': [1]
            },
          },
          {
            normal: {name: '계절 우마무스메○', value: 40},
            rare: {name: '계절 우마무스메◎', value: 60},
            status: ['speed'],
            emulatorTypeLimit: ['cm'],
            check: function () {
              return thiz.emulatorType === 'cm'
            }
          },
          {
            normal: {id: 200272, name: '단독○', value: 40},
            rare: {id: 200271, name: '단독◎', value: 60},
            status: ['speed'],
            check: function () {
              return true
            }
          },
          {
            normal: {id: 200302, name: '복병○', value: 40},
            rare: {id: 200301, name: '복병◎', value: 60},
            status: ['speed'],
            check: function () {
              return true
            }
          },
          {
            normal: {id: 200262, name: '바깥쪽 그룹 능숙○', value: 40},
            rare: {id: 200261, name: '바깥쪽 그룹 능숙◎', value: 60},
            status: ['speed'],
            tooltip: '발동률 44% 계산 (챔피언스미팅 기준)',
            triggerRate: 4.0 / 9,
            check: function () {
              return true
            }
          },
          {
            normal: {id: 201631, name: '심퍼시', value: 40},
            status: ['speed'],
            check: function () {
              return true
            }
          },
          {
            normal: {id: 201641, name: '고독한 늑대', value: 40},
            status: ['speed'],
            check: function () {
              return true
            }
          },
          {
            normal: {id: 200082, name: '삿포로 경기장○', value: 40},
            rare: {id: 200081, name: '삿포로 경기장◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10001]
            },
          },
          {
            normal: {id: 200092, name: '하코다테 경기장○', value: 40},
            rare: {id: 200091, name: '하코다테 경기장◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10002]
            },
          },
          {
            normal: {id: 200112, name: '니이가타 경기장○', value: 40},
            rare: {id: 200111, name: '니이가타 경기장◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10003]
            },
          },
          {
            normal: {id: 200102, name: '후쿠시마 경기장○', value: 40},
            rare: {id: 200101, name: '후쿠시마 경기장◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10004]
            },
          },
          {
            normal: {id: 200042, name: '나카야마 경기장○', value: 40},
            rare: {id: 200041, name: '나카야마 경기장◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10005]
            },
          },
          {
            normal: {id: 200032, name: '도쿄 경기장○', value: 40},
            rare: {id: 200031, name: '도쿄 경기장◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10006]
            },
          },
          {
            normal: {id: 200072, name: '츄쿄 경기장○', value: 40},
            rare: {id: 200071, name: '츄쿄 경기장◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10007]
            },
          },
          {
            normal: {id: 200062, name: '교토 경기장○', value: 40},
            rare: {id: 200061, name: '교토 경기장◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10008]
            },
          },
          {
            normal: {id: 200052, name: '한신 경기장○', value: 40},
            rare: {id: 200051, name: '한신 경기장◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10009]
            },
          },
          {
            normal: {id: 200122, name: '코쿠라 경기장○', value: 40},
            rare: {id: 200121, name: '코쿠라 경기장◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10010]
            },
          },
          {
            normal: {id: 200952, name: '오이 경기장○', value: 40},
            rare: {id: 200951, name: '오이 경기장◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'raceTrackId': [10101]
            },
          },
          {
            normal: {id: 200132, name: '근간거리○', value: 40},
            rare: {id: 200131, name: '근간거리◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'distance': [1200, 1600, 2000, 2400, 2800, 3200, 3600]
            },
          },
          {
            normal: {id: 200142, name: '비근간거리○', value: 40},
            rare: {id: 200141, name: '비근간거리◎', value: 60},
            status: ['stamina'],
            courseLimit: {
              'distance': [1000, 1100, 1300, 1400, 1500, 1700, 1800, 1900, 2100, 2200
                , 2300, 2500, 2600, 2700, 2900, 3000, 3100, 3300, 3400, 3500]
            },
          },
          {
            normal: {id: 200152, name: '양호한 경기장○', value: 40},
            rare: {id: 200151, name: '양호한 경기장◎', value: 60},
            surfaceConditionLimit: ['0'],
            status: ['power'],
            check: function () {
              return thiz.track.surfaceCondition === '0'
            }
          },
          {
            normal: {id: 200162, name: '진창길○', value: 40},
            rare: {id: 200161, name: '진창길◎', value: 60},
            surfaceConditionLimit: ['1', '2', '3'],
            status: ['power'],
            check: function () {
              return thiz.track.surfaceCondition !== '0'
            }
          },
          {
            normal: {id: 200282, name: '대항 의식○', value: 40},
            rare: {id: 200281, name: '대항 의식◎', value: 60},
            status: ['power'],
            check: function () {
              return true
            }
          },
          {
            normal: {name: '날씨○', value: 40},
            rare: {name: '날씨◎', value: 60},
            status: ['guts'],
            emulatorTypeLimit: ['cm'],
            check: function () {
              return thiz.emulatorType === 'cm'
            }
          },
          {
            normal: {id: 200292, name: '집중 마크○', value: 40},
            rare: {id: 200291, name: '집중 마크◎', value: 60},
            status: ['guts'],
            check: function () {
              return true
            }
          },
          {
            normal: {id: 200252, name: '안쪽 그룹 능숙○', value: 40},
            rare: {id: 200251, name: '안쪽 그룹 능숙◎', value: 60},
            status: ['wisdom'],
            tooltip: '발동률 33% 계산 (챔피언스 미팅 기준)',
            triggerRate: 3.0 / 9,
            check: function () {
              return true
            }
          },
          {
            normal: {id: 201522, name: '도주의 요령○', value: 40},
            rare: {id: 201521, name: '도주의 요령◎', value: 60},
            status: ['wisdom'],
            styleLimit: [1],
            check: function () {
              return thiz.isRunningStyle(STYLE.NIGE)
            }
          },
          {
            normal: {id: 201532, name: '선행의 요령○', value: 40},
            rare: {id: 201531, name: '선행의 요령◎', value: 60},
            status: ['wisdom'],
            styleLimit: [2],
            check: function () {
              return thiz.isRunningStyle(2)
            }
          },
          {
            normal: {id: 201542, name: '선입의 요령○', value: 40},
            rare: {id: 201541, name: '선입의 요령◎', value: 60},
            status: ['wisdom'],
            styleLimit: [3],
            check: function () {
              return thiz.isRunningStyle(3)
            }
          },
          {
            normal: {id: 201552, name: '추입의 요령○', value: 40},
            rare: {id: 201551, name: '추입의 요령◎', value: 60},
            status: ['wisdom'],
            styleLimit: [4],
            check: function () {
              return thiz.isRunningStyle(4)
            }
          },
          {
            normal: {id: 201562, name: '럭키 세븐', value: 40},
            rare: {id: 201561, name: '슈퍼 럭키 세븐', value: 60},
            status: ['speed', 'stamina', 'power'],
            tooltip: '발동률 1/18 계산 (챔피언스 미팅 기준)',
            triggerRate: 1.0 / 18,
            check: function () {
              return true
            }
          },
          {
            normal: {id: 200172, name: '봄 우마무스메○', value: 40},
            rare: {id: 200171, name: '봄 우마무스메◎', value: 60},
            status: ['speed'],
            tooltip: '발동률 40% 계산',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.season === 0
            }
          },
          {
            normal: {id: 200182, name: '여름 우마무스메○', value: 40},
            rare: {id: 200181, name: '여름 우마무스메◎', value: 60},
            status: ['speed'],
            tooltip: '발동률 20% 계산',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.season === 1
            }
          },
          {
            normal: {id: 200192, name: '가을 우마무스메○', value: 40},
            rare: {id: 200191, name: '가을 우마무스메◎', value: 60},
            status: ['speed'],
            tooltip: '발동률 20% 계산',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.season === 2
            }
          },
          {
            normal: {id: 200202, name: '겨울 우마무스메○', value: 40},
            rare: {id: 200201, name: '겨울 우마무스메◎', value: 60},
            status: ['speed'],
            tooltip: '발동률 20% 계산',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.season === 3
            }
          },
          {
            normal: {id: 200212, name: '맑은 날○', value: 40},
            rare: {id: 200211, name: '맑은 날◎', value: 60},
            status: ['guts'],
            tooltip: '발동률 57.5% 계산',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.weather === 0
            }
          },
          {
            normal: {id: 200222, name: '흐린 날○', value: 40},
            rare: {id: 200221, name: '흐린 날◎', value: 60},
            status: ['guts'],
            tooltip: '발동률 30% 계산',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.weather === 1
            }
          },
          {
            normal: {id: 200232, name: '비 오는 날○', value: 40},
            rare: {id: 200231, name: '비 오는 날◎', value: 60},
            status: ['guts'],
            tooltip: '발동률 11% 계산',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.weather === 2
            }
          },
          {
            normal: {id: 200242, name: '눈오는 날○', value: 40},
            rare: {id: 200241, name: '눈오는 날◎', value: 60},
            status: ['guts'],
            tooltip: '발동률 1.5% 계산',
            emulatorTypeLimit: ['team'],
            check: function () {
              return thiz.weather === 3
            }
          },
          {
            rare: {id: 200194, name: '초가을 강풍', value: 60},
            status: ['speed', 'power'],
            check: function () {
              return thiz.season === 2
            }
          },
          {
            rare: {id: 200174, name: '첫 봄바람', value: 60},
            status: ['speed', 'power'],
            check: function () {
              return thiz.season === 1
            }
          },
          // End of passive skills
        ],
        heal: [
          {
            normal: {id: 200352, name: '코너 회복○', value: 150},
            rare: {id: 200351, name: '원호의 마에스트로', value: 550},
            init: function () {
              this.randoms = thiz.initCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200382, name: '직선 회복', value: 150},
            rare: {id: 200381, name: '호전일식', value: 550},
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200742, name: '심호흡', value: 150},
            rare: {id: 200741, name: '쿨다운', value: 550},
            distanceLimit: DistanceLimit.Long,
            init: function () {
              this.randoms = thiz.initStraightRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(DISTANCE.LONG) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201571, name: '스리 세븐', value: 150},
            check: function (startPosition) {
              return thiz.isContainsRemainingDistance(777, startPosition)
            }
          },
          {
            normal: {id: 201621, name: '쥐어짜기', value: 150},
            check: function () {
              return thiz.skillTriggerCount[2] + thiz.skillTriggerCount[3] >= 3
            }
          },
          {
            normal: {id: 201482, name: '하굣길의 즐거움', value: 150},
            rare: {id: 201481, name: '하교 후의 스페셜리스트', value: 550},
            styleLimit: [4],
            check: function () {
              return thiz.accTimePassed(10) && thiz.isRunningStyle(4)
                  && thiz.isInSlope('down')
            }
          },
          {
            normal: {id: 201282, name: '기세에 맡기기', value: 150},
            rare: {id: 201281, name: '말괄량이 우마무스메', value: 550},
            styleLimit: [1],
            check: function () {
              return thiz.accTimePassed(10) && thiz.isRunningStyle(1)
                  && thiz.isInSlope('up')
            }
          },
          {
            normal: {id: 201352, name: '영양 보급', value: 150},
            rare: {id: 201351, name: '먹보', value: 550},
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200572, name: '좋은 위치 뒤따르기', value: 150},
            rare: {id: 200571, name: '레이스 플래너', value: 550},
            styleLimit: [2],
            tooltip: '순위<=50% 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200662, name: '상황 파악', value: 150},
            styleLimit: [3, 4],
            distanceLimit: [1],
            tooltip: '순위>50% 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201222, name: '스태미나 이터', value: 150},
            rare: {id: 201221, name: '스태미나 그리드', value: 350},
            styleLimit: [2, 3, 4],
            distanceLimit: [4],
            tooltip: '순위 5위 이하 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200712, name: '전도유망', value: 150},
            rare: {id: 200711, name: '개척자', value: 550},
            styleLimit: [1, 2],
            distanceLimit: [3],
            tooltip: '랜덤 발동 지점에서 ‘선두’ 한정으로 발동이 어려움. 여기선 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200622, name: '후방 대기', value: 150},
            rare: {id: 200621, name: '잠자는 사자', value: 550},
            styleLimit: [4],
            tooltip: '위치>=75% 조건 충족으로 간주. 순위보다 조건이 까다로우니 주의, 특히 고루시.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            rare: {id: 201201, name: 'VIP 안면 패스', value: 550},
            normal: {id: 201202, name: '능숙한 패스', value: 150},
            distanceLimit: [4],
            tooltip: '「초반에서 중반 어딘가에서」 발동하는 걸로 간주.',
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
            normal: {id: 201142, name: '경쾌한 스텝', value: 150},
            rare: {id: 201141, name: '신들린 스텝', value: 550},
            distanceLimit: [3],
            tooltip: '「스타트 후 20초 때」 발동으로 간주. 대체적으로 그때 쯤 안쪽 레인으로 이동하기 시작. 아마도?',
            check: function () {
              return thiz.isDistanceType(3) && thiz.accTimePassed(20)
            }
          },
          {
            normal: {id: 200562, name: '스태미나 킵', value: 150},
            rare: {id: 200561, name: '여유만만', value: 550},
            styleLimit: [2],
            tooltip: '순위<=50% 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.accTimePassed(5)
                  && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200692, name: '전개 살피기', value: 150},
            rare: {id: 200691, name: '혜안', value: 550},
            distanceLimit: [2],
            styleLimit: [3, 4],
            tooltip: '순위>50% 조건 충족으로 간주. 실질적으로 선입, 추입 한정.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.accTimePassed(5)
                  && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201422, name: '짧은 휴식', value: 150},
            rare: {id: 201421, name: '릴랙스', value: 550},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200442, name: '방패막이', value: 150},
            rare: {id: 200441, name: '강철 같은 의지', value: 550},
            tooltip: '「오르막에서 발동」으로 간주(가장 현실적인 방안). 실전에서는 저 파워의 도주마 뒤에 걸린 선행마 한정 등 조건이 굉장히 까다롭기 때문에 스킬 선택은 각자 판단에 맡김.',
            check: function () {
              return thiz.accTimePassed(5) && thiz.isInSlope('up')
            }
          },
          {
            normal: {id: 201492, name: '냉정', value: 150},
            styleLimit: [4],
            tooltip: '「중반 어딘가에서 발동」으로 간주. 실전성 여부는 불확실함.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.accTimePassed(10) &&
                  thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200472, name: '페이스 킵', value: 150},
            rare: {id: 200471, name: '꺾이지 않는 마음', value: 550},
            tooltip: '「중반 어딘가에서 발동」으로 간주. 실전에서의 발동 여부는 각자 판단에 맡김.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200482, name: '마군 속 냉정', value: 150},
            rare: {id: 200481, name: '마이동풍', value: 550},
            tooltip: '「중반 어딘가에서 발동」으로 간주. 실전에서의 발동 여부는 각자 판단에 맡김. 역시나 잘 발동하지 않으려나?',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200762, name: '외장 탱크', value: 150},
            rare: {id: 200761, name: '위기 앞의 저력', value: 550},
            distanceLimit: [4],
            check: function () {
              return thiz.isDistanceType(4) && thiz.sp <= 0
            }
          },
          {
            normal: {id: 0, name: '아오하루 점화・체력', value: 165},
            rare: {id: 0, name: '아오하루 연소・체력', value: 605},
            tooltip: '1.1배 효과로 적용.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 0, name: '고요한 호흡', value: 150},
            rare: {id: 0, name: '잠복태세', value: 550},
            styleLimit: StyleLimit.Sasi,
            init: function () {
              this.randoms = thiz.initPhaseRandom(0, {startRate: 0.5})
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(STYLE.SASI) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 202002, name: '모래 먼지 익숙해지기', heal: 150},
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
            normal: {id: 200332, name: '코너 달인○', value: 0.15},
            rare: {id: 200331, name: '호선의 프로페서', value: 0.35},
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
            normal: {id: 200972, name: '단거리 코너○', value: 0.15},
            rare: {id: 200971, name: '단거리 코너◎', value: 0.25},
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
            normal: {id: 201042, name: '마일 코너○', value: 0.15},
            rare: {id: 201041, name: '마일 코너◎', value: 0.25},
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
            normal: {id: 201112, name: '중거리 코너○', value: 0.15},
            rare: {id: 201111, name: '중거리 코너◎', value: 0.25},
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
            normal: {id: 201182, name: '장거리 코너○', value: 0.15},
            rare: {id: 201181, name: '장거리 코너◎', value: 0.25},
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
            normal: {id: 201252, name: '도주 코너○', value: 0.15},
            rare: {id: 201251, name: '도주 코너◎', value: 0.25},
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
            normal: {id: 201322, name: '선행 코너○', value: 0.15},
            rare: {id: 201321, name: '선행 코너◎', value: 0.25},
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
            normal: {id: 201392, name: '선입 코너○', value: 0.15},
            rare: {id: 201391, name: '선입 코너◎', value: 0.25},
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
            normal: {id: 201462, name: '추입 코너○', value: 0.15},
            rare: {id: 201461, name: '추입 코너◎', value: 0.25},
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
            normal: {id: 200362, name: '직선 달인', value: 0.15},
            rare: {id: 200361, name: '한줄기 질풍', value: 0.35},
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
            normal: {id: 200962, name: '단거리 직선○', value: 0.15},
            rare: {id: 200961, name: '단거리 직선◎', value: 0.25},
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
            normal: {id: 201032, name: '마일 직선○', value: 0.15},
            rare: {id: 201031, name: '마일 직선◎', value: 0.25},
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
            normal: {id: 201102, name: '중거리 직선○', value: 0.15},
            rare: {id: 201101, name: '중거리 직선◎', value: 0.25},
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
            normal: {id: 201172, name: '장거리 직선○', value: 0.15},
            rare: {id: 201171, name: '장거리 직선◎', value: 0.25},
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
            normal: {id: 201242, name: '도주 직선○', value: 0.15},
            rare: {id: 201241, name: '도주 직선◎', value: 0.25},
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
            normal: {id: 201312, name: '선행 직선○', value: 0.15},
            rare: {id: 201311, name: '선행 직선◎', value: 0.25},
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
            normal: {id: 201382, name: '선입 직선○', value: 0.15},
            rare: {id: 201381, name: '선입 직선◎', value: 0.25},
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
            normal: {id: 201452, name: '추입 직선○', value: 0.15},
            rare: {id: 201451, name: '추입 직선◎', value: 0.25},
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
            normal: {id: 200542, name: '빠른 걸음', value: 0.15},
            rare: {id: 200541, name: '탈출술', value: 0.35},
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
            normal: {id: 200592, name: '위치 선정 밀어붙이기', value: 0.15},
            rare: {id: 200591, name: '신속 과감', value: 0.35},
            duration: 1.8,
            styleLimit: [3],
            tooltip: '순위>50% 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201272, name: '선두 프라이드', value: 0.15},
            duration: 3,
            styleLimit: [1],
            tooltip: '「초반 어딘가에서 발동」으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.accTimePassed(5) && thiz.isRunningStyle(1)
                  && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200582, name: '빠져나갈 준비', value: 0.15},
            rare: {id: 200581, name: '스피드스터', value: 0.35},
            duration: 1.2,
            styleLimit: [2],
            tooltip: '순위<=50% 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200612, name: '외곽 추월 준비', value: 0.15},
            rare: {id: 200611, name: '승천하는 용', value: 0.35},
            duration: 3,
            styleLimit: [3],
            tooltip: '「최종 코너 어딘가에서 발동」으로 간주. 불확실함.',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201412, name: '십만 마력', value: 0.15},
            rare: {id: 201411, name: '백만 마력', value: 0.35},
            duration: 1.8,
            styleLimit: [3],
            check: function () {
              return thiz.isRunningStyle(3) && thiz.isInSlope('up')
            }
          },
          {
            normal: {id: 200982, name: '큰 리드', value: 0.15},
            rare: {id: 200981, name: '압도적 리드', value: 0.35},
            duration: 1.2,
            distanceLimit: [1],
            styleLimit: [1],
            tooltip: '중반에 접어든 순간에 선두로 5마신 리드하고 있는 걸로 간주. 그런 가정은 필요 없다고.',
            check: function () {
              return thiz.isDistanceType(1) && thiz.curretPhase === 1
            }
          },
          {
            normal: {id: 200672, name: '바짝 붙기', value: 0.15},
            rare: {id: 200671, name: '번갯불의 번뜩임', value: 0.35},
            duration: 3,
            distanceLimit: [1],
            styleLimit: [3, 4],
            tooltip: '순위>50% 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200682, name: '적극책', value: 0.15},
            rare: {id: 200681, name: '마일의 지배자', value: 0.35},
            duration: 3,
            distanceLimit: [2],
            styleLimit: [1, 2],
            tooltip: '선두 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
                  && thiz.accTimePassed(5)
            }
          },
          {
            normal: {id: 201052, name: '기어 시프트', value: 0.15},
            rare: {id: 201051, name: '기어 체인지', value: 0.35},
            duration: 1.2,
            distanceLimit: [2],
            styleLimit: [1, 2],
            tooltip: '순위<=50% 조건 충족으로 간주',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201072, name: '오기', value: 0.15},
            rare: {id: 201071, name: '여장부 기질', value: 0.35},
            duration: 1.8,
            distanceLimit: [2],
            tooltip: '「중반 어딘가에서 발동」으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
                  && thiz.accTimePassed(5)
            }
          },
          {
            normal: {id: 200722, name: '템포 업', value: 0.15},
            rare: {id: 200721, name: '킬러 튠', value: 0.35},
            duration: 0.9,
            distanceLimit: [3],
            styleLimit: [1, 2],
            tooltip: '순위<=50% 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200732, name: '물고 늘어지기', value: 0.15},
            rare: {id: 200731, name: '승리를 향한 집념', value: 0.35},
            duration: 3,
            distanceLimit: [3],
            tooltip: '「최종 코너 어딘가에서 발동」으로 간주. 불확실함.',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200752, name: '안쪽 코너 여포', value: 0.15},
            rare: {id: 200751, name: '내적 체험', value: 0.35},
            duration: 3,
            distanceLimit: [4],
            tooltip: '안쪽 레인에 있는 걸로 간주. 실질적으론 도주마 전용이려나? 몰?루',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201192, name: '리드 킵', value: 0.15},
            rare: {id: 201191, name: '선봉의 마음가짐', value: 0.35},
            duration: 3,
            distanceLimit: [4],
            tooltip: '「중반 어딘가에서 발동」할 때 3마신 리드하고 있는 걸로 간주. 일반적으로 단독 도주 외에는 꿈만 같은 이야기..',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201661, name: '장난은 끝이야!', value: 0.15},
            duration: 3,
            tooltip: '「중반 어딘가에서 발동」으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.accTimePassed(10) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201651, name: '슬립스트림', value: 0.15},
            duration: 3,
            tooltip: '「중반 어딘가에서 발동」으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.accTimePassed(10) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200632, name: '뛰어난 작전', value: 0.15},
            rare: {id: 0, name: '질풍노도', value: 0.35},
            duration: 3,
            styleLimit: [4],
            tooltip: '위치>75% 조건 만족으로 간주. 실전성 여부는 불확실함.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201212, name: '추격', value: 0.15},
            duration: 3,
            distanceLimit: [4],
            tooltip: '「종반 어딘가에서 발동」으로 간주. 실전에서는 가속 중 발동하는 경우가 대부분.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201082, name: '스피드 이터', value: 0.15},
            duration: 3,
            styleLimit: [1],
            distanceLimit: [2],
            tooltip: '선두 조건 충족으로 간주. 실전성 여부는 불확실함.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200462, name: '페이스 업', value: 0.15},
            rare: {id: 200461, name: '텐션 오르는데!', value: 0.35},
            duration: 1.8,
            tooltip: '「중반 어딘가에서 발동」으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201672, name: '리커멘드', value: 0.15},
            rare: {id: 201671, name: '차트 급상승!', value: 0.35},
            duration: 1.8,
            surfaceLimit: SurfaceLimit.Dirt,
            tooltip: '「중반 어딘가에서 발동」으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isSurfaceType(SURFACE.DIRT) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200512, name: '뒷심', value: 0.15},
            rare: {id: 200511, name: '전심전력', value: 0.35},
            duration: 1.8,
            init: function () {
              this.randoms = thiz.initPhaseRandom(3)
            },
            check: function (startPosition) {
              return thiz.isInSpurt && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201611, name: '꼬리 올리기', value: 0.15},
            rare: {id: 201612, name: '꼬리의 폭포오르기', value: 0.35},
            duration: 3,
            check: function () {
              return thiz.skillTriggerCount[1] >= 3
            }
          },
          {
                normal: {id: 201591, name: '우마무스메 애호가', value: 0.15},
                rare: {id: 201592, name: '우마무스메 마니아', value: 0.35},
                duration: 3,
                tooltip: '스타트 후 5초 이후 발동으로 간주.(일섭 패치 기준)',
                check: function () {
                    return thiz.accTimePassed(5)
                }
            },
          {
            normal: {id: 0, name: '아오하루 점화・속도', value: 0.1725},
            rare: {id: 0, name: '아오하루 연소・속도', value: 0.4025},
            duration: 1.8,
            tooltip: '1.15배 효과로 적용.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201702, name: '있는 대로 모두', value: 0.15},
            rare: {id: 201701, name: '결사의 각오', value: 0.35},
            duration: 2.4,
            check: function () {
              return thiz.isInStraight() && thiz.isInSpurt
            }
          },
          {
            normal: {id: 202012, name: '거짓 주역', value: 0.15},
            rare: {id: 202011, name: '진 주역', value: 0.35},
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
            normal: {id: 202021, name: '이른 작전', value: 0.05},
            rare: {id: 202022, name: '강공책', value: 0.25},
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
            rare: {id: 201103, name: '광망일섬', value: 0.35},
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
            normal: {id: 200342, name: '코너 가속○', value: 0.2},
            rare: {id: 200341, name: '곡선의 소믈리에', value: 0.4},
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
            normal: {id: 200372, name: '직선 가속', value: 0.2},
            rare: {id: 200371, name: '일진광풍', value: 0.4},
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
            normal: {id: 200532, name: '앞장서기', value: 0.2},
            rare: {id: 200531, name: '선수 필승', value: 0.4},
            styleLimit: [1],
            duration: 1.2,
            check: function () {
              return thiz.isRunningStyle(1) && thiz.currentPhase === 0 && thiz.accTimePassed(5)
            }
          },
          {
            normal: {id: 200552, name: '굳히기 준비', value: 0.2},
            rare: {id: 200551, name: '도망자', value: 0.4},
            styleLimit: [1],
            duration: 3,
            tooltip: '선두 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initFinalCornerRandom()
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200602, name: '추월 확정 태세', value: 0.2},
            rare: {id: 200601, name: '능숙한 환승', value: 0.4},
            styleLimit: [3],
            duration: 1.8,
            tooltip: '순위>=50% 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200642, name: '직선 주파', value: 0.2},
            rare: {id: 200641, name: '육박하는 그림자', value: 0.4},
            duration: 0.9,
            styleLimit: [4],
            check: function () {
              return thiz.isRunningStyle(4) && thiz.isInSpurt && !thiz.isInCorner()
            }
          },
          {
            normal: {id: 200652, name: '스프린트 기어', value: 0.2},
            rare: {id: 200651, name: '스프린트 터보', value: 0.4},
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
            normal: {id: 200702, name: '상승기류', value: 0.2},
            rare: {id: 200701, name: '강인한 다리', value: 0.4},
            duration: 3,
            styleLimit: StyleLimit.Behind,
            distanceLimit: DistanceLimit.Mile,
            tooltip: '순위>50% 조건 충족으로 간주',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200992, name: '선후책', value: 0.2},
            rare: {id: 200991, name: '플랜X', value: 0.4},
            duration: 3,
            styleLimit: [1, 2],
            distanceLimit: [1],
            tooltip: '순위>=2 및 순위<=50% 조건 충족으로 간주. 중반 어딘가 발동이라던가 너무의미 없지 않나?',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201062, name: '액셀러레이션', value: 0.2},
            rare: {id: 201061, name: '액셀 전개!', value: 0.4},
            duration: 1.2,
            distanceLimit: [2],
            tooltip: '「중반 어딘가에서 발동」으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201292, name: '두 번째 화살', value: 0.2},
            duration: 3,
            styleLimit: [1],
            tooltip: '「중반 어딘가에서 발동」으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201332, name: '교묘한 스텝', value: 0.2},
            rare: {id: 201331, name: '기교파', value: 0.3},
            duration: 1.8,
            styleLimit: [2],
            tooltip: '「스타트 후 20초에 발동」으로 간주.',
            check: function () {
              return thiz.isRunningStyle(2) && thiz.accTimePassed(20)
            }
          },
          {
            normal: {id: 201342, name: '직활강', value: 0.2},
            rare: {id: 201341, name: '결의의 직활강', value: 0.3},
            duration: 3,
            styleLimit: [2],
            check: function () {
              return thiz.isRunningStyle(2) && thiz.isInSlope('down')
            }
          },
          {
            normal: {id: 201581, name: '등산가', value: 0.2},
            duration: 3,
            check: function () {
              return thiz.isInSlope('up')
            }
          },
          {
            normal: {id: 201362, name: '새 출발', value: 0.2},
            duration: 3,
            styleLimit: [2],
            tooltip: '순위>50% 조건 충족으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201402, name: '근면한 태도', value: 0.2},
            rare: {id: 201401, name: '노력가', value: 0.3},
            duration: 3,
            styleLimit: [3],
            tooltip: '「중반 어딘가에서 발동」으로 간주.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 200492, name: '뒤처지기 방지', value: 0.2},
            rare: {id: 200491, name: '논스톱 걸', value: 0.4},
            duration: 3,
            tooltip: '「종반 어딘가에서 발동」으로 간주. 실전에서의 발동 여부는 각자 판단에 맡김.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 201601, name: '터다지기', value: 0.2},
            duration: 3,
            tooltip: '「패시브 스킬이나 게이트 스킬과 함께 스타트에 발동」으로 간주.',
            check: function () {
              return true
            }
          },
          {
            normal: {id: 0, name: '아오하루 점화・힘', value: 0.22},
            rare: {id: 0, name: '아오하루 연소・힘', value: 0.44},
            duration: 1.2,
            tooltip: '1.1배 효과로 적용.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            normal: {id: 0, name: '앞줄 겨냥', value: 0.2},
            rare: {id: 0, name: '노리는 건 맨 앞줄!', value: 0.3},
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
            normal: {id: 201902, name: '정면승부', value: 0.2},
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
            normal: {id: 0, name: '아오하루 점화・근성', value: {targetSpeed: 0.055, acceleration: 0.11}},
            rare: {id: 0, name: '아오하루 연소・근성', value: {targetSpeed: 0.275, acceleration: 0.33}},
            duration: 1.8,
            tooltip: '1.1배 효과로 적용',
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
            normal: {id: 200432, name: '집중력', value: 0.9},
            rare: {id: 200431, name: '컨센트레이션', value: 0.4},
            inherit: {id: 200433, name: '게이트 난동', value: 1.5},
          }
        ],
        speed: [
          {
            all: {name: '도주 주저', value: -0.15},
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
            all: {name: '도주 주저x2', value: -0.3},
            duration: 3,
            styleLimit: [1],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '선행 주저', value: -0.15},
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
            all: {name: '선행 주저x2', value: -0.3},
            duration: 3,
            styleLimit: [2],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '선입 주저', value: -0.15},
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
            all: {name: '선입 주저x2', value: -0.3},
            duration: 3,
            styleLimit: [3],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '추입 주저', value: -0.15},
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
            all: {name: '추입 주저x2', value: -0.3},
            duration: 3,
            styleLimit: [4],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '후방 못박기', value: -0.2},
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
            all: {name: '뇌쇄술', value: -0.25},
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
            all: {name: '스피드 이터', value: -0.15},
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
            all: {name: '속박', value: -0.15},
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
            all: {name: '독점력', value: -0.25},
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
            all: {name: '시선', value: -0.15},
            duration: 3,
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '당신을 뒤쫓아서', value: -0.05},
            duration: 6,
            check: function () {
              return thiz.position >= thiz.courseLength * 0.5
            }
          },
          {
            all: {name: '당신을 뒤쫓아서(계승)', value: -0.025},
            duration: 3.6,
            check: function () {
              return thiz.position >= thiz.courseLength * 0.5
            }
          },
        ],
        fatigue: [
          {
            all: {name: '스태미나 이터', value: 50},
            distanceLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '스태미나 이터x2', value: 100},
            distanceLimit: [4],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '도주 견제', value: 100},
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '도주 견제x2', value: 200},
            styleLimit: [1],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '선행 견제', value: 100},
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '선행 견제x2', value: 200},
            styleLimit: [2],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '선입 견제', value: 100},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '선입 견제x2', value: 200},
            styleLimit: [3],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '추입 견제', value: 100},
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '추입 견제x2', value: 200},
            styleLimit: [4],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(0)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '도주 긴장', value: 100},
            styleLimit: [1],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '도주 긴장x2', value: 200},
            styleLimit: [1],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(1) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '선행 긴장', value: 100},
            styleLimit: [2],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '선행 긴장x2', value: 200},
            styleLimit: [2],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(2) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '선입 긴장', value: 100},
            styleLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '선입 긴장x2', value: 200},
            styleLimit: [3],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '추입 긴장', value: 100},
            styleLimit: [4],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '추입 긴장x2', value: 200},
            styleLimit: [4],
            tooltip: '2번 동시에 맞음. 1번 맞은 것과 가산 가능.',
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isRunningStyle(4) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '앞지르기 금지', value: 100},
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
            all: {name: '속삭임', value: 100},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '속삭임x2', value: 200},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '매혹적인 속삭임', value: 300},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '매혹적인 속삭임x2', value: 600},
            distanceLimit: [3],
            init: function () {
              this.randoms = thiz.initPhaseRandom(1)
            },
            check: function (startPosition) {
              return thiz.isDistanceType(3) && thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '날카로운 눈빛', value: 100},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '날카로운 눈빛x2', value: 200},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '사방팔방 째려보기', value: 300},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '사방팔방 째려보기x2', value: 600},
            init: function () {
              this.randoms = thiz.initPhaseRandom(2)
            },
            check: function (startPosition) {
              return thiz.isInRandom(this.randoms, startPosition)
            }
          },
          {
            all: {name: '스태미나 그리드', value: 100},
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
          name: '없음／발동 안 함',//billi
          noInherit: true,
          check: function () {
            return false
          }
        },
        {
          id: 10321, name: 'introduction：My body',
          noInherit: true,
          heal: 350,
          tooltip: '순위>=3 및 순위<=40% 조건 충족으로 간주.',
          check: function () {
            return thiz.position >= thiz.courseLength / 2.0 && thiz.isInCorner(thiz.position)
          }
        },
        {
          id: 100321, name: 'U=ma2',
          heal: 550,
          tooltip: '순위>=3 및 순위<=40% 조건 충족으로 간주.',
          check: function () {
            return thiz.position >= thiz.courseLength / 2.0 && thiz.isInCorner(thiz.position)
          }
        },
        {
          id: 10451, name: '클리어 하트',
          noInherit: true,
          heal: 350,
          tooltip: '순위>=2 및 순위<=40% 조건 충족으로 간주.',
          init: function () {
            this.randoms = thiz.initPhaseRandom(1)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100451, name: '퓨리티 오브 하트',
          heal: 550,
          tooltip: '순위>=2 및 순위<=40% 조건 충족으로 간주.',
          init: function () {
            this.randoms = thiz.initPhaseRandom(1)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10521, name: '두근두근 준비 땅!',
          noInherit: true,
          heal: 350,
          tooltip: '인접한 우마무스메가 있음&순위<=50% 조건 충족으로 간주',
          check: function () {
            return thiz.isInFinalCorner()
          }
        },
        {
          id: 100521, name: '두근두근 클라이맥스',
          heal: 550,
          tooltip: '인접한 우마무스메가 있음&순위<=50% 조건 충족으로 간주',
          check: function () {
            return thiz.isInFinalCorner()
          }
        },
        {
          id: 110111, name: '게인힐 슈피리어',
          heal: 550,
          tooltip: '「중반 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initPhaseRandom(1)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 110011, name: '참말로 귀엽네♪ 머린 다이브',
          heal: 550,
          check: function () {
            return thiz.skillTriggerCount[1] >= 2
          }
        },
        {
          id: 0, name: 'Drain for rose',
          heal: 550,
          tooltip: '50% 지점에서 즉시 발동으로 간주.',
          check: function (startPosition) {
            return thiz.isContainsRemainingDistance(thiz.courseLength * 0.5, startPosition)
          }
        },
        {
          id: 10071, name: '파란주의포!',
          noInherit: true,
          targetSpeed: 0.15,
          duration: 6,
          tooltip: '순위<50% 조건 충족으로 간주.',
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5 && thiz.position <= thiz.courseLength * 0.6
          }
        },
        {
          id: 100071, name: '불침함, 출항!!',
          targetSpeed: 0.25,
          duration: 6,
          tooltip: '순위<50% 조건 충족으로 간주.',
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5 && thiz.position <= thiz.courseLength * 0.6
          }
        },
        {
          id: 100131, name: '존귀한 사명을 완수하기 위하여',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '위치<30% 조건 충족으로 간주.',
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
          id: 110131, name: '최강의 이름을 걸고',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「최종 직선 어딘가에서 발동」으로 간주',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10081, name: '엑셀X',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「다른 조건 전부 충족 후 200m 지점에서 발동」으로 간주.',
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
          }
        },
        {
          id: 100081, name: '커팅×DRIVE!',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「다른 조건 전부 충족 후 200m 지점에서 발동」으로 간주.',
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
          }
        },
        {
          id: 100061, name: '승리의 고동',
          targetSpeed: 0.45,
          duration: 5,
          tooltip: '순위 조건 충족으로 간주.',
          check: function (startPosition) {
            return startPosition <= thiz.toPosition(200)
                && thiz.position >= thiz.toPosition(200)
          }
        },
        {
          id: 100171, name: '그대, 황제의 신위를 보라',
          targetSpeed: 0.45,
          duration: 5,
          tooltip: '최종 코너에서 3회 추월한 걸로 간주.',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          id: 10181, name: '엠프리스 프라이드',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「다른 조건 전부 충족 후 최종 코너 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100181, name: '블레이즈 오브 프라이드',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「다른 조건 전부 충족 후 최종 코너 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10351, name: '전력 V 사인!',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「다른 조건 전부 충족 후 최종 직선 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100351, name: '승리의 티켓을 너에게!',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「다른 조건 전부 충족 후 최종 직선 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10411, name: '반장+스피드=돌진',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「레이스1/2~5/6의 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100411, name: '우등생×돌진=대승리!',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「레이스1/2~5/6의 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10561, name: '와주세요 와주세요!',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「종반의 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initPhaseRandom(2)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100561, name: '옵니다 오고 있습니다 오게 할 겁니다!',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「종반의 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initPhaseRandom(2)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10601, name: '나도 가끔은 해야지, 안 그래?',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「라스트 스퍼트 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initPhaseRandom(3)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100601, name: '반드시 그 너머로…!',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「라스트 스퍼트 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initPhaseRandom(3)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10111, name: '정신일도',
          noInherit: true,
          targetSpeed: 0.25,
          duration: 5,
          tooltip: '「최종 직선 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100111, name: '정신일도 하사불성',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「최종 직선 어딘가에서 발동」으로 간주.',
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
          id: 100011, name: '슈팅 스타',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「종반 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initPhaseRandom(2)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100021, name: '선두의 경치는 양보할 수 없어…!',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          id: 100031, name: '궁극 테이오 스텝',
          targetSpeed: 0.45,
          duration: 5,
          tooltip: '「다른 조건 전부 충족 후 최종 직선에서 발동」으로 간주.',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          id: 100151, name: '빅토리아에게 바치는 무도',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「최종 코너 어딘가에서 발동」으로 간주. 발동 안 하겠지만.',
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
          tooltip: '「최종 코너 어딘가에서 발동」으로 간주.',
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
          tooltip: '「최종 코너 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100301, name: '블루 로즈 체이서',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「최종 직선 어딘가에서」으로 간주.',
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
          tooltip: '「최종 코너 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 110031, name: '절대는, 나야',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「최종 직선 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 110241, name: '플라워리☆머누버(전방)',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「최종 코너 어딘가에서 발동」으로 간주. 전방(속도)으로 간주.',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 110181, name: '훈풍, 영원한 순간을',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「중반 어딘가에서 발동」으로 간주. 실제로는 발동 안 함.',
          init: function () {
            this.randoms = thiz.initPhaseRandom(1)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
            id: 100051, name: '빛나는 별의 보드빌',
            targetSpeed: 0.45,
            duration: 5,
            tooltip: '인접 조건 충족으로 간주.',
            check: function () {
                return thiz.isInFinalStraight()
            }
        },
        {
          id: 100121, name: '결투! 데드히트!',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「최종 직선 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initFinalStraightRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 110041, name: '뭉클하게♪ Chu',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5 && thiz.healTriggerCount > 0
          }
        },
        {
          id: 100371, name: 'Schwarzes Schwert',
          targetSpeed: 0.35,
          duration: 5,
          check: function () {
            return thiz.isInFinalStraight() && thiz.temptationModeStart == null
                && thiz.startDelay < 0.08
          }
        },
        {
          id: 0, name: '벼가 곧 무르익는다',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「50%~60% 지점 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 0.6)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 0, name: '존귀☆라스트 스퍼—(ﾟ∀ﾟ)—트!',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「페이즈2 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initPhaseRandom(2)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 0, name: '공주다운 자, 승리를 이 손에',
          targetSpeed: 0.35,
          duration: 5,
          tooltip: '「최종 직선 진입 시 발동」으로 간주.',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          id: 0, name: '당신을 뒤쫓아서',
          targetSpeed: 0.25,
          duration: 6,
          tooltip: '순위 조건 충족으로 간주.',
          check: function () {
            return thiz.position >= thiz.courseLength * 0.5
          }
        },
        {
          id: 100171, name: '어스름은 물렀거라, 떠들썩함의 화살',
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
          id: 100041, name: '홍염 기어/LP1211-M',
          acceleration: 0.4,
          duration: 4,
          tooltip: '순위<=5 및 <=50% 조건 충족으로 간주. 어떤 각질에서도 즉발로 간주.',
          check: function () {
            return thiz.isInFinalCorner() || thiz.isInFinalStraight()
          }
        },
        {
          id: 100101, name: '빅토리 샷!',
          acceleration: 0.4,
          duration: 4,
          tooltip: '순위>=3 및 <=50% 조건 충족으로 간주.',
          check: function () {
            return thiz.isInFinalCorner()
          }
        },
        {
          id: 10271, name: '타올라라 근육!',
          noInherit: true,
          acceleration: 0.3,
          duration: 4,
          styleLimit: [3, 4],
          tooltip: '순위>=65% 및 순위<=70% 조건 충족으로 간주. 실제로는 발동 안 할 수도.',
          check: function () {
            return thiz.currentPhase >= 2 && thiz.isInCorner()
          }
        },
        {
          id: 100271, name: '레츠 아나볼릭!',
          acceleration: 0.4,
          duration: 4,
          styleLimit: [3, 4],
          tooltip: '순위>=65% 및 순위<=70% 조건 충족으로 간주. 실제로는 발동 안 할 수도.',
          check: function () {
            return thiz.currentPhase >= 2 && thiz.isInCorner()
          }
        },
        {
          id: 100201, name: '앵글링×스키밍',
          acceleration: 0.4,
          duration: 4,
          styleLimit: [1, 2],
          tooltip: '선두 조건 충족으로 간주.',
          check: function () {
            return thiz.currentPhase >= 2 && thiz.isInCorner()
          }
        },
        {
          id: 110241, name: ' 플라워리☆머누버(후방)',
          acceleration: 0.4,
          duration: 4,
          tooltip: '「최종 코너 어딘가에서 발동」으로 간주. 후방(가속도)으로 간주.',
          init: function () {
            this.randoms = thiz.initFinalCornerRandom()
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100131, name: '콘도르 맹격파',
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
          tooltip: '「50% 지점 즉발」로 간주.',
          check: function () {
            return thiz.position >= thiz.courseLength / 2.0
          }
        },
        {
          id: 100591, name: '저곳, 그 너머로…',
          acceleration: 0.4,
          duration: 4,
          styleLimit: [3, 4],
          tooltip: '순위>50% 및 순위<70% 조건 충족으로 간주.',
          check: function () {
            return thiz.temptationModeStart == null &&
                ((thiz.currentPhase >= 2 && !thiz.isInFinalCorner() && thiz.isInCorner()) ||
                    (thiz.currentPhase === 1 && thiz.isInFinalCorner() && thiz.isInCorner()))
          }
        },
        {
          id: 10091, name: '레드 에이스',
          noInherit: true,
          boost: {
            targetSpeed: 0.15,
            acceleration: 0.2
          },
          duration: 5,
          tooltip: '「레이스1/2~5/6의 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100091, name: '브릴리언트 레드 에이스',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '「레이스1/2~5/6의 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 10141, name: '열혈☆아미고',
          noInherit: true,
          boost: {
            targetSpeed: 0.15,
            acceleration: 0.2
          },
          duration: 5,
          tooltip: '순위 2위 이하 조건 충족으로 간주.',
          check: function () {
            return thiz.isInFinalStraight() && thiz.sp >= 0.3 * thiz.spMax
          }
        },
        {
          id: 100141, name: '플란차☆가나도르',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '순위 2위 이하 조건 충족으로 간주. 최종 직선 진입 시 즉발로 간주.',
          check: function () {
            return thiz.isInFinalStraight() && thiz.sp >= 0.3 * thiz.spMax
          }
        },
        {
          id: 10241, name: '승리의 키스☆',
          noInherit: true,
          boost: {
            targetSpeed: 0.15,
            acceleration: 0.2
          },
          duration: 5,
          tooltip: '「다른 조건 전부 충족 후 최종 직선 진입 시 발동」으로 간주.',
          check: function () {
            return thiz.isInFinalStraight()
          }
        },
        {
          id: 100241, name: '번뜩임☆랜딩',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '「최종 코너 진입 시 발동」으로 간주.',
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
          tooltip: '「레이스 50%~65%의 어딘가에서 발동」으로 간주.',
          init: function () {
            this.randoms = thiz.initIntervalRandom(0.5, 0.65)
          },
          check: function (startPosition) {
            return thiz.isInRandom(this.randoms, startPosition)
          }
        },
        {
          id: 100461, name: '반짝반짝☆STARDOM',
          boost: {
            targetSpeed: 0.25,
            acceleration: 0.3
          },
          duration: 5,
          tooltip: '「중반의 코너가 아닌 지점에서 발동」으로 간주.',
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
          tooltip: '「종반 코너 어딘가에서 발동」으로 간주.',
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
        tooltip: '순위 조건 충족으로 간주.',
        check: function () {
      return thiz.isInDistanceRate(0.45, 0.6) && thiz.isSPInRange(0, 0.7)
    }
  },
    {
      id: 0, name: '빙글빙글 마미트릭♡',
        boost: {
      targetSpeed: 0.25,
          acceleration: 0.3
    },
      duration: 5,
          tooltip: '순위 조건 충족, 「최종 직선 진입 시 발동」으로 간주.',
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
          tooltip: '순위 조건 충족, 「최종 코너 진입 시 발동」으로 간주.',
        check: function () {
      return thiz.isInFinalCorner();
    }
    },
    {
      id: 110061, name: '성야의 미라클 런!',
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
      id: 100211, name: '하얀 번개, 보여줄끼다!',
        targetSpeed: 0.35,
        acceleration: 0.1,
        duration: 5,
        check: function () {
      return thiz.isInStraight() && thiz.position >= thiz.courseLength * 0.5
    }
    },
    {
      id: 110521, name: '113전 114기',
        targetSpeed: 0.25,
        duration: 6,
        tooltip: '6초 지속으로 간주',
        check: function () {
      return thiz.isInFinalCorner()
    }
    },
    {
      id: 110151, name: '복 주는 바르카롤',
        targetSpeed: 0.45,
        duration: 4,
        tooltip: '7회 발동으로 간주. 아니면 너무 약함.',
        check: function (startPosition) {
      return startPosition <= thiz.toPosition(400)
          && thiz.position >= thiz.toPosition(400)
    }
    },
    {
      id: 100691, hid: 900691, name: '동경은 벚꽃을 넘는다!',
        targetSpeed: 0.35,
        duration: 5,
        check: function (startPosition) {
      return startPosition <= thiz.toPosition(300)
          && thiz.position >= thiz.toPosition(300)
    }
    },
    {
      id: 110261, name: '오퍼레이션 Cacao',
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
        tooltip: '「최종 코너 이후 3회 추월」 조건 충족으로 간주.',
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
