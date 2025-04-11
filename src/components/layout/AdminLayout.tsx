import React, { ReactNode } from 'react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">Dream Team Admin</div>
            <div>
              <Link href="/" className="p-2 hover:underline">
                View Site
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex">
        <div className="w-64 bg-white h-screen shadow-md">
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/admin" className="block p-2 hover:bg-gray-100 rounded">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/team" className="block p-2 bg-blue-50 text-blue-700 font-medium rounded">
                  Team Members
                </Link>
              </li>
              <li>
                <Link href="/admin/services" className="block p-2 hover:bg-gray-100 rounded">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/admin/testimonials" className="block p-2 hover:bg-gray-100 rounded">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
