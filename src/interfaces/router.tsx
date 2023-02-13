import React from 'react';

export interface Router {
  path: string;
  component: React.FC;
  exact?: boolean;
}
