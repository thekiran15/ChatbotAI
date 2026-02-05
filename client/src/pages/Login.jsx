import React, { useState } from 'react'

const Login = () => {

  // toggle state
  const [isSignup, setIsSignup] = useState(false)

  // form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    // PAGE BACKGROUND = WHITE
    <div className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden">

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black p-8 rounded-xl shadow-xl border border-gray-800"
      >

        {/* TITLE */}
        <h2 className="text-3xl font-semibold text-center text-white">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <p className="text-center text-sm text-gray-400 mt-2">
          {isSignup ? "Create your account" : "Sign in to continue"}
        </p>

        {/* NAME (ONLY SIGNUP) */}
        {isSignup && (
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full px-4 py-3 rounded-md bg-[#121212] text-white border border-gray-700 outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        )}

        {/* EMAIL */}
        <div className={isSignup ? "mt-6" : "mt-8"}>
          <label className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-2 w-full px-4 py-3 rounded-md bg-[#121212] text-white border border-gray-700 outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* PASSWORD */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-2 w-full px-4 py-3 rounded-md bg-[#121212] text-white border border-gray-700 outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full mt-8 py-3 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

        {/* TOGGLE TEXT */}
        <p className="text-center text-sm text-gray-400 mt-6">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-purple-500 ml-1 hover:underline"
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>

      </form>
    </div>
  )
}

export default Login
