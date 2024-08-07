import React from "react";

function Card(props) {
  return (
    <>
      <div>
        <img
          src={props.img}
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      </div>

      <div className="detail">
        <p>
          Name: <span>{props.name}</span>
        </p>
        <p>
          Username: <span> {props.username}</span>
        </p>
        <p>
          Bio: <span>{props.bio}</span>
        </p>
        <p>
          Following: <span>{props.following}</span>
        </p>
        <p>
          Followers: <span>{props.followers}</span>
        </p>
        <p>
          Public-repo: <span>{props.publicRepo}</span>
        </p>
        <p>
          Location:
          <span>{props.location == null ? "NA" : props.location}</span>
        </p>
      </div>
    </>
  );
}

export default Card;
