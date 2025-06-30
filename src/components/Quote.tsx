import { Quote as QuoteIcon, Star } from 'lucide-react';

interface QuoteProps {
  text: string;
  author: string;
  role?: string;
  company?: string;
  variant?: 'default' | 'large' | 'minimal' | 'featured' | 'work';
  className?: string;
}

const Quote = ({ 
  text, 
  author, 
  role, 
  company, 
  variant = 'default',
  className 
}: QuoteProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'large':
        return {
          container: 'py-16 px-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-lg',
          quote: 'text-2xl lg:text-3xl',
          icon: 'w-12 h-12',
          author: 'text-lg'
        };
      case 'minimal':
        return {
          container: 'py-8 px-6 border-l-4 border-accent bg-gray-50/50',
          quote: 'text-lg',
          icon: 'w-6 h-6',
          author: 'text-sm'
        };
      case 'featured':
        return {
          container: 'py-16 px-10 bg-gradient-to-br from-accent/5 via-white to-accent/10 border-2 border-accent/20 rounded-3xl shadow-xl relative overflow-hidden',
          quote: 'text-2xl lg:text-4xl',
          icon: 'w-16 h-16',
          author: 'text-xl'
        };
      case 'work':
        return {
          container: 'max-w-4xl mx-auto text-center',
          quote: 'text-2xl lg:text-3xl leading-relaxed mb-8 relative text-dark',
          icon: 'hidden',
          author: 'text-lg font-medium text-dark'
        };
      default:
        return {
          container: 'py-12 px-8 bg-white border border-gray-200 rounded-xl shadow-sm',
          quote: 'text-xl lg:text-2xl',
          icon: 'w-10 h-10',
          author: 'text-base'
        };
    }
  };

  const classes = getVariantClasses();

  // Work variant has its own rendering structure
  if (variant === 'work') {
    return (
      <div className={`${classes.container} ${className || ''}`}>
        <blockquote className={classes.quote}>
          <span className="text-accent text-1xl opacity-30">"</span>
          <i className='text-1xl'>{text}</i>
          <span className="text-accent text-1xl opacity-30">"</span>
        </blockquote>
        <div className={`client ${classes.author}`}>{author}</div>
        {(role || company) && (
          <div className="position text-sm opacity-60 mt-2 text-dark">
            {role}{role && company && ' • '}{company}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${classes.container} ${className || ''}`}>
      {/* Featured variant background elements */}
      {variant === 'featured' && (
        <>
          {/* Floating Stars */}
          <div className="absolute top-8 right-8 opacity-20">
            <Star className="w-4 h-4 text-accent fill-current" />
          </div>
          <div className="absolute top-16 right-16 opacity-15">
            <Star className="w-3 h-3 text-accent fill-current" />
          </div>
          <div className="absolute bottom-12 left-8 opacity-25">
            <Star className="w-5 h-5 text-accent fill-current" />
          </div>
          
          {/* Gradient Orb */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-2xl"></div>
        </>
      )}
      
      {/* Background Quote Icon */}
      <div className={`absolute ${variant === 'minimal' ? 'top-2 left-2' : 'top-6 left-6'} ${variant === 'featured' ? 'opacity-5' : 'opacity-10'} ${classes.icon}`}>
        <QuoteIcon className={`${classes.icon} text-accent`} />
      </div>
      
      {/* Quote Content */}
      <div className="relative z-10">
        {/* Quote Text */}
        <blockquote className={`${classes.quote} font-medium leading-relaxed text-dark mb-8 italic relative`}>
          {variant === 'featured' && (
            <span className="text-6xl text-accent/20 absolute -top-4 -left-2 font-serif">"</span>
          )}
          <span className={variant === 'featured' ? 'relative z-10' : ''}>{text}</span>
          {variant === 'featured' && (
            <span className="text-6xl text-accent/20 absolute -bottom-8 -right-2 font-serif">"</span>
          )}
        </blockquote>
        
        {/* Attribution */}
        <div className="flex items-center">
          {/* Decorative Line */}
          <div className={`${variant === 'featured' ? 'w-16 h-1 bg-gradient-to-r from-accent to-accent/50' : 'w-12 h-0.5 bg-accent'} mr-4 rounded-full`}></div>
          
          {/* Author Info */}
          <div>
            <div className={`${classes.author} font-semibold text-dark`}>
              {author}
            </div>
            {(role || company) && (
              <div className={`${variant === 'featured' ? 'text-base' : 'text-sm'} text-gray-600 mt-1`}>
                {role}{role && company && ', '}{company}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      {variant !== 'minimal' && (
        <div className={`absolute ${variant === 'featured' ? 'bottom-6 right-6 opacity-5' : 'bottom-4 right-4 opacity-10'}`}>
          <QuoteIcon className={`${classes.icon} text-accent transform rotate-180`} />
        </div>
      )}
    </div>
  );
};

export default Quote;