"""Fish disease reference content, English and Bangla.

The Bangla text here is the vet-reviewed wording that previously lived in the
frontend (src/i18n/fish.ts); it is reproduced verbatim so nothing regresses when
the database became the single source of truth for disease content.
"""

FISH_DISEASES = [
    {
        "code": "bacterial_red_disease",
        "species": "FISH",
        "short_name": {
            "en": "Bacterial Red Disease",
            "bn": "ব্যাকটেরিয়াজনিত লাল রোগ",
        },
        "name": {
            "en": "Bacterial Red Disease (Hemorrhagic Septicemia)",
            "bn": "ব্যাকটেরিয়াজনিত লাল রোগ (হেমোরেজিক সেপ্টিসেমিয়া)",
        },
        "diagnosis": {
            "en": "Visual signs of haemorrhage on skin and fins, confirmed by isolating the bacteria (Aeromonas / Pseudomonas) from kidney or blood in a fisheries laboratory",
            "bn": "চামড়া ও পাখনায় রক্তক্ষরণের লক্ষণ দেখে, এবং মৎস্য ল্যাবে কিডনি বা রক্ত থেকে ব্যাকটেরিয়া (অ্যারোমোনাস / সিউডোমোনাস) শনাক্ত করে নিশ্চিত করা হয়",
        },
        "contagious": True,
        "severity": "HIGH",
        "notifiable": False,
        "zoonotic": False,
        "symptoms": [
            {
                "en": "2–5 small reddish spots/patches limited to specific areas of the body (each less than 1 cm across)",
                "bn": "শরীরে ২-৫টি ছোট, নির্দিষ্ট স্থানে সীমাবদ্ধ লালচে দাগ/ছোপ (প্রতিটির ব্যাস ১ সেমি-র কম)",
            },
            {
                "en": "Reddish marks at the base of the fins (fin edges still intact)",
                "bn": "পাখনার গোড়ায় লালচে দাগ দেখা যাচ্ছে (তবে কিনারা এখনও অক্ষত)",
            },
            {
                "en": "Little change in behaviour at first, but fish gradually become lethargic",
                "bn": "প্রথম দিকে আচরণে তেমন পরিবর্তন নেই, তবে ধীরে ধীরে নিস্তেজ হচ্ছে",
            },
        ],
        "treatment": {
            "code": "TRT-FISH-RED-DISEASE",
            "name": {
                "en": "Bacterial Red Disease (Hemorrhagic Septicemia) Protocol",
                "bn": "ব্যাকটেরিয়াজনিত লাল রোগ (হেমোরেজিক সেপ্টিসেমিয়া) চিকিৎসা নির্দেশিকা",
            },
            "medication": {
                "en": "Oxytetracycline (In Feed) + Potassium Permanganate Pond Disinfection",
                "bn": "অক্সিটেট্রাসাইক্লিন (খাবারের সাথে) + পটাসিয়াম পারম্যাঙ্গানেট দিয়ে পুকুর জীবাণুমুক্তকরণ",
            },
            "method": "FEED",
            "dosage": {
                "en": "Oxytetracycline medicated feed @ 50–75 mg/kg body weight daily for 7–10 days. Pond Disinfection: Apply Potassium Permanganate at 2.0–2.5 mg/L (approx. 200–250g per decimal-foot).",
                "bn": "অক্সিটেট্রাসাইক্লিন মিশ্রিত খাবার: প্রতি কেজি দেহ-ওজনে দৈনিক ৫০–৭৫ মি.গ্রা. হারে ৭–১০ দিন। পুকুর জীবাণুমুক্তকরণ: পটাসিয়াম পারম্যাঙ্গানেট প্রতি লিটারে ২.০–২.৫ মি.গ্রা. হারে প্রয়োগ করুন (প্রতি ডেসিমেল-ফুটে প্রায় ২০০–২৫০ গ্রাম)।",
            },
            "duration_days": 10,
            "precaution": {
                "en": "Stop feeding unmedicated commercial feed. Increase aeration immediately. Do not discharge pond water into natural drainage during treatment.",
                "bn": "ওষুধবিহীন বাণিজ্যিক খাবার দেওয়া বন্ধ করুন। অবিলম্বে বায়ু সঞ্চালন (এয়ারেশন) বাড়ান। চিকিৎসা চলাকালে পুকুরের পানি প্রাকৃতিক নালা বা জলাশয়ে ছাড়বেন না।",
            },
            "alternatives": {
                "en": "Florfenicol medicated feed (10 mg/kg body weight/day for 10 days) under veterinary advice. Apply quicklime (1–2 kg/decimal) to improve water quality.",
                "bn": "ভেটেরিনারি পরামর্শ অনুযায়ী ফ্লোরফেনিকল মিশ্রিত খাবার (প্রতি কেজি দেহ-ওজনে দৈনিক ১০ মি.গ্রা., ১০ দিন)। পানির গুণমান উন্নত করতে চুন (কুইকলাইম) প্রতি ডেসিমেলে ১–২ কেজি হারে প্রয়োগ করুন।",
            },
            "summary": {
                "en": "Oxytetracycline medicated feed, potassium permanganate pond disinfection and improved water quality",
                "bn": "অক্সিটেট্রাসাইক্লিন মিশ্রিত খাবার, পটাসিয়াম পারম্যাঙ্গানেট দিয়ে পুকুর জীবাণুমুক্তকরণ এবং পানির গুণমান উন্নতকরণ",
            },
            "medication_summary": {
                "en": "Oxytetracycline 50–75 mg/kg body weight/day in feed for 7–10 days",
                "bn": "অক্সিটেট্রাসাইক্লিন প্রতি কেজি দেহ-ওজনে দৈনিক ৫০–৭৫ মি.গ্রা. খাবারের সাথে ৭–১০ দিন",
            },
            "precautions": {
                "en": [
                    "Increase aeration immediately",
                    "Stop feeding unmedicated commercial feed",
                    "Remove dead and weak fish every day",
                    "Do not discharge pond water into natural drainage during treatment",
                    "Apply quicklime (1–2 kg/decimal) to improve water quality",
                ],
                "bn": [
                    "অবিলম্বে বায়ু সঞ্চালন বাড়ান",
                    "ওষুধবিহীন বাণিজ্যিক খাবার দেওয়া বন্ধ করুন",
                    "প্রতিদিন মরা ও দুর্বল মাছ সরিয়ে ফেলুন",
                    "চিকিৎসা চলাকালে পুকুরের পানি প্রাকৃতিক নালায় ছাড়বেন না",
                    "পানির গুণমান উন্নত করতে চুন (কুইকলাইম) প্রতি ডেসিমেলে ১–২ কেজি হারে দিন",
                ],
            },
            "effectiveness": {
                "en": "Good when treated early; recovery depends on water quality and prompt medicated feeding",
                "bn": "দ্রুত চিকিৎসা শুরু করলে ভালো ফল পাওয়া যায়; সেরে ওঠা পানির গুণমান ও সময়মতো ওষুধ মিশ্রিত খাবারের ওপর নির্ভর করে",
            },
            "requires_veterinarian": False,
            "reference": "FAO Fisheries Technical Paper: Disease Management in Asian Aquaculture / DoF Bangladesh Guidelines.",
        },
    },
    {
        "code": "bacterial_diseases_aeromoniasis",
        "species": "FISH",
        "short_name": {"en": "Aeromoniasis", "bn": "অ্যারোমোনিয়াসিস"},
        "name": {
            "en": "Bacterial Disease – Aeromoniasis (Motile Aeromonas Septicemia)",
            "bn": "ব্যাকটেরিয়াজনিত রোগ – অ্যারোমোনিয়াসিস (মোটাইল অ্যারোমোনাস সেপ্টিসেমিয়া)",
        },
        "diagnosis": {
            "en": "Clinical signs of ulcers and haemorrhage, confirmed by isolating Aeromonas hydrophila from lesions or internal organs",
            "bn": "ঘা ও রক্তক্ষরণের লক্ষণ দেখে, এবং ক্ষতস্থান বা অভ্যন্তরীণ অঙ্গ থেকে অ্যারোমোনাস হাইড্রোফিলা ব্যাকটেরিয়া শনাক্ত করে নিশ্চিত করা হয়",
        },
        "contagious": True,
        "severity": "HIGH",
        "notifiable": False,
        "zoonotic": False,
        "symptoms": [
            {
                "en": "Widespread bleeding or deep ulcers/sores over the whole body",
                "bn": "সারা শরীরে ব্যাপক রক্তক্ষরণ বা গভীর আলসার/ক্ষত",
            },
            {"en": "Swollen belly", "bn": "পেট ফুলে গেছে"},
            {"en": "Swollen eyes", "bn": "চোখ ফুলে গেছে"},
            {
                "en": "Sudden deaths without any warning signs",
                "bn": "হঠাৎ মৃত্যু হচ্ছে, কোনো পূর্বলক্ষণ ছাড়াই",
            },
            {"en": "Scales coming off", "bn": "আঁইশ উঠে যাচ্ছে"},
            {
                "en": "Fin edges turning pale and tearing",
                "bn": "পাখনার কিনারা ফ্যাকাশে হয়ে ছিঁড়ে যাচ্ছে",
            },
            {"en": "Heavy bleeding on the fins", "bn": "পাখনায় ব্যাপক রক্তক্ষরণ"},
            {
                "en": "Pale gills (as if anaemic)",
                "bn": "ফুলকা ফ্যাকাশে হয়ে গেছে (রক্তশূন্যের মতো)",
            },
            {
                "en": "Lethargic, swimming slowly at the water surface and losing balance",
                "bn": "নিস্তেজ, পানির উপরিভাগে ধীরে ধীরে সাঁতার কাটছে ও ভারসাম্য হারাচ্ছে",
            },
            {
                "en": "Fish stop eating completely",
                "bn": "খাওয়া পুরোপুরি বন্ধ হয়ে গেছে",
            },
        ],
        "treatment": {
            "code": "TRT-FISH-AEROMONIASIS",
            "name": {
                "en": "Aeromoniasis Treatment Protocol",
                "bn": "অ্যারোমোনিয়াসিস চিকিৎসা নির্দেশিকা",
            },
            "medication": {
                "en": "Oxytetracycline or Florfenicol Medicated Feed",
                "bn": "অক্সিটেট্রাসাইক্লিন অথবা ফ্লোরফেনিকল মিশ্রিত খাবার",
            },
            "method": "FEED",
            "dosage": {
                "en": "Oxytetracycline: 50–75 mg/kg body weight/day mixed in feed for 7–10 consecutive days. Spot treatment: Potassium Permanganate dip (10 ppm for 5–10 minutes) for severe ulcers.",
                "bn": "অক্সিটেট্রাসাইক্লিন: প্রতি কেজি দেহ-ওজনে দৈনিক ৫০–৭৫ মি.গ্রা. খাবারের সাথে মিশিয়ে একটানা ৭–১০ দিন। নির্দিষ্ট স্থানে চিকিৎসা: গুরুতর ঘায়ের জন্য পটাসিয়াম পারম্যাঙ্গানেট দ্রবণে (১০ পিপিএম) ৫–১০ মিনিট ডুবিয়ে রাখুন।",
            },
            "duration_days": 10,
            "precaution": {
                "en": "Improve water quality immediately by reducing stocking density or exchanging 20–30% water. Observe strict withdrawal periods before harvesting.",
                "bn": "মজুদ ঘনত্ব কমিয়ে অথবা ২০–৩০% পানি বদলে অবিলম্বে পানির গুণমান উন্নত করুন। আহরণের আগে প্রত্যাহারকাল (উইথড্রয়াল পিরিয়ড) কঠোরভাবে মেনে চলুন।",
            },
            "alternatives": {
                "en": "Florfenicol @ 10 mg/kg fish body weight for 10 days in feed. Liming the pond with Quicklime (1 kg/decimal).",
                "bn": "ফ্লোরফেনিকল: প্রতি কেজি মাছের দেহ-ওজনে ১০ মি.গ্রা. হারে খাবারের সাথে ১০ দিন। পুকুরে চুন (কুইকলাইম) প্রয়োগ (প্রতি ডেসিমেলে ১ কেজি)।",
            },
            "summary": {
                "en": "Oxytetracycline or florfenicol medicated feed, potassium permanganate dip for severe ulcers, and water quality correction",
                "bn": "অক্সিটেট্রাসাইক্লিন বা ফ্লোরফেনিকল মিশ্রিত খাবার, গুরুতর ঘায়ে পটাসিয়াম পারম্যাঙ্গানেট ডিপ এবং পানির গুণমান ঠিক করা",
            },
            "medication_summary": {
                "en": "Oxytetracycline 50–75 mg/kg body weight/day in feed for 7–10 days",
                "bn": "অক্সিটেট্রাসাইক্লিন প্রতি কেজি দেহ-ওজনে দৈনিক ৫০–৭৫ মি.গ্রা. খাবারের সাথে ৭–১০ দিন",
            },
            "precautions": {
                "en": [
                    "Reduce stocking density",
                    "Exchange 20–30% of the pond water",
                    "Handle fish gently to avoid wounds",
                    "Observe withdrawal periods before harvesting",
                    "Lime the pond with quicklime (1 kg/decimal)",
                ],
                "bn": [
                    "মজুদ ঘনত্ব কমান",
                    "পুকুরের ২০–৩০% পানি বদলান",
                    "আঘাত এড়াতে মাছ সাবধানে নাড়াচাড়া করুন",
                    "আহরণের আগে প্রত্যাহারকাল (উইথড্রয়াল পিরিয়ড) মেনে চলুন",
                    "পুকুরে চুন (কুইকলাইম) দিন (প্রতি ডেসিমেলে ১ কেজি)",
                ],
            },
            "effectiveness": {
                "en": "Good with early medicated feeding and better water quality; stressed ponds may relapse",
                "bn": "দ্রুত ওষুধ মিশ্রিত খাবার ও পানির গুণমান উন্নত করলে ভালো ফল পাওয়া যায়; চাপযুক্ত পুকুরে রোগ আবার ফিরে আসতে পারে",
            },
            "requires_veterinarian": False,
            "reference": "MSD Veterinary Manual: Bacterial Diseases in Aquaculture / Egyptian Journal of Aquatic Biology & Fisheries (2023).",
        },
    },
    {
        "code": "bacterial_gill_disease",
        "species": "FISH",
        "short_name": {
            "en": "Bacterial Gill Disease",
            "bn": "ব্যাকটেরিয়াজনিত ফুলকা রোগ",
        },
        "name": {
            "en": "Bacterial Gill Disease",
            "bn": "ব্যাকটেরিয়াজনিত ফুলকা রোগ",
        },
        "diagnosis": {
            "en": "Microscopic gill examination showing bacterial mats on the gill filaments; usually linked to poor water quality and high organic load",
            "bn": "অণুবীক্ষণ যন্ত্রে ফুলকা পরীক্ষা করলে ফুলকার সুতায় ব্যাকটেরিয়ার আস্তরণ দেখা যায়; সাধারণত খারাপ পানি ও অতিরিক্ত জৈব বর্জ্যের সাথে সম্পর্কিত",
        },
        "contagious": True,
        "severity": "HIGH",
        "notifiable": False,
        "zoonotic": False,
        "symptoms": [
            {
                "en": "Swollen gills that are reddish or bleeding",
                "bn": "ফুলকা ফোলা এবং লালচে/রক্তক্ষরণযুক্ত",
            },
            {
                "en": "Sudden, widespread deaths among the fish (across a large part of the pond)",
                "bn": "অল্প কিছু মাছে হঠাৎ ব্যাপক হারে (পুকুরের বড় অংশ জুড়ে) মৃত্যু হচ্ছে",
            },
            {
                "en": "Gill filaments stuck together",
                "bn": "ফুলকার পাতাগুলো একসাথে জোড়া লেগে গেছে",
            },
            {
                "en": "Gill cover (operculum) staying open",
                "bn": "অপারকুলাম (গিল ঢাকনা) ফাঁক হয়ে খোলা থাকছে",
            },
            {
                "en": "Fish facing into the water current or crowding at the water surface",
                "bn": "পানির স্রোতের দিকে মুখ করে থাকছে বা পানির উপরিভাগে ভিড় করছে",
            },
        ],
        "treatment": {
            "code": "TRT-FISH-GILL-DISEASE",
            "name": {
                "en": "Bacterial Gill Disease Protocol",
                "bn": "ব্যাকটেরিয়াজনিত ফুলকা রোগ চিকিৎসা নির্দেশিকা",
            },
            "medication": {
                "en": "Potassium Permanganate Bath or Oxytetracycline Feed Treatment",
                "bn": "পটাসিয়াম পারম্যাঙ্গানেট বাথ অথবা অক্সিটেট্রাসাইক্লিন মিশ্রিত খাবার",
            },
            "method": "BATH",
            "dosage": {
                "en": "Pond Water Disinfection: Potassium Permanganate @ 2.0–2.5 mg/L or Salt (NaCl) @ 1–2% dip for 10 minutes. In-feed Oxytetracycline @ 50 mg/kg fish body weight/day for 7 days if infection is systemic.",
                "bn": "পুকুরের পানি জীবাণুমুক্তকরণ: পটাসিয়াম পারম্যাঙ্গানেট প্রতি লিটারে ২.০–২.৫ মি.গ্রা. অথবা ১–২% লবণ (NaCl) দ্রবণে ১০ মিনিট ডুবিয়ে রাখুন। সংক্রমণ সারা শরীরে ছড়িয়ে পড়লে খাবারের সাথে অক্সিটেট্রাসাইক্লিন প্রতি কেজি মাছের দেহ-ওজনে দৈনিক ৫০ মি.গ্রা. হারে ৭ দিন।",
            },
            "duration_days": 7,
            "precaution": {
                "en": "Aerate pond heavily during bath treatments. Maintain low organic load by reducing feeding rate and clearing bottom sludge.",
                "bn": "বাথ চিকিৎসার সময় পুকুরে জোরালোভাবে বায়ু সঞ্চালন করুন। খাবারের পরিমাণ কমিয়ে এবং তলার কাদা পরিষ্কার করে জৈব বর্জ্যের পরিমাণ কম রাখুন।",
            },
            "alternatives": {
                "en": "Copper Sulfate bath @ 0.5–1.0 mg/L in water with total alkalinity > 50 mg/L CaCO3.",
                "bn": "কপার সালফেট বাথ: প্রতি লিটারে ০.৫–১.০ মি.গ্রা., শুধু যে পানির মোট ক্ষারত্ব প্রতি লিটারে ৫০ মি.গ্রা. CaCO3-এর বেশি সেখানে।",
            },
            "summary": {
                "en": "Potassium permanganate or salt bath, with oxytetracycline feed if the infection is systemic",
                "bn": "পটাসিয়াম পারম্যাঙ্গানেট বা লবণ বাথ; সংক্রমণ সারা শরীরে ছড়ালে অক্সিটেট্রাসাইক্লিন মিশ্রিত খাবার",
            },
            "medication_summary": {
                "en": "Potassium permanganate 2.0–2.5 mg/L, or salt (NaCl) 1–2% dip for 10 minutes",
                "bn": "পটাসিয়াম পারম্যাঙ্গানেট প্রতি লিটারে ২.০–২.৫ মি.গ্রা., অথবা ১–২% লবণ (NaCl) দ্রবণে ১০ মিনিট ডিপ",
            },
            "precautions": {
                "en": [
                    "Aerate heavily during bath treatments",
                    "Reduce the feeding rate",
                    "Clear bottom sludge to lower the organic load",
                    "Avoid overcrowding",
                    "Test water quality (oxygen, ammonia) regularly",
                ],
                "bn": [
                    "বাথ চিকিৎসার সময় জোরালো বায়ু সঞ্চালন করুন",
                    "খাবারের পরিমাণ কমান",
                    "জৈব বর্জ্য কমাতে তলার কাদা পরিষ্কার করুন",
                    "অতিরিক্ত মাছ মজুদ করবেন না",
                    "নিয়মিত পানির গুণাগুণ (অক্সিজেন, অ্যামোনিয়া) পরীক্ষা করুন",
                ],
            },
            "effectiveness": {
                "en": "Good once water quality is corrected; comes back if the organic load stays high",
                "bn": "পানির গুণমান ঠিক করলে ভালো ফল পাওয়া যায়; জৈব বর্জ্য বেশি থাকলে রোগ আবার দেখা দেয়",
            },
            "requires_veterinarian": False,
            "reference": "FDA Approved Aquaculture Drugs / FAO Aquaculture Health Management.",
        },
    },
    {
        "code": "fungal_diseases_saprolegniasis",
        "species": "FISH",
        "short_name": {"en": "Saprolegniasis", "bn": "স্যাপ্রোলেগনিয়াসিস"},
        "name": {
            "en": "Fungal Disease – Saprolegniasis (Cotton Wool Disease)",
            "bn": "ছত্রাকজনিত রোগ – স্যাপ্রোলেগনিয়াসিস (তুলা রোগ)",
        },
        "diagnosis": {
            "en": "Visible cotton-like growth, confirmed by microscopic examination of a wet mount showing fungal hyphae",
            "bn": "তুলার মতো আস্তরণ চোখে দেখে, এবং অণুবীক্ষণ যন্ত্রে ভেজা নমুনায় ছত্রাকের সুতা (হাইফা) দেখে নিশ্চিত করা হয়",
        },
        "contagious": True,
        "severity": "MEDIUM",
        "notifiable": False,
        "zoonotic": False,
        "symptoms": [
            {
                "en": "White or grey cotton-like coating on the skin",
                "bn": "চামড়ায় সাদা বা ধূসর, তুলার মতো আবরণ",
            },
            {
                "en": "The coating turning brown or green",
                "bn": "আবরণটি বাদামি বা সবুজ রং ধারণ করছে",
            },
            {
                "en": "Cotton-like white coating on the fins, with worn fin edges",
                "bn": "পাখনায় তুলার মতো সাদা আবরণ, কিনারা ক্ষয়প্রাপ্ত",
            },
            {
                "en": "Cotton-like white coating on the gills",
                "bn": "ফুলকায় তুলার মতো সাদা আবরণ",
            },
            {
                "en": "In severe cases, floating head-down",
                "bn": "গুরুতর ক্ষেত্রে মাথা নিচু করে ভাসছে",
            },
        ],
        "treatment": {
            "code": "TRT-FISH-SAPROLEGNIASIS",
            "name": {
                "en": "Saprolegniasis (Fungal) Treatment Protocol",
                "bn": "স্যাপ্রোলেগনিয়াসিস (ছত্রাকজনিত রোগ) চিকিৎসা নির্দেশিকা",
            },
            "medication": {
                "en": "Sodium Chloride (Salt) Bath / Potassium Permanganate",
                "bn": "সোডিয়াম ক্লোরাইড (লবণ) বাথ / পটাসিয়াম পারম্যাঙ্গানেট",
            },
            "method": "BATH",
            "dosage": {
                "en": "Salt Bath: Dip infected fish in 10–30 g/L (1–3%) NaCl solution for 5–10 minutes. Pond Water Bath: Potassium Permanganate @ 2.0–3.0 mg/L.",
                "bn": "লবণ বাথ: আক্রান্ত মাছকে প্রতি লিটারে ১০–৩০ গ্রাম (১–৩%) NaCl দ্রবণে ৫–১০ মিনিট ডুবিয়ে রাখুন। পুকুরের পানিতে বাথ: পটাসিয়াম পারম্যাঙ্গানেট প্রতি লিটারে ২.০–৩.০ মি.গ্রা.।",
            },
            "duration_days": 7,
            "precaution": {
                "en": "Fungal infections are secondary to physical injury or stress. Handle fish carefully during sampling. Avoid using unbuffered chemicals on fish eggs.",
                "bn": "ছত্রাকের সংক্রমণ সাধারণত শারীরিক আঘাত বা চাপের পরে দেখা দেয়। নমুনা সংগ্রহের সময় মাছ সাবধানে নাড়াচাড়া করুন। মাছের ডিমে বাফারবিহীন রাসায়নিক ব্যবহার করবেন না।",
            },
            "alternatives": {
                "en": "Hydrogen peroxide bath @ 250–500 mg/L for 15 minutes (under strict veterinary control).",
                "bn": "হাইড্রোজেন পারক্সাইড বাথ: প্রতি লিটারে ২৫০–৫০০ মি.গ্রা., ১৫ মিনিট (কঠোর ভেটেরিনারি তত্ত্বাবধানে)।",
            },
            "summary": {
                "en": "Salt bath or potassium permanganate bath, and removing the cause of stress or injury",
                "bn": "লবণ বাথ বা পটাসিয়াম পারম্যাঙ্গানেট বাথ, এবং চাপ বা আঘাতের কারণ দূর করা",
            },
            "medication_summary": {
                "en": "Salt bath: 10–30 g/L (1–3%) NaCl for 5–10 minutes",
                "bn": "লবণ বাথ: প্রতি লিটারে ১০–৩০ গ্রাম (১–৩%) NaCl দ্রবণে ৫–১০ মিনিট",
            },
            "precautions": {
                "en": [
                    "Handle fish carefully to avoid injuries",
                    "Remove dead fish and eggs quickly",
                    "Keep water clean and avoid sudden temperature drops",
                    "Do not use unbuffered chemicals on fish eggs",
                    "Treat the underlying wounds or parasites",
                ],
                "bn": [
                    "আঘাত এড়াতে মাছ সাবধানে নাড়াচাড়া করুন",
                    "মরা মাছ ও ডিম দ্রুত সরিয়ে ফেলুন",
                    "পানি পরিষ্কার রাখুন এবং হঠাৎ তাপমাত্রা কমে যাওয়া এড়িয়ে চলুন",
                    "মাছের ডিমে বাফারবিহীন রাসায়নিক ব্যবহার করবেন না",
                    "মূল ক্ষত বা পরজীবীর চিকিৎসা করুন",
                ],
            },
            "effectiveness": {
                "en": "Good for early skin infections; severe gill infection is often fatal",
                "bn": "চামড়ার প্রাথমিক সংক্রমণে ভালো ফল পাওয়া যায়; ফুলকায় গুরুতর সংক্রমণ প্রায়ই প্রাণঘাতী হয়",
            },
            "requires_veterinarian": False,
            "reference": "WOAH Aquatic Animal Health Code / Aquaculture, Fish & Fisheries Review.",
        },
    },
    {
        "code": "parasitic_diseases",
        "species": "FISH",
        "short_name": {"en": "Parasitic Diseases", "bn": "পরজীবীজনিত রোগ"},
        "name": {"en": "Parasitic Diseases", "bn": "পরজীবীজনিত রোগ"},
        "diagnosis": {
            "en": "Microscopic examination of skin and gill scrapings to identify the parasite",
            "bn": "চামড়া ও ফুলকার চাঁছা নমুনা অণুবীক্ষণ যন্ত্রে পরীক্ষা করে পরজীবী শনাক্ত করা হয়",
        },
        "contagious": True,
        "severity": "MEDIUM",
        "notifiable": False,
        "zoonotic": False,
        "symptoms": [
            {
                "en": "Pinhead-sized white dots on the skin (about 0.5–1 mm)",
                "bn": "চামড়ায় মাথার পিনের মতো ছোট ছোট সাদা বিন্দু (প্রায় ০.৫-১ মিমি)",
            },
            {
                "en": "More grey mucus (slime) on the body than normal",
                "bn": "শরীরে ধূসর মিউকাস (শ্লেষ্মা) আবরণ স্বাভাবিকের চেয়ে বেড়ে গেছে",
            },
            {
                "en": "Small white dots on the fins",
                "bn": "পাখনায় ছোট সাদা বিন্দু দেখা যাচ্ছে",
            },
            {
                "en": "Heavy parasite load on the gills, fish struggling to breathe",
                "bn": "ফুলকায় প্রচুর পরজীবী বাসা বেঁধেছে, মাছের শ্বাসকষ্ট হচ্ছে",
            },
            {
                "en": "Rubbing or scratching the body against objects",
                "bn": "শরীর ঘষছে বা চুলকাচ্ছে (কোনো কিছুর গায়ে গা ঘষা)",
            },
            {"en": "Swimming abnormally", "bn": "অস্বাভাবিকভাবে সাঁতার কাটছে"},
        ],
        "treatment": {
            "code": "TRT-FISH-PARASITIC",
            "name": {
                "en": "Parasitic Disease Protocol",
                "bn": "পরজীবীজনিত রোগ চিকিৎসা নির্দেশিকা",
            },
            "medication": {
                "en": "Formalin or Sodium Chloride (Salt) Bath",
                "bn": "ফরমালিন অথবা সোডিয়াম ক্লোরাইড (লবণ) বাথ",
            },
            "method": "BATH",
            "dosage": {
                "en": "Formalin: 25 mg/L (ppm) long-term pond treatment OR 150–250 mg/L short bath for 30–60 minutes under high aeration. Salt dip: 10–20 g/L NaCl for 10–15 minutes.",
                "bn": "ফরমালিন: দীর্ঘমেয়াদি পুকুর চিকিৎসায় প্রতি লিটারে ২৫ মি.গ্রা. (পিপিএম) অথবা প্রচুর বায়ু সঞ্চালনসহ প্রতি লিটারে ১৫০–২৫০ মি.গ্রা. দ্রবণে ৩০–৬০ মিনিটের স্বল্পমেয়াদি বাথ। লবণ ডিপ: প্রতি লিটারে ১০–২০ গ্রাম NaCl দ্রবণে ১০–১৫ মিনিট।",
            },
            "duration_days": 7,
            "precaution": {
                "en": "Formalin removes oxygen from water (1 ppm formalin depletes ~1 ppm dissolved oxygen); maintain vigorous aeration during and after treatment.",
                "bn": "ফরমালিন পানির অক্সিজেন কমিয়ে দেয় (১ পিপিএম ফরমালিন প্রায় ১ পিপিএম দ্রবীভূত অক্সিজেন কমায়); চিকিৎসার সময় ও পরে জোরালো বায়ু সঞ্চালন বজায় রাখুন।",
            },
            "alternatives": {
                "en": "Praziquantel @ 2 mg/L bath for fluke control. In-feed Trichlorfon or organophosphates (where approved by veterinary authorities).",
                "bn": "ফ্লুক (পাতাকৃমি) নিয়ন্ত্রণে প্রাজিকোয়ান্টেল প্রতি লিটারে ২ মি.গ্রা. হারে বাথ। খাবারের সাথে ট্রাইক্লোরফন বা অর্গানোফসফেট (যেখানে ভেটেরিনারি কর্তৃপক্ষ অনুমোদন দিয়েছে)।",
            },
            "summary": {
                "en": "Formalin or salt bath; praziquantel for flukes",
                "bn": "ফরমালিন বা লবণ বাথ; ফ্লুকের জন্য প্রাজিকোয়ান্টেল",
            },
            "medication_summary": {
                "en": "Formalin 25 mg/L long-term pond treatment, or salt dip 10–20 g/L NaCl for 10–15 minutes",
                "bn": "ফরমালিন প্রতি লিটারে ২৫ মি.গ্রা. দীর্ঘমেয়াদি পুকুর চিকিৎসা, অথবা প্রতি লিটারে ১০–২০ গ্রাম NaCl দ্রবণে ১০–১৫ মিনিট লবণ ডিপ",
            },
            "precautions": {
                "en": [
                    "Keep strong aeration — formalin lowers oxygen in the water",
                    "Quarantine new fish before stocking",
                    "Dry and lime the pond between crops",
                    "Avoid overstocking",
                    "Repeat treatment as advised by a fisheries officer if the parasite has a long life cycle",
                ],
                "bn": [
                    "জোরালো বায়ু সঞ্চালন বজায় রাখুন — ফরমালিন পানির অক্সিজেন কমায়",
                    "মজুদের আগে নতুন মাছ আলাদা (কোয়ারেন্টাইন) করে রাখুন",
                    "দুই চাষের মাঝে পুকুর শুকিয়ে চুন দিন",
                    "অতিরিক্ত মাছ মজুদ করবেন না",
                    "পরজীবীর জীবনচক্র দীর্ঘ হলে মৎস্য কর্মকর্তার পরামর্শে চিকিৎসা আবার করুন",
                ],
            },
            "effectiveness": {
                "en": "High when the parasite is correctly identified and treatment is repeated as needed",
                "bn": "পরজীবী সঠিকভাবে শনাক্ত করে প্রয়োজনমতো চিকিৎসা আবার করলে কার্যকারিতা বেশি",
            },
            "requires_veterinarian": False,
            "reference": "FDA Approved Aquaculture Drugs / PMC Parasitic Disease Treatment in Aquaculture (2023).",
        },
    },
    {
        "code": "viral_diseases_white_tail_disease",
        "species": "FISH",
        "short_name": {"en": "White Tail Disease", "bn": "হোয়াইট টেইল রোগ"},
        "name": {
            "en": "Viral Disease – White Tail Disease (Macrobrachium rosenbergii nodavirus)",
            "bn": "ভাইরাসজনিত রোগ – হোয়াইট টেইল রোগ (গলদা চিংড়ির নোডাভাইরাস)",
        },
        "diagnosis": {
            "en": "Clinical signs confirmed by PCR testing for Macrobrachium rosenbergii nodavirus (MrNV)",
            "bn": "লক্ষণ দেখে এবং পিসিআর পরীক্ষায় ম্যাক্রোব্র্যাকিয়াম রোজেনবার্গি নোডাভাইরাস (MrNV) শনাক্ত করে নিশ্চিত করা হয়",
        },
        "contagious": True,
        "severity": "CRITICAL",
        "notifiable": False,
        "zoonotic": False,
        "symptoms": [
            {
                "en": "Milky white tail muscle in post-larvae and prawns",
                "bn": "পোস্ট-লার্ভা ও চিংড়ির লেজের মাংস দুধের মতো সাদা হয়ে যায়",
            },
            {
                "en": "Whiteness spreads from the tail towards the head",
                "bn": "সাদা ভাব লেজ থেকে মাথার দিকে ছড়ায়",
            },
            {
                "en": "Reduced feeding and weak swimming",
                "bn": "খাবার কম খাওয়া ও দুর্বলভাবে সাঁতার কাটা",
            },
            {
                "en": "Sudden mass deaths in hatcheries and nurseries",
                "bn": "হ্যাচারি ও নার্সারিতে হঠাৎ ব্যাপক মৃত্যু",
            },
            {
                "en": "Mortality can reach 100% in post-larvae",
                "bn": "পোস্ট-লার্ভায় মৃত্যুহার ১০০% পর্যন্ত হতে পারে",
            },
        ],
        "treatment": {
            "code": "TRT-FISH-WHITE-TAIL",
            "name": {
                "en": "White Tail Disease — Supportive Care & Biosecurity Only",
                "bn": "হোয়াইট টেইল রোগ — শুধু সহায়ক পরিচর্যা ও জৈব-নিরাপত্তা",
            },
            "medication": {
                "en": "No Antiviral Treatment — Biosecurity & Immunity Booster",
                "bn": "কোনো অ্যান্টিভাইরাল চিকিৎসা নেই — জৈব-নিরাপত্তা ও রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি",
            },
            "method": "FEED",
            "dosage": {
                "en": "No antiviral cure exists. Add Vitamin C (500–1000 mg/kg feed) and immunostimulants to feed to strengthen uninfected stock.",
                "bn": "এর কোনো অ্যান্টিভাইরাল প্রতিকার নেই। অনাক্রান্ত মজুদকে শক্তিশালী করতে খাবারে ভিটামিন সি (প্রতি কেজি খাবারে ৫০০–১০০০ মি.গ্রা.) ও রোগ প্রতিরোধ বৃদ্ধিকারক উপাদান যোগ করুন।",
            },
            "duration_days": 14,
            "precaution": {
                "en": "White Tail Disease causes up to 100% mortality in post-larvae/prawns. Immediately quarantine infected ponds. Disinfect culture water with chlorine before discharge.",
                "bn": "হোয়াইট টেইল রোগে পোস্ট-লার্ভা/চিংড়ির মৃত্যুহার ১০০% পর্যন্ত হতে পারে। আক্রান্ত পুকুর অবিলম্বে আলাদা (কোয়ারেন্টাইন) করুন। চাষের পানি বাইরে ছাড়ার আগে ক্লোরিন দিয়ে জীবাণুমুক্ত করুন।",
            },
            "alternatives": {
                "en": "Eradicate affected stock biosecurely. Dry and line-lime pond bottoms prior to re-stocking PCR-screened post-larvae.",
                "bn": "আক্রান্ত মজুদ জৈব-নিরাপদ উপায়ে ধ্বংস করুন। পিসিআর-পরীক্ষিত পোস্ট-লার্ভা পুনরায় মজুদের আগে পুকুরের তলা শুকিয়ে চুন প্রয়োগ করুন।",
            },
            "summary": {
                "en": "No cure; supportive care, immunity boosters and strict biosecurity",
                "bn": "কোনো প্রতিকার নেই; সহায়ক পরিচর্যা, রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি ও কঠোর জৈব-নিরাপত্তা",
            },
            "medication_summary": {
                "en": "No antiviral treatment — Vitamin C 500–1000 mg/kg feed to support uninfected stock",
                "bn": "কোনো অ্যান্টিভাইরাল চিকিৎসা নেই — অনাক্রান্ত মজুদের জন্য প্রতি কেজি খাবারে ৫০০–১০০০ মি.গ্রা. ভিটামিন সি",
            },
            "precautions": {
                "en": [
                    "Quarantine infected ponds immediately",
                    "Disinfect water with chlorine before discharge",
                    "Stock only PCR-screened post-larvae",
                    "Dry and lime pond bottoms before restocking",
                    "Destroy affected stock biosecurely",
                ],
                "bn": [
                    "আক্রান্ত পুকুর অবিলম্বে আলাদা (কোয়ারেন্টাইন) করুন",
                    "পানি বাইরে ছাড়ার আগে ক্লোরিন দিয়ে জীবাণুমুক্ত করুন",
                    "শুধু পিসিআর-পরীক্ষিত পোস্ট-লার্ভা মজুদ করুন",
                    "পুনরায় মজুদের আগে পুকুরের তলা শুকিয়ে চুন দিন",
                    "আক্রান্ত মজুদ জৈব-নিরাপদ উপায়ে ধ্বংস করুন",
                ],
            },
            "effectiveness": {
                "en": "Very low once infected — prevention through biosecurity is the only control",
                "bn": "একবার আক্রান্ত হলে চিকিৎসার সুযোগ খুব কম — জৈব-নিরাপত্তার মাধ্যমে প্রতিরোধই একমাত্র উপায়",
            },
            "requires_veterinarian": False,
            "reference": "WOAH Aquatic Animal Health Code Chapter 9.8 (White Tail Disease).",
        },
    },
]
