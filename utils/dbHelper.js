const mongoose = require('mongoose');

function mongoConnection() {
    mongoose.connect('mongodb+srv://nirupa:sinha@cluster0.fgk4y.mongodb.net/authDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err, data) => {
        console.log(`mongo error, ${err}`)
        console.log(`mongo data, ${data}`)
    });
}

mongoConnection()

module.exports = {
    checkEmail: (Model, userObject) => {
        return new Promise(function(resolve, reject) {
            Model.findOne({ email: userObject.email }, function(err, dbData) {
                if (!err) {
                    resolve(dbData)
                    console.log("check mail", dbData);
                } else {
                    reject(err)
                }
            })
        })

    },
    insertDocument: (Model, userObject) => {
        const dataModel = new Model(userObject)
        return new Promise(function(resolve, reject) {
            dataModel.save((err, dbData) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(dbData)
                    console.log("insert data", dbData);
                }
            })
        })
    },
    getUserLoginDetails: (Model, userObject) => {
        return new Promise(function(resolve, reject) {
            Model.findOne({ email: userObject.email },
                (err, dbData) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(dbData)
                    }
                })
        })
    },
    getUserDetails: (Model, userObject) => {
        return new Promise(function(resolve, reject) {
            Model.find({ email: userObject.email }, (err, dbData) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(dbData)
                }
            }).populate('animals')
        })
    },
    updateProfile: (Model, filter, update) => {
        try {
            return new Promise(function(resolve, reject) {
                Model.findOneAndUpdate(filter, update, { new: true }, (err, dbData) => {
                    if (!err) {
                        resolve(dbData)
                    } else {
                        reject(err)
                    }
                })
            })
        } catch (err) {
            console.log(err, "error in findOneAndUpdate method")
        }
    },

    highestPrice: (Model) => {
        try {
            return new Promise(function(resolve, reject) {
                Model.find({}).sort({ price: -1 }).limit(1).exec(function(err, dbData) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(dbData)
                    }
                })
            })
        } catch (err) {
            console.log(err, "error in find method")
        }

    }
}