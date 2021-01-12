import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import {
  ArrowRightOutlined,
  DollarCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../StatisticCard.css";
import { Link } from "react-router-dom";

import { DatePicker, Space } from "antd";
import firebase from "../../../../../utils/firebase";

const { RangePicker } = DatePicker;

// Hàm animation number
// function easeOutExpo(x) {
//   return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
// }

// function animateNumber(
//   finalNumber,
//   duration = 5000,
//   startNumber = 0,
//   callback
// ) {
//   const startTime = performance.now();
//   function updateNumber(currentTime) {
//     const elapsedTime = currentTime - startTime;
//     if (elapsedTime > duration) {
//       callback(finalNumber);
//     } else {
//       try {
//         const timeRate = (1.0 * elapsedTime) / duration;
//         const numberRate = easeOutExpo(timeRate);
//         const currentNumber = Math.round(numberRate * finalNumber);
//         callback(currentNumber);
//         requestAnimationFrame(updateNumber);
//       } catch (error) {
//       }
//     }
//   }
//   requestAnimationFrame(updateNumber);
// }
///////////////////////

function CptStatisticCard(props) {
  const [dataFirebaseCustomer, setDataFirebaseCustomer] = useState([]);
  const [dataFirebaseEmployee, setDataFirebaseEmployee] = useState([]);
  const [dataFirebaseProduct, setDataFirebaseProduct] = useState([]);
  const [dataFirebasePayment, setDataFirebasePayment] = useState([]);

  /// lấy dữ liệu từ firebase về
  const handleGetAllPayment = () => {
    let tutorialsRef = firebase.firestore().collection("/payment");
    tutorialsRef.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const {
          createDate,
          address,
          checkboxOther,
          email,
          firstName,
          lastName,
          note,
          payment,
          paymentSubTotal,
          phone,
          status,
          typePayment,
          addressOther,
          emailOther,
          firstNameOther,
          lastNameOther,
          phoneOther,
          photoURL,
        } = doc.data();
        data.unshift({
          key: doc.id,
          createDate,
          address,
          checkboxOther,
          email,
          firstName,
          lastName,
          note,
          payment,
          paymentSubTotal,
          phone,
          status,
          typePayment,
          addressOther,
          emailOther,
          firstNameOther,
          lastNameOther,
          phoneOther,
          photoURL,
        });
      });
      setDataFirebasePayment(data);
    });
  };
  const handleGetAllProduct = () => {
    let tutorialsRef = firebase.firestore().collection("/product");
    /*Cách 1 */
    tutorialsRef.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const {
          title,
          type,
          size,
          sale,
          cost,
          buy,
          amount,
          status,
          option,
          picture,
          createDate,
        } = doc.data();
        data.push({
          key: doc.id,
          title,
          type,
          size,
          buy,
          cost,
          status,
          amount,
          picture,
          option,
          sale,
          createDate,
        });
      });
      setDataFirebaseProduct(data);
    });
  };
  const handleGetAllCustomer = () => {
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
          position,
          photoURL,
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
          position,
          photoURL,
        });
      });
      setDataFirebaseCustomer(data);
    });
  };
  const handleGetAllEmployee = () => {
    let tutorialsRef = firebase.firestore().collection("/employee");
    /*Cách 1 */
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
      setDataFirebaseEmployee(data);
    });
  };
  useEffect(() => {
    handleGetAllPayment();
    handleGetAllProduct();
    handleGetAllCustomer();
    handleGetAllEmployee();
  }, []);
  const showDataNumber = (data) => {
    let number = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        number += 1;
      }
    }
    return number;
  };
  const showDataTotal = (data) => {
    let number = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        number += parseInt(data[i].paymentSubTotal);
      }
    }
    return number;
  };
  const ArrayDataEmployee = (data) => {
    if (data.position === "employee") {
      return data;
    }
  };
  const dataEmployee = dataFirebaseEmployee.filter(ArrayDataEmployee);
  const ArrayDataAdmin = (data) => {
    if (data.position === "admin") {
      return data;
    }
  };
  const dataAdmin = dataFirebaseEmployee.filter(ArrayDataAdmin);
  const ArrayDataPayment = (data) => {
    if (data.status === "Success") {
      return data;
    }
  };
  const dataPayment = dataFirebasePayment.filter(ArrayDataPayment);
  /// thực thi hàm animation number
  // animateNumber(
  //   showDataNumber(dataFirebaseCustomer),
  //   3000,
  //   0,
  //   function (number) {
  //     const formattedNumber = number;
  //     document.getElementById("totalCustomer").innerText = formattedNumber;
  //   }
  // );
  // animateNumber(2000, 3000, 0, function (number) {
  //   const formattedNumber = number;
  //   document.getElementById("totalMoney").innerText = formattedNumber;
  // });
  const onChange = (date, dateString) => {};
  return (
    <>
      <Col xs={24} md={12} lg={12} xl={12} className="StaticCart_col">
        <Row className="StaticCart__Left StaticCart__totalCustomer ">
          <div className="StaticCart__totalCustomerTotal">
            <div className="StaticCart__totalCustomerTotal--number">
              {showDataNumber(dataFirebaseCustomer)}
            </div>
            <div className="StaticCart__totalCustomerTotal--title">
              Total Customer
            </div>
            <div className="StaticCart__totalCustomerTotal--admin">
              <span>
                Employee : <b> {showDataNumber(dataEmployee)}</b>
              </span>
              <br />
              <span>
                Admin: <b>{showDataNumber(dataAdmin)}</b>
              </span>
            </div>
          </div>
          <div className="StaticCart__totalCustomerIcon">
            <UserOutlined />
          </div>
        </Row>
        <Row>
          <Link
            to="/admin/customer"
            className="StaticCart__totalCustomer--link"
          >
            See details <ArrowRightOutlined />
          </Link>
        </Row>
      </Col>
      <Col xs={24} md={12} lg={11} offset={1} className="StaticCart_col">
        <Row className="StaticCart__Left StaticCart__totalCustomer ">
          <div className="StaticCart__totalCustomerTotal">
            <div className="StaticCart__totalCustomerTotal--number">
              {showDataTotal(dataPayment).toLocaleString()} <span>₫</span>
            </div>
            <div className="StaticCart__totalCustomerTotal--title">
              Total Money
            </div>
            <div className="StaticCart__totalCustomerTotal--admin">
              <span>
                Bill : <b>{showDataNumber(dataPayment)}</b>
              </span>
              <br />
              <span>
                Products: <b> {showDataNumber(dataFirebaseProduct)}</b>
              </span>
            </div>
          </div>
          <div className="StaticCart__totalCustomerIcon">
            <DollarCircleOutlined />
          </div>
        </Row>
        <Row>
          <Link to="/admin/payment" className="StaticCart__totalCustomer--link">
            See details <ArrowRightOutlined />
          </Link>
        </Row>
      </Col>
      {/* <Col xs={24} md={24} lg={24} xl={24}>
        <Space direction="vertical">
          <RangePicker onChange={onChange} />
        </Space>
      </Col> */}
    </>
  );
}

export default CptStatisticCard;
