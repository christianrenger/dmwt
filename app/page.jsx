"use client";
import Image from 'next/image';
import Link from 'next/link';
import {useEffect} from "react";


export default function Home() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            {threshold: 0.1} // Trigger when 10% of the section is visible
        );

        const sections = document.querySelectorAll(".fade-in");
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    useEffect(() => {
        // Handle scroll event to create the parallax effect
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // Hero section parallax effect (slower scroll)
            const heroImage = document.querySelector('.hero-image');
            const heroContent = document.querySelector('.hero-section');
            const bodySection = document.querySelector('.content-section');


            if (heroImage) {
                // Slower movement for the hero section elements
                heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            }
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            }

            // Fade out hero section as the body section comes over
            if (heroImage && heroContent) {
                const opacity = Math.max(1 - scrollPosition / 400, 0); // Fade out based on scroll
                heroImage.style.opacity = opacity;
            }

            // Apply offset to the body section (move faster or scroll above the hero)
            if (bodySection) {
                bodySection.style.marginTop = `${-scrollPosition * 0.1}px`; // Control speed of body section
            }

        };
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <img src="/logoo.svg" alt="Revivo Logo" className="logo-icon"/>
                    <span>Revivo</span>
                </div>
                <ul className="nav-links">
                    <Link href={'/feed'}>Community-Feed</Link>
                    <li><a href="#startseite">Startseite</a></li>
                    <li><a href="#infografik">Infografik</a></li>
                    <li><a href="#unsere-wahl">Unsere Wahl</a></li>
                </ul>
            </nav>

            {/* Hero Section */}
            <header id="startseite" className="hero">
                <div className="hero-square">
                    <span className="square-text"></span>
                </div>

                <div className="hero-content">
                    <h1>Trage, Was Die Welt Verändert!</h1>
                    <p>
                        „Jeder Kauf ist ein kleiner Schritt in Richtung einer nachhaltigeren Zukunft. Werde Teil der
                        Veränderung!“
                    </p>
                    <button className="cta-button">Mehr Informationen</button>
                </div>
                <div className="wave"></div>
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
                                    beschafft. Das können Baumwolle, Wolle, Leinen oder synthetische Fasern wie
                                    Polyester
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
                    <div className="wave-container">
                        <div className="wave"></div>
                    </div>
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
                                    Der Stoff wird gefärbt, um ihm die gewünschte Farbe zu geben. Außerdem können
                                    spezielle
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
                    <div className="wave-container">
                        <div className="wave"></div>
                    </div>
                    <div className="row even">
                        <div className="text">
                            <div className="colored-text-container">
                                <h2>Nähen</h2>
                                <p>
                                    Die zugeschnittenen Teile werden mit Nähmaschinen oder per Hand zu einem
                                    Kleidungsstück
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
                                    Das fertige Kleidungsstück wird an Händler, Boutiquen oder in Onlineshops geliefert
                                    und
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
