import React,{useState,useEffect} from 'react'
import axios from 'axios'
function App()
{
  // 변수 설정
  const [news,setNews]=useState([]); // api가 블록으로 시작해서 {}로 받음
  const [cateno,setCateno]=useState(0);

  // 초기값 설정
  useEffect(()=>{
    axios.get("http://newsapi.org/v2/top-headlines?country=kr&apiKey=b90ec673d2724353a8cd018741bf1c4b").then((response) =>{
      setNews(response.data.articles);
      console.log(response.data.articles);
    })
  },[])
  // 버튼 누르면 내용 바꾸기 (이벤트 처리)
  const categoryChange=(no)=>{
    let site="";
    let arr=["","category=business","category=entertainment","category=health","category=science","category=sports","category=technology"];
    site=arr[no];
    axios.get("http://newsapi.org/v2/top-headlines?country=kr&apiKey=b90ec673d2724353a8cd018741bf1c4b"+"&"+site).then((response) =>{
      setCateno(response.data.articles);
      console.log(response.data.articles);
    })
  }

  // 데이터 출력
  const html=news.map((m)=>
    <table className={"table"}>
      <tbody>
        <tr>
          <td className={"text-center"} width={"30%"} rowSpan={"3"}>
            <img src={m.urlToImage} style={{"width":"200px","height":"90px"}}/>
          </td>
          <td width={"70%"}>
            {m.title}
          </td>
        </tr>
        <tr>
          {m.description}
        </tr>
        <tr>
          <td className={"text-center"}>{m.author}({m.publishedAt})</td>
        </tr>
      </tbody>
    </table>
  )
  return(
      <div className={"row"}>
        <table className={"table"}>
          <tbody>
            <tr>
              <td className={"text-center"}>
                <button className={"btn btn-lg btn-default"} onClick={e=>categoryChange(0)}>전체</button>
                <button className={"btn btn-lg btn-default"} onClick={e=>categoryChange(1)}>비지니스</button>
                <button className={"btn btn-lg btn-default"} onClick={e=>categoryChange(2)}>엔터테인먼트</button>
                <button className={"btn btn-lg btn-default"} onClick={e=>categoryChange(3)}>건강</button>
                <button className={"btn btn-lg btn-default"} onClick={e=>categoryChange(4)}>과학</button>
                <button className={"btn btn-lg btn-default"} onClick={e=>categoryChange(5)}>스포츠</button>
                <button className={"btn btn-lg btn-default"} onClick={e=>categoryChange(6)}>기술</button>
              </td>
            </tr>
          </tbody>
        </table>
        <table className={"table"}>
          <tbody>
          <tr>
            <td>
              {html}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  )

}
export default App;
