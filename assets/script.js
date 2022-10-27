const form = document.getElementById('form'),
  username = document.getElementById('username'),
  email = document.getElementById('email'),
  password = document.getElementById('password'),
  password2 = document.getElementById('password2'),
  eyeIcon = document.querySelectorAll('.fa-eye'),
  passwordMessage = document.querySelector('.password-message'),
  passwordControl = document.querySelector('.password__control'),
  inputControl = document.querySelectorAll('.input__control'),
  lowerUpperCase = document.querySelector('.pass__low-upper-case i'),
  numbers = document.querySelector('.pass__numbers i'),
  specialChars = document.querySelector('.pass__special-chars i'),
  minChars = document.querySelector('.pass__min-chars i')

let passwordStrength = document.getElementById('password-strength')

// Form Event Listener
form.addEventListener('submit', (e) => {
  e.preventDefault()
  checkRequired([username, email, password, password2])
  checkLength(username, 5, 16)
  checkEmail(email)
  matchPassword(password, password2)
})

password.addEventListener('keyup', () => {
  let pass = password.value
  checkStrength(pass)
  checkAllPass(password)
})

// Check Password Strength
function checkStrength(password) {
  let strength = 0
  // Check lower and upper case
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    strength += 1
    addCheck(lowerUpperCase)
  } else {
    removeCheck(lowerUpperCase)
  }
  // Check lower and upper case
  if (password.match(/([0-9])/)) {
    strength += 1
    addCheck(numbers)
  } else {
    removeCheck(numbers)
  }
  // Check special chars
  if (password.match(/([!,%,&,#,$,^,*,?,_,~])/)) {
    strength += 1
    addCheck(specialChars)
  } else {
    removeCheck(specialChars)
  }
  // Check chars > 7
  if (password.length > 7) {
    strength += 1
    addCheck(minChars)
  } else {
    removeCheck(minChars)
  }

  // Update progress bar
  if (strength == 1) {
    removePasswordStrength()
    passwordStrength.classList.add('pb-25')
  } else if (strength == 2) {
    removePasswordStrength()
    passwordStrength.classList.add('pb-50')
  } else if (strength == 3) {
    removePasswordStrength()
    passwordStrength.classList.add('pb-75')
  } else if (strength == 4) {
    removePasswordStrength()
    passwordStrength.classList.add('pb-100')
    passwordControl.classList.add('success')
  }
}

// remove password strength
function removePasswordStrength() {
  passwordStrength.classList.remove('pb-25', 'pb-50', 'pb-75', 'pb-100')
}

function addCheck(charRequired) {
  charRequired.classList.remove('fa-circle')
  charRequired.classList.add('fa-check')
}
function removeCheck(charRequired) {
  charRequired.classList.add('fa-circle')
  charRequired.classList.remove('fa-check')
}

// check empty input fields
function checkRequired(inputAll) {
  inputAll.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      if (input == username || input == email) {
        showSuccess(input, '')
      }
      return
    }
    return
  })
}

// Check Username Input Lenght
function checkLength(input, min, max) {
  if (input.value !== '') {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters.`
      )
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters.`
      )
    } else {
      return
    }
  }
}

function checkAllPass(input) {
  const reg = /([a-z].*[A-Z])|([0-9])|([!,%,&,#,$,^,*,?,_,~])/
  if (reg.test(input.value) && input.value.length > 7) {
    showSuccess(input, 'The password is strong enough')
    passwordControl.classList.add('success')
  } else {
    showError(input, 'The password must match all of conditions below')
    passwordControl.classList.remove('success')
    passwordControl.classList.remove('error')
  }
}

// Validate Email
function checkEmail(input) {
  if (input.value !== '') {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (re.test(input.value.trim())) {
      return
    } else {
      showError(input, 'Email is not valid')
    }
  }
}

// Check Password
function matchPassword(input1, input2) {
  if (input2.value.trim() !== '') {
    if (input2.value !== input1.value) {
      showError(input2, 'Passwords do not match')
    } else {
      showSuccess(input2, 'Passwords match')
      input2.classList.add('success')
    }
  }
}

// Show Error message
function showError(input, message) {
  const inputControl = input
  const formControl = input.parentElement
  inputControl.className = 'input__control error'
  formControl.className = 'form__control error'
  const small = formControl.querySelector('small')
  small.innerText = message
}

// Show Success message
function showSuccess(input, message) {
  const inputControl = input
  const formControl = input.parentElement
  const small = formControl.querySelector('small')
  small.style.color = 'green'
  small.innerText = message
  inputControl.className = 'input__control success'
}

// Get Field Name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Show Password Toggle
function togglePassword() {
  if (this.previousElementSibling.type === 'password') {
    this.previousElementSibling.type = 'text'
    this.classList.replace('fa-eye', 'fa-eye-slash')
  } else {
    this.previousElementSibling.type = 'password'
    this.classList.replace('fa-eye-slash', 'fa-eye')
  }
}

eyeIcon.forEach((icon) => {
  icon.addEventListener('click', togglePassword)
})
