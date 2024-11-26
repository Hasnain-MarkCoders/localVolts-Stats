// src/utils/navigation.js
import { useNavigate as useReactNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

let navigateFn;

export const useNavigation = () => {
  const navigate = useReactNavigate();
  const navigateRef = useRef(navigate);

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  return navigateRef.current;
};

export const navigate = (path, options) => {
  if (navigateFn) {
    navigateFn(path, options);
  } else {
    console.error('Navigate function is not initialized yet.');
  }
};


export const  getTodayDate=()=> {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day-1}`;
}


export const parseCustomDate = (dateString) => {
  const [datePart] = dateString.split(','); // Extract the date part "26th-Nov-2024"
  const [day, month, year] = datePart.split('-'); // "26th", "Nov", "2024"
  
  // Convert the date to a standard format (YYYY-MM-DD)
  const formattedDate = `${year}-${month}-${day.replace(/\D/g, '')}`;
  
  return new Date(formattedDate);
};