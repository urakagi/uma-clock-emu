<script>
import { Line } from 'vue-chartjs'
import { Chart } from 'chart.js'
import chartjsPluginAnnotation from 'chartjs-plugin-annotation'

export default {
  name: 'RaceGraph',
  extends: Line,
  props: ['options'],
  mounted() {
    Chart.register(chartjsPluginAnnotation)
    // this.renderChart(this.chartData, this.options)
  },
  watch: {
    options() {
      // this.renderChart(this.chartData, this.options)
    },
  },
}
</script>
