// export default function(state, data) { 
//   return new Promise(    
//     function(resolve, reject) {
//       resolve(this.setState({ [state]: data }, () => { this.handleData() })); 
//     }
//   );  
// };


export default function(state, data) { 
  this.setState({ [state]: data }, () => { this.handleData() });
  console.log(this);
};