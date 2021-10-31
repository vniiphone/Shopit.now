import React, { Component } from 'react';

class TimeGen extends Component {

    state={
        loading:true,
        time:{
            hrs:'',
            mins:'',
            secs:''
        }
    }

    componentDidMount(){
        this.getTime();
    }

    getTime=()=>{
        this.timeInterval=setInterval(()=>{
            const timeGen=new Date();
            let hrs=23-timeGen.getHours();
            let secs=59-timeGen.getSeconds();
            let mins=59-timeGen.getMinutes();
            hrs= hrs<10? `0${hrs}`:`${hrs}`;
            mins=mins<10? `0${mins}`:`${mins}`;
            secs=secs<10? `0${secs}`:`${secs}`;
            const time={
                hrs,mins,secs
            }
            this.setState({loading:false,time});
        },1000);
    }

    componentWillUnmount(){
        clearInterval(this.timeInterval);
    }

    render() {
        const {loading,time}=this.state;
        const {hrs,mins,secs}=time
        if(loading) return ""
        return (
                <div className="time-gen-container">
                    <span>{hrs}</span>:
                    <span>{mins}</span>:
                    <span>{secs}</span>
                </div>
            );
    }
}

export default TimeGen;