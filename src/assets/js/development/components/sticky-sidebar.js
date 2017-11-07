import ready from 'document-ready';
import stickySidebar from 'sticky-sidebar';

ready(() => {

  const styleguideNavigation = document.getElementById('styleguide-navigation');
  const styleguideContent = document.getElementById('styleguide-content');

  if( styleguideNavigation ) {
    
    // Fix jumping 
    styleguideContent.style.minHeight = styleguideNavigation.offsetHeight + 'px';
  
    const stickiedNavigation = new stickySidebar(styleguideNavigation, {
      topSpacing: 15,
      resizeSensor: false,
      containerSelector: '#library-container',
      innerWrapperSelector: '.styleguide-navigation__inner'
    });
  
  }

});

