import React, {useContext} from 'react';
import { Modal, Form, Input  } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/Authprovider';
import { addDocument } from '../../firebase/sevices';


export default function AddRoomModal() {
    const { isAddRoom , setIsAddRoom } = useContext(AppContext);
    const { 
        user: { uid },
    } = useContext(AuthContext);

    const [form] = Form.useForm();
    const handleOk = () => {
        // console.log({formData : form.getFieldsValue()});

        addDocument('rooms', {...form.getFieldsValue(), members: [uid] });
        form.resetFields();
        setIsAddRoom(false);
    }; 

    const handleCancel = () => {
        form.resetFields();
        setIsAddRoom(false);
    };

    return (
        <div>
            <Modal 
                title="Tạo phòng"
                visible={isAddRoom}
                onOk = { handleOk }
                onCancel = { handleCancel }
            >
                <Form form={form} layout = 'vertical'> 
                    <Form.Item label='Tên phòng' name='name'>
                        <Input placeholder="Nhập tên phòng" /> 
                    </Form.Item>
                    <Form.Item label="Mô tả" name='description'>
                        <Input.TextArea placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}