/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const {RuntimeError} = require('ganiyem-error');
const {Server: HttpServer} = require('fifit-server-http');
const {Server: HttpsServer} = require('fifit-server-https');
const {Server: Http2Server} = require('fifit-server-http2');
const {Server: Https2Server} = require('fifit-server-https2');
const config = require('./config');

/**
 * @+
 */
module.exports = {
  createHttpServer(){
    return new HttpServer(config.httpServer)
  },
  createHttpsServer(){
    return new HttpsServer(config.httpsServer)
  },
  createHttp2Server(){
    return new Http2Server(config.http2Server)
  },
  createHttps2Server(){
    return new Https2Server(config.https2Server)
  },
  createStartErrorServer(){
    return {
      start: () => Promise.reject(new RuntimeError()),
      stop: () => Promise.resolve()
    }
  },
  createStopErrorServer(){
    return {
      start(){
        this.isStarted = true;
        return Promise.resolve();
      },
      stop(){
        return Promise.reject(new RuntimeError());
      }
    }
  }
};