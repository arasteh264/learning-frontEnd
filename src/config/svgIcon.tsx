import type { SVGProps } from "react";

const IconGrid = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 10C8.21 10 10 8.21 10 6C10 3.79 8.21 2 6 2C3.79 2 2 3.79 2 6C2 8.21 3.79 10 6 10Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 22C20.21 22 22 20.21 22 18C22 15.79 20.21 14 18 14C15.79 14 14 15.79 14 18C14 20.21 15.79 22 18 22Z" stroke="#1EB35B" strokeWidth="1.5" />
  </svg>
);

const IconBook = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 25 24" fill="none" {...props}>
    <path d="M22.5 16.74V4.67C22.5 3.47 21.52 2.58 20.33 2.68H20.27C18.17 2.86 14.98 3.93 13.2 5.05L13.03 5.16C12.74 5.34 12.26 5.34 11.97 5.16L11.72 5.01C9.94 3.9 6.76 2.84 4.66 2.67C3.47 2.57 2.5 3.47 2.5 4.66V16.74C2.5 17.7 3.28 18.6 4.24 18.72L4.53 18.76C6.7 19.05 10.05 20.15 11.97 21.2L12.01 21.22C12.28 21.37 12.71 21.37 12.97 21.22C14.89 20.16 18.25 19.05 20.43 18.76L20.76 18.72C21.72 18.6 22.5 17.7 22.5 16.74Z"
      stroke="currentColor" strokeWidth="1.5" />
    <path d="M12.5 5.49V20.49" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.25 8.49H6" stroke="#1EB35B" strokeWidth="1.5" />
    <path d="M9 11.49H6" stroke="#1EB35B" strokeWidth="1.5" />
  </svg>
);

const IconAI = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 7.89L10.93 9.75C10.69 10.16 10.89 10.5 11.36 10.5H12.63C13.11 10.5 13.3 10.84 13.06 11.25L12 13.11"
      stroke="#1EB35B" strokeWidth="1.5" />
    <path d="M8.29 18.04V16.88C6 15.49 4.11 12.78 4.11 9.9C4.11 4.95 8.66 1.07 13.8 2.19C16.06 2.69 18.04 4.19 19.07 6.26C21.16 10.46 18.96 14.92 15.73 16.87V18.03C15.73 18.32 15.84 18.99 14.77 18.99H9.26C8.16 19 8.3 18.57 8.29 18.04Z"
      stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 22C10.79 21.35 13.21 21.35 15.5 22"
      stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const icons = {
  grid: IconGrid,
  book: IconBook,
  ai: IconAI,
};