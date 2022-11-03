import React, { useEffect,useState } from 'react';
import './BookCard.scss';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
function BookCard({ coverUri, title, authours, price, rating,
    publisher,physicalPrice,numberOfPages,description ,id}) {

    const [starRate, setStarRate] = useState([0,0,0,0,0])

    //console.log(coverUri, title, authours, price, rating)
    let navigate = useNavigate();
    useEffect(()=>{
        showRating();
        console.log('starRate')
    },[])

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
    const navToDetailBook=()=>{
        navigate(`/${id}`, { state: {
            coverUri,
            title,
            authours,
            price,
            rating,
            publisher,
            physicalPrice,
            numberOfPages,
            description,
            id
        }});
        console.log(id)
    }

    
    return (
        <div className='cardFrame'onClick={navToDetailBook}>
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