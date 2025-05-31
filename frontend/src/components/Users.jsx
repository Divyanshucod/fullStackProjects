import { useEffect, useState } from "react";
import { User } from "./User";
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {toast} from 'react-toastify'


export function Users() {
    const [searchUser,setSearchUser] = useState('')
    const [users,setUsers] = useState([{
        firstname:'Random',
        lastname:'random2',
        _id:'someid'
    }]);

    const [cookies,] = useCookies(['auth_token'])
    useEffect(()=>{
         async function fetchUsers(){
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchUser}`,{headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.auth_token}`
      }})
      setUsers(response.data.users);
      } catch (error) {
          toast.error(error.response.data.message)
      }
    }
    fetchUsers();
    },[searchUser])
  return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" onChange={(e)=> setSearchUser(e.target.value)}/>
        </div>
        <div>
             {users.map((user) => <User key={user._id} user={user} />)}
        </div>
    </>
}