import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../App';
import { supabase } from '../supabase';

// Before running the tests, make sure to clear any existing data or set up test-specific data.
beforeAll(async () => {
  // Clear the table or set up initial data if necessary
  await supabase.from('study-record').delete().neq('id', 0);
});

test('should display the title', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  const titleElement = await screen.findByTestId('title');
  expect(titleElement).toHaveTextContent('学習記録アプリ');
});

test('should add and delete a new record', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  fireEvent.change(screen.getByPlaceholderText('学習内容'), { target: { value: 'Math' } });
  fireEvent.change(screen.getByPlaceholderText('学習時間'), { target: { value: '2' } });
  fireEvent.click(screen.getByText('登録'));

    const deleteButtons = screen.getAllByText('削除');
    const lastDeleteButton = deleteButtons[deleteButtons.length - 1];

    fireEvent.click(lastDeleteButton);

});

test('should show an error if inputs are empty', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('登録'));

  await waitFor(() => {
    expect(screen.getByText('入力されていない項目があります')).toBeInTheDocument();
  });
});
