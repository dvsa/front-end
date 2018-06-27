'use strict';

var _register = require('./register');

let allDepartments = [{ value: '0', text: 'Select an organisation' }, { value: '1', text: 'Cabinet Office' }, { value: '2', text: 'Department of Health and Social Care' }, { value: '3', text: 'HM Revenue & Customs' }, { value: '4', text: 'Other' }];

module.exports.allDepartments = allDepartments;

let allProfessions = [{ value: '0', text: 'Analysis' }, { value: '1', text: 'Commercial' }, { value: '2', text: 'Communications' }, { value: '3', text: 'Corporate finance' }, { value: '4', text: 'Digital, Data and Technology' }, { value: '5', text: 'Finance' }, { value: '6', text: 'Fraud, error, debt and grants' }, { value: '7', text: 'Human resources' }, { value: '8', text: 'Internal audit' }, { value: '9', text: 'Legal' }, { value: '10', text: 'Project delivery' }, { value: '11', text: 'Property' }, { value: '12', text: 'Other' }];

module.exports.allProfessions = allProfessions;

let allProfessionsInterest = [{ value: '1', text: 'Commercial' }, { value: '2', text: 'Communications' }, { value: '3', text: 'Corporate finance' }, { value: '4', text: 'Digital, Data and Technology' }, { value: '5', text: 'Finance' }, { value: '6', text: 'Fraud, error, debt and grants' }, { value: '7', text: 'Human resources' }, { value: '8', text: 'Internal audit' }, { value: '9', text: 'Legal' }, { value: '10', text: 'Project delivery' }, { value: '11', text: 'Property' }, { value: '12', text: 'Other' }, { value: '12', text: 'Leadership' }, { value: '12', text: 'Fast stream' }, { value: '12', text: 'Contract management' }];

module.exports.allProfessionsInterest = allProfessionsInterest;

// **************************************************************
// DDAT
// **************************************************************
let allDdatRoles = [{ value: '1', text: 'Data' }, { value: '2', text: 'IT Operations' }, { value: '3', text: 'Product and delivery' }, { value: '4', text: 'QAT' }, { value: '5', text: 'Technical' }, { value: '6', text: 'User centred design' }];
module.exports.allDdatRoles = allDdatRoles;

let allDdatDataRoles = [{ value: '1', text: 'Data engineer' }, { value: '2', text: 'Data scientist' }, { value: '3', text: 'Performance analyst' }];
module.exports.allDdatDataRoles = allDdatDataRoles;

let allDdatOperationsRoles = [{ value: '1', text: 'Business relationship manager' }, { value: '2', text: 'Change and release manager' }, { value: '3', text: 'Command and control centre manager' }, { value: '4', text: 'Engineer - application operations' }, { value: '5', text: 'Engineer - end user computing' }, { value: '6', text: 'Engineer - infrastructure operations' }, { value: '7', text: 'Incident manager' }, { value: '8', text: 'IT service manager' }, { value: '9', text: 'Problem manager' }, { value: '10', text: 'Service desk manager' }, { value: '11', text: 'Service transition manager' }];
module.exports.allDdatOperationsRoles = allDdatOperationsRoles;

let allDdatProductRoles = [{
  value: '1',
  text: 'Business analyst',
  subRoles: [{ value: '1', text: 'Principal business analyst' }, { value: '2', text: 'Senior business analyst' }, { value: '3', text: 'Business analyst' }, { value: '4', text: 'Junior business analyst' }]
}, {
  value: '2',
  text: 'Delivery manager',
  subRoles: [{ value: '1', text: 'Head of (agile) delivery management' }, { value: '2', text: 'Senior delivery manager' }, { value: '3', text: 'Delivery manager' }, { value: '4', text: 'Associate delivery manager' }]
}, {
  value: '3',
  text: 'Product manager'
}, { value: '4', text: 'Programme delivery manager' }, { value: '5', text: 'Service owner' }];
module.exports.allDdatProductRoles = allDdatProductRoles;

let allCommercialRoles = [{ value: '1', text: 'Strategy and Policy Development' }, { value: '2', text: 'Business Needs and Sourcing' }, { value: '3', text: 'Procurement' }, { value: '4', text: 'Contract and Supplier Management' }, { value: '5', text: 'Category Management' }];

module.exports.allCommercialRoles = allCommercialRoles;

