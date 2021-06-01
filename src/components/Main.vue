<template>
  <div class="main-frame">
    <el-form :model="umaStatus" class="uma-status" :inline="true">
      <el-form-item label="スピード">
        <el-input-number v-model="umaStatus.speed"></el-input-number>
      </el-form-item>
      <el-form-item label="スタミナ">
        <el-input-number v-model="umaStatus.stamina" size="4"></el-input-number>
      </el-form-item>
      <el-form-item label="パワー">
        <el-input-number v-model="umaStatus.power" size="4"></el-input-number>
      </el-form-item>
      <el-form-item label="根性">
        <el-input-number v-model="umaStatus.guts" size="4"></el-input-number>
      </el-form-item>
      <el-form-item label="賢さ">
        <el-input-number v-model="umaStatus.wisdom" size="4"></el-input-number>
      </el-form-item>
    </el-form>
    <el-form :model="umaStatus" class="uma-status" :inline="true">
      <el-form-item label="脚質">
        <el-select v-model="umaStatus.style" style="width: 100px;">
          <el-option label="逃げ" value="0"></el-option>
          <el-option label="先行" value="1"></el-option>
          <el-option label="差し" value="2"></el-option>
          <el-option label="追込" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="距離適性">
        <el-select v-model="umaStatus.distanceFit" style="width: 70px;">
          <el-option label="S" value="S"></el-option>
          <el-option label="A" value="A"></el-option>
          <el-option label="B" value="B"></el-option>
          <el-option label="C" value="C"></el-option>
          <el-option label="D" value="D"></el-option>
          <el-option label="E" value="E"></el-option>
          <el-option label="F" value="F"></el-option>
          <el-option label="G" value="G"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="バ場適性">
        <el-select v-model="umaStatus.fieldFit" style="width: 70px;">
          <el-option label="S" value="S"></el-option>
          <el-option label="A" value="A"></el-option>
          <el-option label="B" value="B"></el-option>
          <el-option label="C" value="C"></el-option>
          <el-option label="D" value="D"></el-option>
          <el-option label="E" value="E"></el-option>
          <el-option label="F" value="F"></el-option>
          <el-option label="G" value="G"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="脚質適性">
        <el-select v-model="umaStatus.styleFit" style="width: 70px;">
          <el-option label="S" value="S"></el-option>
          <el-option label="A" value="A"></el-option>
          <el-option label="B" value="B"></el-option>
          <el-option label="C" value="C"></el-option>
          <el-option label="D" value="D"></el-option>
          <el-option label="E" value="E"></el-option>
          <el-option label="F" value="F"></el-option>
          <el-option label="G" value="G"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="コース">
        <el-select v-model="track.location" @change="locationChanged">
          <el-option label="京都" value="kyoto"></el-option>
        </el-select>
        <el-select v-model="track.course">
          <el-option
              v-for="(obj, key) in courseList"
              :label="obj.name"
              :value="key"
              :key="key"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MixinCourseData from "@/components/data/MixinCourseData";

export default {
  name: "Main",
  mixins: [MixinCourseData],
  data() {
    return {
      umaStatus: {
        speed: 1000,
        stamina: 1000,
        power: 600,
        guts: 400,
        wisdom: 400,
        style: '0',
        distanceFit: 'A',
        fieldFit: 'A',
        styleFit: 'A'
      },
      track: {
        location: '',
        course: ''
      },
      courseList: {}
    }
  },
  mounted() {
    this.track.location = Object.keys(this.trackData)[0]
    this.locationChanged(this.track.location)
  },
  methods: {
    locationChanged(location) {
      this.courseList = this.trackData[location]
      this.track.course = this.courseList[Object.keys(this.courseList)[0]]
    },
    test: function () {
      console.log(this.umaStatus.style)
    }
  }
}
</script>

<style scoped>

</style>