import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import logo from "@/assets/logo.png";

export const Header = () => {
  const items = useCartStore(state => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Starr City Customs" className="h-12 w-auto" />
        </Link>

        {/* Center Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/services" className="text-foreground/80 hover:text-foreground transition-colors">
            Services
          </Link>
          <a href="/#contact" className="text-foreground/80 hover:text-foreground transition-colors">
            Contact
          </a>
          <Link to="/testimonials" className="text-foreground/80 hover:text-foreground transition-colors">
            Testimonials
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <a href="/#contact" className="hidden md:block">
            <Button variant="gold" size="default">
              Book Appointment
            </Button>
          </a>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
