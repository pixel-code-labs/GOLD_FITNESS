# GOLD_FITNESS 🏋️‍♂️

A high-performance landing web application designed for **Gold Fitness Studio**. Built with responsive UI/UX standards, optimized Lighthouse performance, dynamic state management, and schema-structured SEO for Google local rankings.

![License](https://img.shields.io/badge/license-MIT-gold)
![Build](https://img.shields.io/badge/version-1.0.0-gold)

---

## 🌟 Key Features

- **SEO & Schema Markup**: Includes `ExerciseGym` JSON-LD structured data, Open Graph social tags, canonical URL routing to Google Maps, and semantic HTML structure.
- **Interactive Schedule System**: Built-in location state switcher (`script.js`) that lets users filter schedules by branch and day.
- **Dynamic Stats Counter**: Scroll-triggered numeric increments for gym statistics.
- **Fully Responsive**: Mobile-first grid layouts built to scale seamlessly across phones, tablets, and desktops.
- **Custom Aesthetic**: Premium dark theme with custom webkit scrollbar overrides and metallic gold gradients.

---

## 📂 Project Structure

```text
GOLD_FITNESS/
├── .github/
│   └── workflows/
│       └── release.yml    # Automated release packaging on version tag push
├── css/
│   └── style.css         # Custom animations & scrollbar overrides
├── js/
│   └── script.js         # Multi-branch state switcher & interactive schedule
├── index.html            # Main web application & SEO metadata
└── README.md             # Repository documentation