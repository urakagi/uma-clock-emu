<template>
  <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="{{ adClient }}"
      data-ad-slot="{{ adSlot }}"
      data-ad-format="auto" />
</template>

<script>
export default {
  name: "GoogleAdsense",
  props: ["adClient", "adSlot"],
}
</script>

<style scoped>

</style>
