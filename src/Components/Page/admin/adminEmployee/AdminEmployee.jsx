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
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import EmployeeAdd from "./component/employeeAdd";
import firebase from "../../../../utils/firebase";
import { format } from "../../../../data/dataAdminProduct";
import EmployeeEdit from "./component/employeeEdit";

const moment = require("moment");

function AdminEmployee(props) {
  const [filterTable, setFilterTable] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerEdit, setOpenDrawerEdit] = useState(false);
  const [dataFireBase, setDataFireBase] = useState([]);
  const [bodyEdit, setBodyEdit] = useState("");

  useEffect(() => {
    handleClickGetAll();
  }, []);

  const handleClickGetAll = () => {
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
        console.log(data, "data");
      });
      setDataFireBase(data);
    });
  };
  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      render: (text, record) => (
        <>
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
      title: "Avatar",
      dataIndex: "picture",
      width: "10%",
      render: (createDate) => (
        <>
          <Image
            style={{ width: "5px", height: "5px", cursor: "pointer" }}
            src={createDate}
          />
        </>
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      width: "10%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.firstName - b.firstName,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: "10%",
    },
    {
      title: "Position",
      dataIndex: "position",
      width: "10%",
      filters: [
        {
          text: "Admin",
          value: "Admin",
        },
        {
          text: "Employee",
          value: "Employee",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.position.indexOf(value) === 0,
      render: (position) => (
        <>
          <Tag color={position === "Admin" ? "#483D8B" : "	#FF8C00"}>
            {position}
          </Tag>
        </>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "10%",
      filters: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
      render: (gender) => (
        <>
          <Tag color={gender === "Male" ? "#000080" : "	#F4A460"}>{gender}</Tag>
        </>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "10%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.phone - b.phone,
    },
    {
      title: "Email",
      width: "30%",
      dataIndex: "email",
    },
    {
      title: "Create Date",
      width: "10%",
      dataIndex: "createDate",
      render: (createDate) => <>{moment(createDate).format(format.dateTime)}</>,
    },
  ];
  const handleEdit = (record) => {
    setBodyEdit(record);
    setOpenDrawerEdit(true);
  };
  const handleDelete = (id) => {
    firebase
      .firestore()
      .collection("/employee")
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
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
    setOpenDrawerEdit(false);
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
    <div>
      <Card style={{ borderRadius: "10px" }} size="small">
        <Row>
          <Col xs={24} md={24} lg={10}>
            <Input.Search
              placeholder="Search by..."
              enterButton
              onSearch={handleSearchTable}
              allowClear={true}
            />
          </Col>
          <Col xs={24} md={24} lg={3} offset={11}>
            <Button
              type="primary"
              block
              icon={<PlusSquareOutlined />}
              onClick={handleOpenDrawer}
            >
              Add employee
            </Button>
          </Col>
        </Row>
        {/* Add Drawer */}
        <EmployeeAdd openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        {/* Add Drawer */}
        {/* Edit Drawer */}
        <EmployeeEdit
          openDrawerEdit={openDrawerEdit}
          setOpenDrawerEdit={setOpenDrawerEdit}
          bodyEdit={bodyEdit}
        />
        {/* Edit Drawer */}
        <Row>
          <Col xs={24} md={24} lg={24}>
            <Table
              columns={columns}
              dataSource={filterTable == null ? dataFireBase : filterTable}
              pagination={{ pageSize: 10 }}
              size="small"
              scroll={{ y: 300 }}
              rowKey="createDate"
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default AdminEmployee;
