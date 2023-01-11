import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import { Button } from 'react-bootstrap';
import styles from '../../styles/Common.module.scss';
const PaginationComponent = ({ currentPage, skip, list, onPageChange, limitPerPage, loading }) => {
  return (
    <ul className={`pagination ${styles.paginationContainer}`}>
      {list && list.length ? (
        <Pagination
          onChange={onPageChange}
          current={currentPage}
          total={list.length}
          pageSize={limitPerPage}
          showLessItems
          locale={localeInfo}
          nextIcon={
           <div>Next</div>
          }
          prevIcon={
            <div> Previous</div>
          }
        />
      ) : (
        !loading && <div className="text-center">No Records Found.</div>
      )}
    </ul>
  );
};
export default PaginationComponent;