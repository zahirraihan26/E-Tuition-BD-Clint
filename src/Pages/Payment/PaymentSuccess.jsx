import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {
     const [searchParams] = useSearchParams()
       const sessionId = searchParams.get('session_id')
       useEffect(()=>{
        if(sessionId){
              axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, { sessionId })
        }
       },[sessionId])
    return (
        <div>
            <h1>Payment successfull</h1>
        </div>
    );
};

export default PaymentSuccess;