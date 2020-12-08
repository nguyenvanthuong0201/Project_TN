import { PAYMENT_CUSTODY } from "../constant/cartConstants";
import CryptoJS from "crypto-js";
import HmacSHA256 from "crypto-js/hmac-sha256";
import axios from "axios";
import { notification } from "antd";
import firebase from "../utils/firebase";

const paymentCustody = (product) => async (dispatch) => {
  var requestId = Date.now();
  var subtotalCartProduct = product.paymentSubTotal;

  console.log("subtotalCartProduct :>> ", typeof subtotalCartProduct);
  //// sửa địa chỉ thanh toán
  var returnUrlOrder = "http://localhost:3000/result";

  // -----------------
  const secretkey = "9JHO4c3lgPjkgibhAtM8wV8tvlxPAzp0";
  var datatest =
    "partnerCode=MOMOAWIY20200512&accessKey=j786WfkBxCqtZzOz&requestId=" +
    requestId +
    "&amount=" +
    subtotalCartProduct +
    "&orderId=MM" +
    requestId +
    "&orderInfo=Thanh Toán Qua Momo&returnUrl=" +
    returnUrlOrder +
    "&notifyUrl=https://momo.vn&extraData=merchantName=Shopping Thuong nguyen";
  const datatest256 = HmacSHA256(datatest, secretkey).toString(
    CryptoJS.enc.Hex
  );

  // ---------------------
  const dataRequestMomo = {
    partnerCode: "MOMOAWIY20200512", //*
    accessKey: "j786WfkBxCqtZzOz", //*
    requestType: "captureMoMoWallet", //
    requestId: requestId + "", //Lấy thời gian *
    amount: subtotalCartProduct + "", //Tổng giá tiền đơn hàng*
    orderId: "MM" + requestId + "", //Mã đơn hàng*
    orderInfo: "Thanh Toán Qua Momo", //*
    returnUrl: returnUrlOrder, //*
    notifyUrl: "https://momo.vn", //*
    extraData: "merchantName=Shopping Thuong nguyen", //*
    signature: datatest256,
  };

  var myBodyJsonString = JSON.stringify(dataRequestMomo);
  const dataResponseMoMo = await axios.post(
    "https://test-payment.momo.vn/gw_payment/transactionProcessor",
    myBodyJsonString
  );
  console.log("object :>>dataResponseMoMo ", dataResponseMoMo);
  console.log("dataRequestMomo :>> ", dataRequestMomo);
  console.log("dataRequestMomo :>> ", dataResponseMoMo.data.message);
  console.log("product :>> ", product);
  if (dataResponseMoMo.data.message === "Success") {
    const tutorialsRef = firebase.firestore().collection("/payment");
    if (product.checkboxOther === false) {
      tutorialsRef
        .add({
          createDate: Date.now(),
          address: product.address,
          checkboxOther: product.checkboxOther,
          email: product.email,
          firstName: product.firstName,
          lastName: product.lastName,
          note: product.note,
          payment: product.payment,
          paymentSubTotal: product.paymentSubTotal,
          phone: product.phone,
          status: product.status,
          photoURL: product.photoURL,
          typePayment: product.typePayment,
          addressOther: product.addressOther,
          emailOther: product.emailOther,
          firstNameOther: product.firstNameOther,
          lastNameOther: product.lastNameOther,
          phoneOther: product.phoneOther,
          lastNameOther: "",
          firstNameOther: "",
          emailOther: "",
          addressOther: "",
          phoneOther: "",
        })
        .then(function (docRef) {
          console.log("Tutorial created with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding Tutorial: ", error);
        });
      window.location.href = dataResponseMoMo.data.payUrl;
    } else {
      tutorialsRef
        .add({
          createDate: Date.now(),
          address: product.address,
          checkboxOther: product.checkboxOther,
          email: product.email,
          firstName: product.firstName,
          lastName: product.lastName,
          note: product.note,
          payment: product.payment,
          paymentSubTotal: product.paymentSubTotal,
          phone: product.phone,
          status: product.status,
          typePayment: product.typePayment,
          addressOther: product.addressOther,
          emailOther: product.emailOther,
          firstNameOther: product.firstNameOther,
          lastNameOther: product.lastNameOther,
          phoneOther: product.phoneOther,
        })
        .then(function (docRef) {
          console.log("Tutorial created with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding Tutorial: ", error);
        });
      window.location.href = dataResponseMoMo.data.payUrl;
    }
    console.log("Thành công");
  } else {
    notification.success({
      message: "Thất bại !!!!!",
      placement: "bottomLeft",
      style: { backgroundColor: "greenyellow" },
    });
  }
};

export { paymentCustody };
