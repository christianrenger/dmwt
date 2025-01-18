// "use client";
// import Image from 'next/image';
// import Link from 'next/link';
// import {useState, useEffect} from "react";

"use client";
import Image from 'next/image';
import Link from 'next/link';
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { useState, useEffect, useCallback } from "react";


// Puzzle-Teil-Komponente
function PuzzlePiece({ id, imageSrc, correctPosition, onPlace }) {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("pieceId", id); // ID des Puzzle-Teils speichern
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            style={{
                width: "100px",
                height: "100px",
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: "300px 300px", // Setze die Größe für das gesamte Bild
                backgroundPosition: correctPosition, // Position für das Teil
                border: "1px solid black",
                cursor: "grab",
            }}
        ></div>
    );
}

// Puzzle-Feld-Komponente
function PuzzleSlot({ id, correctPosition, placedPieces, onDrop }) {
    const handleDrop = (e) => {
        e.preventDefault();
        const pieceId = parseInt(e.dataTransfer.getData("pieceId"), 10); // Hole die ID des gezogenen Teils
        if (pieceId === id && !placedPieces.includes(pieceId)) {
            onDrop(id, pieceId); // Nur dann platzieren, wenn es der richtige Slot ist und noch nicht platziert wurde
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Erlaube das Ablegen
    };

    const isPlaced = placedPieces.includes(id); // Überprüfen, ob das Teil an dieser Stelle platziert wurde

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                width: "100px",
                height: "100px",
                border: "2px dashed gray",
                display: "inline-block",
                margin: "2px",
                position: "relative", // Wichtiger Stil für die Positionierung des Puzzle-Teils
            }}
        >
            {/* Zeige das Puzzle-Teil nur, wenn es korrekt platziert wurde */}
            {isPlaced && (
                <div
                    style={{
                        position: "absolute",
                        width: "100px",
                        height: "100px",
                        backgroundImage: `url(/infografik.svg)`,
                        backgroundSize: "300px 300px",
                        backgroundPosition: correctPosition, // Position für das Teil
                    }}
                ></div>
            )}
        </div>
    );
}

