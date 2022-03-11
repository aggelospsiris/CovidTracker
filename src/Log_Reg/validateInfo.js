export default function validateInfo(values) {
  
  
    let errors = {};
  
    if (!values.username.trim()) {
      errors.username = 'Username required';
    }
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    } 
    if(!values.password) {
      errors.password = 'Password is required';
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)){
      errors.password = 'Password needs to has at least 8 characters, 1 lowercase,1 uppecase,1 symbol and 1 number';
    }
  
    if (!values.password2) {
      errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Passwords do not match';
    }
    return errors;
  };
