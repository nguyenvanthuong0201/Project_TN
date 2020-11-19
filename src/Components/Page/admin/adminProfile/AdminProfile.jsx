import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  PageHeader,
  Row,
  Form,
  Radio,
} from "antd";
import { useSelector } from "react-redux";
import AvatarProfile from "./component/Avatar";
import { motion } from "framer-motion";
import { pageAnimate, pageTransitionX } from "../../../../data/transition";

AdminProfile.propTypes = {};

function AdminProfile(props) {
  const userLogin = useSelector((state) => state.reLogin);
  const [update, setUpdate] = useState(true);
  const onFinish = (value) => {
    setUpdate(true);
  };
  const onFinishFailed = (value) => {};

  return (
    <motion.div
      initial="initial"
      exit="out"
      animate="in"
      variants={pageTransitionX}
      transition={pageAnimate}
    >
      <Card style={{ borderRadius: "10px" }} size="small">
        <PageHeader
          title="MY PROFILE"
          subTitle="(Manage profile information for account security)"
        />
        <hr />
        {userLogin && (
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical" // Form chỉnh các lable va input
          >
            <Row gutter={[32, 0]}>
              <Col xs={24} md={24} lg={16} xl={16}>
                <Form.Item
                  hasFeedback
                  label="User Name"
                  name="displayName"
                  initialValue={userLogin.displayName}
                  rules={[
                    { required: true, message: "Please input your title!" },
                  ]}
                >
                  <Input type="text" disabled={update} />
                </Form.Item>
                <Row gutter={[32, 0]}>
                  <Col xs={24} md={24} lg={12} xl={12}>
                    <Form.Item
                      hasFeedback
                      label="First Name"
                      name="firstName"
                      initialValue={userLogin.firstName}
                      rules={[
                        { required: true, message: "Please input your title!" },
                      ]}
                    >
                      <Input type="text" disabled={update} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={12} xl={12}>
                    <Form.Item
                      hasFeedback
                      label="Last Name"
                      name="lastName"
                      initialValue={userLogin.lastName}
                      rules={[
                        { required: true, message: "Please input your title!" },
                      ]}
                    >
                      <Input type="text" disabled={update} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="gender"
                  label="Gender"
                  initialValue={userLogin.gender}
                >
                  <Radio.Group disabled={update}>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="other">Other</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  hasFeedback
                  label="Phone "
                  name="phone"
                  initialValue={userLogin.phone}
                  rules={[
                    {
                      required: true,
                      type: "number",
                      min: 100000000,
                      max: 999999999,
                      message: "Please input your phone 10 number",
                    },
                  ]}
                >
                  <InputNumber disabled={update} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Email"
                  name="email"
                  initialValue={userLogin.email}
                  rules={[
                    { required: true, message: "Please input your title!" },
                  ]}
                >
                  <Input type="text" disabled={update} />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Address"
                  name="address"
                  initialValue={userLogin.address}
                  rules={[
                    { required: true, message: "Please input your title!" },
                  ]}
                >
                  <Input type="text" disabled={update} />
                </Form.Item>
                <Divider />
                <Form.Item shouldUpdate={true}>
                  <Button type="primary" htmlType="submit" disabled={update}>
                    Add
                  </Button>
                  <Button onClick={() => setUpdate(false)}>Update</Button>
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8} xl={8}>
                <Form.Item hasFeedback label="Picture" name="picture">
                  <AvatarProfile userLogin={userLogin} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Card>
    </motion.div>
  );
}

export default AdminProfile;
