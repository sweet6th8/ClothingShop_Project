import "./new.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const New = ({ title }) => {
  const [file, setFile] = useState("");

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              {/* <div className="formInput" style={{ width: '20%' }}>
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}
              <div className="formInput">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder />
              </div>

              <div className="formInput">
                <label htmlFor="price">Price</label>
                <input type="text" id="price" placeholder="Enter price" />
              </div>

              <div className="formInput">
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" placeholder="Enter image URL" />
              </div>

              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
