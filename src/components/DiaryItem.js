import React, { memo, useContext } from 'react';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchFunction } from '../App';

const DiaryItem = ({ id, date, content, emotion }) => {
  const { onRemove } = useContext(DiaryDispatchFunction);
  const stringDate = new Date(date).toLocaleDateString();
  const navigate = useNavigate();

  const goDiary = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  const diaryDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemove(id);
    }
  };

  return (
    <div className='DiaryItem'>
      <div
        onClick={goDiary}
        className={['item_img_wrapper', `item_img_wrapper_${emotion}`].join(
          ' '
        )}
      >
        <img src={process.env.PUBLIC_URL + `/images/emotion${emotion}.png`} />
      </div>
      <div onClick={goDiary} className='item_info_wrapper'>
        <div className='info_date'>{stringDate}</div>
        <div className='info_content_preview'>{content.slice(0, 20)}</div>
      </div>
      <div className='item_btn_wrapper'>
        <div>
          <MyButton text={'수정 하기'} onClick={goEdit} />
        </div>
        <div>
          <MyButton text={'삭제하기'} type={'negative'} onClick={diaryDelete} />
        </div>
      </div>
    </div>
  );
};

export default memo(DiaryItem);
