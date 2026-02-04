import { Link } from "@tanstack/react-router";
import { Menu, PlusCircle, Zap, BrainCircuit, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import logoPrimary from "../logo-primary.svg";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-5xl rounded-2xl border-2 bg-background/80 backdrop-blur-xl px-4 py-2"
      >
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img src={logoPrimary} alt="recal logo" className="h-8 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border">
              <NavPill to="/">Focus</NavPill>
              <NavPill to="/quiz">Quiz</NavPill>
              <NavPill to="/doc">Documentation</NavPill>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Search className="h-4 w-4" />
            </Button>

            <div className="h-4 w-[1px] bg-border mx-1" />

            <Button
              asChild
              size="sm"
              className="rounded-full !px-10 !py-5 font-bold hover:scale-105 transition-transform active:scale-95"
            >
              <Link to="/notes/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                New note
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="rounded-b-3xl border-b-2 border-primary/20 bg-background/95"
              >
                <SheetHeader>
                  <SheetTitle className="font-title flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    RECAL.SYSTEM
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-3 mt-8">
                  <Link to="/" className="text-2xl font-black">
                    DASHBOARD
                  </Link>
                  <Link to="/quiz" className="text-2xl font-black text-primary">
                    TRAIN NOW
                  </Link>
                  <Button className="mt-4 w-full h-12 rounded-xl text-lg">
                    Quick Note
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </div>
  );
}

function NavPill({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
      activeProps={{ className: "bg-background text-primary shadow-sm" }}
      inactiveProps={{
        className: "text-muted-foreground hover:text-foreground",
      }}
    >
      {children}
    </Link>
  );
}
