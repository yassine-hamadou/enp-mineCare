import {Table} from "antd";
import {useParams} from "react-router-dom";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {useQuery} from "react-query";
import {getBacklogs} from "../../../../../urls";
import {useAuth} from "../../../../auth";


const ViewBacklog = () => {
  const {fleetId} = useParams();

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

export {ViewBacklog};
