import React, { useEffect, useState } from "react";
import { ProSidebar, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import styles from "../../../src/styles/sidebar.module.scss";
import { Image, Nav, NavLink } from "react-bootstrap";
import Link from "next/link";
import { memo } from "react";
import { useRouter } from "next/router";
import {
  ADMIN_ROLE,
  appMenuItems, 
  EMPLOYEE_ROLE,
  SUB_ADMIN_ROLE,
} from "../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../stores/actions/mainPage";

const SidebarComponent = () => {
  const router = useRouter();
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [appMenuItemsData, setAppMenuItemsData] = useState([]);
  const [userData] = useSelector((Gstate) => [Gstate.user?.userData]);
  const roleId = userData?.roles;
  const dispatch = useDispatch();
  useEffect(() => {
    if (roleId && roleId === SUB_ADMIN_ROLE) {
      const menu = appMenuItems?.filter((item) =>
        [1, 5, 6, 7, 8].includes(item.id)
      );
      setAppMenuItemsData(menu);
    }
    if (roleId && roleId === EMPLOYEE_ROLE) {
      const menu = appMenuItems?.filter(
        (item) => [1, 2, 3, 4, 7].includes(item.id)
      );
      setAppMenuItemsData(menu);
    }
  }, [userData]);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const collapesSidebar = () => {
    setMenuCollapse(true);
  };

  const appendSidebar = () => {
    setMenuCollapse(false);
  };

  return (
    <>
      <div id="header">
        <Nav
          collapsed={menuCollapse}
          className={`${
            menuCollapse ? styles.sidebarMenuCollape : styles.sidebarMenuAppend
          }`}
        >
          {appMenuItemsData?.map((item, i) => ( 
            <Nav.Item 
              href={item.link}
              key={i}
              className={`${styles.menuItem} ${
                router.pathname.includes(item.link) && styles.menuItemActive
              }`}
            >
              <Nav.Link className="flex-grow-1" href={item.link}>
                <Link href={item.link} passHref className="flex-grow-1">
                  <div className={`${styles.menuItemsImg}`}>
                    <Image
                      src={
                        router.pathname.includes(item.link)
                          ? item.IconActive
                          : item.Icon
                      }
                      alt="Logo"
                      height="20"
                      width="20"
                      className="me-2"
                    />
                    <span className="flex-grow-1">{item.name}</span>
                  </div>
                </Link> 
              </Nav.Link>
            </Nav.Item>
          ))} 
          {!menuCollapse ? (
            <div
              className={`${styles.upperArrowKey}`}
              onClick={collapesSidebar}
            >
              <Image
                src="/images/upKey.png"
                alt="up arrow"
                className={styles.upperImg}
              />
            </div>
          ) : (
            <div className={`${styles.downArrowKey}`} onClick={appendSidebar}>
              <Image
                src="/images/downKey.png"
                alt="down arrow"
                className={styles.downImg}
              />
            </div>
          )}
        </Nav>
      </div>
    </>
  );
};

export default memo(SidebarComponent);
