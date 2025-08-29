import StarterKit from '@tiptap/starter-kit'
import { LinkExtension } from './link.ts'

export const getEditorExtensions = () => {
  return [StarterKit, LinkExtension]
}
