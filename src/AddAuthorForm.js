import React from 'react';
import {connect} from 'react-redux';
import "./AddAuthorForm.css";
import {withRouter} from 'react-router-dom';

class AuthorForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            imageUrl:'',
            books:[],
            bookTemp:''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }
    onFieldChange(event) {
        this.setState({ 
            [event.target.name]:event.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.OnAddAuthor(this.state);
    }

    handleAddBook(event){
        this.setState({
            books:this.state.books.concat([this.state.bookTemp]),
            bookTemp:''
        });
    }
    render() {
        return(
        <form onSubmit={this.handleSubmit}>
            <div className="AddAuthorForm__input">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange} />
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} /> 
            </div>
            <div className="AddAuthorForm__input">
        {this.state.books.map((book)=><p key={book} >{book}</p>)}
                <label htmlFor="bookTemp">Books</label>
                <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange} /> 
                <input type="button" value="+" onClick={this.handleAddBook} />
            </div>

            <input type="submit" value="Add" />
        </form>
        );
    }
}

function AddAuthorForm({match,OnAddAuthor}){
    return(
    <div className="AddAuthorForm">
        <h1>Add Author</h1>
        <AuthorForm OnAddAuthor={OnAddAuthor} />
    </div>);
}
function mapDispatchToProps(dispatch,props){
    return {
        OnAddAuthor:(author=>{
            dispatch({type:'ADD_AUTHOR',author});
            props.history.push('/');
        })
    };
}
function mapStateProps(state){
    return{
            
}}
export default connect(()=>mapStateProps,mapDispatchToProps) (AddAuthorForm);