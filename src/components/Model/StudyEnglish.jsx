// 学习模块组件
import AA from './index.module.css'
import {RightCircleFilled} from "@ant-design/icons";

export default function StudyEnglish() {
    return (
        <>
            <div className={AA.body}>
                <div className={AA.picture}>
                    <img
                        src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt=""/>
                </div>
                <div className={AA.description}>
                    <h1>单词记忆20000</h1>
                    <span>Embarking on the journey of learning English is akin to strolling through</span>
                    <p>Created by Mark<RightCircleFilled className={AA.icon}/></p>
                </div>
            </div>
        </>
    )
}