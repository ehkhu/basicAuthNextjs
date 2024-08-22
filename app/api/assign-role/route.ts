
import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    const { userId, roleId }:any = await request.json();
    console.log(userId,roleId);
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          role: {
            connect: { id: parseInt(roleId) },
          },
        },
      });

      NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
      console.error('Error assigning role:', error);
      NextResponse.json({ error: 'Failed to assign role' });
    }
    return NextResponse.json({ message: "success" });
}
