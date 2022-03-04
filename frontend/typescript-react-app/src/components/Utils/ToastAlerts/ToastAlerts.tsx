import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import React from 'react';

class ToastAlerts extends React.Component
{
    constructor(pros)
    {
        super(pros);
    }

    notifyDanger(Param: string)
    {
        toast.warning(Param, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      };

      notifySuccess(Param: string)
      {
          toast.success(Param, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        };

} export default ToastAlerts;
