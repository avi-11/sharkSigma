// import './App.css';
import  { Component } from 'react'
import { withRouter } from "react-router";
import axios from "axios";

const API_URL = 'https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01';


class ForgotPassword extends Component {
  constructor(){
    super();
    this.state={
      uidb64:null,
      token:null,
      password1:null,
      password2:null,
      passwordreset:false,
      dontmatch:false,
      passwordshort:false,
      passwordcommon:false,
      passwordnumeric:false
    }
  }


  reset(){
    const uid1 = this.props.match.params.uidb64;
    const token1 = this.props.match.params.token;
    // console.log(uid1,token1)
    this.setState({token:token1})
    this.setState({uidb64:uid1})


    axios({
      method: 'post',
      url: API_URL+'/password_reset',
      data:{
        token: token1,
        uidb64: uid1,
        password1:this.state.password1,
        password2:this.state.password2,
        dontmatch:this.state.dontmatch,
        passwordreset:this.state.passwordreset,
        passwordshort:this.state.passwordshort
      } 
    })



    .then((res)=>{
      // console.log(token,uidb64)
      console.log(res.data)
      if(res.data.message==="The two password fields didn’t match"){
        this.setState({dontmatch:true })
      }else{this.setState({dontmatch:false})}
      if(res.data.message==="password changed"){
        this.setState({passwordreset:true })
      }else{this.setState({passwordreset:false})}
      if(res.data.message[0]==="This password is too short. It must contain at least 8 characters."){
        this.setState({passwordshort:true})
      }else{this.setState({passwordshort:false})}
      if(res.data.message[1]==="This password is too common."){
        this.setState({passwordcommon:true})
      }else{this.setState({passwordcommon:false})}
      if(res.data.message[2]==="This password is entirely numeric."){
        this.setState({passwordnumeric:true})
      }else{this.setState({passwordnumeric:false})}
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
                      <form onClick={this.handleSubmit} >
                        <p className="signup">
                          <span>Reset Your Password</span>
                        </p>
                        <input type="password" placeholder="Enter a strong password" name="password1" onChange={(e)=>{this.setState({password1:e.target.value})}}  required /><br />
                        <input type="password" placeholder="Confirm password" name="password2" onChange={(e)=>{this.setState({password2:e.target.value})}} required /><br />
                        <ul className="messages">
                          <div className=" Errortextcolor" style={{color: 'red !important'}}>
                          </div></ul>
                        
                        {this.state.passwordreset===true?<div className="success">Your password is reset!</div>:null}
                        {this.state.dontmatch===true?<div className="failure" >Passwords dont match, try again</div>:null}
                        {this.state.passwordshort===true?<div className="failure" >This password is too short. It must contain at least 8 characters</div>:null}
                        {this.state.passwordcommon===true?<div className="failure" >This password is too common.</div>:null}
                        {this.state.passwordnumeric===true?<div className="failure" >This password is entirely numeric.</div>:null}

                        <button onClick={()=>{this.reset()}} className="btn">Change password</button>
          
                      </form>
                    </div>
                  </div>
                </div>
          </section>
        </div>
    )
  }
}

export default withRouter(ForgotPassword);


