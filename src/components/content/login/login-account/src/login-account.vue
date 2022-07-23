<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :model="account"
      :rules="rules"
      ref="formRef"
      hide-required-asterisk
    >
      <el-form-item label="用户名" prop="name">
        <el-input
          type="text"
          autocomplete="off"
          clearable
          v-model="account.name"
          ref="inputRef"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          autocomplete="off"
          show-password
          clearable
          v-model="account.password"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import { useRouter } from 'vue-router'

import { useStore } from '@/store'
import { ActionTypes } from '@/store/login/types'

import type { ElForm } from 'element-plus'
import type { ElInput } from 'element-plus'

import rules from '../config/rules'

import AppLoading from '@/components/common/app-loading'

export default defineComponent({
  name: 'LoginAccount',
  setup() {
    /**
     * refs
     */
    const formRef = ref<InstanceType<typeof ElForm>>()
    const inputRef = ref<InstanceType<typeof ElInput>>()

    /**
     * router
     */
    const router = useRouter()

    /**
     * store
     */
    const store = useStore()

    /**
     * states
     */
    const account = reactive({
      name: 'lilei',
      password: '123456'
    })
    const isLogging = ref(false)

    /**
     * methods
     */
    const loginAction = () => {
      if (!isLogging.value) {
        formRef.value?.validate((valid) => {
          if (valid) {
            isLogging.value = true
            AppLoading(
              () => store.dispatch(`loginModule/${ActionTypes.ACCOUNT_LOGIN}`, { ...account }),
              '登陆中'
            )
              .then(() => {
                isLogging.value = false
                router.push('/main')
              })
              .catch(() => (isLogging.value = false))
          }
        })
      }
    }

    return {
      rules,
      formRef,
      inputRef,
      account,
      loginAction
    }
  }
})
</script>
