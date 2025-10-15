// Simple auth configuration for demo
export const authOptions = {
  providers: [],
  session: { strategy: 'jwt' as const },
  callbacks: {
    jwt: ({ token }: any) => token,
    session: ({ session }: any) => session,
  },
};