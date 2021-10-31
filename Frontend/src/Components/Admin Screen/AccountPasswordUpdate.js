import React, { Component } from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminChangesInput from './Settings/AdminChangesInput';
import {passwordPattern,passwordRule} from '../../datas/passwordPattern';
import SubmissionButton from './SubmissionButton';

const validate=Yup.object().shape({
    current:Yup.string().required("Enter the current password").max(20).label('Current Password').trim(),
    password:Yup.string().max(20).matches(passwordPattern,passwordRule).required("Enter the new password").label("Password").trim(),
    confirm:Yup.string().required("Confirm the password").oneOf([Yup.ref('password'),null],"Passwords doesn't match").label("Confirm Password").trim()
});

class AccountPasswordUpdate extends Component {
    
    render() {
        const {passwordChangeStarted,handlePasswordChange,passwordError,btn,changeRef,handleSettings}=this.props;
        return (
            <div ref={changeRef} className="mainpulate-account">
                <FontAwesomeIcon onClick={()=>!passwordChangeStarted ? handleSettings(changeRef):null} className="back-btn" icon={faArrowLeft} /> 
                
                <Formik
                    initialValues={{
                        current:'',
                        password:'',
                        confirm:''
                    }}
                    validationSchema={validate}
                    onSubmit={handlePasswordChange}
                >
                    {({handleChange,handleSubmit,errors,setFieldTouched,touched})=>(
                        <form onSubmit={handleSubmit}>
                            <AdminChangesInput error={passwordError} touched={touched.current} errors={errors.current} onChange={handleChange('current')} onBlur={()=>setFieldTouched('current')} labelName="Current Password"/>
                            <AdminChangesInput touched={touched.password} errors={errors.password} onChange={handleChange('password')} onBlur={()=>setFieldTouched('password')} labelName="New Password"/>
                            <AdminChangesInput touched={touched.confirm} errors={errors.confirm} onChange={handleChange('confirm')} onBlur={()=>setFieldTouched('confirm')} labelName="Confirm Password"/>
                            <SubmissionButton
                                type="submit"
                                onSubmission={passwordChangeStarted}
                                btn={btn}
                            />
                        </form>
                    )}
                </Formik>
            </div>           
        );
    }
}

export default AccountPasswordUpdate;