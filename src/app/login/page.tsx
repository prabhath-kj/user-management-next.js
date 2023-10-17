"use client"


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
  try {
    const response=await(await fetch("http://localhost:3000/api/user/login",{method:"POST",body:JSON.stringify(formData)})).json()
       if(response?.success){
        router.push("/")
        toast.success(response?.message,{duration:2000,position:'top-right'});
        return
        }  
        toast.success(response?.error,{duration:2000,position:'top-right'});
  } catch (error) {
    toast.success('Something went wrong',{duration:2000,position:'top-right'});
  }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="font-bold text-2xl mb-4 text-black text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 "
          >
            Login
          </button>
        </form>
        <Link className="text-black font-medium " href={"/signup"}>
          <div className='text-center w-full'>
          signup
          </div>
        </Link>
      </div>
    </div>
  );
}
