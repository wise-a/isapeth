// Pre-defined illustrative profiles for comparison testing
const presets = [
    {
        name: "Illustrative Centrist Baseline",
        scores: {} // All zeros automatically fallback
    },
    {
        name: "Generic Modern Progressive",
        scores: {
            "tax_overall": -6, "tax_prog": -8, "tax_corp": -7, "labor_unions": -8, "wel_safety": -7, "hc_universal": -9,
            "soc_marriage": -9, "soc_abortion": -9, "soc_lgbt": -10, "imm_path": -8, "env_climate": -9, "fp_nationalism": -7, "gun_rights": -8
        }
    },
    {
        name: "Generic Modern Conservative",
        scores: {
            "tax_overall": 7, "tax_prog": 5, "tax_corp": 8, "reg_econ": 7, "hc_private": 8, "wel_safety": 6,
            "soc_marriage": 7, "soc_abortion": 8, "soc_lgbt": 5, "imm_border": 9, "env_climate": 5, "fp_nationalism": 8, "gun_rights": 9, "const_originalism": 9
        }
    },
    {
        name: "Cross-Pressured Populist (Left-Econ, Right-Social)",
        scores: {
            "tax_corp": -6, "trade_tariffs": 8, "labor_unions": -4, "wel_safety": -2, "hc_universal": -2,
            "imm_border": 8, "fp_nationalism": 9, "soc_marriage": 4, "gun_rights": 7, "env_climate": 5
        }
    },
    {
        name: "Libertarian (Right-Econ, Left-Social)",
        scores: {
            "tax_overall": 9, "reg_econ": 10, "wel_safety": 9, "hc_private": 9, "reg_privatization": 9,
            "soc_marriage": -8, "crim_drugs": -9, "lib_surveil": -9, "imm_legal": -6, "gun_rights": 10, "fp_military": -7
        }
    }
];
