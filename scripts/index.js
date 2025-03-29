const userNameRegExp = new RegExp(`^[A-Za-z0-9]+$`); //only letters and numbers
const emailRegExp = new RegExp(`^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`); //valid email address
const lowerCaseRegExp = new RegExp('[a-z]');
const upperCaseRegExp = new RegExp('[A-Z]');
const numberRegExp = new RegExp('[0-9]');
const specialCharacterRegExp = new RegExp('[^a-zA-Z0-9]');
let localUsers = JSON.parse(localStorage.getItem(`users`)); // users is an array of objects
if (localUsers == null) {
    localUsers = [];
}
//console.log(localUsers);

//registation form
const registerForm = document.getElementById(`registration`);
const elError = document.getElementById(`errorDisplay`);
const elErrorList = document.getElementById('errorList');
const regUserName = registerForm.querySelector("input[name='username']");
const regEmail = registerForm.querySelector("input[name='email']");
const regPassword1 = registerForm.querySelector("input[name='password']");
const regPassword2 = registerForm.querySelector("input[name='passwordCheck']");
const regTerms = registerForm.querySelector("input[name='terms']")
const regSubmit = registerForm.querySelector("input[type='submit']");
//login form
const loginForm = document.getElementById(`login`);
const logUserName = loginForm.querySelector("input[name='username']");
const logPassword = loginForm.querySelector("input[name='password']");
const logPersist = loginForm.querySelector("input[name='persist']");


//Part 3: Registration Form Validation Requirements
function removeErrorClass(ev) {
    ev.target.classList.remove(`error`);
}

function validateUserName() {
    let errors = [];
    //check if user name is unique
    if (localUsers.find(it => it.userName == regUserName.value.toLowerCase())) {  // NOT {} in arrow function to implement return!!!!
        errors.push({ element: regUserName, errorMessage: `This user name is already been taken. Please select another one.` });
    } else {
        console.log(`username free`);

    }
    if (!userNameRegExp.test(regUserName.value)) {
        errors.push({ element: regUserName, errorMessage: `The username cannot contain any special characters or whitespaces.` });
    }
    let containsUniqes = false;
    for (let i = 1; i < regUserName.value.length; i++) {
        if (regUserName.value[0] != regUserName.value[i]) {
            containsUniqes = true;
            break;
        }
    }
    if (!containsUniqes) {
        errors.push({ element: regUserName, errorMessage: `The username must contain at least two unique characters.` });
    }
    return errors;
}

//The email must be a valid email address.
//The email must not be from the domain "example.com."
function validateEmail() {
    let errors = [];
    if (regEmail.value.toLowerCase().includes(`example.com`)) {
        errors.push({ element: regEmail, errorMessage: `The email must not be from the domain "example.com."` });
    }
    if (!emailRegExp.test(regEmail.value)) {
        errors.push({ element: regEmail, errorMessage: `The email must be a valid email address.` });
    }
    return errors;
}
// Passwords must be at least 12 characters long.
// Passwords must have at least one uppercase and one lowercase letter.
// Passwords must contain at least one number.
// Passwords must contain at least one special character.
// Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
// Passwords cannot contain the username.
// Both passwords must match.
function validatePasswords() {
    let errors = [];
    //will only validate password1 and then just check if passwords are the same
    if (regPassword1.value.length < 12) {
        errors.push({ element: regPassword1, errorMessage: `Password must be at least 12 characters long` });
    }
    if (!lowerCaseRegExp.test(regPassword1.value)) {
        errors.push({ element: regPassword1, errorMessage: `Password must have at least one lowercase letter` });
    }
    if (!upperCaseRegExp.test(regPassword1.value)) {
        errors.push({ element: regPassword1, errorMessage: `Password must have at least one upper letter` });
    }
    if (!numberRegExp.test(regPassword1.value)) {
        errors.push({ element: regPassword1, errorMessage: `Password must contain at least one number` });
    }
    if (!specialCharacterRegExp.test(regPassword1.value)) {
        errors.push({ element: regPassword1, errorMessage: `Password must contain at least one special character` });
    }
    if (regPassword1.value.toLowerCase().includes('password')) {
        errors.push({ element: regPassword1, errorMessage: `Password cannot contain the word "password"` });
    }
    if (regPassword1.value.toLowerCase().includes(regUserName.value.toLowerCase())) {
        errors.push({ element: regPassword1, errorMessage: `Password cannot contain the username` });
    }
    if (regPassword1.value != regPassword2.value) {
        errors.push({ element: regPassword2, errorMessage: `Both passwords must match` });
    }
    return errors;
}

