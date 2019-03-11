import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


const SideNavItems = () => {
    
    const Items  = [
        {
            type: 'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My Profile',
            link: '/user',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Admins',
            link: '/user/register',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Login',
            link: '/login',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Reviews',
            link: '/user/add',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Sign out',
            link: '/user/logout',
            restricted: false
        }        
    ];

    const element = (item,i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}> 
                <FontAwesome name = {item.icon}/>
                {item.text}
            </Link>
        </div>
    )

    const showItems = () => (
        Items.map((item,i) => {
            return element(item,i);
        })
    )

    return(
        <div>
            {showItems()}
        </div>
    )
}
export default SideNavItems;