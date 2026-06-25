export type BlogPost = {
  type: 'blog';
  title: string;
  date: Date;
  description: string;
  slug: string;
};

export type ReleasePost = {
  type: 'release';
  title: string;
  date: Date;
  description: string;
  slug: string;
  repo?: string;
};

export type ProjectPost = {
  type: 'project';
  title: string;
  date: Date;
  description: string;
  slug: string;
};

export type Post = BlogPost | ReleasePost | ProjectPost;
