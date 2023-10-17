const gameArea = document.querySelector('.game-area');
document.addEventListener('DOMContentLoaded', init);
const game = {
    row:5, 
    col:8, 
    arr:[], 
    ani:{}, 
    max:5, 
    actives:0,
    inPlay: false,
    gameBtn: {},
    hit:0,
    miss:0
};

function init() {
    gameArea.innerHTML = '';
    // const temp = `Score ${game.hit} vs ${game.miss} `;
    game.scoreBoard = createNewElement(gameArea, 'div', 'Score', 'scoreboard');
    game.gameBtn = createNewElement(gameArea, 'button', 'Start', 'btn');
   
    game.gameBtn.addEventListener('click', ()=> {
        if(game.gameBtn.textContent=='Start'){
            game.inPlay = true;
            game.ani = requestAnimationFrame(startGame);
           game.gameBtn.textContent = 'Stop';
        }else{
            cancelAnimationFrame(game.ani);
            game.gameBtn.textContent = 'Start';
            game.inPlay = false;
        }
      
    })
    const main = createNewElement(gameArea, 'div', '', 'gridContainer');
  
    buildGrid(main);
    // game.ani = requestAnimationFrame(startGame);
}

function startGame(){
    const total = game.max > game.arr.length ?
    game.arr.length : game.max;
    if(game.actives < total){
        makeActive(makeSelection());
    }
    if(game.inPlay){
        game.arr.forEach((ele_)=> {
            if(ele_.counter > 0 ){
                ele_.counter--;
                // ele_.textContent = ele_.counter;
                let temp = Math.ceil(Number(ele_.counter)/10)/10;
                ele_.style.opacity = temp;
                if(ele_.counter <= 0){
                    removeActive(ele_);
                }
            }
            
        })
        game.ani = requestAnimationFrame(startGame);
    }
}

function makeSelection(){
    const select_random_item = Math.floor(Math.random()*game.arr.length);
    return game.arr[select_random_item];
}


function makeActive(ele_){
    if(ele_.classList.contains('active')){
        console.log('already there');
        console.log(ele_);
        return makeActive(makeSelection());
    }else{
        game.actives++;
        ele_.counter = Math.floor(Math.random()*500)+ 30;

        ele_.classList.add('active');
        // setTimeout(removeActive, timer, ele_);
        return true;
       
    }

}

function removeActive(my_elemt){
    console.log(my_elemt);
    my_elemt.counter = 0;
    my_elemt.textContent = '-';
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
            const element_= createNewElement(main, 'div', '-', 'grid-item');
            // const element_= createNewElement(main, 'div', cell, 'grid-item');
            element_.counter = 0;
            element_.addEventListener('click', hitButton);
            game.arr.push(element_);
        }
        
    }
    main.style.gridTemplateColumns = dim.x;
    main.style.gridTemplateRows = dim.y;
    
}

function hitButton(e){
    console.log(e.target);
    const ele_ = e.target
    if(ele_.classList.contains('active')){
        console.log('hit');
        game.hit++;
        updateScore();
        removeActive(ele_);
    }else{
        console.log('miss');
        game.miss++;
        updateScore();
    }
}

function updateScore(){
    const temp = `Score ${game.hit} vs ${game.miss} `;
    game.scoreBoard.textContent = temp;
}


function createNewElement(parent, ele_, html, myclass){
    const element_ = document.createElement(ele_);
    element_.classList.add(myclass);
    element_.innerHTML = html;
    parent.append(element_);
    return element_;
}