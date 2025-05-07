import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu } from "lucide-react"

export default function Home() {
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
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                    Furniture that Everyone Loves
                  </h1>
                  <p className="max-w-[600px] text-slate-300 md:text-xl">
                    Visualize furniture in your room before you buy. Create stunning designs with our 3D visualization
                    tool.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" className="px-8 bg-blue-500 hover:bg-blue-600 text-white">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="px-8 border-slate-700 text-white hover:bg-slate-800">
                      Explore
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Modern blue sofa with colorful pillows"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">Who we are</h2>
                <p className="text-slate-600 md:text-lg">
                  Danish multinational conglomerate that designs and sells ready-to-assemble furniture, kitchen
                  appliances and home accessories, among other useful goods and occasionally home services. Founded in
                  Denmark in 1993 by 19-year-old Herman Bjornborn, Fogo has been the world's largest furniture retailer
                  since 2008.
                </p>
                <p className="text-slate-600 md:text-lg">
                  Our mission is to create a better everyday life for the many people by offering well-designed,
                  functional home furnishing products at prices so low that as many people as possible can afford them.
                </p>
                <div className="pt-4">
                  <Link href="/about">
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white">Learn more about us</Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Light blue chair with wood"
                      className="h-48 w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">Light blue chair with wood</h3>
                  <p className="font-bold text-blue-600">99$</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Light blue lamp with wood"
                      className="h-48 w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">Light blue lamp with wood</h3>
                  <p className="font-bold text-blue-600">35$</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Light blue pot with wood"
                      className="h-48 w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">Light blue pot with wood</h3>
                  <p className="font-bold text-blue-600">20$</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-slate-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Our Services
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover how our furniture visualization tools can transform your space
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm transition-all hover:shadow-md bg-white">
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
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">2D Design</h3>
                <p className="text-sm text-slate-600 text-center">
                  Create floor plans and arrange furniture in a 2D view to visualize your space
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm transition-all hover:shadow-md bg-white">
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
                <h3 className="text-xl font-bold text-slate-900">3D Visualization</h3>
                <p className="text-sm text-slate-600 text-center">
                  See your designs come to life in an immersive 3D environment with realistic lighting
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm transition-all hover:shadow-md bg-white">
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
                    <path d="M12 3v12" />
                    <path d="m8 11 4 4 4-4" />
                    <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Save & Share</h3>
                <p className="text-sm text-slate-600 text-center">
                  Save your designs and share them with friends, family, or interior designers
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-slate-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Space?
                </h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied customers who have designed their perfect spaces with FurnitureViz
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/auth/register">
                  <Button size="lg" className="px-8 bg-blue-500 hover:bg-blue-600 text-white">
                    Buy Now
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
                <li className="flex items-start gap-2">
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
                    className="h-4 w-4 text-blue-600 mt-1"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    123 Design Street, Suite 100
                    <br />
                    San Francisco, CA 94103
                  </span>
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
