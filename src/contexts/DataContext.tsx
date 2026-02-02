import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PersonalInfo {
  name: string;
  title: string;
  currentPosition: string;
  description: string;
  location: string;
  cvLink: string;
  linkedInLink: string;
  badges: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  achievements?: string[];
  visible: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  status: string;
  period?: string;
  visible: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  link?: string;
  date?: string;
  credentialUrl?: string;
  visible: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  date: string;
  tags: string[];
  readTime?: string;
  featured: boolean;
  visible: boolean;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  availability?: string;
  additionalLinks: { name: string; url: string }[];
}

interface DataContextType {
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: PersonalInfo) => void;
  experiences: Experience[];
  updateExperiences: (experiences: Experience[]) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  education: Education[];
  updateEducation: (education: Education[]) => void;
  addEducation: (edu: Omit<Education, 'id'>) => void;
  updateEducationItem: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  certifications: Certification[];
  updateCertifications: (certs: Certification[]) => void;
  addCertification: (cert: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  articles: Article[];
  updateArticles: (articles: Article[]) => void;
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  contactInfo: ContactInfo;
  updateContactInfo: (info: ContactInfo) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Default data from existing portfolio
const defaultPersonalInfo: PersonalInfo = {
  name: "Efstathios Georgopoulos",
  title: "Financial Crime Compliance Quality Assurance Analyst",
  currentPosition: "Currently at Ebury - Leading Quality Assurance in Financial Crime Compliance",
  description: "Multilingual Compliance & Blockchain Specialist with deep expertise in AML/CFT, fraud detection, and forensic financial analysis. Demonstrated success across banking and fintech sectors in Europe, with experience working with regulators such as BoG, FinCEN, SEPBLAC, CSSF, BaFin, FIU-IND, and SHCP.",
  location: "Madrid, Spain",
  cvLink: "https://drive.google.com/file/d/1Y0U3PSoK0kOcysbQK76HB3pFxUUOhnYy/view?usp=drive_link",
  linkedInLink: "https://www.linkedin.com/in/efstathios-georgopoulos/",
  badges: [
    "🏛️ Financial Crime Compliance",
    "⛓️ Blockchain Specialist", 
    "🎓 MSc Fintech & Blockchain",
    "📍 Madrid, Spain"
  ]
};

// Default experiences from existing resume
const defaultExperiences: Experience[] = [
  {
    id: "exp-1",
    title: "Financial Crime Compliance Quality Assurance Analyst",
    company: "Ebury",
    location: "Madrid, Spain",
    period: "May 2025 - Present",
    type: "Full-time",
    description: "Leading comprehensive quality assurance reviews across the complete client lifecycle at a leading fintech company. Conducting independent Level 3 QA assessments including client onboarding, periodic reassessments, payment and thematic monitoring, KYC regime adherence, and high-risk client management.",
    skills: ["Quality Assurance", "Financial Crime Prevention", "KYC", "Risk Assessment", "Fintech Compliance"],
    achievements: [
      "Leading Level 3 QA reviews across complete client lifecycle",
      "Ensuring regulatory compliance in fintech environment",
      "Managing complex high-risk client compliance cases"
    ],
    responsibilities: [
      "Independent Level 3 QA Reviews: Conducted comprehensive Level 3 Quality Assurance reviews across the entire client lifecycle, encompassing onboarding, reassessments, and screening for payment and transaction monitoring.",
      "Thematic Reviews and Systemic Issue Identification: Led and performed in-depth thematic reviews and deep dives to proactively identify systemic compliance issues and vulnerabilities.",
      "Feedback Management and Remedial Actions: Managed staff feedback loops arising from QA findings, ensuring clear communication and understanding of areas for improvement.",
      "Monthly QA Target Achievement: Consistently ensured the achievement of monthly QA targets, demonstrating a strong commitment to quality and efficiency in compliance operations.",
      "Cross-functional Collaboration: Collaborated extensively with Onboarding, Screening, and Reassessment teams to develop and deliver targeted training sessions.",
      "Global Compliance Initiatives: Supported global compliance deliverables by participating in calibration forums and leading KYC refresh initiatives."
    ],
    visible: true
  },
  {
    id: "exp-2", 
    title: "Compliance Assistant",
    company: "American Express",
    location: "Madrid, Spain",
    period: "September 2024 - May 2025",
    type: "Full-time",
    description: "Conducted comprehensive investigations into potential money laundering and suspicious financial activities. Created detailed reports and communications for regulatory compliance. Developed expertise in AML investigation methodologies and compliance reporting frameworks.",
    skills: ["AML Investigation", "Suspicious Activity Reports", "Financial Analysis", "Compliance Reporting"],
    achievements: [
      "Conducted meticulous AML investigations",
      "Generated comprehensive compliance reports",
      "Identified and reported suspicious activities"
    ],
    responsibilities: [
      "Financial Crime Investigations: Performed thorough investigations into potential money laundering and suspicious financial activities, leveraging various research and analytical tools.",
      "Suspicious Activity Report (SAR) Writing: Produced detailed and comprehensive reports on suspicious activities, ensuring full regulatory compliance and maintaining transactional integrity.",
      "Strategic Partnership & Knowledge Development: Built and maintained strong relationships with strategic partners across the Financial Intelligence Unit (FIU) network.",
      "EMEA Financial Crime Environment Expertise: Continuously maintained and updated knowledge of the evolving EMEA financial crime environment.",
      "KYC Procedure Management: Managed and optimized Know Your Customer (KYC) procedures using in-house tools."
    ],
    visible: true
  },
  {
    id: "exp-3",
    title: "Compliance Org Process Analyst", 
    company: "American Express",
    location: "Madrid, Spain",
    period: "June 2024 - September 2024",
    type: "Internship",
    description: "Implemented robust compliance systems aligned with regulatory requirements, utilizing blockchain analysis to strengthen compliance and security procedures. Created clear compliance workflows and training materials to ensure efficient and effective execution of compliance processes.",
    skills: ["Process Analysis", "Blockchain Analysis", "Compliance Systems", "Workflow Optimization"],
    achievements: [
      "Implemented blockchain-enhanced compliance systems",
      "Created comprehensive workflow documentation",
      "Developed training materials for compliance teams"
    ],
    responsibilities: [
      "Compliance System Implementation: Implemented robust compliance systems that were meticulously aligned with regulatory requirements, utilizing blockchain analysis techniques.",
      "Workflow Mapping & Training Development: Created clear, efficient compliance workflows and developed comprehensive training materials for analysts.",
      "Threat Detection & Automation: Utilized advanced tools like Chainalysis for AML/CFT and fraud prevention, automating key processes.",
      "Blockchain Analysis: Applied blockchain analysis techniques to monitor transactions, identify suspicious patterns, and enhance the overall security of the platform."
    ],
    visible: true
  },
  {
    id: "exp-4",
    title: "Compliance Ops Process Analyst",
    company: "Decubate", 
    location: "Madrid, Spain",
    period: "June 2024 - September 2024",
    type: "Internship",
    description: "Analyzed and optimized compliance operational processes in the blockchain and DeFi sector. Developed comprehensive compliance frameworks for digital asset operations and cryptocurrency transactions, ensuring adherence to evolving regulatory requirements.",
    skills: ["DeFi Compliance", "Digital Asset Regulation", "Process Optimization", "Blockchain Analysis"],
    achievements: [
      "Developed compliance frameworks for DeFi operations",
      "Streamlined digital asset compliance processes",
      "Enhanced regulatory reporting procedures"
    ],
    responsibilities: [
      "Compliance System Implementation: Implemented robust compliance systems that were meticulously aligned with regulatory requirements, utilizing blockchain analysis techniques.",
      "Workflow Mapping & Training Development: Created clear, efficient compliance workflows and developed comprehensive training materials for analysts.",
      "Threat Detection & Automation: Utilized advanced tools like Chainalysis for AML/CFT and fraud prevention, automating key processes.",
      "Blockchain Analysis: Applied blockchain analysis techniques to monitor transactions, identify suspicious patterns, and enhance the overall security of the platform."
    ],
    visible: true
  },
  {
    id: "exp-5",
    title: "Transaction Monitoring Office - Financial Crime Unit",
    company: "Eurobank Greece",
    location: "Athens, Greece", 
    period: "August 2023 - June 2024",
    type: "Full-time",
    description: "Specialized in transaction monitoring and suspicious activity detection within the Financial Crime Unit. Conducted detailed analysis of complex financial transactions, identified potential money laundering schemes, and prepared comprehensive investigation reports for regulatory authorities.",
    skills: ["Transaction Monitoring", "Financial Crime Detection", "AML Analysis", "Regulatory Reporting"],
    achievements: [
      "Monitored high-volume transaction flows for suspicious patterns",
      "Identified and investigated complex money laundering schemes",
      "Prepared detailed regulatory compliance reports"
    ],
    responsibilities: [
      "Transaction Surveillance Management: Managed surveillance activities across multiple sectors, utilizing Excel and PowerBI to generate clear, actionable reports.",
      "KYC Management: Handled Know Your Customer (KYC) processes with a focus on efficiency and accuracy, utilizing Jira for workflow management and Chainalysis for enhanced due diligence.",
      "Alert Handling & Escalation: Promptly flagged and escalated suspicious activity detected through transaction monitoring."
    ],
    visible: true
  },
  {
    id: "exp-6",
    title: "Fraud and AML/CFT Investigator",
    company: "National Bank of Greece",
    location: "Athens, Greece",
    period: "January 2023 - August 2023", 
    type: "Full-time",
    description: "Conducted thorough fraud investigations and Anti-Money Laundering/Combating the Financing of Terrorism (AML/CFT) assessments. Analyzed suspicious transactions, performed customer due diligence, and collaborated with law enforcement agencies on financial crime cases.",
    skills: ["Fraud Investigation", "AML/CFT", "Customer Due Diligence", "Risk Assessment"],
    achievements: [
      "Investigated complex fraud cases involving multiple jurisdictions",
      "Enhanced AML/CFT detection procedures", 
      "Collaborated with law enforcement on financial crime cases"
    ],
    responsibilities: [
      "Money Laundering Investigations: Led detailed probes into potential money laundering schemes, leveraging Excel for data manipulation and analysis, alongside internal banking tools.",
      "Comprehensive Reporting: Delivered thorough and well-structured reports on investigative findings, which were crucial for supporting compliance efforts.",
      "FIU Collaboration: Worked closely with Financial Intelligence Unit (FIU) partners, fostering strong collaborative relationships.",
      "Financial Crime Trend Awareness: Stayed current on emerging EMEA financial crime trends and typologies.",
      "Internal KYC Management: Managed internal KYC systems and processes, ensuring accurate and up-to-date client information."
    ],
    visible: true
  }
];

// Default education
const defaultEducation: Education[] = [
  {
    id: "edu-1",
    degree: "Master's in Compliance (Ongoing)",
    institution: "IMF & Universidad Católica de Ávila",
    status: "In Progress",
    visible: true
  },
  {
    id: "edu-2", 
    degree: "MSc in Fintech & Blockchain",
    institution: "ENEB & Universidad Isabel I",
    status: "Completed",
    visible: true
  },
  {
    id: "edu-3",
    degree: "BA in Spanish Language & Literature", 
    institution: "National and Kapodistrian University of Athens",
    status: "Completed",
    visible: true
  }
];

// Default certifications
const defaultCertifications: Certification[] = [
  { id: "cert-1", name: "Fintech & Digital Transformation", issuer: "University of Athens", visible: true },
  { id: "cert-2", name: "Blockchain Certification", issuer: "University of Athens", visible: true },
  { id: "cert-3", name: "AML Certifications", issuer: "Financial Crime Academy and ACAMS", visible: true },
  { id: "cert-4", name: "Business & Economics", issuer: "University of Thessaloniki", visible: true },
  { id: "cert-5", name: "GDPR Compliance", issuer: "Various Providers", visible: true },
  { id: "cert-6", name: "Crypto Compliance", issuer: "Various Providers", visible: true },
  { id: "cert-7", name: "KYC/CDD", issuer: "Various Providers", visible: true },
  { id: "cert-8", name: "Secure Payments", issuer: "Various Providers", visible: true },
  { id: "cert-9", name: "HR Certification", issuer: "Various Providers", visible: true },
  { id: "cert-10", name: "Data Analytics", issuer: "Various Providers", visible: true }
];

// Default articles from existing blog
const defaultArticles: Article[] = [
  {
    id: "article-1",
    title: "Unveiling the Shadows: Transnistria's Financial Crime and the EU's Security Imperative",
    excerpt: "Exploring the complex challenges Transnistria presents in the fight against Anti-Money Laundering (AML) and Combating the Financing of Terrorism (CFT), and its implications for EU financial security.",
    url: "https://www.linkedin.com/pulse/unveiling-shadows-transnistrias-financial-crime-eus-georgopoulos-gfzkf/",
    date: "2024",
    tags: ["AML", "CFT", "EU Security", "Financial Crime"],
    featured: true,
    visible: true
  },
  {
    id: "article-2",
    title: "Understanding Anti-Money Laundering in the Cryptocurrency Sphere",
    excerpt: "A comprehensive overview of AML measures in the cryptocurrency industry, covering KYC, CDD processes, and the importance of financial security in digital finance.",
    url: "https://www.linkedin.com/pulse/understanding-anti-money-laundering-cryptocurrency-georgopoulos-fechf/",
    date: "2024",
    tags: ["AML", "Cryptocurrency", "KYC", "Digital Finance"],
    readTime: "8 min",
    featured: false,
    visible: true
  },
  {
    id: "article-3",
    title: "Understanding the Distinctions Between AML and Anti-Fraud in Financial Crime",
    excerpt: "Analyzing the key differences between Anti-Money Laundering and Anti-Fraud measures, their unique approaches, and their combined role in financial crime prevention.",
    url: "https://www.linkedin.com/pulse/understanding-distinctions-aml-anti-fraud-crime-georgopoulos-qnuwf/",
    date: "2024",
    tags: ["AML", "Anti-Fraud", "Financial Crime", "Compliance"],
    readTime: "6 min",
    featured: false,
    visible: true
  },
  {
    id: "article-4",
    title: "Navigating the Maze of False Positives in AML",
    excerpt: "Examining the challenges of false positives in AML systems and strategies for improving detection accuracy while maintaining compliance effectiveness.",
    url: "https://www.linkedin.com/pulse/navigating-maze-false-positives-aml-efstathios-georgopoulos-ew17f/?trackingId=I08jJaoSSXuEPOEoVgwwRw%3D%3D",
    date: "2024",
    tags: ["AML", "False Positives", "Detection Systems", "Compliance"],
    readTime: "7 min",
    featured: false,
    visible: true
  },
  {
    id: "article-5",
    title: "KYT: The Future of Financial Security",
    excerpt: "Exploring Know Your Transaction (KYT) protocols and their role in the future of financial security and compliance monitoring.",
    url: "https://www.linkedin.com/pulse/kyt-future-financial-security-efstathios-georgopoulos-aqjnf/",
    date: "2024",
    tags: ["KYT", "Financial Security", "Transaction Monitoring", "Compliance"],
    readTime: "5 min",
    featured: false,
    visible: true
  },
  {
    id: "article-6",
    title: "Anti-Money Laundering (AML) and Politically Exposed Persons (PEPs)",
    excerpt: "Understanding the specific AML considerations and enhanced due diligence requirements for Politically Exposed Persons in financial compliance.",
    url: "https://www.linkedin.com/pulse/anti-money-laundering-aml-politically-exposed-persons-georgopoulos-ajnwf/",
    date: "2024",
    tags: ["AML", "PEPs", "Due Diligence", "Political Risk"],
    readTime: "9 min",
    featured: false,
    visible: true
  },
  {
    id: "article-7",
    title: "Compliance in Digital Assets and Liquidity Management: New Paradigms",
    excerpt: "Examining emerging compliance frameworks for digital assets and the evolving landscape of liquidity management in the digital economy.",
    url: "https://www.linkedin.com/pulse/compliance-digital-assets-liquidity-management-new-georgopoulos-ra5rf/",
    date: "2024",
    tags: ["Digital Assets", "Compliance", "Liquidity Management", "Fintech"],
    readTime: "10 min",
    featured: false,
    visible: true
  }
];

const defaultContactInfo: ContactInfo = {
  email: "contact@efstathios.com",
  location: "Madrid, Spain",
  additionalLinks: []
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultPersonalInfo);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [certifications, setCertifications] = useState<Certification[]>(defaultCertifications);
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);

  // Load data from localStorage on init
  useEffect(() => {
    const loadData = (key: string, defaultValue: any, setter: (value: any) => void) => {
      const saved = localStorage.getItem(`portfolio_${key}`);
      if (saved) {
        try {
          setter(JSON.parse(saved));
        } catch (error) {
          setter(defaultValue);
        }
      }
    };

    loadData('personalInfo', defaultPersonalInfo, setPersonalInfo);
    loadData('experiences', defaultExperiences, setExperiences);
    loadData('education', defaultEducation, setEducation);
    loadData('certifications', defaultCertifications, setCertifications);
    loadData('articles', defaultArticles, setArticles);
    loadData('contactInfo', defaultContactInfo, setContactInfo);
  }, []);

  // Save to localStorage when data changes
  const saveData = (key: string, data: any) => {
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(data));
  };

  const updatePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfo(info);
    saveData('personalInfo', info);
  };

  const updateExperiences = (exps: Experience[]) => {
    setExperiences(exps);
    saveData('experiences', exps);
  };

  const addExperience = (exp: Omit<Experience, 'id'>) => {
    const newExp = { ...exp, id: Date.now().toString() };
    const newExps = [...experiences, newExp];
    updateExperiences(newExps);
  };

  const updateExperience = (id: string, expUpdate: Partial<Experience>) => {
    const newExps = experiences.map(exp => 
      exp.id === id ? { ...exp, ...expUpdate } : exp
    );
    updateExperiences(newExps);
  };

  const deleteExperience = (id: string) => {
    const newExps = experiences.filter(exp => exp.id !== id);
    updateExperiences(newExps);
  };

  const updateEducation = (edu: Education[]) => {
    setEducation(edu);
    saveData('education', edu);
  };

  const addEducation = (edu: Omit<Education, 'id'>) => {
    const newEdu = { ...edu, id: Date.now().toString() };
    const newEducation = [...education, newEdu];
    updateEducation(newEducation);
  };

  const updateEducationItem = (id: string, eduUpdate: Partial<Education>) => {
    const newEducation = education.map(edu => 
      edu.id === id ? { ...edu, ...eduUpdate } : edu
    );
    updateEducation(newEducation);
  };

  const deleteEducation = (id: string) => {
    const newEducation = education.filter(edu => edu.id !== id);
    updateEducation(newEducation);
  };

  const updateCertifications = (certs: Certification[]) => {
    setCertifications(certs);
    saveData('certifications', certs);
  };

  const addCertification = (cert: Omit<Certification, 'id'>) => {
    const newCert = { ...cert, id: Date.now().toString() };
    const newCerts = [...certifications, newCert];
    updateCertifications(newCerts);
  };

  const updateCertification = (id: string, certUpdate: Partial<Certification>) => {
    const newCerts = certifications.map(cert => 
      cert.id === id ? { ...cert, ...certUpdate } : cert
    );
    updateCertifications(newCerts);
  };

  const deleteCertification = (id: string) => {
    const newCerts = certifications.filter(cert => cert.id !== id);
    updateCertifications(newCerts);
  };

  const updateArticles = (arts: Article[]) => {
    setArticles(arts);
    saveData('articles', arts);
  };

  const addArticle = (article: Omit<Article, 'id'>) => {
    const newArticle = { ...article, id: Date.now().toString() };
    const newArticles = [...articles, newArticle];
    updateArticles(newArticles);
  };

  const updateArticle = (id: string, articleUpdate: Partial<Article>) => {
    const newArticles = articles.map(article => 
      article.id === id ? { ...article, ...articleUpdate } : article
    );
    updateArticles(newArticles);
  };

  const deleteArticle = (id: string) => {
    const newArticles = articles.filter(article => article.id !== id);
    updateArticles(newArticles);
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
    saveData('contactInfo', info);
  };

  const value = {
    personalInfo,
    updatePersonalInfo,
    experiences,
    updateExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
    education,
    updateEducation,
    addEducation,
    updateEducationItem,
    deleteEducation,
    certifications,
    updateCertifications,
    addCertification,
    updateCertification,
    deleteCertification,
    articles,
    updateArticles,
    addArticle,
    updateArticle,
    deleteArticle,
    contactInfo,
    updateContactInfo
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};