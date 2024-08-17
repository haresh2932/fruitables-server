const { Server } = require('socket.io');

const connectChat = () => {
    const io = new Server({
        cors: {
          origin: "http://localhost:3000"
        }
      });

    io.on('connection', (socket) => {
        console.log('a user connected',socket.id);
        socket.emit('welcome',"welcome all user")
        socket.broadcast.emit('greeting',"welcome all user to our site")

        socket.on(
          "message",(data)=>{
            console.log(data)
            io.to(data.reciver).emit('rec-message',data.message)
          }
        )

        socket.on('join-Group',(group_name)=>{
          console.log(group_name);
          
          socket.join(group_name)
        })
    });

    io.listen(4000);

}

module.exports = connectChat