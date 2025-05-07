"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      addToast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
        variant: "success",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      addToast({
        title: "Failed to send message",
        description: error.message || "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-slate-900 text-white sticky top-0 z-50">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl">FurnitureViz</span>
          </div>
          <nav className="ml-auto hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-300 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-blue-300 transition-colors">
              About us
            </Link>
            <Link href="/contact" className="text-sm font-medium text-blue-300 transition-colors">
              Contact us
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
              >
                Login
              </Button>
            </Link>
          </nav>
          <button className="ml-auto md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">Contact Us</h1>
                <p className="text-slate-600 md:text-xl">Have questions or feedback? We'd love to hear from you.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter text-slate-900">Get in Touch</h2>
                  <p className="mt-2 text-slate-600">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium text-slate-900">
                        First name
                      </label>
                      <input
                        id="first-name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`flex h-10 w-full rounded-md border ${
                          errors.firstName ? "border-red-500" : "border-slate-300"
                        } bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium text-slate-900">
                        Last name
                      </label>
                      <input
                        id="last-name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`flex h-10 w-full rounded-md border ${
                          errors.lastName ? "border-red-500" : "border-slate-300"
                        } bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-900">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`flex h-10 w-full rounded-md border ${
                        errors.email ? "border-red-500" : "border-slate-300"
                      } bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-900">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`flex h-10 w-full rounded-md border ${
                        errors.subject ? "border-red-500" : "border-slate-300"
                      } bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-900">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`flex min-h-[120px] w-full rounded-md border ${
                        errors.message ? "border-red-500" : "border-slate-300"
                      } bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter your message here..."
                    />
                    {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                    {!isLoading && <Send className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter text-slate-900">Contact Information</h2>
                  <p className="mt-2 text-slate-600">Our team is here to help you with any questions or concerns.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 shrink-0">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Phone</h3>
                      <p className="text-slate-600">+1 (555) 123-4567</p>
                      <p className="text-slate-600">Monday - Friday, 9am - 5pm PST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 shrink-0">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Email</h3>
                      <p className="text-slate-600">support@furnitureviz.com</p>
                      <p className="text-slate-600">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 shrink-0">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Office</h3>
                      <p className="text-slate-600">123 Design Street, Suite 100</p>
                      <p className="text-slate-600">San Francisco, CA 94103</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden h-[300px] mt-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948551!3d37.75781499657369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1649290283302!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-slate-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to transform your space?
                </h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start designing your dream home today with our easy-to-use visualization tools
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/register">
                  <Button size="lg" className="px-8 bg-blue-500 hover:bg-blue-600 text-white">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">FurnitureViz</h3>
              <p className="text-sm text-slate-600">Transforming how you design and visualize your living spaces.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-600 hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="text-slate-600 hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="#" className="text-slate-600 hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-slate-600 hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-slate-600 hover:text-blue-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-slate-600 hover:text-blue-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-blue-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-blue-600">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-blue-600"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-sm text-slate-600">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-blue-600"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-sm text-slate-600">support@furnitureviz.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8">
            <p className="text-center text-sm text-slate-600">© 2025 FurnitureViz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}