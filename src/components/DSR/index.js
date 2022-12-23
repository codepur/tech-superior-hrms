import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Image, InputGroup, Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormGroup, Input, Label } from "reactstrap";
import API from "../../helpers/api";
import styles from "../../styles/ticket.module.scss";
import { handleErrorMessage } from "../../utils/commonFunctions";
import RequestModel from "./requestModel";
import toast, { Toaster } from "react-hot-toast";
  
import {
  setAdminDsrList,
  setDsrList,
  setProjectList,
} from "../../stores/actions/dsr";
import { Editor } from "@tinymce/tinymce-react";
import { Center, SegmentedControl, Box } from "@mantine/core";
import { IconThumbUp, IconClock, IconX } from "@tabler/icons";
import tabstyle from "../../styles/dsr.module.scss";
import { setdepartmentList } from "../../stores/actions/ticketManagement";
import { encodeData } from "../../helpers/auth";

const initial = {
  totalHours: "",
  totalMin: "",
  hours: "",
  project_id: "",
  date: "",
  description: "",
};

const initialPaginationState = {
  skip: 0,
};

function DSRManagement() {
  const [ticketData, setTicketData] = useState(initial);
  const editorRef = useRef(null);
  const [ticketSectionExpand, setTicketSectionExpand] = useState(false);
  const [pagination, setPagination] = useState(initialPaginationState);
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState();
  const [edit, setEdit] = useState(false);
  const [totalTime, setTotalTime] = useState({
    hoursTaken: "",
    minTaken: "",
  });
  const [givenDate, setGivenDate] = useState();
  const [userData] = useSelector((Gstate) => [Gstate.user?.userData]);
  const roleId = userData?.roles;
  const [activeTab, setActiveTab] = useState("Approved");
  const { skip = [] } = pagination;
  const [searchKey, setSearchKey] = useState("");
  const [projectList, dsrList, departmentList, AdmindsrList, loading] =
    useSelector((Gstate) => [
      Gstate.dsr?.projectList,
      Gstate.dsr?.dsrList,
      Gstate.ticketManagement?.departmentList,
      Gstate.dsr?.AdmindsrList,
      Gstate.dsr?.loading,
    ]);
  const [chooseDsrList, setChooseDsrList] = useState();
  const [change, setChange] = useState();
  const dispatch = useDispatch();
  const toggleTicketSection = () => {
    setEdit(false);
    setTicketSectionExpand(!ticketSectionExpand);
  };
  const { totalHours, totalMin, project_id, date, description } = ticketData;

  const onHoursHandler = (e) => {
    const { value } = e.target;
    setTotalTime((prev) => ({
      ...prev,
      hoursTaken: value,
    }));
    setTicketData((prev) => ({
      ...prev,
      totalHours: value,
    }));
  };

  const onMinHandler = (e) => {
    setTotalTime((prev) => ({
      ...prev,
      minTaken: value,
    }));
    const { value } = e.target;
    setTicketData((prev) => ({
      ...prev,
      totalMin: value,
    }));
  };

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setGivenDate(value);
    setTicketData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (edit) {
      ticketData.hours = totalTime?.hoursTaken + ":" + totalTime?.minTaken;
    } else {
      ticketData.hours = totalHours + ":" + totalMin;
    }
  }, [ticketData, totalHours, totalMin]);

  const handleDescEdit = (content, editor) => {
    const updatedDesc = content;
    setTicketData((prev) => ({
      ...prev,
      description: updatedDesc,
    }));
  };

  useEffect(() => {
    if (ticketSectionExpand) {
      setTicketData(initial);
    }
  }, [ticketSectionExpand]);

  useEffect(() => {
    if (roleId === 3) {
      dispatch(setDsrList());
    }
    dispatch(setProjectList());
    dispatch(setdepartmentList());
  }, []);

  useEffect(() => {
    const ApprovedList = dsrList.filter((item) => item.status == "Approved");
    setChooseDsrList(ApprovedList);
  }, [dsrList]);

  const ticketSubmit = () => {
    // delete ticketData.totalHours;
    // delete ticketData.totalMin;
    API.apiPost("updateDsr", { payload: encodeData(ticketData) })
      .then((response) => {
        if (response.data && response.data.success === true) {
          setTicketData(initial);
          setTicketSectionExpand(false);
          toast.success(response.data.message, {
            position: "top-right",
            style: {
              padding: "16px",
              color: "#3c5f4b",
              marginRight: "25px",
            },
          });
          dispatch(setDsrList());
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  };

  const handleClose = ({ type, data }) => {
    if (type === "add") {
      addParticipantsData(data);
      return;
    }
    setOpenModal(false);
  };

  const viewTicket = (row) => {
    setOpenModal(true);
    setIndex(row);
  };

  const ChangeHandler = (e) => {
    let parmes = encodeData({ department_id: e?.target?.value });
    setChange(parmes);
    dispatch(setAdminDsrList(parmes));
  };

  const editTask = (row) => {
    setEdit(true);
    setTicketSectionExpand(true);
    setTimeout(() => {
      setTicketData(row);
    }, 5);
    let givenTime = row?.hours.split(":");
    setTotalTime((prev) => ({
      ...prev,
      hoursTaken: givenTime[0],
      minTaken: givenTime[1],
    }));
    setGivenDate(row?.date);
  };

  const deleteTask = (row) => {
    API.apiPost("dsrReject_Approvel", {
      payload: encodeData({ _id: row._id, status: "Inactive" }),
    })
      .then((response) => {
        if (response.data && response.data.success === true) {
          dispatch(setDsrList());
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

  const handleActiveTab = (e) => {
    const ApprovedList = dsrList.filter((item) => item.status == "Approved");
    if (["Approved", "Pending", "Rejected"].includes(e.target.name)) {
      setActiveTab(e.target.value);
    }
    if (e.target.value == "Approved") {
      const ApprovedList = dsrList.filter((item) => item.status == "Approved");
      setChooseDsrList(ApprovedList);
    }
    if (e.target.value == "Pending") {
      const PendingList = dsrList.filter((item) => item.status == "Pending");
      setChooseDsrList(PendingList);
    }
    if (e.target.value == "Rejected") {
      const RejectedList = dsrList.filter((item) => item.status == "Rejected");
      setChooseDsrList(RejectedList);
    }
  };

  const onSearchHandler = (event) => {
    setSearchKey(event?.target?.value);
  };

  const handleFilter = (e) => {
    let searchvalue = e?.target?.value;
    let arr = dsrList?.filter(
      (item) =>
        (searchvalue
          ? item.user_id?.first_name
              ?.toLowerCase()
              .includes(searchvalue.toLowerCase())
          : true) ||
        (searchvalue
          ? item.user_id?.last_name
              ?.toLowerCase()
              .includes(searchvalue.toLowerCase())
          : true) ||
        (searchvalue
          ? item.project_id?.toLowerCase().includes(searchvalue.toLowerCase())
          : true)
    );
    setChooseDsrList(arr);
  };
  return (
    <>
      <Modal
        className="custom-modal"
        show={openModal}
        onHide={() => setOpenModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <RequestModel handleClose={handleClose} index={index} change={change} />
      </Modal>
      <div className={` ${styles.OuterTicketDiv}`}>
        <Toaster />
        {roleId == 3 && (
          <div className={`row d-flex  ${styles.ContainerDiv}`}>
            <div
              className={`d-flex justify-content-between ${styles.createTicket}`}
            >
              <h2 className="col-md-4">Manage Status</h2>
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
                    Add New Task
                  </button> 
                )}
              </div>
            </div>
            <hr className={`${styles.hr}`}></hr>
            <Form
              className={` ${
                ticketSectionExpand ? "form row d-flex" : "d-none"
              }`}
            >
              <div className="col-md-6">
                <FormGroup>
                  <Label for="ticketCategory">
                    <b>Project List</b>
                  </Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={project_id}
                    name="project_id"
                    onChange={onChangeHandler}
                  >
                    <option hidden>Project List</option>
                    {projectList?.map((item, i) => (
                      <option value={item._id} key={i}>{item.project_name}</option>
                    ))}
                  </Form.Select>
                </FormGroup>
                <FormGroup>
                  <Label for="priority">
                    <b>Date</b>
                  </Label>
                  <Input
                    value={edit ? moment(givenDate).format("YYYY-MM-DD") : date}
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Date"
                    onChange={onChangeHandler}
                  />
                </FormGroup>
                <div className="row d-flex flex-colomn">
                  <Label>
                    <b>Total Time</b>
                  </Label>
                  <FormGroup className="row col-md-6">
                    <span className={`${styles.totalHours}`}>
                      <Input
                        value={edit ? totalTime?.hoursTaken : totalHours}
                        type="number"
                        name="hours"
                        id="hour"
                        placeholder="hours"
                        onChange={onHoursHandler}
                        className={`${styles.hoursInput}`}
                        min="0"
                        max="24"
                      />
                      <b>Hours</b>
                    </span>
                  </FormGroup>
                  <FormGroup className="row col-md-6">
                    <span className={`${styles.totalMin}`}>
                      <Input
                        value={edit ? totalTime?.minTaken : totalMin}
                        type="number"
                        name="min"
                        id="min"
                        placeholder="min"
                        onChange={onMinHandler}
                        className={`${styles.minInput}`}
                        min="0"
                        max="60"
                      />
                      <b>Min</b>
                    </span>
                  </FormGroup>
                </div>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    <b>Description</b>
                  </Form.Label>
                  <Editor
                    tinymceScriptSrc="/js/tinymce/tinymce.min.js"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onEditorChange={handleDescEdit}
                    value={ticketData?.description}
                    init={{
                      height: 330,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace code fullscreen",
                        "insertdatetime media table paste code",
                      ],
                      toolbar:
                        "undo redo | fontsizeselect fontselect bold italic underline strikethrough blockquote forecolor alignment bullist numlist outdent indent | link image media",
                      content_style:
                        "body { font-family: Roboto, sans-serif; font-size:14px }",
                      menubar: true,
                      statusbar: false,
                      image_title: true,
                      image_caption: true,
                      image_description: true,
                      image_dimensions: true,
                      fontsize_formats:
                        "12px 14px 16px 18px 20px 22px 24px 26px 28px",
                      font_formats:
                        "Sans-serif=sans-serif;Roboto=roboto; Arial=arial; Helvetica=helvetica;",
                    }}
                  />
                </Form.Group>
              </div>
              <Button
                className={`btn col-md-1 ${styles.saveButton}`}
                onClick={ticketSubmit}
              >
                Save
              </Button>
            </Form>
          </div>
        )}
        {roleId !== 3 && (
          <div>
            <Form>
              <FormGroup>
                <Label for="ticketCategory">
                  <b>Department List</b>
                </Label>
                <Form.Select
                  aria-label="Default select example"
                  name="department_id"
                  onChange={ChangeHandler}
                >
                  <option hidden>Department List</option>
                  {departmentList?.map((item,i) => (
                    <option value={item._id} key={i}>{item.name}</option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Form>
          </div>
        )}
        <div className={`row d-flex mt-4 ${styles.ContainerDiv}`}>
          <div
            className={`d-flex justify-content-between ${styles.createTicket}`}
          >
            <h2 className="col-md-4">List Of Status</h2>
          </div>
          <hr className={`${styles.hr}`}></hr>
          <div className={`row justify-content-between `}>
            <SegmentedControl
              className="col-md-4 mb-3"
              color="teal"
              onClick={handleActiveTab}
              data={[
                {
                  value: "Approved",
                  // onClick: { handleActiveTab },
                  label: (
                    <Center>
                      <IconThumbUp size={16} />
                      <Box ml={10}>Approved</Box>
                    </Center>
                  ),
                },
                {
                  value: "Pending",
                  // onClick: { handleActiveTab },
                  label: (
                    <Center>
                      <IconClock size={16} />
                      <Box ml={10}>Pending</Box>
                    </Center>
                  ),
                },
                {
                  value: "Rejected",
                  // onClick: { handleActiveTab },
                  label: (
                    <Center>
                      <IconX size={16} />
                      <Box ml={10}>Rejected</Box>
                    </Center>
                  ),
                },
              ]}
            />
            <div className="col-md-3 d-flex ">
              <InputGroup className="mb-3 d-flex" onChange={onSearchHandler}>
                <Form.Control
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={handleFilter}
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
                  <th className="p-3">Project ID</th>
                  {roleId === 3 ? (
                    <th className="p-3">Description</th>
                  ) : (
                    <th>Employee Name</th>
                  )}
                  <th className="p-3">Date</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {chooseDsrList?.map((row, i) => (
                  <tr key={i}>
                    <td className="p-1">{skip + i + 1}</td>
                    <td className="p-1">{row?.project_id || ""}</td>
                    {roleId === 3 ? (
                      <td
                        className={`${styles.discriptionData} p-1`}
                        dangerouslySetInnerHTML={{ __html: row?.description}}
                      ></td>
                    ) : (
                      <td>
                        {row?.user_id?.first_name + " " + row.user_id.last_name}
                      </td>
                    )}

                    <td className="p-1">
                      {moment(row?.date).format("DD-MM-YYYY") || ""}
                    </td>
                    <td className="p-1 d-flex justify-content-evenly">
                      {roleId === 2 ? (
                        <div>
                          {
                            <center>
                              <Image
                                src="images/view.png"
                                alt="viewImage"
                                className={`${styles.hoverInfo}`}
                                onClick={() => viewTicket(row)}
                              />
                            </center>
                          }
                        </div>
                      ) : (
                        <div>
                          <div className="d-flex justify-content-evenly">
                            <center>
                              <Image
                                src="images/edit.png"
                                alt="edit"
                                className={`${tabstyle.hoverInfo}`}
                                onClick={() => editTask(row)}
                              />
                            </center>
                          {/* </div>
                          <div> */}
                            <center>
                              <Image
                                src="images/delete.png"
                                alt="delete"
                                className={`${tabstyle.hoverInfo}`}
                                onClick={() => deleteTask(row)}
                              />
                            </center>
                          </div>
                        </div>
                      )}
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

export default DSRManagement;
