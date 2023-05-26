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
          <el-option :label="$t('message.runningStyle1')" value="1"></el-option>
          <el-option :label="$t('message.runningStyle2')" value="2"></el-option>
          <el-option :label="$t('message.runningStyle3')" value="3"></el-option>
          <el-option :label="$t('message.runningStyle4')" value="4"></el-option>
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
      <el-form-item :label="$t('message.mood')">
        <el-select v-model="umaStatus.condition" @change="initCondition" style="width: 130px;">
          <el-option :label="$t('message.mood0')" value="0"></el-option>
          <el-option :label="$t('message.mood1')" value="1"></el-option>
          <el-option :label="$t('message.mood2')" value="2"></el-option>
          <el-option :label="$t('message.mood3')" value="3"></el-option>
          <el-option :label="$t('message.mood4')" value="4"></el-option>
          <el-option :label="$t('message.random')" value="5"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item :label="$t('message.course')">
        <el-select v-model="track.location" @change="locationChanged" style="width: 120px;">
          <el-option
              v-for="(_, trackId) in this.trackData"
              :label="$t(`course.${trackId}`)"
              :value="trackId"
              :key="trackId"
          ></el-option>
        </el-select>
        <el-select v-model="track.course" @change="courseChanged" style="width: 170px;">
          <el-option
              v-for="(obj, key) in courseList"
              :label="`${$t('surface.' + obj.surface)}${obj.distance}m`"
              :value="key"
              :key="key"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.surfaceCondition')">
        <el-select v-model="track.surfaceCondition" style="width: 90px;">
          <el-option :label="$t('message.surfaceCondition1')" value="1"></el-option>
          <el-option :label="$t('message.surfaceCondition2')" value="2"></el-option>
          <el-option :label="$t('message.surfaceCondition3')" value="3"></el-option>
          <el-option :label="$t('message.surfaceCondition4')" value="4"></el-option>
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
            <h3 v-if="availableSkills[menu.type][rarity].length > 0">{{ $t(rarityString[rarity]) }}</h3>
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
      <ExecuteBlock ref="executeBlock" :exec-function="this.exec"/>
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
        </tr>
        <tr>
          <th>{{ $t("message.avg") }}</th>
          <td>{{ formatTime(avgRaceTime, 3) }}</td>
          <td>{{ timeStandardDeviation.toFixed(3) }}</td>
          <td>{{ formatTime(bestTime, 3) }}</td>
          <td>{{ formatTime(worstTime, 3) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTime), 1) }}</td>
        </tr>
        <tr>
          <th>{{ $t("message.MaxSpurt") }}</th>
          <td>{{ formatTime(avgRaceTimeMaxSpurt, 3) }}</td>
          <td>{{ timeStandardDeviationMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeMaxSpurt, 3) }}</td>
          <td>{{ formatTime(worstTimeMaxSpurt, 3) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTimeMaxSpurt), 1) }}</td>
        </tr>
        <tr>
          <th>{{ $t("message.NotMaxSpurt") }}</th>
          <td>{{ formatTime(avgRaceTimeNotMaxSpurt, 3) }}</td>
          <td>{{ timeStandardDeviationNotMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeNotMaxSpurt, 3) }}</td>
          <td>{{ formatTime(worstTimeNotMaxSpurt, 3) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTimeNotMaxSpurt), 1) }}</td>
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
    <h3>{{ $t("message.latestRaceTime") }}({{ formatTime(latestRaceTime, 2) }})</h3>
    <chart-hint/>
    <race-graph :chart-data="chartData" :options="chartOptions"/>
    <course-info :track="this.track"/>
    <el-divider/>
    <calculated-values/>
    <el-divider/>
    <release-note/>
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
  </div>
</template>

<script>

import MixinRaceCore from "@/components/MixinRaceCore";
import CourseInfo from "@/components/CourseInfo";
import ReleaseNote from "@/components/ReleaseNote";
import CalculatedValues from "@/components/CalculatedValues";
import ChartHint from "./ChartHint";
import ExecuteBlock from "./ExecuteBlock";

export default {
  name: 'ChampMeet',
  components: {ExecuteBlock, ChartHint, CalculatedValues, ReleaseNote, CourseInfo},
  mixins: [MixinRaceCore],
  data() {
    return {
      emulatorType: 'cm'
    }
  },
  computed: {
    distanceType() {
      return this.trackDetail.distanceType
    },
    surfaceType() {
      return this.trackDetail.surface
    }
  },
  mounted() {
    const sc = localStorage.getItem('selectedCourse')
    if (sc) {
      const j = JSON.parse(sc)
      this.track.location = j.location
      this.locationChanged(this.track.location)
      this.track.course = j.course
    } else {
      this.track.location = Object.keys(this.trackData)[0]
      this.locationChanged(this.track.location)
      this.track.course = Object.keys(this.courseList)[0]
    }
  }
}
</script>
