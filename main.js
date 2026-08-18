/* ============================================================================
   main.js — renders the page from CONFIG, then wires up the small amount of
   behaviour that CSS cannot do on its own.

   No framework, no animation library. Reveals are CSS transitions switched on
   by an IntersectionObserver, which means nothing is recalculated while you
   scroll and nothing can be left invisible by a stale scroll measurement.
   ============================================================================ */

/* ══════════════════════════════ A. RENDER ══════════════════════════════ */

/* wrap each line of a headline in an overflow mask so it can rise into place */
function maskedLines(lines) {
	return lines
		.map((l) => `<span class="ln"><span>${lineSegments(l)}</span></span>`)
		.join("");
}

/* <title>, meta description, wordmark */
function renderMeta() {
	const p = CONFIG.profile;
	document.title = CONFIG.meta.title;
	document
		.getElementById("metaDesc")
		.setAttribute("content", CONFIG.meta.description);
	document.getElementById("wordmark").textContent =
		`${p.firstName} ${p.lastName}`;
}

/* topbar links and the mobile index sheet */
function renderNav() {
	const links = CONFIG.nav
		.map((n) => `<a href="${n.href}" data-nav="${n.href}">${n.label}</a>`)
		.join("");
	document.getElementById("navLinks").innerHTML = links;
	document.getElementById("mmenuLinks").innerHTML = links;
}

/* masthead: dateline, name, lede, aside links */
function renderMasthead() {
	const p = CONFIG.profile,
		m = CONFIG.masthead;

	document.getElementById("dateline").innerHTML = `
		<span>${p.location}</span>
		<span>${p.coords}</span>
		<span>Local time <span id="clock">--:--</span></span>
		<span class="live">${p.availableLabel}</span>
		<span>${p.roleTag}</span>`;

	document.getElementById("mastName").innerHTML = maskedLines(m.name);
	document.getElementById("mastLede").textContent = m.lede;
	document.getElementById("mastLedeSub").textContent = m.ledeSub;

	document.getElementById("mastLinks").innerHTML = m.links
		.map(
			(l) =>
				`<a href="${l.href}">${l.label} <span class="arw">&rarr;</span></a>`,
		)
		.join("");
}

/* about: portrait plate, caption, prose */
function renderAbout() {
	const p = CONFIG.profile,
		a = CONFIG.about;

	document.getElementById("aboutNote").textContent = a.note;

	const img = document.getElementById("portrait");
	img.src = p.photo;
	if (p.photoSrcset) img.srcset = p.photoSrcset;
	if (p.photoSizes) img.sizes = p.photoSizes;
	img.alt = `${p.firstName} ${p.lastName}`;
	

	document.getElementById("plateCaption").innerHTML =
		`<span>Fig. 1</span><span>${a.caption}</span>`;

	document.getElementById("aboutLead").textContent = a.lead;
	document.getElementById("aboutSub").textContent = a.sub;
}

/* the ledger strip. Numeric cells get data-count and tick up when seen */
function renderLedger() {
	document.getElementById("ledger").innerHTML = CONFIG.stats
		.map((s) => {
			/* the finished value goes straight into the markup, so the ledger
			   reads correctly even if the count-up never runs */
			const num =
				s.value === null
					? `<div class="ledger-num">${s.display}</div>`
					: `<div class="ledger-num" data-count="${s.value}" data-suffix="${s.suffix || ""}">${s.value}${s.suffix || ""}</div>`;
			return `<div class="ledger-cell">${num}<div class="ledger-label">${s.label}</div></div>`;
		})
		.join("");
}

/* the skills ticker, rendered twice so the CSS marquee loops seamlessly */
function renderTicker() {
	const set = CONFIG.kinetic.map((k) => `<span>${k}</span>`).join("");
	document.getElementById("ticker").innerHTML = set + set;
}

/* selected work, as a numbered index rather than cards */
function renderWork() {
	document.getElementById("workIndex").innerHTML = CONFIG.projects
		.map(
			(p) => `
		<li data-reveal>
			<a class="index-row" href="${p.url}" target="_blank" rel="noopener">
				<div class="index-inner">
					<span class="index-num">${p.n}</span>
					<span class="index-main">
						<span class="index-title">${p.t}<span class="arw">&nearr;</span></span>
						<span class="index-tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</span>
					</span>
					<span class="index-desc">${p.d}</span>
					<span class="index-year">${p.year}</span>
				</div>
			</a>
		</li>`,
		)
		.join("");
}

