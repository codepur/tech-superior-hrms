import dynamic from "next/dynamic";
import { LazyLoaderGeneral } from "../../src/components/common/lazyLoderComponent";
import Layout from "../../src/components/common/mainHeaderFooterLayout";
import styles from "../../src/styles/ProfileManagement.module.scss";
const ProfileComponent = dynamic(
  () => import("../../src/components/ProfileManagement/index"),
  {
    loading: () => <LazyLoaderGeneral />,
  }
);

export default function TicketManagement() {
  return (
    <Layout
      title={`Profile | HRMS`}
      data={{ layoutType: "HOME" }}
      description={`HRMS Profile`}
    >
      <div className={`container ${styles.fullContainer}`}>
        <ProfileComponent />
      </div>
    </Layout>
  );
}
