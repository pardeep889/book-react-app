import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {getUsers ,registerUser} from '../../actions/user';

class RegisterContainer extends PureComponent{
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
        this.setState({email: event.target.value})
    }
    handleInputPassword= (event) => {
        this.setState({password: event.target.value})
    }
    handleInputName = (event) => {
        this.setState({name: event.target.value})
    }
    handleInputLastname= (event) => {
        this.setState({lastname: event.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.register === false){
            this.setState({error: 'Error, Try Again'});
        }else{
            this.setState({
                name: '',
                lastname: '',
                email: '',
                password:''
            })
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error:''});
        this.props.dispatch(registerUser({
            email:this.state.email,
            password:this.state.password,
            lastname:this.state.lastname,
            name:this.state.name
        }, this.props.user.users))
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
        console.log(this.props);
        let users = this.props.user.users;
        return(
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add User</h2>
                    <div className="form_element">
                        <input  
                            type="text"
                            placeholder="enter name"
                            value = {this.state.name}
                            onChange={this.handleInputName}
                            />
                       </div>
                       <div className="form_element">  
                        <input  
                            type="text"
                            placeholder="enter lastname"
                            value = {this.state.lastname}
                            onChange={this.handleInputLastname}
                            />
                         </div>
                        <div className="form_element">
                        <input  
                            type="email"
                            placeholder="enter email"
                            value = {this.state.email}
                            onChange={this.handleInputEmail}
                            />
                         </div>
                        <div className="form_element">
                        <input  
                            type="password"
                            placeholder="enter password"
                            value = {this.state.password}
                            onChange={this.handleInputPassword }
                            />
                        </div>
                        <div className="form_element">
                            <button type="submit">Add Admin</button>
                        </div>
                        <div className="error">
                            {this.state.error}
                        </div>
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