/**
 * Optional GitHub URLs for gallery animations.
 * Add your repo URLs here as you publish them.
 * Format: animation id → full GitHub URL
 */
export const galleryGithubUrls: Record<string, string> = {
  // Example: 'gtmstack-pro': 'https://github.com/finlin67/GTMStack.pro',
}

export function getGithubUrl(animationId: string): string | undefined {
  return galleryGithubUrls[animationId]
}
