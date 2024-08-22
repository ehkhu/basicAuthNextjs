'use client'
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function AssignPermissionsToRoleForm({ roles, permissions }:any) {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const permissionId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedPermissions((prev) => [...prev, permissionId]);
    } else {
      setSelectedPermissions((prev) => prev.filter((id) => id !== permissionId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole || selectedPermissions.length === 0) {
      alert("Please select a role and at least one permission.");
      return;
    }

    try {
      const response = await fetch('/api/assign-permissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roleId: selectedRole,
          permissionIds: selectedPermissions,
        }),
      });

      if (response.ok) {
        alert('Permissions assigned successfully!');
      } else {
        alert('Failed to assign permissions.');
      }
    } catch (error) {
      console.error('Error assigning permissions:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Role:</label>
      <select
        value={selectedRole ?? ''} // Default to an empty string if selectedRole is null
        onChange={(e) => setSelectedRole(parseInt(e.target.value))}
      >
        <option value="">Select a role</option>
        {roles.map((role:any) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>

      <label>Permissions:</label>
      {permissions.map((permission:any) => (
        <div key={permission.id}>
          <input
            type="checkbox"
            value={permission.id}
            onChange={handlePermissionChange}
          />
          <label>{permission.name}</label>
        </div>
      ))}

      <Button type="submit">Assign Permissions</Button>
    </form>
  );
}

export default AssignPermissionsToRoleForm;
