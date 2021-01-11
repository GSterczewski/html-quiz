<template>
  <div class="statistic">
    <p class="statistic__label">{{ label }}</p>
    <p class="statistic__value" :class="valueStyling">{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Stat"
    },
    value: {
      type: Number,
      default: 0
    },
    valueStyling: {
      type: String,
      default: ""
    }
  },
  name: "QuizStatistic"
};
</script>

<style lang="scss" scoped>
.statistic {
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
  display: flex;
  align-items: center;
  font-size: 1.5rem;

  &__label {
    color: $color-gray;
    margin-right: 0.5rem;
    text-transform: uppercase;
  }
}
</style>