/* experience, dates in the margin */
function renderExperience() {
	document.getElementById("entries").innerHTML = CONFIG.experience
		.map(
			(x) => `
		<article class="entry" data-reveal>
			<div class="entry-when">${x.when}<span class="until">${x.until}</span></div>
			<div>
				<h3 class="entry-role">${x.role}</h3>
				<span class="entry-org">${x.org}</span>
				<ul>${x.points.map((pt) => `<li>${pt}</li>`).join("")}</ul>
			</div>
		</article>`,
		)
		.join("");
}

/* education, earlier highlights, certifications */
function renderBackground() {
	const e = CONFIG.education;

	document.getElementById("eduBlock").innerHTML = `
		<h4>Education</h4>
		<div class="bg-item">
			<div class="t">${e.degree}</div>
			<div class="m">${e.meta}</div>
			<div class="d">${e.detail}</div>
		</div>`;

	document.getElementById("hlBlock").innerHTML = `
		<h4>Earlier</h4>
		${CONFIG.highlights
			.map(
				(h) => `
			<div class="bg-item">
				<div class="t">${h.title}</div>
				<div class="m">${h.meta}</div>
				<div class="d">${h.detail}</div>
			</div>`,
			)
			.join("")}`;

	document.getElementById("certs").innerHTML = CONFIG.certs
		.map(
			(c) => `
		<li data-reveal>
			<a class="cert-row" href="${c.url}" target="_blank" rel="noopener">
				<span class="cert-issuer">${c.issuer}</span>
				<span class="cert-title">${c.title}</span>
				<span class="cert-year">${c.year}</span>
			</a>
		</li>`,
		)
		.join("");
}

/* contact block */
function renderContact() {
	const p = CONFIG.profile,
		c = CONFIG.contact;

	document.getElementById("contactHead").innerHTML = maskedLines(c.headline);
	document.getElementById("contactNote").textContent = c.note;

	const rows = [
		{ kind: "Email", val: p.email, href: `mailto:${p.email}`, out: false },
		{ kind: "Phone", val: p.phone, href: `tel:${p.phoneHref}`, out: false },
		{ kind: "GitHub", val: "Prasun-Shiwakoti", href: p.github, out: true },
		{ kind: "LinkedIn", val: "prasun-shiwakoti", href: p.linkedin, out: true },
	];

	document.getElementById("contactList").innerHTML = rows
		.map(
			(r) => `
		<li data-reveal>
			<a href="${r.href}"${r.out ? ' target="_blank" rel="noopener"' : ""}>
				<span class="kind">${r.kind}</span>
				<span class="val">${r.val}</span>
				<span class="arw">${r.out ? "&nearr;" : "&rarr;"}</span>
			</a>
		</li>`,
		)
		.join("");

	document.getElementById("footCopy").textContent =
		`© ${new Date().getFullYear()} ${p.firstName} ${p.lastName}`;
	document.getElementById("footLoc").innerHTML =
		`${p.location} · <span id="clockFoot">--:--</span>`;
	document.getElementById("footNote").textContent = c.footerNote;
}

renderMeta();
renderNav();
renderMasthead();
renderAbout();
renderLedger();
renderTicker();
renderWork();
renderExperience();
renderBackground();
renderContact();

/* ══════════════════════════════ B. BEHAVIOUR ══════════════════════════════ */

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- reveals -------------------------------------------------------------
   One observer for the whole page. Each element is unobserved the moment it
   has been shown, so the work is strictly O(number of elements), once. */
