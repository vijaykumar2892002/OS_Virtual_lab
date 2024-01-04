import React from 'react';
import "../styles/Filter.css";

const Filter = ({ filterData, category, setcategory }) => {
  function filterHandler(title) {
    setcategory(title);
  }

  return (
    <div className='filter-main'>
      {filterData.map((data) => {
        const isActive = category === data.title; // Define isActive here
        return (
          <button className={`button-filter ${isActive ? 'activee' : 'inactive'}`} key={data.id} onClick={() => filterHandler(data.title)}>
  {data.title}
</button>

        );
      })}
    </div>
  );
};

export default Filter;
