import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { useQuery } from "@apollo/client";
import { useHistory, useParams, useRouteMatch } from "react-router";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Helmet from "react-helmet";

import { GET_POST_QUERY } from "../queries/posts";

const options = {
  theme: "snow",
  readOnly: true,
};

export default function PostViewer() {
  const contentContainer = useRef(null);
  const [editorEl, setEditorEl] = useState(null);
  const match = useRouteMatch();
  const { id } = useParams();
  let history = useHistory();

  const { data, error, loading } = useQuery(GET_POST_QUERY, {
    variables: { id },
    onCompleted: ({ post }) => {
      // console.log("hello");

      if (post.text) {
        var ops = [
          {
            insert: post.text,
          },
        ];
        // console.log(typeof JSON.parse(JSON.stringify(delta)))
        editorEl.setContents(ops, "api");
      }
    },
  });

  const editPost = () =>
    history.push({
      pathname: "/post-editor",
      state: {
        data,
      },
    });

  useEffect(() => {
    setEditorEl(new Quill(contentContainer.current, options));
  }, []);

  return (
    <article className="post-viewer-container">
      <Helmet>
        <title>{data?.post?.title}</title>
        <meta property="og:image" content={data?.post?.image} />
        <meta property="og-title" content={data?.post?.title} />
        <meta property="og:url" content={match.url} />
        <meta property="og:type" content="article" />
        <meta name="description" content={data?.post?.description} />
      </Helmet>
      <Button type="primary" shape="round" onClick={editPost}>
        Edit Post
      </Button>
      <section className="post-intro-container">
        {data?.post?.bg_type === "2" ? (
          <section className="iframe-container">
            {data?.post?.bg_src && (
              <iframe
                title="background-video"
                src={data?.post?.bg_src}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media: gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </section>
        ) : (
          <figure>
            <img
              src={
                data?.post?.bg_src ||
                "https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Very_Black_screen.jpg/800px-Very_Black_screen.jpg"
              }
              alt="post-background"
            />
          </figure>
        )}
      </section>
      <section className="post-title-container">
        <div className="title-wrapper">
          <h1>{data?.post?.title}</h1>
          <p className="flex flex-column">
            <span>{data?.post?.author && `Author: ${data?.post?.author}`}</span>
            <span>
              Last Updated:
              {data?.post?.updated_at &&
                new Date(parseInt(data?.post?.updated_at)).toLocaleString()}
            </span>
          </p>
        </div>
      </section>
      <section className="post-content-container">
        <section ref={contentContainer}></section>
      </section>
    </article>
  );
}
