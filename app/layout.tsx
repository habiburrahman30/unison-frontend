
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Unison Biz Limited",
    template: "%s | Unison Biz Limited",
  },
  description: "Unison Biz Limited official website",
  keywords: ["Unison", "Business", "Corporate"],
  icons: {
    icon: "/assets/img/logo/favicon.png",
  },
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-arp="">
      <head>

        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />

        <title>Unison Biz Limited</title>

        <link rel="icon" type="image/x-icon" href="/assets/img/logo/favicon.png" />

        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/all-fontawesome.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.min.css" />
        <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/assets/css/jquery-ui.min.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased home-2`}
      >

        {children}


        {/* <!-- js --> */}
        {/* <Script data-cfasync="false" src="../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></Script> */}
        <Script type="text/javascript" src="/assets/js/jquery-3.7.1.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/modernizr.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/bootstrap.bundle.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/imagesloaded.pkgd.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/jquery.magnific-popup.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/isotope.pkgd.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/jquery.appear.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/jquery.easing.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/owl.carousel.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/counter-up.js"></Script>
        <Script type="text/javascript" src="/assets/js/jquery-ui.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/jquery.nice-select.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/countdown.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/wow.min.js"></Script>
        <Script type="text/javascript" src="/assets/js/flex-slider.js"></Script>
        <Script type="text/javascript" src="/assets/js/main.js"></Script>

      </body>


    </html>
  );
}
