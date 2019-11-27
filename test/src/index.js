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
const helper = require('../helper');
const Observer = require('../../');

describe('Observer', () => {
  it('must be work called with ()', () => {
    let observer = new Observer();
    assert.ok(observer._servers instanceof Set);
  });

  it('must be work called with ([#server])', () => {
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
    assert.ok(observer.has(httpServer));
    assert.ok(observer.has(httpsServer));
    assert.ok(observer.has(http2Server));
    assert.ok(observer.has(https2Server));
  });
});