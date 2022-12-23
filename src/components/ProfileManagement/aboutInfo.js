import BasicInfo from "./Components/basicInfo";
import ProfilePicture from "./Components/profilePicture";
import Qualification from "./Components/qualification";
import EmergencyContact from "./Components/EmergencyContact";
import FamilyMember from "./Components/FamilyMember";
import ChangePassword from "./Components/ChangePassword";
import DepartmentChange from "./Components/DepartmentChange";

export default function AboutInfo(props) {
  const type = props.type;
  switch (type) {
    case "Basic Information":
      return <BasicInfo />;
    case "Profile Picture":
      return <ProfilePicture />;
    case "Qualification":
      return <Qualification />;
    case "EmergencyContact":
      return <EmergencyContact />;
    case "FamilyMember":
      return <FamilyMember />;
    case "ChangePassword":
      return <ChangePassword />;
    case "DepartmentChange":
      return <DepartmentChange />;
    default:
      return false;
  }
}
