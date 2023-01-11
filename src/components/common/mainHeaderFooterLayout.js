import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useState } from 'react'; 
import { Col, Row } from 'react-bootstrap';
import HeaderComponent from './headerComponent';
import Sidebar from './sidebarComponent';
import styles from '../../styles/header.module.scss'
import { getProfile } from '../../stores/actions/mainPage';

const MainHeaderFooterLayout = ({ children, title, data, description }) => {
    const router = useRouter();
    const hasSideBarLayout = data && data.layoutType === 'HOME';
    const hasSideBar = (hasSideBarLayout)&&!['/set-password'].includes(router.pathname);
    const notLoginScreen = data?.pageScreen !== 'login' ;
    const [toggle,setToggle] = useState(true);

    const sidebarToggle = (e)=>{
       e.preventDefault(); 
       setToggle(!toggle);
    }

    const [smalltoggle,setSmallToggle] = useState(true);
    const mobileToggle = (e)=>{
        e.preventDefault(); 
        setSmallToggle(!smalltoggle);
     }    
    return (
        <React.Fragment>
            <Head>
                <title>{title || 'HRMS'}</title>
                <meta name="theme-color" content="#ffffff" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <meta itemProp="name" content={title} />
                <meta itemProp="description" content={description} />
                <link rel="shortcut icon" href="/images/favicon.png"/>
            </Head>
            {data?.pageScreen != 'login' && data?.pageScreen != 'setPassword' && <HeaderComponent hasSideBar={hasSideBar} mobileToggle={mobileToggle} smalltoggle={smalltoggle}
            />}

            <Row className={`${styles.mainBodyWrapper}`}>
                {notLoginScreen && hasSideBar &&(
                    <Col md={`${toggle?'2':'1' }`} xs={5}  className={`${smalltoggle ? styles.sidebar: styles.sidebarblock}`} >
                        <Sidebar  sidebarToggle={sidebarToggle} toggle={toggle}/>
                    </Col>
                )}
                <Col md={( router.pathname != '/' && `${toggle?'10':'11' }`)} xs={12} className={`${styles.pageContentWrapper}`}>
                    {children}
                </Col>
            </Row>
        </React.Fragment> 
    );
};
export default React.memo(MainHeaderFooterLayout);