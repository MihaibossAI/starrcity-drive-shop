import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "James Mitchell",
    text: "Absolutely brilliant service! The starlight ceiling they installed in my BMW looks incredible. Professional work from start to finish.",
    rating: 5,
    service: "Starlights"
  },
  {
    name: "Sarah Thompson",
    text: "The ambient lighting completely transformed my car's interior. The attention to detail was outstanding. Highly recommend!",
    rating: 5,
    service: "Ambient Lighting"
  },
  {
    name: "Mohammed Ali",
    text: "Had the F1 brake lights installed and they look amazing! Great communication and professional installation.",
    rating: 5,
    service: "F1 Brake Lights"
  },
  {
    name: "Emma Roberts",
    text: "CarPlay retrofit was seamless. Now my older car has all the modern features. Worth every penny!",
    rating: 5,
    service: "CarPlay Retrofit"
  },
  {
    name: "David Wilson",
    text: "Top quality work on my dash cam installation. Clean wiring and perfect positioning. Very impressed!",
    rating: 5,
    service: "Dash Camera"
  },
  {
    name: "Lisa Chen",
    text: "The coding service unlocked features I didn't even know my car had. Excellent expertise and fair pricing.",
    rating: 5,
    service: "Coding"
  }
];

export const TestimonialScroll = () => {
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex animate-scroll gap-6">
        {duplicatedTestimonials.map((testimonial, index) => (
          <Card key={index} className="flex-shrink-0 w-[400px] bg-card border-border">
            <CardContent className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.service}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
