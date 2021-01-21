const socket = io()

let userName
let textarea = document.querySelector('#textarea')
let chatarea = document.querySelector('.chat-area')

do {
    userName = prompt('Please Enter Your Name :')
} while (!userName);

textarea.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendMessage(event.target.value)
    }
})

sendMessage = (message) => {
    const msg = {
        user: userName,
        message: message.trim()
    }
    // appendMessage
    appendMessage(msg, 'outgoing-msg')

    // emitMessage to socket 
    socket.emit('newMessage', msg)

}

appendMessage = (msg, type) => {
    let chatDiv = document.createElement('div')
    let className = type
    chatDiv.classList.add(className)

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    chatDiv.innerHTML = markup
    chatarea.appendChild(chatDiv)
    textarea.value = ""
    scrollToBottom()
}

socket.on('newMessage', (msg) => {
    appendMessage(msg, 'incoming-msg')
})

scrollToBottom = () => {
    chatarea.scrollTop = chatarea.scrollHeight
}