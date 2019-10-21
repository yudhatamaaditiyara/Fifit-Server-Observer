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

/**
 */
class Observer
{
	/**
	 * @params {Array|void} servers
	 */
	constructor(servers){
		this._servers = new Set();
		this.isStarted = false;
		if (servers != null) {
			this.registers(servers);
		}
	}
	
	/**
	 * @param {Server} server
	 * @returns {boolean}
	 */
	has(server){
		return this._servers.has(server);
	}

	/**
	 * @param {Server} server
	 * @throws {Error}
	 * @returns {Observer}
	 */
	register(server){
		if (this.isStarted) {
			throw new Error('The observer is started');
		}
		if (server.isStarted) {
			throw new Error('The server is started');
		}
		this._servers.add(server);
		return this;
	}
	
	/**
	 * @param {Array} servers
	 * @returns {Observer}
	 */
	registers(servers){
		servers.forEach(server => this.register(server));
		return this;
	}

	/**
	 * @param {Server} server
	 * @throws {Error}
	 * @returns {Observer}
	 */
	unregister(server){
		if (this.isStarted) {
			throw new Error('The observer is started');
		}
		this._servers.delete(server);
		return this;
	}

	/**
	 * @param {Array} servers
	 * @returns {Observer}
	 */
	unregisters(servers){
		servers.forEach(server => this.unregister(server));
		return this;
	}

	/**
	 * @param {function} listener
	 * @throws {Error}
	 * @returns {Observer}
	 */
	listen(listener){
		if (this.isStarted) {
			throw new Error('The observer is started');
		}
		this._servers.forEach(server => server.listen(listener));
		return this;
	}

	/**
	 * @param {function} listener
	 * @throws {Error}
	 * @returns {Observer}
	 */
	unlisten(listener){
		if (this.isStarted) {
			throw new Error('The observer is started');
		}
		this._servers.forEach(server => server.unlisten(listener));
		return this;
	}

	/**
	 * @returns {Promise}
	 */
	start(){
		if (this.isStarted) {
			return Promise.reject(new Error('The observer is started'));
		}
		return this._start(this._servers.values());
	}

	/**
	 * @returns {Promise}
	 */
	stop(){
		if (!this.isStarted) {
			return Promise.reject(new Error('The observer is not started'));
		}
		return this._stop(this._servers.values());
	}

	/**
	 * @param {Iterator} iterator
	 * @returns {Promise}
	 */
	_start(iterator){
		let server = iterator.next().value;
		if (!server) {
			this.isStarted = true;
			return Promise.resolve();
		}
		if (!server.isStarted) {
			return this._startServer(iterator, server);
		}
		return Promise.resolve(this._start(iterator));
	}

	/**
	 * @param {Iterator} iterator
	 * @param {Server} server
	 * @returns {Promise}
	 */
	async _startServer(iterator, server){
		try {
			await server.start();
		} catch (error) {
			return Promise.reject(error);
		}
		return Promise.resolve(this._start(iterator));
	}

	/**
	 * @param {Iterator} iterator
	 * @returns {Promise}
	 */
	_stop(iterator){
		let server = iterator.next().value;
		if (!server) {
			this.isStarted = false;
			return Promise.resolve();
		}
		if (server.isStarted) {
			return this._stopServer(iterator, server);
		}
		return Promise.resolve(this._stop(iterator));
	}

	/**
	 * @param {Iterator} iterator
	 * @param {Server} server
	 * @returns {Promise}
	 */
	async _stopServer(iterator, server){
		try {
			await server.stop();
		} catch (error) {
			return Promise.reject(error);
		}
		return Promise.resolve(this._stop(iterator));
	}
}

/**
 * @+
 */
module.exports = Observer;