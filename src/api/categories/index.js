import request from '../index'

let UserId = '';
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if (user && user.id) {
    UserId = user.id;
}

const api = {
    CreateCategory: "api/v1/categories", // 创建分类
    ListCategories: "api/v1/categories", // 分类列表接口
};

// 分类页商品
export function CreateCategoryAPI() {
    return request({
        url: api.CreateCategory,
        method: 'get',
    })
}

export function ListCategoriesAPI() {
    return request({
        url: api.ListCategories,
        method: 'get',
    })
}

