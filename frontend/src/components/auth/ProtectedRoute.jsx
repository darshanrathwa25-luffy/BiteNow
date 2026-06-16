import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentRole } from '../../hooks/useCurrentRole';

export function ProtectedRoute({ allowedRoles, children }) {
  const { role, isLoaded, isSignedIn } = useCurrentRole();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
