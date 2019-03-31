import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/user';

class LogoutContainer extends Component{

    componentWillMount(){
        this.props.dispatch(logout());
        setTimeout(() => {
            this.props.history.push('/')
        }, 3000)
    }

    render(){
        console.log(this.props)
        return(
            <div className="logout_container">
               <h1> You are Loging out please wait... </h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(LogoutContainer);