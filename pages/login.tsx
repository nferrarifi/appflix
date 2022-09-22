import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {useForm} from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import Link from 'next/link'

interface Inputs {
  email: string
  password: string
}

const login = () => {
    const { signIn, signUp } = useAuth()
    const [Login, setLogin] = useState(Boolean)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit = async ({email, password}) => {
      if (Login) {
        await signIn (email,password)
      }
      else {
        await  signUp (email,password)
      }
    }


  return (
    <div className="relative flex h-screen w-screen flex-col bg:black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Login - Appflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image 
        src="https://rb.gy/p2hphi"
        layout='fill'
        className=' -z-10 !hidden opacity-60 sm:!inline' 
        objectFit='cover'
       />

       <Link href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="logo" width={100} height={100} className={"absolute left-4 top-4 md:left-10   md:top-6        cursor-pointer object-contain"} />
        </Link>

       <form onSubmit={handleSubmit(onSubmit)}  className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
            <h1 className="text-xl font-semibold">Sign in</h1>

            <div className='space-y-4'>
                <label className="inline-block w-full">
                    Email
                    <input {...register('email', {required: true})} type="email" placeholder='Email' className='input'></input>
                    {errors.email && <p className=' text-sm text-orange-500 p-1'>Please enter a valid email</p>}
                </label>
                <label className=' inline-block w-full'>
                    Password
                    <input {...register('password', {required: true})} type="password" placeholder='Password' className='input'></input>
                    {errors.password && <p className='text-sm text-orange-500 p-1'>Please enter a valid password</p>}
                </label>
            </div>


            <button type="submit" className="w-full rounded bg-[#e50914] py-3 font-semibold" onClick={() => setLogin (true)}>Sign in</button>

            <div className=' text-gray-500'>
                New to Netflix? {" "}
                <button type="submit" className="text-white hover:underline" onClick={() => setLogin (false)}>Sign up now</button>
            </div>
       </form>

    </div>
  )
}

export default login