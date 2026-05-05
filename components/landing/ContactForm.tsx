'use client'

import { contactAction } from "@/app/actions/contact";
import { useState } from "react";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const result = await contactAction(formData);

        if (result?.error) {
            setStatus("error");
            setMessage(result.error);
        } else {
            setStatus("success");
            setMessage("Your message has been sent successfully!");
            (e.target as HTMLFormElement).reset();
        }
    }

    return (
        <form onSubmit={handleSubmit} id="contact-form">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="subject"
                    placeholder="Your Subject"
                    required
                />
            </div>
            <div className="form-group">
                <textarea
                    name="message"
                    cols={30}
                    rows={4}
                    className="form-control"
                    placeholder="Write Your Message"
                    required
                    defaultValue=""
                />
            </div>

            <button
                type="submit"
                className="theme-btn"
                disabled={status === "loading"}
            >
                {status === "loading" ? "Sending..." : "Send Message"}
                <i className="far fa-paper-plane" />
            </button>

            <div className="col-md-12 my-3">
                {status === "success" && (
                    <div className="form-message text-success">{message}</div>
                )}
                {status === "error" && (
                    <div className="form-message text-danger">{message}</div>
                )}
            </div>
        </form>
    );
}