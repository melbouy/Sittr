## **Sittr** - version 0.3
### _Built with [meteor.js](http://www.meteor.com/ "meteor.js")_

---

This is my first foray into [meteor.js](http://www.meteor.com/ "meteor.js") as a web app solution.

#### The idea:
> In Melbourne (where I live). A growing number of restaurants & cafes have decided against taking bookings relying instead upon walk-in trade. If a restaurnt is at capacity, they will often start a "wait-list" taking a customers number and name & promising to call or sms them when a table comes free. This is often drawn up on paper and is hardly the most reliable system for a busy restaurant!

With sittr, I decided to try and turn this system into a simple web-app. Using a computers or tablet devices, bookings could be taken and updated, cancelled, assigned to tables & seated in real-time across many devices (perhaps a restaurant has several entrances? sittr could allow several hosts to communicate their wait-list in real-time!).

###### This app is still very much a prototype. A demo version is available [here](http://waitlist.meteor.com/ "here")

### Instructions:
* _**The clock:**_ This displays the current time according to your device.
* _**Add a booking:**_ Press the + sign in the top right corner.
* _**Clear all bookings:**_ Press the trash icon in the top corner.
* _**The right arrow icon:**_ Expands a bookings options.
* _**The cross icon:**_ Cancel a booking.
* _**The tick icon:**_ Seat a booking.
* _**The pencil icon:**_ Edit a booking (i.e increase numbers or assign a table to a booking).

Once a table has been assigned to a booking, a small flag icon will appear next to the booking name with the relevant table number next to it.

### Version historty:

_Version 0.3:_  
- Added ipad specific layout.  
- Code tidy and commenting.  
- New table icon and layout.

_Version 0.2:_  
- Fixed padding issue between topNav and bookingList.  
- New options menu for bookings.  
- Small aesthetic fixes.  
- Added "minutes since booking"

_Version 0.1:_  
- Launch 


### Todo:
* Add iphone specific layout.
* Add transitions and animations.
* Integrate a sms solution (i.e [Twilio](http://www.twilio.com/ "Twilio")) to allow automated sms messaging to bookings.
* Create an account system for individual login.