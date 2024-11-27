const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const stations = [
    {
        "id": "station_142b2f9336d0",
        "batteryLevel": null,
        "latitude": 51.054342,
        "longitude": 3.717424,
        "name": "Test Station_1",
        "description": "Koningin Astridlaan Gent",
        "sensors": [
            {
                "id": 15,
                "unit": "C",
                "type": "temperature",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:25.1921091",
                        "sensorValue": "24.08"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.8266621",
                        "sensorValue": "24.08"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:54.1310548",
                        "sensorValue": "24.08"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:15.191437",
                        "sensorValue": "24.08"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:38.1885534",
                        "sensorValue": "24.08"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.6165453",
                        "sensorValue": "24.08"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.6012887",
                        "sensorValue": "24.08"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.8912721",
                        "sensorValue": "24.08"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:18.4478214",
                        "sensorValue": "24.08"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:16.3001714",
                        "sensorValue": "24.08"
                    }
                ]
            },
            {
                "id": 16,
                "unit": "%",
                "type": "humidity",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:25.2452393",
                        "sensorValue": "44.29395"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.9128166",
                        "sensorValue": "44.29395"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:54.187668",
                        "sensorValue": "44.29395"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:15.2822383",
                        "sensorValue": "44.29395"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:38.2336692",
                        "sensorValue": "44.29395"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.6637601",
                        "sensorValue": "44.29395"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.6437189",
                        "sensorValue": "44.29395"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.9368453",
                        "sensorValue": "44.29395"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:18.5028826",
                        "sensorValue": "44.29395"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:16.3891112",
                        "sensorValue": "44.29395"
                    }
                ]
            },
            {
                "id": 17,
                "unit": "HPa",
                "type": "pressure",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:25.3169133",
                        "sensorValue": "1028.425"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.9591489",
                        "sensorValue": "1028.425"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:54.2349924",
                        "sensorValue": "1028.425"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:15.3486229",
                        "sensorValue": "1028.425"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:38.2873032",
                        "sensorValue": "1028.425"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.7013706",
                        "sensorValue": "1028.425"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.6830954",
                        "sensorValue": "1028.425"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:20.0076768",
                        "sensorValue": "1028.425"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:18.5613821",
                        "sensorValue": "1028.425"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:16.465617",
                        "sensorValue": "1028.425"
                    }
                ]
            }
        ]
    },
    {
        "id": "station_142b2fa3f4e8",
        "batteryLevel": null,
        "latitude": 51.329448,
        "longitude": 4.402464,
        "name": null,
        "description": "Grote Markt Antwerpen",
        "sensors": [
            {
                "id": 21,
                "unit": "Km/h) ",
                "type": "windspeed",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T13:33:54.3010361",
                        "sensorValue": "74.3956"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:15.4210462",
                        "sensorValue": "74.3956"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:38.4611188",
                        "sensorValue": "74.3956"
                    }
                ]
            }
        ]
    },
    {
        "id": "station_4c7525b1e63c",
        "batteryLevel": null,
        "latitude": 51.2194,
        "longitude": 4.4025,
        "name": null,
        "description": "kleine Markt Antwerpen",
        "sensors": [
            {
                "id": 15,
                "unit": "C",
                "type": "temperature",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.6890201",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.1201079",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.6456318",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.6300521",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:37.7951169",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.237858",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.1650442",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.3376089",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:17.9639188",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:15.8010299",
                        "sensorValue": "24.6"
                    }
                ]
            },
            {
                "id": 16,
                "unit": "%",
                "type": "humidity",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.907656",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.393865",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.8770293",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.8323009",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:37.979387",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.4182635",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.3831481",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.6136872",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:18.191333",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:16.0068166",
                        "sensorValue": "48.19336"
                    }
                ]
            },
            {
                "id": 17,
                "unit": "HPa",
                "type": "pressure",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.9591687",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.4508839",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.9292325",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.9072997",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:38.0293205",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.4622079",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.4300214",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.6764549",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:18.2576997",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:16.0732301",
                        "sensorValue": "988.27"
                    }
                ]
            },
            {
                "id": 18,
                "unit": "ppm",
                "type": "AQI",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3261125",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.7599821",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.427428",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.5219294",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.6349256",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.6277492",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.6755409",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7140058",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7168344",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.7389448",
                        "sensorValue": "1"
                    }
                ]
            },
            {
                "id": 19,
                "unit": "ppb",
                "type": "TVOC",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3527933",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.8093009",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.4567759",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.5606172",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.672627",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.6730973",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.7194717",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7540378",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7599367",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.7795148",
                        "sensorValue": "24"
                    }
                ]
            },
            {
                "id": 20,
                "unit": "ppm",
                "type": "eCO2",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3806762",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.8359883",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.4858164",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.6072605",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.7089022",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.7088211",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.7592261",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7938891",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7973129",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.8261688",
                        "sensorValue": "400"
                    }
                ]
            }
        ]
    },
    {
        "id": "station_d4d4da9d6754",
        "batteryLevel": null,
        "latitude": 51.1055,
        "longitude": 3.9937,
        "name": null,
        "description": "Lokeren",
        "sensors": []
    },
    {
        "id": "station_test",
        "batteryLevel": null,
        "latitude": 51.2093,
        "longitude": 3.2247,
        "name": null,
        "description": "Brugge",
        "sensors": [
            {
                "id": 22,
                "unit": "C",
                "type": "\n  \"temperature",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T14:22:45.6602261",
                        "sensorValue": " 25\n"
                    }
                ]
            }
        ]
    },
    { 
        "id": "station_4c7525b1e63c",
        "batteryLevel": null,
        "latitude": 50.928467,
        "longitude": 5.394843,
        "name": null,
        "description": "Rooistraat Diepenbeek",
        "sensors": [
            {
                "id": 15,
                "unit": "C",
                "type": "temperature",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.6890201",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.1201079",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.6456318",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.6300521",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:37.7951169",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.237858",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.1650442",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.3376089",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:17.9639188",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:15.8010299",
                        "sensorValue": "24.6"
                    }
                ]
            },
            {
                "id": 16,
                "unit": "%",
                "type": "humidity",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.907656",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.393865",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.8770293",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.8323009",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:37.979387",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.4182635",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.3831481",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.6136872",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:18.191333",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:16.0068166",
                        "sensorValue": "48.19336"
                    }
                ]
            },
            {
                "id": 17,
                "unit": "HPa",
                "type": "pressure",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.9591687",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.4508839",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.9292325",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.9072997",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:38.0293205",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.4622079",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.4300214",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.6764549",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:18.2576997",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:16.0732301",
                        "sensorValue": "988.27"
                    }
                ]
            },
            {
                "id": 18,
                "unit": "ppm",
                "type": "AQI",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3261125",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.7599821",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.427428",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.5219294",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.6349256",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.6277492",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.6755409",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7140058",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7168344",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.7389448",
                        "sensorValue": "1"
                    }
                ]
            },
            {
                "id": 19,
                "unit": "ppb",
                "type": "TVOC",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3527933",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.8093009",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.4567759",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.5606172",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.672627",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.6730973",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.7194717",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7540378",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7599367",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.7795148",
                        "sensorValue": "24"
                    }
                ]
            },
            {
                "id": 20,
                "unit": "ppm",
                "type": "eCO2",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3806762",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.8359883",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.4858164",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.6072605",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.7089022",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.7088211",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.7592261",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7938891",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7973129",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.8261688",
                        "sensorValue": "400"
                    }
                ]
            }
        ]
    },
    {
        "id": "station_4c7525b1e63c",
        "batteryLevel": null,
        "latitude": 50.870927,
        "longitude": 5.518267,
        "name": null,
        "description": "Heidestraat Bilzen",
        "sensors": [
            {
                "id": 15,
                "unit": "C",
                "type": "temperature",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.6890201",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.1201079",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.6456318",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.6300521",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:37.7951169",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.237858",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.1650442",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.3376089",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:17.9639188",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:15.8010299",
                        "sensorValue": "24.6"
                    }
                ]
            },
            {
                "id": 16,
                "unit": "%",
                "type": "humidity",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.907656",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.393865",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.8770293",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.8323009",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:37.979387",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.4182635",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.3831481",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.6136872",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:18.191333",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:16.0068166",
                        "sensorValue": "48.19336"
                    }
                ]
            },
            {
                "id": 17,
                "unit": "HPa",
                "type": "pressure",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.9591687",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.4508839",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.9292325",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.9072997",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:38.0293205",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.4622079",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.4300214",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.6764549",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:18.2576997",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:16.0732301",
                        "sensorValue": "988.27"
                    }
                ]
            },
            {
                "id": 18,
                "unit": "ppm",
                "type": "AQI",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3261125",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.7599821",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.427428",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.5219294",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.6349256",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.6277492",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.6755409",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7140058",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7168344",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.7389448",
                        "sensorValue": "1"
                    }
                ]
            },
            {
                "id": 19,
                "unit": "ppb",
                "type": "TVOC",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3527933",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.8093009",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.4567759",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.5606172",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.672627",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.6730973",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.7194717",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7540378",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7599367",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.7795148",
                        "sensorValue": "24"
                    }
                ]
            },
            {
                "id": 20,
                "unit": "ppm",
                "type": "eCO2",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3806762",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.8359883",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.4858164",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.6072605",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.7089022",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.7088211",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.7592261",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7938891",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7973129",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.8261688",
                        "sensorValue": "400"
                    }
                ]
            }
        ]
    },
    {
        "id": "station_4c7525b1e63c",
        "batteryLevel": null,
        "latitude": 50.9304,
        "longitude": 5.3372,
        "name": null,
        "description": "Molenstraat Hasselt",
        "sensors": [
            {
                "id": 15,
                "unit": "C",
                "type": "temperature",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.6890201",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.1201079",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.6456318",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.6300521",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:37.7951169",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.237858",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.1650442",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.3376089",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:17.9639188",
                        "sensorValue": "24.6"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:15.8010299",
                        "sensorValue": "24.6"
                    }
                ]
            },
            {
                "id": 16,
                "unit": "%",
                "type": "humidity",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.907656",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.393865",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.8770293",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.8323009",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:37.979387",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.4182635",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.3831481",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.6136872",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:18.191333",
                        "sensorValue": "48.19336"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:16.0068166",
                        "sensorValue": "48.19336"
                    }
                ]
            },
            {
                "id": 17,
                "unit": "HPa",
                "type": "pressure",
                "measurements": [
                    {
                        "timestamp": "2024-11-20T15:04:24.9591687",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T14:20:30.4508839",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:33:53.9292325",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:31:14.9072997",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T13:28:38.0293205",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:56:55.4622079",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:55:57.4300214",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:50:19.6764549",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:49:18.2576997",
                        "sensorValue": "988.27"
                    },
                    {
                        "timestamp": "2024-11-20T12:43:16.0732301",
                        "sensorValue": "988.27"
                    }
                ]
            },
            {
                "id": 18,
                "unit": "ppm",
                "type": "AQI",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3261125",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.7599821",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.427428",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.5219294",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.6349256",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.6277492",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.6755409",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7140058",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7168344",
                        "sensorValue": "1"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.7389448",
                        "sensorValue": "1"
                    }
                ]
            },
            {
                "id": 19,
                "unit": "ppb",
                "type": "TVOC",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3527933",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.8093009",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.4567759",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.5606172",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.672627",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.6730973",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.7194717",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7540378",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7599367",
                        "sensorValue": "24"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.7795148",
                        "sensorValue": "24"
                    }
                ]
            },
            {
                "id": 20,
                "unit": "ppm",
                "type": "eCO2",
                "measurements": [
                    {
                        "timestamp": "2024-11-12T12:46:17.3806762",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:46:15.8359883",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:49.4858164",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:41.6072605",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:33.7089022",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:25.7088211",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:17.7592261",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:09.7938891",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:44:01.7973129",
                        "sensorValue": "400"
                    },
                    {
                        "timestamp": "2024-11-12T12:43:53.8261688",
                        "sensorValue": "400"
                    }
                ]
            }
        ]
    },
    {
        "id": "station_6545965465",
        "batteryLevel": null,
        "latitude": 50.9307,
        "longitude": 5.3322,
        "name": "test_station nummer 10",
        "description": "Hasselt",
        "sensors": [
          {
            "id": 15,
            "unit": "C",
            "type": "temperature",
            "measurements": [
              {
                "timestamp": "2024-11-20T15:04:25.1921091",
                "sensorValue": "24.08"
              },
              {
                "timestamp": "2024-11-20T14:20:30.8266621",
                "sensorValue": "24.08"
              },
              {
                "timestamp": "2024-11-20T13:33:54.1310548",
                "sensorValue": "24.08"
              },
              {
                "timestamp": "2024-11-20T13:31:15.191437",
                "sensorValue": "24.08"
              },
              {
                "timestamp": "2024-11-20T13:28:38.1885534",
                "sensorValue": "24.08"
              },
              {
                "timestamp": "2024-11-20T12:56:55.6165453",
                "sensorValue": "24.08"
              },
              {
                "timestamp": "2024-11-20T12:55:57.6012887",
                "sensorValue": "24.08"
              },
              {
                "timestamp": "2024-11-20T12:50:19.8912721",
                "sensorValue": "24.08"
              },
              {
                "timestamp": "2024-11-20T12:49:18.4478214",
                "sensorValue": "24.08"
              },
              {
                "timestamp": "2024-11-20T12:43:16.3001714",
                "sensorValue": "24.08"
              }
            ]
          },
          {
            "id": 16,
            "unit": "%",
            "type": "humidity",
            "measurements": [
              {
                "timestamp": "2024-11-20T15:04:25.2452393",
                "sensorValue": "44.29395"
              },
              {
                "timestamp": "2024-11-20T14:20:30.9128166",
                "sensorValue": "44.29395"
              },
              {
                "timestamp": "2024-11-20T13:33:54.187668",
                "sensorValue": "44.29395"
              },
              {
                "timestamp": "2024-11-20T13:31:15.2822383",
                "sensorValue": "44.29395"
              },
              {
                "timestamp": "2024-11-20T13:28:38.2336692",
                "sensorValue": "44.29395"
              },
              {
                "timestamp": "2024-11-20T12:56:55.6637601",
                "sensorValue": "44.29395"
              },
              {
                "timestamp": "2024-11-20T12:55:57.6437189",
                "sensorValue": "44.29395"
              },
              {
                "timestamp": "2024-11-20T12:50:19.9368453",
                "sensorValue": "44.29395"
              },
              {
                "timestamp": "2024-11-20T12:49:18.5028826",
                "sensorValue": "44.29395"
              },
              {
                "timestamp": "2024-11-20T12:43:16.3891112",
                "sensorValue": "44.29395"
              }
            ]
          },
          {
            "id": 17,
            "unit": "HPa",
            "type": "pressure",
            "measurements": [
              {
                "timestamp": "2024-11-20T15:04:25.3169133",
                "sensorValue": "1028.425"
              },
              {
                "timestamp": "2024-11-20T14:20:30.9591489",
                "sensorValue": "1028.425"
              },
              {
                "timestamp": "2024-11-20T13:33:54.2349924",
                "sensorValue": "1028.425"
              },
              {
                "timestamp": "2024-11-20T13:31:15.3486229",
                "sensorValue": "1028.425"
              },
              {
                "timestamp": "2024-11-20T13:28:38.2873032",
                "sensorValue": "1028.425"
              },
              {
                "timestamp": "2024-11-20T12:56:55.7013706",
                "sensorValue": "1028.425"
              },
              {
                "timestamp": "2024-11-20T12:55:57.6830954",
                "sensorValue": "1028.425"
              },
              {
                "timestamp": "2024-11-20T12:50:20.0076768",
                "sensorValue": "1028.425"
              },
              {
                "timestamp": "2024-11-20T12:49:18.5613821",
                "sensorValue": "1028.425"
              },
              {
                "timestamp": "2024-11-20T12:43:16.465617",
                "sensorValue": "1028.425"
              }
            ]
          }
        ]
      },
      {
        "id": "station_uhb+365dfgvb",
        "batteryLevel": null,
        "latitude": 51.1651,
        "longitude": 4.9891,
        "name": "Weerstation_geel",
        "description": "Geel",
        "sensors": [
          {
            "id": 21,
            "unit": "Km/h) ",
            "type": "windspeed",
            "measurements": [
              {
                "timestamp": "2024-11-20T13:33:54.3010361",
                "sensorValue": "74.3956"
              },
              {
                "timestamp": "2024-11-20T13:31:15.4210462",
                "sensorValue": "74.3956"
              },
              {
                "timestamp": "2024-11-20T13:28:38.4611188",
                "sensorValue": "74.3956"
              }
            ]
          }
        ]
    },
    {
        "id": "station_996663fghfghf",
        "batteryLevel": null,
        "latitude": 50.8445,
        "longitude": 3.6072,
        "name": "weerstation_oudenaarde",
        "description": "Oudenaarde",
        "sensors": [
          {
            "id": 15,
            "unit": "C",
            "type": "temperature",
            "measurements": [
              {
                "timestamp": "2024-11-20T15:04:24.6890201",
                "sensorValue": "24.6"
              },
              {
                "timestamp": "2024-11-20T14:20:30.1201079",
                "sensorValue": "24.6"
              },
              {
                "timestamp": "2024-11-20T13:33:53.6456318",
                "sensorValue": "24.6"
              },
              {
                "timestamp": "2024-11-20T13:31:14.6300521",
                "sensorValue": "24.6"
              },
              {
                "timestamp": "2024-11-20T13:28:37.7951169",
                "sensorValue": "24.6"
              },
              {
                "timestamp": "2024-11-20T12:56:55.237858",
                "sensorValue": "24.6"
              },
              {
                "timestamp": "2024-11-20T12:55:57.1650442",
                "sensorValue": "24.6"
              },
              {
                "timestamp": "2024-11-20T12:50:19.3376089",
                "sensorValue": "24.6"
              },
              {
                "timestamp": "2024-11-20T12:49:17.9639188",
                "sensorValue": "24.6"
              },
              {
                "timestamp": "2024-11-20T12:43:15.8010299",
                "sensorValue": "24.6"
              }
            ]
          },
          {
            "id": 16,
            "unit": "%",
            "type": "humidity",
            "measurements": [
              {
                "timestamp": "2024-11-20T15:04:24.907656",
                "sensorValue": "48.19336"
              },
              {
                "timestamp": "2024-11-20T14:20:30.393865",
                "sensorValue": "48.19336"
              },
              {
                "timestamp": "2024-11-20T13:33:53.8770293",
                "sensorValue": "48.19336"
              },
              {
                "timestamp": "2024-11-20T13:31:14.8323009",
                "sensorValue": "48.19336"
              },
              {
                "timestamp": "2024-11-20T13:28:37.979387",
                "sensorValue": "48.19336"
              },
              {
                "timestamp": "2024-11-20T12:56:55.4182635",
                "sensorValue": "48.19336"
              },
              {
                "timestamp": "2024-11-20T12:55:57.3831481",
                "sensorValue": "48.19336"
              },
              {
                "timestamp": "2024-11-20T12:50:19.6136872",
                "sensorValue": "48.19336"
              },
              {
                "timestamp": "2024-11-20T12:49:18.191333",
                "sensorValue": "48.19336"
              },
              {
                "timestamp": "2024-11-20T12:43:16.0068166",
                "sensorValue": "48.19336"
              }
            ]
          },
          {
            "id": 17,
            "unit": "HPa",
            "type": "pressure",
            "measurements": [
              {
                "timestamp": "2024-11-20T15:04:24.9591687",
                "sensorValue": "988.27"
              },
              {
                "timestamp": "2024-11-20T14:20:30.4508839",
                "sensorValue": "988.27"
              },
              {
                "timestamp": "2024-11-20T13:33:53.9292325",
                "sensorValue": "988.27"
              },
              {
                "timestamp": "2024-11-20T13:31:14.9072997",
                "sensorValue": "988.27"
              },
              {
                "timestamp": "2024-11-20T13:28:38.0293205",
                "sensorValue": "988.27"
              },
              {
                "timestamp": "2024-11-20T12:56:55.4622079",
                "sensorValue": "988.27"
              },
              {
                "timestamp": "2024-11-20T12:55:57.4300214",
                "sensorValue": "988.27"
              },
              {
                "timestamp": "2024-11-20T12:50:19.6764549",
                "sensorValue": "988.27"
              },
              {
                "timestamp": "2024-11-20T12:49:18.2576997",
                "sensorValue": "988.27"
              },
              {
                "timestamp": "2024-11-20T12:43:16.0732301",
                "sensorValue": "988.27"
              }
            ]
          },
          {
            "id": 18,
            "unit": "ppm",
            "type": "AQI",
            "measurements": [
              {
                "timestamp": "2024-11-12T12:46:17.3261125",
                "sensorValue": "1"
              },
              {
                "timestamp": "2024-11-12T12:46:15.7599821",
                "sensorValue": "1"
              },
              {
                "timestamp": "2024-11-12T12:44:49.427428",
                "sensorValue": "1"
              },
              {
                "timestamp": "2024-11-12T12:44:41.5219294",
                "sensorValue": "1"
              },
              {
                "timestamp": "2024-11-12T12:44:33.6349256",
                "sensorValue": "1"
              },
              {
                "timestamp": "2024-11-12T12:44:25.6277492",
                "sensorValue": "1"
              },
              {
                "timestamp": "2024-11-12T12:44:17.6755409",
                "sensorValue": "1"
              },
              {
                "timestamp": "2024-11-12T12:44:09.7140058",
                "sensorValue": "1"
              },
              {
                "timestamp": "2024-11-12T12:44:01.7168344",
                "sensorValue": "1"
              },
              {
                "timestamp": "2024-11-12T12:43:53.7389448",
                "sensorValue": "1"
              }
            ]
          },
          {
            "id": 19,
            "unit": "ppb",
            "type": "TVOC",
            "measurements": [
              {
                "timestamp": "2024-11-12T12:46:17.3527933",
                "sensorValue": "24"
              },
              {
                "timestamp": "2024-11-12T12:46:15.8093009",
                "sensorValue": "24"
              },
              {
                "timestamp": "2024-11-12T12:44:49.4567759",
                "sensorValue": "24"
              },
              {
                "timestamp": "2024-11-12T12:44:41.5606172",
                "sensorValue": "24"
              },
              {
                "timestamp": "2024-11-12T12:44:33.672627",
                "sensorValue": "24"
              },
              {
                "timestamp": "2024-11-12T12:44:25.6730973",
                "sensorValue": "24"
              },
              {
                "timestamp": "2024-11-12T12:44:17.7194717",
                "sensorValue": "24"
              },
              {
                "timestamp": "2024-11-12T12:44:09.7540378",
                "sensorValue": "24"
              },
              {
                "timestamp": "2024-11-12T12:44:01.7599367",
                "sensorValue": "24"
              },
              {
                "timestamp": "2024-11-12T12:43:53.7795148",
                "sensorValue": "24"
              }
            ]
          },
          {
            "id": 20,
            "unit": "ppm",
            "type": "eCO2",
            "measurements": [
              {
                "timestamp": "2024-11-12T12:46:17.3806762",
                "sensorValue": "400"
              },
              {
                "timestamp": "2024-11-12T12:46:15.8359883",
                "sensorValue": "400"
              },
              {
                "timestamp": "2024-11-12T12:44:49.4858164",
                "sensorValue": "400"
              },
              {
                "timestamp": "2024-11-12T12:44:41.6072605",
                "sensorValue": "400"
              },
              {
                "timestamp": "2024-11-12T12:44:33.7089022",
                "sensorValue": "400"
              },
              {
                "timestamp": "2024-11-12T12:44:25.7088211",
                "sensorValue": "400"
              },
              {
                "timestamp": "2024-11-12T12:44:17.7592261",
                "sensorValue": "400"
              },
              {
                "timestamp": "2024-11-12T12:44:09.7938891",
                "sensorValue": "400"
              },
              {
                "timestamp": "2024-11-12T12:44:01.7973129",
                "sensorValue": "400"
              },
              {
                "timestamp": "2024-11-12T12:43:53.8261688",
                "sensorValue": "400"
              }
            ]
          }
        ]
      }    
]

const router = express.Router();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/index.html'));
});

app.get('/api/stations', (req, res) => {
    res.json(stations);
});

app.listen(port, () => {
    console.log(`Server hosting on: http://localhost:${port}`);
});

module.exports = router;