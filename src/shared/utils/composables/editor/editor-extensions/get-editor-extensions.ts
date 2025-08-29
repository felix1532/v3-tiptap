import StarterKit from '@tiptap/starter-kit'
import { LinkExtension } from './link.ts'

export const getEditorExtensions = (editable: boolean) => {
  return [StarterKit, LinkExtension.configure({ isOpenOnClick: !editable })]
}
