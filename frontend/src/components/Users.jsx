import { User } from "./User";

export function Users() {
    
  return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"/>
        </div>
        <div>
             <User user={{firstname:'hari',lastname:'tom',_id:'0'}} />
        </div>
    </>
}