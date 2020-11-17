<template>
    <div class="app grid grid-cols-4 gap-4">
        <div class="p-4 col-span-1" v-if="weather.main">
            <div class="text-white text-center text-2xl">
                {{ weather.name }}, {{ weather.sys.country }}
                <div class="text-xl">{{ dateBuilder() }}</div>
            </div>

            <div class="flex pl-4">
                <div class="icon thunder-storm">
                    <div class="cloud"></div>
                    <div class="lightning">
                        <div class="bolt"></div>
                        <div class="bolt"></div>
                    </div>
                </div>
                <div class="pl-4 pt-4">
                    <div class="text-white text-6xl">
                        {{ Math.round(weather.main.temp) }}°C
                    </div>
                    <div class="text-gray-300 ml-3 text-l">
                        {{ weather.weather[0].description }}
                    </div>
                </div>
            </div>
        </div>

        <dix class="flex col-start-2 ml-10 col-span-2 -my-5">
            <div class="time">{{ time }}</div>
            <div class="mt-20 seconds">{{ seconds }}</div>
        </dix>
    </div>
</template>

<script>
import { createFrontend } from "@awtrix/common";

export default createFrontend({
    data() {
        return {
            api_key: "db41ee048bee3ecc248a1ec47dfe3d21",
            url_base: "https://api.openweathermap.org/data/2.5/",
            query: "",
            location: "Maintal",
            weather: {},
            time: "",
            seconds: 0,
        };
    },

    mounted() {
        this.getWeather();
        setInterval(() => this.getTime(), 1000);
    },

    methods: {
        getWeather() {
            fetch(
                `${this.url_base}weather?q=${this.location}&units=metric&APPID=${this.api_key}`
            )
                .then((res) => {
                    return res.json();
                })
                .then(this.setResults);
        },
        setResults(results) {
            console.log(results);
            this.weather = results;
        },
        dateBuilder() {
            let d = new Date();
            let months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            let days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
            return `${day}, ${date}.${month} ${year}`;
        },
        getTime() {
            var cd = new Date();
            this.time =
                this.zeroPadding(cd.getHours(), 2) +
                ":" +
                this.zeroPadding(cd.getMinutes(), 2);
            this.seconds = Math.floor(Math.random() * 60);
        },
        zeroPadding(num, digit) {
            var zero = "";
            for (var i = 0; i < digit; i++) {
                zero += "0";
            }
            return (zero + num).slice(-digit);
        },
    },
});
</script>

<style>
.app {
    color: #000000;
    font-family: "Roboto", sans-serif;
    background-color: currentColor;
    height: 100%;
}

.icon {
    position: relative;
    display: inline-block;
    width: 12em;
    height: 10em;
    font-size: 1em; /* control icon size here */
}

.cloud {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 3.6875em;
    height: 3.6875em;
    margin: -1.84375em;
    background: currentColor;
    border-radius: 50%;
    box-shadow: -2.1875em 0.6875em 0 -0.6875em, 2.0625em 0.9375em 0 -0.9375em,
        0 0 0 0.375em #fff, -2.1875em 0.6875em 0 -0.3125em #fff,
        2.0625em 0.9375em 0 -0.5625em #fff;
}
.cloud:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -0.5em;
    display: block;
    width: 4.5625em;
    height: 1em;
    background: currentColor;
    box-shadow: 0 0.4375em 0 -0.0625em #fff;
}
.cloud:nth-child(2) {
    z-index: 0;
    background: #fff;
    box-shadow: -2.1875em 0.6875em 0 -0.6875em #fff,
        2.0625em 0.9375em 0 -0.9375em #fff, 0 0 0 0.375em #fff,
        -2.1875em 0.6875em 0 -0.3125em #fff, 2.0625em 0.9375em 0 -0.5625em #fff;
    opacity: 0.3;
    transform: scale(0.5) translate(6em, -3em);
    animation: cloud 4s linear infinite;
}
.cloud:nth-child(2):after {
    background: #fff;
}

.sun {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.5em;
    height: 2.5em;
    margin: -1.25em;
    background: currentColor;
    border-radius: 50%;
    box-shadow: 0 0 0 0.375em #fff;
    animation: spin 12s infinite linear;
}
.rays {
    position: absolute;
    top: -2em;
    left: 50%;
    display: block;
    width: 0.375em;
    height: 1.125em;
    margin-left: -0.1875em;
    background: #fff;
    border-radius: 0.25em;
    box-shadow: 0 5.375em #fff;
}
.rays:before,
.rays:after {
    content: "";
    position: absolute;
    top: 0em;
    left: 0em;
    display: block;
    width: 0.375em;
    height: 1.125em;
    transform: rotate(60deg);
    transform-origin: 50% 3.25em;
    background: #fff;
    border-radius: 0.25em;
    box-shadow: 0 5.375em #fff;
}
.rays:before {
    transform: rotate(120deg);
}
.cloud + .sun {
    margin: -2em 1em;
}

.rain,
.lightning,
.snow {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    width: 3.75em;
    height: 3.75em;
    margin: 0.375em 0 0 -2em;
    background: currentColor;
}

