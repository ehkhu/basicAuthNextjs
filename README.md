npm install next-auth@beta
npx auth secret
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev
npm exec prisma generate
npm exec prisma migrate dev
npm prisma migrate dev


for image upload 
 npm i next-cloudinary cloudinary
 lib/db.ts for fake db
 compoments/atatar-upload.tsx
 api : sign-coudinary-params/route.ts
 sample page : app/avatar/page