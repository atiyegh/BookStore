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
        title:'همه',
        value:'All'
    },
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
    const [bookType, setBookType] = useState('All');
    const [fileType,setFileType]=useState([]);
    const [bookListWithFilter,setBookListWithFilter]=useState([]);

    useEffect(() => {
        console.log('bookType',bookType)
        getbookList();
        determineFileType();
    }, [bookType])

    const determineFileType=()=>{
        let fileTypeBook=[];

        const getbooksFileType=()=>bookList.map((book)=>{
            const files=book.files.filter((file)=>file.type===3)
            //console.log(files)
            if(files.length>0){
                fileTypeBook.push('epub')
            }else{
                fileTypeBook.push('pdf')
            }
        })

        getbooksFileType();
        console.log(fileTypeBook);
        setFileType([...fileTypeBook]);
        console.log(fileType);
        
    };

    const changeBookType = (newValue) => {
        setBookType(newValue);
        console.log(bookType);
        console.log(newValue);
        getBookListWithFilter();
    };

    const getbookList = async () => {
        setIsLoading(true)
        try {
            const books = await getBookList()
            //console.log([...books])
            setIsLoading(false)
            setBookList([...books])
            console.log(bookList)            
            getBookListWithFilter()
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            error.code === 'ERR_NETWORK' ? setIsError(true) :
                notify(error.message, "error");
        }
    }

    const getBookListWithFilter=()=>{

        if(bookType==='All'){
            setBookListWithFilter(bookList)
        }else{
            const filteredbookList=bookList.filter((book,index)=>{
                if(book.type==='Text'){
                    if(bookType==='Text'){
                        return true
                    }
                    console.log('fileType',fileType[index])
                    console.log(bookType)
                    console.log(fileType[index]===bookType)
                    return fileType[index]===bookType
                }else{
                    console.log(book.type==='Voice')
                    return book.type==='Voice'
                }
            })
            console.log(filteredbookList)
            setBookListWithFilter(filteredbookList)
        }        
    }

    const clearFilter=()=>{
        setBookType('All')
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
                        bookListWithFilter.map((book) => {
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