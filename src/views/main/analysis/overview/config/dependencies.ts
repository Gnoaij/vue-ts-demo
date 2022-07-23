interface ILink {
  text: string
  href: string
}

interface IDependency {
  label: string
  links: ILink[]
}

const dependencies: IDependency[] = [
  {
    label: '开发工具',
    links: [
      {
        text: 'Visual Studio Code',
        href: 'https://code.visualstudio.com/'
      }
    ]
  },
  {
    label: '编程语言',
    links: [
      {
        text: 'TypeScript',
        href: 'https://www.typescriptlang.org/'
      },
      {
        text: 'JavaScript',
        href: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/'
      }
    ]
  },
  {
    label: '构建工具',
    links: [
      {
        text: 'Webpack',
        href: 'https://webpack.docschina.org/'
      },
      {
        text: 'Vue Cli',
        href: 'https://cli.vuejs.org/zh/'
      }
    ]
  },
  {
    label: '前端框架',
    links: [
      {
        text: 'Vue',
        href: 'https://v3.cn.vuejs.org/'
      }
    ]
  },
  {
    label: '状态管理',
    links: [
      {
        text: 'Vuex',
        href: 'https://next.vuex.vuejs.org/zh/'
      }
    ]
  },
  {
    label: '路由工具',
    links: [
      {
        text: 'Vue Router',
        href: 'https://next.router.vuejs.org/zh/'
      }
    ]
  },
  {
    label: '数据可视化',
    links: [
      {
        text: 'Echarts',
        href: 'https://echarts.apache.org/zh/'
      }
    ]
  },
  {
    label: 'UI 组件库',
    links: [
      {
        text: 'Element Plus',
        href: 'https://element-plus.gitee.io/#/zh-CN'
      }
    ]
  },
  {
    label: 'CSS 预处理',
    links: [
      {
        text: 'Normalize.css',
        href: 'https://github.com/necolas/normalize.css'
      },
      {
        text: 'Less.js',
        href: 'https://github.com/less/less.js'
      }
    ]
  },
  {
    label: 'HTTP 工具',
    links: [
      {
        text: 'Axios',
        href: 'https://github.com/axios/axios'
      }
    ]
  },
  {
    label: '其他工具库',
    links: [
      {
        text: 'Day.js',
        href: 'https://dayjs.gitee.io/zh-CN/'
      },
      {
        text: 'Countup.js',
        href: 'https://github.com/inorganik/countUp.js'
      },
      {
        text: 'XSS',
        href: 'https://github.com/leizongmin/js-xss'
      }
    ]
  },
  {
    label: '富文本编辑器',
    links: [
      {
        text: 'WangEditor',
        href: 'https://www.wangeditor.com/'
      }
    ]
  },
  {
    label: '代码规范',
    links: [
      {
        text: 'Prettier',
        href: 'https://prettier.io/'
      },
      {
        text: 'ESLint',
        href: 'https://github.com/eslint/eslint'
      }
    ]
  },
  {
    label: '提交规范',
    links: [
      {
        text: 'Commitizen',
        href: 'https://github.com/commitizen/cz-cli'
      }
    ]
  }
]

export default dependencies
