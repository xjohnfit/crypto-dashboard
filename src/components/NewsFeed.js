import { useEffect, useState } from "react";
import axios from "axios";

const NewsFeed = () => {

  const [articles, setArticles] = useState(null);

  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://crypto-news-live9.p.rapidapi.com/news',
      headers: {
        'X-RapidAPI-Key': '46e4600040msh2fc1496a0ac3011p147823jsn2ca935ec8b45',
        'X-RapidAPI-Host': 'crypto-news-live9.p.rapidapi.com'
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data)

    }).catch((error) => {
      console.error(error);
    })
  }, [])

  return (
    <div className="news-feed">
      News Feed
    </div>
  );
}

export default NewsFeed;