const form = document.querySelector('#todoForm');
const todoInput = document.querySelector('#addTodo')
const list = document.querySelector('#todoList');
let tagId = 0;
let storageArr = [];
let storageList = JSON.parse(localStorage.getItem('todoList'));
let storedId = localStorage.getItem('tagId');

function saveData() {
    localStorage.setItem('todoList', JSON.stringify(storageArr))
    localStorage.setItem('tagId', tagId)
}

//creates new list entries and pushes them to an array for localStorage
form.addEventListener('submit', function(e){
    e.preventDefault();

    let entry = document.createElement('h2');
    entry.innerText = `${todoInput.value}`;
    entry.setAttribute('data-id', tagId)
    list.append(entry)
    

    let removeBtn = document.createElement('button');
    removeBtn.innerText = 'X';
    entry.append(removeBtn)

    storageArr.push({id: tagId, content: entry.outerHTML})
    tagId++
    saveData()
    todoInput.value = '';
})

list.addEventListener('click', function(e){
    if(e.target.tagName === 'H2'){
        e.target.classList.toggle('done')
        //checks the storage array for the matching id of the event tag and updates its class in the array
        for(let item of storageArr){
            if(parseInt(e.target.dataset.id) === item.id){
                item.content = e.target.outerHTML
            }
        }
        saveData()
    } else if (e.target.tagName === 'BUTTON'){
        //checks the storage array for the matching id of the event and removes it from the array
        for(let item of storageArr){
            if(e.target.parentElement.outerHTML === item.content){
                let index = storageArr.indexOf(item);
                storageArr.splice(index, 1)
            }
        }
        e.target.parentElement.remove()
        saveData()
    }
})

//loads the list from storage
if(storageList){
    tagId = parseInt(storedId);
    storageArr = storageList;
    for(let item of storageList){
        let entry = document.createElement('h2');
        list.append(entry)
        entry.outerHTML = item.content 
    }    
}