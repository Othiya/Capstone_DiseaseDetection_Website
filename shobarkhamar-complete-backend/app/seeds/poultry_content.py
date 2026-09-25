"""Poultry disease reference content, English and Bangla.

Sources are cited per disease. Bangla keeps the English term in brackets after the
first Bangla rendering of a disease or drug name, so that a farmer reading Bangla and
a vet reading the English label are looking at the same thing.

Four of the five diseases carry requires_veterinarian=True: avian influenza and
Newcastle disease have no farmer-applicable cure, pullorum is controlled by testing
and carrier removal rather than dosing, and salmonellosis needs culture and
sensitivity results before any antimicrobial is chosen. Only coccidiosis has a
protocol a farmer can apply directly.
"""

POULTRY_DISEASES = [
    {
        "code": "ncd",
        "species": "POULTRY",
        "short_name": {"en": "Newcastle Disease", "bn": "রানীক্ষেত রোগ"},
        "name": {
            "en": "Newcastle Disease (Ranikhet)",
            "bn": "রানীক্ষেত রোগ (Newcastle Disease)",
        },
        "description": {
            "en": "A highly contagious viral disease of poultry. There is no cure once birds are infected; control depends on vaccination of healthy birds and strict biosecurity.",
            "bn": "মুরগির অত্যন্ত ছোঁয়াচে ভাইরাসজনিত রোগ (viral disease)। আক্রান্ত হয়ে গেলে এর কোনো প্রতিকার নেই; সুস্থ মুরগিকে টিকা (vaccine) দেওয়া ও কঠোর জৈব-নিরাপত্তাই একমাত্র নিয়ন্ত্রণের উপায়।",
        },
        "diagnosis": {
            "en": "Clinical signs and post-mortem examination by a veterinarian, confirmed by virus isolation or serological testing at a laboratory",
            "bn": "পশু চিকিৎসকের (veterinarian) লক্ষণ পরীক্ষা ও ময়নাতদন্ত, এবং ল্যাবরেটরিতে ভাইরাস শনাক্তকরণ বা সেরোলজিক্যাল পরীক্ষার (serological test) মাধ্যমে নিশ্চিত করা হয়",
        },
        "contagious": True,
        "severity": "CRITICAL",
        "notifiable": True,
        "zoonotic": False,
        "symptoms": [
            {
                "en": "Gasping, coughing and laboured breathing",
                "bn": "হাঁ করে শ্বাস নেওয়া, কাশি ও শ্বাসকষ্ট",
            },
            {
                "en": "Greenish watery diarrhoea",
                "bn": "সবুজাভ পাতলা পায়খানা",
            },
            {
                "en": "Twisted neck, paralysis of wings or legs, walking in circles",
                "bn": "ঘাড় বেঁকে যাওয়া, ডানা বা পা অবশ হয়ে যাওয়া, গোল হয়ে ঘোরা",
            },
            {
                "en": "Swelling around the eyes and neck",
                "bn": "চোখ ও ঘাড়ের চারপাশে ফোলাভাব",
            },
            {
                "en": "Sharp drop in egg production, or soft-shelled and misshapen eggs",
                "bn": "ডিম উৎপাদন হঠাৎ কমে যাওয়া, অথবা নরম খোসা ও আকারে বিকৃত ডিম",
            },
            {
                "en": "Sudden death in a large part of the flock in acute cases",
                "bn": "তীব্র আকারে খামারের বড় অংশে হঠাৎ মৃত্যু",
            },
        ],
        "treatment": {
            "code": "TRT-POULTRY-NEWCASTLE",
            "name": {
                "en": "Newcastle Disease — Veterinary Response and Flock Protection",
                "bn": "রানীক্ষেত রোগ (Newcastle Disease) — পশু চিকিৎসকের তত্ত্বাবধান ও খামার সুরক্ষা",
            },
            "medication": {
                "en": "No antiviral cure — supportive care and vaccination of healthy birds, directed by a veterinarian",
                "bn": "কোনো অ্যান্টিভাইরাল (antiviral) ওষুধ নেই — পশু চিকিৎসকের নির্দেশে সহায়ক পরিচর্যা ও সুস্থ মুরগিকে টিকাদান",
            },
            "method": "VETERINARY_RESPONSE",
            "dosage": {
                "en": "Do not choose a medicine yourself. There is no drug that cures Newcastle disease. A veterinarian may prescribe an antibiotic only to control secondary bacterial infection, plus electrolytes and vitamins to reduce dehydration. Protection of the healthy birds is done with the vaccine schedule used in Bangladesh: BCRDV (Baby Chick Ranikhet Disease Vaccine) at 1–7 days of age, an RDV booster at 21–28 days, and repeat doses every 3–4 months for layers.",
                "bn": "নিজে থেকে কোনো ওষুধ বেছে নেবেন না। রানীক্ষেত রোগ সারানোর মতো কোনো ওষুধ নেই। পশু চিকিৎসক শুধু গৌণ ব্যাকটেরিয়া সংক্রমণ (secondary bacterial infection) ঠেকাতে অ্যান্টিবায়োটিক এবং পানিশূন্যতা কমাতে ইলেকট্রোলাইট ও ভিটামিন দিতে পারেন। সুস্থ মুরগিকে বাঁচাতে বাংলাদেশে প্রচলিত টিকার সময়সূচি অনুসরণ করুন: ১–৭ দিন বয়সে বিসিআরডিভি (BCRDV), ২১–২৮ দিনে আরডিভি (RDV) বুস্টার, এবং লেয়ার মুরগিতে প্রতি ৩–৪ মাস পরপর পুনরায় টিকা।",
            },
            "duration_days": None,
            "precaution": {
                "en": "Isolate affected birds at once and stop all movement of birds, eggs and equipment in or out of the farm. Disinfect footwear, crates and vehicles. Dispose of dead birds by burial or burning — never sell or eat them. Report a sudden large die-off to the Upazila Livestock Office.",
                "bn": "আক্রান্ত মুরগি অবিলম্বে আলাদা করুন এবং খামারে মুরগি, ডিম ও যন্ত্রপাতির যাতায়াত সম্পূর্ণ বন্ধ করুন। জুতা, খাঁচা ও গাড়ি জীবাণুমুক্ত করুন। মরা মুরগি মাটিতে পুঁতে বা পুড়িয়ে ফেলুন — কখনোই বিক্রি বা খাওয়া যাবে না। হঠাৎ ব্যাপক মৃত্যু হলে উপজেলা প্রাণিসম্পদ অফিসে জানান।",
            },
            "alternatives": {
                "en": "There is no alternative cure. The only effective protection is keeping the vaccination schedule up to date before an outbreak and sourcing chicks from a hatchery that vaccinates.",
                "bn": "বিকল্প কোনো প্রতিকার নেই। রোগ ছড়ানোর আগেই নিয়মিত টিকা দেওয়া এবং টিকাদানকারী হ্যাচারি থেকে বাচ্চা কেনাই একমাত্র কার্যকর সুরক্ষা।",
            },
            "summary": {
                "en": "No cure; veterinary-directed supportive care, immediate isolation, and vaccination of healthy birds",
                "bn": "কোনো প্রতিকার নেই; পশু চিকিৎসকের নির্দেশে সহায়ক পরিচর্যা, দ্রুত আলাদাকরণ ও সুস্থ মুরগিকে টিকাদান",
            },
            "medication_summary": {
                "en": "No curative medicine — vaccination (BCRDV at 1–7 days, RDV booster at 21–28 days) protects healthy birds",
                "bn": "রোগ সারানোর ওষুধ নেই — টিকা (১–৭ দিনে বিসিআরডিভি, ২১–২৮ দিনে আরডিভি বুস্টার) সুস্থ মুরগিকে রক্ষা করে",
            },
            "precautions": {
                "en": [
                    "Isolate affected birds immediately",
                    "Stop all movement of birds, eggs and equipment",
                    "Vaccinate the healthy birds on veterinary advice",
                    "Bury or burn dead birds — never sell or eat them",
                    "Disinfect the house, footwear, crates and vehicles",
                    "Report a sudden large die-off to the Upazila Livestock Office",
                ],
                "bn": [
                    "আক্রান্ত মুরগি অবিলম্বে আলাদা করুন",
                    "মুরগি, ডিম ও যন্ত্রপাতির যাতায়াত বন্ধ করুন",
                    "পশু চিকিৎসকের পরামর্শে সুস্থ মুরগিকে টিকা দিন",
                    "মরা মুরগি পুঁতে বা পুড়িয়ে ফেলুন — বিক্রি বা খাওয়া যাবে না",
                    "ঘর, জুতা, খাঁচা ও গাড়ি জীবাণুমুক্ত করুন",
                    "হঠাৎ ব্যাপক মৃত্যু হলে উপজেলা প্রাণিসম্পদ অফিসে জানান",
                ],
            },
            "effectiveness": {
                "en": "Treatment cannot cure the disease; outcome depends on how quickly healthy birds are protected by vaccination and isolation",
                "bn": "চিকিৎসা দিয়ে এ রোগ সারানো যায় না; কত দ্রুত সুস্থ মুরগিকে টিকা ও আলাদাকরণের মাধ্যমে রক্ষা করা গেল তার ওপর ফলাফল নির্ভর করে",
            },
            "requires_veterinarian": True,
            "reference": "WOAH Terrestrial Manual, Newcastle Disease chapter; Alexander, D.J. (2000), Revue Scientifique et Technique 19(2), 443–462; DLS Bangladesh poultry vaccination schedule.",
        },
    },
    {
        "code": "cocci",
        "species": "POULTRY",
        "short_name": {"en": "Coccidiosis", "bn": "ককসিডিওসিস (রক্ত আমাশয়)"},
        "name": {
            "en": "Coccidiosis",
            "bn": "ককসিডিওসিস — রক্ত আমাশয় (Coccidiosis)",
        },
        "description": {
            "en": "A parasitic disease of the intestine caused by Eimeria species, spread through droppings in damp litter. It responds well to early treatment.",
            "bn": "আইমেরিয়া (Eimeria) পরজীবীর কারণে অন্ত্রে হওয়া রোগ, যা ভেজা লিটারে মুরগির বিষ্ঠার মাধ্যমে ছড়ায়। দ্রুত চিকিৎসা শুরু করলে ভালো ফল পাওয়া যায়।",
        },
        "diagnosis": {
            "en": "Bloody droppings with typical intestinal lesions on post-mortem; confirmed by finding Eimeria oocysts in a faecal examination",
            "bn": "রক্তমিশ্রিত পায়খানা ও ময়নাতদন্তে অন্ত্রের বৈশিষ্ট্যপূর্ণ ক্ষত দেখে; মলে আইমেরিয়ার ডিম (oocyst) পরীক্ষা করে নিশ্চিত করা হয়",
        },
        "contagious": True,
        "severity": "HIGH",
        "notifiable": False,
        "zoonotic": False,
        "symptoms": [
            {
                "en": "Bloody or dark brown diarrhoea",
                "bn": "রক্তমিশ্রিত বা গাঢ় বাদামি পাতলা পায়খানা",
            },
            {
                "en": "Ruffled feathers, huddling and drooping wings",
                "bn": "পালক উষ্কখুষ্ক, গুটিসুটি মেরে বসে থাকা ও ডানা ঝুলে পড়া",
            },
            {"en": "Reduced feed and water intake", "bn": "খাবার ও পানি খাওয়া কমে যাওয়া"},
            {
                "en": "Dehydration and pale comb",
                "bn": "পানিশূন্যতা ও ঝুঁটি ফ্যাকাশে হয়ে যাওয়া",
            },
            {
                "en": "Poor growth and uneven flock weight",
                "bn": "বৃদ্ধি কমে যাওয়া ও খামারের মুরগির ওজনে অসমতা",
            },
            {
                "en": "Rising mortality among young birds, usually 3–6 weeks old",
                "bn": "অল্পবয়সী মুরগিতে (সাধারণত ৩–৬ সপ্তাহ বয়সে) মৃত্যুহার বেড়ে যাওয়া",
            },
        ],
        "treatment": {
            "code": "TRT-POULTRY-COCCIDIOSIS",
            "name": {
                "en": "Coccidiosis Treatment Protocol",
                "bn": "ককসিডিওসিস (Coccidiosis) চিকিৎসা নির্দেশিকা",
            },
            "medication": {
                "en": "Amprolium in drinking water, with vitamin A and vitamin K support",
                "bn": "খাবার পানিতে অ্যামপ্রোলিয়াম (Amprolium), সাথে ভিটামিন এ ও ভিটামিন কে",
            },
            "method": "IN_WATER",
            "dosage": {
                "en": "Amprolium 20% powder: 1 g per litre of drinking water for 5–7 days (equivalent to 0.012% amprolium). Give vitamin K to reduce intestinal bleeding and vitamin A to help the gut lining recover. Make up fresh medicated water every day and make sure it is the only water available.",
                "bn": "অ্যামপ্রোলিয়াম ২০% পাউডার: প্রতি লিটার খাবার পানিতে ১ গ্রাম হারে ৫–৭ দিন (অর্থাৎ ০.০১২% অ্যামপ্রোলিয়াম)। অন্ত্রের রক্তক্ষরণ কমাতে ভিটামিন কে এবং অন্ত্রের আবরণ সারাতে ভিটামিন এ দিন। প্রতিদিন নতুন করে ওষুধ মেশানো পানি তৈরি করুন এবং খেয়াল রাখুন মুরগি যেন অন্য কোনো পানি না পায়।",
            },
            "duration_days": 7,
            "precaution": {
                "en": "Keep the litter dry — wet litter is what spreads the parasite. Remove caked litter, improve ventilation and reduce crowding. Observe the withdrawal period on the medicine label before selling meat or eggs. If there is no improvement in 3 days, or deaths keep rising, stop and call a veterinarian.",
                "bn": "লিটার শুকনো রাখুন — ভেজা লিটারই এই পরজীবী ছড়ায়। দলা পাকানো লিটার সরিয়ে ফেলুন, বাতাস চলাচল বাড়ান ও ঘরে মুরগির ভিড় কমান। মাংস বা ডিম বিক্রির আগে ওষুধের গায়ে লেখা প্রত্যাহারকাল (withdrawal period) মেনে চলুন। ৩ দিনেও উন্নতি না হলে বা মৃত্যু বাড়তে থাকলে ওষুধ বন্ধ করে পশু চিকিৎসকের পরামর্শ নিন।",
            },
            "alternatives": {
                "en": "Toltrazuril 2.5% solution: 1 ml per litre of drinking water for 2 consecutive days, or a sulphonamide such as sulphadimethoxine, both under veterinary advice. Anticoccidials in feed are used to prevent the disease, not to treat an active outbreak.",
                "bn": "বিকল্প হিসেবে টলট্রাজুরিল (Toltrazuril) ২.৫% দ্রবণ: প্রতি লিটার পানিতে ১ মি.লি. হারে একটানা ২ দিন, অথবা সালফাডাইমেথক্সিন (sulphadimethoxine)-এর মতো সালফোনামাইড — দুটিই পশু চিকিৎসকের পরামর্শে। খাবারের সাথে দেওয়া অ্যান্টিককসিডিয়াল ওষুধ রোগ প্রতিরোধের জন্য, চলমান প্রাদুর্ভাবের চিকিৎসার জন্য নয়।",
            },
            "summary": {
                "en": "Amprolium in drinking water with vitamin support, plus dry litter and better ventilation",
                "bn": "খাবার পানিতে অ্যামপ্রোলিয়াম ও ভিটামিন, সাথে শুকনো লিটার ও ভালো বাতাস চলাচল",
            },
            "medication_summary": {
                "en": "Amprolium 20%: 1 g per litre of drinking water for 5–7 days",
                "bn": "অ্যামপ্রোলিয়াম ২০%: প্রতি লিটার খাবার পানিতে ১ গ্রাম হারে ৫–৭ দিন",
            },
            "precautions": {
                "en": [
                    "Keep the litter dry and remove caked litter",
                    "Improve ventilation and avoid overcrowding",
                    "Give fresh medicated water every day",
                    "Clean and disinfect drinkers and feeders regularly",
                    "Observe the withdrawal period before selling meat or eggs",
                    "Call a veterinarian if there is no improvement within 3 days",
                ],
                "bn": [
                    "লিটার শুকনো রাখুন ও দলা পাকানো লিটার সরিয়ে ফেলুন",
                    "বাতাস চলাচল বাড়ান ও ঘরে ভিড় কমান",
                    "প্রতিদিন নতুন করে ওষুধ মেশানো পানি দিন",
                    "পানির পাত্র ও খাবারের পাত্র নিয়মিত পরিষ্কার ও জীবাণুমুক্ত করুন",
                    "মাংস বা ডিম বিক্রির আগে প্রত্যাহারকাল মেনে চলুন",
                    "৩ দিনেও উন্নতি না হলে পশু চিকিৎসকের পরামর্শ নিন",
                ],
            },
            "effectiveness": {
                "en": "High when treatment starts early — most flocks improve within 3–5 days, but the disease returns if the litter stays wet",
                "bn": "দ্রুত চিকিৎসা শুরু করলে কার্যকারিতা বেশি — বেশিরভাগ খামারে ৩–৫ দিনেই উন্নতি দেখা যায়, তবে লিটার ভেজা থাকলে রোগ আবার ফিরে আসে",
            },
            "requires_veterinarian": False,
            "reference": "Chapman, H.D. et al. (2010). A review of coccidiosis in poultry. Avian Pathology 39(1), 1–6; Conway, D.P. & McKenzie, M.E. (2007). Poultry Coccidiosis: Diagnostic and Testing Procedures, 3rd ed.",
        },
    },
    {
        "code": "avian_influenza",
        "species": "POULTRY",
        "short_name": {"en": "Avian Influenza", "bn": "বার্ড ফ্লু"},
        "name": {
            "en": "Avian Influenza (Bird Flu)",
            "bn": "বার্ড ফ্লু — এভিয়ান ইনফ্লুয়েঞ্জা (Avian Influenza)",
        },
        "description": {
            "en": "A notifiable viral disease that can also infect people. There is no farm-level treatment. It must be reported to the livestock authority immediately.",
            "bn": "সরকারিভাবে রিপোর্টযোগ্য (notifiable) ভাইরাসজনিত রোগ, যা মানুষের শরীরেও সংক্রমিত হতে পারে। খামার পর্যায়ে এর কোনো চিকিৎসা নেই। সন্দেহ হলেই অবিলম্বে প্রাণিসম্পদ কর্তৃপক্ষকে জানাতে হবে।",
        },
        "diagnosis": {
            "en": "Urgent veterinary assessment with laboratory confirmation. Do not wait for laboratory results before reporting a suspected case.",
            "bn": "জরুরি ভিত্তিতে পশু চিকিৎসকের পরীক্ষা ও ল্যাবরেটরিতে নিশ্চিতকরণ। সন্দেহ হলে ল্যাবের ফল আসার জন্য অপেক্ষা না করে সাথে সাথেই জানান।",
        },
        "contagious": True,
        "severity": "CRITICAL",
        "notifiable": True,
        "zoonotic": True,
        "symptoms": [
            {
                "en": "Sudden death of many birds without earlier signs",
                "bn": "পূর্ব লক্ষণ ছাড়াই হঠাৎ অনেক মুরগির মৃত্যু",
            },
            {
                "en": "Swelling and purple or blue discolouration of the comb and wattles",
                "bn": "ঝুঁটি ও গলার লতি ফুলে যাওয়া এবং বেগুনি বা নীলাভ হয়ে যাওয়া",
            },
            {
                "en": "Severe breathing difficulty, coughing and nasal discharge",
                "bn": "তীব্র শ্বাসকষ্ট, কাশি ও নাক দিয়ে পানি ঝরা",
            },
            {
                "en": "Sharp fall or complete stop in egg production",
                "bn": "ডিম উৎপাদন হঠাৎ কমে যাওয়া বা সম্পূর্ণ বন্ধ হয়ে যাওয়া",
            },
            {
                "en": "Watery diarrhoea and neurological signs such as tremors or twisted neck",
                "bn": "পাতলা পায়খানা এবং কাঁপুনি বা ঘাড় বেঁকে যাওয়ার মতো স্নায়বিক লক্ষণ",
            },
            {
                "en": "Swelling of the head, eyelids and legs",
                "bn": "মাথা, চোখের পাতা ও পা ফুলে যাওয়া",
            },
        ],
        "treatment": {
            "code": "TRT-POULTRY-AVIAN-INFLUENZA",
            "name": {
                "en": "Avian Influenza — Report Immediately, No Farm Treatment",
                "bn": "বার্ড ফ্লু (Avian Influenza) — অবিলম্বে রিপোর্ট করুন, খামারে চিকিৎসা নেই",
            },
            "medication": {
                "en": "None. Do not give any medicine. This disease must be handled by the livestock authority.",
                "bn": "কোনো ওষুধ নেই। কোনো ওষুধ দেবেন না। এই রোগ প্রাণিসম্পদ কর্তৃপক্ষকেই সামলাতে হবে।",
            },
            "method": "VETERINARY_RESPONSE",
            "dosage": {
                "en": "There is no dose, because there is no treatment. Antibiotics do not work against this virus and giving them delays the response and wastes money. Contact the Upazila Livestock Office or your nearest registered veterinarian today. They will arrange testing and, if the disease is confirmed, official culling and disposal — for which government compensation rules may apply.",
                "bn": "কোনো মাত্রা নেই, কারণ এর কোনো চিকিৎসা নেই। অ্যান্টিবায়োটিক এই ভাইরাসের বিরুদ্ধে কাজ করে না; বরং তা দিলে সময় নষ্ট হয় ও টাকা অপচয় হয়। আজই উপজেলা প্রাণিসম্পদ অফিস বা নিকটস্থ নিবন্ধিত পশু চিকিৎসকের সাথে যোগাযোগ করুন। তাঁরা পরীক্ষার ব্যবস্থা করবেন এবং রোগ নিশ্চিত হলে সরকারি নিয়মে মুরগি অপসারণ ও ধ্বংসের ব্যবস্থা নেবেন — এ ক্ষেত্রে সরকারি ক্ষতিপূরণের নিয়ম প্রযোজ্য হতে পারে।",
            },
            "duration_days": None,
            "precaution": {
                "en": "This disease can spread to people. Do not handle sick or dead birds with bare hands — use gloves, cover your nose and mouth, and wash with soap afterwards. Keep children away from the poultry house. Never sell, slaughter or eat sick or dead birds. Do not move birds, eggs, litter or equipment off the farm.",
                "bn": "এই রোগ মানুষের শরীরেও ছড়াতে পারে। খালি হাতে অসুস্থ বা মরা মুরগি ধরবেন না — হাতে গ্লাভস পরুন, নাক-মুখ ঢেকে নিন এবং পরে সাবান দিয়ে ভালোভাবে হাত ধুয়ে ফেলুন। শিশুদের মুরগির ঘর থেকে দূরে রাখুন। অসুস্থ বা মরা মুরগি কখনোই বিক্রি, জবাই বা খাওয়া যাবে না। খামার থেকে মুরগি, ডিম, লিটার বা যন্ত্রপাতি বাইরে নেবেন না।",
            },
            "alternatives": {
                "en": "There is no alternative treatment. Follow the official testing, quarantine and disposal instructions issued for your area.",
                "bn": "বিকল্প কোনো চিকিৎসা নেই। আপনার এলাকার জন্য দেওয়া সরকারি পরীক্ষা, কোয়ারেন্টাইন ও ধ্বংসের নির্দেশনা মেনে চলুন।",
            },
            "summary": {
                "en": "No farm-level treatment; report to the livestock authority at once and follow official outbreak-control instructions",
                "bn": "খামার পর্যায়ে কোনো চিকিৎসা নেই; সাথে সাথে প্রাণিসম্পদ কর্তৃপক্ষকে জানান ও সরকারি নির্দেশনা মেনে চলুন",
            },
            "medication_summary": {
                "en": "Not applicable — no medicine should be given without veterinary and government direction",
                "bn": "প্রযোজ্য নয় — পশু চিকিৎসক ও সরকারি নির্দেশনা ছাড়া কোনো ওষুধ দেওয়া যাবে না",
            },
            "precautions": {
                "en": [
                    "Report to the Upazila Livestock Office immediately",
                    "Do not touch sick or dead birds with bare hands — use gloves and cover your nose and mouth",
                    "Keep children and other animals away from the poultry house",
                    "Never sell, slaughter or eat sick or dead birds",
                    "Stop all movement of birds, eggs, litter and equipment off the farm",
                    "Wash hands with soap and change clothes after entering the poultry house",
                ],
                "bn": [
                    "অবিলম্বে উপজেলা প্রাণিসম্পদ অফিসে জানান",
                    "খালি হাতে অসুস্থ বা মরা মুরগি ধরবেন না — গ্লাভস পরুন ও নাক-মুখ ঢাকুন",
                    "শিশু ও অন্যান্য প্রাণীকে মুরগির ঘর থেকে দূরে রাখুন",
                    "অসুস্থ বা মরা মুরগি কখনোই বিক্রি, জবাই বা খাওয়া যাবে না",
                    "খামার থেকে মুরগি, ডিম, লিটার ও যন্ত্রপাতি বাইরে নেওয়া বন্ধ করুন",
                    "মুরগির ঘরে ঢোকার পর সাবান দিয়ে হাত ধুয়ে কাপড় বদলে ফেলুন",
                ],
            },
            "effectiveness": {
                "en": "Control depends entirely on how fast the case is reported and official quarantine begins, not on any treatment",
                "bn": "কোনো চিকিৎসার ওপর নয় — কত দ্রুত রোগটি জানানো হলো ও সরকারি কোয়ারেন্টাইন শুরু হলো, নিয়ন্ত্রণ তার ওপরই পুরোপুরি নির্ভর করে",
            },
            "requires_veterinarian": True,
            "reference": "WOAH Terrestrial Animal Health Code, Avian Influenza chapter; WOAH Terrestrial Manual; DLS Bangladesh avian influenza outbreak-response guidance.",
        },
    },
    {
        "code": "pullorum",
        "species": "POULTRY",
        "short_name": {"en": "Pullorum Disease", "bn": "পুলোরাম রোগ"},
        "name": {
            "en": "Pullorum Disease (Bacillary White Diarrhoea)",
            "bn": "পুলোরাম রোগ — বাচ্চার সাদা পায়খানা (Pullorum Disease)",
        },
        "description": {
            "en": "A bacterial disease of chicks caused by Salmonella Pullorum, passed from hen to chick through the egg. Birds that survive stay carriers for life, so it is controlled by testing and removing carriers rather than by dosing.",
            "bn": "স্যালমোনেলা পুলোরাম (Salmonella Pullorum) ব্যাকটেরিয়ার কারণে বাচ্চা মুরগির রোগ, যা ডিমের মাধ্যমে মা-মুরগি থেকে বাচ্চায় ছড়ায়। বেঁচে যাওয়া মুরগি সারা জীবন জীবাণু বহন করে, তাই ওষুধ দিয়ে নয় — পরীক্ষা করে বাহক মুরগি সরিয়ে ফেলেই এ রোগ নিয়ন্ত্রণ করা হয়।",
        },
        "diagnosis": {
            "en": "Veterinary examination with bacterial culture, or an approved serological test (rapid whole-blood agglutination) on the breeding flock",
            "bn": "পশু চিকিৎসকের পরীক্ষা ও ব্যাকটেরিয়া কালচার, অথবা ব্রিডার মুরগির ওপর অনুমোদিত সেরোলজিক্যাল পরীক্ষা (দ্রুত রক্ত পরীক্ষা / rapid whole-blood agglutination)",
        },
        "contagious": True,
        "severity": "HIGH",
        "notifiable": True,
        "zoonotic": False,
        "symptoms": [
            {
                "en": "Chalky white, pasty diarrhoea in chicks",
                "bn": "বাচ্চা মুরগির চুনের মতো সাদা, আঠালো পায়খানা",
            },
            {
                "en": "Droppings sticking around and blocking the vent",
                "bn": "পায়খানা শুকিয়ে পায়ুপথের চারপাশে লেগে গিয়ে পথ বন্ধ হয়ে যাওয়া",
            },
            {
                "en": "Chicks huddling near the heat source, weak and sleepy",
                "bn": "বাচ্চা তাপের উৎসের কাছে গুটিসুটি মেরে বসে থাকা, দুর্বল ও ঝিমানো",
            },
            {
                "en": "Loss of appetite and stunted growth",
                "bn": "খাওয়ার রুচি কমে যাওয়া ও বৃদ্ধি ব্যাহত হওয়া",
            },
            {
                "en": "Laboured breathing with gasping in some chicks",
                "bn": "কিছু বাচ্চার শ্বাসকষ্ট ও হাঁ করে শ্বাস নেওয়া",
            },
            {
                "en": "High death rate in the first 2–3 weeks of life",
                "bn": "জীবনের প্রথম ২–৩ সপ্তাহে উচ্চ মৃত্যুহার",
            },
        ],
        "treatment": {
            "code": "TRT-POULTRY-PULLORUM",
            "name": {
                "en": "Pullorum Disease — Testing and Carrier Removal",
                "bn": "পুলোরাম রোগ (Pullorum Disease) — পরীক্ষা ও বাহক মুরগি অপসারণ",
            },
            "medication": {
                "en": "Antibiotics are not a cure — they reduce deaths but leave surviving birds as lifelong carriers. Any medicine must be chosen by a veterinarian.",
                "bn": "অ্যান্টিবায়োটিক এ রোগ সারায় না — এতে মৃত্যু কমলেও বেঁচে যাওয়া মুরগি সারা জীবন জীবাণু বহন করে। যেকোনো ওষুধ পশু চিকিৎসককেই বেছে দিতে হবে।",
            },
            "method": "VETERINARY_RESPONSE",
            "dosage": {
                "en": "Do not start antibiotics on your own. Get the diagnosis confirmed first, because treating without testing hides the carriers and spreads the disease to the next batch of chicks. A veterinarian will advise whether medication is justified at all, and will arrange blood testing of the breeding flock so that positive birds can be removed.",
                "bn": "নিজে থেকে অ্যান্টিবায়োটিক শুরু করবেন না। আগে রোগ নিশ্চিত করুন, কারণ পরীক্ষা ছাড়া ওষুধ দিলে বাহক মুরগি আড়ালে থেকে যায় এবং পরের ব্যাচের বাচ্চায় রোগ ছড়ায়। ওষুধ আদৌ দরকার কিনা পশু চিকিৎসক সিদ্ধান্ত দেবেন এবং ব্রিডার মুরগির রক্ত পরীক্ষার ব্যবস্থা করবেন, যাতে পজিটিভ মুরগি সরিয়ে ফেলা যায়।",
            },
            "duration_days": None,
            "precaution": {
                "en": "Separate the affected chicks at once. Stop hatching eggs from the affected flock and stop selling chicks until testing is done. Clean and disinfect the incubator, hatcher, chick boxes and brooder house thoroughly. Buy chicks only from a hatchery that tests its breeders for pullorum.",
                "bn": "আক্রান্ত বাচ্চা সাথে সাথে আলাদা করুন। আক্রান্ত খামারের ডিম থেকে বাচ্চা ফোটানো বন্ধ করুন এবং পরীক্ষা শেষ না হওয়া পর্যন্ত বাচ্চা বিক্রি বন্ধ রাখুন। ইনকিউবেটর, হ্যাচার, বাচ্চার বাক্স ও ব্রুডার ঘর ভালোভাবে পরিষ্কার ও জীবাণুমুক্ত করুন। যে হ্যাচারি তাদের ব্রিডার মুরগি পুলোরামের জন্য পরীক্ষা করে, শুধু সেখান থেকেই বাচ্চা কিনুন।",
            },
            "alternatives": {
                "en": "There is no alternative that removes the carrier state. Long-term control is based on buying certified pullorum-free stock, testing breeders and keeping hatchery hygiene tight.",
                "bn": "জীবাণু বহনের অবস্থা দূর করার মতো কোনো বিকল্প নেই। দীর্ঘমেয়াদি নিয়ন্ত্রণের ভিত্তি হলো পুলোরাম-মুক্ত সনদপ্রাপ্ত বাচ্চা কেনা, ব্রিডার মুরগি পরীক্ষা করা ও হ্যাচারির পরিচ্ছন্নতা কঠোরভাবে বজায় রাখা।",
            },
            "summary": {
                "en": "Laboratory confirmation, removal of carrier birds, strict hatchery hygiene and disease-free breeding stock",
                "bn": "ল্যাবে রোগ নিশ্চিতকরণ, বাহক মুরগি অপসারণ, হ্যাচারির কঠোর পরিচ্ছন্নতা ও রোগমুক্ত ব্রিডার মুরগি",
            },
            "medication_summary": {
                "en": "Only under veterinary direction — medication does not clear the carrier state",
                "bn": "শুধু পশু চিকিৎসকের নির্দেশে — ওষুধে জীবাণু বহনের অবস্থা দূর হয় না",
            },
            "precautions": {
                "en": [
                    "Separate affected chicks immediately",
                    "Stop hatching eggs and selling chicks from the affected flock",
                    "Disinfect the incubator, hatcher and brooder house",
                    "Have the breeding flock blood-tested and remove positive birds",
                    "Buy chicks only from hatcheries that test for pullorum",
                    "Wash hands and change footwear between chick batches",
                ],
                "bn": [
                    "আক্রান্ত বাচ্চা অবিলম্বে আলাদা করুন",
                    "আক্রান্ত খামারের ডিম ফোটানো ও বাচ্চা বিক্রি বন্ধ করুন",
                    "ইনকিউবেটর, হ্যাচার ও ব্রুডার ঘর জীবাণুমুক্ত করুন",
                    "ব্রিডার মুরগির রক্ত পরীক্ষা করিয়ে পজিটিভ মুরগি সরিয়ে ফেলুন",
                    "যারা পুলোরাম পরীক্ষা করে, শুধু সেসব হ্যাচারি থেকে বাচ্চা কিনুন",
                    "এক ব্যাচ থেকে আরেক ব্যাচে যাওয়ার আগে হাত ধুয়ে জুতা বদলান",
                ],
            },
            "effectiveness": {
                "en": "Best controlled by testing and carrier removal; medication alone lowers deaths but keeps the infection in the flock",
                "bn": "পরীক্ষা করে বাহক মুরগি সরিয়ে ফেলাই সবচেয়ে কার্যকর; শুধু ওষুধে মৃত্যু কমে ঠিকই, কিন্তু খামারে রোগ থেকেই যায়",
            },
            "requires_veterinarian": True,
            "reference": "WOAH Terrestrial Manual, Fowl Typhoid and Pullorum Disease chapter; Barrow, P.A. & Methner, U. (eds.) (2013). Salmonella in Domestic Animals, 2nd ed.",
        },
    },
    {
        "code": "salmo",
        "species": "POULTRY",
        "short_name": {"en": "Salmonellosis", "bn": "স্যালমোনেলোসিস"},
        "name": {
            "en": "Salmonellosis (Paratyphoid)",
            "bn": "স্যালমোনেলোসিস — প্যারাটাইফয়েড (Salmonellosis)",
        },
        "description": {
            "en": "A bacterial infection that also causes food poisoning in people through contaminated meat and eggs. Any antibiotic must be chosen from laboratory sensitivity results.",
            "bn": "ব্যাকটেরিয়াজনিত সংক্রমণ, যা দূষিত মাংস ও ডিমের মাধ্যমে মানুষেরও খাদ্যে বিষক্রিয়া (food poisoning) ঘটায়। যেকোনো অ্যান্টিবায়োটিক ল্যাবের সংবেদনশীলতা পরীক্ষার (sensitivity test) ফল দেখেই বেছে নিতে হবে।",
        },
        "diagnosis": {
            "en": "Bacterial culture from droppings or organs, followed by antimicrobial sensitivity testing to decide which medicine will actually work",
            "bn": "পায়খানা বা অঙ্গ থেকে ব্যাকটেরিয়া কালচার, এরপর কোন ওষুধ আসলে কাজ করবে তা ঠিক করতে সংবেদনশীলতা পরীক্ষা (antimicrobial sensitivity test)",
        },
        "contagious": True,
        "severity": "HIGH",
        "notifiable": False,
        "zoonotic": True,
        "symptoms": [
            {
                "en": "Watery yellowish or greenish diarrhoea",
                "bn": "পানির মতো হলদেটে বা সবুজাভ পায়খানা",
            },
            {
                "en": "Dehydration, drooping and ruffled feathers",
                "bn": "পানিশূন্যতা, ঝিমিয়ে পড়া ও পালক উষ্কখুষ্ক হয়ে যাওয়া",
            },
            {"en": "Reduced appetite and thirst for water", "bn": "খাওয়ার রুচি কমে যাওয়া ও বেশি পানি পান করা"},
            {
                "en": "Weakness, poor growth and uneven flock",
                "bn": "দুর্বলতা, বৃদ্ধি কমে যাওয়া ও খামারের মুরগিতে অসমতা",
            },
            {
                "en": "Drop in egg production and hatchability",
                "bn": "ডিম উৎপাদন ও ডিম থেকে বাচ্চা ফোটার হার কমে যাওয়া",
            },
            {
                "en": "Increased mortality, highest in young birds",
                "bn": "মৃত্যুহার বেড়ে যাওয়া, বিশেষ করে অল্পবয়সী মুরগিতে",
            },
        ],
        "treatment": {
            "code": "TRT-POULTRY-SALMONELLOSIS",
            "name": {
                "en": "Salmonellosis — Veterinary-Directed Treatment After Sensitivity Testing",
                "bn": "স্যালমোনেলোসিস (Salmonellosis) — সংবেদনশীলতা পরীক্ষার পর পশু চিকিৎসকের নির্দেশে চিকিৎসা",
            },
            "medication": {
                "en": "An antimicrobial chosen by a veterinarian from laboratory sensitivity results, with electrolytes and probiotics as support",
                "bn": "ল্যাবের সংবেদনশীলতা পরীক্ষার ফল দেখে পশু চিকিৎসকের বেছে দেওয়া অ্যান্টিমাইক্রোবিয়াল, সাথে সহায়ক হিসেবে ইলেকট্রোলাইট ও প্রোবায়োটিক",
            },
            "method": "VETERINARY_RESPONSE",
            "dosage": {
                "en": "Do not pick an antibiotic yourself. Salmonella in Bangladesh is often already resistant to the commonly sold antibiotics, so treating blind usually fails and makes the resistance worse. Send samples for culture and sensitivity testing, and use only the medicine, dose and duration the veterinarian prescribes from that result. Give electrolytes in the drinking water to replace fluid lost through diarrhoea.",
                "bn": "নিজে থেকে অ্যান্টিবায়োটিক বেছে নেবেন না। বাংলাদেশে স্যালমোনেলা ব্যাকটেরিয়া বাজারে সহজলভ্য অনেক অ্যান্টিবায়োটিকের বিরুদ্ধে আগে থেকেই প্রতিরোধী, তাই না জেনে ওষুধ দিলে সাধারণত কাজ হয় না, বরং ওষুধ-প্রতিরোধ আরও বাড়ে। নমুনা পাঠিয়ে কালচার ও সংবেদনশীলতা পরীক্ষা করান এবং সেই ফল অনুযায়ী পশু চিকিৎসক যে ওষুধ, মাত্রা ও মেয়াদ লিখে দেবেন শুধু সেটাই ব্যবহার করুন। পাতলা পায়খানায় হারানো পানি পূরণ করতে খাবার পানিতে ইলেকট্রোলাইট দিন।",
            },
            "duration_days": None,
            "precaution": {
                "en": "This infection passes to people through undercooked meat and eggs, so handle birds with care and wash hands with soap afterwards. Isolate affected birds, disinfect the house, drinkers and feeders, and protect feed and water from rodents and wild birds. Observe the withdrawal period strictly before selling meat or eggs.",
                "bn": "আধা-সেদ্ধ মাংস ও ডিমের মাধ্যমে এই সংক্রমণ মানুষের শরীরে ছড়ায়, তাই মুরগি নাড়াচাড়ার পর সাবান দিয়ে ভালোভাবে হাত ধুয়ে ফেলুন। আক্রান্ত মুরগি আলাদা করুন, ঘর ও পানি-খাবারের পাত্র জীবাণুমুক্ত করুন এবং খাবার ও পানি ইঁদুর ও বুনো পাখির নাগাল থেকে রক্ষা করুন। মাংস বা ডিম বিক্রির আগে প্রত্যাহারকাল (withdrawal period) কঠোরভাবে মেনে চলুন।",
            },
            "alternatives": {
                "en": "Sanitation, rodent and wild-bird control, clean feed and water, and probiotics (competitive exclusion) do more for long-term control than repeated antibiotic courses.",
                "bn": "বারবার অ্যান্টিবায়োটিক কোর্স দেওয়ার চেয়ে পরিচ্ছন্নতা, ইঁদুর ও বুনো পাখি নিয়ন্ত্রণ, পরিষ্কার খাবার ও পানি এবং প্রোবায়োটিক ব্যবহারে দীর্ঘমেয়াদে অনেক ভালো ফল পাওয়া যায়।",
            },
            "summary": {
                "en": "Culture and sensitivity testing first, then veterinarian-directed treatment with strict sanitation and food-safety measures",
                "bn": "আগে কালচার ও সংবেদনশীলতা পরীক্ষা, এরপর পশু চিকিৎসকের নির্দেশে চিকিৎসা, সাথে কঠোর পরিচ্ছন্নতা ও খাদ্য-নিরাপত্তা",
            },
            "medication_summary": {
                "en": "Selected from laboratory sensitivity results — never chosen at the shop counter",
                "bn": "ল্যাবের সংবেদনশীলতা পরীক্ষার ফল দেখে বেছে নেওয়া — দোকান থেকে নিজে কিনে নয়",
            },
            "precautions": {
                "en": [
                    "Isolate affected birds",
                    "Send samples for culture and sensitivity testing before treating",
                    "Disinfect the house, drinkers and feeders",
                    "Protect feed and water from rodents and wild birds",
                    "Wash hands with soap after handling birds",
                    "Follow food-safety rules and withdrawal periods before selling meat or eggs",
                ],
                "bn": [
                    "আক্রান্ত মুরগি আলাদা করুন",
                    "চিকিৎসা শুরুর আগে নমুনা পাঠিয়ে কালচার ও সংবেদনশীলতা পরীক্ষা করান",
                    "ঘর ও পানি-খাবারের পাত্র জীবাণুমুক্ত করুন",
                    "খাবার ও পানি ইঁদুর ও বুনো পাখির নাগাল থেকে রক্ষা করুন",
                    "মুরগি নাড়াচাড়ার পর সাবান দিয়ে হাত ধুয়ে ফেলুন",
                    "মাংস বা ডিম বিক্রির আগে খাদ্য-নিরাপত্তা নিয়ম ও প্রত্যাহারকাল মেনে চলুন",
                ],
            },
            "effectiveness": {
                "en": "Varies with the sensitivity result; sanitation and prevention matter more than treatment for long-term control",
                "bn": "সংবেদনশীলতা পরীক্ষার ফলের ওপর নির্ভর করে; দীর্ঘমেয়াদি নিয়ন্ত্রণে চিকিৎসার চেয়ে পরিচ্ছন্নতা ও প্রতিরোধই বেশি গুরুত্বপূর্ণ",
            },
            "requires_veterinarian": True,
            "reference": "EFSA (2019). Salmonella control in poultry flocks. EFSA Journal 17(2), e05596; Barrow, P.A. & Methner, U. (eds.) (2013). Salmonella in Domestic Animals, 2nd ed.; WOAH Terrestrial Manual, Salmonellosis chapter.",
        },
    },
]
