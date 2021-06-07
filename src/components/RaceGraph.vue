<script>
import {Line, mixins} from 'vue-chartjs'
import Chart from 'chart.js'
import chartjsPluginAnnotation from 'chartjs-plugin-annotation'
const { reactiveProp } = mixins

export default {
  name: "RaceGraph",
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    Chart.plugins.register(chartjsPluginAnnotation);
    this.addPlugin(chartjsPluginAnnotation)
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    options() {
      this.renderChart(this.chartData, this.options)
    }
  }
}
</script>
