const fs = require("fs/promises");
const path = require("path");

const root = path.resolve(__dirname, "..");
const rawDir = path.join(root, "content", "rozpravky", "raw");
const mdDir = path.join(root, "content", "rozpravky");
const outDir = path.join(root, "rozpravky");

const stories = [
  {
    number: 0,
    series: 1,
    title: "Ako si dráčiky postavili ihrisko",
    slug: "00-ako-si-draciky-postavili-ihrisko",
    image: "00-budovanie-ihriska.png",
    cover: "00-stavba-ihriska.png",
    focus: "prvé veľké dračie stavanie",
    concept: "Úvod do kráľovstva, kde sa princezná Lada nudí v paláci a nad mestom bývajú štyri malé dráčiky. Keď sa ich svety začnú približovať, obyčajná túžba po mieste na hranie sa zmení na prvé veľké dračie dobrodružstvo.",
    note: "Dobrá vstupná rozprávka do sveta dráčikov: predstaví horu, terasu aj ich chuť robiť veci po svojom.",
    url: "https://sdmntprnortheu.oaiusercontent.com/files/00000000-6804-71f4-9fea-a55899a03bea/raw?se=2026-05-16T09:59:34Z&sp=r&sv=2026-02-06&sr=b&scid=1616a4ba-d708-4646-bfc8-a757ec2c59f2&skoid=5bfb38a5-43fb-4c63-80a1-6ae1e97e2e16&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-05-16T08:07:48Z&ske=2026-05-18T08:07:48Z&sks=b&skv=2026-02-06&sig=nmx/niJUDuIN/2cjpq2HgHFJuS3z0fHrJ3DPoDoCX1I%3D",
  },
  {
    number: 1,
    series: 1,
    title: "Ako si dráčiky postavili bazénik",
    slug: "01-ako-si-draciky-postavili-bazenik",
    image: "01-stavba-bazenu.png",
    cover: "01-stavba-bazena.png",
    focus: "voda, horúčava a Mokrošov nápad",
    concept: "Na dračiu horu príde také teplo, že aj kamene pôsobia unavene. Mokroš túži po vode, ostatní po hre a z jedného jednoduchého priania sa začne stavanie, pri ktorom má každý dráčik vlastnú predstavu o pohodlí.",
    note: "Letná kapitola s veľa vodou a jednoduchou témou spolupráce, keď niekomu je priveľmi teplo.",
    url: "https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-0634-720a-bfc8-502ceb25b5fb/raw?se=2026-05-16T09:59:37Z&sp=r&sv=2026-02-06&sr=b&scid=1fb208be-9e57-40ff-8ad8-c6e6bb14e9a1&skoid=5bfb38a5-43fb-4c63-80a1-6ae1e97e2e16&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-05-16T08:07:50Z&ske=2026-05-18T08:07:50Z&sks=b&skv=2026-02-06&sig=rbXoAGB9KwpfOUV/lv3os/ZMFEb3jyBXJ%2B8JsknQaWc%3D",
  },
  {
    number: 2,
    series: 1,
    title: "Ako Poletucha skoro prečítala oblohu",
    slug: "02-ako-poletucha-skoro-precitala-oblohu",
    image: "poletucha.png",
    cover: "02-poletucha-dazd.png",
    scene: "02-poletucha-dazd.png",
    focus: "knihy, oblaky a dážď",
    concept: "Poletucha sa zobudí s hlavou plnou kníh a s pocitom, že oblohu možno pochopiť, ak sa človek dosť snaží. Lenže medzi múdrym čítaním, odvahou skúšať a tým, čo urobí počasie, je ešte celý vzdušný priestor na omyly.",
    note: "Poletucha zistí, že vedieť niečo z knihy ešte neznamená vedieť to hneď používať.",
    url: "https://sdmntprnortheu.oaiusercontent.com/files/00000000-1f78-71f4-8d35-1a5f45addf06/raw?se=2026-05-16T09:59:40Z&sp=r&sv=2026-02-06&sr=b&scid=3e7afa41-90f1-4679-85bf-0a6c96713a90&skoid=5bfb38a5-43fb-4c63-80a1-6ae1e97e2e16&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-05-16T06:18:10Z&ske=2026-05-18T06:18:10Z&sks=b&skv=2026-02-06&sig=glgtEphA800H4j%2BS%2B0D4NaS9PgN1CAqFqGTl2QIsgDs%3D",
  },
  {
    number: 3,
    series: 1,
    title: "Ako si dráčiky kúpili bicykle",
    slug: "03-ako-si-draciky-kupili-bicykle",
    image: "03-nakup-bicyklov_.png",
    cover: "03-nákup-bicyklov.png",
    focus: "prvé bicykle a priveľa nadšenia",
    concept: "Poletucha v meste zazrie bicykle a dráčiky okamžite vedia, že niečo také potrebujú tiež. Výprava za prvými bicyklami otvorí otázku, čo znamená rýchlosť, rozumný výber a či sa dá každá nová vec prispôsobiť dračím nápadom.",
    note: "Dobrodružná kapitola o rýchlosti, výbere a tom, že každý dopravný prostriedok potrebuje trochu rozumu.",
    url: "https://sdmntpritalynorth.oaiusercontent.com/files/00000000-a9a8-7246-a699-ef0438a713bf/raw?se=2026-05-16T09:59:42Z&sp=r&sv=2026-02-06&sr=b&scid=9a421d93-ad37-4956-804a-3d8ffb83e265&skoid=5bfb38a5-43fb-4c63-80a1-6ae1e97e2e16&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-05-16T08:44:22Z&ske=2026-05-18T08:44:22Z&sks=b&skv=2026-02-06&sig=bWRVfM2lJ16J1ftH/K7Q5HQiqPeLbyza41Eghgw8YJ4%3D",
  },
  {
    number: 4,
    series: 1,
    title: "Ako sa Lada konečne skamarátila s dráčikmi",
    slug: "04-ako-sa-lada-konecne-skamaratila-s-dracikmi",
    image: "Lada.png",
    cover: "04-lada-kamarati.png",
    scene: "04-lada-kamarati.png",
    focus: "princezná Lada a nové priateľstvo",
    concept: "Lada je v paláci obklopená pravidlami, bábikami a dospelými povinnosťami, no pohľad za hradby ju láka viac než ďalšia schovávačka v záhrade. Rozprávka sleduje jej cestu k dráčikom a k priateľstvu, ktoré sa nerodí úplne hladko.",
    note: "Kľúčová kapitola pre vzťah Lady a dráčikov, vhodná po úvodných dobrodružstvách.",
    url: "https://sdmntprnortheu.oaiusercontent.com/files/00000000-df50-71f4-9ad8-08763482548e/raw?se=2026-05-16T09:59:57Z&sp=r&sv=2026-02-06&sr=b&scid=df1d238c-51a1-4ab3-82ea-1eb781aeb50b&skoid=5bfb38a5-43fb-4c63-80a1-6ae1e97e2e16&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-05-16T06:00:08Z&ske=2026-05-18T06:00:08Z&sks=b&skv=2026-02-06&sig=c72ZZQTkU57kzMeh4TwjD5IK5mg24Uob74Pb4zea6eI%3D",
  },
  {
    number: 5,
    series: 1,
    title: "Ako v meste došla zmrzlina",
    slug: "05-ako-v-meste-dosla-zmrzlina",
    image: "zmrzlinar.png",
    cover: "05-zmrzlinar-prazdne-kelimky.png",
    scene: "05-zmrzlinar-prazdne-kelimky.png",
    focus: "mesto, zmrzlina a nečakaný problém",
    concept: "V meste sa stane niečo takmer nepredstaviteľné: dôjde zmrzlina. Lada a dráčiky sa ocitnú pri probléme, ktorý vyzerá sladko, no vedie k ceste za zaseknutým cukrom, smutným zmrzlinárom a mestom čakajúcim na dobrú správu.",
    note: "Veselá mestská kapitola s chuťou zmrzliny a problémom, ktorý treba vyriešiť skôr než sa všetci rozmrzia.",
    url: "https://sdmntpritalynorth.oaiusercontent.com/files/00000000-c4e8-7246-8607-be1e023caac7/raw?se=2026-05-16T10:00:03Z&sp=r&sv=2026-02-06&sr=b&scid=38876c48-ce48-4c1f-84b6-9cb0e6887998&skoid=76024c37-11e2-4c92-aa07-7e519fbe2d0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-05-15T20:41:59Z&ske=2026-05-17T20:41:59Z&sks=b&skv=2026-02-06&sig=b4H6uQuwqN%2BvQlUhcECcvJcCUM4q5zo5N6bNi0H91fA%3D",
  },
  {
    number: 6,
    series: 1,
    title: "Spievankina čarovná bednička",
    slug: "06-spievankina-carovna-bednicka",
    image: "spievanka.png",
    cover: "06-spievanka-bednicka.png",
    scene: "06-spievanka-bednicka.png",
    focus: "hračky, pravda a darovanie",
    concept: "Spievanka chce zostrojiť čarovnú bedničku, ktorá by vedela vyrábať ožívajúce hračky. Keď však krásna vec nerobí to, čo má, začína sa tiché hľadanie toho, čo do kúzla patrí a čo sa nedá vyrobiť iba zo súčiastok.",
    note: "Pokojnejšia, citlivejšia rozprávka o tom, že kamarátstvo nie je to isté ako vlastnenie.",
    url: "https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-7ca8-720a-8f89-d43d9e592200/raw?se=2026-05-16T10:00:08Z&sp=r&sv=2026-02-06&sr=b&scid=5ed0238b-ae2c-49c6-be3e-a23ba47dbeab&skoid=76024c37-11e2-4c92-aa07-7e519fbe2d0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-05-16T09:31:06Z&ske=2026-05-18T09:31:06Z&sks=b&skv=2026-02-06&sig=W1lx3zDfBLrTQFTV1/TWtGcptXdv%2BsIWkACAzcjFKuc%3D",
  },
  {
    number: 7,
    series: 1,
    title: "Ako Lada ochorela a Baba Jaga skoro vyhrala preteky",
    slug: "07-ako-lada-ochorela-a-baba-jaga-skoro-vyhrala-preteky",
    image: "baba Jaga.png",
    cover: "07-baba-jaga.png",
    scene: "07-baba-jaga.png",
    focus: "choroba, pomoc a rozumné spomalenie",
    concept: "Lada musí zostať chorá v posteli, čo je podľa nej jeden z najnespravodlivejších druhov nudy. Keď si privolá pomoc, do paláca vstúpi dračie kamarátstvo, trochu liečenia a hrozba, že niekto využije spomalený deň po svojom.",
    note: "Rozprávka o tom, že pri chorobe nestačí liek. Veľmi pomôže aj kamarát, ktorý príde.",
    url: "https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-022c-720a-a9c7-c10be27f04d4/raw?se=2026-05-16T10:00:12Z&sp=r&sv=2026-02-06&sr=b&scid=593b5f1b-2bac-4b96-a701-b841044826d3&skoid=76024c37-11e2-4c92-aa07-7e519fbe2d0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-05-16T09:31:36Z&ske=2026-05-18T09:31:36Z&sks=b&skv=2026-02-06&sig=8q5tsilySx4yfsO1Mg/oSLrnXi%2BRssw1aMonnOyVF2I%3D",
  },
];

