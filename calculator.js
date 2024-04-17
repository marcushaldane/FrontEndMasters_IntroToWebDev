console.log(`hello world`);

document.querySelector(`.my-calc`).addEventListener(`click`, function(){
    console.log(`clicked ${event.target.innerText}`);
}); 