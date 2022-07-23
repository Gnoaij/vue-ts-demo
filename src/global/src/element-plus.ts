import type { App } from 'vue'

import 'element-plus/lib/theme-chalk/base.css'
import 'element-plus/lib/theme-chalk/display.css'

import {
  ElAside,
  ElAvatar,
  ElBadge,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCard,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElDivider,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElEmpty,
  ElForm,
  ElFormItem,
  ElHeader,
  ElImage,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElPagination,
  ElPopconfirm,
  ElRow,
  ElSelect,
  ElSubmenu,
  ElSwitch,
  ElTabs,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTag,
  ElTooltip,
  ElTree
} from 'element-plus'

import { ElLoading } from 'element-plus'

const componentsA = [
  ElAside,
  ElAvatar,
  ElBadge,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCard,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElDivider,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElEmpty,
  ElForm,
  ElFormItem,
  ElHeader,
  ElImage,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElPagination,
  ElPopconfirm,
  ElRow,
  ElSelect,
  ElSubmenu,
  ElSwitch,
  ElTabs,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTag,
  ElTooltip,
  ElTree
]

const componentsB = [ElLoading]

export default function registerElementPlus(app: App) {
  componentsA.forEach((component) => {
    app.component(component.name, component)
  })
  componentsB.forEach((component) => {
    app.use(component)
  })
}
