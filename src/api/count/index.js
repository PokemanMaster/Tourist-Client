import request from '../index'

let UserId = '';
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if (user && user.id) {
    UserId = user.id;
}

const api = {

};


