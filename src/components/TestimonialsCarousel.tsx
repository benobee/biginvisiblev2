import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlayDelay?: number;
  className?: string;
}

const TestimonialsCarousel = ({ 
  testimonials, 
  autoPlayDelay = 5000,
  className = '' 
}: TestimonialsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [isPlaying, testimonials.length, autoPlayDelay, currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
    
    setIsPlaying(true);
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  const getVisibleTestimonials = () => {
    const prev = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    const next = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    
    return {
      previous: testimonials[prev],
      current: testimonials[currentIndex],
      next: testimonials[next]
    };
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div 
      ref={containerRef}
      className={`relative w-full max-w-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Three-panel layout - Single panel on mobile, three panels on desktop */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 overflow-hidden px-4 sm:px-6 lg:px-0">
        {/* Previous testimonial (left) - Hidden on mobile */}
        {testimonials.length > 1 && (
          <div 
            className="hidden lg:block flex-shrink-0 w-64 xl:w-80 opacity-40 transform scale-75 transition-all duration-500 cursor-pointer hover:opacity-60"
            onClick={goToPrevious}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-96 flex flex-col justify-center">
              <blockquote className="text-sm leading-relaxed text-gray-700 mb-6 font-medium line-clamp-4">
                "{visibleTestimonials.previous.quote}"
              </blockquote>
              <div className="flex flex-col items-center">
                {visibleTestimonials.previous.avatar && (
                  <img 
                    src={visibleTestimonials.previous.avatar} 
                    alt={visibleTestimonials.previous.author}
                    className="w-12 h-12 rounded-full object-cover mb-3 shadow-md"
                  />
                )}
                <div className="text-center">
                  <div className="font-bold text-sm text-gray-900 mb-1">
                    {visibleTestimonials.previous.author}
                  </div>
                  <div className="text-xs text-gray-600">
                    {visibleTestimonials.previous.position}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current testimonial (center) */}
        <div className="flex-shrink-0 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl sm:shadow-2xl border border-gray-100 relative overflow-hidden min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col justify-center">
            {/* Background quote icon */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 lg:top-8 lg:right-8 opacity-5">
              <Quote className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-accent" />
            </div>
            
            <div className="relative z-10 text-center">
              {/* Quote */}
              <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 mb-6 sm:mb-8 font-medium">
                "{visibleTestimonials.current.quote}"
              </blockquote>
              
              {/* Author info */}
              <div className="flex flex-col items-center">
                {visibleTestimonials.current.avatar && (
                  <img 
                    src={visibleTestimonials.current.avatar} 
                    alt={visibleTestimonials.current.author}
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover mb-3 sm:mb-4 shadow-lg"
                  />
                )}
                <div>
                  <div className="font-bold text-base sm:text-lg text-gray-900 mb-1">
                    {visibleTestimonials.current.author}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    {visibleTestimonials.current.position} at {visibleTestimonials.current.company}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next testimonial (right) - Hidden on mobile */}
        {testimonials.length > 1 && (
          <div 
            className="hidden lg:block flex-shrink-0 w-64 xl:w-80 opacity-40 transform scale-75 transition-all duration-500 cursor-pointer hover:opacity-60"
            onClick={goToNext}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-96 flex flex-col justify-center">
              <blockquote className="text-sm leading-relaxed text-gray-700 mb-6 font-medium line-clamp-4">
                "{visibleTestimonials.next.quote}"
              </blockquote>
              <div className="flex flex-col items-center">
                {visibleTestimonials.next.avatar && (
                  <img 
                    src={visibleTestimonials.next.avatar} 
                    alt={visibleTestimonials.next.author}
                    className="w-12 h-12 rounded-full object-cover mb-3 shadow-md"
                  />
                )}
                <div className="text-center">
                  <div className="font-bold text-sm text-gray-900 mb-1">
                    {visibleTestimonials.next.author}
                  </div>
                  <div className="text-xs text-gray-600">
                    {visibleTestimonials.next.position}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation arrows - Visible on mobile for single view */}
      {testimonials.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-20 lg:hidden"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-20 lg:hidden"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center mt-6 sm:mt-8 space-x-1.5 sm:space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-accent w-6 sm:w-8' 
                  : 'bg-gray-300 hover:bg-gray-400 w-2 sm:w-3'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;