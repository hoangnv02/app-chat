import React from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { auth,db } from '../../firebase/config'
import { AuthContext } from '../../Context/Authprovider'

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid yellow;
    .userName {
        color: while;
        margin-left: 5px;
    }
    .logout {
        background: #E6E6FA
    }
    .ant-btn:not([disabled]):hover {
        text-decoration: none;
        background: #333;
    }
`;


export default function UserInfo() {
    

    const { user: { 
        displayName,
        photoURL,
    }} = React.useContext(AuthContext);
    // console.log({user:{displayName}});
    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL}> {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="userName">{displayName}</Typography.Text>
            </div>
            <Button className="logout" onClick={() => auth.signOut()}>Đăng xuất</Button>
        </WrapperStyled>
    )
}