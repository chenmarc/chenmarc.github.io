// All copy below is carried over verbatim from the original site's
// index.html. If you edit your bio, job history, or project descriptions,
// this is the only file you need to touch — every section reads from here.

export const nav = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export const hero = {
  name: 'Marc Chenard',
  tagline: 'MS in Computer Science',
}

export const about = {
  paragraphs: [
    "My name is Marc Chenard, and I'm a computer scientist who specializes in cybersecurity and AI.",
    "I recently completed my master's in computer science on the security track at Portland State University, also earning a graduate cybersecurity certificate. Before that, I earned my undergraduate degree in biology from PSU's Honors College, minoring in neuroscience.",
    "Shifting from the natural sciences to honing my technical skills, I've had the chance to work for organizations that align with my values, applying my interdisciplinary background to technical projects that aim to improve health outcomes and advance other meaningful causes.",
  ],
}

export const experience = [
  {
    title: 'Software QA Engineer I',
    company: 'Open Dental Software',
    paragraphs: [
      'Responsible for helping fix bugs and extend a large enterprise codebase serving dental healthcare providers. I primarily work with C#, the .NET Framework, and MySQL.',
    ],
    links: [
      { label: 'Open Dental Website', href: 'www.opendental.com' },
    ],
  },
  {
    title: 'Data Science & Medical Informatics Intern',
    company: 'Oregon Health & Science University',
    paragraphs: [
      'I joined an interdisciplinary team of clinical and technical interns to research how AI and vocal biomarkers might help screen and diagnose disease. I learned about the physiology of voice production, machine-learning algorithms suited for acoustic signals and speech, and explored ethical questions that emerge where AI meets health data.',
      "I collaborated with team members with backgrounds in general surgery, public health, computer science, and biomedical informatics. I contributed to a Python codebase built with pandas, scikit-learn, and a suite of audio processing tools. I also competed in my first hackathon in Tampa, taking on AI challenges alongside interns from OHSU, Cornell, Washington University, and the University of South Florida. My hackathon team's work spun off into an independent research project exploring what baseline voice might look like in the domain of mood disorder prediction.",
    ],
    links: [
      {
        label: 'Bridge2AI Scholars',
        href: 'https://www.b2aivoicescholars.org/our-scholars#!biz/id/67189429f1a4c2e753059594',
      },
      { label: 'Bridge2AI.org', href: 'https://bridge2ai.org/' },
      {
        label: 'Bridge2AI-Voice on NPR',
        href: 'https://www.nprillinois.org/2024-04-01/ai-analysis-of-patients-voice-could-help-diagnose-illness-new-research-shows',
      },
    ],
  },
  {
    title: 'NextGen Program Intern',
    company: 'Dana Foundation',
    paragraphs: [
      "I served as an intern in Dana Foundation's NextGen Program, which fosters a new wave of interdisciplinary experts to transform neuroscience and neurotechnology by prioritizing societal needs. With guidance from an expert mentor, I delved into the ethical challenges of emerging neurotechnologies, explored impacts on future science and health data privacy, and was exposed to innovative grant proposals for cutting-edge neuroscience and neurotech research.",
      'I also got to attend key Dana events, like the NJAM (Neurotech Justice Accelerator at Mass General Brigham) meeting during Neuroscience 2024 in Chicago.',
    ],
    links: [{ label: 'NextGen Program', href: 'https://dana.org/dana-nextgen/' }],
  },
  {
    title: 'Lab Facilitator, Graduate TA, TCSS',
    company: 'Portland State University',
    paragraphs: [
      'Throughout grad school, I delivered lectures citing intermediate C++ syntax for CS163 Data Structures while cultivating a supportive and fun classroom environment. I helped undergraduate students master object-oriented programming, abstract data types, data structures, and algorithms using C++.',
      'Additionally, I served as a TA for CS250 and CS251 Discrete Structures I & II, as well as CS486/586 Database Management Systems. Balancing a full-time graduate course load, I stayed organized to grade and provide timely and meaningful feedback on hundreds of assignments.',
    ],
    links: [],
  },
]

export const education = [
  {
    title: 'MS, Computer Science',
    company: 'Portland State University',
    paragraphs: [
      "Coursework included: CS510 IoT Security, CS554 Software Engineering, CS530 Internet Web & Cloud Systems, CS540 Deep Learning, CS584 Algorithm Design & Analysis, CS532 Operating System Foundations, CS563 Web Development, CS510 Data with Python, CS510 Secure System Administration and DevOps, CS591 Computer Security, ETM562 New Venture Management, CS595 Web & Cloud Security, CS510 AI & Humanities, and CS510 Exploring Fractals",
      "I also completed all of the 'Grad Prep' CS courses which was a bit like speedrunning a CS Bachelor's degree.",
    ],
    links: [],
  },
  {
    title: 'Bachelors of Science',
    company: 'Portland State University Honors College',
    paragraphs: [
      "Graduated as a biology major with a minor in neuroscience out of Portland State's Honors College. Assisted as the Community Outreach Coordinator of PSU's Neuroscience Club. Volunteered with NW Noggin, and wrote an undergraduate thesis about our neuroscience outreach and advocacy.",
    ],
    links: [
      { label: 'NW Noggin', href: 'https://nwnoggin.org/' },
      { label: 'undergraduate thesis', href: 'https://nwnoggin.org/' },
    ],
  },
]

// `icon` refers to a lucide-react icon name, resolved in Projects.jsx.
// `color` drives each card's accent glow/tilt highlight.
export const projects = [
  {
    title: 'Pentest MCP',
    description:
      'Forked & extended an interesting project from a workshop attended at BSides PDX. The project enables AI agents to perform pentesting tasks traditionally carried out by human cybersecurity analysts.',
    icon: 'Bot',
    color: '#2c5490',
    links: [],
  },
  {
    title: 'INL CyberStrike Workshop',
    description:
      "I completed Idaho National Lab's CyberStrike 'Lights Out' workshop, an immersive simulation based on real-world cyber attacks against Ukraine's power grid. Working hands-on with tools like Kali, Metasploit, and Wireshark, we traced MITM attacks, did firmware analysis, and learned defender strategies.",
    icon: 'ShieldAlert',
    color: '#a35c30',
    links: [{ label: 'Learn More', href: 'https://inl.gov/national-security/cyberstrike/' }],
  },
  {
    title: 'Programmatic API Pentesting',
    description:
      'I created a suite of python scripts to solve the API testing challenges on Portswigger. I wrote these as a programmatic solution to the challenges (as opposed to clicking through something like the burpsuite UI like one might expect) for a challenge in CS595 Internet Web & Cloud Security.',
    icon: 'Terminal',
    color: '#7a4a63',
    links: [],
  },
  {
    title: 'Fractals Generated with C',
    description:
      'There is something to be said about the persistance required to program fractals in C -- there are several interesting programming paradigms being used here. In the case of IFS (iterated function systems) a solution 99% of the way to being correct looks (visually) just as wrong as a solution that is 10% finished.',
    icon: 'Sparkles',
    color: '#3f6b4a',
    links: [],
  },
  {
    title: 'marcchen.net (This Website!)',
    description:
      'This website is a custom-built site made with React, Vite, and Motion, source-controlled on GitHub and deployed for free. It is configured to serve content through my custom domain marcchen.net.',
    icon: 'Globe',
    color: '#51677d',
    links: [],
  },
]

export const footer = {
  copyright: 'Marc Chenard 2026 Portfolio (A site made for the final project in CS563.)',
}
