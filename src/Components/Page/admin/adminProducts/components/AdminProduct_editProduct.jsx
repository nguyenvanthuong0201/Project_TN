import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Checkbox,
  Drawer,
  Input,
  Select,
  Upload,
  Divider,
  message,
  notification,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { sizeAdminProduct } from "../../../../../data/dataAdminProduct";
import firebase from "../../../../../utils/firebase";

function EditProduct(props) {
  const { drawerEdit, setDrawerEdit, bodyEdit } = props;
  const [salePromotion, setSalePromotion] = useState(true);

  const [form] = Form.useForm();
  const handleOnCloseDrawer = () => {
    setDrawerEdit(false);
  };
  const handleChange = (value) => {
    if (value === "Promotion") {
      setSalePromotion(false);
    } else {
      setSalePromotion(true);
    }
  };
  console.log("bodyEdit", bodyEdit);
  const onFinish = async (value) => {
    if (value.sale === undefined) {
      value.sale = 0;
    }
    const body = {
      ...value,
    };
    console.log("body", body);
    const id = "Product_" + Date.now();
    const storageRef = firebase.storage().ref("images-product").child(id);
    if (typeof body.picture === "undefined") {
      const updateRef = firebase
        .firestore()
        .collection("product")
        .doc(bodyEdit.key);
      updateRef
        .set({
          title: body.title,
          type: body.type,
          size: body.size,
          sale: body.sale,
          cost: body.cost,
          buy: body.buy,
          status: body.status,
          amount: body.amount,
          option: body.option,
          picture: bodyEdit.picture,
        })
        .then((docRef) => {
          handleOnCloseDrawer();
          notification.success({
            message: "Update success !!!!!",
            placement: "bottomLeft",
            style: { backgroundColor: "greenyellow" },
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      await storageRef.put(body.picture[0].originFileObj);
      storageRef.getDownloadURL().then((url) => {
        const updateRef = firebase
          .firestore()
          .collection("product")
          .doc(bodyEdit.key);
        updateRef
          .set({
            title: body.title,
            type: body.type,
            size: body.size,
            status: body.status,
            sale: body.sale,
            buy: body.buy,
            cost: body.cost,
            amount: body.amount,
            option: body.option,
            picture: url,
          })
          .then((docRef) => {
            handleOnCloseDrawer();
            notification.success({
              message: "Update success !!!!!",
              placement: "bottomLeft",
              style: { backgroundColor: "greenyellow" },
            });
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      });
    }
  };

  const onFinishFailed = (onFinishFailed) => {
    console.log("onFinishFailed", onFinishFailed);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <div>
      <Drawer
        width={512}
        title="Update Product"
        visible={drawerEdit}
        onClose={handleOnCloseDrawer}
        placement="right"
        maskClosable={true} /// Form nhấn bên ngoài để đóng ngăn
      >
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="horizontal" // Form chỉnh các lable va input
        >
          <Form.Item
            name="picture"
            label="Picture"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="logo"
              listType="picture"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Title"
            initialValue={bodyEdit.title}
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Type"
            name="type"
            initialValue={bodyEdit.type}
            rules={[{ required: true, message: "Please input your type!" }]}
          >
            <Select>
              <Select.Option value="Shirt">Shirt</Select.Option>
              <Select.Option value="Pants">Pants</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Option"
            name="option"
            rules={[{ required: true, message: "Please input your Option!" }]}
          >
            <Select onChange={handleChange}>
              <Select.Option value="New">New</Select.Option>
              <Select.Option value="Promotion">Promotion</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Amount "
            name="amount"
            initialValue={bodyEdit.amount}
            rules={[{ required: true, message: "Please input your amount !" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Cost"
            name="cost"
            initialValue={bodyEdit.cost}
            rules={[{ required: true, message: "Please input your cost!" }]}
          >
            <Input type="number" suffix="₫" />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Buy"
            name="buy"
            initialValue={bodyEdit.buy}
            rules={[{ required: true, message: "Please input your buy!" }]}
          >
            <Input type="number" suffix="₫" />
          </Form.Item>
          {salePromotion === false ? (
            <Form.Item
              hasFeedback
              label="Sale"
              name="sale"
              initialValue={bodyEdit.sale}
              rules={[{ required: true, message: "Please input your sale !" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          ) : (
            ""
          )}
          <Form.Item
            hasFeedback
            initialValue={bodyEdit.status}
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input your Show!" }]}
          >
            <Select>
              <Select.Option value="Hide">Hide</Select.Option>
              <Select.Option value="Show">Show</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Size" name="size" initialValue={bodyEdit.size}>
            <Checkbox.Group options={sizeAdminProduct} />
          </Form.Item>
          <Divider />

          <Form.Item shouldUpdate={true}>
            {() => (
              <Fragment>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    bodyEdit
                      ? ""
                      : !form.isFieldsTouched(true) ||
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                  }
                >
                  Update
                </Button>
                {/* Form button reset */}
                <Button htmlType="reset" onClick={() => form.resetFields()}>
                  reset
                </Button>
              </Fragment>
            )}
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default EditProduct;
