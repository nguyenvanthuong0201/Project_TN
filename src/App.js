import { ConfigProvider, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import { loginUser, logoutUser } from "./Actions";
import "./App.css";
import PageAdmin from "./Components/Page/admin";
import Home from "./Components/Page/home";
import Login from "./Components/Page/home/Login";
import HomePaymentCart from "./Components/Page/home/paymentCart";
import firebase from "./utils/firebase";

function App() {
  //handle firebase aut changed
  const dispatch = useDispatch();
  const [dataFirebaseEmployee, setDataFireBaseEmployee] = useState([]);
  const [dataFirebaseCustomer, setDataFireBaseCustomer] = useState([]);
  const [userLogin, setUserLogin] = useState("");
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
  const targeEmployee = Object.assign({}, dataEmployee, userLogin);
  const targeCustomer = Object.assign({}, dataCustomer, userLogin);
  const targeNoUser = Object.assign({}, userLogin);
  console.log("dataCustomer :>> ", dataCustomer);
  console.log("dataEmployee :>> ", dataEmployee);
  console.log("targeEmployee :>> ", targeEmployee);
  console.log("targeCustomer :>> ", targeCustomer);

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
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/admin">
          <PageAdmin />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/paymentCart">
          <HomePaymentCart />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
