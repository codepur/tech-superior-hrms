import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, InputGroup, Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormGroup, Input, Label } from "reactstrap";
import API from "../../helpers/api";
import { setdepartmentList } from "../../stores/actions/ticketManagement";
import styles from "../../styles/ticket.module.scss";
import { handleErrorMessage } from "../../utils/commonFunctions";
// import TicketModal from "./viewModal";
import toast, { Toaster } from "react-hot-toast";
import { setUserlist } from "../../stores/actions/mainPage";
import { encodeData } from "../../helpers/auth";

const initial = {
  department: "",
  user_type: "",
  email: "",
  first_name: "",
  last_name: "",
  employee_ID: "",
  phone: "",
};

const initialPaginationState = {
  skip: 0,
};

function TicketManagement() {
  const [employeeData, setEmployeeData] = useState(initial);
  const [ticketSectionExpand, setTicketSectionExpand] = useState(false);
  const [pagination, setPagination] = useState(initialPaginationState);
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState();
  const [buttonChnage, setButtonChnage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { skip = [] } = pagination;
  const [userList, departmentList] = useSelector((Gstate) => [
    Gstate.user?.userList,
    Gstate.ticketManagement?.departmentList,
  ]);
  const dispatch = useDispatch();
  const toggleTicketSection = () => {
    setButtonChnage(false);
    setTicketSectionExpand(!ticketSectionExpand);
  };

  const {
    department,
    user_type,
    first_name,
    last_name,
    email,
    employee_ID,
    phone,
  } = employeeData;

  const onChangeHandler = (e) => {
    setEmployeeData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSearchKey(e.target.value)
  };

  useEffect(() => {
    if (ticketSectionExpand) {
      setEmployeeData(initial);
    }
  }, [ticketSectionExpand]);

  useEffect(() => {
    dispatch(setdepartmentList());
    dispatch(setUserlist());
  }, []);

  const createEmployee = () => {
    employeeData.level = "Level2";
    API.apiPost("candidateInvite",{ payload:encodeData(employeeData)})
      .then((response) => {
        if (response.data && response.data.success === true) {
          setEmployeeData(initial);
          dispatch(setUserlist());
          setTicketSectionExpand(false);
          toast.success(response.data.message, {
            position: "top-right",
            style: {
              padding: "16px",
              color: "#3c5f4b",
              marginRight: "25px",
            },
          });
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  };

  // const handleClose = ({ type, data }) => {
  //     setLoading(true);
  //     if (type === 'add') {
  //       addParticipantsData(data);
  //       return;
  //     }
  //     setOpenModal(false);
  //   };

  // const viewTicket=(row)=>{
  //   setOpenModal(true);
  //   setIndex(row);
  //
  const handleDelete = (row) => {
    API.apiPost("deleteProfile", {payload:encodeData({ email: row.email })})
      .then((response) => {
        if (response.data && response.data.success === true) {
          dispatch(setUserlist());
          toast.success(response.data.message, {
            position: "top-right",
            style: {
              padding: "16px",
              color: "#3c5f4b",
              marginRight: "25px",
            },
          });
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  };

  const handleFilter = (e) => {
    let searchvalue = e?.target?.value;
    let arr = userList?.filter(
      (item) =>
        (searchvalue
          ? item.first_name?.toLowerCase().includes(searchvalue.toLowerCase())
          : true) ||
        (searchvalue
          ? item.last_name?.toLowerCase().includes(searchvalue.toLowerCase())
          : true)
    );
    setSearchData(arr);
    // setPagination((prev) => ({
    //   ...prev,
    //   list: arr,
    // }));
  };

  const handleEdit = (row) => {
    setTicketSectionExpand(true);
    setButtonChnage(true);
    setTimeout(() => {
      setEmployeeData(row);
    }, 800);
  };
  useEffect(() => {
    setSearchData(userList);
    // let department = filters.user_type || "all";
  }, [userList?.length]);
  
  const updateEmployee = () => {
    employeeData.level = "Level2";
    API.apiPut("candidateInvite", {payload:encodeData(employeeData)})
      .then((response) => {
        if (response.data && response.data.success === true) {
          setEmployeeData(initial);
          dispatch(setUserlist());
          setTicketSectionExpand(false);
          toast.success(response.data.message, {
            position: "top-right",
            style: {
              padding: "16px",
              color: "#3c5f4b",
              marginRight: "25px",
            },
          });
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  };
  return (
    <>
      {/* <Modal
    className="custom-modal"
    show={openModal}
    onHide={() => setOpenModal(false)}
    backdrop="static"
    keyboard={false}
    centered
  >
    <TicketModal handleClose={handleClose} index={index} />
  </Modal> */}
      <div className={` ${styles.OuterTicketDiv}`}>
        <Toaster />
        <div className={`row d-flex  ${styles.ContainerDiv}`}>
          <div
            className={`d-flex justify-content-between ${styles.createTicket}`}
          >
            <h2 className="col-md-4">Create Employee Profile</h2>
            <div
              data-toggle="tooltip"
              title="Add Ticket"
              className="cursor-pointer mx-2"
              onClick={() => toggleTicketSection()}
            >
              {ticketSectionExpand ? (
                <Image src="/images/cross.png" alt="cross" />
              ) : (
                <button className={`col-md-1 btn ${styles.addTicket}`}>
                  Add Employee
                </button>
              )}
            </div>
          </div>
          <hr className={`${styles.hr}`}></hr>
          <Form
            className={` ${ticketSectionExpand ? "form row d-flex" : "d-none"}`}
          >
            <div className="col-md-6">
              <FormGroup>
                <Label for="First Name">
                  <b>First Name</b>
                </Label>
                <Input
                  value={first_name}
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  onChange={onChangeHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Emp_id">
                  <b>Employee ID</b>
                </Label>
                <Input
                  value={employee_ID}
                  type="text"
                  name="employee_ID"
                  id="emp_id"
                  placeholder="Employee ID"
                  onChange={onChangeHandler}
                />
              </FormGroup>

              <FormGroup>
                <Label for="Email">
                  <b>Email ID</b>
                </Label>
                <Input
                  value={email}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email ID"
                  onChange={onChangeHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="department">
                  <b>Department</b>
                </Label>
                <Form.Select
                  aria-label="Default select example"
                  value={department}
                  name="department"
                  onChange={onChangeHandler}
                >
                  <option hidden>Department</option>
                  {departmentList?.length &&
                    departmentList?.map((item) => (
                      <option key={item?._id} value={item?._id}>
                        {item?.name || ""}
                      </option>
                    ))}
                </Form.Select>
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label for="Last Name">
                  <b>Last Name</b>
                </Label>
                <Input
                  value={last_name}
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  onChange={onChangeHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="user_type">
                  <b>User Type</b>
                </Label>
                <Form.Select
                  aria-label="Default select example"
                  value={user_type}
                  name="user_type"
                  onChange={onChangeHandler}
                >
                  <option hidden>User Type</option>
                  <option value="Guest">Guest</option>
                  <option value="Employee">Employee</option>
                </Form.Select>
              </FormGroup>
              <FormGroup>
                <Label for="Subject">
                  <b>Contact Number</b>
                </Label>
                <Input
                  value={phone}
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Contact Number"
                  onChange={onChangeHandler}
                />
              </FormGroup>
            </div>
            <Button
              className={`btn col-md-1 ${styles.saveButton}`}
              onClick={!buttonChnage ? createEmployee : updateEmployee}
            >
              {!buttonChnage ? "Create" : "Update"}
            </Button>
          </Form>
        </div>
        <div className={`row d-flex mt-4 ${styles.ContainerDiv}`}>
          <div
            className={`d-flex justify-content-between ${styles.createTicket}`}
          >
            <h2 className="col-md-4">List Of Employees</h2>
          </div>
          <hr className={`${styles.hr}`}></hr>
          <div className="row justify-content-end">
            <div className="col-md-3 d-flex "      onChange={onChangeHandler}>
              <InputGroup className="mb-3 d-flex">
                <Form.Control
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={handleFilter}
                  value={searchKey}
                />
                <InputGroup.Text
                  id="basic-addon2"
                  className={`${styles.searchIcon}`}
                >
                  <Image src="/images/searchWhite.png" alt="search" />
                </InputGroup.Text>
              </InputGroup>
            </div>
          </div>
          <hr className={`${styles.hr}`}></hr>
          <div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr className={`${styles.tableHeadRow}`}>
                  <th className="p-3">S. No.</th>
                  <th className="p-3">First Name</th>
                  <th className="p-3">Last Name</th>
                  <th className="p-3">Email ID</th>
                  <th className="p-3"></th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {userList
                  .filter(
                    (item) =>
                      item.user_type == "Employee" && item.status == "Active"
                  )
                  ?.map((row, i) => (
                    <tr key={i}>
                      <td className="px-3">{skip + i + 1}</td>
                      <td className="px-3">{row?.first_name || ""}</td>
                      <td className="px-3">{row?.last_name || ""}</td>
                      <td className="px-3">{row.email || ""}</td>
                      <td className="px-3">
                        <center onClick={() => handleEdit(row)}>
                          <Image src="/images/edit.png" width={30}></Image>
                        </center>
                      </td>
                      <td className="px-3">
                        <center onClick={() => handleDelete(row)}>
                          <Image src="/images/delete.png" width={30}></Image>
                        </center>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketManagement;
