import type { InjectionKey, ShallowRef } from 'vue'
import { inject, provide, shallowRef } from 'vue'
import type { EditorOptions } from '@tiptap/vue-3'
import { Editor, useEditor as useTiptapEditor } from '@tiptap/vue-3'
import { getEditorExtensions, getUIUniqId } from '@/shared/utils'

const providedEditorKey: InjectionKey<ShallowRef<Editor | undefined>> = Symbol(
  `EDITOR_KEY-${getUIUniqId()}`,
)

export const initEditor = (
  initContent: EditorOptions['content'] | undefined,
  options: { editable: boolean },
) => {
  const { editable } = options

  const editorOptions: Partial<EditorOptions> = {
    editable,
    content: initContent ?? null,

    extensions: getEditorExtensions(),
  }

  const editor = useTiptapEditor(editorOptions)

  provide(providedEditorKey, editor)

  return editor
}

export const useEditor = (): ShallowRef<Editor | undefined> => {
  return inject(providedEditorKey, () => shallowRef(new Editor()), true)
}
