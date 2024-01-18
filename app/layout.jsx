import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PHProvider } from "./providers";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

export const metadata = {
  title: "Notion Gradients",
  description: "Generate beautiful gradient covers for your Notion pages",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full h-full">
      <PHProvider>
        <head>
          <meta property="og:image" content="<generated>" />
          <meta property="og:image:type" content="<generated>" />
          <meta property="og:image:width" content="<generated>" />
          <meta property="og:image:height" content="<generated>" />
          <meta name="twitter:image" content="<generated>" />
          <meta name="twitter:image:type" content="<generated>" />
          <meta name="twitter:image:width" content="<generated>" />
          <meta name="twitter:image:height" content="<generated>" />
          <meta property="og:image:alt" content="Notion Gradients" />
          <meta name="twitter:image:alt" content="Notion Gradients" />
          <meta property="og:title" content={metadata.title} />
          <meta name="twitter:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="description" content={metadata.description} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@tejas_bhovad" />
          <meta name="twitter:creator" content="@tejas_bhovad" />
          <meta
            property="og:url"
            content="https://notion-gradients.vercel.app"
          />
          <meta
            name="twitter:url"
            content="https://notion-gradients.vercel.app"
          />
          <meta property="og:site_name" content="Notion Gradients" />
        </head>
        <body className={`${inter.className} w-full h-full`}>
          <PostHogPageView />
          <main className="w-full h-full"> {children}</main>
          <Toaster />
        </body>
      </PHProvider>
    </html>
  );
}
