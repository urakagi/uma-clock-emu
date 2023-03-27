export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    window.$vueApp.config.globalProperties.formatTime = function (time, digit) {
      if (time === 0) {
        return '-'
      }
      let sign = ''
      if (time < 0) {
        sign = '-'
        time = -time
      }
      const min = Math.floor(time / 60)
      let sec = Math.floor(time) % 60
      if (sec < 10) {
        sec = '0' + sec
      }
      let decimal = Math.floor((time - Math.floor(time)) * Math.pow(10, digit))
      for (let d = 1; d < digit; d++) {
        if (parseInt(decimal) < Math.pow(10, d)) {
          decimal = '0' + decimal
        }
      }
      return `${sign}${min}:${sec}.${decimal}`
    }
  },
}
