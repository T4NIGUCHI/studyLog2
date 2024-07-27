import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../App';
import { supabase } from '../supabase'; // 実際の supabase クライアントをインポート

jest.mock('../supabase'); // Supabaseをモック

// モックデータとモック関数の設定
const mockSelect = jest.fn();
const mockInsert = jest.fn();
const mockDelete = jest.fn();

beforeEach(() => {
  // モック関数のリセット
  jest.clearAllMocks();

  supabase.from.mockReturnThis();
  supabase.select = mockSelect;
  supabase.insert = mockInsert;
  supabase.delete = mockDelete;
  supabase.eq = jest.fn().mockReturnThis();
});

test('should display the title', async () => {
  mockSelect.mockResolvedValueOnce({ data: [], error: null });

  render(<App />);


  // コンポーネントが読み込み完了するのを待つ
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  // タイトルの要素が正しくレンダリングされるのを待つ
  const titleElement = await screen.findByTestId('title');
  expect(titleElement).toHaveTextContent('学習記録アプリ');
});

test('should add a new record', async () => {
  mockSelect.mockResolvedValueOnce({ data: [], error: null });
  mockInsert.mockResolvedValueOnce({ error: null });
  mockSelect.mockResolvedValueOnce({ data: [{ title: 'Math', time: '2' }], error: null });

  render(<App />);

  // Wait for the component to finish loading
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  fireEvent.change(screen.getByPlaceholderText('学習内容'), { target: { value: 'Math' } });
  fireEvent.change(screen.getByPlaceholderText('学習時間'), { target: { value: '2' } });
  fireEvent.click(screen.getByText('登録'));

  // Wait for the record to be added
  await waitFor(() => {
    // Check if the new record is displayed
    expect(screen.getByText('Math 2時間')).toBeInTheDocument();
  });
});

test('should delete a record', async () => {
  mockSelect.mockResolvedValueOnce({ data: [{ title: 'Math', time: '2' }], error: null });
  mockDelete.mockResolvedValueOnce({ error: null });

  render(<App />);

  // Wait for the component to finish loading
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  fireEvent.change(screen.getByPlaceholderText('学習内容'), { target: { value: 'Math' } });
  fireEvent.change(screen.getByPlaceholderText('学習時間'), { target: { value: '2' } });
  fireEvent.click(screen.getByText('登録'));

  // Wait for the record to be added
  await waitFor(() => {
    expect(screen.getByText('Math 2時間')).toBeInTheDocument();
  });

  // Delete the record
  fireEvent.click(screen.getByText('削除'));

  // Verify that the record is deleted
  await waitFor(() => {
    expect(screen.queryByText('Math 2時間')).not.toBeInTheDocument();
  });
});

test('should show an error if inputs are empty', async () => {
  render(<App />);

  // Wait for the component to finish loading
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  // Attempt to submit without filling inputs
  fireEvent.click(screen.getByText('登録'));

  // Verify that the error message is displayed
  await waitFor(() => {
    expect(screen.getByText('入力されていない項目があります')).toBeInTheDocument();
  });
});
