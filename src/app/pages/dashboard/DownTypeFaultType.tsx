import {useQuery} from "react-query";
import axios from "axios";
import {ENP_URL} from "../../urls";
import {Column} from '@ant-design/plots';
import {useEffect, useState} from "react";

const DownTypeFaultType = () => {

  const [chartData, setChartData] = useState<any>([])
  const {data: listOfFaults} = useQuery('listOfFaults', () => {
    return axios.get(`${ENP_URL}/faultentriesapi`)
  })

  const {data: listOfDownTypes} = useQuery('listOfDownTypes', () => {
    return axios.get(`${ENP_URL}/vmfaltsapi`)
  })

  useEffect(() => {
    const dataFromApi: any = listOfDownTypes?.data?.map((item: any) => {
      const resolvedFaultsByDownType: any = listOfFaults?.data?.filter(
        (fault: any) => fault.downType.trim() === item.faultDesc.trim() && fault.status === 1
      )

      const downTimePerDownTypeHours = resolvedFaultsByDownType?.map((fault: any) => {
        return new Date(fault.wtimeEnd).getTime() - new Date(fault.downtime).getTime()
      })?.reduce((a: any, b: any) => a + b, 0) / 1000 / 60 / 60

      return {
        type: item.faultDesc,
        sales: Math.floor(downTimePerDownTypeHours)
      }
    })
    setChartData(dataFromApi)
  }, [listOfFaults, listOfDownTypes])
  console.log('dataFromASpi', chartData)
  const data: any = [
    {
      type: 'Apr',
      sales: 38,
    },
    {
      type: 'May',
      sales: 52,
    },
    {
      type: 'Jun',
      sales: 61,
    },
    {
      type: 'May',
      sales: 145,
    },
    {
      type: 'Jun',
      sales: 48,
    },
    {
      type: 'Jul',
      sales: 38,
    },
    {
      type: 'Aug',
      sales: 38,
    },
    {
      type: 'Sep',
      sales: 38,
    }, {
      type: 'Oct',
      sales: 382,
    }, {
      type: 'Nov',
      sales: 38,
    }, {
      type: 'Dec',
      sales: 38,
    }, {
      type: 'Jan',
      sales: 38,
    }, {
      type: 'Feb',
      sales: 82,
    }, {
      type: 'Mar',
      sales: 40,
    },
  ];

  const config = {
    data: chartData ? chartData : data,
    xField: 'type',
    yField: 'sales',
    meta: {
      type: {
        alias: 'b',
      },
      sales: {
        alias: 'a',
      },
    },
  };
  //@ts-ignore
  return (
    <>
      {/*@ts-ignore*/}
      <Column {...config} />
    </>
  );

}

export {DownTypeFaultType}
