import {Card} from 'antd'
import React, {useState} from 'react'
import {CheckListForm} from './CheckListForm'
import {CheckListForm2} from './CheckListForm2'
import {CheckListForm3} from './CheckListForm3'
import {CheckListForm5} from './CheckListForm5'

const tabList = [
  {
    key: 'tab1',
    tab: String("Section '1' - ENGINE").toUpperCase(),
  },
  {
    key: 'tab2',
    tab: String("Section '2' - TRANSMISSION/HYDRAULIC/AXLES").toUpperCase(),
  },
  {
    key: 'tab3',
    tab: String("Section '3' - BODY/FRAME").toUpperCase(),
  },
  {
    key: 'tab4',
    tab: String("SECTION '5' - OPERATION/CAP").toUpperCase(),
  },
]

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