.rain:after {
    content: "";
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    width: 1.125em;
    height: 1.125em;
    margin: -1em 0 0 -0.25em;
    background: #0cf;
    border-radius: 100% 0 60% 50% / 60% 0 100% 50%;
    box-shadow: 0.625em 0.875em 0 -0.125em rgba(255, 255, 255, 0.2),
        -0.875em 1.125em 0 -0.125em rgba(255, 255, 255, 0.2),
        -1.375em -0.125em 0 rgba(255, 255, 255, 0.2);
    transform: rotate(-28deg);
    animation: rain 3s linear infinite;
}

.bolt {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -0.25em 0 0 -0.125em;
    color: #fff;
    opacity: 0.3;
    animation: lightning 2s linear infinite;
}
.bolt:nth-child(2) {
    width: 0.5em;
    height: 0.25em;
    margin: -1.75em 0 0 -1.875em;
    transform: translate(2.5em, 2.25em);
    opacity: 0.2;
    animation: lightning 1.5s linear infinite;
}
.bolt:before,
.bolt:after {
    content: "";
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    margin: -1.625em 0 0 -1.0125em;
    border-top: 1.25em solid transparent;
    border-right: 0.75em solid;
    border-bottom: 0.75em solid;
    border-left: 0.5em solid transparent;
    transform: skewX(-10deg);
}
.bolt:after {
    margin: -0.25em 0 0 -0.25em;
    border-top: 0.75em solid;
    border-right: 0.5em solid transparent;
    border-bottom: 1.25em solid transparent;
    border-left: 0.75em solid;
    transform: skewX(-10deg);
}
.bolt:nth-child(2):before {
    margin: -0.75em 0 0 -0.5em;
    border-top: 0.625em solid transparent;
    border-right: 0.375em solid;
    border-bottom: 0.375em solid;
    border-left: 0.25em solid transparent;
}
.bolt:nth-child(2):after {
    margin: -0.125em 0 0 -0.125em;
    border-top: 0.375em solid;
    border-right: 0.25em solid transparent;
    border-bottom: 0.625em solid transparent;
    border-left: 0.375em solid;
}

.flake:before,
.flake:after {
    content: "\2744";
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -1.025em 0 0 -1.0125em;
    color: #fff;
    list-height: 1em;
    opacity: 0.2;
    animation: spin 8s linear infinite reverse;
}
.flake:after {
    margin: 0.125em 0 0 -1em;
    font-size: 1.5em;
    opacity: 0.4;
    animation: spin 14s linear infinite;
}
.flake:nth-child(2):before {
    margin: -0.5em 0 0 0.25em;
    font-size: 1.25em;
    opacity: 0.2;
    animation: spin 10s linear infinite;
}
.flake:nth-child(2):after {
    margin: 0.375em 0 0 0.125em;
    font-size: 2em;
    opacity: 0.4;
    animation: spin 16s linear infinite reverse;
}

/* Animations */

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes cloud {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.3;
    }
    100% {
        opacity: 0;
        transform: scale(0.5) translate(-200%, -3em);
    }
}

@keyframes rain {
    0% {
        background: #0cf;
        box-shadow: 0.625em 0.875em 0 -0.125em rgba(255, 255, 255, 0.2),
            -0.875em 1.125em 0 -0.125em rgba(255, 255, 255, 0.2),
            -1.375em -0.125em 0 #0cf;
    }
    25% {
        box-shadow: 0.625em 0.875em 0 -0.125em rgba(255, 255, 255, 0.2),
            -0.875em 1.125em 0 -0.125em #0cf,
            -1.375em -0.125em 0 rgba(255, 255, 255, 0.2);
    }
    50% {
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0.625em 0.875em 0 -0.125em #0cf,
            -0.875em 1.125em 0 -0.125em rgba(255, 255, 255, 0.2),
            -1.375em -0.125em 0 rgba(255, 255, 255, 0.2);
    }
    100% {
        box-shadow: 0.625em 0.875em 0 -0.125em rgba(255, 255, 255, 0.2),
            -0.875em 1.125em 0 -0.125em rgba(255, 255, 255, 0.2),
            -1.375em -0.125em 0 #0cf;
    }
}

@keyframes lightning {
    45% {
        color: #fff;
        background: #fff;
        opacity: 0.2;
    }
    50% {
        color: #0cf;
        background: #0cf;
        opacity: 1;
    }
    55% {
        color: #fff;
        background: #fff;
        opacity: 0.2;
    }
}

.time {
    font-size: 300px;
    height: 400px;
    font-weight: 300;
    color: #fff;
    background: url(http://orig00.deviantart.net/dc13/f/2016/098/e/d/rolly_rocket_by_valenberg-d9y6rvp.gif)
            center / cover,
        url(https://i.pinimg.com/originals/e6/ca/27/e6ca27f8de0e348da67e315f767b663d.gif)
            center / cover,
        #fff;
    filter: saturate(2) brightness(2);
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.seconds {
    font-size: 100px;
    font-weight: 300;
    color: #fff;
    background: url(http://orig00.deviantart.net/dc13/f/2016/098/e/d/rolly_rocket_by_valenberg-d9y6rvp.gif)
            center / cover,
        url(https://i.pinimg.com/originals/e6/ca/27/e6ca27f8de0e348da67e315f767b663d.gif)
            center / cover,
        #fff;
    filter: saturate(2) brightness(2);
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
