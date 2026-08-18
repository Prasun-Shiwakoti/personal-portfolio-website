/* ============================================================================
   CONFIG  ──  everything about you lives here.
   To update the site later, change values in this one object. No HTML editing.
   ============================================================================ */
const CONFIG = {
	/* page <title> and meta description */
	meta: {
		title: "Prasun Shiwakoti — Backend & full-stack developer, Kathmandu",
		description:
			"Prasun Shiwakoti is a backend and full-stack developer in Kathmandu. Django, Python, and machine learning systems that run in production.",
	},

	/* personal details, links and the portrait */
	profile: {
		firstName: "Prasun",
		lastName: "Shiwakoti",
		roleTag: "Full Stack and Machine Learning Developer",
		/* two sizes, pre-cropped to the 4:5 plate. The browser picks one from
		   photoSizes below; if both fail the plate falls back to initials. */
		photo: "profile-880.webp",
		photoSrcset: "profile-440.webp 440w, profile-880.webp 880w",
		photoSizes: "(max-width: 860px) 340px, 410px",
		availableLabel: "Open to work",
		location: "Kathmandu, Nepal",
		coords: "27.7172° N, 85.3240° E" /* printed in the dateline */,
		timezone: "Asia/Kathmandu" /* drives the live clock */,
		email: "prasunshiwakoti@gmail.com",
		phone: "+977 9861812959" /* display version */,
		phoneHref: "+9779861812959" /* tel: version, digits only */,
		github: "https://github.com/Prasun-Shiwakoti",
		linkedin: "https://www.linkedin.com/in/prasun-shiwakoti-9570581b3/",
	},

	/* the masthead. Each inner array is one line of the name */
	masthead: {
		name: [[{ t: "Prasun" }], [{ t: "Shiwakoti" }]],
		/* the opening editorial paragraph, set with a drop cap */
		lede: "Most of my work is backend — the part of a product nobody sees, and the part that decides whether the rest of it holds. I came to it through machine learning and stayed for the engineering. What I like is taking something vague and half-specified and turning it into something people can actually rely on.",
		/* the smaller paragraph beside it */
		ledeSub: "Before that: a funded AI fellowship, a stock-forecasting model that fused news sentiment with price data, and a transformer built from scratch because reading about attention wasn’t doing it.",
		links: [
			{ label: "Selected work", href: "#work" },
			{ label: "Email me", href: "mailto:prasunshiwakoti@gmail.com" },
		],
	},

	/* about section copy */
	about: {
		note: "Who is writing, and why you might care.",
		lead: "I like owning a problem end to end — schema, queries, endpoints, and the bit of CSS at the end that nobody volunteers for. Most days that is Python and Django. Some days it is React, or Docker, or a model that refuses to converge.",
		sub: "What I actually care about is software that stays up, says something useful when it doesn’t, and gets shipped rather than demoed. Outside of work I am reading machine learning papers with varying success, running my college’s IT club, or taking something apart to see how it fits together.",
		caption: "Kathmandu, 2025",
	},

	/* the ledger strip. value=number counts up; for a non-numeric entry
	   set value:null and provide display instead */
	stats: [
		{ value: 40, suffix: "+", label: "Projects built" },
		{ value: 6, suffix: "+", label: "Years writing code" },
		{ value: 20, suffix: "+", label: "Technologies used" },
		{ value: null, display: "∞", label: "Cups of coffee per merge" },
	],

	/* words that run across the ticker band */
	kinetic: [
		"Python",
		"Django",
		"FastAPI",
		"Flask",
		"React",
		"PostgreSQL",
		"Docker",
		"CI/CD",
		"PyTorch",
		"TensorFlow",
		"scikit-learn",
		"Pandas",
		"SQL",
		"Linux",
		"REST APIs",
	],

	/* selected work. Add/remove rows by editing this array */
	projects: [
		{
			n: "01",
			t: "AI Social-Media Automation",
			d: "Automates content creation and scheduling, with sentiment analysis to read how an audience actually responds.",
			tags: ["Django", "React", "RAG", "LSTM"],
			year: "2025",
			url: "https://github.com/Prasun-Shiwakoti/Social-Media-Manager-AI",
		},
		{
			n: "02",
			t: "Multi-Agent Research System",
			d: "Coordinated LLM agents that gather, cross-check and synthesise competitive market intelligence.",
			tags: ["Multi-Agent", "LLM", "Python"],
			year: "2025",
			url: "https://github.com/Prasun-Shiwakoti/Multi-Agent-Competitive-Intelligence-Research-System",
		},
		{
			n: "03",
			t: "News-Powered Market Analysis",
			d: "Fuses news sentiment with price data using LSTM and XGBoost to forecast market movement. My fellowship capstone.",
			tags: ["LSTM", "XGBoost", "Pandas"],
			year: "2025",
			url: "https://github.com/Prasun-Shiwakoti/News-Powered-Stock-Market-Analysis",
		},
		{
			n: "04",
			t: "Transformer From Scratch",
			d: "A transformer built from first principles — attention, encoding and training, with no high-level shortcuts to hide behind.",
			tags: ["PyTorch", "NLP", "From scratch"],
			year: "2024",
			url: "https://github.com/Prasun-Shiwakoti/transformer-from-scratch",
		},
		{
			n: "05",
			t: "CoCo, AI Study Assistant",
			d: "A study companion that adapts its explanations and practice questions to how a particular person learns.",
			tags: ["Django", "React", "ML", "Product"],
			year: "2024",
			url: "https://github.com/Prasun-Shiwakoti/CoCo",
		},
		{
			n: "06",
			t: "Heart-Disease Prediction API",
			d: "A production REST API serving an ML model for cardiac risk prediction from patient data.",
			tags: ["FastAPI", "scikit-learn", "REST"],
			year: "2023",
			url: "https://github.com/Prasun-Shiwakoti/heart-disease-api",
		},
	],

	/* work experience. Add a job by copying one object into this array */
	experience: [
		{
			when: "Sept 2025",
			until: "Present",
			role: "Full-Stack Web Developer",
			org: "Magniment IT Pvt. Ltd.",
			points: [
				"Independently run a high-volume WhatsApp marketing platform serving 500+ active businesses and 50,000+ messages a day.",
				"Resolved critical architectural flaws and cleared 40+ production bugs left behind by the previous team.",
				"Architected and shipped a full e-commerce website builder in Django — drag-and-drop UI, inventory, payments — letting 100+ non-technical users launch stores.",
			],
		},
		{
			when: "May 2025",
			until: "Dec 2025",
			role: "AI Fellow",
			org: "Fusemachines AI Fellowship 2025",
			points: [
				"Completed a fully funded six-month AI Microdegree, capstone on news-powered stock market analysis using LSTM and XGBoost.",
				"Built production ML systems on 12-Factor methodology, Docker and GitHub Actions CI/CD, applying MLOps for versioning and monitoring.",
				"Engineered end-to-end data pipelines over 10,000+ records with Pandas and SQL, plus dashboards in Matplotlib and Seaborn.",
			],
		},
	],

	/* education (single block) */
	education: {
		degree: "B.E. Computer Engineering",
		meta: "Kathmandu Engineering College · 2023 — Present",
		detail:
			"Full scholarship on an IOE entrance rank of 320, currently averaging 83%. President of the KEC IT Club.",
	},

	/* earlier highlights */
	highlights: [
		{
			title: "Hackathon Winner, Provathon 2020",
			meta: "CSIT Association of Nepal",
			detail:
				"Full-stack health monitoring app with an ML model predicting cardiac arrest events from real-time data.",
		},
		{
			title: "President, CS Club",
			meta: "Kathmandu Model College · 2020 — 2022",
			detail:
				"Drove a 25% rise in sign-ups and ran bootcamps on cybersecurity, Python and web development.",
		},
	],

	/* certifications */
	certs: [
		{
			issuer: "Fusemachines",
			title: "Microdegree™ in Artificial Intelligence",
			year: "2025",
			url: "https://s3.amazonaws.com/fuseclassroom-resources-prod/student-certificates/Microdegree%E2%84%A2+in+Artificial+Intelligence+2025-PRASUN+SHIWKAOTI.pdf",
		},
		{
			issuer: "Stanford University",
			title: "Machine Learning Specialization",
			year: "2024",
			url: "https://drive.google.com/drive/folders/17zi1_Wkko2qgP2ovTAr1cvHg_1dhdsCl?usp=sharing",
		},
		{
			issuer: "Udemy",
			title: "Complete Web Development Bootcamp",
			year: "2023",
			url: "https://drive.google.com/file/d/1KIbWk09eReShq8HwVO2PnMNuOdtDoLJ8/view?usp=drive_link",
		},
		{
			issuer: "Programiz",
			title: "Master DSA with Python",
			year: "2023",
			url: "https://drive.google.com/drive/folders/1jWizIKJ_6pFDRU-CmtcS6hrHVxgYGAL3?usp=drive_link",
		},
		{
			issuer: "Kaggle, Programiz",
			title: "Python Programming",
			year: "2022",
			url: "https://drive.google.com/drive/folders/1z050VClWnl4fpkyDY90hYjqVUScHnkPM?usp=drive_link",
		},
	],

	/* contact section */
	contact: {
		headline: [[{ t: "Drop me" }], [{ t: "a " }, { t: "line.", accent: true }]],
		note: "I read everything that arrives. I reply to most of it, usually within a day or two.",
		footerNote: "Built with too much coffee",
	},

	/* nav links (desktop + mobile) */
	nav: [
		{ label: "About", href: "#about" },
		{ label: "Work", href: "#work" },
		{ label: "Experience", href: "#experience" },
		{ label: "Background", href: "#background" },
		{ label: "Contact", href: "#contact" },
	],
};

/* small helper: build the inner HTML of a headline line from its segments */
function lineSegments(segs) {
	return segs
		.map((s) => (s.accent ? `<em class="accent">${s.t}</em>` : s.t))
		.join("");
}
