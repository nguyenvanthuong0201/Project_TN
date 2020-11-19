import { Spin } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { loginUser, logoutUser } from "./Actions";
import "./App.css";
import PageAdmin from "./Components/Page/admin";
import Home from "./Components/Page/home";
import firebase from "./utils/firebase";

function App() {
  //handle firebase aut changed
  const dispatch = useDispatch();
  const [dataFirebaseEmployee, setDataFireBaseEmployee] = useState([]);
  const [dataFirebaseCustomer, setDataFireBaseCustomer] = useState([]);
  const [userLogin, setUserLogin] = useState("");
  const countLoadingContainer = useSelector(
    (state) => state.reSpin.countLoadingContainer
  );
  const handleClickGetEmployee = () => {
    let tutorialsRef = firebase.firestore().collection("/employee");
    tutorialsRef.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const {
          firstName,
          lastName,
          password,
          phone,
          email,
          address,
          picture,
          position,
          gender,
          createDay,
        } = doc.data();
        data.push({
          key: doc.id,
          firstName,
          lastName,
          password,
          phone,
          email,
          address,
          picture,
          position,
          gender,
          createDay,
        });
      });
      setDataFireBaseEmployee(data);
    });
  };
  const handleClickGetCustomer = () => {
    let tutorialsRef = firebase.firestore().collection("/customer");
    tutorialsRef.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const {
          firstName,
          lastName,
          password,
          phone,
          email,
          address,
          picture,
          createDay,
        } = doc.data();
        data.push({
          key: doc.id,
          firstName,
          lastName,
          password,
          phone,
          email,
          address,
          picture,
          createDay,
        });
      });
      setDataFireBaseCustomer(data);
    });
  };
  useEffect(() => {
    handleClickGetEmployee();
    handleClickGetCustomer();
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("User is not logged in");
          dispatch(logoutUser());
        } else {
          setUserLogin(user);
          // dispatch(loginUser(user));
        }
      });
    return () => unregisterAuthObserver();
  }, []);
  const ArrayCustomer = (value) => {
    if (value.email === userLogin.email) return value;
  };
  const ArrayEmployee = (value) => {
    if (value.email === userLogin.email) return value;
  };
  let dataEmployee1 = dataFirebaseEmployee.filter(ArrayEmployee);
  let dataCustomer1 = dataFirebaseCustomer.filter(ArrayCustomer);
  const dataEmployee = dataEmployee1[0];
  const dataCustomer = dataCustomer1[0];
  const targeEmployee = Object.assign({}, dataEmployee, {
    email: userLogin.email,
    displayName: userLogin.displayName,
    photoURL: userLogin.photoURL,
  });
  const targeCustomer = Object.assign({}, dataCustomer, {
    email: userLogin.email,
    displayName: userLogin.displayName,
    photoURL: userLogin.photoURL,
  });
  const targeNoUser = Object.assign(
    {},
    {
      email: userLogin.email,
      displayName: userLogin.displayName,
      photoURL: userLogin.photoURL,
    }
  );

  if (dataEmployee !== undefined) {
    dispatch(loginUser(targeEmployee));
  } else if (dataCustomer !== undefined) {
    dispatch(loginUser(targeCustomer));
  } else {
    dispatch(loginUser(targeNoUser));
  }

  return (
    <BrowserRouter>
      <Switch>
        <Spin
          spinning={countLoadingContainer}
          style={{ position: "fixed", maxHeight: "100vh" }}
          size="large"
        >
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/admin">
            <PageAdmin />
          </Route>
          <Route path="/admin/employee">
            <PageAdmin />
          </Route>
          <Route path="/user">
            <PageAdmin />
          </Route>
          <Route path="/login">
            <Home />
          </Route>
          <Route path="/viewCart">
            <Home />
          </Route>
          <Route path="/product">
            <Home />
          </Route>
          <Route path="/paymentCart">
            <Home />
          </Route>
          {/* <Redirect to="/" /> */}
        </Spin>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
