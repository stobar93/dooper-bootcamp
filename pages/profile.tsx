import type { NextPage } from "next";
import ProfileView from "src/components/Profile";

const Profile: NextPage = () => {
  return (
    <>
      <h1>Profile</h1>
      <ProfileView />
    </>
  );
};

export default Profile;
