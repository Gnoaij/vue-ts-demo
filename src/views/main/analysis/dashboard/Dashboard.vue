<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <transition-group name="fade">
        <template v-for="item in goodsAmountList" :key="item.amount">
          <el-col :sm="12" :md="6">
            <base-card :title="item.title" shadow="hover" refresh @refresh-click="loadAmount">
              <el-tag type="info" effect="plain">{{ item.amount }}</el-tag>
              <el-divider direction="vertical" />
              <base-countup :number="item.number1" style="display: inline-block" />
            </base-card>
          </el-col>
        </template>
      </transition-group>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :md="7">
        <base-card title="商品分类数量(饼图)" shadow="hover" refresh @refresh-click="loadPieRole">
          <base-echarts :option="pieOption" height="360px" />
        </base-card>
      </el-col>
      <el-col :md="10">
        <base-card title="商品城市销量(地图)" shadow="hover" refresh @refresh-click="loadMap">
          <base-echarts :option="mapOption" height="360px" />
        </base-card>
      </el-col>
      <el-col :md="7">
        <base-card title="商品分类数量(玫瑰图)" shadow="hover" refresh @refresh-click="loadPieRole">
          <base-echarts :option="roleOption" height="360px" />
        </base-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :md="12">
        <base-card title="商品分类销量(折线图)" shadow="hover" refresh @refresh-click="loadLine">
          <base-echarts :option="lineOption" height="360px" />
        </base-card>
      </el-col>
      <el-col :md="12">
        <base-card title="商品分类收藏(柱状图)" shadow="hover" refresh @refresh-click="loadBar">
          <base-echarts :option="barOption" height="360px" />
        </base-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useStore } from '@/store'
import { MutationTypes, ActionTypes } from '@/store/main/analysis/dashboard/types'

import BaseCard from '@/components/common/base-card'
import BaseEcharts from '@/components/common/base-echarts'
import BaseCountup from '@/components/common/base-countup'

import getPieOption from './options/pie.echarts.option'
import getRoleOption from './options/role.echarts.option'
import getLineOption from './options/line.echarts.option'
import getBarOption from './options/bar.echarts.option'
import getMapOption from './options/map.echarts.option'

export default defineComponent({
  name: 'Dashboard',
  components: {
    BaseCard,
    BaseEcharts,
    BaseCountup
  },
  setup() {
    const namespace = 'mainModule/analysisModule/dashboardModule'

    const store = useStore()

    const goodsCategoryCount = computed(() =>
      store.state.mainModule.analysisModule.dashboardModule.goodsCategoryCount.map((item) => ({
        name: item.name,
        value: item.goodsCount
      }))
    )

    const goodsCategorySale = computed(() => {
      const xLabels: string[] = []
      const values: number[] = []
      store.state.mainModule.analysisModule.dashboardModule.goodsCategorySale.forEach((item) => {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      })
      return { xLabels, values }
    })

    const goodsCategoryFavor = computed(() => {
      const xLabels: string[] = []
      const values: number[] = []
      store.state.mainModule.analysisModule.dashboardModule.goodsCategoryFavor.forEach((item) => {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      })
      return { xLabels, values }
    })

    const goodsAddressSale = computed(() =>
      store.state.mainModule.analysisModule.dashboardModule.goodsAddressSale.map((item) => ({
        name: item.address,
        value: item.count
      }))
    )

    const goodsAmountList = computed(
      () => store.state.mainModule.analysisModule.dashboardModule.goodsAmountList
    )

    const pieOption = computed(() => getPieOption(goodsCategoryCount.value))

    const roleOption = computed(() => getRoleOption(goodsCategoryCount.value))

    const lineOption = computed(() => getLineOption(goodsCategorySale.value))

    const barOption = computed(() => getBarOption(goodsCategoryFavor.value))

    const mapOption = computed(() => getMapOption(goodsAddressSale.value))

    const loadPieRole = () => {
      store.commit(`${namespace}/${MutationTypes.SET_GOODS_CATEGORY_COUNT}`, [])
      store.dispatch(`${namespace}/${ActionTypes.GET_GOODS_CATEGORY_COUNT}`)
    }

    const loadLine = () => {
      store.commit(`${namespace}/${MutationTypes.SET_GOODS_CATEGORY_SALE}`, [])
      store.dispatch(`${namespace}/${ActionTypes.GET_GOODS_CATEGORY_SALE}`)
    }

    const loadBar = () => {
      store.commit(`${namespace}/${MutationTypes.SET_GOODS_CATEGORY_FAVOR}`, [])
      store.dispatch(`${namespace}/${ActionTypes.GET_GOODS_CATEGORY_FAVOR}`)
    }

    const loadMap = () => {
      store.commit(`${namespace}/${MutationTypes.SET_GOODS_ADDRESS_SALE}`, [])
      store.dispatch(`${namespace}/${ActionTypes.GET_GOODS_ADDRESS_SALE}`)
    }

    const loadAmount = () => {
      store.commit(`${namespace}/${MutationTypes.SET_GOODS_AMOUNT_LIST}`, [])
      store.dispatch(`${namespace}/${ActionTypes.GET_GOODS_AMOUNT_LIST}`)
    }

    loadPieRole()
    loadLine()
    loadBar()
    loadMap()
    loadAmount()

    return {
      pieOption,
      roleOption,
      lineOption,
      barOption,
      mapOption,
      goodsAmountList,
      loadPieRole,
      loadLine,
      loadBar,
      loadMap,
      loadAmount
    }
  }
})
</script>

<style lane="less" scoped>
.fade-enter-from,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  max-height: 125px;
  opacity: 1;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.3s ease-in;
}
</style>
