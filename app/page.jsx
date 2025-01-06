import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Revivo</div>
        <ul className="nav-links">
        <Link href={'/feed'}>Community-Feed</Link>
          <li><a href="#startseite">Startseite</a></li>
          <li><a href="#infografik">Infografik</a></li>
          <li><a href="#unsere-wahl">Unsere Wahl</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header id="startseite" className="hero">
        <div className="hero-content">
          <h1>Trage, Was Die Welt Verändert!</h1>
          <p>„Jeder Kauf ist ein kleiner Schritt in Richtung einer nachhaltigeren Zukunft. Werde Teil der Veränderung!“</p>
          <button  className="cta-button">
            Mehr Informationen
          </button>
        </div>

        
        <div className="hero-image">
          <Image 
          src="/frau.jpg"  // Pfad zum Bild im public-Verzeichnis
          alt="Frau mit gelbem Kleid"
          width={400}  // Gebe die Bildgröße an
          height={500}  // Gebe die Bildgröße an
        />
      </div>
      
        
      </header>

      {/* Infografik */}
      <section id="infografik" className="infografik-section">
        <h2>Infografik: Puzzle</h2>
        <div className="puzzle">
          <div className="puzzle-piece" data-step="1">🔲</div>
          <div className="puzzle-piece" data-step="2">🔳</div>
          <div className="puzzle-piece" data-step="3">🔲</div>
        </div>
      </section>

      {/* Unsere Wahl Section */}
      <section id="unsere-wahl">
        <h1>Unsere Wahl für nachhaltige Mode</h1>
        <p>Erfahre mehr über unsere Auswahl an nachhaltiger Kleidung.</p>
      </section>
      
      

      <footer>
        <p>&copy; 2023 Secondhand. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}