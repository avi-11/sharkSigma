// import './App.css';
import React, { Component } from 'react'
// import API_URL from "./config/axios_config";
import axios from "axios";


const API_URL = 'https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01';



export default class ForgotPassword extends Component {

  constructor(){
    super();
    this.state={
      username:null,
      resetmail:false,
      mailnotfound:false,
    }
  }

  forgotpass(){

    axios({
      method: 'post',
      url: API_URL +"/forgot-password",
      data: this.state
  })
     .then((res)=>{
      console.log(res.data)
      if (res.data.message === "user not found !"){
        this.setState({mailnotfound:true})
      }
       if(res.data.message ==="reset password link send on user email"){
        this.setState({resetmail:true,mailnotfound:false},console.log("Link sent to email"))
       }})
       .catch(function (error) {
        console.log(error);
    })
  

 


    
  }
  
    handleSubmit=e=>{
      e.preventDefault();
    }
  
  render() {
    
    return (
      <div>
       <section>
        <div className="container">
          <div className="user signinBx">
            <div className="formBx">
              <form onClick={this.handleSubmit}>
                <p className="signup">
                  <span>Forgot Your Password ?</span><br />
                  Enter your username and we'll send you a 
                  link to get back into your account.
                </p>
                <input placeholder="Username" onChange={(e)=>{this.setState({username:e.target.value})}} /><br/>
                <div className=" Errortextcolor" style={{color: 'red !important'}}  onChange={(e)=>{this.setState({username:e.target.value})}} />
                <button  className="btn btnsign"  onClick={()=> {this.forgotpass()}} >Send Link</button>
              
              {this.state.mailnotfound===true?<strong className="Errortextcolor errorcontain" >User not found</strong>:null}
              { this.state.resetmail===true?<div style={{color:"green"}} >Link sent to your registered mail address!</div>:null}

              </form>
            </div>
          </div>

        </div>

      </section>


        </div>
    )
  }
}








