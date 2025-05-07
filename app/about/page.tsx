import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function AboutPage() {
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
            <Link href="/about" className="text-sm font-medium text-blue-300 transition-colors">
              About us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-blue-300 transition-colors">
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">About FurnitureViz</h1>
                <p className="text-slate-600 md:text-xl">
                  We're on a mission to transform how people design and visualize their living spaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-slate-900">Our Story</h2>
                <p className="text-slate-600 md:text-lg">
                  Founded in 2018, FurnitureViz began with a simple idea: make furniture shopping easier by letting
                  people visualize products in their own spaces before buying.
                </p>
                <p className="text-slate-600 md:text-lg">
                  Our founder, Herman Bjornborn, was frustrated after purchasing a sofa that didn't fit his living room.
                  He realized that traditional furniture shopping lacked a crucial element - the ability to see how
                  items would look and fit in your actual space.
                </p>
                <p className="text-slate-600 md:text-lg">
                  What started as a small startup in Copenhagen has grown into a global platform used by millions of
                  people and thousands of furniture retailers worldwide.
                </p>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our team at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-slate-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-slate-900">Our Values</h2>
                <p className="max-w-[900px] text-slate-600 md:text-lg">The principles that guide everything we do</p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm bg-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
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
                    className="h-8 w-8 text-blue-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Innovation</h3>
                <p className="text-center text-slate-600">
                  We constantly push the boundaries of what's possible in 3D visualization and AR technology.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm bg-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
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
                    className="h-8 w-8 text-blue-600"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Accessibility</h3>
                <p className="text-center text-slate-600">
                  We believe everyone should have access to tools that make designing their spaces easier.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm bg-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
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
                    className="h-8 w-8 text-blue-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Quality</h3>
                <p className="text-center text-slate-600">
                  We're committed to providing the most realistic and accurate visualization experience possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1 relative h-[400px] overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our team members"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-slate-900">Our Team</h2>
                <p className="text-slate-600 md:text-lg">
                  We're a diverse team of designers, developers, 3D artists, and furniture enthusiasts passionate about
                  creating the best furniture visualization platform.
                </p>
                <p className="text-slate-600 md:text-lg">
                  Based across Copenhagen, San Francisco, and Tokyo, our global team brings together expertise from the
                  furniture industry, 3D modeling, and software development.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    <span className="text-slate-600">20+ talented developers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    <span className="text-slate-600">15+ professional 3D artists</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    <span className="text-slate-600">10+ furniture industry experts</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/contact">
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                      Join our team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
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
  )
}
