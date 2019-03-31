import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout'
import Auth from './hoc/auth';

import Home from './components/home/home';
import BookView from './components/book';
import Login from './components/Admin/login';
import User from './components/Admin/user';
import AddReview from './components/Admin/addReview';
import UserPosts from './components/Admin/userPosts';
import Edit from './components/Admin/edit';
import Register from './components/Admin/register';

const Routes = () =>{
    return(
        <Layout>
            <Switch>
                <Route path ="/" exact component={Auth(Home,null)}/>                
                <Route path = "/login" exact component = {Auth(Login, false)}/>
                <Route path ="/user" exact component = {Auth(User, true)}/>
                <Route path = "/user/add" exact component = {Auth(AddReview, true)}/>
                <Route path = "/user/register" exact component = {Auth(Register, true)}/>
                <Route path = "/user/edit-post/:id" exact component = {Auth(Edit, true)}/>
                <Route path ="/books/:id" exact component = {Auth(BookView, null)}/>    
                <Route path ="/user/user-reviews" exact component = {Auth(UserPosts, true)}/>            
            </Switch>
        </Layout>        
    );
};

export default Routes;