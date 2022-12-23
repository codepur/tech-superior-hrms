import Spinner from "react-bootstrap/Spinner";

export const LazyLoaderGeneral = (props) => {
  return (
    <div className="lazy-loader">
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
        className="mt-4 me-2"
      />
    </div>
  );
};
