import { List, Card } from "antd";
import React, { useEffect, useState } from "react";
import firebase from "../../../../utils/firebase";
import { motion } from "framer-motion";
import { pageTransitionY } from "../../../../data/transition";
import InformationModal from "../homeMaster/component/InformationModal";

function HomeProduct(props) {
  const [dataFireBase, setDataFireBase] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataView, setDataView] = useState({});

  const handleClickGetAll = () => {
    let tutorialsRef = firebase.firestore().collection("/product");
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
          status,
          amount,
          option,
          picture,
          createDate,
        } = doc.data();
        data.push({
          key: doc.id,
          title,
          type,
          size,
          status,
          buy,
          cost,
          amount,
          picture,
          option,
          sale,
          createDate,
        });
      });
      setDataFireBase(data);
    });
  };
  useEffect(() => {
    handleClickGetAll();
  }, []);

  const ArrayProduct = (value) => {
    if (value.status === "Show") {
      return value;
    }
  };
  const information = (data) => {
    setOpenModal(true);
    setDataView(data);
  };
  const handleOk = () => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  let dataProduct = dataFireBase.filter(ArrayProduct);
  console.log("dataProduct :>> ", dataProduct);
  return (
    <motion.div
      initial="out"
      exit="out"
      animate="in"
      variants={pageTransitionY}
    >
      <InformationModal
        openModal={openModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        dataView={dataView}
      />
      <Card style={{ borderRadius: "10px" }} size="small">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 5,
            xxl: 10,
          }}
          pagination={{
            pageSize: 25,
            position: "bottom",
            style: { textAlign: "center" },
          }}
          dataSource={dataProduct}
          renderItem={(item) => (
            <List.Item>
              <Card
                onClick={() => information(item)}
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={item.picture} />}
              >
                <h3 style={{ textAlign: "center", color: "red" }}>
                  {item.option === "Promotion"
                    ? item.sale.toLocaleString()
                    : item.buy.toLocaleString()}
                  ₫
                </h3>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </motion.div>
  );
}

export default HomeProduct;
