import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const { country, category, pageSize, apiKey, setProgress } = props;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
    updateNews(); // initial fetch
    // eslint-disable-next-line
  }, []);

  const updateNews = async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    setProgress(30);

    let data = await fetch(url);
    let parsedData = await data.json();
    setProgress(50);

    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults);
    setHasMore((parsedData.articles?.length || 0) < parsedData.totalResults);
    setLoading(false);
    setProgress(100);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    const newArticles = Array.isArray(parsedData.articles) ? parsedData.articles : [];
    const totalArticles = articles.concat(newArticles);

    const noMoreArticles = newArticles.length === 0 || totalArticles.length >= parsedData.totalResults;

    setArticles(totalArticles);
    setTotalResults(parsedData.totalResults);
    setPage(nextPage);
    setHasMore(!noMoreArticles);
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-center main-head" style={{ margin: '100px 0 50px' }}>
        Top-{capitalizeFirstLetter(category)} Headlines
      </h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            <b>🎉 Yay! You have seen it all.</b>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsItem
                  imageUrl={element.urlToImage}
                  title={element.title}
                  description={element.description}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
