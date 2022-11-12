//Hooks and Custom Components
import React, { useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import DisplayRating from '../utils/DisplayRating';

//Styles
import '../Style/BookDetail.scss';


function DetailedPage() {
    //State
    let book = useLocation().state;
    let location = useLocation();

    useEffect(() => {
        // console.log('book', book)
        // console.log('location', location.state)
    }, [])

    return (
        <div className='bookDetailContainer'>
            <div className='bookFrame'>
                <div className='coverbookframe'>
                    <img src={book.coverUri} className='imgCover' />
                </div>
                <div className='coverbookframe'>
                    <div className='DetailedInfo'>
                        <div className='DetailedInfo'>
                            <DisplayRating rating={book.rating} />
                        </div>
                        <div className='detailBox'>
                            <h3>
                                قیمت: 
                            </h3>
                            {book.price}
                        </div>
                        <div className='detailBox'>
                            <h3>
                                قیمت فیزیکی: 
                            </h3>
                            {book.physicalPrice}
                        </div>
                        <div className='detailBox'>
                            <h3>
                                عنوان:
                            </h3>
                            {book.title}
                        </div>
                        <div className='authorBox'>
                            <h3>
                                نویسندگان:
                            </h3>
                            <ul>
                                {
                                    book.authors.map((author) => {
                                        return <li>{author.firstName} {author.lastName}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className='detailBox'>
                            <h3>
                                ناشر:
                            </h3>
                            {book.publisher}
                        </div>
                        <div className='detailBox'>
                            <h3>
                                تعداد صفحات:
                            </h3>
                            {book.numberOfPages}
                        </div>

                    </div>

                </div>
            </div>

            <div className='descriptionSec'>
                <h3>
                    توضیحات:
                </h3>
                {book.description}
            </div>

            <div className='moreInfo'>
                <a href={`https://taaghche.com/book/${book.id}`}>توضیحات بیشتر...</a>             
            </div>
        </div>
    )
}

export default DetailedPage