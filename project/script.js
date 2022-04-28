const rulesButton = document.querySelector('.rules-button');
const app = document.querySelector('.app');
const buttons = document.querySelectorAll('main > div');
const main = document.querySelector('main');
const rulesButtonContainer = document.querySelector('.rules-button-container');

function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
   }



const createRulesContainer = () => {

     const rulesContainer = document.createElement('div')
     rulesContainer.classList.add('rules-container');

     const rules = document.createElement('div')
     rules.classList.add('rules');

     const rulesTitleContainer = document.createElement('div');
     rulesTitleContainer.classList.add('rules-title-container');

     const rulesTitle = document.createElement('p');
     rulesTitle.classList.add('rules-title');
     rulesTitle.innerText = "RULES"

     const rulesImg = document.createElement('img');
     rulesImg.setAttribute('src', "../images/image-rules.svg")

     
     const rulesCloseButton = document.createElement('img');
     rulesCloseButton.setAttribute('src', "../images/icon-close.svg")
     rulesCloseButton.classList.add('rules-close-button')

     rulesTitleContainer.appendChild(rulesTitle)
     rulesTitleContainer.appendChild(rulesCloseButton)

     rules.appendChild(rulesTitleContainer)
     rules.appendChild(rulesImg)

     rulesContainer.appendChild(rules)


     rulesCloseButton.addEventListener('click', () => {
          rulesContainer.remove()
     });

     return rulesContainer;
}


document.querySelector('.rules-button-container').addEventListener('click', () => {
     app.appendChild(createRulesContainer())

});


buttons.forEach(button => {
     button.addEventListener('click', () => {
          userChoice = button.getAttribute("data-choice")

          const botChoices = ["rock", "paper", "sizo"];
          let random = getRandomInt(0, 2)
          console.log(random)
          let botChoice = botChoices[random];
          console.log(botChoice)

          main.remove()
          rulesButtonContainer.remove()


          const mainStep2 = document.createElement('main');
          mainStep2.innerHTML = `
          <div class="user">
                         <p class="user-title">YOU PICKED</p>

                         <div class="circle-border" id="${userChoice}-border">
                              <div class="circle-img-container">
                                   <img src="../images/icon-${userChoice}.svg" alt="${userChoice}" class="circle-img">
                              </div>
                         </div>
                    </div>

                    <div class="result-container">
                         <div class="result-title">YOU WIN</div>
                         <div class="result-button">PLAY AGAIN</div>
                    </div>

                    <div class="bot">
                         <p class="bot-title">THE HOUSE PICKED</p>
                         <div class="circle-border" id="${botChoice}-border">
                              <div class="circle-img-container">
                                   <img src="../images/icon-${botChoice}.svg" alt="${botChoice}" class="circle-img">
                              </div>
                         </div>
                    </div>`
          
          const rulesButtonContainer2 = document.createElement('div');
          rulesButtonContainer2.classList.add('rules-button-container');
          rulesButtonContainer2.innerHTML = `<p class="rules-button">RULES</p>`;

          rulesButtonContainer2.addEventListener('click', () => {
               document.querySelector('.app-step2').appendChild(createRulesContainer())
          });

          app.appendChild(mainStep2)
          app.appendChild(rulesButtonContainer2)
          app.classList.remove("app")
          app.classList.add('app-step2')


          setTimeout(() => {
               const resultTitle = document.querySelector('.result-title');
               const resultButton = document.querySelector('.result-button');
               const resultContainer = document.querySelector('.result-container')

               if (userChoice == "paper" && botChoice == "rock" || userChoice == "rock" && botChoice == "sizo" || userChoice == "sizo" && botChoice == "paper") {
                    resultTitle.innerText = "YOU WIN";
                    resultContainer.classList.add('active')
                    newId = document.querySelector('.user > .circle-border').id
                    console.log(newId)
                    document.querySelector('.user > .circle-border').setAttribute('id', `${newId}-win`)
                    score = score + 1;
                    localStorage.setItem('scoreStorage', score)
                    document.querySelector('.score').innerText = localStorage.getItem('scoreStorage');

               }
               else if (userChoice == botChoice) {
                    resultTitle.innerText = "EQUALITY"
                    resultContainer.classList.add('active')

               }
               else {
                    resultTitle.innerText = "YOU LOOSE";
                    resultButton.setAttribute('id', 'defeat')
                    resultContainer.classList.add('active')
                    newId = document.querySelector('.bot > .circle-border').id
                    console.log(newId)
                    document.querySelector('.bot > .circle-border').setAttribute('id', `${newId}-win`)

               }
          }
                    
               , 1000)
          document.querySelector('.result-container').addEventListener('click', () => {
               document.location.reload()
     })


     })
});