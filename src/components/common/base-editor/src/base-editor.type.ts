type Position = 'up' | 'down'

type MenuTypes =
  | 'head'
  | 'bold'
  | 'fontSize'
  | 'fontName'
  | 'italic'
  | 'underline'
  | 'strikeThrough'
  | 'indent'
  | 'lineHeight'
  | 'foreColor'
  | 'backColor'
  | 'link'
  | 'list'
  | 'todo'
  | 'justify'
  | 'quote'
  | 'emoticon'
  | 'image'
  | 'video'
  | 'table'
  | 'code'
  | 'splitLine'
  | 'undo'
  | 'redo'

interface IConfig {
  placeholder?: string
  height?: number
  zIndex?: number
  focus?: boolean
  onchangeTimeout?: number
  menuTooltipPosition?: Position
  menus?: MenuTypes[]
}

export { IConfig }
