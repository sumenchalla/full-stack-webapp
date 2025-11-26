import React, { useState } from 'react'
import { WiSnow } from 'react-icons/wi';

const UserManagement = () => {
    const users =[
        {
            _id:1213,
            name : "Jhon doe",
            email:"jhon@example.com",
            role:"admin",
        },
    ]
    const [formData,setFormData] = useState(
        {
            name:"",
            email:"",
            password:"",
            role:"customer", //Defalut role
        }
    );

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value 
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(formData)
        //Resetting the form after submission
        setFormData({
            name:"",
            email:"",
            password:"",
            role:"customer"
        })
    }

    const handleRoleChange = (userId,newRole)=>{
        console.log({id:userId,Role:newRole});
    }

    const handleDeleteUser = (userId)=>{
        if(window.confirm("Are you sure about deleting this user?")){
            console.log("Dleteing the user with id :",userId);
        }
    }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className="text-2xl font-medium mb-4">User Management</h2>
            {/* Add new user form  */}
            <div className="p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold mb-4">Add new user</h3>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-4 ">
                        <label htmlFor="" className='block text-gray-700'>Name</label>
                        <input type="text" name='name' value={formData.name}
                         onChange={handleChange} 
                         className='w-full p-2 border rounded'
                         required
                         placeholder='Enter customer name Ex : Jhon Doe'/>
                    </div>
                    <div className="mb-4 ">
                        <label htmlFor="" className='block text-gray-700'>Email</label>
                        <input type="email" name='email' value={formData.email}
                         onChange={handleChange} 
                         className='w-full p-2 border rounded'
                         required/>
                    </div>
                    <div className="mb-4 ">
                        <label htmlFor="" className='block text-gray-700'>Password</label>
                        <input type="password" name='password' value={formData.password}
                         onChange={handleChange} 
                         className='w-full p-2 border rounded'
                         required/>
                    </div>
                    <div className="mb-4 ">
                        <label htmlFor="" className='block text-gray-700'>Role</label>
                        <select name="role" value={formData.role} id="" onChange={handleChange} 
                        className='w-full p-2 border rounded'>
                            <option value="customer">Customer</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    {/* <div className="mb-4 flex gap-x-2 items-center">
                        <label htmlFor="" className='block text-gray-700'>Name</label>
                        <input type="text" name='name' value={formData.name}
                         onChange={handleChange} 
                         className='w-full p-2 border rounded'
                         required/>
                    </div> */}
                    <button type='submit'
                    className='bg-green-500 text-white rounded py-2 px-4 hover:bg-green-600'>Add User</button>
                </form>
            </div>

            {/* Users list management */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-sm uppercase text-gray-700'>
                        <tr>
                            <th className="py-3 px-3">Name</th>
                            <th className="py-3 px-3">Email</th>
                            <th className="py-3 px-3">Role</th>
                            <th className="py-3 px-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                            <tr key = {user._id} className='border-b hover:bg-gray-50 '>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{user.name}</td>
                                <td className='p-4 '>{user.email}</td>
                                <td className='p-4 '>
                                    <select name="" id="" value={user.role} 
                                    onChange={(e)=>handleRoleChange(user._id,e.target.value)}
                                    className='p-2 border rounded'>
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select></td>
                                <td className='p-4'>
                                    <button onClick={()=>handleDeleteUser(user._id)} 
                                    className=' bg-red-500 text-white rounded-lg text-center py-2 px-4'>
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default UserManagement