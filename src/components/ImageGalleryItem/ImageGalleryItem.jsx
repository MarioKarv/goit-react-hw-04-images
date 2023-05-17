import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal'
import css from './ImageGalleryItem.module.css'

function ImageGalleryItem({item}) {
  const [shownModal, setShownModal] = useState(false)
  
  const onModal = () => {
    setShownModal(prevValue => !prevValue)
  };
  
  const { webformatURL } = item;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt="img"
          onClick={onModal}
          className={css.ImageGalleryItemImage}
        />
        {shownModal && <Modal onClose={onModal} image={item} />}
      </li>
    );
  }


export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};
