import { HeroSection, FeaturedProjects, LatestPosts, CTASection, DomainExplorer } from '@/components/home';
import { DynamicPageContent } from '@/components/shared/data-display';
import { ProjectService } from '@/services/projects.service';
import { BlogService } from '@/services/blog.service';
import { KnowledgeService } from '@/services/knowledge.service';
import { HomepageService } from '@/services/homepage.service';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [
    { data: projects }, 
    { data: posts },
    { data: domains },
    { data: hero },
    { data: stats }
  ] = await Promise.all([
    ProjectService.getProjects(),
    BlogService.getPosts(),
    KnowledgeService.getDomains(),
    HomepageService.getHeroContent(),
    HomepageService.getStats()
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection hero={hero} stats={stats || []} />
      <FeaturedProjects projects={projects || []} />
      <DomainExplorer domains={domains || []} />
      <LatestPosts posts={posts || []} />
      <DynamicPageContent page="home" />
      <CTASection />
    </div>
  );
}
