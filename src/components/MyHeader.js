import React from 'react';

const MyHeader = ({ leftChild, headText, rightChild }) => {
  return (
    <header className='MyHeader'>
      <div className='left_child'>{leftChild}</div>
      <div className='head_text'>{headText}</div>
      <div className='right_child'>{rightChild}</div>
    </header>
  );
};

export default MyHeader;
