import { Empty, Button, message, Steps, theme } from "antd";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { KTCard, KTCardBody } from "../../../../../_metronic/helpers";
import React, { CSSProperties, useState } from "react";
import { CheckListForm } from "./CheckListForm";


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
  const steps = sections?.map((s: any, index: any) => {
    return {
      title: String(`${s.name}`).toUpperCase(),
      content: <CheckListForm sections={s} />,
    }
  })



  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((step: any) => ({
    key: step.title,
  }));
  const contentStyle: CSSProperties = {
    lineHeight: '260px',
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // borderTop: `1px dashed ${token.colorBorder}`,
    paddingTop: 20,
    marginTop: 20,
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
