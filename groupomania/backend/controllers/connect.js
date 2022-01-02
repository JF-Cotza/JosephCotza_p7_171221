const userDb = 'GroupoAdmin';
const pswordDb = '4dm1nP4ssw0rdF0rGr0up0D8';
const linkDb = 'cluster0.yj7ue.mongodb.net';
const nameDb = 'groupo_db';
const writting = '&w=majority';  
//

exports.URI = 'mongodb+srv://' + userDb + ':' + pswordDb + '@' + linkDb + '/' + nameDb + '?retryWrites=true'+writting; 

exports.token = { value: 'RANDOM_TOKEN_SECRET_FOR_DEVELOPPEMENT', end: '24h' }
