import React, { useContext, useEffect, useState } from 'react';
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import DiaryList from '../components/DiaryList';
import { DiaryState } from '../App';

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState([]);
  const diaryData = useContext(DiaryState);

  const headText = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정일기장`;
  }, []);

  useEffect(() => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getTime();

    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();

    setData(
      diaryData.filter((it) => firstDay <= it.date && it.date <= lastDay)
    );
  }, [currentDate, diaryData]);

  const increaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      )
    );
  };

  const decreaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      )
    );
  };

  return (
    <div>
      <a
        href='https://github.com/dudtk3612/emotion-diary-son'
        rel='noreferrer noopener'
        target='_blank'
        style={{
          display: 'inline-block',
          marginTop: '15px',
          textDecoration: 'none',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        emotion-diary github
      </a>
      <MyHeader
        leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
        headText={headText}
        rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryData={data} />
    </div>
  );
};

export default Home;
