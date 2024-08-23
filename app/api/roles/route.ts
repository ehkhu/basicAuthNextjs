
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
        include: {
          permissions: true, // Assuming there's a relation between roles and permissions
        },
      })
    return NextResponse.json(roles);  
  } catch (e) {
    console.log({ e });
    return NextResponse.json({message:"error"});  
  }
}