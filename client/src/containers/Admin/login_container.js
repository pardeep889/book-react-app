import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user';

class LoginContainer extends Component{

    state = {
        email: '',
        password: '',
        error: '',
        success: false
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state));
    }
    handlemail = (event) =>{
        this.setState({email: event.target.value})
    }

    handlepassword = (event) => {
        this.setState({password: event.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/user');
        }
    }

    render(){        
        let user = this.props.user;
        return(
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Login Here</h2>
                    <div className="form_element">
                        <input type="email" placeholder="Enter your email address" value = {this.state.email} onChange={this.handlemail}/>
                    </div>
                    <div className="form_element">
                        <input type="password" placeholder="Enter your password" value = {this.state.password} onChange={this.handlepassword}/>
                    </div>
                    <button type="submit">Login</button>
                    {
                        user.login? 
                            <div className="error">
                                {user.login.message}
                            </div>
                        : null
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(LoginContainer);