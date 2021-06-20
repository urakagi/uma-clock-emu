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
        <el-button @click="saveUma">{{ $t("message.saveUma") }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="umaToLoad" :placeholder="$t('message.umaToLoad')">
          <el-option v-for="(_, key) in savedUmas" :label="key" :value="key" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="loadUma">{{ $t("message.loadUma") }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
            :confirm-button-text="$t('message.yes')"
            :cancel-button-text="$t('message.no')"
            :title="$t('message.deleteOrNot')"
            trigger="click"
            @confirm="removeUma"
        >
          <el-button slot="reference">{{ $t("message.delete") }}</el-button>
        </el-popconfirm>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
            :confirm-button-text="$t('message.yes')"
            :cancel-button-text="$t('message.no')"
            :title="$t('message.resetOrNot')"
            trigger="click"
            @confirm="resetUma"
        >
          <el-button slot="reference">{{ $t("message.reset") }}</el-button>
        </el-popconfirm>
      </el-form-item>
      <el-form-item>
        <el-button @click="exportUma">{{ $t("message.exportUma") }}</el-button>
        <el-dropdown @command="importUma">
          <el-button>
            {{ $t("message.importUma") }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="tool">{{ $t("message.importUmaFromTool") }}</el-dropdown-item>
            <el-tooltip content="race_horse_data / trained_chara">
              <el-dropdown-item command="game">{{ $t("message.importUmaFromGame") }}</el-dropdown-item>
            </el-tooltip>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <br>
      <el-form-item :label="$t('message.speed')">
        <el-input v-model="umaStatus.speed" class="input-status"></el-input>
      </el-form-item>
      <el-form-item :label="$t('message.stamina')">
        <el-input v-model="umaStatus.stamina" class="input-status"></el-input>
      </el-form-item>
      <el-form-item :label="$t('message.power')">
        <el-input v-model="umaStatus.power" class="input-status"></el-input>
      </el-form-item>
      <el-form-item :label="$t('message.guts')">
        <el-input v-model="umaStatus.guts" class="input-status"></el-input>
      </el-form-item>
      <el-form-item :label="$t('message.wisdom')">
        <el-input v-model="umaStatus.wisdom" class="input-status"></el-input>
      </el-form-item>
      <br>
      <el-form-item :label="$t('message.style')">
        <el-select v-model="umaStatus.style" style="width: 100px;">
          <el-option label="逃げ" value="1"></el-option>
          <el-option label="先行" value="2"></el-option>
          <el-option label="差し" value="3"></el-option>
          <el-option label="追込" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.distanceFit')">
        <el-select v-model="umaStatus.distanceFit" style="width: 70px;">
          <el-option v-for="rank in fitRanks" :label="rank" :value="rank" :key="rank"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.surfaceFit')">
        <el-select v-model="umaStatus.surfaceFit" style="width: 70px;">
          <el-option v-for="rank in fitRanks" :label="rank" :value="rank" :key="rank"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.styleFit')">
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
          <el-option :label="$t('message.random')" value="5"></el-option>
          <el-option :label="$t('message.random') + '(3種)'" value="6"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item :label="$t('message.raceType')">
        <el-select v-model="raceType" style="width: 130px;">
          <el-option label="短距離" value="0"></el-option>
          <el-option label="マイル" value="1"></el-option>
          <el-option label="中距離" value="2"></el-option>
          <el-option label="長距離" value="3"></el-option>
          <el-option label="ダート" value="4"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item :label="$t('message.uniqueSkill')">
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
          {{ $t("message.emulateStart") }}
        </el-button>
      </el-form-item>
      <el-form-item :label="$t('message.testTime')">
        <el-input-number value="20" v-model="maxEpoch"></el-input-number>
      </el-form-item>
    </el-form>
    <el-divider/>
    <Adsense v-if="production"
             data-ad-client="ca-pub-4611969396217909"
             data-ad-slot="6969023753">
    </Adsense>
    <div>
      <h3>{{ $t("message.emulationResult") }}</h3>
      <table border="1" class="emulation-result">
        <tr>
          <th></th>
          <th>{{ $t("message.realTime") }}</th>
          <th>{{ $t("message.StandardDeviation") }}</th>
          <th>{{ $t("message.best") }}</th>
          <th>{{ $t("message.worst") }}</th>
          <th>{{ $t("message.timeInGame") }}</th>
          <th>{{ $t("message.best") }}</th>
          <th>{{ $t("message.worst") }}</th>
        </tr>
        <tr>
          <th>{{ $t("message.avg") }}</th>
          <td>{{ formatTime(avgRaceTime, 2) }}</td>
          <td>{{ timeStandardDeviation.toFixed(3) }}</td>
          <td>{{ formatTime(bestTime, 2) }}</td>
          <td>{{ formatTime(worstTime, 2) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTime), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(bestTime), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(worstTime), 1) }}</td>
        </tr>
        <tr>
          <th>{{ $t("message.MaxSpurt") }}</th>
          <td>{{ formatTime(avgRaceTimeMaxSpurt, 2) }}</td>
          <td>{{ timeStandardDeviationMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeMaxSpurt, 2) }}</td>
          <td>{{ formatTime(worstTimeMaxSpurt, 2) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTimeMaxSpurt), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(bestTimeMaxSpurt), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(worstTimeMaxSpurt), 1) }}</td>
        </tr>
        <tr>
          <th>{{ $t("message.NotMaxSpurt") }}</th>
          <td>{{ formatTime(avgRaceTimeNotMaxSpurt, 2) }}</td>
          <td>{{ timeStandardDeviationNotMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeNotMaxSpurt, 2) }}</td>
          <td>{{ formatTime(worstTimeNotMaxSpurt, 2) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTimeNotMaxSpurt), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(bestTimeNotMaxSpurt), 1) }}</td>
          <td>{{ formatTime(toDisplayTime(worstTimeNotMaxSpurt), 1) }}</td>
        </tr>
      </table>
      <h3>{{ $t("message.spurtAverage") }}</h3>
      <table border="1" class="emulation-result">
        <tr>
          <th>{{ $t("message.maxSpurtRate") }}</th>
          <th>{{ $t("message.maxSpurtSPLeft") }}</th>
          <th>{{ $t("message.nonMaxSpurtSPLack") }}</th>
        </tr>
        <tr>
          <td>{{ maxSpurtRate }}%</td>
          <td>{{ maxSpurtSPLeft }}</td>
          <td>{{ nonMaxSpurtSPLack }}</td>
        </tr>
      </table>
    </div>
    <el-divider/>
    <h3>{{ $t("message.latestRaceTime") }}({{ formatTime(latestRaceTime, 2) }}) -
      {{ this.trackData[this.track.location].name + this.trackDetail.name }}</h3>
    <race-graph :chart-data="chartData" :options="chartOptions"/>
    <el-divider/>
    <div>
      {{ $t("message.totalStatus") }}：{{ totalStatus }}／{{ $t("message.displayStatusCheck") }}：{{ displayStatusCheck }}
    </div>
    <div>
      補正後：{{ $t("message.speed") }}スピード{{ modifiedSpeed.toFixed(1) }} ／{{
        $t("message.stamina")
      }}{{ modifiedStamina.toFixed(1) }} ／{{ $t("message.power") }}パワー{{ modifiedPower.toFixed(1) }}
      ／{{ $t("message.guts") }}根性{{ modifiedGuts.toFixed(1) }} ／{{ $t("message.wisdom") }}賢さ{{
        modifiedWisdom.toFixed(1)
      }}
    </div>
    <div>
      初期耐力：{{ spMax.toFixed(1) }}／金回復≒{{ getEqualStamina(550) }}{{ $t("message.stamina") }}／白回復≒{{
        getEqualStamina(150)
      }}{{ $t("message.stamina") }}スタミナ／終盤耐力消耗係数：{{ spurtSpCoef.toFixed(3) }}
    </div>
    <div>
      {{ $t("message.skillActivateRate") }}：{{ skillActivateRate.toFixed(1) }}％／{{
        $t("message.temperamentRate")
      }}：{{ temperamentRate.toFixed(1) }}％
    </div>
    <div>
      {{ $t("message.v0") }}：{{ v0.toFixed(2) }}／{{ $t("message.a0") }}：{{ a0.toFixed(3) }}
    </div>
    <div>
      序盤目標速度：{{ v1.toFixed(2) }}／序盤加速度：{{ a1.toFixed(3) }} ｜
      中盤目標速度：{{ v2.toFixed(2) }}／中盤加速度：{{ a2.toFixed(3) }}
    </div>
    <div>
      終盤目標速度：{{ v3.toFixed(2) }}／終盤加速度：{{ a3.toFixed(3) }} ｜
      {{ $t("message.maxSpurtSpeed") }}：{{ maxSpurtSpeed.toFixed(2) }}
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
            <div v-html="release.content"></div>
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item>
    </el-collapse>
    <h3>注意事項</h3>
    <ol>
      <li>{{ $t("message.remark1") }}</li>
      <li>{{ $t("message.remark2") }}</li>
      <li>{{ $t("message.remark3") }}</li>
      <li>{{ $t("message.remark4") }}</li>
      <li>{{ $t("message.remark5") }}</li>
      <li>{{ $t("message.remark6") }}</li>
      <li>{{ $t("message.remark7") }}</li>
      <li>{{ $t("message.remark8") }}</li>
      <li><a href="https://twitter.com/urakagi">{{ $t("message.contact") }}</a></li>
    </ol>
    <el-dialog :visible.sync='emulating' style="text-align: center;">
      {{ $t("message.emulating") }}
      <el-progress :percentage="Math.min(100, Math.floor(100 * epoch / maxEpoch))"></el-progress>
      <p>
        <Adsense v-if="production"
                 data-ad-client="ca-pub-4611969396217909"
                 data-ad-slot="6969023753">
        </Adsense>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import MixinRaceCore from "@/components/data/MixinRaceCore";

