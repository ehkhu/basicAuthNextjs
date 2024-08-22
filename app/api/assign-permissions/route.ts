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

      NextResponse.json({ success: true, role: updatedRole });
    } catch (error) {
      console.error('Error assigning permissions:', error);
      NextResponse.json({ error: 'Failed to assign permissions' });
    }
    return NextResponse.json({ message: "success" });
}
