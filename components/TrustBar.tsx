const stats = [
  { number: "340+", label: "Installs completed" },
  { number: "5.0★", label: "Rating" },
  { number: "Same week", label: "Typical availability" },
];

export default function TrustBar() {
  return (
    <div className="grid grid-cols-3 border-t border-b border-white/[0.08] mt-10 md:mt-16">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`px-4 md:px-10 py-5 md:py-7 ${i < stats.length - 1 ? "border-r border-white/[0.08]" : ""}`}
        >
          <p className="font-serif text-2xl md:text-4xl text-upfit-text leading-none mb-1">
            {stat.number}
          </p>
          <p className="text-xs md:text-sm text-upfit-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
