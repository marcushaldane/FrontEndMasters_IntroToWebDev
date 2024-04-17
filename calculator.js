console.log(`hello world`);

document.querySelector(`.my-calc`).addEventListener(`click`, function(){
    alert(`clicked ${event.target.innerText}`);
}); 