let allGrades = [{ value: '1', text: 'Administrative assistant' }, { value: '2', text: 'Administrative officer' }, { value: '3', text: 'Executive officer' }, { value: '4', text: 'Higher executive officer' }, { value: '5', text: 'Senior executive officer' }, { value: '6', text: 'Grade 7' }, { value: '7', text: 'Grade 6' }, { value: '8', text: 'SCS pay band 1' }, { value: '9', text: 'SCS pay band 2' }, { value: '10', text: 'Other' }];

module.exports.allGrades = allGrades;

let courseDates = [{ value: '1', date: '12th June 2018', location: 'Glasgow' }, { value: '2', date: '22nd June 2018', location: 'London' }, { value: '3', date: '14th August 2018', location: 'Bristol' }];

module.exports.courseDates = courseDates;

let extraInterests = [{ value: '1', name: 'Coaching &amp; mentoring' }, { value: '2', name: 'Communications &amp; engagement' }, { value: '3', name: 'Contract management' }, { value: '4', name: 'Customer service' }, { value: '5', name: 'Induction &amp; essential skills' }, { value: '6', name: 'Leadership' }, { value: '7', name: 'Well being &amp; Diversity' }];

module.exports.extraInterests = extraInterests;

let possibleTitles = ['Learning Platform for Government', 'School of...', 'Your learning', 'Learning to support you', 'Learn in', 'The culture of learning', 'Learning support service', 'LearninGov', 'My learning', 'The learning service', 'My civil service learning', 'Continuous learning network', 'Career development network', 'Government learning community', 'Civil Service Learning Community'];
module.exports.possibleTitles = possibleTitles;

