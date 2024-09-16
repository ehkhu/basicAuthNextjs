import prisma from "@/prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// import { v2 as cloudinary } from "cloudinary";

const bcrypt = require('bcryptjs');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/*
for Next Authjs
password hashing
*/
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/*
passowrd verify 
user password and hashed password
*/
export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

/*
select auth user from db and verify password
*/
export async function getUserFromDb(email: string, password: string) {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(), // Convert email to lowercase
      },
      include: { role: { include: { permissions: true } } }, // include role and permission
    });

    // If no user found, return null
    if (!user) {
      return null;
    }
    
    // Verify the password using bcrypt
    const isPasswordValid = await verifyPassword(password, user.password);

    // If the password is not valid, return null
    if (!isPasswordValid) {
      return null;
    }

    // Return the user if everything is valid
    return user;
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    throw new Error("Failed to fetch user");
  }
}

// Assign permissions to a role
export async function assignPermissionsToRole(roleId: number, permissionIds: number[]) {
  try {
    // Update the role with the new permissions
    const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: {
        permissions: {
          connect: permissionIds.map((id) => ({ id })), // Connect the permissions to the role
        },
      },
    });

    return updatedRole;
  } catch (error) {
    console.error("Error assigning permissions to role:", error);
    throw error;
  }
}

// Assign a role to a user
async function assignRoleToUser(userId: number, roleId: number) {
  try {
    // Update the user with the new role
    const updatedUser = await prisma.user.update({
      where: { id: userId+"" },
      data: {
        role: {
          connect: { id: roleId }, // Connect the role to the user
        },
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error assigning role to user:", error);
    throw error;
  }
}


type FetcherArgs = [input: RequestInfo, init?: RequestInit];
type FetcherResult = Promise<any>;

export const fetcher: (...args: FetcherArgs) => FetcherResult = (...args) =>
  fetch(...args)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(new Error('Network response was not ok'));
      }
      return res.json();
    });

    
