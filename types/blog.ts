export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  readingTime?: string;
  coverImage?: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: React.ReactElement;
}
