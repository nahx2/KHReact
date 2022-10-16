import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import HackerFooter from "./page/HackerFooter"
import HackerHeader from "./page/HackerHeader"
import VideoDetail from "./VideoDetail"
import VideoList from "./VideoList"

const YoutubeList = ({ authLogic }) => {
  const navigate = useNavigate()
  //useState([]),useState({}),useState(""),useState(null)
  const [videos, setVideos] = useState([])
  //null과 undefined 차이 정리해 둘 것
  const [keyword, setKeyword] = useState()
  //상세화면 추가 작성 건
  const [selectedVideo, setSelectedVideo] = useState(null)
  // 비디오를 선택하면 호출할 함수구현
  const videoSelect = (video) => {
    console.log(video)
    setSelectedVideo(video)
  }

  const onLogout = () => {
    console.log("onLogout 호출 성공")
    authLogic.logout()
  }
  useEffect(() => {
    authLogic.onAuthChange((user) => {
      if (!user) {
        navigate("/")
      }
    })
  }, [])
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=AIzaSyCIS_v1-BdrTwGF2BQrGgPoiDd2u1A6XZw`
      )
      .then((result) => {
        setVideos(result.data.items)
      })
  }, [])
  //검색버튼을 누르면
  const youtubeSearch = (event) => {
    console.log("serach click...")
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${keyword}&key=AIzaSyCIS_v1-BdrTwGF2BQrGgPoiDd2u1A6XZw&type=video`
      )
      .then((result) => result.data)
      .then((data) =>
        data.items.map((item) => ({ ...item, id: item.id.videoId }))
      )
      .then((items) => {
        console.log(items)
        setVideos(items)
        setSelectedVideo(null)
      })
      .catch((error) => console.log("error", error))
  }
  const onChangeInput = (event) => {
    console.log(
      "키보드를 누를 때마다 useState에 초기화 하기" + event.target.value
    )
    setKeyword()
  }
  return (
    <>
      <HackerHeader onLogout={onLogout} />
      <div className="container">
        <div className="page-header">
          <h2>
            부서관리 <i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>유튜브</small>
          </h2>
          <hr />
        </div>
        <div className="youtube-content"></div>

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="검색"
            aria-label="검색"
            name="keyword"
            aria-describedby="basic-addon1"
            onChange={onChangeInput}
            onKeyPress={youtubeSearch}
          />
          <Button
            className="btn btn-danger"
            id="basic-addon1"
            onClick={youtubeSearch}
          >
            Search
          </Button>
        </InputGroup>
        {selectedVideo && (
          <div>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <VideoList videos={videos} videoSelect={videoSelect} />
      </div>

      <HackerFooter />
    </>
  )
}

export default YoutubeList
