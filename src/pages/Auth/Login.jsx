import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth';
import { Link,useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';

const Login = () => {

  const {register , handleSubmit, formState: {errors}} = useForm();

  const {signInuser} = useAuth();
  const navigate = useNavigate();
 const handleLogin = async (data) => {
    try {
      const result = await signInuser(data.email, data.password);
      console.log("Logged In:", result.user);

      // Redirect after login
      navigate("/");  
    } catch (error) {
      console.log("Login error:", error.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center font-semibold pt-4">Welcome Back</h3>
      <p className='text-center'>Please Login</p>
    <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
      <fieldset className="fieldset">

        <label className="label">Email</label>
        <input type="email" 
        {...register('email', {required: true} )}
        className="input" placeholder="Email" />
         
         {
          errors.email?.type==='required' && <p className='text-red-500'>
            Email is required.
          </p>
         }


        {/* password */}
        <label className="label">Password</label>
        <input type="password" {...register('password',{
             required: true, 
             minLength: 6 ,
             pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
             })}className="input" placeholder="Password" />
        
        {errors.password?.type==='required' && <p className='text-red-500'> password is required.</p> 
          }
           {errors.password?.type==='minLength' && <p className='text-red-500'> Password must be 6 charactes or longer.</p> }
           {errors.password?.type==='pattern' && <p className='text-red-500'> Password must have 'Pa$$w0rd!'</p> }


        <div>
          <a className="link link-hover">Forgot password?</a>
          </div>
        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
      <p>New to LoanLink  <Link className='text-blue-400 underline' to="/auth/register"> Register</Link> </p>
    </form>
    <SocialLogin></SocialLogin>
  </div>
  )
}

export default Login
