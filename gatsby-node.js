/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// exports.createResolvers = ({
//   actions,
//   getCache,
//   createNodeId,
//   createResolvers,
// }) => {
//   const { createNode } = actions
//   createResolvers({
//     Drupal_MediaImage: {
//       gatsbyImageFile: {
//         type: `File`,
//         resolve(source) {
//           return createRemoteFileNode({
//             url: source.fieldImage.url,
//             getCache,
//             createNode,
//             createNodeId,
//           })
//         },
//       },
//     },
//   })
// }

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const articles = await graphql(`
    query {
      drupal {
        nodeQuery(limit: 10000, filter: {conditions: [{operator: EQUAL, field: "type", value: ["article"]}]}) {
          entities {
            ... on Drupal_NodeArticle {
              title
              uuid
              nid
              path {
                alias
              }
            }
          }
        }
      }
    }
  `);

  articles.data.drupal.nodeQuery.entities.map(articleData =>
    createPage({
      path: articleData.path.alias,
      component: path.resolve(`src/templates/article.js`),
      context: {
        ArticleId: articleData.nid.toString(),
      },
    })
  );
}