import dynamic from "next/dynamic";
import Layout from "../src/components/common/mainHeaderFooterLayout";
import styles from "../src/styles/login.module.scss";
const LoginComponent = dynamic(() =>
  import("../src/components/common/mainPage")
);

export default function Index() {
  return (
    <div>
      <Layout title="Home | HRMS" data={{ layoutType: "PAGE", pageScreen: "login" }} description="HRMS Portal">
        <LoginComponent styles={styles} />
      </Layout>
    </div>
  );
}
