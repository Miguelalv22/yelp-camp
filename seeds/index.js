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
            author: '6802e91c228efd9f30d07775',
            location: `${cities[randomNumber].city}, ${cities[randomNumber].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut eaque hic cumque quidem atque, adipisci, reiciendis facere quas labore nulla neque vel corporis deserunt nihil nam voluptas quis facilis. Vero.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/daxdf7hr0/image/upload/v1745864295/YelpCamp/tlsnsx99ydphszwq6bmn.jpg',
                    filename: 'YelpCamp/tlsnsx99ydphszwq6bmn',

                },
                {
                    url: 'https://res.cloudinary.com/daxdf7hr0/image/upload/v1745864295/YelpCamp/kw1mck6epqmrfefky55l.jpg',
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