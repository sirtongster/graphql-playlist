import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../../queries';

import './book-details.scss';

class BookDetails extends React.Component{
  displayBookDetails(){
    const { book } = this.props.data;
    if(book){
      return(
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author: </p>
          <ul className="other-books">
            {
              book.author.books.map(item =>
                <li key={item.id}>{item.name}</li>
              )
            }
          </ul>
        </div>
      )
    } else {
      return( <div>No book selected...</div> );
    }
  }

  render(){
    return(
      <ul id="book-details">
        { this.displayBookDetails() }
      </ul>
    )
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return{
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);