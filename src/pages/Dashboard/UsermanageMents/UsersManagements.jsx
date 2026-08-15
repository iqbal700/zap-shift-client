import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'; 

const UsersManagements = () => {
    const axiosSecure = useAxiosSecure();
    const [searchUser, setSearchUser] = useState('');
    
    // get All users from database
    const { data: users = [], refetch, } = useQuery({
        queryKey: ['users', searchUser],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchUser=${searchUser}`);
            return res.data;
        }
    });

    // 01 mutation for Make Admin / Remove Admin  
    const { mutate: updateRole } = useMutation({
        mutationFn: async ({ userId, newRole }) => {
            const res = await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
            return res.data;
        },
        onSuccess: (data) => {
            if (data.modifiedCount > 0) {
                Swal.fire('Success!', 'User role updated successfully.', 'success');
                refetch();
            }
        },
        onError: (error) => {
            Swal.fire('Error!', error.message, 'error');
        }
    });

    // 02 mutation for delete users
    const { mutate: deleteUser } = useMutation({
        mutationFn: async (userId) => {
            const res = await axiosSecure.delete(`/users/${userId}`);
            return res.data;
        },
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                Swal.fire('Deleted!', 'User has been removed.', 'success');
                refetch();
            }
        }
    });


    // ==-==  Role delete handler mutation 02 ==-== //
    const handleDeleteUser = (userId, name) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to permanently delete ${name}!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(userId);
            }
        });
    };


      // ==-==  Role change handler mutation 01 ==-== //
    const handleRoleChange = (userId, name, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        const actionText = currentRole === 'admin' ? 'remove from Admin' : 'make an Admin';

        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to ${actionText} ${name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        }).then((result) => {
            if (result.isConfirmed) {
                updateRole({ userId, newRole });
            }
        });
    };

    // if (isLoading) {
    //     return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    // }

    return (
        <div className="p-6 bg-base-100 rounded-lg shadow-md m-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
                <span className="badge badge-primary badge-lg font-semibold">Total Users: {users.length}</span>
            </div>


            {/* ==-== users search box ==-==  */}
            <div className="join m-4 border-none">
                <div>
                    <label className="input">
                    <input
                      onChange={(e) => setSearchUser(e.target.value)}
                      type="text"
                      placeholder="search user" 
                      className='border-none' />
                    </label>
                </div>
                <button className="btn btn-neutral ">search</button>
            </div>

            {/* DaisyUI Table Container */}
            <div className="overflow-x-auto w-full rounded-lg border border-base-200">
                <table className="table table-zebra w-full">
                    {/* Table Head */}
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th>#</th>
                            <th>User Info</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th className="text-center">Role Actions</th>
                            <th className="text-center">Remove</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover">
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-10 w-10">
                                                <img src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={user.displayName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800">{user.displayName}</div>
                                            <div className="text-xs text-gray-400">ID: {user._id.slice(-6)}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-medium text-gray-600">{user.email}</td>
                                <td>
                                    <span className={`badge font-semibold uppercase ${
                                        user.role === 'admin' ? 'badge-error text-white' : 
                                        user.role === 'rider' ? 'badge-info text-white' : 'badge-ghost'
                                    }`}>
                                        {user.role || 'user'}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {user.role === 'admin' ? (
                                        <button 
                                            onClick={() => handleRoleChange(user._id, user.displayName, user.role)}
                                            className="btn btn-sm btn-outline btn-warning"
                                        >
                                            Remove Admin
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleRoleChange(user._id, user.displayName, user.role)}
                                            className="btn btn-sm btn-primary text-white"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td className="text-center">
                                    <button 
                                        onClick={() => handleDeleteUser(user._id, user.displayName)}
                                        className="btn btn-sm btn-circle btn-ghost text-red-500 hover:bg-red-50"
                                        title="Delete User"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagements;