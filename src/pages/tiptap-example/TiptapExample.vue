<template>
  <div class="example-container">
    <div class="wrapper">
      <Editor v-model="content" readonly />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Editor } from '@/shared/components'
import type { JSONContent } from '@tiptap/vue-3'

const content = ref<JSONContent>({
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'customLink',
          attrs: {
            href: 'https://www.npmjs.com/package/uuid?activeTab=readme',
            target: '_blank',
            rel: 'noopener noreferrer nofollow',
          },
          content: [
            {
              type: 'text',
              text: 'asdasd',
            },
          ],
        },
      ],
    },
  ],
})

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
