import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'

const ModalRoot = document.querySelector('#ModalRoot');

function Modal({onClose, image}) {
  
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    }
  }, [onClose])


  const onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    const { largeImageURL } = image;
    return createPortal(
      <div className={css.Overlay} onClick={onOverlayClose}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt="img" />
        </div>
      </div>,
      ModalRoot
    );
  }


export default Modal;

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};


