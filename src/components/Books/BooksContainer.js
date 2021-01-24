import React from 'react';
import { connect } from 'react-redux';
import { Books } from './Books'

const BooksContainer = ({ books }) => {
  return (
    <Books books={books}/>
  )
}
const mapStatesToProps = (state) => {
  return {
    books: state.books.books
  }
}
export default connect (mapStatesToProps, {})(BooksContainer);