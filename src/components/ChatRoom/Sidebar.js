import React from 'react';
import { Row, Col } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';


// khi Gặp compunent SidebarStyled 
//-> biên dịch ra thẻ div có styled cta tự định nghĩa 
const SidebarStyled = styled.div`
background: linear-gradient(#12c2e9, #c471ed, #f64f59);
    color: while;
    height: 100vh;
`;

export default function Sidebar() {
    return (
        <SidebarStyled>
            <Row>
                <Col span={24}>
                    <UserInfo></UserInfo>
                </Col>
                <Col span={24}>
                    <RoomList></RoomList>
                </Col>
            </Row>
        </SidebarStyled>
    )
}