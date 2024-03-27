import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/store/AuthContext';

import FullScreenLoader from '../general/FullScreenLoader';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const { authState } = useAuth();

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      if (!authState.loading && !authState.isLoggedIn) {
        router.push('/login');
      } else if (!authState.loading && authState.isLoggedIn) {
        setAuthenticated(true);
      }
    }, [authState.isLoggedIn, authState.loading, router]);

    if (authState.loading && !authenticated) {
      return <FullScreenLoader />;
    }

    return authenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
