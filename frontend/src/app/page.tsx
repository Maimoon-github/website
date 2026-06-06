import { HeroSection, FeaturedProjects, LatestPosts } from '@/components/home';
import { ProjectService } from '@/services/projects.service';
import { BlogService } from '@/services/blog.service';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [{ data: projects }, { data: posts }] = await Promise.all([
    ProjectService.getProjects(),
    BlogService.getPosts()
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProjects projects={projects || []} />
      <LatestPosts posts={posts || []} />
    </div>
  );
}
