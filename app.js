const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const stations = [
    {
        id: 1,
        location: "Rooistraat Diepenbeek",
        latitude: "50.928467",
        longitude: "5.394843",
        temperature: [
            { x: "0:00",  y: 16.5 },
            { x: "1:00",  y: 16.1 },
            { x: "2:00",  y: 15.8 },
            { x: "3:00",  y: 15.5 },
            { x: "4:00",  y: 15.3 },
            { x: "5:00",  y: 15.0 },
            { x: "6:00",  y: 15.2 },
            { x: "7:00",  y: 16.0 },
            { x: "8:00",  y: 17.2 },
            { x: "9:00",  y: 18.4 },
            { x: "10:00", y: 19.5 },
            { x: "11:00", y: 20.3 },
            { x: "12:00", y: 21.0 },
            { x: "13:00", y: 22.1 },
            { x: "14:00", y: 23.2 },
            { x: "15:00", y: 23.8 },
            { x: "16:00", y: 24.0 },
            { x: "17:00", y: 23.5 },
            { x: "18:00", y: 22.3 },
            { x: "19:00", y: 21.0 },
            { x: "20:00", y: 19.8 },
            { x: "21:00", y: 18.5 },
            { x: "22:00", y: 17.3 },
            { x: "23:00", y: 16.8 }
        ],
        windspeed: [
            { x: "0:00",  y: 40.0 },
            { x: "1:00",  y: 38.0 },
            { x: "2:00",  y: 37.0 },
            { x: "3:00",  y: 40.0 },
            { x: "4:00",  y: 34.0 },
            { x: "5:00",  y: 30.0 },
            { x: "6:00",  y: 28.0 },
            { x: "7:00",  y: 28.0 },
            { x: "8:00",  y: 28.0 },
            { x: "9:00",  y: 28.0 },
            { x: "10:00", y: 28.0 },
            { x: "11:00", y: 25.0 },
            { x: "12:00", y: 21.0 },
            { x: "13:00", y: 22.1 },
            { x: "14:00", y: 23.2 },
            { x: "15:00", y: 23.8 },
            { x: "16:00", y: 24.0 },
            { x: "17:00", y: 23.5 },
            { x: "18:00", y: 22.3 },
            { x: "19:00", y: 25.0 },
            { x: "20:00", y: 25.0 },
            { x: "21:00", y: 25.0 },
            { x: "22:00", y: 25.0 },
            { x: "23:00", y: 28.0 }
        ],
    },
    {
        id: 2,
        location: "Heidestraat Bilzen",
        latitude: "50.870927",
        longitude: "5.518267",
        temperature: [
            { x: "0:00",  y: 15.8 },
            { x: "1:00",  y: 15.5 },
            { x: "2:00",  y: 15.2 },
            { x: "3:00",  y: 14.9 },
            { x: "4:00",  y: 14.7 },
            { x: "5:00",  y: 14.5 },
            { x: "6:00",  y: 14.8 },
            { x: "7:00",  y: 15.6 },
            { x: "8:00",  y: 16.8 },
            { x: "9:00",  y: 17.9 },
            { x: "10:00", y: 18.7 },
            { x: "11:00", y: 19.4 },
            { x: "12:00", y: 20.1 },
            { x: "13:00", y: 21.0 },
            { x: "14:00", y: 22.3 },
            { x: "15:00", y: 23.0 },
            { x: "16:00", y: 23.5 },
            { x: "17:00", y: 23.2 },
            { x: "18:00", y: 21.9 },
            { x: "19:00", y: 20.6 },
            { x: "20:00", y: 19.5 },
            { x: "21:00", y: 18.0 },
            { x: "22:00", y: 16.9 },
            { x: "23:00", y: 16.3 }
        ],
        windspeed: [
            { x: "0:00",  y: 42.0 },
            { x: "1:00",  y: 40.0 },
            { x: "2:00",  y: 39.0 },
            { x: "3:00",  y: 38.0 },
            { x: "4:00",  y: 35.0 },
            { x: "5:00",  y: 32.0 },
            { x: "6:00",  y: 30.0 },
            { x: "7:00",  y: 29.0 },
            { x: "8:00",  y: 28.0 },
            { x: "9:00",  y: 28.0 },
            { x: "10:00", y: 29.0 },
            { x: "11:00", y: 27.0 },
            { x: "12:00", y: 23.0 },
            { x: "13:00", y: 24.0 },
            { x: "14:00", y: 25.0 },
            { x: "15:00", y: 26.0 },
            { x: "16:00", y: 26.5 },
            { x: "17:00", y: 26.0 },
            { x: "18:00", y: 24.5 },
            { x: "19:00", y: 26.0 },
            { x: "20:00", y: 27.0 },
            { x: "21:00", y: 27.5 },
            { x: "22:00", y: 28.0 },
            { x: "23:00", y: 30.0 }
        ],
    },{
        id: 3,
        location: "Molenstraat Hasselt",
        latitude: "51.2194",
        longitude: "4.4025",
        temperature: [
            { x: "0:00", y: 16.0 },
            { x: "1:00", y: 15.7 },
            { x: "2:00", y: 15.5 },
            { x: "3:00", y: 15.2 },
            { x: "4:00", y: 15.0 },
            { x: "5:00", y: 14.8 },
            { x: "6:00", y: 15.0 },
            { x: "7:00", y: 16.0 },
            { x: "8:00", y: 17.0 },
            { x: "9:00", y: 18.2 },
            { x: "10:00", y: 19.0 },
            { x: "11:00", y: 20.0 },
            { x: "12:00", y: 21.0 },
            { x: "13:00", y: 22.0 },
            { x: "14:00", y: 23.0 },
            { x: "15:00", y: 23.5 },
            { x: "16:00", y: 24.0 },
            { x: "17:00", y: 23.5 },
            { x: "18:00", y: 22.0 },
            { x: "19:00", y: 20.5 },
            { x: "20:00", y: 19.2 },
            { x: "21:00", y: 18.0 },
            { x: "22:00", y: 17.0 },
            { x: "23:00", y: 16.5 }
        ],
        windspeed: [
            { x: "0:00", y: 38.0 },
            { x: "1:00", y: 36.0 },
            { x: "2:00", y: 34.0 },
            { x: "3:00", y: 32.0 },
            { x: "4:00", y: 30.0 },
            { x: "5:00", y: 28.0 },
            { x: "6:00", y: 27.0 },
            { x: "7:00", y: 28.0 },
            { x: "8:00", y: 29.0 },
            { x: "9:00", y: 29.5 },
            { x: "10:00", y: 30.0 },
            { x: "11:00", y: 29.0 },
            { x: "12:00", y: 26.0 },
            { x: "13:00", y: 25.0 },
            { x: "14:00", y: 24.0 },
            { x: "15:00", y: 23.0 },
            { x: "16:00", y: 22.5 },
            { x: "17:00", y: 22.0 },
            { x: "18:00", y: 21.5 },
            { x: "19:00", y: 22.0 },
            { x: "20:00", y: 23.0 },
            { x: "21:00", y: 24.0 },
            { x: "22:00", y: 26.0 },
            { x: "23:00", y: 27.0 }
        ]
    },
    {
        id: 4,
        location: "Koningin Astridlaan Gent",
        latitude: "51.054342",
        longitude: "3.717424",
        temperature: [
            { x: "0:00", y: 14.5 },
            { x: "1:00", y: 14.3 },
            { x: "2:00", y: 14.0 },
            { x: "3:00", y: 13.8 },
            { x: "4:00", y: 13.5 },
            { x: "5:00", y: 13.3 },
            { x: "6:00", y: 13.5 },
            { x: "7:00", y: 14.0 },
            { x: "8:00", y: 15.0 },
            { x: "9:00", y: 16.2 },
            { x: "10:00", y: 17.5 },
            { x: "11:00", y: 18.0 },
            { x: "12:00", y: 19.0 },
            { x: "13:00", y: 20.0 },
            { x: "14:00", y: 21.2 },
            { x: "15:00", y: 22.0 },
            { x: "16:00", y: 22.5 },
            { x: "17:00", y: 22.0 },
            { x: "18:00", y: 21.5 },
            { x: "19:00", y: 20.0 },
            { x: "20:00", y: 19.0 },
            { x: "21:00", y: 18.0 },
            { x: "22:00", y: 17.5 },
            { x: "23:00", y: 17.0 }
        ],
        windspeed: [
            { x: "0:00", y: 44.0 },
            { x: "1:00", y: 42.0 },
            { x: "2:00", y: 40.0 },
            { x: "3:00", y: 38.0 },
            { x: "4:00", y: 36.0 },
            { x: "5:00", y: 34.0 },
            { x: "6:00", y: 32.0 },
            { x: "7:00", y: 30.0 },
            { x: "8:00", y: 29.0 },
            { x: "9:00", y: 28.0 },
            { x: "10:00", y: 28.5 },
            { x: "11:00", y: 29.0 },
            { x: "12:00", y: 30.0 },
            { x: "13:00", y: 31.0 },
            { x: "14:00", y: 32.0 },
            { x: "15:00", y: 33.0 },
            { x: "16:00", y: 34.0 },
            { x: "17:00", y: 34.5 },
            { x: "18:00", y: 35.0 },
            { x: "19:00", y: 36.0 },
            { x: "20:00", y: 37.0 },
            { x: "21:00", y: 38.0 },
            { x: "22:00", y: 39.0 },
            { x: "23:00", y: 40.0 }
        ]
    },
    {
        id: 5,
        location: "Grote Markt Antwerpen",
        latitude: "51.329448",
        longitude: "4.402464",
        temperature: [
            { x: "0:00", y: 17.0 },
            { x: "1:00", y: 16.5 },
            { x: "2:00", y: 16.0 },
            { x: "3:00", y: 15.5 },
            { x: "4:00", y: 15.0 },
            { x: "5:00", y: 14.7 },
            { x: "6:00", y: 14.8 },
            { x: "7:00", y: 15.5 },
            { x: "8:00", y: 16.7 },
            { x: "9:00", y: 18.0 },
            { x: "10:00", y: 19.5 },
            { x: "11:00", y: 20.5 },
            { x: "12:00", y: 21.0 },
            { x: "13:00", y: 22.0 },
            { x: "14:00", y: 23.0 },
            { x: "15:00", y: 24.0 },
            { x: "16:00", y: 24.5 },
            { x: "17:00", y: 24.0 },
            { x: "18:00", y: 22.8 },
            { x: "19:00", y: 21.5 },
            { x: "20:00", y: 20.0 },
            { x: "21:00", y: 19.0 },
            { x: "22:00", y: 18.0 },
            { x: "23:00", y: 17.5 }
        ],
        windspeed: [
            { x: "0:00", y: 43.0 },
            { x: "1:00", y: 41.0 },
            { x: "2:00", y: 39.0 },
            { x: "3:00", y: 37.0 },
            { x: "4:00", y: 35.0 },
            { x: "5:00", y: 34.0 },
            { x: "6:00", y: 33.0 },
            { x: "7:00", y: 32.0 },
            { x: "8:00", y: 31.0 },
            { x: "9:00", y: 30.0 },
            { x: "10:00", y: 31.0 },
            { x: "11:00", y: 32.0 },
            { x: "12:00", y: 33.0 },
            { x: "13:00", y: 34.0 },
            { x: "14:00", y: 35.0 },
            { x: "15:00", y: 36.0 },
            { x: "16:00", y: 37.0 },
            { x: "17:00", y: 38.0 },
            { x: "18:00", y: 39.0 },
            { x: "19:00", y: 40.0 },
            { x: "20:00", y: 41.0 },
            { x: "21:00", y: 42.0 },
            { x: "22:00", y: 43.0 },
            { x: "23:00", y: 44.0 }
        ]
    },
    {
        id: 6,
        location: "kleine Markt Antwerpen",
        latitude: "50.9304",
        longitude: "5.3372",
        temperature: [
            { x: "0:00", y: 17.0 },
            { x: "1:00", y: 16.5 },
            { x: "2:00", y: 16.0 },
            { x: "3:00", y: 15.5 },
            { x: "4:00", y: 15.0 },
            { x: "5:00", y: 14.7 },
            { x: "6:00", y: 14.8 },
            { x: "7:00", y: 15.5 },
            { x: "8:00", y: 16.7 },
            { x: "9:00", y: 18.0 },
            { x: "10:00", y: 19.5 },
            { x: "11:00", y: 20.5 },
            { x: "12:00", y: 21.0 },
            { x: "13:00", y: 22.0 },
            { x: "14:00", y: 23.0 },
            { x: "15:00", y: 24.0 },
            { x: "16:00", y: 24.5 },
            { x: "17:00", y: 24.0 },
            { x: "18:00", y: 22.8 },
            { x: "19:00", y: 21.5 },
            { x: "20:00", y: 20.0 },
            { x: "21:00", y: 19.0 },
            { x: "22:00", y: 18.0 },
            { x: "23:00", y: 17.5 }
        ],
        windspeed: [
            { x: "0:00", y: 43.0 },
            { x: "1:00", y: 41.0 },
            { x: "2:00", y: 39.0 },
            { x: "3:00", y: 37.0 },
            { x: "4:00", y: 35.0 },
            { x: "5:00", y: 34.0 },
            { x: "6:00", y: 33.0 },
            { x: "7:00", y: 32.0 },
            { x: "8:00", y: 31.0 },
            { x: "9:00", y: 30.0 },
            { x: "10:00", y: 31.0 },
            { x: "11:00", y: 32.0 },
            { x: "12:00", y: 33.0 },
            { x: "13:00", y: 34.0 },
            { x: "14:00", y: 35.0 },
            { x: "15:00", y: 36.0 },
            { x: "16:00", y: 37.0 },
            { x: "17:00", y: 38.0 },
            { x: "18:00", y: 39.0 },
            { x: "19:00", y: 40.0 },
            { x: "20:00", y: 41.0 },
            { x: "21:00", y: 42.0 },
            { x: "22:00", y: 43.0 },
            { x: "23:00", y: 44.0 }
        ]
    },
    {
        id: 7,
        location: "Gemiddelde Markt Antwerpen",
        latitude: "50.8798",
        longitude: "4.7005",
        temperature: [
            { x: "0:00", y: 17.0 },
            { x: "1:00", y: 16.5 },
            { x: "2:00", y: 16.0 },
            { x: "3:00", y: 15.5 },
            { x: "4:00", y: 15.0 },
            { x: "5:00", y: 14.7 },
            { x: "6:00", y: 14.8 },
            { x: "7:00", y: 15.5 },
            { x: "8:00", y: 16.7 },
            { x: "9:00", y: 18.0 },
            { x: "10:00", y: 19.5 },
            { x: "11:00", y: 20.5 },
            { x: "12:00", y: 21.0 },
            { x: "13:00", y: 22.0 },
            { x: "14:00", y: 23.0 },
            { x: "15:00", y: 24.0 },
            { x: "16:00", y: 24.5 },
            { x: "17:00", y: 24.0 },
            { x: "18:00", y: 22.8 },
            { x: "19:00", y: 21.5 },
            { x: "20:00", y: 20.0 },
            { x: "21:00", y: 19.0 },
            { x: "22:00", y: 18.0 },
            { x: "23:00", y: 17.5 }
        ],
        windspeed: [
            { x: "0:00", y: 43.0 },
            { x: "1:00", y: 41.0 },
            { x: "2:00", y: 39.0 },
            { x: "3:00", y: 37.0 },
            { x: "4:00", y: 35.0 },
            { x: "5:00", y: 34.0 },
            { x: "6:00", y: 33.0 },
            { x: "7:00", y: 32.0 },
            { x: "8:00", y: 31.0 },
            { x: "9:00", y: 30.0 },
            { x: "10:00", y: 31.0 },
            { x: "11:00", y: 32.0 },
            { x: "12:00", y: 33.0 },
            { x: "13:00", y: 34.0 },
            { x: "14:00", y: 35.0 },
            { x: "15:00", y: 36.0 },
            { x: "16:00", y: 37.0 },
            { x: "17:00", y: 38.0 },
            { x: "18:00", y: 39.0 },
            { x: "19:00", y: 40.0 },
            { x: "20:00", y: 41.0 },
            { x: "21:00", y: 42.0 },
            { x: "22:00", y: 43.0 },
            { x: "23:00", y: 44.0 }
        ]
    }
];

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