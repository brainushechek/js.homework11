const app = document.getElementById('app')
 
const table = document.createElement('table')
table.classList.add('table')
app.appendChild(table)

const buttonCreate = document.createElement('button')
buttonCreate.textContent = 'create'
app.appendChild(buttonCreate)

buttonCreate.onclick = async () => {
    buttonCreate.style.display = 'none'

    const newUser = document.createElement('div')
    app.appendChild(newUser)

    const inputName = document.createElement('input')
    inputName.value = "name"
    newUser.appendChild(inputName)

    const inputSurname = document.createElement('input')
    inputSurname.value = "surname"
    newUser.appendChild(inputSurname)

    const inputEmail = document.createElement('input')
    inputEmail.value = "email"
    newUser.appendChild(inputEmail)

    const inputPhone = document.createElement('input')
    inputPhone.value = "phone"
    newUser.appendChild(inputPhone)
    
    const buttonSaveNewUser = document.createElement('button')
    buttonSaveNewUser.textContent = 'save'
    app.appendChild(buttonSaveNewUser)

    buttonSaveNewUser.onclick = async () => {
        buttonCreate.style.display = 'block'
        buttonSaveNewUser.style.display = 'none'
        newUser.style.display = 'none'
            const valuesObject = {
                name: inputName.value,
                surname: inputSurname.value,
                email: inputEmail.value,
                phone: Number(inputPhone.value)
            }
            const myJson = JSON.stringify(valuesObject)
            const response = await fetch(`http://localhost:3000/users`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: myJson 
            })
        const dataFromResponse = await response.json()
        console.log(dataFromResponse) 
        location.reload()  
    }  

    const buttonCancleNewUser = document.createElement('button')
    buttonCancleNewUser.textContent = 'cancle'
    app.appendChild(buttonCancleNewUser) 

    buttonCancleNewUser.onclick = () => {
        location.reload()
    }
}

async function getUsers() {
    const response = await fetch (`http://localhost:3000/users`)
    const users = await response.json()

    for (let i = 0; i < users.length + 1; i++) {
        const tr = document.createElement('tr')
        for (let j = 0; j < 5; j++) {
            if (i === 0) {
                tr.classList.add('light-dark')
                const th = document.createElement('th')
                th.textContent = `${Object.keys(users[i])[j]}`
                tr.appendChild(th)
            } else {
                const td = document.createElement('td')
                const data = document.createElement('input')
                data.disabled = true
                data.value = `${Object.values(users[i-1])[j]}`
                data.style.cssText = `
                    background: none;
                    border: none
                `
                td.appendChild(data)
                tr.appendChild(td)
            }
        table.appendChild(tr)
        }   

        if (i > 0) {
            const edit = document.createElement('td')
            tr.appendChild(edit)

            const buttonEdit = document.createElement('button')
            buttonEdit.textContent = 'edit'
            edit.appendChild(buttonEdit)

            buttonEdit.onclick = async () => {
                buttonEdit.style.display = "none"
                const buttonSave = document.createElement('button')
                buttonSave.textContent = 'save'
                edit.appendChild(buttonSave)

                const buttonCancle = document.createElement('button')
                buttonCancle.textContent = 'cancle'
                edit.appendChild(buttonCancle)

                for (let i = 0; i < event.target.closest('tr').cells.length; i++){
                    console.log(event.target.closest('tr').cells[i].firstChild);
                    if (i < 4) {
                        event.target.closest('tr').cells[i].firstChild.disabled = false
                        console.log(event.target.closest('tr').cells[i].firstChild.value)
                    }  
                    buttonSave.onclick = async () => {
                    buttonEdit.style.display = "block"
                    buttonSave.style.display = 'none'
                    buttonCancle.style.display = 'none'
                    for (let i = 0; i < (event.target.closest('tr').cells).length; i++){  
                        if (i < 4) {                  
                            event.target.closest('tr').cells[i].firstChild.disabled = true
                        }
                    }
                    const valuesUsers = {
                        name: event.target.closest('tr').cells[0].firstChild.value,
                        surname: event.target.closest('tr').cells[1].firstChild.value,
                        email: event.target.closest('tr').cells[2].firstChild.value,
                        phone: Number(event.target.closest('tr').cells[3].firstChild.value)
                    }
                    const myJson = JSON.stringify(valuesUsers)
                    const response = await fetch(`http://localhost:3000/users/${event.target.closest('tr').cells[4].firstChild.value}`, {
                        method: 'PUT', 
                        headers: {
                            'Content-Type': 'application/json', 
                        },
                        body: myJson 
                    })
                    const dataFromResponse = await response.json()
                    console.log(dataFromResponse)
                    }
                    
                    buttonCancle.onclick = async () => {
                        buttonEdit.style.display = "block"
                        buttonSave.style.display = 'none'
                        buttonCancle.style.display = 'none'
                        for (let i = 0; i < (event.target.closest('tr').cells).length; i++){  
                            if (i < 4) {                  
                                event.target.closest('tr').cells[i].firstChild.disabled = true
                            }
                        }
                        location.reload()
                    }
                }
            
            } 
            const del = document.createElement('td')
            tr.appendChild(del)
            const buttonDelete = document.createElement('button')
            buttonDelete.textContent = 'delete'
            del.appendChild(buttonDelete) 

            buttonDelete.onclick = async () => {
                const response = await fetch(`http://localhost:3000/users/${event.target.closest('tr').cells[4].firstChild.value}`, {
                    method: 'DELETE'
                })
                const dataFromResponse = await response.json()
                console.log(dataFromResponse)
                location.reload()          
            }
        } 
    }
}

getUsers()

