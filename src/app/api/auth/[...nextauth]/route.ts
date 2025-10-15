// Temporarily disabled NextAuth to fix authentication errors
// import NextAuth from 'next-auth'
// import { authOptions } from '@/lib/auth'

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }

export async function GET() {
  return new Response('NextAuth temporarily disabled', { status: 503 });
}

export async function POST() {
  return new Response('NextAuth temporarily disabled', { status: 503 });
}
