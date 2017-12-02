var userIdList = [129339704, 50958896, 27933683, 32536070, 39176494, 46571894, 87186401, 147082528, 147081089, 70075625],
  userList,
  indicators;

//set user info
function setUserInfo(streamsArray) {
  'use strict';
  console.log(streamsArray);
  indicators.forEach(function (currentValue) {
    var item,
      id = currentValue.id.slice(10),
      userDivStream = document.querySelector('#stream-' + id);
    for (item in streamsArray) {
      if (streamsArray.hasOwnProperty(item)) {
        
        if (id === streamsArray[item].user_id) {
          if (currentValue.classList.toString().indexOf('online') === -1) {
            currentValue.className += ' online';
            currentValue.textContent = 'On\n Air';
          }
          var startTime = new Date(streamsArray[item].started_at.toString());
          userDivStream.textContent = streamsArray[item].title + '.\n Lang: ' + streamsArray[item].language + '.\n Started at: ' + startTime.toLocaleString('ru-RU');
          break;
        }
        if (currentValue.classList.toString().indexOf('online') !== -1) {
          currentValue.classList.remove('online');
          currentValue.textContent = '';
        }
        userDivStream.textContent = '';
      }
    }
  });
}

//monitoring streams
function streamMonitor() {
  'use strict';
  var streamInfoUrl = 'https://api.twitch.tv/helix/streams/?user_id=',
    streamInfoReq = new XMLHttpRequest();
  streamInfoUrl += userIdList.join('&user_id=');
  streamInfoReq.open('GET', streamInfoUrl);
  streamInfoReq.setRequestHeader('Client-ID', 'h28g98nj1xzdtbuugr8cngcr60iavi');
  streamInfoReq.responseType = 'json';
  streamInfoReq.addEventListener('load', function (e) {
    if (streamInfoReq.status === 200) {
      setUserInfo(streamInfoReq.response.data);
    } else {
      console.log(e);
    }
  });
  streamInfoReq.send();
  setTimeout(streamMonitor, 60000);
}

//create userInfo divs
function createUserDivs() {
  'use strict';
  var streamers = document.querySelector('#streamers');
  userList.forEach(function (currentValue) {
    var userDiv = document.createElement('div'),
      userDivImg = document.createElement('img'),
      userDivName = document.createElement('div'),
      userDivIndicator = document.createElement('div'),
      userDivSeparator = document.createElement('div'),
      userDivStream = document.createElement('p');
      
      
    userDiv.setAttribute('class', 'userDiv');
    userDiv.setAttribute('tabindex', 0);
    userDiv.addEventListener('click', function () {
      window.open('https://twitch.tv/' + currentValue.login, '_blank');
    });
    userDivImg.setAttribute('src', currentValue.profile_image_url);
    userDivName.setAttribute('class', 'userDivName');
    userDivName.textContent = currentValue.display_name;
    userDivIndicator.setAttribute('class', 'userDivIndicator');
    userDivIndicator.setAttribute('id', 'indicator-' + currentValue.id);
    userDivSeparator.setAttribute('class', 'userDivSeparator');
    userDivStream.setAttribute('class', 'userDivStream');
    userDivStream.setAttribute('id', 'stream-' + currentValue.id);

    userDiv.appendChild(userDivImg);
    userDiv.appendChild(userDivName);
    userDiv.appendChild(userDivIndicator);
    userDiv.appendChild(userDivSeparator);
    userDiv.appendChild(userDivStream);
    
    streamers.appendChild(userDiv);
  });
  indicators = document.querySelectorAll('.userDivIndicator');
  //streamdivs = document.querySelectorAll('.userDivStream');
  streamMonitor();
}
//get user list
function getUserList() {
  'use strict';
  var userInfoUrl = 'https://api.twitch.tv/helix/users?id=',
    userInfoReq = new XMLHttpRequest();
  userInfoUrl += userIdList.join('&id=');
  userInfoReq.open('GET', userInfoUrl);
  userInfoReq.setRequestHeader('Client-ID', 'h28g98nj1xzdtbuugr8cngcr60iavi');
  userInfoReq.responseType = 'json';
  userInfoReq.addEventListener('load', function (e) {
    if (userInfoReq.status === 200) {
      userList = userInfoReq.response.data;
      createUserDivs();
    } else {
      console.log(e);
    }
  });
  userInfoReq.send();
}

getUserList();


/*setTimeout(function () {
  console.log(userList);
}, 5000);*/


//set User Info Old function
/*function setUserInfo(streamArray) {
  'use strict';
  console.log(streamArray);
  var activeStreams = [];
  indicators.forEach(function (currentValue) {
    var id = currentValue.id.slice(5);
    var color;
    color = 'red';
    streamArray.forEach(function (currentValue) {
      if (id === currentValue.user_id) {
        color = 'green';
      }
    });
    currentValue.style.background = color;
  });
}*/

/* another old set user info function
function setUserInfo(streamsArray) {
  'use strict';
  console.log(streamsArray);
  var activeStreamsId = [];
  streamsArray.forEach(function (currentValue) {
    var currentStream = currentValue;
    console.log(currentStream);
    activeStreamsId.push(currentValue.user_id);
  });
  indicators.forEach(function (currentValue) {
    var id = currentValue.id.slice(10),
      currentStreamDiv = document.querySelector('#stream-' + id);
    if ((activeStreamsId.indexOf(id) !== -1) && (currentValue.classList.toString().indexOf('online') === -1)) {
      currentValue.className += ' online';
      currentStreamDiv.textContent = 'Hello! ';
    } else {
      currentValue.classList.remove('online');
    }
  });
}
*/