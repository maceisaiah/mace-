import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-10 text-white/60">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm">© {new Date().getFullYear()} NOIR. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="https://instagram.com" className="hover:text-white">Instagram</Link>
          <Link href="https://tiktok.com" className="hover:text-white">TikTok</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}









