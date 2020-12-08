import React,{useState,useEffect} from 'react'
import axios from 'axios'

function App() {
  const  [chef,setChef]=useState([]);
  const  [page,setPage]=useState(1);
  const  [totalpage,setTotalpage]=useState(0);

  // 데이터 읽기
    useEffect(()=>{
      axios.get("http://localhost:8083/web/react_chef/chef_list.do",{
        params:{
          page:page
        }
      }).then((response)=>{
        setChef(response.data)
      })
    },[])

  // HTML 출력 : return
  const html=chef.map((m)=>
      <div className="col-md-2">
        <div className="thumbnail">
            <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
              <div className="caption">
                <p>{m.chef}</p>
              </div>
        </div>
  )
  return (
      <div className={"row"}>
        {html}
      </div>
  )
}
export default App;
