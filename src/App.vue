<template>
  <div id="app">
    <el-menu :default-active="defaultActive" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0">チーム競技場</el-menu-item>
      <el-menu-item index="1">チャンピオンズミーティング</el-menu-item>
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
          '/team-race',
          '/champions-meeting'
      ]
    }
  },
  computed: {
    defaultActive() {
      const p = this.$router.currentRoute.path.split('/')
      const path = '/' + p[p.length - 1]
      for (const i in this.navLink) {
        if (path === this.navLink[i]) {
          return i
        }
      }
      return 0
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

