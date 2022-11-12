//Hooks and Custom Components
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getBookListAPI } from '../utils/api';
import { Error_Messages } from '../utils/Errors/ErrorMessages';
import Loading from '../Components/Common/Loading/Loading';
import BookCard from '../Components/BookList/BookCard/BookCard';

//Style
import '../Style/Home.scss';
import notify from "../Toastify/Toast";
import { Alert } from 'antd';
import { TreeSelect } from 'antd';
import { ClearOutlined } from '@ant-design/icons';

//Filters and Sort Values
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

const treeDataSort = [
    {
        title: 'صعودی',
        value: '0-0',
        children: [
            {
                title: 'بر اساس قیمت',
                value: 'ascPrice',
            },
            {
                title: 'بر اساس امتیاز',
                value: 'ascRating',
            },
        ],
    },
    {
        title: 'نزولی',
        value: '0-1',
        children: [
            {
                title: 'بر اساس قیمت',
                value: 'descPrice',
            },
            {
                title: 'بر اساس امتیاز',
                value: 'descRating',
            },
        ],
    },
];


function Home() {
    //States
    const [bookList, setBookList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [bookType, setBookType] = useState('');
    const [sortConfig, setSortConfig] = useState({
        type: '',
        basedOn: ''
    })
    const [hasMore, setHasMore] = useState(true);
    const [Offset, setOffset] = useState('0-0-16-16');

    //useEffects
    useEffect(() => {
        getbookList();
    }, [])


    //Methods
    
    //Getting list of books
    const getbookList = async () => {
        setIsLoading(true)
        try {
            const ApiResponse = await getBookListAPI(Offset)
            //setIsLoading(false)
            const NewbookList = bookList.concat(ApiResponse.bookList.books)
            setHasMore(ApiResponse.hasMore)
            setOffset(ApiResponse.nextOffset)
            setBookList([...NewbookList])
            console.log([...bookList])

        } catch (error) {
            //setIsLoading(false)
            console.log(error)
            error.code === 'ERR_NETWORK' ? setIsError(true) :
            notify(error.message, "error");
        }
        finally{
            setIsLoading(false)
        }
    }

    //Sort setting methods

    //Execute sorting list
    const sortListSetting = (a, b) => {
        switch (true) {
            case (sortConfig.type === 'asc' && sortConfig.basedOn === 'price'):
                return a.price - b.price;
            case (sortConfig.type === 'asc' && sortConfig.basedOn === 'rating'):
                return a.rating - b.rating;
            case (sortConfig.type === 'des' && sortConfig.basedOn === 'price'):
                return b.price - a.price;
            case (sortConfig.type === 'des' && sortConfig.basedOn === 'rating'):
                return b.rating - a.rating;
        }

    }

    //Set sort criteria
    const onChangeSort = (newValue) => {
        console.log(newValue);
        const sortvalue = {};

        switch (newValue) {
            case 'ascPrice':
                sortvalue.type = 'asc';
                sortvalue.basedOn = 'price';
                setSortConfig({ ...sortvalue });
                console.log(sortvalue)
                break;
            case 'ascRating':
                sortvalue.type = 'asc';
                sortvalue.basedOn = 'rating';
                setSortConfig({ ...sortvalue });
                console.log(sortvalue)
                break;
            case 'descPrice':
                sortvalue.type = 'des';
                sortvalue.basedOn = 'price';
                setSortConfig({ ...sortvalue });
                console.log(sortvalue)
                break;
            case 'descRating':
                sortvalue.type = 'des';
                sortvalue.basedOn = 'rating';
                setSortConfig({ ...sortvalue });
                console.log(sortvalue)
                break;
        }
    };


    //Filter setting methods
    const changeBookType = (newValue) => {
        setBookType(newValue);
    };

    const determineFileType = (book) => {
        let fileTypeBook = '';
        const getbooksFileType = (book) => {
            const files = book.files.filter((file) => file.type === 3)
            if (files.length > 0) {
                fileTypeBook = 'epub'
            } else {
                fileTypeBook = 'pdf'
            }
        }
        getbooksFileType(book);
        return fileTypeBook
    };

    //clear filter method
    const clearFilter = () => {
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
                <ClearOutlined onClick={clearFilter} />
            </div>
            <div className='sortBox'>
                <TreeSelect
                    style={{
                        width: '100%',
                    }}
                    value={sortConfig}
                    dropdownStyle={{
                        maxHeight: 400,
                        overflow: 'auto',
                    }}
                    treeData={treeDataSort}
                    placeholder="مرتب سازی براساس..."
                    treeDefaultExpandAll
                    onChange={onChangeSort}
                />
            </div>
            
            <div className='listBox'>
                <InfiniteScroll
                    dataLength={bookList.length} 
                    next={getbookList}
                    hasMore={hasMore}
                >
                    {
                        bookList.filter((book) => {
                            if (bookType && book.type === 'Text') {
                                if (bookType === 'Text') {
                                    return true
                                }
                                const bookTypePerBook = determineFileType(book);
                                return bookTypePerBook === bookType

                            } else if (bookType && book.type === 'Voice') {
                                return book.type === bookType

                            } else {
                                return true;
                            }
                        })
                            .sort((a, b) => sortListSetting(a, b))
                            .map((book) => {
                                console.log(book)
                                console.log(book.rating)
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
                </InfiniteScroll>
                {isLoading && <Loading />}
                {!hasMore && <p>شما به انتهای لیست رسیده اید...</p>}
            </div>

            {
                isError && <Alert
                    message="خطای اتصال به شبکه"
                    description={Error_Messages.NETWORK_CONNECTION_ERROR.fa}
                    type="error" />
            }
        </div >
    )
}

export default Home