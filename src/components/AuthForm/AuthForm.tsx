import { useState } from "react";
import { AuthFormData } from "../../types/auth";
import Button from "../Button/Button";
import styles from "./AuthForm.module.css";

interface AuthFormProps {
    type: "signup" | "signin";
    onSubmit: (formData: AuthFormData) => void;
    error?: string|null;
    loading: boolean;
}

export default function AuthForm({ type, onSubmit, error, loading }: AuthFormProps) {
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
        <form onSubmit={handleSubmit} className={styles.form} >
            <div className={styles.formContainer}>
                <div className={styles.email}>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={styles.input}
                        required />
                </div>
                <div className={styles.password}>
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className={styles.input}
                        required />
                </div>
                {type === "signup" && 
                    <div className={styles.name}>
                        <input 
                            type="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className={styles.input}
                            required />
                    </div>
                }

                {error  && <p>{error}</p>}
                <Button variant="primary" type="submit" style={{ marginTop: "15px", width: "200px", height: "40px" }} disabled={loading}>{type === "signup" ? "Create Account" : "Sing In"}</Button>
            </div>
        </form>
    );
}
