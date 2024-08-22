'use client'
import { Button } from '@/components/ui/button';
import { Role, User } from '@prisma/client';
import { useState } from 'react';

function AssignRoleToUserForm({ users, roles }:any) {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!selectedUser || !selectedRole) {
      alert("Please select a user and a role.");
      return;
    }

    try {
      const response = await fetch('/api/assign-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser,
          roleId: selectedRole,
        }),
      });

      if (response.ok) {
        alert('Role assigned successfully!');
      } else {
        alert('Failed to assign role.');
      }
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>User:</label>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select a user</option>
        {users.map((user:User) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
      </select>

      <label>Role:</label>
      <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
        <option value="">Select a role</option>
        {roles.map((role:Role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>

      <Button type="submit">Assign Role</Button>
    </form>
  );
}

export default AssignRoleToUserForm;
