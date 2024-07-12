import React from "react";
import {CoffeeOutlined} from '@ant-design/icons'
import { WrapperShareFooter, WrapperElementA,WrapperHeader, ColumnDiv, RowDivItem, Title, LogoDiv, TitleMain } from './style'

const FooterComponent = () => {
  return(
    <div style={{
      width:'96%',
      height: "200px", 
      background:'gray', 
      margin:'0 auto',
      padding:'5px',
      border: '2px solid #D3756B',
      display: 'flex',
      justifyContent: 'space-between',
      overflowX: "hidden"
    }}>
      <LogoDiv>
       <WrapperHeader>COFFEE <CoffeeOutlined /></WrapperHeader>
      </LogoDiv>
      <ColumnDiv>

        <RowDivItem>
          <TitleMain>Social Media</TitleMain>
        </RowDivItem>
        <RowDivItem>
          <WrapperElementA href="#" className="fab fa-facebook-f"></WrapperElementA>
          <Title>Facebook</Title>
        </RowDivItem>
        <RowDivItem>
          <WrapperElementA href="#" className="fab fa-twitter"></WrapperElementA>
          <Title>Twitter</Title>
        </RowDivItem>
        <RowDivItem>
          <WrapperElementA href="#" className="fab fa-instagram"></WrapperElementA>
          <Title>Instagram</Title>
        </RowDivItem>
      </ColumnDiv>
      <ColumnDiv>
        <RowDivItem>
          <TitleMain>Contact</TitleMain>
        </RowDivItem>
        <RowDivItem>
          <WrapperElementA href="#" className="fas fa-phone"></WrapperElementA>
          <Title>123456789</Title>
        </RowDivItem>
        <RowDivItem>
          <WrapperElementA href="#" className="fas fa-envelope"></WrapperElementA>
          <Title>coffe123@gmail.com</Title>
        </RowDivItem>
        <RowDivItem>
          <WrapperElementA href="#" className="fas fa-map-marker-alt"></WrapperElementA>
          <Title>Ha Noi</Title>
        </RowDivItem>
      </ColumnDiv>
    </div>
  )
}

export default FooterComponent