import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function DetailedPage() {
    let book = useLocation().state;

    useEffect(() => {
        console.log(book)
    }, [])

    return (
        <div className='bookDetailContainer'>
            <div className='coverbookframe'>
                <img src='book.coverUri' />
            </div>
            <div className='DetailedInfo'>
                <div className='detailBox'>
                    <span>
                        عنوان:
                    </span>
                    {book.title}
                </div>
                <div className='detailBox'>
                    <span>
                        نویسندگان
                    </span>
                    <ul>
                        {book.authors.map((author) => {
                            return <li>{author}</li>
                        })}
                    </ul>
                </div>
                <div className='detailBox'>
                    <span>
                        ناشر
                    </span>
                    {book.publisher}
                </div>
                <div className='detailBox'>
                    <span>
                        تعداد صفحات
                    </span>
                    {book.numberOfPages}
                </div>
                <div className='detailBox'>
                    <span>
                        توضیحات
                    </span>
                    {book.description}
                </div>
            </div>
            <div className='DetailedInfo'>
                <div className='detailBox'>
                    <span>
                        امتیاز
                    </span>
                    {book.title}
                </div>
            </div>
        </div>
    )
}

export default DetailedPage