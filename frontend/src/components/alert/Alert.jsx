import React, { useState } from 'react'
import './alert.css';
import { useMyContext } from '../usecontext/Mycontext';
import { useNavigate } from 'react-router-dom';

const Alert = () => {
    // navigation router
    const navigate = useNavigate();

    // context api data
    const { alertData, setAlertData } = useMyContext();

    const btnHandler = () => {
        if (alertData.status === 200) {
            navigate('/')
        }
        setAlertData((e) => ({ ...e, alert: false, message: "", h1: "" }))
    }

    return (
        <>
            {
                alertData.alert &&

                <div className={`alert__container ${!alertData.alert ? 'hidden' : "show_alert"}`}>
                    <div id='message'>
                        <h1 style={
                            alertData.status === 200 ?
                                { color: '#4dbf00' } : { color: "#ea7f00" }}>
                            {alertData.h1}</h1>
                        <p>{alertData.message}</p>
                        <button onClick={btnHandler}>Ok</button>
                    </div>
                </div>
            }
        </>

    )
}

export default Alert