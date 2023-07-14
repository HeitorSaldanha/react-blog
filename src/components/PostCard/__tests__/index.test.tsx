import { PostCard, Props } from '../PostCard';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

const mockedProps = {
  title: 'Example Title',
  tags: ['tag1', 'tag2'],
  body: 'Example body content',
  reactions: 5,
  id: 1,
};

const Component: React.FC<Props> = (props) => (
  <BrowserRouter>
    <PostCard {...props} />
  </BrowserRouter>
);

describe('PostCard', () => {
  it('renders the post card component', () => {
    render(<Component {...mockedProps} />);

    const titleElement = screen.getByText(mockedProps.title);
    expect(titleElement).toBeInTheDocument();

    mockedProps.tags.forEach((tag) => {
      const tagElement = screen.getByText(tag);
      expect(tagElement).toBeInTheDocument();
    });

    const bodyElement = screen.getByText(mockedProps.body);
    expect(bodyElement).toBeInTheDocument();

    const reactionsElement = screen.getByText(mockedProps.reactions.toString());
    expect(reactionsElement).toBeInTheDocument();

    const readMoreButton = screen.getByText('Read more');
    expect(readMoreButton).toBeInTheDocument();
  });

  it('renders the post card component with truncated body', () => {
    render(
      <Component
        {...mockedProps}
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
      />
    );

    const titleElement = screen.getByText(mockedProps.title);
    expect(titleElement).toBeInTheDocument();

    mockedProps.tags.forEach((tag) => {
      const tagElement = screen.getByText(tag);
      expect(tagElement).toBeInTheDocument();
    });

    const truncatedBody =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...';
    const bodyElement = screen.getByText(truncatedBody);
    expect(bodyElement).toBeInTheDocument();

    const reactionsElement = screen.getByText(mockedProps.reactions.toString());
    expect(reactionsElement).toBeInTheDocument();

    const readMoreButton = screen.getByText('Read more');
    expect(readMoreButton).toBeInTheDocument();
  });
});
