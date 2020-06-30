/*
//test2
self.addEventListener('push', function(event) {
    if (event.data) {
        console.log('This push event has data: ', event.data.text());
    } else {
        console.log('This push event has no data.');
    }
});



//Пример Есть и другие способы анализа данных из push-события:
// // Returns string
// event.data.text()
//
// // Parses data as JSON string and returns an Object
// event.data.json()
//
// // Returns blob of data
// event.data.blob()
//
// // Returns an arrayBuffer
// event.data.arrayBuffer()


//Вот основной пример показа уведомления:
//
// self.addEventListener('push', function(event) {
//   const promiseChain = self.registration.showNotification('Hello, World.');
//
//   event.waitUntil(promiseChain);
// });


//При этом мы можем изменить уведомление, которое мы показываем нашим пользователям.
//
// С другими опциями, просто сделайте то же самое, что и выше, заменив 'actions'нужное имя параметра.
// if ('actions' in Notification.prototype) {
//     console.log('Notification.prototype',Notification.prototype)
//     // Action buttons are supported.
// } else {
//     console.log('Notification.prototype',Notification.prototype)
//
//     // Action buttons are NOT supported.
// }

//Уведомление Нажмите Событие
self.addEventListener('notificationclick', function(event) {
    const clickedNotification = event.notification;
    clickedNotification.close();

    // Do something as the result of the notification click
    const promiseChain = doSomething();
    event.waitUntil(promiseChain);
});

const title = 'Actions Notification';
const options = {
    actions: [
        {
            action: 'coffee-action',
            title: 'Coffee',
            icon: '/images/demos/action-1-128x128.png'
        },
        {
            action: 'doughnut-action',
            title: 'Doughnut',
            icon: '/images/demos/action-2-128x128.png'
        },
        {
            action: 'gramophone-action',
            title: 'gramophone',
            icon: '/images/demos/action-3-128x128.png'
        },
        {
            action: 'atom-action',
            title: 'Atom',
            icon: '/images/demos/action-4-128x128.png'
        }
    ]
};

const maxVisibleActions = Notification.maxActions;
if (maxVisibleActions < 4) {
    options.body = `This notification will only display ` +
        `${maxVisibleActions} actions.`;
} else {
    options.body = `This notification can display up to ` +
        `${maxVisibleActions} actions.`;
}

registration.showNotification(title, options);

self.addEventListener('notificationclick', function(event) {
    if (!event.action) {
        // Was a normal notification click
        console.log('Notification Click.');
        return;
    }

    switch (event.action) {
        case 'coffee-action':
            console.log('User ❤️️\'s coffee.');
            break;
        case 'doughnut-action':
            console.log('User ❤️️\'s doughnuts.');
            break;
        case 'gramophone-action':
            console.log('User ❤️️\'s music.');
            break;
        case 'atom-action':
            console.log('User ❤️️\'s science.');
            break;
        default:
            console.log(`Unknown action clicked: '${event.action}'`);
            break;
    }
});

const titles = 'Require Interaction Notification';
const optionss = {
    body: 'With "requireInteraction: \'true\'".',
    tag: 'renotify',
    renotify: true,
    requireInteraction: true
};
registration.showNotification(titles, optionss);


//Уведомление о закрытии мероприятия
self.addEventListener('notificationclose', function(event) {
    const dismissedNotification = event.notification;

    const promiseChain = notificationCloseAnalytics();
    event.waitUntil(promiseChain);
});

//Добавление данных в уведомление
const optionse = {
  body: 'This notification has data attached to it that is printed ' +
    'to the console when it\'s clicked.',
  tag: 'data-notification',
  data: {
    time: new Date(Date.now()).toString(),
    message: 'Hello, World!'
  }
};
registration.showNotification('Notification with Data', optionse);

//Внутри обработчика кликов к данным можно получить доступ event.notification.data.
const notificationData = event.notification.data;
console.log('');
console.log('The notification data has the following parameters:');
Object.keys(notificationData).forEach((key) => {
    console.log(`  ${key}: ${notificationData[key]}`);
});
console.log('');

//Открыть окно
const examplePage = '/demos/notification-examples/example-page.html';
const promiseChain = clients.openWindow(examplePage);
event.waitUntil(promiseChain);

///Фокусировать существующее окно
////Мы делаем URL-адрес абсолютным, чтобы позже мы могли сопоставить его с URL-адресами окна.
const urlToOpen = new URL(examplePage, self.location.origin).href;
//Затем мы получаем список WindowClientобъектов, который является списком открытых на данный момент вкладок и окон. (Помните, что это вкладки только для вашего происхождения.)
const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
}).then((windowClients) => {
    //Если мы не можем найти подходящего клиента, мы открываем новое окно, как и в предыдущем разделе.
    let matchingClient = null;

    for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
            matchingClient = windowClient;
            break;
        }
    }

    if (matchingClient) {
        return matchingClient.focus();
    } else {
        return clients.openWindow(urlToOpen);
    }
});

event.waitUntil(promiseChain);

const urlToOpen = new URL(examplePage, self.location.origin).href;

//Слияние уведомлений
//Первое, что мы хотим сделать, это найти любые открытые уведомления для пользователя с определенным именем пользователя. Мы возьмем их registration.getNotifications()и зациклим на них и проверим notification.dataдля определенного имени пользователя:
const promiseChain = registration.getNotifications()
    .then(notifications => {
        let currentNotification;

        for(let i = 0; i < notifications.length; i++) {
            if (notifications[i].data &&
                notifications[i].data.userName === userName) {
                currentNotification = notifications[i];
            }
        }

        return currentNotification;
    })
//Следующим шагом является замена этого уведомления новым уведомлением.
//
// В этом приложении с поддельными сообщениями мы будем отслеживать количество новых сообщений, добавляя счет к данным нашего нового уведомления и увеличивая его с каждым новым уведомлением.
    .then((currentNotification) => {
        let notificationTitle;
        const options = {
            icon: userIcon,
        }

        if (currentNotification) {
            // We have an open notification, let's do something with it.
            const messageCount = currentNotification.data.newMessageCount + 1;

            options.body = `You have ${messageCount} new messages from ${userName}.`;
            options.data = {
                userName: userName,
                newMessageCount: messageCount
            };
            notificationTitle = `New Messages from ${userName}`;

            // Remember to close the old notification.
            currentNotification.close();
        } else {
            options.body = `"${userMessage}"`;
            options.data = {
                userName: userName,
                newMessageCount: 1
            };
            notificationTitle = `New Message from ${userName}`;
        }

        return registration.showNotification(
            notificationTitle,
            options
        );
    });


///Исключение из правила
// Я заявлял, что вы должны показывать уведомление, когда получаете толчок, и это верно в большинстве случаев. Единственный сценарий, когда вам не нужно показывать уведомление, - это когда ваш сайт открыт и сфокусирован.
//
// Внутри вашего push-события вы можете проверить, нужно ли показывать уведомление или нет, изучив оконные клиенты и ища сфокусированное окно.
//
// Код для получения всех окон и поиска сфокусированного окна выглядит следующим образом:
//
function isClientFocused() {
  return clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then((windowClients) => {
    let clientIsFocused = false;

    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.focused) {
        clientIsFocused = true;
        break;
      }
    }

    return clientIsFocused;
  });
}

// Внутри нашего push-события мы бы использовали эту функцию, чтобы решить, нужно ли показывать уведомление:

    const promiseChain = isClientFocused()
        .then((clientIsFocused) => {
            if (clientIsFocused) {
                console.log('Don\'t need to show a notification.');
                return;

            }

            // Client isn't focused, we need to show a notification.
            return self.registration.showNotification('Had to show a notification.');
        });

event.waitUntil(promiseChain);

// Сообщение страницы из события push
// Мы видели, что вы можете пропустить показ уведомления, если пользователь в данный момент находится на вашем сайте. Но что, если вы все еще хотите, чтобы пользователь знал, что произошло событие, но уведомление слишком жесткое?
//
//     Одним из подходов является отправка сообщения от сервисного работника на страницу, таким образом, веб-страница может показывать пользователю уведомление или обновление, информируя их о событии. Это полезно для ситуаций, когда тонкое уведомление на странице лучше и удобнее для пользователя.
//
//     Допустим, мы получили толчок, проверили, что наше веб-приложение в данный момент сфокусировано, затем мы можем «опубликовать сообщение» на каждой открытой странице, вот так:

    const promiseChain = isClientFocused()
        .then((clientIsFocused) => {
            if (clientIsFocused) {
                windowClients.forEach((windowClient) => {
                    windowClient.postMessage({
                        message: 'Received a push message.',
                        time: new Date().toString()
                    });
                });
            } else {
                return self.registration.showNotification('No focused windows', {
                    body: 'Had to show a notification instead of messaging each page.'
                });
            }
        });

event.waitUntil(promiseChain);

// На каждой из страниц мы прослушиваем сообщения, добавляя прослушиватель событий сообщения:

    navigator.serviceWorker.addEventListener('message', function(event) {
        console.log('Received a message from service worker: ', event.data);
    });

*/


