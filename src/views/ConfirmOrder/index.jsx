import React, {useEffect, useState} from "react";
import AA from "./index.module.css"
import {ShowOrderAPI} from "../../api/orders";
import {useLocation} from "react-router-dom";
import {Col, Row} from "antd";
import {ShowAddressesAPI} from "../../api/addresses";


export default function ConfirmOrder() {

    const location = useLocation();
    const [order, setOrder] = useState([])
    const [address, setAddress] = useState([])

    useEffect(() => {
        const orderNum = location.state && location.state.orderNum;
        ShowOrderAPI(orderNum).then(res => {
            setOrder(res.data);
            console.log("ShowOrderAPI", res.data);
            ShowAddressesAPI(res.data.user_id).then(res => {
                setAddress(res.data[0]);
                console.log("ShowAddressesAPI", res.data[0]);
            }).catch(err => {
                console.log(err);
            });
        });
    }, [location.state]); // 将 location.state 添加到依赖数组


    // 解析 JSON 格式图片
    function JsonParseFacade(value) {
        if (value) {
            try {
                const parsedValue = JSON.parse(value); // 解析 JSON 字符串
                return parsedValue.facade || ""; // 返回 facade 数组，如果不存在则返回空字符串
            } catch (error) {
                console.error("JSON解析错误:", error);
                return ""; // 返回空字符串或处理错误的方式
            }
        }
        return ""; // 如果 value 是 undefined，返回空字符串
    }


    const OrderDetails = [{
        id: "购物车总价",
        images: order.images,
        name: order.title,
        number: order.num,
        price: order.actualPrice * order.num
    },];
    const ReceiptInformation = [{id: "收件人", money: address.name}, {
        id: "手机号码",
        money: address.Telephone
    }, {id: "收货地址", money: address.address},];
    const OrderInformation = [{id: "订单编号", money: order.code}, {id: "下单时间", money: order.created_time},];
    return (<div className={AA.body}>
        <h1>订单提交成功！</h1>
        <p>我们已经收到您的订单，将尽快为您发货。收获期间请保持手机畅通!</p>
        <div className={AA.Contain}>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={AA.ContainOrder}>
                        <h4>订单详情</h4>
                        <table className={AA.ContainMoney}>
                            <thead>
                            <tr>
                                <th>图片</th>
                                <th>商品名称</th>
                                <th>数量</th>
                                <th>总价</th>
                            </tr>
                            </thead>
                            <tbody>
                            {OrderDetails.map(item => (<tr key={item.id}>
                                <td className={AA.ContainOrderId}>
                                    <img
                                        src={JsonParseFacade(item.images)}
                                        alt=""/>
                                </td>
                                <td className={AA.ContainOrderId}>{item.name}</td>
                                <td className={AA.ContainOrderId}>{item.number}</td>
                                <td className={AA.ContainOrderId}>{item.price}</td>
                            </tr>))}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
            <div className={AA.Information}>
                <div className={AA.ReceiptInformation}>
                    <h4>收货信息</h4>
                    <table className={AA.ContainMoney}>
                        {ReceiptInformation.map(item => (<tr key={item.id}>
                            <td className={AA.ContainOrderId}>{item.id}</td>
                            <td className={AA.ContainOrderId}>{item.money}</td>
                        </tr>))}
                    </table>
                </div>
                <div className={AA.ReceiptInformation}>
                    <h4>订单信息</h4>
                    <table className={AA.ContainMoney}>
                        {OrderInformation.map(item => (<tr key={item.id} >
                            <td className={AA.ContainOrderId}>{item.id}</td>
                            <td className={AA.ContainOrderId}>{item.money}</td>
                        </tr>))}
                    </table>
                </div>
            </div>
        </div>
    </div>)
}