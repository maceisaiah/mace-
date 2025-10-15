export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 space-y-4 text-white/80">
      <h1 className="text-2xl md:text-3xl font-semibold text-white">Contact / FAQ</h1>
      <p>
        For inquiries, collaborations, or order questions, email <a className="underline" href="mailto:hello@example.com">hello@example.com</a>.
      </p>
      <div className="space-y-2">
        <h2 className="text-white font-medium">FAQ</h2>
        <p className="text-white/70">Shipping: Orders ship within 2-4 business days.</p>
        <p className="text-white/70">Returns: 14-day return window for unworn items.</p>
      </div>
    </div>
  );
}











