export type JwtPayload = {
  sub: number;
  email: string;
  is_active: boolean;
  role: "user"|"admin"|"supplier"
};

export type JwtPayloadAdmin = {
  sub: number;
  email: string;
  admin: any;
};

export type JwtPayloadSupplier = {
  sub: number;
  email: string;
  supplier: any;
};
