import React from 'react';
import InputContainer from '../Components/Home/InputContainer';
import logo from '../Icons/logo-now';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../css/login.css';
import { Link, Redirect } from 'react-router-dom';
import LoginMain from '../Components/login-register/LoginMain';
import LoginRegError from '../Components/login-register/LoginRegError';
import Success from '../Components/login-register/Success';
import {getCurrentUser} from '../services/LoginReg';

const validate=Yup.object().shape({
    email:Yup.string().required("Enter the email").max(25,"Stop playing around").email("Invalid email").label('Email').trim(),
    password:Yup.string().required("Enter the password").label("Password").trim(),
});

class Login extends LoginMain { 
    render() {
        if(getCurrentUser()) return <Redirect to="/"/>
        const {loginError,loginBegan}=this.state;
        return (
        <div className="login-container">
            {loginBegan && <Success />}
            <div className="login-sub-container">
                {loginError && <LoginRegError error={loginError}/>}
                <h2>LOGIN</h2>
                <Formik 
                    initialValues={{
                        email:'',
                        password:''
                    }}
                    validationSchema={validate}
                    onSubmit={this.handleLogin}
                >
                    {({handleChange,handleSubmit,touched,errors,setFieldTouched})=>(
                        <form onSubmit={handleSubmit}>
                            <InputContainer inputRef={this.userref} spellCheck="false" autoComplete='off' type='text' onBlur={()=>setFieldTouched('email')} onChange={handleChange('email')} errors={errors.email} touched={touched.email} style={{background:'none',maxWidth:'450px'}} name="email"/>
                            <InputContainer inputRef={this.passref} spellCheck="false" type='password' onBlur={()=>setFieldTouched('password')} onChange={handleChange('password')} errors={errors.password} touched={touched.password} style={{background:'none',maxWidth:'450px'}} name="password"/>
                            <button disabled={loginBegan} ref={this.submitRef} type='submit'>LOGIN</button>
                            <Link className="dont-have-account" to="/register">Don't have an account?</Link>
                        </form>
                    )}
                </Formik>
            </div>
            
            <Link to="/" className="logo">
                <h2>Shopit</h2>
                {logo}
            </Link>
       </div>
        );
    }
}

export default Login;