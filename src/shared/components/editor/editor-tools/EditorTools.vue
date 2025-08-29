<template>
  <div class="editor-tools">
    <EditorLinkTool />
  </div>
</template>

<script lang="ts" setup>
import { EditorLinkTool } from './tools'
</script>

<style lang="scss" scoped>
.editor-tools {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #545454;
  padding: 12px;
}
</style>
