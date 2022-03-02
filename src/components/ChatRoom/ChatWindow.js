import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Avatar, Tooltip, Form, Input, Alert } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/sevices';
import { AuthContext } from '../../Context/Authprovider';
import useFileStore from '../../hooks/useFileStore';

//<Avatar.Group size="small" maxCount={2}> 
// Số lượng tối đa hiển thị là 2 người
//<Tooltip title="1"> ==> Hiển thị tên avatar
const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid rgba(255, 255, 255);
    .headerInfo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: red;
    }
    .headerTitle{
        margin: 0;
        font-weight: boid;
    }
    .headerDescription{
        font-size: 12px;
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
    .ant-btn-text:hover, .ant-btn-text:focus {
        color: white;
        background: #1890ff;
        border-color: transparent;
    }
`;

const WrapperStyled = styled.div`
    height: 100vh;
`;

const ContendStyled = styled.div`
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 12px;
`;
const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`;
// khi nhiều tin nhắn sẽ tràn ra ngoài  --> thanh scrooll 
const MessengerListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;




export default function ChatWindow() {


    const {
        members,
        selectedRoom,
        setIsAddMember,
    } = useContext(AppContext);

    const { user: { uid, photoURL, displayName } } = useContext(AuthContext);

    const [inputValue, setInputValue] = useState('')
    const [form] = Form.useForm();

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName,
        });
        form.resetFields(['message'])
    }

    const condition = React.useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        comperaValue: selectedRoom.id,
    }),[selectedRoom.id])
    
    const messages = useFileStore('messages',condition)
    // console.log({condition});

    return (
        <WrapperStyled>

            <HeaderStyled>
                <div className="headerInfo">
                    <p className="headerTitle">{selectedRoom.name}</p>
                    <span className="headerDescription">{selectedRoom.description}</span>
                </div>
                <ButtonGroupStyled>
                    <Button type='text' icon={<UserAddOutlined />} onClick={() => setIsAddMember(true)}>Mời</Button>

                    <Avatar.Group size="small" maxCount={2}>
                        {
                            members.map(member => <Tooltip title={member.displayName} key={member.id}>
                                <Avatar src={member.photoURL}>{member.photoURL ? "" : member.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                            </Tooltip>)
                        }

                    </Avatar.Group>
                </ButtonGroupStyled>
            </HeaderStyled>
            <ContendStyled>
                <MessengerListStyled>
                    {
                        messages.map(mes => <Message
                            key={mes.id}
                            text={mes.text}
                            photoURL={mes.photoURL}
                            displayName={mes.displayName}
                            createdAt={mes.createdAt}
                        />)
                    }
                </MessengerListStyled>
                <FormStyled form={form}>
                    <Form.Item name='message'>
                        <Input
                            onChange={handleInputChange}
                            onPressEnter={handleOnSubmit}
                            placeholder="Vui lòng nhập tin nhắn ^^"
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Button type="primary" onClick={handleOnSubmit}>Gửi</Button>
                </FormStyled>
            </ContendStyled>
        </WrapperStyled>
    )
}