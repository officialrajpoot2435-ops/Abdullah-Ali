const ENTRY_DATA = {
  ECAT: {
    icon: "⚙️",
    title: "ECAT",
    description: "Engineering and computing entry-test preparation.",
    subjects: ["Mathematics", "Physics", "Chemistry", "English"],

    universities: [
      ["UET Lahore", "Lahore", "Engineering & Computing", "https://uet.edu.pk/"],
      ["NUST", "Islamabad", "Engineering & Computing", "https://nust.edu.pk/"],
      ["FAST-NUCES", "Multiple campuses", "Computing & Engineering", "https://www.nu.edu.pk/"],
      ["GIKI", "Topi, Khyber Pakhtunkhwa", "Engineering & Computing", "https://giki.edu.pk/"],
      ["COMSATS University Islamabad", "Multiple campuses", "Engineering & Computing", "https://www.comsats.edu.pk/"],
      ["PIEAS", "Islamabad", "Engineering & Sciences", "https://www.pieas.edu.pk/"]
    ],

    syllabus: {
      Mathematics: [
        "Algebra",
        "Functions",
        "Trigonometry",
        "Coordinate Geometry",
        "Calculus",
        "Vectors"
      ],

      Physics: [
        "Measurements",
        "Vectors",
        "Motion",
        "Force",
        "Work & Energy",
        "Waves",
        "Electricity"
      ],

      Chemistry: [
        "Basic Concepts",
        "Atomic Structure",
        "Chemical Bonding",
        "States of Matter",
        "Equilibrium",
        "Organic Chemistry"
      ],

      English: [
        "Vocabulary",
        "Grammar",
        "Sentence Completion",
        "Reading Comprehension"
      ]
    },

    papers: [
      [
        "Official UET admission information",
        "https://uet.edu.pk/"
      ],
      [
        "Official NUST admissions information",
        "https://nust.edu.pk/"
      ]
    ],

    questions: [
      [
        "What is the derivative of x²?",
        ["x", "2x", "x²", "2"],
        1,
        "d(x²)/dx = 2x."
      ],

      [
        "The SI unit of force is:",
        ["Joule", "Watt", "Newton", "Pascal"],
        2,
        "Force is measured in newtons (N)."
      ],

      [
        "If 2x + 5 = 15, x is:",
        ["2", "5", "10", "15"],
        1,
        "2x = 10, so x = 5."
      ],

      [
        "Acceleration is the rate of change of:",
        ["distance", "velocity", "mass", "energy"],
        1,
        "Acceleration is change in velocity per unit time."
      ],

      [
        "The value of sin 90° is:",
        ["0", "1/2", "1", "√3/2"],
        2,
        "sin 90° = 1."
      ]
    ]
  },

  BCAT: {
    icon: "📊",
    title: "BCAT",
    description: "Business, mathematics, English and analytical preparation.",
    subjects: [
      "English",
      "Mathematics",
      "Analytical Reasoning"
    ],

    universities: [
      [
        "IBA Karachi",
        "Karachi",
        "Business & Economics",
        "https://www.iba.edu.pk/"
      ],

      [
        "LUMS",
        "Lahore",
        "Business & Undergraduate",
        "https://lums.edu.pk/"
      ],

      [
        "COMSATS University Islamabad",
        "Multiple campuses",
        "Business & Undergraduate",
        "https://www.comsats.edu.pk/"
      ],

      [
        "Institute of Business Management",
        "Karachi",
        "Business & Management",
        "https://www.iobm.edu.pk/"
      ],

      [
        "SZABIST",
        "Multiple campuses",
        "Business & Management",
        "https://szabist.edu.pk/"
      ]
    ],

    syllabus: {
      English: [
        "Vocabulary",
        "Grammar",
        "Sentence Correction",
        "Reading"
      ],

      Mathematics: [
        "Percentages",
        "Ratios",
        "Algebra",
        "Equations",
        "Word Problems"
      ],

      "Analytical Reasoning": [
        "Sequences",
        "Patterns",
        "Logic",
        "Data Interpretation"
      ]
    },

    papers: [
      [
        "Official IBA admissions information",
        "https://www.iba.edu.pk/"
      ],

      [
        "Official LUMS admissions information",
        "https://lums.edu.pk/"
      ]
    ],

    questions: [
      [
        "20% of a number is 30. The number is:",
        ["100", "120", "150", "180"],
        2,
        "30 ÷ 0.20 = 150."
      ],

      [
        "Choose the correct sentence:",
        [
          "He go daily.",
          "He goes daily.",
          "He going daily.",
          "He gone daily."
        ],
        1,
        "With he/she/it in simple present, use goes."
      ],

      [
        "A ratio of 2:3 has total parts equal to:",
        ["2", "3", "5", "6"],
        2,
        "2 + 3 = 5 parts."
      ],

      [
        "If a product costs Rs. 500 and rises by 10%, the new price is:",
        ["510", "525", "550", "600"],
        2,
        "10% of 500 is 50; total = 550."
      ],

      [
        "Find the next number: 2, 4, 8, 16, ?",
        ["18", "24", "30", "32"],
        3,
        "Each number is multiplied by 2."
      ]
    ]
  },

  MDCAT: {
    icon: "🩺",
    title: "MDCAT",
    description: "Medical and dental entry-test preparation.",

    subjects: [
      "Biology",
      "Chemistry",
      "Physics",
      "English",
      "Logical Reasoning"
    ],

    universities: [
      [
        "Aga Khan University",
        "Karachi",
        "Medicine",
        "https://www.aku.edu/"
      ],

      [
        "King Edward Medical University",
        "Lahore",
        "Medicine",
        "https://kemu.edu.pk/"
      ],

      [
        "Dow University of Health Sciences",
        "Karachi",
        "Medicine",
        "https://www.duhs.edu.pk/"
      ],

      [
        "University of Health Sciences Lahore",
        "Lahore",
        "Health Sciences",
        "https://www.uhs.edu.pk/"
      ],

      [
        "Khyber Medical University",
        "Peshawar",
        "Medicine & Health Sciences",
        "https://kmu.edu.pk/"
      ],

      [
        "Liaquat University of Medical & Health Sciences",
        "Jamshoro",
        "Medicine & Health Sciences",
        "https://www.lumhs.edu.pk/"
      ]
    ],

    syllabus: {
      Biology: [
        "Cell Biology",
        "Biological Molecules",
        "Genetics",
        "Evolution",
        "Human Physiology"
      ],

      Chemistry: [
        "Basic Concepts",
        "Atomic Structure",
        "Bonding",
        "Equilibrium",
        "Organic Chemistry"
      ],

      Physics: [
        "Measurements",
        "Vectors",
        "Motion",
        "Force",
        "Energy",
        "Waves",
        "Electricity"
      ],

      English: [
        "Grammar",
        "Vocabulary",
        "Sentence Structure",
        "Comprehension"
      ],

      "Logical Reasoning": [
        "Patterns",
        "Sequences",
        "Logic",
        "Problem Solving"
      ]
    },

    papers: [
      [
        "Official UHS information",
        "https://www.uhs.edu.pk/"
      ],

      [
        "Official KMU information",
        "https://kmu.edu.pk/"
      ]
    ],

    questions: [
      [
        "The basic unit of life is:",
        ["Tissue", "Cell", "Organ", "Atom"],
        1,
        "The cell is the basic structural and functional unit of life."
      ],

      [
        "The approximate value of g near Earth's surface is:",
        ["3.8 m/s²", "7.8 m/s²", "9.8 m/s²", "12.8 m/s²"],
        2,
        "Standard gravitational acceleration is approximately 9.8 m/s²."
      ],

      [
        "A neutral solution has pH:",
        ["0", "5", "7", "14"],
        2,
        "At standard conditions, neutral pH is approximately 7."
      ],

      [
        "DNA stands for:",
        [
          "Deoxyribonucleic acid",
          "Dinitrogen acid",
          "Deoxyribose nitrogen acid",
          "Double nucleic acid"
        ],
        0,
        "DNA = deoxyribonucleic acid."
      ],

      [
        "The powerhouse of the cell is commonly called the:",
        [
          "Nucleus",
          "Ribosome",
          "Mitochondrion",
          "Golgi body"
        ],
        2,
        "Mitochondria are the main sites of aerobic ATP production."
      ]
    ]
  }
};
