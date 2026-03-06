declare module "netlify-identity-widget" {
  export type IdentityUser = {
    email?: string;
    jwt: () => Promise<string>;
  };

  export type IdentityEvent = "login" | "logout";

  export type IdentityInitOptions = {
    APIUrl?: string;
  };

  export interface IdentityWidget {
    init: (options?: IdentityInitOptions) => void;
    open: (type?: "login" | "signup") => void;
    close: () => void;
    currentUser: () => IdentityUser | null;
    on: (event: IdentityEvent, handler: (user?: IdentityUser) => void) => void;
    off: (event: IdentityEvent, handler: (user?: IdentityUser) => void) => void;
    logout: () => void;
  }

  const widget: IdentityWidget;

  export default widget;
}
