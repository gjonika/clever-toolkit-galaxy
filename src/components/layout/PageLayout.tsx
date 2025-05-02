
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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="mb-8 md:mb-12">
            <h1 className="mb-2">{title}</h1>
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