function validateTerms() {
    let errors = [];
    if (!regTerms.checked) {
        errors.push({ element: regTerms, errorMessage: `The terms and conditions must be accepted.` });
    }
    return errors;
}

function validateLoginUserName() {
    let errors = [];
    if (!localUsers.find(it => it.userName == logUserName.value.toLowerCase())) {  // NOT {} in arrow function to implement return!!!!
        errors.push({ element: logUserName, errorMessage: `User ${logUserName.value} not found.` });
    }
    return errors;
}
function validateLoginPassword() {
    let errors = [];
    if (!localUsers.find(it => it.password == logPassword.value)) {  // NOT {} in arrow function to implement return!!!!
        errors.push({ element: logPassword, errorMessage: `Password is incorrect. Please try again.` });
    }
    return errors;
}

function validateRegistationSubmittion(ev) {
    registerForm.querySelectorAll('input').forEach(it => { //grabbing all the input elements from form and removing error class
        it.classList.remove('error');
    })
    elErrorList.innerHTML = ``; //clearing the error list
    let errors = [];
    errors = errors.concat(validateUserName());
    errors = errors.concat(validateEmail());
    errors = errors.concat(validatePasswords());
    errors = errors.concat(validateTerms());

    if (errors.length) {
        elErrorList.innerHTML = `<h4>There are errors in the registration form:<\h4>`; //hardcoding is BAD :-)
        ev.preventDefault();
        errors.forEach(it => {
            const elErrorLi = document.createElement(`li`);
            elErrorLi.textContent = it.errorMessage;
            elErrorList.appendChild(elErrorLi);
            it.element.classList.add('error');
            it.element.focus(); //focus on the last error
        })
        elError.style.display = `block`;

    } else { //everthing is fine save the user data
        elError.style.display = `none`;
        localUsers.push({
            userName: regUserName.value.toLowerCase(),
            email: regEmail.value.toLowerCase(),
            password: regPassword1.value
        });
        localStorage.setItem('users', JSON.stringify(localUsers));
        //all forms are cleared automatically after sucsessful submit
        alert(`Registration for ${regUserName.value} successful. Welcome!!!`)
    }
}

function validateLoginSubmittion(ev) {
    loginForm.querySelectorAll('input').forEach(it => { //grabbing all the input elements from form and removing error class
        it.classList.remove('error');
    })
    elErrorList.innerHTML = ``; //clearing the error list
    let errors = [];
    errors = errors.concat(validateLoginUserName());
    errors = errors.concat(validateLoginPassword());
    if (errors.length) {
        elErrorList.innerHTML = `<h4>There are errors in the login form:<\h4>`; //hardcoding is BAD :-)
        ev.preventDefault();
        errors.forEach(it => {
            const elErrorLi = document.createElement(`li`);
            elErrorLi.textContent = it.errorMessage;
            elErrorList.appendChild(elErrorLi);
            it.element.classList.add('error');
            it.element.focus(); //focus on the last error
        })
        elError.style.display = `block`;

    } else { //everthing is fine save the user data
        elError.style.display = `none`;
        if (!logPersist.checked) {
            alert(`Login for ${regUserName.value} successful. Welcome!!!`)
        } else {
            alert(`Login for ${regUserName.value} successful. Welcome!!! You will be keeped logged in.`)
        }
    }

}

registerForm.addEventListener('submit', validateRegistationSubmittion);
loginForm.addEventListener('submit', validateLoginSubmittion);

regUserName.addEventListener('input', removeErrorClass); //removing error class when starting typoing
regEmail.addEventListener('input', removeErrorClass);
regPassword1.addEventListener('input', removeErrorClass); 
regPassword2.addEventListener('input', removeErrorClass);
logUserName.addEventListener('input', removeErrorClass); 
logPassword.addEventListener('input', removeErrorClass);

