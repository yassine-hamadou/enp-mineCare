import React, {useEffect, useRef, useState} from 'react'
import {useThemeMode} from '../../../_metronic/partials'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSSVariableValue} from '../../../_metronic/assets/ts/_utils'
import {useQuery} from "react-query";
import axios from "axios";
import {ENP_URL} from '../../urls';

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}


const BarChart: React.FC<Props> = ({className, chartColor, chartHeight}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const data: any = []
  const categories: any = []
  const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const {data: listOfFaults} = useQuery('listOfFaults', () => {
    return axios.get(`${ENP_URL}/faultentriesapi`)
  })
  // const [categories, setCategories]: any = useState([])
  // const [data, setData]: any = useState([])


  console.log('data', data)
  console.log('categories', categories)
  console.log('slice', data.slice(-12))
  const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
    const labelColor = getCSSVariableValue('--kt-gray-500')
    const borderColor = getCSSVariableValue('--kt-gray-200')
    const secondaryColor = getCSSVariableValue('--kt-gray-300')
    const baseColor = getCSSVariableValue('--kt-' + chartColor)

    return {
      series: [
        {
          name: 'Total',
          data: data?.slice(-12)
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: chartHeight,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          borderRadius: 5,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: categories?.slice(-12),
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      fill: {
        type: 'solid',
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val) {
            return `${val} Hours`
          },
        },
      },
      colors: [baseColor, secondaryColor],
      grid: {
        padding: {
          top: 10,
        },
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    }
  }
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }
    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight))
    if (chart) {
      chart.render()
    }

    return chart
  }

  //from now to last 12 months
  for (let i = 0; i < 12; i++) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const monthString = month < 10 ? `0${month}` : month
    const dateString = `${year}-${monthString}`
    // setCategories([...categories, monthArray[new Date(dateString).getMonth()]])
    categories.push(monthArray[new Date(dateString).getMonth()])
    const faultDuringTheMonth = listOfFaults?.data.filter((item: any) => {
      if (item.status === 1 && item.downtime?.includes(dateString)) {
        return item
      }
    })
    const TDowntimeMillisecond = faultDuringTheMonth?.map((item: any) => new Date(item.wtimeEnd).getTime() - new Date(item.downtime).getTime()).reduce(
      (a: any, b: any) => a + b, 0
    )
    data.push(Math.floor(TDowntimeMillisecond / 1000 / 60 / 60))
  }
  useEffect(() => {

    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode, categories, data])
  const todayDate = new Date()
  const lastDate = new Date()
  lastDate.setMonth(todayDate.getMonth() - 11)

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0 d-flex justify-content-between flex-column overflow-hidden'>
        {/* begin::Hidden */}
        <div className='d-flex flex-stack flex-wrap flex-grow-1 px-9 pt-9 pb-3'>
          <div className='me-2'>
            <span className='fw-bold text-gray-800 d-block fs-3'>Monthly Downtime</span>

            <span
              className='text-gray-400 fw-semibold'><strong>{monthArray[todayDate.getMonth()]} {todayDate.getFullYear()}</strong> back to <strong>{monthArray[lastDate.getMonth()]} {lastDate.getFullYear()}</strong></span>
          </div>

          <div className={`fw-bold fs-3 text-${chartColor}`}>{
          }</div>
        </div>
        {/* end::Hidden */}

        {/* begin::Chart */}
        <div ref={chartRef} className='mixed-widget-10-chart'></div>
        {/* end::Chart */}
      </div>
    </div>
  )
}


export {BarChart}