const nav = (prefix, current = "") => `
  <header class="site-header">
    <nav class="nav" aria-label="Hlavná navigácia">
      <a class="brand" href="${prefix}index.html">
        <span class="brand-mark" aria-hidden="true">D</span>
        <span>Dráčikovské rozprávky</span>
      </a>
      <div class="nav-links">
        <a href="${prefix}rozpravky/"${current === "stories" ? ' aria-current="page"' : ""}>Rozprávky</a>
        <a href="${prefix}postavy/">Postavy</a>
        <a href="${prefix}mapa/">Mapa</a>
        <a href="${prefix}pre-rodicov/">Pre rodičov</a>
        <button class="theme-toggle" type="button" data-theme-toggle>Nočný režim</button>
      </div>
    </nav>
  </header>`;

const footer = (prefix) => `
  <footer class="site-footer">
    <div class="page">
      <span>Dráčikovské rozprávky</span>
      <span>Čisté čítanie, denný aj nočný režim, šípky medzi príbehmi.</span>
    </div>
  </footer>
  <script src="${prefix}assets/js/theme.js" defer></script>`;

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const normalizeText = (text) =>
  text
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const paragraphize = (text) =>
  normalizeText(text)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

const words = (text) => normalizeText(text).split(/\s+/).filter(Boolean).length;

