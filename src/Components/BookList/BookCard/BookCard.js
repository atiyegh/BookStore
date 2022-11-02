import React, { useEffect,useState } from 'react';
import './BookCard.scss';
import { StarOutlined, StarFilled } from '@ant-design/icons';

function BookCard({ coverUri, title, authours, price, rating }) {
    const [starRate, setStarRate] = useState([0,0,0,0,0])
    //console.log(coverUri, title, authours, price, rating)

    useEffect(()=>{
        showRating();
        console.log(starRate)
    },[])

    const showRating = () => {
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
        <div className='cardFrame'>
            <img alt={title} src={coverUri} className='bookCover' />

            <p className='Cardsec'>
                <span>عنوان: </span>
                {title}
            </p>

            <p className='Cardsec authors'>
                <p>نویسندگان: </p>
                <ul>
                    {
                        authours.map((author) => {
                            return <li>{author.firstName} {author.lastName}</li>
                        })
                    }
                </ul>
            </p>

            <p className='Cardsec'>
                <span>قیمت: </span>
                {price}
            </p>

            <p className='Cardsec rating'>
                <span>امتیاز</span>
                {starRate.map((star)=>{
                    if(star){
                        return <StarFilled />
                    }else{
                        return <StarOutlined />
                    }
                })}
            </p>
        </div>
    )
}

export default BookCard