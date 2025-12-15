import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
const Register = () => {
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

const handleRegistration = async (data) => {
  try {
    const result = await registerUser(data.email, data.password);
    const loggedUser = result.user;

    await updateUserProfile(data.name, data.photoURL);


    const saveUser = {
      name: data.name,
      email: data.email,
      role: data.role,
      photo: data.photoURL,
    };


    const res = await axios.post(
      "http://localhost:5000/users",
      saveUser
    );

    console.log("Auth User:", loggedUser);
    console.log("Saved User:", res.data);

    toast.success("Registration successful!");
    navigate("/");
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};

  return (
    <div>
       <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
       <div className="card-body">
      <form onSubmit={handleSubmit(handleRegistration)} >
     
      <h3 className="text-3xl text-center font-semibold pt-4">Welcome To LoanLink</h3>
      <p className='text-center'>Please Register</p>
      <fieldset className="fieldset">
           
      <label className="label">Name</label>
          <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
          {errors.name?.type==='required' && <p className='text-red-500'> Name is required. </p> }

          <label className="label">Email</label>
          <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
          {errors.email?.type==='required' && <p className='text-red-500'> Email is required. </p> }

          <label className="label">Photo URL</label>
          <input type="text" {...register('photoURL')} className="input" placeholder="Photo URL" />

          <label className="label">Role</label>
          <select {...register('role')} className="input">
            <option value="borrower">Borrower</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
         
          <label className="label">Password</label>
          <input type="password" {...register('password',{
             required: true, 
             minLength: 6,
             pattern:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
          })} className="input" placeholder="Password" />
          {errors.password?.type==='required' && <p className='text-red-500'> Password is required.</p> }
          {errors.password?.type==='minLength' && <p className='text-red-500'> Password must be 6 characters or longer.</p> }
          {errors.password?.type==='pattern' && <p className='text-red-500'> Password must contain uppercase and lowercase letters.</p> }

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>Already have an account <Link className='text-blue-400 underline' to="/auth/login">Login</Link> </p>
       
      </form>
      <SocialLogin />
      </div>
        </div>
    </div>
  )
}

export default Register
