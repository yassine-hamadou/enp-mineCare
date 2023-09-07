import {Input, Space, Table} from 'antd';
import React, {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getAllEquipmentsHoursEntryPmReading, getEquipment} from "../../../../../urls";
import {getTenant, useAuth} from "../../../../auth";
import {calculateAverageDailyUsage} from "../../equipment-register/calculateAverageDailyUsage";
import {getPMObjects} from "../../setup/service/sequence/getPM";
import dayjs from "dayjs";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";

const Prediction = () => {
    const {tenant} = useAuth();
    const {
        data: equipmentData,
        isLoading: equipmentDataLoading
    } = useQuery('equipments', () => getEquipment(getTenant()));

    /////////////////////////////////////////////////////
    /////////////////////Search//////////////////////////
    /////////////////////////////////////////////////////
    const [gridData, setGridData] = useState([])
    const [beforeSearch, setBeforeSearch] = useState([])
    useEffect(() => {
        const data = equipmentData?.data ? equipmentData?.data?.map((equipment: any) => {
            return {
                ...equipment,
                latestHourFromPM: getEquipmentHoursEntry2?.data?.filter((equipmentHour: any) => {
                    return equipmentHour?.fleetId?.trim() === equipment?.equipmentId?.trim()
                }) ?? undefined
            }
        }) : []
        setGridData(data)
        setBeforeSearch(data)
    }, [equipmentData?.data])

    const globalSearch = (searchValue: string) => {
        //searchValue is the value of the search input
        const searchResult = beforeSearch?.filter((item: any) => {
            return (
              Object.values(item).join('').toLowerCase().includes(searchValue?.toLowerCase())
            )
        })//search the grid data
        setGridData(searchResult) //set the grid data to the search result
    }
    const handleInputChange = (e: any) => {
        globalSearch(e.target.value)
        if (e.target.value === '') {
            setGridData(beforeSearch)
        }
    }
    /////////////////////////////////////////////////////
    /////////////////////Search//////////////////////////
    /////////////////////////////////////////////////////

    const {
        data: getEquipmentHoursEntry2,
        isLoading: equipHourLoading
    } = useQuery('getEquipmentLatestHour', () => getAllEquipmentsHoursEntryPmReading(tenant));
    console.log('getEquipmentHoursEntry2', getEquipmentHoursEntry2)

    const pmIntervalColumns: any = [
        {
            title: 'Equipment ID',
            dataIndex: 'equipmentId',
            sorter: (a: any, b: any) => {
                if (a.equipmentId > b.equipmentId) {
                    return 1
                }
                if (b.equipmentId > a.equipmentId) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'Current Reading',
            dataIndex: 'hoursEntries',
            render: (hoursEntries: any) => hoursEntries[0]?.currentReading ?? 0
        },
        {
            title: 'Hours Worked Since Last PM',
            // dataIndex: 'hoursEntries',
            render: (record: any) => {
                console.log('record in hours', record)
                const latestHourFromNormalReading = record?.hoursEntries[0]?.currentReading ?? 0;
                // const latestHourFromPM = getEquipmentLatestHour?.data[0]?.currentReading
                console.log('latest hour from normal reading', latestHourFromNormalReading)

                const latestHourFromPM = record?.latestHourFromPM[0]?.currentReading;

                const hoursWorkedSinceLastPM = latestHourFromNormalReading - latestHourFromPM
                if (isNaN(hoursWorkedSinceLastPM) || isNaN(latestHourFromPM)) {
                    return <span className={'badge badge-danger'}>No PM Yet!</span> //No Initial Reading
                }
                if (hoursWorkedSinceLastPM < 0) {
                    return <span className={'badge badge-danger'}>Awaiting Latest Reading Update!</span>
                }
                return <span className={'badge badge-success'}>{hoursWorkedSinceLastPM}</span>
            }
        },
        {
            title: 'Average Daily Usage',
            render: (record: any) => {
                const averageDailyUsage = calculateAverageDailyUsage(record, record?.latestHourFromPM);
                if (isNaN(averageDailyUsage)) {
                    return <span className={'badge badge-danger'}>Invalid!</span>
                } else if (averageDailyUsage < 0) {
                    return <span className={'badge badge-danger'}>
                        Latest Reading Not Updated!
                    </span>
                }
                  //if average is infinity then hoursWorkedSinceLastPM / hoursSinceLastPM is a division by zero,
                // so we wait till hoursSinceLastPM becomes more than zero meaning waiting 1hour later
                else if (averageDailyUsage === Infinity) {
                    return <span className={'badge badge-light-danger'}>
                        Not available at the moment!
                    </span>
                }
                return <span className={'badge badge-success'}>{averageDailyUsage.toFixed(2)}</span>
            }
        },

        // {
        //     title: 'Incoming Planned Maintenance',
        //     render: (record: any) => {
        //         const latestHour = record?.latestHourFromPM;
        //         const averageDailyUsage = calculateAverageDailyUsage(record, latestHour);
        //         if (isNaN(averageDailyUsage)) {
        //             return <span className={'badge badge-danger'}>Invalid!</span>
        //         }
        //         const pmObjects = getPMObjects(record?.hoursEntries[0]?.currentReading, record?.model?.services?.map((service: any) => {
        //               return {
        //                   name: service?.name,
        //                   hours: service?.intervalForPm,
        //               }
        //           })
        //         );
        //
        //         return pmObjects?.predictedPm?.name ?
        //           <span className={'badge badge-success'}>{pmObjects?.predictedPm?.name}</span> :
        //           <span className={'badge badge-danger'}>No Service Cycle Setup</span>;
        //     }
        // },
        {
            title: 'Estimated Maintenance Date',
            render: (record: any) => {
                const latestHour = record?.latestHourFromPM;
                console.log('latest hour', latestHour);
                const averageDailyUsage = calculateAverageDailyUsage(record, latestHour);
                if (isNaN(averageDailyUsage)) {
                    return <span className={'badge badge-danger'}>Invalid!</span>
                } else if (averageDailyUsage < 0) {
                    return <span className={'badge badge-danger'}>
                       Awaiting Latest Reading Update!
                    </span>
                }
                const pmObjects = getPMObjects(record?.hoursEntries[0]?.currentReading, record?.model?.services?.map((service: any) => {
                      return {
                          name: service?.name,
                          hours: service?.intervalForPm,
                      }
                  })
                );
                const serviceCycle = record?.model?.services?.map((service: any) => {
                    return {
                        name: service?.name,
                        hours: service?.intervalForPm,
                    }
                })
                const currentReading = record?.hoursEntries[0]?.currentReading;
                let nextPMReading;

                for (let i = currentReading; getPMObjects(i, serviceCycle)?.hours === pmObjects?.hours; i++) {
                    nextPMReading = i;
                }
                console.log('pm objects', pmObjects);

                //calculate number of days to reach to the nextPMReading based on the averageDailyUsage
                const daysToNextPMReading = (nextPMReading - currentReading) / averageDailyUsage;
                console.log('days to next pm reading', daysToNextPMReading);
                const estimatedMaintenanceDate = dayjs().add(daysToNextPMReading, 'day');
                return pmObjects?.predictedPm?.name ?
                  <div>
                      <span>{`${dayjs(estimatedMaintenanceDate)?.format(
                        'DD/MM/YYYY'
                      )}`}</span>&nbsp;
                      <span className={'badge badge-success'}>{`at ${nextPMReading + 1}`}</span>
                  </div> :
                  <span className={'badge badge-danger'}>No Service Cycle Setup</span>;
            }
        },
    ]

    return (
      <KTCard>
          <KTCardBody>
              <div className='d-flex justify-content-between'>
                  <Space style={{marginBottom: 16}}>
                      <Input
                        placeholder='Enter Search Text'
                        onChange={handleInputChange}
                        type='text'
                        allowClear
                      />
                  </Space>
              </div>
              <Table
                columns={pmIntervalColumns}
                // dataSource={ equipmentData?.data?.map((equipment: any) => {
                //     return {
                //         ...equipment,
                //         latestHourFromPM: getEquipmentHoursEntry2?.data?.filter((equipmentHour: any) => {
                //             return equipmentHour?.fleetId?.trim() === equipment?.equipmentId?.trim()
                //         }) ?? undefined
                //     }
                // })}
                dataSource={gridData}
                loading={equipmentDataLoading || equipHourLoading}
                rowKey={(record: any) => record?.equipmentId}
              />
          </KTCardBody>
      </KTCard>
    );
};

export default Prediction;
