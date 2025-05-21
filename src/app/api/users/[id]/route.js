import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const updates = await request.json();
    
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    const userIndex = dbData.users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user data
    dbData.users[userIndex] = {
      ...dbData.users[userIndex],
      ...updates,
      id: parseInt(id) // Ensure ID remains the same
    };

    // Write updated data back to db.json
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    
    return NextResponse.json(dbData.users[userIndex]);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    const userIndex = dbData.users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove user from array
    dbData.users.splice(userIndex, 1);

    // Write updated data back to db.json
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 