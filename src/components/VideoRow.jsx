import React from "react"
import {
  VRCONTENTDIV,
  VRIMG,
  VRLI,
  VRPTITLE,
  VRPCHANNEL,
  VRVIDEODIV,
} from "./styles/YoutubeStyle"

function VideoRow({ video, videoSelect }) {
  return (
    <>
      <VRLI onClick={() => videoSelect(video)}>
        <VRVIDEODIV>
          <VRIMG
            src={video.snippet.thumbnails.medium.url}
            alt="video thumbnail"
          />
          <VRCONTENTDIV>
            <VRPTITLE>{video.snippet.title}</VRPTITLE>
            <VRPCHANNEL>{video.snippet.channelTitle}</VRPCHANNEL>
          </VRCONTENTDIV>
        </VRVIDEODIV>
      </VRLI>
    </>
  )
}

export default VideoRow
