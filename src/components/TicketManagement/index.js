import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Image, InputGroup, Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormGroup, Input, Label } from "reactstrap";
import API from "../../helpers/api";
import { setdepartmentList,setTicketList} from "../../stores/actions/ticketManagement";
import styles from "../../styles/ticket.module.scss";
import { handleErrorMessage } from "../../utils/commonFunctions";
import TicketModal from "./viewModal";
import toast, { Toaster } from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
import { encodeData } from "../../helpers/auth";
import { object } from "underscore";

const initial = {
  subject: "",
  department: "",
  category: "",
  priority: "",
  description: "",
};

const initialPaginationState = {
  skip: 0,
};

function TicketManagement() {
  const [ticketData, setTicketData] = useState(initial);
  const [ticketSectionExpand, setTicketSectionExpand] = useState(false);
  const [pagination, setPagination] = useState(initialPaginationState);
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState();
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const [searchKey, setSearchKey] = useState("");
  const [searchData, setSearchData] = useState([]);

  const { skip = [] } = pagination;
  const [departmentList, userData, ticketsList] = useSelector((Gstate) => [
    Gstate.ticketManagement?.departmentList,
    Gstate.user?.userData,
    Gstate.ticketManagement?.ticketsList,
  ]);
  
 
  const dispatch = useDispatch();
  const toggleTicketSection = () => {
    setTicketSectionExpand(!ticketSectionExpand);
  };

  const { subject, department, category, priority, description } = ticketData;

  const onChangeHandler = (e) => {
    setTicketData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSearchKey(e?.target?.value);
  };

  const handleFilter = (e) => {
    let searchvalue = e?.target?.value;
    let arrt=Object.entries(userData)
    let arr = arrt?.filter(
      (item) =>
        (searchvalue
          ? item.first_name?.toLowerCase().includes(searchvalue.toLowerCase())
          : true) ||
        (searchvalue
          ? item.last_name?.toLowerCase().includes(searchvalue.toLowerCase())
          : true)
    );
    setSearchData(arr);
  };
  const handleDescEdit = (content, editor) => {
    const updatedDesc = content;
    setTicketData((prev) => ({
      ...prev, description: updatedDesc 
    }));
  };

  useEffect(() => {
    if (ticketSectionExpand) {
      setTicketData(initial);
    }
  }, [ticketSectionExpand]);

  useEffect(() => {
    dispatch(setdepartmentList());
    dispatch(setTicketList());
  }, []);

  const ticketSubmit = () => {
    ticketData.id = userData._id;
    delete ticketData["category"];
    API.apiPost("createTicket", {payload:encodeData(ticketData)})
      .then((response) => {
        if (response.data && response.data.success === true) {
          setTicketData(initial);
          dispatch(setTicketList());
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

  const handleClose = ({ type, data }) => {
    setLoading(true);
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
        <TicketModal handleClose={handleClose} index={index} />
      </Modal>
      <div className={` ${styles.OuterTicketDiv}`}>
        <Toaster />
        <div className={`row d-flex  ${styles.ContainerDiv}`}>
          <div
            className={`d-flex justify-content-between ${styles.createTicket}`}
          >
            <h2 className="col-md-4">Create New Ticket</h2>
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
                  Add Ticket
                </button>
              )}
            </div>
          </div>
          <hr className={`${styles.hr}`}></hr>
          <Form
            className={` ${ticketSectionExpand ? "form row d-flex" : "d-none"}`}
          >
            <div className="col-md-4">
              <FormGroup>
                <Label for="Subject">
                  <b>Subject</b>
                </Label>
                <Input
                  value={subject}
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
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
              <FormGroup>
                <Label for="ticketCategory">
                  <b>Ticket Category</b>
                </Label>
                <Form.Select
                  aria-label="Default select example"
                  value={category}
                  name="category"
                  onChange={onChangeHandler}
                >
                  <option hidden>Ticket Category</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Health">Health</option>
                  <option value="Leave">Leave</option>
                </Form.Select>
              </FormGroup>
              <FormGroup>
                <Label for="priority">
                  <b>Priority</b>
                </Label>
                <Form.Select
                  aria-label="Default select example"
                  value={priority}
                  name="priority"
                  onChange={onChangeHandler}
                >
                  <option hidden>Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Select>
              </FormGroup>
            </div>
            <div className="col-md-8">
              <Editor
                tinymceScriptSrc="/js/tinymce/tinymce.min.js"
                onInit={(evt, editor) => (editorRef.current = editor)}
                onEditorChange={handleDescEdit}
                value={description}
                  init={{
                  height: 330,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace code fullscreen",
                    "insertdatetime media table paste code",
                  ],
                  toolbar: "undo redo | fontsizeselect fontselect bold italic underline strikethrough blockquote forecolor alignment bullist numlist outdent indent | link image media",
                  content_style: "body { font-family: Roboto, sans-serif; font-size:14px }",
                  menubar: true,
                  statusbar: false,
                  image_title: true,
                  image_caption: true,
                  image_description: true,
                  image_dimensions: true,
                  fontsize_formats: "12px 14px 16px 18px 20px 22px 24px 26px 28px",
                  font_formats: "Sans-serif=sans-serif;Roboto=roboto; Arial=arial; Helvetica=helvetica;",
                }}

              />
            </div>
            <Button
              className={`btn col-md-1 ${styles.saveButton}`}
              onClick={ticketSubmit}
            >
              Save
            </Button>
          </Form>
        </div>
        <div className={`row d-flex mt-4 ${styles.ContainerDiv}`}>
          <div
            className={`d-flex justify-content-between ${styles.createTicket}`}
          >
            <h2 className="col-md-4">List All Tickets</h2>
          </div>
          <hr className={`${styles.hr}`}></hr>
          <div className="row justify-content-end">
            <div className="col-md-3 d-flex " onChange={onChangeHandler}>
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
                  <th className="p-3">Ticket Code</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Employee Name</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Date</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {ticketsList?.map((row, i) => (
                  <tr key={i}>
                    <td className="p-3">{skip + i + 1}</td>
                    <td className="p-3">{row?.ticket_code || ""}</td>
                    <td className="p-3">{row?.priority || ""}</td>
                    <td className="p-3">
                      {userData.first_name + " " + userData.last_name}
                    </td>
                    <td className="p-3">{row.subject}</td>
                    <td className="p-3">
                      {moment(row?.created_at).format("MM-DD-YYYY") || ""}
                    </td>
                    <td className="p-3">
                      <center>
                        <Image
                          src="images/view.png"
                          alt="viewImage"
                          className={`mx-2 ${styles.hoverInfo}`}
                          onClick={() => viewTicket(row)}
                        />
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
