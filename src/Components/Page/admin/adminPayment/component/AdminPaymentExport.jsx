import { ExportOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import ReactExport from "react-export-excel";
import { format } from '../../../../../data/dataAdminProduct';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const moment = require("moment");


const AdminPaymentExport = props => {
    let {dataFireBase,filterTable,valueFilter}=props  

    const dataExport=(firebase,search,filter)=>{
        if(search===null){
            return filter
        }
        else if(filter=== null){
            return search
        }
        else{
            return firebase
        }
    }
    return (
        <ExcelFile element={<Button
            type="primary"
            block
            icon={<ExportOutlined  />}
            style={{ backgroundColor: "#FDA30E" }}
          >
          Export Payment
          </Button>}>
        <ExcelSheet data={dataExport(dataFireBase,filterTable,valueFilter)} name="Payment" >
            <ExcelColumn label="First Name" value="firstName" style={{backgroundColor:"black"}}/>
            <ExcelColumn label="Last Name" value="lastName"/>
            <ExcelColumn label="Email" value="email"/>
            <ExcelColumn label="Phone" value="phone"/>
            <ExcelColumn label="Address" value="address"/>
            <ExcelColumn label="Total Money" value="paymentSubTotal" />
            <ExcelColumn label="Date"  value = {(col)=>moment(col.createDate).format(format.dateTime)}/>
        </ExcelSheet>
    </ExcelFile>
    );
};

export default AdminPaymentExport;