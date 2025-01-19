"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from "react";


function PuzzlePiece({ id, imageSrc, correctPosition, slotWidth, aspectRatio }) {
    const slotHeight = slotWidth * aspectRatio; // Dynamische Höhe

    const handleDragStart = (e) => {
        e.dataTransfer.setData("pieceId", id);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            style={{
                width: `${slotWidth}px`,
                height: `${slotHeight}px`, // Dynamische Höhe
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: `${slotWidth * 3}px ${slotHeight * 3}px`, // Gesamtgröße des Bildes
                backgroundPosition: correctPosition,
                backgroundRepeat: "no-repeat",
                border: "1px solid black",
                cursor: "grab",
                margin: "5px",
                boxSizing: "border-box",
            }}
        ></div>
    );
}





function PuzzleSlot({ id, correctPosition, placedPieces, onDrop, slotWidth, aspectRatio, imageSrc }) {
    const slotHeight = slotWidth * aspectRatio; // Dynamische Höhe basierend auf dem Bild-Seitenverhältnis

    const handleDrop = (e) => {
        e.preventDefault();
        const pieceId = parseInt(e.dataTransfer.getData("pieceId"), 10);
        if (pieceId === id && !placedPieces.includes(pieceId)) {
            onDrop(id, pieceId);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const isPlaced = placedPieces.includes(id);

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                width: `${slotWidth}px`,
                height: `${slotHeight}px`, // Dynamische Höhe
                border: "2px dashed gray",
                display: "inline-block",
                margin: "0",
                position: "relative",
                boxSizing: "border-box",
            }}
        >
            {isPlaced && (
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${imageSrc})`,
                        backgroundSize: `${slotWidth * 3}px ${slotHeight * 3}px`, // Gesamtgröße des Bildes
                        backgroundPosition: correctPosition,
                        backgroundRepeat: "no-repeat",
                    }}
                ></div>
            )}
        </div>
    );
}

function JigsawPuzzleManual() {
    const [placedPieces, setPlacedPieces] = useState([]);
    const [isSolved, setIsSolved] = useState(false);

    const imageSrc = "/infografik.svg";
    const imageWidth = 346.6;
    const imageHeight = 600;
    const gridSize = 3;
    const aspectRatio = imageHeight / imageWidth;
    const slotWidth = imageWidth / gridSize;

    const messages = [
        "10.000 Liter Wasser werden benötigt, um 1 kg Baumwolle zu produzieren – genug für etwa eine Jeans und ein T-Shirt.",
        "Die Modeindustrie erzeugt jährlich 1,2 Milliarden Tonnen CO₂ – mehr als die internationalen Flüge und die Schifffahrt zusammen.",
        "Bis zu 8.000 verschiedene Chemikalien werden in der Textilproduktion verwendet, z. B. Farbstoffe, Weichmacher und Bleichmittel.",
        "Jährlich werden etwa 92 Millionen Tonnen Textilabfälle erzeugt.",
        "Polyester, das am häufigsten in Fast Fashion verwendet wird, besteht aus fossilen Brennstoffen. Für 1 kg Polyester werden etwa 70 Millionen Barrel Öl pro Jahr verbraucht.",
        "Mikroplastik: Waschmaschinen setzen bei jedem Waschgang Mikrofasern frei. 35 % der Mikroplastikverschmutzung im Meer stammt aus synthetischer Kleidung.",
        "Etwa 2,5 % der weltweiten Ackerfläche wird für den Baumwollanbau genutzt, oft auf Kosten von Lebensmitteln und natürlichen Lebensräumen.",
        "Nur 1 % der Kleidung wird recycelt, um neue Kleidung herzustellen – der Rest landet auf Deponien oder wird verbrannt.",
        "Die Modeindustrie ist für etwa 20 % des weltweiten Abwassers verantwortlich.",
    ];

    const pieces = [
        { id: 0, position: "0% 0%" },
        { id: 1, position: "50% 0%" },
        { id: 2, position: "100% 0%" },
        { id: 3, position: "0% 50%" },
        { id: 4, position: "50% 50%" },
        { id: 5, position: "100% 50%" },
        { id: 6, position: "0% 100%" },
        { id: 7, position: "50% 100%" },
        { id: 8, position: "100% 100%" },
    ];

    const handleDrop = useCallback((slotId, pieceId) => {
        setPlacedPieces((prev) => [...prev, pieceId]);
    }, []);

    useEffect(() => {
        if (placedPieces.length === pieces.length) {
            setIsSolved(true);
        }
    }, [placedPieces]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            {/* Left part: Puzzle */}
            <div style={{ width: `${imageWidth}px`, margin: "0 20px" }}>
                <h2>{isSolved ? "Herzlichen Glückwunsch! Puzzle gelöst!" : "Löse das Puzzle!"}</h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${gridSize}, ${slotWidth}px)`,
                        gap: "0",
                    }}
                >
                    {pieces.map((piece) => (
                        <PuzzleSlot
                            key={piece.id}
                            id={piece.id}
                            correctPosition={piece.position}
                            placedPieces={placedPieces}
                            onDrop={handleDrop}
                            slotWidth={slotWidth}
                            aspectRatio={aspectRatio}
                            imageSrc={imageSrc}
                        />
                    ))}
                </div>

                {/* Puzzle-Stücke */}
                <div
                    style={{
                        marginTop: "20px",
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 100px)", // 5 Teile pro Zeile
                        gridAutoRows: "200px",
                        gap: "20px",
                        justifyContent: "center",
                    }}
                >
                    {pieces
                        .filter((piece) => !placedPieces.includes(piece.id)) // Zeige nur ungelegte Teile
                        .sort((a, b) => {
                            const containerOrder = [3, 1, 6, 0, 4, 7, 2, 5, 8];
                            return containerOrder.indexOf(a.id) - containerOrder.indexOf(b.id);
                        })
                        .map((piece, index) => (
                            <PuzzlePiece
                                key={piece.id}
                                id={piece.id}
                                imageSrc={imageSrc}
                                correctPosition={piece.position}
                                slotWidth={slotWidth}
                                aspectRatio={aspectRatio}
                            />
                        ))}
                </div>
            </div>

            {/* Right part: Text Boxes */}
            <div style={{
                marginTop: "20px",
                textAlign: "left",
                maxWidth: '700px', // Limit the text width
                padding: '10px',
                overflowY: 'auto'  // Enable scrolling if necessary
            }}>
                {placedPieces.map((_, index) => (
                    <p
                        key={index}
                        className="fade-in" // Added animation class
                        style={{
                            margin: "10px 0",
                            padding: "10px",
                            border: "1px solid green", // Border color
                            borderRadius: "30px",
                            backgroundImage: 'url("Rectangle 28.svg")', // Background color
                        }}
                    >
                        {messages[index]}
                    </p>
                ))}
            </div>
        </div>
    );
}


export default function Home() {
    
    const [ctaInfoVisible, setCtaInfoVisible] = useState(false);
    const handleButtonClick = () => {
        setCtaInfoVisible(!ctaInfoVisible); // Umschalten der Sichtbarkeit
    };



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
