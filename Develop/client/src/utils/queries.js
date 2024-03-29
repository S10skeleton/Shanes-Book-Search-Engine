import { gql } from '@apollo/client';

export const SEARCH_BOOKS = gql`
  query searchBooks($searchInput: String!) {
    searchBooks(searchInput: $searchInput) {
      bookId
      authors
      title
      description
      image
      link
    }
  }
`;
export const QUERY_USER = gql`
  query {
    user {
      _id
      username
      }
  }
`;
