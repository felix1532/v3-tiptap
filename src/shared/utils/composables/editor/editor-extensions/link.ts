import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { EditorLinkTemplate } from '../../../../components/editor-templates'

export interface LinkAttributes {
  href?: string
  target?: string
  title?: string
  rel?: string
}

export interface LinkOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customLink: {
      setCustomLink: (attributes: LinkAttributes) => ReturnType
      updateCustomLink: (attributes: Partial<LinkAttributes>) => ReturnType
      removeCustomLink: () => ReturnType
    }
  }
}

export const LinkExtension = Node.create<LinkOptions>({
  name: 'customLink',
  group: 'inline',
  inline: true,
  content: 'text*',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      href: {
        default: null,
      },
      target: {
        default: '_blank',
      },
      title: {
        default: null,
      },
      rel: {
        default: 'noopener noreferrer nofollow',
      },
    }
  },

  renderHTML() {
    return ['p']
  },

  addCommands() {
    return {
      setCustomLink:
        (attributes: LinkAttributes) =>
        ({ chain, state }) => {
          const { from, to } = state.selection
          const text = state.doc.textBetween(from, to, ' ')

          return chain()
            .insertContentAt(
              { from, to },
              {
                type: this.name,
                attrs: {
                  href: attributes.href,
                  target: attributes.target || '_blank',
                  rel: 'noopener noreferrer nofollow',
                },
                content: text ? [{ type: 'text', text }] : undefined,
              },
            )
            .run()
        },

      updateCustomLink:
        (attributes: Partial<LinkAttributes>) =>
        ({ chain, state }) => {
          const { $from } = state.selection
          const node = $from.nodeAfter

          if (node && node.type.name === this.name) {
            return chain()
              .updateAttributes(this.name, { ...node.attrs, ...attributes })
              .run()
          }
          return false
        },

      removeCustomLink:
        () =>
        ({ chain, state }) => {
          const { $from } = state.selection
          const node = $from.nodeAfter

          if (node && node.type.name === this.name) {
            const pos = $from.pos
            const text = node.textContent

            return chain()
              .deleteRange({ from: pos, to: pos + node.nodeSize })
              .insertContentAt(pos, text)
              .setTextSelection(pos + text.length)
              .run()
          }
          return false
        },
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(EditorLinkTemplate)
  },
})
