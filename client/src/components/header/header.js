import React,{Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

class Header extends Component{

    state = {
        showNav:false
    }

    render(){
        return(
            <header>
                <div className="open_nav">
                    <FontAwesome name="bars"
                        style={{
                            color: "#ffffff",
                            padding: "10px",
                            cursor: 'pointer'
                        }}
                    /> 
                    </div>
                    <Link to="/" className="logo">
                        The Book Shelf
                    </Link>
               
            </header>
        )
    }
}

export default Header;