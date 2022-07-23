import _rules from '@/constants/rules'

const rules = {
  name: [..._rules.username, ..._rules.required('用户名不能为空')],
  password: [..._rules.password, ..._rules.required('密码不能为空')]
}

export default rules
