import AA from './index.module.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ShowProductAPI} from "../../api/products";
import {CreateFavoriteAPI} from "../../api/favorites";
import {CreateCartAPI} from "../../api/carts";
import {Button, Col, Modal, Row} from 'antd';

export default function Details() {
    const user = JSON.parse(localStorage.getItem("user")); // 获取用户数据
    const UserId = user ? user.id : null; // 检查用户数据是否存在
    const {id} = useParams();     // 获取浏览器的URL的:id
    const [product, setProduct] = useState([])


    useEffect(() => {
        ShowProductAPI(id).then(res => {
            console.log(res)
            setProduct(res.data)
        }).catch(error => {
            console.error("Error in useEffect:", error);
        })
    }, [id])

    const [Message, setMessage] = useState("");

    // 点击添加到购物车
    function CreateCart() {
        CreateCartAPI({"user_id": UserId, "product_id": JSON.parse(id)}).then(res => {
            setMessage(res.msg)
            showModal()
        }).catch(error => {
            console.log(error)
        })
    }

    // 点击收藏
    function CreateFavorite() {
        CreateFavoriteAPI({"user_id": UserId, "product_id": JSON.parse(id)}).then(res => {
            setMessage(res.msg)
            showModal()
        }).catch(error => {
            console.log(error)
        })
    }

    // modal对话框
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<>
        {product ? <div key={product.id}>
            {/*商品详情介绍*/}
            <div className={AA.header}>
                <div className={AA.detail}>
                    <Row className={AA.Row}>
                        {/*商品图片展示模块*/}
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <div className={AA.image}>
                                <img src={product.img_path} alt=""/>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <div className={AA.right}>
                                {/*商品名字*/}
                                <div className={AA.name}>{product.name}</div>
                                {/*商品金钱*/}
                                <div className={AA.money}>
                                    <span>¥{product.discount_price}</span>
                                </div>
                                {/*商品标题*/}
                                <div className={AA.box}>
                                    {/*加入购物车*/}
                                    <div className={AA.shoppingCar}>
                                        <Button onClick={CreateCart} type="primary">
                                            加入购物车
                                        </Button>
                                        <Button onClick={CreateFavorite} type="primary">
                                            收藏
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>


                {/*<Row>*/}
                {/*    /!*描述模块*!/*/}
                {/*    <Col xs={24} sm={24} md={24} lg={24} xl={24}>*/}
                {/*        <div className={AA.description}>*/}
                {/*            <img src={product.info} alt=""/>*/}
                {/*        </div>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </div>
        </div> : null}

        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>{Message}</p>
        </Modal>
    </>)
}