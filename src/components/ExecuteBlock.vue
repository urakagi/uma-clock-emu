<template>
  <div>
    <el-form-item>
      <el-button @click="executeIndicated" type="success">
        {{ $t("message.emulateStart") }}
      </el-button>
    </el-form-item>
    <el-form-item :label="$t('message.testTime')">
      <el-input-number value="20" v-model="indicatedMaxEpoch"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button @click="executeOnce" type="info">
        {{ $t("message.emulateOnce") }}
      </el-button>
    </el-form-item>

    <el-form-item :label="$t('message.skillActivateAdjustment')">
      <el-select v-model="skillActivateAdjustment" style="width: 130px;">
        <el-option :label="$t('message.skillActivateAdjustment0')" value="0"></el-option>
        <el-option :label="$t('message.skillActivateAdjustment1')" value="1"></el-option>
      </el-select>
    </el-form-item>

    <el-dialog :visible.sync='emulating' style="text-align: center;">
      {{ $t("message.emulating") }}
      <el-progress :percentage="Math.min(100, Math.floor(100 * epoch / runMaxEpoch))"></el-progress>
      <p>
        <Adsense v-if="$parent.production"
                 data-ad-client="ca-pub-4611969396217909"
                 data-ad-slot="6969023753">
        </Adsense>
      </p>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "ExecuteBlock",
  props: ['execFunction'],
  data() {
    return {
      epoch: 0,
      indicatedMaxEpoch: 50,
      runMaxEpoch: 50,
      emulating: false,
      skillActivateAdjustment: '0'
    }
  },
  created() {
    this.indicatedMaxEpoch = localStorage.getItem('maxEpoch')
    if (!this.indicatedMaxEpoch) {
      this.indicatedMaxEpoch = 50
    }
  },
  watch: {
    indicatedMaxEpoch(value) {
      localStorage.setItem('maxEpoch', value)
    }
  },
  methods: {
    executeIndicated() {
      this.runMaxEpoch = this.indicatedMaxEpoch
      this.execute()
    },
    executeOnce() {
      this.runMaxEpoch = 1
      this.execute()
    },
    execute() {
      this.emulating = true
      this.epoch = 0
      this.execFunction(this.runMaxEpoch)
    }
  }
}
</script>

<style scoped>

</style>
