/*==============mongoose=============== */
//Relation:1.one to one, 2.one to few, 2.one to many, 3. one to squillions, 4.many to many
//hybrid approach:-outlier pattern
//data for animal model
//promise
const checkPromise = new Promise(function(resolve, reject) {
    const x = 10;
    let y = 10

    setTimeout(() => {
        if (x === y) {
            resolve();
        } else {
            reject();
        }
    }, 5000);
    setTimeout(() => {
        if (x !== y) {
            resolve();
        } else {
            reject();
        }
    }, 1000);
});
checkPromise.then(function() {
    console.log('Success');
}).catch(function() {
    console.log(' error occurred');
});