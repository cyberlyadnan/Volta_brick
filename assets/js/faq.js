/**
 * FAQ accordion
 */
export function initFaq() {
  const faqItems = document.querySelectorAll('.vbi-faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.vbi-faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
