import _ from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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

const EmployeeCard = dynamic(() => import("./employeeCard"));
const EmployeeGrid = dynamic(() => import("./employeeGrid"));

function Directory() {
  const [userList] = useSelector((Gstate) => [Gstate.user?.userList]);
  // const router = useRouter();
  const [gridView, setGridView] = useState(true);
  const [filters, setFilters] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [searchData, setSearchData] = useState([]);

  const all_department = _.uniq(userList?.map((data) => data?.user_type));
  const onChangeHandler = (event) => {
    setSearchKey(event?.target?.value);
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
  const filterData = "";
  const handleSelectFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, value }));
    // setSearchData(filters)
    if (value !== "all") {
      filterData = userList?.filter((item) => item?.user_type === value);
      setSearchData(filterData)
    } else {
      setSearchData(userList);
    }
  };
  useEffect(() => {
    setSearchData(userList);
    let department = filters.user_type || "all";
  }, [userList?.length]);
  return (
    <>
      <div className="me-4 mt-3">
        <div className={`${styles.departmentFilter} row`}>
          <div
            className={`${styles.searchBar} col-md-8 h-100 w-25`}
            onChange={onChangeHandler}
          >
            <InputGroup>
              <FormControl
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={handleFilter}
                value={searchKey}
              />
              <Button className={`${styles.searchIcon}`}>
                <Image src="/images/searchWhite.png" alt="profilePicture" />
              </Button>
            </InputGroup>
          </div>
          <div className="col-md-4 row">
            <Form.Group className="col-md-8">
              <Form.Label>Department</Form.Label>
              <Form.Select
                aria-label="Default select example"
                // className="custom_select"
                name="department"
                value={filters.user_type}
                onChange={handleSelectFilter}
              >
                <option value="all">All</option>
                {all_department?.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className={`${styles.switchBtn} col-md-4 pt-4`}>
              <div className={`${!gridView && styles.gridView}`}>
                <Image
                  src={
                    !gridView
                      ? "/images/grid-view.png"
                      : "/images/grid-view-active.png"
                  }
                  data-toggle="tooltip"
                  title="List View"
                  className={`float-end ${styles.gridIcon} ${gridView ? `pt-2` : ""
                    }`}
                  onClick={() => setGridView(false)}
                />
              </div>
              <div className={`${gridView && styles.cardView}`}>
                <Image
                  src={
                    gridView
                      ? "/images/card-view.png"
                      : "/images/card-view-active.png"
                  }
                  data-toggle="tooltip"
                  title="Grid View"
                  className={`float-end ms-1 ${styles.gridIcon} ${gridView ? `` : "pt-2"
                    }`}
                  onClick={() => setGridView(true)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`row`}>
          {gridView ? (
            <EmployeeCard
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              searchData={searchData}
            />
          ) : (
            <EmployeeGrid
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              searchData={searchData}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default Directory;
