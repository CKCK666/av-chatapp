import React,{useState,useEffect} from 'react'
import Logo from "../assets/logo.svg";
import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import {  loginRoute } from '../utilis/apiRoutes';
const {REACT_APP_CHAT_APP} =process.env

const Login = () => {
  const navigate=useNavigate()
  useEffect( () => {
    if (localStorage.getItem(REACT_APP_CHAT_APP)){
      navigate("/")
    }
      
  }, [navigate]);

    const toastOptions = {
        position: "top-center",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      const [values,setValues]=useState({
        username:"",
       
        password:"",
        
      })
      //validate handle
      const handleValidation=()=>{
       
        const {username,password}=values
        
        if (username.length === 0 || password.length === 0) {
        
          toast.error(
            "Fill all fields.",
            toastOptions
          );
          
          return false;
        } 
        return true

      }
      //submit handler
    const handleSubmit= async (event)=>{
      event.preventDefault()
     
      if( handleValidation()){
        const {username,password}=values
        const {data} =await axios.post(loginRoute,{
            username,password

        })
        
        if(data.status === false){
          toast.error(data.mgs,toastOptions)
        }
        if(data.status === true){
       
          toast.success("login successfully",toastOptions)
          localStorage.setItem(REACT_APP_CHAT_APP,JSON.stringify(data.user))
            navigate("/")
        }
      }
   
    }
    //change handler
    const handleChange=(event)=>{
       setValues({...values,[event.target.name]:event.target.value})
    }
  
  return (
    <>
             <FormContainer>
             <h1>LOGIN</h1>
        <form action="" onSubmit={ handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Random</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
        
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
         
          <button type="submit">LOGIN</button>
          <span>
            Create new account ? <Link to="/register">Register.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  color:white;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login