let courseTitles = ['A-Z of courses', 'If you know the name of the course you are looking for, use this alphabetical listing of all CSL courses.', '360 Degree Feedback Tool: AA or AO equivalent (report only)', '360 Degree Feedback Tool: EO or Equivalent (report only)', '360 Degree Feedback Tool: Grade 7 & 6 or equivalent (report only)', '360 Degree Feedback Tool: HEO & SEO or equivalent including Fast Stream (report only)', '360 Degree Survey: Deputy Directors or Equivalent (Report Only)', '360 Degree Survey: Directors General & Directors (Report Only)', 'APM Introductory Certificate examination re-sit', 'APMG Change Management Foundation', 'APMG Change Management Foundation & Practitioner', 'APMG International Managing Benefits Foundation & Practitioner certification', 'APMG International Managing Benefits Foundation certification', 'APMG International Managing Benefits Practitioner certification', 'APMG Programme & Project Sponsorship certification', 'APMP for PRINCE2 Practitioner Fast Track', 'APMP Resit only', 'APMPQ combined two module event (8 candidates)', 'Basic fire awareness for all staff', "BCI's Good Practice Guidelines: training and examination", 'BCS/ISEB Certificate in Information Security Management Principles (CISMP)', 'Becoming a Dementia Friend', 'Behavioural Insights', 'BIM Level 2 Client Awareness Programme', 'Business continuity basics', 'Business Impact Analysis', 'Change Leaders - Grades 6-7', 'Product code:Chartered Institute of Purchasing and Supply - Diploma Level, Contexts of Procurement and Supply', 'City and Guilds Level 4 Award in Managing the Delivery of Services to Customers (Operational Delivery)', 'City and Guilds Level 4 Certificate in Managing the Delivery of Services to Customers (Operational Delivery)', 'CMI Level 3 Award in First Line Management', 'CMI Level 3 Certificate in First Line Management', 'CMI Level 5 Award in Management and Leadership', 'CMI Level 5 Certificate in Management and Leadership', 'CMI Level 5 Diploma in Management and Leadership', 'CMI Level 7 (Strategic Management & Leadership) Assessment Workshop', 'CMI Level 7 Award in Strategic Management and Leadership', 'CMI Level 7 Certificate in Strategic Management and Leadership', 'CMI Level 7 Diploma in Strategic Management and Leadership', 'Coaching Skills for HMRC', 'Communicating with customers', 'Communications evaluation', 'Computers and IT: business communication 1', 'Consent for medical professionals', 'Contact Centre Culture', 'Counter fraud, bribery and corruption: all staff', 'Creating a High Performing Learning Organisation in HMRC', 'Crisis & Incident Management', 'Customer insight', 'Dealing with common meeting problems', 'Delivering Customer Service: Resource Planning', 'Design thinking for policy advisers', 'Developing a Customer Service strategy', 'Developing and Managing Business Continuity Exercises', 'Developing your direct reports', 'Development Event Positive Action Pathway "Levelling the Playing Field" AA/AO', 'Digital awareness: "digital by default"', 'Digital skills - Listening to users', 'Digital skills - Starting with user needs', 'Digital skills - Transforming services with Agile', 'Digital skills - Using social media in public services', 'DWP IFRS Technical Update for Accountants in Government', 'Embedding BCM', 'Employee engagement', 'Enhancing your credibility', 'Facilitating meetings and work groups', 'Fast Stream 2014 - Communicating with Impact', 'Fast Stream Induction', 'Fast Stream: Briefings and Submissions', 'Fast Stream: Collaborating and Partnering', 'Fast Stream: Communicating Effectively and with Impact', 'Fast Stream: Delivering Excellent Customer Service Part 2', 'Fast Stream: Managing Change - Implementing Change', 'Fast Stream: Managing People - Coaching and Feedback Skills', 'Fast Stream: Managing Policy Development and Delivery', 'Fast Stream: Managing Staff Performance and Coaching', 'Fast Stream: Ministerial Correspondence', 'Fast Stream: Negotiating and Influencing', 'Fast Stream: Open and Collaborative Policy Making', 'Fast Stream: Oral Briefing for your Ministers/Senior Officials', 'Fast Stream: Personal Effectiveness and Emotional Intelligence', 'Fast Stream: Securing Employee Engagement', 'Fast Stream: Understanding Government', 'Fast Track Apprenticeship Scheme - Briefings & Submissions', 'Fast Track Apprenticeship Scheme - Effective Administration and Business Support', 'Fast Track Apprenticeship Scheme - Managing Business Performance: Continuous Improvement', 'Fast Track Apprenticeship Scheme - Managing Self: Personal Impact and Effectiveness', 'Fast Track Apprenticeship Scheme - Writing to the public', 'Finance skills for all 10: market economics', 'Finance skills for all 11: corporate finance', 'Finance skills for all 1: financial planning and control (part 1)', 'Finance skills for all 2: financial planning and control (part 2)', 'Finance skills for all 3: resource-based management (part 1)', 'Finance skills for all 4: resource-based management (part 2)', 'Finance skills for all 5: budget management', 'Finance skills for all 6: strategic business planning', 'Finance skills for all 7: investment appraisal', 'Finance skills for all 8: interpretation of accounts', 'Finance skills for all 9: performance indicators', 'Financial Leadership: Decision-Making and Achieving Better Value for Money', 'G6/G7 HR Accelerated Development Scheme', 'G6/G7 HR Accelerated Development Scheme', 'Gathering and analysing customer information', 'Health and safety awareness for managers', 'Helping Customers in the Digital World', 'Horizon Scanning for Strategy and Policy Development', 'HR Accelerated Development Scheme: HEO and SEO', 'Implementing a Continuous Feedback Culture', 'Implementing a QMS', 'Implementing Change in HMRC', 'Improve your writing style - online course', 'Information management', 'Innovative Delivery Models', 'Institution of Safety and Health (IOSH) Managing Safely Certificate', 'Institution of Safety and Health (IOSH) Managing Safely Refresher', 'Introduction to evaluation for analysts', 'Introduction to sustainable development', 'ISO 9001 E-Learning', 'IT Disaster Recovery and Business Continuity: Working Together', 'Leading Change', 'Leading Cultural Change in HMRC', 'Leading people through change', 'Legal awareness', 'Level 2 City & Guilds Award in Operational Delivery (Principles)', 'Level 2 City & Guilds Certificate in Operational Delivery (Principles)', 'Level 2 City & Guilds Diploma in Operational Delivery (Principles)', 'Level 3 City & Guilds Award in Operational Delivery (Advanced)', 'Level 3 City & Guilds Certificate in Operational Delivery (Advanced)', 'Level 3 City & Guilds Diploma in Operational Delivery (Advanced)', 'Level 4 City & Guilds Award in Operational Delivery (Management)', 'Level 4 City & Guilds Certificate in Operational Delivery (Management)', 'Level 4 City & Guilds Diploma in Operational Delivery (Management)', 'Level 5 City & Guilds Award in Project specification for Operational Delivery', 'Level 5 CMI Award - Management and Leadership in Operational Delivery', 'Level 5 CMI Certificate - Management and Leadership in Operational Delivery', 'Level 5 CMI Diploma - Management and Leadership in Operational Delivery', 'Level 6 CMI Award - Advanced Management and Leadership in Operational Delivery', 'Level 6 CMI Certificate - Advanced Management and Leadership in Operational Delivery', 'Level 6 CMI Diploma - Advanced Management and Leadership in Operational Delivery', 'Level 7 CMI Award - Strategic Management and Leadership in Operational Delivery', 'Level 7 CMI Certificate - Strategic Management and Leadership in Operational Delivery', 'Level 7 CMI Diploma - Strategic Management and Leadership in Operational Delivery', 'LGB&T awareness', 'Making IT accessible', 'Management of Portfolios (MoP) Foundation', 'Management of Portfolios (MoP) Foundation and Practitioner', 'Management of Portfolios (MoP) Foundation examination re-sit', 'Management of Portfolios (MoP) Practitioner for holders of Foundation', 'Management of Risk (M_o_R) Foundation and Practitioner certification', 'Management of Risk (M_o_R) Foundation level certification', 'Management of Risk (M_o_R) Practitioner certification', 'Management of Risk (M_o_R) Re-registration - option 3 (with new manual and refresh course)', 'Managing Business Performance - Negotiation Skills', 'Managing Business Performance - Working Across Boundaries', 'Managing Business Performance: An Introduction to Taking a Consultancy Approach', 'Managing customer service performance', 'Managing People - Coaching Skills for Senior Managers', 'Managing Successful Programmes (MSP) Advanced Practitioner', 'Managing Successful Programmes (MSP) Advanced Practitioner re-registration dissertation route', 'Managing Successful Programmes (MSP) Advanced Practitioner re-registration exam route', 'Managing Successful Programmes (MSP) Foundation', 'Managing Successful Programmes (MSP) Foundation examination re-sit', 'Managing Successful Programmes (MSP) Practitioner', 'Managing Successful Programmes (MSP) Practitioner re-registration', 'Managing teams remotely', 'Manual handling', 'Matrix working', 'Mental health conditions and dementia: support for customers', 'Multi-tasking in Contact Centres', 'NEBOSH National General Certificate', 'NEC3 family of contracts', 'Negotiation essentials: communication', 'Negotiation essentials: planning for negotiation', 'Operating strategically', 'Operational delivery profession', 'Operational Delivery Profession - Adapting your behaviour to suit the customer', 'Operational Delivery Profession - Handling Challenging Calls in a Telephony Environment', 'Operational Delivery Profession - Investigative Interviewing Techniques', 'Organisational Development Capability Programme: Core Practice ( Lot 1) - Module 1', 'Organisational Development Capability Programme: Core Practice (Lot 1) - Learning Set 1', 'Organisational Development Capability Programme: Core Practice (Lot 1) - Module 2', 'Organisational Development Capability Programme: HR Fast Stream (Lot 3) - Module 1', 'Organisational Development Capability Programme: HR Fast Stream (Lot 3) - Module 2', 'Parliamentary process', 'Persuasive communication', 'Portfolio, Programme & Project Offices (P3O) Foundation and Practitioner', 'Portfolio, Programme & Project Offices Foundation (P3O)', 'Positive Action Pathway', 'Positive Action Pathway Action Learning Set 1 "Levelling the Playing Field"', 'Positive Action Pathway Development Event HEO/SEO', 'Positive Action Pathway Development Event HEO/SEO', 'Positive Action Pathway HEO/SEO Module 1', 'Positive Action Pathway Mentor Training', 'Positive Action Pathway "Levelling the Playing Field"', 'Positive Action Pathway "Levelling the Playing Field" AA/AO Action Learning Sets', 'Positive Action Pathway "Levelling the Playing Field" AA/AO Learning Modules', 'Positive Action Pathway "Levelling the Playing Field" EO Action Learning Sets', 'Positive Action Pathway "Levelling the Playing Field" EO Modules', 'Problem solving', 'QMS Lead Auditor', 'Read Faster, Read Smarter', 'Recruitment and selection', 'Recruitment and selection', 'Responsible for information: information asset owner (IAO)', 'Responsible for information: non-executive and board-level directors (NEDs)', 'Responsible for information: senior information risk owner (SIRO)', 'Risk', 'Risk management', 'Ship Safety Management Office (SSMO) - Non Residential', 'So you want to be a Non-Executive?', "Sponsorship of Arm's Length Bodies", 'Supporting Surplus Employees', 'Tailored coaching for committee appearances', 'Team Working in an Operational Delivery Environment', 'Team working', 'Telephony: business communication 2', 'The A to Z of business continuity management', "The BCI's Supply Chain and Business Continuity Management Course", 'The Business Continuity Foundation Course', 'The digital landscape', 'The Human Factor in Business Continuity Management', 'The Learning Team', 'Time management', 'Towards Universal Credit - Getting a Job is a Full Time Job', 'Towards Universal Credit - The Digital Jobs Market', 'Towards Universal Credit - The interview', 'Towards Universal Credit - Universal Jobmatch', 'Towards Universal Credit - Work related activities', 'Towards Universal Credit - Keeping the job', 'Unconscious bias (e-learning)', 'Understanding ISO 22301 Masterclass', 'User Research Fundamentals', 'Using Creative Techniques', 'Using Evidence in International Development', 'Wicked Problems and Clumsy Solutions in HMRC', 'WIG Enhancing Personal Impact & Presence', 'WIG Take Control of Your Career', 'WIG The Secrets of Group Dynamics - How to Influence and Manage People in Groups', "WIG Women's Leadership Seminar: Influence and Resilience", "WIG Women's Leadership Seminar: Navigating the Labyrinth", "WIG Women's Leadership: Purpose, Power and Promotion", 'Windsor Leadership Trust - Deputy Director Windsor Leadership Programme', 'Windsor Leadership Trust - Director Developing Strategic Leadership Programme', 'Writing the BC Plan', 'Writing to the public'];
module.exports.courseTitles = courseTitles;

