import request from '../index'

let UserId = '';
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if (user && user.id) {
    UserId = user.id;
}

const api = {
    ListCarousels: "api/v1/carousels", // 轮播图列表
};

// 轮播图
export const ListCarouselsAPI = () => {
    return request(api.ListCarousels, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};
