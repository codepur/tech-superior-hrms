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
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUserlist } from "../../stores/actions/mainPage";
import styles from "../../styles/directory.module.scss";

const initialPaginationState = {
  skip: 0,
};

export default function EmployeeCard(props) {
  const [rendomColor, setRandomColor] = useState();
  const [pagination, setPagination] = useState(initialPaginationState);
  const { searchData } = props;
  const dispatch = useDispatch();
  const { skip = [] } = pagination;
  const [userList] = useSelector((Gstate) => [Gstate.user?.userList]);

  useEffect(() => {
    dispatch(setUserlist());
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
      <Table striped bordered hover size="sm" className="mt-4">
        <thead>
          <tr className={`${styles.tableHeadRow}`}>
            <th>Sr. No.</th>
            <th className="ps-3">
              <span
                className="alignTableHeading"
                onClick={() => handleSort("User.UID")}
              >
                <span>Employee Name</span>
                <span className="ms-2">
                  {/* <img src={'/images/sort.svg'} className="cursor-pointer" /> */}
                </span>
              </span>
            </th>
            <th className="ps-3">
              <span
                className="alignTableHeading"
                // onClick={() => handleSort("User.UID")}
              >
                <span>Employee ID</span>
                <span className="ms-2">
                  {/* <img src={'/images/sort.svg'} className="cursor-pointer" /> */}
                </span>
              </span>
            </th>
            <th className="ps-3">
              <span
                className="alignTableHeading"
                onClick={() => handleSort("User.UID")}
              >
                <span>Email</span>
                <span className="ms-2">
                  {/* <img src={'/images/sort.svg'} className="cursor-pointer" /> */}
                </span>
              </span>
            </th>
            <th className="ps-3">
              <span
                className="alignTableHeading"
                onClick={() => handleSort("User.UID")}
              >
                <span>Designation</span>
                <span className="ms-2">
                  {/* <img src={'/images/sort.svg'} className="cursor-pointer" /> */}
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            searchData?.map((item, i) => (
              <tr key={i}>
                <td>{i + skip + 1}</td>
                <td>
                  <span>
                    <Image
                      src="/images/men.png"
                      className={`${styles.userImg}`}
                    />
                  </span>{" "}
                  <span>
                    {item?.first_name} {item?.last_name}
                  </span>
                </td>
                <td>{item?.employee_ID ? item?.employee_ID : "--"}</td>
                <td>{item?.email}</td>
                <td>{item?.designation ? item?.designation : "Software Engineer"}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
