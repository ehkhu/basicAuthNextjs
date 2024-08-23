import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  
    const { roleId, permissionIds } = await request.json();

    try {
      const updatedRole = await prisma.role.update({
        where: { id: parseInt(roleId) },
        data: {
          permissions: {
            connect: permissionIds.map((id:any) => ({ id })),
          },
        },
      });

      return  NextResponse.json({ success: true, role: updatedRole });
    } catch (error) {
      console.error('Error assigning permissions:', error);
      return NextResponse.json({ error: 'Failed to assign permissions' });
    }
  
}

export async function PATCH(request: Request) {
  const { roleId, permissionIds } = await request.json();

  try {
    // Update the role's permissions
    await prisma.role.update({
      where: { id: roleId },
      data: {
        permissions: {
          set: permissionIds.map((id: number) => ({ id })),
        },
      },
    });

    return NextResponse.json({ message: 'Permissions updated successfully' });
  } catch (error) {
    console.error('Failed to update permissions:', error);
    return NextResponse.json({ error: 'Failed to update permissions' });
  }
  
}