import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  Input,
  notification,
  Popconfirm,
  Row,
  Tag,
} from "antd";
import { Table } from "antd";
import {
  PlusSquareOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddProduct from "./components/AdminProduct_addProduct";
import EditProduct from "./components/AdminProduct_editProduct";
import firebase from "../../../../utils/firebase";
import AdminProduct_ViewModal from "./components/AdminProduct_ViewModal";
import { format } from "../../../../data/dataAdminProduct";
import { motion } from "framer-motion";
import { pageAnimate, pageTransitionX } from "../../../../data/transition";

const moment = require("moment");

function AdminProduct(props) {
  const [filterTable, setFilterTable] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [drawerEdit, setDrawerEdit] = useState(false);
  const [dataFireBase, setDataFireBase] = useState([]);
  const [bodyEdit, setBodyEdit] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [dataView, setDataView] = useState("");

  useEffect(() => {
    handleClickGetAll();
  }, []);

  const handleView = (record) => {
    setOpenModal(true);
    setDataView(record);
  };
  const handleOk = () => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      fixed: "left",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button
            type="ghost"
            icon={<EditOutlined />}
            style={{ backgroundColor: "yellow" }}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            placement="bottom"
            title="Are you sure delete this product?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "18%",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "5%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "5%",
      filters: [
        {
          text: "Shirt",
          value: "Shirt",
        },
        {
          text: "Pant",
          value: "Pant",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      render: (type) => (
        <>
          <Tag color={type === "Shirt" ? "geekblue" : "green"}>{type}</Tag>
        </>
      ),
    },
    {
      title: "Option",
      dataIndex: "option",
      width: "7%",
      filters: [
        {
          text: "New",
          value: "New",
        },
        {
          text: "Promotion",
          value: "Promotion",
        },
        {
          text: "Other",
          value: "Other",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.option.indexOf(value) === 0,
      render: (option) => (
        <>
          <Tag
            color={
              (option === "Promotion" && "#B22222") ||
              (option === "New" && "#00CED1") ||
              (option === "Other" && "#87CEFA")
            }
          >
            {option}
          </Tag>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "5%",
      filters: [
        {
          text: "Show",
          value: "Show",
        },
        {
          text: "Hide",
          value: "Hide",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => (
        <>
          <Tag
            color={
              (status === "Hide" && "#E2E2E2") ||
              (status === "Show" && "#1890FF")
            }
          >
            {status}
          </Tag>
        </>
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      width: "8%",
      sorter: (a, b) => a.size.length - b.size.length,
      sortDirections: ["descend", "ascend"],
      render: (size) => (
        <>
          {size.map((size, index) => {
            return <span key={index}>{size}|</span>;
          })}
        </>
      ),
    },
    {
      title: "Cost",
      dataIndex: "cost",
      width: "10%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.cost - b.cost,
      render: (cost) => (
        <>
          <b style={{ color: "red" }}>{parseInt(cost).toLocaleString()} ₫</b>
        </>
      ),
    },
    {
      title: "Buy",
      width: "10%",
      dataIndex: "buy",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.buy - b.buy,
      render: (buy) => (
        <>
          <b style={{ color: "red" }}>{parseInt(buy).toLocaleString()} ₫ </b>
        </>
      ),
    },
    {
      title: "Sale",
      width: "10%",
      dataIndex: "sale",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sale - b.sale,
      render: (sale) => (
        <>
          <b style={{ color: "red" }}>
            {sale === 0 ? "No Promotion" : parseInt(sale).toLocaleString()}{" "}
            {sale === 0 ? "" : "₫"}{" "}
          </b>
        </>
      ),
    },
    {
      title: "Create Date",
      width: "15%",
      dataIndex: "createDate",
      defaultSortOrder: "descend",
      render: (createDate) => <>{moment(createDate).format(format.dateTime)}</>,
    },
  ];
  const handleEdit = (body) => {
    setBodyEdit(body);
    setDrawer(false);
    setDrawerEdit(true);
  };
  const handleDelete = (id) => {
    firebase
      .firestore()
      .collection("/product")
      .doc(id)
      .delete()
      .then(() => {
        notification.success({
          message: "Delete success !!!!!",
          placement: "bottomLeft",
          style: { backgroundColor: "greenyellow" },
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  const onAddProduct = () => {
    setDrawer(true);
    setBodyEdit("");
  };

  const handleClickGetAll = () => {
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
      setDataFireBase(data);
    });
  };
  // / Search toàng cục
  const handleSearchTable = (value) => {
    const filterTable = dataFireBase.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterTable(filterTable);
  };

  return (
    <motion.div
      initial="initial"
      exit="out"
      animate="in"
      variants={pageTransitionX}
      transition={pageAnimate}
    >
      <Card style={{ borderRadius: "10px" }} size="small">
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Col>
              <Input.Search
                placeholder="Search by..."
                enterButton
                onSearch={handleSearchTable}
                allowClear={true}
                style={{ backgroundColor: "#FDA30E" }}
              />
            </Col>
          </div>
          <AdminProduct_ViewModal
            openModal={openModal}
            dataView={dataView}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
          <div>
            <Col>
              <Button
                type="primary"
                onClick={onAddProduct}
                block
                icon={<PlusSquareOutlined />}
                style={{ backgroundColor: "#FDA30E" }}
              >
                Add Product
              </Button>
            </Col>
          </div>
        </Row>
        {/* Start Drawer */}
        <EditProduct
          drawerEdit={drawerEdit}
          setDrawerEdit={setDrawerEdit}
          bodyEdit={bodyEdit}
        />
        <AddProduct drawer={drawer} setDrawer={setDrawer} />
        {/* End Drawer */}
        <Row>
          <Col xs={24} md={24} lg={24}>
            <Table
              columns={columns}
              dataSource={filterTable == null ? dataFireBase : filterTable}
              pagination={{ pageSize: 10 }}
              size="small"
              rowKey="createDate"
              scroll={{ x: 1500 }}
            />
          </Col>
        </Row>
      </Card>
    </motion.div>
  );
}

export default AdminProduct;
