import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description,imageUrl,newsUrl,author,date,source} = this.props
    return (
      <div>
        <div className="card">
          <span className="badgbx position-absolute top-0 badge rounded-pill bg-danger" style={{right:'0'}}>
                 {source}
             </span>
          <img src={!imageUrl?"//cdn.decrypt.co/resize/1024/height/512/wp-content/uploads/2025/05/AI-decrypt-style-03-gID_7.png":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            
            <h5 className="card-title">{title} 
            </h5>
            <p className="card-text">{description}</p>
             <p className="card-text"><small className="text-muted">By {!author?'Unknown':author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark"  target='_blank' rel="noreferrer">Read More</a>
          </div>
        </div>
      </div>
    )
  }

}

export default NewsItem
