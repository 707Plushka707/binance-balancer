import React, { useState, useEffect } from 'react';
const Binance = require('node-binance-api');

function Order() {
    const [trades, settrades] = useState([])
    const [displayTrades, setDisplayTrades] = useState([])

    const sixHours = 60*60*6*1000
    const oneDay = 4*sixHours

    const handleDisplaytrades = (timeDelta) => {
        setDisplayTrades(trades.filter(trade =>new Date().getTime() - trade.time < timeDelta))
     }

    useEffect(() => {
        fetchData('ETHUSDT').then(apiTrades => {
            apiTrades = apiTrades.reverse();
            settrades(apiTrades);
            setDisplayTrades(apiTrades);
        })
    }, [])
    
    return (
        <div>
            <button onClick={() => handleDisplaytrades(sixHours) }>6hours</button>
            <button onClick={() => handleDisplaytrades(oneDay) }>1day</button>
            {displayTrades
                .map((trade, tradeIdx) => {
                    return <div key={tradeIdx}>{trade.price}, {trade.side}, {trade.qty}, {new Date(trade.time).toLocaleString()}</div>
            })}
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

// const computeProfit = () => {

// }


export default Order
