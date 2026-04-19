document.addEventListener('DOMContentLoaded', () => {

    //Grab DOM elements
    const tableBody = document.getElementById("table-body");
    const form = document.getElementById("dog-form");

    let selectedDogId = null;

    //Fetch and display dogs
    function loadDogs() {
        fetch('http://localhost:3000/dogs')
          .then(res => res.json())
          .then(dogs => {
            tableBody.innerHTML = "";

            dogs.forEach(dog => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                  <td>${dog.name}</td>
                  <td>${dog.breed}</td>
                  <td>${dog.sex}</td>
                  <td><button>Edit</button></td>
                  `;
                  
                  //attach edit button
                  tr.querySelector('button').addEventListener('click', () => {
                    form.name.value = dog.name;
                    form.breed.value = dog.breed;
                    form.sex.value = dog.sex;

                    selectedDogId = dog.id;
                  });

                  tableBody.appendChild(tr);
            });
          }); 
    }

    loadDogs();
    
    //Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!selectedDogId) return;

        const updatedDog = {
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value
        };

        fetch(`http://localhost:3000/dogs/${selectedDogId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedDog)
        })
          .then(res => res.json())
          .then(() => {
            form.reset();
            selectedDogId = null;

            loadDogs();//refresh table
          });
    });
        
    

})