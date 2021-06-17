<template>
  <div id="app">
    <Main />
    <LangDropdown />
  </div>
</template>

<script>

import Main from "@/components/Main";
import LangDropdown from "@/components/LangDropdown";

export default {
  name: 'App',
  components: {
    Main,
    LangDropdown
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
  margin-top: 60px;
}
</style>

