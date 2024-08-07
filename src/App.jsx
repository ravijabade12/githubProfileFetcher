import React, { useState } from "react";
import Card from "./Card";
import Navbar from "./Components/Navbar";

import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);

  const [repos, setRepos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }

  async function getProfile() {
    setIsLoading(true); // Start loading
    const url = `https://api.github.com/users/${username}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      if (json.name === null) {
        alert("Invalid username");
      } else {
        setProfile(json);
        const reposUrl = `https://api.github.com/users/${username}/repos`;
        const reposResponse = await fetch(reposUrl);
        if (!reposResponse.ok) {
          throw new Error(`Response status: ${reposResponse.status}`);
        }
        let reposJson = await reposResponse.json();

        // Sort repositories by creation date in descending order
        reposJson.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setRepos(reposJson);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false); // End loading regardless of success or failure
    }
  }

  return (
    <div>
      <Navbar />

      <div className="container">
        <div>
          <form className="form" onSubmit={handleSubmit} action="">
            <input
              type="text"
              placeholder="Enter GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={() => {
                getProfile();
                setUsername("");
              }}
            >
              Get Profile
            </button>
          </form>
        </div>

        {isLoading ? (
          <div className="loading">Loading...</div> // Customize this as needed
        ) : (
          <div className="card">
            {profile && (
              <Card
                name={profile.name}
                img={profile.avatar_url}
                followers={profile.followers}
                following={profile.following}
                publicRepo={profile.public_repos}
                username={profile.login}
                bio={profile.bio}
                location={profile.location}
              />
            )}

            {repos.length > 0 && (
              <div className="repos">
                <h3>Recent Repositories</h3>
                <ul>
                  {repos.slice(0, 5).map((repo, index) => (
                    <li key={index}>{repo.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
