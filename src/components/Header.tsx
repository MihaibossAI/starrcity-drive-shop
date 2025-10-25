import { Link } from "react-router-dom";
import { ShoppingCart, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import logo from "@/assets/logo.png";

export const Header = () => {
  const items = useCartStore(state => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Starr City Customs" className="h-12 w-auto" />
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/testimonials">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Testimonials
            </Button>
          </Link>
          
          <a 
            href="https://instagram.com/starrcitycustoms" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>

          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative border-primary/20 hover:border-primary">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
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
