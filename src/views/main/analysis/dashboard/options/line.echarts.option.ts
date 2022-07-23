import type { EChartsOption } from 'echarts'

interface IData {
  xLabels: string[]
  values: any[]
}

function getLineOption(data: IData) {
  const lineOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {
          show: true,
          readOnly: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data.xLabels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: data.values
      }
    ]
  }

  return lineOption
}

export default getLineOption
