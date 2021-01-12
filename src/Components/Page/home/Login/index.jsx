import Modal from "antd/lib/modal/Modal";
import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Form, Input, Button, Checkbox, Card, Col } from "antd";
import "./login.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login(props) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const uiConfig = {
    signInFlow: "redirect",
    signInSuccessUrl: "/",

    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };
  return (
    <div class="page-head width">
      <div class="container">
          <Col xs={8} sm={8} md={8} lg={8} push={16}>
            <Card className="background_login">
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="Username" name="username">
                  <Input />
                </Form.Item>

                <Form.Item label="Password" name="password">
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{width:"220px", backgroundColor:"#FDA30E"}}>
                    LOGIN
                  </Button>
                </Form.Item>
              </Form>
                <div>
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                    />
                </div>
              </Card>
           </Col>
      </div>
    </div>
  );
}

export default Login;
