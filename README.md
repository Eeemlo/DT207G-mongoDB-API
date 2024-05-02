# API - Emmas CV
Detta repository innehåller kod för ett enklare REST API byggt med NodeJs och Express. APIet är byggt för att hantera mitt CV. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Länk
En liveversion av APIet finns tillgänglig på följande URL: https://dt207g-moment2-lgk1.onrender.com/api/work_experience

## Installation, databas
APIet använder en mongoDB-databas. Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet server.js. Installations-skriptet skapar databastabeller enligt nedanstående:

| Tabellnamn         | Fält     |
|--------------|-----------|
| work_experience | id (int), company_name (varchar(255)), job_title (varchar(255)) location (varchar(55)), startdate (date), enddate (date), description (varchar(455))       |

## Användning
Nedan finns beskrivet hur man nå APIet på olika vis:

| Metod         | Ändpunkt     | Beskrivning |
|--------------|-----------|------------|
| GET | /jobs      | Hämtar alla tillgängliga jobberfarenheter        |
| POST      | /jobs  | Lagrar en ny jobberfarenhet, kräver att ett workExperience-objekt skickas med       |
|PUT|/jobs/:id|Uppdaterar existerande jobberfarenhet med angivet ID. Kräver att ett workExperience-objekt skickas med|
|DELETE|/jobs/:id|Raderar en jobberfarenhet med angivet ID.|

Ett workExperience-objekt returneras/skickas som JSON med följande struktur:

```

{
                "company": "Sawabona AB",
                "jobtitle": "HR-konsult",
                "location": "Göteborg",
                "startdate": "2022-01-01",
                "enddate": "null" | "2023-01-01",
                "description": "HR-konsult i eget bolag",
}
```