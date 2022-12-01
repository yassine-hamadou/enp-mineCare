import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import { KTCard, KTCardBody, KTSVG } from "../../../../../../_metronic/helpers";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { ENP_URL } from "../../../../../urls";

export const CompartmentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: createCompartment } = useMutation(
    (dataToPost: any) => axios.post(
      `${ENP_URL}/Compartment`,
      dataToPost
    )
  );
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e: any) => {
    // setSearchText(e.target.value)
    // if (e.target.value === '') {
    //   loadData()
    // }
  };


  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a: any, b: any) => {
        if (a.id > b.id) {
          return 1;
        }
        if (b.id > a.id) {
          return -1;
        }
        return 0;
      }
    },
    {
      title: "Name of Compartment",
      dataIndex: "name",
      sorter: (a: any, b: any) => {
        if (a.name > b.name) {
          return 1;
        }
        if (b.name > a.name) {
          return -1;
        }
        return 0;
      }
    },

    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_: any, record: any) => (
        <Space size="middle">
          <a href="#" className="btn btn-light-warning btn-sm">Update</a>
          <a className="btn btn-light-danger btn-sm">Delete</a>
        </Space>
      )
    }
  ];

  function handleCancel() {
    setIsModalOpen(false);
  }


  function onFinish(formData: any) {
    setIsLoading(true);
    const dataToPost = {
      name: formData.Name
    };

  }

  return (
    <KTCard>
      <KTCardBody>
        <div className="d-flex justify-content-between">
          <Space style={{ marginBottom: 16 }}>
            <Input
              placeholder="Enter Search Text"
              type="text"
              allowClear
            />
            <Button type="primary">
              Search
            </Button>
          </Space>
          <Space style={{ marginBottom: 16 }}>
            <button type="button" className="btn btn-primary me-3" onClick={showModal}>
              <KTSVG path="/media/icons/duotune/arrows/arr075.svg" className="svg-icon-2" />
              Add
            </button>
            <button type="button" className="btn btn-light-primary me-3">
              <KTSVG path="/media/icons/duotune/arrows/arr078.svg" className="svg-icon-2" />
              Upload
            </button>
            <button type="button" className="btn btn-light-primary me-3">
              <KTSVG path="/media/icons/duotune/arrows/arr078.svg" className="svg-icon-2" />
              Export
            </button>
          </Space>
        </div>
        <Table columns={columns} bordered />
        <Modal
          title="Add Compartment"
          open={isModalOpen}
          onCancel={handleCancel}
          closable={true}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                form.submit();
              }}
            >
              Submit
            </Button>
          ]}
        >
          <Form
            form={form}
            name="control-hooks"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            title="Add Compartment"
            onFinish={onFinish}
          >
            <Form.Item name="Name" label="Compartment Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  );
};