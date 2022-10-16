import React from "react";
import styled from "styled-components";

const NewsLi = styled.li`
  list-style: none;
  margin: 1rem;
  cursor: pointer;
`;

const HackerNewsRow2 = (props) => {
  const [newsList, setNewsList] = React.useState([]);
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  React.useEffect(() => {
    fetch("https://api.hnpwa.com/v0/news/1.json", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setNewsList(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <>
      <div>
        {newsList.map((news) => (
          <NewsLi key={news.id}>
            <div className="cardRow">
              <div className="cardContent">
                <div className="title">🎈{news.title}</div>
                <div className="count">{news.comments_count}</div>
              </div>
              <div className="etc">
                <div className="user">{news.user}</div>
                <div className="points">{news.points}</div>
                <div className="ago">{news.time_ago}</div>
              </div>
            </div>
          </NewsLi>
        ))}
      </div>
    </>
  );
};

export default HackerNewsRow2;
