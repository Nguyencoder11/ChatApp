import React, { useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";

const Post = () => {
  const [postData, setPostData] = useState([
    {
      imgUrl:
        "https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/439432386_874630084677118_4456307389759903938_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hTVJJUTqq9MQ7kNvgF-egTw&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCNQQESbEbxc2IT7qjo29rTonI2JJ4JqAraaIjMwsk00A&oe=6634786B",
      username: "Khánh Linh",
      description: "This is user 1",
      gender: "Male",
      age: 25,
    },
    {
      imgUrl:
        "https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/438305688_877214544418672_6330165825583311628_n.jpg?stp=dst-jpg_s640x640&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Xb2a5_P_4_YQ7kNvgELENt8&_nc_ht=scontent.fhan3-4.fna&oh=00_AfDe1wN_WZPHI4yWMTyWvWQP6vuRiBseQJUK4nLF5VOGiA&oe=663461E7",
      username: "Khánh Vân",
      description: "This is user 2",
      gender: "Female",
      age: 30,
    },
    {
      imgUrl:
        "https://scontent.fhan4-6.fna.fbcdn.net/v/t39.30808-6/440855251_876999344440192_4490771989584528112_n.jpg?stp=dst-jpg_p480x480&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kVA1EO-iVIcQ7kNvgHifdI_&_nc_ht=scontent.fhan4-6.fna&oh=00_AfAS0Su_aQ6ejiDh6ZaFiBznZFD3H8dEgE61J6gnZglnJA&oe=66345A27",
      username: "Thùy Linh",
      description: "This is user 3",
      gender: "Male",
      age: 22,
    },
    {
      imgUrl:
        "https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/438254148_876946051112188_5820934825597100713_n.jpg?stp=dst-jpg_p480x480&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5CbgaYB1tkYQ7kNvgGt51oW&_nc_ht=scontent.fhan4-3.fna&oh=00_AfBR61NqJ8p3JiAKe7CuDq3NwRxvpJKEHQudFkkOgt8vhA&oe=663464B3",
      username: "Ngân Hoa",
      description: "This is user 4",
      gender: "Female",
      age: 35,
    },
    {
      imgUrl:
        "https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/440849293_876839377789522_2694778973664972459_n.jpg?stp=dst-jpg_p526x296&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=6lRVIfD229sQ7kNvgGQNm3T&_nc_ht=scontent.fhan3-2.fna&oh=00_AfBrm9JYCtbKgyUlfomURHufKZG5lyIkmw2HwSebVRa5Hg&oe=66345183",
      username: "Thu Thủy",
      description: "This is user 6",
      gender: "Female",
      age: 40,
    },
    {
      imgUrl:
        "https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/439658701_876397704500356_2605420953500736122_n.jpg?stp=dst-jpg_p480x480&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=XFRD7w3CWJ0Q7kNvgFA9veI&_nc_ht=scontent.fhan3-2.fna&oh=00_AfCp6_0N_jMNnERjTvBFTtNukKMdTAms0lVJpVcAIXinPw&oe=663457AD",
      username: "Ái Vân",
      description: "This is user 8",
      gender: "Female",
      age: 32,
    },
    {
      imgUrl:
        "https://scontent.fhan4-5.fna.fbcdn.net/v/t39.30808-6/439659622_876239984516128_5705522671374426710_n.jpg?stp=dst-jpg_p180x540&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=sLjFIkRNlW4Q7kNvgGqFsw8&_nc_ht=scontent.fhan4-5.fna&oh=00_AfCT6n4dLWQ4SF7aAhITL7wVBza8YgIdDRkH5TXf4s9upw&oe=66347444",
      username: "Thanh Thảo",
      description: "This is user 9",
      gender: "Male",
      age: 27,
    },
  ]);

  const [currentPost, setCurrentPost] = useState(postData[1]);
  const [currentPostIndex, setCurrentPostIndex] = useState(1);
  const [isNextPost, setIsNextPost] = useState(false);
  const [isPrevPost, setIsPrevPost] = useState(false);
  const [prevPostImg, setPrevPostImg] = useState(null);
  const [post, setPost] = useState(null);

  const handleNextPost = () => {
    const _currentPostIndex = (currentPostIndex + 1) % postData.length;
    setPrevPostImg(currentPost); // Đặt prevPostImg bằng currentPost hiện tại
    setCurrentPostIndex(_currentPostIndex);
    setCurrentPost(postData[_currentPostIndex]);
    setIsNextPost(true);
    setIsPrevPost(false);
  };

  const handlePrevPost = () => {
    const _currentPostIndex = (currentPostIndex + 1) % postData.length;
    setPrevPostImg(currentPost); // Đặt prevPostImg bằng currentPost hiện tại
    setCurrentPostIndex(_currentPostIndex);
    setCurrentPost(postData[_currentPostIndex]);
    setIsPrevPost(true);
    setIsNextPost(false);
  };

  useEffect(() => {
    if (isNextPost) {
      setTimeout(() => {
        setIsNextPost(false);
      }, 800);
      return;
    }

    setTimeout(() => {
      setIsPrevPost(false);
    }, 800);
  }, [isNextPost, isPrevPost]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[360px] h-[520px] bg-white rounded-lg">
        <div className="w-full h-3/5 ">
          <img
            src={currentPost.imgUrl}
            alt="ảnh"
            className="w-full h-full rounded-t-lg object-cover"
          />
        </div>

        <div className="p-2">
          <div className="flex justify-between font-semibold text-lg">
            <h3 className="">{currentPost.username}</h3>
          </div>
          <div className="h-[120px] ">
            <p className="text-gray-500 text-md">{currentPost.description}</p>
          </div>
          <div className="flex justify-between text-white">
            <button
              onClick={handlePrevPost}
              className="w-[100px] h-[40px] rounded-md flex items-center justify-center bg-blue-400 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 hover:opacity-80"
            >
              Dislike
            </button>
            <button
              onClick={handleNextPost}
              className="w-[100px] h-[40px] rounded-md flex items-center justify-center bg-blue-400 bg-gradient-to-br from-orange-500 via-pink-500 to-red-500 hover:opacity-80"
            >
              Like
            </button>
          </div>
        </div>
      </div>

      <div
        className={`w-[360px] h-[520px] bg-white rounded-lg absolute ${
          isNextPost ? "next-post" : isPrevPost ? "prev-post" : "hidden"
        }`}
      >
        <div className="w-full h-full">
          <img
            src={prevPostImg?.imgUrl}
            alt="ảnh"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
