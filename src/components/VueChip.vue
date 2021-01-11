<template>
  <span class="chip" :style="{ backgroundColor: bgColor, color }">
    <slot />
  </span>
</template>

<script>
export default {
  name: "VueChip",
  props:{
    bgColor:{
      type: String,
      default: "#DDE5F6"
    },
    color:{
      type: String,
      default: "#000"
    }
  }
}
</script>

<style lang="scss" scoped>
  .chip{
    padding: 8px 24px;
    border-radius: 15px;
    font-weight: bold;
    
  }
</style>