<template>
  <div class="example-container">
    <div class="wrapper">
      <Editor v-model="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Editor } from '@/shared/components'
import type { JSONContent } from '@tiptap/vue-3'

const content = ref<JSONContent>()

watchEffect(() => {
  console.info(content.value, 'LOGGED CONTENT')
})
</script>

<style lang="scss" scoped>
.example-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  > .wrapper {
    width: 100%;
    max-width: 900px;
  }
}
</style>
