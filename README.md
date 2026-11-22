# ATLAS — History & Culture Club

**ATLAS** is a website for an experiential history and culture club. Instead of only reading about civilizations, members join hands-on activities such as writing on clay tablets, matching Egyptian symbols, and exploring desert storytelling traditions.

Built for **IT312 – Web Applications Engineering** (Group 1), King Saud University.

**Live site:** https://danalturaifi.github.io/atlas-club/

---

## Who it is for

| User | What they can do |
|------|------------------|
| **Visitor** | Browse the club, its offerings, and its activity leaders |
| **Club Member** | Request to join offerings, track requests, and evaluate completed activities |
| **Club Manager** | Publish new offerings and manage activity leaders and instructors |

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero section, featured offerings, member reviews, and the "Atlas Passport" progress section |
| Club Offerings | `club-offerings.html` | All seven offerings with topic, description, and price |
| About Us | `about-us.html` | Club story and the six activity leaders, one per topic |
| Leader Profile | `profile.html`, `profile-2.html` … `profile-6.html` | Photo, date of birth, email, expertise, skills, and education for each leader |
| Member Dashboard | `member-dashboard.html` | Table of the member's requests with offering, date, cost, and status |
| Request to Join | `request-join.html` | Form to request an offering, with validation and a confirmation step |
| Evaluate Offering | `evaluate-offering.html` | Rating and written feedback for a completed activity |
| Manager Dashboard | `manager-dashboard.html` | All offerings with price and published/draft status |
| Add Offering | `add-offering.html` | Manager form to add a new offering |
| Manage Leaders | `manage-leaders.html` | Manager page to add or delete leaders and instructors |

---

## Offerings and leaders

| Topic | Offering | Price | Leader |
|-------|----------|-------|--------|
| Mesopotamia | The First Story | Free | Dr. Layla Haddad |
| Ancient Egypt | Fables of the Nile | 30 SAR | Rania Mansour |
| World Cultures | The Hero's Path | 30 SAR | — |
| Ancient Arabia | Stories of the Desert | Free | Khalid Al-Shehri |
| Persia | Gardens of Persia | 40 SAR | Dr. Yasmin Farahani |
| Islamic Golden Age | Minds of the House of Wisdom | 50 SAR | Tariq Al-Ghamdi |
| Silk Road | Trade Along the Silk Road | 25 SAR | Mei Lin Zhao |

All names, emails, and dates of birth for leaders are **sample data**.

---

## Features

### Phase 2 — HTML & CSS
- Semantic, multi-page site with shared header, navigation, breadcrumbs, and footer
- Responsive layout (desktop, tablet, phone) using Flexbox
- Light and dark colour themes built from a single set of CSS variables
- Custom SVG illustrations and logo

### Phase 3 — JavaScript
- **Home page:** light/dark theme switcher (remembered with `localStorage`), mobile menu, back-to-top button, and a live clock in the footer
- **About Us:** the "Join Our Team" form is validated and shows an error under each wrong field
- **Club Offerings:** offerings appear in a random order and can be sorted by price or name
- **Evaluate Offering:** checks the activity, rating, and feedback, then shows a message that depends on the rating
- **Request to Join** (`js/request-join.js`):
  - Validates the offering, a full name with no numbers or special characters, and a future date
  - Shows an `alert` listing exactly what is missing or wrong
  - On valid data, a confirmation window lets the member stay or return to the dashboard
  - If they stay, the request appears in a session table and more can be added without losing earlier ones
  - If they leave, temporary requests are cleared and previously stored requests remain
  - Offerings added by the manager appear automatically in the activity list
- **Member Dashboard:** shows sample requests plus any stored requests
- **Manager pages** (`js/manager-phase3.js`):
  - Add Offering validates the form and saves to `localStorage`
  - Manager Dashboard lists saved offerings as Published
  - Manage Leaders adds leaders with validation and deletes selected leaders after confirmation

---

## Technologies

- HTML5
- CSS3 (Flexbox, CSS variables, media queries)
- Vanilla JavaScript limited to the course material: DOM, events, RegEx string methods, `localStorage` + JSON
- No frameworks or external libraries

---

## Project structure

```
atlas-club/
├── index.html
├── club-offerings.html
├── about-us.html
├── profile.html … profile-6.html
├── member-dashboard.html
├── request-join.html
├── evaluate-offering.html
├── manager-dashboard.html
├── add-offering.html
├── manage-leaders.html
├── style.css
├── script.js              # home page scripts
├── js/
│   ├── about-us.js            # Join Our Team form validation
│   ├── club-offerings.js      # random order + sorting
│   ├── evaluate-offering.js   # evaluation form validation
│   ├── request-join.js        # Request to Join page
│   ├── member-dashboard.js    # Member Dashboard
│   └── manager-phase3.js      # manager pages
├── Link.txt
└── images/                # logo and SVG illustrations
```

---

## Run locally

No build step is needed. Download the project and open `index.html` in a browser.

---

## Team

| Name | Responsibility |
|------|----------------|
| _Member 1_ | _Pages / features_ |
| _Member 2_ | _Pages / features_ |
| _Member 3_ | Request to Join page and Member Dashboard |

> Replace the placeholders above with your team's names and responsibilities.

---

## Notes

- All data is stored in the browser (`localStorage`). There is no backend, so nothing is shared between users or devices.
- This project was created for educational purposes. Leader details, reviews, and requests are illustrative.

&copy; ATLAS Club 2026
