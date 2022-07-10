import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DiaryState } from '../App';
import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const Diary = () => {
  const [originData, setOriginData] = useState();
  const { id } = useParams();
  const diaryData = useContext(DiaryState);
  const navigate = useNavigate();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정일기장 - ${id}번째 일기장`;
  }, []);

  useEffect(() => {
    if (diaryData.length >= 1) {
      const targetDiary = diaryData.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryData]);

  if (!originData) {
    return <div className='Diary'>로딩중입니다......</div>;
  } else {
    const currentEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(originData.emotion)
    );

    return (
      <div className='Diary'>
        <MyHeader
          leftChild={
            <MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />
          }
          headText={`${getStringDate(new Date(originData.date))} 기록`}
          rightChild={
            <MyButton
              text={'수정하기'}
              onClick={() => navigate(`/edit/${id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정은??</h4>
            <div
              className={[
                'current_img_wrapper',
                `current_img_wrapper${currentEmotionData.emotion_id}`,
              ].join(' ')}
            >
              <img src={currentEmotionData.emotion_img} />
              <div className='emotion_descript'>
                {currentEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className='content_wrapper'>
              <p>{originData.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
