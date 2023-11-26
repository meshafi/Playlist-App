import React from "react";
import tick from "./utils/tick.png"
const INITIAL_VIDEO_ITEMS = [
  {
    id: 1,
    title: "video1",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300,
  },
  {
    id: 2,
    title: "video2",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300,
  },
  {
    id: 3,
    title: "video3",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300,
  },
  {
    id: 4,
    title: "video4",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300,
  },
  {
    id: 5,
    title: "video5",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300,
  },
  {
    id: 6,
    title: "video6",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300,
  },
];

export default function Playlist() {
  const [videoItems, setVideoItems] = React.useState(INITIAL_VIDEO_ITEMS);
  const [currentVideoId, setCurrentVideoId] = React.useState(1);

  function onVideoSelected(videoId) {
    setCurrentVideoId(videoId);
  }

  const currentVideo = videoItems.find(
    (videoItem) => videoItem.id === currentVideoId
  );

  return (
    <div className="playlist">
      <header>
        <h1 className="playlist-heading">Playlist</h1>
      </header>
      <div className="content-container">
        <main>
          <CurrentVideoTitle video={currentVideo} />
          <VideoPlayer
            video={currentVideo}
            currentVideoId={currentVideoId}
            setCurrentVideoId={setCurrentVideoId}
          />
        </main>
        <Sidebar
          videoItems={videoItems}
          currentVideoId={currentVideoId}
          setCurrentVideoId={onVideoSelected}
        />
      </div>
    </div>
  );
}

function CurrentVideoTitle({ video }) {
  return <div className="current-video-title">{video.title}</div>;
}

function VideoPlayer({ video, currentVideoId, setCurrentVideoId }) {
    const buttonText = video.isMarkedAsCompleted
    ? "Mark Video As Not Completed"
    : "Mark Video As Completed";

  function videoCompleted() {
    setCurrentVideoId(currentVideoId < 6 ? currentVideoId + 1 : 1);
    console.log(currentVideoId);
    video.isMarkedAsCompleted= buttonText=="Mark Video As Not Completed"? false:true;
  }
  return (
    <div className="video-player-container">
      <div>Video Player</div>
      <div>
        <pre>
          <code>{JSON.stringify(video, null, 4)}</code>
        </pre>
      </div>
      <button onClick={videoCompleted}>{buttonText}</button>
    </div>
  );
}

function Sidebar({ videoItems, currentVideoId, setCurrentVideoId }) {
  return (
    <div className="sidebar">
      <WatchedVideosProgress />
      <VideoItemList
        videoItems={videoItems}
        currentVideoId={currentVideoId}
        setCurrentVideoId={setCurrentVideoId}
      />
    </div>
  );
}

function WatchedVideosProgress() {
  return <div className="watched-videos-progress">WatchedVideosProgress</div>;
}

function VideoItemList({ videoItems, currentVideoId, setCurrentVideoId }) {
  return (
    <div className="video-item-list">
      <ul>
        {videoItems.map((item) => {
          let activeClassName = item.id === currentVideoId ? "active-item" : "";
          let markComplted =
            item.isMarkedAsCompleted === true ? "completed" : "";
          let done= item.isMarkedAsCompleted === true?tick:"";
          function handleClick() {
            setCurrentVideoId(item.id);
          }
          return (
            <li
              id={markComplted}
              key={item.id}
              className={`${activeClassName}`}
              onClick={handleClick}
            >
              {item.title}
              <img src={done}/>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
