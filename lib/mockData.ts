/**
 * lib/mockData.ts
 *
 * The single typed data source for the Benchmark dashboard prototype.
 * All data is hardcoded per tenant. The owner edits THIS file constantly;
 * everything else renders from it.
 *
 * CONSISTENCY MODEL (must hold per tenant):
 * - Pick a monthly revenue anchor R_month.
 * - staff[].revenueProduced SUMS to ~R_month (all revenue is provider-attributed).
 * - equipment[].revenueGenerated SUMS to ~50-65% of R_month (device-assisted subset
 *   of the SAME revenue; NOT additive with staff totals).
 * - kpis.mtdRevenue ~0.72-0.78 x R_month (about 3 weeks in).
 * - kpis.weekRevenue ~R_month / 4.33; revenueByWeek[11] === weekRevenue;
 *   revenueByWeek[10] === round(weekRevenue / (1 + delta/100)).
 * - newPatients.thisMonth === newPatients.newPatients.
 * - Every tenant: at least one equipment row with netContribution < 0 (underwater).
 * - Every tenant: at least one staff row with flagged: true (low productivity).
 *
 * HOUSE RULE: no em dashes anywhere. Use colons, periods, or "to" for ranges.
 */

// ---------------------------------------------------------------------------
// Type definitions
// ---------------------------------------------------------------------------

export interface WeekPoint {
  week: string;   // "W1" .. "W12"
  revenue: number;
}

export interface NewPatientWeek {
  week: string;   // "W1" .. "W12"
  count: number;
}

export interface Kpis {
  weekRevenue: number;
  weekRevenueDeltaPct: number;   // vs last week; signed, one decimal (e.g. 6.2, -2.8)
  mtdRevenue: number;
  activePatients: number;
  dataCurrentThrough: string;    // ISO date "2026-06-26"
}

export interface NewPatientsSummary {
  thisMonth: number;
  newPatients: number;           // this month count (=== thisMonth)
  returningPatients: number;     // this month
}

export interface EquipmentRow {
  name: string;
  monthlyPayment: number;        // lease payment per month
  payoffBalance: number;         // remaining balance
  utilizationPct: number;        // 0 to 100
  revenueGenerated: number;      // monthly revenue attributed to this machine
  netContribution: number;       // AUTHORED: revenueGenerated - monthlyPayment - operating costs. Can be negative.
}

export interface StaffRow {
  name: string;
  role: string;
  revenueProduced: number;       // monthly
  baseComp: number;              // monthly
  incentive: number;             // monthly (totalComp & productivity computed in component)
  flagged?: boolean;             // comp high relative to revenue
}

export type RecommendationCategory = "Equipment" | "Staff" | "Retention" | "Revenue" | "Marketing";

export interface Recommendation {
  id: string;
  title: string;                 // short heading
  detail: string;                // one sentence, no em dashes
  category: RecommendationCategory;
}

export interface TenantData {
  id: string;
  name: string;
  kpis: Kpis;
  revenueByWeek: WeekPoint[];         // 12 entries W1..W12
  newPatients: NewPatientsSummary;
  newPatientsByWeek: NewPatientWeek[]; // 12 entries
  equipment: EquipmentRow[];           // 5 to 6 rows
  staff: StaffRow[];                   // 4 to 5 rows
  recommendations: Recommendation[];   // 4 to 5
}

export interface TenantMeta {
  id: string;
  name: string;
}

// ---------------------------------------------------------------------------
// User roles & access control
// ---------------------------------------------------------------------------

export type UserRole = "staff" | "owner" | "admin";

export interface AppUser {
  id: string;
  name: string;
  initials: string;
  role: UserRole;
  tenantId: string | null;  // null = admin (can view all tenants)
}

/** Which tabs each role can access. Staff cannot see Staff & Comp. */
export const tabAccess: Record<UserRole, readonly string[]> = {
  staff: ["overview", "new-patients", "equipment", "recommendations"],
  owner: ["overview", "new-patients", "equipment", "staff", "recommendations"],
  admin: ["overview", "new-patients", "equipment", "staff", "recommendations"],
};

