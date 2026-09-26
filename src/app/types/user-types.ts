export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  userMetadata: {
    displayName?: string;
  };
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string,
  email?: string,
  phone?: string,
  role?: string,
  aud?: string,
  confirmed_at?: string,
  email_confirmed_at?: string,
  created_at?: string,
  last_sign_in_at?: string,
  recovery_sent_at?: string,
  is_anonymous?: boolean,
  updated_at?: string
}; 
