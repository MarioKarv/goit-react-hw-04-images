import { useState } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImg } from '../fetchImg/fetchimg';
import './App.css';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';

let page = 1;

export function App() {
  const [inputData, setInputData] = useState('')
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('idle')
  const [totalHits, setTotalHits] = useState(0)

  const handleSubmit = async inputData => {
    page = 1;
    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    } else {
      try {
        setStatus('pending')
        const { totalHits, hits } = await fetchImg(inputData, page);
        if (hits.length < 1) {
          setStatus('idle')
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          setItems(hits);
          setInputData(inputData);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
      }
    }
    };
    

  const onNextPage = async () => {
    setStatus('pending')
    try {
      const { hits } = await fetchImg(inputData, (page += 1));
      setItems(prevValue => [...prevValue, ...hits])
      setStatus('resolved')
    } catch (error) {
      setStatus('rejected');
    }
  };
  
    
    if (status === 'idle') {
      return (
        <div className="App">
          <Searchbar onSubmit={handleSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className="App">
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery page={page} items={items} />
          <Loader />
          {totalHits > 12 && <Button onClick={onNextPage} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className="App">
          <Searchbar onSubmit={handleSubmit} />
          <p className="Warning">Something wrong, try later</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className="App">
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={onNextPage} />
          )}
        </div>
      );
    }
  }

