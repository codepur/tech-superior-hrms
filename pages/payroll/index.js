import dynamic from "next/dynamic";
import { LazyLoaderGeneral } from "../../src/components/common/lazyLoderComponent";
import Layout from "../../src/components/common/mainHeaderFooterLayout";
import styles from "../../src/styles/ProfileManagement.module.scss";
const PayrollComponent = dynamic(
  () => import("../../src/components/Payroll/index"),
  {
    loading: () => <LazyLoaderGeneral />,
  }
);

export default function PayrollManagement() {
  return (
    <Layout
      title={`Payroll | HRMS`}
      data={{ layoutType: "HOME" }}
      description={`HRMS Payroll`}
    >
      <div className={`container ${styles.fullContainer}`}>
        <PayrollComponent />
      </div>
    </Layout>
  );
}
