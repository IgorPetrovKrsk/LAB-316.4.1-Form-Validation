const userNameRegExp = new RegExp(`^[A-Za-z0-9]+$`); //only letters and numbers

const registerForm = document.getElementById(`registration`);
const elError = document.getElementById(`errorDisplay`);
const elErrorList = document.getElementById('errorList');
const regUserName = registerForm.querySelector("input[name='username']");
const regEmail = registerForm.querySelector("input[name='email']");
const regSubmit = registerForm.querySelector("input[type='submit']");

//Part 3: Registration Form Validation Requirements
function removeErrorClass(ev){
    ev.target.classList.remove(`error`);
}

function validateUserName() {
    let errorMessage = ``;
    if (!userNameRegExp.test(regUserName.value)){
        errorMessage += `The username cannot contain any special characters or whitespaces.\n`;
        regUserName.classList.add('error');
        regUserName.focus();
    }        
    return errorMessage;
}

//The email must be a valid email address.
//The email must not be from the domain "example.com."
function validateEmail() {
    let errorMessage = ``;
    if (regEmail.value        
        .includes(`example.com`)) {
        errorMessage += `The email must not be from the domain "example.com."\n`;
        regEmail.classList.add('error');
        regEmail.focus();
    }        
    return errorMessage;
}

function validateRegistationSubmittion(ev) {
    registerForm.querySelectorAll('input').forEach( it => { //grabbing all the input elements from form and removing error class
        it.classList.remove('error');
    })
    elErrorList.innerHTML = ``; //clearing the error list

    let errorMessage = ``;
    errorMessage += validateUserName();
    errorMessage += validateEmail();
    if (errorMessage) {
        elErrorList.innerHTML = `<h4>There are errors in the registration form:<\h4>`; //hardcoding is BAD :-)
        ev.preventDefault();
        
        
        const errorArray = errorMessage.split(`\n`);
        console.log(errorArray);
        errorArray.forEach( it => {
            if (!it) return;
            const elErrorLi = document.createElement(`li`);
            elErrorLi.textContent = it;
            elErrorList.appendChild(elErrorLi);
        })
        elError.style.display = `block`;
        
    } else {
        elError.style.display = `none`;
    }
}

registerForm.addEventListener('submit', validateRegistationSubmittion);


regUserName.addEventListener('input',removeErrorClass); //removing error class when starting typoing
regEmail.addEventListener('input',removeErrorClass); 