export const users: AppUser[] = [
  // Admins (Benchmark internal, can browse any tenant)
  { id: "alex",    name: "Alex Rivera",     initials: "AR", role: "admin", tenantId: null },
  // Lumière Aesthetics
  { id: "casey",   name: "Casey Morgan",    initials: "CM", role: "owner", tenantId: "lumiere" },
  { id: "jamie",   name: "Jamie Chen",      initials: "JC", role: "staff", tenantId: "lumiere" },
  // Glow Medical Spa
  { id: "nina",    name: "Nina Patel",      initials: "NP", role: "owner", tenantId: "glow" },
  { id: "derek",   name: "Derek Simmons",   initials: "DS", role: "staff", tenantId: "glow" },
  // Radiance MedSpa
  { id: "laura",   name: "Laura Kim",       initials: "LK", role: "owner", tenantId: "radiance" },
  { id: "marcus",  name: "Marcus Webb",     initials: "MW", role: "staff", tenantId: "radiance" },
];

// ---------------------------------------------------------------------------
// Tenant list (drives the switcher)
// ---------------------------------------------------------------------------

export const tenants: TenantMeta[] = [
  { id: "lumiere",  name: "Lumière Aesthetics" },
  { id: "glow",     name: "Glow Medical Spa" },
  { id: "radiance", name: "Radiance MedSpa" },
];

// ---------------------------------------------------------------------------
// Mock data keyed by tenant id
// ---------------------------------------------------------------------------

