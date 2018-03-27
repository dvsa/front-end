export const initManualSmartSurvey = () => {
  const smartSurveyElements = Array.from(document.querySelectorAll('.manual-smart-survey'));
  if (!smartSurveyElements || !Array.isArray(smartSurveyElements)) return;
  smartSurveyElements.forEach(element => {
    const iframeSrc = element.getAttribute('data-iframe-src');
    if (!iframeSrc) return;
    element.innerHTML = `
      <iframe
        src="${iframeSrc}"
        frameborder="0"
        class="manual-smart-survey__iframe"
      ></iframe>
    `;
  });
};
