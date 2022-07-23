import type { EChartsOption } from 'echarts'
import { registerMap } from 'echarts'

import { chinaMap, convertData } from '../data'

interface IData {
  name: string
  value: any
}

registerMap('chinaMap', chinaMap)

function getMapOption(data: IData[]) {
  const mapOption: EChartsOption = {
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
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
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: 'rgb(51, 51, 51)'
      }
    },
    geo: {
      map: 'chinaMap',
      roam: 'scale',
      emphasis: {
        areaColor: '#f4cccc',
        borderColor: 'rgb(9, 54, 95)',
        itemStyle: {
          areaColor: '#f4cccc'
        }
      }
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        type: 'map',
        map: 'chinaMap',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
  }

  return mapOption
}

export default getMapOption
