import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useSmoothScroll = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string, path: string = "/") => {
      if (location.pathname === path) {
        // Already on the right page, just scroll
        scrollToElement(sectionId);
      } else {
        // Navigate to the page first, then scroll
        navigate(path);
        // Wait for navigation and DOM update
        setTimeout(() => {
          scrollToElement(sectionId);
        }, 100);
      }
    },
    [location.pathname, navigate, scrollToElement]
  );

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        const sectionId = href.substring(1);
        scrollToElement(sectionId);
      } else if (href.includes("#")) {
        e.preventDefault();
        const [path, sectionId] = href.split("#");
        scrollToSection(sectionId, path || "/");
      }
    },
    [scrollToElement, scrollToSection]
  );

  return { scrollToElement, scrollToSection, handleAnchorClick };
};

export default useSmoothScroll;
