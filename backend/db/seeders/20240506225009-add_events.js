'use strict';
const { Event } = require('../models')
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const concertEvents = [
  {
    name: "Madeleine Peyroux",
    userId: 1,
    artist: "Foo Fighters",
    description: "Madeleine Peyroux formed in The Bronx in the mid '90s and are largely responsible for bringing bachata—traditional music from the Dominican Republic—to a wider audience with their unique fusion of New York-style bachata, hip hop, and merengue. The result, a multi-cultural musical hybrid, not only caught fire in the States and in Central and South America, but also gained favor among international audiences with hits like Los Infieles, Por Un Segundo, and Dile al Amor. Known as the Kings of Bachata, Aventura are engaging performers and a favorite among ticket buyers for their intimate live concerts. Their 2009 album The Last topped both the Latin and Tropical Albums charts and landed a whopping nine tracks on the singles charts. Whether they are playing a small venue or headlining Madison Square Garden, audiences can count on Aventura to deliver an emotional and hit-filled performance.",
    type: "Rock",
    address: "123 Main Street",
    city: "New York",
    time: "7:00 PM",
    date: new Date('2024-05-15'),
    price: 50.00,
    country: "USA",
    img_url: "https://plus.unsplash.com/premium_photo-1681503974123-6cada12d0414?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ticketavailability: true
  },
  {
    name: "Damn Right Farewell",
    userId: 2,
    artist: "Taylor Swift",
    description: "Taylor Swift is an alternative Pop singer from Los Angeles, California. After getting her start as a backing vocalist for boy band B2K, Aiko breakthrough came with her 2011 mixtape Sailing Soul(s). Her debut EP, Sail Out, followed in 2013 and contained the singles “3:16AM,” “Bed Peace” featuring Childish Gambino and “The Worst.” Further albums in Aiko’s discography include her 2014 debut full-length Souled Out, her 2017 sophomore effort Trip and 2020s Chilombo which earned the artist three Grammy nominations, including Album of the Year. In 2023, Aiko released her single “Calm & Patient,” which likely serves as a precursor to her upcoming and as-yet-untitled fourth album.",
    type: "Pop",
    address: "456 Broadway",
    city: "Los Angeles",
    time: "8:00 PM",
    date: new Date('2024-06-20'),
    price: 60.00,
    country: "USA",
    img_url: "https://images.unsplash.com/photo-1692796226663-dd49d738f43c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMGNvbmNlcnQlMjB0YXlsb3J8ZW58MHx8MHx8fDA%3D",
    ticketavailability: true
  },
  {name: "The Winding Way Tour",
  userId: 2,
  artist: "CLAY",
  description: "CLAY is an artist with that crisp kind of soul voice you only really want to hear over electric guitar. A perfect blend of R&B and pop, CLAY attention to catchy melodies matched with her seductively smoky vocal tone make her a must listen. Keen to make music that moves people and makes waves, CLAY work is vividly relevant and also overwhelmingly personal. Born and raised in the flower-child city of San Francisco, as well as a proud member of the LGBTQIA+ community, her diverse and politically potent upbringing has guided her work as a multidisciplinary artist into new powerful realms. For some artists, the challenge of building yourself from the ground up whilst maintaining your authenticity and independence can be near impossible. CLAY is proving that she got what it takes to leave her mark on this sometimes-ugly world. Adamant to retain her sense of self and ability to appeal to the masses through her heartfelt lyrics and experimental style, there no doubt that more treats are in store for listeners, both new and old. CLAY is coming off of the first installment of a 3-part EP series called Breathing Into Bloom, which featured collaborations with the likes of Alessia Cara, Stint, mayé, Dkwrth and more and amassed over 20m+ streams across platforms. Her secondary EP in the series, Holy Silence 'Fore the Spring, was released in Spring of 2023, and she's preparing to release her final EP, Waiting for God in the Garden, before the release of her debut album.",
  type: "R&B",
  address: "Brooklyn",
  city: "New York",
  time: "8:00 PM",
  date: new Date('2024-06-21'),
  price: 50.00,
  country: "USA",
  img_url: "https://i.ticketweb.com/i/00/12/28/10/23_Original.jpg?v=6",
  ticketavailability: true
  },
  {
    name: "Prof, Futuristic",
    userId: 1,
    description: "Born into a musical household in Teaneck, NJ, Caelan Cardello practically had music infused in his DNA from the start. He started playing piano at the age of 5 and within two years had begun parallel arcs of formal training in both classical and jazz piano, starting with jazz pianist/arranger Allen Farnham and Juilliard classical alum Steve Masi. Caelans consistent musical growth enabled him to secure mentorships with some of the most sought after luminaries in the jazz piano pantheon, most notably Fred Hersch, Frank Kimbrough and Dave Kikoski Caelan Cardello is a naturala great talent with an innate ability to communicate with other musicians and with the audience, his playing is uplifting and effervescent.",
    artist: "Caelan Cardello",
    type: "Jazz",
    address: "101 Jazz Avenue",
    city: "New Orleans",
    time: "9:00 PM",
    date: new Date('2024-08-25'),
    price: 70.00,
    country: "USA",
    img_url: "https://i.ticketweb.com//i/00/12/27/82/64_Edp.jpg?v=1",
    ticketavailability: true
  },
  {
    name: "Red Hot Chili Peppers",
    userId: 1,
    artist: "Red Hot Chili Peppers",
    description: "Red Hot Chili Peppers are an American rock band formed in Los Angeles in 1983. The group's musical style primarily consists of alternative rock with an emphasis on funk, as well as elements from other genres such as punk rock and psychedelic rock. When played live, their music incorporates elements of jam band due to the improvised nature of many of their performances. Currently, the band consists of founding members vocalist Anthony Kiedis and bassist Flea (Michael Peter Balzary), longtime drummer Chad Smith, and guitarist John Frusciante. Red Hot Chili Peppers are one of the best-selling bands of all time with over 80 million records sold worldwide, they have been nominated for sixteen Grammy Awards, of which they have won six, and are the most successful band in alternative rock radio history, currently holding the records for most number-one singles (13), most cumulative weeks at number one (85) and most top-ten songs (25) on the Billboard Alternative Songs chart. In 2012, they were inducted into the Rock and Roll Hall of Fame.",
    type: "Rock",
    address: "123 Main Street",
    city: "New York",
    time: "7:00 PM",
    date: new Date('2024-05-15'),
    price: 75.00,
    country: "USA",
    img_url: "https://upload.wikimedia.org/wikipedia/en/5/5f/The_Red_Hot_Chili_Peppers_%28album_cover%29.jpg",
    ticketavailability: true
  },
  {
    name: "Billie Eilish - Happier Than Ever Tour",
    userId: 2,
    artist: "Billie Eilish",
    description: "Billie Eilish Pirate Baird O'Connell is an American musician, singer and actress from Los Angeles. She performed hit songs such as Bad Guy and No Time to Die, which was used in the James Bond film of the same name. She provided ADR for Ramona and Beezus, Diary of a Wimpy Kid: Rodrick Rules and X-Men: Apocalypse.",
    type: "Pop",
    address: "456 Broadway",
    city: "Los Angeles",
    time: "8:00 PM",
    date: new Date('2024-06-20'),
    price: 90.00,
    country: "USA",
    img_url: "https://www.livenationentertainment.com/wp-content/uploads/2021/05/BILLIEEILISH_FB-NEWSFEED_1200x628.jpg",
    ticketavailability: true
  },
  {
    name: "John Legend - Bigger Love Tour",
    userId: 3,
    artist: "John Legend",
    description: "John Stephens (born December 28, 1978 in Springfield, Ohio), better known as John Legend, is a Grammy award winning R&B singer-songwriter, multi-instrumentalist, poet and actor signed to Kanye Wests G.O.O.D. Music label. Prior to the release of his debut album Get Lifted in 2004, Legends career gained momentum through a series of successful collaborations with multiple established artists such as Jay-Z, Alicia Keys and Lauryn Hill. He released his second album, Once Again in 2006, and his latest release, 2008s Evolver showcased a more experimental and upbeat side of Legend. He is the recipient of six Grammy Awards, and in 2007 he received the special Starlight award from the Songwriters Hall of Fame. You can get Cheap John Legend Tickets for his next performances.",
    type: "R&B",
    address: "789 Main Street",
    city: "Chicago",
    time: "7:30 PM",
    date: new Date('2024-07-25'),
    price: 85.00,
    country: "USA",
    img_url: "https://www.casinodelsol.com/sites/default/files/styles/default_lg/public/2021-06/johnlegend_2021_lovetour.jpg?itok=rx8LehTg",
    ticketavailability: true
  },
  {
    name: "Ella Fitzgerald Tribute Concert",
    userId: 3,
    artist: "Tryst",
    description: "Tryst (@tryst_official) brings blood, and lipstick wrapped up in her dark and gritty noir world. She takes inspiration from classic artists and macabre undertones to bring a show filled with darkness and desire. Her album Vulgar Virtue made its debut in 2020 and her latest album Indigo Sky has been met with amazing reviews! Tryst is currently in the studio working on her 3rd album. Due out in 2024! She will be bringing along her 6 piece band and debuting her brand new single at Mercury Lounge May 16!",
    type: "Jazz",
    address: "101 Jazz Avenue",
    city: "New Orleans",
    time: "9:00 PM",
    date: new Date('2024-08-10'),
    price: 60.00,
    country: "USA",
    img_url: "https://m.media-amazon.com/images/I/51l4ldEQSaL._UF1000,1000_QL80_.jpg",
    ticketavailability: true
  },
];

module.exports = {
    async up (queryInterface, Sequelize) {
      await Event.bulkCreate(concertEvents, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    // Remove all concert events from the Events table
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      artist: { [Op.in]: ['Foo Fighters', 'Taylor Swift', 'CLAY', 'Caelan Cardello', 'Red Hot Chili Peppers', 'Billie Eilish', 'John Legend', 'Tryst'] }
    }, {});
  }
};
