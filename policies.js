// Defines the core taxonomy for the application.
// Every policy ranges from -10 to +10, mapped to a dimension and a sub-category.

const policies = [
    // === ECONOMY DIMENSION ===
    
    // Taxation
    { id: "tax_overall", label: "Economy: Overall Taxation", category: "Taxation", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "tax_prog", label: "Economy: Tax Progressivity", category: "Taxation", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "tax_corp", label: "Economy: Corporate Tax", category: "Taxation", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "tax_capgains", label: "Economy: Capital Gains Tax", category: "Taxation", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "tax_wealth", label: "Economy: Wealth & Estate Tax", category: "Taxation", dimension: "economy", weight: 1.0, defaultValue: 0 },
    
    // Regulation & Markets
    { id: "reg_econ", label: "Economy: Economic Regulation", category: "Regulation & Markets", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "reg_antitrust", label: "Economy: Antitrust", category: "Regulation & Markets", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "reg_privatization", label: "Economy: Privatization", category: "Regulation & Markets", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "reg_industrial", label: "Economy: Industrial Policy", category: "Regulation & Markets", dimension: "economy", weight: 1.0, defaultValue: 0 },
    
    // Labor
    { id: "labor_unions", label: "Economy: Labor Unions", category: "Labor", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "labor_minwage", label: "Economy: Minimum Wage", category: "Labor", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "labor_protections", label: "Economy: Worker Protections", category: "Labor", dimension: "economy", weight: 1.0, defaultValue: 0 },
    
    // Welfare & Social Insurance
    { id: "wel_safety", label: "Economy: Safety Net / Welfare", category: "Welfare & Social Insurance", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "wel_socsec", label: "Economy: Social Security", category: "Welfare & Social Insurance", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "wel_ubi", label: "Economy: Universal Basic Income", category: "Welfare & Social Insurance", dimension: "economy", weight: 1.0, defaultValue: 0 },
    
    // Healthcare
    { id: "hc_universal", label: "Economy: Universal Healthcare", category: "Healthcare", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "hc_private", label: "Economy: Private Healthcare", category: "Healthcare", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "hc_medicare", label: "Economy: Medicare / Medicaid", category: "Healthcare", dimension: "economy", weight: 1.0, defaultValue: 0 },
    
    // Infrastructure, Housing, Transport
    { id: "infra_spend", label: "Economy: Infrastructure Spending", category: "Infrastructure & Transport", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "infra_transit", label: "Economy: Public Transit Subsidies", category: "Infrastructure & Transport", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "house_zoning", label: "Economy: Zoning Regulation", category: "Housing Economics", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "house_rent", label: "Economy: Rent Regulation", category: "Housing Economics", dimension: "economy", weight: 1.0, defaultValue: 0 },

    // Trade
    { id: "trade_free", label: "Economy: Free Trade", category: "Trade & Global Economics", dimension: "economy", weight: 1.0, defaultValue: 0 },
    { id: "trade_tariffs", label: "Economy: Tariffs & Protectionism", category: "Trade & Global Economics", dimension: "economy", weight: 1.0, defaultValue: 0 },

    // === OTHER DIMENSION ===
    
    // Family & Social Values
    { id: "soc_marriage", label: "Other: Marriage & Family Policy", category: "Family & Social Values", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "soc_abortion", label: "Other: Abortion", category: "Family & Social Values", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "soc_lgbt", label: "Other: LGBT Legal Equality", category: "Family & Social Values", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "soc_gender", label: "Other: Gender Identity Policy", category: "Family & Social Values", dimension: "other", weight: 1.0, defaultValue: 0 },
    
    // Religion
    { id: "rel_public", label: "Other: Religion in Public Life", category: "Religion", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "rel_exemptions", label: "Other: Religious Exemptions", category: "Religion", dimension: "other", weight: 1.0, defaultValue: 0 },
    
    // Race & Civil Rights
    { id: "race_affirmative", label: "Other: Affirmative Action", category: "Race & Civil Rights", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "race_colorblind", label: "Other: Equality vs Colorblindness", category: "Race & Civil Rights", dimension: "other", weight: 1.0, defaultValue: 0 },
    
    // Immigration
    { id: "imm_legal", label: "Other: Legal Immigration", category: "Immigration", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "imm_border", label: "Other: Border Enforcement", category: "Immigration", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "imm_path", label: "Other: Path to Citizenship", category: "Immigration", dimension: "other", weight: 1.0, defaultValue: 0 },
    
    // Criminal Justice & Policing
    { id: "crim_sentencing", label: "Other: Criminal Sentencing", category: "Criminal Justice & Policing", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "crim_drugs", label: "Other: Drug Legalization", category: "Criminal Justice & Policing", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "pol_funding", label: "Other: Police Funding & Presence", category: "Criminal Justice & Policing", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "pol_accountability", label: "Other: Police Accountability", category: "Criminal Justice & Policing", dimension: "other", weight: 1.0, defaultValue: 0 },
    
    // Civil Liberties & Guns
    { id: "lib_speech", label: "Other: Freedom of Speech", category: "Civil Liberties", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "lib_surveil", label: "Other: Government Surveillance", category: "Civil Liberties", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "gun_rights", label: "Other: Gun Rights vs Regulation", category: "Civil Liberties", dimension: "other", weight: 1.0, defaultValue: 0 },
    
    // Climate & Environment
    { id: "env_climate", label: "Other: Climate Change Mitigation", category: "Climate & Environment", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "env_reg", label: "Other: Environmental Regulation", category: "Climate & Environment", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "env_fossil", label: "Other: Fossil Fuel Restrictions", category: "Climate & Environment", dimension: "other", weight: 1.0, defaultValue: 0 },
    
    // Democracy & Constitution
    { id: "dem_voting", label: "Other: Voting Access & Registration", category: "Democracy & Constitution", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "dem_finance", label: "Other: Campaign Finance Regulation", category: "Democracy & Constitution", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "const_power", label: "Other: Executive vs Legislative Power", category: "Democracy & Constitution", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "const_originalism", label: "Other: Constitutional Originalism", category: "Democracy & Constitution", dimension: "other", weight: 1.0, defaultValue: 0 },
    
    // Foreign Policy & Nationalism
    { id: "fp_nationalism", label: "Other: Nationalism vs Internationalism", category: "Foreign Policy", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "fp_military", label: "Other: Military Spending & Intervention", category: "Foreign Policy", dimension: "other", weight: 1.0, defaultValue: 0 },
    { id: "fp_alliances", label: "Other: International Alliances", category: "Foreign Policy", dimension: "other", weight: 1.0, defaultValue: 0 }
];