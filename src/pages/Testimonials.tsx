import { Header } from "@/components/Header";
import { TestimonialScroll } from "@/components/TestimonialScroll";

const Testimonials = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              What Our <span className="text-primary">Customers Say</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. See what our satisfied customers have to say about our premium automotive customization services.
            </p>
          </div>

          <TestimonialScroll />
        </div>
      </div>
    </>
  );
};

export default Testimonials;
