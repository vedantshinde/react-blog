import React from "react";
import { PostMasonry, MasonryPost, PostGrid } from "../components/common";
import trending from "../assets/mocks/trending";
import featured from "../assets/mocks/featured";

const trendingConfig = {
  1: {
    gridArea: "1 / 2 / 3/ 3",
  },
};

const featuredConfig = {
  0: {
    gridArea: "1 / 1 / 2 / 3",
    height: "300px",
  },
  1: {
    height: "300px",
  },
  3: {
    height: "630px",
    marginLeft: "30px",
    width: "630px",
  },
};

const mergeStyles = function (posts, config) {
  posts.forEach((post, index) => {
    post.style = config[index];
    post.description =
      "Remember, if the time should come, when you have to make a choice between what is right and what is easy, remember what happened to a boy who was good, and kind, and brave, because he strayed across the path of Lord Voldemort. Remember Cedric Diggory.";
  });
};

const recentPosts = [...trending, ...featured, ...featured];

mergeStyles(trending, trendingConfig);
mergeStyles(featured, featuredConfig);

// The last featured post is displayed seperately
const lastFeaturedPost = featured.pop();

export default function Home() {
  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <h1>Featured Posts</h1>
          <section className="featured-posts-container">
            <PostMasonry posts={featured} columns={2} tagsOnTop={true} />
            <MasonryPost post={lastFeaturedPost} tagsOnTop={true} />
          </section>
        </div>
      </section>

      <section className="bg-white">
        <section className="container">
          <div className="row">
            <h1>Recent Posts</h1>
            <PostGrid posts={recentPosts} columns={3} />
          </div>
        </section>
      </section>

      <section className="container">
        <div className="row">
          <h1>Trending Posts</h1>
          <PostMasonry posts={trending} columns={3} />
        </div>
      </section>
    </main>
  );
}
