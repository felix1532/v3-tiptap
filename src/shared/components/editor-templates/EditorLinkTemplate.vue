<template>
  <NodeViewWrapper class="wrapper">
    <Tooltip :content="nodeAttrs.href">
      <a :href="nodeAttrs.href" :rel="nodeAttrs.rel" :target="nodeAttrs.target">{{ title }}</a>
    </Tooltip>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { type NodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { Tooltip } from '@/shared/components'

const props = defineProps<NodeViewProps>()

const nodeAttrs = computed(() => props.node?.attrs)
const title = computed(() => nodeAttrs.value.title ?? '')

console.log({ props, nodeAttrs }, 'node attrs')
</script>
