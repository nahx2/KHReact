import React, { useRef, useState } from "react"
import { getDatabase, ref, onValue, set } from "firebase/database"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
import HackerHeader from "../page/HackerHeader"
import HackerFooter from "../page/HackerFooter"
import { Button, Form, InputGroup, Modal, Table } from "react-bootstrap"
import NoticeRow from "./NoticeRow"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FS_APIKEY,
  authDomain: process.env.REACT_APP_FS_AUTHDomain,
  projectId: process.env.REACT_APP_FS_PROJECTID,
  databaseURL: "redux-b.appspot.com",
  storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FS_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FS_APPID,
  measurementId: process.env.REACT_APP_FS_MEASUREMENTID,
}

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig)
const database = getDatabase()

const NoticeList = (props) => {
  const formRef = useRef() //html 노드 접근시 사용함 -
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title: "",
    n_wirter: "",
    n_content: "",
    n_date: "",
  })
  const setClock = () => {
    const dateInfo = new Date()
    const hour = modifyNumber(dateInfo.getHours())
    const min = modifyNumber(dateInfo.getMinutes())
    const sec = modifyNumber(dateInfo.getSeconds())
    const curtime = hour + ":" + min + ":" + sec
    return curtime
  }
  const modifyNumber = (time) => {
    if (parseInt(time) < 10) return "0" + time
    else return time
  }
  const [notices, setNotices] = useState({
    1: {
      n_no: 1,
      n_title: "공휴일 공지",
      n_writer: "산하",
      n_date: "2022-10-11",
    },
    2: {
      n_no: 2,
      n_title: "썸머 이벤트",
      n_writer: "관리자",
      n_date: "2022-10-11",
    },
    3: {
      n_no: 3,
      n_title: "윈터 이벤트",
      n_writer: "관리자",
      n_date: "2022-10-11",
    },
  })
  const noticeSearch = () => {
    const gubun = document.querySelector("#gubun").value
    const keyword = document.querySelector("#keyword").value
    console.log(gubun + "," + keyword)
    let result = []
    if (gubun === "n_title") {
      Object.keys(notices).map((key) =>
        notices[key].n_title && notices[key].n_title === keyword
          ? result.push(notice[key])
          : null
      )
    } else if (gubun === "n_writer") {
      Object.keys(notices).map((key) =>
        notices[key].n_writer && notices[key].n_writer === keyword
          ? result.push(notice[key])
          : null
      )
    } else if (gubun === "n_content") {
      Object.keys(notices).map((key) =>
        notices[key].n_content && notices[key].n_content === keyword
          ? result.push(notice[key])
          : null
      )
    }
    // 배열 result에는 조건 검색 결과가 담김
    setNotices(result)
  }
  const noticeInsert = (event) => {
    //submit사용시 페이지 새로고침 처리 방어코드 삽입 - 주의
    event.preventDefault() //이벤트 버블링 방어코드 삽입할 것
    console.log(notice)
    handleClose()
    set(ref(database, "notice/" + notice.n_no), notice)
  }

  const handleChangeForm = (event) => {
    if (event.currentTarget == null) return
    console.log("폼 내용 변경 발생 name : " + event.target.name)
    console.log("폼 내용 변경 발생 value : " + event.target.value)

    setNotice({
      ...notice,
      userId: "토마토",
      m_no: Date.now(),
      [event.target.name]: event.target.value,
    })
  }
  const noticeList = () => {
    console.log("noticeList")
    window.location.reload()
  }
  return (
    <>
      <HackerHeader />
      <div className="container">
        <div className="page-header">
          <h2>
            공지사항 <i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>글목록</small>
          </h2>
          <hr />
        </div>
        {/* 검색기 추가영역 */}
        <div className="row">
          <div className="col-3">
            <div className="form-floating">
              <select id="gubun" className="form-select" aria-label="분류선택">
                <option defaultValue>분류선택</option>
                <option value="n_title">제목</option>
                <option value="n_writer">작성자</option>
                <option value="n_content">내용</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-6">
          <input
            id="keyword"
            type="text"
            className="form-control"
            placeholder="검색어를 입력하세요"
          />
        </div>
        <div className="col-3">
          <Button
            className="btn_search"
            variant="danger"
            onClick={noticeSearch}
          >
            검색
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {notices &&
              Object.keys(notices).map((key) => (
                <NoticeRow key={key} notice={notices[key]} />
              ))}
          </tbody>
        </Table>
        <hr />
        <div className="deptlist-footer">
          <Button variant="warning">전체조회</Button>&nbsp;
          <Button variant="success" onClick={handleShow}>
            부서등록
          </Button>
        </div>
      </div>

      {/* ============================== [[ 부서등록 모달 시작 ]] ============================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>글 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_dept" method="get">
            <input type="hidden" name="filename" id="filename" />
            <input type="hidden" name="fileurl" id="fileurl" />
            {/* 부서 입력 폼 */}
            <Form.Group
              className="mb-3"
              controlId="formBasicDeptno"
            ></Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDname">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                name="n_title"
                placeholder="Enter 제목"
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>글쓴이</Form.Label>
              <Form.Control
                type="text"
                name="n_writer"
                placeholder="Enter 글쓴이"
                onChange={handleChangeForm}
              />
            </Form.Group>
            내용
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                name="n_content"
                onChange={handleChangeForm}
                placeholder="Enter 내용"
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={noticeInsert}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ============================== [[ 부서등록 모달 종료 ]] ============================== */}

      <HackerFooter />
    </>
  )
}

export default NoticeList
