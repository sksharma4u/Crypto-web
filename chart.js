//Pseudo code
//Step 1: Define chart properties.
//Step 2: Create the chart with defined properties and bind it to the DOM element.
//Step 3: Add the CandleStick Series.
//Step 4: Set the data and render.
//Step5 : Plug the socket to the chart


//---------------------------------------------------------For List.html---------------------------------------------------------------------------------------------------------

var mychoice = "";
fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d").then(
    res => {
        res.json().then(
            data => {
                console.log(data);
                if (data.length > 0) {

                    var temp = "";
                    let idx = 0;

                    data.forEach((itemData) => {
                        temp += "<tr>";
                        temp += "<td>" + itemData.market_cap_rank + "</td>";
                        temp += "<td>" + "<img src = " + itemData.image + ">" + "</td>";

                        temp += "<td>" + itemData.symbol.toUpperCase() + "</td>";

                        temp += "<td>" + `<a href ="coinvolume.html">` + itemData.name + "</a>" + "</td>";

                        temp += "<td>" + itemData.current_price + "$" + "</td>";
                        temp += "<td>" + itemData.high_24h + "$" + "</td>";
                        temp += "<td>" + itemData.low_24h + "$" + "</td>";

                        mychoice = itemData.symbol.toUpperCase();

                    });

                    document.getElementById('data').innerHTML = temp;

                }
            }
        )
    }
)


fetch("https://api.coingecko.com/api/v3/search/trending").then(
    res => {
        res.json().then(
            data => {
                console.log(data);
                var temp = "";
                data.coins.forEach((itemData) => {
                    //console.log(itemData.item.name);
                    temp += "<tr>";
                    temp += "<td>" + itemData.item.market_cap_rank + "</td>";
                    temp += "<td>" + "<img src = " + itemData.item.large + ">" + "</td>";
                    temp += "<td>" + itemData.item.symbol + "</td>";
                    temp += "<td>" + itemData.item.name + "</td>";
                    temp += "</tr>";
                });
                document.getElementById('seven').innerHTML = temp;



            })
    }
)


//--------------------------------------------------------------For Coinvolume.html-----------------------------------------------------------------------------------------------


const log = console.log;

const chartProperties = {
    width: 1000,
    height: 600,
    timeScale: {
        timeVisible: true,
        secondsVisible: false,
    }
}

const domElement = document.getElementById('chart');
const chart = LightweightCharts.createChart(domElement, chartProperties);
const candleSeries = chart.addCandlestickSeries();


fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000`)
    .then(res => res.json())
    .then(data => {
        const cdata = data.map(d => {
            return { time: d[0] / 1000, open: parseFloat(d[1]), high: parseFloat(d[2]), low: parseFloat(d[3]), close: parseFloat(d[4]) }
        });
        candleSeries.setData(cdata);
    })
    .catch(err => log(err))

//Dynamic Chart

const socket = io.connect('http://127.0.0.1:4000/');


socket.on('KLINE', (pl) => {
    log(pl);
    candleSeries.update(pl);
});