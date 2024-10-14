import React from 'react';
import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Startup Name</h3>
            <p className="text-sm text-gray-600">Breif description about what the startup does.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Button variant="link">Home</Button></li>
              <li><Button variant="link">Features</Button></li>
              <li><Button variant="link">Pricing</Button></li>
              <li><Button variant="link">Contact</Button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Button variant="link">Terms of Service</Button></li>
              <li><Button variant="link">Privacy Policy</Button></li>
              <li><Button variant="link">Cookie Policy</Button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-2">Stay updated with our latest features and news.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">&copy; 2024 Ahmad Technologies. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" size="icon"><Facebook className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Twitter className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Instagram className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Github className="h-5 w-5" /></Button>
          </div>
        </div>
      </div>
    </footer>
  );
}