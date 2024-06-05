import S from './index.module.css';
import React, {useEffect, useState} from "react";
import {UpdateAPI} from "../../api/users";
import {Button, Form, Input, Upload, message, Empty} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

export default function UserDetails() {
    const [UserInfo, setUserInfo] = useState(() => JSON.parse(localStorage.getItem("user")) || {});
    const [form] = Form.useForm();
    const navigateTo = useNavigate();

    // 展示用户信息
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUserInfo(user);
            form.setFieldsValue({nickname: user.nickname, username: user.user_name});
        }
    }, [form]);

    // 用户信息存储
    const [avatar, setAvatar] = useState(UserInfo.avatar || '');
    const [nickName, setNickName] = useState(UserInfo.nickname || '');
    const [userName, setUserName] = useState(UserInfo.user_name || '');

    // 提交修改
    const onFinish = (values) => {
        UpdateAPI({"id": UserInfo.id, "nickName": nickName, "user_name": userName, "avatar": avatar})
            .then(res => {
                success();
            }).catch(err => {
            console.log(err);
        });
    };

    // 修改头像
    const UpdateAvatar = ({file}) => {
        setAvatar(file.name);
    };

    // 提示消息
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '修改成功',
        }).then();
    };

    return (
        <>
            {UserInfo && UserInfo.id ? (
                <div className={S.UserDetails}>
                    <div className={S.UserDetailsContent}>
                        <div className={S.Extra}></div>
                        <div className={S.UserDetailsTitle}>
                            <p>个人信息</p>
                        </div>
                        {contextHolder}
                        <div className={S.UserDetailsForm}>
                            <Form
                                form={form}
                                name="user-details-form"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                                initialValues={{remember: true}}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item label="头像:">
                                    <Upload
                                        listType="picture-card"
                                        customRequest={UpdateAvatar}
                                        showUploadList={false}
                                    >
                                        {avatar ? (<img src={avatar} alt="avatar" style={{width: '100%'}}/>) : (
                                            <div>
                                                <UploadOutlined/>
                                                <div>点击上传头像,只能上传png/jpg文件，且不超过2M</div>
                                            </div>
                                        )}
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="昵称:" name="nickname"
                                           rules={[{required: true, message: '请输入昵称'}]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item label="用户名:" name="username"
                                           rules={[{required: true, message: '请输入用户名'}]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                    <Button type="primary" htmlType="submit"
                                            style={{marginBottom: '83px'}}>保存</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={S.Empty}>
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 160,
                        }}
                        description={<span>你还没有 <a href="/">登录？</a></span>}>
                        <Button type="primary" onClick={() => {
                            navigateTo("/login");
                        }}>点击登录</Button>
                    </Empty>
                </div>
            )}
        </>
    );
}
