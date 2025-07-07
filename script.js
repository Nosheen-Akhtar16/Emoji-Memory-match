const emojis = ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐸','🐤','🦅','🦆','🕊️',
'🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐸','🐤','🦅','🦆','🕊️',
];
const shuffled = emojis.sort(()=>0.5 - Math.random());

const gameboard = document.getElementById('gameboard');
let firstCard = null;
let secondCard = null;
let lockCard = false;
let lockBoard = false;
shuffled.forEach((emoji,index)=>{
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.innerText = '❓';
  card.addEventListener('click', ()=>{
    if (lockBoard || 
      card.classList.contains('flipped'))
      return;
      card.innerText = emoji;
      card.classList.add('flipped');

      if(!firstCard){
        firstCard = card;
        return
      } 
        secondCard = card;
        lockBoard = true;
        //reset function ko define krna
        function resetBoard(){
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }
        //handclick function ko define krna 
        function handleClick(){
            if (lockBoard || this.classList.contains('flipped'))
                return;
            this.innerText = this.dataset.emoji;
            this.classList.add('flipped');

            if(!firstCard){
                firstCard = this;
                return;
            }
            secondCard = this;
            lockBoard = true;
            
        }
        if(firstCard.dataset.emoji === secondCard.dataset.emoji){
          firstCard.removeEventListener('click',handleClick); 
          secondCard.removeEventListener('click',handleClick); 
          resetBoard();
        } else {
          setTimeout(()=> {
            firstCard.innerText = '❓';
            secondCard.innerText = '❓';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped')
            firstCard = null;
          secondCard = null;
          lockBoard = false;
          }, 800);
        }
      
    
  });
  gameboard.appendChild(card);
});