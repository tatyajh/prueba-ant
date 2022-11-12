import React, {useState, useEffect } from "react";

const ListCustomers = () => {
    
    const url = 'https://jsonplaceholder.typicode.com/users'
    const [users, setUsers] = useState()
    const fetchApi = async () => {
        const response = await fetch(url)
        console.log(response.status)
        const responseJSON = await response.json()
        setUsers(responseJSON)
       
    }
    useEffect(() => {
        fetchApi()
    }, [])

    return(
       <div>
        Listado de clientes
        <ul>
            { !users ? 'Cargando...' :
                users.map((user,index)=>{
                    return <li key={index}>{user.name}</li>
                })
            }
        </ul>
       </div>
    );

}

export default ListCustomers; 