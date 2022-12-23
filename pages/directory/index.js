import dynamic from 'next/dynamic';
import { LazyLoaderGeneral } from '../../src/components/common/lazyLoderComponent';
import Layout from '../../src/components/common/mainHeaderFooterLayout';

const DirectoryComponent = dynamic(() => import('../../src/components/Directory/index'), {
  loading: () => <LazyLoaderGeneral />,
});

export default function directory() {
  return (
    <Layout title={`Directory | HRMS`} data={{ layoutType: 'HOME' }} description={`HRMS Directory`}>
          <div className="container">
        <DirectoryComponent />
      </div>
    </Layout>
  );
}
