import Modal from "antd/lib/modal/Modal";
import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Card, Col, Row } from "antd";
import "./login.css";

function Login(props) {
  const { handleOk, handleCancel, openLogin } = props;

  const uiConfig = {
    signInFlow: "redirect",
    signInSuccessUrl: "/",

    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };
  console.log("uiConfig", uiConfig);
  return (
    <Row>
      <Col span={8} offset={8}>
        <Card>
          <h1 className="Login_title">LOGIN</h1>
          <hr />
          <div>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
