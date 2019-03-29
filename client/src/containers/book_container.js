import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getBookWithReviewer,clearBookWithReviewer } from "../actions";


class BookContainer extends Component {
    componentWillMount(){
        this.props.dispatch(getBookWithReviewer(this.props.match.params.id));
    }
    componentWillUnmount(){
        console.log('working')
        this.props.dispatch(clearBookWithReviewer);
    }
    renderBook = (data) => (
        data.book ? 
        <div className="br_container">
            <div className = "br_header">
                <h2>{data.book.name}</h2>
                <h5>{data.book.author}</h5>
                <div className="br_reviewer">
                    <span>Review By: </span>  {data.reviewer.name} {data.reviewer.lastname} 
                </div>
            </div>
            <div className="br_review">
                {data.book.review}
            </div>
             <div className="br_box">
                <div className="left">
                    <div>
                    <span>Pages: </span> {data.book.pages}
                    </div>                   
                    <div>
                    <span>Price: </span> {data.book.price}
                    </div>
                </div>
                <div className="right">
                    <span>Rating</span>
                    <div>{data.book.rating}/5</div> 
                </div>
             </div>
        </div>: null
        
    )
       
      
    
    render(){
        console.log(this.props)
        let data = this.props.book;
        
        return(
            <div>        
                {this.renderBook(data)}     
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        book: state.books
    }
}

export default connect(mapStateToProps)(BookContainer);