# Afonso Matos da Cruz — Portfolio Website

**Grafisch Ontwerper · Gent, België**
Live: [afonsomatosdacruz.vercel.app](https://afonsomatosdacruz.vercel.app)

---

## Inhoudsopgave

1. [Overzicht](#overzicht)
2. [Mapstructuur](#mapstructuur)
3. [Hosting & Deployment](#hosting--deployment)
4. [Onderhoud](#onderhoud)
5. [Meertalig systeem](#meertalig-systeem)
6. [Contactformulier](#contactformulier)
7. [Juridisch & GDPR](#juridisch--gdpr)
8. [Technische details](#technische-details)

---

## Overzicht

Volledig statische portfolio website gebouwd in puur **HTML, CSS en JavaScript**.
Geen frameworks. Geen build tools. Geen afhankelijkheden.

**Features:**
- Meertalig: NL / EN / FR / PT (via `js/translations.js`)
- Volledig responsive (320px tot 2560px)
- WCAG 2.2 toegankelijk
- GDPR-conform (geen tracking, geen cookies van derden, localStorage voor taalvoorkeur)
- YouTube embeds via privacy-enhanced mode (`youtube-nocookie.com`)
- Geoptimaliseerd voor SEO (structured data, OG tags, sitemap)
- Veiligheidsheaders via `_headers` (Netlify) en `.htaccess` (Apache)
- Formspree contactformulier met thank-you pagina

---

## Mapstructuur

```
/
├── index.html              # Hoofdpagina (portfolio)
├── thank-you.html          # Bedankpagina na formulier
├── 404.html                # Aangepaste foutpagina
├── privacy.html            # Privacybeleid (GDPR)
├── cookies.html            # Cookiebeleid
├── disclaimer.html         # Disclaimer + credits
├── robots.txt              # Zoekmachine instructies
├── sitemap.xml             # URL structuur voor SEO
├── _headers                # Netlify/Cloudflare Pages beveiligingsheaders
├── _redirects              # Netlify redirect regels
├── .htaccess               # Apache server configuratie
│
├── project/
│   ├── disco.html          # Project: Disco Revisited
│   ├── smak.html           # Project: S.M.A.K. tentoonstelling
│   └── oostende.html       # Project: Badcultuur aan Zee
│
├── assets/
│   ├── algemeen/           # Gedeelde afbeeldingen
│   ├── disco/              # Afbeeldingen project Disco
│   ├── fotografie/         # Foto's voor Foto & Film sectie
│   ├── misc/               # Diverse afbeeldingen
│   ├── oostende/           # Afbeeldingen project Oostende
│   ├── smak/               # Afbeeldingen project S.M.A.K.
│   └── cv-afonso-matos-da-cruz.pdf
│
├── css/
│   └── style.css           # Alle stijlen
│
├── favicon/
│   ├── favicon.svg
│   ├── favicon.ico
│   └── apple-touch-icon.png
│
└── js/
    ├── main.js             # Hoofdlogica (navigatie, animaties, formulier)
    ├── project.js          # Projectpagina's logica
    └── translations.js     # Alle vertalingen (NL/EN/FR/PT)
```

---

## Hosting & Deployment

### Vercel (aanbevolen)

1. Push de code naar een GitHub repository
2. Verbind de repository met Vercel
3. Stel custom domain in: `afonsomatosdacruz.vercel.app`
4. Deploy happens automatisch bij elke push

### Alternatieven

- **Netlify:** Sleep de map naar het dashboard of verbind met GitHub
- **Cloudflare Pages:** Gratis, met automatische CDN
- **Apache/cPanel:** Upload via FTP, `.htaccess` wordt automatisch verwerkt

---

## Onderhoud

### CV bijwerken

Vervang `assets/cv-afonso-matos-da-cruz.pdf` met jouw bijgewerkte CV.

### Nieuw project toevoegen

1. Maak `project/nieuw-project.html` op basis van een bestaande projectpagina
2. Voeg project toe aan `projects` array in `js/main.js`
3. Voeg vertalingen toe in `js/translations.js`
4. Voeg URL toe aan `sitemap.xml`

### Foto's bijwerken

Voeg nieuwe foto's toe in `assets/fotografie/` en update het `PHOTOS` array in `js/main.js`.

### Taal bijwerken

Alle vertalingen staan in `js/translations.js`. Dutch (nl) is de brontaal.

---

## Meertalig systeem

**Werking:**
- Taal wordt opgeslagen in `localStorage` onder de sleutel `amc-lang`
- Standaardtaal: detectie via browsertaal, fallback naar `nl`
- Elementen met `data-i18n="sleutel"` worden automatisch vertaald

**Taal toevoegen:**
1. Voeg een nieuw object toe aan `TRANSLATIONS` in `translations.js`
2. Voeg een knop toe in de taalwisselaar in `index.html`

---

## Contactformulier

**Status:** VOLLEDIG FUNCTIONEEL

Het formulier gebruikt Formspree voor e-mailverzending:
- Form ID: `mjgqenly`
- Endpoint: `https://formspree.io/f/mjgqenly`
- Na verzending wordt de bezoeker doorgestuurd naar `thank-you.html`

**Features:**
- Loading state tijdens verzending
- Validatie (naam, email, bericht)
- Honeypot anti-spam bescherming
- Foutafhandeling met vertaalde foutmeldingen

---

## Juridisch & GDPR

| Bestand | Beschrijving |
|---------|-------------|
| `privacy.html` | AVG/GDPR privacybeleid |
| `cookies.html` | Cookiebeleid - geen tracking |
| `disclaimer.html` | Disclaimer, IP-rechten |

Geen cookie banner nodig - er zijn geen trackingcookies actief.

---

## Technische details

| Eigenschap | Waarde |
|-----------|--------|
| HTML | HTML5 valide |
| CSS | Variabelen, Grid, Flexbox, clamp() |
| JavaScript | ES6+ (async/await) |
| Fonts | Inter Tight, Inter, JetBrains Mono |
| Animaties | CSS transitions + IntersectionObserver |
| Toegankelijkheid | WCAG 2.2 AA |
| SEO | JSON-LD, OG tags, Twitter Cards |

---

*Portfolio van Afonso Matos da Cruz · Don Bosco SDW Gent · Grafische Technieken 4D A-GT*
*Laatste update: Juli 2026*
