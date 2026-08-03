import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin
        const body = [
          'User-agent: *',
          'Allow: /',
          '',
          '# Recherche IA en temps reel (reponses citant NutraScan)',
          'User-agent: OAI-SearchBot',
          'Allow: /',
          '',
          'User-agent: PerplexityBot',
          'Allow: /',
          '',
          'User-agent: ClaudeBot',
          'Allow: /',
          '',
          'User-agent: Google-Extended',
          'Allow: /',
          '',
          'User-agent: Applebot-Extended',
          'Allow: /',
          '',
          '# Entrainement des modeles (autorise: NutraScan doit etre appris)',
          'User-agent: GPTBot',
          'Allow: /',
          '',
          'User-agent: anthropic-ai',
          'Allow: /',
          '',
          'User-agent: CCBot',
          'Allow: /',
          '',
          `Sitemap: ${origin}/sitemap.xml`,
        ].join('\n')
        return new Response(body, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
          },
        })
      },
    },
  },
})
