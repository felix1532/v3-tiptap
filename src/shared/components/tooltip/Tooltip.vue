<template>
  <div class="tooltip-container" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot />

    <Transition name="fade">
      <div
        v-if="isVisible"
        ref="tooltipElement"
        :class="[position, { 'tooltip-visible': isVisible }]"
        :style="tooltipStyle"
        class="tooltip"
      >
        {{ content }}
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, type StyleValue } from 'vue'

interface Props {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  delay: 200,
})

const isVisible = ref(false)
const tooltipElement = ref<HTMLElement | null>(null)
let timeoutId: number | null = null

const tooltipStyle = computed<StyleValue>(() => {
  if (!tooltipElement.value) return {}

  return {
    '--tooltip-offset': '8px',
  }
})

const showTooltip = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }

  timeoutId = setTimeout(() => {
    isVisible.value = true
  }, props.delay) as unknown as number
}

const hideTooltip = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  isVisible.value = false
}
</script>

<style lang="scss" scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  background: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.tooltip::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.tooltip.top {
  bottom: calc(100% + var(--tooltip-offset, 8px));
  left: 50%;
  transform: translateX(-50%);
}

.tooltip.top::before {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px 6px 0 6px;
  border-color: #333 transparent transparent transparent;
}

.tooltip.bottom {
  top: calc(100% + var(--tooltip-offset, 8px));
  left: 50%;
  transform: translateX(-50%);
}

.tooltip.bottom::before {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent #333 transparent;
}

.tooltip.left {
  right: calc(100% + var(--tooltip-offset, 8px));
  top: 50%;
  transform: translateY(-50%);
}

.tooltip.left::before {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 0 6px 6px;
  border-color: transparent transparent transparent #333;
}

.tooltip.right {
  left: calc(100% + var(--tooltip-offset, 8px));
  top: 50%;
  transform: translateY(-50%);
}

.tooltip.right::before {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 6px 6px 0;
  border-color: transparent #333 transparent transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.95);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
