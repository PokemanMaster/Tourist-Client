import S from './index.module.css';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Col, Row} from "antd";
import Search from "antd/es/input/Search";
import {ListCategoriesAPI, ListProductsAPI, ListProductsParamsAPI} from "../../api/products";
import {SearchProductsAPI} from "../../api/products";
import {ListRankingAPI} from "../../api/rankings";
import {Link as MuiLink} from "@mui/material";

// 商品分类页
export default function Goods() {
    const navigateTo = useNavigate();

    // 商品列表 ListProducts
    const [ListProducts, setListProducts] = useState([]);
    useEffect(() => {
        ListProductsParamsAPI().then(res => {
            // console.log("商品列表", res.data);
            setListProducts(res.data.items);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    // 分类列表 Categories
    const [ListCategories, setListCategories] = useState([]);
    useEffect(() => {
        ListCategoriesAPI().then(res => {
            // console.log("分类列表", res.data);
            setListCategories(res.data);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    // 排行榜
    const [activeTab, setActiveTab] = useState(0);
    const GetRanking = () => {
        ListRankingAPI().then(res => {
            setActiveTab(1);
            setListCategoriesSelect(999);
            setListProducts(res.data);
        }).catch(err => {
            console.log(err);
        });
    };

    // 点击分类列表展示不同的类型商品
    const [ListCategoriesSelect, setListCategoriesSelect] = useState(0);
    const ListCategoriesSelectFunc = (category_id) => {
        setActiveTab(0);
        category_id = parseInt(category_id, 10);
        setListCategoriesSelect(category_id);
        // 根据不同的category_id展示不同的商品
        ListProductsAPI({"category_id": category_id}).then(res => {
            setListProducts(res.data.items);
        }).catch(err => {
            console.error(err);
        });
    };

    // 商品详情 ShowProduct
    function ShowProduct(value) {
        navigateTo(`/layout/product/${value.id}`);
    }

    // 搜索
    function SearchProducts(value) {
        SearchProductsAPI({"search": value}).then(res => {
            setListProducts(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            {/* 搜索 */}
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={S.search}>
                        <Search
                            placeholder="请输入要搜索的商品名字"
                            enterButton="Search"
                            size="large"
                            onSearch={SearchProducts}
                            maxLength={20}
                        />
                    </div>
                </Col>
            </Row>
            {/* 分类栏 */}
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={S.genre}>
                        <div className={S.genreList}>
                            {ListCategories ? (ListCategories.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => ListCategoriesSelectFunc(item.id)}
                                    className={ListCategoriesSelect === item.id ? S.active : ''}
                                >
                                    {item.name}
                                </li>
                            ))) : <div></div>}
                            <li onClick={GetRanking} className={activeTab === 1 ? S.active : ''}>总榜</li>
                        </div>
                    </div>
                </Col>
            </Row>
            {/* 商品 */}
            <div className={S.Products}>
                <Row>
                    {ListProducts ? (ListProducts.map((item) => {
                        // 解析 images 字段
                        const facade = JSON.parse(item.images).facade || [];
                        return (
                            <Col xs={12} sm={8} md={6} lg={4} xl={3} key={item.id}>
                                <div
                                    onClick={() => ShowProduct(item)}
                                    className={S.Product}
                                >
                                    <div className={S.ProductImage}>
                                        {/* 渲染 facade 图片 */}
                                        {facade.map((url, index) => (
                                            <img key={index} src={url} alt={""}/>
                                        ))}
                                    </div>
                                    <div className={S.ProductIntroduce}>
                                        <div className={S.ProductIntroduceName}>{item.title}</div>
                                        <div className={S.ProductIntroduceValue}>¥{item.price}</div>
                                    </div>
                                </div>
                            </Col>
                        );
                    })) : null}
                </Row>
            </div>
            <Row style={{textAlign: 'center'}}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <MuiLink href="https://beian.miit.gov.cn/" underline="none" style={{color: "#333"}}>
                        桂ICP备2023004200号-2
                    </MuiLink>
                </Col>
            </Row>
        </>
    );
}
