import { $Enums } from "@prisma/client";

export interface Users {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  password: string;
  role: $Enums.Role;
  image: string | null;
  address: {
    city: string;
    phone: string;
    country: {
      name: string;
    };
  } | null;
}