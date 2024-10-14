// import React, { useEffect, useState } from 'react';
// import './SliderBar.css';
// import { retrieveCategories } from '../../API/ApiCategory';

// const SideBar = () => {
// // const {}

//   return (
//     <div className="sidebar">
//       <div className="filter-section">
//         <div className="header-filter">
//           <h3>Categories</h3>
//         </div>
//         {categories.map((category) => (
//           <div key={category.id}>
//             <button
//               id={category.id}
              
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 color: 'black',
//                 textDecoration: 'none',
//                 cursor: 'pointer',
//                 fontFamily: 'Inika, sans-serif',
//                 fontSize: '1rem',
//                 fontWeight: 'bolder',
//                 position: 'relative',
//                 display: 'inline-block',

//               }}
//             >
//               {category.name}
//               <span
//                 style={{
//                   position: 'absolute',
//                   bottom: '-2px',
//                   left: 2,
//                   right: 2,
//                   borderBottom: '1px solid black',
//                   content: ' ',
//                   display: 'block',
//                   height: '1px',
//                 }}
//               />
//             </button>
//             {/* {category.children && (
//               <div className={`sub-categories ${visibleCategories[category.id] ? 'expanded' : ''}`}>
//                 {category.children.map((sub) => (
//                   <div key={sub.id}>
//                     <button
//                       id={sub.id}
//                       onClick={() => onCategoryChange(sub.name)}
//                       style={{
//                         background: 'none',
//                         border: 'none',
//                         color: 'black',
//                         textDecoration: 'none',
//                         cursor: 'pointer',
//                         fontFamily: 'Inika, sans-serif',
//                         padding: '0.5rem 0 0 0',
//                         fontWeight: 'lighter',
//                         hover: 'text'
//                       }}
//                     >
//                       {sub.name}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )} */}
//           </div>
//         ))}
//       </div>
//       <div className="filter-section">
//         <h3>Gender</h3>
//         {/* {genders.map((gender) => (
//           <div key={gender}>
//             <input
//               type="radio"
//               id={gender}
//               name="gender"
//               value={gender}
//               onChange={(e) => onGenderChange(e.target.value)}
//             />
//             <label htmlFor={gender}>{gender}</label>
//           </div>
//         ))} */}
//       </div>
//       {/* <div className="filter-section">
//         <h3>Price Range</h3>
//         <input type="range" min="0" max="500" onChange={(e) => onPriceChange(e.target.value)} />
//       </div> */}
//     </div>
//   );
// };

// export default SideBar;
