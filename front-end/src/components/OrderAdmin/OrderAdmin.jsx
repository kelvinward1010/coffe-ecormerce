import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Space } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponet";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/LoadingComponent";
import { WrapperUploadFile } from "../AdminProduct/style";
import ModalComponent from "../ModalComponent/ModalComponent";
import { convertPrice, getBase64 } from "../../utils";
import * as message from "../Message/Message"
import { useSelector } from "react-redux";
import * as OrderService from '../../services/OrderServices'
import { useQuery } from "@tanstack/react-query";
import {EditOutlined,DeleteOutlined,SearchOutlined } from '@ant-design/icons'
import { orderContent } from "../../content";
import ReCharts from "./ReCharts";
import ReCharts2 from "./ReCharts copy";


const OrderAdmin = () => {
  const user = useSelector((state)=>state?.user)

const getAllOrder = async () =>{
    const res = await OrderService.getAllOrder(user?.access_token)
    return res
  }

  const queryOrder = useQuery({queryKey:['orders'], queryFn: getAllOrder})
  const {data : orders, isLoading: isLoadingOrders} = queryOrder

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    //setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters,  }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //      <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
    
  });

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'nameProduct',
      sorter:(a, b) => a.nameProduct - b.nameProduct,
      ...getColumnSearchProps('nameProduct')
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'amount',
      sorter:(a, b) => a.amount - b.amount,
      ...getColumnSearchProps('amount')
    },
  
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      render: (text) => <a>{text}%</a>,
      sorter:(a, b) => a.discount - b.discount,
      ...getColumnSearchProps('discount')
    },
  
    {
      title: 'Tên người mua',
      dataIndex: 'useName',
      sorter:(a, b) => a.useName.length - b.useName.length,
      ...getColumnSearchProps('useName')
    },

    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      sorter:(a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },

    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      sorter:(a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    // {
    //   title: 'Phương thức thanh toán',
    //   dataIndex: 'paymentMethod',
    //   sorter:(a, b) => a.paymentMethod.length - b.paymentMethod.length,
    //   ...getColumnSearchProps('paymentMethod')
    // },
    
    {
      title: 'Đơn hàng',
      dataIndex: 'isPaid',
      sorter:(a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps('isPaid')
    },


    {
      title: 'Giao hàng',
      dataIndex: 'isDelivered',
      sorter:(a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps('isDelivered')
    },
    
    {
      title: 'Tổng tiền cần thanh toán',
      dataIndex: 'totalPrice',
      sorter:(a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
    },

    {
      title: 'Ngày tạo đơn hàng',
      dataIndex: 'createdAt',
      sorter:(a, b) => a.createdAt.length - b.createdAt.length,
      ...getColumnSearchProps('createdAt')
    },

  ];

  const dataTable = orders?.data?.length && orders?.data?.map((order)=>{
    return{
      ...order,key:order._id,
      useName: order?.shippingAddress?.fullName,
      phone: order?.shippingAddress?.phone,
      address: order?.shippingAddress?.address,
      paymentMethod: orderContent.payment[order?.paymentMethod],
      isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
      isDelivered: order?.isDelivered ? 'Đã giao hàng' : 'Đang giao hàng',
      totalPrice: convertPrice( order?.totalPrice),
      createdAt: order?.createdAt,
      amount: order?.orderItems[0]?.amount,
      discount: order?.orderItems[0]?.discount,
      nameProduct: order?.orderItems[0]?.name
    }
  })

  console.log('data',dataTable); 



  return(
    <div>
      <WrapperHeader
      style={
        {
          fontSize: '20px', 
          fontWeight:'bolder', 
          color:'#9A3B3B', 
          textAlign:'center', 
          textTransform:'uppercase',
          borderBottom: '2px solid #9A3B3B',
          marginBottom: '30px',
          padding: '10px',
          position: 'relative',
          bottom: '20px'
        }}>Quản lý đơn hàng</WrapperHeader>
        <div style={{
          marginTop:'20px',
        }}>
          <TableComponent data={dataTable} 
          columns={columns} 
          isLoading={isLoadingOrders}/>
        </div>
    </div>
  )
}

export default OrderAdmin