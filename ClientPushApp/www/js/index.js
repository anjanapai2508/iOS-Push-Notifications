/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() { 
      
    document.getElementById('regId').innerHTML = 'true';
		app.push = PushNotification.init({
     "android": {},
     "ios": {
       "sound": true,
       "vibration": true,
       "badge": true
     },
     "windows": {}
 });

//store registration id
 app.push.on('registration', function(data) {
     console.log("registration event: " + data.registrationId);
     document.getElementById("regId").innerHTML = data.registrationId;
     var oldRegId = localStorage.getItem('registrationId');
     if (oldRegId !== data.registrationId) {
         // Save new registration ID
         localStorage.setItem('registrationId', data.registrationId);
         // Post registrationId to your app server as the value has changed
     }
 });

//printout the error if any
 app.push.on('error', function(e) {
     console.log("push error = " + e.message);
 });
 
 //handle the notifications
app.push.on('notification', function(data) {
     console.log('notification event');
     var cards = document.getElementById("cards");
     var push =  '<p> Push Notification Text : </p>' 
                +'<p>' + data.message + '</p>';
     cards.innerHTML += push;
 });
      
    }
    
};
