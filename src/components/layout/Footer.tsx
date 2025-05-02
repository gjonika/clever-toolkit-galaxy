
const Footer = () => {
  return (
    <footer className="border-t py-4 md:py-6 bg-card/50 digital-border">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DevUtils. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
