import FromVideoRecorder from './VideoRecorder';

const VideoRecordPage = props => {
  return (
    <div className="App">
      <h1>Video record</h1>
      <div style={{ width: '100%', maxWidth: 480, height: 640 }}>
        <FromVideoRecorder push={props.history.push} />
      </div>
    </div>
  );
};

export default VideoRecordPage;
