'use client';
import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../../../utils/api.js';

interface UserDetailsProps {
  userId: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails(userId);
        setUser(data.user);
      } catch (error) {
        setError('Error fetching user details');
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserDetails;

