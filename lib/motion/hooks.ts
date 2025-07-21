import { useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { staggerContainer } from "./animations";
import { staggerConfigs } from "./transitions";

// Hook for triggering animations when element comes into view
export function useScrollAnimation(delay = 0) {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });
   const controls = useAnimation();

   useEffect(() => {
      if (isInView) {
         controls.start({
            opacity: 1,
            y: 0,
            transition: {
               duration: 0.6,
               delay,
               ease: "easeOut",
            },
         });
      }
   }, [isInView, controls, delay]);

   return { ref, controls, isInView };
}

// Hook for staggered animations
export function useStaggerAnimation(
   staggerType: keyof typeof staggerConfigs = "normal"
) {
   const controls = useAnimation();

   const startStagger = () => {
      controls.start({
         ...staggerContainer,
         transition: {
            ...staggerConfigs[staggerType],
         },
      });
   };

   return { controls, startStagger };
}

// Hook for form field animations
export function useFormFieldAnimation(index: number) {
   const controls = useAnimation();

   const animateIn = () => {
      controls.start({
         opacity: 1,
         x: 0,
         transition: {
            duration: 0.3,
            delay: index * 0.1,
            ease: "easeOut",
         },
      });
   };

   return { controls, animateIn };
}

// Hook for loading states
export function useLoadingAnimation() {
   const controls = useAnimation();

   const startLoading = () => {
      controls.start({
         opacity: [1, 0.5, 1],
         transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
         },
      });
   };

   const stopLoading = () => {
      controls.stop();
      controls.set({ opacity: 1 });
   };

   return { controls, startLoading, stopLoading };
}

// Hook for error animations
export function useErrorAnimation() {
   const controls = useAnimation();

   const triggerError = () => {
      controls.start({
         x: [0, -10, 10, -10, 10, 0],
         transition: {
            duration: 0.5,
            ease: "easeInOut",
         },
      });
   };

   return { controls, triggerError };
}

// Hook for success animations
export function useSuccessAnimation() {
   const controls = useAnimation();

   const triggerSuccess = () => {
      controls.start({
         scale: [0, 1.2, 1],
         opacity: [0, 1, 1],
         transition: {
            duration: 0.6,
            ease: "easeOut",
         },
      });
   };

   return { controls, triggerSuccess };
}

// Hook for page transitions
export function usePageTransition() {
   const controls = useAnimation();

   const enterPage = () => {
      controls.start({
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.4,
            ease: "easeOut",
         },
      });
   };

   const exitPage = () => {
      controls.start({
         opacity: 0,
         y: -20,
         transition: {
            duration: 0.3,
            ease: "easeIn",
         },
      });
   };

   return { controls, enterPage, exitPage };
}

// Hook for card hover animations
export function useCardAnimation() {
   const controls = useAnimation();

   const onHoverStart = () => {
      controls.start({
         scale: 1.02,
         y: -5,
         transition: {
            duration: 0.2,
            ease: "easeOut",
         },
      });
   };

   const onHoverEnd = () => {
      controls.start({
         scale: 1,
         y: 0,
         transition: {
            duration: 0.2,
            ease: "easeOut",
         },
      });
   };

   const onTap = () => {
      controls.start({
         scale: 0.98,
         transition: {
            duration: 0.1,
         },
      });
   };

   return { controls, onHoverStart, onHoverEnd, onTap };
}

// Hook for button animations
export function useButtonAnimation() {
   const controls = useAnimation();

   const onHover = () => {
      controls.start({
         scale: 1.02,
         transition: {
            duration: 0.2,
            ease: "easeOut",
         },
      });
   };

   const onTap = () => {
      controls.start({
         scale: 0.98,
         transition: {
            duration: 0.1,
         },
      });
   };

   const onLeave = () => {
      controls.start({
         scale: 1,
         transition: {
            duration: 0.2,
            ease: "easeOut",
         },
      });
   };

   return { controls, onHover, onTap, onLeave };
}

// Hook for input focus animations
export function useInputAnimation() {
   const controls = useAnimation();

   const onFocus = () => {
      controls.start({
         scale: 1.01,
         transition: {
            duration: 0.2,
            ease: "easeOut",
         },
      });
   };

   const onBlur = () => {
      controls.start({
         scale: 1,
         transition: {
            duration: 0.2,
            ease: "easeOut",
         },
      });
   };

   return { controls, onFocus, onBlur };
}

// Hook for list item animations
export function useListItemAnimation(index: number) {
   const controls = useAnimation();

   const animateIn = () => {
      controls.start({
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.3,
            delay: index * 0.1,
            ease: "easeOut",
         },
      });
   };

   const animateOut = () => {
      controls.start({
         opacity: 0,
         y: -20,
         transition: {
            duration: 0.2,
            ease: "easeIn",
         },
      });
   };

   return { controls, animateIn, animateOut };
}
