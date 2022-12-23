import dynamic from "next/dynamic";
import { LazyLoaderGeneral } from "../src/components/common/lazyLoderComponent";
import Layout from "../src/components/common/mainHeaderFooterLayout";

const DashboardComponent = dynamic(() => import("../src/components/Dashbord"), {
  loading: () => <LazyLoaderGeneral />,
});

export default function Dashboard() {
  return (
    <Layout
      title={`Dashboard | HRMS`}
      data={{ layoutType: "HOME" }}
      description={`HRMS Dashboard`}
    >
      <div className="container pt-4">
        <DashboardComponent />
      </div>
    </Layout>
  );
}
