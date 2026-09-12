import {
  Bot,
  Cpu,
  Database,
  FileCheck2,
  Layout,
  Server,
  UserRound,
  Users,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ── positioning, engagement, process, stack ─────────────────────
   Public copy derived from the internal catalogue's engagement models,
   "how to pitch" sequence, competitor positioning statement and tech
   stack reference. No prices, rates or competitor names by design. */

export interface NumberedPoint {
  n: string;
  title: string;
  body: string;
}

/* The "where we sit" statement, without naming anyone we sit beside. */
export const positioning: readonly NumberedPoint[] = [
  {
    n: '01',
    title: 'AI depth, not AI demos',
    body: 'RAG agents, workflow automation, document pipelines and computer vision, built to run in production for your clients.',
  },
  {
    n: '02',
    title: 'Range beyond AI',
    body: 'Legacy integration, data migration and vertical platform builds: the engineering most AI-only shops cannot take on.',
  },
  {
    n: '03',
    title: 'Boutique, and invisible',
    body: 'A small, personal team that works behind your brand and inside your process, with your name on the work.',
  },
];

export interface EngagementModel {
  name: string;
  icon: LucideIcon;
  body: string;
  fit: string;
}

export const engagementModels: readonly EngagementModel[] = [
  {
    name: 'Dedicated Pod',
    icon: Users,
    body: 'A standing two-to-four person unit (developer, QA and PM as needed) embedded in your workflow, full or part time.',
    fit: 'Ongoing overflow work',
  },
  {
    name: 'Staff Augmentation',
    icon: UserRound,
    body: 'A single engineer placed directly onto one of your active client projects, working in your tools and your process.',
    fit: 'A sprint short one pair of hands',
  },
  {
    name: 'Fixed-Price White-Label',
    icon: FileCheck2,
    body: 'A scoped project delivered end to end under your brand, paid against milestones rather than hours.',
    fit: 'A build with a clear finish line',
  },
];

export interface ProcessStep extends NumberedPoint {
  kicker: string;
}

export const processSteps: readonly ProcessStep[] = [
  {
    n: '01',
    kicker: 'First contact',
    title: 'Tell us what’s short',
    body: 'Start with the gap: a project you can’t staff, or a capability you don’t have in-house. You speak with the people who will deliver it.',
  },
  {
    n: '02',
    kicker: 'Pilot or audit',
    title: 'Start with the smallest useful step',
    body: 'A codebase audit, one automated workflow or a one-week pilot. You get a real deliverable before anything ongoing.',
  },
  {
    n: '03',
    kicker: 'Ongoing engagement',
    title: 'Ship under your brand',
    body: 'We work in your repo, your tools and your process. Your client sees your team, and the work carries your name.',
  },
  {
    n: '04',
    kicker: 'Dedicated pod',
    title: 'Scale once it’s proven',
    body: 'When the first engagement lands, move to ongoing sprints or a dedicated pod that works as an extension of your team.',
  },
];

export interface StackGroup {
  name: string;
  icon: LucideIcon;
  tools: readonly string[];
}

export const stack: readonly StackGroup[] = [
  { name: 'Frontend', icon: Layout, tools: ['Next.js', 'React', 'TypeScript'] },
  { name: 'Backend', icon: Server, tools: ['FastAPI', 'Node.js', 'Go'] },
  { name: 'Data', icon: Database, tools: ['PostgreSQL', 'Supabase', 'pgvector'] },
  {
    name: 'AI / ML',
    icon: Bot,
    tools: ['LangChain', 'LlamaIndex', 'OpenAI API', 'Anthropic API', 'Computer vision'],
  },
  { name: 'Automation', icon: Workflow, tools: ['n8n', 'Twilio', 'Saleshandy'] },
  { name: 'Enterprise', icon: Cpu, tools: ['SQL Server', 'T-SQL', 'Legacy CMS integration'] },
];
