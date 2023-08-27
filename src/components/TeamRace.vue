<template>
  <div class="main-frame">
    <p>
      <Adsense
        v-if="production"
        data-ad-client="ca-pub-4611969396217909"
        data-ad-slot="6969023753"
      >
      </Adsense>
    </p>
    <el-form class="input-form" :inline="true">
      <el-form-item>
        <el-button @click="saveUma">{{ $t("message.saveUma") }}</el-button>
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
            {{ $t("message.importUma")
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="tool">{{
              $t("message.importUmaFromTool")
            }}</el-dropdown-item>
            <el-tooltip content="race_horse_data / trained_chara">
              <el-dropdown-item command="game">{{
                $t("message.importUmaFromGame")
              }}</el-dropdown-item>
            </el-tooltip>
          </el-dropdown-menu>
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
      <el-form-item :label="$t('message.raceType')">
        <el-select v-model="raceType" style="width: 130px">
          <el-option :label="$t('raceType.0')" value="0"></el-option>
          <el-option :label="$t('raceType.1')" value="1"></el-option>
          <el-option :label="$t('raceType.2')" value="2"></el-option>
          <el-option :label="$t('raceType.3')" value="3"></el-option>
          <el-option :label="$t('raceType.4')" value="4"></el-option>
        </el-select>
      </el-form-item>
      <br />
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
        <el-input-number
          :max="6"
          :min="1"
          v-model="uniqueLevel"
        ></el-input-number>
      </el-form-item>
      <br />
      <el-collapse v-model="skillGroups">
        <el-collapse-item
          v-for="menu in skillMenu"
          :title="menu.title"
          :name="menu.type"
          :key="menu.title"
        >
          <div v-for="rarity in rarities" :key="menu.type + rarity">
            <h3 v-if="availableSkills[menu.type][rarity].length > 0">
              {{ $t(rarityString[rarity]) }}
            </h3>
            <el-checkbox-group v-model="hasSkills[menu.type][rarity]">
              <el-tooltip
                v-for="skill in availableSkills[menu.type][rarity]"
                :key="skill.name"
                :content="skill.tooltip"
                :disabled="!('tooltip' in skill)"
                :open-delay="500"
              >
                <el-checkbox-button :label="skill.index">
                  {{ skill.name }}
                </el-checkbox-button>
              </el-tooltip>
            </el-checkbox-group>
          </div>
        </el-collapse-item>
      </el-collapse>
      <br />
      <ExecuteBlock ref="executeBlock" :exec-function="this.exec" />
    </el-form>
    <el-divider />
    <Adsense
      v-if="production"
      data-ad-client="ca-pub-4611969396217909"
      data-ad-slot="6969023753"
    >
    </Adsense>
    <div>
      <h3>{{ $t("message.emulationResult") }}</h3>
      <table border="1" class="emulation-result">
        <tr>
          <th></th>
          <th>{{ $t("message.timeDelta") }}</th>
          <th>{{ $t("message.StandardDeviation") }}</th>
          <th>{{ $t("message.best") }}</th>
          <th>{{ $t("message.worst") }}</th>
          <th>{{ $t("message.realTime") }}</th>
          <th>{{ $t("message.best") }}</th>
          <th>{{ $t("message.worst") }}</th>
        </tr>
        <tr>
          <th>{{ $t("message.avg") }}</th>
          <td>{{ formatTime(avgRaceTimeDelta, 2) }}</td>
          <td>{{ timeDeltaStandardDeviation.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeDelta, 1) }}</td>
          <td>{{ formatTime(worstTimeDelta, 1) }}</td>
          <td>{{ formatTime(avgRaceTime, 2) }}</td>
          <td>{{ formatTime(bestTime, 2) }}</td>
          <td>{{ formatTime(worstTime, 2) }}</td>
        </tr>
        <tr>
          <th>{{ $t("message.MaxSpurt") }}</th>
          <td>{{ formatTime(avgRaceTimeDeltaMaxSpurt, 2) }}</td>
          <td>{{ timeDeltaStandardDeviationMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeDeltaMaxSpurt, 1) }}</td>
          <td>{{ formatTime(worstTimeDeltaMaxSpurt, 1) }}</td>
          <td>{{ formatTime(avgRaceTimeMaxSpurt, 2) }}</td>
          <td>{{ formatTime(bestTimeMaxSpurt, 2) }}</td>
          <td>{{ formatTime(worstTimeMaxSpurt, 2) }}</td>
        </tr>
        <tr>
          <th>{{ $t("message.NotMaxSpurt") }}</th>
          <td>{{ formatTime(avgRaceTimeDeltaNotMaxSpurt, 2) }}</td>
          <td>{{ timeDeltaStandardDeviationNotMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeDeltaNotMaxSpurt, 1) }}</td>
          <td>{{ formatTime(worstTimeDeltaNotMaxSpurt, 1) }}</td>
          <td>{{ formatTime(avgRaceTimeNotMaxSpurt, 2) }}</td>
          <td>{{ formatTime(bestTimeNotMaxSpurt, 2) }}</td>
          <td>{{ formatTime(worstTimeNotMaxSpurt, 2) }}</td>
        </tr>
      </table>
      <ul>
        <li>{{ $t("message.deltaHint") }}</li>
      </ul>
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
    <el-divider />
    <h3>
      {{ $t("message.latestRaceTime") }}({{ formatTime(latestRaceTime, 3) }}) -
      {{ this.locationName + this.trackDetail.name }}
    </h3>
    <chart-hint />
    <race-graph :chart-data="chartData" :options="chartOptions" />
    <el-divider />
    <calculated-values />
    <el-divider />
    <release-note />
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
      <li>
        <a href="https://youtube.com/urakagi">{{ $t("message.contact") }}</a>
      </li>
    </ol>
  </div>
