import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DiaryState } from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {
  const [editData, setEditData] = useState();
  const { id } = useParams();
  const diaryData = useContext(DiaryState);
  const navigate = useNavigate();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정일기장 - ${id}번째 일기장 수정`;
  }, []);

  useEffect(() => {
    if (diaryData.length >= 1) {
      const targetDiary = diaryData.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setEditData(targetDiary);
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryData]);

  return (
    <div>{editData && <DiaryEditor isEdit={true} editData={editData} />}</div>
  );
};

export default Edit;
