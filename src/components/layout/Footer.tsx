import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay home & get your daily needs from our shop
            </h3>
            <p className="text-gray-600 mb-8">
              Start You'r Daily Shopping with Nest Mart
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button className="bg-green-500 text-white px-6 py-3 rounded-r-md hover:bg-green-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <span className="text-2xl font-bold text-green-600">Nest</span>
              </Link>
              <p className="text-gray-600 mb-6 max-w-sm">
                Awesome grocery store website template
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">
                    Address: 5171 W Campbell Ave undefined Kent, Utah 53127 United States
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Call Us:(+91) - 540-025-124553</span>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Email:sale@Nest.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">Hours:10:00 - 18:00, Mon - Sat</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-6">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-600 hover:text-green-600">About Us</Link></li>
                <li><Link href="/delivery" className="text-gray-600 hover:text-green-600">Delivery Information</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-green-600">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-green-600">Terms & Conditions</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-green-600">Contact Us</Link></li>
                <li><Link href="/support" className="text-gray-600 hover:text-green-600">Support Center</Link></li>
                <li><Link href="/careers" className="text-gray-600 hover:text-green-600">Careers</Link></li>
              </ul>
            </div>

            {/* Account Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-6">Account</h4>
              <ul className="space-y-3">
                <li><Link href="/signin" className="text-gray-600 hover:text-green-600">Sign In</Link></li>
                <li><Link href="/cart" className="text-gray-600 hover:text-green-600">View Cart</Link></li>
                <li><Link href="/wishlist" className="text-gray-600 hover:text-green-600">My Wishlist</Link></li>
                <li><Link href="/order-tracking" className="text-gray-600 hover:text-green-600">Track My Order</Link></li>
                <li><Link href="/help" className="text-gray-600 hover:text-green-600">Help Ticket</Link></li>
                <li><Link href="/shipping" className="text-gray-600 hover:text-green-600">Shipping Details</Link></li>
                <li><Link href="/compare" className="text-gray-600 hover:text-green-600">Compare products</Link></li>
              </ul>
            </div>

            {/* Corporate Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-6">Corporate</h4>
              <ul className="space-y-3">
                <li><Link href="/become-vendor" className="text-gray-600 hover:text-green-600">Become a Vendor</Link></li>
                <li><Link href="/affiliate" className="text-gray-600 hover:text-green-600">Affiliate Program</Link></li>
                <li><Link href="/farm-business" className="text-gray-600 hover:text-green-600">Farm Business</Link></li>
                <li><Link href="/farm-careers" className="text-gray-600 hover:text-green-600">Farm Careers</Link></li>
                <li><Link href="/accessibility" className="text-gray-600 hover:text-green-600">Accessibility</Link></li>
                <li><Link href="/promotions" className="text-gray-600 hover:text-green-600">Promotions</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <p className="text-gray-600">
                © 2024, Nest - HTML Ecommerce Template All rights reserved
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Follow Us</span>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-green-500">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-green-500">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-green-500">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.017 0H7.983C3.582 0 0 3.582 0 7.983v4.034C0 16.418 3.582 20 7.983 20h4.034C16.418 20 20 16.418 20 12.017V7.983C20 3.582 16.418 0 12.017 0zM10 15A5 5 0 1110 5a5 5 0 010 10zm6.408-10.845a1.44 1.44 0 01-2.88 0 1.44 1.44 0 012.88 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Up to 15% discount on your first subscribe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}