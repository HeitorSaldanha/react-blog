import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface Props {
  path?: {
    label: string;
    icon: IconDefinition;
  }[];
}

export const Breadcrumb: React.FC<Props> = ({ path }) => {
  return (
    <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
      <ul>
        <li className={path ? '' : 'is-active'}>
          <Link to="/">
            <span className="icon is-small">
              <FontAwesomeIcon icon={faHouse} />
            </span>
            <span>Home</span>
          </Link>
        </li>
        {path &&
          path.map(({ label, icon }, i) => (
            <li className="is-active" key={`breadcrumb-${i}`}>
              <Link to="/">
                <span className="icon is-small">
                  <FontAwesomeIcon icon={icon} />
                </span>
                <span>{label}</span>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};
