import { PAYMENT_CUSTODY } from "../constant/cartConstants";
import CryptoJS from "crypto-js";
import HmacSHA256 from "crypto-js/hmac-sha256";
import axios from "axios";
import { notification } from "antd";
const paymentCustody = (product) => async (dispatch) => {
  console.log("productaaa", product);

  var requestId = Date.now();
  var subtotalCartProduct = product.paymentSubTotal;
  var returnUrlOrder = "http://localhost:3000/paymentCart";
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

  if (dataResponseMoMo.data.message === "Success") {
    //   const dataResponsePaymentCart = await axios.post(
    //     "/api/paymentcart/",
    //     subtotalCart
    //   );
    //   dispatch({
    //     type: PAYMENTCART_LIST_MOMO,
    //     dataResponseMoMo,
    //     dataResponsePaymentCart,
    //   });
    //   console.log();
    // dispatch({ type: PAYMENT_CUSTODY, dataResponseMoMo });
    console.log("dataResponseMoMo", dataResponseMoMo);
    window.location.href = dataResponseMoMo.data.payUrl;
    notification.success({
      message: "Thành công !!!!!",
      placement: "bottomLeft",
      style: { backgroundColor: "greenyellow" },
    });
  } else {
    console.log("dataResponseMoMo", dataResponseMoMo);
    notification.success({
      message: "Thất bại !!!!!",
      placement: "bottomLeft",
      style: { backgroundColor: "greenyellow" },
    });
  }
};

export { paymentCustody };
