const userNameRegExp = new RegExp(`^[A-Za-z0-9]+$`); //only letters and numbers
const emailRegExp = new RegExp(`^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`); //valid email address
                               

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
    let errors = [];
    if (!userNameRegExp.test(regUserName.value)){
        errors.push ({element: regUserName , errorMessage: `The username cannot contain any special characters or whitespaces.`});
    }
    let containsUniqes = false;
    for (let i=1; i<regUserName.value.length;i++){
        if (regUserName.value[0]!= regUserName.value[i]){
            containsUniqes = true;
            break;
        }
    }        
    if (!containsUniqes){
        errors.push ({element: regUserName, errorMessage: `The username must contain at least two unique characters.`});
    }    
    return errors;
}

//The email must be a valid email address.
//The email must not be from the domain "example.com."
function validateEmail() {
    let errors = [];
    if (regEmail.value.includes(`example.com`)) {
        errors.push ({element: regEmail , errorMessage: `The email must not be from the domain "example.com."`});        
    }
    if (!emailRegExp.test(regEmail.value)){
        errors.push ({element: regEmail , errorMessage: `The email must be a valid email address.`});                
    }
    return errors;
}

function validateRegistationSubmittion(ev) {
    registerForm.querySelectorAll('input').forEach( it => { //grabbing all the input elements from form and removing error class
        it.classList.remove('error');
    })
    elErrorList.innerHTML = ``; //clearing the error list

    let errors = [];
    errors = errors.concat(validateUserName());
    errors = errors.concat(validateEmail());
    if (errors.length) {
        elErrorList.innerHTML = `<h4>There are errors in the registration form:<\h4>`; //hardcoding is BAD :-)
        ev.preventDefault();       
        errors.forEach( it => {
            const elErrorLi = document.createElement(`li`);
            elErrorLi.textContent = it.errorMessage;
            elErrorList.appendChild(elErrorLi);
            it.element.classList.add('error');
            it.element.focus(); //focus on the last error
        })
        elError.style.display = `block`;
        
    } else {
        elError.style.display = `none`;
    }
}

registerForm.addEventListener('submit', validateRegistationSubmittion);


regUserName.addEventListener('input',removeErrorClass); //removing error class when starting typoing
regEmail.addEventListener('input',removeErrorClass); 

