import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const CartDrawer = () => {
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    createCheckout 
  } = useCartStore();
  
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  const handleCheckout = async () => {
    try {
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      }
    } catch (error) {
      toast.error("Failed to create checkout. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some premium automotive customization services to get started.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a href="/">Browse Services</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
          
          <div className="grid gap-6">
            {items.map((item) => (
              <div key={item.variantId} className="bg-card border border-border rounded-lg p-6 flex gap-6">
                {item.product.node.images?.edges?.[0]?.node && (
                  <div className="w-24 h-24 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.node.images.edges[0].node.url}
                      alt={item.product.node.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.product.node.title}</h3>
                  {item.selectedOptions.length > 0 && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.selectedOptions.map(option => option.value).join(' • ')}
                    </p>
                  )}
                  <p className="text-2xl font-bold text-primary">
                    £{parseFloat(item.price.amount).toFixed(2)}
                  </p>
                </div>
                
                <div className="flex flex-col items-end gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeItem(item.variantId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-semibold">Total</span>
              <span className="text-3xl font-bold text-primary">
                £{totalPrice.toFixed(2)}
              </span>
            </div>
            
            <Button 
              onClick={handleCheckout}
              className="w-full bg-primary hover:bg-primary/90" 
              size="lg"
              disabled={items.length === 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Checkout...
                </>
              ) : (
                <>
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
