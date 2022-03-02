import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth, db } from '../../firebase/config';
import { useHistory } from 'react-router-dom';
import { addDocument, generateKeywords } from '../../firebase/sevices'
import styled from 'styled-components';

const LoginImg = styled.div`
    .ant-row-center {
        background: url(https://akm-img-a-in.tosshub.com/indiatoday/images/story/202010/change_WhatsApp_chat_backgroun_1200x768.png?pMrhj68iwUHSnhJqYCc1hNiBmpkPXtPR&size=770:433) #00b8fe  no-repeat fixed center;
        height: 100vh; 
    }
    .ant-row {
        align-items: flex-start;
    }
    .ant-col-8 {
        padding-top: 18px;
    }
    h3.ant-typography, .ant-typography h3 {
        color: rgb(255 255 255);
        font-weight: 700;
        font-size: 50px;
        padding-bottom: 280px;
    }
    .ant-btn {
        margin-top: 5px;
        height: 40px;
        border-radius: 40px;
    } 
`;

const { Title } = Typography;

// const fbProvider = firebase.auth.GoogleAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export default function Login() {

    const handleLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(googleProvider);
        // kiểm tra xem người dùng mới hay không
        if (additionalUserInfo.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                provider: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    };


    return (
        <LoginImg>
            <Row className="a-b__c"  className="loginChat" justify='center' >
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>Chat App</Title>
                    <Button style={{ width: '100%', marginBottom: 5 }} onClick={handleLogin}>
                        Đăng nhập bằng Google
                    </Button>
                    <Button style={{ width: '100%' }} >
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </LoginImg>
    )
}