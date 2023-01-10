import { Tabs } from "antd";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { CheckListForm } from "./CheckListForm";
import { KTCard, KTCardBody } from "../../../../../_metronic/helpers";

const TabsTest: React.FC = () => {
  //Get the service type with useQueryClient
  const AllServiceTypes: any = useQueryClient().getQueryData("serviceType");
  console.log("serviceType", AllServiceTypes);
  //Get the service type id from the url
  const params = useParams()
  const serviceId: any = params.serviceId
  //Get the service type name from the service type id
  const serviceType = AllServiceTypes?.data.find((s: any) => s.id === parseInt(serviceId))
  const sections = serviceType?.sections

  const tabList = sections?.map((s: any, index: any) => {
    return {
      label: String(`${s.name}`).toUpperCase(),
      key: String(index),
      children: <CheckListForm sections={s} />
    }
  })

  return (
    <>
      <KTCard>
        <KTCardBody>
          <Tabs
            defaultActiveKey="1"
            items={tabList}
          />
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {TabsTest}
