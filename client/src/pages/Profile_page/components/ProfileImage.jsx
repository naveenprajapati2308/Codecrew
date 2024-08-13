import React, { useContext, useEffect, useState } from "react";

import Badge from "@mui/material/Badge";
import { Pen } from "react-bootstrap-icons";

import UserContext from "../../../context/UserContext";

import ScaleLoader from "react-spinners/ScaleLoader";

export default function ProfileImage({ userProfileData , setUserProfileData}) {
  const [imageUpdateLoading, setImageUpdateLoading] = useState(false);
  const { editUser, user } = useContext(UserContext);

  //   async function editProfileImage() {
  //     document.getElementById('profile-image-input').click()
  //     console.log(files[0]);
  //   }

  //use Effect does not run when re-render, and we do not want the whole page to load
  //therefore simply chane state variable from here only/
  //image object sended from backend is used to update state
  async function editProfileImage(ev) {
    try {
      setImageUpdateLoading((prev) => true);

      if (!ev.target.files[0]) return;

      const data = {
        image: ev.target.files[0],
      };
      const response = await editUser(data);

      setUserProfileData(prev=>{
        prev.image = response.image;
        return prev
      })
    } catch (error) {
        alert(error.message)
    } finally {
      setImageUpdateLoading((prev) => false);
    }
  }

  if (imageUpdateLoading) {
    return (
      <div className="tw-mb-4 tw-h-32 tw-w-32 tw-rounded-full tw-flex tw-items-center">
        <ScaleLoader
          className="tw-mx-auto"
          color={"grey"}
          //   loading={true}
          //   cssOverride={override}
          // size={150}
          // aria-label="Loading Spinner"
          // data-testid="loader"
        />
      </div>
    );
  }

  return (
    <Badge
      color=""
      overlap="circular"
      badgeContent={
        user?._id == userProfileData._id ? (
          <span className="tw-rounded-full tw-p-2 tw-bg-slate-300">
            <button
              onClick={() =>
                document.getElementById("profile-image-input").click()
              }
            >
              <Pen size={20} />
              <input
                type="file"
                id="profile-image-input"
                className="tw-hidden"
                onChange={editProfileImage}
              />
            </button>
          </span>
        ) : null
      }
    >
      <img
        className="tw-mb-4 tw-h-32 tw-w-32 tw-rounded-full"
        src={userProfileData.image.url}
        alt="Profile"
      />
    </Badge>
  );
}
