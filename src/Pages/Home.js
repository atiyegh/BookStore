import React, { useEffect, useState } from 'react';
import { getBookList } from '../utils/api';
import BookCard from '../Components/BookList/BookCard/BookCard';
import '../Style/Home.scss';
import notify from "../Toastify/Toast";
import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';

function Home() {
    const [bookList, setBookList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        getbookList()
    }, [])

    const getbookList = async () => {
        setIsLoading(true)
        try {
            const books = await getBookList()
            //console.log([...books])
            setIsLoading(false)
            setBookList([...books])
            //console.log(bookList)

        } catch (error) {
            setIsLoading(false)
            console.log(error)
            error.code === 'ERR_NETWORK' ? setIsError(true) :
                notify(error.message, "error");
        }
    }

    return (
        <div className='container'>
            {
                isLoading ?
                    <div className='loadingFrame'>
                        <LoadingOutlined />
                        <p>لیست کتابها در حال بارگذاری است...</p>
                    </div> :
                    bookList.map((book) => {
                        //console.log(book)
                        return <BookCard
                            coverUri={book.coverUri}
                            title={book.title}
                            authours={book.authors}
                            price={book.price}
                            rating={book.rating}
                        />
                    })
            }
            {
                isError && <Alert
                    message="خطای شبکه"
                    description=".به اینترنت متصل نیستید. اتصال خود به اینترنت را بررسی کرده و مجدداً امتحان نمایید"
                    type="error" />
            }
        </div>
    )
}

export default Home