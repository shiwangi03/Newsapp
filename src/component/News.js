import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      hasMore: true
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const { country, category, pageSize,apiKey } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
     this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
     this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles || [],
      loading: false,
      totalResults: parsedData.totalResults,
      hasMore: (parsedData.articles?.length || 0) < parsedData.totalResults
    });
        this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.updateNews
    );
  }

  handleNextClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.updateNews
    );
  }

  fetchMoreData = async () => {
    const { country, category, pageSize,apiKey} = this.props;
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    const newArticles = Array.isArray(parsedData.articles) ? parsedData.articles : [];
    const totalArticles = this.state.articles.concat(newArticles);

    const noMoreArticles = newArticles.length === 0 || totalArticles.length >= parsedData.totalResults;

    this.setState({
      articles: totalArticles,
      totalResults: parsedData.totalResults,
      loading: false,
      page: nextPage,
      hasMore: !noMoreArticles
    });
  }

  render() {
    return (
      <>
        <h1 className="text-center main-head" style={{ margin: '40px 0 60px' }}>
          Top-{this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>
              <b>🎉 Yay! You have seen it all.</b>
            </p>
          }
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => (
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
    )
  }
}

export default News;
