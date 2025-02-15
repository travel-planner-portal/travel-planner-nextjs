import React from "react";
import { cn } from "@/utils/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-gray-100 bg-white overflow-hidden",
      className
    )}
    {...props}
  />
));

const CardImage = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative w-full aspect-[3/2] overflow-hidden", className)}
    {...props}
  />
));

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 space-y-4", className)} {...props} />
));

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-medium text-gray-900 leading-tight",
      className
    )}
    {...props}
  />
));

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-gray-600 leading-relaxed", className)}
    {...props}
  />
));

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-6 pt-6 border-t flex items-center justify-between text-sm text-gray-500",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";
CardImage.displayName = "CardImage";
CardContent.displayName = "CardContent";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardFooter.displayName = "CardFooter";

export { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter };
