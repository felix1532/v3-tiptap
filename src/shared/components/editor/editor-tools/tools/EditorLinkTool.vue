<template>
  <button @click="append">Линк</button>
</template>

<script lang="ts" setup>
import { useEditor } from '@/shared/utils'

const editor = useEditor()

const append = () => {
  editor.value?.commands.setCustomLink({
    href: 'https://www.npmjs.com/package/uuid?activeTab=readme',
  })
}
</script>
