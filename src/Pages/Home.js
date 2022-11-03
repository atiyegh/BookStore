import React, { useEffect, useState } from 'react';
import { getBookList } from '../utils/api';
import BookCard from '../Components/BookList/BookCard/BookCard';
import '../Style/Home.scss';
import notify from "../Toastify/Toast";
import { LoadingOutlined } from '@ant-design/icons';

function Home() {
    const [bookList, setBookList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        </div>
    )
}

export default Home