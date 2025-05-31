import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {toast} from 'react-toastify'
export function DashBoard() {
  const [amount,setAmount] = useState(0)
  const [cookies,] = useCookies(['auth_token'])
  useEffect(()=>{
    async function fetchBalance(){
      try {
        const response = await axios.get('http://localhost:3000/api/v1/account/balance',{headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.auth_token}`
      }})
      setAmount(response.data.balance);
      } catch (error) {
          toast.error(error.response.data.message)
      }
    }
    fetchBalance();
  },[])
  return <div>
    <AppBar/>
    <div className="m-8">
       <Balance value={amount}/>
       <Users/>
    </div>
  </div>
}