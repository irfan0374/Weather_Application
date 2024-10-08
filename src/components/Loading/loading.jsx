import React from 'react';
import './loading.css'
function Loading() {
  return (
<div className='bg-black w-full' id="container">
  <label className="loading-title">Loading ...</label>
  <span className="loading-circle sp1">
    <span className="loading-circle sp2">
      <span className="loading-circle sp3"></span>
    </span>
  </span>
</div>
  );
}

export default Loading;