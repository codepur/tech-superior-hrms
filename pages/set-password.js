import dynamic from "next/dynamic";
import Layout from "../src/components/common/mainHeaderFooterLayout";
import styles from "../src/styles/login.module.scss";
const SetPassComponent = dynamic(() =>
  import("../src/components/common/setPassword")
);

export default function Index() {
  return (
    <div>
      <Layout title="Home | HRMS" data={{ layoutType: "PAGE", pageScreen: "setPassword" }} description="HRMS Portal">
        <SetPassComponent styles={styles} />
      </Layout>
    </div>
  );
}
