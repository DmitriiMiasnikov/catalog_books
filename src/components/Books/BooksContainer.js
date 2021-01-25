import React from 'react';
import { connect } from 'react-redux';
import { Books } from './Books'

const BooksContainer = ({ books, authors }) => {
  return (
    <Books books={books} authors={authors} />
  )
}
const mapStatesToProps = (state) => {
  return {
    books: state.books.books,
    authors: state.authors.authors
  }
}
export default connect (mapStatesToProps, {})(BooksContainer);