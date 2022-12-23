import _ from 'lodash';
import toast from 'react-hot-toast';
import 'reactjs-toastr/lib/toast.css';

export const handleErrorMessage = (err) => {
    if (
      err.response &&
      err.response.data &&
      (err.response.data.success === false || err.response.data.status === false) &&
      err.response.data.message
    ) {
      toast.error(err.response.data.message, {
        position: "top-right",
        style: {
          padding: '16px',
          color: '#3c5f4b',
          marginRight: '25px',
        },
      })
    } else {
      toast.error(err.message, {
        position: "top-right",
        style: {
          padding: '16px',
          color: '#3c5f4b',
          marginRight: '25px',
        },
      })
    }
  };