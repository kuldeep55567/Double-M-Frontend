import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import MultiSelect from './Select';

function CompleteProfile() {
  const [ffName, setFFName] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [instagramURL, setInstagramURL] = useState('');
  const [discordTag, setDiscordTag] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [favGuns, setFavGuns] = useState([]);
  const gunOptions = [
    "AK",
    "M4A1",
    "Scar",
    "AWM",
    "Kar98k",
    "M1873",
    "M14",
    "SKS",
    "MP40",
    "UMP",
    "P90",
    "VSS",
    "XM8",
    "M1014",
    "SPAS12",
    "SVD",
    "Woodpecker",
    "G18",
    "Desert Eagle",
    "PARAFAL",
    "FAMAS",
    "Groza"
  ];

  const [otherGames, setOtherGames] = useState([]);
  const gameOptions = ["Call of Duty", "Clash of Clans", "BGMI", "PUBG New State"]; // Add other game options

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }
    setSelectedImage(file);
    // Create a local URL for preview
    const localImageUrl = URL.createObjectURL(file);
    console.log("Local Image URL:", localImageUrl);
    setAvatar(localImageUrl);
  };

  const handleCloudinaryUpload = async (file) => {
    const url = "https://api.cloudinary.com/v1_1/dlxmt54fo/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "double-m");

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data && response.data.secure_url) {
        return response.data.secure_url;
      }
      throw new Error("Failed to upload image.");
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    };
  }
  const token = localStorage.getItem('token');
  const handleProfileUpdate = async () => {
    try {
      let uploadedImageUrl = null;
      if (selectedImage) {
        uploadedImageUrl = await handleCloudinaryUpload(selectedImage);
        if (!uploadedImageUrl) {
          throw new Error("Image upload to Cloudinary failed.");
        }
      }
  
      const formData = new FormData();
      formData.append('ffName', ffName);
      formData.append('bio', bio);
      formData.append('inGameRole', role);
      formData.append('otherGames', otherGames.join(','));
      formData.append('favGuns', favGuns.join(','));
      formData.append('instagramURL', instagramURL);
      formData.append('discordTag', discordTag);
  
      if (uploadedImageUrl) {
        formData.append('profilePicURL', uploadedImageUrl);  // Send the Cloudinary URL instead of the image file
      }
  
      const response = await axios.post(
        `https://nice-jade-cocoon-gear.cyclic.app//api/updateProfile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        setShowSuccessModal(true);
        console.log(response.data.mssg);
      } else {
        toast.error('Profile update failed.');
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  



  const removeAvatar = () => {
    setAvatar(null);
  };

  return (
    <div className="bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Complete Your Profile</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-primary py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="flex justify-center">
              {avatar ? (
                <>
                  <img
                    src={avatar}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-full border-2 border-gray-400"
                  />
                </>
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-white">
                  {ffName && ffName.length > 0 ? ffName[0].toUpperCase() : 'A'}
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-center items-center">
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded" onClick={() => console.log("Clicked on label!")}>
                Upload Profile Pic
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    console.log("File input change triggered!");
                    handleFileInputChange(e);
                  }}
                />
              </label>
              {avatar && (
                <button onClick={removeAvatar} className="ml-4 bg-red-600 text-white px-4 py-2 rounded">
                  Remove
                </button>
              )}
            </div>
            <div>
              <label htmlFor="ffName" className="block text-sm font-medium text-white">
                FF Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="ffName"
                  value={ffName}
                  onChange={(e) => setFFName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-white">
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  name="bio"
                  rows="4"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-white">
                Role
              </label>
              <div className="mt-1">
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>Select a Role</option>
                  <option value="Sniper">Sniper</option>
                  <option value="IGL">IGL</option>
                  <option value="Rusher">Rusher</option>
                  <option value="Nader">Nader</option>
                  <option value="Nader">Assaulter</option>
                  <option value="Camper">Camper</option>
                </select>
              </div>
            </div>
            <div className="mt-1">
              <label className="block text-sm font-medium text-white">
                Favorite Guns
              </label>
              <div className="scrollableMultiSelect">
                <MultiSelect options={gunOptions} selected={favGuns} setSelected={setFavGuns} />
              </div>
            </div>
            <div className="mt-1">
              <label className="block text-sm font-medium text-white">
                Other Games
              </label>
              <div className="scrollableMultiSelect">
                <MultiSelect options={gameOptions} selected={otherGames} setSelected={setOtherGames} />
              </div>
            </div>
            <div>
              <label htmlFor="instagramURL" className="block text-sm font-medium text-white">
                Instagram URL
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  name="instagramURL"
                  value={instagramURL}
                  onChange={(e) => setInstagramURL(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="discordTag" className="block text-sm font-medium text-white">
                Discord Tag
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="discordTag"
                  value={discordTag}
                  onChange={(e) => setDiscordTag(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleProfileUpdate}
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Profile Update"
        content="Your profile has been updated successfully."
        showModal={showSuccessModal}
        setShowModal={setShowSuccessModal}
        allowCancel={true}
      />
    </div>
  );
}
export default CompleteProfile;
