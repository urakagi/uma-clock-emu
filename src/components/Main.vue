<template>
  <div class="main-frame">
    <p>
      <Adsense v-if="production"
               data-ad-client="ca-pub-4611969396217909"
               data-ad-slot="6969023753">
      </Adsense>
    </p>
    <el-form class="input-form" :inline="true">
      <el-form-item>
        <el-button @click="saveUma">セーブ</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="umaToLoad" placeholder="保存済みウマ娘">
          <el-option v-for="(data, key) in savedUmas" :label="key" :value="key" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="loadUma">ロード</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
            confirm-button-text="はい"
            cancel-button-text="いいえ"
            title="削除しますか？"
            trigger="click"
            @confirm="removeUma"
        >
          <el-button slot="reference">削除</el-button>
        </el-popconfirm>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
            confirm-button-text="はい"
            cancel-button-text="いいえ"
            title="リセットしますか？"
            trigger="click"
            @confirm="resetUma"
        >
          <el-button slot="reference">リセット</el-button>
        </el-popconfirm>
      </el-form-item>
      <br>
      <el-form-item label="スピード">
        <el-input v-model="umaStatus.speed" class="input-status"></el-input>
      </el-form-item>
      <el-form-item label="スタミナ">
        <el-input v-model="umaStatus.stamina" class="input-status"></el-input>
      </el-form-item>
      <el-form-item label="パワー">
        <el-input v-model="umaStatus.power" class="input-status"></el-input>
      </el-form-item>
      <el-form-item label="根性">
        <el-input v-model="umaStatus.guts" class="input-status"></el-input>
      </el-form-item>
      <el-form-item label="賢さ">
        <el-input v-model="umaStatus.wisdom" class="input-status"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="脚質">
        <el-select v-model="umaStatus.style" style="width: 100px;">
          <el-option label="逃げ" value="1"></el-option>
          <el-option label="先行" value="2"></el-option>
          <el-option label="差し" value="3"></el-option>
          <el-option label="追込" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="距離適性">
        <el-select v-model="umaStatus.distanceFit" style="width: 70px;">
          <el-option v-for="rank in fitRanks" :label="rank" :value="rank" :key="rank"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="バ場適性">
        <el-select v-model="umaStatus.surfaceFit" style="width: 70px;">
          <el-option v-for="rank in fitRanks" :label="rank" :value="rank" :key="rank"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="脚質適性">
        <el-select v-model="umaStatus.styleFit" style="width: 70px;">
          <el-option v-for="rank in fitRanks" :label="rank" :value="rank" :key="rank"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="調子">
        <el-select v-model="umaStatus.condition" @change="initCondition" style="width: 130px;">
          <el-option label="絶好調" value="0"></el-option>
          <el-option label="好調" value="1"></el-option>
          <el-option label="普通" value="2"></el-option>
          <el-option label="不調" value="3"></el-option>
          <el-option label="絶不調" value="4"></el-option>
          <el-option label="ランダム" value="5"></el-option>
          <el-option label="ランダム(3種)" value="6"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="コース">
        <el-select v-model="track.location" @change="locationChanged" style="width: 120px;">
          <el-option
              v-for="(raceTrack, trackId) in this.trackData"
              :label="raceTrack.name"
              :value="trackId"
              :key="trackId"
          ></el-option>
        </el-select>
        <el-select v-model="track.course" style="width: 170px;">
          <el-option
              v-for="(obj, key) in courseList"
              :label="obj.name"
              :value="key"
              :key="key"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="バ場状態">
        <el-select v-model="track.surfaceCondition" style="width: 90px;">
          <el-option label="良" value="0"></el-option>
          <el-option label="稍重" value="1"></el-option>
          <el-option label="重" value="2"></el-option>
          <el-option label="不良" value="3"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="固有スキル">
        <el-select v-model="selectedUnique">
          <el-option
              v-for="skill in this.uniqueSkillData"
              :label="skill.name"
              :value="skill.name"
              :key="skill.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Lv">
        <el-input-number :max="6" :min="1" v-model="uniqueLevel"></el-input-number>
      </el-form-item>
      <br>
      <el-collapse v-model="skillGroups">
        <el-collapse-item
            v-for="menu in skillMenu"
            :title="menu.title"
            :name="menu.type"
            :key="menu.title"
        >
          <div v-for="rarity in rarities" :key="menu.type + rarity">
            <h3 v-if="availableSkills[menu.type][rarity].length > 0">{{ rarityString[rarity] }}</h3>
            <el-checkbox-group v-model="hasSkills[menu.type][rarity]">
              <el-tooltip
                  v-for="skill in availableSkills[menu.type][rarity]"
                  :key="skill.name"
                  :content="skill.tooltip"
                  :disabled="!('tooltip' in skill)"
              >
                <el-checkbox-button :label="skill.index">
                  {{ skill.name }}
                </el-checkbox-button>
              </el-tooltip>
            </el-checkbox-group>
          </div>
        </el-collapse-item>
      </el-collapse>
      <br>
      <el-form-item>
        <el-button @click="exec" type="success">
          エミューレート開始
        </el-button>
      </el-form-item>
      <el-form-item label="回数">
        <el-input-number value="20" v-model="maxEpoch"></el-input-number>
      </el-form-item>
    </el-form>
    <el-divider/>
    <Adsense v-if="production"
             data-ad-client="ca-pub-4611969396217909"
             data-ad-slot="6969023753">
    </Adsense>
    <div>
      <h3>時計統計</h3>
      <table border="1" class="emulation-result">
        <tr>
          <th></th>
          <th>実タイム</th>
          <th>標準偏差</th>
          <th>ベスト</th>
          <th>ワースト</th>
          <th>ゲーム表記</th>
          <th>ベスト</th>
          <th>ワースト</th>
        </tr>
        <tr>
          <th>平均</th>
          <td>{{ formatTime(avgRaceTime, 2) }}</td>
          <td>{{ timeStandardDeviation.toFixed(3) }}</td>
          <td>{{ formatTime(bestTime, 2) }}</td>
          <td>{{ formatTime(worstTime, 2) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTime), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(bestTime), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(worstTime), 1) }}</td>
        </tr>
        <tr>
          <th>最大ｽﾊﾟｰﾄ</th>
          <td>{{ formatTime(avgRaceTimeMaxSpurt, 2) }}</td>
          <td>{{ timeStandardDeviationMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeMaxSpurt, 2) }}</td>
          <td>{{ formatTime(worstTimeMaxSpurt, 2) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTimeMaxSpurt), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(bestTimeMaxSpurt), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(worstTimeMaxSpurt), 1) }}</td>
        </tr>
        <tr>
          <th>非最大ｽﾊﾟｰﾄ</th>
          <td>{{ formatTime(avgRaceTimeNotMaxSpurt, 2) }}</td>
          <td>{{ timeStandardDeviationNotMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeNotMaxSpurt, 2) }}</td>
          <td>{{ formatTime(worstTimeNotMaxSpurt, 2) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTimeNotMaxSpurt), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(bestTimeNotMaxSpurt), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(worstTimeNotMaxSpurt), 1) }}</td>
        </tr>
      </table>
      <h3>スパート平均</h3>
      <table border="1" class="emulation-result">
        <tr>
          <th>最大スパート率</th>
          <th>最大時耐力余剰</th>
          <th>非最大時不足分</th>
        </tr>
        <tr>
          <td>{{ maxSpurtRate }}%</td>
          <td>{{ maxSpurtSPLeft }}</td>
          <td>{{ nonMaxSpurtSPLack }}</td>
        </tr>
      </table>
    </div>
    <el-divider/>
    <h3>直近レース詳細</h3>
    <race-graph :chart-data="chartData" :options="chartOptions"/>
    <el-divider/>
    <div>
      コースステータスチェック：{{ displayStatusCheck }}
    </div>
    <div>
      補正後：スピード{{ modifiedSpeed.toFixed(1) }} ／スタミナ{{ modifiedStamina.toFixed(1) }} ／パワー{{ modifiedPower.toFixed(1) }}
      ／根性{{ modifiedGuts.toFixed(1) }} ／賢さ{{ modifiedWisdom.toFixed(1) }}
    </div>
    <div>
      初期耐力：{{ spMax.toFixed(1) }}／金回復≒{{ getEqualStamina(550) }}スタミナ／白回復≒{{
        getEqualStamina(150)
      }}スタミナ／終盤耐力消耗係数：{{ spurtSpCoef.toFixed(3) }}
    </div>
    <div>
      スキル発動率：{{ skillActivateRate.toFixed(1) }}％／掛かり率：{{ temperamentRate.toFixed(1) }}％
    </div>
    <div>
      スタート目標速度：{{ v0.toFixed(2) }}／スタート加速度：{{ a0.toFixed(3) }}
    </div>
    <div>
      序盤目標速度：{{ v1.toFixed(2) }}／序盤加速度：{{ a1.toFixed(3) }} ｜
      中盤目標速度：{{ v2.toFixed(2) }}／中盤加速度：{{ a2.toFixed(3) }}
    </div>
    <div>
      終盤目標速度：{{ v3.toFixed(2) }}／終盤加速度：{{ a3.toFixed(3) }} ｜
      最高スパート速度：{{ maxSpurtSpeed.toFixed(2) }}
    </div>
    <el-divider/>
    <h3>最終更新：{{ releases[releases.length - 1].timestamp }}</h3>
    <el-collapse v-model="releaseNote">
      <el-collapse-item title="更新履歴">
        <el-timeline :reverse="true">
          <el-timeline-item
              v-for="(release, index) in releases"
              :key="index"
              :timestamp="release.timestamp">
            {{ release.content }}
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item>
    </el-collapse>
    <h3>注意事項</h3>
    <ol>
      <li>あくまで目安。適当実装＆データの正確性が低いので参考までに。</li>
      <li>データが安定するまではいつでもロードデータが使えなくなる可能性があります。その都度作り直して下さい。安定したらこんなことはなくなります。</li>
      <li>ポジションキープを始めとした他ウマ娘が絡む要素は未実装。</li>
      <li>それが条件になるスキルは適当にそれっぽく実装してます。</li>
      <li>掛かりは未実装。</li>
      <li>喰らう妨害スキルは一律発動率80％としています。</li>
      <li>別情報に地形図がないので坂はJRAの断面図と実際のレース状況を観察して書いたもの。</li>
      <li>固有スキルのLvは変えられません。まぁ6%とか2%しか変わらないのであまり気にしないで下さい。</li>
      <li>固有が多すぎるし発動条件どれもこれも面倒臭すぎるしやってられない。足りてないのは気が向いたら追加していく予定。</li>
      <li>作った人：砂井裏鍵。各種別情報は大いに参考させて頂きました。</li>
      <li><a href="https://twitter.com/urakagi">ツイッターはこ↑こ↓</a></li>
    </ol>
    <el-dialog :visible.sync='emulating' style="text-align: center;">
      エミューレート中、少々お待ち下さい……
      <el-progress :percentage="Math.floor(100 * epoch / maxEpoch)"></el-progress>
      <p>
        <Adsense
            data-ad-client="ca-pub-4611969396217909"
            data-ad-slot="6969023753">
        </Adsense>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import MixinCourseData from "@/components/data/MixinCourseData";
