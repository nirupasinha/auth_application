const axios = require('axios');

// Make a request for a user with a given ID
axios.get('http://localhost:7777/api/user/me', {
        data: {
            email: "sarvottamptl@gmail.com"
        }



    })
    .then(function(response) {
        // handle success
        console.log("response", JSON.stringify(response.data));
    })
    .catch(function(error) {
        // handle error
        console.log("error...", error);
    })