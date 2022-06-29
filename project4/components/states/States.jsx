import React from 'react';
import './States.css';

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : window.cs142models.statesModel().slice(),
      keyword:'',
    }
    // console.log('window.cs142models.statesModel()', window.cs142models.statesModel());
    this.handleSearchChange = e => this.handleChange(e);
  }
  handleChange(e){
    this.setState({
      dataSource:window.cs142models.statesModel().filter(state=>state.toLowerCase().includes(e.target.value)).sort(),
      keyword:e.target.value,
    })
  }
  render() {
    let descJsx;
    if(this.state.dataSource.length == 0 ){
      descJsx = <p>No matching results.</p>
    }else{
      descJsx = <p>Searching : {this.state.keyword}</p>
    }
    if(this.state.keyword ===''){
      descJsx = <p>Please type to search.</p>
    }
    return (
      <div>
        <input type="text" onChange={this.handleSearchChange}></input>
        {descJsx}
        <ol>
          {this.state.dataSource.map(state => <li key={state}>{state}</li>)}
        </ol>    
      </div>
    );
  }
}

export default States;
