import React, { useEffect, useState } from "react";
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


  return (
    <>
      <div id="header" className={`col-md-12 d-none d-md-block ${styles.sidebar} `}>
        <Nav collapsed={menuCollapse}
        >
          <header>
            <div className={`${styles.head}`}>
              <div class="logoImg">
                <Image src="/images/LogoTSC.svg" alt="logo" className="img-fluid" />
              </div>
              <div class="logoText">
                <Image src="images/textLogo.png" alt="logo" className="img-fluid" />
              </div>
            </div>
          </header>
          {/* <div className={`${styles.user}`}>
              <div className="card bg-dark text-white p-2 ">
                  <div className=" d-flex align-item-center">
                    <div className="col-6 d-flex align-item-center justify-content-center">
                       <Image src="/images/LogoTSC.svg" alt="logo" className="img-fluid w-50"/>                    
                    </div>
                    <div className="col-6">
                           <h6 className="mb-0 mt-1">Neeraj Verma</h6>
                    </div>
                   </div>
              </div>
              
          </div> */}
          <div className={`${styles.sidebarInnerItems} mt-4 pt-2`}>
            {appMenuItemsData?.map((item, i) => (
              <Nav.Item
                href={item.link}
                key={i}
                className={`${styles.menuItem} ${router.pathname.includes(item.link) && styles.menuItemActive
                  }  d-flex p-1 align-items-center`}
              >
                <Nav.Link className="float-left" href={item.link}>
                  <Link href={item.link} passHref className="flex-grow-1 menuList">
                    <div className={`side-menu`}>
                      <Image
                        src={
                          router.pathname.includes(item.link)
                            ? item.IconActive
                            : item.Icon
                        }
                        alt="Logo"
                        height="22"
                        width="22"
                        className="me-2 "
                      />
                      <span className="flex-grow-1">{item.name}</span>
                    </div>
                  </Link>
                </Nav.Link>
              </Nav.Item>
            ))}
          </div>
        </Nav>
      </div>
    </>
  );
};

export default memo(SidebarComponent);
