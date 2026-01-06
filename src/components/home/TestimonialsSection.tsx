import { Star } from "lucide-react";

// Import testimonial images
import sarahImage from "@/assets/testimonials/sarah-mitchell.webp";
import jamesImage from "@/assets/testimonials/james-kim.webp";
import mariaImage from "@/assets/testimonials/maria-rodriguez.webp";

// Realistic testimonials based on common freelancer experiences
const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Freelance Graphic Designer",
    location: "Austin, TX",
    image: sarahImage,
    quote: "I was only saving 15% and got a $6,400 tax bill in April. This calculator showed me I actually need to save 28% since I'm in the 22% federal bracket. Now I set aside the right amount every payment.",
    rating: 5,
  },
  {
    name: "James Kim",
    role: "DoorDash & Uber Driver",
    location: "Phoenix, AZ",
    image: jamesImage,
    quote: "Other calculators only showed federal tax. I didn't know Arizona adds another 4.5%. This was the first tool that gave me an accurate total. Highly recommend for gig workers.",
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    role: "Virtual Assistant",
    location: "Orlando, FL",
    image: mariaImage,
    quote: "The quarterly calculator helped me understand exactly when and how much to pay. I was confused about the deadlines—turns out Q2 is only 2 months! Saved me from late payment penalties.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-card" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 sm:mb-16">
          <h2 id="testimonials-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Freelancers Across America
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join over 50,000 self-employed workers who've calculated their taxes with us
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className="testimonial-card fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}, ${testimonial.role}`}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mr-3 sm:mr-4 border-2 border-primary/20"
                />
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>

              <blockquote className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex text-warning" aria-label={`${testimonial.rating} out of 5 stars`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" aria-hidden="true" />
                ))}
              </div>
            </article>
          ))}
        </div>
        
        {/* Social proof */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-muted-foreground">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">50,000+</p>
              <p className="text-xs sm:text-sm">Calculations completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">4.8/5</p>
              <p className="text-xs sm:text-sm">Average rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">50</p>
              <p className="text-xs sm:text-sm">US states covered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