// Puzzle-Logik-Komponente
function JigsawPuzzleManual() {
    const [placedPieces, setPlacedPieces] = useState([]); // IDs der korrekt platzierten Teile
    const [isSolved, setIsSolved] = useState(false);

    const messages = [
        "Erstes Teil",
        "Zweites Teil",
        "Drittes Teil",
        "Viertes Teil",
        "Fünftes Teil",
        "Sechstes Teil",
        "Siebtes Teil",
        "Achtes Teil",
        "Neuntes Teil",
    ];
    

    // Bild-Teile und Positionen
    const pieces = [
        { id: 0, position: "0px 0px" }, // Oben links
        { id: 1, position: "-100px 0px" }, // Oben Mitte
        { id: 2, position: "-200px 0px" }, // Oben rechts
        { id: 3, position: "0px -100px" }, // Mitte links
        { id: 4, position: "-100px -100px" }, // Mitte Mitte
        { id: 5, position: "-200px -100px" }, // Mitte rechts
        { id: 6, position: "0px -200px" }, // Unten links
        { id: 7, position: "-100px -200px" }, // Unten Mitte
        { id: 8, position: "-200px -200px" }, // Unten rechts
    ];

    const handleDrop = useCallback((slotId, pieceId) => {
        setPlacedPieces((prev) => [...prev, pieceId]); // Füge das korrekte Teil hinzu
    }, []);

    // Überprüfe, ob alle Teile korrekt platziert wurden
    useEffect(() => {
        if (placedPieces.length === pieces.length) {
            setIsSolved(true); // Puzzle ist vollständig
        }
    }, [placedPieces]);

    return (
        <div style={{ textAlign: "center" }}>
            <h2>{isSolved ? "Herzlichen Glückwunsch! Puzzle gelöst!" : "Löse das Puzzle!"}</h2>
            <div style={{ width: "300px", margin: "0 auto" }}>
                {/* Puzzle-Slots */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 100px)",
                        gap: "2px",
                    }}
                >
                    {pieces.map((piece) => (
                        <PuzzleSlot
                            key={piece.id}
                            id={piece.id}
                            correctPosition={piece.position}
                            placedPieces={placedPieces} // Übergabe des Zustands an die Slot-Komponente
                            onDrop={handleDrop}
                        />
                    ))}
                </div>

                {/* Puzzle-Stücke */}
                <div style={{ marginTop: "20px" }}>
                    {pieces
                        .filter((piece) => !placedPieces.includes(piece.id)) // Zeige nur ungelegte Teile
                        .map((piece) => (
                            <PuzzlePiece
                                key={piece.id}
                                id={piece.id}
                                imageSrc="/infografik.svg"
                                correctPosition={piece.position}
                                onPlace={handleDrop}
                            />
                        ))}
                </div>

                {/* Vorbereitete Texte anzeigen */}
                <div style={{ marginTop: "20px", textAlign: "left" }}>
                    {placedPieces.map((_, index) => (
                        <p key={index}>{messages[index]}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    const [text, setText] = useState("Solve the puzzle!!");
    const [isSolved, setIsSolved] = useState(false);
    const [ctaInfoVisible, setCtaInfoVisible] = useState(false);
    const handleButtonClick = () => {
        setCtaInfoVisible(!ctaInfoVisible); // Umschalten der Sichtbarkeit
    };

    const onSolved = useCallback(() => {
        setIsSolved(true); // Flag puzzle as solved
    }, []);

    useEffect(() => {
        if (isSolved) {
            setText("Congratulations!!");
        }
    }, [isSolved]); // This effect will run only when `isSolved` changes

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
    useEffect(() => {
        const digitBoxes = document.querySelectorAll('.digit-box');

        const animateNumbers = (entry) => {
            if (entry.isIntersecting) {
                digitBoxes.forEach((box) => {
                    const targetValue = parseInt(box.dataset.val, 10);
                    let currentValue = 0;

                    const interval = setInterval(() => {
                        currentValue += Math.ceil(targetValue / 50);
                        if (currentValue >= targetValue) {
                            currentValue = targetValue;
                            clearInterval(interval);
                        }
                        box.textContent = currentValue.toString().padStart(3, '0');
                    }, 30);
                });
            }
        };

        const observer = new IntersectionObserver(
            (entries) => entries.forEach(animateNumbers),
            {threshold: 0.2}
        );

        digitBoxes.forEach((box) => observer.observe(box));

        return () => observer.disconnect();
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
            {/*<header id="startseite" className="hero">*/}
            {/*    <div className="hero-square1">*/}
            {/*        <span className="square-text"></span>*/}
            {/*    </div>*/}
            {/*    <div className="hero-square4">*/}
            {/*        <span className="square-text"></span>*/}
            {/*    </div>*/}


            {/*    <div className="hero-content">*/}
            {/*        <h1>Trage, Was Die Welt Verändert!</h1>*/}
            {/*        <p>*/}
            {/*            „Jeder Kauf ist ein kleiner Schritt in Richtung einer nachhaltigeren Zukunft. Werde Teil der*/}
            {/*            Veränderung!“*/}
            {/*        </p>*/}
            {/*        <button className="cta-button">Mehr Informationen</button>*/}
            {/*    </div>*/}
            {/*    <div className="wave"></div>*/}
            {/*    <div className="hero-image">*/}
            {/*        <Image*/}
            {/*            src="/frau.jpg"*/}
            {/*            alt="Frau mit gelbem Kleid"*/}
            {/*            width={400}*/}
            {/*            height={500}*/}
            {/*        />*/}
            {/*    </div>*/}


            {/*</header>*/}
            <div>
                <header className="hero">
                        <div className="hero-square1">
                            <span className="square-text"></span>
                        </div>
                        <div className="hero-square4">
                            <span className="square-text"></span>
                        </div>
                    <div className="hero-section">
                        <h1>Trage, Was Die Welt Verändert!</h1>
                        <p>
                            „Jeder Kauf ist ein kleiner Schritt in Richtung einer nachhaltigeren Zukunft. Werde Teil der
                            Veränderung!“
                        </p>
                        <button className="cta-button" onClick={handleButtonClick}>
                            Mehr Informationen
                        </button>
                        <div className={`cta-info ${ctaInfoVisible ? 'visible' : ''}`}>
                            <p>
                                Jedes Kleidungsstück erzählt eine Geschichte – von der Gewinnung der Rohstoffe bis hin zur Produktion.
                                Baumwolle wird angebaut, geerntet und verarbeitet, oft unter enormem Wasserverbrauch und Einsatz von Pestiziden.
                                Synthetische Stoffe entstehen aus Erdöl, einer begrenzten Ressource, die unwiederbringlich verloren geht.
                                Während der Produktion entstehen zudem CO₂-Emissionen, die zur Erderwärmung beitragen.
                                Auf unserer Webseite zeigen wir, wie viele Ressourcen durch die Herstellung eines einzigen Kleidungsstücks
                                verloren gehen und wie nachhaltige Alternativen helfen können, diese Auswirkungen zu minimieren.
                            </p>
                            </div>
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
            </div>


            <section className="content-section fade-in">
                <div className="container">
                    <div className="row odd">
                        <div className="text">
                            <div className="colored-text-container">
                                <h2>Rohstoffe gewinnen</h2>
                                <p>
                                    Hier werden die natürlichen oder synthetischen Materialien für die Herstellung von
                                    Stoffen
                                    beschafft. Die Ressourcen für diesen Schritt umfassen Baumwolle, Wolle, Leinen oder
                                    synthetische Fasern wie Polyester. Für den Anbau von Naturfasern werden Wasser, Land
                                    und Dünger benötigt, während synthetische Fasern auf Erdöl basieren
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
                                    Zur Verarbeitung der Rohstoffe werden Maschinen wie Kardier- und Spinnmaschinen
                                    benötigt. Zusätzlich spielen Energie und manchmal Chemikalien zur Behandlung der
                                    Fasern eine wichtige Rolle.
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
                <div className="hero-square3">
                    <span className="square-text"></span>
                </div>
                <div className="hero-square2">
                    <span className="square-text"></span>
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
                                    die dann für die Bekleidung verwendet werden. Dafür sind Energie, Maschinen und oft
                                    Wasser erforderlich.
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
                <div className="hero-square5">
                    <span className="square-text"></span>
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
                                    Für das Färben werden Farbstoffe (natürlich oder synthetisch), Wasser und
                                    Chemikalien wie Fixiermittel genutzt. Veredelungsprozesse benötigen Maschinen und
                                    thermische Energie.
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
                <div className="hero-square2">
                    <span className="square-text"></span>
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
                <div className="hero-square6">
                    <span className="square-text"></span>
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
                                    hinzugefügt. Die Teile werden mit Nähmaschinen und Garn zusammengenäht. Zubehör wie
                                    Knöpfe oder Reißverschlüsse ergänzt den Prozess. Strom wird für die Maschinen
                                    benötigt.
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
                <div className="hero-square2">
                    <span className="square-text"></span>
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
                                    Verpackungsmaterialien, Transportmittel und Energie für Lagerung und Kühlung sind in
                                    diesem Schritt essenziell. Produkte gelangen über Läden oder Online-Shops zum
                                    Kunden.
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
                <div className="hero-square3">
                    <span className="square-text"></span>
                </div>
            </section>


            <JigsawPuzzleManual />


            {/* Unsere Wahl Section */
            }
            <section id="unsere-wahl"
                     style={{
                         backgroundColor: "#E2EACC",
                         padding: "40px 20px",
                         display: "flex",         // Aktiviert Flexbox
                         flexDirection: "column", // Elemente werden vertikal angeordnet
                         alignItems: "center",    // Zentriert horizontal
                         justifyContent: "center" // Zentriert vertikal

                     }}
            >
                <h1>Unsere Wahl für nachhaltige Mode</h1>
                <p>Erfahre mehr über unsere Auswahl an nachhaltiger Kleidung.</p>
            </section>


            <footer>
                <footer style={{backgroundColor: "#E2EACC", padding: "20px 0"}}>
                    <div className="footer-container">
                        {/* Bild 1 */}
                        <a href="https://www.avocadostore.de/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/bild1.png"
                                alt="Bild 1"
                                className="footer-image"
                                style={{width: "200px", height: "auto", margin: "0 10px", borderRadius: "8px"}}
                            />
                        </a>

                        {/* Bild 2 */}
                        <a href="https://www.glore.de/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/bild2.png"
                                alt="Bild 2"
                                className="footer-image"
                                style={{width: "200px", height: "auto", margin: "0 10px", borderRadius: "8px"}}
                            />
                        </a>

                        {/* Bild 3 */}
                        <a href="https://www.greenality.de/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/bild3.png"
                                alt="Bild 3"
                                className="footer-image"
                                style={{width: "200px", height: "auto", margin: "0 10px", borderRadius: "8px"}}
                            />
                        </a>

                        {/* Bild 4 */}
                        <a href="https://marlowe-nature.de/?srsltid=AfmBOoqSoliRVFlb5ooN5Pzbt94Bpoipmetk_dgqRg7ttigE5-deNQ9q"
                           target="_blank" rel="noopener noreferrer">
                            <img
                                src="/bild4.png"
                                alt="Bild 4"
                                className="footer-image"
                                style={{width: "200px", height: "auto", margin: "0 10px", borderRadius: "8px"}}
                            />
                        </a>
                    </div>
                    {/* Community-Bereich */}
                    <div className="community-section" style={{textAlign: "center", marginTop: "20px"}}>
                        <p style={{fontSize: "25px", color: "black", fontWeight: "bold"}}>Sei Teil unserer
                            Community!</p>
                        <button
                            style={{
                                backgroundColor: "#4F633F",
                                color: "#FFFFFF",
                                padding: "10px 20px",
                                fontSize: "19px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                transition: "transform 0.2s ease",
                            }}
                            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                        >
                            Jetzt Registrieren
                        </button>
                    </div>


                    <section className="counter text-center">
                        <div className="container">
                            <div className="row">
                                <div className="foo">
                                    <div className="single-number green-box">
                                        <span className="digit-box" data-val="120">000</span>
                                        <span className="text-box">Different Locations</span>
                                    </div>
                                </div>
                                <div className="foo">
                                    <div className="single-number blue-box">
                                        <span className="digit-box" data-val="090">000</span>
                                        <span className="text-box">Awards Won</span>
                                    </div>
                                </div>
                                <div className="foo">
                                    <div className="single-number red-box">
                                        <span className="digit-box" data-val="055">000</span>
                                        <span className="text-box">Projects Done</span>
                                    </div>
                                </div>
                                <div className="foo">
                                    <div className="single-number purple-box">
                                        <span className="digit-box" data-val="125">000</span>
                                        <span className="text-box">Happy Clients</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{textAlign: "center", width: "100%"}}>
                            <p
                                style={{
                                    fontFamily: "'Libre Baskerville', serif",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    textRendering: "optimizeLegibility",
                                    WebkitFontSmoothing: "antialiased",
                                }}
                            >
                                <a href="/community"
                                   style={{color: "inherit", textDecoration: "none", margin: "0 10px"}}>
                                    Community
                                </a>
                                |
                                <a href="/impressum"
                                   style={{color: "inherit", textDecoration: "none", margin: "0 10px"}}>
                                    Impressum
                                </a>
                                |
                                <a href="/follow-us"
                                   style={{color: "inherit", textDecoration: "none", margin: "0 10px"}}>
                                    Follow Us
                                </a>
                            </p>
                        </div>
                    </section>


                    <style jsx>{`
                        .footer-container {
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                        }

                        .footer-image {
                            width: 100px;
                            height: 100px;
                            object-fit: cover;
                            border-radius: 10px; /* Optional: Rundung */
                            transition: transform 0.3s ease;
                        }

                        .footer-image:hover {
                            transform: scale(1.1);
                        }
                    `}</style>
                </footer>

            </footer>
        </div>
    );

}
