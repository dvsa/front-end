'use strict';

var _register = require('./register');

let allDepartments = [{ value: '0', text: 'Select a department' }, { value: '1', text: 'Cabinet Office' }, { value: '2', text: 'Department of Health and Social Care' }, { value: '3', text: 'HM Revenue & Customs' }, { value: '4', text: 'Other' }];

module.exports.allDepartments = allDepartments;

let allProfessions = [{ value: '1', text: 'Commercial' }, { value: '2', text: 'Communications' }, { value: '3', text: 'Corporate Finance' }, { value: '4', text: 'Digital' }, { value: '5', text: 'Finance' }, { value: '6', text: 'Fraud, Error, Debt and Grants' }, { value: '7', text: 'Human Resources' }, { value: '8', text: 'Internal Audit' }, { value: '9', text: 'Legal' }, { value: '10', text: 'Project Delivery' }, { value: '11', text: 'Property' }, { value: '12', text: 'Other' }];

module.exports.allProfessions = allProfessions;

let allGrades = [{ value: '1', text: 'Administrative Assistant' }, { value: '2', text: 'Administrative Officer' }, { value: '3', text: 'Executive Officer' }, { value: '4', text: 'Higher Executive Officer' }, { value: '5', text: 'Senior Executive Officer' }, { value: '6', text: 'Grade 7' }, { value: '7', text: 'Grade 6' }, { value: '8', text: 'SCS Pay Band 1' }, { value: '9', text: 'SCS Pay Band 2' }, { value: '10', text: 'Industrial' }, { value: '11', text: 'Other' }];

module.exports.allGrades = allGrades;

let courseDates = [{ value: '1', date: '12th June 2018', location: 'Glasgow' }, { value: '2', date: '22nd June 2018', location: 'London' }, { value: '3', date: '14th August 2018', location: 'Bristol' }];

module.exports.courseDates = courseDates;

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