export default {
  name: 'TeamRace',
  mixins: [MixinRaceCore],
  data() {
    return {
      emulatorType: 'team',
      raceType: '0'
    }
  },
  computed: {
    coursesByRaceType() {
      const ret = {0: [], 1: [], 2: [], 3: [], 4: []}
      for (const location in this.trackData) {
        const courses = this.trackData[location].courses
        for (const cid in courses) {
          const course = courses[cid]
          if (course.surface === 1) {
            // 唯一除外されているのは阪神3200m
            if (cid !== 10914) {
              ret[course.distanceType - 1].push({location, cid})
            }
          } else {
            if (course.distanceType === 2) {
              ret[4].push({location, cid})
            }
          }
        }
      }
      return ret
    },
    distanceType() {
      switch (this.raceType) {
        case '0':
          return 1
        case '1':
          return 2
        case '2':
          return 3
        case '3':
          return 4
        case '4':
        default:
          return 2
      }
    },
  },
  methods: {
    initCourse() {
      // コース
      const courses = this.coursesByRaceType[this.raceType]
      const c = courses[Math.floor(Math.random() * courses.length)]
      this.track.course = c.cid
      this.track.location = c.location

      // 馬場状態
      const SURFACE_RATES = [0.77, 0.87, 0.95, 1]
      const s = Math.random()
      for (let i = 0; i < SURFACE_RATES.length; i++) {
        if (s < SURFACE_RATES[i]) {
          this.track.surfaceCondition = i
          break
        }
      }
    }
  }
}
</script>
