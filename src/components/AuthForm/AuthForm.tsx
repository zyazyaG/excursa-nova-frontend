import { useState } from "react";
import { AuthFormData } from "../../types/auth";
import Button from "../Button/Button";
import styles from "./AuthForm.module.css";

interface AuthFormProps {
    type: "signup" | "signin";
    onSubmit: (formData: AuthFormData) => void;
    error?: string|null;
}

export default function AuthForm({ type, onSubmit, error }: AuthFormProps) {
    const [formData, setFormData] = useState<AuthFormData>({
        email: "",
        password: "",
        name: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.form}>
                <div>
                    <label>Email: </label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required />
                </div>
                {type === "signup" && 
                    <div>
                        <label>Name </label>
                        <input 
                            type="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required />
                    </div>
                }

                {error  && <p>{error}</p>}
                <Button variant="primary" type="submit" style={{ marginTop: "15px", width: "150px" }}>{type === "signup" ? "Create Account" : "Sing In"}</Button>
            </div>
        </form>
    );
}
