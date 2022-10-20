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

const App = ({ authLogic, pictureUpload }) => {
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
            <HackerNews authLogic={authLogic} pictureUpload={pictureUpload} />
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
