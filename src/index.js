document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body')
    document.addEventListener('click', events)
    const dogForm = document.getElementById('dog-form')



fetch(`http://localhost:3000/dogs`)
.then(res => res.json())
.then(dog => dog.forEach(dogList))

function dogList(dogs) {
    tableBody.innerHTML +=
    `<tr data-id=${dog.id}>
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button id="edit-btn" data-id=${dog.id}>Edit</button></td>
    </tr>`
}

function events(e) {
    e.preventDefault()
    if(e.target.id === "edit-btn"){
        editDog(e.target.dataset.id)
      } else if(e.target.parentElement.id === 'dog-form'){
        editedDog(e)
      }
}

function editDog(id){
    fetch(`http://localhost:3000/dogs/${id}`)
    .then(res => res.json())
    .then(dog => {
      dogForm.name.value = dog.name,
      dogForm.sex.value = dog.sex,
      dogForm.breed.value = dog.breed,
      dogForm.dataset.id = dog.id
    })
}

function editedDog(e){
    let dog = {
      name: e.target.parentElement.name.value,
      sex: e.target.parentElement.sex.value,
      breed: e.target.parentElement.breed.value
    }

    fetch(`http://localhost:3000/dogs/${e.target.parentElement.dataset.id}`, {
        method: 'PATCH',
        headers: {
          "content-type": 'application/json',
          accepts: 'application/json'
        },
        body: JSON.stringify(dog)
      }).then(res => res.json())
      .then(dog => {
        let foundDog = document.querySelector(`tr[data-id="${dog.id}"]`)
        foundDog.children[0].innerText = dog.name
        foundDog.children[1].innerText = dog.breed
        foundDog.children[2].innerText = dog.sex
      })
    }
}) 