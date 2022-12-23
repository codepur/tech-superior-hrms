import { memo, useEffect } from "react";
import { Dropdown, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../src/styles/header.module.scss";
import { logout } from "../../helpers/auth";
import { getProfile, setUserlist } from "../../stores/actions/mainPage";

function HeaderComponent({ isPublic, hasSideBar }) {
  const [userData] = useSelector((Gstate) => [Gstate.user?.userData]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      dispatch(getProfile());
      dispatch(setUserlist());
    }
  }, []);

  const logoutUser = () => {
    logout();
  };

  return (
    <>
      <Navbar bg="light" className={`row ${styles.mainHeader}`}>
        <Navbar.Brand href="#home" className={`d-flex justify-content-between`}>
          <div className="col-md-2">
            <Image
              src="/images/LogoTSC.svg"
              alt="LogoTsc"
              className={`${styles.headerLogo}`}
            />
          </div>
          <div className="col-md-3 d-flex justify-content-end">
            <Dropdown className={styles.dropdownMenu}>
              <Dropdown.Toggle
                id="dropdown-basic"
                data-toggle="tooltip"
                title="Profile"
                className={`border-0 p-0 ${styles.toggleButton}`}
              >
                <Image src="/images/person.png" alt="Logo" />
                <span className="text-dark p-2 fw-bold">
                  {userData &&
                    `${userData?.first_name || ""} ${
                      userData?.last_name || ""
                    }`}
                </span>
              </Dropdown.Toggle>
              <div className="row">
                <div className="col-md-3">
                  <Dropdown.Menu align="end">
                    <Dropdown.Item
                      className={styles.menuItems}
                      // onClick={logoutUser}
                    >
                      <Image
                        src="/images/changePass.png"
                        alt="Logo"
                        className="cursor-pointer me-2"
                      />
                      <span>Change Password</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.menuItems}
                      // onClick={changePass}
                    >
                      <Image
                        src="/images/settings.png"
                        alt="Logo"
                        className="cursor-pointer me-2"
                      />
                      <span>Settings</span>
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
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default memo(HeaderComponent);
