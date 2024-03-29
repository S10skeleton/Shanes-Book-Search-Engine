import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;