import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Post } from '../Components/Main/Post';

const text = "text"
const title = "title"
const author = "M"

const TestingFormButton = () => <Post title={title} text={text} author={author}/>;

describe('Post component', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <TestingFormButton />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render text from props', () => {
    const { getByText } = render(
      <TestingFormButton />,
    );
    expect(getByText(text)).toBeInTheDocument();
  });
});
