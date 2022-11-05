import React, { useEffect, useState } from 'react';
import { getBookList } from '../utils/api';
import BookCard from '../Components/BookList/BookCard/BookCard';
import '../Style/Home.scss';
import notify from "../Toastify/Toast";
import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import {Error_Messages} from '../utils/Errors/ErrorMessages';

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
            console.log(bookList)

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
                    bookList.map((book,index) => {
                        
                        return (
                                <BookCard
                                    coverUri={book.coverUri}
                                    title={book.title}
                                    authors={book.authors}
                                    price={book.price}
                                    rating={book.rating}
                                    publisher={book.publisher}
                                    physicalPrice={book.physicalPrice}
                                    numberOfPages={book.numberOfPages}
                                    description={book.description}
                                    id={book.id}
                                />
                        )

                    })
            }
            {
                isError && <Alert
                    message="خطای اتصال به شبکه"
                    description={Error_Messages.NETWORK_CONNECTION_ERROR.fa}
                    type="error" />
            }
        </div>
    )
}

export default Home