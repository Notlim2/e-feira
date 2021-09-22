import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from './Button';
import { AiOutlineClose } from 'react-icons/ai';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.65);
  z-index: 9;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContentContainer = styled.div`
  position: relative;
  padding: 24px;
  background: white;
  border-radius: 4px;
  min-width: 320px;
`;

const ModalTitle = styled.h2`
  border-bottom: solid 2px #ababab;
  margin-bottom: 16px;
  font-size: 1.2em;
`;

const ModalCloseButton = styled(Button)`
  position: absolute;
  top: 1%;
  right: 1%;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const showModal = async (
  title: string,
  content: JSX.Element,
  onClose?: () => void
) => {
  const modalContainer = document.getElementById('modal-container');

  const modalContent = (
    <ModalContainer>
      <ModalContentContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalCloseButton
          onClick={() => {
            onClose && onClose();
            hideModal();
          }}
        >
          <AiOutlineClose />
        </ModalCloseButton>

        {content}
      </ModalContentContainer>
    </ModalContainer>
  );

  ReactDOM.render(modalContent, modalContainer);
};

const hideModal = () => {
  const modalContainer = document.getElementById('modal-container');

  if (modalContainer) {
    ReactDOM.unmountComponentAtNode(modalContainer);
  }
};

export { showModal, hideModal };
