import { onValue, ref, remove, set } from "firebase/database"
import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  Form,
  InputGroup,
  ListGroup,
  Modal,
} from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
import HackerHeader from "../page/HackerHeader"
import HackerFooter from "../page/HackerFooter"
import NoticeList from "./NoticeList"

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
const db = initializeApp(firebaseConfig)

const NoticeDetail = (props) => {
  //목록 버튼 클릭시 목록으로 돌아가기 - NoticeList.jsx
  const navigate = useNavigate()
  //해시값 가져오기
  let { n_no } = useParams()
  const [isOk, setIsOk] = useState(false)
  // 상태를 관리하는 state 훅을 비동기 처리함
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title: "",
    n_writer: "",
    n_content: "",
  })
  // 리얼타임서버에서 가져오기
  useEffect(() => {
    const starCountRef = ref(db, "notice/" + n_no)
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      setNotice(data)
    })
  }, [])
  //수정하기 구현
  const noticeUpdate = (evnet) => {
    evnet.proventdDefault()
    console.log(
      "수정할 정보:" +
        notice.n_no +
        "," +
        notice.n_title +
        "," +
        notice.n_content +
        "," +
        notice.n_writer
    )
    set(ref(db, "notice/" + n_no), notice)
    handleClose()
  }
  //삭제하기 구현
  const noticeDelete = () => {
    console.log("삭제할 n_no" + n_no)
    remove(ref(db, `notice/${n_no}`))
    navigate("/notice")
  }
  //목록이동구현
  const noticeList = () => {
    navigate("/notice") //NoticeList.jsx
  }
  //ahekf tkdxo rhksfus
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const handleChangeForm = (event) => {
    if (event.currentTarget == null) return
    console.log("폼 내용 변경 발생 name : " + event.target.name)
    console.log("폼 내용 변경 발생 value : " + event.target.value)

    setNotice({
      ...notice,
      n_no: n_no,
      [event.target.name]: event.target.value,
    })
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

        <Card style={{ width: "18rem" }}>
          <ListGroup>
            <ListGroup.Item>{notice.n_title}</ListGroup.Item>
            <ListGroup.Item>{notice.n_writer}</ListGroup.Item>
            <ListGroup.Item>{notice.n_content}</ListGroup.Item>
          </ListGroup>
          <div>
            <Button variant="primary" onClick={handleShow}>
              수정
            </Button>
            &nbsp
            <Button variant="primary" onClick={noticeDelete}>
              삭제
            </Button>
            &nbsp
            <Button variant="primary" onClick={NoticeList}>
              목록
            </Button>
          </div>
        </Card>
      </div>
      <HackerFooter />
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
                value={notice.n_title}
                name="n_title"
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>글쓴이</Form.Label>
              <Form.Control
                type="text"
                name="n_writer"
                value={notice.n_writer}
                onChange={handleChangeForm}
              />
            </Form.Group>
            내용
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                name="n_content"
                value={notice.n_content}
                onChange={handleChangeForm}
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={noticeUpdate}>
            수정
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ============================== [[ 부서등록 모달 종료 ]] ============================== */}
    </>
  )
}

export default NoticeDetail
