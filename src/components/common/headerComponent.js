import { memo, useEffect, useState } from "react";
import { Dropdown, Image, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../src/styles/header.module.scss";
import { logout } from "../../helpers/auth";
import { getProfile, setUserlist } from "../../stores/actions/mainPage";
import { IconCaretDown} from "@tabler/icons";

function HeaderComponent({ isPublic, hasSideBar, mobileToggle }) {
  const [userData] = useSelector((Gstate) => [Gstate.user?.userData]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      dispatch(getProfile());
      
    }
  }, []);

  const logoutUser = () => {
    logout();
  };

  return (
    <>
      <Navbar bg="light" className={`row ${styles.mainHeader} m-0 p-0`}>
        <div href="#home" className={`d-flex justify-content-between p-1`}>
          <div className={`${styles.toggle}`} onClick={mobileToggle}>
            <Image src="/images/menu.png" alt="LogoTsc" className={`${styles.menu} w-100 mt-2`} />
          </div>
          <div className="col-md-2 d-flex justify-content-end">
            <Image
              src="/images/LogoTSC.svg"
              alt="LogoTsc"
              className={`${styles.headerLogo}`}
            />
          </div>
          <div className="col-md-2 d-flex justify-content-end">
            <Dropdown className={styles.dropdownMenu}>
              <Dropdown.Toggle
                id="dropdown-basic"
                data-toggle="tooltip"
                title="Profile"
                className={`border-0 p-0 ${styles.toggleButton}`}
              >
                <div className={styles.profileContainer}>

                </div>
                <Image src="/images/photo_6325701050312536371_x.jpg" alt="Logo" className={styles.profileImg} />
                <span className="text-dark p-2 fw-bold">
                  {userData && `${userData?.first_name || ""} ${userData?.last_name || ""}`}
                </span>
                <IconCaretDown className="me-1" />
              </Dropdown.Toggle>
              <div className="row">
                <div className="col-md-3">
                  <Dropdown.Menu align="end">
                    <Dropdown.Item
                      className={styles.menuItems}
                    >
                      <Image
                        src="/images/changePass.png"
                        alt="Logo"
                        className="cursor-pointer me-2"
                      />
                      <span>My Profile</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.menuItems}
                      onClick={logoutUser}
                    >
                      <Image
                        src="/images/logout.png"
                        alt="Logo"
                        className="cursor-pointer me-2"
                      />
                      <span>Logout</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default memo(HeaderComponent);
