console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const addressInput = document.querySelector('input')

const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const p3 = document.querySelector('#p3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    p1.textContent = "Loading..."
    p2.textContent = ""
    p3.textContent = ""

    fetch('/weather?address=' + addressInput.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error
                
            } else {
                p1.textContent = data.location
                p2.textContent = data.forecast
                p3.textContent = data.otherdata                
            }
        })
    })
})