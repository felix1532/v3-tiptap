<template>
  <div class="editor-container">
    <EditorTools />

    <EditorContent :model-value="modelValue" :readonly="readonly" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import type { JSONContent } from '@tiptap/vue-3'
import { EditorContent, EditorTools } from '@/shared/components'
import { initEditor } from '@/shared/utils'

interface Props {
  modelValue?: JSONContent
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  readonly: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: JSONContent): void
}>()

const editor = initEditor(props.modelValue, {
  editable: !props.readonly,
})

onMounted(() => {
  if (editor.value) {
    editor.value.on('update', ({ editor }) => {
      emit('update:modelValue', editor.getJSON())
    })
  }
})

watch(
  () => props.modelValue,
  (value) => {
    if (editor.value) {
      const isSame = JSON.stringify(editor.value.getJSON()) === JSON.stringify(value)

      if (isSame || !value) {
        return
      }

      editor.value?.commands.setContent(value, { emitUpdate: false })
    }
  },
)
</script>

<style lang="scss">
.editor-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 24px;
  border: 1px solid #545454;
}
</style>
