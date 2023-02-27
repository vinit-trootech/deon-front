import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { Link } from "react-router-dom";

const UserInfo = () => {

  const dispatch = useDispatch();
  const id = localStorage.getItem('user_id')
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <Link className="text-black" to={`/profile/${id}`}>
        <li>My Profile</li>
      </Link>
      <Link className="text-black" to={`/change-password/${id}`}>
        <li>ChangePassword</li>
      </Link>
      <Link className="text-black">
        <li onClick={() => dispatch(userSignOut())}>Logout
        </li>
      </Link>
    </ul>
  );

  return (
    <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions} trigger="click">
      <Avatar src={"https://via.placeholder.com/150"} className="gx-avatar gx-pointer" alt="" />
    </Popover>
  );
};

export default UserInfo;
