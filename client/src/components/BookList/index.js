import React from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../../queries';
import BookDetails from '../BookDetails';

import './book-list.scss';

class BookList extends React.Component{
  state = {
    selected: null
  }

  displayBooks(){
    const { data } = this.props;

    if(data.loading){
      return (<div>Loading books...</div>);
    } else {
      return data.books.map(book =>
        <li key={ book.id } onClick={(e) => {this.setState({selected: book.id})}}>{ book.name }</li>
      );
    }
  }
  render(){
    return(
      <div>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
        <BookDetails bookId={ this.state.selected }/>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);