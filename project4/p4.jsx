import React from "react";
import ReactDOM from 'react-dom';
import States from './components/states/States';
import Header from './components/header/Header';
import Example from './components/example/Example';


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
                <button onClick={this.onClick.bind(this)}>{this.state.desc}</button>
                {this.state.isExample?<Example />:<States />}
            </div>
        )
    }
}

ReactDOM.render(
    <SwitchComponent />,
    document.getElementById('reactapp'),
)