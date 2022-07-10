import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';
import { DiaryDispatchFunction } from '../App';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const DiaryEditor = ({ isEdit, editData }) => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { onCreate, onEdit } = useContext(DiaryDispatchFunction);

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(editData.date))));
      setEmotion(editData.emotion);
      setContent(editData.content);
    }
  }, [isEdit, editData]);

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새 일기를 작성하시겠습니까?'
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(editData.id, date, content, emotion);
      }
    }
    navigate('/', { replace: true });
  };

  return (
    <div className='DiaryEditor'>
      <MyHeader
        leftChild={
          <MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />
        }
        headText={isEdit ? '일기 수정하기' : '새 일기작성'}
      />
      <div>
        <section>
          <h4>오늘의 날짜는??</h4>
          <div className='input_wrapper'>
            <input
              className='input_date'
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정은??</h4>
          <div className='emotion_img_wrapper'>
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                isSelected={it.emotion_id === emotion}
                onClick={handleClickEmote}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className='text_wrapper'>
            <textarea
              placeholder='오늘은 어떤일이 있었나요??'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className='btn_wrapper'>
            <MyButton
              text={isEdit ? '수정취소' : '작성취소'}
              onClick={() => navigate('/', { replace: true })}
            />
            <MyButton
              text={isEdit ? '수정완료' : '작성완료'}
              type={'positive'}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
