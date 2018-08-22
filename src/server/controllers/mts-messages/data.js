// JSON represenation of messages
export const data = [
  {
    title: 'Preparation for the EU roadworthiness directive',
    date: {
      received: '16 May 2018',
      published: '1 May 2018',
      due: {
        asInt: 4,
        asString: '11 August 2018',
      },
    },
    type: 'Special notice',
    issueNum: '07-18',
    dayCount: 4,
    state: {
      acknowledged: false,
      isRead: false,
    },
    messagePreview: `<h2 class='heading-medium'>Overview</h2>
    <p>On 20 May 2018, DVSA will introduce changes required by the EU roadworthiness directive.</p>
    <h2 class='heading-medium'><span class="number">1. </span> Use the training environment (available 24 hours a day until Sunday 27 May)</h2>
    <p>As an MOT tester, it’s essential that you’re prepared for the changes to the MOT on 20 May. One of the main ways is to log into the <a rel="external" href="https://training.mot-testing.service.gov.uk/">training environment</a> before 20 May 2018 - this facility lets you carry out simulated tests with real vehicle information.</p>
    <p>You may find it useful to carry out simulated tests on vehicles that you’ve tested previously using the same registration numbers, VIN numbers and defects.</p>
    <p>Read <a href="https://www.gov.uk/government/publications/mot-special-notice-06-18-eu-roadworthiness-directive-updates/mot-special-notice-06-18-eu-roadworthiness-directive-updates">MOT special notice 06-18</a> for more guidance on using the training environment.</p>
    <h2 class='heading-medium'>
    <span class="number">2. </span> Read the training materials</h2>
    <p>Read the <a href="https://www.gov.uk/government/publications/mot-changes-from-may-2018-guidance-for-mot-testers">training materials on GOV.UK about carrying out MOT tests</a> from 20 May, to find out more about the changes.</p>
    <h2 class='heading-medium'>
    <span class="number">3. </span> Retests after 20 May, when the original test was before 20 May 2018</h2>
    <p>Vehicles presented for a retest on or after 20 May but tested before that date will be the same as now, only subject to a partial retest. This means that only the original test failure items and any associated items are retested.</p>
    <p>For the items retested the new standards will apply. In most cases this will make no difference but for a small number of items where the standards have changed, for example, diesel emissions - it will mean the new limits apply.</p>
    <p>During the retest, there is no requirement to test the new areas introduced by the EU directive 
    (for example, reversing light, MIL light). However, if in the course of the retest defects in these new areas are seen then the defect must be recorded – which in the case of a major or dangerous defect will mean the retest will fail.</p>
    <h2 class='heading-medium'>
    <span class="number">4. </span> MOT testing service access during changeover</h2>
    <p>To introduce the changes, the MOT testing service won’t be available from 8pm on Saturday 19 May 2018 until around 5am Sunday 20 May 2018.</p>
    <div role="note" aria-label="Information" class="application-notice info-notice">
    <p>Any tests that haven’t been completed before the service is taken down will automatically be cancelled.</p>
    </div>
    <p>The service should be available for you to use again on the Sunday morning. However, if there are any issues, you should regularly check the <a rel="external" href="https://mattersoftesting.blog.gov.uk/mot-testing-service-status/">MOT testing service status page</a> for updates.</p>
    <h2 class='heading-medium'>
    <span class="number">5. </span> Contingency testing</h2>
    <p>As an MOT tester, you should where possible, make sure that you enter any outstanding contingency tests into the MOT testing service before it is taken down at 8pm on Saturday 19 May 2018.</p>
    <p>If you’re entering contingency tests after the changeover, you’ll be presented with the ‘reason for rejection’ (defects) dataset, relevant to the date the test took place.</p>
    <h2 class='heading-medium'>
    <span class="number">6. </span> Support for garages on 20 May 2018</h2>
    <p>You can find a <a href="https://www.gov.uk/government/publications/mot-changes-from-may-2018-guidance-for-mot-testers/other-important-information-for-mot-testers">list of important information for MOT testers</a> following feedback from the training environment and testers’ manuals.</p>
    <p>In addition, the helpdesk will be open on Sunday 20 May 2018 from 9am to 3pm.</p>
    <p>You should call 0330 123 5654 if you need help with entering test results or have any questions when carrying out tests.</p>
    <p>Following implementation of the MOT changes, the helpdesk will then operate as normal, Monday to Friday, 8am to 6pm on 0300 123 9000 and Saturday 8am to 2pm on 0330 123 5654.</p>`,
  },
  {
    title: 'Class 1 and 2 test standard change',
    date: {
      received: '16 July 2018',
      published: '1 August 2018',
    },
    type: 'Special notice',
    issueNum: '09-18',
    dayCount: false,
    state: {
      acknowledged: true,
      isRead: true,
    },
    messagePreview: `<h1>Preview placeholder</h1>`,
  },
  {
    title: 'New test quality information available',
    date: {
      received: '1 July 2018',
      published: '12 June 2018',
    },
    type: 'Notification',
    dayCount: false,
    state: {
      accepted: false,
      rejected: false,
      isRead: true,
    },
    messagePreview: `<h1>Preview placeholder</h1>`,
  },
  {
    title: 'Site manager nomination',
    date: {
      received: '1 April 2018',
      published: '12 March 2018',
    },
    type: 'Notification',
    dayCount: false,
    state: {
      accepted: false,
      rejected: false,
      isRead: false,
    },
    messagePreview: `<h1>Preview placeholder</h1>`,
  },
  {
    title: 'New way for you to get MOT news',
    date: {
      received: '23 April 2018',
      published: '23 April 2018',
    },
    type: 'News',
    state: {
      isRead: false,
    },
    messagePreview: `<p class="lede">From October onwards you'll be able to see all MOT special notices, notifications and news by DVSA as soon as you sign in the MTS.</p>
    <p>We've added a 'Messages' view that will show you all special notices, notifications and any MOT related news. This is to ensure that every MOT tester will find out about any changes and news that impact their work.</p>
    <p>To find out more what we've been working on from the <a href="https://mattersoftesting.blog.gov.uk/mot-services-were-working-on-6-july-2018/">latest Matters of Testing blog post</a>.</p>`,
  },
  {
    title: 'Tester nomination',
    date: {
      received: '12 March 2018',
      published: '2 Feb 2018',
    },
    type: 'Notification',
    state: {
      accepted: false,
      rejected: false,
      isRead: true,
    },
    messagePreview: `<h1>Preview placeholder</h1>`,
  },
  {
    title: 'Test outside opening hours',
    date: {
      received: '4 February 2018',
      published: '1 February 2018',
    },
    type: 'Notification',
    state: {
      accepted: false,
      rejected: false,
      isRead: true,
    },
    messagePreview: `<h1>Preview placeholder</h1>`,
  },
  {
    title: '2018 Regulations',
    date: {
      received: '4 February 2018',
      published: '1 February 2018',
    },
    type: 'News',
    state: {
      isRead: true,
    },
    messagePreview: `<h1>Preview placeholder</h1>`,
  },
  {
    title: 'Updated regulations',
    date: {
      received: '4 February 2018',
      published: '1 February 2018',
    },
    type: 'News',
    state: {
      isRead: true,
    },
    messagePreview: `<h1>Preview placeholder</h1>`,
  },
];
