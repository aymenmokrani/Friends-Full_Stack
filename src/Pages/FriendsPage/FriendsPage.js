import React, { useEffect, useState } from "react";
import "./friendsPage.scss";
import axios from "axios";
import cookie from "js-cookie";
import { configs } from "../../configs";

function FriendsPage() {
  const [users, setUsers] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const [friends, setFriends] = useState([]);

  const token = cookie.get("token");

  // Add a friend to current user
  const addFriend = async ({ _id, name, email }) => {
    try {
      const friend = { _id, name, email };
      const response = await axios.post(`${configs.SERVER_URI}/api/addfriend`, {
        token,
        friend,
      });
      if (response.data !== "") {
        setFriends([...friends, friend]);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  // Remove a friend form current user friends

  const removeFriend = async ({ _id, email }) => {
    try {
      const friend = { _id };
      const response = await axios.post(
        `${configs.SERVER_URI}/api/removeFriend`,
        { token, friend }
      );
      if (response.dat !== "") {
        const removedFriend = friends.filter((e) => e.email !== email);
        setFriends([...removedFriend]);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  // Get Users List

  const getallUsers = async (friends) => {
    try {
      const users = await axios.get(`${configs.SERVER_URI}/api/allusers`);
      setUsers(users.data);
      const friendslist = users.data.filter((el) => friends.includes(el._id));

      setFriends(friendslist);
    } catch (error) {
      return error.response;
    }
  };

  useEffect(() => {
    let isActive = true;
    // check auth and get current user infos
    try {
      axios
        .post(`${configs.SERVER_URI}/api/user`, { token })
        .then((response) => {
          const results = response.data;

          if (isActive) {
            setUserEmail(results.user.name);
            getallUsers(results.user.friends);
          }
        });
    } catch (error) {
      console.log(error.response);
    }

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="friendsPage">
      <div className="container">
        <div className="users">
          <h3>Users</h3>
          <div className="usersList">
            {users.map(
              (item, idx) =>
                item.email !== userEmail && (
                  <span
                    key={idx}
                    className={
                      friends.map((it) => it._id).includes(item._id)
                        ? "disabled"
                        : ""
                    }
                    onClick={() => addFriend(item)}
                  >
                    {item.name}
                  </span>
                )
            )}
          </div>
        </div>
        <div className="divider"></div>
        <div className="friends">
          <h3>Friends</h3>
          <div className="usersList">
            {friends.map((item) => (
              <span
                key={Math.random()}
                onClick={() => {
                  removeFriend(item);
                }}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendsPage;
