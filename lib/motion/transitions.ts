// Base transition configurations
export const transitions = {
   // Quick transitions
   fast: {
      duration: 0.15,
      ease: "easeOut",
   },

   // Standard transitions
   normal: {
      duration: 0.3,
      ease: "easeInOut",
   },

   // Slow transitions
   slow: {
      duration: 0.5,
      ease: "easeInOut",
   },

   // Spring transitions
   spring: {
      type: "spring",
      stiffness: 300,
      damping: 20,
   },

   // Bounce transitions
   bounce: {
      type: "spring",
      stiffness: 400,
      damping: 10,
   },

   // Smooth transitions
   smooth: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
   },

   // Elastic transitions
   elastic: {
      type: "spring",
      stiffness: 200,
      damping: 15,
   },
};

// Stagger configurations
export const staggerConfigs = {
   // Quick stagger
   fast: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
   },

   // Normal stagger
   normal: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
   },

   // Slow stagger
   slow: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
   },

   // Form field stagger
   form: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
   },

   // List item stagger
   list: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
   },
};

// Page transition configurations
export const pageTransitions = {
   // Fade transition
   fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: transitions.normal,
   },

   // Slide transition
   slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: transitions.smooth,
   },

   // Scale transition
   scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: transitions.spring,
   },

   // Slide from left
   slideLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
      transition: transitions.normal,
   },

   // Slide from right
   slideRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: transitions.normal,
   },
};

// Form-specific transitions
export const formTransitions = {
   // Field appearance
   field: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: transitions.fast,
   },

   // Button interactions
   button: {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: transitions.fast,
   },

   // Input focus
   input: {
      whileFocus: { scale: 1.01 },
      transition: transitions.fast,
   },

   // Error shake
   error: {
      animate: {
         x: [0, -5, 5, -5, 5, 0],
         transition: {
            duration: 0.4,
            ease: "easeInOut",
         },
      },
   },

   // Success animation
   success: {
      initial: { scale: 0, opacity: 0 },
      animate: {
         scale: 1,
         opacity: 1,
         transition: transitions.spring,
      },
   },
};

// Loading transitions
export const loadingTransitions = {
   // Spinner rotation
   spinner: {
      animate: {
         rotate: 360,
         transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear",
         },
      },
   },

   // Pulse effect
   pulse: {
      animate: {
         opacity: [1, 0.5, 1],
         transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
         },
      },
   },

   // Skeleton loading
   skeleton: {
      animate: {
         opacity: [0.5, 1, 0.5],
         transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
         },
      },
   },
};

// Card transitions
export const cardTransitions = {
   // Hover effect
   hover: {
      whileHover: {
         scale: 1.02,
         y: -5,
         transition: transitions.fast,
      },
      whileTap: {
         scale: 0.98,
         transition: { duration: 0.1 },
      },
   },

   // Entrance animation
   entrance: {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -20, scale: 0.95 },
      transition: transitions.spring,
   },

   // Exit animation
   exit: {
      exit: {
         opacity: 0,
         scale: 0.9,
         transition: transitions.fast,
      },
   },
};
