import React, {useState} from 'react';
import {Badge, Button, DatePicker, Form, Input, message, Modal, Popconfirm, Select, Space, Table, Tabs} from "antd";
import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import TextArea from "antd/lib/input/TextArea";
import {
  deleteBacklog,
  getBacklogs,
  getDowntypes,
  getEquipment,
  getPriority,
  getSources,
  postBacklogs,
  putBacklog
} from "../../../../../urls";
import {useAuth} from "../../../../auth";
import {useMutation, useQuery, useQueryClient} from "react-query";
import DevexpressDashboardComponent from "../../../../../pages/dashboard/DevexpressDashboardComponent";
import dayjs from "dayjs";


const Backlog = () => {
    const {tenant} = useAuth()
    const Option = Select.Option
    const [form] = Form.useForm()
    const queryClient = useQueryClient()
    let columns: any[] = [
        {
            title: 'Equipment ID',
            dataIndex: 'equipmentId',
        },
        {
            title: 'BDate',
            dataIndex: 'bdate',
            render: (text: any, record: any) => (
              new Date(record?.bdate)?.toDateString()
            ),
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
            dataIndex: 'referenceId',

        },
        {
            title: 'Source',
            dataIndex: 'source',

        },
        {
            title: 'Down Type',
            dataIndex: 'downType',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            fixed: "right",
            width: 205,
            render: (text: any, record: any) => (
              <Space size="middle">
                  <button
                    className='btn btn-light-success btn-sm'
                    onClick={() => handleCompleteClick({...record})}
                  >
                      Complete
                  </button>
                  <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record)}>
                      <button className='btn btn-light-danger btn-sm'>Delete</button>
                  </Popconfirm>
              </Space>
            ),
        }
    ];
    let completedColumns: any[] = [
        {
            title: 'Equipment ID',
            dataIndex: 'equipmentId',
        },
        {
            title: 'BDate',
            dataIndex: 'bdate',

            render: (text: any, record: any) => (
              new Date(record?.bdate)?.toDateString()
            ),
        },
        {
            title: 'CDate',
            dataIndex: 'cdate',

            render: (text: any, record: any) => (
              new Date(record?.cdate)?.toDateString()
            ),
        },
        {
            title: 'Item',
            dataIndex: 'item',
            sorter: (a: any, b: any) => {
                if (a.item > b.item) {
                    return 1
                }
                if (b.item > a.item) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'Note',
            dataIndex: 'note',
            sorter: (a: any, b: any) => {
                if (a.note > b.note) {
                    return 1
                }
                if (b.note > a.note) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            sorter: (a: any, b: any) => {
                if (a.comment > b.comment) {
                    return 1
                }
                if (b.comment > a.comment) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'Reference No',
            dataIndex: 'referenceId',
            sorter: (a: any, b: any) => {
                if (a.referenceId > b.referenceId) {
                    return 1
                }
                if (b.referenceId > a.referenceId) {
                    return -1
                }
                return 0
            }
        },
        {

            title: 'Source',
            dataIndex: 'source',
            sorter: (a: any, b: any) => {
                if (a.source > b.source) {
                    return 1
                }
                if (b.source > a.source) {
                    return -1
                }
                return 0
            }

        },
        {
            title: 'Down Type',
            dataIndex: 'downType',
            sorter: (a: any, b: any) => {
                if (a.downType > b.downType) {
                    return 1
                }
                if (b.downType > a.downType) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            sorter: (a: any, b: any) => {
                if (a.priority > b.priority) {
                    return 1
                }
                if (b.priority > a.priority) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                if (a.status > b.status) {
                    return 1
                }
                if (b.status > a.status) {
                    return -1
                }
                return 0
            }
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [isCompleting, setIsCompleting] = useState(false)

    const {data: equipmentData, isLoading: equipmentIsLoading} = useQuery(
      'equipment', () => getEquipment(tenant))
    const {data: priorityData, isLoading: priorityIsLoading} = useQuery(
      'priority', () => getPriority(tenant))
    const {data: sourceData, isLoading: sourceIsLoading} = useQuery(
      'source', () => getSources(tenant))
    const {data: downTypeData} = useQuery('downtype', () => getDowntypes(tenant))
    console.log("source data", sourceData)
    console.log("equipment data", equipmentData)

    const {data: backlogData, isLoading: backlogIsLoading} = useQuery(
      'backlog', () => getBacklogs(tenant))
    const {mutate: addBacklog} = useMutation('addBacklog',
      (data) => postBacklogs(data, tenant), {
          onSuccess: () => {
              setIsModalOpen(false)
              message.success('Backlog added successfully')
              queryClient.invalidateQueries('backlog')
              setSubmitLoading(false)
          },
          onError: () => {
              message.error('Error adding backlog, Please try again')
              setSubmitLoading(false)
          }
      })
    const {mutate: updateBacklog} = useMutation('updateBacklog', putBacklog,
      {
          onSuccess: () => {
              message.success('Backlog updated successfully')
              queryClient.invalidateQueries('backlog')
              setIsModalOpen(false)
              setSubmitLoading(false)
              form.resetFields()
          },
          onError: () => {
              message.error('Error updating backlog, Please try again')
              setSubmitLoading(false)
          }
      })
    const {mutate: removeBacklog} = useMutation('deleteBacklog', deleteBacklog, {
        onSuccess: () => {
            message.success('Backlog deleted successfully')
            queryClient.invalidateQueries('backlog')
        },
        onError: () => {
            message.error('Error deleting backlog, Please try again')
        }
    })
    console.log("backlog data", backlogData)
    const onFinish = async (values: any) => {
        setSubmitLoading(true)
        isCompleting ? updateBacklog({...values, tenantId: tenant}) : addBacklog(values)
    }
    console.log("backlog data", backlogData?.data?.filter((item: any) => item?.status === 'Completed'))
    const showModal = () => {
        setIsModalOpen(true)
    }

    function handleCancel() {
        form.resetFields()
        setIsModalOpen(false)
        setIsCompleting(false)
    }

    function handleCompleteClick(record: any) {
        setIsCompleting(true)
        setIsModalOpen(true)
        form.setFieldsValue({
            ...record,
            bdate: dayjs(record?.bdate),
            id: record?.id,
            cdate: dayjs(new Date()),
            status: "Completed",
        })
    }

    function handleDelete(record: any) {
        removeBacklog(record?.id)
    }

    return (
      <KTCard>
          <KTCardBody>
              <Tabs
                defaultActiveKey='1'
                items={[
                    {
                        label: <Badge count={0}><span
                          className='me-4'>All Backlogs</span></Badge>,
                        key: '1',
                        children: (
                          <>
                              <div className='d-flex justify-content-between'>
                                  <Space style={{marginBottom: 16}}>
                                      <Input
                                        placeholder='Enter Search Text'
                                        // onChange={handleInputChange}
                                        type='text'
                                        allowClear
                                      />
                                  </Space>
                                  <Space style={{marginBottom: 16}}>
                                      <button type='button' className='btn btn-primary me-3'
                                              onClick={() => showModal()}>
                                          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                                          Add
                                      </button>
                                  </Space>
                              </div>
                              <Table
                                columns={columns}
                                dataSource={backlogData?.data?.filter((item: any) => item?.status !== 'Completed')}
                                bordered
                                loading={backlogIsLoading}
                                rowKey={(record: any) => record?.id}
                                scroll={{x: 2000}}
                                pagination={{
                                    defaultPageSize: 10,
                                }}
                              />
                          </>
                        ),
                    },
                    {
                        label: <Badge style={{backgroundColor: '#52c41a'}} count={0}><span
                          className='me-4'>Completed Backlog</span></Badge>,
                        key: '2',
                        children: (
                          <>
                              <Table
                                columns={completedColumns}
                                dataSource={backlogData?.data?.filter((item: any) => item?.status === 'Completed')}
                                bordered
                                rowKey={(record: any) => record?.id}
                                scroll={{x: 1500}}
                                pagination={{
                                    defaultPageSize: 10,
                                }}
                              />
                          </>
                        ),
                    },
                    {
                        label: <Badge style={{backgroundColor: '#faad14'}} count={0}><span
                          className='me-4'>Analysis</span></Badge>,
                        key: '3',
                        children: (
                          <>
                              <DevexpressDashboardComponent dashboardId={'backlogs'}/>
                          </>
                        ),

                    }
                ]}
              />
              <Modal
                title={isCompleting ? 'Complete Backlog' : 'Add Backlog'}
                open={isModalOpen}
                onCancel={handleCancel}
                closable={true}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                      key='submit'
                      htmlType='submit'
                      type='primary'
                      loading={submitLoading}
                      onClick={() => {
                          form.submit()
                      }}
                    >
                        Submit
                    </Button>,
                ]}
              >
                  <Form
                    form={form}
                    name='control-hooks'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 14}}
                    title={isCompleting ? 'Update Backlog' : 'Add Backlog'}
                    onFinish={onFinish}
                    layout={'horizontal'}
                  >
                      <Form.Item name='id' label='ID' hidden={true}>
                          <Input/>
                      </Form.Item>
                      <Form.Item name='equipmentId' label='Equipment ID'>
                          <Select
                            showSearch
                            placeholder='Select an equipment'
                          >
                              {
                                  equipmentData?.data?.map((equipment: any) => (
                                    <Option value={equipment.equipmentId}>{equipment.equipmentId}</Option>
                                  ))
                              }
                          </Select>
                      </Form.Item>
                      <Form.Item name='bdate' label='Backlog Date'>
                          <DatePicker showTime/>
                      </Form.Item>
                      <Form.Item name='item' label='Item' rules={[{required: true}]}>
                          <Input/>
                      </Form.Item>
                      <Form.Item name='note' label='Note' rules={[{required: true}]}>
                          <Input/>
                      </Form.Item>
                      {isCompleting && (
                        <Form.Item name='comment' label='Comment' rules={[{required: true}]}>
                            <TextArea/>
                        </Form.Item>
                      )}
                      <Form.Item name='referenceId' label='Reference No'>
                          <Input/>
                      </Form.Item>
                      {isCompleting && (
                        <Form.Item name='status' label='Status'>
                            <Input/>
                        </Form.Item>
                      )}
                      {isCompleting && (
                        <Form.Item name='cdate' label='Completion Date'>
                            <DatePicker showTime/>
                        </Form.Item>
                      )}
                      <Form.Item name='priority' label='Priority'>
                          <Select
                            showSearch
                            placeholder='Select a priority'
                          >
                              {priorityData?.data?.map((priority: any) => (
                                <Option value={priority?.priorityId}>{priority.name}</Option>
                              ))}
                          </Select>
                      </Form.Item>
                      <Form.Item name='source' label='Source'>
                          <Select
                            showSearch
                            placeholder='Select a source'
                          >
                              {sourceData?.data?.map((source: any) => (
                                <Option value={source?.id}>{source.name}</Option>
                              ))}
                          </Select>
                      </Form.Item>
                      <Form.Item name='downType' label='Down Type'>
                          <Select
                            showSearch
                            placeholder='Select a down type'
                          >
                              {downTypeData?.data?.map((downType: any) => (
                                <Option value={downType?.id}>{downType.name}</Option>
                              ))}
                          </Select>
                      </Form.Item>
                  </Form>
              </Modal>
          </KTCardBody>
      </KTCard>
    );
};

export default Backlog;
