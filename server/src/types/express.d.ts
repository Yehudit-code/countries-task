export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: "admin" | "user";
        permissions: {
          create: boolean;
          update: boolean;
          delete: boolean;
        };
      };
    }
  }
}
