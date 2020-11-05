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

function EmployeeEdit(props) {
  const { openDrawerEdit, setOpenDrawerEdit, bodyEdit } = props;
  const [form] = Form.useForm();
  const handleOnCloseDrawer = () => {
    setOpenDrawerEdit(false);
  };

  const onFinish = async (value) => {
    const body = {
      ...value,
    };

    const id = "Employee_" + Date.now();
    console.log(typeof value.picture, "type");
    const storageRef = firebase.storage().ref("images-employee").child(id);
    if (typeof body.picture === "undefined") {
      const updateRef = firebase
        .firestore()
        .collection("employee")
        .doc(bodyEdit.key);
      updateRef
        .set({
          firstName: body.firstName,
          lastName: body.lastName,
          password: body.password,
          phone: body.phone,
          email: body.email,
          address: body.address,
          position: body.position,
          gender: body.gender,
          picture: bodyEdit.picture,
        })
        .then((docRef) => {
          handleOnCloseDrawer();
          notification.success({
            message: "Update success !!!!!",
            placement: "bottomLeft",
            style: { backgroundColor: "greenyellow" },
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      await storageRef.put(body.picture[0].originFileObj);
      console.log("Pic", body.picture[0].originFileObj);
      storageRef.getDownloadURL().then((url) => {
        console.log("Hêllo 12222");
        console.log("Hêllo 4343", body.picture[0].originFileObj);
        const updateRef = firebase
          .firestore()
          .collection("employee")
          .doc(bodyEdit.key);
        updateRef
          .set({
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
          .then((docRef) => {
            handleOnCloseDrawer();
            notification.success({
              message: "Update success !!!!!",
              placement: "bottomLeft",
              style: { backgroundColor: "greenyellow" },
            });
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
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
        title="Update customer"
        visible={openDrawerEdit}
        onClose={handleOnCloseDrawer}
        placement="right"
        maskClosable={true} /// Form nhấn bên ngoài để đóng ngăn
      >
        <Form
          key={bodyEdit.key}
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
            initialValue={bodyEdit.firstName}
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
            initialValue={bodyEdit.lastName}
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
            initialValue={bodyEdit.password}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Gender"
            name="gender"
            initialValue={bodyEdit.gender}
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
            initialValue={bodyEdit.phone}
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
            initialValue={bodyEdit.email}
            hasFeedback
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            initialValue={bodyEdit.address}
            hasFeedback
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Position"
            name="position"
            initialValue={bodyEdit.position}
            rules={[{ required: true, message: "Please input your type!" }]}
          >
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Employee">employee</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Fragment>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button htmlType="reset" onClick={() => form.resetFields()}>
                reset
              </Button>
            </Fragment>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default EmployeeEdit;