async function downloadStory(story) {
  await fs.mkdir(rawDir, { recursive: true });
  const rawPath = path.join(rawDir, `${story.slug}.txt`);
  try {
    const existing = await fs.readFile(rawPath, "utf8");
    if (existing.trim().length > 1000) return existing;
  } catch (_) {
    // The file is not present yet; fetch it below.
  }

  const response = await fetch(story.url);
  if (!response.ok) {
    throw new Error(`Nepodarilo sa stiahnuť ${story.slug}: HTTP ${response.status}`);
  }
  const text = normalizeText(await response.text());
  await fs.writeFile(rawPath, text, "utf8");
  return text;
}

function storyPage(story, text, allStories) {
  const count = words(text);
  const minutes = Math.max(4, Math.ceil(count / 165));
  const paragraphs = paragraphize(text);
  const prev = allStories[story.number - 1];
  const next = allStories[story.number + 1];
  const body = paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n            ");
  const heroImage = story.scene ? `../assets/story-scenes/${encodeURI(story.scene)}` : `../assets/illustrations/${encodeURI(story.image)}`;

  return `<!doctype html>
<html lang="sk">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(story.title)} | Dráčikovské rozprávky</title>
    <meta name="description" content="${escapeHtml(story.note)}">
    <link rel="stylesheet" href="../assets/css/styles.css">
  </head>
  <body>
    ${nav("../", "stories")}
    <main class="page reader">
      <article class="reader-card">
        <a class="back-link" href="index.html">← Všetky rozprávky</a>
        <p class="eyebrow">Rozprávka ${story.number}</p>
        <h1>${escapeHtml(story.title)}</h1>
        <div class="reader-meta">
          <span class="tag">${minutes} min čítania</span>
          <span class="tag">${escapeHtml(story.focus)}</span>
        </div>
        <img class="reader-illustration" src="${heroImage}" alt="${escapeHtml(story.title)}">
        <aside class="reading-note">
          <strong>Pre večerné čítanie</strong>
          <p>${escapeHtml(story.note)}</p>
        </aside>
        <div class="story-text">
            ${body}
        </div>
      </article>
      <nav class="reader-nav" aria-label="Navigácia medzi rozprávkami">
        ${prev ? `<a class="button secondary" href="${prev.slug}.html">← Predošlá</a>` : `<a class="button secondary" href="index.html">← Zoznam</a>`}
        ${next ? `<a class="button" href="${next.slug}.html">Ďalšia →</a>` : `<a class="button" href="index.html">Späť na rozprávky</a>`}
      </nav>
    </main>
    ${footer("../")}
  </body>
</html>
`;
}

