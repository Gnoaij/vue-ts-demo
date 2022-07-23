<template>
  <div class="overview">
    <base-card title="关于" shadow="hover">
      <p>
        Vue-TS-CMS 是基于 Vue、Vuex、Vue-Router、Vue-Cli、TypeScript、ElementPlus、Echart
        等的后台管理系统解决方案。
      </p>
    </base-card>
    <base-card title="相关依赖" shadow="hover">
      <ul class="dependencies">
        <template v-for="dep in dependencies" :key="dep.label">
          <li class="dependencies-item">
            <span class="label">{{ dep.label }}：</span>
            <div class="links">
              <template v-for="link in dep.links" :key="link.text">
                <el-link type="primary" :href="link.href">{{ link.text }}</el-link>
                <el-divider direction="vertical" />
              </template>
            </div>
          </li>
        </template>
      </ul>
    </base-card>
    <base-card title="提交规范" shadow="hover">
      <el-descriptions :column="1" :border="true">
        <template v-for="item in commitStandard" :key="item.type">
          <el-descriptions-item :label="item.type">
            <el-tooltip effect="light" placement="top" :content="item.tooltip">
              <span>{{ item.standard }}</span>
            </el-tooltip>
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </base-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import BaseCard from '@/components/common/base-card'

import dependencies from './config/dependencies'
import commitStandard from './config/commit-standard'

export default defineComponent({
  name: 'Overview',
  components: {
    BaseCard
  },
  setup() {
    return {
      dependencies,
      commitStandard
    }
  }
})
</script>

<style lang="less" scoped>
.overview {
  .base-card:nth-of-type(n + 2) {
    margin-top: 10px;
  }

  .dependencies {
    padding-left: 20px;

    .dependencies-item {
      display: flex;
      justify-content: flex-start;

      .label {
        position: relative;
        margin-right: 5px;
        line-height: 30px;
        font-size: 14px;
        color: #666;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -15px;
          width: 5px;
          height: 5px;
          background-color: #666;
          border-radius: 100%;
          transform: translateY(-50%);
        }
      }

      .links {
        line-height: 30px;

        .el-link {
          font-size: 14px;
        }

        .el-divider {
          margin: 0 10px;

          &:last-child {
            display: none;
          }
        }
      }
    }
  }
}
</style>
