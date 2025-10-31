import { Link } from "react-router-dom";
import { ShoppingCart, Instagram, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import logo from "@/assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const items = useCartStore(state => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <img src={logo} alt="Starr City Customs" className="h-10 md:h-12 w-auto" />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <a 
            href="https://www.instagram.com/starrcitycustoms/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Visit our Instagram"
          >
            <Instagram className="h-4 w-4 md:h-5 md:w-5" />
          </a>

          <Link to="/services">
            <Button variant="outline" size="sm" className="hidden md:flex border-primary/20 hover:border-primary">
              Services
            </Button>
          </Link>

          <a href="/#contact">
            <Button variant="default" size="sm" className="hidden md:flex">
              Book Consultation
            </Button>
          </a>

          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative border-primary/20 hover:border-primary h-9 w-9 md:h-10 md:w-10">
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-primary/20 hover:border-primary h-9 w-9 md:h-10 md:w-10">
                <Menu className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card z-50">
              <DropdownMenuItem asChild>
                <Link to="/" className="cursor-pointer">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/services" className="cursor-pointer">
                  Services
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/#contact" className="cursor-pointer">
                  Book Consultation
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/testimonials" className="cursor-pointer">
                  Testimonials
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};
