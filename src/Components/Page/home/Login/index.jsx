import Modal from "antd/lib/modal/Modal";
import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

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
    // <Modal
    //   title="LOGIN FORM"
    //   visible={openLogin}
    //   onOk={handleOk}
    //   onCancel={handleCancel}
    //   footer={null}
    //   width={400}
    // >
    //   <p>Please sign-in:</p>
    // </Modal>
    <div>
      <h1>Login</h1>
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
}

export default Login;
