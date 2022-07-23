type Size = 'medium' | 'small' | 'mini'
type Trigger = 'blur' | 'change'
type LabelPosition = 'left' | 'right' | 'center'

enum ItemTypes {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  PASSWORD = 'PASSWORD',
  DATE_PICKER = 'DATE_PICKER',
  SELECT = 'SELECT',
  CUSTOM = 'CUSTOM'
}

interface ITextItem {
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
}

interface INumberItem {
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
}

interface IPasswordItem {
  placeholder?: string
  showPassword?: boolean
  clearable?: boolean
  disabled?: boolean
}

interface IDatePickerItem {
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
  unlinkPanels?: boolean
  clearable?: boolean
  disabled?: boolean
}

interface IOptionItem {
  label: string
  value: any
  disabled?: boolean
}

interface ISelectItem {
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  options?: IOptionItem[]
}

interface ICustomItem {
  slotName?: string
}

interface IStyle {
  [property: string]: string | number
}

interface ILayout {
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

interface IBaseItem {
  type: ItemTypes
  field: string
  label?: string
  labelWidth?: string | number
  size?: Size
  style?: IStyle
  layout?: ILayout
}

interface IItem extends IBaseItem {
  [ItemTypes.TEXT]?: ITextItem
  [ItemTypes.NUMBER]?: INumberItem
  [ItemTypes.PASSWORD]?: IPasswordItem
  [ItemTypes.DATE_PICKER]?: IDatePickerItem
  [ItemTypes.SELECT]?: ISelectItem
  [ItemTypes.CUSTOM]?: ICustomItem
}

interface IRule {
  required?: boolean
  pattern?: RegExp
  message?: string
  trigger?: Trigger
  validator?: (rule: any, value: any, callback: any) => any
}

interface IRules {
  [field: string]: IRule | IRule[]
}

interface IBaseFormConfig {
  labelWidth?: string | number
  labelPosition?: LabelPosition
  hideRequiredAsterisk?: boolean
  itemSize?: Size
  itemStyle?: IStyle
  itemLayout?: ILayout
  items: IItem[]
  rules?: IRules
}

export { ItemTypes, IBaseFormConfig }
