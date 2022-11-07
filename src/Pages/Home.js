import React, { useEffect, useState } from 'react';
import { getBookList } from '../utils/api';
import BookCard from '../Components/BookList/BookCard/BookCard';
import '../Style/Home.scss';
import notify from "../Toastify/Toast";
import { LoadingOutlined, ClearOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Error_Messages } from '../utils/Errors/ErrorMessages';
import { TreeSelect } from 'antd';

const treeData = [

    {
        title: 'صوتی',
        value: 'Voice',
    },
    {
        title: 'متنی',
        value: 'Text',
        children: [
            {
                title: 'ایپاب',
                value: 'epub',
            },
            {
                title: 'پی دی اف',
                value: 'pdf',
            },
        ],
    }
];


function Home() {
    const [bookList, setBookList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [bookType, setBookType] = useState('');


    useEffect(() => {
        console.log('bookType',bookType)
        getbookList();        
    }, [])

    const determineFileType=(book)=>{
        let fileTypeBook='';
        const getbooksFileType=(book)=>{
        
            const files=book.files.filter((file)=>file.type===3)
            //console.log(files)
            if(files.length>0){
                fileTypeBook='epub'
                //console.log(fileTypeBook)
            }else{
                fileTypeBook='pdf'
                //console.log(fileTypeBook)
            }
        }
        getbooksFileType(book);

        return fileTypeBook
        
    };

    const changeBookType = (newValue) => {
        setBookType(newValue);
        console.log(bookType);
        console.log(newValue);
    };

    const getbookList = async () => {
        setIsLoading(true)
        try {
            const books = await getBookList()
            //console.log([...books])
            setIsLoading(false)
            setBookList([...books])
            console.log([...bookList])

        } catch (error) {
            setIsLoading(false)
            console.log(error)
            error.code === 'ERR_NETWORK' ? setIsError(true) :
                notify(error.message, "error");
        }
    }

    const clearFilter=()=>{
        setBookType('')
        console.log(bookType)
    }

    return (
        <div className='container'>
            <div className='Filterbox'>
                <TreeSelect
                    style={{
                        width: '100%',
                    }}
                    value={bookType}
                    dropdownStyle={{
                        maxHeight: 400,
                        overflow: 'auto',
                    }}
                    treeData={treeData}
                    placeholder="نوع کتاب را انتخاب نمایید"
                    treeDefaultExpandAll
                    onChange={changeBookType}
                />
                <ClearOutlined onClick={clearFilter}/>
            </div>
            <div className='listBox'>
                {
                    isLoading ?
                        <div className='loadingFrame'>
                            <LoadingOutlined />
                            <p>لیست کتابها در حال بارگذاری است...</p>
                        </div> :
                        bookList.filter((book)=>{
                            if(bookType && book.type==='Text'){
                                if(bookType === 'Text'){
                                    return true
                                }
                                const bookTypePerBook=determineFileType(book);
                                return bookTypePerBook===bookType

                            }else if(bookType && book.type==='Voice'){
                                return book.type===bookType

                            }else{
                                return true;
                            }
                    })
                        .map((book) => {
                            //console.log(book)
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
            </div>

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