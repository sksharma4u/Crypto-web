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