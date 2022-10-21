import { Route, Routes } from "react-router-dom"
import HackerNews from "./components/news/HackerNews"
import HackerNewsReple from "./components/news/HackerNewsReple"
import LoginPage from "./components/LoginPage"
import "bootstrap/dist/css/bootstrap.min.css"
import DeptList from "./components/dept/DeptList"
import "./css/dept.css"
import DeptDetail from "./components/dept/DeptDetail"
import YoutubeList from "./components/YoutubeList"
import NoticeList from "./components/notice/NoticeList"
import NoticeDetail from "./components/notice/NoticeDetail"
import { useEffect, useState } from "react"
import axios from "axios"

const App = ({ authLogic, pictureUpload }) => {
  //페ㅣ징처리추가
  const [newsList, setNewsList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [newsPerPage, setNewsPerPage] = useState(7)
  const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json"
  useEffect(() => {
    axios.get(NEWS_URL).then((response) => {
      setNewsList(response.data)
    })
  }, [])
  const indexOfLast = currentPage * newsPerPage
  const indexOfFirst = indexOfLast - newsPerPage
  const currentNews = (news) => {
    let currentNews = 0
    currentNews = news.slice(indexOfFirst, indexOfLast)
    return currentNews
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          exact={true}
          element={<LoginPage authLogic={authLogic} />}
        />
        <Route
          path="/notice"
          exact={true}
          element={<NoticeList authLogic={authLogic} />}
        />
        <Route
          path="/noticedetail/:n_no"
          exact={true}
          element={<NoticeDetail authLogic={authLogic} />}
        />
        <Route
          path="/dept"
          exact={true}
          element={
            <DeptList authLogic={authLogic} pictureUpload={pictureUpload} />
          }
        />
        <Route
          path="/hackernews/:userId"
          exact={true}
          element={
            <HackerNews
              newList={currentNews(newsList)}
              paginate={setCurrentPage}
              newsPerPage={newsPerPage}
              totalNews={newsList.length}
              authLogic={authLogic}
              pictureUpload={pictureUpload}
            />
          }
        />
        <Route
          path="/deptdetail/:deptno"
          exact={true}
          element={<DeptDetail />}
        />
        <Route
          path="/newsreple/:id"
          exact={true}
          element={<HackerNewsReple />}
        />
        <Route
          path="/youtube"
          exact={true}
          element={<YoutubeList authLogic={authLogic} />}
        />
      </Routes>
    </>
  )
}

export default App
