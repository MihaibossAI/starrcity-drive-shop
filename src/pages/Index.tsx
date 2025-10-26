import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialScroll } from "@/components/TestimonialScroll";
import { ShopifyProduct, getProducts } from "@/lib/shopify";
import { Loader2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Premium Automotive <br />
            <span className="text-primary">Customization</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your vehicle with our expert installation services in Huddersfield, West Yorkshire
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base">
            <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              ⭐ Starlights
            </div>
            <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              💡 Ambient Lighting
            </div>
            <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              🏎️ F1 Brake Lights
            </div>
            <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              📱 CarPlay Retrofits
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              What Our <span className="text-primary">Customers Say</span>
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Trusted by car enthusiasts across Huddersfield
            </p>
          </div>
          <TestimonialScroll />
        </div>
      </section>

      {/* Products Section */}
      <section id="services" className="py-16 md:py-20 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Professional automotive customization services tailored to your vehicle
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">No products found</p>
              <p className="text-muted-foreground">
                Products will appear here once they are added to the store.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-20 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Find Us in Huddersfield</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-3 md:mb-4">
            📍 Huddersfield, West Yorkshire
          </p>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-4">
            Follow us on Instagram for the latest updates and showcase of our work
          </p>
          <a 
            href="https://instagram.com/starrcitycustoms" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline text-lg font-semibold"
          >
            @starrcitycustoms
          </a>
        </div>
      </section>
    </>
  );
};

export default Index;
