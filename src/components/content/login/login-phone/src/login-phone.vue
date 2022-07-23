<template>
  <div class="login-phone">
    <el-form label-width="60px" :model="phone" :rules="rules" ref="formRef" hide-required-asterisk>
      <el-form-item label="手机号" prop="cellphone">
        <el-input
          type="text"
          autocomplete="off"
          clearable
          v-model="phone.cellphone"
          ref="inputRef"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="vcode">
        <div class="align-left">
          <el-input type="text" autocomplete="off" v-model="phone.vcode" clearable></el-input>
          <el-button
            type="primary"
            class="vcode-btn"
            :disabled="countDown !== 0"
            @click="handleVcodeBtnClick"
          >
            {{ countDown !== 0 ? `${countDown}s后重试` : '获取验证码' }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import type { ElForm } from 'element-plus'
import type { ElInput } from 'element-plus'

import rules from '../config/rules'

export default defineComponent({
  name: 'LoginPhone',
  setup() {
    /**
     * refs
     */
    const formRef = ref<InstanceType<typeof ElForm>>()
    const inputRef = ref<InstanceType<typeof ElInput>>()

    /**
     * states
     */
    const phone = reactive({
      cellphone: '',
      vcode: ''
    })
    const countDown = ref(0)
    let timer: number | null

    /**
     * methods
     */
    const handleVcodeBtnClick = () => {
      if (countDown.value === 0) {
        countDown.value = 60
        timer = window.setInterval(() => {
          countDown.value--
          if (countDown.value === 0 && timer) {
            window.clearInterval(timer)
            timer = null
          }
        }, 1000)
      }
    }

    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('login', phone)
        }
      })
    }

    return {
      rules,
      formRef,
      inputRef,
      phone,
      countDown,
      handleVcodeBtnClick,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped>
.login-phone {
  .vcode-btn {
    margin-left: 8px;
  }
}
</style>
