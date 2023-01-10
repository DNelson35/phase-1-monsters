const monsterList = document.querySelector("#monster-container")
const form = document.querySelector('form')
const back = document.querySelector("#back")
const forward = document.querySelector("#forward")

fetch('http://localhost:3000/monsters')
.then(resp => resp.json())
.then(resp => getmonsters(resp, 0, 50))

function getmonsters(resp, j, i){ 
    resp.filter(monster => {
        if(monster.id >= j && monster.id <= i){
            makeMonsterText(monster)
        }
    })
    forwardbutton(resp, j, i)
    backButton(resp, j, i)
}

function makeMonsterText(resp){
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const h4 = document.createElement('h4')
    const p = document.createElement('p')

    h2.textContent = resp.name
    h4.textContent = `Age: ${resp.age}`
    p.textContent = `Bio: ${resp.description}`
    h2.style.fontWeight = 'bold'
    h4.style.fontWeight = 'bold'
    div.append(h2, h4, p)
    monsterList.appendChild(div)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    postMonster(e)
    form.reset()
})


function postMonster(e){
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json", 
        },
        body: JSON.stringify({
            name: e.target[0].value,
            age: e.target[1].value,
            description: e.target[2].value
        })
    })
    .then(resp => resp.json())
    .then(resp => makeMonsterText(resp))
}


function forwardbutton(resp, j, i){

    forward.addEventListener('click', ()=> {
        while(monsterList.firstChild){
            monsterList.firstChild.remove()
        }
        j+=50
        i+=50
        getmonsters(resp, j, i)
    })
}

function backButton(resp, j, i){
    back.addEventListener('click', ()=> {
        if(i > 50){
            while(monsterList.firstChild){
                monsterList.firstChild.remove()
            }
            j-=50
            i-=50
            getmonsters(resp, j, i)
        }
        
          
    
    })
}