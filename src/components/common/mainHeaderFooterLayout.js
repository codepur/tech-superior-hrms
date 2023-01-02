import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useState } from 'react'; 
import { Col, Row } from 'react-bootstrap';
import HeaderComponent from './headerComponent';
import Sidebar from './sidebarComponent';
import styles from '../../styles/header.module.scss'

const MainHeaderFooterLayout = ({ children, title, data, description, isPublic }) => {
    const router = useRouter();
    const hasSideBarLayout = data && data.layoutType === 'HOME';
    const hasSideBar = (hasSideBarLayout)&&!['/set-password'].includes(router.pathname);
    const notLoginScreen = data?.pageScreen !== 'login' ;
    const [toggle,setToggle] = useState(true);

    const sidebarToggle = (e)=>{
       e.preventDefault(); 
       setToggle(!toggle);
    }
    // useEffect(()=>{
    //   setToggle();
    // },[toggle])
    
     
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
            {data?.pageScreen != 'login' && data?.pageScreen != 'setPassword' && <HeaderComponent isPublic={isPublic} hasSideBar={hasSideBar}/>}

            <Row className={`${styles.mainBodyWrapper}`}>
                {notLoginScreen && hasSideBar &&(
                    <Col md={`${toggle?'2':'1' } `} className={`${styles.sidebar}`} >
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