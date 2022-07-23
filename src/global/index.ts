import type { App } from 'vue'

import './src/initial-style'

import registerElementPlus from './src/element-plus'

import registerCustomDirective from './src/custom-directive'

export default function registerGlobal(app: App) {
  registerElementPlus(app)
  registerCustomDirective(app)
}
