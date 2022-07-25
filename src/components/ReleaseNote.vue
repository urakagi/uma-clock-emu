<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "ReleaseNote",
  data: function () {
    return {
      releaseNote: '',
      releases: [
        {
          content: '繁中版分離',
          timestamp: '2022-07-17'
        },
      ]
    }
  }
}
</script>
