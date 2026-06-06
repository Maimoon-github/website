import { HeroSection, FeaturedProjects, LatestPosts, CTASection, DomainExplorer } from '@/components/home';
import { ProjectService } from '@/services/projects.service';
import { BlogService } from '@/services/blog.service';
import { KnowledgeService } from '@/services/knowledge.service';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [
    { data: projects }, 
    { data: posts },
    { data: domains }
  ] = await Promise.all([
    ProjectService.getProjects(),
    BlogService.getPosts(),
    KnowledgeService.getDomains()
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProjects projects={projects || []} />
      <DomainExplorer domains={domains || []} />
      <LatestPosts posts={posts || []} />
      <CTASection />
    </div>
  );
}
