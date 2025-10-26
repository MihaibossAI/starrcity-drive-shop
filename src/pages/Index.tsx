import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialScroll } from "@/components/TestimonialScroll";
import { ShopifyProduct, getProducts } from "@/lib/shopify";
import { Loader2, Phone, Mail, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone must be less than 20 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

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

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulate form submission - in production, this would send to your backend or email service
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Booking request sent!", {
        description: "We'll get back to you within 24 hours.",
        position: "top-center",
      });
      
      form.reset();
    } catch (error) {
      toast.error("Failed to send booking request", {
        description: "Please try again or contact us directly.",
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* About Us Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                About <span className="text-primary">Starr City Customs</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-base md:text-lg text-muted-foreground">
              <p>
                At Starr City Customs, we're passionate about transforming your vehicle into something extraordinary. 
                Based in Huddersfield, West Yorkshire, we specialize in premium automotive customization services that 
                combine cutting-edge technology with meticulous craftsmanship.
              </p>
              
              <p>
                Whether you're looking to add stunning starlight headliners, upgrade your entertainment system with 
                CarPlay/Android Auto, or enhance your vehicle's safety with reverse cameras and F1 brake lights, 
                we've got you covered. Our expert team ensures every installation is seamless, professional, and 
                looks factory-fitted.
              </p>
              
              <p>
                We pride ourselves on attention to detail, using only premium materials, and delivering results that 
                exceed expectations. From ambient lighting that sets the perfect mood to advanced coding services that 
                unlock your vehicle's hidden features, we bring luxury and innovation to every project.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-card/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                  <div className="text-sm md:text-base">Happy Customers</div>
                </div>
                <div className="text-center p-6 bg-card/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">5+ Years</div>
                  <div className="text-sm md:text-base">Experience</div>
                </div>
                <div className="text-center p-6 bg-card/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">1 Year</div>
                  <div className="text-sm md:text-base">Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Booking Section */}
      <section id="contact" className="py-16 md:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                Book Your <span className="text-primary">Consultation</span>
              </h2>
              <p className="text-base md:text-xl text-muted-foreground px-4">
                Ready to transform your vehicle? Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="07438719157" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What service are you interested in?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your vehicle and what customization you're interested in..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Booking Request"
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:07438719157" className="hover:text-primary transition-colors">
                  07438719157
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <a href="https://www.instagram.com/starrcitycustoms/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  @starrcitycustoms
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Huddersfield, West Yorkshire</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
