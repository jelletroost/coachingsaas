// Fade animations
export const fadeIn = {
   initial: { opacity: 0 },
   animate: { opacity: 1 },
   exit: { opacity: 0 },
};

export const fadeInUp = {
   initial: { opacity: 0, y: 20 },
   animate: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: -20 },
};

export const fadeInDown = {
   initial: { opacity: 0, y: -20 },
   animate: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: 20 },
};

export const fadeInLeft = {
   initial: { opacity: 0, x: -20 },
   animate: { opacity: 1, x: 0 },
   exit: { opacity: 0, x: 20 },
};

export const fadeInRight = {
   initial: { opacity: 0, x: 20 },
   animate: { opacity: 1, x: 0 },
   exit: { opacity: 0, x: -20 },
};

// Scale animations
export const scaleIn = {
   initial: { opacity: 0, scale: 0.9 },
   animate: { opacity: 1, scale: 1 },
   exit: { opacity: 0, scale: 0.9 },
};

export const scaleInUp = {
   initial: { opacity: 0, scale: 0.9, y: 20 },
   animate: { opacity: 1, scale: 1, y: 0 },
   exit: { opacity: 0, scale: 0.9, y: -20 },
};

export const scaleInDown = {
   initial: { opacity: 0, scale: 0.9, y: -20 },
   animate: { opacity: 1, scale: 1, y: 0 },
   exit: { opacity: 0, scale: 0.9, y: 20 },
};

// Slide animations
export const slideInUp = {
   initial: { y: 50, opacity: 0 },
   animate: { y: 0, opacity: 1 },
   exit: { y: -50, opacity: 0 },
};

export const slideInDown = {
   initial: { y: -50, opacity: 0 },
   animate: { y: 0, opacity: 1 },
   exit: { y: 50, opacity: 0 },
};

export const slideInLeft = {
   initial: { x: -50, opacity: 0 },
   animate: { x: 0, opacity: 1 },
   exit: { x: 50, opacity: 0 },
};

export const slideInRight = {
   initial: { x: 50, opacity: 0 },
   animate: { x: 0, opacity: 1 },
   exit: { x: -50, opacity: 0 },
};

// Bounce animations
export const bounceIn = {
   initial: { opacity: 0, scale: 0.3 },
   animate: {
      opacity: 1,
      scale: 1,
      transition: {
         type: "spring",
         stiffness: 300,
         damping: 20,
      },
   },
   exit: { opacity: 0, scale: 0.3 },
};

// Stagger animations for lists
export const staggerContainer = {
   initial: {},
   animate: {
      transition: {
         staggerChildren: 0.1,
         delayChildren: 0.1,
      },
   },
};

export const staggerItem = {
   initial: { opacity: 0, y: 20 },
   animate: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: -20 },
};

// Form-specific animations
export const formFieldAnimation = {
   initial: { opacity: 0, x: -20 },
   animate: { opacity: 1, x: 0 },
   exit: { opacity: 0, x: 20 },
};

export const formSubmitAnimation = {
   initial: { scale: 1 },
   animate: { scale: 1.02 },
   exit: { scale: 1 },
   whileHover: { scale: 1.05 },
   whileTap: { scale: 0.98 },
};

// Loading animations
export const loadingSpinner = {
   animate: {
      rotate: 360,
      transition: {
         duration: 1,
         repeat: Infinity,
         ease: "linear",
      },
   },
};

export const loadingPulse = {
   animate: {
      opacity: [1, 0.5, 1],
      transition: {
         duration: 1.5,
         repeat: Infinity,
         ease: "easeInOut",
      },
   },
};

// Error animations
export const errorShake = {
   initial: { x: 0 },
   animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
         duration: 0.5,
         ease: "easeInOut",
      },
   },
};

// Success animations
export const successCheckmark = {
   initial: { scale: 0, opacity: 0 },
   animate: {
      scale: 1,
      opacity: 1,
      transition: {
         type: "spring",
         stiffness: 300,
         damping: 20,
      },
   },
};

// Page transitions
export const pageTransition = {
   initial: { opacity: 0, y: 20 },
   animate: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: -20 },
   transition: {
      duration: 0.3,
      ease: "easeInOut",
   },
};

// Card animations
export const cardHover = {
   initial: { scale: 1, y: 0 },
   whileHover: {
      scale: 1.02,
      y: -5,
      transition: {
         duration: 0.2,
         ease: "easeOut",
      },
   },
   whileTap: {
      scale: 0.98,
      transition: {
         duration: 0.1,
      },
   },
};

// Button animations
export const buttonHover = {
   initial: { scale: 1 },
   whileHover: {
      scale: 1.02,
      transition: {
         duration: 0.2,
         ease: "easeOut",
      },
   },
   whileTap: {
      scale: 0.98,
      transition: {
         duration: 0.1,
      },
   },
};

// Input focus animations
export const inputFocus = {
   initial: { scale: 1 },
   whileFocus: {
      scale: 1.01,
      transition: {
         duration: 0.2,
         ease: "easeOut",
      },
   },
};
