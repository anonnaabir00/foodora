// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        const connection = await mysql.createConnection({
            host: '91.219.60.69',
            port: 3306,
            user: 'root',
            password: 'Admin @123',
            database: 'foodoradb'
        });

        // Check if email already exists
        const [existing] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            await connection.end();
            return NextResponse.json({
                success: false,
                message: 'Email already exists'
            }, { status: 400 });
        }

        // Insert new user
        const [result] = await connection.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );

        await connection.end();

        return NextResponse.json({
            success: true,
            message: 'User created successfully'
        });

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({
            success: false,
            message: 'Signup failed'
        }, { status: 500 });
    }
}