import Link from 'next/link';
import Image from 'next/image';
import Layout from '../src/components/common/mainHeaderFooterLayout';

const Error = ({ statusCode }) => {
  return (
    <Layout>
      <div className="err-content">
        <div className="container-fluid grey-bg not-found">
          <div className="d-flex align-items-center justify-content-center text-center error-page">
            <div className="d-flex flex-column">
              {statusCode ? (
                <div className="error">
                  <div className="top-icon">
                    {/* <Image src="/images/404.png" alt="alt-img" width={320} height={320} /> */}
                  </div>
                  <div className="oops">
                    <h2 className="oops-title">Ops! Page not found</h2>
                    <b>Unfortunately, This document is not available !</b>
                    <p className="oops-details">
                      The page you are looking for might have moved, been renamed or perhaps never existed.
                    </p>
                    <Link href="/" passHref>
                      <a className="back-to-home">Back Home</a>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="global-internal-error">
                  <h1>Internal error</h1>
                  <p>You do not need to do anything. We have been notified and will fix the error right away!</p>
                </div>
              )}{' '}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default Error;
