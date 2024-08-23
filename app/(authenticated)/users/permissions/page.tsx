import prisma from "@/prisma/client";
import EditRolePermissionsForm from "./editForm";

export default async function EditRolePermissionsPage() {
  // Fetch roles and their permissions
  const roles = await prisma.role.findMany({
    include: {
      permissions: true, // Assuming there's a relation between roles and permissions
    },
  });

  const allPermissions = await prisma.permission.findMany();

  return (
    <div>
      <h1>Edit Role Permissions</h1>
      {/* <EditRolePermissionsForm allRoles={roles} allPermissions={allPermissions} /> */}
      <EditRolePermissionsForm allPermissions={allPermissions} allRoles={roles}></EditRolePermissionsForm>
    </div>
  );
}