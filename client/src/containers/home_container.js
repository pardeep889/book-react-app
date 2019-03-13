import React,{Component} from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions';
class HomeContainer extends Component{

    componentWillMount(){
        this.props.dispatch(getBooks());
    }

    renderItems = (books) => (
        books.list ? 
            books.list.map((item,i) => (
                `${item.name}`
            ))
        :null
    )

    render(){
        return(
            <div>
                {this.renderItems(this.props.books)}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        books:state.books
    }
}

export default connect(mapStateToProps)(HomeContainer);