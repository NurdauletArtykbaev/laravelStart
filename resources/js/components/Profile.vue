<template>
    <div class="container">
        <div class="row ">
            <div class="col-md-12 mt-3">
                <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background-image: url('./img/user-cover.jpg')">
                        <h3 class="widget-user-username" >Elizabeth Pierce</h3>
                        <h5 class="widget-user-desc">Web Designer</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" :src="getProfilePhoto()"  alt="User Avatar">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">3,200</h5>
                                    <span class="description-text">SALES</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">13,000</h5>
                                    <span class="description-text">FOLLOWERS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4">
                                <div class="description-block">
                                    <h5 class="description-header">35</h5>
                                    <span class="description-text">PRODUCTS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header p-2">
                        <ul class="nav nav-pills">
                            <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                            <li class="nav-item"><a class="nav-link active show" href="#settings" data-toggle="tab">Settings</a></li>
                        </ul>
                    </div><!-- /.card-header -->
                    <div class="card-body">
                        <div class="tab-content">
                            <!-- Activity Tab -->
                            <div class="tab-pane" id="activity">
                                <h3 class="text-center">Display User Activity</h3>
                            </div>
                            <!-- Setting Tab -->
                            <div class="tab-pane active show" id="settings">
                                <form class="form-horizontal" @submit.prevent="updateProfile">
                                    <div class="form-group">
                                        <label for="name" class="col-sm-2 control-label">Name</label>

                                        <div class="col-sm-12">
                                            <input type="text"
                                                   v-model="form.name"
                                                   name="name"
                                                   class="form-control"
                                                   id="name"
                                                   :class="{'is-invalid': form.errors.has('name')}"
                                                   placeholder="Name">
                                            <has-error :form="form" field="name"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="email" class="col-sm-2 control-label">Email</label>

                                        <div class="col-sm-12">
                                            <input
                                                type="email"  v-model="form.email" name="email" class="form-control"
                                                   :class="{ 'is-invalid': form.errors.has('email') }"
                                                   id="email" placeholder="Email">
                                            <has-error :form="form" field="email"></has-error>

                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="inputExperience" class="col-sm-2 control-label">Experience</label>

                                        <div class="col-sm-12">
                                            <textarea class="form-control" v-model="form.bio" id="inputExperience" placeholder="Experience" ></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="photo" class="col-sm-2 control-label">Profile Photo</label>
                                        <div class="col-sm-12">
                                            <input type="file" id="photo" @change="updateImg" name="photo" class="form-input">
                                            <has-error :form="form" field="photo"></has-error>
                                        </div>

                                    </div>

                                    <div class="form-group">
                                        <label for="" class="col-sm-12 control-label">Passport (leave empty if not changing)</label>
                                        <div class="col-sm-12">
                                            <input type="password"
                                                   v-model="form.password" class="form-control"
                                                   id="password"
                                                   :class="{ 'is-invalid': form.errors.has('password')}"
                                                   placeholder="Passport"/>
                                            <has-error :form="form" field="password"></has-error>
                                        </div>

                                    </div>

                                    <div class="form-group">
                                        <div class="col-sm-offset-2 col-sm-12">
                                            <button type="submit" class="btn btn-success">Update</button>
                                        </div>
                                        <div class="col-sm-offset-2 col-sm-12">
                                            <button type="button"  @click.prevent="pushOnload" class="btn btn-primary">pushOnload</button>
                                        </div>
                                        <div class="col-sm-offset-2 col-sm-12">
                                            <button type="button"  @click.prevent="push" class="btn btn-primary">PUSH</button>
                                        </div>


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: '',
                })
            }
        },
        mounted() {
            axios.get('api/profile').then(({data}) => (this.form.fill(data)));
        },
        methods:{
            getProfilePhoto(){
                let photo = (this.form.photo.length < 200) ? '/img/profile/' + this.form.photo : this.form.photo;
                return photo;
                // let prefix = (this.form.photo.match(/\//) ? '' : '/img/profile/');
                // return prefix + this.form.photo;
                // return 'img/profile/' + this.form.photo;
            },
            updateProfile(){
              this.form.put('api/profile').
              then(()=>{
                  (
                      eventHub.$emit('updateProfile'),
                      swal.fire(
                      'success updated',
                      'success',
                      'success'
                  ))
              }).catch(()=>{})
            },
            updateImg(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                if(file['size'] < 2111775){
                    reader.onloadend = (file) => {
                        this.form.photo = reader.result;
                    };
                    reader.readAsDataURL(file);
                }
                else {
                    swal.fire(
                        'error',
                        'Oops...',
                        'error'
                    )
                }
            },
            /**** START register-sw ****/
            registerServiceWorker() {
                // console.log("registerServiceWorker")
                let sw  = navigator.serviceWorker.register('/service-worker.js', {scope:'./'})
                // console.log('sw', sw)
                return sw
                    .then(function(registration) {
                        // console.log('registration.update')
                        registration.update();
                        // console.log('registration.updated')

                        // console.log('Service worker successfully registered.  sw', sw);
                        return registration;
                    })
                    .catch(function(err) {
                        console.error('Unable to register service worker. ', err);
                    });
            },
            //  triggerPushMsg(subscription, dataToSend) {
            //      const webpush = require('web-push');
            //      let sub =
            //              {"endpoint": subscription.endpoint,
            //                  "expirationTime":null,
            //                  "keys":{
            //                  "p256dh":subscription.p256dh,"auth": subscription.auth}};
            //
            //      return webpush.sendNotification(sub, dataToSend)
            //         .catch((err) => {
            //             if (err.statusCode === 410) {
            //                 return deleteSubscriptionFromDatabase(subscription._id);
            //             } else {
            //                 console.log('Subscription is no longer valid: ', err);
            //             }
            //         });
            // }
            /**** END register-sw ****/
            // ,
            push(){
                const webpush = require('web-push');

                const vapidKeys = {
                    publicKey: 'BJwivPZFvuqBZZRi9s7dvIrmNf7wUu5kRxnHZyqvED-v9XROEzsUVlf3g0-vZRfvB2QbYnaSnsnaTIciA8R9Vu8',
                    privateKey: 'IlRST-B21guOlMnEZ8Sk4BmOi3G1j3VjgMrbfaQZBdA'
                };

                webpush.setVapidDetails(
                    'mailto:test@test.com',
                    vapidKeys.publicKey,
                    vapidKeys.privateKey
                );
                /*
                const payload = {
                    "notification": {
                        "title": "Example Title",
                        "body": "This will be the body text for the notification.",
                        "icon": "/images/icon-512x512.png"
                    }
                };*/




                let failedSub = [];
                axios.get('api/test2').then(response => {
                    if (!response.data || !response.data.success || response.status !== 200) {
                        console.error('Unexpected result from server: ', response);
                    }
                    let dataToSend = 'test test';
                    let subscriptions = response.data;
                    // console.log('subs', subscriptions);
                    let promiseChain = Promise.resolve();

                    for (let i = 0; i < subscriptions.length; i++) {
                        const subscription = subscriptions[i];
                        promiseChain = promiseChain.then(() => {
                            console.log('subscription push', subscription)

                            const options = {
                                vapidDetails: {
                                    subject: 'mailto:web-push-book@gauntface.com',
                                    publicKey:  vapidKeys.publicKey,
                                    privateKey: vapidKeys.privateKey,

                                },
                                TTL: 5,
                                headers: {
                                    mode:'no-cors',
                                },
                            };
                            let sub =
                                {"endpoint": subscription.endpoint,
                                    "expirationTime":null,
                                    "keys":{
                                        "p256dh":subscription.p256dh,"auth": subscription.auth}};

                            return webpush.sendNotification(sub, dataToSend, options).then(res =>{
                                console.log('res success', res)
                            })
                                .catch((err) => {
                                    failedSub.push(subscription);
                                    if (err.statusCode === 410) {
                                        // return deleteSubscriptionFromDatabase(subscription._id);
                                    } else {
                                        console.log('err: ', err);
                                    }
                                });
                        });
                    }
                    // console.log('failted', failedSub);

                    return promiseChain;


                })
            },
            /**** START request-permission ****/
            askPermission() {
                // console.log("askPermission")

                return new Promise(function(resolve, reject) {
                    const permissionResult = Notification.requestPermission(function(result) {
                        resolve(result);
                    });

                    if (permissionResult) {
                        permissionResult.then(resolve, reject);
                    }
                })
                    .then(function(permissionResult) {
                        if (permissionResult !== 'granted') {
                            throw new Error('We weren\'t granted permission.');
                        }
                    });
            }
            /**** END request-permission ****/
            ,
            /**
             * Using `Notification.permission` directly can be slow (locks on the main
             * thread). Using the permission API with a fallback to
             * `Notification.permission` is preferable.
             * @return {Promise<String>} Returns a promise that resolves to a notification
             * permission state string.
             */
            /**** START get-permission-state ****/
            getNotificationPermissionState() {
                // console.log("getNotificationPermissionState")

                if (navigator.permissions) {
                    return navigator.permissions.query({name: 'notifications'})
                        .then((result) => {
                            return result.state;
                        });
                }

                return new Promise((resolve) => {
                    resolve(Notification.permission);
                });
            },
            async setUpPush() {
                // console.log("setUpPush");
                return Promise.all([
                    this.registerServiceWorker(),
                    this.getNotificationPermissionState()
                ])
                    .then(function(results) {
                        const registration = results[0];
                        const currentPermissionState = results[1];
                        // console.log("setUpPush currentPermissionState", currentPermissionState);


                        if (currentPermissionState === 'denied') {
                            console.warn('The notification permission has been blocked. Nothing we can do.');
                            return;
                        }
                        let reg = navigator.serviceWorker.register('/service-worker.js', {scope:'./'})
                            .then(function(registration) {

                                // console.log('this.urlBase64ToUint8Array')
                                let base64String = 'BJwivPZFvuqBZZRi9s7dvIrmNf7wUu5kRxnHZyqvED-v9XROEzsUVlf3g0-vZRfvB2QbYnaSnsnaTIciA8R9Vu8'

                                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                                const base64 = (base64String + padding)
                                    .replace(/\-/g, '+')
                                    .replace(/_/g,  '/');

                                const rawData = window.atob(base64);
                                const outputArray = new Uint8Array(rawData.length);

                                for (let i = 0; i < rawData.length; ++i) {
                                    outputArray[i] = rawData.charCodeAt(i);
                                }

                                const subscribeOptions = {
                                    userVisibleOnly: true,
                                    applicationServerKey:  outputArray
                                };
                                let subuser = registration.pushManager.subscribe(subscribeOptions);

                                return subuser;
                            })
                            .then(function(pushSubscription) {
                                try{

                                    var navUserAgent = navigator.userAgent;
                                    var browserName  = navigator.appName;
                                    var browserVersion;
                                    var tempNameOffset,tempVersionOffset,tempVersion;

                                    if ((tempVersionOffset=navUserAgent.indexOf("Opera"))!=-1) {
                                        browserName = "Opera";
                                        browserVersion = navUserAgent.substring(tempVersionOffset+6);
                                        if ((tempVersionOffset=navUserAgent.indexOf("Version"))!=-1)
                                            browserVersion = navUserAgent.substring(tempVersionOffset+8);
                                    } else if ((tempVersionOffset=navUserAgent.indexOf("MSIE"))!=-1) {
                                        browserName = "Microsoft Internet Explorer";
                                        browserVersion = navUserAgent.substring(tempVersionOffset+5);
                                    } else if ((tempVersionOffset=navUserAgent.indexOf("Chrome"))!=-1) {
                                        browserName = "Chrome";
                                        browserVersion = navUserAgent.substring(tempVersionOffset+7);
                                    } else if ((tempVersionOffset=navUserAgent.indexOf("Safari"))!=-1) {
                                        browserName = "Safari";
                                        browserVersion = navUserAgent.substring(tempVersionOffset+7);
                                        if ((tempVersionOffset=navUserAgent.indexOf("Version"))!=-1)
                                            browserVersion = navUserAgent.substring(tempVersionOffset+8);
                                    } else if ((tempVersionOffset=navUserAgent.indexOf("Firefox"))!=-1) {
                                        browserName = "Firefox";
                                        browserVersion = navUserAgent.substring(tempVersionOffset+8);
                                    } else if ( (tempNameOffset=navUserAgent.lastIndexOf(' ')+1) < (tempVersionOffset=navUserAgent.lastIndexOf('/')) ) {
                                        browserName = navUserAgent.substring(tempNameOffset,tempVersionOffset);
                                        browserVersion = navUserAgent.substring(tempVersionOffset+1);
                                        if (browserName.toLowerCase()==browserName.toUpperCase()) {
                                            browserName = navigator.appName;
                                        }
                                    }

                                    if ((tempVersion=browserVersion.indexOf(";"))!=-1)
                                        browserVersion=browserVersion.substring(0,tempVersion);
                                    if ((tempVersion=browserVersion.indexOf(" "))!=-1)
                                        browserVersion=browserVersion.substring(0,tempVersion);

                                    /* start get os name */

                                    var userAgent = window.navigator.userAgent,
                                        platform = window.navigator.platform,

                                        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
                                        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
                                        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
                                        Android = ['Android'],
                                        os = null;

                                    if(macosPlatforms.indexOf(platform) !== -1) {
                                        os = 'Mac OS';
                                    } else if (iosPlatforms.indexOf(platform) !== -1) {
                                        os = 'iOS';

                                    } else if (windowsPlatforms.indexOf(platform) !== -1) {
                                        os = 'Windows';

                                    } else if (/Android/.test(userAgent)) {
                                        os = 'Android';

                                    } else if (!os && /Linux/.test(platform)) {
                                        os = 'Linux';
                                    }
                                    /* end get os name */

                                    let currBrowser = browserName + ' '  + browserVersion + ' OS ' + os;
                                    let defBrowser = navigator.userAgent;

                                    let {post} =  axios.post('api/test',{
                                        body: pushSubscription,
                                        currBrowser: currBrowser,
                                        defBrowser: defBrowser
                                    })


                                }catch(err){

                                }
                                console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
                                return pushSubscription;
                            });
                        if (currentPermissionState !== 'granted') {
                            // If permission isn't granted than we can't be subscribed for Push.
                            console.warn('If permission isnt granted than we cant be subscribed for Push')
                            return;
                        }

                        return registration.pushManager.getSubscription()
                    })
                    .catch(function(err) {
                        console.log('Unable to register the service worker: ' + err);
                    });
            },
            windowOnload(){
                console.log("windowOnload");
                this.askPermission();
                // console.log('ask')

                /**** START feature-detect ****/
                if (!('serviceWorker' in navigator)) {
                    // Service Worker isn't supported on this browser, disable or hide UI.
                    return;
                }

                if (!('PushManager' in window)) {
                    // Push isn't supported on this browser, disable or hide UI.
                    return;
                }
                /**** END feature-detect ****/

                // Push is supported.
                this.setUpPush();
            }
            ,
            pushOnload(){
                window.onload = this.windowOnload()

            }

          // getProfile(){
          //     axios.get('api/user/profile').then(({data}) => this.form.fill(data));
          // }
        },
        created() {
            axios.get('api/profile').then(({data}) => (this.form.fill(data)));
            eventHub.$on('updateProfile', ()=>{
                axios.get('api/profile').then(({data}) => (this.form.fill(data)))
            });

        }

    }
</script>

<style scoped>
.widget-user-header{
    background-position: center center;
    background-size: cover;
    height: 300px;
}
</style>
