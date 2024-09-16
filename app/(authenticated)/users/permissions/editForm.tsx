'use client';

import { Button } from '@/components/ui/button';
import { useRoles } from '@/hook/useRoles';
import { useEffect, useState } from 'react';

// Define the Permission type

type Role = {
  id: number;
  name: string;
  permissions : Permission[]
};

type Permission = {
  id: number;
  name: string;
};

function EditRolePermissionsForm({
  allRoles,
  allPermissions,
}: {
  allRoles: Role[];
  allPermissions: Permission[];
}) {

  

const [roles, setRoles] = useState<Role[]>(allRoles);

// Function to update roles
const updateRoles = async () => {
  try {
    const response = await fetch('/api/roles');
    if (response.ok) {
      const updatedRoles = await response.json();
      setRoles(updatedRoles);
    } else {
      console.error('Failed to fetch roles');
    }
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

  

  // selectedRole will be an object containing role data or null
  const [selectedRole, setSelectedRole] = useState<Role| null>();
  // selectedPermissions is an array of numbers representing permission IDs
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  // Handle role change and populate permissions for the selected role
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roleId = parseInt(e.target.value);
    const role = roles.find((role) => role.id === roleId);
    setSelectedRole(role);
    if(role)
    setSelectedPermissions(role?.permissions.map((perm:any) => perm.id) || []);
  };

  // Handle permission checkbox changes
  const handlePermissionChange = (permissionId: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedPermissions((prev) => [...prev, permissionId]);
    } else {
      setSelectedPermissions((prev) => prev.filter((id) => id !== permissionId));
    }
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }

    try {
      const response = await fetch(`/api/assign-permissions`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roleId: selectedRole.id,
          permissionIds: selectedPermissions,
        }),
      });

      if (response.ok) {
        await updateRoles();
        alert('Permissions updated successfully!');
      } 
      else {
        alert('Failed to update permissions.');
      }
    } catch (error) {
      console.error('Error updating permissions:', error);
    }

  };

  return (
    <>
     <div>
    {roles.map((role) => (
      <div key={role.id}>
        <h3>#{role.name}</h3>
        <ul>
          {role.permissions.map((permission) => (
            <li key={permission.id}>--{permission.name}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>

    <p>................=====...................</p>

    <form onSubmit={handleSubmit}>
      <label>Role:</label>
      <select onChange={handleRoleChange} value={selectedRole?.id || ''}>
        <option value="">Select a role</option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>

      {selectedRole && (
        <>
          <label>Permissions:</label>
          {allPermissions.map((permission) => (
            <div key={permission.id}>
              <input
                type="checkbox"
                checked={selectedPermissions.includes(permission.id)}
                onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
              />
              <label>{permission.name}</label>
            </div>
          ))}
          <Button type="submit">Save Changes</Button>
        </>
      )}
    </form>
    </>
    
  );
}

export default EditRolePermissionsForm;
