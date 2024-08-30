import * as yup from 'yup'

const matchPass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const loginSchema=yup.object().shape({
    email:yup.string().email("Please enter the valid email").required("Required"),
    password:yup.string().min(5).matches(matchPass,{message:'Please create strong password'}).required("Required"),
})