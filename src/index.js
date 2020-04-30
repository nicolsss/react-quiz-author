import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import {BrowserRouter,Route, withRouter} from 'react-router-dom';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm.js';
import * as serviceWorker from './serviceWorker';
import {shuffle,sample} from 'underscore';

const authors =[
    {
        name:'Mark Twain',
        imageUrl:'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books:['The Adventures of Huckleberry Finn','Roughing lt','Life on the Mississippi']
    },{
        name:'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.jpg',
        imageSource: 'Wikimedia Commons',
        books:['Heart of Darkness']
    },{
        name: 'J.K Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource:'Wikimedia Commons',
        imageAttribution:'Daniel Ogren',
        books:['Harry Potter and the Sorceres Stone']
    },{
        name:'Charles Dickens',
        imageUrl: 'iamages/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books:['David Copperfield','A Tale of Two Cities']
    },{
        name:'Willian Shakespeare',
        imageUrl:'images/authors/williamShakespeare.jpg',
        imageSource:'Wikimedia Commons',
        books: ['Hamlet','Macbeth','Romeo and Juliet']
    }

];
const getTurnData = (authors)=>{
    const allBooks = authors.reduce(
       (p,c,i)=>{
           return p.concat(c.books);
       },[] 
    );

    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books:fourRandomBooks,
        author: authors.find((author)=>
        author.books.some((title)=>
        title===answer))
    }

};


function reducer(
    state={authors,turnData:getTurnData(authors),highlight:''}
    ,action){
        switch (action.type){
            case 'ANSWER_SELECTED':
                const answer = action.answer.toString();
                const isCorrect = state.turnData.author.books.some((book)=> book===answer);
                
                 return Object.assign(
                     {},
                     state,
                     {highlight: isCorrect ? 'correct' : 'wrong'
                    });
            case 'CONTINUE':
                return Object.assign(
                    {},
                    state,
                    {highlight: '',
                    turnData:getTurnData(state.authors)
                }
                );
            case 'ADD_AUTHOR':
                return Object.assign(
                    {},
                    state,
                    {authors:state.authors.concat([action.author])})
            default: return state;

        }
    return state;
}
let store = Redux.createStore(reducer);


ReactDOM.render( < React.StrictMode >
    <BrowserRouter> 
    <ReactRedux.Provider store={store}>
    <React.Fragment>
    <Route exact path="/" component={AuthorQuiz}/ >
    <Route path="/add" component={AddAuthorForm} />
    </React.Fragment>
    </ReactRedux.Provider>
    </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();