/*
Following code was written by following along with: https://www.youtube.com/watch?v=NOzi4wBHn0o 
*/

document.getElementById(`btn-1`).addEventListener(`click`, () => {
    console.log(`-----------------------btn-1----------------------`);
    let dogWalk = true;
    let kitchenCleaned = true;
    let trashOut = true;

    function walkDog (dogWalk) {
        function dogStatus() {
            if(dogWalk) {console.log(`You walked the dog.`);}
            else {console.log(`You should've walked the dog.`);}
        }
        setTimeout(dogStatus, 3000);
    }

    function cleanKitchen (kitchenCleaned) {
        function kitchenStatus(){
            if(kitchenCleaned) {console.log(`You cleaned the kitchen.`);}
            else {console.log(`You should've cleaned the kitchen.`);}
        }
        setTimeout(kitchenStatus, 2500);
    }

    function takeOutTrash (trashOut) {
        function trashStatus() {
            if(trashOut) {console.log(`You took out the trash.`);}
            else {console.log(`You should've taken the trash out.`);}
        }
        setTimeout(trashStatus, 1500);
    }
    walkDog(dogWalk);
    cleanKitchen(kitchenCleaned);
    takeOutTrash(trashOut);
})

document.getElementById(`btn-2`).addEventListener(`click`, () => {
    console.log(`-----------------------btn-2----------------------`);

    function walkDog (callback) {
        setTimeout(() => {
            console.log(`You walked the dog.`);
            callback();
        }, 1500);
    }

    function cleanKitchen (callback) {
        setTimeout(() => {
            console.log(`You cleaned the kitchen.`);
            callback();
        }, 2500);
    }

    function takeOutTrash (callback) {
        setTimeout(() => {
            console.log(`You took out the trash.`);
            callback();
        }, 500);
    }

    walkDog(() => {
        cleanKitchen(() => {
            takeOutTrash(() => {
                console.log(`You finished all of the chores.`);
            })
        })
    });
});

document.getElementById(`btn-3`).addEventListener(`click`, () => {
    console.log(`-----------------------btn-3----------------------`);

    function walkDog () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const dogWalked = true;
                if (dogWalked) {
                    resolve(`You walked the dog.`);
                } else {
                    reject(`You should've walked the dog.`);
                }
            }, 1500);
        })
    }

    function cleanKitchen () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const kitchenCleaned = true;
                if (kitchenCleaned) {
                    resolve(`You cleaned the kitchen.`);
                } else {
                    reject(`You should've cleaned the kitchen.`);
                }
            }, 2500);
        })
    }

    function takeOutTrash () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const trashOut = false;
                if (trashOut) {
                    resolve(`You took out the trash.`);
                } else {
                    reject(`You should've taken the trash out.`);
                }
            }, 500);
        })
    }

    walkDog().then(value => {console.log(value); return cleanKitchen()})
             .then(value => {console.log(value); return takeOutTrash()})
             .then(value => {console.log(value); console.log(`You finished all of the chores.`)})
             .catch(error => console.error(error));
});

document.getElementById(`btn-4`).addEventListener(`click`, () => {
    /*
    Following code was written by following along with: https://www.youtube.com/watch?v=9j1dZwFEJ-c
    */
    console.log(`-----------------------btn-4----------------------`);

    function walkDog () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const dogWalked = true;
                if (dogWalked) {
                    resolve(`You walked the dog.`);
                } else {
                    reject(`You should've walked the dog.`);
                }
            }, 1500);
        })
    }

    function cleanKitchen () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const kitchenCleaned = true;
                if (kitchenCleaned) {
                    resolve(`You cleaned the kitchen.`);
                } else {
                    reject(`You should've cleaned the kitchen.`);
                }
            }, 2500);
        })
    }

    function takeOutTrash () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const trashOut = true;
                if (trashOut) {
                    resolve(`You took out the trash.`);
                } else {
                    reject(`You should've taken the trash out.`);
                }
            }, 500);
        })
    }

    async function doChores () {
        try {
            const walkDogResult = await walkDog();
            console.log(walkDogResult);
            const cleanKitchenResult = await cleanKitchen();
            console.log(cleanKitchenResult);
            const takeOutTrashResult = await takeOutTrash();
            console.log(takeOutTrashResult);
            
            console.log(`You finished all of the chores.`);
        } catch(error) {
            console.error(error);
        }
    } 
    doChores();

});

document.getElementById(`btn-5`).addEventListener(`click`, () => {
    /*
    Following code was written by following along with: https://www.youtube.com/watch?v=9j1dZwFEJ-c
    */
    console.log(`-----------------------btn-5----------------------`);
    fetch(`https://pokeapi.co/api/v2/pokemon/pikachu`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not fetch resource.`);
            }
            return response.json();
        })
        .then(data => console.log(data.name))
        .catch(error => console.error(error));
});

document.getElementById(`btn-6`).addEventListener(`click`, () => {
    /*
    Following code was written by following along with: https://www.youtube.com/watch?v=9j1dZwFEJ-c
    */
    console.log(`-----------------------btn-6----------------------`);
    async function fetchData () {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/typhlosion`);
            if (!response.ok) {
                throw new Error(`Could not fetch resource.`);
            }
            const data = await response.json();
            console.log(data.name);

        } catch(error) {
            console.error(error);
        }
    }
    fetchData();
});

async function fetchDataFromUserInput () {
    try {
        const pokemonName = document.getElementById(`pokemonName`).value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error(`Could not fetch resource.`);
        }
        const data = await response.json();
        // console.log(data);
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById(`pokemonSprite`);

        imgElement.src = pokemonSprite;
        imgElement.style.display = `block`;
        imgElement.style.height = `200px`

    } catch(error) {
        console.error(error);
    }
}