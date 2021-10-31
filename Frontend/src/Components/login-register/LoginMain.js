import React, { Component } from 'react';
import {userLogin, setJwt} from '../../services/LoginReg';

class LoginMain extends Component {

    constructor(props){
        super(props);
        this.userref= React.createRef();
        this.passref=React.createRef();
        this.submitRef=React.createRef();
    }

    state = { 
        loginError:null,
        loginBegan:false
     } 
    
    handleLogin=async({email,password})=>{
        this.handleFocusOut();
        this.handleError(true,null); 
        await userLogin(email,password)
            .then(({data})=>{
                const {state}=this.props.location;
                this.loginSuccess(data,state);
            }).catch(({response})=>{
                if(response.status===401){
                    this.handleError(false,"Invalid email or password");
                }else{
                    this.handleError(false,"Server down. Try after sometime");
                }
            });
    }

    handleError=(loginBegan,loginError)=>{
        this.setState({loginBegan,loginError});
    }

    loginSuccess=(data,state)=>{
        setJwt(data);
        window.location=state? state.from.pathname : "/";
    }
    handleFocusOut=()=>{
        this.userref.current.blur();
        this.passref.current.blur();
        this.submitRef.current.blur();
    }

}

export default LoginMain;