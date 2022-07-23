<template>
  <div class="base-collapse">
    <div class="base-collapse-header">
      <div class="header-left">
        <i class="icon el-icon-tickets" />
        <h2 class="title">{{ title }}</h2>
      </div>
      <div class="header-right">
        <el-switch
          title="手风琴"
          active-color="#13ce66"
          v-model="isAccordion"
          @change="handleSwitchChange"
        />
      </div>
    </div>
    <div class="base-collapse-content">
      <el-collapse v-model="activeNames" :accordion="isAccordion">
        <template v-for="item in dataList" :key="item[config.key]">
          <el-collapse-item :name="item[config.key] + ''">
            <template #title>
              <h3 class="title">{{ item[config.title] }}</h3>
            </template>
            <div class="content">
              <div class="html" v-html="item[config.content]"></div>
              <div class="time">{{ item[config.time] }}</div>
            </div>
          </el-collapse-item>
        </template>
      </el-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'

import type { IConfig } from './base-collapse.type'

export default defineComponent({
  name: 'BaseCollapse',
  props: {
    title: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    config: {
      type: Object as PropType<IConfig>,
      default: () => ({
        key: 'key',
        title: 'title',
        content: 'content',
        time: 'time'
      })
    }
  },
  setup() {
    /**
     * states
     */
    const isAccordion = ref(false)

    const activeNames = ref<string | string[] | undefined>()

    const handleSwitchChange = (newStatus: boolean) => {
      if (newStatus === true) {
        activeNames.value = undefined
      }
    }

    return {
      isAccordion,
      activeNames,
      handleSwitchChange
    }
  }
})
</script>

<style lang="less" scoped>
.base-collapse {
  padding: 10px;
  background-color: #fff;

  .base-collapse-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;

    .header-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .icon {
        margin-right: 5px;
        font-size: 20px;
        font-weight: 600;
      }

      .title {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .header-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 15px;
    }
  }

  .base-collapse-content {
    .el-collapse {
      padding: 0 10px;
    }

    .title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 16px;
      font-weight: 600;
      color: #606266;
    }

    .content {
      padding: 10px 15px;
      border: 2px solid #ebeef5;
      border-radius: 4px;

      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }

      .html {
        font-size: 14px;
        line-height: 2;
      }

      .time {
        font-size: 14px;
        line-height: 2;
        color: #606266;
        text-align: right;
      }

      :deep(.html) {
        /* table 样式 */
        table {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
        }
        table td,
        table th {
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          padding: 3px 5px;
        }
        table th {
          border-bottom: 2px solid #ccc;
          text-align: center;
        }

        /* blockquote 样式 */
        blockquote {
          display: block;
          border-left: 8px solid #d0e5f2;
          padding: 5px 10px;
          margin: 10px 0;
          line-height: 1.4;
          font-size: 100%;
          background-color: #f1f1f1;
        }

        /* code 样式 */
        code {
          display: inline-block;
          *display: inline;
          *zoom: 1;
          background-color: #f1f1f1;
          border-radius: 3px;
          padding: 3px 5px;
          margin: 0 3px;
        }
        pre code {
          display: block;
        }

        /* ul ol 样式 */
        ul,
        ol {
          margin: 10px 0 10px 20px;
        }
      }
    }
  }
}
</style>
