import React, { Component } from 'react';
import { Card , Row , Col , Icon , message , Input , Button } from 'antd';
import axios from 'axios';
import ReactLogo from './React.png';
import DjangoLogo from './Django.png';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      path:null,
      outcome:null,
      color:"#096dd9",
      loading: false,
      disabled: false
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
        loading:true,
        disabled:true
      })
      axios.post("http://localhost:8000/pneumonia/" , JSON.stringify(path) )
      .then(response => {
        console.log(response)
        this.setState({
          loading:false,
          disabled:false,
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
            color:"#096dd9"
          })
        }
      })
      .catch(error => {
        message.error("Error")
        console.log(error)
        this.setState({
          loading:false,
          disabled:false
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
      return <div className="no-result"><Icon type="stop" /><span style={{ fontSize:"18px" , marginLeft:"20px" }}>Upload an Image and Consult to get Result</span></div>
    }
  }

  render() {
    return (<div className="body-container">
        <div className="header" style={{ backgroundColor:this.state.color }}>PNEUMONIA DETECTION</div>
        <div className="container">
            Copy and Paste the Image url from your machine that you would like to consult
            <div className="upload-container">
              <Input onChange={this.setPath} disabled={this.state.disabled} className="consult-input"/>
              <Button onClick={this.consult} type="primary" loading={this.state.loading}>Consult</Button>
            </div>
            <div className="result-container">
              {this.renderResult()}
            </div>
        </div>
        <div className="footer">
          <img className="img-size-django" src={DjangoLogo}/>
          <img className="img-size" src={ReactLogo}/><span className="react-text">React</span>
        </div>
      </div>
    );
  }
}

export default Home;