const express=require("express")
const app=express()
const server=require("http").createServer()
const port=3355
server.listen(port,()=>{
    console.log("Chat Server Start...")
})
const socketio=require("socket.io")
const io=socketio.listen(server)
// Serverocket 생성
// socket => 클라이언트 소켓
io.on('connection',(socket)=>{
  socket.on('chat-msg',(msg)=>{
      console.log(msg)
      io.emit('chat-msg',msg)
      // emit() 접속한 모든 사람에게 msg를 보낸다.
  })
})
