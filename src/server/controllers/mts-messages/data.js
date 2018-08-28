// JSON represenation of messages
export const data = [
  {
    title: 'Class 1 and 2 test standard change',
    date: {
      received: '22 June 2018',
      published: '22 June 2018',
      due: {
        asInt: 4,
        asString: '26 June 2018',
      },
    },
    type: 'Special notice',
    issueNum: '09-18',
    dayCount: 4,
    state: {
      acknowledged: false,
      isRead: false,
    },
    messagePreview: `<h2 id="heading-medium"><span class="number">1.</span>Overview</h2>
    <p>The spacing requirements for directional indicators shown in the <a rel="external" href="https://www.mot-testing.service.gov.uk/documents/manuals/class12/">MOT inspection manual for class 1 and 2 vehicles</a> in <a rel="external" href="https://www.mot-testing.service.gov.uk/documents/manuals/class12/Section-4-Lamps-reflectors-and-electrical-equipment.html#section_4.4">Section 4.4.3</a> are wrong.</p>
    <p>This is causing type approved motorcycles to fail the MOT test.</p>
    <h2 class="heading-medium">
    <span class="number">2. </span>Revised test standard</h2>
    <p>The inspection manual currently says that mandatory direction indicators must have minimum separation distances of:</p>
    <ul>
      <li>solo motorcycles over 50cc: 300mm at the front and 240mm at the rear</li>
      <li>solo up to 50 cc: 240mm at the front and 180mm at the rear</li>
      <li>motorcycle combinations: 400mm at both front and rear</li>
    </ul>
    <p>The guidance should say that they must have minimum separation distances between the illuminating surfaces of:</p>
    <ul>
      <li>solo motorcycles: 240mm at the front and 180mm at the rear</li>
      <li>motorcycle combinations: 400mm at both front and rear</li>
    </ul>
    <p>Separation distances don’t have to be measured. They should only be rejected if obviously incorrect.</p>
    <div role="note" aria-label="Information" class="application-notice info-notice">
    <p>The change takes immediate effect.</p>
    </div>`,
  },
  {
    title: 'MOT Testing guide',
    date: {
      received: '18 June 2018',
      published: '18 June 2018',
    },
    type: 'Special notice',
    issueNum: '08-18',
    dayCount: false,
    state: {
      acknowledged: true,
      isRead: true,
    },
    messagePreview: `<h2 class="heading-medium">
    <span class="number">1. </span>Overview</h2>
    <p>The <a href="https://www.gov.uk/government/publications/mot-testing-guide">MOT testing guide</a> has been updated to reflect the changes brought in by the EU directive on 20 May 2018. Minor changes  to the MOT testing service are also included.</p>
    <p>The new guide will also clarify recent queries.</p>
    <h2 class="heading-medium">
    <span class="number">2. </span>What’s changed?</h2>
    <p>There’s a new change table in the back of the MOT testing guide. Please refer to this table to see the full list of changes.</p>`,
  },

  {
    title: 'EU roadworthiness directive updates',
    date: {
      received: '8 May 2018',
      published: '8 May 2018',
    },
    type: 'Special notice',
    issueNum: '06-18',
    dayCount: false,
    state: {
      acknowledged: true,
      isRead: true,
    },
    messagePreview: `
    <h2 class="heading-medium">
    <span class="number">1. </span>Diesel smoke meter update</h2>
    <p>On 20 May 2018, the EU roadworthiness directive introduces new emission limits for diesel vehicles at MOT inspections. This will mean upgrading the software on diesel smoke meters or replacing it with a new meter.</p>
    <p>This is a mandatory upgrade, and all vehicle testing stations must do this. It will not be acceptable
    for garages to not make this upgrade.</p>
    <p><abbr title="Driver and Vehicle Standards Agency">DVSA</abbr> is aware of 2 issues that garages are finding, which are:</p>
    <ul>
      <li>the availability of upgrades following order, by 20 May</li>
      <li>not receiving new smoke meters following order, by 20 May</li>
    </ul>
    <p>For both situations, a workaround is possible, until 30 September 2018. This workaround is only permissible where an upgrade or new meter have been ordered.</p>
    <p>During that period you may be asked to provide evidence that an upgrade or new equipment has been ordered.</p>
    <p>In any other circumstance of your equipment not being able to test to the new standards - you cannot carry on MOT testing.</p>
    <h3 class="heading-small">
    <span class="number">1.1 </span>Upgrade details</h3>
    <p>You should, by now, have organised your upgrade or new equipment. However, if you have not –
    you may still need to check if your current meter can be upgraded. There are some older types that
    cannot be updated. Where this is the case then new equipment should have been ordered.</p>
    <p>The <a rel="external" href="https://www.gea.co.uk/document-category/dvsa-acceptable-equipment/">Garage Equipment Association</a> publish information on which types can be updated. Scroll to the bottom and download the diesel smoke meter list.</p>
    <div class="call-to-action">
    <p>If your diesel smoke meter doesn’t appear in the list or if you have any questions about the upgrade please contact <a href="mailto:info@gea.co.uk">info@gea.co.uk</a>.</p>
    </div>
    <h3 class="heading-small">
    <span class="number">1.2 </span>Temporary workaround</h3>
    <p>You only need to use the workaround for:</p>
    <ul>
      <li>vehicles first used on or before 1 January 2014 with a plate value of less than 1.5</li>
      <li>vehicles first used after 1 January 2014</li>
    </ul>
    <p>All other vehicles are tested as normal with the result assessed against the appropriate limits contained in the manual. (In case vehicle’s plate value is lower than the default).</p>
    <p>Select vehicle age and engine type as appropriate and complete initial Fast Pass test.</p>
    <p>Where the Fast Pass result indicates a pass compare the recorded result with the vehicle’s plate value or default value where not present. If the value is equal or less than the required test value the test is passed and a printout is to be produced. In all other cases proceed as follows.</p>
    <ol class="steps">
    <li>
    Exit the test and select smoke meters diagnostic or manual mode. (If no diagnostic or manual mode is available follow the procedure conducting individual Fast Pass tests).
    </li>
    <li>
    Conduct 3 tests - following the meter prompts.
    </li>
    <li>
    Calculate the average of those 3 values (by adding them together and dividing by 3).
    </li>
    <li>
    If all 3 readings are below the required limit there is no need to work out the average and the vehicle can be passed.
    </li>
    <li>
    If the average of 3 consecutive tests equate to a reading at or below the test value then the vehicle passes, otherwise it is a fail.
    </li>
    <li>
    Obtain a printout, amending the printed pass/fail result as necessary.
    </li>
    </ol>
    <h3 class="heading-small">
    <span class="number">1.3 </span>Unusually low readings</h3>
    <p>In a small number of cases, you may notice one of the readings is unusually low, for example; if the meter failed to register the result correctly, or the probe was dislodged. In such cases, you should discard the result and start again.</p>
    <p>If the vehicle fails but the individual reading are becoming progressively lower, then a second test should be conducted.</p>
    <h3 id="new-diesel-smoke-meters">
    <span class="number">1.4 </span>New diesel smoke meters</h3>
    <p>Where garages are purchasing new diesel smoke meters, they are reminded that they no longer need to notify <abbr title="Driver and Vehicle Standards Agency">DVSA</abbr> of the change.</p>
    <h2 class="heading-medium">
    <span class="number">2. </span>Living vans</h2>
    <p>From 20 May 2018 the Motor Vehicles (Tests) (Amendment) regulations 2017 will come into force which will align domestic regulations with Directive 2014/45/EU.</p>
    <p>This means that a vehicle test class is defined by its EU categorisation. M1 vehicles for example are to be considered a class 4 test.</p>
    <p>A small number of vehicles that would appear to meet the description for living vans have been type approved as M1 category vehicles. Where a vehicle of this description is presented for test at a centre that can accommodate such a vehicle and the presenter has evidence to confirm the vehicle is approved to the M1 category it shall be tested as a class 4.</p>
    <p>The vehicle chassis plate may provide this information or the presenter may be able to provide the V5C with the EU category. Where this evidence cannot be provided the vehicle test class shall be confirmed in the usual manner and tested or declined appropriately.</p>
    <p>Prior to 20 May, a test centre may be asked to test one of these vehicles as an M1. Where a test centre that is able to accommodate such vehicles and the EU category of M1 can be established the vehicle shall be tested as a class 4.</p>
    <p>The description of a living van can be found in the <a href="https://www.gov.uk/government/publications/mot-testing-guide">MOT testing guide</a> section A2.4 page 13.</p>
    <h2 class="heading-medium">
    <span class="number">3. </span>Sign up to <abbr title="Driver and Vehicle Standards Agency">DVSA</abbr> alerts</h2>
    <p><abbr title="Driver and Vehicle Standards Agency">DVSA</abbr> has heard from some of you that you do not hear regularly about the updates and changes in MOT.</p>
    <p>As we move to the implementation of EU changes on 20 May, <abbr title="Driver and Vehicle Standards Agency">DVSA</abbr> may have the need to communicate urgent updates or changes to VTS site managers and testers. Where this information is not an instruction, an MOT special notice is not appropriate.</p>
    <p>A good way to get updates is to <a href="https://www.gov.uk/guidance/dvsa-email-alerts">sign up to <abbr title="Driver and Vehicle Standards Agency">DVSA</abbr> email alerts</a>.</p>
    <p>The sign up process is quick and you can subscribe to ‘MOT news’ and ‘Matters of Testing’ blog to keep up to date.</p>
    <h2 class="heading-medium">
    <span class="number">4. </span>MOT inspection manuals</h2>
    <p>The MOT inspection manuals are now complete. The final EU versions on GOV.UK can be found at:</p>
    <ul>
      <li><a rel="external" href="https://training.mot-testing.service.gov.uk/documents/manuals/class12/">MOT inspection manual for motor cycle and side cars</a></li>
      <li><a rel="external" href="https://training.mot-testing.service.gov.uk/documents/manuals/class3457/">MOT inspection manual for private passenger and light commercial vehicles</a></li>
    </ul>
    <p>On 20 May 2018, all previous MOT inspection manuals you may have copied or stored must not be referred to.</p>
    <h2 class="heading-medium">
    <span class="number">5. </span>Contingency testing (<abbr title="contingency testing">CT</abbr>)</h2>
    <p>The format of contingency testing certificates have been altered to reflect the changes required by the EU roadworthiness directive.</p>
    <p>AEDMs and testers must not use existing <abbr title="contingency testing">CT</abbr> documents after 19 May 2018. And any unused copies must be destroyed.</p>
    <p>New contingency testing documents will be available from 20 May 2018.</p>
    <p>VTSs must download from the MOT testing service at least one copy of each certificate and can:</p>
    <ul>
      <li>save the copies on a PC or tablet and print them as and when they are needed</li>
      <li>print them and photocopy them as and when needed</li>
    </ul>
    <h2 class="heading-medium">
    <span class="number">6. </span>Testing environment and training material</h2>
    <p>Testers are reminded that there is now a training environment that replicates the changes you will see in MOT testing service on 20 May 2018. This facility has been developed to help ease the transition into the EU directive changes.</p>
    <p>Testers are encouraged to use this environment which allows you to carry out simulated tests with real vehicle information.</p>
    <p>It may be useful to carry out simulated tests on vehicles that you have tested previously using the same registration numbers, VIN numbers and defects.</p>
    <p>The <a rel="external" href="https://training.mot-testing.service.gov.uk/login?goto=https%3A%2F%2Ftraining.mot-testing.service.gov.uk%3A443%2F">training environment</a> will be available until 27 May 2018.</p>
    <p>Log into the training environment using your user ID and password as normal, nothing that is done in the training environment will affect anything in the live environment.</p>
    <div role="note" aria-label="Information" class="application-notice info-notice">
    <p>Note: Recent password changes in the live system may not be reflected in the training system when this occurs follow the change expired password screen prompts to log in. This change will not affect your live system password.</p>
    </div>
    <p><a href="https://www.gov.uk/government/publications/mot-changes-from-may-2018-guidance-for-mot-testers">Additional training information</a> can be found on GOV.UK.</p>`,
  },
  {
    title: 'Test outside opening hours',
    date: {
      received: '5 May 2018',
      published: '4 May 2018',
    },
    type: 'News',
    state: {
      accepted: false,
      rejected: false,
      isRead: false,
    },
    messagePreview: `<p>Tester Rodney Hylands registered a vehicle for test at 18:45 on 4 May 2018 at VTS: VTS066450, 13, Weather Gardens, Farnham, Surrey, England, Surrey, HR6 8ZY. This test was undertaken outside the declared hours for testing and you may wish to query the reason or alter your declared opening times.</p> `,
  },
  {
    title: 'Site manager nomination',
    date: {
      received: '1 May 2018',
      published: '1 May 2018',
    },
    type: 'Notification',
    dayCount: false,
    state: {
      accepted: false,
      rejected: false,
      isRead: false,
    },
    messagePreview: `<p>You have been nominated for the role of Site Manager for OSWALDTWISTLE MOTOR WORKS VTS066450 by Damian Myra Heiman. Please confirm nomination. </p>`,
  },
  {
    title: 'New way for you to get MOT news',
    date: {
      received: '23 March 2018',
      published: '23 March 2018',
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
    messagePreview: `<p>You have been nominated for the role of Tester for OSWALDTWISTLE MOTOR WORKS VTS066450 by Damian Myra Heiman. Please confirm nomination.</p> `,
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
    messagePreview: `<p>You can now view the latest test quality information for:</p> <strong>OSWALDTWISTLE MOTOR WORKS</strong><br/>VTS066450<br/>13, Weather Gardens, Farnham, Surrey, England, Surrey, HR6 8ZY<br/><br/> <p>This information will help you identify anomalies and improve MOT test quality at your site.</p> `,
  },
];
