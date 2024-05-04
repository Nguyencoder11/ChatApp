import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./Profile.css";
// const token = Cookies.get("chat-token");
// console.log(token);
import anh from "../../../public/uploads/1714379502026-sunset.jpg";

const Profile = () => {
  const imgUrl = "https://bom.so/Z0lnYJ";
  const [prevImage, setPrevImage] = useState(imgUrl);
  const [profileData, setProfileData] = useState({
    username: "",
    content: "",
    author: "",
    imgUrl: "",
  });
  const [isCreateProfile, setIsCreateProfile] = useState(false);
  const [isExistProfile, setIsExistProfile] = useState(false);
  const [description, setDescription] = useState("");
  // const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [newImgUrl, setNewImgUrl] = useState("");
  const [content, setContent] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPrevImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        imgUrl: file, // Lưu file vào state
      }));
    }
  };

  // const token = Cookies.get("jwt");
  // const tokenDecoded = jwtDecode(token);
  // console.log(tokenDecoded);
  useEffect(() => {
    const token = Cookies.get("jwt");
    const tokenDecoded = jwtDecode(token);
    console.log(tokenDecoded);
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      author: tokenDecoded.userId,
    }));
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = Cookies.get("jwt");
    const tokenDecoded = jwtDecode(token);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${tokenDecoded.userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Cookie: `jwt=${token}`,
            },
            body: {},
          }
        );
        if (response) {
          setUser(response.data.user);
          console.log(response.data.user);
          setProfileData((prevProfileData) => ({
            ...prevProfileData,
            username: response.data.user.username,
            author: response.data.user._id,
          }));

          const _imgUrl = response.data.user;
          // setNewImgUrl(imgUrlRes);
          console.log(_imgUrl);
          console.log(profileData);
        }
      } catch (error) {
        console.log(error);
        setIsExistProfile(false);
      }
    };

    const getPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${tokenDecoded.userId}`
        );
        if (response) {
          const _imgUrl = response.data.post.imgUrl.replace(/\\/g, "/");
          setNewImgUrl(_imgUrl);
          setContent(response.data.post.content);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    getPost();
  }, [profileData.content, profileData.imgUrl]);

  // useEffect(() => {
  //   console.log(user.post);
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("jwt");
    const tokenDecoded = jwtDecode(token);
    const formData = new FormData();
    formData.append("username", profileData.username);
    formData.append("content", profileData.content);
    formData.append("author", profileData.author);
    formData.append("imgUrl", prevImage);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Thêm content-type multipart
          },
        }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-2/5 h-full flex items-center justify-center">
      {user?.post === null ? (
        <>
          {isCreateProfile ? (
            <form
              className="h-[460px] w-[320px] rounded-xl bg-gray-100 backdrop-filter backdrop-blur-lg bg-opacity-0 "
              style={{ borderRadius: "8px" }}
            >
              <div className="w-full h-[240px] bg-red-300 rounded-t-md relative">
                <img
                  src={prevImage}
                  alt="ảnh"
                  className="w-full h-full object-cover rounded-t-md"
                />

                <label className="absolute top-0 left-0 w-full h-full hover:cursor-pointer transition duration-300 flex justify-center items-center label">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="w-[120px] h-[120px] rounded-full bg-gray-400  flex items-center justify-center camera">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>
                  </div>
                </label>

                <div className="p-2">
                  <h5 className="text-white ">{user?.username}</h5>
                  <textarea
                    className="w-full h-[120px] bg-white resize-none rounded-md p-2 outline-none"
                    name="content"
                    value={profileData.content}
                    onChange={handleInputChange}
                  ></textarea>
                  <p className="text-center flex justify-around mt-2">
                    <button
                      className="w-[145px] h-[44px] bg-gradient-to-tr from-orange-400 via-pink-400 to-red-400 rounded-md"
                      onClick={() => setIsCreateProfile(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-[145px] h-[44px] bg-gradient-to-tr from-orange-400 via-pink-400 to-red-400 rounded-md"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      Create
                    </button>
                  </p>
                </div>
              </div>
            </form>
          ) : (
            <div
              className="h-[460px] w-[320px] rounded-xl bg-gray-100 backdrop-filter backdrop-blur-lg bg-opacity-0 flex flex-col justify-center items-center"
              style={{ borderRadius: "8px" }}
              onClick={() => {
                setIsCreateProfile(true);
              }}
            >
              <div className="w-[120px] h-[120px] bg-gray-400 opacity-35 rounded-full relative flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>
              </div>
              <p className="text-white text-[14px] mt-6">
                Have you a profile yet, click here to create
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-black w-[320px] h-[400px] bg-white backdrop-filter backdrop-blur-lg bg-opacity-0 rounded-xl">
          <img src={anh} alt="ảnh" className="rounded-md" />
          <p className="p-2">{user?.username}</p>
          <div className="px-2">
            <textarea
              value={content}
              className="pointer-events-none resize-none px-2 w-full text-[14px] rounded-md h-[170px]"
            />
            <p>{profileData?.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
