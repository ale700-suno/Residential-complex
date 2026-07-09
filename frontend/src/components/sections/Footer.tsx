export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-graphite-dark">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-accent text-xl tracking-[0.25em] text-milk mb-1">ARTI PARK</p>
            <p className="text-xs text-milk/40 tracking-wider">
              Жизнь у моря нового уровня · Адлер, Сочи
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-xs tracking-wider uppercase text-milk/40">
            <a href="#benefits" className="hover:text-gold transition-colors">
              Преимущества
            </a>
            <a href="#apartments" className="hover:text-gold transition-colors">
              Резиденции
            </a>
            <a href="#gallery" className="hover:text-gold transition-colors">
              Галерея
            </a>
            <a href="#contact" className="hover:text-gold transition-colors">
              Контакты
            </a>
          </nav>

          <p className="text-xs text-milk/30 text-center md:text-right">
            © {new Date().getFullYear()} ЖК Арти Парк
          </p>
        </div>
      </div>
    </footer>
  );
}
