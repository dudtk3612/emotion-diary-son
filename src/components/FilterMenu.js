import React, { memo } from 'react';

const FilterMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className='FilterMenu'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, index) => (
        <option key={index} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

export default memo(FilterMenu);
