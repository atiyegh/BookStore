import React from 'react'
import {LoadingOutlined} from '@ant-design/icons';
import './Loading.scss';

function Loading() {
    return (
        <div className='loadingFrame'>
            <LoadingOutlined />
            <p>لیست کتابها در حال بارگذاری است...</p>
        </div>
    )
}

export default Loading