let learningItems = [{
  id: '1',
  details: {
    title: 'Digital awareness "Digital by default"',
    type: 'online',
    cost: '£FREE',
    duration: '1 hour',
    keyArea: 'Digital',
    level: 'AA to Grade 6',
    content1: '<p>The Civil Service is embracing more and more digital services and communications. This means you need to be digitally literate and have an understanding of how to work within an online environment.</p><p>This topic equips you with the basic digital skills needed to work in an increasingly online environment and allows you to work more collaboratively with your colleagues. </p><h1 class="heading heading--medium  heading-medium">Learning outcomes</h1><p>On completing this learning, you\'ll be able to:</p><ul class="list-bullet u-space-b30"><li>improve your all-round digital confidence</li><li>fill in any gaps in your digital knowledge</li><li>develop the skills to make you more efficient and productive in your job</li></ul>'
  }
}, {
  id: '2',
  details: {
    title: 'Rupert McNeil: what the civil service of tomorrow will look like',
    type: 'blog',
    cost: '£FREE',
    duration: '10 mins',
    keyArea: '',
    level: '',
    content1: '<p>Since Brexit, the question of whether the civil service has the right people, skills, and capabilities is the subject of heated debate. One man who must address these issues is Rupert McNeil, the head of Government HR says Jen Gold.</p>',
    url: 'https://www.instituteforgovernment.org.uk/blog/rupert-mcneil-what-civil-service-tomorrow-will-look'
  }
}, {
  id: '3',
  details: {
    title: 'Simon Sinek - Start With Why - TED Talk Short Edited',
    type: 'video',
    cost: '£FREE',
    duration: '30 mins',
    keyArea: '',
    level: '',
    content1: "<p>This talk explores the idea that starting with 'why' helps motivate people to achieve an end goal and increases the chances of success. It's helpful if you are thinking about how you communicate about your work or setting strategy for a team or project.</p>",
    url: '',
    youtube: 'https://www.youtube.com/embed/IPYeCltXpxw',
    transcript: '#'
  }
}, {
  id: '4',
  details: {
    title: 'Managing contractors',
    type: 'classroom',
    cost: '£238 (ex VAT)',
    duration: '1 day',
    keyArea: 'Ledership',
    level: 'AA to Grade 6',
    content1: "<p>An introduction to contract management principles, this course is suitable if you have responsibility for managing contracts or suppliers. It is a foundation product in the commercial professions curriculum.</p><p>You'll find out about the key features of contract management, monitoring mechanisms and the contract management cycle. Other issues covered include performance management, good housekeeping, using subject matter experts, contract failure and remedies, and exiting or terminating contracts.</p><p>The day is highly participative and involves case studies and group exercises. This learning supports the:</p><ul><li>'Achieving commercial outcomes' competency indicators in the civil service competency framework</li><li>'Contract and supplier management' area in the procurement profession skills and competency framework</li></ul><h1 class=\"heading heading--medium heading-medium\">Learning outcomes</h1><p>On completing this learning, you'll be able to:</p><ul class=\"list-bullet u-space-b30\"><li>Explain the key features of contract management</li><li>Ensure contracts continue to meet organisational needs</li><li>Build effective supplier relationships</li><li>Assess suppliers using KPI's and deal with disputes positively</li><li>Understand the importance of negotiation</li><li>Understand change control, governance, risk management and how to exit and terminate contracts</li><li>Understand how intellectual property rights and assets can affect a contract</li></ul>",
    productCode: 'CSMC',
    nextDate: '10 April 2018',
    location: 'multiple',
    preLearning: ['Case study', 'MPA review (pre-reading)']
  }
}];

module.exports.learningItems = learningItems;