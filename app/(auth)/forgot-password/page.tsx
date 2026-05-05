"use client"

import { useState } from "react";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(email); // call API
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">

                <h2 className="text-2xl font-bold text-center mb-4">
                    Forgot Password
                </h2>

                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your email and we’ll send you a reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 mt-3">

                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        required
                    />

                    <button className="mt-4 w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700">
                        Send Reset Link
                    </button>
                </form>

            </div>
        </div>
    );
}
