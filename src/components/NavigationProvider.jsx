import { useEffect } from 'react';
import { useNavigation } from '../utils/navigation';

const NavigationProvider = () => {
  const nav = useNavigation();
  useEffect(() => {
    // Initialize the navigateFn in the navigation utility
    if (nav) {
      // navigateFn = nav;
    }
  }, [nav]);

  return null; // This component doesn't render anything
};

export default NavigationProvider;