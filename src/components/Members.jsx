import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Members = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [total,setTotal]  = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const limit = window.innerWidth <= 640 ? 10 : 12;
                const url = new URL('https://nice-jade-cocoon-gear.cyclic.app/api/users');
                const params = {
                    limit,
                    skip: (currentPage - 1) * limit,
                };

                if (searchTerm) {
                    params.searchTerm = searchTerm;
                }
                
                if (positionFilter) params.role = positionFilter;
                if (roleFilter) params.inGameRole = roleFilter;

                url.search = new URLSearchParams(params).toString();
                const response = await fetch(url);
                console.log(url.toString());
                const data = await response.json();
                setUsers(data.data);
                setTotal(data.total);
                setTotalPages(Math.ceil(data.total / data.limit));
            } catch (error) {
                console.error("Error fetching users data:", error);
            }
        };
    
        fetchUsers();
    }, [searchTerm, positionFilter, roleFilter, currentPage]);
    
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };   
    return (
        <div className="p-4">
<h2 className="text-white text-xl font-semibold mb-4 text-center">Total Members : {total}</h2>

            <div className="mb-4 flex flex-col sm:flex-row">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2 sm:mb-0 sm:mr-2 p-2 border rounded w-full"
                />
                <div className="flex w-full sm:w-auto">
                    <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)} className="mr-2 p-2 border rounded w-1/2">
                        <option value="">All Positions</option>
                        <option value="user">User</option>
                        <option value="guild">Guild</option>
                        <option value="admin">Admin</option>
                    </select>
                    <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="p-2 border rounded w-1/2">
                        <option value="">All Roles</option>
                        <option value="IGL">IGL</option>
                        <option value="Sniper">Sniper</option>
                        <option value="Assaulter">Assaulter</option>
                        <option value="Rusher">Rusher</option>
                        <option value="Nader">Nader</option>
                        <option value="Camper">Camper</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {users.map(user => (
                    <div key={user._id} className="p-4 border rounded shadow flex flex-col justify-between items-center">
                        <img src={user.profilePicURL || "path/to/default/avatar.png"} alt="Profile" className="rounded-full w-24 h-24 object-cover mb-4" />
                       <h1 className='naming'>{user.name}</h1>
                        <div className="flex-grow flex justify-between items-center w-full px-2">
                            <h2 className="text-white">{user.ffName}</h2>
                            <p className="text-white">{user.position}</p>
                        </div>
                        <Link to={`/profile/${user._id}`} className="text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2 mt-4">
                            View Profile
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 space-x-4">
    <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
    </button>
    <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
    <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
    </button>
</div>

        </div>
    );
};

export default Members;
