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
  InputNumber,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import firebase from "../../../../../utils/firebase";

function EmployeeAdd(props) {
  const { openDrawer, setOpenDrawer } = props;
  const [form] = Form.useForm();
  const handleOnCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const onFinish = async (value) => {
    // form.resetFields();
    console.log("value", value);
    const body = {
      ...value,
      key: "",
    };
    const id = "Employee_" + Date.now();
    const storageRef = firebase.storage().ref("images-employee").child(id);
    const tutorialsRef = firebase.firestore().collection("/employee");
    if (body.key === "") {
      await storageRef.put(body.picture[0].originFileObj);
      storageRef.getDownloadURL().then((url) => {
        console.log("url", url);
        tutorialsRef
          .add({
            createDay: Date.now(),
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password,
            phone: body.phone,
            email: body.email,
            address: body.address,
            position: body.position,
            gender: body.gender,
            picture: url,
          })
          .then(function (docRef) {
            form.resetFields();
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

  return (
    <div>
      <Drawer
        width={512}
        title="Create customer"
        visible={openDrawer}
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
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            hasFeedback
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please input your type!" }]}
          >
            <Select>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Phone "
            name="phone"
            hasFeedback
            rules={[
              {
                type: "number",
                min: 100000000,
                max: 999999999,
                message: "Please input your phone 10 number",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            hasFeedback
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please input your type!" }]}
          >
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Employee">employee</Select.Option>
            </Select>
          </Form.Item>
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
                  Create
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

export default EmployeeAdd;
