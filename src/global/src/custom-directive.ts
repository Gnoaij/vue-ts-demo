import type { App, Directive } from 'vue'

import { utcToLocal } from '@/utils/formatter'

interface IDirectives {
  [key: string]: Directive<HTMLElement>
}

const directives: IDirectives = {
  'utc-to-local': (el, binding) => {
    const content = el.innerText ?? ''
    const value = binding.value ?? 'YYYY-MM-DD HH:mm:ss'
    if (content) {
      el.innerText = utcToLocal(content, value)
    }
  }
}

export default function registerCustomDirective(app: App) {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
  })
}
