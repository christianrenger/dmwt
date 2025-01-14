
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            {/* Scattered Background Elements */}
            <div className="background-elements">
                <div className="background-element element-1">
                    <img src="/Rectangle%2026.svg" alt="Decorative Element 1" />
                </div>
                <div className="background-element element-2">
                    <img src="/Rectangle%2027.svg" alt="Decorative Element 2" />
                </div>
                <div className="background-element element-3">
                    <img src="/Group%2021.svg" alt="Decorative Element 3" />
                </div>
                <div className="background-element element-4">
                    <img src="/wave.svg" alt="Decorative Element 4" />
                </div>
            </div>

            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">Secondhand</div>
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
                    <p>
                        „Jeder Kauf ist ein kleiner Schritt in Richtung einer nachhaltigeren Zukunft. Werde Teil der
                        Veränderung!“
                    </p>
                    <button className="cta-button">Mehr Informationen</button>
                </div>
                <div className="hero-image">
                    <Image
                        src="/frau.jpg"
                        alt="Frau mit gelbem Kleid"
                        width={400}
                        height={500}
                    />
                </div>
            </header>

            <section className="content-section fade-in">
                <div className="container">
                    <div className="row odd">
                        <div className="text">
                            <div className="colored-text-container">
                            <h2>Rohstoffe gewinnen</h2>
                            <p>
                                Hier werden die natürlichen oder synthetischen Materialien für die Herstellung von
                                Stoffen
                                beschafft. Das können Baumwolle, Wolle, Leinen oder synthetische Fasern wie Polyester
                                sein.
                            </p>
                        </div>
                        </div>
                        <Image
                            src="/baumwolle-icon 1.svg"
                            alt="Nachhaltige Materialien"
                            width={400}
                            height={300}
                            className="image"
                        />
                    </div>
                </div>
            </section>

            <section className="content-section fade-in">
                <div className="container">
                    <div className="row even">
                        <div className="text">
                            <div className="colored-text-container">
                            <h2>Faserverarbeitung</h2>
                            <p>
                                In diesem Schritt werden die gewonnenen Rohstoffe zu Fasern verarbeitet, die dann zu
                                Garnen
                                gesponnen werden. Bei natürlichen Fasern geschieht dies durch Kardieren und Spinnen.
                            </p>
                                </div>
                        </div>
                        <Image
                            src="/threads-icon 1.svg"
                            alt="Nachhaltige Produktion"
                            width={400}
                            height={300}
                            className="image"
                        />
                    </div>
                </div>
            </section>

            <section className="content-section fade-in">
                <div className="container">
                    <div className="row odd">
                        <div className="text">
                            <div className="colored-text-container">
                            <h2>Textilproduktion</h2>
                            <p>
                                Die gesponnenen Fasern werden zu Stoffen gewebt oder gestrickt. Es entstehen so die
                                Textilien,
                                die dann für die Bekleidung verwendet werden.
                            </p>
                            </div>
                        </div>
                        <Image
                            src="/weaving 1.svg"
                            alt="Recycling und Wiederverwendung"
                            width={400}
                            height={300}
                            className="image"
                        />
                    </div>
                </div>
            </section>

            <section className="content-section fade-in">
                <div className="container">
                    <div className="row even">
                        <div className="text">
                            <div className="colored-text-container">
                            <h2>Färben und Veredeln</h2>
                            <p>
                                Der Stoff wird gefärbt, um ihm die gewünschte Farbe zu geben. Außerdem können spezielle
                                Veredelungen wie z.B. Imprägnierungen oder Waschprozesse erfolgen, um den Stoff zu
                                verbessern
                                (z.B. für weichere Haptik oder bessere Pflegeeigenschaften).
                            </p>
                            </div>
                        </div>
                        <Image
                            src="/threads-dyeing 1.svg"
                            alt="Recycling und Wiederverwendung"
                            width={400}
                            height={300}
                            className="image"
                        />
                    </div>
                </div>
            </section>

            <section className="content-section fade-in">
                <div className="container">
                    <div className="row odd">
                        <div className="text">
                            <div className="colored-text-container">
                            <h2>Zuschnitt</h2>
                            <p>
                                In dieser Phase wird der Stoff in die benötigten Teile für das Kleidungsstück
                                zugeschnitten.
                                Dies erfolgt meist nach einem Schnittmuster.
                            </p>
                        </div>
                        </div>
                        <Image
                            src="/cutting-fabric 1.svg"
                            alt="Recycling und Wiederverwendung"
                            width={400}
                            height={300}
                            className="image"
                        />
                    </div>
                </div>
            </section>

            <section className="content-section fade-in">
                <div className="container">
                    <div className="row even">
                        <div className="text">
                            <div className="colored-text-container">
                            <h2>Nähen</h2>
                            <p>
                                Die zugeschnittenen Teile werden mit Nähmaschinen oder per Hand zu einem Kleidungsstück
                                zusammengenäht. Hierbei werden auch Reißverschlüsse, Knöpfe oder andere Details
                                hinzugefügt.
                            </p>
                        </div>
                        </div>
                        <Image
                            src="/fabric-sewing 1.svg"
                            alt="Recycling und Wiederverwendung"
                            width={400}
                            height={300}
                            className="image"
                        />
                    </div>
                </div>
            </section>

            <section className="content-section fade-in">
                <div className="container">
                    <div className="row odd">
                        <div className="text">
                            <div className="colored-text-container">
                            <h2>Vertrieb und Verkauf</h2>
                            <p>
                                Das fertige Kleidungsstück wird an Händler, Boutiquen oder in Onlineshops geliefert und
                                zum
                                Verkauf angeboten, damit die Endverbraucher es kaufen können.
                            </p>
                            </div>
                        </div>
                        <Image
                            src="/clothes-icon 1.svg"
                            alt="Recycling und Wiederverwendung"
                            width={400}
                            height={300}
                            className="image"
                        />
                    </div>
                </div>
            </section>


            {/* Infografik */
            }
            <section id="infografik" className="infografik-section">
                <h2>Infografik: Puzzle</h2>
                <div className="puzzle">
                    <div className="puzzle-piece" data-step="1">🔲</div>
                    <div className="puzzle-piece" data-step="2">🔳</div>
                    <div className="puzzle-piece" data-step="3">🔲</div>
                </div>
            </section>

            {/* Unsere Wahl Section */
            }
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
