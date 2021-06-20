<template>
  <div id="app">
    <el-menu default-active="1" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">競技場エミュレーター</el-menu-item>
      <el-menu-item index="2">チャンピオンズミーティングエミュ</el-menu-item>
    </el-menu>
    <router-view></router-view>
<!--    <LangDropdown />-->
  </div>
</template>

<script>

// import LangDropdown from "@/components/LangDropdown";

export default {
  name: 'App',
  data() {
    return {
      navLink: [
          null,
          '/colosseum',
          '/champions-meeting'
      ]
    }
  },
  mounted() {
  },
  methods: {
    handleSelect(key) {
      const link = this.navLink[key]
      if (link !== this.$router.currentRoute.path) {
        this.$router.push(link)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

