import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
function App() {
  // 변수 선언
  const [recipe,setRecipe]=useState([]);
  const [page,setPage]=useState(1);
  const [total,setTotal]=useState(1);

  // componentWillMount(초기화 때문에 한 번만 수행)
  // async, await : 동기화에서 비동기화로 변경
  useEffect(async ()=>{
    // url에 연결해서 데이터를 불러온다.
    await axios.get("http://localhost:8083/web/react_recipe/recipe_list.do",{
      params:{
        page:page // 자동으로 uri뒤에 ?page=1이라고 붙여준다.
      }
      // then은 결과값을 호출하는 위치
      // then(function (response))도 아래와 같은 코딩이다.
    }).then((response)=>{
      setRecipe(response.data)
      console.log(response.data)
    })
  },[])
  useEffect(async ()=>{
    await axios.get("http://localhost:8083/web/react_recipe/totalpage.do")
        .then((response)=>{
            setTotal(response.data)
        })
  },[])

  // 데이터를 받아 왔으니까 화면에 출력을 해줘야 한다.
  // const html=recipe.map(function(m){})도 같은 코딩이다.
  // [{},{},{},{}...]
  /*
       for(MovieVO vo:list)
   */
  console.log(recipe)

    // 이벤트 처리(페이지 버튼)
    // const prev=function(){} 과 같은 코딩임
    const prev=()=>{
        // 페이지 변경
        setPage(page>1?page-1:page);
        axios.get("http://localhost:8083/web/react_recipe/recipe_list.do",{
            params:{
                page:page // 자동으로 uri뒤에 ?page=1이라고 붙여준다.
            }
            // then은 결과값을 호출하는 위치
            // then(function (response))도 아래와 같은 코딩이다.
        }).then((response)=>{
            setRecipe(response.data)
            console.log(response.data)
        })
    }
    const next=()=>{
        setPage(page<total?page+1:page);
        axios.get("http://localhost:8083/web/react_recipe/recipe_list.do",{
            params:{
                page:page // 자동으로 uri뒤에 ?page=1이라고 붙여준다.
            }
            // then은 결과값을 호출하는 위치
            // then(function (response))도 아래와 같은 코딩이다.
        }).then((response)=>{
            setRecipe(response.data)
            console.log(response.data)
        })
    }

   const html=recipe.map((m)=> {
     // 데이터 모아두기
     return (
       <div className="col-md-4">
           <div className="thumbnail">
               <a href="#" target="_blank">
                   <img src={m.poster} alt="Lights" style={{"width": "100%"}}/>
                       <div className="caption">
                           <p>{m.title}</p>
                       </div>
               </a>
           </div>
       </div>
     )
   })
  // 모아둔 데이터 브라우저에 뿌리기 (=render로 보고있음)
  return (
      <Fragment>
          <div className={"row"}>
            {html}
          </div>
          <div className={"row"}>
              <div className={"text-center"}>
                  <button className={"btn btn-sm btn-success"}
                  onClick={prev}>이전</button>
                  {page} page / {total} pages
                  <button className={"btn btn-sm btn-success"}
                  onClick={next}>다음</button>
              </div>
          </div>
      </Fragment>
  )
}

export default App;
