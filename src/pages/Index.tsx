import { useState } from "react";
import { Header } from "@/components/Header";
import { TestimonialScroll } from "@/components/TestimonialScroll";
import { Phone, Instagram, MapPin, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from "react-router-dom";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone must be less than 20 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Index = () => {
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

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true);
    
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

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
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
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/95" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center py-32">
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Look Sharp.<br />
            <span className="text-primary">Feel Confident.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Starr City Customs delivers precision installations, premium upgrades, and automotive customization crafted for your style.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/#contact">
              <Button variant="default" size="lg" className="text-base px-8">
                Book Your Appointment
              </Button>
            </a>
            <Link to="/services">
              <Button variant="gold" size="lg" className="text-base px-8">
                View Our Services
              </Button>
            </Link>
          </div>

          <button
            onClick={scrollToServices}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-wider">Scroll Down</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="services" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-transparent rounded-lg overflow-hidden">
              <img
                src={heroBg}
                alt="Starr City Customs Work"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Craftsmanship<br />
                <span className="text-primary">Meets Passion.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At Starr City Customs, every installation tells a story. We blend modern technology with precision craftsmanship to deliver the perfect upgrade — whether you're in for ambient lighting or a complete tech transformation.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Step into our workshop, relax, and leave with a vehicle that turns heads.
              </p>
              <Link to="/services">
                <Button variant="gold" size="lg">
                  Meet Your Customizer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-32 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Our Services.
            </h2>
            <p className="text-xl text-muted-foreground">
              Tailored customization for every style.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-background border-2 border-primary/30 rounded-lg p-8 hover:border-primary transition-all duration-300">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-serif text-2xl font-bold mb-3">Starlight Headliners</h3>
              <p className="text-muted-foreground mb-4">Transform your ceiling into a stunning night sky</p>
              <p className="text-3xl font-bold text-primary mb-4">v.a. £500</p>
              <Link to="/services">
                <Button variant="gold" className="w-full">View Service</Button>
              </Link>
            </div>

            <div className="bg-background border-2 border-primary/30 rounded-lg p-8 hover:border-primary transition-all duration-300">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="font-serif text-2xl font-bold mb-3">Ambient Lighting</h3>
              <p className="text-muted-foreground mb-4">Premium interior mood lighting installation</p>
              <p className="text-3xl font-bold text-primary mb-4">v.a. £200</p>
              <Link to="/services">
                <Button variant="gold" className="w-full">View Service</Button>
              </Link>
            </div>

            <div className="bg-background border-2 border-primary/30 rounded-lg p-8 hover:border-primary transition-all duration-300">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-serif text-2xl font-bold mb-3">CarPlay Retrofit</h3>
              <p className="text-muted-foreground mb-4">Modern connectivity for your vehicle</p>
              <p className="text-3xl font-bold text-primary mb-4">v.a. £350</p>
              <Link to="/services">
                <Button variant="gold" className="w-full">View Service</Button>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button variant="default" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              The Look. The Vibe.<br />
              <span className="text-primary">The Experience.</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted by car enthusiasts across Huddersfield
            </p>
          </div>
          <TestimonialScroll />
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 md:py-32 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                Book Your Appointment <span className="text-primary">Now</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Ready to transform your vehicle? Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-background border-2 border-primary/30 rounded-lg p-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
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
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Your phone number" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your customization needs..." 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </Form>

            <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <Phone className="h-6 w-6 text-primary" />
                <p className="text-sm text-muted-foreground">Phone</p>
                <a href="tel:07438719157" className="text-foreground hover:text-primary transition-colors">
                  07438 719157
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Instagram className="h-6 w-6 text-primary" />
                <p className="text-sm text-muted-foreground">Instagram</p>
                <a 
                  href="https://www.instagram.com/starrcitycustoms/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  @starrcitycustoms
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-foreground">Huddersfield, West Yorkshire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Starr City Customs. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Index;
