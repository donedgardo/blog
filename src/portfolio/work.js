// Case studies shown on the home page and rendered at /work/<slug>/ by
// src/templates/work.js (pages are created in gatsby-node.js).
//
// Everything here is public. The Origin entry is limited to what is already
// on the public resume: no hostnames, repository names or finding counts.

const work = [
  {
    slug: "agentic-delivery-at-origin",
    name: "Agentic workflows and MCP servers for a geospatial intelligence platform",
    kind: "Current role",
    org: "INVID, on the team behind Origin (GRVTY)",
    period: "Nov 2025 – Present",
    role: "Web Developer III / DevSecOps Specialist",
    summary:
      "Took a team from 0 agentic workflows delivered to 5 in 3 months, delivered 8 MCP servers and cut lead time from a week to 30 minutes.",
    stack: [
      "Model Context Protocol",
      "TypeScript",
      "Python",
      "FastMCP",
      "Langflow",
      "Django",
      "Kubernetes",
      "Jenkins",
      "Argo CD",
      "Helm",
      "Terraform",
    ],
    metrics: [
      { value: "0 → 5", label: "agentic workflows delivered in 3 months" },
      { value: "8", label: "MCP servers delivered" },
      { value: "1 week → 30 min", label: "lead time, code complete to users" },
      { value: "1–2 days → 10 min", label: "mean time to recovery" },
    ],
    links: [
      {
        label: "Press: GRVTY and partners on Origin",
        href: "https://spacenews.com/tech-firms-partner-up-to-push-intelligence-processing-closer-to-the-battlefield",
      },
    ],
    problem: [
      "Origin is GRVTY's geospatial intelligence analytics platform. When I joined, the team had not delivered an agentic workflow in its first year, a release took a manual week to reach users and security scans ran weekly.",
      "The work is for security-sector buyers and intelligence end users, so the details that can be shared here are limited to outcomes and architecture.",
    ],
    built: [
      "8 Model Context Protocol servers in TypeScript (Bun, Node.js) and Python (FastMCP): 4 built, 2 integrated and 2 hardened for Kubernetes. They connect an LLM copilot to NASA FIRMS, Esri ArcGIS, AIS maritime tracking, STAC satellite imagery, automatic target recognition and financial data.",
      "An MCP bridge and registry in Python, Django and Langflow with pluggable single sign-on, API-key and bearer authentication.",
      "A delivery pipeline on Jenkins and Google Kubernetes Engine that runs in 30 minutes, with GitOps delivery through Argo CD and Helm.",
      "A daily DevSecOps pipeline: Fortify SAST, SonarQube, TruffleHog and Google Artifact Analysis feeding DefectDojo, with single sign-on across 5 platforms.",
    ],
    decisions: [
      {
        title: "A registry instead of per-tool UI work",
        body: "Each new agent tool used to need front-end changes. Putting a bridge and registry between the copilot and the MCP servers means a new tool ships as configuration. The tradeoff is one more service to run and secure, which is why authentication is pluggable at the bridge.",
      },
      {
        title: "Build once, deploy anywhere",
        body: "The same container image moves through every environment, so a rollback is a redeploy of a known image and takes one click. This is what took recovery from days to minutes.",
      },
      {
        title: "Scan every day, not every release",
        body: "Moving static analysis from weekly to daily (7x) and scanning 100% of built container images puts findings in front of developers while the change is still fresh, and produces daily evidence for the authority to operate (ATO) package.",
      },
      {
        title: "Hardened base images",
        body: "13 container images moved to DoD Iron Bank hardened bases, which removes inherited vulnerabilities at the source instead of triaging them downstream.",
      },
    ],
    results: [
      "5 agentic workflows delivered in 3 months, from 0 in the team's first year.",
      "Lead time from code complete to users' hands cut from a week to 30 minutes.",
      "Mean time to recovery cut from 1–2 days to 10 minutes.",
      "SAST cadence raised 7x and 100% of built container images scanned.",
    ],
  },
  {
    slug: "gitlaunch",
    name: "GitLaunch",
    kind: "Product",
    org: "Founder and sole engineer",
    period: "Ongoing",
    role: "Design, build and operations",
    summary:
      "Deployment control for teams: see what is deployed in every environment, then promote or roll back in one click on top of the CI you already run.",
    stack: [
      "TypeScript",
      "Fastify",
      "HTMX",
      "MongoDB",
      "Playwright",
      "Docker",
      "Helm",
      "Argo CD",
      "Terraform",
      "GitHub Actions",
    ],
    metrics: [
      { value: "Live", label: "in production at gitlaunch.dev" },
      { value: "2", label: "CI providers: GitHub Actions and Jenkins" },
      { value: "1 click", label: "to promote or roll back" },
    ],
    links: [
      { label: "Live site", href: "https://gitlaunch.dev" },
      { label: "Source on GitHub", href: "https://github.com/donedgardo/gitlaunch" },
      { label: "One-click deploy on Railway", href: "https://railway.com/deploy/gitlaunch" },
    ],
    problem: [
      "On most teams only one or two people know what is deployed where, and a rollback means finding the right pipeline run and hoping it still works. I saw the same gap at every client I coached.",
      "GitLaunch gives the whole team one page with the state of every environment, and makes promote and rollback a button.",
    ],
    built: [
      "Deployment tracking: build history per service and the current state of every environment.",
      "One-click promote and rollback from the dashboard or the API, through a GitHub App for GitHub Actions and a Jenkins provider.",
      "Live status over Server-Sent Events, so the dashboard updates without a refresh.",
      "Feature flags and experiments per service and environment, with a ship or no-ship verdict.",
      "An agent skill that wires a customer's repository to GitLaunch, so onboarding can be done by a coding agent.",
    ],
    decisions: [
      {
        title: "Sit on top of existing CI instead of replacing it",
        body: "Teams keep their GitHub Actions or Jenkins pipelines; GitLaunch triggers and tracks them. Adoption costs an afternoon, not a migration. The tradeoff is that GitLaunch is only as fast as the pipeline underneath it.",
      },
      {
        title: "Server-rendered HTML with HTMX, not a single-page app",
        body: "Fastify renders Handlebars templates and HTMX swaps fragments, with Server-Sent Events for live status. There is one codebase and no client state to keep in sync. The tradeoff is less rich client interaction, which a deployment dashboard does not need.",
      },
      {
        title: "Fail closed on secrets",
        body: "Stored secrets such as Jenkins tokens are encrypted, and the server refuses to boot without a valid 32-byte key. Keys rotate through a keyring so old ciphertexts stay readable.",
      },
      {
        title: "Open core with an enforced boundary",
        body: "Enterprise features live in ee/, which mirrors src/. A test fails the build if anything in src/ imports from it, so deleting the directory leaves a working single-seat product.",
      },
      {
        title: "Use the product to ship the product",
        body: "GitLaunch runs on its own feature-flag engine, so every flag feature is exercised in production before a customer depends on it.",
      },
    ],
    results: [
      "Deployed and running in production at gitlaunch.dev.",
      "CI runs unit tests, Playwright integration tests, a Helm chart check and a Docker image build on every push.",
      "Every push to main publishes a container image; a Railway template and a Helm chart cover self-hosting.",
    ],
  },
  {
    slug: "flexio-delivery-coaching",
    name: "From a release every 2 weeks to several a day at Flexio",
    kind: "Client engagement",
    org: "Carreras Dev, for Flexio (package delivery logistics SaaS)",
    period: "9 months",
    role: "Software delivery coach, hands-on",
    summary:
      "Nine months of pairing with the team on TDD and CI/CD: change failure rate from 50% to 10% and recovery from days to 10 minutes.",
    stack: ["Test-driven development", "CI/CD", "Terraform", "Smoke tests", "Pair programming", "DORA metrics"],
    metrics: [
      { value: "2 weeks → daily", label: "release frequency" },
      { value: "50% → 10%", label: "change failure rate" },
      { value: "1–2 days → 10 min", label: "mean time to recovery" },
      { value: "3 → 9 months", label: "engagement extended" },
    ],
    links: [],
    problem: [
      "Flexio released once every 2 weeks, half of those releases caused a failure in production and recovering from one took 1 to 2 days. Developers committed about twice a week and worked in silos across front end, back end and infrastructure.",
    ],
    built: [
      "Daily pairing sessions with the developers on test-driven development, in their codebase and on their backlog.",
      "A CI/CD pipeline that deploys on merge, with smoke tests after each deploy and automated rollback when they fail.",
      "Infrastructure managed as code with Terraform.",
    ],
    decisions: [
      {
        title: "Coach inside the work, not in a classroom",
        body: "I paired on real features instead of running a course. Progress on the backlog is slower in the first weeks, and that tradeoff was agreed with leadership up front. In return the habits stick because the team builds them on their own code.",
      },
      {
        title: "Measure with the four DORA metrics",
        body: "Deployment frequency, lead time, change failure rate and recovery time were tracked from the first week, so the engagement was judged on results and not on activity.",
      },
      {
        title: "Automate rollback before speeding up",
        body: "Smoke tests and automated rollbacks came before the push for more frequent releases. A team that can recover in 10 minutes can afford to release many times a day.",
      },
    ],
    results: [
      "Releases went from 1 every 2 weeks to multiple per day.",
      "Lead time from integrated code to users went from 2 weeks to minutes.",
      "Change failure rate went from 50% of releases to 10%.",
      "Mean time to recovery went from 1–2 days to 10 minutes.",
      "Commit frequency went from 2 per week to multiple per day, and the planned 3-month engagement was extended to 9 months.",
    ],
  },
  {
    slug: "react-ci-cd-template",
    name: "react-ci-cd-template",
    kind: "Open source",
    org: "Personal project",
    period: "2025 – Present",
    role: "Author",
    summary:
      "A React, TypeScript and Vite starter whose pipeline tests, scans, builds once, deploys to GitHub Pages and smoke-tests the live URL.",
    stack: ["React", "TypeScript", "Vite", "Vitest", "GitHub Actions", "GitHub Pages", "Codecov"],
    metrics: [
      { value: "100%", label: "test coverage" },
      { value: "1", label: "build, reused for deploy" },
      { value: "Live demo", label: "deployed on every merge" },
    ],
    links: [
      { label: "Live demo", href: "https://donedgardo.github.io/react-ci-cd-template/" },
      { label: "Source on GitHub", href: "https://github.com/donedgardo/react-ci-cd-template" },
    ],
    problem: [
      "Most starter templates stop at a build that passes. Teams I coached kept rebuilding the same delivery pipeline from scratch, and usually left out the parts that make a release safe.",
    ],
    built: [
      "A GitHub Actions pipeline with lint, Vitest with coverage, a dependency security scan and a production build on every push.",
      "A deploy job that publishes to GitHub Pages on merges to main, then fetches the live URL and fails if the app is not served.",
      "A README that explains each stage and how to roll back.",
    ],
    decisions: [
      {
        title: "Build once, deploy the tested bundle",
        body: "The deploy job publishes the exact artifact the build job produced and verified. Rebuilding at deploy time would mean shipping something that was never tested.",
      },
      {
        title: "A smoke test is part of the deploy",
        body: "The pipeline is not green until the live URL serves the app. A deploy that succeeds but serves a blank page fails the run.",
      },
      {
        title: "No per-fork configuration",
        body: "The base path is derived from the repository name, so anyone who uses the template gets a working deployment after one settings change.",
      },
      {
        title: "Rollback is a revert",
        body: "There is no separate rollback tool to maintain. Reverting the commit runs the same pipeline and redeploys the previous version, with the same checks.",
      },
    ],
    results: [
      "100% test coverage reported to Codecov.",
      "Deployed to a live demo on every merge to main, verified by the smoke test.",
    ],
  },
  {
    slug: "rusty-chess",
    name: "Rusty Chess",
    kind: "Open source",
    org: "Personal project",
    period: "2024 – Present",
    role: "Author",
    summary:
      "A chess game in Rust and Bevy written test-first: 286 tests, and tagged releases that build WebAssembly and publish a playable demo.",
    stack: ["Rust", "Bevy", "WebAssembly", "Test-driven development", "GitHub Actions"],
    metrics: [
      { value: "286", label: "automated tests" },
      { value: "Live demo", label: "playable in the browser" },
      { value: "Tag → release", label: "automated publishing" },
    ],
    links: [
      { label: "Live demo on itch.io", href: "https://donedgardo.itch.io/rusty-chess" },
      { label: "Source on GitHub", href: "https://github.com/donedgardo/rusty_chess" },
    ],
    problem: [
      "I wanted to know how far strict test-driven development goes in Rust on a problem with real rules complexity: check, checkmate, stalemate and per-piece movement.",
    ],
    built: [
      "The full rules of chess as a library with no dependency on the game engine.",
      "A Bevy front end that calls the same public API the tests use.",
      "A pipeline that checks formatting and runs every test on each push, and a release workflow that builds WebAssembly and publishes to itch.io when a version is tagged.",
    ],
    decisions: [
      {
        title: "Rules as a library, engine as a thin shell",
        body: "The crate is split into a library and a three-line binary. The rules can be tested without starting a window, and the integration tests play whole games through the public API.",
      },
      {
        title: "Two layers of tests",
        body: "279 unit tests sit next to the code for each piece and the board. 7 integration tests play complete games such as Fool's mate and Scholar's mate, which catches errors that only appear when rules interact.",
      },
      {
        title: "Releases are tags",
        body: "Publishing is a git tag, not a manual upload. The tradeoff is a slower first release while the workflow was written; every release since has been one command.",
      },
    ],
    results: [
      "286 tests run on every push: 279 unit tests and 7 full-game integration tests.",
      "A playable demo in the browser, published by the release workflow.",
    ],
  },
]

module.exports = work
