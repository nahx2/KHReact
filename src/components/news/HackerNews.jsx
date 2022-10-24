import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { setToastMsg } from "../../store"
import MyToast from "../common/MyToast"
import MyPagination from "../MyPagination"
import HackerFooter from "../page/HackerFooter"
import HackerHeader from "../page/HackerHeader"
import HackerNewsRow from "./HackerNewsRow"

const HackerNews = ({
  newsList,
  newsPerPage,
  totalNews,
  paginate,
  authLogic,
  pictureUpload,
}) => {
  const { userId } = useParams()
  const status = useSelector((store) => store.status)
  const dispatch = useDispatch()
  useEffect(() => {
    if (userId !== null && userId.length > 0) {
      dispatch(setToastMsg("님 회원"))
    } else {
      dispatch(setToastMsg("님 비회원"))
    }
  }, [])
  const navigate = useNavigate()
  console.log("구글 인증 아이디 : " + userId)
  const onLogout = () => {
    console.log("onLogout 호출 성공")
    authLogic.logout()
  }
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  }
  useEffect(() => {
    authLogic.onAuthChange((user) => {
      if (!user) {
        navigate("/")
      }
    })
  })
  //없으면? 모든 변화에 반응해
  //[] 있는데 파라미터가 없으면 처음에 한 번만....
  //[keyword] 키워드가 변경될 때마다 재귀호출일어남

  return (
    <>
      <HackerHeader userId={userId} onLogout={onLogout} />
      <div>
        {status && <MyToast />}
        {newsList.map((news) => (
          <HackerNewsRow
            key={news.id}
            news={news}
            pictureUpload={pictureUpload}
          />
        ))}
        <MyPagination
          newsPerPage={newsPerPage}
          totalNews={totalNews}
          paginate={paginate}
        />
      </div>
      <HackerFooter />
    </>
  )
}

export default HackerNews
