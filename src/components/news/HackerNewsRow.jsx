import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import styled from "styled-components"

const NewsLi = styled.li`
  list-style: none;
  margin: 24px;
  cursor: pointer;
`
const CardRow = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 6px;
  &:hover {
    background-color: #d8fdd8;
  }
`
const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
`
const DivTitle = styled.div`
  font-size: 20px;
`
const DivCount = styled.div`
  background-color: green;
  width: 40px;
  height: 30px;
  text-align: center;
  border-radius: 10px;
  color: aliceblue;
`
const DivEtc = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
  padding-left: 10px;
`
const HackerNewsRow = (props) => {
  //구조분해 할당
  const { news, pictureUpload } = props
  // 업로드되는 이미지에 대한정보를 담기
  const [file, setFile] = useState({ fileName: null, fileURL: null })
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  // async 비동기처리위한 선언 -  await 선언하면 업로드 될 때까지 기다렸다가 처리함
  // 스프링 서버와의 연계시에도 비동기처리 코드 추가되어야 함 - 크로스 서비스
  const imgChange = async (event) => {
    console.log("imgChange호출")
    console.log(event.target.files[0])
    const upload = await pictureUpload.upload(event.target.files[0])
    setFile({
      fileName: upload.public_id + "." + upload.format,
      fileURL: upload.url,
    })
    const uploadIMG = document.getElementById("img") //input의 이미지 객체 얻어오기
    const holder = document.getElementById("uploadImg") //이미지를 집어넣을 곳의 부모태그
    const file = uploadIMG.files[0]
    const reader = new FileReader()
    reader.onload = function (event) {
      const img = new Image()
      img.src = event.target.result
      img.width = 400
      // if (img.width > 150) {
      //   //넣으려는 사진 크기에 맞춰 width값을 제한하면 된다.

      // }
      holder.innerHTML = ""
      holder.appendChild(img)
    }
    reader.readAsDataURL(file)
    return false
  }
  return (
    <>
      {file.fileName + ", " + file.fileURL}
      <NewsLi key={news.id}>
        <CardRow>
          <CardContent>
            <DivTitle>
              <Link to={"/newsreple/" + news.id} className="nav-link">
                {news.title}
              </Link>
            </DivTitle>
            <DivCount>{news.comments_count}</DivCount>
          </CardContent>
          <DivEtc>
            <div>
              <i className="fas fa-user mr-1"></i>
              {news.user}
            </div>
            <div>
              <i className="fas fa-heart mr-1"></i>
              {news.points}
            </div>
            <div>
              <i className="far fa-clock mr-1"></i>
              {news.time_ago}
            </div>
          </DivEtc>
        </CardRow>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
      </NewsLi>
      {/* {=======================[ 사진업로드 테스트 모달 ]=========================} */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_img" method="get">
            <Form.Group className="mb-3">
              <input
                className="form-control"
                type="file"
                id="img"
                name="img"
                onChange={imgChange}
              />
            </Form.Group>
            <div id="uploadImg">
              <img
                className="thumbNail"
                src="https://via.placeholder.com/400"
                alt="미리보기"
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {=======================[ 사진업로드 테스트 모달 ]=========================} */}
    </>
  )
}

export default HackerNewsRow
