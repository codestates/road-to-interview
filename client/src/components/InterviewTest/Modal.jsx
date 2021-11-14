import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import HintViewer from './HintViewer';
import FinishViewer from './FinishViewer';
import { MdClose } from 'react-icons/md';
import { fontSizes } from '@/styles';
import media from '@/utils/media';
const Modal = ({ view, setView, currentQuestion, finish, setFinish, allData, setAllData, questions }) => {
  return (
    <>
      {view ? (
        <Background>
          <ModalWrapper view={view}>
            <ModalContent>
              <HintViewer currentQuestion={currentQuestion} />
            </ModalContent>
            <CloseModalButton aria-label="Close Modal" onClick={() => setView(prev => !prev)} />
          </ModalWrapper>
        </Background>
      ) : null}

      {finish ? (
        <Background>
          <ModalWrapper finish={finish}>
            <ModalContent>
              <FinishViewer
                currentQuestion={currentQuestion}
                allData={allData}
                setAllData={setAllData}
                setFinish={setFinish}
                questions={questions}
              />
            </ModalContent>
            <CloseModalButton aria-label="Close Modal" onClick={() => setFinish(prev => !prev)} />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default Modal;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 520px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  overflow: hidden;
  ${media.laptop(css`
    width: 900px;
  `)}
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    font-size: ${fontSizes[300]};
    font-weight: 600;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
