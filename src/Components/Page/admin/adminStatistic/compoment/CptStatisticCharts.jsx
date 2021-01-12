import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Column } from "@ant-design/charts";
import { Col } from "antd";
import { format } from "../../../../../data/dataAdminProduct";
import firebase from "../../../../../utils/firebase";
const moment = require("moment");

function CptStatisticCharts(props) {
  const [dataFirebaseCustomer, setDataFirebaseCustomer] = useState([]);
  const [dataFirebasePayment, setDataFirebasePayment] = useState([]);
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
  useEffect(() => {
    handleGetAllPayment();
    handleGetAllCustomer();
  }, []);
  const ArrayDataPayment = (data) => {
    if (data.status === "Success") {
      return data;
    }
  };
  const dataPayment = dataFirebasePayment.filter(ArrayDataPayment);
  const showDataTotal = (data, month) => {
    var number = 0;
    data.map((item, index)=>{
      if (
        item.length > 0 &&
        moment(item.createDate).format(format.month) === month
      ) {
        console.log('hello :>> ');
        for (let i = 0; i < item.length; i++) {
          console.log('number :>> ', number);
          number += 1;
          index += 1;
        }
        return number;
      }
      return number;
    })
    return number;
  };
  console.log('dataFirebaseCustomer :>> ', dataFirebaseCustomer);
  console.log('dataPayment :>> ', dataPayment);
  const data = [
    {
      name: "Customer",
      week: "Jul-2020.",
      c: 5
        // showDataTotal(dataFirebaseCustomer, "07-2020"),
    },
    {
      name: "Customer",
      week: "Aug-2020.",
      c:6
      //  showDataTotal(dataFirebaseCustomer, "08-2020"),
    },
    {
      name: "Customer",
      week: "Sep-2020.",
      c:15
      //  showDataTotal(dataFirebaseCustomer, "09-2020"),
    },
    {
      name: "Customer",
      week: "Oct-2020.",
      c: 20
      // showDataTotal(dataFirebaseCustomer, "10-2020"),
    },
    {
      name: "Customer",
      week: "Nov-2020.",
      c:24
      //  showDataTotal(dataFirebaseCustomer, "11-2020"),
    },
    {
      name: "Customer",
      week: "Dec-2020.",
      c:30
      //  showDataTotal(dataFirebaseCustomer, "12-2020"),
    },
    {
      name: "Customer",
      week: "Jan-2021.",
      c:20
      //  showDataTotal(dataFirebaseCustomer, "01-2021"),
    },
    {
      name: "Customer",
      week: "Feb-2021.",
      c: 0
      // showDataTotal(dataFirebaseCustomer, "02-2021"),
    },
    {
      name: "Customer",
      week: "Mar-2021.",
      c:0
      //  showDataTotal(dataFirebaseCustomer, "03-2021"),
    },
    {
      name: "Customer",
      week: "Apr-2021.",
      c:0
      //  showDataTotal(dataFirebaseCustomer, "04-2021"),
    },
    {
      name: "Customer",
      week: "May",
      c:0
      //  showDataTotal(dataFirebaseCustomer, "05-2021"),
    },
    {
      name: "Customer",
      week: "Jun-2021.",
      c:0
      //  showDataTotal(dataFirebaseCustomer, "06-2020"),
    },

    {
      name: "Bill",
      week: "Jul-2020.",
      c: 10
      // showDataTotal(dataPayment, "07-2020"),
    },
    {
      name: "Bill",
      week: "Aug-2020.",
      c:15
      //  showDataTotal(dataPayment, "08-2020"),
    },
    {
      name: "Bill",
      week: "Sep-2020.",
      c:30
      //  showDataTotal(dataPayment, "09-2020"),
    },
    {
      name: "Bill",
      week: "Oct-2020.",
      c: 24
      // showDataTotal(dataPayment, "10-2020"),
    },
    {
      name: "Bill",
      week: "Nov-2020.",
      c:22
      //  showDataTotal(dataPayment, "11-2020"),
    },
    {
      name: "Bill",
      week: "Dec-2020.",
      c: 26
      // showDataTotal(dataPayment, "12-2020"),
    },
    {
      name: "Bill",
      week: "Jan-2021.",
      c:40
      //  showDataTotal(dataPayment, "01-2021"),
    },
    {
      name: "Bill",
      week: "Feb-2021.",
      c:0
      // showDataTotal(dataPayment, "02-2021"),
    },
    {
      name: "Bill",
      week: "Mar-2021.",
      c:0
      //  showDataTotal(dataPayment, "03-2021"),
    },
    {
      name: "Bill",
      week: "Apr-2021.",
      c: 0
      // showDataTotal(dataPayment, "04-2021"),
    },
    {
      name: "Bill",
      week: "May",
      c:0
      //  showDataTotal(dataPayment, "05-2021"),
    },
    {
      name: "Bill",
      week:
       "Jun-2021.",
      c: 0
      // showDataTotal(dataPayment, "06-2021"),
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: "week",
    yField: "c",
    seriesField: "name",
    color: ["#1ca9e6", "#f88c24"],
    marginRatio: 0,
  };
  return (
    <>
      <Col xs={24} md={24} lg={24} style={{ height: "500px" }}>
        <Column {...config} />;
      </Col>
    </>
  );
}

export default CptStatisticCharts;
