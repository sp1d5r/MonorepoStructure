import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import { Menu } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">Startup Name</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Button variant="ghost" asChild><Link to="/">Home</Link></Button>
          <Button variant="ghost" asChild><Link to="/features">Features</Link></Button>
          <Button variant="ghost" asChild><Link to="/pricing">Pricing</Link></Button>
          <Button variant="ghost" asChild><Link to="/contact">Contact</Link></Button>
        </div>
        <div className="hidden md:flex space-x-2">
          <Button variant="outline" asChild><Link to="/login">Log in</Link></Button>
          <Button asChild><Link to="/signup">Sign up</Link></Button>
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
              <DropdownMenuItem onSelect={() => handleNavigation('/')}>Home</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleNavigation('/features')}>Features</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleNavigation('/pricing')}>Pricing</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleNavigation('/contact')}>Contact</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleNavigation('/login')}>Log in</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleNavigation('/signup')}>Sign up</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}