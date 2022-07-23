import _rules from '@/constants/rules'

const rules = {
  cellphone: [..._rules.cellphone, ..._rules.required('手机号不能为空')],
  vcode: [..._rules.vcode, ..._rules.required('验证码不能为空')]
}

export default rules
