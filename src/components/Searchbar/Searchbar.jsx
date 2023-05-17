import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'
import { BiSearchAlt } from 'react-icons/bi';

class Searchbar extends Component {
  state = {
    inputData: '',
  };

  onChangeInput = e => {
    this.setState({ inputData: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputData);
    this.setState({ inputData: '' });
  };

  render() {
    const { inputData } = this.state;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <BiSearchAlt size={25} />
          </button>

          <input
            className={css.SearchFormInput}
            onChange={this.onChangeInput}
            value={inputData}
            name="inputData"
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
