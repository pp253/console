// document.getElementById('input').contentEditable = true

let User = {
  name: 'UNKNOWN',
  history: [],
  _historyIndex: 0
}

window.onload = () => {
  let input = document.getElementById('input')
  input.onkeydown = e => {
    console.log(e)
    if (e.key === 'Enter') {
      // command
      let str = input.value
      addLine(User.name, str)

      if (str[0] === '\\') {
        let cmd = str.split(' ')[0]
        if (cmd === '\\login') {
          let name = str
            .split(' ')
            .slice(1)
            .join(' ')
          User.name = name
          addLine('', `You have login as ${name}.`)
        } else if (cmd === '\\history') {
          for (let item of User.history) {
            addLine('', item)
          }
        } else if (cmd === '\\help') {
          addLine('', '\\login <name>  Login as an user name.')
          addLine('', '\\history       History of inputs.')
          addLine('', '\\clear         Clear the screen.')
          addLine('', '\\size <px>     Set font size.')
          addLine('', '\\color <type> <color>')
          addLine('', '               Set font color.')
          addLine('', '               <type> `speaker` or `text`.')
          addLine('', '               <color> an html color tag.')
          addLine('', '\\help          Get help.')
        } else {
          addLine('', 'Unknown command.')
        }
      }
      User.history.push(str)
      User._historyIndex = 0
      input.value = ''
    } else if (e.key === 'ArrowUp') {
      if (User._historyIndex < User.history.length) {
        User._historyIndex++
        input.value = User.history[User.history.length - User._historyIndex]
      }
    } else if (e.key === 'ArrowDown') {
      if (User._historyIndex > 1) {
        User._historyIndex--
        input.value = User.history[User.history.length - User._historyIndex]
      } else {
        input.value = ''
      }
    } else if (e.key === 'Escape') {
      input.value = ''
    }
  }
}

function addLine(speaker = 'UNKNOWN', text = '') {
  let app = document.getElementById('app')
  let elem = document.createElement('div')
  elem.className = 'line'
  if (speaker) {
    let speakerSpan = document.createElement('span')
    speakerSpan.className = 'speaker'
    speakerSpan.appendChild(document.createTextNode(`${speaker}>`))
    elem.appendChild(speakerSpan)
  }
  if (text) {
    let textSpan = document.createElement('span')
    textSpan.className = 'text'
    textSpan.appendChild(document.createTextNode(text))
    elem.appendChild(textSpan)
  }

  app.insertBefore(elem, app.childNodes[app.childNodes.length - 2])
}
