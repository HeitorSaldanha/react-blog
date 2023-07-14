import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export const Loader: React.FC = () => (
  <div className="column has-text-centered">
    <FontAwesomeIcon
      size="10x"
      icon={faCog}
      spin
      style={{ animationDuration: '1s' }}
      data-testid="loader-icon"
    />
  </div>
);
