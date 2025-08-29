<template>
  <NodeViewWrapper class="wrapper">
    <Tooltip :content="nodeAttrs.href">
      <a :href="nodeAttrs.href" :rel="nodeAttrs.rel" :target="nodeAttrs.target" @click="onClick">
        <NodeViewContent />
      </a>
    </Tooltip>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { Tooltip } from '@/shared/components'

const props = defineProps<NodeViewProps>()

const nodeAttrs = computed(() => props.node?.attrs)
const isOpenOnClick = computed(() => props.extension.options.isOpenOnClick)

const onClick = () => {
  console.log(isOpenOnClick.value)
  if (isOpenOnClick.value) {
    window.open(nodeAttrs.value.href, nodeAttrs.value.target)
  }
}

console.log({ props, nodeAttrs }, 'node attrs')
</script>

<style lang="scss" scoped>
.wrapper {
  display: inline;
}
</style>
