const db = require("../../database/mysql");
const { errorHandler } = require("../utils");
const intersection = require("lodash/intersection");

module.exports = {
  getPost: async (id) => {
    const posts = db
      .select("*")
      .from("blog_posts")
      .where({ id })
      .catch(errorHandler);

    const comments = await db
      .select("*")
      .from("blog_post_comments")
      .where({ post_id: id })
      .catch(errorHandler);

    let commentAuthorIds = [...new Set(comments.map(({ user_id }) => user_id))];

    let commentAuthors = await db
      .select("*")
      .from("users")
      .whereIn("id", commentAuthorIds);

    comments.forEach((comment) => {
      let user = commentAuthors.find(({ id }) => id === comment.user_id);

      comment.author = `${user.first_name} ${user.last_name}`;
      comment.author_image = user.image;
    });

    let likes = db
      .select("*")
      .from("blog_post_likes")
      .where({ post_id: id })
      .catch(errorHandler);

    let categories = await db
      .select("*")
      .from("blog_post_categories")
      .leftJoin("blog_categories", "category_id", "blog_categories.id")
      .where({ post_id: id })
      .catch(errorHandler);

    let [post] = await posts;

    return {
      ...post,
      comments,
      likes: await likes.length,
      categories: categories.map(({ label }) => label),
      categoryColors: categories.map(({labelColor}) => labelColor)
    };
  },

  createPost: async (args) =>
    await db.insert(args.data).then((res) => {
      return res;
    }),

  getPosts: async (type, categories) => {
    let query = db
      .select(
        "blog_posts.id",
        "blog_posts.description",
        "blog_posts.author_id",
        "title",
        "image",
        "created_at",
        "updated_at",
        db.raw("GROUP_CONCAT(label) as categories"),
        db.raw("GROUP_CONCAT(labelColor) as categoryColors"),
        db.raw("GROUP_CONCAT(blog_categories.id) as cat_ids")
      )
      .from("blog_posts")
      .leftJoin(
        "blog_post_categories",
        "blog_posts.id",
        "blog_post_categories.post_id"
      )
      .leftJoin(
        "blog_categories",
        "blog_categories.id",
        "blog_post_categories.category_id"
      )
      .where({ active: 1 })
      .groupBy("blog_posts.id");

    qry = {
      trending: () =>
        query
          .select(db.raw("COUNT(blog_post_likes.user_id) as likes"))
          .leftJoin(
            "blog_post_likes",
            "blog_post_likes.post_id",
            "blog_posts.id"
          )
          .groupBy("blog_posts.id")
          .orderBy("likes", "desc")
          .limit(5),

      featured: () => query.whereIn("blog_posts.id", [1, 2, 3, 4, 5]),

      recent: () => query.orderBy("updated_at", "desc").limit(5),

      default: () => query,
    }[type || "default"]();

    return qry
      .then((data) => {
        data.map((post) => {
          if (post.categoryColors)
            post.categoryColors = post.categoryColors.split(",");
        });

        if (categories) {
          return data.filter((post) => {
            return (
              post.categories &&
              intersection(post.categories.split(",").map(String), categories)
                .length
            );
          });
        }

        return data;
      })
      .catch(errorHandler);
  },

  getPostLikeCounts: async (id) =>
    await db
      .select(db.raw("COUNT(user_id) as likes"), "post_id")
      .from("blog_post_likes")
      .where({ post_id: id })
      .groupBy("post_id")
      .catch(errorHandler),

  getPostComments: async (id) =>
    await db
      .select("*")
      .from("blog_post_comments")
      .where("post_id", id)
      .catch(errorHandler),

  getPostAuthors: async (ids) =>
    await db.select("*").from("users").whereIn("id", ids).catch(errorHandler),
};
