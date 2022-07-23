<template>
  <div class="login full-fill align-center">
    <div class="panel" @keydown.enter="handleLoginBtnClick">
      <h1 class="title">后台管理系统</h1>
      <el-tabs type="border-card" v-model="activeName" stretch @tab-click="handleTabClick">
        <el-tab-pane name="account">
          <template #label>
            <span><i class="el-icon-user-solid"></i> 账号登录</span>
          </template>
          <login-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
          </template>
          <login-phone ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>
      <el-button class="login-btn" type="primary" @click="handleLoginBtnClick">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import LoginAccount from '@/components/content/login/login-account'
import LoginPhone from '@/components/content/login/login-phone'

export default defineComponent({
  name: 'Login',
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    /**
     * refs
     */
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    /**
     * states
     */
    const activeName = ref('account')

    /**
     * methods
     */
    const handleLoginBtnClick = () => {
      if (activeName.value === 'account') {
        accountRef.value?.loginAction()
      } else {
        phoneRef.value?.loginAction()
      }
    }

    const handleTabClick = () => {
      if (activeName.value === 'account') {
        accountRef.value?.inputRef?.focus()
      } else {
        phoneRef.value?.inputRef?.focus()
      }
    }

    /**
     * lifecycle hooks
     */
    onMounted(() => {
      handleTabClick()
    })

    return {
      accountRef,
      phoneRef,
      activeName,
      handleLoginBtnClick,
      handleTabClick
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  background: url('~@/assets/img/login-bg.svg') 0 0 no-repeat;

  .panel {
    width: 340px;
    margin-top: -150px;

    .title {
      margin-bottom: 10px;
      text-align: center;
    }

    .status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }

    .login-btn {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
