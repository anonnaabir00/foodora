// app/api/auth/route.js
import { NextResponse } from 'next/server';
import { connect } from '@/app/lib/db'; // Ensure this path is correct
import User from '@/app/models/userModel'; // Ensure this path is correct
import bcryptjs from 'bcryptjs';

export async function POST(request) {
    try {
        // Ensure DB connection before proceeding
        await connect();

        // Parse the request body
        const reqBody = await request.json();
        const { action, email, password, name } = reqBody;

        console.log('Received request:', { action, email, name });

        // Handle Sign In
        if (action === 'signin') {
            // Find the user by email
            const user = await User.findOne({ email }).exec();
            console.log('Sign in - User found:', user ? 'Yes' : 'No');

            // If user does not exist, return an error
            if (!user) {
                return NextResponse.json(
                    { error: "User does not exist" },
                    { status: 400 }
                );
            }

            // Compare the provided password with the hashed password in the database
            const validPassword = await bcryptjs.compare(password, user.password);
            if (!validPassword) {
                return NextResponse.json(
                    { error: "Invalid password" },
                    { status: 400 }
                );
            }

            // Return user data (excluding password)
            const userData = {
                id: user._id,
                email: user.email,
                name: user.name,
            };

            return NextResponse.json({
                message: "Login successful",
                success: true,
                user: userData
            });
        }

        // Handle Sign Up
        if (action === 'signup') {
            console.log('Starting signup process');

            // Check if the user already exists
            const userExists = await User.findOne({ email }).exec();
            if (userExists) {
                console.log('User already exists');
                return NextResponse.json(
                    { error: "User already exists" },
                    { status: 400 }
                );
            }

            // Hash the password
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);

            // Create a new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            console.log('Attempting to save user:', { name, email });

            // Save the user to the database
            const savedUser = await newUser.save();
            console.log('User saved successfully:', savedUser);

            // Return user data (excluding password)
            const userData = {
                id: savedUser._id,
                email: savedUser.email,
                name: savedUser.name,
            };

            return NextResponse.json({
                message: "User created successfully",
                success: true,
                user: userData
            });
        }

        // If the action is not recognized, return an error
        return NextResponse.json(
            { error: "Invalid action" },
            { status: 400 }
        );

    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}