(function () {
	const targets = document.querySelectorAll("[data-reveal]");

	/* No observer support, or the visitor asked for less motion: show it all
	   immediately. Never leave anything depending on a scroll event. */
	if (REDUCED || !("IntersectionObserver" in window)) {
		targets.forEach((el) => el.classList.add("in"));
		return;
	}

	const io = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add("in");
				obs.unobserve(entry.target);
			});
		},
		{ rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
	);

	targets.forEach((el) => io.observe(el));

	/* Belt and braces. Content must never be invisible because a callback did
	   not arrive, so a plain rect check also reveals whatever is on screen.
	   It runs on load and on scroll, throttled to one frame, and takes itself
	   out of the way as soon as everything has been shown. */
	let pending = Array.from(targets);
	let queued = false;

	const sweep = () => {
		queued = false;
		pending = pending.filter((el) => {
			const r = el.getBoundingClientRect();
			if (r.top < innerHeight && r.bottom > 0) {
				el.classList.add("in");
				io.unobserve(el);
				return false;
			}
			return true;
		});
		if (!pending.length) {
			removeEventListener("scroll", onScroll);
			io.disconnect();
		}
	};

	const onScroll = () => {
		if (queued) return;
		queued = true;
		requestAnimationFrame(sweep);
	};

	addEventListener("scroll", onScroll, { passive: true });
	addEventListener("load", sweep);
})();

/* ---- the ledger numbers tick up once, when first seen ---- */
(function () {
	const nums = document.querySelectorAll("[data-count]");
	/* the markup already carries the final value, so with reduced motion or
	   without an observer there is simply nothing left to do */
	if (!nums.length || REDUCED || !("IntersectionObserver" in window)) return;

	const run = (el) => {
		const end = +el.dataset.count,
			suffix = el.dataset.suffix || "";
		const started = performance.now(),
			ms = 1400;
		const step = (now) => {
			const t = Math.min(1, (now - started) / ms);
			/* ease-out cubic */
			const v = Math.round(end * (1 - Math.pow(1 - t, 3)));
			el.textContent = v + suffix;
			if (t < 1) requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	};

	const io = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((e) => {
				if (!e.isIntersecting) return;
				run(e.target);
				obs.unobserve(e.target);
			});
		},
		{ threshold: 0.4 },
	);
	nums.forEach((el) => io.observe(el));
})();

/* ---- underline the nav link for whichever section you are in ---- */
(function () {
	if (!("IntersectionObserver" in window)) return;
	const sections = [
		document.querySelector(".masthead"),
		...document.querySelectorAll("main section[id]"),
	].filter(Boolean);

	const mark = (href) =>
		document
			.querySelectorAll("[data-nav]")
			.forEach((a) => a.classList.toggle("is-current", a.dataset.nav === href));

	const io = new IntersectionObserver(
		(entries) => {
			/* whichever tracked section is nearest the top of the band wins */
			const visible = entries
				.filter((e) => e.isIntersecting)
				.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
			if (visible.length) mark("#" + visible[0].target.id);
		},
		{ rootMargin: "-45% 0px -45% 0px" },
	);
	sections.forEach((s) => io.observe(s));
})();

/* ---- topbar grows a hairline once you leave the masthead ---- */
(function () {
	const bar = document.getElementById("topbar");
	let ticking = false;
	const update = () => {
		bar.classList.toggle("is-stuck", scrollY > 40);
		ticking = false;
	};
	update();
	addEventListener(
		"scroll",
		() => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		},
		{ passive: true },
	);
})();

/* ---- mobile index sheet ---- */
(function () {
	const toggle = document.getElementById("menuToggle"),
		close = document.getElementById("menuClose"),
		sheet = document.getElementById("mmenu");
	if (!toggle || !sheet) return;

	const open = () => {
		sheet.hidden = false;
		toggle.setAttribute("aria-expanded", "true");
		document.body.style.overflow = "hidden";
	};
	const shut = () => {
		sheet.hidden = true;
		toggle.setAttribute("aria-expanded", "false");
		document.body.style.overflow = "";
	};

	toggle.addEventListener("click", open);
	close.addEventListener("click", shut);
	sheet.querySelectorAll("a").forEach((a) => a.addEventListener("click", shut));
	addEventListener("keydown", (e) => {
		if (e.key === "Escape" && !sheet.hidden) shut();
	});
})();

/* ---- live local time, in the dateline ---- */
(function () {
	const fmt = new Intl.DateTimeFormat("en-GB", {
		timeZone: CONFIG.profile.timezone,
		hour: "2-digit",
		minute: "2-digit",
	});
	const tick = () => {
		const t = fmt.format(new Date());
		const a = document.getElementById("clock"),
			b = document.getElementById("clockFoot");
		if (a) a.textContent = t;
		if (b) b.textContent = t;
	};
	tick();
	setInterval(tick, 15000);
})();
