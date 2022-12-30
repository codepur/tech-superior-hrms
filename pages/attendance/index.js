import dynamic from "next/dynamic";
import { LazyLoaderGeneral } from "../../src/components/common/lazyLoderComponent";
import Layout from "../../src/components/common/mainHeaderFooterLayout";

const Attendance = dynamic(
  () => import("../../src/components/Attendance/index"),
  {
    loading: () => <LazyLoaderGeneral />,
  }
);

export default function directory() {
  return (
    <Layout
      title={`Directory | HRMS`}
      data={{ layoutType: "HOME" }}
      description={`HRMS Candidate Details`}
    >
      <div className="container">
        <Attendance />
      </div>
    </Layout>
  );
}
