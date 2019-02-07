import "reflect-metadata";
import { useExpressServer, Action, useContainer as routingUseContainer } from 'routing-controllers';
import { useSocketServer } from 'socket-controllers';
import { AuthService } from './auth/AuthService';

import { Container } from 'typedi';

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://romain:roro@cluster0-rxhwm.mongodb.net/ovachat?authMechanism=SCRAM-SHA-1', {
  useNewUrlParser: true
}).then(
  () => { console.log("super") },
  err => { console.log(err) }
);

routingUseContainer(Container);

this.app = require('express')()
this.exp = this.app;
this.app = require("http").Server(this.app);
this.io = require("socket.io")(this.app);

useSocketServer(this.io, {
  controllers: [__dirname + "/api/controllers/*.ts"]
});

useExpressServer(this.exp, {
  routePrefix: "/api",
  defaultErrorHandler: false,
  authorizationChecker: async (action: Action, roles: string[]) => {
    const authService = Container.get<AuthService>(AuthService);
    action.request.username = await authService.getAuth(action.request)

    if (action.request.username === undefined) {
      return false
    }

    return true
  },
  currentUserChecker: async (action: Action) => {
    const authService = Container.get<AuthService>(AuthService);
    return await authService.getAuth(action.request)
  },
  cors: true,
  controllers: [__dirname + "/api/controllers/*.ts"]
});

this.app.on('connection', function (socket) {
  console.log("socket connected")
})


this.app.listen(3001, () => {
  console.log('server is running on port 3001');
});