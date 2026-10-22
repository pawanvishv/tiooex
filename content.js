window.TIOOEX = {
    capabilities: [
        {
            id: "cloud",
            name: "Cloud",
            group: "platform",
            outcome: "A landing zone the business can extend without a yearly rewrite.",
            summary: "Modern infrastructure, migration sequencing, and a run model that keeps cost and performance visible.",
            includes: ["Estate and dependency review", "Landing zone and environment design", "Migration waves with rollback points", "Cost, reliability, and release guardrails"],
            fits: "Core platforms hitting capacity limits, seasonal demand, and systems that cannot take unplanned downtime.",
            start: "A two-week readiness review: what must move, what must stay, and the first landing zone."
        },
        {
            id: "customer-service",
            name: "Customer Service",
            group: "experience",
            outcome: "Fewer handoffs between the channel the customer uses and the team that resolves the issue.",
            summary: "Service platforms, support workflows, and self-service journeys designed around the actual case, not a new portal alone.",
            includes: ["Journey and case-type mapping", "Self-service that deflects the right work", "Agent desktop and knowledge flow", "Service levels tied to real failure points"],
            fits: "Banks, insurers, retailers, and mobility brands with rising contact volume and uneven resolution.",
            start: "A case sample across two channels, then a target flow for the highest-cost contact type."
        },
        {
            id: "cybersecurity",
            name: "Cybersecurity",
            group: "platform",
            outcome: "Security decisions that let modernization continue instead of stopping it.",
            summary: "Access, monitoring, and control designed into cloud, data, and customer platforms — not added after go-live.",
            includes: ["Control gaps against the systems you are changing", "Identity and access patterns", "Monitoring for the new architecture", "Evidence your risk and audit partners can use"],
            fits: "Regulated businesses opening APIs, cloud estates, or AI use without a clear control story.",
            start: "A threat-and-control pass on the one program already in flight."
        },
        {
            id: "data-ai",
            name: "Data & AI",
            group: "platform",
            outcome: "Decisions people will stand behind, because the data path is explainable.",
            summary: "Foundations first: definitions, pipelines, and access. Models and assistants only where the decision is named.",
            includes: ["Decision inventory — what will actually change", "Source, quality, and ownership map", "Analytics or model slice for one decision", "Operating rules for human review"],
            fits: "Risk, pricing, service, supply, and operations teams sitting on reports they do not trust.",
            start: "One decision, the data it depends on, and a four-to-six week proof."
        },
        {
            id: "digital-engineering",
            name: "Digital Engineering",
            group: "platform",
            outcome: "Software and process changes that ship with owners, not a backlog nobody releases.",
            summary: "Engineering modernization for systems that have to stay up while they are rebuilt.",
            includes: ["Release and environment constraints", "Service boundaries worth splitting", "Quality gates for the path you change", "A first slice in production, not a pilot slide"],
            fits: "Product companies and industrial firms whose engineering cadence is slower than the market.",
            start: "A delivery assessment on one product line: lead time, failure rate, and the constraint."
        },
        {
            id: "ecosystem",
            name: "Ecosystem Partners",
            group: "enterprise",
            outcome: "Integrations that match a business process, not a vendor diagram.",
            summary: "Partner and platform choices sequenced so each integration earns its operational cost.",
            includes: ["Partner landscape against your actual flows", "Integration standards and ownership", "Build, buy, or connect decision", "Joint operating cadence with the vendor"],
            fits: "Programs stalled because every platform demo looks essential.",
            start: "A shortlist of three flows and which partner touchpoint actually blocks them."
        },
        {
            id: "emerging",
            name: "Emerging Technology",
            group: "platform",
            outcome: "A new technology used in one place where the measure is already agreed.",
            summary: "Selective adoption. We pick a single use, a kill-criteria, and a path back if the value is not there.",
            includes: ["Use-case screen against current operations", "Constraints: data, risk, skills, cost", "Time-boxed prototype", "Adopt, park, or stop recommendation"],
            fits: "Leadership teams under pressure to 'do something' with a new tool.",
            start: "A one-week screen: three candidate uses, one recommended bet."
        },
        {
            id: "finance-risk",
            name: "Finance & Risk",
            group: "enterprise",
            outcome: "Numbers and risk signals that arrive in time to change a decision.",
            summary: "Closer ties between reporting, control, and the operational systems that create the numbers.",
            includes: ["Close, report, and control pain points", "Source-of-truth disputes", "Risk indicators worth automating", "A reporting path sponsors will actually use"],
            fits: "Finance and risk teams reconciling after the fact, especially in banking and insurance.",
            start: "Walk one reporting cycle and mark every manual bridge."
        },
        {
            id: "infrastructure",
            name: "Infrastructure",
            group: "platform",
            outcome: "Programs with a visible run-state, not a status meeting.",
            summary: "Planning, environments, and coordination so large technology work can be seen and steered.",
            includes: ["Environment and dependency map", "Work intake and sequencing", "Operational signals for sponsors", "Handoff into the team that will run it"],
            fits: "Multi-team programs where progress is described differently in every forum.",
            start: "A single view of work in flight, blocked work, and who owns the next decision."
        },
        {
            id: "learning",
            name: "Learning",
            group: "enterprise",
            outcome: "People who can run the new way of working after the specialists leave.",
            summary: "Adoption and skill-building tied to the system or process that is actually changing.",
            includes: ["Role-by-role impact", "Practice on the real workflow", "Manager routines, not only training decks", "Measures of adoption after launch"],
            fits: "Transformations that trained everyone and still saw the old process return.",
            start: "Pick the two roles whose behavior determines whether the change sticks."
        },
        {
            id: "marketing",
            name: "Marketing",
            group: "experience",
            outcome: "Journeys and campaigns that can be explained in commercial terms.",
            summary: "Digital experience and campaign operations connected to the offer, the channel, and the handoff into sales or service.",
            includes: ["Offer and audience clarity", "Journey friction on priority paths", "Measurement that marketing and finance both accept", "Content and campaign operating rhythm"],
            fits: "Brands with activity in every channel and no shared view of what converts.",
            start: "One priority journey, from first click to a commercial outcome."
        },
        {
            id: "sales",
            name: "Sales & Commerce",
            group: "experience",
            outcome: "A buying path that does not break between marketing, sales, and fulfillment.",
            summary: "Channels, quoting or checkout, and the operational handoff that determines whether revenue is real.",
            includes: ["Path from interest to order", "Where price, product, or eligibility is manual", "Channel role clarity", "The first fix that removes a drop-off"],
            fits: "Retail, industrial, and B2B teams whose digital channel and the order system disagree.",
            start: "Shadow one deal or one order type from intent to cash."
        },
        {
            id: "strategy",
            name: "Strategy",
            group: "enterprise",
            outcome: "A short list of moves, with owners, instead of a transformation theme.",
            summary: "Operating-model and investment choices written so a leadership team can fund, sequence, or stop them.",
            includes: ["Where value and constraint actually sit", "Options with tradeoffs", "What will not be done this year", "A 90-day sequence"],
            fits: "Executive teams with several competing technology narratives.",
            start: "A working session on the three bets already on the table."
        },
        {
            id: "supply-chain",
            name: "Supply Chain",
            group: "enterprise",
            outcome: "Plan, source, and fulfill decisions made on the same picture of demand and inventory.",
            summary: "Visibility and planning cadence across inventory, suppliers, and logistics — before a new suite is assumed.",
            includes: ["Breaks between plan and execution", "Data the planner does not trust", "Exception workflow", "A control tower slice for one product family"],
            fits: "Manufacturers, retailers, and industrial suppliers firefighting the same shortages.",
            start: "One product family, its suppliers, and the weekly decision that is currently late."
        },
        {
            id: "talent",
            name: "Talent & Organization",
            group: "enterprise",
            outcome: "A team shape that matches the work, including who decides.",
            summary: "Structure, staffing, and change support for initiatives that cut across functions.",
            includes: ["Decision rights", "Roles the program actually needs", "Where work will sit after launch", "Sponsor and manager routines"],
            fits: "Programs staffed by loaned people with no lasting home for the new process.",
            start: "A role and decision map for the first release."
        },
        {
            id: "tech-transformation",
            name: "Tech Transformation",
            group: "platform",
            outcome: "Legacy replacement sequenced so the business keeps running at every stage.",
            summary: "Multi-quarter modernization with stage gates, retirement plans, and a run state — not an open-ended rebuild.",
            includes: ["System retirement candidates", "Stage gates and funding logic", "Coexistence between old and new", "Benefits that can be checked, not only forecast"],
            fits: "Estates where every change depends on a platform nobody wants to touch.",
            start: "Name the one system whose removal would unlock the next three initiatives."
        }
    ],
    articles: [
        {
            id: "banking-priorities",
            category: "banking",
            kicker: "Research note",
            title: "Top banking priorities for the next phase of transformation",
            meta: "Banking · 6 min read",
            paragraphs: [
                "Most bank transformation lists still read as channels, core, data, and risk — four programs, four sponsors, four definitions of done. The institutions that are moving with less rework treat those as one operating problem: can a customer, a control function, and a product owner rely on the same facts.",
                "Digital core work fails quietly when the core is 'simplified' but product setup, limits, and servicing rules still live in side systems. A useful next phase names the ten decisions the core must support — onboarding, pricing exception, payment repair, credit change — and retires a side process for each one that lands. Channel redesign without that list only moves the queue.",
                "AI readiness is not a model catalog. It is clarity on which decisions may be assisted, which data those decisions use, and who remains accountable when the suggestion is wrong. Risk teams will block a vague assistant. They will engage a narrow one with an evidence trail.",
                "A practical sequence for the next two quarters: one customer journey whose failure cost is known, the core or satellite change that journey depends on, the control evidence required to release it, and a single assisted decision inside that journey. Everything else on the priority slide can wait until that loop has run once."
            ]
        },
        {
            id: "risk-management",
            category: "banking",
            kicker: "Perspective",
            title: "Actioning next-generation risk management",
            meta: "Banking · 5 min read",
            paragraphs: [
                "Risk functions are being asked to move from periodic assessment to something closer to operations. The gap is rarely a missing dashboard. It is that the event, the control, and the owner still sit in different systems, updated on different clocks.",
                "Next-generation risk work starts with a short list of events that already hurt: failed payments, access exceptions, model overrides, third-party outages. For each one, write where the signal appears, who can act the same day, and what evidence remains after the action. Tools come after that sentence is true.",
                "Data programs help only when definitions are shared with finance and the first line. If 'exposure' means three things, a faster pipeline publishes the argument sooner. Pick one definition, publish its gaps, and stop adding feeds until the first-line team uses it in a real meeting.",
                "The operating discipline is a weekly forum with the power to change a control, not only to note it. If the forum cannot change access, a threshold, or a vendor task, it is a status meeting with better charts."
            ]
        },
        {
            id: "digital-core",
            category: "capital markets",
            kicker: "Research note",
            title: "Reinventing the digital core for financial services",
            meta: "Capital markets · 5 min read",
            paragraphs: [
                "In capital markets the 'core' is rarely one system. It is the path from client request to booking, risk, and reporting — crossed by spreadsheets that everyone trusts more than the platform.",
                "Firms that make progress do not start by selecting a new core. They pick a flow with a client in it — a financing request, an onboarding, a corporate action — and count the manual bridges. The modernization target is the removal of those bridges, with the controls still intact.",
                "Cost programs and experience programs are often split, which is why both stall. A client who waits on an operations queue is a cost problem and an experience problem. One owner for that queue will outperform two transformation themes.",
                "A digital core worth the name has three properties: a product setup that does not require a release for every exception, a risk view that uses the same trade facts as the client report, and a retirement date for the spreadsheet that currently decides the edge cases."
            ]
        },
        {
            id: "digital-mobility",
            category: "automotive",
            kicker: "Perspective",
            title: "What digital mobility leaders are getting right",
            meta: "Automotive · 4 min read",
            paragraphs: [
                "Connected mobility still gets framed as a feature list: app, subscription, over-the-air update. The companies pulling ahead treat the vehicle, the retailer, and the service workshop as one lifecycle with shared identity and shared fault data.",
                "Software-led engineering helps when the release train is allowed to ship a small vehicle or service change without reopening the entire homologation argument. That requires a boundary: what is safety-relevant, what is experience, and who signs each.",
                "Ecosystem partnerships fail when the partner owns the customer moment and the OEM owns the complaint. Leaders write the service handover before the commercial announcement — who sees the fault, who talks to the driver, what the retailer is expected to do the same day.",
                "A useful test: pick one connected service live today and follow a single failure from the car to a closed workshop job. The breaks in that path are the program. The feature roadmap is not."
            ]
        },
        {
            id: "cost-experience",
            category: "capital markets",
            kicker: "Perspective",
            title: "How firms can reduce cost while improving client experience",
            meta: "Capital markets · 4 min read",
            paragraphs: [
                "Cost takeout that removes people before it removes handoffs comes back as overtime and client complaints. Experience work that adds a portal in front of the same handoffs adds a license and keeps the queue.",
                "The overlap is the exception path. Most client friction and most operations cost live in the cases the straight-through process was not designed for: missing documents, eligibility questions, breaks between booking and confirmation.",
                "A joint program measures both. For one client segment, track cycle time, rework hours, and the number of times a person re-keys a fact. Fund the change that cuts re-keying. Do not fund a channel that only displays the delay more politely.",
                "Controls do not have to be the casualty. The expensive control is the one performed twice because two teams do not trust each other's evidence. One evidence pack, reused, is usually the cost win and the client win."
            ]
        },
        {
            id: "cybersecurity-enabler",
            category: "technology",
            kicker: "Security",
            title: "Cybersecurity as an enabler of business modernization",
            meta: "Enterprise technology · 5 min read",
            paragraphs: [
                "Security teams earn a veto when they are invited after the architecture is already promised. They become useful when the control is part of the design of the thing being modernized: the cloud landing zone, the data share, the vendor connection, the assistant in the service desk.",
                "An enabling pattern is small and specific. For the platform about to go live, name the identities, the logs that must exist on day one, the data that must not leave, and the person who can approve an exception. Publish that as a one-page release bar. Programs can meet a bar. They cannot meet a principle with no test.",
                "AI adoption raises the same issue with more heat. The question is not whether the enterprise 'allows AI'. It is which data a given assistant may see, what it may send outward, and how a bad answer is detected. A banned tool with no alternative becomes shadow use. A narrow tool with logging becomes a control.",
                "Modernization moves faster when security reporting shows unlocked work — releases that passed the bar — not only findings. Leaders fund what they can see moving."
            ]
        }
    ],
    industries: [
        { id: "automotive", name: "Automotive" },
        { id: "banking", name: "Banking" },
        { id: "capital-markets", name: "Capital markets" },
        { id: "insurance", name: "Insurance" },
        { id: "retail", name: "Retail" },
        { id: "industrial", name: "Industrial" },
        { id: "energy", name: "Energy" },
        { id: "health", name: "Health" },
        { id: "public-service", name: "Public service" }
    ]
};