function storiesIndex(storyTexts) {
  const seriesNumbers = [...new Set(stories.map((story) => story.series || 1))].sort((a, b) => a - b);
  const seriesNav = seriesNumbers.map((series) => {
    const count = stories.filter((story) => (story.series || 1) === series).length;
    return `<a class="series-pill" href="#seria-${series}"${series === 1 ? ' aria-current="true"' : ""}>
          <span>Séria ${series}</span>
          <small>${count} rozprávok</small>
        </a>`;
  }).join("\n        ");

  const storyCard = (story) => {
    const text = storyTexts.get(story.slug);
    const minutes = Math.max(4, Math.ceil(words(text) / 165));
    const imagePath = story.cover ? `../assets/covers/${encodeURI(story.cover)}` : `../assets/illustrations/${encodeURI(story.image)}`;
    return `<article class="story-card">
          <img src="${imagePath}" alt="${escapeHtml(story.title)}">
          <div class="story-body">
            <p class="eyebrow">Rozprávka ${story.number}</p>
            <h2>${escapeHtml(story.title)}</h2>
            <p>${escapeHtml(story.concept)}</p>
            <div class="tag-row"><span class="tag">${minutes} min</span><span class="tag">${escapeHtml(story.focus)}</span></div>
            <a class="text-link" href="${story.slug}.html">Čítať rozprávku →</a>
          </div>
        </article>`;
  };

  const seriesSections = seriesNumbers.map((series) => {
    const seriesStories = stories.filter((story) => (story.series || 1) === series);
    const first = seriesStories[0]?.number ?? "";
    const last = seriesStories[seriesStories.length - 1]?.number ?? "";
    const range = first === last ? `Rozprávka ${first}` : `Rozprávky ${first}-${last}`;
    return `<section class="series-section" id="seria-${series}" aria-labelledby="seria-${series}-title">
        <div class="series-head">
          <div>
            <p class="eyebrow">${range}</p>
            <h2 id="seria-${series}-title">Séria ${series}</h2>
          </div>
          <p>${series === 1 ? "Prvá osmička predstavuje kráľovstvo, dráčikov, Ladu a základné miesta, z ktorých vyrastú ďalšie dobrodružstvá." : "Ďalšia séria rozprávok pripravená na rozšírenie knižnice."}</p>
        </div>
        <div class="story-list" aria-label="Zoznam rozprávok v sérii ${series}">
          ${seriesStories.map(storyCard).join("\n          ")}
        </div>
      </section>`;
  }).join("\n      ");

  return `<!doctype html>
<html lang="sk">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Rozprávky | Dráčikovské rozprávky</title>
    <meta name="description" content="Zoznam dráčikových rozprávok na čisté čítanie v dennom aj nočnom režime.">
    <link rel="stylesheet" href="../assets/css/styles.css">
  </head>
  <body>
    ${nav("../", "stories")}
    <main class="page">
      <section class="page-hero">
        <p class="eyebrow">Knižnica</p>
        <h1>Rozprávky</h1>
        <p class="lead">Vyberte kapitolu a čítajte bez rušenia. Každá stránka má nočný režim, krátku rodičovskú poznámku a šípky na ďalší alebo predošlý príbeh.</p>
      </section>
      <nav class="series-tabs" aria-label="Série rozprávok">
        ${seriesNav}
      </nav>
      ${seriesSections}
    </main>
    ${footer("../")}
  </body>
</html>
`;
}

