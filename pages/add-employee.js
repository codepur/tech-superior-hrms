import dynamic from "next/dynamic";
import { LazyLoaderGeneral } from "../src/components/common/lazyLoderComponent";
import Layout from "../src/components/common/mainHeaderFooterLayout";
import styles from "../src/styles/ProfileManagement.module.scss";
const AdminComponent = dynamic(
  () => import("../src/components/EmployeeManagement/employeeCreate"),
  {
    loading: () => <LazyLoaderGeneral />,
  }
);

export default function Index() {
  return (
    <Layout
      title={`Add employee | HRMS`}
      data={{ layoutType: "HOME" }}
      description={`HRMS Profile`}
    >
      <div className={`container ${styles.fullContainer}`}>
        <AdminComponent />
      </div>
    </Layout>
  );
}
