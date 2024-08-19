const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 800; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66bd6a7a70804f7af2a7864d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Beautiful scenery and peaceful surroundings.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dduto3ugx/image/upload/v1723977805/YelpCamp/nq5w6pag28uhlppcjlmt.jpg',
                  filename: 'YelpCamp/nq5w6pag28uhlppcjlmt'
                },
                {
                  url: 'https://res.cloudinary.com/dduto3ugx/image/upload/v1723977806/YelpCamp/zri2fyaccows0wcssm33.jpg',
                  filename: 'YelpCamp/zri2fyaccows0wcssm33'
                },
                {
                    url: 'https://res.cloudinary.com/dduto3ugx/image/upload/v1723976103/YelpCamp/ijkkd2j7lrjrd8z1cldl.jpg',
                    filename: 'YelpCamp/ijkkd2j7lrjrd8z1cldl'
                  },
                  {
                    url: 'https://res.cloudinary.com/dduto3ugx/image/upload/v1723976103/YelpCamp/owe9jjhc18qyv0ckdt5q.jpg',
                    filename: 'YelpCamp/owe9jjhc18qyv0ckdt5q'
                  }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})