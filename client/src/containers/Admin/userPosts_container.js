import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUserPosts } from '../../actions/user';
import moment from "moment-js";
import {Link} from 'react-router-dom';

class UserPostContainer extends Component{

    componentWillMount(){
        this.props.dispatch(getUserPosts(this.props.user.login.id));
    }

    renderPosts  = (user) => (
        user.posts ? 
            user.posts.map((item,i) => (
                <tr key={i}>
                    <td><Link to={`/user/edit-post/${item._id}`}>{item.name} </Link></td>
                    <td>{item.author}</td>
                    <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                </tr>
            ))
        : null
    )
    render(){
        console.log(this.props)
        let user = this.props.user;

        return(
            <div className="user_posts"> 
                <h4>Your Reviews</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                            {this.renderPosts(user)}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(UserPostContainer);