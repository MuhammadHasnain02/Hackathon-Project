declare module "next/link" {
  import type { FC, ReactNode } from "react";

  export interface LinkProps {
    href: string;
    children?: ReactNode;
    className?: string;
    prefetch?: boolean;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    locale?: string | false;
    [key: string]: unknown;
  }

  const Link: FC<LinkProps>;
  export default Link;
}

declare module "next/navigation" {
  export interface NavigateOptions {
    scroll?: boolean;
  }

  export interface Navigation {
    push: (href: string, options?: NavigateOptions) => void;
    replace: (href: string, options?: NavigateOptions) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
  }

  export function useRouter(): Navigation;
}

