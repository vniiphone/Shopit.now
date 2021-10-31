import React, { Component } from 'react';
import { passwordPattern,passwordRule } from "../../../datas/passwordPattern";
import {Formik} from 'formik';
import * as Yup from 'yup';
import InputContainer from './InputContainer';
import { userLogin,setJwt,getJwt,getCurrentUser,removeJwt } from "../../../services/LoginReg";
import api from "../../../api/api-endpoints.json";
import loadingAnim from "../../../animations/dataload.json";
import Lottie from "lottie-react";
import axios from 'axios';

const validate=Yup.object().shape({
    current:Yup.string().required("Enter the current password").max(20).label('Current Password').trim(),
    password:Yup.string().max(20).matches(passwordPattern,passwordRule).required("Enter the new password").label("Password").trim(),
    confirm:Yup.string().required("Confirm the password").oneOf([Yup.ref('password'),null],"Passwords doesn't match").label("Confirm Password").trim()
});

class PasswordChange extends Component {

    state={
        passwordChangeLoading:false,
        passwordChangeError:null,
        passwordChangeServerError:false
    }

    handlePasswordChange=async(value)=>{
        const {id,sub}=getCurrentUser();
        this.setState({passwordChangeLoading:true,passwordChangeError:null,passwordChangeServerError:false});
        await axios.put(`${api.userOperations}/update-password/${id}`,{
            password:value.current,
            newPassword:value.password
        }, {headers:{'Authorization':getJwt()}})
            .then(()=>{
                this.handleReLogin(sub,value.password);
            }).catch(({request})=>{
                if(!request.status){
                    this.setState({passwordChangeLoading:false,passwordChangeServerError:true});
                }else if(request.status===401){
                    this.setState({passwordChangeLoading:false,passwordChangeError:"Password is wrong"});
                }
                else{
                    this.setState({passwordChangeLoading:false,passwordChangeServerError:true});
                }
            })
    }

    handleReLogin=async(email,password)=>{
        await userLogin(email,password)
            .then(({data})=>{
                setJwt(data);
                window.location="/";
            })
            .catch(()=>{
                removeJwt();
            });
    }

    render() {
        const {passwordChangeServerError,passwordChangeError,passwordChangeLoading}=this.state;
        return (
            <div className="admin-settings-password-container">
                <h1>Change Password</h1>
                {passwordChangeLoading && <div className="admin-settings-pass-change-loading">
                    <Lottie className="loading-anim" animationData={loadingAnim} />
                </div>}
                <Formik
                    initialValues={{
                        current:'',
                        password:'',
                        confirm:''
                    }}
                    validationSchema={validate}
                    onSubmit={(value)=>this.handlePasswordChange(value)}
                >
                    {({handleChange,handleSubmit,errors,setFieldTouched,touched})=>(
                        <form onSubmit={handleSubmit}>
                            <InputContainer
                                disabled={passwordChangeLoading?true:false}  
                                errors={errors.current} 
                                touched={touched.current}
                                onChange={handleChange('current')}
                                onBlur={()=>setFieldTouched('current')}
                                name="Old Password"
                                passwordError={passwordChangeError} 
                            />
                            <InputContainer
                                disabled={passwordChangeLoading?true:false}  
                                errors={errors.password} 
                                touched={touched.password}
                                onChange={handleChange('password')}
                                onBlur={()=>setFieldTouched('password')} 
                                name="New Password"
                            />
                            <InputContainer 
                                disabled={passwordChangeLoading?true:false} 
                                errors={errors.confirm} 
                                touched={touched.confirm}
                                onChange={handleChange('confirm')}
                                onBlur={()=>setFieldTouched('confirm')} 
                                name="Confirm Password"
                            />
                            {passwordChangeServerError && <h5 className="admin-change-server-error">Server error occured. Try after sometime</h5>}
                            <p><button disabled={passwordChangeLoading?true:false} type="submit">Change Password</button></p>
                        </form>
                    )}
                    </Formik>
            </div>
        );
    }
}

export default PasswordChange;