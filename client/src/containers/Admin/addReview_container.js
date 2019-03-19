import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addBook, clearNewBook} from '../../actions/';

class AddReviewContainer extends Component{

    state = {
        formData: {
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '',
            price: ''
        }
    }

    handleInput = (event,name) =>{
        const newFormData = {
            ...this.state.formData
        }

        newFormData[name] = event.target.value;
        this.setState({
            formData: newFormData
        })
    }
    submitForm = (e) => {
        e.preventDefault();
        // console.log(this.state.formData);
        this.props.dispatch(addBook({
            ...this.state.formData,
            ownerId: this.props.user.login.id
        }));
    }
    showNewBook = (newBook) => (
        newBook.post ?
            <div className="conf_link">
                Wow! <Link to={`/books/${newBook.bookId}`}>
                        Click to see the Posted Book
                    </Link>
            </div>
        : null
    )
    componentWillUnmount(){
        this.props.dispatch(clearNewBook());
    }

    render(){
        // console.log(this.props)
        return(
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add Review</h2>

                    <div className="form_element">
                        <input type="text" placeholder="Enter Name..." value={this.state.formData.name}
                            onChange= {(event) => this.handleInput(event,'name')}
                        />
                    </div>
                    <div className="form_element">
                        <input type="text" placeholder="Enter Author..." value={this.state.formData.author}
                            onChange= {(event) => this.handleInput(event,'author')}
                        />
                    </div>
                    <textarea value={this.state.formData.review} placeholder="Enter Review"
                            onChange= {(event) => this.handleInput(event,'review')}
                    ></textarea>
                    <div className="form_element">
                        <input type="number" placeholder="Enter Pages..." value={this.state.formData.pages}
                        onChange= {(event) => this.handleInput(event,'pages')}
                        />
                    </div>
                    <div className="form_element">
                        <select value={this.state.formData.rating}
                            onChange= {(event) => this.handleInput(event,'rating')}
                        >
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div>
                    <div className="form_element">
                        <input type="number" placeholder="Enter price..." value={this.state.formData.price}
                            onChange= {(event) => this.handleInput(event,'price')}
                        />
                       
                    </div>
                    <button type="submit">Add Book</button>
                    {
                        this.props.books.newBook ?  
                            this.showNewBook(this.props.books.newBook)
                        :null
                    }
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        books:state.books
    }
}

export default connect(mapStateToProps)(AddReviewContainer);