// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        const connection = await mysql.createConnection({
            host: '91.219.60.69',
            port: 3306,
            user: 'root',
            password: 'Admin @123',
            database: 'foodoradb'
        });

        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password]
        );

        await connection.end();

        if (rows.length > 0) {
            return NextResponse.json({
                success: true,
                user: rows[0]
            });
        }

        return NextResponse.json({
            success: false,
            message: 'Invalid credentials'
        }, { status: 401 });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false,
            message: 'Login failed'
        }, { status: 500 });
    }
}