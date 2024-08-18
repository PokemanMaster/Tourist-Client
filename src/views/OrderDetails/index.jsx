import React, {useEffect, useState} from "react";
import AA from "./index.module.css"
import {Button, Col, Drawer, Row} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {ShowAddressesAPI} from "../../api/addresses";
import { ListOrdersAPI} from "../../api/orders"
import S from "../UserAddress/index.module.css";
import emptyCart from "../../public/images/cart_empty.png";
import {CreatePayAPI} from "../../api/pay";

export default function OrderDetails() {
    const navigateTo = useNavigate()
    const location = useLocation();

    // 地址
    const [address, setAddress] = useState("");
    const [addressData, setAddressData] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        ShowAddressesAPI().then(res => {
            setAddress(res.data[0]);
        }).catch(err => {
            console.log(err);
        });

        ListOrdersAPI().then(res => {
            const items = res.data.items;
            // 使用 reduce 找到 created_time 最大的那一项数据
            const maxCreatedTimeItem = items.reduce((maxItem, currentItem) =>
                    currentItem.created_time > maxItem.created_time ? currentItem : maxItem
                , items[0]);
            setOrder(maxCreatedTimeItem);
            // 你可以在这里设置状态或进一步处理 maxCreatedTimeItem
        }).catch(err => {
            console.log(err);
        });
    }, []);


    // 展示收货地址信息
    const cart = location.state.Cart
    const WeChatPay = () => {
        console.log(cart)
        CreatePayAPI({
            "ProductID": cart.product_id,
            "Code" : order.code,
            "UserID": cart.user_id,
            "OrderID": order.id,
            "QAID": 1,
            "DEID": 1,
            "PostID": 1,
            "Price": cart.price,
            "AddressID": address.id,
            "ECP": 1,
            "PaymentType": 3,
            "Status": 2,
        }).then(res => {
            console.log(res)
            navigateTo(`/layout/personal/order/`)
        }).catch(err => {
            console.log(err)
        })
    }


    // 打开/关闭地址 抽屉
    const [OpenDrawer, setOpenDrawer] = useState(false);
    const DrawerModal = (bool) => {
        ShowAddressesAPI().then(res => {
            setAddressData(res.data)
        }).catch(err => {
            console.log(err);
        });
        setOpenDrawer(bool);
    };


    function selectAddress(data) {
        setAddress(data)
        setOpenDrawer(false)
    }

    return (
        <div className={AA.body}>
            <h1>
                线上支付
            </h1>


            <div className={S.address} onClick={() => DrawerModal(true)}>
                {address ? (<div className={S.addressItem} key={address.id}>
                    <div className={S.itemProfile}>
                        <span>{address.name}&nbsp;,</span>
                        <span className={S.itemTelephone}>{address.phone}</span>
                        <p>{address.address}</p>
                    </div>
                    <div className={S.itemButton}>
                        <div className={S.default}></div>
                        <div className={S.selectButton}>
                            <Button className={S.updateButton}
                                    type="primary">修改</Button>
                        </div>
                    </div>
                </div>) : <div className={S.EmptyCart}>
                    {/* 此处的图片不能直接写路径，只能通过import的方式将它引入进来 */}
                    <img src={emptyCart} alt="" className={S.EmptyCartImg}/>
                    <div className={S.EmptyCartText1}>购物车竟然是空的！</div>
                    <div className={S.EmptyCartText2}>再忙，也要记得买点什么犒劳自己~</div>
                </div>}
            </div>


            <div className={AA.Contain}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className={AA.ContainPay}>
                            <h4>选择支付方式</h4>
                            <h5>平台支付</h5>
                            <div className={AA.Platform}>
                                <Button onClick={WeChatPay}>微信支付</Button>
                                <Button>支付宝支付</Button>
                                <Button>云闪付</Button>
                                <Button>PayPal</Button>
                            </div>
                            <h5>银联支付</h5>
                            <div className={AA.UnionPay}>
                                <Button>江苏银行</Button>
                                <Button>中国银行</Button>
                                <Button>招商银行</Button>
                                <Button>工商银行</Button>
                                <Button>建设银行</Button>
                                <Button>农业银行</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* 选择抽屉地址栏 */}
            <Drawer
                placement={"bottom"}
                closable={false}
                onClose={() => DrawerModal(false)}
                open={OpenDrawer}
                key={"bottom"}
            >
                <h2>选择地址栏</h2>
                <div className={S.address}>
                    {addressData ? (addressData.map((item) => (
                        <div className={S.addressItem} onClick={() => selectAddress(item)} key={item.id}>
                            <div className={S.itemProfile}>
                                <span>{item.name}&nbsp;,</span>
                                <span className={S.itemTelephone}>{item.phone}</span>
                                <p>{item.address}</p>
                            </div>
                        </div>))) : <div className={S.EmptyCart}>
                        {/* 此处的图片不能直接写路径，只能通过import的方式将它引入进来 */}
                        <img src={emptyCart} alt="" className={S.EmptyCartImg}/>
                        <div className={S.EmptyCartText1}>购物车竟然是空的！</div>
                        <div className={S.EmptyCartText2}>再忙，也要记得买点什么犒劳自己~</div>
                    </div>}
                </div>
            </Drawer>
        </div>


    )
}