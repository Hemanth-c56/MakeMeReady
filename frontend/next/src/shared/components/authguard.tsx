import React from 'react';

function AuthGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default AuthGuard;
