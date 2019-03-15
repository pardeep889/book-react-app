import React from 'react';

const User = (props) => {
    return(
        <div className="user_container">
            <div className="avatar">
                <img alt="avatar" src="/images/avatar.png"/>
            </div>
            <div className="nfo">
                <div>
                   <div> <span>Name: </span> {props.user.login.name}</div>
                   <div> <span>Lastname: </span> {props.user.login.lastname}</div>
                   <div> <span>Email: </span> {props.user.login.email}</div>
                </div>
            </div>
        </div>
    )
}
export default User;