// 日历组件
import React from 'react';
import {Calendar} from 'antd';

const CalendarComponent = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };


    return (
        <Calendar
            fullscreen={false}
            onPanelChange={onPanelChange}
            className="AA.ant-picker-calendar"
        />
    );
};

export default CalendarComponent;
