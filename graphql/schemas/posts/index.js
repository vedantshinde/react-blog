const fs = require("fs");
const path = require("path");

const PostService = require("../../api/posts");
const { errorHandler } = require("../../api/utils");

const getPostsWithAuthors = (cb) => async (parent, args, context, info) => {
  const posts = await cb(args, parent).catch(errorHandler);

  if (!posts.length) return [];

  const authors = await PostService.getPostAuthors([
    ...new Set(posts.map(({ author_id }) => author_id)),
  ]);

  const authorMap = authors.reduce(
    (map, author) => ({
      ...map,
      [author.id]: `${author.first_name} ${author.last_name}`,
    }),
    {}
  );

  return posts.map(({ categories, author_id, ...rest }, index) => ({
    categories: categories.split(","),
    author: authorMap[author_id],
    ...rest,
  }));
};

module.exports = {
  resolvers: {
    Query: {
      getPostsByType: getPostsWithAuthors(
        async ({ type }) => await PostService.getPosts(type)
      ),
      getPostsByCategories: getPostsWithAuthors(
        async ({ categories }) =>
          await PostService.getPosts("default", categories)
      ),
      getAllPosts: getPostsWithAuthors(
        async () => await PostService.getPosts("default", null)
      ),
      getPost: async (parent, {id}) => {
        const post = await PostService.getPost(id);

        return post;
      }
    },
    Mutation: {
      createPost: async (parent, args) => await PostService.createPost(args),
    },
  },
  schema: fs
    .readFileSync(path.resolve(__dirname, "./posts-schema.graphql"))
    .toString(),
};
