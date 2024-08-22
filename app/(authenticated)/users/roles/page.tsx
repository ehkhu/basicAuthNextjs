import prisma from "@/prisma/client";
import AssignPermissionsToRoleForm from "../permissions/form";
import AssignRoleToUserForm from "./form";


async function AdminPage() {
    const users = await prisma.user.findMany();
    const roles = await prisma.role.findMany();
    const permissions = await prisma.permission.findMany();
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AssignRoleToUserForm users={users} roles={roles} />
      <AssignPermissionsToRoleForm roles={roles} permissions={permissions} />
    </div>
  );
}

export default AdminPage;
