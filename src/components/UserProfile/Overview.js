import "./UserProfile.css";
import profile_pic from "../../components/header/profilepic.png";

function Overview({ userData }) {
  return (
    <div className="profile main_profile">
      <div style={{}}>
        <div>
          <h6 className="mb-5">Edit Profile</h6>
          <form>
            <div id="avatar">
              <label>Avatar</label>
              <div>
                <img src={profile_pic} width="50px" height="50px" alt=""></img>
                <input type="file" />
              </div>
            </div>
            <div>
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={userData["first-name"]}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Second Name"
                value={userData["last-name"]}
              />
            </div>
            <div>
              <label>UserName</label>
              <input
                type="text"
                placeholder="User Name"
                value={userData["username"]}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="xyz123@gmail.com"
                value={userData["email"]}
              />
            </div>
          </form>
        </div>
        <div className="profile_buttons">
          <button className="cancel">Cancel</button>
          <button className="save">Save</button>
        </div>
      </div>
    </div>
  );
}

export default Overview;
