import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { openAuthModal } from '@/store/userSlice';
import type  {RootState } from '@/store'

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const dispatch = useDispatch();
  const authStatus = useSelector((state: RootState) => state.user.authStatus);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      dispatch(openAuthModal());
    }
  }, [authStatus, dispatch]);

  if (authStatus === 'checking') {
    return null;
  }

  if (authStatus === 'unauthenticated') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
