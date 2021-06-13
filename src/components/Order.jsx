import React, { useState, useEffect } from 'react';
const Binance = require('node-binance-api');

function Order() {
    const [order, setOrder] = useState([])
    useEffect(() => {
        fetchData().then(apiOrder => {
            setOrder(apiOrder);
            console.log(apiOrder);
        })
    }, [])
    
    
    return (
        <div>
            {order.map((historyOrder) => 
                <div>{historyOrder.orderId}</div>)}
        </div>
    )
}

const fetchData = (symbol) => {
    const apiKey = process.env.REACT_APP_BINANCE_API_KEY
    const apiSecret = process.env.REACT_APP_BINANCE_API_SECRET
    const binance = new Binance().options({
        APIKEY: apiKey,
        APISECRET: apiSecret
    });
    return binance.futuresUserTrades( symbol )
}

export default Order
