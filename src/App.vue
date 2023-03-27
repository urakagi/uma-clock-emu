<template>
  <div id="app">
    <el-menu
      :default-active="defaultActive"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="0">{{ $t('emulatorType.teamRace') }}</el-menu-item>
      <el-menu-item index="1">{{ $t('emulatorType.champMeet') }}</el-menu-item>
    </el-menu>
    <router-view></router-view>

    <div style="text-align: left">
      <el-dropdown split-button @command="handleCommand">
        語言
        <template v-slot:dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="ja">日本語</el-dropdown-item>
            <el-dropdown-item command="zhTW">繁體中文</el-dropdown-item>
            <el-dropdown-item command="ko">한국어</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      navLink: ['/team-race', '/champions-meeting'],
    }
  },
  computed: {
    defaultActive() {
      const p = this.$route.path.split('/')
      const path = '/' + p[p.length - 1]
      for (const i in this.navLink) {
        if (path === this.navLink[i]) {
          return i
        }
      }
      return '0';
    },
  },
  mounted() {},
  methods: {
    handleSelect(key) {
      const link = this.navLink[key]
      if (link !== this.$router.currentRoute.path) {
        this.$router.push(link)
      }
    },
    handleCommand(command) {
      this.$i18n.locale = command
      localStorage.setItem('lang', command)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
