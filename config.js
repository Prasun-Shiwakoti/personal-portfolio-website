/* ============================================================================
   CONFIG  ──  everything about you lives here.
   To update the site later, change values in this one object. No HTML editing.
   ============================================================================ */
const CONFIG = {

  /* page <title> and meta description */
  meta:{
    title:"Prasun Shiwakoti, Full-Stack / Python Developer",
    description:"Prasun Shiwakoti, full-stack and Python developer in Kathmandu building production backends, ML pipelines and full-stack products."
  },

  /* personal details, links and the round photo */
  profile:{
    firstName:"Prasun",
    lastName:"Shiwakoti",
    roleTag:"Full-stack / Python / ML",     /* shown in the hero eyebrow */
    photo:"profile.png",                     /* put your photo next to index.html. Falls back to a monogram if missing */
    availableLabel:"Open to work",
    location:"Kathmandu, Nepal",
    timezone:"Asia/Kathmandu",               /* used by the live clock in the footer */
    email:"prasunshiwakoti@gmail.com",
    phone:"+977 9861812959",                 /* display version */
    phoneHref:"+9779861812959",              /* tel: version, digits only */
    github:"https://github.com/Prasun-Shiwakoti",
    linkedin:"https://www.linkedin.com/in/prasun-shiwakoti-9570581b3/",
    badgeText:"available for work · full-stack dev · "  /* rotating ring around the photo */
  },

  /* hero headline. Each inner array is one line; mark a segment accent:true to colour it */
  hero:{
    headline:[
      [{t:"I build"}],
      [{t:"full-stack"}],
      [{t:"things that "},{t:"ship.",accent:true}]
    ],
    lede:"A developer in Kathmandu who likes turning fuzzy ideas into software that actually runs in production. Backend heavy, full-stack curious.",
    ctaPrimary:{label:"Selected work",href:"#work"},
    ctaSolid:{label:"Let’s talk",href:"#contact"}
  },

  /* about section copy */
  about:{
    headRight:"Based in Kathmandu, Nepal. Studying Computer Engineering and shipping for real businesses on the side.",
    lead:"I’m Prasun, a developer who likes owning a problem from the database all the way to the pixel. Most days that means Python and Django, but I’m just as happy in React, wiring up infra, or training a model.",
    sub:"I care about software that is stable, observable and actually shipped, not just a demo. Outside of work I’m usually reading about machine learning, helping run my college’s tech community, or taking something apart to see how it works."
  },

  /* the four about-section stats. value=number animates and counts up; if you want a
     non-numeric stat (like infinity), set value:null and provide display instead */
  stats:[
    {value:15, suffix:"+", label:"Projects built"},
    {value:5,  suffix:"+", label:"Years writing code"},
    {value:20, suffix:"+", label:"Technologies used"},
    {value:null, display:"∞", label:"Cups of coffee per merge"}
  ],

  /* words that scroll across the kinetic band */
  kinetic:["Python","Django","FastAPI","Flask","React","PostgreSQL","Docker","CI/CD","PyTorch","TensorFlow","scikit-learn","Pandas","SQL","Linux","REST APIs"],

  /* selected work. Add/remove cards by editing this array */
  projects:[
    {n:"01", t:"AI Social-Media Automation", d:"Automates content creation and scheduling, with sentiment analysis to read how an audience responds.", tags:["Python","LLM","Sentiment"], url:"https://github.com/Prasun-Shiwakoti/Social-Media-Manager-AI"},
    {n:"02", t:"Multi-Agent Research System", d:"Coordinated LLM agents that gather, cross check and synthesize competitive market intelligence.", tags:["Multi-Agent","LLM","Python"], url:"https://github.com/Prasun-Shiwakoti/Multi-Agent-Competitive-Intelligence-Research-System"},
    {n:"03", t:"News-Powered Market Analysis", d:"Fuses news sentiment with price data using LSTM and XGBoost to forecast market movement.", tags:["LSTM","XGBoost","Pandas"], url:"https://github.com/Prasun-Shiwakoti/News-Powered-Stock-Market-Analysis"},
    {n:"04", t:"Transformer From Scratch", d:"A transformer built from first principles. Attention, encoding and training with no high level shortcuts.", tags:["PyTorch","NLP","From scratch"], url:"https://github.com/Prasun-Shiwakoti/transformer-from-scratch"},
    {n:"05", t:"CoCo, AI Study Assistant", d:"A personalized study companion that adapts explanations and practice to how you learn.", tags:["Python","ML","Product"], url:"https://github.com/Prasun-Shiwakoti/CoCo"},
    {n:"06", t:"Heart-Disease Prediction API", d:"A production REST API serving an ML model for cardiac risk prediction from patient data.", tags:["FastAPI","scikit-learn","REST"], url:"https://github.com/Prasun-Shiwakoti/heart-disease-api"}
  ],

  /* work experience. Add a new job by copying one object into this array */
  experience:[
    {when:"Sept 2025 to Present", role:"Full-Stack Web Developer", org:"Magniment IT Pvt. Ltd.", points:[
      "Independently manage a high volume WhatsApp marketing platform serving 500+ active businesses and 50,000+ messages a day.",
      "Resolved critical architectural flaws and cleared 40+ production bugs left by the previous team, improving stability.",
      "Architected and shipped a full e-commerce website builder in Django, with drag and drop UI, inventory and payments, letting 100+ non technical users launch stores."
    ]},
    {when:"May 2025 to Dec 2025", role:"AI Fellow", org:"Fusemachines AI Fellowship 2025", points:[
      "Completed a fully funded 6 month AI Microdegree, with a capstone on news powered stock market analysis using LSTM and XGBoost.",
      "Built production ML systems using 12 Factor methodology, Docker and GitHub Actions CI/CD, applying MLOps for versioning and monitoring.",
      "Engineered end to end data pipelines over 10,000+ records with Pandas and SQL, plus dashboards in Matplotlib and Seaborn."
    ]}
  ],

  /* education (single block) */
  education:{
    degree:"B.E. Computer Engineering",
    meta:"Kathmandu Engineering College · 2023 to Present",
    detail:"Full scholarship on an IOE entrance rank of 320, current average 83%. Vice President, KEC IT Club."
  },

  /* earlier highlights. 'pop' is the small highlighted metric in the title */
  highlights:[
    {title:"Hackathon Winner, Provathon 2020", pop:"", meta:"CSIT Association of Nepal", detail:"Full-stack health monitoring app with an ML model predicting cardiac arrest events from real-time data."},
    {title:"President, CS Club", pop:"", meta:"Kathmandu Model College · 2020 to 2022", detail:"Drove a 25% rise in sign-ups and ran bootcamps on cybersecurity, Python and web development."}
  ],

  /* certifications (horizontal cards) */
  certs:[
    {issuer:"Fusemachines", title:"Microdegree™ in Artificial Intelligence", url:"https://s3.amazonaws.com/fuseclassroom-resources-prod/student-certificates/Microdegree%E2%84%A2+in+Artificial+Intelligence+2025-PRASUN+SHIWKAOTI.pdf"},
    {issuer:"Stanford University", title:"Machine Learning Specialization", url:"https://drive.google.com/drive/folders/17zi1_Wkko2qgP2ovTAr1cvHg_1dhdsCl?usp=sharing"},
    {issuer:"Udemy", title:"Complete Web Development Bootcamp", url:"https://drive.google.com/file/d/1KIbWk09eReShq8HwVO2PnMNuOdtDoLJ8/view?usp=drive_link"},
    {issuer:"Programiz", title:"Master DSA with Python", url:"https://drive.google.com/drive/folders/1jWizIKJ_6pFDRU-CmtcS6hrHVxgYGAL3?usp=drive_link"},
    {issuer:"Kaggle, Programiz", title:"Python Programming", url:"https://drive.google.com/drive/folders/1z050VClWnl4fpkyDY90hYjqVUScHnkPM?usp=drive_link"}
  ],

  /* contact section */
  contact:{
    headline:[ [{t:"Let’s build"}], [{t:"something "},{t:"real.",accent:true}] ],
    ctaLabel:"Start a conversation",
    footerNote:"Built with too much coffee"
  },

  /* nav + mobile menu links */
  nav:[
    {label:"About", href:"#about"},
    {label:"Work", href:"#work"},
    {label:"Experience", href:"#experience"},
    {label:"Contact", href:"#contact"}
  ]
};

/* small helper: build the inner HTML of a headline line from its segments */
function lineSegments(segs){
  return segs.map(s => s.accent ? `<span class="it">${s.t}</span>` : s.t).join('');
}
