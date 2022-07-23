import type { EChartsOption } from 'echarts'

interface IDate {
  name: string
  value: any
}

function getPieOption(data: IDate[]) {
  const pieOption: EChartsOption = {
    tooltip: {
      trigger: 'item'
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
    legend: {
      orient: 'horizontal',
      right: '20%'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        center: ['50%', '55%'],
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  return pieOption
}

export default getPieOption
