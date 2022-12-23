import dynamic from 'next/dynamic';
import { LazyLoaderGeneral } from '../../src/components/common/lazyLoderComponent';
import Layout from '../../src/components/common/mainHeaderFooterLayout';

const DetailsComponent = dynamic(() => import('../../src/components/CandidateDetails/index'), {
  loading: () => <LazyLoaderGeneral />,
});

export default function directory() {
  return (
    <Layout title={`Directory | HRMS`} data={{ layoutType: 'HOME' }} description={`HRMS Candidate Details`}>
          <div className="container">
        <DetailsComponent />
      </div>
    </Layout>
  );
}
