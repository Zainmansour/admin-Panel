import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
function Logout() {
    let redirectTo=useNavigate()
    useEffect(()=>{
        localStorage.clear()
        redirectTo('/auth/login')
    },[])
    return <div>
        <h1>Done!</h1>
    </div>
}

export default Logout