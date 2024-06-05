import {Button, Col, Empty, Row} from "antd";
import React, {useEffect, useState} from "react";
import S from './index.module.css'
import {ListOrdersAPI} from "../../api/orders";
import {useNavigate} from "react-router-dom";
import emptyCart from "../../public/images/cart_empty.png";
import {Link} from "@mui/joy";
import clogo from "../../public/images/clogo.png";

export default function Order() {
    const [UserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const navigateTo = useNavigate(); // 路由
    const [order, setOrder] = useState([]);

    useEffect(() => {
        // 检查用户数据是否存在
        if (UserInfo) {
            // 获取商品列表
            ListOrdersAPI(UserInfo.id).then((res) => {
                setOrder(res.data.items);
            });
        }
    }, [UserInfo]); // 添加 UserId 到依赖数组中

    // 跳转到订单详情
    function ViewTheOrder(orderNum) {
        navigateTo(`/layout/order/confirm/${orderNum}`, {
            state: {orderNum: orderNum}
        })
    }


    return (<>
        {UserInfo ? <div>
                <div className={S.TopHeader}>
                    <div className={S.CartHeader}>
                        <div className={S.Logo}>
                            <Link to="/">
                                <img src={clogo} alt=""/>
                            </Link>
                        </div>
                        <div className={S.CartHeaderContent}>
                            <p>我的订单</p>
                        </div>
                    </div>
                </div>
                {order && order.length > 0 ? (order.map(item => (<div className={S.CarItem} key={item.id}>
                        <Row>
                            <div className={S.CarItemTop}>
                                <Col xs={7} sm={6} md={6} lg={6} xl={4}>
                                    {/* 商品图片 */}
                                    <div className={S.carItemPicture}>
                                        <img src={item.img_path} alt=""/>
                                    </div>
                                </Col>
                                <Col xs={14} sm={6} md={6} lg={6} xl={8}>
                                    {/* 商品介绍 */}
                                    <div className={S.carItemIntroduce}>
                                        <span>{item.name}</span>
                                    </div>
                                </Col>
                            </div>
                        </Row>

                        <div className={S.CarItemBottom}>
                            <Row>
                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                    {/* 商品金额 */}
                                    <div className={S.CarItemMoney}>
                                        <span>{(item.discount_price * item.num).toFixed(2)}</span>
                                    </div>
                                </Col>
                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                    {/* 查看订单商品 */}
                                    <Button
                                        type="primary"
                                        danger
                                        ghost
                                        className={S.CarItemButton}
                                        onClick={() => ViewTheOrder(item.order_num)}
                                    >
                                        查看订单
                                    </Button>
                                </Col>
                            </Row>
                        </div>

                    </div>))) :
                    // 没有订单展示
                    <div className={S.EmptyCart}>
                        {/* 此处的图片不能直接写路径，只能通过import的方式将它引入进来 */}
                        <img src={emptyCart} alt="" className={S.EmptyCartImg}/>
                        <div className={S.EmptyCartText1}>订单竟然是空的！</div>
                        <div className={S.EmptyCartText2}>再忙，也要记得买点什么犒劳自己~</div>
                    </div>}
            </div> :
            // 没有登录就展示
            <div className={S.Empty}>
                <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                        height: 160,
                    }}
                    description={<span>你还没有 <a href="/">登录？</a></span>}>
                    <Button type="primary" onClick={() => {
                        navigateTo("/login")
                    }}>点击登录</Button>
                </Empty>
            </div>}
    </>)
}