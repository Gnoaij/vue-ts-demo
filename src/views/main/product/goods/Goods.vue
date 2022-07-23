<template>
  <div class="goods">
    <page-container
      :namespace="namespace"
      :page-search-config="pageSearchConfig"
      :page-content-config="pageContentConfig"
      :page-modal-config_create="pageModalConfig_create"
      :page-modal-config_update="pageModalConfig_update"
    >
      <!-- page-content slots -->
      <template #category-column="slotProps">
        <base-cell
          :config="{ key: 'id', value: 'name' }"
          :empty-text="emptyText"
          :is-loading="isLoading"
          :data-list="entireCategoryList"
          :target-key="slotProps.row?.categoryId"
          @empty-click="loadEntireCategoryList"
        />
      </template>
      <template #status-column="slotProps">
        <el-tag v-if="slotProps.row?.status === 1" type="success">上架</el-tag>
        <el-tag v-else type="danger">下架</el-tag>
      </template>
      <template #newPrice-column="slotProps">
        <span>{{ '￥' + slotProps.row?.newPrice }}</span>
      </template>
      <template #oldPrice-column="slotProps">
        <span>{{ '￥' + slotProps.row?.oldPrice }}</span>
      </template>
      <template #image-column="slotProps">
        <el-image
          style="width: 100%"
          :src="slotProps.row?.imgUrl"
          :preview-src-list="[slotProps.row?.imgUrl]"
        />
      </template>
      <template #page-content-expand="slotProps">
        <el-descriptions title="商品信息" :column="2" :border="true">
          <el-descriptions-item label="名称" :span="2">
            {{ slotProps.row?.name }}
          </el-descriptions-item>
          <el-descriptions-item label="简介" :span="2">
            {{ slotProps.row?.desc }}
          </el-descriptions-item>
          <el-descriptions-item label="地址" :span="2">
            {{ slotProps.row?.address }}
          </el-descriptions-item>
          <el-descriptions-item label="类别" :span="1">
            <base-cell
              style="display: inline-block"
              :config="{ key: 'id', value: 'name' }"
              :empty-text="emptyText"
              :is-loading="isLoading"
              :data-list="entireCategoryList"
              :target-key="slotProps.row?.categoryId"
              @empty-click="loadEntireCategoryList"
            />
          </el-descriptions-item>
          <el-descriptions-item label="状态" :span="1">
            <el-tag v-if="slotProps.row?.status === 1" type="success">上架</el-tag>
            <el-tag v-else type="danger">下架</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="原价格" :span="1">
            {{ '￥' + slotProps.row?.oldPrice }}
          </el-descriptions-item>
          <el-descriptions-item label="现价格" :span="1">
            {{ '￥' + slotProps.row?.newPrice }}
          </el-descriptions-item>
          <el-descriptions-item label="销售量" :span="1">
            {{ slotProps.row?.saleCount }}
          </el-descriptions-item>
          <el-descriptions-item label="库存量" :span="1">
            {{ slotProps.row?.inventoryCount }}
          </el-descriptions-item>
          <el-descriptions-item label="收藏量" :span="2">
            {{ slotProps.row?.favorCount }}
          </el-descriptions-item>
          <el-descriptions-item label="创建时间" :span="2">
            <span v-utc-to-local>{{ slotProps.row?.createAt }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="更新时间" :span="2">
            <span v-utc-to-local>{{ slotProps.row?.updateAt }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="图片" :span="2">
            <el-image
              style="width: 200px"
              :src="slotProps.row?.imgUrl"
              :preview-src-list="[slotProps.row?.imgUrl]"
            />
          </el-descriptions-item>
        </el-descriptions>
      </template>
      <!-- page-search slots -->
      <!-- page-modal-create slots -->
      <!-- page-modal-update slots -->
      <template #category-select="slotProps">
        <base-select
          :config="{
            key: 'id',
            label: 'name',
            value: 'id',
            placeholder: '请选择类别',
            clearable: true
          }"
          :empty-text="emptyText"
          :is-loading="isLoading"
          :options="entireCategoryList"
          :model-value="slotProps.modelValue ?? ''"
          @change="slotProps.setModelValue"
          @empty-click="loadEntireCategoryList"
        />
      </template>
    </page-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import pageSearchConfig from './config/page-search.config'
import pageContentConfig from './config/page-content.config'
import pageModalConfig_create from './config/page-modal.create.config'
import pageModalConfig_update from './config/page-modal.update.config'

import PageContainer from '@/components/content/page/page-container'

import { useStore } from '@/store'
import { ActionTypes } from '@/store/main/product/goods/types'

import type { IPagination } from '@/service/types'

import usePagePermission from '@/components/content/page/hooks/use-page-permission'

import BaseSelect from '@/components/common/base-select'
import BaseCell from '@/components/common/base-cell'

export default defineComponent({
  name: 'Goods',
  components: {
    PageContainer,
    BaseSelect,
    BaseCell
  },
  setup() {
    const namespace = 'mainModule/productModule/goodsModule'

    const store = useStore()

    const entireCategoryList = computed(
      () => store.state.mainModule.productModule.goodsModule.entireCategoryList
    )

    const emptyText = ref('点击加载')
    const isLoading = ref(false)

    const queryInfo: IPagination = {
      offset: 0,
      size: 1000
    }

    const loadEntireCategoryList = async () => {
      if (!isLoading.value) {
        try {
          emptyText.value = '加载中'
          isLoading.value = true
          await store.dispatch(`${namespace}/${ActionTypes.GET_ENTIRE_CATEGORY_LIST}`, queryInfo)
          emptyText.value = '无数据，点击重新加载'
          isLoading.value = false
        } catch {
          emptyText.value = '加载失败，点击重新加载'
          isLoading.value = false
        }
      }
    }

    const permission = usePagePermission()

    if (permission.query) {
      loadEntireCategoryList()
    }

    return {
      namespace,
      pageSearchConfig,
      pageContentConfig,
      pageModalConfig_create,
      pageModalConfig_update,
      entireCategoryList,
      emptyText,
      isLoading,
      loadEntireCategoryList
    }
  }
})
</script>
