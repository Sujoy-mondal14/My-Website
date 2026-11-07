import { apiFetch, BASE_URL } from '../utils/api.js'

const FALLBACK_PROFILE = {
  name: 'Sujoy Mondal',
  username: 'Sujoy-mondal14',
  github_avatar_url: 'https://github.com/Sujoy-mondal14.png',
  avatar_url: 'https://github.com/Sujoy-mondal14.png',
  linkedin_avatar_url: import.meta.env.VITE_LINKEDIN_AVATAR || '/Linkdln_profilePhoto.jpg',
  socials: {
    github: 'https://github.com/Sujoy-mondal14',
    linkedin: 'https://linkedin.com/in/sujoy-mondal',
  },
}

export async function fetchProfile() {
  try {
    const response = await apiFetch('/profile')

    if (!response.ok) {
      throw new Error(`Profile API responded with status ${response.status}`)
    }

    const payload = await response.json()
    if (payload.success && payload.data) {
      // Resolve relative LinkedIn avatar URLs against the backend BASE_URL
      let linkedinUrl = payload.data.linkedin_avatar_url || FALLBACK_PROFILE.linkedin_avatar_url
      if (linkedinUrl.startsWith('/') && !linkedinUrl.startsWith('//')) {
        linkedinUrl = `${BASE_URL}${linkedinUrl}`
      }

      return {
        ...FALLBACK_PROFILE,
        ...payload.data,
        github_avatar_url:
          payload.data.github_avatar_url || payload.data.avatar_url || FALLBACK_PROFILE.github_avatar_url,
        linkedin_avatar_url: linkedinUrl,
      }
    }

    return FALLBACK_PROFILE
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[ProfileService] Using fallback profile data:', err.message)
    }
    return FALLBACK_PROFILE
  }
}
