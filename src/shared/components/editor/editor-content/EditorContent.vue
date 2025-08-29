<template>
  <EditorContent v-if="editor" :class="classes" :editor="editor" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { EditorContent, type JSONContent } from '@tiptap/vue-3'
import { useEditor } from '@/shared/utils'

interface Props {
  modelValue?: JSONContent
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  readonly: false,
})

const editor = useEditor()

const classes = computed(() => ({
  'editor-content': true,
  'only-view': props.readonly,
}))
</script>

<style lang="scss" scoped>
.editor-content :deep() {
  height: auto;
  width: 100%;
  word-break: break-word;

  .tiptap {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px;
  }

  .tiptap:focus-visible {
    outline: none;
  }

  p {
    color: #e3e5e8;
  }

  a {
    color: aquamarine;
  }
}

.only-view :deep(.tiptap) {
  padding: 32px;
}
</style>
