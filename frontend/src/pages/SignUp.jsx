import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [firstname,setFirstName] = useState("")
  const [lastname,setLastName] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const navigate = useNavigate()
  async function handleCreateUser(){
     try {
       const response = await axios.post('http://localhost:3000/api/v1/user/signup',{firstname,lastname,email,password});
       toast.success(response.data.message)
      //  navigate('/signin')
     } catch (error) {
        
        return toast.error(error.response.data.message)
     }
  }
  return <div className="bg-slate-300 h-screen flex justify-center">
     <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center h-max px-4 p-2">
        <Heading label={"Sign up"}/>
        <SubHeading label={"Enter your infromation to create an account"} />
         <InputBox placeholder="John" label={"First Name"} onChange={(e)=>setFirstName(e.target.value)}/>
        <InputBox placeholder="Doe" label={"Last Name"} onChange={(e)=>setLastName(e.target.value)}/>
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} onChange={(e)=>setEmail(e.target.value)}/>
        <InputBox placeholder="123456" label={"Password"} onChange={(e)=>setPassword(e.target.value)}/>
        <div className="pt-4">
          <Button label={"Sign up"} onClick={handleCreateUser}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
     </div>
  </div>
}