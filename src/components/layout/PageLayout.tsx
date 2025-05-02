
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const PageLayout = ({
  children,
  title,
  description,
  className = "",
}: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="container py-8 md:py-10 relative">
          <div className="mb-8 md:mb-10">
            <h1 className="mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{title}</h1>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>
          
          <div className={className}>{children}</div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;
