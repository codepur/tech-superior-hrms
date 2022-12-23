import dynamic from "next/dynamic";
import { LazyLoaderGeneral } from "../../src/components/common/lazyLoderComponent";
import Layout from "../../src/components/common/mainHeaderFooterLayout";
import styles from "../../src/styles/ProfileManagement.module.scss";
const HiringComponent = dynamic(
  () => import("../../src/components/HiringPortal/index"),
  {
    loading: () => <LazyLoaderGeneral />,
  }
);

export default function TicketManagement() {
  return (
    <Layout
      title={`Hiring | HRMS`}
      data={{ layoutType: "HOME" }}
      description={`HRMS Hiring`}
    >
      <div className={`container ${styles.fullContainer}`}>
        <HiringComponent />
      </div>
    </Layout>
  );
}
