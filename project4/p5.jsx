import React from "react";
import ReactDOM from 'react-dom';
import States from './components/states/States';
import Example from './components/example/Example';
import { HashRouter, Route, Link } from "react-router-dom";

class SwitchComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isExample: true,
            desc: 'Switch to States',
        }
    }
    onClick(){
        if(this.state.isExample){
            this.setState({
                isExample:false,
                desc:'Switch to Example',
            })
        }else{
            this.setState({
                isExample:true,
                desc:'Switch to States',
            })
        }
    }
    render(){
        return (
            <div>
                <nav>
                    <Link to="/example">example</Link>
                    <Link to="/states">states</Link>
                </nav>
                <Route path="/states" component={States} /> 
                <Route path="/example" component={Example} />
            </div>
        )
    }
}

ReactDOM.render(
    <HashRouter>
        <SwitchComponent />
    </HashRouter>,
    document.getElementById('reactapp'),
)