import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Modal from './Modal';
function EditUser() {
    const { id } = useParams();;
    const [ffName, setFfName] = useState("");
    const [bio, setBio] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inGameRole, setInGameRole] = useState("");
    const [role, setRole] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [tournamentsPlayed, setTournamentsPlayed] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const updatedUser = {
            ffName,
            inGameRole,
            role,
            isVerified,
            bio,
            teamName,
            tournamentsPlayed,
        };

        try {
            const response = await fetch(`https://nice-jade-cocoon-gear.cyclic.app/api/admin/updateProfile/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(updatedUser)
            });

            const data = await response.json();
            console.log(data);
            if (data.mssg === 'Profile updated successfully!') {
                setIsModalVisible(true)
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://nice-jade-cocoon-gear.cyclic.app/api/profile/${id}`, {
                    headers: {
                        'Authorization': token
                    }
                });
                const data = await response.json();
                setFfName(data.ffName);
                setBio(data.bio);
                setInGameRole(data.inGameRole);
                setRole(data.role);
                setIsVerified(data.isVerified);
                setTeamName(data.teamName);
                setTournamentsPlayed(data.tournamentsPlayed);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);
    const closeModalAndRedirect = () => {
        setIsModalVisible(false);
        navigate("/adminPanel"); // Redirect to the admin panel
    }
    return (
        <div className="bg-black text-white p-8 rounded-md shadow-lg max-w-xl mx-auto mt-10">
            <h1 className="text-4xl text-center mb-4">Edit Profile</h1>
            <div className="mb-4 bg-gray-700 p-4 rounded">
                <h2 className="text-xl mb-2">User Details:</h2>
                <p><strong>FF Name:</strong> {ffName}</p>
                <p><strong>Bio:</strong> {bio}</p>
                <p><strong>Team Name:</strong> {teamName}</p>
                <p><strong>Tournaments Played:</strong> {tournamentsPlayed}</p>
                <p><strong>In-Game Role:</strong> {inGameRole}</p>
                <p><strong>Role:</strong> {role}</p>
                <p><strong>Verified:</strong> {isVerified ? 'Yes' : 'No'}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">FF Name:</label>
                    <input value={ffName} onChange={(e) => setFfName(e.target.value)} className="w-full px-3 py-2 bg-gray-800 rounded text-white border border-gray-600 focus:border-gray-400 focus:outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Bio:</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-3 py-2 bg-gray-800 rounded text-white border border-gray-600 focus:border-gray-400 focus:outline-none h-32 resize-none"></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium">Team Name:</label>
                    <input value={teamName} onChange={(e) => setTeamName(e.target.value)} className="w-full px-3 py-2 bg-gray-800 rounded text-white border border-gray-600 focus:border-gray-400 focus:outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Tournaments Played:</label>
                    <input type="number" value={tournamentsPlayed} onChange={(e) => setTournamentsPlayed(e.target.value)} className="w-full px-3 py-2 bg-gray-800 rounded text-white border border-gray-600 focus:border-gray-400 focus:outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-medium">In-Game Role:</label>
                    <select value={inGameRole} onChange={(e) => setInGameRole(e.target.value)} className="w-full px-3 py-2 bg-gray-800 rounded text-white border border-gray-600 focus:border-gray-400 focus:outline-none">
                        <option value="">Add a role</option>
                        <option value="Sniper">Sniper</option>
                        <option value="IGL">IGL</option>
                        <option value="Rusher">Rusher</option>
                        <option value="Nader">Nader</option>
                        <option value="Assaulter">Assaulter</option>
                        <option value="Camper">Camper</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 bg-gray-800 rounded text-white border border-gray-600 focus:border-gray-400 focus:outline-none">
                        <option value="user">User</option>
                        <option value="guild">Guild</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Verified:</label>
                    <select value={isVerified} onChange={(e) => setIsVerified(e.target.value)} className="w-full px-3 py-2 bg-gray-800 rounded text-white border border-gray-600 focus:border-gray-400 focus:outline-none">
                        <option value={true}>Verified</option>
                        <option value={false}>Not Verified</option>
                    </select>
                </div>

                <button type="submit" className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded text-white focus:outline-none mx-auto block">Update Profile</button>

            </form>
            <Modal
                title="Confirmation"
                content="Profile Updated Successfully."
                showModal={isModalVisible}
                setShowModal={closeModalAndRedirect}
            />
        </div>
    );
}

export default EditUser;
