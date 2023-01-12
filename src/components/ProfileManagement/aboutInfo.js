import BasicInfo from "./Components/basicInfo";
import ProfilePicture from "./Components/profilePicture";
import Qualification from "./Components/qualification";
import EmergencyContact from "./Components/EmergencyContact";
import FamilyMember from "./Components/FamilyMember";
import ChangePassword from "./Components/ChangePassword";
import DepartmentChange from "./Components/DepartmentChange";

export default function AboutInfo(props) {
  const {type , userData,setSrc} = props;

  switch (type) {
    case "Basic Information":
      return <BasicInfo userData = { userData } />;
    case "Profile Picture":
      return <ProfilePicture setSrc={setSrc} />;
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
