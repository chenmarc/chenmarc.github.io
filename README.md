#### Marc Chenard
#### Prof. Caterina Paun 
#### CS563, Web Development
#### Personal portfolio site  built for the final project in CS563 @ Portland State University

This project is a custom-built personal portfolio website showcasing my background in computer science, cybersecurity, AI, and interdisciplinary work in scientific and medical settings. It features sections on about me, previous work experience, education, selected projects, some information about workshops I've attended, and a contact form that links to my email. The site uses vanilla HTML, CSS, and JavaScript with animations for scroll effects, parallax, accordions, and shape morphing. It uses a dark theme with blue accent colors for a modern, professional look.

## File Structure
```
(root)
│
├── CNAME
├── README.md
├── css
│ └── main.css
├── images
│ └── chenard_headshot.jpg
├── index.html
└── js
    └── app.js
```

## How to Run the Code

This is a static website, so it has no backend and requires no build tools or servers to run locally.

1. Clone the repository:
   ```
   git clone https://github.com/chenmarc/chenmarc.github.io.git
   ```
2. Navigate to the project directory:
   ```
   cd chenmarc.github.io
   ```
3. Open `index.html` in any modern web browser (e.g., Chrome, Firefox) to view the site.

Note: The contact form requires an EmailJS account to function properly. If testing locally, replace the service ID, template ID, and user ID in `js/app.js` with your own from [EmailJS](https://www.emailjs.com/).

## Sources Used

- **EmailJS**: Used for handling the contact form submissions without a backend server. Integrated via CDN script: `https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js`. Documentation: [EmailJS](https://www.emailjs.com/).
- No other external libraries or frameworks are used; the site is built with pure HTML, CSS, and JavaScript.
- Inspiration for animations and layout drawn from modern web design practices, but all code is original.
- Referenced the videos on the course Canvas page
- Referenced videos by ProgrammingKnowledge on Youtube [Like this one](https://www.youtube.com/watch?v=LqpF8fkKOHU)
- [Shape morphing research](https://discourse.threejs.org/t/morphing-between-two-shapes/51635)
- [More shape morph learning](https://freefrontend.com/javascript-morphing-effects/)

## Deployment

The site is deployed for free using GitHub Pages. The source code is hosted in the repository: [https://github.com/chenmarc/chenmarc.github.io](https://github.com/chenmarc/chenmarc.github.io).

- Live site (GitHub Pages URL): [https://chenmarc.github.io](https://chenmarc.github.io)
- Custom domain: [https://marcchen.net](https://marcchen.net) (configured via the `CNAME` file in the repository root).

To deploy updates:
1. Push changes to the `main` branch on GitHub.
2. GitHub Pages automatically builds and deploys the site.

For custom domain setup, I had to refer to GitHub's documentation: [Configuring a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
