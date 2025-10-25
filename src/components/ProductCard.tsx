import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;

  const handleAddToCart = () => {
    const variant = node.variants.edges[0]?.node;
    if (!variant) {
      toast.error("Product variant not available");
      return;
    }

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart!", {
      description: node.title,
      position: "top-center",
    });
  };

  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const image = node.images.edges[0]?.node;

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group">
      <Link to={`/product/${node.handle}`}>
        <div className="aspect-square overflow-hidden bg-secondary/20">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">🚗</span>
            </div>
          )}
        </div>
      </Link>
      
      <CardHeader>
        <CardTitle className="text-xl">{node.title}</CardTitle>
        {node.description && (
          <CardDescription className="line-clamp-2">{node.description}</CardDescription>
        )}
      </CardHeader>
      
      <CardContent>
        <p className="text-3xl font-bold text-primary">
          £{price.toFixed(2)}
        </p>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
