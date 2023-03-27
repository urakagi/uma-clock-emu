<template>
  <div class="main-frame">
    <p>
      <google-adsense
        v-if="production"
        data-ad-client="ca-pub-4611969396217909"
        data-ad-slot="6969023753"
      >
      </google-adsense>
    </p>
    <el-form class="input-form" :inline="true">
      <el-form-item>
        <el-button @click="saveUma">{{ $t('message.saveUma') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="umaToLoad" :placeholder="$t('message.umaToLoad')">
          <el-option
            v-for="(_, key) in savedUmas"
            :label="key"
            :value="key"
            :key="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="loadUma">{{ $t('message.loadUma') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
          :confirm-button-text="$t('message.yes')"
          :cancel-button-text="$t('message.no')"
          :title="$t('message.deleteOrNot')"
          trigger="click"
          @confirm="removeUma"
        >
          <template v-slot:reference>
            <el-button>{{ $t('message.delete') }}</el-button>
          </template>
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
          <template v-slot:reference>
            <el-button>{{ $t('message.reset') }}</el-button>
          </template>
        </el-popconfirm>
      </el-form-item>
      <el-form-item>
        <el-button @click="exportUma">{{ $t('message.exportUma') }}</el-button>
        <el-dropdown @command="importUma">
          <el-button>
            {{ $t('message.importUma')
            }}<el-icon class="el-icon--right"><el-icon-arrow-down /></el-icon>
          </el-button>
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="tool">{{
                $t('message.importUmaFromTool')
              }}</el-dropdown-item>
              <el-tooltip content="race_horse_data / trained_chara">
                <el-dropdown-item command="game">{{
                  $t('message.importUmaFromGame')
                }}</el-dropdown-item>
              </el-tooltip>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-form-item>
      <br />
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
      <br />
      <el-form-item :label="$t('message.style')">
        <el-select v-model="umaStatus.style" style="width: 100px">
          <el-option :label="$t('message.runningStyle1')" value="1"></el-option>
          <el-option :label="$t('message.runningStyle2')" value="2"></el-option>
          <el-option :label="$t('message.runningStyle3')" value="3"></el-option>
          <el-option :label="$t('message.runningStyle4')" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.distanceFit')">
        <el-select v-model="umaStatus.distanceFit" style="width: 70px">
          <el-option
            v-for="rank in fitRanks"
            :label="rank"
            :value="rank"
            :key="rank"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.surfaceFit')">
        <el-select v-model="umaStatus.surfaceFit" style="width: 70px">
          <el-option
            v-for="rank in fitRanks"
            :label="rank"
            :value="rank"
            :key="rank"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.styleFit')">
        <el-select v-model="umaStatus.styleFit" style="width: 70px">
          <el-option
            v-for="rank in fitRanks"
            :label="rank"
            :value="rank"
            :key="rank"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.mood')">
        <el-select
          v-model="umaStatus.condition"
          @change="initCondition"
          style="width: 130px"
        >
          <el-option :label="$t('message.mood0')" value="0"></el-option>
          <el-option :label="$t('message.mood1')" value="1"></el-option>
          <el-option :label="$t('message.mood2')" value="2"></el-option>
          <el-option :label="$t('message.mood3')" value="3"></el-option>
          <el-option :label="$t('message.mood4')" value="4"></el-option>
          <el-option :label="$t('message.random')" value="5"></el-option>
        </el-select>
      </el-form-item>
      <br />
      <slot name="course" />
      <br />
      <el-form-item :label="$t('message.uniqueSkill')">
        <el-select v-model="selectedUnique">
          <el-option
            v-for="skill in this.uniqueSkillData"
            :label="skill.name"
            :value="skill.id"
            :key="skill.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Lv">
        <el-input-number
          :max="6"
          :min="0"
          v-model="uniqueLevel"
        ></el-input-number>
        &emsp;{{ $t('message.uniqueLv0Hint') }}
      </el-form-item>
      <br />
      <el-form-item :label="$t('message.evoSkill')">
        <div v-if="availableSkills.evo.length === 0">
          {{ $t('message.evoHint') }}
        </div>
        <el-checkbox-group v-model="hasEvoSkills">
          <el-tooltip
            v-for="skill in availableSkills.evo"
            :key="skill.name"
            :content="skill.tooltip"
            :disabled="!('tooltip' in skill)"
          >
            <el-checkbox-button :label="skill.id">
              {{ skill.name }}
            </el-checkbox-button>
          </el-tooltip>
        </el-checkbox-group>
      </el-form-item>
      <br />
      <el-collapse v-model="skillGroups">
        <el-collapse-item
          v-for="menu in skillMenu"
          :title="menu.title"
          :name="menu.type"
          :key="menu.title"
        >
          <div v-for="rarity in raritySections" :key="menu.type + rarity">
            <el-collapse
              v-if="
                rarity === 'inherit' &&
                ['speed', 'composite'].includes(menu.type)
              "
            >
              <el-collapse-item
                :title="menu.title + '：' + $t(rarityString[rarity])"
              >
                <el-checkbox-group v-model="hasSkills[menu.type][rarity]">
                  <el-tooltip
                    v-for="skill in availableSkills[menu.type][rarity]"
                    :key="skill.name"
                    :content="skill.tooltip"
                    :disabled="!('tooltip' in skill)"
                  >
                    <el-checkbox-button :label="skill.id">
                      {{ skill.name }}
                    </el-checkbox-button>
                  </el-tooltip>
                </el-checkbox-group>
              </el-collapse-item>
            </el-collapse>

            <div
              v-if="
                rarity !== 'inherit' ||
                !['speed', 'composite'].includes(menu.type)
              "
            >
              <h3 v-if="availableSkills[menu.type][rarity].length > 0">
                {{ $t(rarityString[rarity]) }}
              </h3>
              <el-checkbox-group v-model="hasSkills[menu.type][rarity]">
                <el-tooltip
                  v-for="skill in availableSkills[menu.type][rarity]"
                  :key="skill.name"
                  :content="skill.tooltip"
                  :disabled="!('tooltip' in skill)"
                >
                  <el-checkbox-button :label="skill.id">
                    {{ skill.name }}
                  </el-checkbox-button>
                </el-tooltip>
              </el-checkbox-group>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <br />
      <ExecuteBlock ref="executeBlock" :exec-function="this.exec" />
    </el-form>
    <el-divider />
    <google-adsense
      v-if="production"
      data-ad-client="ca-pub-4611969396217909"
      data-ad-slot="6969023753"
    >
    </google-adsense>
    <div>
      <h3>{{ $t('message.emulationResult') }}</h3>
      <slot name="emulationResult" />
      <h3>{{ $t('message.spurtAverage') }}</h3>
      <table border="1" class="emulation-result">
        <tr>
          <th>{{ $t('message.maxSpurtRate') }}</th>
          <th>{{ $t('message.maxSpurtSPLeft') }}</th>
          <th>{{ $t('message.nonMaxSpurtSPLack') }}</th>
        </tr>
        <tr>
          <td>{{ maxSpurtRate }}%</td>
          <td>{{ maxSpurtSPLeft }}</td>
          <td>{{ nonMaxSpurtSPLack }}</td>
        </tr>
      </table>
    </div>
    <el-divider />
    <h3>
      {{ $t('message.latestRaceTime') }}({{ formatTime(latestRaceTime, 2) }})
    </h3>
    <chart-hint />
    <race-graph :chartDataProp="chartData" :chartOptionsProp="chartOptions" />
    <course-info :track="this.track" />
    <el-divider />
    <calculated-values />
    <el-divider />
    <release-note />
    <h3>注意事項</h3>
    <ol>
      <li>{{ $t('message.remark1') }}</li>
      <li>{{ $t('message.remark2') }}</li>
      <li>{{ $t('message.remark3') }}</li>
      <li>{{ $t('message.remark4') }}</li>
      <li>{{ $t('message.remark5') }}</li>
      <li>{{ $t('message.remark6') }}</li>
      <li>{{ $t('message.remark7') }}</li>
      <li>{{ $t('message.remark8') }}</li>
      <li>
        <a href="https://twitter.com/urakagi">{{ $t('message.contact') }}</a>
      </li>
    </ol>
  </div>
</template>

<script>
import { ArrowDown as ElIconArrowDown } from '@element-plus/icons-vue'
import MixinRaceCore from '@/components/MixinRaceCore'
import CourseInfo from '@/components/CourseInfo'
import ReleaseNote from '@/components/ReleaseNote'
import CalculatedValues from '@/components/CalculatedValues'
import ChartHint from './ChartHint'
import ExecuteBlock from './ExecuteBlock'
import GoogleAdsense from "./GoogleAdsense";
import MixinVuexStore from "./MixinVuexStore.vue";

export default {
  name: 'MainContainer',
  props: ['emulatorType'],
  components: {
    ExecuteBlock,
    ChartHint,
    CalculatedValues,
    ReleaseNote,
    CourseInfo,
    ElIconArrowDown,
    GoogleAdsense,
  },
  mixins: [MixinRaceCore, MixinVuexStore],
  computed: {
    distanceType() {
      return this.trackDetail.distanceType
    },
    surfaceType() {
      return this.trackDetail.surface
    },
    maxSpurtRate() {
      if (this.emulations.length === 0) {
        return '-'
      }
      let maxSpurt = 0
      for (const e of this.emulations) {
        if (e.maxSpurt) maxSpurt++
      }
      return ((100.0 * maxSpurt) / this.emulations.length).toFixed(1)
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
  },
}
</script>

<style>
.input-status {
  width: 70px;
}

.emulation-result {
  text-align: center;
}

.el-form-item {
  margin-left: 5px !important;
  margin-right: 5px !important;
}
</style>
