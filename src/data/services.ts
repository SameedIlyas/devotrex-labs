import {
  AppWindow,
  ArrowRightLeft,
  BrainCircuit,
  Building2,
  Database,
  FlaskConical,
  House,
  MessageSquareText,
  MessagesSquare,
  Plug,
  Rocket,
  Scale,
  ScanEye,
  ScanText,
  SearchCode,
  Server,
  ShieldCheck,
  Workflow,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ── service catalogue ────────────────────────────────────────────
   Public version of the internal Devotrex Labs catalogue
   (devotrex-labs-internal-catalogue.html). Deliberately excluded:
   prices, the hourly rate card, competitor notes, the document
   checklist, external reference links, and the internal pitch scripts.
   Each `why` line is the client-facing rewrite of the internal
   "pitch it as" note — keep it that way when editing. */

export interface Service {
  id: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  bestFor: string;
  why: string;
  stack: readonly string[];
  timeline: string;
}

export interface Pillar {
  id: string;
  index: string;
  name: string;
  short: string;
  blurb: string;
  icon: LucideIcon;
  services: readonly Service[];
}

export const pillars: readonly Pillar[] = [
  {
    id: 'ai',
    index: '01',
    name: 'AI & Automation Implementation',
    short: 'AI & Automation',
    blurb:
      'Retrieval agents, automated workflows, document pipelines and computer vision. The AI work you have already sold, built properly and shipped on a fixed timeline.',
    icon: BrainCircuit,
    services: [
      {
        id: 'rag-agent',
        name: 'RAG Knowledge Agent',
        icon: MessageSquareText,
        summary:
          'A retrieval-augmented agent built over a client’s documents, FAQs and support content, deployed as a chat widget or an API endpoint.',
        bestFor:
          'Your client wants a support or internal-search chatbot, and there is no ML engineer on staff to build it correctly.',
        why: 'Ship the AI feature you already sold. A working agent in weeks, not an open-ended research project.',
        stack: ['Python', 'LangChain / LlamaIndex', 'pgvector or Pinecone', 'OpenAI / Anthropic API'],
        timeline: '2–4 weeks',
      },
      {
        id: 'workflow-automation',
        name: 'Workflow Automation Pack',
        icon: Workflow,
        summary:
          'A set of 5–10 automated workflows connecting CRM, calendar, SMS, email and the internal tools a team already uses.',
        bestFor:
          'A team running manual, repetitive processes across CRM, calendar, SMS or email that nobody has had time to automate.',
        why: 'Start with one workflow as proof. A running automation makes the case for the rest of the pack better than any deck.',
        stack: ['n8n', 'Supabase', 'Twilio', 'SendGrid / Saleshandy'],
        timeline: '1–3 weeks',
      },
      {
        id: 'document-extraction',
        name: 'Document Extraction & OCR Pipeline',
        icon: ScanText,
        summary:
          'Structured data extraction from forms and records, with validation rules and integration into the systems downstream.',
        bestFor:
          'A client (often legal, healthcare, insurance or compliance-heavy) drowning in manual data entry from scanned forms and PDFs.',
        why: 'Send one real sample document and we will demo extraction against it. Your own document beats any slide.',
        stack: ['Python', 'Tesseract / cloud OCR', 'Pydantic validation', 'Target-system integration'],
        timeline: '3–6 weeks',
      },
      {
        id: 'internal-llm-tool',
        name: 'LLM Internal Tool / Chatbot',
        icon: MessagesSquare,
        summary:
          'An internal support or knowledge assistant for a team, wired into Slack, Teams or a simple web UI.',
        bestFor:
          'Your own ops team, or a client’s internal support team, needs faster answers without another hire.',
        why: 'Lower stakes than a client-facing feature, which makes it a sensible first AI project to prove the approach.',
        stack: ['Python / Node', 'LLM API', 'Slack / Teams SDK'],
        timeline: '2–4 weeks',
      },
      {
        id: 'computer-vision',
        name: 'Computer Vision / Visual Data Extraction',
        icon: ScanEye,
        summary:
          'Pulling structured data out of drawings, diagrams and images (symbols, tags, components and dimensions) into usable records.',
        bestFor:
          'A client in construction, manufacturing or engineering who reads drawings by hand to build quotes, BOMs or component lists.',
        why: 'Proven on HVAC drawing takeoffs, not a first attempt. Send a sample drawing and we will test against it.',
        stack: ['Python', 'OpenCV', 'Object detection models', 'OCR for embedded labels'],
        timeline: '4–8 weeks, by symbol variety',
      },
    ],
  },
  {
    id: 'web',
    index: '02',
    name: 'Full-Stack Web & SaaS Engineering',
    short: 'Full-Stack & SaaS',
    blurb:
      'MVPs, feature sprints, integrations, audits and test suites, on a modern stack or on whatever your client already runs.',
    icon: AppWindow,
    services: [
      {
        id: 'saas-mvp',
        name: 'SaaS MVP Build',
        icon: Rocket,
        summary: 'A production-ready MVP with auth, billing and core CRUD, ready to onboard its first users.',
        bestFor:
          'You sold a client on a new product, but you do not have spare senior engineering capacity to start it now.',
        why: 'A fixed timeline and milestone payments. Predictable delivery matters more here than architecture detail.',
        stack: ['Next.js / React', 'FastAPI / Node', 'PostgreSQL', 'Stripe'],
        timeline: '6–10 weeks',
      },
      {
        id: 'feature-development',
        name: 'Feature Development (Ongoing)',
        icon: Wrench,
        summary:
          'Sprint-based feature delivery on your existing codebase, run as staff augmentation rather than fixed scope.',
        bestFor: 'You are mid-project on a client codebase and understaffed for the current sprint load.',
        why: 'The quickest way in. No lengthy scoping exercise: we join your sprint cadence and start shipping.',
        stack: ['Your existing stack'],
        timeline: 'Ongoing, sprint cadence',
      },
      {
        id: 'api-integration',
        name: 'API Development & Integration',
        icon: Plug,
        summary: 'REST or GraphQL API design, plus integration with the third-party service your client depends on.',
        bestFor:
          'A client needs payments, CRM or ERP connected, and it sits outside your team’s current focus.',
        why: 'Scoped per integration, against the actual system you need connected, not a generic capability claim.',
        stack: ['FastAPI / Node / Go', 'REST / GraphQL'],
        timeline: '2–5 weeks per integration',
      },
      {
        id: 'codebase-audit',
        name: 'Technical / Codebase Audit',
        icon: SearchCode,
        summary:
          'An outside technical review of an existing codebase and architecture, delivered as a written report with concrete findings.',
        bestFor:
          'You are about to take over, or bid on, a legacy client codebase and want an outside opinion before committing.',
        why: 'Fixed fee, a real deliverable in 1–2 weeks, and no long-term commitment. The easiest way to try working with us.',
        stack: ['Whatever the codebase uses'],
        timeline: '1–2 weeks',
      },
      {
        id: 'qa-automation',
        name: 'QA & Test Automation Setup',
        icon: ShieldCheck,
        summary:
          'An automated test suite (unit, integration or end-to-end) for a codebase that currently ships without one.',
        bestFor:
          'You ship fast with little or no test coverage, and regressions keep slipping into production.',
        why: 'Risk reduction on the delivery you already have. Fewer 2am bug calls, not another feature to manage.',
        stack: ['Playwright', 'Jest / PyTest', 'CI integration'],
        timeline: '2–4 weeks for the first suite',
      },
    ],
  },
  {
    id: 'enterprise',
    index: '03',
    name: 'Enterprise Systems & Legacy Integration',
    short: 'Enterprise Systems',
    blurb:
      'The unglamorous, high-stakes work: extending legacy platforms and moving data between systems without losing a row.',
    icon: Server,
    services: [
      {
        id: 'legacy-integration',
        name: 'Legacy Database / CMS Integration',
        icon: Database,
        summary:
          'Integration work against proprietary or legacy systems, including custom stored procedures and key-generation logic, usually alongside the client’s own DBA team.',
        bestFor:
          'A client runs an old, undocumented internal system (Aderant, SAP or a custom platform) that needs new functionality bolted on.',
        why: 'We work directly with your client’s DBA or technical lead, not around them.',
        stack: ['SQL Server', 'T-SQL', 'Existing stored procedures'],
        timeline: '4–8 weeks, scope-dependent',
      },
      {
        id: 'data-migration',
        name: 'Data Migration & ETL',
        icon: ArrowRightLeft,
        summary: 'Migrating and transforming data between two systems, with validation and reconciliation built in.',
        bestFor:
          'A client consolidating systems after an acquisition, a platform switch, or years of accumulated data debt.',
        why: 'Validation and reconciliation are designed first, so every record is accounted for on both sides.',
        stack: ['Python', 'SQL', 'Source / target system APIs'],
        timeline: '4–10 weeks',
      },
    ],
  },
  {
    id: 'vertical',
    index: '04',
    name: 'Vertical Platform Builds',
    short: 'Vertical Platforms',
    blurb:
      'Domain platforms for legal practices, real estate and regulated labs, built on delivery models we have already proven.',
    icon: Building2,
    services: [
      {
        id: 'legal-case-management',
        name: 'Legal Case Management Platform',
        icon: Scale,
        summary: 'Client intake, document handling and case-status workflow for a legal services practice.',
        bestFor:
          'A legal-tech consultancy, or a law firm’s software vendor, that needs a case management build without hiring full time.',
        why: 'Built on an intake-to-case-status delivery model we have already shipped, not a first attempt at legal software.',
        stack: ['Next.js / React', 'FastAPI / Node', 'PostgreSQL'],
        timeline: '8–12 weeks for an MVP',
      },
      {
        id: 'real-estate-idx',
        name: 'Real Estate Listings Platform (IDX)',
        icon: House,
        summary: 'A branded listings site synced to a live MLS feed, with agent-facing search and lead capture.',
        bestFor:
          'A real estate agency or PropTech consultancy building a client-facing site that needs live MLS data.',
        why: 'We know the actual data feeds, IDX providers like Lofty, not just “we do real estate sites.”',
        stack: ['Next.js / React', 'IDX provider (e.g. Lofty)', 'PostgreSQL'],
        timeline: '6–10 weeks',
      },
      {
        id: 'lims-compliance',
        name: 'LIMS / Compliance Tooling',
        icon: FlaskConical,
        summary:
          'Lab workflow and compliance document handling, including chain-of-custody extraction where it is needed.',
        bestFor:
          'Lab, healthcare or regulated-industry clients who need compliance-grade document handling.',
        why: 'Experience with air-gapped deployments and full audit trails. Careful process first, speed second.',
        stack: ['Python / Node', 'Senaite or similar LIMS', 'OCR pipeline'],
        timeline: '8–14 weeks',
      },
    ],
  },
];

export const serviceCount = pillars.reduce((n, p) => n + p.services.length, 0);
