import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultPosition = 'bottom-right';
const defaultTime = 3000;

export const showSuccessToast = ({
    title = "Success",
    content = "",
    position = defaultPosition,
    time = defaultTime,
  }) => {
    toast.success(
      <div>
        <strong>{title}</strong>
        <p>{content}</p>
      </div>,
      {
        position,
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  export const showErrorToast = ({
    title = "Error",
    content = "",
    position = defaultPosition,
    time = defaultTime,
  }) => {
    toast.error(
      <div>
        <strong>{title}</strong>
        <p>{content}</p>
      </div>,
      {
        position,
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };