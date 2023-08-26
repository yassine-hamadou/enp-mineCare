import {Table} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {useQuery} from "react-query";
import {getBacklogs} from "../../../../../urls";
import {useAuth} from "../../../../auth";
import React from "react";


const ViewBacklog = () => {
    const {fleetId} = useParams();
    const navigate = useNavigate()
    const {tenant} = useAuth()
    const {data: backlogs, isLoading} = useQuery('backlog', () => getBacklogs(tenant))
    const columns: any = [
        {
            title: 'Equipment ID',
            dataIndex: 'equipmentId',
        },
        {
            title: 'Backlog Date',
            dataIndex: 'bdate',
            render: (bdate: any) => {
                return new Date(bdate).toUTCString()
            }
        },
        {
            title: 'Item',
            dataIndex: 'item',
        },
        {
            title: 'Note',
            dataIndex: 'note',
        },
        {
            title: 'Reference No',
            dataIndex: 'referenceId'
        },
        {
            title: 'Source',
            dataIndex: 'source'
        },
        {
            title: 'Down Type',
            dataIndex: 'downType'
        },
        {
            title: 'Priority',
            dataIndex: 'priority'
        },
    ]
    console.log(fleetId);
    console.log(backlogs?.data?.filter((backlog: any) => backlog.equipmentId === fleetId && backlog.status !== 'Completed'));

    return (
      <KTCard>
          <KTCardBody>
              <div className='row mb-0'>
                  <div className='mb-3'>
                      <h3 className='mb-0'>
                          <span className='text-danger'> {fleetId}</span>
                      </h3>
                  </div>
                  <div>
                      <button
                        className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary mb-3'
                        onClick={() => {
                            navigate(-1)
                        }}
                      >
                          <i className='la la-arrow-left'/>
                          Back
                      </button>

                  </div>
              </div>
              <Table
                columns={columns}
                dataSource={backlogs?.data?.filter((backlog: any) => backlog.equipmentId === fleetId && backlog.status !== 'Completed')}
                loading={isLoading}
                bordered
              />
          </KTCardBody>
      </KTCard>
    );
};

export default ViewBacklog
