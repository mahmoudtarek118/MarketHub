import React, { useState } from "react";

function Profile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/profile", {
        // Updated URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch profile");
      }

      const data = await response.json();
      setProfileData(data);
      setEditedProfile(data); // Initialize editing data
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEditChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    // Here you'll add the logic to send a PUT request to update the profile
    // using the editedProfile data.
    console.log("Edited profile:", editedProfile);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/profile", {
        // Updated URL
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedProfile),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update profile");
      }

      // Update the profileData with the successful response
      setProfileData(editedProfile);
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (profileData) {
    return (
      <div>
        <h2>Profile</h2>
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={editedProfile.username}
                onChange={(e) => handleEditChange("username", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={editedProfile.email}
                onChange={(e) => handleEditChange("email", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={editedProfile.password}
                onChange={(e) => handleEditChange("password", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={editedProfile.address}
                onChange={(e) => handleEditChange("address", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                value={editedProfile.phone_number}
                onChange={(e) =>
                  handleEditChange("phone_number", e.target.value)
                }
              />
            </div>
            {/* Add other fields similarly */}
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p>ID: {profileData.id}</p>
            <p>Username: {profileData.username}</p>
            <p>Email: {profileData.email}</p>
            <p>Password: {profileData.password}</p>
            <p>Address: {profileData.address}</p>
            <p>Phone Number: {profileData.phone_number}</p>
            <p>Role: {profileData.role}</p>
            {/* Add more fields as needed */}
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Login to View Profile</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">View Profile</button>
      </form>
    </div>
  );
}

export default Profile;