import React from 'react';
import { Button } from "../shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">Startup Name</span>
        </div>
        <div className="hidden md:flex space-x-4">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="ghost">Contact</Button>
        </div>
        <div className="hidden md:flex space-x-2">
          <Button variant="outline">Log in</Button>
          <Button>Sign up</Button>
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Home</DropdownMenuItem>
              <DropdownMenuItem>Features</DropdownMenuItem>
              <DropdownMenuItem>Pricing</DropdownMenuItem>
              <DropdownMenuItem>Contact</DropdownMenuItem>
              <DropdownMenuItem>Log in</DropdownMenuItem>
              <DropdownMenuItem>Sign up</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}