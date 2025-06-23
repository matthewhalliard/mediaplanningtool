/**
 * Extracts domain from a URL and returns Clearbit logo URL
 * @param url - The company website URL
 * @returns Clearbit logo URL or null if invalid URL
 */
export function getClearbitLogoUrl(url: string | undefined): string | null {
  if (!url) return null;
  
  try {
    const urlObj = new URL(url);
    let domain = urlObj.hostname;
    
    // Remove 'www.' prefix if present
    if (domain.startsWith('www.')) {
      domain = domain.substring(4);
    }
    
    // Special handling for some domains that might need adjustments
    // For example, amazon advertising uses advertising.amazon.com but logo should be amazon.com
    if (domain.startsWith('advertising.amazon.com')) {
      domain = 'amazon.com';
    } else if (domain.startsWith('business.facebook.com')) {
      domain = 'facebook.com';
    } else if (domain.startsWith('business.linkedin.com')) {
      domain = 'linkedin.com';
    } else if (domain.startsWith('ads.tiktok.com')) {
      domain = 'tiktok.com';
    } else if (domain.startsWith('marketingplatform.google.com')) {
      domain = 'google.com';
    } else if (domain.startsWith('business.adobe.com')) {
      domain = 'adobe.com';
    }
    
    return `https://logo.clearbit.com/${domain}`;
  } catch (error) {
    console.warn('Invalid URL for Clearbit logo:', url);
    return null;
  }
}

/**
 * Generates a fallback image URL using the company name
 * This creates a simple colored background with initials
 */
export function getFallbackLogoUrl(title: string): string {
  if (!title) return '';
  
  const initials = title
    .split(' ')
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
  
  // Generate a consistent color based on the title
  const colors = [
    '4F46E5', '7C3AED', 'DB2777', 'DC2626', 'EA580C',
    '059669', '0891B2', '2563EB', '7C2D12', '831843'
  ];
  
  const colorIndex = title.length % colors.length;
  const backgroundColor = colors[colorIndex];
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${backgroundColor}&color=fff&size=200&bold=true`;
} 