</template>

<script>
import MixinRaceCore from "@/components/MixinRaceCore";
import ReleaseNote from "@/components/ReleaseNote";
import CalculatedValues from "@/components/CalculatedValues";
import ChartHint from "./ChartHint";
import { DISTANCE, SURFACE } from "./data/constants";
import ExecuteBlock from "./ExecuteBlock";

export default {
  name: "TeamRace",
  components: { ExecuteBlock, CalculatedValues, ReleaseNote, ChartHint },
  mixins: [MixinRaceCore],
  data() {
    return {
      emulatorType: "team",
      raceType: "0",
    };
  },
  computed: {
    coursesByRaceType() {
      const ret = { 0: [], 1: [], 2: [], 3: [], 4: [] };
      for (const location in this.trackData) {
        const courses = this.trackData[location].courses;
        for (const cid in courses) {
          const course = courses[cid];
          if (course.surface === 1) {
            // 唯一除外されているのは阪神3200m
            if (cid !== 10914) {
              ret[course.distanceType - 1].push({ location, cid });
            }
          } else {
            if (course.distanceType === 2) {
              ret[4].push({ location, cid });
            }
          }
        }
      }
      return ret;
    },
    distanceType() {
      switch (this.raceType) {
        case "0":
          return DISTANCE.SHORT;
        case "1":
          return DISTANCE.MILE;
        case "2":
          return DISTANCE.MIDDLE;
        case "3":
          return DISTANCE.LONG;
        case "4":
        default:
          return DISTANCE.MILE;
      }
    },
    surfaceType() {
      switch (this.raceType) {
        case "4":
          return SURFACE.DIRT;
        default:
          return SURFACE.TURF;
      }
    },
    avgRaceTimeDelta() {
      return this.calcAvg("all", "raceTimeDelta");
    },
    avgRaceTimeDeltaMaxSpurt() {
      return this.calcAvg("max", "raceTimeDelta");
    },
    avgRaceTimeDeltaNotMaxSpurt() {
      return this.calcAvg("notMax", "raceTimeDelta");
    },
    bestTimeDelta() {
      return this.pickEdge("all", "raceTimeDelta", "best");
    },
    worstTimeDelta() {
      return this.pickEdge("all", "raceTimeDelta", "worst");
    },
    bestTimeDeltaMaxSpurt() {
      return this.pickEdge("max", "raceTimeDelta", "best");
    },
    worstTimeDeltaMaxSpurt() {
      return this.pickEdge("max", "raceTimeDelta", "worst");
    },
    bestTimeDeltaNotMaxSpurt() {
      return this.pickEdge("notMax", "raceTimeDelta", "best");
    },
    worstTimeDeltaNotMaxSpurt() {
      return this.pickEdge("notMax", "raceTimeDelta", "worst");
    },
    timeDeltaStandardDeviationMaxSpurt() {
      return this.calcStdDev("max", "raceTimeDelta");
    },
    timeDeltaStandardDeviation() {
      return this.calcStdDev("all", "raceTimeDelta");
    },
    timeDeltaStandardDeviationNotMaxSpurt() {
      return this.calcStdDev("notMax", "raceTimeDelta");
    },
  },
  methods: {
    initCourse() {
      // コース
      const courses = this.coursesByRaceType[this.raceType];
      const c = courses[Math.floor(Math.random() * courses.length)];
      this.track.course = c.cid;
      this.track.location = c.location;

      // 馬場状態
      const SURFACE_RATES = [0.77, 0.87, 0.95, 1];
      const s = Math.random();
      for (let i = 1; i <= SURFACE_RATES.length; i++) {
        if (s < SURFACE_RATES[i]) {
          this.track.surfaceCondition = i;
          break;
        }
      }
    },
  },
};
</script>
