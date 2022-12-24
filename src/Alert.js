import React, { useEffect } from 'react'

const Alert = ({type, msg, list, removeAlert}) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [list, removeAlert])
  return <p className={`text-center mb-2 ${type}`}>{msg}</p>
}

export default Alert