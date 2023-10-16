const gameArea = document.querySelector('.game-area');
document.addEventListener('DOMContentLoaded', init);
const game = {row:5, col:8, arr:[], ani:{}, max:5, actives:0};

function init() {
    gameArea.innerHTML = '';
    const main = createNewElement(gameArea, 'div', '', 'gridContainer');
  
    buildGrid(main);
    game.ani = requestAnimationFrame(startGame);
}

function startGame(){
    if(game.actives < game.max){
        makeActive();
    }
    
    game.ani = requestAnimationFrame(startGame);
}

function makeActive(){
    game.actives++;
    const select_random_item = Math.floor(Math.random()*game.arr.length);
    const timer = Math.floor(Math.random()*4000)+ 1000;
    const my_elemt = game.arr[select_random_item];
    my_elemt.classList.add('active');
    setTimeout(removeActive, timer, my_elemt);
   
}

function removeActive(my_elemt){
    console.log(my_elemt);
    my_elemt.classList.remove('active');
    game.actives--;
}


function buildGrid(main){
    const dim = {x: '', y: ''}
    for(let y = 0; y<game.row; y++){
        dim.y += ' auto ';
        for(let x=0; x<game.col; x++){
            if(x==0){dim.x += ' auto ';}
            const cell = y*game.col+x+1;
            const element_= createNewElement(main, 'div', cell, 'grid-item');
            game.arr.push(element_);
        }
        
    }
    main.style.gridTemplateColumns = dim.x;
    main.style.gridTemplateRows = dim.y;
    
}

function createNewElement(parent, ele_, html, myclass){
    const element_ = document.createElement(ele_);
    element_.classList.add(myclass);
    element_.innerHTML = html;
    parent.append(element_);
    return element_;
}