function homePage() {
  const first = stories[0];
  const latest = stories[stories.length - 1];
  return `<!doctype html>
<html lang="sk">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dráčikovské rozprávky</title>
    <meta name="description" content="Rozprávkový svet štyroch malých dráčikov na čítanie pred spaním.">
    <link rel="stylesheet" href="assets/css/styles.css">
  </head>
  <body>
    ${nav("", "")}
    <main class="page">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow">Rozprávky na večerné čítanie</p>
          <h1 id="hero-title">Svet malých dráčikov</h1>
          <p class="lead">Štyri malé dráčiky robia detské hlúposti s dračími následkami. Pre deti dobrodružstvo, pre rodičov pokojná cesta rovno k rozprávke.</p>
          <div class="actions">
            <a class="button" href="rozpravky/${first.slug}.html">Čítať prvú rozprávku</a>
            <a class="button secondary" href="rozpravky/">Vybrať rozprávku</a>
          </div>
        </div>
        <div class="hero-art">
          <img src="assets/illustrations/kralovsky%20hrad.png" alt="Kráľovský hrad, záhrada a rozprávkové mesto">
          <aside class="latest-note" aria-label="Najnovšia kapitola">
            <strong>Najnovšie v kráľovstve</strong>
            <p>${escapeHtml(latest.title)} je už vložená v knižnici aj s odkazom na predošlú časť.</p>
          </aside>
        </div>
      </section>

      <section class="section" aria-labelledby="quick-title">
        <div class="section-head">
          <div>
            <p class="eyebrow">Rýchly vstup</p>
            <h2 id="quick-title">Kam dnes večer?</h2>
          </div>
          <p>Stránka drží krátke rozhodovanie: čítať, pozrieť postavy alebo sa zorientovať v kráľovstve.</p>
        </div>
        <div class="grid">
          <article class="card">
            <img src="assets/illustrations/uhlik.png" alt="Uhlík, červený dráčik">
            <div class="card-body">
              <h3>Rozprávky</h3>
              <p>Osem príbehov s dĺžkou čítania, čistým rozložením a ďalšou kapitolou na konci.</p>
              <div class="tag-row"><span class="tag">8 kapitol</span><span class="tag">večer</span></div>
            </div>
          </article>
          <article class="card">
            <img src="assets/illustrations/mokros.png" alt="Mokroš, modrý dráčik">
            <div class="card-body">
              <h3>Dračí atlas</h3>
              <p>Postavy bez zahltenia: kto je kto, čo vie a v ktorých rozprávkach sa objaví.</p>
              <div class="tag-row"><span class="tag">postavy</span><span class="tag">deti</span></div>
            </div>
          </article>
          <article class="card">
            <img src="assets/illustrations/Lada.png" alt="Princezná Lada">
            <div class="card-body">
              <h3>Pre rodičov</h3>
              <p>Krátko o tóne, bezpečí a tom, prečo je svet vtipný, ale nie hlučný.</p>
              <div class="tag-row"><span class="tag">pokojné</span><span class="tag">slovensky</span></div>
            </div>
          </article>
        </div>
      </section>
    </main>
    ${footer("")}
  </body>
</html>
`;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const storyTexts = new Map();

  for (const story of stories) {
    const text = await downloadStory(story);
    storyTexts.set(story.slug, text);
    await fs.writeFile(
      path.join(mdDir, `${story.slug}.md`),
      `# ${story.title}\n\nZdroj: Google Drive export, rozprávka ${story.number}.\n\n${normalizeText(text)}\n`,
      "utf8",
    );
  }

  for (const story of stories) {
    await fs.writeFile(
      path.join(outDir, `${story.slug}.html`),
      storyPage(story, storyTexts.get(story.slug), stories),
      "utf8",
    );
  }

  await fs.writeFile(path.join(outDir, "index.html"), storiesIndex(storyTexts), "utf8");
  await fs.writeFile(path.join(root, "index.html"), homePage(), "utf8");
  await fs.writeFile(path.join(mdDir, "stories.json"), JSON.stringify(stories.map(({ url, ...story }) => story), null, 2), "utf8");
  console.log(`Built ${stories.length} stories.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
