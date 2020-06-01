$(document).ready(function () {

    var api_key = "f73fd9c61d759fb7881aaaee51fc4a28";
    var loc;

    $.getJSON('http://ipinfo.io', function (data) {
        loc = data.loc.split(",");
        console.log(loc);
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + loc[0] + "&lon=" + loc[1] + "&appid=" + api_key, function (wd) {
            console.log("Get the value", wd);

            var timezone = wd.name + "/" + wd.sys.country;
            var weather = wd.weather[0].main;
            var temperature = wd.main.temp;
            temperature = Math.round(((temperature - 273.15) * 100) / 100);
            var fahren = ((temperature * 9) / 5) + 32;
            fahren = (Math.round(fahren * 100) / 100) + " &#8457";
            temperature = temperature + " &#8451";
            var summary = wd.weather[0].description;
            var humidity = "Humidity : " + (wd.main.humidity) + " %";
            var pressure = "Pressure : " + (wd.main.pressure) + " hPa";
            var icon = wd.weather[0].icon;

            $("#timezone").html(timezone);
            $("#weather").html(weather);
            $("#temperature").html(temperature);
            $("#summary").html(summary);
            $("#humidity").html(humidity);
            $("#pressure").html(pressure);
            $("#centi").bind("click", function () {
                $("#temperature").html(temperature);
            });
            $("#fahren").bind("click", function () {
                $("#temperature").html(fahren);
            });

            var iconsrc = "http://openweathermap.org/img/w/" + icon + ".png";
            $("#weather").prepend('<img src="' + iconsrc + '">');
        });

    });

});