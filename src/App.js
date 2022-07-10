import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import { createContext, useEffect, useReducer, useRef } from 'react';

const INIT = 'INIT';
const CREATE = 'CREATE';
const EDIT = 'EDIT';
const REMOVE = 'REMOVE';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case INIT: {
      return action.data;
    }
    case CREATE: {
      newState = [action.data, ...state];
      break;
    }
    case EDIT: {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    case REMOVE: {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryState = createContext();
export const DiaryDispatchFunction = createContext();
function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(1);

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (diaryList.length >= 1) {
        dataId.current = diaryList[0].id + 1;
        dispatch({
          type: INIT,
          data: diaryList,
        });
      }
    }
  }, []);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: CREATE,
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: EDIT,
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  const onRemove = (targetId) => {
    dispatch({
      type: REMOVE,
      targetId,
    });
  };

  return (
    <DiaryState.Provider value={data}>
      <DiaryDispatchFunction.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/diary/:id' element={<Diary />} />
              <Route path='/edit/:id' element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchFunction.Provider>
    </DiaryState.Provider>
  );
}

export default App;
