import React from 'react';
const VideoPreviewPage = props => {
  console.log(props);
  return (
    <div className="App">
      <h1>Video preview</h1>
      {props.location.state && props.location.state.videoBlob && (
        <div style={{ width: '100%', maxWidth: 480, height: 640 }}>
          <video
            src={window.URL.createObjectURL(props.location.state.videoBlob)}
            width={480}
            height={640}
            autoPlay
            loop
            controls
          />
        </div>
      )}
    </div>
  );
};

export default VideoPreviewPage;
