import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  const files = fs.readdirSync(postsDirectory);
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, '');
    const fullPath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return { slug, frontmatter: data };
  });
  return posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}