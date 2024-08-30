import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { SignupSchema } from '../Schema/SignupSchema';
import { useToaster, Message } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/Configuration";
import { setDoc, doc } from "firebase/firestore"
import ButtonLoading from '../components/Loading/ButtonLoading'


const SignupPage = () => {
  const navigate = useNavigate()
  const toaster = useToaster();
  const [loading, setLoading] = useState(false)


  const onSubmit = async (values) => {
    try {
      setLoading(true)
      await createUserWithEmailAndPassword(auth, values.email, values.password)
      const user = auth.currentUser


      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: values.name,
        })
        window.location.reload();

        toaster.push(<Message type="success">User registered successfully!!</Message>, {
          placement: 'topEnd',
          duration: 2000
        })

      } else {
        setLoading(false)
        toaster.push(<Message type="success">Something went wrong</Message>, {
          placement: 'topEnd',
          duration: 2000
        });
      }
    } catch (error) {
      setLoading(false)
      toaster.push(<Message type="error">Something went wrong</Message>, {
        placement: 'topEnd',
        duration: 3000
      });
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      name: "",
      email: '',
      password: "",
      confirmPassword: ''
    },
    validationSchema: SignupSchema,
    onSubmit,
  });
  return (
    <>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">SignUp</h5>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">Username:</label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                {...getFieldProps('name')}
                placeholder="Enter your name"
                required
              />
              {errors.name && touched.name && (<p className="text-red-800">{errors.name}</p>)}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input
                type="email"
                id="email"
                {...getFieldProps('email')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@example.com"
                required
              />
              {errors.email && touched.email && (<p className="text-red-800">{errors.email}</p>)}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              {errors.password && touched.password && (<p className="text-red-800">{errors.password}</p>)}
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              {errors.confirmPassword && touched.confirmPassword && (<p className="text-red-800">{errors.confirmPassword}</p>)}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center"
            >
              {loading ? <ButtonLoading /> : 'Sign Up your Account'}
            </button>
          </form>
        </div>
      </div>

    </>
  );
};

export default SignupPage;
