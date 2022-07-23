import type { EChartsOption } from 'echarts'

interface IDate {
  name: string
  value: any
}

function getRoleOption(data: IDate[]) {
  const roleOption: EChartsOption = {
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
        radius: ['5%', '70%'],
        center: ['50%', '55%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: data
      }
    ]
  }

  return roleOption
}

export default getRoleOption
