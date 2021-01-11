<template>
  <svg class="progress-ring" :height="size" :width="size">
    <g>
      <circle
        class="progress-ring__circle"
        :cy="size / 2"
        :cx="size / 2"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke="outlineStroke"
        fill="transparent"
      ></circle>
      <circle
        class="progress-ring__circle"
        :style="computedStyle"
        :cy="size / 2"
        :cx="size / 2"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke="progressStroke"
        fill="transparent"
      ></circle>
      <text
        class="progress-ring__text"
        x="50%"
        y="50%"
        text-anchor="middle"
        font-family="Verdana"
        font-size="20"
        :fill="progressStroke"
      >
        {{ `${progress}%` }}
      </text>
    </g>
  </svg>
</template>

<script>
import { computed } from "vue";
export default {
  name: "ProgressRing",
  props: {
    size: {
      type: [Number],
      default: 200
    },
    strokeWidth: {
      type: [Number],
      default: 5
    },
    progress: {
      type: [Number],
      default: 0
    },
    outlineStroke: {
      type: String,
      default: "#DDE5F6"
    },
    progressStroke: {
      type: String,
      default: "#44F6B2"
    }
  },
  setup(props) {
    const radius = props.size / 2 - props.strokeWidth * 2;
    const circumference = radius * Math.PI * 2;
    const offset = computed(
      () => circumference - (circumference * props.progress) / 100
    );
    const computedStyle = computed(() => ({
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: offset.value
    }));
    return {
      computedStyle,
      radius,
      offset
    };
  }
};
</script>

<style lang="scss" scoped>
.progress-ring {
  &__circle {
    transition: stroke-dashoffset 0.3s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
}
</style>
