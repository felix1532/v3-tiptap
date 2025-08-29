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
  selectable: true,
  draggable: false,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      href: {
        default: null,
        // parseHTML: (element) => element.getAttribute('href'),
        // renderHTML: (attributes) => {
        //   if (!attributes.href) {
        //     return {}
        //   }
        //   return { href: attributes.href }
        // },
      },
      target: {
        default: '_blank',
        // parseHTML: (element) => element.getAttribute('target') || '_blank',
        // renderHTML: (attributes) => {
        //   if (!attributes.target) {
        //     return {}
        //   }
        //   return { target: attributes.target }
        // },
      },
      title: {
        default: null,
        // parseHTML: (element) => element.getAttribute('title'),
        // renderHTML: (attributes) => {
        //   if (!attributes.title) {
        //     return {}
        //   }
        //   return { title: attributes.title }
        // },
      },
      rel: {
        default: 'noopener noreferrer nofollow',
        // parseHTML: (element) => element.getAttribute('rel'),
        // renderHTML: (attributes) => {
        //   if (!attributes.rel) {
        //     return { rel: 'noopener noreferrer nofollow' }
        //   }
        //   return { rel: attributes.rel }
        // },
      },
      // 'data-link': {
      //   default: this.name,
      // },
    }
  },

  // parseHTML() {
  //   return [
  //     {
  //       tag: `a[data-link="${this.name}"]`,
  //       getAttrs: (dom) => {
  //         if (typeof dom === 'string') return {}
  //         return {
  //           href: dom.getAttribute('href'),
  //           target: dom.getAttribute('target'),
  //           title: dom.getAttribute('title'),
  //           rel: dom.getAttribute('rel'),
  //           'data-link': dom.getAttribute('data-link'),
  //         }
  //       },
  //     },
  //   ]
  // },
  //
  // renderHTML({ HTMLAttributes }) {
  //   return ['a', { ...this.options.HTMLAttributes, ...HTMLAttributes }, 0]
  // },

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
                  title: attributes.title || text,
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
