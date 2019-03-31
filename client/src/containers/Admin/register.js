import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getUsers} from '../../actions/user';

class RegisterContainer extends Component{
    state = {
        name: '',
        lastname: '',
        email: '',
        password:'',
        error: ''
    }
    componentWillMount(){
        this.props.dispatch(getUsers());
    }

    handleInputEmail = (event) => {

    }
    handleInputPassword= (event) => {
        
    }
    handleInputName = (event) => {
        
    }
    handleInputLastname= (event) => {
        
    }
    submitForm = (e) => {
        e.preventDefault();
    }
    showUsers = (users) => (
        users ? 
            users.map(item => (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                </tr>
            ))
        : null
    )

    render(){
        // console.log(this.props);
        let users = this.props.user.users;
        return(
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add User</h2>

                </form>
                <div className="current_users">
                    <h4>Current Users</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(users)}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(RegisterContainer);