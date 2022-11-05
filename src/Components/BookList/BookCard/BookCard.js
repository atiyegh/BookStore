import React, { useEffect,useState } from 'react';
import './BookCard.scss';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import DisplayRating from '../../../utils/DisplayRating';

function BookCard({ coverUri, title, authors, price, rating,
    publisher,physicalPrice,numberOfPages,description ,id}) {


    //console.log(coverUri, title, authours, price, rating)
    let navigate = useNavigate();
    useEffect(()=>{

    },[])

    
    const navToDetailBook=()=>{
        navigate(`/${id}`, { state: {
            coverUri,
            title,
            authors,
            price,
            rating,
            publisher,
            physicalPrice,
            numberOfPages,
            description,
            id
        }});
        //console.log(id)
    }

    
    return (
        <div className='cardFrame'onClick={navToDetailBook}>
            <img alt={title} src={coverUri} className='bookCover' />

            <div className='Cardsec'>
                <span>عنوان: </span>
                {title}
            </div>

            <div className='Cardsec authors'>
                <p>نویسندگان: </p>
                <ul>
                    {
                        authors.map((author) => {
                            return <li>{author.firstName} {author.lastName}</li>
                        })
                    }
                </ul>
            </div>

            <div className='Cardsec'>
                <span>قیمت: </span>
                {price}
            </div>

            <DisplayRating rating={rating}/>
        </div>
    )
}

export default BookCard