const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: 'SUPERSECRETPASSWORDFORJWT',
        DATABASE: 'mongodb://localhost:27017/bookShelf'
    }
}

exports.get = function get(env){
    // console.log(config);
    return  config[env] || config.default
}