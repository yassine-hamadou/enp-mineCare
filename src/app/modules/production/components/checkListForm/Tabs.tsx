import { Empty, Button, message, Steps, theme } from "antd";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { KTCard, KTCardBody } from "../../../../../_metronic/helpers";
import { CSSProperties, useState } from "react";
import { CheckListForm } from "./CheckList";
const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

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
  console.log("sections", sections)
  // const tabList = sections?.map((s: any, index: any) => {
  //   return {
  //     label: String(`${s.name}`).toUpperCase(),
  //     key: String(index),
  //     children: <CheckListForm sections={s} />,
  //   }
  // })



  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle: CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return sections?.length > 0 ? (
    <>
      <KTCard>
        <KTCardBody>
          <Steps current={current} items={items} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div
            style={{
              marginTop: 24,
            }}
          >
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button
                style={{
                  margin: '0 8px',
                }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
          </div>
        </KTCardBody>
      </KTCard>
    </>
  ) : (
    <>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description={
          <span><b>No sections found. Kindly setup new sections for the above service type.</b></span>
        }
      >
      </Empty>
    </>
  )
}

export {TabsTest}
