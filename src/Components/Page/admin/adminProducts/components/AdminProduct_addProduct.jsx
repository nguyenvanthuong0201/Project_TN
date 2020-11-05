import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Checkbox,
  Drawer,
  Input,
  Select,
  Upload,
  Divider,
  message,
  notification,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { sizeAdminProduct } from "../../../../../data/dataAdminProduct";
import firebase from "../../../../../utils/firebase";

function AddProduct(props) {
  const { drawer, setDrawer } = props;
  const [form] = Form.useForm();

  const handleOnCloseDrawer = () => {
    setDrawer(false);
  };

  const onFinish = async (value) => {
    const body = {
      ...value,
      key: "",
    };
    console.log("body", body);
    const id = "Product_" + Date.now();
    const storageRef = firebase.storage().ref("images-product").child(id);
    const tutorialsRef = firebase.firestore().collection("/product");
    if (body.key === "") {
      await storageRef.put(body.picture[0].originFileObj);
      storageRef.getDownloadURL().then((url) => {
        console.log("url", url);
        tutorialsRef
          .add({
            createDate: Date.now(),
            title: body.title,
            type: body.type,
            size: body.size,
            sale: body.sale,
            cost: body.cost,
            amount: body.amount,
            option: body.option,
            picture: url,
          })
          .then(function (docRef) {
            // form.resetFields();
            notification.success({
              message: "Create success !!!!!",
              placement: "bottomLeft",
              style: { backgroundColor: "greenyellow" },
            });
          })
          .catch(function (error) {
            console.error("Error adding Tutorial: ", error);
          });
      });
    }
  };

  const onFinishFailed = (onFinishFailed) => {
    console.log("onFinishFailed", onFinishFailed);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onChange = (e) => {
    let dot = e.target.v;
  };

  return (
    <div>
      <Drawer
        width={512}
        title="Add Product"
        visible={drawer}
        onClose={handleOnCloseDrawer}
        placement="right"
        maskClosable={true} /// Form nhấn bên ngoài để đóng ngăn
      >
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="horizontal" // Form chỉnh các lable va input
        >
          <Form.Item
            name="picture"
            label="Picture"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="logo"
              listType="picture"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please input your type!" }]}
          >
            <Select>
              <Select.Option value="Shirt">Shirt</Select.Option>
              <Select.Option value="Pants">Pants</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Option"
            name="option"
            rules={[{ required: true, message: "Please input your Option!" }]}
          >
            <Select>
              <Select.Option value="New">New</Select.Option>
              <Select.Option value="Promotion">Promotion</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Amount "
            name="amount"
            rules={[{ type: "number", min: 0, max: 999 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Sale "
            name="sale"
            rules={[{ type: "number", min: 0, max: 999999999999999 }]}
          >
            <InputNumber suffix="₫" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Cost"
            name="cost"
            rules={[{ type: "number", min: 0, max: 999999999999999 }]}
          >
            <InputNumber suffix="₫" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Size" name="size">
            <Checkbox.Group options={sizeAdminProduct} />
          </Form.Item>
          <Divider />

          <Form.Item shouldUpdate={true}>
            {() => (
              <Fragment>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    form.getFieldsError().filter(({ errors }) => errors.length)
                      .length
                  }
                >
                  Add
                </Button>
                {/* Form button reset */}
                <Button htmlType="reset" onClick={() => form.resetFields()}>
                  reset
                </Button>
              </Fragment>
            )}
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default AddProduct;
