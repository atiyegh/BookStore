import React, { useEffect,useState } from 'react';
import '../Style/Common.scss';
import {StarFilled,StarOutlined} from '@ant-design/icons';

function DisplayRating({ rating }) {
    const [starRate, setStarRate] = useState([0,0,0,0,0])

    useEffect(()=>{
        console.log(rating)
        showRating(rating)
    },[rating])

    const showRating = (rating) => {
        switch (true) {
            case (rating >= 1 && rating < 2) :
                setStarRate([1,0,0,0,0]);
                break;
            case (rating >= 2 && rating < 3):
                setStarRate([1,1,0,0,0]);
                break;
            case (rating >= 3 && rating < 4):
                setStarRate([1,1,1,0,0]);
                break;
            case (rating >= 4 && rating < 5):
                setStarRate([1,1,1,1,0]);
                break;
            case (rating === 5):
                setStarRate([1,1,1,1,1]);
                break;
            default:
                setStarRate([0,0,0,0,0]);
        }
    }

    return (
        <p className='Cardsec rating'>
            <span>امتیاز</span>
            {starRate.map((star) => {
                if (star) {
                    return <StarFilled />
                } else {
                    return <StarOutlined />
                }
            })}
        </p>
    )
}

export default DisplayRating