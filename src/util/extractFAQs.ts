/**
 * Extracts FAQ question/answer pairs from markdown content.
 * Handles two patterns:
 *   Pattern 1: **Question text?**\nAnswer paragraph
 *   Pattern 2: ### Question text?\nAnswer paragraph
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function extractFAQs(markdownBody: string): FAQItem[] {
  const faqs: FAQItem[] = [];

  // Find the FAQ section — stop at next ## heading or end of content
  const faqSectionMatch = markdownBody.match(
    /## Frequently Asked Questions\s*\n([\s\S]*?)(?=\n## (?!#)|\n---\s*$|$)/
  );

  if (!faqSectionMatch) return faqs;

  const faqContent = faqSectionMatch[1];

  // Try Pattern 1: **Question?**\nAnswer
  const boldPattern =
    /\*\*([^*]+\?)\*\*\s*\n([\s\S]*?)(?=\n\*\*[^*]+\?\*\*|\s*$)/g;

  let match;
  while ((match = boldPattern.exec(faqContent)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  // If Pattern 1 found nothing, try Pattern 2: ### Question?\nAnswer
  if (faqs.length === 0) {
    const h3Pattern =
      /### ([^\n]+\?)\s*\n([\s\S]*?)(?=\n### |\s*$)/g;

    while ((match = h3Pattern.exec(faqContent)) !== null) {
      const question = match[1].trim();
      const answer = match[2].trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
  }

  return faqs;
}

export function generateFAQSchema(faqs: FAQItem[]): object | null {
  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
