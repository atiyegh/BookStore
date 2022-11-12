import React, { useEffect, useState } from 'react';
import { getBookListAPI } from '../utils/api';
import BookCard from '../Components/BookList/BookCard/BookCard';
import '../Style/Home.scss';
import notify from "../Toastify/Toast";
import { ClearOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Error_Messages } from '../utils/Errors/ErrorMessages';
import { TreeSelect } from 'antd';
import Loading from '../Components/Common/Loading/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    const [bookList, setBookList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [Offset, setOffset] = useState('0-0-16-16');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [bookType, setBookType] = useState('');
    const [sortConfig, setSortConfig] = useState({
        type: '',
        basedOn: ''
    })

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


    useEffect(() => {
        getbookList();
    }, [])



    const determineFileType = (book) => {
        let fileTypeBook = '';
        const getbooksFileType = (book) => {

            const files = book.files.filter((file) => file.type === 3)
            //console.log(files)
            if (files.length > 0) {
                fileTypeBook = 'epub'
                //console.log(fileTypeBook)
            } else {
                fileTypeBook = 'pdf'
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
            const ApiResponse = await getBookListAPI(Offset)
            setIsLoading(false)
            const NewbookList = bookList.concat(ApiResponse.bookList.books)
            setHasMore(ApiResponse.hasMore)
            setOffset(ApiResponse.nextOffset)
            setBookList([...NewbookList])
            console.log([...bookList])

        } catch (error) {
            setIsLoading(false)
            console.log(error)
            error.code === 'ERR_NETWORK' ? setIsError(true) :
            notify(error.message, "error");
        }
    }

    const clearFilter = () => {
        setBookType('')
        console.log(bookType)
    }
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
                    dataLength={bookList.length} //This is important field to render the next data
                    next={getbookList}
                    hasMore={hasMore}
                    //loader={<Loading />}
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