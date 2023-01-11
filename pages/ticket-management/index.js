import dynamic from 'next/dynamic';
import { LazyLoaderGeneral } from '../../src/components/common/lazyLoderComponent';
import Layout from '../../src/components/common/mainHeaderFooterLayout';

const TicketComponent = dynamic(() => import('../../src/components/TicketManagement/index'), {
  loading: () => <LazyLoaderGeneral />,
});

export default function TicketManagement() {
  return (
    <Layout title={`Ticket | HRMS`} data={{ layoutType: 'HOME' }} description={`HRMS Dashboard`}>
          <div className="container">
        <TicketComponent />
      </div>
    </Layout>
  );
}
