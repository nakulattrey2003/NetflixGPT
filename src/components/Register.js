import React from 'react'
import Header from './Header';

const Register = () => {
  return (
    <div>
      <Header />
      {/* <div className="absolute">
        <img
          //   src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
          src="https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg"
          alt="bg-image"
        ></img>
      </div> */}

      <div className="absolute h-screen w-screen">
        <div className="absolute inset-0">
          <img
            src="https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg"
            alt="bg-image"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
      </div>

      <form className="absolute p-12 m-12 d-flex bg-black w-4/12 my-40 mx-auto right-0 left-0 text-white bg-opacity-70">
        <h1 className="mb-6 text-3xl font-bold">Register</h1>
        <input
          type="text"
          placeholder="Name"
          className="bg-black rounded-md border border-slate-600 p-3 m-2 w-full"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="bg-black rounded-md border border-slate-600 p-3 m-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-black rounded-md border border-slate-600 p-3 m-2 w-full"
        />
        <button className="p-2 m-2 mt-6 w-full font-semibold rounded-md bg-red-600">
          Register
        </button>

        <p className="text-gray-400 mt-3 ml-2">
          Already have an Account?{" "}
          <a href="/login" className="text-white">
            Sign In now.
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register