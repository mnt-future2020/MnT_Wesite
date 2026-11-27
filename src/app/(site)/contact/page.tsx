import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description:
    "Talk to MnT Future about your project, or book a free strategy session. Based in Madurai, India.",
};

// Contact page: one screen, details on the left and the form on the right. (A "What happens next" part was tried and removed by the user.)
export default function ContactPage() {
  return <ContactSection />;
}
