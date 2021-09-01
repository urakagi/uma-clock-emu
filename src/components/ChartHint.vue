<template>
  <div>
    {{ $t("chart.hintBackground") }}
    <span style="background-color: rgba(225, 190, 255, 0.2); padding: 5px">{{ $t("chart.corner") }}</span>、
    <span style="background-color: rgba(210, 255, 235, 0.2); padding: 5px">{{ $t("chart.straight") }}</span>、
    <span>{{ $t("chart.none") }}</span>、
    <span style="background-color: lightgray; padding: 5px">{{ $t("chart.temptation") }}</span>
  </div>
</template>

<script>
export default {
  name: "ChartHint"
}
</script>

<style scoped>

</style>