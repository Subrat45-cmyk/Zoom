import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';

const NotFoundPage = () => {
  return (
    <div className="flex h-full min-h-[50vh] w-full items-center justify-center">
      <EmptyState 
        title="404 - Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
        action={
          <Link to="/dashboard">
            <Button variant="primary">Return to Dashboard</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;
