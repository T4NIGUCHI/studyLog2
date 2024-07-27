import { useState, useEffect } from "react";
import "./styles.css";
import { supabase } from './supabase';

export const App = () => {
  const [records, setRecords] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('study-record') 
          .select('title, time');

        if (error) {
          console.error("Error fetching data:", error);
          setError("データの取得中にエラーが発生しました");
        } else {
          setRecords(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("データの取得中にエラーが発生しました");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  const handleInputTitle = (event) => {
    setInputTitle(event.target.value);
    if (event.target.value !== "" && inputTime !== "") {
      setError("");
    }
  };

  const handleInputTime = (event) => {
    if (/^\d*$/.test(event.target.value)) {
      setInputTime(event.target.value);
      if (inputTitle !== "" && event.target.value !== "") {
        setError("");
      }
    }
  };

  const handleSetRecords = async () => {
    if (inputTitle === "" || inputTime === "") {
      setError("入力されていない項目があります");
    } else {
      const newRecord = { title: inputTitle, time: inputTime };
      try {
        const { error } = await supabase
          .from('study-record') 
          .insert([newRecord]);

        if (error) {
          console.error("Error inserting data:", error);
          setError("データの追加中にエラーが発生しました");
        } else {
          setRecords([...records, newRecord]);
          setInputTitle("");
          setInputTime("");
          setError("");
        }
      } catch (error) {
        console.error("Error inserting data:", error);
        setError("データの追加中にエラーが発生しました");
      }
    }
  };

  const handleDeleteRecord = async (record) => {
    try {
      const { error } = await supabase
        .from('study-record')
        .delete()
        .eq('title', record.title)
        .eq('time', record.time);

      if (error) {
        console.error("Error deleting record:", error);
        setError("データの削除中にエラーが発生しました");
      } else {
        const updatedRecords = records.filter(item => item !== record);
        setRecords(updatedRecords);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      setError("データの削除中にエラーが発生しました");
    }
  };

  const sumTime = records.reduce((sum, record) => sum + parseInt(record.time, 10), 0);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <h1 data-testid="title">学習記録アプリ</h1>
      <div>
        学習内容 <input placeholder="学習内容" value={inputTitle} onChange={handleInputTitle} />
        <p />
        学習時間 <input placeholder="学習時間" value={inputTime} onChange={handleInputTime} /> 時間
      </div>

      <div>
        入力されている学習内容: {inputTitle}
        <p />
        入力されている時間: {inputTime}
        <p />
        <button onClick={handleSetRecords}>登録</button>
        <p>{error}</p>
      </div>

      <div>
        <ul>
          {records.map((record, index) => (
            <li key={index}>
              {record.title} {record.time}時間
              <button data-testid={`delete-button-${index}`} onClick={() => handleDeleteRecord(record)}>削除</button>
            </li>
          ))}
        </ul>
      </div>

      <p>合計時間：{sumTime}時間</p>
    </div>
  );
};

export default App;
