import {Card} from 'antd'
import React, {useState} from 'react'
import {CheckListForm} from './CheckListForm'
import {CheckListForm2} from './CheckListForm2'
import {CheckListForm3} from './CheckListForm3'
import {CheckListForm5} from './CheckListForm5'
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";

const contentList: Record<string, React.ReactNode> = {
  tab1: (
    <>
      <CheckListForm />
    </>
  ),
  tab2: (
    <>
      <CheckListForm2 />
    </>
  ),
  tab3: (
    <>
      <CheckListForm3 />
    </>
  ),
  tab4: (
    <>
      <CheckListForm5 />
    </>
  ),
}

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
      key: `tab${index + 1}`,
      tab: String(`${s.name}`).toUpperCase(),
    }
  })


  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1')

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key)
  }

  return (
    <>
      <Card
        style={{width: '100%'}}
        // title="Card title"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key)
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  )
}

export {TabsTest}
