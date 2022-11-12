//Hooks and Custom Components
import React, { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import DisplayRating from '../../../utils/DisplayRating';

//Style
import './BookCard.scss';

function BookCard({ coverUri, title, authors, price, rating,
    publisher,physicalPrice,numberOfPages,description ,id}) {

    let navigate = useNavigate();

    useEffect(()=>{
        //console.log(rating)
    },[rating])


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