/**
 * Decode a base64 encoded string
 */
export function decodeBase64(encoded: string): string {
  if (import.meta.client) {
    return atob(encoded);
  }
  return Buffer.from(encoded, "base64").toString("utf-8");
}

/**
 * Decode email from base64
 */
export function decodeEmail(encodedEmail: string): string {
  return decodeBase64(encodedEmail);
}

/**
 * Decode phone number from base64
 */
export function decodePhoneNumber(encodedPhoneNumber: string): string {
  return decodeBase64(encodedPhoneNumber);
}

/**
 * Format phone number for display (E.164 format)
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, "");

  if (digits.length <= 3) return phoneNumber;

  const countryCode = digits.slice(0, 3);
  const local = digits.slice(3);

  const part1 = local.slice(0, 2);
  const part2 = local.slice(2, 5);
  const part3 = local.slice(5, 8);
  const rest = local.slice(8);

  return `+${countryCode} ${part1} ${part2} ${part3}${rest ? ` ${rest}` : ""}`;
}

/**
 * Extract domain name from URL
 */
export function urlToName(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}
