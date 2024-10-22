// props를 호출했을 때 
const List = (props) => {
    const {tech}=props;
   return (
     <li style={{listStyle:'none'}}>
       {tech}
     </li>
   )
 }
 
 export default List
 