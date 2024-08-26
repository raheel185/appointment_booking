import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { performLogout } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

const Logout = () => {
  const dispatch = useDispatch();
  const nav=useNavigate();
  const [loading,setLoading]=useState(true)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(()=>{
    const handleLogout = () => {
      dispatch(performLogout());
    };
    setTimeout(() => {
      setLoading(false)
      nav('/')
      handleLogout()
    }, 1000);
  })
  
  if (loading) return <Spin style={{position:'fixed',top:'50%',bottom:'50%',left:'50%'}} spinning size="large" />;

  return (
    <></>
  );
};

export default Logout;
