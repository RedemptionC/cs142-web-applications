import React from "react";
import './Header.css'

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="header">
                Take your time.
                <img src="https://cdn.unwire.hk/wp-content/uploads/2015/06/AppleWebdesignshock.jpg"></img>
            </div>
        );
    }
}

export default Header;