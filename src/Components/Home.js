import React, { Component } from 'react';
import { Card , Row , Col , Upload , Icon , message , Input , Button } from 'antd';
import axios from 'axios';

const BASE_URL = "https://localhost:8000"
const CONSULT = BASE_URL + "/pneumonia/"

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      path:null,
      outcome:null,
      color:"#fff",
      loading: false
    }
  }
  setPath = (e) => {
    this.setState({
      path:e.target.value
    })
  }
  consult = () => {
    let path = this.state.path;
    if(path){
      this.setState({
        loading:true
      })
      axios.post(CONSULT , JSON.stringify(path) )
      .then(response => {
        console.log(response)
        this.setState({
          loading:false,
          outcome:response.data.toLowerCase()
        })
        if(response.data.toLowerCase()==="normal"){
          this.setState({
            color:"#52c41a"
          })
        }
        else if(response.data.toLowerCase()==="abnormal"){
          this.setState({
            color:"#f5222d"
          })
        }
        else{
          this.setState({
            color:"#fff"
          })
        }
      })
      .catch(error => {
        message.error("Error")
        console.log(error)
        this.setState({
          loading:false
        })
      })
    }
  }

  renderResult = () => {
    let outcome = this.state.outcome;
    if(outcome==="normal"){
      return <div className="normal-result"><Icon type="smile" /><span style={{ fontSize:"18px" , marginLeft:"20px" }}>You are absolutely Normal and Good to go!</span></div>
    }
    if(outcome==="abnormal"){
      return <div className="abnormal-result"><Icon type="frown" /><span style={{ fontSize:"18px" , marginLeft:"20px" }}>There seems to be something wrong. Please go for a medical examination!!</span></div>
    }
    else{
      return <div className="no-result"><Icon type="stop" /><span style={{ fontSize:"18px" , marginLeft:"20px" }}>Upload an Image path to consult yourself</span></div>
    }
  }

  render() {
    return (<div className="body-container" style={{ backgroundColor:this.state.color }}>
        <div className="container">
            Copy and Paste the Image url from your machine that you would like to consult
            <div className="upload-container">
              <Input onChange={this.setPath} className="consult-input"/>
              <Button onClick={this.consult} className="consult-btn" loading={this.state.loading}>Consult</Button>
            </div>
            <div className="result-container">
              {this.renderResult()}
            </div>
        </div>
      </div>
    );
  }
}

export default Home;