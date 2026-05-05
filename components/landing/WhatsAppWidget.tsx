"use client";

export default function WhatsAppWidget() {
    const phoneNumber = "8801723435818";
    const message = encodeURIComponent("Hi! How can we help you?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: "fixed",
                bottom: "100px",
                right: "20px",
                zIndex: 9999,
                backgroundColor: "#25D366",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                cursor: "pointer",
            }
            }
        >
            <i className="fab fa-whatsapp" style={{ fontSize: "32px", color: "#fff" }} />
        </a >
    );
}