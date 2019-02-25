import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooksQuery, getAuthorsQuery, addBookMutation } from '../../queries';

import './add-book.scss';

class AddBook extends React.Component{
  state = {
    name: '',
    genre: '',
    authorId: ''
  };

  displayAuthors(){
    const data = this.props.getAuthorsQuery;
    if(data.loading){
      return (<option disabled>Loading authors...</option>);
    } else {
      return data.authors.map(author => 
        <option key={ author.id } value={ author.id }>{ author.name }</option>
      );
    }
  }

  submitForm(e){
    e.preventDefault();
    const { name, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: { name, genre, authorId },
      refetchQueries:[{ query: getBooksQuery }]
    });
  }

  render(){
    return(
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label htmlFor="">Book name:</label>
          <input
            type="text"
            onChange={(e) => this.setState({name: e.target.value})}
          />
        </div>
        <div className="field">
          <label htmlFor="">Genre: </label>
          <input
            type="text"
            onChange={(e) => this.setState({genre: e.target.value})}
          />
        </div>
        <div className="field">
          <label htmlFor="">Author:</label>
          <select onChange={(e) => this.setState({authorId: e.target.value})}>
            <option value="">Select author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button type="submit">+</button>
      </form>
    )
  }
}

export default compose(  
  graphql(getAuthorsQuery, {name:'getAuthorsQuery'}),
  graphql(addBookMutation, {name:'addBookMutation'}),
)(AddBook);