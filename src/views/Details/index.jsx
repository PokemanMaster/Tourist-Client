import AA from './index.module.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ShowProductParamAPI} from "../../api/products";
import {CreateFavoriteAPI} from "../../api/favorites";
import {CreateCartAPI} from "../../api/carts";
import {Button, Col, Modal, Row} from 'antd';

export default function Details() {
    const user = JSON.parse(localStorage.getItem("user")); // 获取用户数据
    const UserId = user ? user.id : null; // 检查用户数据是否存在
    const {id} = useParams();     // 获取浏览器的URL的:id

    const [ProductParam, setProductParam] = useState([]);
    const [ProductParamImagesDesc, setProductParamImagesDesc] = useState([]);
    const [ProductParamImagesFacade, setProductParamImagesFacade] = useState([]);

    useEffect(() => {
        ShowProductParamAPI(id).then(res => {
            setProductParam(res.data)
            const images = JSON.parse(res.data[0].images);
            setProductParamImagesDesc(images.desc) // 存储展示图片
            setProductParamImagesFacade(images.facade) // 存储大图片
        }).catch(error => {
            console.error("Error in useEffect:", error);
        })
    }, [id])

    // 切换图片
    const ShowParamImgs = (paramImg) => {
        console.log(paramImg)
        setProductParamImagesFacade(paramImg);
    }

    const [Message, setMessage] = useState("");

    // 点击添加到购物车
    function CreateCart() {
        CreateCartAPI({"UserID": UserId, "ProductID": JSON.parse(id)}).then(res => {
            setMessage(res.msg)
            showModal()
        }).catch(error => {
            console.log(error)
        })
    }

    // 点击收藏
    function CreateFavorite() {
        CreateFavoriteAPI({"UserID": UserId, "ProductID": JSON.parse(id)}).then(res => {
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
        {ProductParam ? <div key={ProductParam.id}>
            {/*商品详情介绍*/}
            <div className={AA.header}>
                <div className={AA.detail}>
                    <Row className={AA.Row}>
                        {/*商品图片展示模块*/}
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <div className={AA.image}>
                                {ProductParamImagesFacade && ProductParamImagesFacade.length > 0 ? (<div>
                                    <img src={ProductParamImagesFacade} alt=""/>
                                </div>) : <div></div>}
                            </div>
                            <div className={AA.params}>
                                {ProductParamImagesDesc && ProductParamImagesDesc.length > 0 ? (ProductParamImagesDesc.map((item, index) => (
                                    <div className={AA.param} key={index}
                                         onMouseEnter={() => {
                                             ShowParamImgs(item); // 这里的 `item` 是图片的 URL
                                         }}>
                                        <img src={item} alt={""}/>
                                    </div>))) : (<div></div>)}
                            </div>
                        </Col>
                        {/*商品参数展示模块*/}
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            {ProductParam && ProductParam.length > 0 ? (ProductParam.map((item, index) => (
                                <div className={AA.param} key={index}>
                                    <div className={AA.right}>
                                        {/*商品名字*/}
                                        <div className={AA.name}>{item.title}</div>
                                        {/*商品金钱*/}
                                        <div className={AA.money}>
                                            <span>¥{item.price}</span>
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
                                </div>))) : (<div></div>)}
                        </Col>
                    </Row>
                </div>
            </div>
        </div> : null}

        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>{Message}</p>
        </Modal>
    </>)
}