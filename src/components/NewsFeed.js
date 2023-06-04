import { useEffect, useState } from "react";
import axios from "axios";

const NewsFeed = () => {

  const [articles, setArticles] = useState(null);

  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://crypto-news-live9.p.rapidapi.com/news/CryptoNews',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'crypto-news-live9.p.rapidapi.com'
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data)
      setArticles(response.data)

    }).catch((error) => {
      console.error(error);
    })
  }, [])

  console.log(articles)
  const first7Articles = articles?.slice(0,5);

  return (
    <div className="news-feed">
      <h2 className="newstext">News Feed</h2>
      {first7Articles?.map((article, _index) => (
      <div key={_index}>
        <a href={article.url} target={"_blank"} rel="noreferrer"><p>{ article.title }</p></a>
      </div>))}
    </div>
  );
}

export default NewsFeed;