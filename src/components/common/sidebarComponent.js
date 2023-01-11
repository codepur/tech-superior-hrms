import React, { useEffect, useState } from "react";
import styles from "../../../src/styles/sidebar.module.scss";
import { Image, Modal, Nav, NavLink } from "react-bootstrap";
import Link from "next/link";
import { memo } from "react";
import { useRouter } from "next/router";
import { logout } from "../../helpers/auth";

import {
  ADMIN_ROLE,
  appMenuItems,
  EMPLOYEE_ROLE,
  SUB_ADMIN_ROLE,
} from "../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../stores/actions/mainPage";
import { IconCircleChevronLeft, IconToggleLeft } from "@tabler/icons";

const SidebarComponent = (props) => {
  const { toggle, sidebarToggle } = props;
  const router = useRouter();
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [appMenuItemsData, setAppMenuItemsData] = useState([]);
  const [userData] = useSelector((Gstate) => [Gstate.user?.userData]);
  const roleId = userData?.roles;
  const [logoutModal, setLogoutModal] = useState(false);
  const dispatch = useDispatch();

  function openlogoutModal() {
    setLogoutModal(true);
  }

  useEffect(() => {
    if (roleId && roleId === SUB_ADMIN_ROLE) {
      const menu = appMenuItems?.filter((item) =>
        [1, 5, 6, 7, 8, 9,10].includes(item.id)
      );
      setAppMenuItemsData(menu);
    }
    if (roleId && roleId === EMPLOYEE_ROLE) {
      const menu = appMenuItems?.filter((item) =>
        [1, 2, 3, 4, 7, 8, 9].includes(item.id)
      );
      setAppMenuItemsData(menu);
    }
  }, [userData, roleId]);

  useEffect(() => {
    dispatch(getProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const collapesSidebar = () => {
    setMenuCollapse(true);
  };

  const appendSidebar = () => {
    setMenuCollapse(false);
  };
  const logoutUser = () => {
    logout();
  };

  return (
    <>
      <Modal centered show={logoutModal} onHide={() => setLogoutModal(false)}>
        <Modal.Header
          closeButton
          className={`${styles.modalHeaderBorderNone}`}
        ></Modal.Header>
        <Modal.Body className="bodyModal">
          <h3>
            <div className="d-flex-justify-content-center fw-bold text-center">
              Are you sure, <br /> you want to logout ?
            </div>
          </h3>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button className="btn bg-btn-green text-center" onClick={logoutUser}>
            Logout
          </button>
          <button
            className="btn btn-danger text-center"
            onClick={() => setLogoutModal(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <div
        id="header"
        className={`col-md-12 d-none d-md-block ${styles.sidebar} `}
      >
        <Nav>
          <header>
            <div
              className={`${styles.head}`}
              onClick={() => {
                router.push("/employee-dashboard");
              }}
              role="button"
            >
              <div className="logoImg d-flex align-item-center justify-content-center p-1 ">
                <Image
                  src="/images/LogoTSC.svg"
                  alt="logo"
                  className={`${toggle ? "img-fluid" : "img-fluid w-50 "}`}
                />
              </div>
              <div className={`${toggle ? "d-block" : "d-none"} logoText pe-1`}>
                <Image
                  src="images/textLogo.png"
                  alt="logo"
                  className="img-fluid"
                />
              </div>
            </div>
            <IconCircleChevronLeft
              className={`${styles.toggle} ${
                toggle ? styles.toggleRigth : styles.toggleLeft
              }`}
              onClick={sidebarToggle}
            />
          </header>
          <div className={`${styles.sidebarInnerItems} mt-4 pt-2 w-100`}>
            {appMenuItemsData?.map((item, i) => (
              <Nav.Item
                href={item.link}
                key={i}
                className={`${styles.menuItem} ${
                  router.pathname.includes(item.link) && styles.menuItemActive
                }  d-flex p-1 align-items-center `}
              >
                <Nav.Link
                  className={`${
                    toggle
                      ? ""
                      : "d-flex align-item-center justify-content-center"
                  } float-left`}
                  href={item.link}
                >
                  <Link
                    href={item.link}
                    passHref
                    className="flex-grow-1 menuList"
                  >
                    <div className={`side-menu`}>
                      <Image
                        src={
                          router.pathname.includes(item.link)
                            ? item.IconActive
                            : item.Icon
                        }
                        alt="Logo"
                        height="25"
                        width="25"
                        className="me-2 "
                      />
                      <span
                        className={`${
                          toggle ? "d-inline-block" : "d-none"
                        } flex-grow-1`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </Link>
                </Nav.Link>
              </Nav.Item>
            ))}
          </div>
        </Nav>
        <div className="lastItems">
          <div className={`${styles.sidebarOuterItems}`}>
            <div className={` ${styles.menuOtherItem}   p-1 `}>
              <div
                className={`${styles.other} ${
                  toggle
                    ? ""
                    : "d-flex align-item-center justify-content-center"
                }`}
                onClick={() => router.push("/gethelp")}
                role="button"
              >
                <Image
                  src="/images/help-web-button.png"
                  alt="Logo"
                  height="25"
                  width="25"
                  className="me-2 "
                />
                <span
                  className={`${
                    toggle ? "d-inline-block" : "d-none"
                  } flex-grow-1`}
                >
                  Get Help
                </span>
              </div>
            </div>
          </div>
          <div className={`${styles.sidebarOuterItems}`}>
            <div className={` ${styles.menuOtherItem}   p-1 `}>
              <div
                className={`${styles.other} ${
                  toggle
                    ? ""
                    : "d-flex align-item-center justify-content-center"
                }`}
                onClick={openlogoutModal}
                role="button"
              >
                <Image
                  src="/images/logout1.png"
                  alt="Logo"
                  height="25"
                  width="25"
                  className="me-2 "
                />
                <span
                  className={`${
                    toggle ? "d-inline-block" : "d-none"
                  } flex-grow-1`}
                >
                  Logout
                </span>
              </div>
            </div>
          </div>
          <div className={`${styles.version} text-center text-muted`}>
            <span>v 1.2.0 &nbsp;</span>
            <span className={`${toggle ? "d-inline-block" : "d-none"}`}>
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(SidebarComponent);
