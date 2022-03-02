import React from 'react';
// thư viện đóng mở phòng
import { Collapse, Typography, Button } from 'antd';
import styled from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';
import useFileStore from '../../hooks/useFileStore';
import {AuthContext} from '../../Context/Authprovider';
import {AppContext} from '../../Context/AppProvider';


const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-header:hover,
    p:hover {
      color: #f1ec40;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    a.ant-typography, .ant-typography a {
      color: rgb(219 12 69);
      transition: 0.25s linear;
    }
    a.ant-typography:hover, .ant-typography:hover a:hover {
      color: white;
      padding-left: 8px;
    }
    .addRoom {
      color: white;
      padding: 0;
    }
    .addRoom:hover {
      color: #2cf728;
      padding-left: 8px;
    }
  
  }
`;

const LinkStyled = styled(Typography.Link)`
    display: flex;
    margin-bottom: 5px;
    color: white;
`;

export default function RoomList() {
  

    const { rooms, setIsAddRoom, setSelectedRoomId } = React.useContext(AppContext)
    // console.log(rooms);
    const handleAddRoom = () => {
      setIsAddRoom(true);
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled  header="Danh sách phòng" key='1'>
                {
                  rooms.map(room => (
                    <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)} >{room.name}</LinkStyled>
                    ))
                }
                {/* <LinkStyled >Room1</LinkStyled> */}
                <Button  type="text" icon={<PlusCircleOutlined />} className="addRoom" onClick={handleAddRoom}>Thêm phòng</Button>
            </PanelStyled >
        </Collapse>
    )
}