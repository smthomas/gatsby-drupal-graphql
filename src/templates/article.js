import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

const Article = ({ data }) => {
  const post = data.drupal.nodeById;

  return (
    <Layout>
      <h1>{post.title}</h1>

      <div
        dangerouslySetInnerHTML={{ __html: post.body.processed }}
      />
    </Layout>
  );
};

Article.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query($ArticleId: String!) {
    drupal {
      nodeById(id: $ArticleId) {
        ... on Drupal_NodeArticle {
          title
          body {
            processed
          }
        }
      }
    }
  }
`;

export default Article;