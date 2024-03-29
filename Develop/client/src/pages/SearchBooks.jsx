import { useState } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_BOOKS } from '../utils/queries';  // Update with your actual query
import { SAVE_BOOK } from '../utils/mutations';  // Update with your actual mutation

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState('');
  const { data: searchData, refetch: refetchBooks } = useQuery(SEARCH_BOOKS, {
    skip: true,  // Prevents the query from running automatically
  });
  const [saveBook] = useMutation(SAVE_BOOK);

  const searchedBooks = searchData?.searchBooks || [];

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    try {
      await refetchBooks({ searchInput });
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    if (!Auth.loggedIn()) {
      return false;
    }
    try {
      await saveBook({ variables: { bookId } });
      // Additional logic after saving a book (e.g., update local state or refetch)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Container fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a book"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Container>
      <Container>
        <h2 className="pt-5">
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {/* Map through searchedBooks to display results */}
          {/* ... */}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
