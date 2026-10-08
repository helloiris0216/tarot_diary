import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../data/blog-posts";

export default function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <article className="blog-card">
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-image">
          <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 700px) 90vw, (max-width: 1050px) 45vw, 30vw" />
        </div>
        <div className="topic-meta"><span>0{index + 1}</span><span>{post.category}</span></div>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <span className="blog-read-more">閱讀文章 <span aria-hidden="true">↗</span></span>
      </Link>
    </article>
  );
}
