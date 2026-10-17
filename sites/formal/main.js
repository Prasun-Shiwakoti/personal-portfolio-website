/* ============================================================================
   main.js — behaviour only.

   Every word on this page lives in index.html. Nothing here creates content,
   so the site reads identically to a crawler, to a text browser, and to anyone
   whose JavaScript failed to load. What follows is enhancement and nothing
   more: reveals, a count-up, the current-section underline, the mobile index
   sheet, and a clock.

   No framework, no animation library. Reveals are CSS transitions switched on
   by an IntersectionObserver, which means nothing is recalculated while you
   scroll and nothing can be left invisible by a stale scroll measurement.
   ============================================================================ */

/* tells the safety net in index.html to stand down */
window.__enhanced = true;

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

/* ---- live local time, in the dateline and the colophon ---- */
(function () {
	const fmt = new Intl.DateTimeFormat("en-GB", {
		timeZone: "Asia/Kathmandu",
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

/* ---- the copyright year is baked into the markup so a crawler sees it;
        this keeps it honest without anyone having to remember ---- */
(function () {
	const el = document.getElementById("footCopy");
	if (el) {
		el.textContent = el.textContent.replace(
			/\d{4}/,
			new Date().getFullYear(),
		);
	}
})();
