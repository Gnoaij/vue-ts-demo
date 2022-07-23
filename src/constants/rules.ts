type Trigger = 'blur' | 'change'

interface IRule {
  required?: boolean
  pattern?: RegExp
  message?: string
  trigger?: Trigger
  validator?: (rule: any, value: any, callback: any) => any
}

interface IRules {
  required: (arg: any) => IRule[]
  username: IRule[]
  password: IRule[]
  cellphone: IRule[]
  vcode: IRule[]
}

const rules: IRules = {
  username: [
    {
      pattern: /^[a-zA-Z0-9_]{1,16}$/,
      message: '用户名必须为1~16个字母、数字或下划线',
      trigger: 'blur'
    }
  ],
  password: [
    {
      pattern: /^[a-zA-Z0-9_]{1,16}$/,
      message: '用户名必须为1~16个字母、数字或下划线',
      trigger: 'blur'
    }
  ],
  cellphone: [
    {
      pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  vcode: [
    {
      pattern: /^[0-9]{6}$/,
      message: '验证码必须为6位数字',
      trigger: 'blur'
    }
  ],
  required: (message = '') => [
    {
      required: true,
      message: message,
      trigger: 'blur'
    }
  ]
}

export default rules
