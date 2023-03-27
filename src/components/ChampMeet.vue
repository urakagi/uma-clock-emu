<template>
  <main-container emulatorType="cm">
    <template v-slot:course>
      <el-form-item :label="$t('message.course')">
        <el-select
          v-model="track.location"
          @change="locationChanged"
          style="width: 120px"
        >
          <el-option
            v-for="(raceTrack, trackId) in this.trackData"
            :label="raceTrack.name"
            :value="trackId"
            :key="trackId"
          ></el-option>
        </el-select>
        <el-select
          v-model="track.course"
          @change="courseChanged"
          style="width: 170px"
        >
          <el-option
            v-for="(obj, key) in courseList"
            :label="obj.name"
            :value="key"
            :key="key"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.surfaceCondition')">
        <el-select v-model="track.surfaceCondition" style="width: 90px">
          <el-option
            :label="$t('message.surfaceCondition1')"
            value="1"
          ></el-option>
          <el-option
            :label="$t('message.surfaceCondition2')"
            value="2"
          ></el-option>
          <el-option
            :label="$t('message.surfaceCondition3')"
            value="3"
          ></el-option>
          <el-option
            :label="$t('message.surfaceCondition4')"
            value="4"
          ></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:emulationResult>
      <table border="1" class="emulation-result">
        <tr>
          <th></th>
          <th>{{ $t('message.realTime') }}</th>
          <th>{{ $t('message.StandardDeviation') }}</th>
          <th>{{ $t('message.best') }}</th>
          <th>{{ $t('message.worst') }}</th>
          <th>{{ $t('message.timeInGame') }}</th>
        </tr>
        <tr>
          <th>{{ $t('message.avg') }}</th>
          <td>{{ formatTime(this.calcAvg('all', 'raceTime'), 3) }}</td>
          <td>{{ timeStandardDeviation.toFixed(3) }}</td>
          <td>{{ formatTime(bestTime, 3) }}</td>
          <td>{{ formatTime(worstTime, 3) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTime), 1) }}</td>
        </tr>
        <tr>
          <th>{{ $t('message.MaxSpurt') }}</th>
          <td>{{ formatTime(avgRaceTimeMaxSpurt, 3) }}</td>
          <td>{{ timeStandardDeviationMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeMaxSpurt, 3) }}</td>
          <td>{{ formatTime(worstTimeMaxSpurt, 3) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTimeMaxSpurt), 1) }}</td>
        </tr>
        <tr>
          <th>{{ $t('message.NotMaxSpurt') }}</th>
          <td>{{ formatTime(avgRaceTimeNotMaxSpurt, 3) }}</td>
          <td>{{ timeStandardDeviationNotMaxSpurt.toFixed(3) }}</td>
          <td>{{ formatTime(bestTimeNotMaxSpurt, 3) }}</td>
          <td>{{ formatTime(worstTimeNotMaxSpurt, 3) }}</td>
          <td>{{ formatTime(toDisplayTime(avgRaceTimeNotMaxSpurt), 1) }}</td>
        </tr>
      </table>
    </template>
  </main-container>
</template>

<script>
import MixinRaceCore from '@/components/MixinRaceCore'
import MixinEmulationResult from '@/components/MixinEmulationResult'
import MainContainer from './MainContainer'

export default {
  name: 'ChampMeet',
  components: { MainContainer },
  mixins: [MixinRaceCore, MixinEmulationResult],
  data() {
    return {
      emulatorType: 'cm',
    }
  },
}
</script>
