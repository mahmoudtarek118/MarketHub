import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                alert("Password reset email sent!");
            } else {
                const data = await response.json();
                throw new Error(data.error || "Failed to send password reset email");
            }
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    return (
        <div className="content">
            <h2 className="title">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <span className="details">Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="button">
                    <input type="submit" value="Reset Password" />
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;