//test now demo
function handlePushEvent(event) {
    console.log('push event service worker')
    event.preventDefault();

    const DEFAULT_TAG = 'https://web/'
    return Promise.resolve()
        .then(() => {
            console.log('then1',typeof event.data)
            let json = event.data.json()
            console.log('then1 json',typeof json)
            return event.data.json();
        })
        .then((data) => {
            console.log('then2 return', typeof data.notification, data.nnotification)
            // fetch('/api/admin/map/test').then(res => console.log('api/admin/map/callsigns',res.data));
            const title = data.notification.title;
            const options = data.notification;
            if (!options.tag) {
                options.tag = DEFAULT_TAG;
            }
            return registration.showNotification(title, options);
        })
        .catch((err) => {
            console.log('catch',typeof event.data);
            fetch('/api/admin/map/test').then(res => console.log('catch api/admin/map/callsigns',res.data));

            console.error('Push event caused an error: ', err);
            var options ={
                body: event.data.text(),

                icon: 'images/otis-logo.png',
                badge: 'images/otis-logo.png',
                // image: '/images/order.png',
                vibrate: [100, 50, 100],

                data:{
                    dateOfArrival: Date.now(),
                    primaryKey:'2'
                },
                // tag: DEFAULT_TAG,
                tag: 'renotify',
                renotify: true,
                actions:[
                    {
                        action: 'open',
                        title: 'Открыть',
                        icon: 'images/newspaper.png'
                    },
                    {
                        action: 'close',
                        title: 'Закрыть',
                        // icon: 'images/xmark.png'
                    }
                ]
            };
            const title = 'Message Received';
            // const options = {
            //     body: event.data.text(),
            //     tag: DEFAULT_TAG,
            // };
            return registration.showNotification(title, options);
        });
}

self.addEventListener('push', function(event) {
    console.log('pushh service worker')
    event.preventDefault();

    event.waitUntil(handlePushEvent(event));
});

const doSomething = () => {
    return Promise.resolve();
};

// This is here just to highlight the simple version of notification click.
// Normally you would only have one notification click listener.
/**** START simpleNotification ****/
self.addEventListener('notificationclick', function(event) {
    event.preventDefault();

    const clickedNotification = event.notification;
    console.log('service-worker notificationclick', clickedNotification)
    var action = event.action;
    console.log('action click', action)

    if (action === 'close') {
        console.log('service-worker notificationclick:', 'closse')
        notification.close();
    } else if( action === 'open') {
        console.log('service-worker notificationclick:', 'open')
        // self.registration.update();

        clients.openWindow('https://web/admin/ralarms');
        // notification.close();
    } else {
        console.log('service-worker notificationclick:', 'all window')
        self.registration.update();
        clients.openWindow('https://web/');

    }
    clickedNotification.close();

    // Do something as the result of the notification click
    const promiseChain = doSomething();
    console.log('server-worker notificationclick promiseChain', promiseChain)
    event.waitUntil(promiseChain);
});
/**** END simpleNotification ****/

