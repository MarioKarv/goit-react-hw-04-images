import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'
import { BiSearchAlt } from 'react-icons/bi';

function Searchbar({ onSubmit }) {
  const [inputData, setInputData] = useState('')

  const onChangeInput = e => {
    setInputData(e.currentTarget.value.toLowerCase())
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputData);
    setInputData('');
  };

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <BiSearchAlt size={25} />
          </button>

          <input
            className={css.SearchFormInput}
            onChange={onChangeInput}
            value={inputData}
            name="inputData"
            type="text"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }


export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
