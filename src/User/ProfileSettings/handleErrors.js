export default function handleErrors(values) {
  
  let errors = {};
  // if(values.oldpassword !== "password form database"){
  //   errors.oldpassword='Wrong password'
  // }
  if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)){
    errors.password = 'Password needs to has at least 8 characters, 1 lowercase,1 uppecase,1 symbol and 1 number';
  } else if(values.oldpassword == values.password){
    errors.password = "New password must be different from the old"
  }

  if (!values.password2) {
    errors.password2 = 'Confirm your password';
  } else if (values.password2 !== values.password) {
    errors.password2 = 'Passwords do not match';
  }


  if(values.newusername == localStorage.getItem("User")){
    errors.newusername = "New username must be different from the old"
  }
  return errors;
}