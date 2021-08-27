import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { PostMasonry, MasonryPost, PostGrid } from "../components/common";
import {
  GET_ALL_POSTS_QUERY,
  GET_POSTS_BY_TYPE_QUERY,
  GET_POSTS_BY_CATEGORIES_QUERY,
} from "../queries/posts";

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
  });
};

export default function Home() {
  const { data: allData, error: allPostsError } = useQuery(GET_ALL_POSTS_QUERY);

  // The trending section is commented out.

  // const {data: trendingData, error: trendingDataError} = useQuery(GET_POSTS_BY_TYPE_QUERY, {
  //       variables: {
  //           type: "trending"
  //       }
  //   })

  const { data: featuredData, error: featuredPostsError } = useQuery(
    GET_POSTS_BY_TYPE_QUERY,
    {
      variables: {
        type: "featured",
      },
    }
  );

  let allPosts, featuredPosts, lastFeaturedPost;
  // let trendingPosts

  if (allPostsError || featuredPostsError) {
    return "Oops! Something went sideways.";
  }

  if (allData && featuredData) {
    allPosts = allData.posts;
    featuredPosts = featuredData.posts;
    // trendingPosts = trendingData.posts;

    mergeStyles(featuredPosts, featuredConfig);
    // mergeStyles(trendingPosts, trendingConfig);

    // The last featured element is rendered seperately
    lastFeaturedPost = featuredPosts.pop();
  }

  console.log(allPosts);

  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <h1>Featured Posts</h1>
          <section className="featured-posts-container">
            {typeof featuredPosts !== "undefined" ? (
              <>
                <PostMasonry
                  posts={featuredPosts}
                  columns={2}
                  tagsOnTop={true}
                />
                <MasonryPost post={lastFeaturedPost} tagsOnTop={true} />
              </>
            ) : (
              <h1>Oops! Something went sideways.</h1>
            )}
            {/* <PostMasonry posts={featuredPosts} columns={2} tagsOnTop={true} />
                <MasonryPost post={lastFeaturedPost} tagsOnTop={true} /> */}
          </section>
        </div>
      </section>

      <section className="bg-white">
        <section className="container">
          <div className="row">
            <h1>All Posts</h1>
            {typeof allPosts !== "undefined" ? (
              <PostGrid posts={allPosts} columns={3} />
            ) : (
              <h1>Oops! Something Went Sideways.</h1>
            )}
          </div>
        </section>
      </section>
      {/*
          <section className="container">
            <div className="row">
              <h1>Trending Posts</h1>
              <PostMasonry posts={trendingPosts} columns={3} />
            </div>
          </section> */}
    </main>
  );
}
