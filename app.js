import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Intro from "@/components/Intro";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Intro state
  const [showIntro, setShowIntro] = useState(true);

  // You can comment this out during dev if it gets annoying, 
  // but the user requested a 5s intro.
  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence mode="wait">
          {showIntro ? (
            <Intro key="intro" onComplete={handleIntroComplete} />
          ) : (
            <div key="app">
              <Toaster />
              <Router />
            </div>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
