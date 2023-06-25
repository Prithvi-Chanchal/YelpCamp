const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelper');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log("Error connecting!!!!!\n", err));

const randomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const newCG = new Campground({
            author: '648c8e7fcd7f7806180ac7e8',
            title: `${randomArrayValue(descriptors)} ${randomArrayValue(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            price: Math.floor(Math.random() * 20) + 10,
            geometry: { type: 'Point', coordinates: [ cities[random1000].longitude, cities[random1000].latitude ] },
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium tempora aspernatur magnam ut velit voluptates est nihil quidem! Fugit reprehenderit fuga cum reiciendis ipsa voluptates dignissimos deserunt dolor at ut.',
            images: [
                {
                  url: 'https://res.cloudinary.com/dxuniwzv9/image/upload/v1687000164/mlucg77w4pz1jvhr6alm.jpg',
                  filename: 'mlucg77w4pz1jvhr6alm',
                },
                {
                  url: 'https://res.cloudinary.com/dxuniwzv9/image/upload/v1687000164/d6r0h9sigcwea85qakvs.jpg',
                  filename: 'd6r0h9sigcwea85qakvs',
                }
              ]
        })
        await newCG.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})