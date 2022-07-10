import React, { useState } from 'react';
import FilterMenu from './FilterMenu';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';

const timeOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된순' },
];

const filterOptionList = [
  { value: 'all', name: '모두다' },
  { value: 'good', name: '좋은감정만' },
  { value: 'bad', name: '나쁜감정만' },
];

const DiaryList = ({ diaryData }) => {
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');

  const navigate = useNavigate();

  const getProcessedDiaryData = () => {
    const filterCallback = (it) => {
      if (filter === 'good') {
        return it.emotion <= 3;
      } else {
        return it.emotion > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryData));
    const filteredList =
      filter === 'all' ? copyList : copyList.filter((it) => filterCallback(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className='DiaryList'>
      <div className='menu_wrapper'>
        <div className='left_col'>
          <FilterMenu
            value={sortType}
            onChange={setSortType}
            optionList={timeOptionList}
          />
          <FilterMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className='right_col'>
          <MyButton
            text={'새 일기작성'}
            type={'positive'}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>

      {getProcessedDiaryData().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

export default DiaryList;
