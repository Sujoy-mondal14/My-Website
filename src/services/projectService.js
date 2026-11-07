import { apiFetch } from '../utils/api.js'

// Fallback project data if all network sources fail
const MOCK_PROJECTS = [
  { id: 1, name: 'Social Media Strategy', description: 'Customized content planning for your brand.', stars: 142, language: 'JavaScript', created_at: '2024-01-15', updated_at: '2024-11-10' },
  { id: 2, name: 'Content Creation', description: 'Videos, posts, and visual content', stars: 89, language: 'TypeScript', created_at: '2024-01-14', updated_at: '2024-11-09' },
  { id: 3, name: 'Account Management', description: 'Posting, scheduling, and engagement', stars: 234, language: 'Python', created_at: '2024-01-13', updated_at: '2024-11-08' },
  { id: 4, name: 'Analytics & Reporting', description: 'Performance tracking and insights', stars: 67, language: 'React', created_at: '2024-01-12', updated_at: '2024-11-07' },
  { id: 5, name: 'E-Commerce Platform', description: 'Full-stack shopping experience', stars: 312, language: 'JavaScript', created_at: '2023-01-12', updated_at: '2024-08-20' },
  { id: 6, name: 'Portfolio Website', description: 'Personal portfolio & showcase', stars: 56, language: 'React', created_at: '2024-07-18', updated_at: '2024-08-10' },
  { id: 7, name: 'Chat Application', description: 'Real-time messaging platform', stars: 198, language: 'Node.js', created_at: '2023-09-05', updated_at: '2024-07-12' },
  { id: 8, name: 'Weather Dashboard', description: 'Live weather tracking with forecasts', stars: 45, language: 'JavaScript', created_at: '2024-02-28', updated_at: '2024-06-15' },
  { id: 9, name: 'Task Manager', description: 'Kanban board for project management', stars: 178, language: 'TypeScript', created_at: '2023-11-22', updated_at: '2024-05-30' },
  { id: 10, name: 'Blog Engine', description: 'Markdown-powered blogging platform', stars: 95, language: 'Python', created_at: '2024-04-10', updated_at: '2024-05-20' },
  { id: 11, name: 'Music Player', description: 'Audio streaming and playlist manager', stars: 267, language: 'React', created_at: '2023-03-15', updated_at: '2024-04-25' },
  { id: 12, name: 'URL Shortener', description: 'Custom short link generator', stars: 34, language: 'Node.js', created_at: '2024-06-08', updated_at: '2024-04-14' },
  { id: 13, name: 'Image Gallery', description: 'Responsive photo grid with lightbox', stars: 112, language: 'JavaScript', created_at: '2023-08-20', updated_at: '2024-03-10' },
  { id: 14, name: 'Recipe Finder', description: 'Search and save cooking recipes', stars: 76, language: 'React', created_at: '2024-01-30', updated_at: '2024-03-01' },
  { id: 15, name: 'Fitness Tracker', description: 'Workout logging and progress charts', stars: 203, language: 'TypeScript', created_at: '2023-05-18', updated_at: '2024-02-05' },
  { id: 16, name: 'Code Snippets Hub', description: 'Save and share code snippets', stars: 89, language: 'Python', created_at: '2024-08-12', updated_at: '2024-02-02' },
  { id: 17, name: 'Video Streaming App', description: 'HLS video player with playlists', stars: 345, language: 'JavaScript', created_at: '2023-02-14', updated_at: '2024-01-30' },
  { id: 18, name: 'Expense Tracker', description: 'Personal finance management tool', stars: 67, language: 'React', created_at: '2024-03-05', updated_at: '2024-01-18' },
  { id: 19, name: 'Quiz Platform', description: 'Interactive quiz builder and player', stars: 156, language: 'Node.js', created_at: '2023-10-28', updated_at: '2023-12-20' },
  { id: 20, name: 'DevOps Dashboard', description: 'CI/CD pipeline monitoring', stars: 423, language: 'Python', created_at: '2023-04-02', updated_at: '2023-11-04' },
]

const PAGE_SIZE = 4

function sortProjects(projects, sortBy) {
  const sorted = [...projects]
  switch (sortBy) {
    case 'recent':
      return sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    case 'famous':
      return sorted.sort((a, b) => b.stars - a.stars)
    default:
      return sorted
  }
}

function slicePage(sorted, page) {
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  return {
    projects: sorted.slice(start, end),
    hasMore: end < sorted.length,
    total: sorted.length,
    page,
  }
}

// Fetches from backend /api/v1/projects via centralized API client
export async function fetchProjects({ page = 1, sortBy = 'recent' } = {}) {
  // 1. Try backend (Lambda or local)
  try {
    const response = await apiFetch(
      `/projects?filter=${encodeURIComponent(sortBy)}&page=${page}&limit=${PAGE_SIZE}`
    )

    if (response.ok) {
      const json = await response.json()
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return {
          projects: json.data.map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count ?? repo.stars ?? 0,
            language: repo.language || 'Code',
            html_url: repo.html_url || `https://github.com/Sujoy-mondal14/${repo.name}`,
          })),
          hasMore: json.pagination?.hasMore ?? false,
          total: json.pagination?.total ?? json.data.length,
          page: json.pagination?.page ?? page,
        }
      }
    }
  } catch {
    // Backend offline / cold start timed out — fall through
  }

  // 2. Direct GitHub public API fallback (no auth — 60 req/hr unauthenticated)
  try {
    const ghRes = await fetch(
      'https://api.github.com/users/Sujoy-mondal14/repos?per_page=100&sort=updated',
      { headers: { Accept: 'application/vnd.github.v3+json' }, mode: 'cors' }
    )
    if (ghRes.ok) {
      const repos = await ghRes.json()
      if (Array.isArray(repos) && repos.length > 0) {
        const transformed = repos.map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || 'Public GitHub repository',
          stars: repo.stargazers_count || 0,
          language: repo.language || 'Code',
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          html_url: repo.html_url,
        }))
        return slicePage(sortProjects(transformed, sortBy), page)
      }
    }
  } catch {
    // GitHub API rate-limited or offline
  }

  // 3. Local mock dataset
  await new Promise((resolve) => setTimeout(resolve, 300))
  return slicePage(sortProjects(MOCK_PROJECTS, sortBy), page)
}
