import React from "react"
import {
  VRCONTENTDIV,
  VRLI,
  VRLIMG,
  VRPCHANNELTITLE,
  VRPTITLE,
  VRVIDEODIV,
} from "./styles/YoutubeStyle"

function VideoRow({ video, videoSelect }) {
  return (
    <>
      <VRLI onClick={() => videoSelect(video)}>
        <VRVIDEODIV>
          <VRLIMG
            src={video.snippet.thumbnails.medium.url}
            alt="video thumbnail"
          />
          <VRCONTENTDIV>
            <VRPTITLE>{video.snippet.title}</VRPTITLE>
            <VRPCHANNELTITLE>{video.snippet.channelTitle}</VRPCHANNELTITLE>
          </VRCONTENTDIV>
        </VRVIDEODIV>
      </VRLI>
    </>
  )
}

export default VideoRow
