import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/aceturnity/sidebar";
import {
  IconHome,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../components/shadcn/button";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeProvider";

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {darkModeState, toggleDarkMode} = useDarkMode();
  const [activeContent, setActiveContent] = useState<string>("home");

  useEffect(() => {
    const content = searchParams.get("content");
    if (content && sidebarLinks.some(link => link.id === content)) {
      setActiveContent(content);
    } else {
      setActiveContent("home");
    }
  }, [searchParams]);

  const handleLinkClick = (id: string) => {
    navigate(`?content=${id}`);
  };

  return (
    <div className={cn(
      "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden px-1 py-1",
      "h-screen"
    )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-black dark:bg-gray-300 rounded-l-xl">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2 text-white dark:text-black ">
              {sidebarLinks.map((link) => (
                <SidebarLink 
                  key={link.id} 
                  link={link} 
                  onClick={() => handleLinkClick(link.id)}
                  active={activeContent === link.id}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-white dark:text-black">
            <Button variant="outline" size="icon" onClick={toggleDarkMode} className="dark:border-gray-600 dark:text-gray-200 dark:hover:text-white dark:hover:border-gray-400">
                {darkModeState ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <SidebarLink
              link={{
                id: "profile",
                label: "User Name",
                icon: <UserAvatar />
              }}
              onClick={() => handleLinkClick("profile")}
              active={activeContent === "profile"}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 p-6 overflow-auto">
        {renderContent(activeContent)}
      </main>
    </div>
  );
};

const Logo = () => (
  <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <div className="h-5 w-6 bg-white dark:bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-white dark:text-black whitespace-pre"
    >
      Startup Name
    </motion.span>
  </div>
);

const LogoIcon = () => (
  <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <div className="h-5 w-6 bg-white dark:bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
  </div>
);

const UserAvatar = () => (
  <div className="h-7 w-7 flex-shrink-0 rounded-full bg-white dark:bg-black" />
);

const sidebarLinks = [
  {
    id: "home",
    label: "Dashboard",
    icon: <IconHome className="text-white dark:text-black h-5 w-5 flex-shrink-0" />
  },
  {
    id: "profile",
    label: "Profile",
    icon: <IconUser className="text-white dark:text-black h-5 w-5 flex-shrink-0" />
  },
  {
    id: "settings",
    label: "Settings",
    icon: <IconSettings className="text-white dark:text-black h-5 w-5 flex-shrink-0" />
  },
  {
    id: "logout",
    label: "Logout",
    icon: <IconLogout className="text-white dark:text-black h-5 w-5 flex-shrink-0" />
  }
];

const renderContent = (contentId: string) => {
  switch (contentId) {
    case "home":
      return <h1>Dashboard Home</h1>;
    case "profile":
      return <h1>User Profile</h1>;
    case "settings":
      return <h1>Settings</h1>;
    case "logout":
      return <h1>Logout Confirmation</h1>;
    default:
      return <h1>404 Not Found</h1>;
  }
};

export default Dashboard;