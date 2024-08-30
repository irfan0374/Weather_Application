import * as yup from 'yup'
const matchPass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const SignupSchema=yup.object().shape({
    name: yup.string().label("Enter the Name").test('whitespace', 'Name cannot be whitespace only', (value) => {
      if (value) {
        return !(/^\s+$/.test(value));
      }
      return true; 
    }) 
    .required("Required"),
    email:yup.string().email("Enter the valid email").required("Requried"),
    password:yup.string().min(5).matches(matchPass,{message:'Please create strong password'}).required("Required"),
    confirmPassword:yup.string().oneOf([yup.ref("password"),null],"password must match").required("Required")
})