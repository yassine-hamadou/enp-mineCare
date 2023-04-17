import React, {useEffect, useRef} from 'react'
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


const BarChart2: React.FC<Props> = ({className, chartColor, chartHeight}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

  const {data: listOfFaults} = useQuery('listOfFaults', () => {
    return axios.get(`${ENP_URL}/faultentriesapi`)
  })

  const {data: listOfDownTypes} = useQuery('listOfDownTypes', () => {
    return axios.get(`${ENP_URL}/vmfaltsapi`)
  })
  const category: any = []
  const faults: any = []
  const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
    const labelColor = getCSSVariableValue('--kt-gray-500')
    const borderColor = getCSSVariableValue('--kt-gray-200')
    const secondaryColor = getCSSVariableValue('--kt-gray-300')
    const baseColor = getCSSVariableValue('--kt-' + chartColor)

    console.log('listOfDownTypes', faults)
    console.log('listOfDownTypes', category)
    return {
      series: [
        {
          name: 'Total',
          data: faults ? faults : []
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
        categories: category ? category : [],
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


  listOfDownTypes?.data?.map((item: any) => {
    const resolvedFaultsByDownType: any = listOfFaults?.data?.filter(
      (fault: any) => fault.downType.trim() === item.faultDesc.trim() && fault.status === 1
    )

    const downTimePerDownTypeHours = resolvedFaultsByDownType?.map((fault: any) => {
      return new Date(fault.wtimeEnd).getTime() - new Date(fault.downtime).getTime()
    })?.reduce((a: any, b: any) => a + b, 0) / 1000 / 60 / 60

    category.push(item.faultDesc)
    faults.push(Math.floor(downTimePerDownTypeHours))
  })
  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode, faults, category])
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
            <span className='fw-bold text-gray-800 d-block fs-3'>Downtime By Fault Type</span>

            {/*<span*/}
            {/*  className='text-gray-400 fw-semibold'><strong>{monthArray[todayDate.getMonth()]} {todayDate.getFullYear()}</strong> back to <strong>{monthArray[lastDate.getMonth()]} {lastDate.getFullYear()}</strong></span>*/}
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


export {BarChart2}
