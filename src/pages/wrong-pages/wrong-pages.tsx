import { Navigate } from 'react-router-dom';

import { ROUTES_NAMES } from '../../constants/routes';

export const WrongPage = () => <Navigate to={`${ROUTES_NAMES.ALL_BOOKS}`} />;
