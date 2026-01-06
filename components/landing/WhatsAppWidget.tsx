"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";
import { useEffect, useState } from "react";

export default function WhatsAppWidget() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (

        <FloatingWhatsApp

            phoneNumber="8801742077650"
            accountName="Unison Support"
            chatMessage="Hi! How can we help you?"
            statusMessage="Typically replies within 1 hour"
            placeholder="Type a message..."
            avatar="/assets/img/account/03.jpg"
            allowClickAway={true}
            allowEsc={true}

            buttonStyle={{ bottom: "100px", right: "20px" }}
            chatboxHeight={400}
            darkMode={false}
        />
    );
}