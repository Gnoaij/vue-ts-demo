interface ICommitStandard {
  type: string
  standard: string
  tooltip: string
}

const commitStandard: ICommitStandard[] = [
  {
    type: 'feat',
    standard: 'A new feature',
    tooltip: '新增特性'
  },
  {
    type: 'fix',
    standard: 'A bug fix',
    tooltip: '修复Bug'
  },
  {
    type: 'docs',
    standard: 'Documentation only changes',
    tooltip: '修改文档'
  },
  {
    type: 'style',
    standard:
      'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    tooltip: '修改代码风格'
  },
  {
    type: 'refactor',
    standard: 'A code change that neither fixes a bug nor adds a feature',
    tooltip: '代码重构'
  },
  {
    type: 'perf',
    standard: 'A code change that improves performance',
    tooltip: '改善性能'
  },
  {
    type: 'test',
    standard: 'Adding missing tests or correcting existing tests',
    tooltip: '测试'
  },
  {
    type: 'build',
    standard:
      'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
    tooltip: '变更项目构建或外部依赖'
  },
  {
    type: 'ci',
    standard:
      'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
    tooltip: '更改持续集成软件的配置文件和scripts脚本'
  },
  {
    type: 'chore',
    standard: "Other changes that don't modify src or test files",
    tooltip: '变更构建流程或辅助工具'
  },
  {
    type: 'revert',
    standard: 'Reverts a previous commit',
    tooltip: '代码回退'
  }
]

export default commitStandard
