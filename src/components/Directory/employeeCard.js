import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  CardGroup,
  Form,
  FormCheck,
  FormControl,
  Image,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUserlist } from "../../stores/actions/mainPage";
import styles from "../../styles/directory.module.scss";

export default function EmployeeCard(props) {
  const [rendomColor, setRandomColor] = useState();
  const { searchData } = props;
  const dispatch = useDispatch();
  const [userList] = useSelector((Gstate) => [Gstate.user?.userList]);

  useEffect(() => {
    dispatch(setUserlist());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRendomColor = () => {
    let color = "#";
    let letters = "0123456789ABCDEF".split("");
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setRandomColor(color);
  };

  useEffect(() => {
    handleRendomColor();
  }, []);
  return (
    <>
      {userList &&
        searchData?.map((item, i) => (
          <Card key={i} className={`${styles.profileCard} col-md-3 ms-4 mt-4`}>
            <Card.Header
              className={`${styles.headerPartTwo} d-flex justify-content-center`}
              style={{ backgroundColor: rendomColor }}
            >
              <div></div>
            </Card.Header>
            <Card.Body className={`${styles.profileCardDetails} row`}>
              <div>
                <div className={`${styles.employeeImgSection}`}>
                  <Image
                    src="/images/men.png"
                    alt="profilePicture"
                    className={`${styles.employeeImg}`}
                  />
                </div>
              </div>
              <div>
                <div className={`${styles.userProfileData}`}>
                  <h4>
                    {item?.first_name} {item?.last_name}
                  </h4>
                  <span>{item?.employee_ID ? item?.employee_ID : "--"}</span>
                  <p>{item?.email}</p>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className={`${styles.profileFooter}`}>
              <span>
                {item?.designation ? item?.designation : "Software Engineer"}
              </span>
            </Card.Footer>
          </Card>
        ))}
    </>
  );
}