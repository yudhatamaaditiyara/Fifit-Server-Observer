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

describe('Observer#unregister', () => {
  it('must be work called with (#server)', () => {
    let httpServer = helper.createHttpServer();
    let observer = new Observer();
    observer.register(httpServer);
    assert.ok(observer.has(httpServer));
    assert.ok(observer.unregister(httpServer) instanceof Observer);
    assert.ok(!observer.has(httpServer));
  });

  it('must be throw RuntimeError() when isStarted === true', () => {
    let httpServer = helper.createHttpServer();
    let observer = new Observer();
    observer.register(httpServer);
    observer.isStarted = true;
    try {
      observer.unregister(httpServer);
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof RuntimeError);
    }
  });
});