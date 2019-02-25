import React from 'react';
import Header from '../components/header/header';

const Layout = (props) => {
    return(
        <div>
            <Header/>
            {props.children}
        </div>
    )
}

export default Layout;