export const recordAudio = async () => {
  return await new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        // ? 0. 권한 받기 및 이벤트 리스너 등록
        const mediaRecorder = new MediaRecorder(stream);

        let audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {});

        // ? 1. record 시작
        const start = () => {
          mediaRecorder.start();
        };

        // ? 2. record 중지
        const stop = () => {
          if (mediaRecorder?.state === 'inactive') return;
          mediaRecorder.stop();
        };

        // ? 3. record 완료
        // ? 4. convert chunks -> data blob
        // ? 5. create URL - data blob
        const complete = () => {
          const audioBlob = new Blob(audioChunks);

          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          return audio;
        };

        const deleteAudioData = () => {
          audioChunks = [];
        };

        resolve({ start, stop, complete, deleteAudioData });
      })
      .catch(e => {
        console.error('streamPromise Error', e);
        reject({ message: '마이크 권한 설정 작업 중 에러가 발생하였습니다.' });
      });
  });
};