export const mockData: Record<string, TenantData> = {

  // =========================================================================
  // TENANT 1: Lumière Aesthetics (flagship, densest data)
  // R_month ~ $418,000
  // =========================================================================
  lumiere: {
    id: "lumiere",
    name: "Lumière Aesthetics",

    kpis: {
      weekRevenue: 98400,            // ~R_month / 4.33
      weekRevenueDeltaPct: 6.2,      // +6.2% vs last week
      mtdRevenue: 312500,            // ~0.75 x R_month (3 weeks in)
      activePatients: 2140,
      dataCurrentThrough: "2026-06-26",
    },

    // 12 weeks of revenue, ramping ~80k to 98.4k
    // W12 = weekRevenue (98400); W11 = round(98400 / 1.062) = 92655
    revenueByWeek: [
      { week: "W1",  revenue: 80200 },
      { week: "W2",  revenue: 81400 },
      { week: "W3",  revenue: 83100 },
      { week: "W4",  revenue: 82600 },
      { week: "W5",  revenue: 85500 },
      { week: "W6",  revenue: 87200 },
      { week: "W7",  revenue: 86800 },
      { week: "W8",  revenue: 89400 },
      { week: "W9",  revenue: 90100 },
      { week: "W10", revenue: 91800 },
      { week: "W11", revenue: 92655 },  // weekRevenue / (1 + 0.062)
      { week: "W12", revenue: 98400 },  // === kpis.weekRevenue
    ],

    newPatients: {
      thisMonth: 96,
      newPatients: 96,                // === thisMonth
      returningPatients: 412,
    },

    // 12 weeks of new-patient counts; last 4 weeks sum ~96
    newPatientsByWeek: [
      { week: "W1",  count: 18 },
      { week: "W2",  count: 20 },
      { week: "W3",  count: 19 },
      { week: "W4",  count: 21 },
      { week: "W5",  count: 22 },
      { week: "W6",  count: 20 },
      { week: "W7",  count: 23 },
      { week: "W8",  count: 24 },
      { week: "W9",  count: 22 },
      { week: "W10", count: 25 },  // last 4 weeks: 25+24+23+24 = 96
      { week: "W11", count: 24 },
      { week: "W12", count: 23 },
    ],

    // 6 machines; sum revenueGenerated = 217,000 (~52% of R_month)
    // At least one underwater (CoolSculpting, net -9300)
    equipment: [
      { name: "Morpheus8",               monthlyPayment: 4200, payoffBalance: 78000,  utilizationPct: 74, revenueGenerated: 62000,  netContribution: 41500  },
      { name: "Hydrafacial",             monthlyPayment: 1150, payoffBalance: 9500,   utilizationPct: 88, revenueGenerated: 48000,  netContribution: 38200  },
      { name: "IPL Laser",               monthlyPayment: 2600, payoffBalance: 41000,  utilizationPct: 31, revenueGenerated: 18500,  netContribution: 6400   },
      { name: "CoolSculpting",           monthlyPayment: 6800, payoffBalance: 132000, utilizationPct: 28, revenueGenerated: 21000,  netContribution: -9300  }, // underwater
      { name: "Diode Laser Hair Removal",monthlyPayment: 1900, payoffBalance: 22000,  utilizationPct: 66, revenueGenerated: 39000,  netContribution: 24800  },
      { name: "Microneedling RF",        monthlyPayment: 1400, payoffBalance: 14500,  utilizationPct: 58, revenueGenerated: 28500,  netContribution: 19100  },
    ],

    // 5 staff; sum revenueProduced = 418,000 = R_month
    // Priya Nair flagged (productivity ~2.0x vs team median ~4.5x)
    staff: [
      { name: "Dr. Elena Vasquez",  role: "Medical Director",  revenueProduced: 142000, baseComp: 22000, incentive: 14200 },
      { name: "Marcus Reed, PA-C",  role: "Injector",          revenueProduced: 98500,  baseComp: 12000, incentive: 9800  },
      { name: "Sophie Tran, RN",    role: "Aesthetic Nurse",   revenueProduced: 74000,  baseComp: 9500,  incentive: 5200  },
      { name: "Dana Whitfield",     role: "Laser Technician",  revenueProduced: 58000,  baseComp: 7800,  incentive: 3100  },
      { name: "Priya Nair, RN",     role: "Aesthetic Nurse",   revenueProduced: 45500,  baseComp: 16500, incentive: 6000, flagged: true },
    ],

    // 5 recommendations; no em dashes
    recommendations: [
      { id: "l1", title: "CoolSculpting is underwater",       detail: "28% utilization and a negative net contribution of -$9,300 this month. Run a seasonal body-contouring promotion or restructure the lease.", category: "Equipment" },
      { id: "l2", title: "IPL Laser underutilized",           detail: "31% utilization this month. Bundle photofacials into existing facial visits to lift device ROI.", category: "Equipment" },
      { id: "l3", title: "Provider comp out of line",         detail: "Priya Nair's productivity ratio is 2.0x versus the 4.5x team median. Review the incentive structure.", category: "Staff" },
      { id: "l4", title: "47 lapsed patients eligible for reactivation", detail: "Last visit was 90+ days ago. Launch a win-back message this week.", category: "Retention" },
      { id: "l5", title: "Revenue up 6.2% week over week",   detail: "Morpheus8 demand is driving the lift. Consider adding a second treatment block.", category: "Revenue" },
    ],
  },

  // =========================================================================
  // TENANT 2: Glow Medical Spa
  // R_month ~ $268,000
  // =========================================================================
  glow: {
    id: "glow",
    name: "Glow Medical Spa",

    kpis: {
      weekRevenue: 61500,            // ~268000 / 4.33
      weekRevenueDeltaPct: -2.8,     // negative delta
      mtdRevenue: 198000,            // ~0.74 x R_month
      activePatients: 1460,
      dataCurrentThrough: "2026-06-26",
    },

    // W12 = 61500; W11 = round(61500 / (1 - 0.028)) = round(61500 / 0.972) = 63272
    revenueByWeek: [
      { week: "W1",  revenue: 56200 },
      { week: "W2",  revenue: 57800 },
      { week: "W3",  revenue: 58400 },
      { week: "W4",  revenue: 57100 },
      { week: "W5",  revenue: 59300 },
      { week: "W6",  revenue: 60800 },
      { week: "W7",  revenue: 61200 },
      { week: "W8",  revenue: 62400 },
      { week: "W9",  revenue: 63100 },
      { week: "W10", revenue: 64200 },
      { week: "W11", revenue: 63272 },  // weekRevenue / (1 + (-0.028))
      { week: "W12", revenue: 61500 },  // === kpis.weekRevenue
    ],

    newPatients: {
      thisMonth: 64,
      newPatients: 64,
      returningPatients: 286,
    },

    newPatientsByWeek: [
      { week: "W1",  count: 12 },
      { week: "W2",  count: 14 },
      { week: "W3",  count: 13 },
      { week: "W4",  count: 15 },
      { week: "W5",  count: 14 },
      { week: "W6",  count: 16 },
      { week: "W7",  count: 15 },
      { week: "W8",  count: 17 },
      { week: "W9",  count: 16 },
      { week: "W10", count: 16 },  // last 4: 16+16+15+17 = 64
      { week: "W11", count: 16 },
      { week: "W12", count: 15 },
    ],

    // 5 machines; sum revenueGenerated = 152,000 (~57% of R_month)
    // CoolSculpting underwater (net -6200)
    equipment: [
      { name: "Morpheus8",               monthlyPayment: 4200, payoffBalance: 82000,  utilizationPct: 68, revenueGenerated: 44000,  netContribution: 28200  },
      { name: "Hydrafacial",             monthlyPayment: 1150, payoffBalance: 7200,   utilizationPct: 82, revenueGenerated: 34000,  netContribution: 26400  },
      { name: "IPL Laser",               monthlyPayment: 2600, payoffBalance: 38000,  utilizationPct: 42, revenueGenerated: 22000,  netContribution: 11800  },
      { name: "CoolSculpting",           monthlyPayment: 6800, payoffBalance: 128000, utilizationPct: 24, revenueGenerated: 16000,  netContribution: -6200  }, // underwater
      { name: "Diode Laser Hair Removal",monthlyPayment: 1900, payoffBalance: 18000,  utilizationPct: 72, revenueGenerated: 36000,  netContribution: 22800  },
    ],

    // 4 staff; sum revenueProduced = 268,000 = R_month
    // Brooke Adler flagged
    staff: [
      { name: "Dr. Anita Rao",       role: "Medical Director",  revenueProduced: 105000, baseComp: 20000, incentive: 10500 },
      { name: "Jordan Lee, NP",      role: "Injector",          revenueProduced: 82000,  baseComp: 11000, incentive: 7200  },
      { name: "Mia Castellano, RN",  role: "Aesthetic Nurse",   revenueProduced: 51000,  baseComp: 8500,  incentive: 3800  },
      { name: "Brooke Adler",        role: "Laser Technician",  revenueProduced: 30000,  baseComp: 14000, incentive: 4500, flagged: true },
    ],

    recommendations: [
      { id: "g1", title: "CoolSculpting is underwater",       detail: "24% utilization and a negative net contribution of -$6,200 this month. Consider a summer promo or renegotiate the lease terms.", category: "Equipment" },
      { id: "g2", title: "Provider comp out of line",         detail: "Brooke Adler's productivity ratio is 1.6x versus the 4.0x team median. Review the incentive structure.", category: "Staff" },
      { id: "g3", title: "32 lapsed patients eligible for reactivation", detail: "Last visit was 90+ days ago. A targeted reactivation campaign could recover $18k to $25k in monthly revenue.", category: "Retention" },
      { id: "g4", title: "Revenue down 2.8% week over week",  detail: "Injectables volume dipped this week. Check whether the Q3 promotion calendar is active.", category: "Revenue" },
    ],
  },

  // =========================================================================
  // TENANT 3: Radiance MedSpa
  // R_month ~ $172,000
  // =========================================================================
  radiance: {
    id: "radiance",
    name: "Radiance MedSpa",

    kpis: {
      weekRevenue: 39800,            // ~172000 / 4.33
      weekRevenueDeltaPct: 9.1,      // strong positive
      mtdRevenue: 128000,            // ~0.74 x R_month
      activePatients: 980,
      dataCurrentThrough: "2026-06-26",
    },

    // W12 = 39800; W11 = round(39800 / 1.091) = 36480
    revenueByWeek: [
      { week: "W1",  revenue: 33200 },
      { week: "W2",  revenue: 33800 },
      { week: "W3",  revenue: 34500 },
      { week: "W4",  revenue: 34100 },
      { week: "W5",  revenue: 35200 },
      { week: "W6",  revenue: 35800 },
      { week: "W7",  revenue: 36200 },
      { week: "W8",  revenue: 36800 },
      { week: "W9",  revenue: 37400 },
      { week: "W10", revenue: 37100 },
      { week: "W11", revenue: 36480 },  // weekRevenue / (1 + 0.091)
      { week: "W12", revenue: 39800 },  // === kpis.weekRevenue
    ],

    newPatients: {
      thisMonth: 47,
      newPatients: 47,
      returningPatients: 198,
    },

    newPatientsByWeek: [
      { week: "W1",  count: 8  },
      { week: "W2",  count: 9  },
      { week: "W3",  count: 10 },
      { week: "W4",  count: 9  },
      { week: "W5",  count: 11 },
      { week: "W6",  count: 10 },
      { week: "W7",  count: 12 },
      { week: "W8",  count: 11 },
      { week: "W9",  count: 12 },
      { week: "W10", count: 12 },  // last 4: 12+12+11+12 = 47
      { week: "W11", count: 12 },
      { week: "W12", count: 11 },
    ],

    // 5 machines; sum revenueGenerated = 97,500 (~57% of R_month)
    // IPL Laser underwater (net -3800)
    equipment: [
      { name: "Morpheus8",               monthlyPayment: 4200, payoffBalance: 90000,  utilizationPct: 62, revenueGenerated: 32000,  netContribution: 18200  },
      { name: "Hydrafacial",             monthlyPayment: 1150, payoffBalance: 11000,  utilizationPct: 78, revenueGenerated: 24000,  netContribution: 18400  },
      { name: "IPL Laser",               monthlyPayment: 3200, payoffBalance: 52000,  utilizationPct: 22, revenueGenerated: 8500,   netContribution: -3800  }, // underwater
      { name: "CoolSculpting",           monthlyPayment: 4800, payoffBalance: 105000, utilizationPct: 36, revenueGenerated: 14000,  netContribution: 2400   },
      { name: "Diode Laser Hair Removal",monthlyPayment: 1900, payoffBalance: 19000,  utilizationPct: 70, revenueGenerated: 19000,  netContribution: 11200  },
    ],

    // 4 staff; sum revenueProduced = 172,000 = R_month
    // Renata Diaz flagged
    staff: [
      { name: "Dr. Sofia Marin",     role: "Medical Director",  revenueProduced: 72000,  baseComp: 18000, incentive: 7200  },
      { name: "Tyler Brooks, PA-C",  role: "Injector",          revenueProduced: 52000,  baseComp: 10000, incentive: 5000  },
      { name: "Hannah Cole, RN",     role: "Aesthetic Nurse",   revenueProduced: 30000,  baseComp: 8000,  incentive: 2200  },
      { name: "Renata Diaz",         role: "Esthetician",       revenueProduced: 18000,  baseComp: 12000, incentive: 3800, flagged: true },
    ],

    recommendations: [
      { id: "r1", title: "IPL Laser is underwater",            detail: "22% utilization and a negative net contribution of -$3,800 this month. Bundle IPL into skincare packages or reduce scheduled blocks.", category: "Equipment" },
      { id: "r2", title: "Provider comp out of line",          detail: "Renata Diaz's productivity ratio is 1.1x versus the 3.2x team median. Reassess scheduling or shift incentive mix.", category: "Staff" },
      { id: "r3", title: "Revenue up 9.1% week over week",    detail: "Summer demand is picking up. Lock in recurring appointments before the seasonal peak fades.", category: "Revenue" },
      { id: "r4", title: "21 lapsed patients eligible for reactivation", detail: "Last visit was 90+ days ago. A small win-back offer could re-engage this group quickly.", category: "Retention" },
    ],
  },
};

export type TenantId = keyof typeof mockData;
