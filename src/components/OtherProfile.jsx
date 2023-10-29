import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"; // Import useParams
import { instagram } from "../assets";
import Button from './Button';
const OtherProfile = () => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams(); 
console.log(userId);
  useEffect(() => {
    if (userId) {
      fetch(`https://nice-jade-cocoon-gear.cyclic.app/api/profile/${userId}`) 
        .then(response => response.json())
        .then(data => {
          console.log('Fetched user data:', data);
          setUserData(data);
        })
        .catch(error => console.error("Error fetching user data:", error));
    }
  }, [userId]);

  if (!userId) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="pt-20 flex flex-col items-center">
          <h1 className="text-5xl mb-4">User not found</h1>
        </div>
      </div>
    );
  }

  if (!userData) {
    console.log('User data is null. Loading...');
    return <div className="bg-black text-white p-4">Loading...</div>;
  }

  console.log('Rendering user data:', userData);
  return (
    <div className="container mx-auto p-6 md:p-12 bg-black text-white">
      <div className="text-center mb-4">
        <Link to="/completeProfile">
          <Button label='Complete Your Profile' styles="mx-auto" />
        </Link>
      </div>
      <div id='container'>
        <div className='cont2'>
          <img src={userData.profilePicURL || "path/to/default/avatar.png"} alt="Profile" className="rounded-full w-2/4 mx-auto my-4" />
          <h1 id='h1'>Name - {userData.name}</h1>
          <h2>Email - {userData.email}</h2>
          <Link to={userData.instagramURL} target='_blank'>
            <button>Instagram</button>
          </Link>
          <h2>Discord Tag - {userData.discordTag}</h2>
          <div className="mt-8" id='pos'>
            <h2 className="text-center mb-4">Other Games</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border p-2">Game</th>
                </tr>
              </thead>
              <tbody>
                {userData.otherGames && userData.otherGames.map((game, index) => (
                  <tr key={index}>
                    <td className="border p-2">{game}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
        <div className='cont1'>
          <img src="https://media.tenor.com/uTGE6zSoSs8AAAAC/future-gaming.gif" alt="Profile" className="rounded-full w-2/2 mx-auto my-4" />
          <h1>Gaming Name - {userData.ffName}</h1>
          <h1>Guild - {userData.role}</h1>
          <h1>Postion - {userData.position}</h1>
          <h1>Role - {userData.inGameRole}</h1>
          <h1>Team Name - {userData.teamName}</h1>
          <h1>Tournaments Played - {userData.tournamentsPlayed}</h1>
          <div className="mt-8">
            <h1 className="text-center mb-4">Favorite Guns</h1>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border p-2">Gun</th>
                </tr>
              </thead>
              <tbody>
                {userData.favGuns && userData.favGuns.map((gun, index) => (
                  <tr key={index}>
                    <td className="border p-2">{gun}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
        <div id="bio">
          <h1>About Me</h1>
          <p>{userData.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
