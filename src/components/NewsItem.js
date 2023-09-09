import React from 'react'

const NewsItem=(props)=>{
        let { title, description, imageUrl, newsUrl, date, author,source,style,text } = props;
        return (
            <>
                <div className="card my-2" style={style}>
                    <div style={{
                        position:'absolute',
                        right:0
                    }}>
                    <span className="badge rounded-pill bg-danger">
                        {source}
                       
                    </span>
                    </div>
                    <img src={!imageUrl ? "https://cdn.ndtv.com/common/images/ogndtv.png" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className={`card-text text-${text}`}><small>By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </>
        )
}

export default NewsItem
