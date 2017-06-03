# WAMP Trader

This real time market feed broadcast applications uses React, WebPack, Node, Redux, Bootstrap, Autobahn as the front end. It uses WAMP to get feed from backend server which uses .Net/SharpWamp/EventStore/MsgPack. 

News section is implemented using Facebook GraphQL (GraphQL - .Net)

To setup client. 
Ensure you have installed webpack and node. 
Open index.html 

## To serve client : 
We uses a custom GoLang app server that supports Http2 request. It send simultaneous requested down to browsers making application faster. 

## To run server. 
Open up the solution, restore the required package and press F5 

Intended to be uses as a actual implementation of next generation of web applicaton and event store for eventual consistency in large scale scalable application.


Example: 
![alt text](https://github.com/appcoreopc/trader/blob/master/trader1.gif "Wamp Trader")

