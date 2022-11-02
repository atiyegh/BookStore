import React, { useEffect, useState } from 'react';
import { getBookList } from '../utils/api';
import BookCard from '../Components/BookList/BookCard/BookCard';
import '../Style/Home.scss';
import notify from "../Toastify/Toast";


function Home() {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        getbookList()
    }, [])

    const getbookList = async () => {
        try {
            const books = await getBookList()
            //console.log([...books])
            setBookList([...books])
            //console.log(bookList)

        } catch (error) {
            console.log(error)
            notify(error.message, "error");
        }
    }

    return (
        <div className='container'>
            {
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