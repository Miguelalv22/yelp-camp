const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomNumber = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '680fde37cc0b9831cb778029',
            location: `${cities[randomNumber].city}, ${cities[randomNumber].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomNumber].longitude,
                    cities[randomNumber].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/daxdf7hr0/image/upload/v1745864013/YelpCamp/yyf8qmhe5zyswv6pszli.jpg',
                    filename: 'YelpCamp/tlsnsx99ydphszwq6bmn',

                },
                {
                    url: 'https://res.cloudinary.com/daxdf7hr0/image/upload/v1745864157/YelpCamp/nioihpxawbbm5nzocev8.jpg',
                    filename: 'YelpCamp/kw1mck6epqmrfefky55l',

                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})