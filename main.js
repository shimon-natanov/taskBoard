saveButton = document.querySelector('#save')
resetButton = document.querySelector('#reset')

saveButton.onclick = function (){
   tempNote ={}
   tempNote.textContent = document.querySelector('#enterTask').value
   tempNote.date = document.getElementById('date').value
   if (!((tempNote.textContent)&&(tempNote.date))){
       return
   }
   tempNote.time = document.getElementById('time').value
   noteArchive.push(tempNote)
   showNote(tempNote,index)
   index ++
   localStorage.setItem(`allNotes`,JSON.stringify(noteArchive)  )
}

window.onload = function(){
    notes = document.getElementById('notes')
    noteArchive=[] // array of all the notes
    index = 0 
    tempSTR=localStorage.getItem('allNotes') // we convert the Json in localstorage to an object
    if (!tempSTR){
        return
    }
    tempJSON = JSON.parse(tempSTR)
    for (i=0 ; i < tempJSON.length; i++){
        noteArchive.push(tempJSON[i])
        showNote(tempJSON[i],i)
    }
    index = i
}

function showNote(noteItem,index){
   note = document.createElement('div')
   note.setAttribute('class','yelloNote')
   note.setAttribute('id',`${index}`) 
   note.style.backgroundImage = 'url("./images/notebg.png")'
   note.style.backgroundSize = 'cover'
   note.style.width = '300px'
   note.style.height = '400px'
   note.style.backgroundRepeat = 'no-repeat';
   addX(note)
   notesTask = document.createElement('div')
   notesTask.style.color = 'blue'
   notesTask.setAttribute('class','taskNote')
   notesTask.textContent= noteItem.textContent
   note.appendChild(notesTask)
   notesTask.style.overflowY = 'scroll'
   note.style.position = "relative";
   note.style.boxSizing = 'border-box'
   notesTask.style.position = 'absolute'
   notesTask.style.width = '80%'
   notesTask.style.height = '70%'
   notesTask.style.top = '10%'
   notesTask.style.bottom = '20%'
   notesTask.style.left = '50%'
   notesTask.style.transform = 'translate(-50%,0%)'
   noteDate = noteItem.date
   noteTime = noteItem.time
   noteDateTime =document.createElement('div')
   noteDateTime.setAttribute('class','dateTime')
   noteDateTime.style.color= 'green'
   noteDateTime.innerHTML = `<span class="dateSpan"> ${noteDate} </span> <br> <span class='timeSpan'> ${noteTime}</span> ` 
   note.appendChild(noteDateTime)
   noteDateTime.style.position = 'absolute'
   noteDateTime.style.bottom = '5%'
   noteDateTime.style.left = '5%'
   notes.appendChild(note)
}

function addX(noteTemp){
    Xbutton = document.createElement('input')
    Xbutton.type ='button'
    Xbutton.style.display= 'none'
    Xbutton.value = 'X'
    Xbutton.setAttribute('class','Xclass')
    Xbutton.width = '10vh'
    Xbutton.height = '10vh'
    noteTemp.appendChild(Xbutton)
}

notes.onmouseover = function(e){  // on one of the children of notes
    switch (e.target.className) {
        case 'yelloNote' : {
            var classItem = e.target.getElementsByClassName('Xclass')[0];
            classItem.style.display = 'inline';
            break;
        }
        case 'dateTime', 'taskNote' : { // 
            var classItem = e.target.parentNode.getElementsByClassName('Xclass')[0];
            classItem.style.display = 'inline';
            break;
        }
        case 'Xclass' : {
            var classItem = e.target.parentNode.getElementsByClassName('Xclass')[0];
            classItem.style.display = 'inline';
            e.target.onclick = function (Xe){
                noteArchive.splice(e.target.id,1) // delet the note from array
                localStorage.setItem(`allNotes`,JSON.stringify(noteArchive)  )
                e.target.parentNode.remove()  // delete note div
            }
            break;
        }
        case "dateSpan",'timeSpan' : {
            var classItem = e.target.parentNode.parentNode.getElementsByClassName('Xclass')[0];
            classItem.style.display = 'inline';
            break
        }
    }     
}

notes.onmouseout = function(e){ // on one of the children of notes
    if (e.target.className =='yelloNote'){           
        var classItem = e.target.getElementsByClassName('Xclass')[0];
        var dateTimeItem = e.target.getElementsByClassName('dateTime')[0];
        classItem.style.display = 'none'
        dateTimeItem.onmouseenter = function(){
            classItem.style.display = 'inline'
        }    
    }
}