import MixinConstants from "@/components/data/MixinConstants";
import MixinSkills from "@/components/data/MixinSkills";
import RaceGraph from "@/components/RaceGraph";
import MixinReleaseNote from "@/components/data/MixinReleaseNote";

export default {
  name: "Main",
  components: {RaceGraph},
  mixins: [MixinCourseData, MixinConstants, MixinSkills, MixinReleaseNote],
  data() {
    return {
      umaStatus: {
        speed: 900,
        stamina: 1000,
        power: 700,
        guts: 400,
        wisdom: 400,
        condition: '2',
        style: '4',
        distanceFit: 'A',
        surfaceFit: 'A',
        styleFit: 'A'
      },
      passiveBonus: {},
      track: {
        location: '',
        course: '',
        surfaceCondition: '0'
      },
      courseList: [],
      // Results
      emulations: [],
      // Race variables
      epoch: 0,
      maxEpoch: 50,
      modifiedCondition: -1,
      temptationSection: -1,
      sectionTargetSpeedRandoms: [],
      frameElapsed: 0,  // 15 frames per second
      position: 0,
      currentSpeed: 3,
      sp: 0,
      operatingSkills: {speed: [], targetSpeed: [], acceleration: []},
      frames: [],
      startDelay: 0,
      spurtParameters: null,
      downSlopeModeStart: null,
      temptationModeStart: null,
      temptationModeEnd: null,
      temptationWaste: 0,
      // UI
      skillGroups: '',
      emulating: false,
      savedUmas: {},
      umaToLoad: null,
      chartData: {},
      chartOptions: {},
      releaseNote: '',
      // Constants
      fitRanks: ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
    }
  },
  created() {
    this.track.location = Object.keys(this.trackData)[0]
    this.locationChanged(this.track.location)
    this.maxEpoch = localStorage.getItem('maxEpoch')
    if (!this.maxEpoch) {
      this.maxEpoch = 50
    }
  },
  mounted() {
    this.updateSavedUmas()
    this.updateChart()
    if (!this.production) {
      this.umaToLoad = 'test'
      this.loadUma()
      if (this.maxEpoch === 1) {
        this.exec()
      }
    }
  },
  watch: {
    maxEpoch(value) {
      localStorage.setItem('maxEpoch', value)
    }
  },
  computed: {
    runningStyle() {
      return parseInt(this.umaStatus.style)
    },
    trackDetail() {
      if (!this.track.location) {
        return {distance: 0, surface: 1, courseSetStatus: []}
      }
      return this.trackData[this.track.location].courses[this.track.course]
    },
    modifiedSpeed() {
      let statusCheckModifier = 1
      const check = this.trackDetail.courseSetStatus
      if (check.length > 0) {
        const CHECK_KEYS = ['', 'speed', 'stamina', 'power', 'guts', 'wisdom']
        for (const c of check) {
          let bonus
          const status = this.umaStatus[CHECK_KEYS[c]]
          if (status <= 300) {
            bonus = 0.05
          } else if (status <= 600) {
            bonus = 0.1
          } else if (status <= 900) {
            bonus = 0.15
          } else {
            bonus = 0.2
          }
          bonus /= check.length
          statusCheckModifier += bonus
        }
      }
      return this.umaStatus.speed * statusCheckModifier * this.condCoef[this.modifiedCondition]
          + this.surfaceSpeedModify[this.trackDetail.surface][this.track.surfaceCondition]
          + this.passiveBonus.speed
    },
    modifiedStamina() {
      return this.umaStatus.stamina * this.condCoef[this.modifiedCondition] + this.passiveBonus.stamina
    },
    modifiedPower() {
      return this.umaStatus.power * this.condCoef[this.modifiedCondition]
          + this.surfacePowerModify[this.trackDetail.surface][this.track.surfaceCondition]
          + this.passiveBonus.power
    },
    modifiedGuts() {
      return this.umaStatus.guts * this.condCoef[this.modifiedCondition] + this.passiveBonus.guts
    },
    modifiedWisdom() {
      return this.umaStatus.wisdom * this.condCoef[this.modifiedCondition]
          * this.styleFitCoef[this.umaStatus.styleFit] + this.passiveBonus.wisdom
    },
    spMax() {
      return this.trackDetail.distance + 0.8 * this.modifiedStamina * this.styleSpCoef[this.umaStatus.style]
    },
    spurtSpCoef() {
      return 1 + 200 / Math.sqrt(600 * this.modifiedGuts)
    },
    skillActivateRate() {
      return 100 - 9000.0 / this.umaStatus.wisdom
    },
    temperamentRate() {
      return Math.pow(6.5 / (Math.log10(0.1 * this.modifiedWisdom + 1)), 2)
    },
    currentPhase() {
      return this.getPhase(this.position)
    },
    currentSection() {
      return this.getSection(this.position)
    },
    baseSpeed() {
      return 20 - (this.trackDetail.distance - 2000) / 1000.0
    },
    targetSpeed() {
      // 耐力枯渇
      if (this.sp <= 0) {
        return this.vMin
      }
      // スタート時
      // 他に0.85倍の基準速度を下回る可能性がない（耐力枯渇してもこれよりは高い）
      if (this.currentSpeed < 0.85 * this.baseSpeed) {
        return 0.85 * this.baseSpeed
      }
      let baseTargetSpeed
      // スパート中
      if (this.spurtParameters
          && (this.position + this.spurtParameters.distance >= this.courseLength)) {
        baseTargetSpeed = this.spurtParameters.speed
      } else {
        switch (this.currentPhase) {
          case 0:
          case 1:
            baseTargetSpeed = this.baseSpeed * this.styleSpeedCoef[this.umaStatus.style][this.currentPhase]
            break
          case 2:
          case 3:
          default:
            baseTargetSpeed = this.baseSpeed * this.styleSpeedCoef[this.umaStatus.style][2] +
                Math.sqrt(this.modifiedSpeed / 500.0) * this.distanceFitSpeedCoef[this.umaStatus.distanceFit]
            break
        }
        baseTargetSpeed *= (1 + this.sectionTargetSpeedRandoms[this.currentSection])
      }
      let ret = baseTargetSpeed
      const upSlope = this.isInSlope('up')
      if (upSlope) {
        ret -= Math.abs(this.currentSlope) * 200.0 / this.modifiedPower
      }
      const downSlope = this.isInSlope('down')
      if (downSlope) {
        if (this.downSlopeModeStart != null) {
          ret += Math.abs(this.currentSlope) / 10.0 + 0.3
        }
      }
      for (const skill of this.operatingSkills.targetSpeed) {
        ret += skill.data.value
      }
      for (const skill of this.operatingSkills.boost) {
        ret += skill.data.value.targetSpeed
      }
      return ret
    },
    acceleration() {
      const c = this.isInSlope('up') ? 0.0004 : 0.0006
      let ret = c * Math.sqrt(500 * this.modifiedPower)
          * this.styleAccelerateCoef[this.umaStatus.style][this.currentPhase]
          * this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit]
          * this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
      // スタート時加算
      if (this.currentSpeed < 0.85 * this.baseSpeed) {
        ret += 24
      }
      for (const skill of this.operatingSkills.acceleration) {
        ret += skill.data.value
      }
      for (const skill of this.operatingSkills.boost) {
        ret += skill.data.value.acceleration
      }
      return ret
    },
    deceleration() {
      if (this.sp <= 0) {
        return -1.2
      }
      switch (this.currentPhase) {
        case 0:
          return -1.2
        case 1:
          return -0.8
        case 2:
        default:
          return -1.0
      }
    },
    maxSpurtSpeed() {
      return (this.baseSpeed * (this.styleSpeedCoef[this.umaStatus.style][2] + 0.01) +
          Math.sqrt(this.modifiedSpeed / 500) * this.distanceFitSpeedCoef[this.umaStatus.distanceFit]) *
          1.05 + Math.sqrt(500 * this.modifiedSpeed) *
          this.distanceFitSpeedCoef[this.umaStatus.distanceFit] * 0.002
    },
    isInTemptation() {
      if (this.temptationModeStart == null || this.frameElapsed < this.temptationModeStart) {
        return false
      }
      if (this.temptationModeEnd == null) {
        return true
      }
      return this.frameElapsed <= this.temptationModeEnd
    },
    v0() {
      return 0.85 * this.baseSpeed
    },
    v1() {
      return this.baseSpeed * (this.styleSpeedCoef[this.umaStatus.style][0] +
          (this.modifiedWisdom * Math.log10(this.modifiedWisdom / 10)) / 550000 - 0.00325)
    },
    v2() {
      return this.baseSpeed * (this.styleSpeedCoef[this.umaStatus.style][1] +
          (this.modifiedWisdom * Math.log10(this.modifiedWisdom / 10)) / 550000 - 0.00325)
    },
    v3() {
      return this.baseSpeed * (this.styleSpeedCoef[this.umaStatus.style][2] +
          (this.modifiedWisdom * Math.log10(this.modifiedWisdom / 10)) / 550000 - 0.00325) +
          Math.sqrt(this.modifiedSpeed / 500) * this.distanceFitSpeedCoef[this.umaStatus.distanceFit]
    },
    vMin() {
      return 0.85 * this.baseSpeed + 0.01 * Math.sqrt(this.modifiedGuts * 200)
    },
    a0() {
      return 24 + 0.0006 * Math.sqrt(500 * this.modifiedPower)
          * this.styleAccelerateCoef[this.umaStatus.style][0]
          * this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit]
          * this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
    },
    a1() {
      return 0.0006 * Math.sqrt(500 * this.modifiedPower)
          * this.styleAccelerateCoef[this.umaStatus.style][0]
          * this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit]
          * this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
    },
    a2() {
      if (this.v2 < this.v1) {
        return -0.8
      }
      return 0.0006 * Math.sqrt(500 * this.modifiedPower)
          * this.styleAccelerateCoef[this.umaStatus.style][1]
          * this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit]
          * this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
    },
    a3() {
      return 0.0006 * Math.sqrt(500 * this.modifiedPower)
          * this.styleAccelerateCoef[this.umaStatus.style][2]
          * this.surfaceFitAccelerateCoef[this.umaStatus.surfaceFit]
          * this.distanceFitAccelerateCoef[this.umaStatus.distanceFit]
    },
    skillMenu() {
      const TITLE_TYPE = {
        passive: 'パッシブスキル',
        gate: 'ゲートスキル',
        heal: '回復スキル',
        targetSpeed: '速度スキル',
        acceleration: '加速度スキル',
        boost: 'ブーストスキル(速度と加速度が両方上がる)',
        speed: '喰らう減速スキル',
        fatigue: '喰らう疲労スキル',
      }
      const ret = []
      for (const type in this.skills) {
        ret.push({
          title: TITLE_TYPE[type],
          type
        })
      }
      return ret
    },
    avgRaceTime() {
      return this.calcAvg('all', 'raceTime')
    },
    avgRaceTimeMaxSpurt() {
      return this.calcAvg('max', 'raceTime')
    },
    avgRaceTimeNotMaxSpurt() {
      return this.calcAvg('notMax', 'raceTime')
    },
    bestTime() {
      return this.pickEdge('all', 'raceTime', 'best')
    },
    worstTime() {
      return this.pickEdge('all', 'raceTime', 'worst')
    },
    bestTimeMaxSpurt() {
      return this.pickEdge('max', 'raceTime', 'best')
    },
    worstTimeMaxSpurt() {
      return this.pickEdge('max', 'raceTime', 'worst')
    },
    bestTimeNotMaxSpurt() {
      return this.pickEdge('notMax', 'raceTime', 'best')
    },
    worstTimeNotMaxSpurt() {
      return this.pickEdge('notMax', 'raceTime', 'worst')
    },
    timeStandardDeviation() {
      return this.calcStdDev('all', 'raceTime')
    },
    timeStandardDeviationMaxSpurt() {
      return this.calcStdDev('max', 'raceTime')
    },
    timeStandardDeviationNotMaxSpurt() {
      return this.calcStdDev('notMax', 'raceTime')
    },
    maxSpurtRate() {
      if (this.emulations.length === 0) {
        return '-'
      }
      let maxSpurt = 0
      for (const e of this.emulations) {
        if (e.maxSpurt) maxSpurt++
      }
      return (100.0 * maxSpurt / this.emulations.length).toFixed(1)
    },
    maxSpurtSPLeft() {
      if (this.emulations.length === 0) {
        return '-'
      }
      let sum = 0.0
      let count = 0
      for (const e of this.emulations) {
        if (e.maxSpurt) {
          sum += e.spDiff
          count++
        }
      }
      if (count === 0) {
        return '-'
      }
      return (sum / count).toFixed(1)
    },
    nonMaxSpurtSPLack() {
      if (this.emulations.length === 0) {
        return '-'
      }
      let sum = 0.0
      let count = 0
      for (const e of this.emulations) {
        if (!e.maxSpurt) {
          sum += e.spDiff
          count++
        }
      }
      if (count === 0) {
        return '-'
      }
      return (-sum / count).toFixed(1)
    },
    displayStatusCheck() {
      const STATUS = ['', 'スピード', 'スタミナ', 'パワー', '根性', '賢さ']
      const check = this.trackDetail.courseSetStatus
      switch (check.length) {
        case 0:
          return '無'
        case 1:
          return STATUS[check[0]]
        case 2:
        default:
          return STATUS[check[0]] + '、' + STATUS[check[1]]
      }
    },
    production() {
      return process.env.NODE_ENV === 'production'
    }
  },
  methods: {
    locationChanged(location) {
      this.courseList = this.trackData[location].courses
      this.track.course = Object.keys(this.courseList)[0]
    },
    getEqualStamina(value) {
      return Math.floor(this.spMax * value / 10000.0 / 0.8 / this.styleSpCoef[this.umaStatus.style])
    },
    exec: function () {
      this.emulating = true
      this.emulations = []
      this.epoch = 0
      this.progressEpoch()
    },
    progressEpoch() {
      setTimeout(() => {
        this.start()
        this.epoch++
        if (this.epoch < this.maxEpoch) {
          this.progressEpoch()
        } else {
          this.emulating = false
        }
      }, 70)
    },
    start: function () {
      this.resetRace()
      this.initCondition()
      this.initTemptation()
      this.sp = this.spMax
      this.sectionTargetSpeedRandoms = this.initSectionTargetSpeedRandoms()
      this.startDelay = Math.random() * 0.1
      this.initializeSkills()
      this.triggerStartSkills()
      this.progressRace()
    },
    resetRace() {
      this.frameElapsed = 0
      this.sp = 0
      this.position = 0
      this.currentSpeed = 3
      this.passiveBonus = {
        speed: 0,
        stamina: 0,
        power: 0,
        guts: 0,
        wisdom: 0
      }
      this.operatingSkills = {
        speed: [],
        targetSpeed: [],
        acceleration: [],
        boost: []
      }
      delete this.frames
      this.frames = [{skills: []}]
      this.spurtParameters = null
      this.downSlopeModeStart = null
      this.temptationModeStart = null
      this.temptationModeEnd = null
      this.temptationWaste = 0
      this.modifiedCondition = -1
      this.temptationSection = -1
    },
    initCondition() {
      if (this.umaStatus.condition <= 4) {
        this.modifiedCondition = this.umaStatus.condition
      } else if (this.umaStatus.condition === 5) {
        // 5種ランダム
        this.modifiedCondition = Math.floor(Math.random() * 5)
      } else {
        // 3種ランダム
        this.modifiedCondition = Math.floor(Math.random() * 3)
      }
    },
    initTemptation() {
      if (Math.random() * 100 < Math.pow(6.5 / Math.log10(0.1 * this.modifiedWisdom + 1), 2)) {
        this.temptationSection = 1 + Math.floor(Math.random() * 8)
      } else {
        this.temptationSection = -1
      }
    },
    progressRace() {
      while (this.position < this.courseLength) {
        const startPosition = this.position
        const startSp = this.sp
        const startPhase = this.currentPhase
        this.frames[this.frameElapsed].speed = this.currentSpeed
        for (const skill of this.operatingSkills.speed) {
          this.frames[this.frameElapsed].speed += skill.data.value
        }
        this.frames[this.frameElapsed].sp = this.sp
        this.frames[this.frameElapsed].startPosition = startPosition

        // 下り坂モードに入るか・終わるかどうかの判定
        if (this.isInSlope('down')) {
          // 1秒置きなので、このフレームは整数秒を含むかどうかのチェック
          if (Math.floor(this.frameElapsed * this.frameLength) !==
              Math.floor((this.frameElapsed + 1) * this.frameLength)) {
            if (this.downSlopeModeStart == null) {
              if (Math.random() < this.modifiedWisdom * 0.0004) {
                this.downSlopeModeStart = this.frameElapsed
              }
            } else {
              if (Math.random() < 0.2) {
                this.downSlopeModeStart = null
              }
            }
          }
        } else {
          this.downSlopeModeStart = null
        }

        // 掛かり処理
        if (this.isInTemptation) {
          // 掛かり終了判定
          const temptationDuration = (this.frameElapsed - this.temptationModeStart) * this.frameLength
          const prevTemptationDuration = (this.frameElapsed - 1 - this.temptationModeStart) * this.frameLength
          for (let j = 3; j < 12; j += 3) {
            if (prevTemptationDuration < j && temptationDuration >= j) {
              if (Math.random() < 0.55) {
                this.temptationModeEnd = this.frameElapsed
              }
            }
          }
          if (temptationDuration >= 12) {
            this.temptationModeEnd = this.frameElapsed
          }
        }
        // 掛かり開始
        if (this.temptationSection > 0 && this.currentSection === this.temptationSection) {
          this.temptationModeStart = this.frameElapsed
          this.temptationSection = -1
        }

        this.move()
        this.frames[this.frameElapsed].movement = this.position - startPosition
        this.frames[this.frameElapsed].consume = this.sp - startSp
        this.frameElapsed++

        // 終盤入り・ラストスパート計算
        if (startPhase === 1 && this.currentPhase === 2) {
          this.spurtParameters = this.calcSpurtParameter()
        }

        if (this.position >= this.courseLength) {
          break
        }
        // Calculate target speed of next frame and do heal/fatigue
        const skillTriggered = this.checkSkillTrigger(startPosition)
        const spurting = this.spurtParameters != null &&
            this.position + this.spurtParameters.distance >= this.courseLength
        this.frames.push({
          skills: skillTriggered,
          spurting
        })

        // Remove overtime skills
        for (const type in this.operatingSkills) {
          for (let i = 0; i < this.operatingSkills[type].length; i++) {
            if ((this.frameElapsed - this.operatingSkills[type][i].startFrame) * this.frameLength
                > this.operatingSkills[type][i].data.duration * this.timeCoef) {
              this.operatingSkills[type].splice(i, 1)
              i-- // Without this line, the original next element will be skipped
              break
            }
          }
        }
      }
      this.goal()
    },
    move() {
      const diff = this.targetSpeed - this.currentSpeed
      const startSpeed = this.currentSpeed
      const changeRate = diff >= 0 ? this.acceleration : this.deceleration
      let changeTime = diff / changeRate
      if (changeTime > this.frameLength) {
        changeTime = this.frameLength
      }
      const staticTime = this.frameLength - changeTime
      const endSpeed = startSpeed + changeTime * changeRate

      // 減速スキル分
      let realStartSpeed = startSpeed
      let realEndSpeed = endSpeed
      for (const skill of this.operatingSkills.speed) {
        realStartSpeed += skill.data.value
        realEndSpeed += skill.data.value
      }

      // 移動距離及び耐力消耗を算出
      // 速度変化中の分
      const movementChanging = (realStartSpeed + realEndSpeed) * changeTime / 2.0
      const consumeChanging = this.consumePerSecondChanging(realStartSpeed, realEndSpeed,
          changeRate, this.currentPhase)
      // 速度変化終了後の分
      const movementStatic = realEndSpeed * staticTime
      const consumeStatic = this.consumePerSecond(realEndSpeed, this.currentPhase) * staticTime

      // 反映させる
      this.currentSpeed = endSpeed
      this.position += movementChanging + movementStatic
      let consume = (consumeChanging + consumeStatic) * (this.downSlopeModeStart != null ? 0.4 : 1)
      if (this.isInTemptation) {
        this.temptationWaste += consume * 0.6
        consume *= 1.6
      }
      this.sp -= consume
    },
    calcSpurtParameter() {
      const maxDistance = this.trackDetail.distance / 3.0
      const spurtDistance = this.calcSpurtDistance(this.maxSpurtSpeed)
      const totalConsume = this.calcRequiredSp(this.maxSpurtSpeed)
      if (spurtDistance >= maxDistance) {
        return {
          distance: maxDistance,
          speed: this.maxSpurtSpeed,
          spDiff: this.sp - totalConsume
        }
      }
      // SPが足りない場合の処理
      const candidates = []
      const totalConsumeV3 = this.calcRequiredSp(this.v3)
      const excessSp = this.sp - totalConsumeV3
      if (excessSp < 0) {
        return {
          distance: 0,
          speed: this.v3,
          spDiff: this.sp - totalConsume
        }
      }
      for (let v = this.maxSpurtSpeed - 0.1; v >= this.v3; v -= 0.1) {
        let distanceV = this.calcSpurtDistance(v)
        if (distanceV >= maxDistance) {
          distanceV = maxDistance
        }
        candidates.push({
          distance: distanceV,
          speed: v,
          time: distanceV / v + (maxDistance - distanceV) / this.v3,
          spDiff: this.sp - totalConsume
        })
      }
      candidates.sort((a, b) => {
        return a.time - b.time
      })
      for (const i in candidates) {
        candidates[i].order = parseInt(i) + 1
        const c = candidates[i]
        if (Math.random() * 100 < 15 + 0.05 * this.modifiedWisdom) {
          return c
        }
      }
      return candidates[candidates.length - 1]
    },
    calcSpurtDistance(v) {
      return (this.sp - (this.courseLength / 3.0 - 60) * 20 *
          this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
          this.spurtSpCoef * Math.pow(this.v3 - this.baseSpeed + 12, 2) / 144 / this.v3) / (
          20 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
          this.spurtSpCoef * (Math.pow(v - this.baseSpeed + 12, 2) / 144 / v -
          Math.pow(this.v3 - this.baseSpeed + 12, 2) /
          144 / this.v3)) + 60
    },
    calcRequiredSp(v) {
      return (this.courseLength / 3.0 - 60) * 20 *
          this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
          this.spurtSpCoef * Math.pow(this.v3 - this.baseSpeed + 12, 2) / 144 / this.v3 + (
              this.courseLength / 3.0 - 60) * (
              20 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
              this.spurtSpCoef * (Math.pow(v - this.baseSpeed + 12, 2) / 144 / v -
              Math.pow(this.v3 - this.baseSpeed + 12, 2) /
              144 / this.v3))
    },
    consumePerSecond(v, phase) {
      let ret = 20.0 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
          Math.pow(v - this.baseSpeed + 12, 2) / 144
      if (phase >= 2) {
        ret *= this.spurtSpCoef
      }
      return ret
    },
    consumePerSecondChanging(startSpeed, endSpeed, changeRate, phase) {
      let ret = 20.0 * this.spConsumptionCoef[this.trackDetail.surface][this.track.surfaceCondition] *
          (Math.pow(endSpeed - this.baseSpeed + 12, 3) - Math.pow(startSpeed - this.baseSpeed + 12, 3)) /
          (3 * changeRate) / 144
      if (phase >= 2) {
        ret *= this.spurtSpCoef
      }
      return ret
    },
    isInSlope(direction, position) {
      if (!position) {
        position = this.position
      }
      return (direction === 'up' && this.getSlope(position) > 1)
          || (direction === 'down' && this.getSlope(position) < -1)
    },
    goal() {
      const raceTime = this.frameElapsed * this.frameLength + this.startDelay

      if (this.epoch === this.maxEpoch - 1) {
        this.updateChart()
      }

      const emu = {
        raceTime,
        maxSpurt: this.spurtParameters.speed === this.maxSpurtSpeed,
        spDiff: this.spurtParameters.spDiff
      }
      this.emulations.push(emu)
    },
    toDisplayTime(time) {
      let ret = time * 1.18
      const min = this.trackDetail.finishTimeMin
      const max = this.trackDetail.finishTimeMax
      if (ret < min) {
        ret = min - 1 + 2 * Math.random()
      } else if (ret > max) {
        ret = max - 1 + 2 * Math.random()
      }
      return ret
    },
    formatTime(time, digit) {
      if (time === 0) {
        return '-'
      }
      const min = Math.floor(time / 60)
      let sec = Math.floor(time) % 60
      if (sec < 10) {
        sec = '0' + sec
      }
      let decimal = Math.floor((time - Math.floor(time)) * Math.pow(10, digit))
      for (let d = 1; d < digit; d++) {
        if (parseInt(decimal) < Math.pow(10, d)) {
          decimal = '0' + decimal
        }
      }
      return `${min}:${sec}.${decimal}`
    },
    calcAvg(scope) {
      let sum = 0
      let count = 0
      for (const e of this.emulations) {
        if (scope === 'max' && !e.maxSpurt) {
          continue
        } else if (scope === 'notMax' && e.maxSpurt) {
          continue
        }
        sum += e.raceTime
        count++
      }
      if (count === 0) {
        return 0
      }
      return sum / count
    },
    calcStdDev(scope) {
      const avg = this.calcAvg(scope)
      let sum = 0
      let count = 0
      for (const e of this.emulations) {
        if (scope === 'max' && !e.maxSpurt) {
          continue
        } else if (scope === 'notMax' && e.maxSpurt) {
          continue
        }
        sum += Math.pow(e.raceTime - avg, 2)
        count++
      }
      if (count === 0) {
        return 0
      }
      return Math.sqrt(sum / count)
    },
    pickEdge(scope, field, dir) {
      let ret = dir === 'best' ? 999999 : -1
      for (const e of this.emulations) {
        if (scope === 'max' && !e.maxSpurt) {
          continue
        } else if (scope === 'notMax' && e.maxSpurt) {
          continue
        }
        if ((dir === 'best' && e[field] < ret) || (dir === 'worst' && e[field] > ret)) {
          ret = e.raceTime
        }
      }
      if (ret === 999999 || ret < 0) {
        return 0
      }
      return ret
    },
    saveUma() {
      this.$prompt('ウマ名を入力して下さい', '', {
        inputValue: this.umaToLoad,
        confirmButtonText: 'セーブ',
        cancelButtonText: 'キャンセル',
        inputPattern: /.+/,
        inputErrorMessage: '名前を入力して下さい。'
      }).then(({value}) => {
        const umas = JSON.parse(localStorage.getItem('umas') || '{}')
        umas[value] = {
          status: this.umaStatus,
          track: this.track,
          hasSkills: this.hasSkills,
          selectedUnique: this.selectedUnique,
          uniqueLevel: this.uniqueLevel
        }
        localStorage.setItem('umas', JSON.stringify(umas))
        this.$message({
          type: 'success',
          message: `${value}をセーブしました。`
        })
        this.updateSavedUmas()
        this.umaToLoad = value
      })
    },
    loadUma() {
      const umas = JSON.parse(localStorage.getItem('umas') || '{}')
      const u = umas[this.umaToLoad]
      this.umaStatus = u.status
      this.locationChanged(u.track.location)
      this.track = u.track
      this.hasSkills = u.hasSkills
      if (u.selectedUnique) {
        this.selectedUnique = u.selectedUnique
        this.uniqueLevel = u.uniqueLevel
      }
      this.fixOldSavedUma()
      this.initCondition()
      this.$message({
        type: 'success',
        message: `${this.umaToLoad}をロードしました。`
      })
    },
    removeUma() {
      const umas = JSON.parse(localStorage.getItem('umas') || '{}')
      delete umas[this.umaToLoad]
      localStorage.setItem('umas', JSON.stringify(umas))
      this.$message({
        type: 'success',
        message: `${this.umaToLoad}を削除しました。`
      })
      this.updateSavedUmas()
    },
    resetUma() {
      this.resetStatus()
      this.resetTrack()
      this.resetHasSkills()
      this.umaToLoad = ''
    },
    resetStatus() {
      this.umaStatus = {
        speed: null,
        stamina: null,
        power: null,
        guts: null,
        wisdom: null,
        condition: '2',
        style: '1',
        distanceFit: 'A',
        surfaceFit: 'A',
        styleFit: 'A'
      }
    },
    resetTrack() {
      this.track = {
        location: '10008',
        course: '10811',
        surfaceCondition: '0'
      }
    },
    fixOldSavedUma() {
      const o = {...this.hasSkills}
      let old = false
      const NEW_TYPES = ['boost', 'gate', 'passive']
      for (const nt of NEW_TYPES) {
        if (!(nt in this.hasSkills)) {
          o[nt] = {normal: [], rare: [], inherit: []}
        }
        old = true
      }
      if (old) {
        this.hasSkills = o
      }
    },
    initSectionTargetSpeedRandoms() {
      const ret = []
      for (let i = 0; i < 24; i++) {
        const max = (this.modifiedWisdom / 5500.0) * Math.log10(this.modifiedWisdom * 0.1) * 0.01
        ret.push(Math.random() * max - 0.0065)
      }
      return ret
    },
    updateSavedUmas() {
      this.umaToLoad = null
      this.savedUmas = JSON.parse(localStorage.getItem('umas'))
    },
    updateChart() {
      const thiz = this
      const labels = []
      const dataSpeed = []
      const dataSp = []
      const annotations = []
      let skillYAdjust = 0
      const nextSkillYAdjust = function () {
        skillYAdjust += 25
        if (skillYAdjust > 50) {
          skillYAdjust = 0
        }
      }
      const PHASE_NAMES = ['←序盤|中盤→', '中盤←|終盤→', 'ﾗｽﾄｽﾊﾟｰﾄ→']
      const SKILL_COLORS = {
        heal: 'cyan',
        speed: 'darkred',
        targetSpeed: 'gold',
        acceleration: 'orange',
        boost: 'DarkOliveGreen',
        fatigue: 'darkred',
        gate: 'green',
        passive: 'green',
      }

      // スタート
      annotations.push({
        type: 'line',
        label: {
          content: this.startDelay >= 0.08 ? ' 出遅れ ' : 'スタート',
          position: 'bottom',
          enabled: true,
          xAdjust: -30
        },
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: 0,
        borderColor: 'yellow',
        borderWidth: 2,
        onClick: function () {
          thiz.$message(`スタートディレイ：${thiz.startDelay.toFixed(3)}秒`)
        }
      })

      // 掛かり区間
      if (this.temptationModeStart > 0) {
        annotations.push({
          type: 'box',
          xMin: this.temptationModeStart,
          xMax: this.temptationModeEnd,
          yMin: 0,
          yMax: 100,
          xScaleID: 'x-axis-0',
          onClick: function () {
            thiz.$message(`掛かり：${((thiz.temptationModeEnd - thiz.temptationModeStart) * thiz.frameLength)}秒、余分耐力消耗：${thiz.temptationWaste.toFixed(1)}`)
          }
        })
      }

      // const step = Math.floor(this.frames.length / 500)
      const step = 1
      for (let index = 0; index < this.frames.length; index += step) {
        const frame = this.frames[index]
        const label = this.formatTime(index * this.frameLength, 1)
        labels.push(label)
        dataSpeed.push(frame.speed)
        dataSp.push(frame.sp)
        // Skill annotations
        for (let mi = index; mi < index + step && mi < this.frames.length; mi++) {
          for (const skill of this.frames[mi].skills) {
            annotations.push({
              type: 'line',
              label: {
                content: skill.data.name,
                position: 'top',
                enabled: true,
                yAdjust: skillYAdjust
              },
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: label,
              borderColor: SKILL_COLORS[skill.data.type],
              borderWidth: 2,
              onClick: function () {
                if (skill.detail && 'waste' in skill.detail) {
                  if (skill.detail.waste > 0) {
                    thiz.$message(`耐力${(skill.detail.heal).toFixed(1)}回復(${(skill.detail.waste).toFixed(1)}が溢れた)`)
                  } else {
                    thiz.$message(`耐力${(skill.detail.heal).toFixed(1)}回復`)
                  }
                }
              }
            })
            nextSkillYAdjust(skillYAdjust)
          }
        }
        // Phase annotations
        if (index + step < this.frames.length) {
          const phase = this.getPhase(frame.startPosition)
          if (this.getPhase(this.frames[index + step].startPosition) > phase) {
            annotations.push({
              type: 'line',
              label: {
                content: PHASE_NAMES[phase],
                position: 'bottom',
                enabled: true
              },
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: label,
              borderColor: 'black',
              borderWidth: 2,
              onClick: function () {
              }
            })
          }
          if (this.getSection(this.frames[index + step].startPosition) === 10 &&
              this.getSection(frame.startPosition) === 9) {
            annotations.push({
              type: 'line',
              label: {
                content: 'ポジキープ終了',
                position: 'bottom',
                enabled: true
              },
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: label,
              borderColor: 'darkgreen',
              borderWidth: 2,
              onClick: function () {
              }
            })
          }
          const upSlope = this.isInSlope('up', this.frames[index + step].startPosition)
          if (upSlope && !this.isInSlope('up', frame.startPosition)) {
            annotations.push({
              type: 'line',
              label: {
                content: '上り坂',
                position: 'top',
                enabled: true,
                yAdjust: skillYAdjust
              },
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: label,
              borderColor: 'pink',
              borderWidth: 2
            })
            nextSkillYAdjust(skillYAdjust)
          }
          const downSlope = this.isInSlope('down', this.frames[index + step].startPosition)
          if (downSlope && !this.isInSlope('down', frame.startPosition)) {
            annotations.push({
              type: 'line',
              label: {
                content: '下り坂',
                position: 'top',
                enabled: true,
                yAdjust: skillYAdjust
              },
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: label,
              borderColor: 'silver',
              borderWidth: 2
            })
            nextSkillYAdjust(skillYAdjust)
          }
          if (!frame.spurting && this.frames[index + step].spurting) {
            annotations.push({
              type: 'line',
              label: {
                content: 'スパート開始',
                position: 'bottom',
                enabled: true,
                yAdjust: 30
              },
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: label,
              borderColor: 'red',
              borderWidth: 2,
              onClick: function () {
              }
            })
          }
        }
      }

      this.chartOptions = {
        annotation: {
          drawTime: 'afterDatasetsDraw',
          events: ['click'],
          annotations
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          yAxes: [{
            id: 'sp',
            type: 'linear',
            position: 'left',
            ticks: {
              min: 0
            }
          }, {
            id: 'speed',
            type: 'linear',
            position: 'right',
            ticks: {
              min: 15,
              max: 27
            }
          }]
        },
        maintainAspectRatio: false
      }
      this.chartData = {
        labels: labels,
        datasets: [{
          fill: false,
          label: '耐力',
          yAxisID: 'sp',
          borderColor: 'rgb(255, 132, 99)',
          data: dataSp
        }, {
          fill: false,
          label: '走行速度',
          yAxisID: 'speed',
          borderColor: 'rgb(30, 21, 155)',
          data: dataSpeed
        }]
      }
    },
    getPhase(position) {
      if (position < this.trackDetail.distance / 6.0) {
        return 0
      } else if (position < this.trackDetail.distance * 2.0 / 3) {
        return 1
      } else if (position < this.trackDetail.distance * 5.0 / 6) {
        return 2
      } else {
        return 3
      }
    },
    getSection(position) {
      return Math.floor(position * 24.0 / this.courseLength)
    },
    test() {
    }
  }
}
</script>

<style scoped>
.main-frame {
  text-align: left;
}

.input-status {
  width: 90px;
}

.emulation-result {
  text-align: center;
}

.emulation-result th {
  padding: 2px;
  min-width: 90px;
}

.emulation-result td {
  padding: 2px;
  min-width: 90px;
}

</style>