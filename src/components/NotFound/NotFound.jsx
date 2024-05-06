// 这个是个空的组件，处理404的情况
import React from 'react';
import {animated, useSpring} from 'react-spring';
import AA from './index.module.css'
import {useNavigate} from "react-router-dom";

export default function NotFound() {
    const navigateTo = useNavigate()
    const animationProps = useSpring({
        opacity: 1,
        from: {opacity: 0},
        reset: true,
    });

    function toLogin() {
        navigateTo('/login')
    }

    function toRegister() {
        navigateTo('/register')
    }

    return (
        <div className={AA.NotFoundContainer}>
            <animated.div style={animationProps} className={AA.NotFound}>
                <h1>404</h1>
                <p>你尚未登录，请前往登录页面</p>
            </animated.div>
            <div className={AA.User}>
                <p onClick={toLogin}>立即前往登录</p>
                <p onClick={toRegister}>还没有注册?立即前往注册</p>
            </div>
        </div>
    );
};

