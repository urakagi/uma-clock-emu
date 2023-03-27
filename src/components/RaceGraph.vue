<template>
  <line-chart id="race-chart" :options="chartOptions" :data="chartStore" />
</template>

<script>
import { Line as LineChart } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import chartjsPluginAnnotation from 'chartjs-plugin-annotation'
import MixinVuexStore from "./MixinVuexStore.vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, chartjsPluginAnnotation);

export default {
  name: 'RaceGraph',
  props: ['chartDataProp', 'chartOptionsProp'],
  components: { LineChart },
  mixins: [MixinVuexStore],
  data() {
    return {
      chartData: this.chartDataProp,
      chartOptions: this.chartOptionsProp,
    };
  },
}
</script>
