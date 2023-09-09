import React, { useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props)=>  {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1);
    }

    const updateNews= async () => {
        props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=15`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(70)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        document.title = `${capitalize(props.category)} - NewsZilla`
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=15`
        setPage(page+1)
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    };

        return (
            <>
                <h1 className='text-center' style={{marginTop:'90px',marginBottom:'40px'}}>
                    NewsZilla - Top Headlines from {capitalize(props.category)}
                </h1>
                {/* {state.loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={articles.length} //This is important field to render the next data
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={loading && <Spinner/>}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} style={props.style} text={props.text} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
}

News.defaultProps = {
    country: 'in',
    category: 'general',
    style: {
        color: 'black',
        backgroundColour: 'white'
    }
};

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
};

export default News
