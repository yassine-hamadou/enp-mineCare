import { Card } from 'antd';
import React, { useState } from 'react';
import { CheckListForm } from './CheckListForm';
import { CheckListForm2 } from './CheckListForm2';
import { CheckListForm3 } from './CheckListForm3';
import { CheckListForm4 } from './CheckListForm4';
import { CheckListForm5 } from './CheckListForm5';

const tabList = [
  {
    key: 'tab1',
    tab: String('Section 1').toUpperCase(),
  },
  {
    key: 'tab2',
    tab: String('Section 2').toUpperCase(),
  },
  {
    key: 'tab3',
    tab: String('Section 3').toUpperCase(),
  },
  {
    key: 'tab4',
    tab: String('Section 5').toUpperCase(),
  },
//   {
//     key: 'tab5',
//     tab: String('Section 1').toUpperCase(),
//   },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <>
    <CheckListForm/>
  </>,
  tab2: <>
  <CheckListForm2/>
</>,
  tab3: <>
  <CheckListForm3/>
</>,
//   tab4: <>
//   <CheckListForm4/>
// </>,
  tab4: <>
  <CheckListForm5/>
</>,
};


const TabsTest: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
//   const [activeTabKey2, setActiveTabKey2] = useState<string>('TabsTest');

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };


  return (
    <>
      <Card
        style={{ width: '100%'}}
        // title="Card title"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={key => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      
      
    </>
  );
};

export {TabsTest};