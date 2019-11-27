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
const assert = require('assert');
const {RuntimeError} = require('ganiyem-error');
const helper = require('../helper');
const Observer = require('../../');

describe('Observer#stop', () => {
  it('must be isStarted === false', async() => {
    let httpServer = helper.createHttpServer();
    let httpsServer = helper.createHttpsServer();
    let http2Server = helper.createHttp2Server();
    let https2Server = helper.createHttps2Server();
    let observer = new Observer([
      httpServer,
      httpsServer,
      http2Server,
      https2Server
    ]);
    await observer.start();
    assert.ok(observer.isStarted === true);
    await observer.stop();
    assert.ok(observer.isStarted === false);
  });

  it('must be reject(RuntimeError) when Server#stop() -> reject(Error)', async() => {
    let httpServer = helper.createHttpServer();
    let httpsServer = helper.createHttpsServer();
    let http2Server = helper.createHttp2Server();
    let https2Server = helper.createHttps2Server();
    let stopErrorServer = helper.createStopErrorServer();
    let observer = new Observer([
      httpServer,
      httpsServer,
      http2Server,
      https2Server,
      stopErrorServer
    ]);
    await observer.start();
    try {
      await observer.stop();
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof RuntimeError);
    }
  });

  it('must be reject(RuntimeError) when server is already stoped', async() => {
    let httpServer = helper.createHttpServer();
    let httpsServer = helper.createHttpsServer();
    let http2Server = helper.createHttp2Server();
    let https2Server = helper.createHttps2Server();
    let observer = new Observer([
      httpServer,
      httpsServer,
      http2Server,
      https2Server
    ]);
    await observer.start();
    await observer.stop();
    try {
      await observer.stop();
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof RuntimeError);
    }
  });
});