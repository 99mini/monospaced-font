#!/usr/bin/env node
/* eslint-disable */
// @ts-nocheck
"use strict";

function $$SETUP_STATE(hydrateRuntimeState, basePath) {
  const fs = require('fs');
  const path = require('path');
  const pnpDataFilepath = path.resolve(__dirname, ".pnp.data.json");
  return hydrateRuntimeState(JSON.parse(fs.readFileSync(pnpDataFilepath, 'utf8')), {basePath: basePath || __dirname});
}

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const events = require('events');
const nodeUtils = require('util');
const stream = require('stream');
const zlib = require('zlib');
const require$$0 = require('module');
const StringDecoder = require('string_decoder');
const url = require('url');
const buffer = require('buffer');
const readline = require('readline');
const assert = require('assert');

const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
const path__default = /*#__PURE__*/_interopDefaultLegacy(path);
const nodeUtils__namespace = /*#__PURE__*/_interopNamespace(nodeUtils);
const zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
const require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
const StringDecoder__default = /*#__PURE__*/_interopDefaultLegacy(StringDecoder);
const buffer__default = /*#__PURE__*/_interopDefaultLegacy(buffer);
const assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);

const S_IFMT = 61440;
const S_IFDIR = 16384;
const S_IFREG = 32768;
const S_IFLNK = 40960;
const SAFE_TIME = 456789e3;

function makeError$1(code, message) {
  return Object.assign(new Error(`${code}: ${message}`), { code });
}
function EBUSY(message) {
  return makeError$1(`EBUSY`, message);
}
function ENOSYS(message, reason) {
  return makeError$1(`ENOSYS`, `${message}, ${reason}`);
}
function EINVAL(reason) {
  return makeError$1(`EINVAL`, `invalid argument, ${reason}`);
}
function EBADF(reason) {
  return makeError$1(`EBADF`, `bad file descriptor, ${reason}`);
}
function ENOENT(reason) {
  return makeError$1(`ENOENT`, `no such file or directory, ${reason}`);
}
function ENOTDIR(reason) {
  return makeError$1(`ENOTDIR`, `not a directory, ${reason}`);
}
function EISDIR(reason) {
  return makeError$1(`EISDIR`, `illegal operation on a directory, ${reason}`);
}
function EEXIST(reason) {
  return makeError$1(`EEXIST`, `file already exists, ${reason}`);
}
function EROFS(reason) {
  return makeError$1(`EROFS`, `read-only filesystem, ${reason}`);
}
function ENOTEMPTY(reason) {
  return makeError$1(`ENOTEMPTY`, `directory not empty, ${reason}`);
}
function EOPNOTSUPP(reason) {
  return makeError$1(`EOPNOTSUPP`, `operation not supported, ${reason}`);
}
function ERR_DIR_CLOSED() {
  return makeError$1(`ERR_DIR_CLOSED`, `Directory handle was closed`);
}

const DEFAULT_MODE = S_IFREG | 420;
class StatEntry {
  uid = 0;
  gid = 0;
  size = 0;
  blksize = 0;
  atimeMs = 0;
  mtimeMs = 0;
  ctimeMs = 0;
  birthtimeMs = 0;
  atime = /* @__PURE__ */ new Date(0);
  mtime = /* @__PURE__ */ new Date(0);
  ctime = /* @__PURE__ */ new Date(0);
  birthtime = /* @__PURE__ */ new Date(0);
  dev = 0;
  ino = 0;
  mode = DEFAULT_MODE;
  nlink = 1;
  rdev = 0;
  blocks = 1;
  isBlockDevice() {
    return false;
  }
  isCharacterDevice() {
    return false;
  }
  isDirectory() {
    return (this.mode & S_IFMT) === S_IFDIR;
  }
  isFIFO() {
    return false;
  }
  isFile() {
    return (this.mode & S_IFMT) === S_IFREG;
  }
  isSocket() {
    return false;
  }
  isSymbolicLink() {
    return (this.mode & S_IFMT) === S_IFLNK;
  }
}
class BigIntStatsEntry {
  uid = BigInt(0);
  gid = BigInt(0);
  size = BigInt(0);
  blksize = BigInt(0);
  atimeMs = BigInt(0);
  mtimeMs = BigInt(0);
  ctimeMs = BigInt(0);
  birthtimeMs = BigInt(0);
  atimeNs = BigInt(0);
  mtimeNs = BigInt(0);
  ctimeNs = BigInt(0);
  birthtimeNs = BigInt(0);
  atime = /* @__PURE__ */ new Date(0);
  mtime = /* @__PURE__ */ new Date(0);
  ctime = /* @__PURE__ */ new Date(0);
  birthtime = /* @__PURE__ */ new Date(0);
  dev = BigInt(0);
  ino = BigInt(0);
  mode = BigInt(DEFAULT_MODE);
  nlink = BigInt(1);
  rdev = BigInt(0);
  blocks = BigInt(1);
  isBlockDevice() {
    return false;
  }
  isCharacterDevice() {
    return false;
  }
  isDirectory() {
    return (this.mode & BigInt(S_IFMT)) === BigInt(S_IFDIR);
  }
  isFIFO() {
    return false;
  }
  isFile() {
    return (this.mode & BigInt(S_IFMT)) === BigInt(S_IFREG);
  }
  isSocket() {
    return false;
  }
  isSymbolicLink() {
    return (this.mode & BigInt(S_IFMT)) === BigInt(S_IFLNK);
  }
}
function makeDefaultStats() {
  return new StatEntry();
}
function clearStats(stats) {
  for (const key in stats) {
    if (Object.hasOwn(stats, key)) {
      const element = stats[key];
      if (typeof element === `number`) {
        stats[key] = 0;
      } else if (typeof element === `bigint`) {
        stats[key] = BigInt(0);
      } else if (nodeUtils__namespace.types.isDate(element)) {
        stats[key] = /* @__PURE__ */ new Date(0);
      }
    }
  }
  return stats;
}
function convertToBigIntStats(stats) {
  const bigintStats = new BigIntStatsEntry();
  for (const key in stats) {
    if (Object.hasOwn(stats, key)) {
      const element = stats[key];
      if (typeof element === `number`) {
        bigintStats[key] = BigInt(element);
      } else if (nodeUtils__namespace.types.isDate(element)) {
        bigintStats[key] = new Date(element);
      }
    }
  }
  bigintStats.atimeNs = bigintStats.atimeMs * BigInt(1e6);
  bigintStats.mtimeNs = bigintStats.mtimeMs * BigInt(1e6);
  bigintStats.ctimeNs = bigintStats.ctimeMs * BigInt(1e6);
  bigintStats.birthtimeNs = bigintStats.birthtimeMs * BigInt(1e6);
  return bigintStats;
}
function areStatsEqual(a, b) {
  if (a.atimeMs !== b.atimeMs)
    return false;
  if (a.birthtimeMs !== b.birthtimeMs)
    return false;
  if (a.blksize !== b.blksize)
    return false;
  if (a.blocks !== b.blocks)
    return false;
  if (a.ctimeMs !== b.ctimeMs)
    return false;
  if (a.dev !== b.dev)
    return false;
  if (a.gid !== b.gid)
    return false;
  if (a.ino !== b.ino)
    return false;
  if (a.isBlockDevice() !== b.isBlockDevice())
    return false;
  if (a.isCharacterDevice() !== b.isCharacterDevice())
    return false;
  if (a.isDirectory() !== b.isDirectory())
    return false;
  if (a.isFIFO() !== b.isFIFO())
    return false;
  if (a.isFile() !== b.isFile())
    return false;
  if (a.isSocket() !== b.isSocket())
    return false;
  if (a.isSymbolicLink() !== b.isSymbolicLink())
    return false;
  if (a.mode !== b.mode)
    return false;
  if (a.mtimeMs !== b.mtimeMs)
    return false;
  if (a.nlink !== b.nlink)
    return false;
  if (a.rdev !== b.rdev)
    return false;
  if (a.size !== b.size)
    return false;
  if (a.uid !== b.uid)
    return false;
  const aN = a;
  const bN = b;
  if (aN.atimeNs !== bN.atimeNs)
    return false;
  if (aN.mtimeNs !== bN.mtimeNs)
    return false;
  if (aN.ctimeNs !== bN.ctimeNs)
    return false;
  if (aN.birthtimeNs !== bN.birthtimeNs)
    return false;
  return true;
}

const PortablePath = {
  root: `/`,
  dot: `.`,
  parent: `..`
};
const Filename = {
  home: `~`,
  nodeModules: `node_modules`,
  manifest: `package.json`,
  lockfile: `yarn.lock`,
  virtual: `__virtual__`,
  /**
   * @deprecated
   */
  pnpJs: `.pnp.js`,
  pnpCjs: `.pnp.cjs`,
  pnpData: `.pnp.data.json`,
  pnpEsmLoader: `.pnp.loader.mjs`,
  rc: `.yarnrc.yml`,
  env: `.env`
};
const npath = Object.create(path__default.default);
const ppath = Object.create(path__default.default.posix);
npath.cwd = () => process.cwd();
ppath.cwd = process.platform === `win32` ? () => toPortablePath(process.cwd()) : process.cwd;
if (process.platform === `win32`) {
  ppath.resolve = (...segments) => {
    if (segments.length > 0 && ppath.isAbsolute(segments[0])) {
      return path__default.default.posix.resolve(...segments);
    } else {
      return path__default.default.posix.resolve(ppath.cwd(), ...segments);
    }
  };
}
const contains = function(pathUtils, from, to) {
  from = pathUtils.normalize(from);
  to = pathUtils.normalize(to);
  if (from === to)
    return `.`;
  if (!from.endsWith(pathUtils.sep))
    from = from + pathUtils.sep;
  if (to.startsWith(from)) {
    return to.slice(from.length);
  } else {
    return null;
  }
};
npath.contains = (from, to) => contains(npath, from, to);
ppath.contains = (from, to) => contains(ppath, from, to);
const WINDOWS_PATH_REGEXP = /^([a-zA-Z]:.*)$/;
const UNC_WINDOWS_PATH_REGEXP = /^\/\/(\.\/)?(.*)$/;
const PORTABLE_PATH_REGEXP = /^\/([a-zA-Z]:.*)$/;
const UNC_PORTABLE_PATH_REGEXP = /^\/unc\/(\.dot\/)?(.*)$/;
function fromPortablePathWin32(p) {
  let portablePathMatch, uncPortablePathMatch;
  if (portablePathMatch = p.match(PORTABLE_PATH_REGEXP))
    p = portablePathMatch[1];
  else if (uncPortablePathMatch = p.match(UNC_PORTABLE_PATH_REGEXP))
    p = `\\\\${uncPortablePathMatch[1] ? `.\\` : ``}${uncPortablePathMatch[2]}`;
  else
    return p;
  return p.replace(/\//g, `\\`);
}
function toPortablePathWin32(p) {
  p = p.replace(/\\/g, `/`);
  let windowsPathMatch, uncWindowsPathMatch;
  if (windowsPathMatch = p.match(WINDOWS_PATH_REGEXP))
    p = `/${windowsPathMatch[1]}`;
  else if (uncWindowsPathMatch = p.match(UNC_WINDOWS_PATH_REGEXP))
    p = `/unc/${uncWindowsPathMatch[1] ? `.dot/` : ``}${uncWindowsPathMatch[2]}`;
  return p;
}
const toPortablePath = process.platform === `win32` ? toPortablePathWin32 : (p) => p;
const fromPortablePath = process.platform === `win32` ? fromPortablePathWin32 : (p) => p;
npath.fromPortablePath = fromPortablePath;
npath.toPortablePath = toPortablePath;
function convertPath(targetPathUtils, sourcePath) {
  return targetPathUtils === npath ? fromPortablePath(sourcePath) : toPortablePath(sourcePath);
}

const defaultTime = new Date(SAFE_TIME * 1e3);
const defaultTimeMs = defaultTime.getTime();
async function copyPromise(destinationFs, destination, sourceFs, source, opts) {
  const normalizedDestination = destinationFs.pathUtils.normalize(destination);
  const normalizedSource = sourceFs.pathUtils.normalize(source);
  const prelayout = [];
  const postlayout = [];
  const { atime, mtime } = opts.stableTime ? { atime: defaultTime, mtime: defaultTime } : await sourceFs.lstatPromise(normalizedSource);
  await destinationFs.mkdirpPromise(destinationFs.pathUtils.dirname(destination), { utimes: [atime, mtime] });
  await copyImpl(prelayout, postlayout, destinationFs, normalizedDestination, sourceFs, normalizedSource, { ...opts, didParentExist: true });
  for (const operation of prelayout)
    await operation();
  await Promise.all(postlayout.map((operation) => {
    return operation();
  }));
}
async function copyImpl(prelayout, postlayout, destinationFs, destination, sourceFs, source, opts) {
  const destinationStat = opts.didParentExist ? await maybeLStat(destinationFs, destination) : null;
  const sourceStat = await sourceFs.lstatPromise(source);
  const { atime, mtime } = opts.stableTime ? { atime: defaultTime, mtime: defaultTime } : sourceStat;
  let updated;
  switch (true) {
    case sourceStat.isDirectory():
      {
        updated = await copyFolder(prelayout, postlayout, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts);
      }
      break;
    case sourceStat.isFile():
      {
        updated = await copyFile(prelayout, postlayout, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts);
      }
      break;
    case sourceStat.isSymbolicLink():
      {
        updated = await copySymlink(prelayout, postlayout, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts);
      }
      break;
    default: {
      throw new Error(`Unsupported file type (${sourceStat.mode})`);
    }
  }
  if (opts.linkStrategy?.type !== `HardlinkFromIndex` || !sourceStat.isFile()) {
    if (updated || destinationStat?.mtime?.getTime() !== mtime.getTime() || destinationStat?.atime?.getTime() !== atime.getTime()) {
      postlayout.push(() => destinationFs.lutimesPromise(destination, atime, mtime));
      updated = true;
    }
    if (destinationStat === null || (destinationStat.mode & 511) !== (sourceStat.mode & 511)) {
      postlayout.push(() => destinationFs.chmodPromise(destination, sourceStat.mode & 511));
      updated = true;
    }
  }
  return updated;
}
async function maybeLStat(baseFs, p) {
  try {
    return await baseFs.lstatPromise(p);
  } catch (e) {
    return null;
  }
}
async function copyFolder(prelayout, postlayout, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts) {
  if (destinationStat !== null && !destinationStat.isDirectory()) {
    if (opts.overwrite) {
      prelayout.push(async () => destinationFs.removePromise(destination));
      destinationStat = null;
    } else {
      return false;
    }
  }
  let updated = false;
  if (destinationStat === null) {
    prelayout.push(async () => {
      try {
        await destinationFs.mkdirPromise(destination, { mode: sourceStat.mode });
      } catch (err) {
        if (err.code !== `EEXIST`) {
          throw err;
        }
      }
    });
    updated = true;
  }
  const entries = await sourceFs.readdirPromise(source);
  const nextOpts = opts.didParentExist && !destinationStat ? { ...opts, didParentExist: false } : opts;
  if (opts.stableSort) {
    for (const entry of entries.sort()) {
      if (await copyImpl(prelayout, postlayout, destinationFs, destinationFs.pathUtils.join(destination, entry), sourceFs, sourceFs.pathUtils.join(source, entry), nextOpts)) {
        updated = true;
      }
    }
  } else {
    const entriesUpdateStatus = await Promise.all(entries.map(async (entry) => {
      await copyImpl(prelayout, postlayout, destinationFs, destinationFs.pathUtils.join(destination, entry), sourceFs, sourceFs.pathUtils.join(source, entry), nextOpts);
    }));
    if (entriesUpdateStatus.some((status) => status)) {
      updated = true;
    }
  }
  return updated;
}
async function copyFileViaIndex(prelayout, postlayout, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts, linkStrategy) {
  const sourceHash = await sourceFs.checksumFilePromise(source, { algorithm: `sha1` });
  const defaultMode = 420;
  const sourceMode = sourceStat.mode & 511;
  const indexFileName = `${sourceHash}${sourceMode !== defaultMode ? sourceMode.toString(8) : ``}`;
  const indexPath = destinationFs.pathUtils.join(linkStrategy.indexPath, sourceHash.slice(0, 2), `${indexFileName}.dat`);
  let AtomicBehavior;
  ((AtomicBehavior2) => {
    AtomicBehavior2[AtomicBehavior2["Lock"] = 0] = "Lock";
    AtomicBehavior2[AtomicBehavior2["Rename"] = 1] = "Rename";
  })(AtomicBehavior || (AtomicBehavior = {}));
  let atomicBehavior = 1 /* Rename */;
  let indexStat = await maybeLStat(destinationFs, indexPath);
  if (destinationStat) {
    const isDestinationHardlinkedFromIndex = indexStat && destinationStat.dev === indexStat.dev && destinationStat.ino === indexStat.ino;
    const isIndexModified = indexStat?.mtimeMs !== defaultTimeMs;
    if (isDestinationHardlinkedFromIndex) {
      if (isIndexModified && linkStrategy.autoRepair) {
        atomicBehavior = 0 /* Lock */;
        indexStat = null;
      }
    }
    if (!isDestinationHardlinkedFromIndex) {
      if (opts.overwrite) {
        prelayout.push(async () => destinationFs.removePromise(destination));
        destinationStat = null;
      } else {
        return false;
      }
    }
  }
  const tempPath = !indexStat && atomicBehavior === 1 /* Rename */ ? `${indexPath}.${Math.floor(Math.random() * 4294967296).toString(16).padStart(8, `0`)}` : null;
  let tempPathCleaned = false;
  prelayout.push(async () => {
    if (!indexStat) {
      if (atomicBehavior === 0 /* Lock */) {
        await destinationFs.lockPromise(indexPath, async () => {
          const content = await sourceFs.readFilePromise(source);
          await destinationFs.writeFilePromise(indexPath, content);
        });
      }
      if (atomicBehavior === 1 /* Rename */ && tempPath) {
        const content = await sourceFs.readFilePromise(source);
        await destinationFs.writeFilePromise(tempPath, content);
        try {
          await destinationFs.linkPromise(tempPath, indexPath);
        } catch (err) {
          if (err.code === `EEXIST`) {
            tempPathCleaned = true;
            await destinationFs.unlinkPromise(tempPath);
          } else {
            throw err;
          }
        }
      }
    }
    if (!destinationStat) {
      await destinationFs.linkPromise(indexPath, destination);
    }
  });
  postlayout.push(async () => {
    if (!indexStat) {
      await destinationFs.lutimesPromise(indexPath, defaultTime, defaultTime);
      if (sourceMode !== defaultMode) {
        await destinationFs.chmodPromise(indexPath, sourceMode);
      }
    }
    if (tempPath && !tempPathCleaned) {
      await destinationFs.unlinkPromise(tempPath);
    }
  });
  return false;
}
async function copyFileDirect(prelayout, postlayout, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts) {
  if (destinationStat !== null) {
    if (opts.overwrite) {
      prelayout.push(async () => destinationFs.removePromise(destination));
      destinationStat = null;
    } else {
      return false;
    }
  }
  prelayout.push(async () => {
    const content = await sourceFs.readFilePromise(source);
    await destinationFs.writeFilePromise(destination, content);
  });
  return true;
}
async function copyFile(prelayout, postlayout, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts) {
  if (opts.linkStrategy?.type === `HardlinkFromIndex`) {
    return copyFileViaIndex(prelayout, postlayout, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts, opts.linkStrategy);
  } else {
    return copyFileDirect(prelayout, postlayout, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts);
  }
}
async function copySymlink(prelayout, postlayout, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts) {
  if (destinationStat !== null) {
    if (opts.overwrite) {
      prelayout.push(async () => destinationFs.removePromise(destination));
      destinationStat = null;
    } else {
      return false;
    }
  }
  prelayout.push(async () => {
    await destinationFs.symlinkPromise(convertPath(destinationFs.pathUtils, await sourceFs.readlinkPromise(source)), destination);
  });
  return true;
}

class CustomDir {
  constructor(path, nextDirent, opts = {}) {
    this.path = path;
    this.nextDirent = nextDirent;
    this.opts = opts;
  }
  closed = false;
  throwIfClosed() {
    if (this.closed) {
      throw ERR_DIR_CLOSED();
    }
  }
  async *[Symbol.asyncIterator]() {
    try {
      let dirent;
      while ((dirent = await this.read()) !== null) {
        yield dirent;
      }
    } finally {
      await this.close();
    }
  }
  read(cb) {
    const dirent = this.readSync();
    if (typeof cb !== `undefined`)
      return cb(null, dirent);
    return Promise.resolve(dirent);
  }
  readSync() {
    this.throwIfClosed();
    return this.nextDirent();
  }
  close(cb) {
    this.closeSync();
    if (typeof cb !== `undefined`)
      return cb(null);
    return Promise.resolve();
  }
  closeSync() {
    this.throwIfClosed();
    this.opts.onClose?.();
    this.closed = true;
  }
}
function opendir(fakeFs, path, entries, opts) {
  const nextDirent = () => {
    const filename = entries.shift();
    if (typeof filename === `undefined`)
      return null;
    const entryPath = fakeFs.pathUtils.join(path, filename);
    return Object.assign(fakeFs.statSync(entryPath), {
      name: filename,
      path: void 0
    });
  };
  return new CustomDir(path, nextDirent, opts);
}

function assertStatus(current, expected) {
  if (current !== expected) {
    throw new Error(`Invalid StatWatcher status: expected '${expected}', got '${current}'`);
  }
}
class CustomStatWatcher extends events.EventEmitter {
  fakeFs;
  path;
  bigint;
  status = "ready" /* Ready */;
  changeListeners = /* @__PURE__ */ new Map();
  lastStats;
  startTimeout = null;
  static create(fakeFs, path, opts) {
    const statWatcher = new CustomStatWatcher(fakeFs, path, opts);
    statWatcher.start();
    return statWatcher;
  }
  constructor(fakeFs, path, { bigint = false } = {}) {
    super();
    this.fakeFs = fakeFs;
    this.path = path;
    this.bigint = bigint;
    this.lastStats = this.stat();
  }
  start() {
    assertStatus(this.status, "ready" /* Ready */);
    this.status = "running" /* Running */;
    this.startTimeout = setTimeout(() => {
      this.startTimeout = null;
      if (!this.fakeFs.existsSync(this.path)) {
        this.emit("change" /* Change */, this.lastStats, this.lastStats);
      }
    }, 3);
  }
  stop() {
    assertStatus(this.status, "running" /* Running */);
    this.status = "stopped" /* Stopped */;
    if (this.startTimeout !== null) {
      clearTimeout(this.startTimeout);
      this.startTimeout = null;
    }
    this.emit("stop" /* Stop */);
  }
  stat() {
    try {
      return this.fakeFs.statSync(this.path, { bigint: this.bigint });
    } catch (error) {
      const statInstance = this.bigint ? new BigIntStatsEntry() : new StatEntry();
      return clearStats(statInstance);
    }
  }
  /**
   * Creates an interval whose callback compares the current stats with the previous stats and notifies all listeners in case of changes.
   *
   * @param opts.persistent Decides whether the interval should be immediately unref-ed.
   */
  makeInterval(opts) {
    const interval = setInterval(() => {
      const currentStats = this.stat();
      const previousStats = this.lastStats;
      if (areStatsEqual(currentStats, previousStats))
        return;
      this.lastStats = currentStats;
      this.emit("change" /* Change */, currentStats, previousStats);
    }, opts.interval);
    return opts.persistent ? interval : interval.unref();
  }
  /**
   * Registers a listener and assigns it an interval.
   */
  registerChangeListener(listener, opts) {
    this.addListener("change" /* Change */, listener);
    this.changeListeners.set(listener, this.makeInterval(opts));
  }
  /**
   * Unregisters the listener and clears the assigned interval.
   */
  unregisterChangeListener(listener) {
    this.removeListener("change" /* Change */, listener);
    const interval = this.changeListeners.get(listener);
    if (typeof interval !== `undefined`)
      clearInterval(interval);
    this.changeListeners.delete(listener);
  }
  /**
   * Unregisters all listeners and clears all assigned intervals.
   */
  unregisterAllChangeListeners() {
    for (const listener of this.changeListeners.keys()) {
      this.unregisterChangeListener(listener);
    }
  }
  hasChangeListeners() {
    return this.changeListeners.size > 0;
  }
  /**
   * Refs all stored intervals.
   */
  ref() {
    for (const interval of this.changeListeners.values())
      interval.ref();
    return this;
  }
  /**
   * Unrefs all stored intervals.
   */
  unref() {
    for (const interval of this.changeListeners.values())
      interval.unref();
    return this;
  }
}

const statWatchersByFakeFS = /* @__PURE__ */ new WeakMap();
function watchFile(fakeFs, path, a, b) {
  let bigint;
  let persistent;
  let interval;
  let listener;
  switch (typeof a) {
    case `function`:
      {
        bigint = false;
        persistent = true;
        interval = 5007;
        listener = a;
      }
      break;
    default:
      {
        ({
          bigint = false,
          persistent = true,
          interval = 5007
        } = a);
        listener = b;
      }
      break;
  }
  let statWatchers = statWatchersByFakeFS.get(fakeFs);
  if (typeof statWatchers === `undefined`)
    statWatchersByFakeFS.set(fakeFs, statWatchers = /* @__PURE__ */ new Map());
  let statWatcher = statWatchers.get(path);
  if (typeof statWatcher === `undefined`) {
    statWatcher = CustomStatWatcher.create(fakeFs, path, { bigint });
    statWatchers.set(path, statWatcher);
  }
  statWatcher.registerChangeListener(listener, { persistent, interval });
  return statWatcher;
}
function unwatchFile(fakeFs, path, cb) {
  const statWatchers = statWatchersByFakeFS.get(fakeFs);
  if (typeof statWatchers === `undefined`)
    return;
  const statWatcher = statWatchers.get(path);
  if (typeof statWatcher === `undefined`)
    return;
  if (typeof cb === `undefined`)
    statWatcher.unregisterAllChangeListeners();
  else
    statWatcher.unregisterChangeListener(cb);
  if (!statWatcher.hasChangeListeners()) {
    statWatcher.stop();
    statWatchers.delete(path);
  }
}
function unwatchAllFiles(fakeFs) {
  const statWatchers = statWatchersByFakeFS.get(fakeFs);
  if (typeof statWatchers === `undefined`)
    return;
  for (const path of statWatchers.keys()) {
    unwatchFile(fakeFs, path);
  }
}

class FakeFS {
  pathUtils;
  constructor(pathUtils) {
    this.pathUtils = pathUtils;
  }
  async *genTraversePromise(init, { stableSort = false } = {}) {
    const stack = [init];
    while (stack.length > 0) {
      const p = stack.shift();
      const entry = await this.lstatPromise(p);
      if (entry.isDirectory()) {
        const entries = await this.readdirPromise(p);
        if (stableSort) {
          for (const entry2 of entries.sort()) {
            stack.push(this.pathUtils.join(p, entry2));
          }
        } else {
          throw new Error(`Not supported`);
        }
      } else {
        yield p;
      }
    }
  }
  async checksumFilePromise(path, { algorithm = `sha512` } = {}) {
    const fd = await this.openPromise(path, `r`);
    try {
      const CHUNK_SIZE = 65536;
      const chunk = Buffer.allocUnsafeSlow(CHUNK_SIZE);
      const hash = crypto.createHash(algorithm);
      let bytesRead = 0;
      while ((bytesRead = await this.readPromise(fd, chunk, 0, CHUNK_SIZE)) !== 0)
        hash.update(bytesRead === CHUNK_SIZE ? chunk : chunk.slice(0, bytesRead));
      return hash.digest(`hex`);
    } finally {
      await this.closePromise(fd);
    }
  }
  async removePromise(p, { recursive = true, maxRetries = 5 } = {}) {
    let stat;
    try {
      stat = await this.lstatPromise(p);
    } catch (error) {
      if (error.code === `ENOENT`) {
        return;
      } else {
        throw error;
      }
    }
    if (stat.isDirectory()) {
      if (recursive) {
        const entries = await this.readdirPromise(p);
        await Promise.all(entries.map((entry) => {
          return this.removePromise(this.pathUtils.resolve(p, entry));
        }));
      }
      for (let t = 0; t <= maxRetries; t++) {
        try {
          await this.rmdirPromise(p);
          break;
        } catch (error) {
          if (error.code !== `EBUSY` && error.code !== `ENOTEMPTY`) {
            throw error;
          } else if (t < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, t * 100));
          }
        }
      }
    } else {
      await this.unlinkPromise(p);
    }
  }
  removeSync(p, { recursive = true } = {}) {
    let stat;
    try {
      stat = this.lstatSync(p);
    } catch (error) {
      if (error.code === `ENOENT`) {
        return;
      } else {
        throw error;
      }
    }
    if (stat.isDirectory()) {
      if (recursive)
        for (const entry of this.readdirSync(p))
          this.removeSync(this.pathUtils.resolve(p, entry));
      this.rmdirSync(p);
    } else {
      this.unlinkSync(p);
    }
  }
  async mkdirpPromise(p, { chmod, utimes } = {}) {
    p = this.resolve(p);
    if (p === this.pathUtils.dirname(p))
      return void 0;
    const parts = p.split(this.pathUtils.sep);
    let createdDirectory;
    for (let u = 2; u <= parts.length; ++u) {
      const subPath = parts.slice(0, u).join(this.pathUtils.sep);
      if (!this.existsSync(subPath)) {
        try {
          await this.mkdirPromise(subPath);
        } catch (error) {
          if (error.code === `EEXIST`) {
            continue;
          } else {
            throw error;
          }
        }
        createdDirectory ??= subPath;
        if (chmod != null)
          await this.chmodPromise(subPath, chmod);
        if (utimes != null) {
          await this.utimesPromise(subPath, utimes[0], utimes[1]);
        } else {
          const parentStat = await this.statPromise(this.pathUtils.dirname(subPath));
          await this.utimesPromise(subPath, parentStat.atime, parentStat.mtime);
        }
      }
    }
    return createdDirectory;
  }
  mkdirpSync(p, { chmod, utimes } = {}) {
    p = this.resolve(p);
    if (p === this.pathUtils.dirname(p))
      return void 0;
    const parts = p.split(this.pathUtils.sep);
    let createdDirectory;
    for (let u = 2; u <= parts.length; ++u) {
      const subPath = parts.slice(0, u).join(this.pathUtils.sep);
      if (!this.existsSync(subPath)) {
        try {
          this.mkdirSync(subPath);
        } catch (error) {
          if (error.code === `EEXIST`) {
            continue;
          } else {
            throw error;
          }
        }
        createdDirectory ??= subPath;
        if (chmod != null)
          this.chmodSync(subPath, chmod);
        if (utimes != null) {
          this.utimesSync(subPath, utimes[0], utimes[1]);
        } else {
          const parentStat = this.statSync(this.pathUtils.dirname(subPath));
          this.utimesSync(subPath, parentStat.atime, parentStat.mtime);
        }
      }
    }
    return createdDirectory;
  }
  async copyPromise(destination, source, { baseFs = this, overwrite = true, stableSort = false, stableTime = false, linkStrategy = null } = {}) {
    return await copyPromise(this, destination, baseFs, source, { overwrite, stableSort, stableTime, linkStrategy });
  }
  copySync(destination, source, { baseFs = this, overwrite = true } = {}) {
    const stat = baseFs.lstatSync(source);
    const exists = this.existsSync(destination);
    if (stat.isDirectory()) {
      this.mkdirpSync(destination);
      const directoryListing = baseFs.readdirSync(source);
      for (const entry of directoryListing) {
        this.copySync(this.pathUtils.join(destination, entry), baseFs.pathUtils.join(source, entry), { baseFs, overwrite });
      }
    } else if (stat.isFile()) {
      if (!exists || overwrite) {
        if (exists)
          this.removeSync(destination);
        const content = baseFs.readFileSync(source);
        this.writeFileSync(destination, content);
      }
    } else if (stat.isSymbolicLink()) {
      if (!exists || overwrite) {
        if (exists)
          this.removeSync(destination);
        const target = baseFs.readlinkSync(source);
        this.symlinkSync(convertPath(this.pathUtils, target), destination);
      }
    } else {
      throw new Error(`Unsupported file type (file: ${source}, mode: 0o${stat.mode.toString(8).padStart(6, `0`)})`);
    }
    const mode = stat.mode & 511;
    this.chmodSync(destination, mode);
  }
  async changeFilePromise(p, content, opts = {}) {
    if (Buffer.isBuffer(content)) {
      return this.changeFileBufferPromise(p, content, opts);
    } else {
      return this.changeFileTextPromise(p, content, opts);
    }
  }
  async changeFileBufferPromise(p, content, { mode } = {}) {
    let current = Buffer.alloc(0);
    try {
      current = await this.readFilePromise(p);
    } catch (error) {
    }
    if (Buffer.compare(current, content) === 0)
      return;
    await this.writeFilePromise(p, content, { mode });
  }
  async changeFileTextPromise(p, content, { automaticNewlines, mode } = {}) {
    let current = ``;
    try {
      current = await this.readFilePromise(p, `utf8`);
    } catch (error) {
    }
    const normalizedContent = automaticNewlines ? normalizeLineEndings(current, content) : content;
    if (current === normalizedContent)
      return;
    await this.writeFilePromise(p, normalizedContent, { mode });
  }
  changeFileSync(p, content, opts = {}) {
    if (Buffer.isBuffer(content)) {
      return this.changeFileBufferSync(p, content, opts);
    } else {
      return this.changeFileTextSync(p, content, opts);
    }
  }
  changeFileBufferSync(p, content, { mode } = {}) {
    let current = Buffer.alloc(0);
    try {
      current = this.readFileSync(p);
    } catch (error) {
    }
    if (Buffer.compare(current, content) === 0)
      return;
    this.writeFileSync(p, content, { mode });
  }
  changeFileTextSync(p, content, { automaticNewlines = false, mode } = {}) {
    let current = ``;
    try {
      current = this.readFileSync(p, `utf8`);
    } catch (error) {
    }
    const normalizedContent = automaticNewlines ? normalizeLineEndings(current, content) : content;
    if (current === normalizedContent)
      return;
    this.writeFileSync(p, normalizedContent, { mode });
  }
  async movePromise(fromP, toP) {
    try {
      await this.renamePromise(fromP, toP);
    } catch (error) {
      if (error.code === `EXDEV`) {
        await this.copyPromise(toP, fromP);
        await this.removePromise(fromP);
      } else {
        throw error;
      }
    }
  }
  moveSync(fromP, toP) {
    try {
      this.renameSync(fromP, toP);
    } catch (error) {
      if (error.code === `EXDEV`) {
        this.copySync(toP, fromP);
        this.removeSync(fromP);
      } else {
        throw error;
      }
    }
  }
  async lockPromise(affectedPath, callback) {
    const lockPath = `${affectedPath}.flock`;
    const interval = 1e3 / 60;
    const startTime = Date.now();
    let fd = null;
    const isAlive = async () => {
      let pid;
      try {
        [pid] = await this.readJsonPromise(lockPath);
      } catch (error) {
        return Date.now() - startTime < 500;
      }
      try {
        process.kill(pid, 0);
        return true;
      } catch (error) {
        return false;
      }
    };
    while (fd === null) {
      try {
        fd = await this.openPromise(lockPath, `wx`);
      } catch (error) {
        if (error.code === `EEXIST`) {
          if (!await isAlive()) {
            try {
              await this.unlinkPromise(lockPath);
              continue;
            } catch (error2) {
            }
          }
          if (Date.now() - startTime < 60 * 1e3) {
            await new Promise((resolve) => setTimeout(resolve, interval));
          } else {
            throw new Error(`Couldn't acquire a lock in a reasonable time (via ${lockPath})`);
          }
        } else {
          throw error;
        }
      }
    }
    await this.writePromise(fd, JSON.stringify([process.pid]));
    try {
      return await callback();
    } finally {
      try {
        await this.closePromise(fd);
        await this.unlinkPromise(lockPath);
      } catch (error) {
      }
    }
  }
  async readJsonPromise(p) {
    const content = await this.readFilePromise(p, `utf8`);
    try {
      return JSON.parse(content);
    } catch (error) {
      error.message += ` (in ${p})`;
      throw error;
    }
  }
  readJsonSync(p) {
    const content = this.readFileSync(p, `utf8`);
    try {
      return JSON.parse(content);
    } catch (error) {
      error.message += ` (in ${p})`;
      throw error;
    }
  }
  async writeJsonPromise(p, data, { compact = false } = {}) {
    const space = compact ? 0 : 2;
    return await this.writeFilePromise(p, `${JSON.stringify(data, null, space)}
`);
  }
  writeJsonSync(p, data, { compact = false } = {}) {
    const space = compact ? 0 : 2;
    return this.writeFileSync(p, `${JSON.stringify(data, null, space)}
`);
  }
  async preserveTimePromise(p, cb) {
    const stat = await this.lstatPromise(p);
    const result = await cb();
    if (typeof result !== `undefined`)
      p = result;
    await this.lutimesPromise(p, stat.atime, stat.mtime);
  }
  async preserveTimeSync(p, cb) {
    const stat = this.lstatSync(p);
    const result = cb();
    if (typeof result !== `undefined`)
      p = result;
    this.lutimesSync(p, stat.atime, stat.mtime);
  }
}
class BasePortableFakeFS extends FakeFS {
  constructor() {
    super(ppath);
  }
}
function getEndOfLine(content) {
  const matches = content.match(/\r?\n/g);
  if (matches === null)
    return os.EOL;
  const crlf = matches.filter((nl) => nl === `\r
`).length;
  const lf = matches.length - crlf;
  return crlf > lf ? `\r
` : `
`;
}
function normalizeLineEndings(originalContent, newContent) {
  return newContent.replace(/\r?\n/g, getEndOfLine(originalContent));
}

class ProxiedFS extends FakeFS {
  getExtractHint(hints) {
    return this.baseFs.getExtractHint(hints);
  }
  resolve(path) {
    return this.mapFromBase(this.baseFs.resolve(this.mapToBase(path)));
  }
  getRealPath() {
    return this.mapFromBase(this.baseFs.getRealPath());
  }
  async openPromise(p, flags, mode) {
    return this.baseFs.openPromise(this.mapToBase(p), flags, mode);
  }
  openSync(p, flags, mode) {
    return this.baseFs.openSync(this.mapToBase(p), flags, mode);
  }
  async opendirPromise(p, opts) {
    return Object.assign(await this.baseFs.opendirPromise(this.mapToBase(p), opts), { path: p });
  }
  opendirSync(p, opts) {
    return Object.assign(this.baseFs.opendirSync(this.mapToBase(p), opts), { path: p });
  }
  async readPromise(fd, buffer, offset, length, position) {
    return await this.baseFs.readPromise(fd, buffer, offset, length, position);
  }
  readSync(fd, buffer, offset, length, position) {
    return this.baseFs.readSync(fd, buffer, offset, length, position);
  }
  async writePromise(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return await this.baseFs.writePromise(fd, buffer, offset);
    } else {
      return await this.baseFs.writePromise(fd, buffer, offset, length, position);
    }
  }
  writeSync(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return this.baseFs.writeSync(fd, buffer, offset);
    } else {
      return this.baseFs.writeSync(fd, buffer, offset, length, position);
    }
  }
  async closePromise(fd) {
    return this.baseFs.closePromise(fd);
  }
  closeSync(fd) {
    this.baseFs.closeSync(fd);
  }
  createReadStream(p, opts) {
    return this.baseFs.createReadStream(p !== null ? this.mapToBase(p) : p, opts);
  }
  createWriteStream(p, opts) {
    return this.baseFs.createWriteStream(p !== null ? this.mapToBase(p) : p, opts);
  }
  async realpathPromise(p) {
    return this.mapFromBase(await this.baseFs.realpathPromise(this.mapToBase(p)));
  }
  realpathSync(p) {
    return this.mapFromBase(this.baseFs.realpathSync(this.mapToBase(p)));
  }
  async existsPromise(p) {
    return this.baseFs.existsPromise(this.mapToBase(p));
  }
  existsSync(p) {
    return this.baseFs.existsSync(this.mapToBase(p));
  }
  accessSync(p, mode) {
    return this.baseFs.accessSync(this.mapToBase(p), mode);
  }
  async accessPromise(p, mode) {
    return this.baseFs.accessPromise(this.mapToBase(p), mode);
  }
  async statPromise(p, opts) {
    return this.baseFs.statPromise(this.mapToBase(p), opts);
  }
  statSync(p, opts) {
    return this.baseFs.statSync(this.mapToBase(p), opts);
  }
  async fstatPromise(fd, opts) {
    return this.baseFs.fstatPromise(fd, opts);
  }
  fstatSync(fd, opts) {
    return this.baseFs.fstatSync(fd, opts);
  }
  lstatPromise(p, opts) {
    return this.baseFs.lstatPromise(this.mapToBase(p), opts);
  }
  lstatSync(p, opts) {
    return this.baseFs.lstatSync(this.mapToBase(p), opts);
  }
  async fchmodPromise(fd, mask) {
    return this.baseFs.fchmodPromise(fd, mask);
  }
  fchmodSync(fd, mask) {
    return this.baseFs.fchmodSync(fd, mask);
  }
  async chmodPromise(p, mask) {
    return this.baseFs.chmodPromise(this.mapToBase(p), mask);
  }
  chmodSync(p, mask) {
    return this.baseFs.chmodSync(this.mapToBase(p), mask);
  }
  async fchownPromise(fd, uid, gid) {
    return this.baseFs.fchownPromise(fd, uid, gid);
  }
  fchownSync(fd, uid, gid) {
    return this.baseFs.fchownSync(fd, uid, gid);
  }
  async chownPromise(p, uid, gid) {
    return this.baseFs.chownPromise(this.mapToBase(p), uid, gid);
  }
  chownSync(p, uid, gid) {
    return this.baseFs.chownSync(this.mapToBase(p), uid, gid);
  }
  async renamePromise(oldP, newP) {
    return this.baseFs.renamePromise(this.mapToBase(oldP), this.mapToBase(newP));
  }
  renameSync(oldP, newP) {
    return this.baseFs.renameSync(this.mapToBase(oldP), this.mapToBase(newP));
  }
  async copyFilePromise(sourceP, destP, flags = 0) {
    return this.baseFs.copyFilePromise(this.mapToBase(sourceP), this.mapToBase(destP), flags);
  }
  copyFileSync(sourceP, destP, flags = 0) {
    return this.baseFs.copyFileSync(this.mapToBase(sourceP), this.mapToBase(destP), flags);
  }
  async appendFilePromise(p, content, opts) {
    return this.baseFs.appendFilePromise(this.fsMapToBase(p), content, opts);
  }
  appendFileSync(p, content, opts) {
    return this.baseFs.appendFileSync(this.fsMapToBase(p), content, opts);
  }
  async writeFilePromise(p, content, opts) {
    return this.baseFs.writeFilePromise(this.fsMapToBase(p), content, opts);
  }
  writeFileSync(p, content, opts) {
    return this.baseFs.writeFileSync(this.fsMapToBase(p), content, opts);
  }
  async unlinkPromise(p) {
    return this.baseFs.unlinkPromise(this.mapToBase(p));
  }
  unlinkSync(p) {
    return this.baseFs.unlinkSync(this.mapToBase(p));
  }
  async utimesPromise(p, atime, mtime) {
    return this.baseFs.utimesPromise(this.mapToBase(p), atime, mtime);
  }
  utimesSync(p, atime, mtime) {
    return this.baseFs.utimesSync(this.mapToBase(p), atime, mtime);
  }
  async lutimesPromise(p, atime, mtime) {
    return this.baseFs.lutimesPromise(this.mapToBase(p), atime, mtime);
  }
  lutimesSync(p, atime, mtime) {
    return this.baseFs.lutimesSync(this.mapToBase(p), atime, mtime);
  }
  async mkdirPromise(p, opts) {
    return this.baseFs.mkdirPromise(this.mapToBase(p), opts);
  }
  mkdirSync(p, opts) {
    return this.baseFs.mkdirSync(this.mapToBase(p), opts);
  }
  async rmdirPromise(p, opts) {
    return this.baseFs.rmdirPromise(this.mapToBase(p), opts);
  }
  rmdirSync(p, opts) {
    return this.baseFs.rmdirSync(this.mapToBase(p), opts);
  }
  async rmPromise(p, opts) {
    return this.baseFs.rmPromise(this.mapToBase(p), opts);
  }
  rmSync(p, opts) {
    return this.baseFs.rmSync(this.mapToBase(p), opts);
  }
  async linkPromise(existingP, newP) {
    return this.baseFs.linkPromise(this.mapToBase(existingP), this.mapToBase(newP));
  }
  linkSync(existingP, newP) {
    return this.baseFs.linkSync(this.mapToBase(existingP), this.mapToBase(newP));
  }
  async symlinkPromise(target, p, type) {
    const mappedP = this.mapToBase(p);
    if (this.pathUtils.isAbsolute(target))
      return this.baseFs.symlinkPromise(this.mapToBase(target), mappedP, type);
    const mappedAbsoluteTarget = this.mapToBase(this.pathUtils.join(this.pathUtils.dirname(p), target));
    const mappedTarget = this.baseFs.pathUtils.relative(this.baseFs.pathUtils.dirname(mappedP), mappedAbsoluteTarget);
    return this.baseFs.symlinkPromise(mappedTarget, mappedP, type);
  }
  symlinkSync(target, p, type) {
    const mappedP = this.mapToBase(p);
    if (this.pathUtils.isAbsolute(target))
      return this.baseFs.symlinkSync(this.mapToBase(target), mappedP, type);
    const mappedAbsoluteTarget = this.mapToBase(this.pathUtils.join(this.pathUtils.dirname(p), target));
    const mappedTarget = this.baseFs.pathUtils.relative(this.baseFs.pathUtils.dirname(mappedP), mappedAbsoluteTarget);
    return this.baseFs.symlinkSync(mappedTarget, mappedP, type);
  }
  async readFilePromise(p, encoding) {
    return this.baseFs.readFilePromise(this.fsMapToBase(p), encoding);
  }
  readFileSync(p, encoding) {
    return this.baseFs.readFileSync(this.fsMapToBase(p), encoding);
  }
  readdirPromise(p, opts) {
    return this.baseFs.readdirPromise(this.mapToBase(p), opts);
  }
  readdirSync(p, opts) {
    return this.baseFs.readdirSync(this.mapToBase(p), opts);
  }
  async readlinkPromise(p) {
    return this.mapFromBase(await this.baseFs.readlinkPromise(this.mapToBase(p)));
  }
  readlinkSync(p) {
    return this.mapFromBase(this.baseFs.readlinkSync(this.mapToBase(p)));
  }
  async truncatePromise(p, len) {
    return this.baseFs.truncatePromise(this.mapToBase(p), len);
  }
  truncateSync(p, len) {
    return this.baseFs.truncateSync(this.mapToBase(p), len);
  }
  async ftruncatePromise(fd, len) {
    return this.baseFs.ftruncatePromise(fd, len);
  }
  ftruncateSync(fd, len) {
    return this.baseFs.ftruncateSync(fd, len);
  }
  watch(p, a, b) {
    return this.baseFs.watch(
      this.mapToBase(p),
      // @ts-expect-error
      a,
      b
    );
  }
  watchFile(p, a, b) {
    return this.baseFs.watchFile(
      this.mapToBase(p),
      // @ts-expect-error
      a,
      b
    );
  }
  unwatchFile(p, cb) {
    return this.baseFs.unwatchFile(this.mapToBase(p), cb);
  }
  fsMapToBase(p) {
    if (typeof p === `number`) {
      return p;
    } else {
      return this.mapToBase(p);
    }
  }
}

function direntToPortable(dirent) {
  const portableDirent = dirent;
  if (typeof dirent.path === `string`)
    portableDirent.path = npath.toPortablePath(dirent.path);
  return portableDirent;
}
class NodeFS extends BasePortableFakeFS {
  realFs;
  constructor(realFs = fs__default.default) {
    super();
    this.realFs = realFs;
  }
  getExtractHint() {
    return false;
  }
  getRealPath() {
    return PortablePath.root;
  }
  resolve(p) {
    return ppath.resolve(p);
  }
  async openPromise(p, flags, mode) {
    return await new Promise((resolve, reject) => {
      this.realFs.open(npath.fromPortablePath(p), flags, mode, this.makeCallback(resolve, reject));
    });
  }
  openSync(p, flags, mode) {
    return this.realFs.openSync(npath.fromPortablePath(p), flags, mode);
  }
  async opendirPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      if (typeof opts !== `undefined`) {
        this.realFs.opendir(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.opendir(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
      }
    }).then((dir) => {
      const dirWithFixedPath = dir;
      Object.defineProperty(dirWithFixedPath, `path`, {
        value: p,
        configurable: true,
        writable: true
      });
      return dirWithFixedPath;
    });
  }
  opendirSync(p, opts) {
    const dir = typeof opts !== `undefined` ? this.realFs.opendirSync(npath.fromPortablePath(p), opts) : this.realFs.opendirSync(npath.fromPortablePath(p));
    const dirWithFixedPath = dir;
    Object.defineProperty(dirWithFixedPath, `path`, {
      value: p,
      configurable: true,
      writable: true
    });
    return dirWithFixedPath;
  }
  async readPromise(fd, buffer, offset = 0, length = 0, position = -1) {
    return await new Promise((resolve, reject) => {
      this.realFs.read(fd, buffer, offset, length, position, (error, bytesRead) => {
        if (error) {
          reject(error);
        } else {
          resolve(bytesRead);
        }
      });
    });
  }
  readSync(fd, buffer, offset, length, position) {
    return this.realFs.readSync(fd, buffer, offset, length, position);
  }
  async writePromise(fd, buffer, offset, length, position) {
    return await new Promise((resolve, reject) => {
      if (typeof buffer === `string`) {
        return this.realFs.write(fd, buffer, offset, this.makeCallback(resolve, reject));
      } else {
        return this.realFs.write(fd, buffer, offset, length, position, this.makeCallback(resolve, reject));
      }
    });
  }
  writeSync(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return this.realFs.writeSync(fd, buffer, offset);
    } else {
      return this.realFs.writeSync(fd, buffer, offset, length, position);
    }
  }
  async closePromise(fd) {
    await new Promise((resolve, reject) => {
      this.realFs.close(fd, this.makeCallback(resolve, reject));
    });
  }
  closeSync(fd) {
    this.realFs.closeSync(fd);
  }
  createReadStream(p, opts) {
    const realPath = p !== null ? npath.fromPortablePath(p) : p;
    return this.realFs.createReadStream(realPath, opts);
  }
  createWriteStream(p, opts) {
    const realPath = p !== null ? npath.fromPortablePath(p) : p;
    return this.realFs.createWriteStream(realPath, opts);
  }
  async realpathPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.realpath(npath.fromPortablePath(p), {}, this.makeCallback(resolve, reject));
    }).then((path) => {
      return npath.toPortablePath(path);
    });
  }
  realpathSync(p) {
    return npath.toPortablePath(this.realFs.realpathSync(npath.fromPortablePath(p), {}));
  }
  async existsPromise(p) {
    return await new Promise((resolve) => {
      this.realFs.exists(npath.fromPortablePath(p), resolve);
    });
  }
  accessSync(p, mode) {
    return this.realFs.accessSync(npath.fromPortablePath(p), mode);
  }
  async accessPromise(p, mode) {
    return await new Promise((resolve, reject) => {
      this.realFs.access(npath.fromPortablePath(p), mode, this.makeCallback(resolve, reject));
    });
  }
  existsSync(p) {
    return this.realFs.existsSync(npath.fromPortablePath(p));
  }
  async statPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      if (opts) {
        this.realFs.stat(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.stat(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
      }
    });
  }
  statSync(p, opts) {
    if (opts) {
      return this.realFs.statSync(npath.fromPortablePath(p), opts);
    } else {
      return this.realFs.statSync(npath.fromPortablePath(p));
    }
  }
  async fstatPromise(fd, opts) {
    return await new Promise((resolve, reject) => {
      if (opts) {
        this.realFs.fstat(fd, opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.fstat(fd, this.makeCallback(resolve, reject));
      }
    });
  }
  fstatSync(fd, opts) {
    if (opts) {
      return this.realFs.fstatSync(fd, opts);
    } else {
      return this.realFs.fstatSync(fd);
    }
  }
  async lstatPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      if (opts) {
        this.realFs.lstat(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.lstat(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
      }
    });
  }
  lstatSync(p, opts) {
    if (opts) {
      return this.realFs.lstatSync(npath.fromPortablePath(p), opts);
    } else {
      return this.realFs.lstatSync(npath.fromPortablePath(p));
    }
  }
  async fchmodPromise(fd, mask) {
    return await new Promise((resolve, reject) => {
      this.realFs.fchmod(fd, mask, this.makeCallback(resolve, reject));
    });
  }
  fchmodSync(fd, mask) {
    return this.realFs.fchmodSync(fd, mask);
  }
  async chmodPromise(p, mask) {
    return await new Promise((resolve, reject) => {
      this.realFs.chmod(npath.fromPortablePath(p), mask, this.makeCallback(resolve, reject));
    });
  }
  chmodSync(p, mask) {
    return this.realFs.chmodSync(npath.fromPortablePath(p), mask);
  }
  async fchownPromise(fd, uid, gid) {
    return await new Promise((resolve, reject) => {
      this.realFs.fchown(fd, uid, gid, this.makeCallback(resolve, reject));
    });
  }
  fchownSync(fd, uid, gid) {
    return this.realFs.fchownSync(fd, uid, gid);
  }
  async chownPromise(p, uid, gid) {
    return await new Promise((resolve, reject) => {
      this.realFs.chown(npath.fromPortablePath(p), uid, gid, this.makeCallback(resolve, reject));
    });
  }
  chownSync(p, uid, gid) {
    return this.realFs.chownSync(npath.fromPortablePath(p), uid, gid);
  }
  async renamePromise(oldP, newP) {
    return await new Promise((resolve, reject) => {
      this.realFs.rename(npath.fromPortablePath(oldP), npath.fromPortablePath(newP), this.makeCallback(resolve, reject));
    });
  }
  renameSync(oldP, newP) {
    return this.realFs.renameSync(npath.fromPortablePath(oldP), npath.fromPortablePath(newP));
  }
  async copyFilePromise(sourceP, destP, flags = 0) {
    return await new Promise((resolve, reject) => {
      this.realFs.copyFile(npath.fromPortablePath(sourceP), npath.fromPortablePath(destP), flags, this.makeCallback(resolve, reject));
    });
  }
  copyFileSync(sourceP, destP, flags = 0) {
    return this.realFs.copyFileSync(npath.fromPortablePath(sourceP), npath.fromPortablePath(destP), flags);
  }
  async appendFilePromise(p, content, opts) {
    return await new Promise((resolve, reject) => {
      const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
      if (opts) {
        this.realFs.appendFile(fsNativePath, content, opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.appendFile(fsNativePath, content, this.makeCallback(resolve, reject));
      }
    });
  }
  appendFileSync(p, content, opts) {
    const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
    if (opts) {
      this.realFs.appendFileSync(fsNativePath, content, opts);
    } else {
      this.realFs.appendFileSync(fsNativePath, content);
    }
  }
  async writeFilePromise(p, content, opts) {
    return await new Promise((resolve, reject) => {
      const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
      if (opts) {
        this.realFs.writeFile(fsNativePath, content, opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.writeFile(fsNativePath, content, this.makeCallback(resolve, reject));
      }
    });
  }
  writeFileSync(p, content, opts) {
    const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
    if (opts) {
      this.realFs.writeFileSync(fsNativePath, content, opts);
    } else {
      this.realFs.writeFileSync(fsNativePath, content);
    }
  }
  async unlinkPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.unlink(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
    });
  }
  unlinkSync(p) {
    return this.realFs.unlinkSync(npath.fromPortablePath(p));
  }
  async utimesPromise(p, atime, mtime) {
    return await new Promise((resolve, reject) => {
      this.realFs.utimes(npath.fromPortablePath(p), atime, mtime, this.makeCallback(resolve, reject));
    });
  }
  utimesSync(p, atime, mtime) {
    this.realFs.utimesSync(npath.fromPortablePath(p), atime, mtime);
  }
  async lutimesPromise(p, atime, mtime) {
    return await new Promise((resolve, reject) => {
      this.realFs.lutimes(npath.fromPortablePath(p), atime, mtime, this.makeCallback(resolve, reject));
    });
  }
  lutimesSync(p, atime, mtime) {
    this.realFs.lutimesSync(npath.fromPortablePath(p), atime, mtime);
  }
  async mkdirPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      this.realFs.mkdir(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
    });
  }
  mkdirSync(p, opts) {
    return this.realFs.mkdirSync(npath.fromPortablePath(p), opts);
  }
  async rmdirPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      if (opts) {
        this.realFs.rmdir(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.rmdir(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
      }
    });
  }
  rmdirSync(p, opts) {
    return this.realFs.rmdirSync(npath.fromPortablePath(p), opts);
  }
  async rmPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      if (opts) {
        this.realFs.rm(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.rm(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
      }
    });
  }
  rmSync(p, opts) {
    return this.realFs.rmSync(npath.fromPortablePath(p), opts);
  }
  async linkPromise(existingP, newP) {
    return await new Promise((resolve, reject) => {
      this.realFs.link(npath.fromPortablePath(existingP), npath.fromPortablePath(newP), this.makeCallback(resolve, reject));
    });
  }
  linkSync(existingP, newP) {
    return this.realFs.linkSync(npath.fromPortablePath(existingP), npath.fromPortablePath(newP));
  }
  async symlinkPromise(target, p, type) {
    return await new Promise((resolve, reject) => {
      this.realFs.symlink(npath.fromPortablePath(target.replace(/\/+$/, ``)), npath.fromPortablePath(p), type, this.makeCallback(resolve, reject));
    });
  }
  symlinkSync(target, p, type) {
    return this.realFs.symlinkSync(npath.fromPortablePath(target.replace(/\/+$/, ``)), npath.fromPortablePath(p), type);
  }
  async readFilePromise(p, encoding) {
    return await new Promise((resolve, reject) => {
      const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
      this.realFs.readFile(fsNativePath, encoding, this.makeCallback(resolve, reject));
    });
  }
  readFileSync(p, encoding) {
    const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
    return this.realFs.readFileSync(fsNativePath, encoding);
  }
  async readdirPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      if (opts) {
        if (opts.recursive && process.platform === `win32`) {
          if (opts.withFileTypes) {
            this.realFs.readdir(npath.fromPortablePath(p), opts, this.makeCallback((results) => resolve(results.map(direntToPortable)), reject));
          } else {
            this.realFs.readdir(npath.fromPortablePath(p), opts, this.makeCallback((results) => resolve(results.map(npath.toPortablePath)), reject));
          }
        } else {
          this.realFs.readdir(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
        }
      } else {
        this.realFs.readdir(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
      }
    });
  }
  readdirSync(p, opts) {
    if (opts) {
      if (opts.recursive && process.platform === `win32`) {
        if (opts.withFileTypes) {
          return this.realFs.readdirSync(npath.fromPortablePath(p), opts).map(direntToPortable);
        } else {
          return this.realFs.readdirSync(npath.fromPortablePath(p), opts).map(npath.toPortablePath);
        }
      } else {
        return this.realFs.readdirSync(npath.fromPortablePath(p), opts);
      }
    } else {
      return this.realFs.readdirSync(npath.fromPortablePath(p));
    }
  }
  async readlinkPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.readlink(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
    }).then((path) => {
      return npath.toPortablePath(path);
    });
  }
  readlinkSync(p) {
    return npath.toPortablePath(this.realFs.readlinkSync(npath.fromPortablePath(p)));
  }
  async truncatePromise(p, len) {
    return await new Promise((resolve, reject) => {
      this.realFs.truncate(npath.fromPortablePath(p), len, this.makeCallback(resolve, reject));
    });
  }
  truncateSync(p, len) {
    return this.realFs.truncateSync(npath.fromPortablePath(p), len);
  }
  async ftruncatePromise(fd, len) {
    return await new Promise((resolve, reject) => {
      this.realFs.ftruncate(fd, len, this.makeCallback(resolve, reject));
    });
  }
  ftruncateSync(fd, len) {
    return this.realFs.ftruncateSync(fd, len);
  }
  watch(p, a, b) {
    return this.realFs.watch(
      npath.fromPortablePath(p),
      // @ts-expect-error
      a,
      b
    );
  }
  watchFile(p, a, b) {
    return this.realFs.watchFile(
      npath.fromPortablePath(p),
      // @ts-expect-error
      a,
      b
    );
  }
  unwatchFile(p, cb) {
    return this.realFs.unwatchFile(npath.fromPortablePath(p), cb);
  }
  makeCallback(resolve, reject) {
    return (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    };
  }
}

const MOUNT_MASK = 4278190080;
class MountFS extends BasePortableFakeFS {
  baseFs;
  mountInstances;
  fdMap = /* @__PURE__ */ new Map();
  nextFd = 3;
  factoryPromise;
  factorySync;
  filter;
  getMountPoint;
  magic;
  maxAge;
  maxOpenFiles;
  typeCheck;
  isMount = /* @__PURE__ */ new Set();
  notMount = /* @__PURE__ */ new Set();
  realPaths = /* @__PURE__ */ new Map();
  constructor({ baseFs = new NodeFS(), filter = null, magicByte = 42, maxOpenFiles = Infinity, useCache = true, maxAge = 5e3, typeCheck = fs.constants.S_IFREG, getMountPoint, factoryPromise, factorySync }) {
    if (Math.floor(magicByte) !== magicByte || !(magicByte > 1 && magicByte <= 127))
      throw new Error(`The magic byte must be set to a round value between 1 and 127 included`);
    super();
    this.baseFs = baseFs;
    this.mountInstances = useCache ? /* @__PURE__ */ new Map() : null;
    this.factoryPromise = factoryPromise;
    this.factorySync = factorySync;
    this.filter = filter;
    this.getMountPoint = getMountPoint;
    this.magic = magicByte << 24;
    this.maxAge = maxAge;
    this.maxOpenFiles = maxOpenFiles;
    this.typeCheck = typeCheck;
  }
  getExtractHint(hints) {
    return this.baseFs.getExtractHint(hints);
  }
  getRealPath() {
    return this.baseFs.getRealPath();
  }
  saveAndClose() {
    unwatchAllFiles(this);
    if (this.mountInstances) {
      for (const [path, { childFs }] of this.mountInstances.entries()) {
        childFs.saveAndClose?.();
        this.mountInstances.delete(path);
      }
    }
  }
  discardAndClose() {
    unwatchAllFiles(this);
    if (this.mountInstances) {
      for (const [path, { childFs }] of this.mountInstances.entries()) {
        childFs.discardAndClose?.();
        this.mountInstances.delete(path);
      }
    }
  }
  resolve(p) {
    return this.baseFs.resolve(p);
  }
  remapFd(mountFs, fd) {
    const remappedFd = this.nextFd++ | this.magic;
    this.fdMap.set(remappedFd, [mountFs, fd]);
    return remappedFd;
  }
  async openPromise(p, flags, mode) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.openPromise(p, flags, mode);
    }, async (mountFs, { subPath }) => {
      return this.remapFd(mountFs, await mountFs.openPromise(subPath, flags, mode));
    });
  }
  openSync(p, flags, mode) {
    return this.makeCallSync(p, () => {
      return this.baseFs.openSync(p, flags, mode);
    }, (mountFs, { subPath }) => {
      return this.remapFd(mountFs, mountFs.openSync(subPath, flags, mode));
    });
  }
  async opendirPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.opendirPromise(p, opts);
    }, async (mountFs, { subPath }) => {
      return await mountFs.opendirPromise(subPath, opts);
    }, {
      requireSubpath: false
    });
  }
  opendirSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.opendirSync(p, opts);
    }, (mountFs, { subPath }) => {
      return mountFs.opendirSync(subPath, opts);
    }, {
      requireSubpath: false
    });
  }
  async readPromise(fd, buffer, offset, length, position) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return await this.baseFs.readPromise(fd, buffer, offset, length, position);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`read`);
    const [mountFs, realFd] = entry;
    return await mountFs.readPromise(realFd, buffer, offset, length, position);
  }
  readSync(fd, buffer, offset, length, position) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return this.baseFs.readSync(fd, buffer, offset, length, position);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`readSync`);
    const [mountFs, realFd] = entry;
    return mountFs.readSync(realFd, buffer, offset, length, position);
  }
  async writePromise(fd, buffer, offset, length, position) {
    if ((fd & MOUNT_MASK) !== this.magic) {
      if (typeof buffer === `string`) {
        return await this.baseFs.writePromise(fd, buffer, offset);
      } else {
        return await this.baseFs.writePromise(fd, buffer, offset, length, position);
      }
    }
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`write`);
    const [mountFs, realFd] = entry;
    if (typeof buffer === `string`) {
      return await mountFs.writePromise(realFd, buffer, offset);
    } else {
      return await mountFs.writePromise(realFd, buffer, offset, length, position);
    }
  }
  writeSync(fd, buffer, offset, length, position) {
    if ((fd & MOUNT_MASK) !== this.magic) {
      if (typeof buffer === `string`) {
        return this.baseFs.writeSync(fd, buffer, offset);
      } else {
        return this.baseFs.writeSync(fd, buffer, offset, length, position);
      }
    }
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`writeSync`);
    const [mountFs, realFd] = entry;
    if (typeof buffer === `string`) {
      return mountFs.writeSync(realFd, buffer, offset);
    } else {
      return mountFs.writeSync(realFd, buffer, offset, length, position);
    }
  }
  async closePromise(fd) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return await this.baseFs.closePromise(fd);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`close`);
    this.fdMap.delete(fd);
    const [mountFs, realFd] = entry;
    return await mountFs.closePromise(realFd);
  }
  closeSync(fd) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return this.baseFs.closeSync(fd);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`closeSync`);
    this.fdMap.delete(fd);
    const [mountFs, realFd] = entry;
    return mountFs.closeSync(realFd);
  }
  createReadStream(p, opts) {
    if (p === null)
      return this.baseFs.createReadStream(p, opts);
    return this.makeCallSync(p, () => {
      return this.baseFs.createReadStream(p, opts);
    }, (mountFs, { archivePath, subPath }) => {
      const stream = mountFs.createReadStream(subPath, opts);
      stream.path = npath.fromPortablePath(this.pathUtils.join(archivePath, subPath));
      return stream;
    });
  }
  createWriteStream(p, opts) {
    if (p === null)
      return this.baseFs.createWriteStream(p, opts);
    return this.makeCallSync(p, () => {
      return this.baseFs.createWriteStream(p, opts);
    }, (mountFs, { subPath }) => {
      return mountFs.createWriteStream(subPath, opts);
    });
  }
  async realpathPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.realpathPromise(p);
    }, async (mountFs, { archivePath, subPath }) => {
      let realArchivePath = this.realPaths.get(archivePath);
      if (typeof realArchivePath === `undefined`) {
        realArchivePath = await this.baseFs.realpathPromise(archivePath);
        this.realPaths.set(archivePath, realArchivePath);
      }
      return this.pathUtils.join(realArchivePath, this.pathUtils.relative(PortablePath.root, await mountFs.realpathPromise(subPath)));
    });
  }
  realpathSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.realpathSync(p);
    }, (mountFs, { archivePath, subPath }) => {
      let realArchivePath = this.realPaths.get(archivePath);
      if (typeof realArchivePath === `undefined`) {
        realArchivePath = this.baseFs.realpathSync(archivePath);
        this.realPaths.set(archivePath, realArchivePath);
      }
      return this.pathUtils.join(realArchivePath, this.pathUtils.relative(PortablePath.root, mountFs.realpathSync(subPath)));
    });
  }
  async existsPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.existsPromise(p);
    }, async (mountFs, { subPath }) => {
      return await mountFs.existsPromise(subPath);
    });
  }
  existsSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.existsSync(p);
    }, (mountFs, { subPath }) => {
      return mountFs.existsSync(subPath);
    });
  }
  async accessPromise(p, mode) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.accessPromise(p, mode);
    }, async (mountFs, { subPath }) => {
      return await mountFs.accessPromise(subPath, mode);
    });
  }
  accessSync(p, mode) {
    return this.makeCallSync(p, () => {
      return this.baseFs.accessSync(p, mode);
    }, (mountFs, { subPath }) => {
      return mountFs.accessSync(subPath, mode);
    });
  }
  async statPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.statPromise(p, opts);
    }, async (mountFs, { subPath }) => {
      return await mountFs.statPromise(subPath, opts);
    });
  }
  statSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.statSync(p, opts);
    }, (mountFs, { subPath }) => {
      return mountFs.statSync(subPath, opts);
    });
  }
  async fstatPromise(fd, opts) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return this.baseFs.fstatPromise(fd, opts);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fstat`);
    const [mountFs, realFd] = entry;
    return mountFs.fstatPromise(realFd, opts);
  }
  fstatSync(fd, opts) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return this.baseFs.fstatSync(fd, opts);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fstatSync`);
    const [mountFs, realFd] = entry;
    return mountFs.fstatSync(realFd, opts);
  }
  async lstatPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.lstatPromise(p, opts);
    }, async (mountFs, { subPath }) => {
      return await mountFs.lstatPromise(subPath, opts);
    });
  }
  lstatSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.lstatSync(p, opts);
    }, (mountFs, { subPath }) => {
      return mountFs.lstatSync(subPath, opts);
    });
  }
  async fchmodPromise(fd, mask) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return this.baseFs.fchmodPromise(fd, mask);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fchmod`);
    const [mountFs, realFd] = entry;
    return mountFs.fchmodPromise(realFd, mask);
  }
  fchmodSync(fd, mask) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return this.baseFs.fchmodSync(fd, mask);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fchmodSync`);
    const [mountFs, realFd] = entry;
    return mountFs.fchmodSync(realFd, mask);
  }
  async chmodPromise(p, mask) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.chmodPromise(p, mask);
    }, async (mountFs, { subPath }) => {
      return await mountFs.chmodPromise(subPath, mask);
    });
  }
  chmodSync(p, mask) {
    return this.makeCallSync(p, () => {
      return this.baseFs.chmodSync(p, mask);
    }, (mountFs, { subPath }) => {
      return mountFs.chmodSync(subPath, mask);
    });
  }
  async fchownPromise(fd, uid, gid) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return this.baseFs.fchownPromise(fd, uid, gid);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fchown`);
    const [zipFs, realFd] = entry;
    return zipFs.fchownPromise(realFd, uid, gid);
  }
  fchownSync(fd, uid, gid) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return this.baseFs.fchownSync(fd, uid, gid);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fchownSync`);
    const [zipFs, realFd] = entry;
    return zipFs.fchownSync(realFd, uid, gid);
  }
  async chownPromise(p, uid, gid) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.chownPromise(p, uid, gid);
    }, async (mountFs, { subPath }) => {
      return await mountFs.chownPromise(subPath, uid, gid);
    });
  }
  chownSync(p, uid, gid) {
    return this.makeCallSync(p, () => {
      return this.baseFs.chownSync(p, uid, gid);
    }, (mountFs, { subPath }) => {
      return mountFs.chownSync(subPath, uid, gid);
    });
  }
  async renamePromise(oldP, newP) {
    return await this.makeCallPromise(oldP, async () => {
      return await this.makeCallPromise(newP, async () => {
        return await this.baseFs.renamePromise(oldP, newP);
      }, async () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
      });
    }, async (mountFsO, { subPath: subPathO }) => {
      return await this.makeCallPromise(newP, async () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
      }, async (mountFsN, { subPath: subPathN }) => {
        if (mountFsO !== mountFsN) {
          throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
        } else {
          return await mountFsO.renamePromise(subPathO, subPathN);
        }
      });
    });
  }
  renameSync(oldP, newP) {
    return this.makeCallSync(oldP, () => {
      return this.makeCallSync(newP, () => {
        return this.baseFs.renameSync(oldP, newP);
      }, () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
      });
    }, (mountFsO, { subPath: subPathO }) => {
      return this.makeCallSync(newP, () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
      }, (mountFsN, { subPath: subPathN }) => {
        if (mountFsO !== mountFsN) {
          throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
        } else {
          return mountFsO.renameSync(subPathO, subPathN);
        }
      });
    });
  }
  async copyFilePromise(sourceP, destP, flags = 0) {
    const fallback = async (sourceFs, sourceP2, destFs, destP2) => {
      if ((flags & fs.constants.COPYFILE_FICLONE_FORCE) !== 0)
        throw Object.assign(new Error(`EXDEV: cross-device clone not permitted, copyfile '${sourceP2}' -> ${destP2}'`), { code: `EXDEV` });
      if (flags & fs.constants.COPYFILE_EXCL && await this.existsPromise(sourceP2))
        throw Object.assign(new Error(`EEXIST: file already exists, copyfile '${sourceP2}' -> '${destP2}'`), { code: `EEXIST` });
      let content;
      try {
        content = await sourceFs.readFilePromise(sourceP2);
      } catch (error) {
        throw Object.assign(new Error(`EINVAL: invalid argument, copyfile '${sourceP2}' -> '${destP2}'`), { code: `EINVAL` });
      }
      await destFs.writeFilePromise(destP2, content);
    };
    return await this.makeCallPromise(sourceP, async () => {
      return await this.makeCallPromise(destP, async () => {
        return await this.baseFs.copyFilePromise(sourceP, destP, flags);
      }, async (mountFsD, { subPath: subPathD }) => {
        return await fallback(this.baseFs, sourceP, mountFsD, subPathD);
      });
    }, async (mountFsS, { subPath: subPathS }) => {
      return await this.makeCallPromise(destP, async () => {
        return await fallback(mountFsS, subPathS, this.baseFs, destP);
      }, async (mountFsD, { subPath: subPathD }) => {
        if (mountFsS !== mountFsD) {
          return await fallback(mountFsS, subPathS, mountFsD, subPathD);
        } else {
          return await mountFsS.copyFilePromise(subPathS, subPathD, flags);
        }
      });
    });
  }
  copyFileSync(sourceP, destP, flags = 0) {
    const fallback = (sourceFs, sourceP2, destFs, destP2) => {
      if ((flags & fs.constants.COPYFILE_FICLONE_FORCE) !== 0)
        throw Object.assign(new Error(`EXDEV: cross-device clone not permitted, copyfile '${sourceP2}' -> ${destP2}'`), { code: `EXDEV` });
      if (flags & fs.constants.COPYFILE_EXCL && this.existsSync(sourceP2))
        throw Object.assign(new Error(`EEXIST: file already exists, copyfile '${sourceP2}' -> '${destP2}'`), { code: `EEXIST` });
      let content;
      try {
        content = sourceFs.readFileSync(sourceP2);
      } catch (error) {
        throw Object.assign(new Error(`EINVAL: invalid argument, copyfile '${sourceP2}' -> '${destP2}'`), { code: `EINVAL` });
      }
      destFs.writeFileSync(destP2, content);
    };
    return this.makeCallSync(sourceP, () => {
      return this.makeCallSync(destP, () => {
        return this.baseFs.copyFileSync(sourceP, destP, flags);
      }, (mountFsD, { subPath: subPathD }) => {
        return fallback(this.baseFs, sourceP, mountFsD, subPathD);
      });
    }, (mountFsS, { subPath: subPathS }) => {
      return this.makeCallSync(destP, () => {
        return fallback(mountFsS, subPathS, this.baseFs, destP);
      }, (mountFsD, { subPath: subPathD }) => {
        if (mountFsS !== mountFsD) {
          return fallback(mountFsS, subPathS, mountFsD, subPathD);
        } else {
          return mountFsS.copyFileSync(subPathS, subPathD, flags);
        }
      });
    });
  }
  async appendFilePromise(p, content, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.appendFilePromise(p, content, opts);
    }, async (mountFs, { subPath }) => {
      return await mountFs.appendFilePromise(subPath, content, opts);
    });
  }
  appendFileSync(p, content, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.appendFileSync(p, content, opts);
    }, (mountFs, { subPath }) => {
      return mountFs.appendFileSync(subPath, content, opts);
    });
  }
  async writeFilePromise(p, content, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.writeFilePromise(p, content, opts);
    }, async (mountFs, { subPath }) => {
      return await mountFs.writeFilePromise(subPath, content, opts);
    });
  }
  writeFileSync(p, content, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.writeFileSync(p, content, opts);
    }, (mountFs, { subPath }) => {
      return mountFs.writeFileSync(subPath, content, opts);
    });
  }
  async unlinkPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.unlinkPromise(p);
    }, async (mountFs, { subPath }) => {
      return await mountFs.unlinkPromise(subPath);
    });
  }
  unlinkSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.unlinkSync(p);
    }, (mountFs, { subPath }) => {
      return mountFs.unlinkSync(subPath);
    });
  }
  async utimesPromise(p, atime, mtime) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.utimesPromise(p, atime, mtime);
    }, async (mountFs, { subPath }) => {
      return await mountFs.utimesPromise(subPath, atime, mtime);
    });
  }
  utimesSync(p, atime, mtime) {
    return this.makeCallSync(p, () => {
      return this.baseFs.utimesSync(p, atime, mtime);
    }, (mountFs, { subPath }) => {
      return mountFs.utimesSync(subPath, atime, mtime);
    });
  }
  async lutimesPromise(p, atime, mtime) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.lutimesPromise(p, atime, mtime);
    }, async (mountFs, { subPath }) => {
      return await mountFs.lutimesPromise(subPath, atime, mtime);
    });
  }
  lutimesSync(p, atime, mtime) {
    return this.makeCallSync(p, () => {
      return this.baseFs.lutimesSync(p, atime, mtime);
    }, (mountFs, { subPath }) => {
      return mountFs.lutimesSync(subPath, atime, mtime);
    });
  }
  async mkdirPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.mkdirPromise(p, opts);
    }, async (mountFs, { subPath }) => {
      return await mountFs.mkdirPromise(subPath, opts);
    });
  }
  mkdirSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.mkdirSync(p, opts);
    }, (mountFs, { subPath }) => {
      return mountFs.mkdirSync(subPath, opts);
    });
  }
  async rmdirPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.rmdirPromise(p, opts);
    }, async (mountFs, { subPath }) => {
      return await mountFs.rmdirPromise(subPath, opts);
    });
  }
  rmdirSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.rmdirSync(p, opts);
    }, (mountFs, { subPath }) => {
      return mountFs.rmdirSync(subPath, opts);
    });
  }
  async rmPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.rmPromise(p, opts);
    }, async (mountFs, { subPath }) => {
      return await mountFs.rmPromise(subPath, opts);
    });
  }
  rmSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.rmSync(p, opts);
    }, (mountFs, { subPath }) => {
      return mountFs.rmSync(subPath, opts);
    });
  }
  async linkPromise(existingP, newP) {
    return await this.makeCallPromise(newP, async () => {
      return await this.baseFs.linkPromise(existingP, newP);
    }, async (mountFs, { subPath }) => {
      return await mountFs.linkPromise(existingP, subPath);
    });
  }
  linkSync(existingP, newP) {
    return this.makeCallSync(newP, () => {
      return this.baseFs.linkSync(existingP, newP);
    }, (mountFs, { subPath }) => {
      return mountFs.linkSync(existingP, subPath);
    });
  }
  async symlinkPromise(target, p, type) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.symlinkPromise(target, p, type);
    }, async (mountFs, { subPath }) => {
      return await mountFs.symlinkPromise(target, subPath);
    });
  }
  symlinkSync(target, p, type) {
    return this.makeCallSync(p, () => {
      return this.baseFs.symlinkSync(target, p, type);
    }, (mountFs, { subPath }) => {
      return mountFs.symlinkSync(target, subPath);
    });
  }
  async readFilePromise(p, encoding) {
    return this.makeCallPromise(p, async () => {
      return await this.baseFs.readFilePromise(p, encoding);
    }, async (mountFs, { subPath }) => {
      return await mountFs.readFilePromise(subPath, encoding);
    });
  }
  readFileSync(p, encoding) {
    return this.makeCallSync(p, () => {
      return this.baseFs.readFileSync(p, encoding);
    }, (mountFs, { subPath }) => {
      return mountFs.readFileSync(subPath, encoding);
    });
  }
  async readdirPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.readdirPromise(p, opts);
    }, async (mountFs, { subPath }) => {
      return await mountFs.readdirPromise(subPath, opts);
    }, {
      requireSubpath: false
    });
  }
  readdirSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.readdirSync(p, opts);
    }, (mountFs, { subPath }) => {
      return mountFs.readdirSync(subPath, opts);
    }, {
      requireSubpath: false
    });
  }
  async readlinkPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.readlinkPromise(p);
    }, async (mountFs, { subPath }) => {
      return await mountFs.readlinkPromise(subPath);
    });
  }
  readlinkSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.readlinkSync(p);
    }, (mountFs, { subPath }) => {
      return mountFs.readlinkSync(subPath);
    });
  }
  async truncatePromise(p, len) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.truncatePromise(p, len);
    }, async (mountFs, { subPath }) => {
      return await mountFs.truncatePromise(subPath, len);
    });
  }
  truncateSync(p, len) {
    return this.makeCallSync(p, () => {
      return this.baseFs.truncateSync(p, len);
    }, (mountFs, { subPath }) => {
      return mountFs.truncateSync(subPath, len);
    });
  }
  async ftruncatePromise(fd, len) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return this.baseFs.ftruncatePromise(fd, len);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`ftruncate`);
    const [mountFs, realFd] = entry;
    return mountFs.ftruncatePromise(realFd, len);
  }
  ftruncateSync(fd, len) {
    if ((fd & MOUNT_MASK) !== this.magic)
      return this.baseFs.ftruncateSync(fd, len);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`ftruncateSync`);
    const [mountFs, realFd] = entry;
    return mountFs.ftruncateSync(realFd, len);
  }
  watch(p, a, b) {
    return this.makeCallSync(p, () => {
      return this.baseFs.watch(
        p,
        // @ts-expect-error
        a,
        b
      );
    }, (mountFs, { subPath }) => {
      return mountFs.watch(
        subPath,
        // @ts-expect-error
        a,
        b
      );
    });
  }
  watchFile(p, a, b) {
    return this.makeCallSync(p, () => {
      return this.baseFs.watchFile(
        p,
        // @ts-expect-error
        a,
        b
      );
    }, () => {
      return watchFile(this, p, a, b);
    });
  }
  unwatchFile(p, cb) {
    return this.makeCallSync(p, () => {
      return this.baseFs.unwatchFile(p, cb);
    }, () => {
      return unwatchFile(this, p, cb);
    });
  }
  async makeCallPromise(p, discard, accept, { requireSubpath = true } = {}) {
    if (typeof p !== `string`)
      return await discard();
    const normalizedP = this.resolve(p);
    const mountInfo = this.findMount(normalizedP);
    if (!mountInfo)
      return await discard();
    if (requireSubpath && mountInfo.subPath === `/`)
      return await discard();
    return await this.getMountPromise(mountInfo.archivePath, async (mountFs) => await accept(mountFs, mountInfo));
  }
  makeCallSync(p, discard, accept, { requireSubpath = true } = {}) {
    if (typeof p !== `string`)
      return discard();
    const normalizedP = this.resolve(p);
    const mountInfo = this.findMount(normalizedP);
    if (!mountInfo)
      return discard();
    if (requireSubpath && mountInfo.subPath === `/`)
      return discard();
    return this.getMountSync(mountInfo.archivePath, (mountFs) => accept(mountFs, mountInfo));
  }
  findMount(p) {
    if (this.filter && !this.filter.test(p))
      return null;
    let filePath = ``;
    while (true) {
      const pathPartWithArchive = p.substring(filePath.length);
      const mountPoint = this.getMountPoint(pathPartWithArchive, filePath);
      if (!mountPoint)
        return null;
      filePath = this.pathUtils.join(filePath, mountPoint);
      if (!this.isMount.has(filePath)) {
        if (this.notMount.has(filePath))
          continue;
        try {
          if (this.typeCheck !== null && (this.baseFs.statSync(filePath).mode & fs.constants.S_IFMT) !== this.typeCheck) {
            this.notMount.add(filePath);
            continue;
          }
        } catch {
          return null;
        }
        this.isMount.add(filePath);
      }
      return {
        archivePath: filePath,
        subPath: this.pathUtils.join(PortablePath.root, p.substring(filePath.length))
      };
    }
  }
  limitOpenFilesTimeout = null;
  limitOpenFiles(max) {
    if (this.mountInstances === null)
      return;
    const now = Date.now();
    let nextExpiresAt = now + this.maxAge;
    let closeCount = max === null ? 0 : this.mountInstances.size - max;
    for (const [path, { childFs, expiresAt, refCount }] of this.mountInstances.entries()) {
      if (refCount !== 0 || childFs.hasOpenFileHandles?.()) {
        continue;
      } else if (now >= expiresAt) {
        childFs.saveAndClose?.();
        this.mountInstances.delete(path);
        closeCount -= 1;
        continue;
      } else if (max === null || closeCount <= 0) {
        nextExpiresAt = expiresAt;
        break;
      }
      childFs.saveAndClose?.();
      this.mountInstances.delete(path);
      closeCount -= 1;
    }
    if (this.limitOpenFilesTimeout === null && (max === null && this.mountInstances.size > 0 || max !== null) && isFinite(nextExpiresAt)) {
      this.limitOpenFilesTimeout = setTimeout(() => {
        this.limitOpenFilesTimeout = null;
        this.limitOpenFiles(null);
      }, nextExpiresAt - now).unref();
    }
  }
  async getMountPromise(p, accept) {
    if (this.mountInstances) {
      let cachedMountFs = this.mountInstances.get(p);
      if (!cachedMountFs) {
        const createFsInstance = await this.factoryPromise(this.baseFs, p);
        cachedMountFs = this.mountInstances.get(p);
        if (!cachedMountFs) {
          cachedMountFs = {
            childFs: createFsInstance(),
            expiresAt: 0,
            refCount: 0
          };
        }
      }
      this.mountInstances.delete(p);
      this.limitOpenFiles(this.maxOpenFiles - 1);
      this.mountInstances.set(p, cachedMountFs);
      cachedMountFs.expiresAt = Date.now() + this.maxAge;
      cachedMountFs.refCount += 1;
      try {
        return await accept(cachedMountFs.childFs);
      } finally {
        cachedMountFs.refCount -= 1;
      }
    } else {
      const mountFs = (await this.factoryPromise(this.baseFs, p))();
      try {
        return await accept(mountFs);
      } finally {
        mountFs.saveAndClose?.();
      }
    }
  }
  getMountSync(p, accept) {
    if (this.mountInstances) {
      let cachedMountFs = this.mountInstances.get(p);
      if (!cachedMountFs) {
        cachedMountFs = {
          childFs: this.factorySync(this.baseFs, p),
          expiresAt: 0,
          refCount: 0
        };
      }
      this.mountInstances.delete(p);
      this.limitOpenFiles(this.maxOpenFiles - 1);
      this.mountInstances.set(p, cachedMountFs);
      cachedMountFs.expiresAt = Date.now() + this.maxAge;
      return accept(cachedMountFs.childFs);
    } else {
      const childFs = this.factorySync(this.baseFs, p);
      try {
        return accept(childFs);
      } finally {
        childFs.saveAndClose?.();
      }
    }
  }
}

class PosixFS extends ProxiedFS {
  baseFs;
  constructor(baseFs) {
    super(npath);
    this.baseFs = baseFs;
  }
  mapFromBase(path) {
    return npath.fromPortablePath(path);
  }
  mapToBase(path) {
    return npath.toPortablePath(path);
  }
}

const NUMBER_REGEXP = /^[0-9]+$/;
const VIRTUAL_REGEXP = /^(\/(?:[^/]+\/)*?(?:\$\$virtual|__virtual__))((?:\/((?:[^/]+-)?[a-f0-9]+)(?:\/([^/]+))?)?((?:\/.*)?))$/;
const VALID_COMPONENT = /^([^/]+-)?[a-f0-9]+$/;
class VirtualFS extends ProxiedFS {
  baseFs;
  static makeVirtualPath(base, component, to) {
    if (ppath.basename(base) !== `__virtual__`)
      throw new Error(`Assertion failed: Virtual folders must be named "__virtual__"`);
    if (!ppath.basename(component).match(VALID_COMPONENT))
      throw new Error(`Assertion failed: Virtual components must be ended by an hexadecimal hash`);
    const target = ppath.relative(ppath.dirname(base), to);
    const segments = target.split(`/`);
    let depth = 0;
    while (depth < segments.length && segments[depth] === `..`)
      depth += 1;
    const finalSegments = segments.slice(depth);
    const fullVirtualPath = ppath.join(base, component, String(depth), ...finalSegments);
    return fullVirtualPath;
  }
  static resolveVirtual(p) {
    const match = p.match(VIRTUAL_REGEXP);
    if (!match || !match[3] && match[5])
      return p;
    const target = ppath.dirname(match[1]);
    if (!match[3] || !match[4])
      return target;
    const isnum = NUMBER_REGEXP.test(match[4]);
    if (!isnum)
      return p;
    const depth = Number(match[4]);
    const backstep = `../`.repeat(depth);
    const subpath = match[5] || `.`;
    return VirtualFS.resolveVirtual(ppath.join(target, backstep, subpath));
  }
  constructor({ baseFs = new NodeFS() } = {}) {
    super(ppath);
    this.baseFs = baseFs;
  }
  getExtractHint(hints) {
    return this.baseFs.getExtractHint(hints);
  }
  getRealPath() {
    return this.baseFs.getRealPath();
  }
  realpathSync(p) {
    const match = p.match(VIRTUAL_REGEXP);
    if (!match)
      return this.baseFs.realpathSync(p);
    if (!match[5])
      return p;
    const realpath = this.baseFs.realpathSync(this.mapToBase(p));
    return VirtualFS.makeVirtualPath(match[1], match[3], realpath);
  }
  async realpathPromise(p) {
    const match = p.match(VIRTUAL_REGEXP);
    if (!match)
      return await this.baseFs.realpathPromise(p);
    if (!match[5])
      return p;
    const realpath = await this.baseFs.realpathPromise(this.mapToBase(p));
    return VirtualFS.makeVirtualPath(match[1], match[3], realpath);
  }
  mapToBase(p) {
    if (p === ``)
      return p;
    if (this.pathUtils.isAbsolute(p))
      return VirtualFS.resolveVirtual(p);
    const resolvedRoot = VirtualFS.resolveVirtual(this.baseFs.resolve(PortablePath.dot));
    const resolvedP = VirtualFS.resolveVirtual(this.baseFs.resolve(p));
    return ppath.relative(resolvedRoot, resolvedP) || PortablePath.dot;
  }
  mapFromBase(p) {
    return p;
  }
}

const URL = Number(process.versions.node.split('.', 1)[0]) < 20 ? url.URL : globalThis.URL;

class NodePathFS extends ProxiedFS {
  baseFs;
  constructor(baseFs) {
    super(npath);
    this.baseFs = baseFs;
  }
  mapFromBase(path) {
    return path;
  }
  mapToBase(path) {
    if (typeof path === `string`)
      return path;
    if (path instanceof URL)
      return url.fileURLToPath(path);
    if (Buffer.isBuffer(path)) {
      const str = path.toString();
      if (!isUtf8(path, str))
        throw new Error(`Non-utf8 buffers are not supported at the moment. Please upvote the following issue if you encounter this error: https://github.com/yarnpkg/berry/issues/4942`);
      return str;
    }
    throw new Error(`Unsupported path type: ${nodeUtils.inspect(path)}`);
  }
}
function isUtf8(buf, str) {
  if (typeof buffer__default.default.isUtf8 !== `undefined`)
    return buffer__default.default.isUtf8(buf);
  return Buffer.byteLength(str) === buf.byteLength;
}

const kBaseFs = Symbol(`kBaseFs`);
const kFd = Symbol(`kFd`);
const kClosePromise = Symbol(`kClosePromise`);
const kCloseResolve = Symbol(`kCloseResolve`);
const kCloseReject = Symbol(`kCloseReject`);
const kRefs = Symbol(`kRefs`);
const kRef = Symbol(`kRef`);
const kUnref = Symbol(`kUnref`);
class FileHandle {
  [kBaseFs];
  [kFd];
  [kRefs] = 1;
  [kClosePromise] = void 0;
  [kCloseResolve] = void 0;
  [kCloseReject] = void 0;
  constructor(fd, baseFs) {
    this[kBaseFs] = baseFs;
    this[kFd] = fd;
  }
  get fd() {
    return this[kFd];
  }
  async appendFile(data, options) {
    try {
      this[kRef](this.appendFile);
      const encoding = (typeof options === `string` ? options : options?.encoding) ?? void 0;
      return await this[kBaseFs].appendFilePromise(this.fd, data, encoding ? { encoding } : void 0);
    } finally {
      this[kUnref]();
    }
  }
  async chown(uid, gid) {
    try {
      this[kRef](this.chown);
      return await this[kBaseFs].fchownPromise(this.fd, uid, gid);
    } finally {
      this[kUnref]();
    }
  }
  async chmod(mode) {
    try {
      this[kRef](this.chmod);
      return await this[kBaseFs].fchmodPromise(this.fd, mode);
    } finally {
      this[kUnref]();
    }
  }
  createReadStream(options) {
    return this[kBaseFs].createReadStream(null, { ...options, fd: this.fd });
  }
  createWriteStream(options) {
    return this[kBaseFs].createWriteStream(null, { ...options, fd: this.fd });
  }
  // FIXME: Missing FakeFS version
  datasync() {
    throw new Error(`Method not implemented.`);
  }
  // FIXME: Missing FakeFS version
  sync() {
    throw new Error(`Method not implemented.`);
  }
  async read(bufferOrOptions, offset, length, position) {
    try {
      this[kRef](this.read);
      let buffer;
      if (!Buffer.isBuffer(bufferOrOptions)) {
        bufferOrOptions ??= {};
        buffer = bufferOrOptions.buffer ?? Buffer.alloc(16384);
        offset = bufferOrOptions.offset || 0;
        length = bufferOrOptions.length ?? buffer.byteLength;
        position = bufferOrOptions.position ?? null;
      } else {
        buffer = bufferOrOptions;
      }
      offset ??= 0;
      length ??= 0;
      if (length === 0) {
        return {
          bytesRead: length,
          buffer
        };
      }
      const bytesRead = await this[kBaseFs].readPromise(this.fd, buffer, offset, length, position);
      return {
        bytesRead,
        buffer
      };
    } finally {
      this[kUnref]();
    }
  }
  async readFile(options) {
    try {
      this[kRef](this.readFile);
      const encoding = (typeof options === `string` ? options : options?.encoding) ?? void 0;
      return await this[kBaseFs].readFilePromise(this.fd, encoding);
    } finally {
      this[kUnref]();
    }
  }
  readLines(options) {
    return readline.createInterface({
      input: this.createReadStream(options),
      crlfDelay: Infinity
    });
  }
  async stat(opts) {
    try {
      this[kRef](this.stat);
      return await this[kBaseFs].fstatPromise(this.fd, opts);
    } finally {
      this[kUnref]();
    }
  }
  async truncate(len) {
    try {
      this[kRef](this.truncate);
      return await this[kBaseFs].ftruncatePromise(this.fd, len);
    } finally {
      this[kUnref]();
    }
  }
  // FIXME: Missing FakeFS version
  utimes(atime, mtime) {
    throw new Error(`Method not implemented.`);
  }
  async writeFile(data, options) {
    try {
      this[kRef](this.writeFile);
      const encoding = (typeof options === `string` ? options : options?.encoding) ?? void 0;
      await this[kBaseFs].writeFilePromise(this.fd, data, encoding);
    } finally {
      this[kUnref]();
    }
  }
  async write(...args) {
    try {
      this[kRef](this.write);
      if (ArrayBuffer.isView(args[0])) {
        const [buffer, offset, length, position] = args;
        const bytesWritten = await this[kBaseFs].writePromise(this.fd, buffer, offset ?? void 0, length ?? void 0, position ?? void 0);
        return { bytesWritten, buffer };
      } else {
        const [data, position, encoding] = args;
        const bytesWritten = await this[kBaseFs].writePromise(this.fd, data, position, encoding);
        return { bytesWritten, buffer: data };
      }
    } finally {
      this[kUnref]();
    }
  }
  // TODO: Use writev from FakeFS when that is implemented
  async writev(buffers, position) {
    try {
      this[kRef](this.writev);
      let bytesWritten = 0;
      if (typeof position !== `undefined`) {
        for (const buffer of buffers) {
          const writeResult = await this.write(buffer, void 0, void 0, position);
          bytesWritten += writeResult.bytesWritten;
          position += writeResult.bytesWritten;
        }
      } else {
        for (const buffer of buffers) {
          const writeResult = await this.write(buffer);
          bytesWritten += writeResult.bytesWritten;
        }
      }
      return {
        buffers,
        bytesWritten
      };
    } finally {
      this[kUnref]();
    }
  }
  // FIXME: Missing FakeFS version
  readv(buffers, position) {
    throw new Error(`Method not implemented.`);
  }
  close() {
    if (this[kFd] === -1) return Promise.resolve();
    if (this[kClosePromise]) return this[kClosePromise];
    this[kRefs]--;
    if (this[kRefs] === 0) {
      const fd = this[kFd];
      this[kFd] = -1;
      this[kClosePromise] = this[kBaseFs].closePromise(fd).finally(() => {
        this[kClosePromise] = void 0;
      });
    } else {
      this[kClosePromise] = new Promise((resolve, reject) => {
        this[kCloseResolve] = resolve;
        this[kCloseReject] = reject;
      }).finally(() => {
        this[kClosePromise] = void 0;
        this[kCloseReject] = void 0;
        this[kCloseResolve] = void 0;
      });
    }
    return this[kClosePromise];
  }
  [kRef](caller) {
    if (this[kFd] === -1) {
      const err = new Error(`file closed`);
      err.code = `EBADF`;
      err.syscall = caller.name;
      throw err;
    }
    this[kRefs]++;
  }
  [kUnref]() {
    this[kRefs]--;
    if (this[kRefs] === 0) {
      const fd = this[kFd];
      this[kFd] = -1;
      this[kBaseFs].closePromise(fd).then(this[kCloseResolve], this[kCloseReject]);
    }
  }
}

const SYNC_IMPLEMENTATIONS = /* @__PURE__ */ new Set([
  `accessSync`,
  `appendFileSync`,
  `createReadStream`,
  `createWriteStream`,
  `chmodSync`,
  `fchmodSync`,
  `chownSync`,
  `fchownSync`,
  `closeSync`,
  `copyFileSync`,
  `linkSync`,
  `lstatSync`,
  `fstatSync`,
  `lutimesSync`,
  `mkdirSync`,
  `openSync`,
  `opendirSync`,
  `readlinkSync`,
  `readFileSync`,
  `readdirSync`,
  `readlinkSync`,
  `realpathSync`,
  `renameSync`,
  `rmdirSync`,
  `rmSync`,
  `statSync`,
  `symlinkSync`,
  `truncateSync`,
  `ftruncateSync`,
  `unlinkSync`,
  `unwatchFile`,
  `utimesSync`,
  `watch`,
  `watchFile`,
  `writeFileSync`,
  `writeSync`
]);
const ASYNC_IMPLEMENTATIONS = /* @__PURE__ */ new Set([
  `accessPromise`,
  `appendFilePromise`,
  `fchmodPromise`,
  `chmodPromise`,
  `fchownPromise`,
  `chownPromise`,
  `closePromise`,
  `copyFilePromise`,
  `linkPromise`,
  `fstatPromise`,
  `lstatPromise`,
  `lutimesPromise`,
  `mkdirPromise`,
  `openPromise`,
  `opendirPromise`,
  `readdirPromise`,
  `realpathPromise`,
  `readFilePromise`,
  `readdirPromise`,
  `readlinkPromise`,
  `renamePromise`,
  `rmdirPromise`,
  `rmPromise`,
  `statPromise`,
  `symlinkPromise`,
  `truncatePromise`,
  `ftruncatePromise`,
  `unlinkPromise`,
  `utimesPromise`,
  `writeFilePromise`,
  `writeSync`
]);
function patchFs(patchedFs, fakeFs) {
  fakeFs = new NodePathFS(fakeFs);
  const setupFn = (target, name, replacement) => {
    const orig = target[name];
    target[name] = replacement;
    if (typeof orig?.[nodeUtils.promisify.custom] !== `undefined`) {
      replacement[nodeUtils.promisify.custom] = orig[nodeUtils.promisify.custom];
    }
  };
  {
    setupFn(patchedFs, `exists`, (p, ...args) => {
      const hasCallback = typeof args[args.length - 1] === `function`;
      const callback = hasCallback ? args.pop() : () => {
      };
      process.nextTick(() => {
        fakeFs.existsPromise(p).then((exists) => {
          callback(exists);
        }, () => {
          callback(false);
        });
      });
    });
    setupFn(patchedFs, `read`, (...args) => {
      let [fd, buffer, offset, length, position, callback] = args;
      if (args.length <= 3) {
        let options = {};
        if (args.length < 3) {
          callback = args[1];
        } else {
          options = args[1];
          callback = args[2];
        }
        ({
          buffer = Buffer.alloc(16384),
          offset = 0,
          length = buffer.byteLength,
          position
        } = options);
      }
      if (offset == null)
        offset = 0;
      length |= 0;
      if (length === 0) {
        process.nextTick(() => {
          callback(null, 0, buffer);
        });
        return;
      }
      if (position == null)
        position = -1;
      process.nextTick(() => {
        fakeFs.readPromise(fd, buffer, offset, length, position).then((bytesRead) => {
          callback(null, bytesRead, buffer);
        }, (error) => {
          callback(error, 0, buffer);
        });
      });
    });
    for (const fnName of ASYNC_IMPLEMENTATIONS) {
      const origName = fnName.replace(/Promise$/, ``);
      if (typeof patchedFs[origName] === `undefined`)
        continue;
      const fakeImpl = fakeFs[fnName];
      if (typeof fakeImpl === `undefined`)
        continue;
      const wrapper = (...args) => {
        const hasCallback = typeof args[args.length - 1] === `function`;
        const callback = hasCallback ? args.pop() : () => {
        };
        process.nextTick(() => {
          fakeImpl.apply(fakeFs, args).then((result) => {
            callback(null, result);
          }, (error) => {
            callback(error);
          });
        });
      };
      setupFn(patchedFs, origName, wrapper);
    }
    patchedFs.realpath.native = patchedFs.realpath;
  }
  {
    setupFn(patchedFs, `existsSync`, (p) => {
      try {
        return fakeFs.existsSync(p);
      } catch (error) {
        return false;
      }
    });
    setupFn(patchedFs, `readSync`, (...args) => {
      let [fd, buffer, offset, length, position] = args;
      if (args.length <= 3) {
        const options = args[2] || {};
        ({ offset = 0, length = buffer.byteLength, position } = options);
      }
      if (offset == null)
        offset = 0;
      length |= 0;
      if (length === 0)
        return 0;
      if (position == null)
        position = -1;
      return fakeFs.readSync(fd, buffer, offset, length, position);
    });
    for (const fnName of SYNC_IMPLEMENTATIONS) {
      const origName = fnName;
      if (typeof patchedFs[origName] === `undefined`)
        continue;
      const fakeImpl = fakeFs[fnName];
      if (typeof fakeImpl === `undefined`)
        continue;
      setupFn(patchedFs, origName, fakeImpl.bind(fakeFs));
    }
    patchedFs.realpathSync.native = patchedFs.realpathSync;
  }
  {
    const patchedFsPromises = patchedFs.promises;
    for (const fnName of ASYNC_IMPLEMENTATIONS) {
      const origName = fnName.replace(/Promise$/, ``);
      if (typeof patchedFsPromises[origName] === `undefined`)
        continue;
      const fakeImpl = fakeFs[fnName];
      if (typeof fakeImpl === `undefined`)
        continue;
      if (fnName === `open`)
        continue;
      setupFn(patchedFsPromises, origName, (pathLike, ...args) => {
        if (pathLike instanceof FileHandle) {
          return pathLike[origName].apply(pathLike, args);
        } else {
          return fakeImpl.call(fakeFs, pathLike, ...args);
        }
      });
    }
    setupFn(patchedFsPromises, `open`, async (...args) => {
      const fd = await fakeFs.openPromise(...args);
      return new FileHandle(fd, fakeFs);
    });
  }
  {
    patchedFs.read[nodeUtils.promisify.custom] = async (fd, buffer, ...args) => {
      const res = fakeFs.readPromise(fd, buffer, ...args);
      return { bytesRead: await res, buffer };
    };
    patchedFs.write[nodeUtils.promisify.custom] = async (fd, buffer, ...args) => {
      const res = fakeFs.writePromise(fd, buffer, ...args);
      return { bytesWritten: await res, buffer };
    };
  }
}

let cachedInstance;
let registeredFactory = () => {
  throw new Error(`Assertion failed: No libzip instance is available, and no factory was configured`);
};
function setFactory(factory) {
  registeredFactory = factory;
}
function getInstance() {
  if (typeof cachedInstance === `undefined`)
    cachedInstance = registeredFactory();
  return cachedInstance;
}

var libzipSync = {exports: {}};

(function (module, exports) {
var frozenFs = Object.assign({}, fs__default.default);
var createModule = function() {
  var _scriptDir = void 0;
  if (typeof __filename !== "undefined") _scriptDir = _scriptDir || __filename;
  return function(createModule2) {
    createModule2 = createModule2 || {};
    var Module = typeof createModule2 !== "undefined" ? createModule2 : {};
    var readyPromiseResolve, readyPromiseReject;
    Module["ready"] = new Promise(function(resolve, reject) {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
    var moduleOverrides = {};
    var key;
    for (key in Module) {
      if (Module.hasOwnProperty(key)) {
        moduleOverrides[key] = Module[key];
      }
    }
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var read_, readBinary;
    var nodeFS;
    var nodePath;
    {
      {
        scriptDirectory = __dirname + "/";
      }
      read_ = function shell_read(filename, binary) {
        var ret = tryParseAsDataURI(filename);
        if (ret) {
          return binary ? ret : ret.toString();
        }
        if (!nodeFS) nodeFS = frozenFs;
        if (!nodePath) nodePath = path__default.default;
        filename = nodePath["normalize"](filename);
        return nodeFS["readFileSync"](filename, binary ? null : "utf8");
      };
      readBinary = function readBinary2(filename) {
        var ret = read_(filename, true);
        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }
        assert(ret.buffer);
        return ret;
      };
      if (process["argv"].length > 1) {
        process["argv"][1].replace(/\\/g, "/");
      }
      process["argv"].slice(2);
      Module["inspect"] = function() {
        return "[Emscripten Module object]";
      };
    }
    Module["print"] || console.log.bind(console);
    var err = Module["printErr"] || console.warn.bind(console);
    for (key in moduleOverrides) {
      if (moduleOverrides.hasOwnProperty(key)) {
        Module[key] = moduleOverrides[key];
      }
    }
    moduleOverrides = null;
    if (Module["arguments"]) ;
    if (Module["thisProgram"]) ;
    if (Module["quit"]) ;
    var wasmBinary;
    if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
    Module["noExitRuntime"] || true;
    if (typeof WebAssembly !== "object") {
      abort("no native wasm support detected");
    }
    function getValue(ptr, type, noSafe) {
      type = type || "i8";
      if (type.charAt(type.length - 1) === "*") type = "i32";
      switch (type) {
        case "i1":
          return HEAP8[ptr >> 0];
        case "i8":
          return HEAP8[ptr >> 0];
        case "i16":
          return LE_HEAP_LOAD_I16((ptr >> 1) * 2);
        case "i32":
          return LE_HEAP_LOAD_I32((ptr >> 2) * 4);
        case "i64":
          return LE_HEAP_LOAD_I32((ptr >> 2) * 4);
        case "float":
          return LE_HEAP_LOAD_F32((ptr >> 2) * 4);
        case "double":
          return LE_HEAP_LOAD_F64((ptr >> 3) * 8);
        default:
          abort("invalid type for getValue: " + type);
      }
      return null;
    }
    var wasmMemory;
    var ABORT = false;
    function assert(condition, text) {
      if (!condition) {
        abort("Assertion failed: " + text);
      }
    }
    function getCFunc(ident) {
      var func = Module["_" + ident];
      assert(
        func,
        "Cannot call unknown function " + ident + ", make sure it is exported"
      );
      return func;
    }
    function ccall(ident, returnType, argTypes, args, opts) {
      var toC = {
        string: function(str) {
          var ret2 = 0;
          if (str !== null && str !== void 0 && str !== 0) {
            var len = (str.length << 2) + 1;
            ret2 = stackAlloc(len);
            stringToUTF8(str, ret2, len);
          }
          return ret2;
        },
        array: function(arr) {
          var ret2 = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret2);
          return ret2;
        }
      };
      function convertReturnValue(ret2) {
        if (returnType === "string") return UTF8ToString(ret2);
        if (returnType === "boolean") return Boolean(ret2);
        return ret2;
      }
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func.apply(null, cArgs);
      ret = convertReturnValue(ret);
      if (stack !== 0) stackRestore(stack);
      return ret;
    }
    function cwrap(ident, returnType, argTypes, opts) {
      argTypes = argTypes || [];
      var numericArgs = argTypes.every(function(type) {
        return type === "number";
      });
      var numericRet = returnType !== "string";
      if (numericRet && numericArgs && !opts) {
        return getCFunc(ident);
      }
      return function() {
        return ccall(ident, returnType, argTypes, arguments);
      };
    }
    var UTF8Decoder = new TextDecoder("utf8");
    function UTF8ToString(ptr, maxBytesToRead) {
      if (!ptr) return "";
      var maxPtr = ptr + maxBytesToRead;
      for (var end = ptr; !(end >= maxPtr) && HEAPU8[end]; ) ++end;
      return UTF8Decoder.decode(HEAPU8.subarray(ptr, end));
    }
    function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0)) return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i);
          u = 65536 + ((u & 1023) << 10) | u1 & 1023;
        }
        if (u <= 127) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 192 | u >> 6;
          heap[outIdx++] = 128 | u & 63;
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 224 | u >> 12;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 240 | u >> 18;
          heap[outIdx++] = 128 | u >> 12 & 63;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    }
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    }
    function lengthBytesUTF8(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343)
          u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
        if (u <= 127) ++len;
        else if (u <= 2047) len += 2;
        else if (u <= 65535) len += 3;
        else len += 4;
      }
      return len;
    }
    function allocateUTF8(str) {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8Array(str, HEAP8, ret, size);
      return ret;
    }
    function writeArrayToMemory(array, buffer2) {
      HEAP8.set(array, buffer2);
    }
    function alignUp(x, multiple) {
      if (x % multiple > 0) {
        x += multiple - x % multiple;
      }
      return x;
    }
    var buffer, HEAP8, HEAPU8;
    var HEAP_DATA_VIEW;
    function updateGlobalBufferAndViews(buf) {
      buffer = buf;
      Module["HEAP_DATA_VIEW"] = HEAP_DATA_VIEW = new DataView(buf);
      Module["HEAP8"] = HEAP8 = new Int8Array(buf);
      Module["HEAP16"] = new Int16Array(buf);
      Module["HEAP32"] = new Int32Array(buf);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
      Module["HEAPU16"] = new Uint16Array(buf);
      Module["HEAPU32"] = new Uint32Array(buf);
      Module["HEAPF32"] = new Float32Array(buf);
      Module["HEAPF64"] = new Float64Array(buf);
    }
    Module["INITIAL_MEMORY"] || 16777216;
    var wasmTable;
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATPOSTRUN__ = [];
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      callRuntimeCallbacks(__ATINIT__);
    }
    function postRun() {
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    var runDependencies = 0;
    var dependenciesFulfilled = null;
    function addRunDependency(id) {
      runDependencies++;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
    }
    function removeRunDependency(id) {
      runDependencies--;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (runDependencies == 0) {
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    Module["preloadedImages"] = {};
    Module["preloadedAudios"] = {};
    function abort(what) {
      if (Module["onAbort"]) {
        Module["onAbort"](what);
      }
      what += "";
      err(what);
      ABORT = true;
      what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject(e);
      throw e;
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";
    function isDataURI(filename) {
      return filename.startsWith(dataURIPrefix);
    }
    var wasmBinaryFile = "data:application/octet-stream;base64,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QCAAKAJIIgEgASADaiADEAcaAkAgAyAAKAJsIgFNBEAgACABIANrNgJsDAELIABCADcCbAsgACAAKAJoIANrIgE2AmggACAAKAJYIANrNgJYIAEgACgChC5JBEAgACABNgKELgsgAEH8gAEoAgARAwAgAiADaiECCwJAIAAoAgAiASgCBCIERQ0AIAAoAjwhBSAAIAIgBCACIARJGyICBH8gACgCSCAAKAJoaiAFaiEFIAEgBCACazYCBAJAAkACQAJAIAEoAhwiBCgCFEEBaw4CAQACCyAEQaABaiAFIAEoAgAgAkHcgAEoAgARCAAMAgsgASABKAIwIAUgASgCACACQcSAASgCABEEADYCMAwBCyAFIAEoAgAgAhAHGgsgASABKAIAIAJqNgIAIAEgASgCCCACajYCCCAAKAI8BSAFCyACaiICNgI8AkAgACgChC4iASACakEDSQ0AIAAoAmggAWshAQJAIAAoAnRBgQhPBEAgACAAIAAoAkggAWoiAi0AACACLQABIAAoAnwRAAA2AlQMAQsgAUUNACAAIAFBAWsgACgChAERAgAaCyAAKAKELiAAKAI8IgJBAUZrIgRFDQAgACABIAQgACgCgAERBQAgACAAKAKELiAEazYChC4gACgCPCECCyACQYUCSw0AIAAoAgAoAgRFDQAgACgCMCEBDAELCwJAIAAoAkQiAiAAKAJAIgNNDQAgAAJ/IAAoAjwgACgCaGoiASADSwRAIAAoAkggAWpBACACIAFrIgNBggIgA0GCAkkbIgMQGSABIANqDAELIAFBggJqIgEgA00NASAAKAJIIANqQQAgAiADayICIAEgA2siAyACIANJGyIDEBkgACgCQCADags2AkALC50CAQF/AkAgAAJ/IAAoAqAuIgFBwABGBEAgACgCBCAAKAIQaiAAKQOYLjcAACAAQgA3A5guIAAgACgCEEEIajYCEEEADAELIAFBIE4EQCAAKAIEIAAoAhBqIAApA5guPgAAIAAgAEGcLmo1AgA3A5guIAAgACgCEEEEajYCECAAIAAoAqAuQSBrIgE2AqAuCyABQRBOBEAgACgCBCAAKAIQaiAAKQOYLj0AACAAIAAoAhBBAmo2AhAgACAAKQOYLkIQiDcDmC4gACAAKAKgLkEQayIBNgKgLgsgAUEISA0BIAAgACgCECIBQQFqNgIQ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KAJUIgEEfyABQQAgARAiEBkgACgCVAVBAAsQBiAAQQA2AlQLC9wMAgl/AX4jAEFAaiIGJAACQAJAAkACQAJAIAEoAjBBABAjIgVBAkZBACABKAI4QQAQIyIEQQFGGw0AIAVBAUZBACAEQQJGGw0AIAVBAkciAw0BIARBAkcNAQsgASABLwEMQYAQcjsBDEEAIQMMAQsgASABLwEMQf/vA3E7AQxBACEFIANFBEBB9eABIAEoAjAgAEEIahBpIgVFDQILIAJBgAJxBEAgBSEDDAELIARBAkcEQCAFIQMMAQtB9cYBIAEoAjggAEEIahBpIgNFBEAgBRAcDAILIAMgBTYCAAsgASABLwEMQf7/A3EgAS8BUiIFQQBHcjsBDAJAAkACQAJAAn8CQAJAIAEpAyhC/v///w9WDQAgASkDIEL+////D1YNACACQYAEcUUNASABKQNIQv////8PVA0BCyAFQYECa0H//wNxQQNJIQdBAQwBCyAFQYECa0H//wNxIQQgAkGACnFBgApHDQEgBEEDSSEHQQALIQkgBkIcEBciBEUEQCAAQQhqIgAEQCAAQQA2AgQgAEEONgIACyADEBwMBQsgAkGACHEhBQJAAkAgAkGAAnEEQAJAIAUNACABKQMgQv////8PVg0AIAEpAyhCgICAgBBUDQMLIAQgASkDKBAYIAEpAyAhDAwBCwJAAkACQCAFDQAgASkDIEL/////D1YNACABKQMoIgxC/////w9WDQEgASkDSEKAgICAEFQNBAsgASkDKCIMQv////8PVA0BCyAEIAwQGAsgASkDICIMQv////8PWgRAIAQgDBAYCyABKQNIIgxC/////w9UDQELIAQgDBAYCyAELQAARQRAIABBCGoiAARAIABBADYCBCAAQRQ2AgALIAQQCCADEBwMBQtBASEKQQEgBC0AAAR+IAQpAxAFQgALp0H//wNxIAYQRyEFIAQQCCAFIAM2AgAgBw0BDAILIAMhBSAEQQJLDQELIAZCBxAXIgRFBEAgAEEIaiIABEAgAEEANgIEIABBDjYCAAsgBRAcDAMLIARBAhANIARBhxJBAhAsIAQgAS0AUhBwIAQgAS8BEBANIAQtAABFBEAgAEEIaiIABEAgAEEANgIEIABBFDYCAAsgBBAIDAILQYGyAkEHIAYQRyEDIAQQCCADIAU2AgBBASEL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NgIEIABB7A42AhggGiEdDAMLIARB/wFxIgJBwABxRQRAIAggDSADLwECQQJ0aiAdp0F/IAJ0QX9zcUECdGoiAy0AASICayEIIB0gAq2IIR0gAy0AACIERQ0HDAELCyAEQSBxBEAgB0G//gA2AgQgASECDAgLIAdB0f4ANgIEIABB0A42AhggASECDAcLIB1BfyAGdEF/c62DIBt8IhunIQUgCCAEQQ9xIgNrIQggGiAErUIPg4ghHSABIBdrIgYgAjMBAiAaQX8gA3RBf3Otg3ynIgRPDQIgBCAGayIGIBlNDQEgBygCjEdFDQEgB0HR/gA2AgQgAEG5DDYCGAsgASECIAshBQwFCwJAIA5FBEAgDCARIAZraiEDDAELIAYgDk0EQCAMIA4gBmtqIQMMAQsgDCARIAYgDmsiBmtqIQMgBSAGTQ0AIAUgBmshBQJAAkAgASADTSABIA8gAWusIhogBq0iGyAaIBtUGyIapyIGaiICIANLcQ0AIAMgBmogAUsgASADT3ENACABIAMgBhAHGiACIQEMAQsgASADIAMgAWsiASABQR91IgFqIAFzIgIQByACaiEBIBogAq0iHn0iHFANACACIANqIQIDQAJAIBwgHiAcIB5UGyIbQiBUBEAgGyEaDAELIBsiGkIgfSIgQgWIQgF8QgODIh9QRQRAA0AgASACKQAANwAAIAEgAikAGDcAGCABIAIpABA3ABAgASACKQAINwAIIBpCIH0hGiACQSBqIQIgAUEgaiEBIB9CAX0iH0IAUg0ACwsgIELgAFQNAANAIAEgAikAADcAACABIAIpABg3ABggASACKQAQNwAQIAEgAikACDcACCABIAIpADg3ADggASACKQAwNwAwIAEgAikAKDcAKCABIAIpACA3ACAgASACKQBYNwBYIAEgAikAUDcAUCABIAIpAEg3AEggASACKQBANwBAIAEgAikAYDcAYCABIAIpAGg3AGggASACKQBwNwBwIAEgAikAeDcAeCACQYABaiECIAFBgAFqIQEgGkKAAX0iGkIfVg0ACwsgGkIQWgRAIAEgAikAADcAACABIAIpAAg3AAggGkIQfSEaIAJBEGohAiABQRBqIQELIBpCCFoEQCABIAIpAAA3AAAgGkIIfSEaIAJBCGohAiABQQhqIQELIBpCBFoEQCABIAIoAAA2AAAgGkIEfSEaIAJBBGohAiABQQRqIQELIBpCAloEQCABIAIvAAA7AAAgGkICfSEaIAJBAmohAiABQQJqIQELIBwgG30hHCAaUEUEQCABIAItAAA6AAAgAkEBaiECIAFBAWohAQsgHEIAUg0ACwsgDiEGIAwhAwsgBSAGSwRAAkACQCABIANNIAEgDyABa6wiGiAGrSIbIBogG1QbIhqnIglqIgIgA0txDQAgAyAJaiABSyABIANPcQ0AIAEgAyAJEAcaDAELIAEgAyADIAFrIgEgAUEfdSIBaiABcyIBEAcgAWohAiAaIAGtIh59IhxQDQAgASADaiEBA0ACQCAcIB4gHCAeVBsiG0IgVARAIBshGgwBCyAbIhpCIH0iIEIFiEIBfEIDgyIfUEUEQANAIAIgASkAADcAACACIAEpABg3ABggAiABKQAQNwAQIAIgASkACDcACCAaQiB9IRogAUEgaiEBIAJBIGohAiAfQgF9Ih9CAFINAAsLICBC4ABUDQADQCACIAEpAAA3AAAgAiABKQAYNwAYIAIgASkAEDcAECACIAEpAAg3AAggAiABKQA4NwA4IAIgASkAMDcAMCACIAEpACg3ACggAiABKQAgNwAgIAIgASkAWDcAWCACIAEpAFA3AFAgAiABKQBINwBIIAIgASkAQDcAQCACIAEpAGA3AGAgAiABKQBoNwBoIAIgASkAcDcAcCACIAEpAHg3AHggAUGAAWohASACQYABaiECIBpCgAF9IhpCH1YNAAsLIBpCEFoEQCACIAEpAAA3AAAgAiABKQAINwAIIBpCEH0hGiACQRBqIQIgAUEQaiEBCyAaQghaBEAgAiABKQAANwAAIBpCCH0hGiACQQhqIQIgAUEIaiEBCyAaQgRaBEAgAiABKAAANgAAIBpCBH0hGiACQQRqIQIgAUEEaiEBCyAaQgJaBEAgAiABLwAAOwAAIBpCAn0hGiACQQJqIQIgAUECaiEBCyAcIBt9IRwgGlBFBEAgAiABLQAAOgAAIAJBAWohAiABQQFqIQELIBxCAFINAAsLIAUgBmshAUEAIARrIQUCQCAEQQdLBEAgBCEDDAELIAEgBE0EQCAEIQMMAQsgAiAEayEFA0ACQCACIAUpAAA3AAAgBEEBdCEDIAEgBGshASACIARqIQIgBEEDSw0AIAMhBCABIANLDQELC0EAIANrIQULIAIgBWohBAJAIAUgDyACa6wiGiABrSIbIBogG1QbIhqnIgFIIAVBf0pxDQAgBUEBSCABIARqIAJLcQ0AIAIgBCABEAcgAWohAgwDCyACIAQgAyADQR91IgFqIAFzIgEQByABaiECIBogAa0iHn0iHFANAiABIARqIQEDQAJAIBwgHiAcIB5UGyIbQiBUBEAgGyEaDAELIBsiGkIgfSIgQgWIQgF8QgODIh9QRQRAA0AgAiABKQAANwAAIAIgASkAGDcAGCACIAEpABA3ABAgAiABKQAINwAIIBpCIH0hGiABQSBqIQEgAkEgaiECIB9CAX0iH0IAUg0ACwsgIELgAFQNAANAIAIgASkAADcAACACIAEpABg3ABggAiABKQAQNwAQIAIgASkACDcACCACIAEpADg3ADggAiABKQAwNwAwIAIgASkAKDcAKCACIAEpACA3ACAgAiABKQBYNwBYIAIgASkAUDcAUCACIAEpAEg3AEggAiABKQBANwBAIAIgASkAYDcAYCACIAEpAGg3AGggAiABKQBwNwBwIAIgASkAeDcAeCABQYABaiEBIAJBgAFqIQIgGkKAAX0iGkIfVg0ACwsgGkIQWgRAIAIgASkAADcAACACIAEpAAg3AAggGkIQfSEaIAJBEGohAiABQRBqIQELIBpCCFoEQCACIAEpAAA3AAAgGkIIfSEaIAJBCGohAiABQQhqIQELIBpCBFoEQCACIAEoAAA2AAAgGkIEfSEaIAJBBGohAiABQQRqIQELIBpCAloEQCACIAEvAAA7AAAgGkICfSEaIAJBAmohAiABQQJqIQELIBwgG30hHCAaUEUEQCACIAEtAAA6AAAgAkEBaiECIAFBAWohAQsgHFBFDQALDAILAkAgASADTSABIA8gAWusIhogBa0iGyAaIBtUGyIapyIEaiICIANLcQ0AIAMgBGogAUsgASADT3ENACABIAMgBBAHGgwCCyABIAMgAyABayIBIAFBH3UiAWogAXMiARAHIAFqIQIgGiABrSIefSIcUA0BIAEgA2ohAQNAAkAgHCAeIBwgHlQbIhtCIFQEQCAbIRoMAQsgGyIaQiB9IiBCBYhCAXxCA4MiH1BFBEADQCACIAEpAAA3AAAgAiABKQAYNwAYIAIgASkAEDcAECACIAEpAAg3AAggGkIgfSEaIAFBIGohASACQSBqIQIgH0IBfSIfQgBSDQALCyAgQuAAVA0AA0AgAiABKQAANwAAIAIgASkAGDcAGCACIAEpABA3ABAgAiABKQAINwAIIAIgASkAODcAOCACIAEpADA3ADAgAiABKQAoNwAoIAIgASkAIDcAICACIAEpAFg3AFggAiABKQBQNwBQIAIgASkASDcASCACIAEpAEA3AEAgAiABKQBgNwBgIAIgASkAaDcAaCACIAEpAHA3AHAgAiABKQB4NwB4IAFBgAFqIQEgAkGAAWohAiAaQoABfSIaQh9WDQALCyAaQhBaBEAgAiABKQAANwAAIAIgASkACDcACCAaQhB9IRogAkEQaiECIAFBEGohAQsgGkIIWgRAIAIgASkAADcAACAaQgh9IRogAkEIaiECIAFBCGohAQsgGkIEWgRAIAIgASgAADYAACAaQgR9IRogAkEEaiECIAFBBGohAQsgGkICWgRAIAIgAS8AADsAACAaQgJ9IRogAkECaiECIAFBAmohAQsgHCAbfSEcIBpQRQRAIAIgAS0AADoAACACQQFqIQIgAUEBaiEBCyAcUEUNAAsMAQsCQAJAIBYEQAJAIAQgBUkEQCAHKAKYRyAESw0BCyABIARrIQMCQEEAIARrIgVBf0ogDyABa6wiGiAbIBogG1QbIhqnIgIgBUpxDQAgBUEBSCACIANqIAFLcQ0AIAEgAyACEAcgAmohAgwFCyABIAMgBCAEQR91IgFqIAFzIgEQByABaiECIBogAa0iHn0iHFANBCABIANqIQEDQAJAIBwgHiAcIB5UGyIbQiBUBEAgGyEaDAELIBsiGkIgfSIgQgWIQgF8QgODIh9QRQRAA0AgAiABKQAANwAAIAIgASkAGDcAGCACIAEpABA3ABAgAiABKQAINwAIIBpCIH0hGiABQSBqIQEgAkEgaiECIB9CAX0iH0IAUg0ACwsgIELgAFQNAANAIAIgASkAADcAACACIAEpABg3ABggAiABKQAQNwAQIAIgASkACDcACCACIAEpADg3ADggAiABKQAwNwAwIAIgASkAKDcAKCACIAEpACA3ACAgAiABKQBYNwBYIAIgASkAUDcAUCACIAEpAEg3AEggAiABKQBANwBAIAIgASkAYDcAYCACIAEpAGg3AGggAiABKQBwNwBwIAIgASkAeDcAeCABQYABaiEBIAJBgAFqIQIgGkKAAX0iGkIfVg0ACwsgGkIQWgRAIAIgASkAADcAACACIAEpAAg3AAggGkIQfSEaIAJBEGohAiABQRBqIQELIBpCCFoEQCACIAEpAAA3AAAgGkIIfSEaIAJBCGohAiABQQhqIQELIBpCBFoEQCACIAEoAAA2AAAgGkIEfSEaIAJBBGohAiABQQRqIQELIBpCAloEQCACIAEvAAA7AAAgGkICfSEaIAJBAmohAiABQQJqIQELIBwgG30hHCAaUEUEQCACIAEtAAA6AAAgAkEBaiECIAFBAWohAQsgHFBFDQALDAQLIBAgAWsiCUEBaiIGIAUgBSAGSxshAyABIARrIQIgAUEHcUUNAiADRQ0CIAEgAi0AADoAACACQQFqIQIgAUEBaiIGQQdxQQAgA0EBayIFGw0BIAYhASAFIQMgCSEGDAILAkAgBCAFSQRAIAcoAphHIARLDQELIAEgASAEayIGKQAANwAAIAEgBUEBa0EHcUEBaiIDaiECIAUgA2siBEUNAyADIAZqIQEDQCACIAEpAAA3AAAgAUEIaiEBIAJBCGohAiAEQQhrIgQNAAsMAwsgASAEIAUQPyECDAILIAEgAi0AADoAASAJQQFrIQYgA0ECayEFIAJBAWohAgJAIAFBAmoiCkEHcUUNACAFRQ0AIAEgAi0AADoAAiAJQQJrIQYgA0EDayEFIAJBAWohAgJAIAFBA2oiCkEHcUUNACAFRQ0AIAEgAi0AADoAAyAJQQNrIQYgA0EEayEFIAJBAWohAgJAIAFBBGoiCkEHcUUNACAFRQ0AIAEgAi0AADoABCAJQQRrIQYgA0EFayEFIAJBAWohAgJAIAFBBWoiCkEHcUUNACAFRQ0AIAEgAi0AADoABSAJQQVrIQYgA0EGayEFIAJBAWohAgJAIAFBBmoiCkEHcUUNACAFRQ0AIAEgAi0AADoABiAJQQZrIQYgA0EHayEFIAJBAWohAgJAIAFBB2oiCkEHcUUNACAFRQ0AIAEgAi0AADoAByAJQQdrIQYgA0EIayEDIAFBCGohASACQQFqIQIMBgsgCiEBIAUhAwwFCyAKIQEgBSEDDAQLIAohASAFIQMMAwsgCiEBIAUhAwwCCyAKIQEgBSEDDAELIAohASAFIQMLAkACQCAGQRdNBEAgA0UNASADQQFrIQUgA0EHcSIEBEADQCABIAItAAA6AAAgA0EBayEDIAFBAWohASACQQFqIQIgBEEBayIEDQALCyAFQQdJDQEDQCABIAItAAA6AAAgASACLQABOgABIAEgAi0AAjoAAiABIAItAAM6AAMgASACLQAEOgAEIAEgAi0ABToABSABIAItAAY6AAYgASACLQAHOgAHIAFBCGohASACQQhqIQIgA0EIayIDDQALDAELIAMNAQsgASECDAELIAEgBCADED8hAgsgCyEFDAELIAEgAy0AAjoAACABQQFqIQILIAUgFE8NACACIBNJDQELCyAAIAI2AgwgACAFIAhBA3ZrIgE2AgAgACATIAJrQYMCajYCECAAIBQgAWtBDmo2AgQgByAIQQdxIgA2AogBIAcgHUJ/IACthkJ/hYM+AoQBC+cFAQR/IAMgAiACIANLGyEEIAAgAWshAgJAIABBB3FFDQAgBEUNACAAIAItAAA6AAAgA0EBayEGIAJBAWohAiAAQQFqIgdBB3FBACAEQQFrIgUbRQRAIAchACAFIQQgBiEDDAELIAAgAi0AADoAASADQQJrIQYgBEECayEFIAJBAWohAgJAIABBAmoiB0EHcUUNACAFRQ0AIAAgAi0AADoAAiADQQNrIQYgBEEDayEFIAJBAWohAgJAIABBA2oiB0EHcUUNACAFRQ0AIAAgAi0AADoAAyADQQRrIQYgBEEEayEFIAJBAWohAgJAIABBBGoiB0EHcUUNACAFRQ0AIAAgAi0AADoABCADQQVrIQYgBEEFayEFIAJBAWohAgJAIABBBWoiB0EHcUUNACAFRQ0AIAAgAi0AADoABSADQQZrIQYgBEEGayEFIAJBAWohAgJAIABBBmoiB0EHcUUNACAFRQ0AIAAgAi0AADoABiADQQdrIQYgBEEHayEFIAJBAWohAgJAIABBB2oiB0EHcUUNACAFRQ0AIAAgAi0AADoAByADQQhrIQMgBEEIayEEIABBCGohACACQQFqIQIMBgsgByEAIAUhBCAGIQMMBQsgByEAIAUhBCAGIQMMBAsgByEAIAUhBCAGIQMMAwsgByEAIAUhBCAGIQMMAgsgByEAIAUhBCAGIQMMAQsgByEAIAUhBCAGIQMLAkAgA0EXTQRAIARFDQEgBEEBayEBIARBB3EiAwRAA0AgACACLQAAOgAAIARBAWshBCAAQQFqIQAgAkEBaiECIANBAWsi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CyAAIAMtAAAEfiADKQMQBUIAC6dB//8DcSADKAIEEEcLIQUgAxAICyAEQRBqJAAgBQvgAQICfwF+QTAQCSICRQRAIAEEQCABQQA2AgQgAUEONgIAC0EADwsgAkIANwMIIAJBADYCACACQgA3AxAgAkIANwMYIAJCADcDICACQgA3ACUgAFAEQCACDwsCQCAAQv////8AVg0AIACnQQR0EAkiA0UNACACIAM2AgBBACEBQgEhBANAIAMgAUEEdGoiAUIANwIAIAFCADcABSAAIARSBEAgBKchASAEQgF8IQQMAQsLIAIgADcDCCACIAA3AxAgAg8LIAEEQCABQQA2AgQgAUEONgIAC0EAEBAgAhAGQQAL7gECA38BfiMAQRBrIgQkAAJAIARBDGpCBBAXIgNFBEBBfyECDAELAkAgAQRAIAJBgAZxIQUDQAJAIAUgASgCBHFFDQACQCADKQMIQgBUBEAgA0EAOgAADAELIANCADcDECADQQE6AAALIAMgAS8BCBANIAMgAS8BChANIAMtAABFBEAgAEEIaiIABEAgAEEANgIEIABBFDYCAAtBfyECDAQLQX8hAiAAIARBDGpCBBAbQQBIDQMgATMBCiIGUA0AIAAgASgCDCAGEBtBAEgNAwsgASgCACIBDQALC0EAIQILIAMQCAsgBEEQaiQAIAILPAEBfyAABEAgAUGABnEhAQNAIAEgACgCBHEEQCACIAAvAQpqQQRqIQILIAAoAgAiAA0ACwsgAkH//wNxC5wBAQN/IABFBEBBAA8LIAAhAwNAAn8CQAJAIAAvAQgiAUH04AFNBEAgAUEBRg0BIAFB9cYBRg0BDAILIAFBgbICRg0AIAFB9eABRw0BCyAAKAIAIQEgAEEANgIAIAAoAgwQBiAAEAYgASADIAAgA0YbIQMCQCACRQRAQQAhAgwBCyACIAE2AgALIAEMAQsgACICKAIACyIADQALIAMLsgQCBX8BfgJAAkACQCAAIAGtEBciAQRAIAEtAAANAUEAIQAMAgsgBARAIARBADYCBCAEQQ42AgALQQAPC0EAIQADQCABLQAABH4gASkDCCABKQMQfQVCAAtCBFQNASABEAwhByABIAEQDCIGrRATIghFBEBBACECIAQEQCAEQQA2AgQgBEEVNgIACyABEAggAEUNAwNAIAAoAgAhASAAKAIMEAYg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DCAAQRg2AggLDAMLIAAgBiAFLwFqQQAgBCABEQYAIQEgBhALIAFFDQILAkAgDUUEQCABIQMMAQsgACABIAUvAWgQgQEhAyABEAsgA0UNAQsCQCAJRSAMckUEQCADIQEMAQsgACADQQEQgAEhASADEAsgAUUNAQsgASEDDAELQQAhAwsgBUHwAGokACADC4UBAQF/IAFFBEAgAEEIaiIABEAgAEEANgIEIABBEjYCAAtBAA8LQTgQCSIDRQRAIABBCGoiAARAIABBADYCBCAAQQ42AgALQQAPCyADQQA2AhAgA0IANwIIIANCADcDKCADQQA2AgQgAyACNgIAIANCADcDGCADQQA2AjAgACABQTsgAxBCCw8AIAAgASACQQBBABCCAQusAgECfyABRQRAIABBCGoiAARAIABBADYCBCAAQRI2AgALQQAPCwJAIAJBfUsNACACQf//A3FBCEYNACAAQQhqIgAEQCAAQQA2AgQgAEEQNgIAC0EADwsCQEGwwAAQCSIFBEAgBUEANgIIIAVCADcCACAFQYiBAUGogQEgAxs2AqhAIAUgAjYCFCAFIAM6ABAgBUEAOgAPIAVBADsBDCAFIAMgAkF9SyIGcToADiAFQQggAiAGG0H//wNxIAQgBUGIgQFBqIEBIAMbKAIAEQAAIgI2AqxAIAINASAFEDEgBRAGCyAAQQhqIgAEQCAAQQA2AgQgAEEONgIAC0EADwsgACABQTogBRBCIgAEfyAABSAFKAKsQCAFKAKoQCgCBBEDACAFEDEgBRAGQQALC6ABAQF/IAIgACgCBCIDIAIgA0kbIgIEQCAAIAMgAms2AgQCQAJAAkACQCAAKAIcIgMoAhRBAWsOAgEAAgsgA0GgAWogASAAKAIAIAJB3IABKAIAEQgADAILIAAgACgCMCABIAAoAgAgAkHEgAEoAgARBAA2AjAMAQsgASAAKAIAIAIQBxoLIAAgACgCACACajYCACAAIAAoAgggAmo2AggLC7cCAQR/QX4hAgJAIABFDQAgACgCIEUNACAAKAIkIgRFDQAgACgCHCIBRQ0AIAEoAgAgAEcNAAJAAkAgASgCICIDQTlrDjkBAgICAgICAgICAgIBAgICAQICAgICAgICAgICAgICAgICAQICAgICAgICAgICAQICAgICAgICAgEACyADQZoFRg0AIANBKkcN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DCABajYCDCAGIAYoAgggAWo2AgggBSAFKAIUIAFqNgIUIAUgBSgCECABazYCECAGIAYoAhAgAWsiATYCECABDQAgBiAGKAIENgIIC0EAIQRBACEJIAMoAhBFDQAMCgsgAygCHCgCJCEGIAMgAygCGCIBQQFqNgIYIAEgBmotAAAhASADIARBAWo2AhAgAygCBCAEaiABOgAAIAEEQCADKAIQIQQMAQsLIAMoAhwoAixFDQAgAygCECIGIAlNDQAgBQJ/IAUoAjAhBEEAIAMoAgQgCWoiAUUNABogBCABIAYgCWtB1IABKAIAEQAACzYCMAsgA0HnADYCIAsCQCADKAIcKAIsBEAgAygCDCADKAIQIgFBAmpJBH8gBRAKIAMoAhANAkEABSABCyADKAIEaiAFKAIwOwAAIAMgAygCEEECajYCECADQaABakHkgAEoAgARAQAaCyADQfEANgIgIAUQCiADKAIQRQ0BDAcLDAYLIAUoAgQNAQsgAygCPA0AIApFDQEgAygCIEGaBUYNAQsCfyADKAKIASIBRQRAIAMgChCFAQwBCwJAAkACQCADKAKMAUECaw4CAAECCwJ/AkADQAJAAkAgAygCPA0AIAMQLyADKAI8DQAgCg0BQQAMBAsgAygCSCADKAJoai0AACEEIAMgAygC8C0iAUEBajYC8C0gASADKALsLWpBADoAACADIAMoAvAtIgFBAWo2AvAtIAEgAygC7C1qQQA6AAAgAyADKALwLSIBQQFqNgLwLSABIAMoAuwtaiAEOgAAIAMgBEECdGoiASABLwHkAUEBajsB5AEgAyADKAI8QQFrNgI8IAMgAygCaEEBaiIBNgJoIAMoAvAtIAMoAvQtRw0BQQAhBCADIAMoAlgiBkEATgR/IAMoAkggBmoFQQALIAEgBmtBABAPIAMgAygCaDYCWCADKAIAEAogAygCACgCEA0BDAILCyADQQA2AoQuIApBBEYEQCADIAMoAlgiAUEATgR/IAMoAkggAWoFQQALIAMoAmggAWtBARAPIAMgAygCaDYCWCADKAIAEApBA0ECIAMoAgAoAhAbDAILIAMoAvAtBEBBACEEIAMgAygCWCIBQQBOBH8gAygCSCABagVBAAsgAygCaCABa0EAEA8gAyADKAJoNgJYIAMoAgAQCiADKAIAKAIQRQ0BC0EBIQQLIAQLDAILAn8CQANAAkACQAJAAkACQCADKAI8Ig1BggJLDQAgAxAvAkAgAygCPCINQYICSw0AIAoNAEEADAgLIA1FDQQgDUECSw0AIAMoAmghCAwBCyADKAJoIghFBEBBACEIDAELIAMoAkggCGoiAUEBayIELQAAIgYgAS0AAEcNACAGIAQtAAJHDQAgBEEDaiEEQQAhCQJAA0AgBiAELQAARw0BIAQtAAEgBkcEQCAJQQFyIQkMAgsgBC0AAiAGRwRAIAlBAnIhCQwCCyAELQADIAZHBEAgCUEDciEJDAILIAQtAAQgBkcEQCAJQQRyIQkMAgsgBC0ABSAGRwRAIAlBBXIhCQwCCyAELQAGIAZHBEAgCUEGciEJDAILIAQtAAcgBkcEQCAJQQdyIQkMAgsgBEEIaiEEIAlB+AFJIQEgCUEIaiEJIAENAAtBgAIhCQtBggIhBCANIAlBAmoiASABIA1LGyIBQYECSw0BIAEiBEECSw0BCyADKAJIIAhqLQAAIQQgAyADKALwLSIBQQFqNgLwLSABIAMoAuwtakEAOgAAIAMgAygC8C0iAUEBajYC8C0gASADKALsLWpBADoAACADIAMoAvAtIgFBAWo2AvAtIAEgAygC7C1qIAQ6AAAgAyAEQQJ0aiIBIAEvAeQBQQFqOwHkASADIAMoAjxBAWs2AjwgAyADKAJoQQFqIgQ2AmgMAQsgAyADKALwLSIBQQFqNgLwLSABIAMoAuwtakEBOgAAIAMgAygC8C0iAUEBajYC8C0gASADKALsLWpBADoAACADIAMoAvAtIgFBAWo2AvAtIAEgAygC7C1qIARBA2s6AAAgAyADKAKALkEBajYCgC4gBEH9zgBqLQAAQQJ0IANqQegJaiIBIAEvAQBBAWo7AQAgA0GAywAtAABBAnRqQdgTaiIBIAEvAQBBAWo7AQAgAyADKAI8IARrNgI8IAMgAygCaCAEaiIENgJoCyADKALwLSADKAL0LUcNAUEAIQggAyADKAJYIgFBAE4EfyADKAJIIAFqBUEACyAEIAFrQQAQDyADIAMoAmg2AlggAygCABAKIAMoAgAoAhANAQwCCwsgA0EANgKELiAKQQRGBEAgAyADKAJYIgFBAE4EfyADKAJIIAFqBUEACyADKAJoIAFrQQEQDyADIAMoAmg2AlggAygCABAKQQNBAiADKAIAKAIQGwwCCyADKALwLQRAQQAhCCADIAMoAlgiAUEATgR/IAMoAkggAWoFQQALIAMoAmggAWtBABAPIAMgAygCaDYCWCADKAIAEAogAygCACgCEEUNAQtBASEICyAICwwBCyADIAogAUEMbEG42ABqKAIAEQIACyIBQX5xQQJGBEAgA0GaBTYCIAsgAUF9cUUEQEEAIQQgBSgCEA0CDAQLIAFBAUcNAAJAAkACQCAKQQFrDgUAAQEBAgELIAMpA5guISICfwJ+IAMoAqAuIgFBA2oiCUE/TQRAQgIgAa2GICKEDAELIAFBwABGBEAgAygCBCADKAIQaiAiNwAAIAMgAygCEEEIajYCEEICISJBCgwCCyADKAIEIAMoAhBqQgIgAa2GICKENwAAIAMgAygCEEEIajYCECABQT1rIQlCAkHAACABa62ICyEiIAlBB2ogCUE5SQ0AGiADKAIEIAMoAhBqICI3AAAgAyADKAIQQQhqNgIQQgAhIiAJQTlrCyEBIAMgIjcDmC4gAyABNgKgLiADEDAMAQsgA0EAQQBBABA5IApBA0cNACADKAJQQQBBgIAIEBkgAygCPA0AIANBADYChC4gA0EANgJYIANBADYCaAsgBRAKIAUoAhANAAwDC0EAIQQgCkEERw0AAkACfwJAAkAgAygCFEEBaw4CAQADCyAFIANBoAFqQeCAASgCABEBACIBNgIwIAMoAgQgAygCEGogATYAACADIAMoAhBBBGoiATYCECADKAIEIAFqIQQgBSgCCAwBCyADKAIEIAMoAhBqIQQgBSgCMCIBQRh0IAFBCHRBgID8B3FyIAFBCHZBgP4DcSABQRh2cnILIQEgBCABNgAAIAMgAygCEEEEajYCEAsgBRAKIAMoAhQiAUEBTgRAIANBACABazYCFAsgAygCEEUhBAsgBAwCCyAFQezAACgCADYCGEF7DAELIANBfzYCJEEACwwBCyMAQRBrIhQkAEF+IRcCQCABIgxFDQAgDCgCIEUNACAMKAIkRQ0AIAwoAhwiB0UNACAHKAIAIAxHDQAgBygCBCIIQbT+AGtBH0sNACAMKAIMIhBFDQAgDCgCACIBRQRAIAwoAgQNAQsgCEG//gBGBEAgB0HA/gA2AgRBwP4AIQgLIAdBpAFqIR8gB0G8BmohGSAHQbwBaiEcIAdBoAFqIR0gB0G4AWohGiAHQfwKaiEYIAdBQGshHiAHKAKIASEFIAwoAgQiICEGIAcoAoQBIQogDCgCECIPIRYCfwJAAkACQANAAkBBfSEEQQEhCQJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAhBtP4Aaw4fBwYICQolJicoBSwtLQsZGgQMAjIzATUANw0OAzlISUwLIAcoApQBIQMgASEEIAYhCAw1CyAHKAKUASEDIAEhBCAGIQgMMgsgBygCtAEhCAwuCyAHKAIMIQgMQQsgBUEOTw0pIAZFDUEgBUEIaiEIIAFBAWohBCAGQQFrIQkgAS0AACAFdCAKaiEKIAVBBkkNDCAEIQEgCSEGIAghBQwpCyAFQSBPDSUgBkUNQCABQQFqIQQgBkEBayEIIAEtAAAgBXQgCmohCiAFQRhJDQ0gBCEBIAghBgwlCyAFQRBPDRUgBkUNPyAFQQhqIQggAUEBaiEEIAZBAWshCSABLQAAIAV0IApqIQogBUEISQ0NIAQhASAJIQYgCCEFDBULIAcoAgwiC0UNByAFQRBPDSIgBkUNPiAFQQhqIQggAUEBaiEEIAZBAWshCSABLQAAIAV0IApqIQogBUEISQ0NIAQhASAJIQYgCCEFDCILIAVBH0sNFQwUCyAFQQ9LDRYMFQsgBygCFCIEQYAIcUUEQCAFIQgMFwsgCiEIIAVBD0sNGAwXCyAKIAVBB3F2IQogBUF4cSIFQR9LDQwgBkUNOiAFQQhqIQggAUEBaiEEIAZBAWshCSABLQAAIAV0IApqIQogBUEYSQ0GIAQhASAJIQYgCCEFDAwLIAcoArQBIgggBygCqAEiC08NIwwiCyAPRQ0qIBAgBygCjAE6AAAgB0HI/gA2AgQgD0EBayEPIBBBAWohECAHKAIEIQgMOQsgBygCDCIDRQRAQQAhCAwJCyAFQR9LDQcgBkUNNyAFQQhqIQggAUEBaiEEIAZBAWshCSABLQAAIAV0IApqIQogBUEYSQ0BIAQhASAJIQYgCCEFDAcLIAdBwP4ANgIEDCoLIAlFBEAgBCEBQQAhBiAIIQUgDSEEDDgLIAVBEGohCSABQQJqIQQgBkECayELIAEtAAEgCHQgCmohCiAFQQ9LBEAgBCEBIAshBiAJIQUMBgsgC0UEQCAEIQFBACEGIAkhBSANIQQMOAsgBUEYaiEIIAFBA2ohBCAGQQNrIQsgAS0AAiAJdCAKaiEKIAVBB0sEQCAEIQEgCyEGIAghBQwGCyALRQRAIAQhAUEAIQYgCCEFIA0hBAw4CyAFQSBqIQUgBkEEayEGIAEtAAMgCHQgCmohCiABQQRqIQEMBQsgCUUEQCAEIQFBACEGIAghBSANIQQMNwsgBUEQaiEFIAZBAmshBiABLQABIAh0IApqIQogAUECaiEBDBwLIAlFBEAgBCEBQQAhBiAIIQUgDSEEDDYLIAVBEGohCSABQQJqIQQgBkECayELIAEtAAEgCHQgCmohCiAFQQ9LBEAgBCEBIAshBiAJIQUMBgsgC0UEQCAEIQFBACEGIAkhBSANIQQMNgsgBUEYaiEIIAFBA2ohBCAGQQNrIQsgAS0AAiAJdCAKaiEKIAUEQCAEIQEgCyEGIAghBQwGCyALRQRAIAQhAUEAIQYgCCEFIA0hBAw2CyAFQSBqIQUgBkEEayEGIAEtAAMgCHQgCmohCiABQQRqIQEMBQsgBUEIaiEJIAhFBEAgBCEBQQAhBiAJIQUgDSEEDDULIAFBAmohBCAGQQJrIQggAS0AASAJdCAKaiEKIAVBD0sEQCAEIQEgCCEGDBgLIAVBEGohCSAIRQRAIAQhAUEAIQYgCSEFIA0hBAw1CyABQQNqIQQgBkEDayEIIAEtAAIgCXQgCmohCiAFQQdLBEAgBCEBIAghBgwYCyAFQRhqIQUgCEUEQCAEIQFBACEGIA0hBAw1CyAGQQRrIQYgAS0AAyAFdCAKaiEKIAFBBGohAQwXCyAJDQYgBCEBQQAhBiAIIQUgDSEEDDMLIAlFBEAgBCEBQQAhBiAIIQUgDSEEDDMLIAVBEGohBSAGQQJrIQYgAS0AASAIdCAKaiEKIAFBAmohAQwUCyAMIBYgD2siCSAMKAIUajYCFCAHIAcoAiAgCWo2AiACQCADQQRxRQ0AIAkEQAJAIBAgCWshBCAMKAIcIggoAhQEQCAIQUBrIAQgCUEAQdiAASgCABEIAAwBCyAIIAgoAhwgBCAJQcCAASgCABEAACIENgIcIAwgBDYCMAsLIAcoAhRFDQAgByAeQeCAASgCABEBACIENgIcIAwgBDYCMAsCQCAHKAIMIghBBHFFDQAgBygCHCAKIApBCHRBgID8B3EgCkEYdHIgCkEIdkGA/gNxIApBGHZyciAHKAIUG0YNACAHQdH+ADYCBCAMQaQMNgIYIA8hFiAHKAIEIQgMMQtBACEKQQAhBSAPIRYLIAdBz/4ANgIEDC0LIApB//8DcSIEIApBf3NBEHZHBEAgB0HR/gA2AgQgDEGOCjYCGCAHKAIEIQgMLwsgB0HC/gA2AgQgByAENgKMAUEAIQpBACEFCyAHQcP+ADYCBAsgBygCjAEiBARAIA8gBiAEIAQgBksbIgQgBCAPSxsiCEUNHiAQIAEgCBAHIQQgByAHKAKMASAIazYCjAEgBCAIaiEQIA8gCGshDyABIAhqIQEgBiAIayEGIAcoAgQhCAwtCyAHQb/+ADYCBCAHKAIEIQgMLAsgBUEQaiEFIAZBAmshBiABLQABIAh0IApqIQogAUECaiEBCyAHIAo2AhQgCkH/AXFBCEcEQCAHQdH+ADYCBCAMQYIPNgIYIAcoAgQhCAwrCyAKQYDAA3EEQCAHQdH+ADYCBCAMQY0JNgIYIAcoAgQhCAwrCyAHKAIkIgQEQCAEIApBCHZBAXE2AgALAkAgCkGABHFFDQAgBy0ADEEEcUUNACAUIAo7AAwgBwJ/IAcoAhwhBUEAIBRBDGoiBEUNABogBSAEQQJB1IABKAIAEQAACzYCHAsgB0G2/gA2AgRBACEFQQAhCgsgBkUNKCABQQFqIQQgBkEBayEIIAEtAAAgBXQgCmohCiAFQRhPBEAgBCEBIAghBgwBCyAFQQhqIQkgCEUEQCAEIQFBACEGIAkhBSANIQQMKwsgAUECaiEEIAZBAmshCCABLQABIAl0IApqIQogBUEPSwRAIAQhASAIIQYMAQsgBUEQaiEJIAhFBEAgBCEBQQAhBiAJIQUgDSEEDCsLIAFBA2ohBCAGQQNrIQggAS0AAiAJdCAKaiEKIAVBB0sEQCAEIQEgCCEGDAELIAVBGGohBSAIRQRAIAQhAUEAIQYgDSEEDCsLIAZBBGshBiABLQADIAV0IApqIQogAUEEaiEBCyAHKAIkIgQEQCAEIAo2AgQLAkAgBy0AFUECcUUNACAHLQAMQQRxRQ0AIBQgCjYADCAHAn8gBygCHCEFQQAgFEEMaiIERQ0AGiAFIARBBEHUgAEoAgARAAALNgIcCyAHQbf+ADYCBEEAIQVBACEKCyAGRQ0mIAFBAWohBCAGQQFrIQggAS0AACAFdCAKaiEKIAVBCE8EQCAEIQEgCCEGDAELIAVBCGohBSAIRQRAIAQhAUEAIQYgDSEEDCkLIAZBAmshBiABLQABIAV0IApqIQogAUECaiEBCyAHKAIkIgQEQCAEIApBCHY2AgwgBCAKQf8BcTYCCAsCQCAHLQAVQQJxRQ0AIActAAxBBHFFDQAgFCAKOwAMIAcCfyAHKAIcIQVBACAUQQxqIgRFDQAaIAUgBEECQdSAASgCABEAAAs2AhwLIAdBuP4ANgIEQQAhCEEAIQVBACEKIAcoAhQiBEGACHENAQsgBygCJCIEBEAgBEEANgIQCyAIIQUMAgsgBkUEQEEAIQYgCCEKIA0hBAwmCyABQQFqIQkgBkEBayELIAEtAAAgBXQgCGohCiAFQQhPBEAgCSEBIAshBgwBCyAFQQhqIQUgC0UEQCAJIQFBACEGIA0hBAwmCyAGQQJrIQYgAS0AASAFdCAKaiEKIAFBAmohAQsgByAKQf//A3EiCDYCjAEgBygCJCIFBEAgBSAINgIUC0EAIQUCQCAEQYAEcUUNACAHLQAMQQRxRQ0AIBQgCjsADCAHAn8gBygCHCEIQQAgFEEMaiIERQ0AGiAIIARBAkHUgAEoAgARAAALNgIcC0EAIQoLIAdBuf4ANgIECyAHKAIUIglBgAhxBEAgBiAHKAKMASIIIAYgCEkbIg4EQAJAIAcoAiQiA0UNACADKAIQIgRFDQAgAygCGCILIAMoAhQgCGsiCE0NACAEIAhqIAEgCyAIayAOIAggDmogC0sbEAcaIAcoAhQhCQsCQCAJQYAEcUUNACAHLQAMQQRxRQ0AIAcCfyAHKAIcIQRBACABRQ0AGiAEIAEgDkHUgAEoAgARAAALNgIcCyAHIAcoAowBIA5rIgg2AowBIAYgDmshBiABIA5qIQELIAgNEwsgB0G6/gA2AgQgB0EANgKMAQsCQCAHLQAVQQhxBEBBACEIIAZFDQQDQCABIAhqLQAAIQMCQCAHKAIkIgtFDQAgCygCHCIERQ0AIAcoAowBIgkgCygCIE8NACAHIAlBAWo2AowBIAQgCWogAzoAAAsgA0EAIAYgCEEBaiIISxsNAAsCQCAHLQAVQQJxRQ0AIActAAxBBHFFDQAgBwJ/IAcoAhwhBEEAIAFFDQAaIAQgASAIQdSAASgCABEAAAs2AhwLIAEgCGohASAGIAhrIQYgA0UNAQwTCyAHKAIkIgRFDQAgBEEANgIcCyAHQbv+ADYCBCAHQQA2AowBCwJAIActABVBEHEEQEEAIQggBkUNAwNAIAEgCGotAAAhAwJAIAcoAiQiC0UNACALKAIkIgRFDQAgBygCjAEiCSALKAIoTw0AIAcgCUEBajYCjAEgBCAJaiADOgAACyADQQAgBiAIQQFqIghLGw0ACwJAIActABVBAnFFDQAgBy0ADEEEcUUNACAHAn8gBygCHCEEQQAgAUUNABogBCABIAhB1IABKAIAEQAACzYCHAsgASAIaiEBIAYgCGshBiADRQ0BDBILIAcoAiQiBEUNACAEQQA2AiQLIAdBvP4ANgIECyAHKAIUIgtBgARxBEACQCAFQQ9LDQAgBkUNHyAFQQhqIQggAUEBaiEEIAZBAWshCSABLQAAIAV0IApqIQogBUEITwRAIAQhASAJIQYgCCEFDAELIAlFBEAgBCEBQQAhBiAIIQUgDSEEDCILIAVBEGohBSAGQQJrIQYgAS0AASAIdCAKaiEKIAFBAmohAQsCQCAHLQAMQQRxRQ0AIAogBy8BHEYNACAHQdH+ADYCBCAMQdcMNgIYIAcoAgQhCAwgC0EAIQpBACEFCyAHKAIkIgQEQCAEQQE2AjAgBCALQQl2QQFxNgIsCwJAIActAAxBBHFFDQAgC0UNACAHIB5B5IABKAIAEQEAIgQ2AhwgDCAENgIwCyAHQb/+ADYCBCAHKAIEIQgMHgtBACEGDA4LAkAgC0ECcUUNACAKQZ+WAkcNACAHKAIoRQRAIAdBDzYCKAtBACEKIAdBADYCHCAUQZ+WAjsADCAHIBRBDGoiBAR/QQAgBEECQdSAASgCABEAAAVBAAs2AhwgB0G1/gA2AgRBACEFIAcoAgQhCAwdCyAHKAIkIgQEQCAEQX82AjALAkAgC0EBcQRAIApBCHRBgP4DcSAKQQh2akEfcEUNAQsgB0HR/gA2AgQgDEH2CzYCGCAHKAIEIQgMHQsgCkEPcUEIRwRAIAdB0f4ANgIEIAxBgg82AhggBygCBCEIDB0LIApBBHYiBEEPcSIJQQhqIQsgCUEHTUEAIAcoAigiCAR/IAgFIAcgCzYCKCALCyALTxtFBEAgBUEEayEFIAdB0f4ANgIEIAxB+gw2AhggBCEKIAcoAgQhCAwdCyAHQQE2AhxBACEFIAdBADYCFCAHQYACIAl0NgIYIAxBATYCMCAHQb3+AEG//gAgCkGAwABxGzYCBEEAIQogBygCBCEIDBwLIAcgCkEIdEGAgPwHcSAKQRh0ciAKQQh2QYD+A3EgCkEYdnJyIgQ2AhwgDCAENgIwIAdBvv4ANgIEQQAhCkEAIQULIAcoAhBFBEAgDCAPNgIQIAwgEDYCDCAMIAY2AgQgDCABNgIAIAcgBTYCiAEgByAKNgKEAUECIRcMIAsgB0EBNgIcIAxBATYCMCAHQb/+ADYCBAsCfwJAIAcoAghFBEAgBUEDSQ0BIAUMAgsgB0HO/gA2AgQgCiAFQQdxdiEKIAVBeHEhBSAHKAIEIQgMGwsgBkUNGSAGQQFrIQYgAS0AACAFdCAKaiEKIAFBAWohASAFQQhqCyEEIAcgCkEBcTYCCAJAAkACQAJAAkAgCkEBdkEDcUEBaw4DAQIDAAsgB0HB/gA2AgQMAwsgB0Gw2wA2ApgBIAdCiYCAgNAANwOgASAHQbDrADYCnAEgB0HH/gA2AgQMAgsgB0HE/gA2AgQMAQsgB0HR/gA2AgQgDEHXDTYCGAsgBEEDayEFIApBA3YhCiAHKAIEIQgMGQsgByAKQR9xIghBgQJqNgKsASAHIApBBXZBH3EiBEEBajYCsAEgByAKQQp2QQ9xQQRqIgs2AqgBIAVBDmshBSAKQQ52IQogCEEdTUEAIARBHkkbRQRAIAdB0f4ANgIEIAxB6gk2AhggBygCBCEIDBkLIAdBxf4ANgIEQQAhCCAHQQA2ArQBCyAIIQQDQCAFQQJNBEAgBkUNGCAGQQFrIQYgAS0AACAFdCAKaiEKIAVBCGohBSABQQFqIQELIAcgBEEBaiIINgK0ASAHIARBAXRBsOwAai8BAEEBdGogCkEHcTsBvAEgBUEDayEFIApBA3YhCiALIAgiBEsNAAsLIAhBEk0EQEESIAhrIQ1BAyAIa0EDcSIEBEADQCAHIAhBAXRBsOwAai8BAEEBdGpBADsBvAEgCEEBaiEIIARBAWsiBA0ACwsgDUEDTwRAA0AgB0G8AWoiDSAIQQF0IgRBsOwAai8BAEEBdGpBADsBACANIARBsuwAai8BAEEBdGpBADsBACANIARBtOwAai8BAEEBdGpBADsBACANIARBtuwAai8BAEEBdGpBADsBACAIQQRqIghBE0cNAAsLIAdBEzYCtAELIAdBBzYCoAEgByAYNgKYASAHIBg2ArgBQQAhCEEAIBxBEyAaIB0gGRBOIg0EQCAHQdH+ADYCBCAMQfQINgIYIAcoAgQhCAwXCyAHQcb+ADYCBCAHQQA2ArQBQQAhDQsgBygCrAEiFSAHKAKwAWoiESAISwRAQX8gBygCoAF0QX9zIRIgBygCmAEhGwNAIAYhCSABIQsCQCAFIgMgGyAKIBJxIhNBAnRqLQABIg5PBEAgBSEEDAELA0AgCUUNDSALLQAAIAN0IQ4gC0EBaiELIAlBAWshCSADQQhqIgQhAyAEIBsgCiAOaiIKIBJxIhNBAnRqLQABIg5JDQALIAshASAJIQYLAkAgGyATQQJ0ai8BAiIFQQ9NBEAgByAIQQFqIgk2ArQBIAcgCEEBdGogBTsBvAEgBCAOayEFIAogDnYhCiAJIQgMAQsCfwJ/AkACQAJAIAVBEGsOAgABAgsgDkECaiIFIARLBEADQCAGRQ0bIAZBAWshBiABLQAAIAR0IApqIQogAUEBaiEBIARBCGoiBCAFSQ0ACwsgBCAOayEFIAogDnYhBCAIRQRAIAdB0f4ANgIEIAxBvAk2AhggBCEKIAcoAgQhCAwdCyAFQQJrIQUgBEECdiEKIARBA3FBA2ohCSAIQQF0IAdqLwG6AQwDCyAOQQNqIgUgBEsEQANAIAZFDRogBkEBayEGIAEtAAAgBHQgCmohCiABQQFqIQEgBEEIaiIEIAVJDQALCyAEIA5rQQNrIQUgCiAOdiIEQQN2IQogBEEHcUEDagwBCyAOQQdqIgUgBEsEQANAIAZFDRkgBkEBayEGIAEtAAAgBHQgCmohCiABQQFqIQEgBEEIaiIEIAVJDQALCyAEIA5rQQdrIQUgCiAOdiIEQQd2IQogBEH/AHFBC2oLIQlBAAshAyAIIAlqIBFLDRMgCUEBayEEIAlBA3EiCwRAA0AgByAIQQF0aiADOwG8ASAIQQFqIQggCUEBayEJIAtBAWsiCw0ACwsgBEEDTwRAA0AgByAIQQF0aiIEIAM7Ab4BIAQgAzsBvAEgBCADOwHAASAEIAM7AcIBIAhBBGohCCAJQQRrIgkNAAsLIAcgCDYCtAELIAggEUkNAAsLIAcvAbwFRQRAIAdB0f4ANgIEIAxB0Qs2AhggBygCBCEIDBYLIAdBCjYCoAEgByAYNgKYASAHIBg2ArgBQQEgHCAVIBogHSAZEE4iDQRAIAdB0f4ANgIEIAxB2Ag2AhggBygCBCEIDBYLIAdBCTYCpAEgByAHKAK4ATYCnAFBAiAHIAcoAqwBQQF0akG8AWogBygCsAEgGiAfIBkQTiINBEAgB0HR/gA2AgQgDEGmCTYCGCAHKAIEIQgMFgsgB0HH/gA2AgRBACENCyAHQcj+ADYCBAsCQCAGQQ9JDQAgD0GEAkkNACAMIA82AhAgDCAQNgIMIAwgBjYCBCAMIAE2AgAgByAFNgKIASAHIAo2AoQBIAwgFkHogAEoAgARBwAgBygCiAEhBSAHKAKEASEKIAwoAgQhBiAMKAIAIQEgDCgCECEPIAwoAgwhECAHKAIEQb/+AEcNByAHQX82ApBHIAcoAgQhCAwUCyAHQQA2ApBHIAUhCSAGIQggASEEAkAgBygCmAEiEiAKQX8gBygCoAF0QX9zIhVxIg5BAnRqLQABIgsgBU0EQCAFIQMMAQsDQCAIRQ0PIAQtAAAgCXQhCyAEQQFqIQQgCEEBayEIIAlBCGoiAyEJIAMgEiAKIAtqIgogFXEiDkECdGotAAEiC0kNAAsLIBIgDkECdGoiAS8BAiETAkBBACABLQAAIhEgEUHwAXEbRQRAIAshBgwBCyAIIQYgBCEBAkAgAyIFIAsgEiAKQX8gCyARanRBf3MiFXEgC3YgE2oiEUECdGotAAEiDmpPBEAgAyEJDAELA0AgBkUNDyABLQAAIAV0IQ4gAUEBaiEBIAZBAWshBiAFQQhqIgkhBSALIBIgCiAOaiIKIBVxIAt2IBNqIhFBAnRqLQABIg5qIAlLDQALIAEhBCAGIQgLIBIgEUECdGoiAS0AACERIAEvAQIhEyAHIAs2ApBHIAsgDmohBiAJIAtrIQMgCiALdiEKIA4hCwsgByAGNgKQRyAHIBNB//8DcTYCjAEgAyALayEFIAogC3YhCiARRQRAIAdBzf4ANgIEDBALIBFBIHEEQCAHQb/+ADYCBCAHQX82ApBHDBALIBFBwABxBEAgB0HR/gA2AgQgDEHQDjYCGAwQCyAHQcn+ADYCBCAHIBFBD3EiAzYClAELAkAgA0UEQCAHKAKMASELIAQhASAIIQYMAQsgBSEJIAghBiAEIQsCQCADIAVNBEAgBCEBDAELA0AgBkUNDSAGQQFrIQYgCy0AACAJdCAKaiEKIAtBAWoiASELIAlBCGoiCSADSQ0ACwsgByAHKAKQRyADajYCkEcgByAHKAKMASAKQX8gA3RBf3NxaiILNgKMASAJIANrIQUgCiADdiEKCyAHQcr+ADYCBCAHIAs2ApRHCyAFIQkgBiEIIAEhBAJAIAcoApwBIhIgCkF/IAcoAqQBdEF/cyIVcSIOQQJ0ai0AASIDIAVNBEAgBSELDAELA0AgCEUNCiAELQAAIAl0IQMgBEEBaiEEIAhBAWshCCAJQQhqIgshCSALIBIgAyAKaiIKIBVxIg5BAnRqLQABIgNJDQALCyASIA5BAnRqIgEvAQIhEwJAIAEtAAAiEUHwAXEEQCAHKAKQRyEGIAMhCQwBCyAIIQYgBCEBAkAgCyIFIAMgEiAKQX8gAyARanRBf3MiFXEgA3YgE2oiEUECdGotAAEiCWpPBEAgCyEODAELA0AgBkUNCiABLQAAIAV0IQkgAUEBaiEBIAZBAWshBiAFQQhqIg4hBSADIBIgCSAKaiIKIBVxIAN2IBNqIhFBAnRqLQABIglqIA5LDQALIAEhBCAGIQgLIBIgEUECdGoiAS0AACERIAEvAQIhEyAHIAcoApBHIANqIgY2ApBHIA4gA2shCyAKIAN2IQoLIAcgBiAJajYCkEcgCyAJayEFIAogCXYhCiARQcAAcQRAIAdB0f4ANgIEIAxB7A42AhggBCEBIAghBiAHKAIEIQgMEgsgB0HL/gA2AgQgByARQQ9xIgM2ApQBIAcgE0H//wNxNgKQAQsCQCADRQRAIAQhASAIIQYMAQsgBSEJIAghBiAEIQsCQCADIAVNBEAgBCEBDAELA0AgBkUNCCAGQQFrIQYgCy0AACAJdCAKaiEKIAtBAWoiASELIAlBCGoiCSADSQ0ACwsgByAHKAKQRyADajYCkEcgByAHKAKQASAKQX8gA3RBf3NxajYCkAEgCSADayEFIAogA3YhCgsgB0HM/gA2AgQLIA9FDQACfyAHKAKQASIIIBYgD2siBEsEQAJAIAggBGsiCCAHKAIwTQ0AIAcoAoxHRQ0AIAdB0f4ANgIEIAxBuQw2AhggBygCBCEIDBILAn8CQAJ/IAcoAjQiBCAISQRAIAcoAjggBygCLCAIIARrIghragwBCyAHKAI4IAQgCGtqCyILIBAgDyAQaiAQa0EBaqwiISAPIAcoAowBIgQgCCAEIAhJGyIEIAQgD0sbIgitIiIgISAiVBsiIqciCWoiBEkgCyAQT3ENACALIBBNIAkgC2ogEEtxDQAgECALIAkQBxogBAwBCyAQIAsgCyAQayIEIARBH3UiBGogBHMiCRAHIAlqIQQgIiAJrSIkfSIjUEUEQCAJIAtqIQkDQAJAICMgJCAjICRUGyIiQiBUBEAgIiEhDAELICIiIUIgfSImQgWIQgF8QgODIiVQRQRAA0AgBCAJKQAANwAAIAQgCSkAGDcAGCAEIAkpABA3ABAgBCAJKQAINwAIICFCIH0hISAJQSBqIQkgBEEgaiEEICVCAX0iJUIAUg0ACwsgJkLgAFQNAANAIAQgCSkAADcAACAEIAkpABg3ABggBCAJKQAQNwAQIAQgCSkACDcACCAEIAkpADg3ADggBCAJKQAwNwAwIAQgCSkAKDcAKCAEIAkpACA3ACAgBCAJKQBYNwBYIAQgCSkAUDcAUCAEIAkpAEg3AEggBCAJKQBANwBAIAQgCSkAYDcAYCAEIAkpAGg3AGggBCAJKQBwNwBwIAQgCSkAeDcAeCAJQYABaiEJIARBgAFqIQQgIUKAAX0iIUIfVg0ACwsgIUIQWgRAIAQgCSkAADcAACAEIAkpAAg3AAggIUIQfSEhIAlBEGohCSAEQRBqIQQLICFCCFoEQCAEIAkpAAA3AAAgIUIIfSEhIAlBCGohCSAEQQhqIQQLICFCBFoEQCAEIAkoAAA2AAAgIUIEfSEhIAlBBGohCSAEQQRqIQQLICFCAloEQCAEIAkvAAA7AAAgIUICfSEhIAlBAmohCSAEQQJqIQQLICMgIn0hIyAhUEUEQCAEIAktAAA6AAAgCUEBaiEJIARBAWohBAsgI0IAUg0ACwsgBAsMAQsgECAIIA8gBygCjAEiBCAEIA9LGyIIIA9ByIABKAIAEQQACyEQIAcgBygCjAEgCGsiBDYCjAEgDyAIayEPIAQNAiAHQcj+ADYCBCAHKAIEIQgMDwsgDSEJCyAJIQQMDgsgBygCBCEIDAwLIAEgBmohASAFIAZBA3RqIQUMCgsgBCAIaiEBIAUgCEEDdGohBQwJCyAEIAhqIQEgCyAIQQN0aiEFDAgLIAEgBmohASAFIAZBA3RqIQUMBwsgBCAIaiEBIAUgCEEDdGohBQwGCyAEIAhqIQEgAyAIQQN0aiEFDAULIAEgBmohASAFIAZBA3RqIQUMBAsgB0HR/gA2AgQgDEG8CTYCGCAHKAIEIQgMBAsgBCEBIAghBiAHKAIEIQgMAwtBACEGIAQhBSANIQQMAwsCQAJAIAhFBEAgCiEJDAELIAcoAhRFBEAgCiEJDAELAkAgBUEfSw0AIAZFDQMgBUEIaiEJIAFBAWohBCAGQQFrIQsgAS0AACAFdCAKaiEKIAVBGE8EQCAEIQEgCyEGIAkhBQwBCyALRQRAIAQhAUEAIQYgCSEFIA0hBAwGCyAFQRBqIQsgAUECaiEEIAZBAmshAyABLQABIAl0IApqIQogBUEPSwRAIAQhASADIQYgCyEFDAELIANFBEAgBCEBQQAhBiALIQUgDSEEDAYLIAVBGGohCSABQQNqIQQgBkEDayEDIAEtAAIgC3QgCmohCiAFQQdLBEAgBCEBIAMhBiAJIQUMAQsgA0UEQCAEIQFBACEGIAkhBSANIQQMBgsgBUEgaiEFIAZBBGshBiABLQADIAl0IApqIQogAUEEaiEBC0EAIQkgCEEEcQRAIAogBygCIEcNAgtBACEFCyAHQdD+ADYCBEEBIQQgCSEKDAMLIAdB0f4ANgIEIAxBjQw2AhggBygCBCEIDAELC0EAIQYgDSEECyAMIA82AhAgDCAQNgIMIAwgBjYCBCAMIAE2AgAgByAFNgKIASAHIAo2AoQBAkAgBygCLA0AIA8gFkYNAiAHKAIEIgFB0P4ASw0CIAFBzv4ASQ0ACwJ/IBYgD2shCiAHKAIMQQRxIQkCQAJAAkAgDCgCHCIDKAI4Ig1FBEBBASEIIAMgAygCACIBKAIgIAEoAiggAygCmEdBASADKAIodGpBARAoIg02AjggDUUNAQsgAygCLCIGRQRAIANCADcDMCADQQEgAygCKHQiBjYCLAsgBiAKTQRAAkAgCQRAAkAgBiAKTw0AIAogBmshBSAQIAprIQEgDCgCHCIGKAIUBEAgBkFAayABIAVBAEHYgAEoAgARCAAMAQsgBiAGKAIcIAEgBUHAgAEoAgARAAAiATYCHCAMIAE2AjALIAMoAiwiDUUNASAQIA1rIQUgAygCOCEBIAwoAhwiBigCFARAIAZBQGsgASAFIA1B3IABKAIAEQgADAILIAYgBigCHCABIAUgDUHEgAEoAgARBAAiATYCHCAMIAE2AjAMAQsgDSAQIAZrIAYQBxoLIANBADYCNCADIAMoAiw2AjBBAAwECyAKIAYgAygCNCIFayIBIAEgCksbIQsgECAKayEGIAUgDWohBQJAIAkEQAJAIAtFDQAgDCgCHCIBKAIUBEAgAUFAayAFIAYgC0HcgAEoAgARCAAMAQsgASABKAIcIAUgBiALQcSAASgCABEEACIBNgIcIAwgATYCMAsgCiALayIFRQ0BIBAgBWshBiADKAI4IQEgDCgCHCINKAIUBEAgDUFAayABIAYgBUHcgAEoAgARCAAMBQsgDSANKAIcIAEgBiAFQcSAASgCABEEACIBNgIcIAwgATYCMAwECyAFIAYgCxAHGiAKIAtrIgUNAgtBACEIIANBACADKAI0IAtqIgUgBSADKAIsIgFGGzYCNCABIAMoAjAiAU0NACADIAEgC2o2AjALIAgMAgsgAygCOCAQIAVrIAUQBxoLIAMgBTYCNCADIAMoAiw2AjBBAAtFBEAgDCgCECEPIAwoAgQhFyAHKAKIAQwDCyAHQdL+ADYCBAtBfCEXDAILIAYhFyAFCyEFIAwgICAXayIBIAwoAghqNgIIIAwgFiAPayIGIAwoAhRqNgIUIAcgBygCICAGajYCICAMIAcoAghBAEdBBnQgBWogBygCBCIFQb/+AEZBB3RqQYACIAVBwv4ARkEIdCAFQcf+AEYbajYCLCAEIARBeyAEGyABIAZyGyEXCyAUQRBqJAAgFwshASACIAIpAwAgADUCIH03AwACQAJAAkACQCABQQVqDgcBAgICAgMAAgtBAQ8LIAAoAhQNAEEDDwsgACgCACIABEAgACABNgIEIABBDTYCAAtBAiEBCyABCwkAIABBAToADAtEAAJAIAJC/////w9YBEAgACgCFEUNAQsgACgCACIABEAgAEEANgIEIABBEjYCAAtBAA8LIAAgATYCECAAIAI+AhRBAQu5AQEEfyAAQRBqIQECfyAALQAEBEAgARCEAQwBC0F+IQMCQCABRQ0AIAEoAiBFDQAgASgCJCIERQ0AIAEoAhwiAkUNACACKAIAIAFHDQAgAigCBEG0/gBrQR9LDQAgAigCOCIDBEAgBCABKAIoIAMQHiABKAIkIQQgASgCHCECCyAEIAEoAiggAhAeQQAhAyABQQA2AhwLIAMLIgEEQCAAKAIAIgAEQCAAIAE2AgQgAEENNgIACwsgAUUL0gwBBn8gAEIANwIQIABCADcCHCAAQRBqIQICfyAALQAEBEAgACgCCCEBQesMLQAAQTFGBH8Cf0F+IQMCQCACRQ0AIAJBADYCGCACKAIgIgRFBEAgAkEANgIoIAJBJzYCIEEnIQQLIAIoAiRFBEAgAkEoNgIkC0EGIAEgAUF/RhsiBUEASA0AIAVBCUoNAEF8IQMgBCACKAIoQQFB0C4QKCIBRQ0AIAIgATYCHCABIAI2AgAgAUEPNgI0IAFCgICAgKAFNwIcIAFBADYCFCABQYCAAjYCMCABQf//ATYCOCABIAIoAiAgAigCKEGAgAJBAhAoNgJIIAEgAigCICACKAIoIAEoAjBBAhAoIgM2AkwgA0EAIAEoAjBBAXQQGSACKAIgIAIoAihBgIAEQQIQKCEDIAFBgIACNgLoLSABQQA2AkAgASADNgJQIAEgAigCICACKAIoQYCAAkEEECgiAzYCBCABIAEoAugtIgRBAnQ2AgwCQAJAIAEoAkhFDQAgASgCTEUNACABKAJQRQ0AIAMNAQsgAUGaBTYCICACQejAACgCADYCGCACEIQBGkF8DAILIAFBADYCjAEgASAFNgKIASABQgA3AyggASADIARqNgLsLSABIARBA2xBA2s2AvQtQX4hAwJAIAJFDQAgAigCIEUNACACKAIkRQ0AIAIoAhwiAUUNACABKAIAIAJHDQACQAJAIAEoAiAiBEE5aw45AQICAgICAgICAgICAQICAgECAgICAgICAgICAgICAgICAgECAgICAgICAgICAgECAgICAgICAgIBAAsgBEGaBUYNACAEQSpHDQELIAJBAjYCLCACQQA2AgggAkIANwIUIAFBADYCECABIAEoAgQ2AgggASgCFCIDQX9MBEAgAUEAIANrIgM2AhQLIAFBOUEqIANBAkYbNgIgIAIgA0ECRgR/IAFBoAFqQeSAASgCABEBAAVBAQs2AjAgAUF+NgIkIAFBADYCoC4gAUIANwOYLiABQYgXakGg0wA2AgAgASABQcwVajYCgBcgAUH8FmpBjNMANgIAIAEgAUHYE2o2AvQWIAFB8BZqQfjSADYCACABIAFB5AFqNgLoFiABEIgBQQAhAwsgAw0AIAIoAhwiAiACKAIwQQF0NgJEQQAhAyACKAJQQQBBgIAIEBkgAiACKAKIASIEQQxsIgFBtNgAai8BADYClAEgAiABQbDYAGovAQA2ApABIAIgAUGy2ABqLwEANgJ4IAIgAUG22ABqLwEANgJ0QfiAASgCACEFQeyAASgCACEGQYCBASgCACEBIAJCADcCbCACQgA3AmQgAkEANgI8IAJBADYChC4gAkIANwJUIAJBKSABIARBCUYiARs2AnwgAkEqIAYgARs2AoABIAJBKyAFIAEbNgKEAQsgAwsFQXoLDAELAn9BekHrDC0AAEExRw0AGkF+IAJFDQAaIAJBADYCGCACKAIgIgNFBEAgAkEANgIoIAJBJzYCIEEnIQMLIAIoAiRFBEAgAkEoNgIkC0F8IAMgAigCKEEBQaDHABAoIgRFDQAaIAIgBDYCHCAEQQA2AjggBCACNgIAIARBtP4ANgIEIARBzIABKAIAEQkANgKYR0F+IQMCQCACRQ0AIAIoAiBFDQAgAigCJCIFRQ0AIAIoAhwiAUUNACABKAIAIAJHDQAgASgCBEG0/gBrQR9LDQACQAJAIAEoAjgiBgRAIAEoAihBD0cNAQsgAUEPNgIoIAFBADYCDAwBCyAFIAIoAiggBhAeIAFBADYCOCACKAIgIQUgAUEPNgIoIAFBADYCDCAFRQ0BCyACKAIkRQ0AIAIoAhwiAUUNACABKAIAIAJHDQAgASgCBEG0/gBrQR9LDQBBACEDIAFBADYCNCABQgA3AiwgAUEANgIgIAJBADYCCCACQgA3AhQgASgCDCIFBEAgAiAFQQFxNgIwCyABQrT+ADcCBCABQgA3AoQBIAFBADYCJCABQoCAgoAQNwMYIAFCgICAgHA3AxAgAUKBgICAcDcCjEcgASABQfwKaiIFNgK4ASABIAU2ApwBIAEgBTYCmAELQQAgA0UNABogAigCJCACKAIoIAQQHiACQQA2AhwgAwsLIgIEQCAAKAIAIgAEQCAAIAI2AgQgAEENNgIACwsgAkULKQEBfyAALQAERQRAQQAPC0ECIQEgACgCCCIAQQNOBH8gAEEHSgVBAgsLBgAgABAGC2MAQcgAEAkiAEUEQEGEhAEoAgAhASACBEAgAiABNgIEIAJBATYCAAsgAA8LIABBADoADCAAQQE6AAQgACACNgIAIABBADYCOCAAQgA3AzAgACABQQkgAUEBa0EJSRs2AgggAAukCgIIfwF+QfCAAUH0gAEgACgCdEGBCEkbIQYCQANAAkACfwJAIAAoAjxBhQJLDQAgABAvAkAgACgCPCICQYUCSw0AIAENAEEADwsgAkUNAiACQQRPDQBBAAwBCyAAIAAoAmggACgChAERAgALIQMgACAAKAJsOwFgQQIhAgJAIAA1AmggA619IgpCAVMNACAKIAAoAjBBhgJrrVUNACAAKAJwIAAoAnhPDQAgA0UNACAAIAMgBigCABECACICQQVLDQBBAiACIAAoAowBQQFGGyECCwJAIAAoAnAiA0EDSQ0AIAIgA0sNACAAIAAoAvAtIgJBAWo2AvAtIAAoAjwhBCACIAAoAuwtaiAAKAJoIgcgAC8BYEF/c2oiAjoAACAAIAAoAvAtIgVBAWo2AvAtIAUgACgC7C1qIAJBCHY6AAAgACAAKALwLSIFQQFqNgLwLSAFIAAoAuwtaiADQQNrOgAAIAAgACgCgC5BAWo2AoAuIANB/c4Aai0AAEECdCAAakHoCWoiAyADLwEAQQFqOwEAIAAgAkEBayICIAJBB3ZBgAJqIAJBgAJJG0GAywBqLQAAQQJ0akHYE2oiAiACLwEAQQFqOwEAIAAgACgCcCIFQQFrIgM2AnAgACAAKAI8IANrNgI8IAAoAvQtIQggACgC8C0hCSAEIAdqQQNrIgQgACgCaCICSwRAIAAgAkEBaiAEIAJrIgIgBUECayIEIAIgBEkbIAAoAoABEQUAIAAoAmghAgsgAEEANgJkIABBADYCcCAAIAIgA2oiBDYCaCAIIAlHDQJBACECIAAgACgCWCIDQQBOBH8gACgCSCADagVBAAsgBCADa0EAEA8gACAAKAJoNgJYIAAoAgAQCiAAKAIAKAIQDQIMAwsgACgCZARAIAAoAmggACgCSGpBAWstAAAhAyAAIAAoAvAtIgRBAWo2AvAtIAQgACgC7C1qQQA6AAAgACAAKALwLSIEQQFqNgLwLSAEIAAoAuwtakEAOgAAIAAgACgC8C0iBEEBajYC8C0gBCAAKALsLWogAzoAACAAIANBAnRqIgMgAy8B5AFBAWo7AeQBIAAoAvAtIAAoAvQtRgRAIAAgACgCWCIDQQBOBH8gACgCSCADagVBAAsgACgCaCADa0EAEA8gACAAKAJoNgJYIAAoAgAQCgsgACACNgJwIAAgACgCaEEBajYCaCAAIAAoAjxBAWs2AjwgACgCACgCEA0CQQAPBSAAQQE2AmQgACACNgJwIAAgACgCaEEBajYCaCAAIAAoAjxBAWs2AjwMAgsACwsgACgCZARAIAAoAmggACgCSGpBAWstAAAhAiAAIAAoAvAtIgNBAWo2AvAtIAMgACgC7C1qQQA6AAAgACAAKALwLSIDQQFqNgLwLSADIAAoAuwtakEAOgAAIAAgACgC8C0iA0EBajYC8C0gAyAAKALsLWogAjoAACAAIAJBAnRqIgIgAi8B5AFBAWo7AeQBIAAoAvAtIAAoAvQtRhogAEEANgJkCyAAIAAoAmgiA0ECIANBAkkbNgKELiABQQRGBEAgACAAKAJYIgFBAE4EfyAAKAJIIAFqBUEACyADIAFrQQEQDyAAIAAoAmg2AlggACgCABAKQQNBAiAAKAIAKAIQGw8LIAAoAvAtBEBBACECIAAgACgCWCIBQQBOBH8gACgCSCABagVBAAsgAyABa0EAEA8gACAAKAJoNgJYIAAoAgAQCiAAKAIAKAIQRQ0BC0EBIQILIAIL2BACEH8BfiAAKAKIAUEFSCEOA0ACQAJ/AkACQAJAAn8CQAJAIAAoAjxBhQJNBEAgABAvIAAoAjwiA0GFAksNASABDQFBAA8LIA4NASAIIQMgBSEHIAohDSAGQf//A3FFDQEMAwsgA0UNA0EAIANBBEkNARoLIAAgACgCaEH4gAEoAgARAgALIQZBASECQQAhDSAAKAJoIgOtIAatfSISQgFTDQIgEiAAKAIwQYYCa61VDQIgBkUNAiAAIAZB8IABKAIAEQIAIgZBASAGQfz/A3EbQQEgACgCbCINQf//A3EgA0H//wNxSRshBiADIQcLAkAgACgCPCIEIAZB//8DcSICQQRqTQ0AIAZB//8DcUEDTQRAQQEgBkEBa0H//wNxIglFDQQaIANB//8DcSIEIAdBAWpB//8DcSIDSw0BIAAgAyAJIAQgA2tBAWogAyAJaiAESxtB7IABKAIAEQUADAELAkAgACgCeEEEdCACSQ0AIARBBEkNACAGQQFrQf//A3EiDCAHQQFqQf//A3EiBGohCSAEIANB//8DcSIDTwRAQeyAASgCACELIAMgCUkEQCAAIAQgDCALEQUADAMLIAAgBCADIARrQQFqIAsRBQAMAgsgAyAJTw0BIAAgAyAJIANrQeyAASgCABEFAAwBCyAGIAdqQf//A3EiA0UNACAAIANBAWtB+IABKAIAEQIAGgsgBgwCCyAAIAAoAmgiBUECIAVBAkkbNgKELiABQQRGBEBBACEDIAAgACgCWCIBQQBOBH8gACgCSCABagVBAAsgBSABa0EBEA8gACAAKAJoNgJYIAAoAgAQCkEDQQIgACgCACgCEBsPCyAAKALwLQRAQQAhAkEAIQMgACAAKAJYIgFBAE4EfyAAKAJIIAFqBUEACyAFIAFrQQAQDyAAIAAoAmg2AlggACgCABAKIAAoAgAoAhBFDQMLQQEhAgwCCyADIQdBAQshBEEAIQYCQCAODQAgACgCPEGHAkkNACACIAdB//8DcSIQaiIDIAAoAkRBhgJrTw0AIAAgAzYCaEEAIQogACADQfiAASgCABECACEFAn8CQCAAKAJoIgitIAWtfSISQgFTDQAgEiAAKAIwQYYCa61VDQAgBUUNACAAIAVB8IABKAIAEQIAIQYgAC8BbCIKIAhB//8DcSIFTw0AIAZB//8DcSIDQQRJDQAgCCAEQf//A3FBAkkNARogCCACIApBAWpLDQEaIAggAiAFQQFqSw0BGiAIIAAoAkgiCSACa0EBaiICIApqLQAAIAIgBWotAABHDQEaIAggCUEBayICIApqIgwtAAAgAiAFaiIPLQAARw0BGiAIIAUgCCAAKAIwQYYCayICa0H//wNxQQAgAiAFSRsiEU0NARogCCADQf8BSw0BGiAGIQUgCCECIAQhAyAIIAoiCUECSQ0BGgNAAkAgA0EBayEDIAVBAWohCyAJQQFrIQkgAkEBayECIAxBAWsiDC0AACAPQQFrIg8tAABHDQAgA0H//wNxRQ0AIBEgAkH//wNxTw0AIAVB//8DcUH+AUsNACALIQUgCUH//wNxQQFLDQELCyAIIANB//8DcUEBSw0BGiAIIAtB//8DcUECRg0BGiAIQQFqIQggAyEEIAshBiAJIQogAgwBC0EBIQYgCAshBSAAIBA2AmgLAn8gBEH//wNxIgNBA00EQCAEQf//A3EiA0UNAyAAKAJIIAdB//8DcWotAAAhBCAAIAAoAvAtIgJBAWo2AvAtIAIgACgC7C1qQQA6AAAgACAAKALwLSICQQFqNgLwLSACIAAoAuwtakEAOgAAIAAgACgC8C0iAkEBajYC8C0gAiAAKALsLWogBDoAACAAIARBAnRqIgRB5AFqIAQvAeQBQQFqOwEAIAAgACgCPEEBazYCPCAAKALwLSICIAAoAvQtRiIEIANBAUYNARogACgCSCAHQQFqQf//A3FqLQAAIQkgACACQQFqNgLwLSAAKALsLSACakEAOgAAIAAgACgC8C0iAkEBajYC8C0gAiAAKALsLWpBADoAACAAIAAoAvAtIgJBAWo2AvAtIAIgACgC7C1qIAk6AAAgACAJQQJ0aiICQeQBaiACLwHkAUEBajsBACAAIAAoAjxBAWs2AjwgBCAAKALwLSICIAAoAvQtRmoiBCADQQJGDQEaIAAoAkggB0ECakH//wNxai0AACEHIAAgAkEBajYC8C0gACgC7C0gAmpBADoAACAAIAAoAvAtIgJBAWo2AvAtIAIgACgC7C1qQQA6AAAgACAAKALwLSICQQFqNgLwLSACIAAoAuwtaiAHOgAAIAAgB0ECdGoiB0HkAWogBy8B5AFBAWo7AQAgACAAKAI8QQFrNgI8IAQgACgC8C0gACgC9C1GagwBCyAAIAAoAvAtIgJBAWo2AvAtIAIgACgC7C1qIAdB//8DcSANQf//A3FrIgc6AAAgACAAKALwLSICQQFqNgLwLSACIAAoAuwtaiAHQQh2OgAAIAAgACgC8C0iAkEBajYC8C0gAiAAKALsLWogBEEDazoAACAAIAAoAoAuQQFqNgKALiADQf3OAGotAABBAnQgAGpB6AlqIgQgBC8BAEEBajsBACAAIAdBAWsiBCAEQQd2QYACaiAEQYACSRtBgMsAai0AAEECdGpB2BNqIgQgBC8BAEEBajsBACAAIAAoAjwgA2s2AjwgACgC8C0gACgC9C1GCyEEIAAgACgCaCADaiIHNgJoIARFDQFBACECQQAhBCAAIAAoAlgiA0EATgR/IAAoAkggA2oFQQALIAcgA2tBABAPIAAgACgCaDYCWCAAKAIAEAogACgCACgCEA0BCwsgAgu0BwIEfwF+AkADQAJAAkACQAJAIAAoAjxBhQJNBEAgABAvAkAgACgCPCICQYUCSw0AIAENAEEADwsgAkUNBCACQQRJDQELIAAgACgCaEH4gAEoAgARAgAhAiAANQJoIAKtfSIGQgFTDQAgBiAAKAIwQYYCa61VDQAgAkUNACAAIAJB8IABKAIAEQIAIgJBBEkNACAAIAAoAvAtIgNBAWo2AvAtIAMgACgC7C1qIAAoAmggACgCbGsiAzoAACAAIAAoAvAtIgRBAWo2AvAtIAQgACgC7C1qIANBCHY6AAAgACAAKALwLSIEQQFqNgLwLSAEIAAoAuwtaiACQQNrOgAAIAAgACgCgC5BAWo2AoAuIAJB/c4Aai0AAEECdCAAakHoCWoiBCAELwEAQQFqOwEAIAAgA0EBayIDIANBB3ZBgAJqIANBgAJJG0GAywBqLQAAQQJ0akHYE2oiAyADLwEAQQFqOwEAIAAgACgCPCACayIFNgI8IAAoAvQtIQMgACgC8C0hBCAAKAJ4IAJPQQAgBUEDSxsNASAAIAAoAmggAmoiAjYCaCAAIAJBAWtB+IABKAIAEQIAGiADIARHDQQMAgsgACgCSCAAKAJoai0AACECIAAgACgC8C0iA0EBajYC8C0gAyAAKALsLWpBADoAACAAIAAoAvAtIgNBAWo2AvAtIAMgACgC7C1qQQA6AAAgACAAKALwLSIDQQFqNgLwLSADIAAoAuwtaiACOgAAIAAgAkECdGoiAkHkAWogAi8B5AFBAWo7AQAgACAAKAI8QQFrNgI8IAAgACgCaEEBajYCaCAAKALwLSAAKAL0LUcNAwwBCyAAIAAoAmhBAWoiBTYCaCAAIAUgAkEBayICQeyAASgCABEFACAAIAAoAmggAmo2AmggAyAERw0CC0EAIQNBACECIAAgACgCWCIEQQBOBH8gACgCSCAEagVBAAsgACgCaCAEa0EAEA8gACAAKAJoNgJYIAAoAgAQCiAAKAIAKAIQDQEMAgsLIAAgACgCaCIEQQIgBEECSRs2AoQuIAFBBEYEQEEAIQIgACAAKAJYIgFBAE4EfyAAKAJIIAFqBUEACyAEIAFrQQEQDyAAIAAoAmg2AlggACgCABAKQQNBAiAAKAIAKAIQGw8LIAAoAvAtBEBBACEDQQAhAiAAIAAoAlgiAUEATgR/IAAoAkggAWoFQQALIAQgAWtBABAPIAAgACgCaDYCWCAAKAIAEAogACgCACgCEEUNAQtBASEDCyADC80JAgl/An4gAUEERiEGIAAoAiwhAgJAAkACQCABQQRGBEAgAkECRg0CIAIEQCAAQQAQUCAAQQA2AiwgACAAKAJoNgJYIAAoAgAQCiAAKAIAKAIQRQ0ECyAAIAYQTyAAQQI2AiwMAQsgAg0BIAAoAjxFDQEgACAGEE8gAEEBNgIsCyAAIAAoAmg2AlgLQQJBASABQQRGGyEKA0ACQCAAKAIMIAAoAhBBCGpLDQAgACgCABAKIAAoAgAiAigCEA0AQQAhAyABQQRHDQIgAigCBA0CIAAoAqAuDQIgACgCLEVBAXQPCwJAAkAgACgCPEGFAk0EQCAAEC8CQCAAKAI8IgNBhQJLDQAgAQ0AQQAPCyADRQ0CIAAoAiwEfyADBSAAIAYQTyAAIAo2AiwgACAAKAJoNgJYIAAoAjwLQQRJDQELIAAgACgCaEH4gAEoAgARAgAhBCAAKAJoIgKtIAStfSILQgFTDQAgCyAAKAIwQYYCa61VDQAgAiAAKAJIIgJqIgMvAAAgAiAEaiICLwAARw0AIANBAmogAkECakHQgAEoAgARAgBBAmoiA0EESQ0AIAAoAjwiAiADIAIgA0kbIgJBggIgAkGCAkkbIgdB/c4Aai0AACICQQJ0IgRBhMkAajMBACEMIARBhskAai8BACEDIAJBCGtBE00EQCAHQQNrIARBgNEAaigCAGutIAOthiAMhCEMIARBsNYAaigCACADaiEDCyAAKAKgLiEFIAMgC6dBAWsiCCAIQQd2QYACaiAIQYACSRtBgMsAai0AACICQQJ0IglBgsoAai8BAGohBCAJQYDKAGozAQAgA62GIAyEIQsgACkDmC4hDAJAIAUgAkEESQR/IAQFIAggCUGA0gBqKAIAa60gBK2GIAuEIQsgCUGw1wBqKAIAIARqCyICaiIDQT9NBEAgCyAFrYYgDIQhCwwBCyAFQcAARgRAIAAoAgQgACgCEGogDDcAACAAIAAoAhBBCGo2AhAgAiEDDAELIAAoAgQgACgCEGogCyAFrYYgDIQ3AAAgACAAKAIQQQhqNgIQIANBQGohAyALQcAAIAVrrYghCwsgACALNwOYLiAAIAM2AqAuIAAgACgCPCAHazYCPCAAIAAoAmggB2o2AmgMAgsgACgCSCAAKAJoai0AAEECdCICQYDBAGozAQAhCyAAKQOYLiEMAkAgACgCoC4iBCACQYLBAGovAQAiAmoiA0E/TQRAIAsgBK2GIAyEIQsMAQsgBEHAAEYEQCAAKAIEIAAoAhBqIAw3AAAgACAAKAIQQQhqNgIQIAIhAwwBCyAAKAIEIAAoAhBqIAsgBK2GIAyENwAAIAAgACgCEEEIajYCECADQUBqIQMgC0HAACAEa62IIQsLIAAgCzcDmC4gACADNgKgLiAAIAAoAmhBAWo2AmggACAAKAI8QQFrNgI8DAELCyAAIAAoAmgiAkECIAJBAkkbNgKELiAAKAIsIQIgAUEERgRAAkAgAkUNACAAQQEQUCAAQQA2AiwgACAAKAJoNgJYIAAoAgAQCiAAKAIAKAIQDQBBAg8LQQMPCyACBEBBACEDIABBABBQIABBADYCLCAAIAAoAmg2AlggACgCABAKIAAoAgAoAhBFDQELQQEhAwsgAwucAQEFfyACQQFOBEAgAiAAKAJIIAFqIgNqQQJqIQQgA0ECaiECIAAoAlQhAyAAKAJQIQUDQCAAIAItAAAgA0EFdEHg/wFxcyIDNgJUIAUgA0EBdGoiBi8BACIHIAFB//8DcUcEQCAAKAJMIAEgACgCOHFB//8DcUEBdGogBzsBACAGIAE7AQALIAFBAWohASACQQFqIgIgBEkNAAsLC1sBAn8gACAAKAJIIAFqLQACIAAoAlRBBXRB4P8BcXMiAjYCVCABIAAoAlAgAkEBdGoiAy8BACICRwRAIAAoAkwgACgCOCABcUEBdGogAjsBACADIAE7AQALIAILEwAgAUEFdEHg/wFxIAJB/wFxcwsGACABEAYLLwAjAEEQayIAJAAgAEEMaiABIAJsEIwBIQEgACgCDCECIABBEGokAEEAIAIgARsLjAoCAX4CfyMAQfAAayIGJAACQAJAAkACQAJAAkACQAJAIAQODwABBwIEBQYGBgYGBgYGAwYLQn8hBQJAIAAgBkHkAGpCDBARIgNCf1cEQCABBEAgASAAKAIMNgIAIAEgACgCEDYCBAsMAQsCQCADQgxSBEAgAQRAIAFBADYCBCABQRE2AgALDAELIAEoAhQhBEEAIQJCASEFA0AgBkHkAGogAmoiAiACLQAAIARB/f8DcSICQQJyIAJBA3NsQQh2cyICOgAAIAYgAjoAKCABAn8gASgCDEF/cyECQQAgBkEoaiIERQ0AGiACIARBAUHUgAEoAgARAAALQX9zIgI2AgwgASABKAIQIAJB/wFxakGFiKLAAGxBAWoiAjYCECAGIAJBGHY6ACggAQJ/IAEoAhRBf3MhAkEAIAZBKGoiBEUNABogAiAEQQFB1IABKAIAEQAAC0F/cyIENgIUIAVCDFIEQCAFpyECIAVCAXwhBQwBCwtCACEFIAAgBkEoahAhQQBIDQEgBigCUCEAIwBBEGsiAiQAIAIgADYCDCAGAn8gAkEMahCNASIARQRAIAZBITsBJEEADAELAn8gACgCFCIEQdAATgRAIARBCXQMAQsgAEHQADYCFEGAwAILIQQgBiAAKAIMIAQgACgCEEEFdGpqQaDAAWo7ASQgACgCBEEFdCAAKAIIQQt0aiAAKAIAQQF2ags7ASYgAkEQaiQAIAYtAG8iACAGLQBXRg0BIAYtACcgAEYNASABBEAgAUEANgIEIAFBGzYCAAsLQn8hBQsgBkHwAGokACAFDwtCfyEFIAAgAiADEBEiA0J/VwRAIAEEQCABIAAoAgw2AgAgASAAKAIQNgIECwwGCyMAQRBrIgAkAAJAIANQDQAgASgCFCEEIAJFBEBCASEFA0AgACACIAdqLQAAIARB/f8DcSIEQQJyIARBA3NsQQh2czoADyABAn8gASgCDEF/cyEEQQAgAEEPaiIHRQ0AGiAEIAdBAUHUgAEoAgARAAALQX9zIgQ2AgwgASABKAIQIARB/wFxakGFiKLAAGxBAWoiBDYCECAAIARBGHY6AA8gAQJ/IAEoAhRBf3MhBEEAIABBD2oiB0UNABogBCAHQQFB1IABKAIAEQAAC0F/cyIENgIUIAMgBVENAiAFpyEHIAVCAXwhBQwACwALQgEhBQNAIAAgAiAHai0AACAEQf3/A3EiBEECciAEQQNzbEEIdnMiBDoADyACIAdqIAQ6AAAgAQJ/IAEoAgxBf3MhBEEAIABBD2oiB0UNABogBCAHQQFB1IABKAIAEQAAC0F/cyIENgIMIAEgASgCECAEQf8BcWpBhYiiwABsQQFqIgQ2AhAgACAEQRh2OgAPIAECfyABKAIUQX9zIQRBACAAQQ9qIgdFDQAaIAQgB0EBQdSAASgCABEAAAtBf3MiBDYCFCADIAVRDQEgBachByAFQgF8IQUMAAsACyAAQRBqJAAgAyEFDAULIAJBADsBMiACIAIpAwAiA0KAAYQ3AwAgA0IIg1ANBCACIAIpAyBCDH03AyAMBAsgBkKFgICAcDcDECAGQoOAgIDAADcDCCAGQoGAgIAgNwMAQQAgBhAkIQUMAwsgA0IIWgR+IAIgASgCADYCACACIAEoAgQ2AgRCCAVCfwshBQwCCyABEAYMAQsgAQRAIAFBADYCBCABQRI2AgALQn8hBQsgBkHwAGokACAFC60DAgJ/An4jAEEQayIGJAACQAJAAkAgBEUNACABRQ0AIAJBAUYNAQtBACEDIABBCGoiAARAIABBADYCBCAAQRI2AgALDAELIANBAXEEQEEAIQMgAEEIaiIABEAgAEEANgIEIABBGDYCAAsMAQtBGBAJIgVFBEBBACEDIABBCGoiAARAIABBADYCBCAAQQ42AgALDAELIAVBADYCCCAFQgA3AgAgBUGQ8dmiAzYCFCAFQvis0ZGR8dmiIzcCDAJAIAQQIiICRQ0AIAKtIQhBACEDQYfTru5+IQJCASEHA0AgBiADIARqLQAAOgAPIAUgBkEPaiIDBH8gAiADQQFB1IABKAIAEQAABUEAC0F/cyICNgIMIAUgBSgCECACQf8BcWpBhYiiwABsQQFqIgI2AhAgBiACQRh2OgAPIAUCfyAFKAIUQX9zIQJBACAGQQ9qIgNFDQAaIAIgA0EBQdSAASgCABEAAAtBf3M2AhQgByAIUQ0BIAUoAgxBf3MhAiAHpyEDIAdCAXwhBwwACwALIAAgAUElIAUQQiIDDQAgBRAGQQAhAwsgBkEQaiQAIAMLnRoCBn4FfyMAQdAAayILJAACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCADDhQFBhULAwQJDgACCBAKDw0HEQERDBELAkBByAAQCSIBBEAgAUIANwMAIAFCADcDMCABQQA2AiggAUIANwMgIAFCADcDGCABQgA3AxAgAUIANwMIIAFCADcDOCABQQgQCSIDNgIEIAMNASABEAYgAARAIABBADYCBCAAQQ42AgALCyAAQQA2AhQMFAsgA0IANwMAIAAgATYCFCABQUBrQgA3AwAgAUIANwM4DBQLAkACQCACUARAQcgAEAkiA0UNFCADQgA3AwAgA0IANwMwIANBADYCKCADQgA3AyAgA0IANwMYIANCADcDECADQgA3AwggA0IANwM4IANBCBAJIgE2AgQgAQ0BIAMQBiAABEAgAEEANgIEIABBDjYCAAsMFAsgAiAAKAIQIgEpAzBWBEAgAARAIABBADYCBCAAQRI2AgALDBQLIAEoAigEQCAABEAgAEEANgIEIABBHTYCAAsMFAsgASgCBCEDAkAgASkDCCIGQgF9IgdQDQADQAJAIAIgAyAHIAR9QgGIIAR8IgWnQQN0aikDAFQEQCAFQgF9IQcMAQsgBSAGUQRAIAYhBQwDCyADIAVCAXwiBKdBA3RqKQMAIAJWDQILIAQhBSAEIAdUDQALCwJAIAIgAyAFpyIKQQN0aikDAH0iBFBFBEAgASgCACIDIApBBHRqKQMIIQcMAQsgASgCACIDIAVCAX0iBadBBHRqKQMIIgchBAsgAiAHIAR9VARAIAAEQCAAQQA2AgQgAEEcNgIACwwUCyADIAVCAXwiBUEAIAAQiQEiA0UNEyADKAIAIAMoAggiCkEEdGpBCGsgBDcDACADKAIEIApBA3RqIAI3AwAgAyACNwMwIAMgASkDGCIGIAMpAwgiBEIBfSIHIAYgB1QbNwMYIAEgAzYCKCADIAE2AiggASAENwMgIAMgBTcDIAwBCyABQgA3AwALIAAgAzYCFCADIAQ3A0AgAyACNwM4QgAhBAwTCyAAKAIQIgEEQAJAIAEoAigiA0UEQCABKQMYIQIMAQsgA0EANgIoIAEoAihCADcDICABIAEpAxgiAiABKQMgIgUgAiAFVhsiAjcDGAsgASkDCCACVgRAA0AgASgCACACp0EEdGooAgAQBiACQgF8IgIgASkDCFQNAAsLIAEoAgAQBiABKAIEEAYgARAGCyAAKAIUIQEgAEEANgIUIAAgATYCEAwSCyACQghaBH4gASAAKAIANgIAIAEgACgCBDYCBEIIBUJ/CyEEDBELIAAoAhAiAQRAAkAgASgCKCIDRQRAIAEpAxghAgwBCyADQQA2AiggASgCKEIANwMgIAEgASkDGCICIAEpAyAiBSACIAVWGyICNwMYCyABKQMIIAJWBEADQCABKAIAIAKnQQR0aigCABAGIAJCAXwiAiABKQMIVA0ACwsgASgCABAGIAEoAgQQBiABEAYLIAAoAhQiAQRAAkAgASgCKCIDRQRAIAEpAxghAgwBCyADQQA2AiggASgCKEIANwMgIAEgASkDGCICIAEpAyAiBSACIAVWGyICNwMYCyABKQMIIAJWBEADQCABKAIAIAKnQQR0aigCABAGIAJCAXwiAiABKQMIVA0ACwsgASgCABAGIAEoAgQQBiABEAYLIAAQBgwQCyAAKAIQIgBCADcDOCAAQUBrQgA3AwAMDwsgAkJ/VwRAIAAEQCAAQQA2AgQgAEESNgIACwwOCyACIAAoAhAiAykDMCADKQM4IgZ9IgUgAiAFVBsiBVANDiABIAMpA0AiB6ciAEEEdCIBIAMoAgBqIgooAgAgBiADKAIEIABBA3RqKQMAfSICp2ogBSAKKQMIIAJ9IgYgBSAGVBsiBKcQByEKIAcgBCADKAIAIgAgAWopAwggAn1RrXwhAiAFIAZWBEADQCAKIASnaiAAIAKnQQR0IgFqIgAoAgAgBSAEfSIGIAApAwgiByAGIAdUGyIGpxAHGiACIAYgAygCACIAIAFqKQMIUa18IQIgBSAEIAZ8IgRWDQALCyADIAI3A0AgAyADKQM4IAR8NwM4DA4LQn8hBEHIABAJIgNFDQ0gA0IANwMAIANCADcDMCADQQA2AiggA0IANwMgIANCADcDGCADQgA3AxAgA0IANwMIIANCADcDOCADQQgQCSIBNgIEIAFFBEAgAxAGIAAEQCAAQQA2AgQgAEEONgIACwwOCyABQgA3AwAgACgCECIBBEACQCABKAIoIgpFBEAgASkDGCEEDAELIApBADYCKCABKAIoQgA3AyAgASABKQMYIgIgASkDICIFIAIgBVYbIgQ3AxgLIAEpAwggBFYEQANAIAEoAgAgBKdBBHRqKAIAEAYgBEIBfCIEIAEpAwhUDQALCyABKAIAEAYgASgCBBAGIAEQBgsgACADNgIQQgAhBAwNCyAAKAIUIgEEQAJAIAEoAigiA0UEQCABKQMYIQIMAQsgA0EANgIoIAEoAihCADcDICABIAEpAxgiAiABKQMgIgUgAiAFVhsiAjcDGAsgASkDCCACVgRAA0AgASgCACACp0EEdGooAgAQBiACQgF8IgIgASkDCFQNAAsLIAEoAgAQBiABKAIEEAYgARAGCyAAQQA2AhQMDAsgACgCECIDKQM4IAMpAzAgASACIAAQRCIHQgBTDQogAyAHNwM4AkAgAykDCCIGQgF9IgJQDQAgAygCBCEAA0ACQCAHIAAgAiAEfUIBiCAEfCIFp0EDdGopAwBUBEAgBUIBfSECDAELIAUgBlEEQCAGIQUMAwsgACAFQgF8IgSnQQN0aikDACAHVg0CCyAEIQUgAiAEVg0ACwsgAyAFNwNAQgAhBAwLCyAAKAIUIgMpAzggAykDMCABIAIgABBEIgdCAFMNCSADIAc3AzgCQCADKQMIIgZCAX0iAlANACADKAIEIQADQAJAIAcgACACIAR9QgGIIAR8IgWnQQN0aikDAFQEQCAFQgF9IQIMAQsgBSAGUQRAIAYhBQwDCyAAIAVCAXwiBKdBA3RqKQMAIAdWDQILIAQhBSACIARWDQALCyADIAU3A0BCACEEDAoLIAJCN1gEQCAABEAgAEEANgIEIABBEjYCAAsMCQsgARAqIAEgACgCDDYCKCAAKAIQKQMwIQIgAUEANgIwIAEgAjcDICABIAI3AxggAULcATcDAEI4IQQMCQsgACABKAIANgIMDAgLIAtBQGtBfzYCACALQouAgICwAjcDOCALQoyAgIDQATcDMCALQo+AgICgATcDKCALQpGAgICQATcDICALQoeAgICAATcDGCALQoWAgIDgADcDECALQoOAgIDAADcDCCALQoGAgIAgNwMAQQAgCxAkIQQMBwsgACgCECkDOCIEQn9VDQYgAARAIABBPTYCBCAAQR42AgALDAULIAAoAhQpAzgiBEJ/VQ0FIAAEQCAAQT02AgQgAEEeNgIACwwEC0J/IQQgAkJ/VwRAIAAEQCAAQQA2AgQgAEESNgIACwwFCyACIAAoAhQiAykDOCACfCIFQv//A3wiBFYEQCAABEAgAEEANgIEIABBEjYCAAsMBAsCQCAFIAMoAgQiCiADKQMIIganQQN0aikDACIHWA0AAkAgBCAHfUIQiCAGfCIIIAMpAxAiCVgNAEIQIAkgCVAbIQUDQCAFIgRCAYYhBSAEIAhUDQALIAQgCVQNACADKAIAIASnIgpBBHQQNCIMRQ0DIAMgDDYCACADKAIEIApBA3RBCGoQNCIKRQ0DIAMgBDcDECADIAo2AgQgAykDCCEGCyAGIAhaDQAgAygCACEMA0AgDCAGp0EEdGoiDUGAgAQQCSIONgIAIA5FBEAgAARAIABBADYCBCAAQQ42AgALDAYLIA1CgIAENwMIIAMgBkIBfCIFNwMIIAogBadBA3RqIAdCgIAEfCIHNwMAIAMpAwgiBiAIVA0ACwsgAykDQCEFIAMpAzghBwJAIAJQBEBCACEEDAELIAWnIgBBBHQiDCADKAIAaiINKAIAIAcgCiAAQQN0aikDAH0iBqdqIAEgAiANKQMIIAZ9IgcgAiAHVBsiBKcQBxogBSAEIAMoAgAiACAMaikDCCAGfVGtfCEFIAIgB1YEQANAIAAgBadBBHQiCmoiACgCACABIASnaiACIAR9IgYgACkDCCIHIAYgB1QbIganEAcaIAUgBiADKAIAIgAgCmopAwhRrXwhBSAEIAZ8IgQgAlQNAAsLIAMpAzghBwsgAyAFNwNAIAMgBCAHfCICNwM4IAIgAykDMFgNBCADIAI3AzAMBAsgAARAIABBADYCBCAAQRw2AgALDAILIAAEQCAAQQA2AgQgAEEONgIACyAABEAgAEEANgIEIABBDjYCAAsMAQsgAEEANgIUC0J/IQQLIAtB0ABqJAAgBAtIAQF/IABCADcCBCAAIAE2AgACQCABQQBIDQBBsBMoAgAgAUwNACABQQJ0QcATaigCAEEBRw0AQYSEASgCACECCyAAIAI2AgQLDgAgAkGx893xeWxBEHYLvgEAIwBBEGsiACQAIABBADoACEGAgQFBAjYCAEH8gAFBAzYCAEH4gAFBBDYCAEH0gAFBBTYCAEHwgAFBBjYCAEHsgAFBBzYCAEHogAFBCDYCAEHkgAFBCTYCAEHggAFBCjYCAEHcgAFBCzYCAEHYgAFBDDYCAEHUgAFBDTYCAEHQgAFBDjYCAEHMgAFBDzYCAEHIgAFBEDYCAEHEgAFBETYCAEHAgAFBEjYCACAAQRBqJAAgAkGx893xeWxBEHYLuQEBAX8jAEEQayIBJAAgAUEAOgAIQYCBAUECNgIAQfyAAUEDNgIAQfiAAUEENgIAQfSAAUEFNgIAQfCAAUEGNgIAQeyAAUEHNgIAQeiAAUEINgIAQeSAAUEJNgIAQeCAAUEKNgIAQdyAAUELNgIAQdiAAUEMNgIAQdSAAUENNgIAQdCAAUEONgIAQcyAAUEPNgIAQciAAUEQNgIAQcSAAUERNgIAQcCAAUESNgIAIAAQjgEgAUEQaiQAC78BAQF/IwBBEGsiAiQAIAJBADoACEGAgQFBAjYCAEH8gAFBAzYCAEH4gAFBBDYCAEH0gAFBBTYCAEHwgAFBBjYCAEHsgAFBBzYCAEHogAFBCDYCAEHkgAFBCTYCAEHggAFBCjYCAEHcgAFBCzYCAEHYgAFBDDYCAEHUgAFBDTYCAEHQgAFBDjYCAEHMgAFBDzYCAEHIgAFBEDYCAEHEgAFBETYCAEHAgAFBEjYCACAAIAEQkAEhACACQRBqJAAgAAu+AQEBfyMAQRBrIgIkACACQQA6AAhBgIEBQQI2AgBB/IABQQM2AgBB+IABQQQ2AgBB9IABQQU2AgBB8IABQQY2AgBB7IABQQc2AgBB6IABQQg2AgBB5IABQQk2AgBB4IABQQo2AgBB3IABQQs2AgBB2IABQQw2AgBB1IABQQ02AgBB0IABQQ42AgBBzIABQQ82AgBByIABQRA2AgBBxIABQRE2AgBBwIABQRI2AgAgACABEFohACACQRBqJAAgAAu+AQEBfyMAQRBrIgIkACACQQA6AAhBgIEBQQI2AgBB/IABQQM2AgBB+IABQQQ2AgBB9IABQQU2AgBB8IABQQY2AgBB7IABQQc2AgBB6IABQQg2AgBB5IABQQk2AgBB4IABQQo2AgBB3IABQQs2AgBB2IABQQw2AgBB1IABQQ02AgBB0IABQQ42AgBBzIABQQ82AgBByIABQRA2AgBBxIABQRE2AgBBwIABQRI2AgAgACABEFshACACQRBqJAAgAAu9AQEBfyMAQRBrIgMkACADQQA6AAhBgIEBQQI2AgBB/IABQQM2AgBB+IABQQQ2AgBB9IABQQU2AgBB8IABQQY2AgBB7IABQQc2AgBB6IABQQg2AgBB5IABQQk2AgBB4IABQQo2AgBB3IABQQs2AgBB2IABQQw2AgBB1IABQQ02AgBB0IABQQ42AgBBzIABQQ82AgBByIABQRA2AgBBxIABQRE2AgBBwIABQRI2AgAgACABIAIQjwEgA0EQaiQAC4UBAgR/AX4jAEEQayIBJAACQCAAKQMwUARADAELA0ACQCAAIAVBACABQQ9qIAFBCGoQZiIEQX9GDQAgAS0AD0EDRw0AIAIgASgCCEGAgICAf3FBgICAgHpGaiECC0F/IQMgBEF/Rg0BIAIhAyAFQgF8IgUgACkDMFQNAAsLIAFBEGokACADCwuMdSUAQYAIC7ELaW5zdWZmaWNpZW50IG1lbW9yeQBuZWVkIGRpY3Rpb25hcnkALSsgICAwWDB4AFppcCBhcmNoaXZlIGluY29uc2lzdGVudABJbnZhbGlkIGFyZ3VtZW50AGludmFsaWQgbGl0ZXJhbC9sZW5ndGhzIHNldABpbnZhbGlkIGNvZGUgbGVuZ3RocyBzZXQAdW5rbm93biBoZWFkZXIgZmxhZ3Mgc2V0AGludmFsaWQgZGlzdGFuY2VzIHNldABpbnZhbGlkIGJpdCBsZW5ndGggcmVwZWF0AEZpbGUgYWxyZWFkeSBleGlzdHMAdG9vIG1hbnkgbGVuZ3RoIG9yIGRpc3RhbmNlIHN5bWJvbHMAaW52YWxpZCBzdG9yZWQgYmxvY2sgbGVuZ3RocwAlcyVzJXMAYnVmZmVyIGVycm9yAE5vIGVycm9yAHN0cmVhbSBlcnJvcgBUZWxsIGVycm9yAEludGVybmFsIGVycm9yAFNlZWsgZXJyb3IAV3JpdGUgZXJyb3IAZmlsZSBlcnJvcgBSZWFkIGVycm9yAFpsaWIgZXJyb3IAZGF0YSBlcnJvcgBDUkMgZXJyb3IAaW5jb21wYXRpYmxlIHZlcnNpb24AaW52YWxpZCBjb2RlIC0tIG1pc3NpbmcgZW5kLW9mLWJsb2NrAGluY29ycmVjdCBoZWFkZXIgY2hlY2sAaW5jb3JyZWN0IGxlbmd0aCBjaGVjawBpbmNvcnJlY3QgZGF0YSBjaGVjawBpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFjawBoZWFkZXIgY3JjIG1pc21hdGNoADEuMi4xMy56bGliLW5nAGludmFsaWQgd2luZG93IHNpemUAUmVhZC1vbmx5IGFyY2hpdmUATm90IGEgemlwIGFyY2hpdmUAUmVzb3VyY2Ugc3RpbGwgaW4gdXNlAE1hbGxvYyBmYWlsdXJlAGludmFsaWQgYmxvY2sgdHlwZQBGYWlsdXJlIHRvIGNyZWF0ZSB0ZW1wb3JhcnkgZmlsZQBDYW4ndCBvcGVuIGZpbGUATm8gc3VjaCBmaWxlAFByZW1hdHVyZSBlbmQgb2YgZmlsZQBDYW4ndCByZW1vdmUgZmlsZQBpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGUAaW52YWxpZCBkaXN0YW5jZSBjb2RlAHVua25vd24gY29tcHJlc3Npb24gbWV0aG9kAHN0cmVhbSBlbmQAQ29tcHJlc3NlZCBkYXRhIGludmFsaWQATXVsdGktZGlzayB6aXAgYXJjaGl2ZXMgbm90IHN1cHBvcnRlZABPcGVyYXRpb24gbm90IHN1cHBvcnRlZABFbmNyeXB0aW9uIG1ldGhvZCBub3Qgc3VwcG9ydGVkAENvbXByZXNzaW9uIG1ldGhvZCBub3Qgc3VwcG9ydGVkAEVudHJ5IGhhcyBiZWVuIGRlbGV0ZWQAQ29udGFpbmluZyB6aXAgYXJjaGl2ZSB3YXMgY2xvc2VkAENsb3NpbmcgemlwIGFyY2hpdmUgZmFpbGVkAFJlbmFtaW5nIHRlbXBvcmFyeSBmaWxlIGZhaWxlZABFbnRyeSBoYXMgYmVlbiBjaGFuZ2VkAE5vIHBhc3N3b3JkIHByb3ZpZGVkAFdyb25nIHBhc3N3b3JkIHByb3ZpZGVkAFVua25vd24gZXJyb3IgJWQAQUUAKG51bGwpADogAFBLBgcAUEsGBgBQSwUGAFBLAwQAUEsBAgAAAAA/BQAAwAcAAJMIAAB4CAAAbwUAAJEFAAB6BQAAsgUAAFYIAAAbBwAA1gQAAAsHAADqBgAAnAUAAMgGAACyCAAAHggAACgHAABHBAAAoAYAAGAFAAAuBAAAPgcAAD8IAAD+BwAAjgYAAMkIAADeCAAA5gcAALIGAABVBQAAqAcAACAAQcgTCxEBAAAAAQAAAAEAAAABAAAAAQBB7BMLCQEAAAABAAAAAgBBmBQLAQEAQbgUCwEBAEHSFAukLDomOyZlJmYmYyZgJiIg2CXLJdklQiZAJmomayY8JrolxCWVITwgtgCnAKwlqCGRIZMhkiGQIR8ilCGyJbwlIAAhACIAIwAkACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADoAOwA8AD0APgA/AEAAQQBCAEMARABFAEYARwBIAEkASgBLAEwATQBOAE8AUABRAFIAUwBUAFUAVgBXAFgAWQBaAFsAXABdAF4AXwBgAGEAYgBjAGQAZQBmAGcAaABpAGoAawBsAG0AbgBvAHAAcQByAHMAdAB1AHYAdwB4AHkAegB7AHwAfQB+AAIjxwD8AOkA4gDkAOAA5QDnAOoA6wDoAO8A7gDsAMQAxQDJAOYAxgD0APYA8gD7APkA/wDWANwAogCjAKUApyCSAeEA7QDzAPoA8QDRAKoAugC/ABAjrAC9ALwAoQCrALsAkSWSJZMlAiUkJWElYiVWJVUlYyVRJVclXSVcJVslECUUJTQlLCUcJQAlPCVeJV8lWiVUJWklZiVgJVAlbCVnJWglZCVlJVklWCVSJVMlayVqJRglDCWIJYQljCWQJYAlsQPfAJMDwAOjA8MDtQDEA6YDmAOpA7QDHiLGA7UDKSJhIrEAZSJkIiAjISP3AEgisAAZIrcAGiJ/ILIAoCWgAAAAAACWMAd3LGEO7rpRCZkZxG0Hj/RqcDWlY+mjlWSeMojbDqS43Hke6dXgiNnSlytMtgm9fLF+By2455Edv5BkELcd8iCwakhxufPeQb6EfdTaGuvk3W1RtdT0x4XTg1aYbBPAqGtkevli/ezJZYpPXAEU2WwGY2M9D/r1DQiNyCBuO14QaUzkQWDVcnFnotHkAzxH1ARL/YUN0mu1CqX6qLU1bJiyQtbJu9tA+bys42zYMnVc30XPDdbcWT3Rq6ww2SY6AN5RgFHXyBZh0L+19LQhI8SzVpmVus8Ppb24nrgCKAiIBV+y2QzGJOkLsYd8by8RTGhYqx1hwT0tZraQQdx2BnHbAbwg0pgqENXviYWxcR+1tgal5L+fM9S46KLJB3g0+QAPjqgJlhiYDuG7DWp/LT1tCJdsZJEBXGPm9FFra2JhbBzYMGWFTgBi8u2VBmx7pQEbwfQIglfED/XG2bBlUOm3Euq4vot8iLn83x3dYkkt2hXzfNOMZUzU+1hhsk3OUbU6dAC8o+Iwu9RBpd9K15XYPW3E0aT79NbTaulpQ/zZbjRGiGet0Lhg2nMtBETlHQMzX0wKqsl8Dd08cQVQqkECJxAQC76GIAzJJbVoV7OFbyAJ1Ga5n+Rhzg753l6YydkpIpjQsLSo18cXPbNZgQ20LjtcvbetbLrAIIO47bazv5oM4rYDmtKxdDlH1eqvd9KdFSbbBIMW3HMSC2PjhDtklD5qbQ2oWmp6C88O5J3/CZMnrgAKsZ4HfUSTD/DSowiHaPIBHv7CBmldV2L3y2dlgHE2bBnnBmtudhvU/uAr04laetoQzErdZ2/fufn5776OQ763F9WOsGDoo9bWfpPRocTC2DhS8t9P8We70WdXvKbdBrU/SzaySNorDdhMGwqv9koDNmB6BEHD72DfVd9nqO+ObjF5vmlGjLNhyxqDZryg0m8lNuJoUpV3DMwDRwu7uRYCIi8mBVW+O7rFKAu9spJatCsEarNcp//XwjHP0LWLntksHa7eW7DCZJsm8mPsnKNqdQqTbQKpBgmcPzYO64VnB3ITVwAFgkq/lRR6uOKuK7F7OBu2DJuO0pINvtXlt+/cfCHf2wvU0tOGQuLU8fiz3Whug9ofzRa+gVsmufbhd7Bvd0e3GOZaCIhwag//yjsGZlwLARH/nmWPaa5i+NP/a2FFz2wWeOIKoO7SDddUgwROwrMDOWEmZ6f3FmDQTUdpSdt3bj5KatGu3FrW2WYL30DwO9g3U668qcWeu95/z7JH6f+1MBzyvb2KwrrKMJOzU6ajtCQFNtC6kwbXzSlX3lS/Z9kjLnpms7hKYcQCG2hdlCtvKje+C7ShjgzDG98FWo3vAi0AAAAARjtnZYx2zsrKTamvWevtTh/QiivVnSOEk6ZE4bLW25307bz4PqAVV3ibcjLrPTbTrQZRtmdL+BkhcJ98JavG4GOQoYWp3Qgq7+ZvT3xAK646e0zL8DblZLYNggGXfR190UZ6GBsL07ddMLTSzpbwM4itl1ZC4D75BNtZnAtQ/BpNa5t/hyYy0MEdVbVSuxFUFIB2Md7N356Y9rj7uYYnh/+9QOI18OlNc8uOKOBtysmmVq2sbBsEAyogY2Yu+zr6aMBdn6KN9DDktpNVdxDXtDErsNH7Zhl+vV1+G5wt4WfaFoYCEFsvrVZgSMjFxgwpg/1rTEmwwuMPi6WGFqD4NVCbn1Ca1jb/3O1Rmk9LFXsJcHIewz3bsYUGvNSkdiOo4k1EzSgA7WJuO4oH/Z3O5rumqYNx6wAsN9BnSTMLPtV1MFmwv33wH/lGl3pq4NObLNu0/uaWHVGgrXo0gd3lSMfmgi0NqyuCS5BM59g2CAaeDW9jVEDGzBJ7oakd8AQvW8tjSpGGyuXXva2ARBvpYQIgjgTIbSerjlZAzq8m37LpHbjXI1AReGVrdh32zTL8sPZVmXq7/DY8gJtTOFvCz35gpaq0LQwF8hZrYGGwL4Eni0jk7cbhS6v9hi6KjRlSzLZ+Nwb715hAwLD902b0HJVdk3lfEDrWGStdsyxA8Wtqe5YOoDY/oeYNWMR1qxwlM5B7QPnd0u+/5rWKnpYq9titTZMS4OQ8VNuDWcd9x7iBRqDdSwsJcg0wbhcJ6zeLT9BQ7oWd+UHDpp4kUADaxRY7vaDcdhQPmk1zars97Bb9BotzN0si3HFwRbni1gFYpO1mPW6gz5Iom6j3JxANcWErahSrZsO77V2k3n774D84wIda8o0u9bS2SZCVxtbs0/2xiRmwGCZfi39DzC07oooWXMdAW/VoBmCSDQK7y5FEgKz0js0FW8j2Yj5bUCbfHWtButcm6BWRHY9wsG0QDPZWd2k8G97GeiC5o+mG/UKvvZonZfAziCPLVO064AlefNtuO7aWx5TwraDxYwvkECUwg3XvfSraqUZNv4g20sPODbWmBEAcCUJ7e2zR3T+Nl+ZY6F2r8UcbkJYiH0vPvllwqNuTPQF01QZmEUagIvAAm0WVytbsOozti1+tnRQj66ZzRiHr2uln0L2M9Hb5bbJNngh4ADenPjtQwjGw9UR3i5IhvcY7jvv9XOtoWxgKLmB/b+Qt1sCiFrGlg2Yu2cVdSbwPEOATSSuHdtqNw5ectqTyVvsNXRDAajgUGzOkUiBUwZht/W7eVpoLTfDe6gvLuY/BhhAgh713RabN6Dng9o9cKrsm82yAQZb/JgV3uR1iEnNQy701a6zYAAAAAFiA4tfxBrR0qYZWo+INaOm6jYo+EwvcnUuLPkqFHaEJ3Z1D3nQbFX0sm/eqZxDJ4D+QKzeWFn2UzpafQwo7QhNSu6DE+z32Z6O9FLDoNir6sLbILRkwno5BsHxZjybjGtemAc1+IFduJqC1uW0ri/M1q2kknC0/h8St3VAUdoQmTPZm8eVwMFK98NKF9nvsz677DhgHfVi7X/26bJFrJS/J68f4YG2RWzjtc4xzZk3GK+avEYJg+bLa4BtlHk3GNUbNJOLvS3JBt8uQlvxArtykwEwLDUYaqFXG+H+bUGc8w9CF62pW00gy1jGfeV0P1SHd7QKIW7uh0NtZdijsCE1wbOqa2eq8OYFqXu7K4WCkkmGCczvn1NBjZzYHrfGpRPVxS5Nc9x0wBHf/50/8wa0XfCN6vvp12eZ6lw4i10peeleoidPR/iqLURz9wNoit5hawGAx3JbDaVx0FKfK61f/SgmAVsxfIw5MvfRFx4O+HUdhabTBN8rsQdUdPJqMa2QabrzNnDgflRzayN6X5IKGFwZVL5FQ9ncRsiG5hy1i4QfPtUiBmRYQAXvBW4pFiwMKp1yqjPH/8gwTKDahznhuISyvx6d6DJ8nmNvUrKaRjCxERiWqEuV9KvAys7xvces8jaZCutsFGjo50lGxB5gJMeVPoLez7Pg3UTtQ2BGaCFjzTaHepe75Xkc5stV5c+pVm6RD080HG1Mv0NXFsJONRVJEJMME53xD5jA3yNh6b0g6rcbObA6eTo7ZWuNTiQJjsV6r5ef982UFKrjuO2Dgbtm3SeiPFBFobcPf/vKAh34QVy74RvR2eKQjPfOaaWVzeL7M9S4dlHXMykSulbwcLndrtaghyO0owx+mo/1V/iMfglelSSEPJav2wbM0tZkz1mIwtYDBaDViFiO+XFx7Pr6L0rjoKIo4Cv9OldevFhU1eL+TY9vnE4EMrJi/RvQYXZFdngsyBR7p5cuIdqaTCJRxOo7C0mIOIAUphR5PcQX8mNiDqjuAA0jseDQZ1yC0+wCJMq2j0bJPdJo5cT7CuZPpaz/FSjO/J539KbjepalaCQwvDKpUr+59HyTQN0ekMuDuImRDtqKGlHIPW8Qqj7kTgwnvsNuJDWeQAjMtyILR+mEEh1k5hGWO9xL6za+SGBoGFE65XpSsbhUfkiRNn3Dz5BkmULyZxIdsQp3xNMJ/Jp1EKYXFxMtSjk/1GNbPF89/SUFsJ8mju+lfPPix394vGFmIjEDZalsLUlQRU9K2xvpU4GWi1AKyZnnf4j75PTWXf2uWz/+JQYR0twvc9FXcdXIDfy3y4ajjZH7ru+ScPBJiyp9K4ihIAWkWAlnp9NXwb6J2qO9AoQAAAADhtlLvg2vUBWLdhuoG16gL52H65IW8fA5kCi7hDK5RF+0YA/iPxYUSbnPX/Qp5+Rzrz6vziRItGWikf/YYXKMu+erxwZs3dyt6gSXEHosLJf89Wcqd4N8gfFaNzxTy8jn1RKDWl5kmPHYvdNMSJVoy85MI3ZFOjjdw+NzYMLhGXdEOFLKz05JYUmXAtzZv7lbX2by5tQQ6U1SyaLw8FhdK3aBFpb99w09ey5GgOsG/Qdt37a65qmtEWBw5qyjk5XPJUrecq48xdko5Y5kuM014z4Ufl61YmX1M7suSJEq0ZMX85ounIWBhRpcyjiKdHG/DK06AofbIakBAmoVgcI26gcbfVeMbWb8CrQtQZqclsYcRd17lzPG0BHqjW2ze3K2NaI5C77UIqA4DWkdqCXSmi78mSelioKMI1PJMeCwulJmafHv7R/qRGvGofn77hp+fTdRw/ZBSmhwmAHV0gn+DlTQtbPfpq4YWX/lpclXXiJPjhWfxPgONEIhRYlDIy+exfpkI06Mf4jIVTQ1WH2Pst6kxA9V0t+k0wuUGXGaa8L3QyB/fDU71PrscGlqxMvu7B2AU2drm/jhstBFIlGjJqSI6Jsv/vMwqSe4jTkPAwq/1ki3NKBTHLJ5GKEQ6Od6ljGsxx1Ht2ybnvzRC7ZHVo1vDOsGGRdAgMBc/geZrrmBQOUECjb+r4zvtRIcxw6Vmh5FKBFoXoOXsRU+NSDq5bP5oVg4j7rzvlbxTi5+SsmopwF0I9Ea36UIUWJm6yIB4DJpvGtEchftnTmqfbWCLftsyZBwGtI79sOZhlRSZl3Siy3gWf02S98kffZPDMZxydWNzEKjlmfEet3axXi3zUOh/HDI1+fbTg6sZt4mF+FY/1xc04lH91VQDEr3wfORcRi4LPpuo4d8t+g67J9TvWpGGADhMAOrZ+lIFqQKO3Ui03DIqaVrYy98IN6/VJtZOY3Q5LL7y080IoDylrN/KRBqNJSbHC8/HcVkgo3t3wULNJS4gEKPEwabxK+GW5hQAILT7Yv0yEYNLYP7nQU4fBvcc8GQqmhqFnMj17Ti3AwyO5exuU2MGj+Ux6evvHwgKWU3naITLDYkymeL5ykU6GHwX1XqhkT+bF8PQ/x3tMR6rv958djk0ncBr2/VkFC0U0kbCdg/AKJe5ksfzs7wmEgXuyXDYaCORbjrM0S6gSTCY8qZSRXRMs/Mmo9f5CEI2T1qtVJLcR7UkjqjdgPFePDajsV7rJVu/XXe021dZVTrhC7pYPI1QuYrfv8lyA2coxFGIShnXYquvhY3PpatsLhP5g0zOf2mteC2GxdxScCRqAJ9Gt4Z1pwHUmsML+nsivaiUQGAufqHWfJEAAAAAQ8umh8eQPNSEW5pTzycIc4zsrvQItzSnS3ySIJ5PEObdhLZhWd8sMhoUirVRaBiVEqO+Epb4JEHVM4LGfZlRFz5S95C6CW3D+cLLRLK+WWTxdf/jdS5lsDblwzfj1kHxoB3ndiRGfSVnjduiLPFJgm867wXrYXVWqKrT0foyoy65+QWpPaKf+n5pOX01Fatddt4N2vKFl4mxTjEOZH2zyCe2FU+j7Y8c4CYpm6tau7vokR08bMqHby8BIeiHq/I5xGBUvkA7zu0D8GhqSIz6SgtHXM2PHMaezNdgGRnk4t9aL0RY3nTeC52/eIzWw+qslQhMKxFT1nhSmHD/9GVGXbeu4Noz9XqJcD7cDjtCTi54ieip/NJy+r8Z1H1qKla7KeHwPK26am/ucczopQ1eyObG+E9inWIcIVbEm4n8F0rKN7HNTmwrng2njRlG2x85BRC5voFLI+3CgIVqF7MHrFR4oSvQIzt4k+id/9iUD9+bX6lYHwQzC1zPlYwOV+VzTZxD9MnH2aeKDH8gwXDtAIK7S4cG4NHURSt3U5AY9ZXT01MSV4jJQRRDb8ZfP/3mHPRbYZivwTLbZGe1c860ZDAFEuO0Xoiw95UuN7zpvBf/IhqQe3mAwziyJkTtgaSCrkoCBSoRmFZp2j7RIqas8WFtCnblNpAlpv02oujLjLqrACo9L1uwbmyQFukn7ITJZCciTuB8uB2jtx6adoScXDVPOtuxFKCI8t8GD7mjlC/6aDKofjOo+z34DnyVUt2t1pl7KlLC4XkRCUf+WnXV3hm+c1md5ekK3i5PjQsdzUtI1mvMzI3xn49GVxjEOsU4h/FjvwOq+exAYV9rEvkvlFEyiRPVaRNAlqK1x93eJ+eeFYFgGk4bM1mFvbSMtj9yz32Z9UsmA6YI7aUhQ5E3AQBakYaEAQvVx8qtUm9gfoMsq9gEqPBCV+s75NCgR3bw44zQd2fXSiQkHOyj8S9uZbLkyOI2v1KxdXT0Nj4IZhZ9w8CR+ZhawrpT/EUcrsrnX2VsYNs+9jOY9VC004nClJBCZBMUGf5AV9JYx4Lh2gHBKnyGRXHm1Qa6QFJNxtJyDg109YpW7qbJnUghYTeb8CL8PXemp6ck5WwBo64Qk4Pt2zUEaYCvVypLCdD/eIsWvLMtkTjot8J7IxFFMF+DZXOUJeL3z7+xtAQZNuacacmlV89OIQxVHWLH85opu2G6anDHPe4rXW6t4PvpeNN5LzsY36i/Q0X7/IjjfLf0cVz0P9fbcGRNiDOv6w+bBTje2M6eWVyVBAofXqKNVCIwrRfpliqTsgx50Hmq/gVKKDhGgY6/wtoU7IERsmvKbSBLiaaGzA39HJ9ONroYFAQAAJ0HAAAsCQAAhgUAAEgFAACnBQAAAAQAADIFAAC8BQAALAkAQYDBAAv3CQwACACMAAgATAAIAMwACAAsAAgArAAIAGwACADsAAgAHAAIAJwACABcAAgA3AAIADwACAC8AAgAfAAIAPwACAACAAgAggAIAEIACADCAAgAIgAIAKIACABiAAgA4gAIABIACACSAAgAUgAIANIACAAyAAgAsgAIAHIACADyAAgACgAIAIoACABKAAgAygAIACoACACqAAgAagAIAOoACAAaAAgAmgAIAFoACADaAAgAOgAIALoACAB6AAgA+gAIAAYACACGAAgARgAIAMYACAAmAAgApgAIAGYACADmAAgAFgAIAJYACABWAAgA1gAIADYACAC2AAgAdgAIAPYACAAOAAgAjgAIAE4ACADOAAgALgAIAK4ACABuAAgA7gAIAB4ACACeAAgAXgAIAN4ACAA+AAgAvgAIAH4ACAD+AAgAAQAIAIEACABBAAgAwQAIACEACAChAAgAYQAIAOEACAARAAgAkQAIAFEACADRAAgAMQAIALEACABxAAgA8QAIAAkACACJAAgASQAIAMkACAApAAgAqQAIAGkACADpAAgAGQAIAJkACABZAAgA2QAIADkACAC5AAgAeQAIAPkACAAFAAgAhQAIAEUACADFAAgAJQAIAKUACABlAAgA5QAIABUACACVAAgAVQAIANUACAA1AAgAtQAIAHUACAD1AAgADQAIAI0ACABNAAgAzQAIAC0ACACtAAgAbQAIAO0ACAAdAAgAnQAIAF0ACADdAAgAPQAIAL0ACAB9AAgA/QAIABMACQATAQkAkwAJAJMBCQBTAAkAUwEJANMACQDTAQkAMwAJADMBCQCzAAkAswEJAHMACQBzAQkA8wAJAPMBCQALAAkACwEJAIsACQCLAQkASwAJAEsBCQDLAAkAywEJACsACQArAQkAqwAJAKsBCQBrAAkAawEJAOsACQDrAQkAGwAJABsBCQCbAAkAmwEJAFsACQBbAQkA2wAJANsBCQA7AAkAOwEJALsACQC7AQkAewAJAHsBCQD7AAkA+wEJAAcACQAHAQkAhwAJAIcBCQBHAAkARwEJAMcACQDHAQkAJwAJACcBCQCnAAkApwEJAGcACQBnAQkA5wAJAOcBCQAXAAkAFwEJAJcACQCXAQkAVwAJAFcBCQDXAAkA1wEJADcACQA3AQkAtwAJALcBCQB3AAkAdwEJAPcACQD3AQkADwAJAA8BCQCPAAkAjwEJAE8ACQBPAQkAzwAJAM8BCQAvAAkALwEJAK8ACQCvAQkAbwAJAG8BCQDvAAkA7wEJAB8ACQAfAQkAnwAJAJ8BCQBfAAkAXwEJAN8ACQDfAQkAPwAJAD8BCQC/AAkAvwEJAH8ACQB/AQkA/wAJAP8BCQAAAAcAQAAHACAABwBgAAcAEAAHAFAABwAwAAcAcAAHAAgABwBIAAcAKAAHAGgABwAYAAcAWAAHADgABwB4AAcABAAHAEQABwAkAAcAZAAHABQABwBUAAcANAAHAHQABwADAAgAgwAIAEMACADDAAgAIwAIAKMACABjAAgA4wAIAAAABQAQAAUACAAFABgABQAEAAUAFAAFAAwABQAcAAUAAgAFABIABQAKAAUAGgAFAAYABQAWAAUADgAFAB4ABQABAAUAEQAFAAkABQAZAAUABQAFABUABQANAAUAHQAFAAMABQATAAUACwAFABsABQAHAAUAFwAFAEGBywAL7AYBAgMEBAUFBgYGBgcHBwcICAgICAgICAkJCQkJCQkJCgoKCgoKCgoKCgoKCgoKCgsLCwsLCwsLCwsLCwsLCwsMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8AABAREhITExQUFBQVFRUVFhYWFhYWFhYXFxcXFxcXFxgYGBgYGBgYGBgYGBgYGBgZGRkZGRkZGRkZGRkZGRkZGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhobGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dAAECAwQFBgcICAkJCgoLCwwMDAwNDQ0NDg4ODg8PDw8QEBAQEBAQEBEREREREREREhISEhISEhITExMTExMTExQUFBQUFBQUFBQUFBQUFBQVFRUVFRUVFRUVFRUVFRUVFhYWFhYWFhYWFhYWFhYWFhcXFxcXFxcXFxcXFxcXFxcYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhobGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbHAAAAAABAAAAAgAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAoAAAAMAAAADgAAABAAAAAUAAAAGAAAABwAAAAgAAAAKAAAADAAAAA4AAAAQAAAAFAAAABgAAAAcAAAAIAAAACgAAAAwAAAAOAAQYTSAAutAQEAAAACAAAAAwAAAAQAAAAGAAAACAAAAAwAAAAQAAAAGAAAACAAAAAwAAAAQAAAAGAAAACAAAAAwAAAAAABAACAAQAAAAIAAAADAAAABAAAAAYAAAAIAAAADAAAABAAAAAYAAAAIAAAADAAAABAAAAAYAAAgCAAAMApAAABAQAAHgEAAA8AAAAAJQAAQCoAAAAAAAAeAAAADwAAAAAAAADAKgAAAAAAABMAAAAHAEHg0wALTQEAAAABAAAAAQAAAAEAAAACAAAAAgAAAAIAAAACAAAAAwAAAAMAAAADAAAAAwAAAAQAAAAEAAAABAAAAAQAAAAFAAAABQAAAAUAAAAFAEHQ1AALZQEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAUAAAAGAAAABgAAAAcAAAAHAAAACAAAAAgAAAAJAAAACQAAAAoAAAAKAAAACwAAAAsAAAAMAAAADAAAAA0AAAANAEGA1gALIwIAAAADAAAABwAAAAAAAAAQERIACAcJBgoFCwQMAw0CDgEPAEHQ1gALTQEAAAABAAAAAQAAAAEAAAACAAAAAgAAAAIAAAACAAAAAwAAAAMAAAADAAAAAwAAAAQAAAAEAAAABAAAAAQAAAAFAAAABQAAAAUAAAAFAEHA1wALZQEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAUAAAAGAAAABgAAAAcAAAAHAAAACAAAAAgAAAAJAAAACQAAAAoAAAAKAAAACwAAAAsAAAAMAAAADAAAAA0AAAANAEG42AALASwAQcTYAAthLQAAAAQABAAIAAQALgAAAAQABgAQAAYALwAAAAQADAAgABgALwAAAAgAEAAgACAALwAAAAgAEACAAIAALwAAAAgAIACAAAABMAAAACAAgAACAQAEMAAAACAAAgECAQAQMABBsNkAC6UTAwAEAAUABgAHAAgACQAKAAsADQAPABEAEwAXABsAHwAjACsAMwA7AEMAUwBjAHMAgwCjAMMA4wACAQAAAAAAABAAEAAQABAAEAAQABAAEAARABEAEQARABIAEgASABIAEwATABMAEwAUABQAFAAUABUAFQAVABUAEABNAMoAAAABAAIAAwAEAAUABwAJAA0AEQAZACEAMQBBAGEAgQDBAAEBgQEBAgEDAQQBBgEIAQwBEAEYASABMAFAAWAAAAAAEAAQABAAEAARABEAEgASABMAEwAUABQAFQAVABYAFgAXABcAGAAYABkAGQAaABoAGwAbABwAHAAdAB0AQABAAGAHAAAACFAAAAgQABQIcwASBx8AAAhwAAAIMAAACcAAEAcKAAAIYAAACCAAAAmgAAAIAAAACIAAAAhAAAAJ4AAQBwYAAAhYAAAIGAAACZAAEwc7AAAIeAAACDgAAAnQABEHEQAACGgAAAgoAAAJsAAACAgAAAiIAAAISAAACfAAEAcEAAAIVAAACBQAFQjjABMHKwAACHQAAAg0AAAJyAARBw0AAAhkAAAIJAAACagAAAgEAAAIhAAACEQAAAnoABAHCAAACFwAAAgcAAAJmAAUB1MAAAh8AAAIPAAACdgAEgcXAAAIbAAACCwAAAm4AAAIDAAACIwAAAhMAAAJ+AAQBwMAAAhSAAAIEgAVCKMAEwcjAAAIcgAACDIAAAnEABEHCwAACGIAAAgiAAAJpAAACAIAAAiCAAAIQgAACeQAEAcHAAAIWgAACBoAAAmUABQHQwAACHoAAAg6AAAJ1AASBxMAAAhqAAAIKgAACbQAAAgKAAAIigAACEoAAAn0ABAHBQAACFYAAAgWAEAIAAATBzMAAAh2AAAINgAACcwAEQcPAAAIZgAACCYAAAmsAAAIBgAACIYAAAhGAAAJ7AAQBwkAAAheAAAIHgAACZwAFAdjAAAIfgAACD4AAAncABIHGwAACG4AAAguAAAJvAAACA4AAAiOAAAITgAACfwAYAcAAAAIUQAACBEAFQiDABIHHwAACHEAAAgxAAAJwgAQBwoAAAhhAAAIIQAACaIAAAgBAAAIgQAACEEAAAniABAHBgAACFkAAAgZAAAJkgATBzsAAAh5AAAIOQAACdIAEQcRAAAIaQAACCkAAAmyAAAICQAACIkAAAhJAAAJ8gAQBwQAAAhVAAAIFQAQCAIBEwcrAAAIdQAACDUAAAnKABEHDQAACGUAAAglAAAJqgAACAUAAAiFAAAIRQAACeoAEAcIAAAIXQAACB0AAAmaABQHUwAACH0AAAg9AAAJ2gASBxcAAAhtAAAILQAACboAAAgNAAAIjQAACE0AAAn6ABAHAwAACFMAAAgTABUIwwATByMAAAhzAAAIMwAACcYAEQcLAAAIYwAACCMAAAmmAAAIAwAACIMAAAhDAAAJ5gAQBwcAAAhbAAAIGwAACZYAFAdDAAAIewAACDsAAAnWABIHEwAACGsAAAgrAAAJtgAACAsAAAiLAAAISwAACfYAEAcFAAAIVwAACBcAQAgAABMHMwAACHcAAAg3AAAJzgARBw8AAAhnAAAIJwAACa4AAAgHAAAIhwAACEcAAAnuABAHCQAACF8AAAgfAAAJngAUB2MAAAh/AAAIPwAACd4AEgcbAAAIbwAACC8AAAm+AAAIDwAACI8AAAhPAAAJ/gBgBwAAAAhQAAAIEAAUCHMAEgcfAAAIcAAACDAAAAnBABAHCgAACGAAAAggAAAJoQAACAAAAAiAAAAIQAAACeEAEAcGAAAIWAAACBgAAAmRABMHOwAACHgAAAg4AAAJ0QARBxEAAAhoAAAIKAAACbEAAAgIAAAIiAAACEgAAAnxABAHBAAACFQAAAgUABUI4wATBysAAAh0AAAINAAACckAEQcNAAAIZAAACCQAAAmpAAAIBAAACIQAAAhEAAAJ6QAQBwgAAAhcAAAIHAAACZkAFAdTAAAIfAAACDwAAAnZABIHFwAACGwAAAgsAAAJuQAACAwAAAiMAAAITAAACfkAEAcDAAAIUgAACBIAFQijABMHIwAACHIAAAgyAAAJxQARBwsAAAhiAAAIIgAACaUAAAgCAAAIggAACEIAAAnlABAHBwAACFoAAAgaAAAJlQAUB0MAAAh6AAAIOgAACdUAEgcTAAAIagAACCoAAAm1AAAICgAACIoAAAhKAAAJ9QAQBwUAAAhWAAAIFgBACAAAEwczAAAIdgAACDYAAAnNABEHDwAACGYAAAgmAAAJrQAACAYAAAiGAAAIRgAACe0AEAcJAAAIXgAACB4AAAmdABQHYwAACH4AAAg+AAAJ3QASBxsAAAhuAAAILgAACb0AAAgOAAAIjgAACE4AAAn9AGAHAAAACFEAAAgRABUIgwASBx8AAAhxAAAIMQAACcMAEAcKAAAIYQAACCEAAAmjAAAIAQAACIEAAAhBAAAJ4wAQBwYAAAhZAAAIGQAACZMAEwc7AAAIeQAACDkAAAnTABEHEQAACGkAAAgpAAAJswAACAkAAAiJAAAISQAACfMAEAcEAAAIVQAACBUAEAgCARMHKwAACHUAAAg1AAAJywARBw0AAAhlAAAIJQAACasAAAgFAAAIhQAACEUAAAnrABAHCAAACF0AAAgdAAAJmwAUB1MAAAh9AAAIPQAACdsAEgcXAAAIbQAACC0AAAm7AAAIDQAACI0AAAhNAAAJ+wAQBwMAAAhTAAAIEwAVCMMAEwcjAAAIcwAACDMAAAnHABEHCwAACGMAAAgjAAAJpwAACAMAAAiDAAAIQwAACecAEAcHAAAIWwAACBsAAAmXABQHQwAACHsAAAg7AAAJ1wASBxMAAAhrAAAIKwAACbcAAAgLAAAIiwAACEsAAAn3ABAHBQAACFcAAAgXAEAIAAATBzMAAAh3AAAINwAACc8AEQcPAAAIZwAACCcAAAmvAAAIBwAACIcAAAhHAAAJ7wAQBwkAAAhfAAAIHwAACZ8AFAdjAAAIfwAACD8AAAnfABIHGwAACG8AAAgvAAAJvwAACA8AAAiPAAAITwAACf8AEAUBABcFAQETBREAGwUBEBEFBQAZBQEEFQVBAB0FAUAQBQMAGAUBAhQFIQAcBQEgEgUJABoFAQgWBYEAQAUAABAFAgAXBYEBEwUZABsFARgRBQcAGQUBBhUFYQAdBQFgEAUEABgFAQMUBTEAHAUBMBIFDQAaBQEMFgXBAEAFAAAQABEAEgAAAAgABwAJAAYACgAFAAsABAAMAAMADQACAA4AAQAPAEHg7AALQREACgAREREAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAEQAPChEREQMKBwABAAkLCwAACQYLAAALAAYRAAAAERERAEGx7QALIQsAAAAAAAAAABEACgoREREACgAAAgAJCwAAAAkACwAACwBB6+0ACwEMAEH37QALFQwAAAAADAAAAAAJDAAAAAAADAAADABBpe4ACwEOAEGx7gALFQ0AAAAEDQAAAAAJDgAAAAAADgAADgBB3+4ACwEQAEHr7gALHg8AAAAADwAAAAAJEAAAAAAAEAAAEAAAEgAAABISEgBBou8ACw4SAAAAEhISAAAAAAAACQBB0+8ACwELAEHf7wALFQoAAAAACgAAAAAJCwAAAAAACwAACwBBjfAACwEMAEGZ8AALJwwAAAAADAAAAAAJDAAAAAAADAAADAAAMDEyMzQ1Njc4OUFCQ0RFRgBB5PAACwE+AEGL8QALBf//////AEHQ8QALVxkSRDsCPyxHFD0zMAobBkZLRTcPSQ6OFwNAHTxpKzYfSi0cASAlKSEIDBUWIi4QOD4LNDEYZHR1di9BCX85ESNDMkKJiosFBCYoJw0qHjWMBxpIkxOUlQBBsPIAC4oOSWxsZWdhbCBieXRlIHNlcXVlbmNlAERvbWFpbiBlcnJvcgBSZXN1bHQgbm90IHJlcHJlc2VudGFibGUATm90IGEgdHR5AFBlcm1pc3Npb24gZGVuaWVkAE9wZXJhdGlvbiBub3QgcGVybWl0dGVkAE5vIHN1Y2ggZmlsZSBvciBkaXJlY3RvcnkATm8gc3VjaCBwcm9jZXNzAEZpbGUgZXhpc3RzAFZhbHVlIHRvbyBsYXJnZSBmb3IgZGF0YSB0eXBlAE5vIHNwYWNlIGxlZnQgb24gZGV2aWNlAE91dCBvZiBtZW1vcnkAUmVzb3VyY2UgYnVzeQBJbnRlcnJ1cHRlZCBzeXN0ZW0gY2FsbABSZXNvdXJjZSB0ZW1wb3JhcmlseSB1bmF2YWlsYWJsZQBJbnZhbGlkIHNlZWsAQ3Jvc3MtZGV2aWNlIGxpbmsAUmVhZC1vbmx5IGZpbGUgc3lzdGVtAERpcmVjdG9yeSBub3QgZW1wdHkAQ29ubmVjdGlvbiByZXNldCBieSBwZWVyAE9wZXJhdGlvbiB0aW1lZCBvdXQAQ29ubmVjdGlvbiByZWZ1c2VkAEhvc3QgaXMgZG93bgBIb3N0IGlzIHVucmVhY2hhYmxlAEFkZHJlc3MgaW4gdXNlAEJyb2tlbiBwaXBlAEkvTyBlcnJvcgBObyBzdWNoIGRldmljZSBvciBhZGRyZXNzAEJsb2NrIGRldmljZSByZXF1aXJlZABObyBzdWNoIGRldmljZQBOb3QgYSBkaXJlY3RvcnkASXMgYSBkaXJlY3RvcnkAVGV4dCBmaWxlIGJ1c3kARXhlYyBmb3JtYXQgZXJyb3IASW52YWxpZCBhcmd1bWVudABBcmd1bWVudCBsaXN0IHRvbyBsb25nAFN5bWJvbGljIGxpbmsgbG9vcABGaWxlbmFtZSB0b28gbG9uZwBUb28gbWFueSBvcGVuIGZpbGVzIGluIHN5c3RlbQBObyBmaWxlIGRlc2NyaXB0b3JzIGF2YWlsYWJsZQBCYWQgZmlsZSBkZXNjcmlwdG9yAE5vIGNoaWxkIHByb2Nlc3MAQmFkIGFkZHJlc3MARmlsZSB0b28gbGFyZ2UAVG9vIG1hbnkgbGlua3MATm8gbG9ja3MgYXZhaWxhYmxlAFJlc291cmNlIGRlYWRsb2NrIHdvdWxkIG9jY3VyAFN0YXRlIG5vdCByZWNvdmVyYWJsZQBQcmV2aW91cyBvd25lciBkaWVkAE9wZXJhdGlvbiBjYW5jZWxlZABGdW5jdGlvbiBub3QgaW1wbGVtZW50ZWQATm8gbWVzc2FnZSBvZiBkZXNpcmVkIHR5cGUASWRlbnRpZmllciByZW1vdmVkAERldmljZSBub3QgYSBzdHJlYW0ATm8gZGF0YSBhdmFpbGFibGUARGV2aWNlIHRpbWVvdXQAT3V0IG9mIHN0cmVhbXMgcmVzb3VyY2VzAExpbmsgaGFzIGJlZW4gc2V2ZXJlZABQcm90b2NvbCBlcnJvcgBCYWQgbWVzc2FnZQBGaWxlIGRlc2NyaXB0b3IgaW4gYmFkIHN0YXRlAE5vdCBhIHNvY2tldABEZXN0aW5hdGlvbiBhZGRyZXNzIHJlcXVpcmVkAE1lc3NhZ2UgdG9vIGxhcmdlAFByb3RvY29sIHdyb25nIHR5cGUgZm9yIHNvY2tldABQcm90b2NvbCBub3QgYXZhaWxhYmxlAFByb3RvY29sIG5vdCBzdXBwb3J0ZWQAU29ja2V0IHR5cGUgbm90IHN1cHBvcnRlZABOb3Qgc3VwcG9ydGVkAFByb3RvY29sIGZhbWlseSBub3Qgc3VwcG9ydGVkAEFkZHJlc3MgZmFtaWx5IG5vdCBzdXBwb3J0ZWQgYnkgcHJvdG9jb2wAQWRkcmVzcyBub3QgYXZhaWxhYmxlAE5ldHdvcmsgaXMgZG93bgBOZXR3b3JrIHVucmVhY2hhYmxlAENvbm5lY3Rpb24gcmVzZXQgYnkgbmV0d29yawBDb25uZWN0aW9uIGFib3J0ZWQATm8gYnVmZmVyIHNwYWNlIGF2YWlsYWJsZQBTb2NrZXQgaXMgY29ubmVjdGVkAFNvY2tldCBub3QgY29ubmVjdGVkAENhbm5vdCBzZW5kIGFmdGVyIHNvY2tldCBzaHV0ZG93bgBPcGVyYXRpb24gYWxyZWFkeSBpbiBwcm9ncmVzcwBPcGVyYXRpb24gaW4gcHJvZ3Jlc3MAU3RhbGUgZmlsZSBoYW5kbGUAUmVtb3RlIEkvTyBlcnJvcgBRdW90YSBleGNlZWRlZABObyBtZWRpdW0gZm91bmQAV3JvbmcgbWVkaXVtIHR5cGUATm8gZXJyb3IgaW5mb3JtYXRpb24AQcCAAQuFARMAAAAUAAAAFQAAABYAAAAXAAAAGAAAABkAAAAaAAAAGwAAABwAAAAdAAAAHgAAAB8AAAAgAAAAIQAAACIAAAAjAAAAgERQADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADIAAAAzAAAANAAAADUAAAA2AAAANwAAADgAQfSCAQsCXEQAQbCDAQsQ/////////////////////w==";
    if (!isDataURI(wasmBinaryFile)) {
      wasmBinaryFile = locateFile(wasmBinaryFile);
    }
    function getBinary(file) {
      try {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }
        var binary = tryParseAsDataURI(file);
        if (binary) {
          return binary;
        }
        if (readBinary) {
          return readBinary(file);
        } else {
          throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)";
        }
      } catch (err2) {
        abort(err2);
      }
    }
    function instantiateSync(file, info) {
      var instance;
      var module2;
      var binary;
      try {
        binary = getBinary(file);
        module2 = new WebAssembly.Module(binary);
        instance = new WebAssembly.Instance(module2, info);
      } catch (e) {
        var str = e.toString();
        err("failed to compile wasm module: " + str);
        if (str.includes("imported Memory") || str.includes("memory import")) {
          err(
            "Memory size incompatibility issues may be due to changing INITIAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set INITIAL_MEMORY at runtime to something smaller than it was at compile time)."
          );
        }
        throw e;
      }
      return [instance, module2];
    }
    function createWasm() {
      var info = { a: asmLibraryArg };
      function receiveInstance(instance, module2) {
        var exports3 = instance.exports;
        Module["asm"] = exports3;
        wasmMemory = Module["asm"]["g"];
        updateGlobalBufferAndViews(wasmMemory.buffer);
        wasmTable = Module["asm"]["W"];
        addOnInit(Module["asm"]["h"]);
        removeRunDependency();
      }
      addRunDependency();
      if (Module["instantiateWasm"]) {
        try {
          var exports2 = Module["instantiateWasm"](info, receiveInstance);
          return exports2;
        } catch (e) {
          err("Module.instantiateWasm callback failed with error: " + e);
          return false;
        }
      }
      var result = instantiateSync(wasmBinaryFile, info);
      receiveInstance(result[0]);
      return Module["asm"];
    }
    function LE_HEAP_LOAD_F32(byteOffset) {
      return HEAP_DATA_VIEW.getFloat32(byteOffset, true);
    }
    function LE_HEAP_LOAD_F64(byteOffset) {
      return HEAP_DATA_VIEW.getFloat64(byteOffset, true);
    }
    function LE_HEAP_LOAD_I16(byteOffset) {
      return HEAP_DATA_VIEW.getInt16(byteOffset, true);
    }
    function LE_HEAP_LOAD_I32(byteOffset) {
      return HEAP_DATA_VIEW.getInt32(byteOffset, true);
    }
    function LE_HEAP_STORE_I32(byteOffset, value) {
      HEAP_DATA_VIEW.setInt32(byteOffset, value, true);
    }
    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == "function") {
          callback(Module);
          continue;
        }
        var func = callback.func;
        if (typeof func === "number") {
          if (callback.arg === void 0) {
            wasmTable.get(func)();
          } else {
            wasmTable.get(func)(callback.arg);
          }
        } else {
          func(callback.arg === void 0 ? null : callback.arg);
        }
      }
    }
    function _gmtime_r(time, tmPtr) {
      var date = new Date(LE_HEAP_LOAD_I32((time >> 2) * 4) * 1e3);
      LE_HEAP_STORE_I32((tmPtr >> 2) * 4, date.getUTCSeconds());
      LE_HEAP_STORE_I32((tmPtr + 4 >> 2) * 4, date.getUTCMinutes());
      LE_HEAP_STORE_I32((tmPtr + 8 >> 2) * 4, date.getUTCHours());
      LE_HEAP_STORE_I32((tmPtr + 12 >> 2) * 4, date.getUTCDate());
      LE_HEAP_STORE_I32((tmPtr + 16 >> 2) * 4, date.getUTCMonth());
      LE_HEAP_STORE_I32((tmPtr + 20 >> 2) * 4, date.getUTCFullYear() - 1900);
      LE_HEAP_STORE_I32((tmPtr + 24 >> 2) * 4, date.getUTCDay());
      LE_HEAP_STORE_I32((tmPtr + 36 >> 2) * 4, 0);
      LE_HEAP_STORE_I32((tmPtr + 32 >> 2) * 4, 0);
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
      LE_HEAP_STORE_I32((tmPtr + 28 >> 2) * 4, yday);
      if (!_gmtime_r.GMTString) _gmtime_r.GMTString = allocateUTF8("GMT");
      LE_HEAP_STORE_I32((tmPtr + 40 >> 2) * 4, _gmtime_r.GMTString);
      return tmPtr;
    }
    function ___gmtime_r(a0, a1) {
      return _gmtime_r(a0, a1);
    }
    function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }
    function emscripten_realloc_buffer(size) {
      try {
        wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
        updateGlobalBufferAndViews(wasmMemory.buffer);
        return 1;
      } catch (e) {
      }
    }
    function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      var maxHeapSize = 2147483648;
      if (requestedSize > maxHeapSize) {
        return false;
      }
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(
          overGrownHeapSize,
          requestedSize + 100663296
        );
        var newSize = Math.min(
          maxHeapSize,
          alignUp(Math.max(requestedSize, overGrownHeapSize), 65536)
        );
        var replacement = emscripten_realloc_buffer(newSize);
        if (replacement) {
          return true;
        }
      }
      return false;
    }
    function _setTempRet0(val) {
    }
    function _time(ptr) {
      var ret = Date.now() / 1e3 | 0;
      if (ptr) {
        LE_HEAP_STORE_I32((ptr >> 2) * 4, ret);
      }
      return ret;
    }
    function _tzset() {
      if (_tzset.called) return;
      _tzset.called = true;
      var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
      LE_HEAP_STORE_I32((__get_timezone() >> 2) * 4, stdTimezoneOffset * 60);
      LE_HEAP_STORE_I32(
        (__get_daylight() >> 2) * 4,
        Number(winterOffset != summerOffset)
      );
      function extractZone(date) {
        var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
        return match ? match[1] : "GMT";
      }
      var winterName = extractZone(winter);
      var summerName = extractZone(summer);
      var winterNamePtr = allocateUTF8(winterName);
      var summerNamePtr = allocateUTF8(summerName);
      if (summerOffset < winterOffset) {
        LE_HEAP_STORE_I32((__get_tzname() >> 2) * 4, winterNamePtr);
        LE_HEAP_STORE_I32((__get_tzname() + 4 >> 2) * 4, summerNamePtr);
      } else {
        LE_HEAP_STORE_I32((__get_tzname() >> 2) * 4, summerNamePtr);
        LE_HEAP_STORE_I32((__get_tzname() + 4 >> 2) * 4, winterNamePtr);
      }
    }
    function _timegm(tmPtr) {
      _tzset();
      var time = Date.UTC(
        LE_HEAP_LOAD_I32((tmPtr + 20 >> 2) * 4) + 1900,
        LE_HEAP_LOAD_I32((tmPtr + 16 >> 2) * 4),
        LE_HEAP_LOAD_I32((tmPtr + 12 >> 2) * 4),
        LE_HEAP_LOAD_I32((tmPtr + 8 >> 2) * 4),
        LE_HEAP_LOAD_I32((tmPtr + 4 >> 2) * 4),
        LE_HEAP_LOAD_I32((tmPtr >> 2) * 4),
        0
      );
      var date = new Date(time);
      LE_HEAP_STORE_I32((tmPtr + 24 >> 2) * 4, date.getUTCDay());
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
      LE_HEAP_STORE_I32((tmPtr + 28 >> 2) * 4, yday);
      return date.getTime() / 1e3 | 0;
    }
    function intArrayFromBase64(s) {
      {
        var buf;
        try {
          buf = Buffer.from(s, "base64");
        } catch (_) {
          buf = new Buffer(s, "base64");
        }
        return new Uint8Array(
          buf["buffer"],
          buf["byteOffset"],
          buf["byteLength"]
        );
      }
    }
    function tryParseAsDataURI(filename) {
      if (!isDataURI(filename)) {
        return;
      }
      return intArrayFromBase64(filename.slice(dataURIPrefix.length));
    }
    var asmLibraryArg = {
      e: ___gmtime_r,
      c: _emscripten_memcpy_big,
      d: _emscripten_resize_heap,
      a: _setTempRet0,
      b: _time,
      f: _timegm
    };
    var asm = createWasm();
    Module["___wasm_call_ctors"] = asm["h"];
    Module["_zip_ext_count_symlinks"] = asm["i"];
    Module["_zip_file_get_external_attributes"] = asm["j"];
    Module["_zipstruct_statS"] = asm["k"];
    Module["_zipstruct_stat_size"] = asm["l"];
    Module["_zipstruct_stat_mtime"] = asm["m"];
    Module["_zipstruct_stat_crc"] = asm["n"];
    Module["_zipstruct_errorS"] = asm["o"];
    Module["_zipstruct_error_code_zip"] = asm["p"];
    Module["_zipstruct_stat_comp_size"] = asm["q"];
    Module["_zipstruct_stat_comp_method"] = asm["r"];
    Module["_zip_close"] = asm["s"];
    Module["_zip_delete"] = asm["t"];
    Module["_zip_dir_add"] = asm["u"];
    Module["_zip_discard"] = asm["v"];
    Module["_zip_error_init_with_code"] = asm["w"];
    Module["_zip_get_error"] = asm["x"];
    Module["_zip_file_get_error"] = asm["y"];
    Module["_zip_error_strerror"] = asm["z"];
    Module["_zip_fclose"] = asm["A"];
    Module["_zip_file_add"] = asm["B"];
    Module["_free"] = asm["C"];
    var _malloc = Module["_malloc"] = asm["D"];
    Module["_zip_source_error"] = asm["E"];
    Module["_zip_source_seek"] = asm["F"];
    Module["_zip_file_set_external_attributes"] = asm["G"];
    Module["_zip_file_set_mtime"] = asm["H"];
    Module["_zip_fopen_index"] = asm["I"];
    Module["_zip_fread"] = asm["J"];
    Module["_zip_get_name"] = asm["K"];
    Module["_zip_get_num_entries"] = asm["L"];
    Module["_zip_source_read"] = asm["M"];
    Module["_zip_name_locate"] = asm["N"];
    Module["_zip_open_from_source"] = asm["O"];
    Module["_zip_set_file_compression"] = asm["P"];
    Module["_zip_source_buffer"] = asm["Q"];
    Module["_zip_source_buffer_create"] = asm["R"];
    Module["_zip_source_close"] = asm["S"];
    Module["_zip_source_free"] = asm["T"];
    Module["_zip_source_keep"] = asm["U"];
    Module["_zip_source_open"] = asm["V"];
    Module["_zip_source_tell"] = asm["X"];
    Module["_zip_stat_index"] = asm["Y"];
    var __get_tzname = Module["__get_tzname"] = asm["Z"];
    var __get_daylight = Module["__get_daylight"] = asm["_"];
    var __get_timezone = Module["__get_timezone"] = asm["$"];
    var stackSave = Module["stackSave"] = asm["aa"];
    var stackRestore = Module["stackRestore"] = asm["ba"];
    var stackAlloc = Module["stackAlloc"] = asm["ca"];
    Module["cwrap"] = cwrap;
    Module["getValue"] = getValue;
    var calledRun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run();
      if (!calledRun) dependenciesFulfilled = runCaller;
    };
    function run(args) {
      if (runDependencies > 0) {
        return;
      }
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        if (calledRun) return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        readyPromiseResolve(Module);
        if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(function() {
          setTimeout(function() {
            Module["setStatus"]("");
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }
    Module["run"] = run;
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function")
        Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
      }
    }
    run();
    return createModule2;
  };
}();
module.exports = createModule;
}(libzipSync));

const createModule = libzipSync.exports;

const number64 = [
  `number`,
  // low
  `number`
  // high
];
var Errors = /* @__PURE__ */ ((Errors2) => {
  Errors2[Errors2["ZIP_ER_OK"] = 0] = "ZIP_ER_OK";
  Errors2[Errors2["ZIP_ER_MULTIDISK"] = 1] = "ZIP_ER_MULTIDISK";
  Errors2[Errors2["ZIP_ER_RENAME"] = 2] = "ZIP_ER_RENAME";
  Errors2[Errors2["ZIP_ER_CLOSE"] = 3] = "ZIP_ER_CLOSE";
  Errors2[Errors2["ZIP_ER_SEEK"] = 4] = "ZIP_ER_SEEK";
  Errors2[Errors2["ZIP_ER_READ"] = 5] = "ZIP_ER_READ";
  Errors2[Errors2["ZIP_ER_WRITE"] = 6] = "ZIP_ER_WRITE";
  Errors2[Errors2["ZIP_ER_CRC"] = 7] = "ZIP_ER_CRC";
  Errors2[Errors2["ZIP_ER_ZIPCLOSED"] = 8] = "ZIP_ER_ZIPCLOSED";
  Errors2[Errors2["ZIP_ER_NOENT"] = 9] = "ZIP_ER_NOENT";
  Errors2[Errors2["ZIP_ER_EXISTS"] = 10] = "ZIP_ER_EXISTS";
  Errors2[Errors2["ZIP_ER_OPEN"] = 11] = "ZIP_ER_OPEN";
  Errors2[Errors2["ZIP_ER_TMPOPEN"] = 12] = "ZIP_ER_TMPOPEN";
  Errors2[Errors2["ZIP_ER_ZLIB"] = 13] = "ZIP_ER_ZLIB";
  Errors2[Errors2["ZIP_ER_MEMORY"] = 14] = "ZIP_ER_MEMORY";
  Errors2[Errors2["ZIP_ER_CHANGED"] = 15] = "ZIP_ER_CHANGED";
  Errors2[Errors2["ZIP_ER_COMPNOTSUPP"] = 16] = "ZIP_ER_COMPNOTSUPP";
  Errors2[Errors2["ZIP_ER_EOF"] = 17] = "ZIP_ER_EOF";
  Errors2[Errors2["ZIP_ER_INVAL"] = 18] = "ZIP_ER_INVAL";
  Errors2[Errors2["ZIP_ER_NOZIP"] = 19] = "ZIP_ER_NOZIP";
  Errors2[Errors2["ZIP_ER_INTERNAL"] = 20] = "ZIP_ER_INTERNAL";
  Errors2[Errors2["ZIP_ER_INCONS"] = 21] = "ZIP_ER_INCONS";
  Errors2[Errors2["ZIP_ER_REMOVE"] = 22] = "ZIP_ER_REMOVE";
  Errors2[Errors2["ZIP_ER_DELETED"] = 23] = "ZIP_ER_DELETED";
  Errors2[Errors2["ZIP_ER_ENCRNOTSUPP"] = 24] = "ZIP_ER_ENCRNOTSUPP";
  Errors2[Errors2["ZIP_ER_RDONLY"] = 25] = "ZIP_ER_RDONLY";
  Errors2[Errors2["ZIP_ER_NOPASSWD"] = 26] = "ZIP_ER_NOPASSWD";
  Errors2[Errors2["ZIP_ER_WRONGPASSWD"] = 27] = "ZIP_ER_WRONGPASSWD";
  Errors2[Errors2["ZIP_ER_OPNOTSUPP"] = 28] = "ZIP_ER_OPNOTSUPP";
  Errors2[Errors2["ZIP_ER_INUSE"] = 29] = "ZIP_ER_INUSE";
  Errors2[Errors2["ZIP_ER_TELL"] = 30] = "ZIP_ER_TELL";
  Errors2[Errors2["ZIP_ER_COMPRESSED_DATA"] = 31] = "ZIP_ER_COMPRESSED_DATA";
  return Errors2;
})(Errors || {});
const makeInterface = (emZip) => ({
  // Those are getters because they can change after memory growth
  get HEAPU8() {
    return emZip.HEAPU8;
  },
  errors: Errors,
  SEEK_SET: 0,
  SEEK_CUR: 1,
  SEEK_END: 2,
  ZIP_CHECKCONS: 4,
  ZIP_EXCL: 2,
  ZIP_RDONLY: 16,
  ZIP_FL_OVERWRITE: 8192,
  ZIP_FL_COMPRESSED: 4,
  ZIP_OPSYS_DOS: 0,
  ZIP_OPSYS_AMIGA: 1,
  ZIP_OPSYS_OPENVMS: 2,
  ZIP_OPSYS_UNIX: 3,
  ZIP_OPSYS_VM_CMS: 4,
  ZIP_OPSYS_ATARI_ST: 5,
  ZIP_OPSYS_OS_2: 6,
  ZIP_OPSYS_MACINTOSH: 7,
  ZIP_OPSYS_Z_SYSTEM: 8,
  ZIP_OPSYS_CPM: 9,
  ZIP_OPSYS_WINDOWS_NTFS: 10,
  ZIP_OPSYS_MVS: 11,
  ZIP_OPSYS_VSE: 12,
  ZIP_OPSYS_ACORN_RISC: 13,
  ZIP_OPSYS_VFAT: 14,
  ZIP_OPSYS_ALTERNATE_MVS: 15,
  ZIP_OPSYS_BEOS: 16,
  ZIP_OPSYS_TANDEM: 17,
  ZIP_OPSYS_OS_400: 18,
  ZIP_OPSYS_OS_X: 19,
  ZIP_CM_DEFAULT: -1,
  ZIP_CM_STORE: 0,
  ZIP_CM_DEFLATE: 8,
  uint08S: emZip._malloc(1),
  uint32S: emZip._malloc(4),
  malloc: emZip._malloc,
  free: emZip._free,
  getValue: emZip.getValue,
  openFromSource: emZip.cwrap(`zip_open_from_source`, `number`, [`number`, `number`, `number`]),
  close: emZip.cwrap(`zip_close`, `number`, [`number`]),
  discard: emZip.cwrap(`zip_discard`, null, [`number`]),
  getError: emZip.cwrap(`zip_get_error`, `number`, [`number`]),
  getName: emZip.cwrap(`zip_get_name`, `string`, [`number`, `number`, `number`]),
  getNumEntries: emZip.cwrap(`zip_get_num_entries`, `number`, [`number`, `number`]),
  delete: emZip.cwrap(`zip_delete`, `number`, [`number`, `number`]),
  statIndex: emZip.cwrap(`zip_stat_index`, `number`, [`number`, ...number64, `number`, `number`]),
  fopenIndex: emZip.cwrap(`zip_fopen_index`, `number`, [`number`, ...number64, `number`]),
  fread: emZip.cwrap(`zip_fread`, `number`, [`number`, `number`, `number`, `number`]),
  fclose: emZip.cwrap(`zip_fclose`, `number`, [`number`]),
  dir: {
    add: emZip.cwrap(`zip_dir_add`, `number`, [`number`, `string`])
  },
  file: {
    add: emZip.cwrap(`zip_file_add`, `number`, [`number`, `string`, `number`, `number`]),
    getError: emZip.cwrap(`zip_file_get_error`, `number`, [`number`]),
    getExternalAttributes: emZip.cwrap(`zip_file_get_external_attributes`, `number`, [`number`, ...number64, `number`, `number`, `number`]),
    setExternalAttributes: emZip.cwrap(`zip_file_set_external_attributes`, `number`, [`number`, ...number64, `number`, `number`, `number`]),
    setMtime: emZip.cwrap(`zip_file_set_mtime`, `number`, [`number`, ...number64, `number`, `number`]),
    setCompression: emZip.cwrap(`zip_set_file_compression`, `number`, [`number`, ...number64, `number`, `number`])
  },
  ext: {
    countSymlinks: emZip.cwrap(`zip_ext_count_symlinks`, `number`, [`number`])
  },
  error: {
    initWithCode: emZip.cwrap(`zip_error_init_with_code`, null, [`number`, `number`]),
    strerror: emZip.cwrap(`zip_error_strerror`, `string`, [`number`])
  },
  name: {
    locate: emZip.cwrap(`zip_name_locate`, `number`, [`number`, `string`, `number`])
  },
  source: {
    fromUnattachedBuffer: emZip.cwrap(`zip_source_buffer_create`, `number`, [`number`, ...number64, `number`, `number`]),
    fromBuffer: emZip.cwrap(`zip_source_buffer`, `number`, [`number`, `number`, ...number64, `number`]),
    free: emZip.cwrap(`zip_source_free`, null, [`number`]),
    keep: emZip.cwrap(`zip_source_keep`, null, [`number`]),
    open: emZip.cwrap(`zip_source_open`, `number`, [`number`]),
    close: emZip.cwrap(`zip_source_close`, `number`, [`number`]),
    seek: emZip.cwrap(`zip_source_seek`, `number`, [`number`, ...number64, `number`]),
    tell: emZip.cwrap(`zip_source_tell`, `number`, [`number`]),
    read: emZip.cwrap(`zip_source_read`, `number`, [`number`, `number`, `number`]),
    error: emZip.cwrap(`zip_source_error`, `number`, [`number`])
  },
  struct: {
    statS: emZip.cwrap(`zipstruct_statS`, `number`, []),
    statSize: emZip.cwrap(`zipstruct_stat_size`, `number`, [`number`]),
    statCompSize: emZip.cwrap(`zipstruct_stat_comp_size`, `number`, [`number`]),
    statCompMethod: emZip.cwrap(`zipstruct_stat_comp_method`, `number`, [`number`]),
    statMtime: emZip.cwrap(`zipstruct_stat_mtime`, `number`, [`number`]),
    statCrc: emZip.cwrap(`zipstruct_stat_crc`, `number`, [`number`]),
    errorS: emZip.cwrap(`zipstruct_errorS`, `number`, []),
    errorCodeZip: emZip.cwrap(`zipstruct_error_code_zip`, `number`, [`number`])
  }
});

function getArchivePart(path, extension) {
  let idx = path.indexOf(extension);
  if (idx <= 0)
    return null;
  let nextCharIdx = idx;
  while (idx >= 0) {
    nextCharIdx = idx + extension.length;
    if (path[nextCharIdx] === ppath.sep)
      break;
    if (path[idx - 1] === ppath.sep)
      return null;
    idx = path.indexOf(extension, nextCharIdx);
  }
  if (path.length > nextCharIdx && path[nextCharIdx] !== ppath.sep)
    return null;
  return path.slice(0, nextCharIdx);
}
class ZipOpenFS extends MountFS {
  static async openPromise(fn, opts) {
    const zipOpenFs = new ZipOpenFS(opts);
    try {
      return await fn(zipOpenFs);
    } finally {
      zipOpenFs.saveAndClose();
    }
  }
  constructor(opts = {}) {
    const fileExtensions = opts.fileExtensions;
    const readOnlyArchives = opts.readOnlyArchives;
    const getMountPoint = typeof fileExtensions === `undefined` ? (path) => getArchivePart(path, `.zip`) : (path) => {
      for (const extension of fileExtensions) {
        const result = getArchivePart(path, extension);
        if (result) {
          return result;
        }
      }
      return null;
    };
    const factorySync = (baseFs, p) => {
      return new ZipFS(p, {
        baseFs,
        readOnly: readOnlyArchives,
        stats: baseFs.statSync(p)
      });
    };
    const factoryPromise = async (baseFs, p) => {
      const zipOptions = {
        baseFs,
        readOnly: readOnlyArchives,
        stats: await baseFs.statPromise(p)
      };
      return () => {
        return new ZipFS(p, zipOptions);
      };
    };
    super({
      ...opts,
      factorySync,
      factoryPromise,
      getMountPoint
    });
  }
}

const DEFAULT_COMPRESSION_LEVEL = `mixed`;
function toUnixTimestamp(time) {
  if (typeof time === `string` && String(+time) === time)
    return +time;
  if (typeof time === `number` && Number.isFinite(time)) {
    if (time < 0) {
      return Date.now() / 1e3;
    } else {
      return time;
    }
  }
  if (nodeUtils.types.isDate(time))
    return time.getTime() / 1e3;
  throw new Error(`Invalid time`);
}
function makeEmptyArchive() {
  return Buffer.from([
    80,
    75,
    5,
    6,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);
}
class LibzipError extends Error {
  code;
  constructor(message, code) {
    super(message);
    this.name = `Libzip Error`;
    this.code = code;
  }
}
class ZipFS extends BasePortableFakeFS {
  libzip;
  baseFs;
  path;
  stats;
  zip;
  lzSource;
  level;
  listings = /* @__PURE__ */ new Map();
  entries = /* @__PURE__ */ new Map();
  /**
   * A cache of indices mapped to file sources.
   * Populated by `setFileSource` calls.
   * Required for supporting read after write.
   */
  fileSources = /* @__PURE__ */ new Map();
  symlinkCount;
  fds = /* @__PURE__ */ new Map();
  nextFd = 0;
  ready = false;
  readOnly = false;
  constructor(source, opts = {}) {
    super();
    const pathOptions = opts;
    this.level = typeof pathOptions.level !== `undefined` ? pathOptions.level : DEFAULT_COMPRESSION_LEVEL;
    source ??= makeEmptyArchive();
    if (typeof source === `string`) {
      const { baseFs = new NodeFS() } = pathOptions;
      this.baseFs = baseFs;
      this.path = source;
    } else {
      this.path = null;
      this.baseFs = null;
    }
    if (opts.stats) {
      this.stats = opts.stats;
    } else {
      if (typeof source === `string`) {
        try {
          this.stats = this.baseFs.statSync(source);
        } catch (error) {
          if (error.code === `ENOENT` && pathOptions.create) {
            this.stats = makeDefaultStats();
          } else {
            throw error;
          }
        }
      } else {
        this.stats = makeDefaultStats();
      }
    }
    this.libzip = getInstance();
    const errPtr = this.libzip.malloc(4);
    try {
      let flags = 0;
      if (opts.readOnly) {
        flags |= this.libzip.ZIP_RDONLY;
        this.readOnly = true;
      }
      if (typeof source === `string`)
        source = pathOptions.create ? makeEmptyArchive() : this.baseFs.readFileSync(source);
      const lzSource = this.allocateUnattachedSource(source);
      try {
        this.zip = this.libzip.openFromSource(lzSource, flags, errPtr);
        this.lzSource = lzSource;
      } catch (error) {
        this.libzip.source.free(lzSource);
        throw error;
      }
      if (this.zip === 0) {
        const error = this.libzip.struct.errorS();
        this.libzip.error.initWithCode(error, this.libzip.getValue(errPtr, `i32`));
        throw this.makeLibzipError(error);
      }
    } finally {
      this.libzip.free(errPtr);
    }
    this.listings.set(PortablePath.root, /* @__PURE__ */ new Set());
    const entryCount = this.libzip.getNumEntries(this.zip, 0);
    for (let t = 0; t < entryCount; ++t) {
      const raw = this.libzip.getName(this.zip, t, 0);
      if (ppath.isAbsolute(raw))
        continue;
      const p = ppath.resolve(PortablePath.root, raw);
      this.registerEntry(p, t);
      if (raw.endsWith(`/`)) {
        this.registerListing(p);
      }
    }
    this.symlinkCount = this.libzip.ext.countSymlinks(this.zip);
    if (this.symlinkCount === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    this.ready = true;
  }
  makeLibzipError(error) {
    const errorCode = this.libzip.struct.errorCodeZip(error);
    const strerror = this.libzip.error.strerror(error);
    const libzipError = new LibzipError(strerror, this.libzip.errors[errorCode]);
    if (errorCode === this.libzip.errors.ZIP_ER_CHANGED)
      throw new Error(`Assertion failed: Unexpected libzip error: ${libzipError.message}`);
    return libzipError;
  }
  getExtractHint(hints) {
    for (const fileName of this.entries.keys()) {
      const ext = this.pathUtils.extname(fileName);
      if (hints.relevantExtensions.has(ext)) {
        return true;
      }
    }
    return false;
  }
  getAllFiles() {
    return Array.from(this.entries.keys());
  }
  getRealPath() {
    if (!this.path)
      throw new Error(`ZipFS don't have real paths when loaded from a buffer`);
    return this.path;
  }
  prepareClose() {
    if (!this.ready)
      throw EBUSY(`archive closed, close`);
    unwatchAllFiles(this);
  }
  getBufferAndClose() {
    this.prepareClose();
    if (this.entries.size === 0) {
      this.discardAndClose();
      return makeEmptyArchive();
    }
    try {
      this.libzip.source.keep(this.lzSource);
      if (this.libzip.close(this.zip) === -1)
        throw this.makeLibzipError(this.libzip.getError(this.zip));
      if (this.libzip.source.open(this.lzSource) === -1)
        throw this.makeLibzipError(this.libzip.source.error(this.lzSource));
      if (this.libzip.source.seek(this.lzSource, 0, 0, this.libzip.SEEK_END) === -1)
        throw this.makeLibzipError(this.libzip.source.error(this.lzSource));
      const size = this.libzip.source.tell(this.lzSource);
      if (size === -1)
        throw this.makeLibzipError(this.libzip.source.error(this.lzSource));
      if (this.libzip.source.seek(this.lzSource, 0, 0, this.libzip.SEEK_SET) === -1)
        throw this.makeLibzipError(this.libzip.source.error(this.lzSource));
      const buffer = this.libzip.malloc(size);
      if (!buffer)
        throw new Error(`Couldn't allocate enough memory`);
      try {
        const rc = this.libzip.source.read(this.lzSource, buffer, size);
        if (rc === -1)
          throw this.makeLibzipError(this.libzip.source.error(this.lzSource));
        else if (rc < size)
          throw new Error(`Incomplete read`);
        else if (rc > size)
          throw new Error(`Overread`);
        let result = Buffer.from(this.libzip.HEAPU8.subarray(buffer, buffer + size));
        if (process.env.YARN_IS_TEST_ENV && process.env.YARN_ZIP_DATA_EPILOGUE)
          result = Buffer.concat([result, Buffer.from(process.env.YARN_ZIP_DATA_EPILOGUE)]);
        return result;
      } finally {
        this.libzip.free(buffer);
      }
    } finally {
      this.libzip.source.close(this.lzSource);
      this.libzip.source.free(this.lzSource);
      this.ready = false;
    }
  }
  discardAndClose() {
    this.prepareClose();
    this.libzip.discard(this.zip);
    this.ready = false;
  }
  saveAndClose() {
    if (!this.path || !this.baseFs)
      throw new Error(`ZipFS cannot be saved and must be discarded when loaded from a buffer`);
    if (this.readOnly) {
      this.discardAndClose();
      return;
    }
    const newMode = this.baseFs.existsSync(this.path) || this.stats.mode === DEFAULT_MODE ? void 0 : this.stats.mode;
    this.baseFs.writeFileSync(this.path, this.getBufferAndClose(), { mode: newMode });
    this.ready = false;
  }
  resolve(p) {
    return ppath.resolve(PortablePath.root, p);
  }
  async openPromise(p, flags, mode) {
    return this.openSync(p, flags, mode);
  }
  openSync(p, flags, mode) {
    const fd = this.nextFd++;
    this.fds.set(fd, { cursor: 0, p });
    return fd;
  }
  hasOpenFileHandles() {
    return !!this.fds.size;
  }
  async opendirPromise(p, opts) {
    return this.opendirSync(p, opts);
  }
  opendirSync(p, opts = {}) {
    const resolvedP = this.resolveFilename(`opendir '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`opendir '${p}'`);
    const directoryListing = this.listings.get(resolvedP);
    if (!directoryListing)
      throw ENOTDIR(`opendir '${p}'`);
    const entries = [...directoryListing];
    const fd = this.openSync(resolvedP, `r`);
    const onClose = () => {
      this.closeSync(fd);
    };
    return opendir(this, resolvedP, entries, { onClose });
  }
  async readPromise(fd, buffer, offset, length, position) {
    return this.readSync(fd, buffer, offset, length, position);
  }
  readSync(fd, buffer, offset = 0, length = buffer.byteLength, position = -1) {
    const entry = this.fds.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`read`);
    const realPosition = position === -1 || position === null ? entry.cursor : position;
    const source = this.readFileSync(entry.p);
    source.copy(buffer, offset, realPosition, realPosition + length);
    const bytesRead = Math.max(0, Math.min(source.length - realPosition, length));
    if (position === -1 || position === null)
      entry.cursor += bytesRead;
    return bytesRead;
  }
  async writePromise(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return this.writeSync(fd, buffer, position);
    } else {
      return this.writeSync(fd, buffer, offset, length, position);
    }
  }
  writeSync(fd, buffer, offset, length, position) {
    const entry = this.fds.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`read`);
    throw new Error(`Unimplemented`);
  }
  async closePromise(fd) {
    return this.closeSync(fd);
  }
  closeSync(fd) {
    const entry = this.fds.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`read`);
    this.fds.delete(fd);
  }
  createReadStream(p, { encoding } = {}) {
    if (p === null)
      throw new Error(`Unimplemented`);
    const fd = this.openSync(p, `r`);
    const stream$1 = Object.assign(
      new stream.PassThrough({
        emitClose: true,
        autoDestroy: true,
        destroy: (error, callback) => {
          clearImmediate(immediate);
          this.closeSync(fd);
          callback(error);
        }
      }),
      {
        close() {
          stream$1.destroy();
        },
        bytesRead: 0,
        path: p,
        // "This property is `true` if the underlying file has not been opened yet"
        pending: false
      }
    );
    const immediate = setImmediate(async () => {
      try {
        const data = await this.readFilePromise(p, encoding);
        stream$1.bytesRead = data.length;
        stream$1.end(data);
      } catch (error) {
        stream$1.destroy(error);
      }
    });
    return stream$1;
  }
  createWriteStream(p, { encoding } = {}) {
    if (this.readOnly)
      throw EROFS(`open '${p}'`);
    if (p === null)
      throw new Error(`Unimplemented`);
    const chunks = [];
    const fd = this.openSync(p, `w`);
    const stream$1 = Object.assign(
      new stream.PassThrough({
        autoDestroy: true,
        emitClose: true,
        destroy: (error, callback) => {
          try {
            if (error) {
              callback(error);
            } else {
              this.writeFileSync(p, Buffer.concat(chunks), encoding);
              callback(null);
            }
          } catch (err) {
            callback(err);
          } finally {
            this.closeSync(fd);
          }
        }
      }),
      {
        close() {
          stream$1.destroy();
        },
        bytesWritten: 0,
        path: p,
        // "This property is `true` if the underlying file has not been opened yet"
        pending: false
      }
    );
    stream$1.on(`data`, (chunk) => {
      const chunkBuffer = Buffer.from(chunk);
      stream$1.bytesWritten += chunkBuffer.length;
      chunks.push(chunkBuffer);
    });
    return stream$1;
  }
  async realpathPromise(p) {
    return this.realpathSync(p);
  }
  realpathSync(p) {
    const resolvedP = this.resolveFilename(`lstat '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`lstat '${p}'`);
    return resolvedP;
  }
  async existsPromise(p) {
    return this.existsSync(p);
  }
  existsSync(p) {
    if (!this.ready)
      throw EBUSY(`archive closed, existsSync '${p}'`);
    if (this.symlinkCount === 0) {
      const resolvedP2 = ppath.resolve(PortablePath.root, p);
      return this.entries.has(resolvedP2) || this.listings.has(resolvedP2);
    }
    let resolvedP;
    try {
      resolvedP = this.resolveFilename(`stat '${p}'`, p, void 0, false);
    } catch (error) {
      return false;
    }
    if (resolvedP === void 0)
      return false;
    return this.entries.has(resolvedP) || this.listings.has(resolvedP);
  }
  async accessPromise(p, mode) {
    return this.accessSync(p, mode);
  }
  accessSync(p, mode = fs.constants.F_OK) {
    const resolvedP = this.resolveFilename(`access '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`access '${p}'`);
    if (this.readOnly && mode & fs.constants.W_OK) {
      throw EROFS(`access '${p}'`);
    }
  }
  async statPromise(p, opts = { bigint: false }) {
    if (opts.bigint)
      return this.statSync(p, { bigint: true });
    return this.statSync(p);
  }
  statSync(p, opts = { bigint: false, throwIfNoEntry: true }) {
    const resolvedP = this.resolveFilename(`stat '${p}'`, p, void 0, opts.throwIfNoEntry);
    if (resolvedP === void 0)
      return void 0;
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP)) {
      if (opts.throwIfNoEntry === false)
        return void 0;
      throw ENOENT(`stat '${p}'`);
    }
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
      throw ENOTDIR(`stat '${p}'`);
    return this.statImpl(`stat '${p}'`, resolvedP, opts);
  }
  async fstatPromise(fd, opts) {
    return this.fstatSync(fd, opts);
  }
  fstatSync(fd, opts) {
    const entry = this.fds.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fstatSync`);
    const { p } = entry;
    const resolvedP = this.resolveFilename(`stat '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`stat '${p}'`);
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
      throw ENOTDIR(`stat '${p}'`);
    return this.statImpl(`fstat '${p}'`, resolvedP, opts);
  }
  async lstatPromise(p, opts = { bigint: false }) {
    if (opts.bigint)
      return this.lstatSync(p, { bigint: true });
    return this.lstatSync(p);
  }
  lstatSync(p, opts = { bigint: false, throwIfNoEntry: true }) {
    const resolvedP = this.resolveFilename(`lstat '${p}'`, p, false, opts.throwIfNoEntry);
    if (resolvedP === void 0)
      return void 0;
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP)) {
      if (opts.throwIfNoEntry === false)
        return void 0;
      throw ENOENT(`lstat '${p}'`);
    }
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
      throw ENOTDIR(`lstat '${p}'`);
    return this.statImpl(`lstat '${p}'`, resolvedP, opts);
  }
  statImpl(reason, p, opts = {}) {
    const entry = this.entries.get(p);
    if (typeof entry !== `undefined`) {
      const stat = this.libzip.struct.statS();
      const rc = this.libzip.statIndex(this.zip, entry, 0, 0, stat);
      if (rc === -1)
        throw this.makeLibzipError(this.libzip.getError(this.zip));
      const uid = this.stats.uid;
      const gid = this.stats.gid;
      const size = this.libzip.struct.statSize(stat) >>> 0;
      const blksize = 512;
      const blocks = Math.ceil(size / blksize);
      const mtimeMs = (this.libzip.struct.statMtime(stat) >>> 0) * 1e3;
      const atimeMs = mtimeMs;
      const birthtimeMs = mtimeMs;
      const ctimeMs = mtimeMs;
      const atime = new Date(atimeMs);
      const birthtime = new Date(birthtimeMs);
      const ctime = new Date(ctimeMs);
      const mtime = new Date(mtimeMs);
      const type = this.listings.has(p) ? fs.constants.S_IFDIR : this.isSymbolicLink(entry) ? fs.constants.S_IFLNK : fs.constants.S_IFREG;
      const defaultMode = type === fs.constants.S_IFDIR ? 493 : 420;
      const mode = type | this.getUnixMode(entry, defaultMode) & 511;
      const crc = this.libzip.struct.statCrc(stat);
      const statInstance = Object.assign(new StatEntry(), { uid, gid, size, blksize, blocks, atime, birthtime, ctime, mtime, atimeMs, birthtimeMs, ctimeMs, mtimeMs, mode, crc });
      return opts.bigint === true ? convertToBigIntStats(statInstance) : statInstance;
    }
    if (this.listings.has(p)) {
      const uid = this.stats.uid;
      const gid = this.stats.gid;
      const size = 0;
      const blksize = 512;
      const blocks = 0;
      const atimeMs = this.stats.mtimeMs;
      const birthtimeMs = this.stats.mtimeMs;
      const ctimeMs = this.stats.mtimeMs;
      const mtimeMs = this.stats.mtimeMs;
      const atime = new Date(atimeMs);
      const birthtime = new Date(birthtimeMs);
      const ctime = new Date(ctimeMs);
      const mtime = new Date(mtimeMs);
      const mode = fs.constants.S_IFDIR | 493;
      const crc = 0;
      const statInstance = Object.assign(new StatEntry(), { uid, gid, size, blksize, blocks, atime, birthtime, ctime, mtime, atimeMs, birthtimeMs, ctimeMs, mtimeMs, mode, crc });
      return opts.bigint === true ? convertToBigIntStats(statInstance) : statInstance;
    }
    throw new Error(`Unreachable`);
  }
  getUnixMode(index, defaultMode) {
    const rc = this.libzip.file.getExternalAttributes(this.zip, index, 0, 0, this.libzip.uint08S, this.libzip.uint32S);
    if (rc === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    const opsys = this.libzip.getValue(this.libzip.uint08S, `i8`) >>> 0;
    if (opsys !== this.libzip.ZIP_OPSYS_UNIX)
      return defaultMode;
    return this.libzip.getValue(this.libzip.uint32S, `i32`) >>> 16;
  }
  registerListing(p) {
    const existingListing = this.listings.get(p);
    if (existingListing)
      return existingListing;
    const parentListing = this.registerListing(ppath.dirname(p));
    parentListing.add(ppath.basename(p));
    const newListing = /* @__PURE__ */ new Set();
    this.listings.set(p, newListing);
    return newListing;
  }
  registerEntry(p, index) {
    const parentListing = this.registerListing(ppath.dirname(p));
    parentListing.add(ppath.basename(p));
    this.entries.set(p, index);
  }
  unregisterListing(p) {
    this.listings.delete(p);
    const parentListing = this.listings.get(ppath.dirname(p));
    parentListing?.delete(ppath.basename(p));
  }
  unregisterEntry(p) {
    this.unregisterListing(p);
    const entry = this.entries.get(p);
    this.entries.delete(p);
    if (typeof entry === `undefined`)
      return;
    this.fileSources.delete(entry);
    if (this.isSymbolicLink(entry)) {
      this.symlinkCount--;
    }
  }
  deleteEntry(p, index) {
    this.unregisterEntry(p);
    const rc = this.libzip.delete(this.zip, index);
    if (rc === -1) {
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    }
  }
  resolveFilename(reason, p, resolveLastComponent = true, throwIfNoEntry = true) {
    if (!this.ready)
      throw EBUSY(`archive closed, ${reason}`);
    let resolvedP = ppath.resolve(PortablePath.root, p);
    if (resolvedP === `/`)
      return PortablePath.root;
    const fileIndex = this.entries.get(resolvedP);
    if (resolveLastComponent && fileIndex !== void 0) {
      if (this.symlinkCount !== 0 && this.isSymbolicLink(fileIndex)) {
        const target = this.getFileSource(fileIndex).toString();
        return this.resolveFilename(reason, ppath.resolve(ppath.dirname(resolvedP), target), true, throwIfNoEntry);
      } else {
        return resolvedP;
      }
    }
    while (true) {
      const parentP = this.resolveFilename(reason, ppath.dirname(resolvedP), true, throwIfNoEntry);
      if (parentP === void 0)
        return parentP;
      const isDir = this.listings.has(parentP);
      const doesExist = this.entries.has(parentP);
      if (!isDir && !doesExist) {
        if (throwIfNoEntry === false)
          return void 0;
        throw ENOENT(reason);
      }
      if (!isDir)
        throw ENOTDIR(reason);
      resolvedP = ppath.resolve(parentP, ppath.basename(resolvedP));
      if (!resolveLastComponent || this.symlinkCount === 0)
        break;
      const index = this.libzip.name.locate(this.zip, resolvedP.slice(1), 0);
      if (index === -1)
        break;
      if (this.isSymbolicLink(index)) {
        const target = this.getFileSource(index).toString();
        resolvedP = ppath.resolve(ppath.dirname(resolvedP), target);
      } else {
        break;
      }
    }
    return resolvedP;
  }
  allocateBuffer(content) {
    if (!Buffer.isBuffer(content))
      content = Buffer.from(content);
    const buffer = this.libzip.malloc(content.byteLength);
    if (!buffer)
      throw new Error(`Couldn't allocate enough memory`);
    const heap = new Uint8Array(this.libzip.HEAPU8.buffer, buffer, content.byteLength);
    heap.set(content);
    return { buffer, byteLength: content.byteLength };
  }
  allocateUnattachedSource(content) {
    const error = this.libzip.struct.errorS();
    const { buffer, byteLength } = this.allocateBuffer(content);
    const source = this.libzip.source.fromUnattachedBuffer(buffer, byteLength, 0, 1, error);
    if (source === 0) {
      this.libzip.free(error);
      throw this.makeLibzipError(error);
    }
    return source;
  }
  allocateSource(content) {
    const { buffer, byteLength } = this.allocateBuffer(content);
    const source = this.libzip.source.fromBuffer(this.zip, buffer, byteLength, 0, 1);
    if (source === 0) {
      this.libzip.free(buffer);
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    }
    return source;
  }
  setFileSource(p, content) {
    const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content);
    const target = ppath.relative(PortablePath.root, p);
    const lzSource = this.allocateSource(content);
    try {
      const newIndex = this.libzip.file.add(this.zip, target, lzSource, this.libzip.ZIP_FL_OVERWRITE);
      if (newIndex === -1)
        throw this.makeLibzipError(this.libzip.getError(this.zip));
      if (this.level !== `mixed`) {
        const method = this.level === 0 ? this.libzip.ZIP_CM_STORE : this.libzip.ZIP_CM_DEFLATE;
        const rc = this.libzip.file.setCompression(this.zip, newIndex, 0, method, this.level);
        if (rc === -1) {
          throw this.makeLibzipError(this.libzip.getError(this.zip));
        }
      }
      this.fileSources.set(newIndex, buffer);
      return newIndex;
    } catch (error) {
      this.libzip.source.free(lzSource);
      throw error;
    }
  }
  isSymbolicLink(index) {
    if (this.symlinkCount === 0)
      return false;
    const attrs = this.libzip.file.getExternalAttributes(this.zip, index, 0, 0, this.libzip.uint08S, this.libzip.uint32S);
    if (attrs === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    const opsys = this.libzip.getValue(this.libzip.uint08S, `i8`) >>> 0;
    if (opsys !== this.libzip.ZIP_OPSYS_UNIX)
      return false;
    const attributes = this.libzip.getValue(this.libzip.uint32S, `i32`) >>> 16;
    return (attributes & fs.constants.S_IFMT) === fs.constants.S_IFLNK;
  }
  getFileSource(index, opts = { asyncDecompress: false }) {
    const cachedFileSource = this.fileSources.get(index);
    if (typeof cachedFileSource !== `undefined`)
      return cachedFileSource;
    const stat = this.libzip.struct.statS();
    const rc = this.libzip.statIndex(this.zip, index, 0, 0, stat);
    if (rc === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    const size = this.libzip.struct.statCompSize(stat);
    const compressionMethod = this.libzip.struct.statCompMethod(stat);
    const buffer = this.libzip.malloc(size);
    try {
      const file = this.libzip.fopenIndex(this.zip, index, 0, this.libzip.ZIP_FL_COMPRESSED);
      if (file === 0)
        throw this.makeLibzipError(this.libzip.getError(this.zip));
      try {
        const rc2 = this.libzip.fread(file, buffer, size, 0);
        if (rc2 === -1)
          throw this.makeLibzipError(this.libzip.file.getError(file));
        else if (rc2 < size)
          throw new Error(`Incomplete read`);
        else if (rc2 > size)
          throw new Error(`Overread`);
        const memory = this.libzip.HEAPU8.subarray(buffer, buffer + size);
        const data = Buffer.from(memory);
        if (compressionMethod === 0) {
          this.fileSources.set(index, data);
          return data;
        } else if (opts.asyncDecompress) {
          return new Promise((resolve, reject) => {
            zlib__default.default.inflateRaw(data, (error, result) => {
              if (error) {
                reject(error);
              } else {
                this.fileSources.set(index, result);
                resolve(result);
              }
            });
          });
        } else {
          const decompressedData = zlib__default.default.inflateRawSync(data);
          this.fileSources.set(index, decompressedData);
          return decompressedData;
        }
      } finally {
        this.libzip.fclose(file);
      }
    } finally {
      this.libzip.free(buffer);
    }
  }
  async fchmodPromise(fd, mask) {
    return this.chmodPromise(this.fdToPath(fd, `fchmod`), mask);
  }
  fchmodSync(fd, mask) {
    return this.chmodSync(this.fdToPath(fd, `fchmodSync`), mask);
  }
  async chmodPromise(p, mask) {
    return this.chmodSync(p, mask);
  }
  chmodSync(p, mask) {
    if (this.readOnly)
      throw EROFS(`chmod '${p}'`);
    mask &= 493;
    const resolvedP = this.resolveFilename(`chmod '${p}'`, p, false);
    const entry = this.entries.get(resolvedP);
    if (typeof entry === `undefined`)
      throw new Error(`Assertion failed: The entry should have been registered (${resolvedP})`);
    const oldMod = this.getUnixMode(entry, fs.constants.S_IFREG | 0);
    const newMod = oldMod & ~511 | mask;
    const rc = this.libzip.file.setExternalAttributes(this.zip, entry, 0, 0, this.libzip.ZIP_OPSYS_UNIX, newMod << 16);
    if (rc === -1) {
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    }
  }
  async fchownPromise(fd, uid, gid) {
    return this.chownPromise(this.fdToPath(fd, `fchown`), uid, gid);
  }
  fchownSync(fd, uid, gid) {
    return this.chownSync(this.fdToPath(fd, `fchownSync`), uid, gid);
  }
  async chownPromise(p, uid, gid) {
    return this.chownSync(p, uid, gid);
  }
  chownSync(p, uid, gid) {
    throw new Error(`Unimplemented`);
  }
  async renamePromise(oldP, newP) {
    return this.renameSync(oldP, newP);
  }
  renameSync(oldP, newP) {
    throw new Error(`Unimplemented`);
  }
  async copyFilePromise(sourceP, destP, flags) {
    const { indexSource, indexDest, resolvedDestP } = this.prepareCopyFile(sourceP, destP, flags);
    const source = await this.getFileSource(indexSource, { asyncDecompress: true });
    const newIndex = this.setFileSource(resolvedDestP, source);
    if (newIndex !== indexDest) {
      this.registerEntry(resolvedDestP, newIndex);
    }
  }
  copyFileSync(sourceP, destP, flags = 0) {
    const { indexSource, indexDest, resolvedDestP } = this.prepareCopyFile(sourceP, destP, flags);
    const source = this.getFileSource(indexSource);
    const newIndex = this.setFileSource(resolvedDestP, source);
    if (newIndex !== indexDest) {
      this.registerEntry(resolvedDestP, newIndex);
    }
  }
  prepareCopyFile(sourceP, destP, flags = 0) {
    if (this.readOnly)
      throw EROFS(`copyfile '${sourceP} -> '${destP}'`);
    if ((flags & fs.constants.COPYFILE_FICLONE_FORCE) !== 0)
      throw ENOSYS(`unsupported clone operation`, `copyfile '${sourceP}' -> ${destP}'`);
    const resolvedSourceP = this.resolveFilename(`copyfile '${sourceP} -> ${destP}'`, sourceP);
    const indexSource = this.entries.get(resolvedSourceP);
    if (typeof indexSource === `undefined`)
      throw EINVAL(`copyfile '${sourceP}' -> '${destP}'`);
    const resolvedDestP = this.resolveFilename(`copyfile '${sourceP}' -> ${destP}'`, destP);
    const indexDest = this.entries.get(resolvedDestP);
    if ((flags & (fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE_FORCE)) !== 0 && typeof indexDest !== `undefined`)
      throw EEXIST(`copyfile '${sourceP}' -> '${destP}'`);
    return {
      indexSource,
      resolvedDestP,
      indexDest
    };
  }
  async appendFilePromise(p, content, opts) {
    if (this.readOnly)
      throw EROFS(`open '${p}'`);
    if (typeof opts === `undefined`)
      opts = { flag: `a` };
    else if (typeof opts === `string`)
      opts = { flag: `a`, encoding: opts };
    else if (typeof opts.flag === `undefined`)
      opts = { flag: `a`, ...opts };
    return this.writeFilePromise(p, content, opts);
  }
  appendFileSync(p, content, opts = {}) {
    if (this.readOnly)
      throw EROFS(`open '${p}'`);
    if (typeof opts === `undefined`)
      opts = { flag: `a` };
    else if (typeof opts === `string`)
      opts = { flag: `a`, encoding: opts };
    else if (typeof opts.flag === `undefined`)
      opts = { flag: `a`, ...opts };
    return this.writeFileSync(p, content, opts);
  }
  fdToPath(fd, reason) {
    const path = this.fds.get(fd)?.p;
    if (typeof path === `undefined`)
      throw EBADF(reason);
    return path;
  }
  async writeFilePromise(p, content, opts) {
    const { encoding, mode, index, resolvedP } = this.prepareWriteFile(p, opts);
    if (index !== void 0 && typeof opts === `object` && opts.flag && opts.flag.includes(`a`))
      content = Buffer.concat([await this.getFileSource(index, { asyncDecompress: true }), Buffer.from(content)]);
    if (encoding !== null)
      content = content.toString(encoding);
    const newIndex = this.setFileSource(resolvedP, content);
    if (newIndex !== index)
      this.registerEntry(resolvedP, newIndex);
    if (mode !== null) {
      await this.chmodPromise(resolvedP, mode);
    }
  }
  writeFileSync(p, content, opts) {
    const { encoding, mode, index, resolvedP } = this.prepareWriteFile(p, opts);
    if (index !== void 0 && typeof opts === `object` && opts.flag && opts.flag.includes(`a`))
      content = Buffer.concat([this.getFileSource(index), Buffer.from(content)]);
    if (encoding !== null)
      content = content.toString(encoding);
    const newIndex = this.setFileSource(resolvedP, content);
    if (newIndex !== index)
      this.registerEntry(resolvedP, newIndex);
    if (mode !== null) {
      this.chmodSync(resolvedP, mode);
    }
  }
  prepareWriteFile(p, opts) {
    if (typeof p === `number`)
      p = this.fdToPath(p, `read`);
    if (this.readOnly)
      throw EROFS(`open '${p}'`);
    const resolvedP = this.resolveFilename(`open '${p}'`, p);
    if (this.listings.has(resolvedP))
      throw EISDIR(`open '${p}'`);
    let encoding = null, mode = null;
    if (typeof opts === `string`) {
      encoding = opts;
    } else if (typeof opts === `object`) {
      ({
        encoding = null,
        mode = null
      } = opts);
    }
    const index = this.entries.get(resolvedP);
    return {
      encoding,
      mode,
      resolvedP,
      index
    };
  }
  async unlinkPromise(p) {
    return this.unlinkSync(p);
  }
  unlinkSync(p) {
    if (this.readOnly)
      throw EROFS(`unlink '${p}'`);
    const resolvedP = this.resolveFilename(`unlink '${p}'`, p);
    if (this.listings.has(resolvedP))
      throw EISDIR(`unlink '${p}'`);
    const index = this.entries.get(resolvedP);
    if (typeof index === `undefined`)
      throw EINVAL(`unlink '${p}'`);
    this.deleteEntry(resolvedP, index);
  }
  async utimesPromise(p, atime, mtime) {
    return this.utimesSync(p, atime, mtime);
  }
  utimesSync(p, atime, mtime) {
    if (this.readOnly)
      throw EROFS(`utimes '${p}'`);
    const resolvedP = this.resolveFilename(`utimes '${p}'`, p);
    this.utimesImpl(resolvedP, mtime);
  }
  async lutimesPromise(p, atime, mtime) {
    return this.lutimesSync(p, atime, mtime);
  }
  lutimesSync(p, atime, mtime) {
    if (this.readOnly)
      throw EROFS(`lutimes '${p}'`);
    const resolvedP = this.resolveFilename(`utimes '${p}'`, p, false);
    this.utimesImpl(resolvedP, mtime);
  }
  utimesImpl(resolvedP, mtime) {
    if (this.listings.has(resolvedP)) {
      if (!this.entries.has(resolvedP))
        this.hydrateDirectory(resolvedP);
    }
    const entry = this.entries.get(resolvedP);
    if (entry === void 0)
      throw new Error(`Unreachable`);
    const rc = this.libzip.file.setMtime(this.zip, entry, 0, toUnixTimestamp(mtime), 0);
    if (rc === -1) {
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    }
  }
  async mkdirPromise(p, opts) {
    return this.mkdirSync(p, opts);
  }
  mkdirSync(p, { mode = 493, recursive = false } = {}) {
    if (recursive)
      return this.mkdirpSync(p, { chmod: mode });
    if (this.readOnly)
      throw EROFS(`mkdir '${p}'`);
    const resolvedP = this.resolveFilename(`mkdir '${p}'`, p);
    if (this.entries.has(resolvedP) || this.listings.has(resolvedP))
      throw EEXIST(`mkdir '${p}'`);
    this.hydrateDirectory(resolvedP);
    this.chmodSync(resolvedP, mode);
    return void 0;
  }
  async rmdirPromise(p, opts) {
    return this.rmdirSync(p, opts);
  }
  rmdirSync(p, { recursive = false } = {}) {
    if (this.readOnly)
      throw EROFS(`rmdir '${p}'`);
    if (recursive) {
      this.removeSync(p);
      return;
    }
    const resolvedP = this.resolveFilename(`rmdir '${p}'`, p);
    const directoryListing = this.listings.get(resolvedP);
    if (!directoryListing)
      throw ENOTDIR(`rmdir '${p}'`);
    if (directoryListing.size > 0)
      throw ENOTEMPTY(`rmdir '${p}'`);
    const index = this.entries.get(resolvedP);
    if (typeof index === `undefined`)
      throw EINVAL(`rmdir '${p}'`);
    this.deleteEntry(p, index);
  }
  async rmPromise(p, opts) {
    return this.rmSync(p, opts);
  }
  rmSync(p, { recursive = false } = {}) {
    if (this.readOnly)
      throw EROFS(`rm '${p}'`);
    if (recursive) {
      this.removeSync(p);
      return;
    }
    const resolvedP = this.resolveFilename(`rm '${p}'`, p);
    const directoryListing = this.listings.get(resolvedP);
    if (!directoryListing)
      throw ENOTDIR(`rm '${p}'`);
    if (directoryListing.size > 0)
      throw ENOTEMPTY(`rm '${p}'`);
    const index = this.entries.get(resolvedP);
    if (typeof index === `undefined`)
      throw EINVAL(`rm '${p}'`);
    this.deleteEntry(p, index);
  }
  hydrateDirectory(resolvedP) {
    const index = this.libzip.dir.add(this.zip, ppath.relative(PortablePath.root, resolvedP));
    if (index === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    this.registerListing(resolvedP);
    this.registerEntry(resolvedP, index);
    return index;
  }
  async linkPromise(existingP, newP) {
    return this.linkSync(existingP, newP);
  }
  linkSync(existingP, newP) {
    throw EOPNOTSUPP(`link '${existingP}' -> '${newP}'`);
  }
  async symlinkPromise(target, p) {
    return this.symlinkSync(target, p);
  }
  symlinkSync(target, p) {
    if (this.readOnly)
      throw EROFS(`symlink '${target}' -> '${p}'`);
    const resolvedP = this.resolveFilename(`symlink '${target}' -> '${p}'`, p);
    if (this.listings.has(resolvedP))
      throw EISDIR(`symlink '${target}' -> '${p}'`);
    if (this.entries.has(resolvedP))
      throw EEXIST(`symlink '${target}' -> '${p}'`);
    const index = this.setFileSource(resolvedP, target);
    this.registerEntry(resolvedP, index);
    const rc = this.libzip.file.setExternalAttributes(this.zip, index, 0, 0, this.libzip.ZIP_OPSYS_UNIX, (fs.constants.S_IFLNK | 511) << 16);
    if (rc === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    this.symlinkCount += 1;
  }
  async readFilePromise(p, encoding) {
    if (typeof encoding === `object`)
      encoding = encoding ? encoding.encoding : void 0;
    const data = await this.readFileBuffer(p, { asyncDecompress: true });
    return encoding ? data.toString(encoding) : data;
  }
  readFileSync(p, encoding) {
    if (typeof encoding === `object`)
      encoding = encoding ? encoding.encoding : void 0;
    const data = this.readFileBuffer(p);
    return encoding ? data.toString(encoding) : data;
  }
  readFileBuffer(p, opts = { asyncDecompress: false }) {
    if (typeof p === `number`)
      p = this.fdToPath(p, `read`);
    const resolvedP = this.resolveFilename(`open '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`open '${p}'`);
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
      throw ENOTDIR(`open '${p}'`);
    if (this.listings.has(resolvedP))
      throw EISDIR(`read`);
    const entry = this.entries.get(resolvedP);
    if (entry === void 0)
      throw new Error(`Unreachable`);
    return this.getFileSource(entry, opts);
  }
  async readdirPromise(p, opts) {
    return this.readdirSync(p, opts);
  }
  readdirSync(p, opts) {
    const resolvedP = this.resolveFilename(`scandir '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`scandir '${p}'`);
    const directoryListing = this.listings.get(resolvedP);
    if (!directoryListing)
      throw ENOTDIR(`scandir '${p}'`);
    if (opts?.recursive) {
      if (opts?.withFileTypes) {
        const entries = Array.from(directoryListing, (name) => {
          return Object.assign(this.statImpl(`lstat`, ppath.join(p, name)), {
            name,
            path: PortablePath.dot
          });
        });
        for (const entry of entries) {
          if (!entry.isDirectory())
            continue;
          const subPath = ppath.join(entry.path, entry.name);
          const subListing = this.listings.get(ppath.join(resolvedP, subPath));
          for (const child of subListing) {
            entries.push(Object.assign(this.statImpl(`lstat`, ppath.join(p, subPath, child)), {
              name: child,
              path: subPath
            }));
          }
        }
        return entries;
      } else {
        const entries = [...directoryListing];
        for (const subPath of entries) {
          const subListing = this.listings.get(ppath.join(resolvedP, subPath));
          if (typeof subListing === `undefined`)
            continue;
          for (const child of subListing) {
            entries.push(ppath.join(subPath, child));
          }
        }
        return entries;
      }
    } else if (opts?.withFileTypes) {
      return Array.from(directoryListing, (name) => {
        return Object.assign(this.statImpl(`lstat`, ppath.join(p, name)), {
          name,
          path: void 0
        });
      });
    } else {
      return [...directoryListing];
    }
  }
  async readlinkPromise(p) {
    const entry = this.prepareReadlink(p);
    return (await this.getFileSource(entry, { asyncDecompress: true })).toString();
  }
  readlinkSync(p) {
    const entry = this.prepareReadlink(p);
    return this.getFileSource(entry).toString();
  }
  prepareReadlink(p) {
    const resolvedP = this.resolveFilename(`readlink '${p}'`, p, false);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`readlink '${p}'`);
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
      throw ENOTDIR(`open '${p}'`);
    if (this.listings.has(resolvedP))
      throw EINVAL(`readlink '${p}'`);
    const entry = this.entries.get(resolvedP);
    if (entry === void 0)
      throw new Error(`Unreachable`);
    if (!this.isSymbolicLink(entry))
      throw EINVAL(`readlink '${p}'`);
    return entry;
  }
  async truncatePromise(p, len = 0) {
    const resolvedP = this.resolveFilename(`open '${p}'`, p);
    const index = this.entries.get(resolvedP);
    if (typeof index === `undefined`)
      throw EINVAL(`open '${p}'`);
    const source = await this.getFileSource(index, { asyncDecompress: true });
    const truncated = Buffer.alloc(len, 0);
    source.copy(truncated);
    return await this.writeFilePromise(p, truncated);
  }
  truncateSync(p, len = 0) {
    const resolvedP = this.resolveFilename(`open '${p}'`, p);
    const index = this.entries.get(resolvedP);
    if (typeof index === `undefined`)
      throw EINVAL(`open '${p}'`);
    const source = this.getFileSource(index);
    const truncated = Buffer.alloc(len, 0);
    source.copy(truncated);
    return this.writeFileSync(p, truncated);
  }
  async ftruncatePromise(fd, len) {
    return this.truncatePromise(this.fdToPath(fd, `ftruncate`), len);
  }
  ftruncateSync(fd, len) {
    return this.truncateSync(this.fdToPath(fd, `ftruncateSync`), len);
  }
  watch(p, a, b) {
    let persistent;
    switch (typeof a) {
      case `function`:
      case `string`:
      case `undefined`:
        {
          persistent = true;
        }
        break;
      default:
        {
          ({ persistent = true } = a);
        }
        break;
    }
    if (!persistent)
      return { on: () => {
      }, close: () => {
      } };
    const interval = setInterval(() => {
    }, 24 * 60 * 60 * 1e3);
    return { on: () => {
    }, close: () => {
      clearInterval(interval);
    } };
  }
  watchFile(p, a, b) {
    const resolvedP = ppath.resolve(PortablePath.root, p);
    return watchFile(this, resolvedP, a, b);
  }
  unwatchFile(p, cb) {
    const resolvedP = ppath.resolve(PortablePath.root, p);
    return unwatchFile(this, resolvedP, cb);
  }
}

setFactory(() => {
  const emZip = createModule();
  return makeInterface(emZip);
});

var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
  ErrorCode2["API_ERROR"] = `API_ERROR`;
  ErrorCode2["BUILTIN_NODE_RESOLUTION_FAILED"] = `BUILTIN_NODE_RESOLUTION_FAILED`;
  ErrorCode2["EXPORTS_RESOLUTION_FAILED"] = `EXPORTS_RESOLUTION_FAILED`;
  ErrorCode2["MISSING_DEPENDENCY"] = `MISSING_DEPENDENCY`;
  ErrorCode2["MISSING_PEER_DEPENDENCY"] = `MISSING_PEER_DEPENDENCY`;
  ErrorCode2["QUALIFIED_PATH_RESOLUTION_FAILED"] = `QUALIFIED_PATH_RESOLUTION_FAILED`;
  ErrorCode2["INTERNAL"] = `INTERNAL`;
  ErrorCode2["UNDECLARED_DEPENDENCY"] = `UNDECLARED_DEPENDENCY`;
  ErrorCode2["UNSUPPORTED"] = `UNSUPPORTED`;
  return ErrorCode2;
})(ErrorCode || {});
const MODULE_NOT_FOUND_ERRORS = /* @__PURE__ */ new Set([
  "BUILTIN_NODE_RESOLUTION_FAILED" /* BUILTIN_NODE_RESOLUTION_FAILED */,
  "MISSING_DEPENDENCY" /* MISSING_DEPENDENCY */,
  "MISSING_PEER_DEPENDENCY" /* MISSING_PEER_DEPENDENCY */,
  "QUALIFIED_PATH_RESOLUTION_FAILED" /* QUALIFIED_PATH_RESOLUTION_FAILED */,
  "UNDECLARED_DEPENDENCY" /* UNDECLARED_DEPENDENCY */
]);
function makeError(pnpCode, message, data = {}, code) {
  code ??= MODULE_NOT_FOUND_ERRORS.has(pnpCode) ? `MODULE_NOT_FOUND` : pnpCode;
  const propertySpec = {
    configurable: true,
    writable: true,
    enumerable: false
  };
  return Object.defineProperties(new Error(message), {
    code: {
      ...propertySpec,
      value: code
    },
    pnpCode: {
      ...propertySpec,
      value: pnpCode
    },
    data: {
      ...propertySpec,
      value: data
    }
  });
}
function getIssuerModule(parent) {
  let issuer = parent;
  while (issuer && (issuer.id === `[eval]` || issuer.id === `<repl>` || !issuer.filename))
    issuer = issuer.parent;
  return issuer || null;
}
function getPathForDisplay(p) {
  return npath.normalize(npath.fromPortablePath(p));
}

const [major, minor] = process.versions.node.split(`.`).map((value) => parseInt(value, 10));
const WATCH_MODE_MESSAGE_USES_ARRAYS = major > 19 || major === 19 && minor >= 2 || major === 18 && minor >= 13;

function readPackageScope(checkPath) {
  const rootSeparatorIndex = checkPath.indexOf(npath.sep);
  let separatorIndex;
  do {
    separatorIndex = checkPath.lastIndexOf(npath.sep);
    checkPath = checkPath.slice(0, separatorIndex);
    if (checkPath.endsWith(`${npath.sep}node_modules`))
      return false;
    const pjson = readPackage(checkPath + npath.sep);
    if (pjson) {
      return {
        data: pjson,
        path: checkPath
      };
    }
  } while (separatorIndex > rootSeparatorIndex);
  return false;
}
function readPackage(requestPath) {
  const jsonPath = npath.resolve(requestPath, `package.json`);
  if (!fs__default.default.existsSync(jsonPath))
    return null;
  return JSON.parse(fs__default.default.readFileSync(jsonPath, `utf8`));
}
function ERR_REQUIRE_ESM(filename, parentPath = null) {
  const basename = parentPath && path__default.default.basename(filename) === path__default.default.basename(parentPath) ? filename : path__default.default.basename(filename);
  const msg = `require() of ES Module ${filename}${parentPath ? ` from ${parentPath}` : ``} not supported.
Instead change the require of ${basename} in ${parentPath} to a dynamic import() which is available in all CommonJS modules.`;
  const err = new Error(msg);
  err.code = `ERR_REQUIRE_ESM`;
  return err;
}
function reportRequiredFilesToWatchMode(files) {
  if (process.env.WATCH_REPORT_DEPENDENCIES && process.send) {
    files = files.map((filename) => npath.fromPortablePath(VirtualFS.resolveVirtual(npath.toPortablePath(filename))));
    if (WATCH_MODE_MESSAGE_USES_ARRAYS) {
      process.send({ "watch:require": files });
    } else {
      for (const filename of files) {
        process.send({ "watch:require": filename });
      }
    }
  }
}

function applyPatch(pnpapi, opts) {
  let enableNativeHooks = true;
  process.versions.pnp = String(pnpapi.VERSIONS.std);
  const moduleExports = require$$0__default.default;
  moduleExports.findPnpApi = (lookupSource) => {
    const lookupPath = lookupSource instanceof URL ? url.fileURLToPath(lookupSource) : lookupSource;
    const apiPath = opts.manager.findApiPathFor(lookupPath);
    if (apiPath === null)
      return null;
    const apiEntry = opts.manager.getApiEntry(apiPath, true);
    return apiEntry.instance.findPackageLocator(lookupPath) ? apiEntry.instance : null;
  };
  function getRequireStack(parent) {
    const requireStack = [];
    for (let cursor = parent; cursor; cursor = cursor.parent)
      requireStack.push(cursor.filename || cursor.id);
    return requireStack;
  }
  const originalModuleLoad = require$$0.Module._load;
  require$$0.Module._load = function(request, parent, isMain) {
    if (request === `pnpapi`) {
      const parentApiPath = opts.manager.getApiPathFromParent(parent);
      if (parentApiPath) {
        return opts.manager.getApiEntry(parentApiPath, true).instance;
      }
    }
    return originalModuleLoad.call(require$$0.Module, request, parent, isMain);
  };
  function getIssuerSpecsFromPaths(paths) {
    return paths.map((path) => ({
      apiPath: opts.manager.findApiPathFor(path),
      path,
      module: null
    }));
  }
  function getIssuerSpecsFromModule(module) {
    if (module && module.id !== `<repl>` && module.id !== `internal/preload` && !module.parent && !module.filename && module.paths.length > 0) {
      return [{
        apiPath: opts.manager.findApiPathFor(module.paths[0]),
        path: module.paths[0],
        module
      }];
    }
    const issuer = getIssuerModule(module);
    if (issuer !== null) {
      const path = npath.dirname(issuer.filename);
      const apiPath = opts.manager.getApiPathFromParent(issuer);
      return [{ apiPath, path, module }];
    } else {
      const path = process.cwd();
      const apiPath = opts.manager.findApiPathFor(npath.join(path, `[file]`)) ?? opts.manager.getApiPathFromParent(null);
      return [{ apiPath, path, module }];
    }
  }
  function makeFakeParent(path) {
    const fakeParent = new require$$0.Module(``);
    const fakeFilePath = npath.join(path, `[file]`);
    fakeParent.paths = require$$0.Module._nodeModulePaths(fakeFilePath);
    return fakeParent;
  }
  const pathRegExp = /^(?![a-zA-Z]:[\\/]|\\\\|\.{0,2}(?:\/|$))((?:@[^/]+\/)?[^/]+)\/*(.*|)$/;
  const originalModuleResolveFilename = require$$0.Module._resolveFilename;
  require$$0.Module._resolveFilename = function(request, parent, isMain, options) {
    if (require$$0.isBuiltin(request))
      return request;
    if (!enableNativeHooks)
      return originalModuleResolveFilename.call(require$$0.Module, request, parent, isMain, options);
    if (options && options.plugnplay === false) {
      const { plugnplay, ...forwardedOptions } = options;
      try {
        enableNativeHooks = false;
        return originalModuleResolveFilename.call(require$$0.Module, request, parent, isMain, forwardedOptions);
      } finally {
        enableNativeHooks = true;
      }
    }
    if (options) {
      const optionNames = new Set(Object.keys(options));
      optionNames.delete(`paths`);
      optionNames.delete(`plugnplay`);
      if (optionNames.size > 0) {
        throw makeError(
          ErrorCode.UNSUPPORTED,
          `Some options passed to require() aren't supported by PnP yet (${Array.from(optionNames).join(`, `)})`
        );
      }
    }
    const issuerSpecs = options && options.paths ? getIssuerSpecsFromPaths(options.paths) : getIssuerSpecsFromModule(parent);
    if (request.match(pathRegExp) === null) {
      const parentDirectory = parent?.filename != null ? npath.dirname(parent.filename) : null;
      const absoluteRequest = npath.isAbsolute(request) ? request : parentDirectory !== null ? npath.resolve(parentDirectory, request) : null;
      if (absoluteRequest !== null) {
        const apiPath = parent && parentDirectory === npath.dirname(absoluteRequest) ? opts.manager.getApiPathFromParent(parent) : opts.manager.findApiPathFor(absoluteRequest);
        if (apiPath !== null) {
          issuerSpecs.unshift({
            apiPath,
            path: parentDirectory,
            module: null
          });
        }
      }
    }
    let firstError;
    for (const { apiPath, path, module } of issuerSpecs) {
      let resolution;
      const issuerApi = apiPath !== null ? opts.manager.getApiEntry(apiPath, true).instance : null;
      try {
        if (issuerApi !== null) {
          resolution = issuerApi.resolveRequest(request, path !== null ? `${path}/` : null);
        } else {
          if (path === null)
            throw new Error(`Assertion failed: Expected the path to be set`);
          resolution = originalModuleResolveFilename.call(require$$0.Module, request, module || makeFakeParent(path), isMain);
        }
      } catch (error) {
        firstError = firstError || error;
        continue;
      }
      if (resolution !== null) {
        return resolution;
      }
    }
    const requireStack = getRequireStack(parent);
    Object.defineProperty(firstError, `requireStack`, {
      configurable: true,
      writable: true,
      enumerable: false,
      value: requireStack
    });
    if (requireStack.length > 0)
      firstError.message += `
Require stack:
- ${requireStack.join(`
- `)}`;
    if (typeof firstError.pnpCode === `string`)
      Error.captureStackTrace(firstError);
    throw firstError;
  };
  const originalFindPath = require$$0.Module._findPath;
  require$$0.Module._findPath = function(request, paths, isMain) {
    if (request === `pnpapi`)
      return false;
    if (!enableNativeHooks)
      return originalFindPath.call(require$$0.Module, request, paths, isMain);
    const isAbsolute = npath.isAbsolute(request);
    if (isAbsolute)
      paths = [``];
    else if (!paths || paths.length === 0)
      return false;
    for (const path of paths) {
      let resolution;
      try {
        const pnpApiPath = opts.manager.findApiPathFor(isAbsolute ? request : path);
        if (pnpApiPath !== null) {
          const api = opts.manager.getApiEntry(pnpApiPath, true).instance;
          resolution = api.resolveRequest(request, path) || false;
        } else {
          resolution = originalFindPath.call(require$$0.Module, request, [path], isMain);
        }
      } catch (error) {
        continue;
      }
      if (resolution) {
        return resolution;
      }
    }
    return false;
  };
  const originalExtensionJSFunction = require$$0.Module._extensions[`.js`];
  require$$0.Module._extensions[`.js`] = function(module, filename) {
    if (filename.endsWith(`.js`)) {
      const pkg = readPackageScope(filename);
      if (pkg && pkg.data?.type === `module`) {
        const err = ERR_REQUIRE_ESM(filename, module.parent?.filename);
        Error.captureStackTrace(err);
        throw err;
      }
    }
    originalExtensionJSFunction.call(this, module, filename);
  };
  const originalDlopen = process.dlopen;
  process.dlopen = function(...args) {
    const [module, filename, ...rest] = args;
    return originalDlopen.call(
      this,
      module,
      npath.fromPortablePath(VirtualFS.resolveVirtual(npath.toPortablePath(filename))),
      ...rest
    );
  };
  const originalEmit = process.emit;
  process.emit = function(name, data, ...args) {
    if (name === `warning` && typeof data === `object` && data.name === `ExperimentalWarning` && (data.message.includes(`--experimental-loader`) || data.message.includes(`Custom ESM Loaders is an experimental feature`)))
      return false;
    return originalEmit.apply(process, arguments);
  };
  patchFs(fs__default.default, new PosixFS(opts.fakeFs));
}

function hydrateRuntimeState(data, { basePath }) {
  const portablePath = npath.toPortablePath(basePath);
  const absolutePortablePath = ppath.resolve(portablePath);
  const ignorePattern = data.ignorePatternData !== null ? new RegExp(data.ignorePatternData) : null;
  const packageLocatorsByLocations = /* @__PURE__ */ new Map();
  const packageRegistry = new Map(data.packageRegistryData.map(([packageName, packageStoreData]) => {
    return [packageName, new Map(packageStoreData.map(([packageReference, packageInformationData]) => {
      if (packageName === null !== (packageReference === null))
        throw new Error(`Assertion failed: The name and reference should be null, or neither should`);
      const discardFromLookup = packageInformationData.discardFromLookup ?? false;
      const packageLocator = { name: packageName, reference: packageReference };
      const entry = packageLocatorsByLocations.get(packageInformationData.packageLocation);
      if (!entry) {
        packageLocatorsByLocations.set(packageInformationData.packageLocation, { locator: packageLocator, discardFromLookup });
      } else {
        entry.discardFromLookup = entry.discardFromLookup && discardFromLookup;
        if (!discardFromLookup) {
          entry.locator = packageLocator;
        }
      }
      let resolvedPackageLocation = null;
      return [packageReference, {
        packageDependencies: new Map(packageInformationData.packageDependencies),
        packagePeers: new Set(packageInformationData.packagePeers),
        linkType: packageInformationData.linkType,
        discardFromLookup,
        // we only need this for packages that are used by the currently running script
        // this is a lazy getter because `ppath.join` has some overhead
        get packageLocation() {
          return resolvedPackageLocation || (resolvedPackageLocation = ppath.join(absolutePortablePath, packageInformationData.packageLocation));
        }
      }];
    }))];
  }));
  const fallbackExclusionList = new Map(data.fallbackExclusionList.map(([packageName, packageReferences]) => {
    return [packageName, new Set(packageReferences)];
  }));
  const fallbackPool = new Map(data.fallbackPool);
  const dependencyTreeRoots = data.dependencyTreeRoots;
  const enableTopLevelFallback = data.enableTopLevelFallback;
  return {
    basePath: portablePath,
    dependencyTreeRoots,
    enableTopLevelFallback,
    fallbackExclusionList,
    fallbackPool,
    ignorePattern,
    packageLocatorsByLocations,
    packageRegistry
  };
}

const ArrayIsArray = Array.isArray;
const JSONStringify = JSON.stringify;
const ObjectGetOwnPropertyNames = Object.getOwnPropertyNames;
const ObjectPrototypeHasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
const RegExpPrototypeExec = (obj, string) => RegExp.prototype.exec.call(obj, string);
const RegExpPrototypeSymbolReplace = (obj, ...rest) => RegExp.prototype[Symbol.replace].apply(obj, rest);
const StringPrototypeEndsWith = (str, ...rest) => String.prototype.endsWith.apply(str, rest);
const StringPrototypeIncludes = (str, ...rest) => String.prototype.includes.apply(str, rest);
const StringPrototypeLastIndexOf = (str, ...rest) => String.prototype.lastIndexOf.apply(str, rest);
const StringPrototypeIndexOf = (str, ...rest) => String.prototype.indexOf.apply(str, rest);
const StringPrototypeReplace = (str, ...rest) => String.prototype.replace.apply(str, rest);
const StringPrototypeSlice = (str, ...rest) => String.prototype.slice.apply(str, rest);
const StringPrototypeStartsWith = (str, ...rest) => String.prototype.startsWith.apply(str, rest);
const SafeMap = Map;
const JSONParse = JSON.parse;

function createErrorType(code, messageCreator, errorType) {
  return class extends errorType {
    constructor(...args) {
      super(messageCreator(...args));
      this.code = code;
      this.name = `${errorType.name} [${code}]`;
    }
  };
}
const ERR_PACKAGE_IMPORT_NOT_DEFINED = createErrorType(
  `ERR_PACKAGE_IMPORT_NOT_DEFINED`,
  (specifier, packagePath, base) => {
    return `Package import specifier "${specifier}" is not defined${packagePath ? ` in package ${packagePath}package.json` : ``} imported from ${base}`;
  },
  TypeError
);
const ERR_INVALID_MODULE_SPECIFIER = createErrorType(
  `ERR_INVALID_MODULE_SPECIFIER`,
  (request, reason, base = void 0) => {
    return `Invalid module "${request}" ${reason}${base ? ` imported from ${base}` : ``}`;
  },
  TypeError
);
const ERR_INVALID_PACKAGE_TARGET = createErrorType(
  `ERR_INVALID_PACKAGE_TARGET`,
  (pkgPath, key, target, isImport = false, base = void 0) => {
    const relError = typeof target === `string` && !isImport && target.length && !StringPrototypeStartsWith(target, `./`);
    if (key === `.`) {
      assert__default.default(isImport === false);
      return `Invalid "exports" main target ${JSONStringify(target)} defined in the package config ${pkgPath}package.json${base ? ` imported from ${base}` : ``}${relError ? `; targets must start with "./"` : ``}`;
    }
    return `Invalid "${isImport ? `imports` : `exports`}" target ${JSONStringify(
      target
    )} defined for '${key}' in the package config ${pkgPath}package.json${base ? ` imported from ${base}` : ``}${relError ? `; targets must start with "./"` : ``}`;
  },
  Error
);
const ERR_INVALID_PACKAGE_CONFIG = createErrorType(
  `ERR_INVALID_PACKAGE_CONFIG`,
  (path, base, message) => {
    return `Invalid package config ${path}${base ? ` while importing ${base}` : ``}${message ? `. ${message}` : ``}`;
  },
  Error
);
const ERR_PACKAGE_PATH_NOT_EXPORTED = createErrorType(
  "ERR_PACKAGE_PATH_NOT_EXPORTED",
  (pkgPath, subpath, base = void 0) => {
    if (subpath === ".")
      return `No "exports" main defined in ${pkgPath}package.json${base ? ` imported from ${base}` : ""}`;
    return `Package subpath '${subpath}' is not defined by "exports" in ${pkgPath}package.json${base ? ` imported from ${base}` : ""}`;
  },
  Error
);

function filterOwnProperties(source, keys) {
  const filtered = /* @__PURE__ */ Object.create(null);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (ObjectPrototypeHasOwnProperty(source, key)) {
      filtered[key] = source[key];
    }
  }
  return filtered;
}

const packageJSONCache = new SafeMap();
function getPackageConfig(path, specifier, base, readFileSyncFn) {
  const existing = packageJSONCache.get(path);
  if (existing !== void 0) {
    return existing;
  }
  const source = readFileSyncFn(path);
  if (source === void 0) {
    const packageConfig2 = {
      pjsonPath: path,
      exists: false,
      main: void 0,
      name: void 0,
      type: "none",
      exports: void 0,
      imports: void 0
    };
    packageJSONCache.set(path, packageConfig2);
    return packageConfig2;
  }
  let packageJSON;
  try {
    packageJSON = JSONParse(source);
  } catch (error) {
    throw new ERR_INVALID_PACKAGE_CONFIG(
      path,
      (base ? `"${specifier}" from ` : "") + url.fileURLToPath(base || specifier),
      error.message
    );
  }
  let { imports, main, name, type } = filterOwnProperties(packageJSON, [
    "imports",
    "main",
    "name",
    "type"
  ]);
  const exports = ObjectPrototypeHasOwnProperty(packageJSON, "exports") ? packageJSON.exports : void 0;
  if (typeof imports !== "object" || imports === null) {
    imports = void 0;
  }
  if (typeof main !== "string") {
    main = void 0;
  }
  if (typeof name !== "string") {
    name = void 0;
  }
  if (type !== "module" && type !== "commonjs") {
    type = "none";
  }
  const packageConfig = {
    pjsonPath: path,
    exists: true,
    main,
    name,
    type,
    exports,
    imports
  };
  packageJSONCache.set(path, packageConfig);
  return packageConfig;
}
function getPackageScopeConfig(resolved, readFileSyncFn) {
  let packageJSONUrl = new URL("./package.json", resolved);
  while (true) {
    const packageJSONPath2 = packageJSONUrl.pathname;
    if (StringPrototypeEndsWith(packageJSONPath2, "node_modules/package.json")) {
      break;
    }
    const packageConfig2 = getPackageConfig(
      url.fileURLToPath(packageJSONUrl),
      resolved,
      void 0,
      readFileSyncFn
    );
    if (packageConfig2.exists) {
      return packageConfig2;
    }
    const lastPackageJSONUrl = packageJSONUrl;
    packageJSONUrl = new URL("../package.json", packageJSONUrl);
    if (packageJSONUrl.pathname === lastPackageJSONUrl.pathname) {
      break;
    }
  }
  const packageJSONPath = url.fileURLToPath(packageJSONUrl);
  const packageConfig = {
    pjsonPath: packageJSONPath,
    exists: false,
    main: void 0,
    name: void 0,
    type: "none",
    exports: void 0,
    imports: void 0
  };
  packageJSONCache.set(packageJSONPath, packageConfig);
  return packageConfig;
}

function throwImportNotDefined(specifier, packageJSONUrl, base) {
  throw new ERR_PACKAGE_IMPORT_NOT_DEFINED(
    specifier,
    packageJSONUrl && url.fileURLToPath(new URL(".", packageJSONUrl)),
    url.fileURLToPath(base)
  );
}
function throwInvalidSubpath(subpath, packageJSONUrl, internal, base) {
  const reason = `request is not a valid subpath for the "${internal ? "imports" : "exports"}" resolution of ${url.fileURLToPath(packageJSONUrl)}`;
  throw new ERR_INVALID_MODULE_SPECIFIER(
    subpath,
    reason,
    base && url.fileURLToPath(base)
  );
}
function throwInvalidPackageTarget(subpath, target, packageJSONUrl, internal, base) {
  if (typeof target === "object" && target !== null) {
    target = JSONStringify(target, null, "");
  } else {
    target = `${target}`;
  }
  throw new ERR_INVALID_PACKAGE_TARGET(
    url.fileURLToPath(new URL(".", packageJSONUrl)),
    subpath,
    target,
    internal,
    base && url.fileURLToPath(base)
  );
}
const invalidSegmentRegEx = /(^|\\|\/)((\.|%2e)(\.|%2e)?|(n|%6e|%4e)(o|%6f|%4f)(d|%64|%44)(e|%65|%45)(_|%5f)(m|%6d|%4d)(o|%6f|%4f)(d|%64|%44)(u|%75|%55)(l|%6c|%4c)(e|%65|%45)(s|%73|%53))(\\|\/|$)/i;
const patternRegEx = /\*/g;
function resolvePackageTargetString(target, subpath, match, packageJSONUrl, base, pattern, internal, conditions) {
  if (subpath !== "" && !pattern && target[target.length - 1] !== "/")
    throwInvalidPackageTarget(match, target, packageJSONUrl, internal, base);
  if (!StringPrototypeStartsWith(target, "./")) {
    if (internal && !StringPrototypeStartsWith(target, "../") && !StringPrototypeStartsWith(target, "/")) {
      let isURL = false;
      try {
        new URL(target);
        isURL = true;
      } catch {
      }
      if (!isURL) {
        const exportTarget = pattern ? RegExpPrototypeSymbolReplace(patternRegEx, target, () => subpath) : target + subpath;
        return exportTarget;
      }
    }
    throwInvalidPackageTarget(match, target, packageJSONUrl, internal, base);
  }
  if (RegExpPrototypeExec(
    invalidSegmentRegEx,
    StringPrototypeSlice(target, 2)
  ) !== null)
    throwInvalidPackageTarget(match, target, packageJSONUrl, internal, base);
  const resolved = new URL(target, packageJSONUrl);
  const resolvedPath = resolved.pathname;
  const packagePath = new URL(".", packageJSONUrl).pathname;
  if (!StringPrototypeStartsWith(resolvedPath, packagePath))
    throwInvalidPackageTarget(match, target, packageJSONUrl, internal, base);
  if (subpath === "") return resolved;
  if (RegExpPrototypeExec(invalidSegmentRegEx, subpath) !== null) {
    const request = pattern ? StringPrototypeReplace(match, "*", () => subpath) : match + subpath;
    throwInvalidSubpath(request, packageJSONUrl, internal, base);
  }
  if (pattern) {
    return new URL(
      RegExpPrototypeSymbolReplace(patternRegEx, resolved.href, () => subpath)
    );
  }
  return new URL(subpath, resolved);
}
function isArrayIndex(key) {
  const keyNum = +key;
  if (`${keyNum}` !== key) return false;
  return keyNum >= 0 && keyNum < 4294967295;
}
function resolvePackageTarget(packageJSONUrl, target, subpath, packageSubpath, base, pattern, internal, conditions) {
  if (typeof target === "string") {
    return resolvePackageTargetString(
      target,
      subpath,
      packageSubpath,
      packageJSONUrl,
      base,
      pattern,
      internal);
  } else if (ArrayIsArray(target)) {
    if (target.length === 0) {
      return null;
    }
    let lastException;
    for (let i = 0; i < target.length; i++) {
      const targetItem = target[i];
      let resolveResult;
      try {
        resolveResult = resolvePackageTarget(
          packageJSONUrl,
          targetItem,
          subpath,
          packageSubpath,
          base,
          pattern,
          internal,
          conditions
        );
      } catch (e) {
        lastException = e;
        if (e.code === "ERR_INVALID_PACKAGE_TARGET") {
          continue;
        }
        throw e;
      }
      if (resolveResult === void 0) {
        continue;
      }
      if (resolveResult === null) {
        lastException = null;
        continue;
      }
      return resolveResult;
    }
    if (lastException === void 0 || lastException === null)
      return lastException;
    throw lastException;
  } else if (typeof target === "object" && target !== null) {
    const keys = ObjectGetOwnPropertyNames(target);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (isArrayIndex(key)) {
        throw new ERR_INVALID_PACKAGE_CONFIG(
          url.fileURLToPath(packageJSONUrl),
          base,
          '"exports" cannot contain numeric property keys.'
        );
      }
    }
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key === "default" || conditions.has(key)) {
        const conditionalTarget = target[key];
        const resolveResult = resolvePackageTarget(
          packageJSONUrl,
          conditionalTarget,
          subpath,
          packageSubpath,
          base,
          pattern,
          internal,
          conditions
        );
        if (resolveResult === void 0) continue;
        return resolveResult;
      }
    }
    return void 0;
  } else if (target === null) {
    return null;
  }
  throwInvalidPackageTarget(
    packageSubpath,
    target,
    packageJSONUrl,
    internal,
    base
  );
}
function patternKeyCompare(a, b) {
  const aPatternIndex = StringPrototypeIndexOf(a, "*");
  const bPatternIndex = StringPrototypeIndexOf(b, "*");
  const baseLenA = aPatternIndex === -1 ? a.length : aPatternIndex + 1;
  const baseLenB = bPatternIndex === -1 ? b.length : bPatternIndex + 1;
  if (baseLenA > baseLenB) return -1;
  if (baseLenB > baseLenA) return 1;
  if (aPatternIndex === -1) return 1;
  if (bPatternIndex === -1) return -1;
  if (a.length > b.length) return -1;
  if (b.length > a.length) return 1;
  return 0;
}
function isConditionalExportsMainSugar(exports, packageJSONUrl, base) {
  if (typeof exports === "string" || ArrayIsArray(exports)) return true;
  if (typeof exports !== "object" || exports === null) return false;
  const keys = ObjectGetOwnPropertyNames(exports);
  let isConditionalSugar = false;
  let i = 0;
  for (let j = 0; j < keys.length; j++) {
    const key = keys[j];
    const curIsConditionalSugar = key === "" || key[0] !== ".";
    if (i++ === 0) {
      isConditionalSugar = curIsConditionalSugar;
    } else if (isConditionalSugar !== curIsConditionalSugar) {
      throw new ERR_INVALID_PACKAGE_CONFIG(
        url.fileURLToPath(packageJSONUrl),
        base,
        `"exports" cannot contain some keys starting with '.' and some not. The exports object must either be an object of package subpath keys or an object of main entry condition name keys only.`
      );
    }
  }
  return isConditionalSugar;
}
function throwExportsNotFound(subpath, packageJSONUrl, base) {
  throw new ERR_PACKAGE_PATH_NOT_EXPORTED(
    url.fileURLToPath(new URL(".", packageJSONUrl)),
    subpath,
    base && url.fileURLToPath(base)
  );
}
const emittedPackageWarnings = /* @__PURE__ */ new Set();
function emitTrailingSlashPatternDeprecation(match, pjsonUrl, base) {
  const pjsonPath = url.fileURLToPath(pjsonUrl);
  if (emittedPackageWarnings.has(pjsonPath + "|" + match)) return;
  emittedPackageWarnings.add(pjsonPath + "|" + match);
  process.emitWarning(
    `Use of deprecated trailing slash pattern mapping "${match}" in the "exports" field module resolution of the package at ${pjsonPath}${base ? ` imported from ${url.fileURLToPath(base)}` : ""}. Mapping specifiers ending in "/" is no longer supported.`,
    "DeprecationWarning",
    "DEP0155"
  );
}
function packageExportsResolve({
  packageJSONUrl,
  packageSubpath,
  exports,
  base,
  conditions
}) {
  if (isConditionalExportsMainSugar(exports, packageJSONUrl, base))
    exports = { ".": exports };
  if (ObjectPrototypeHasOwnProperty(exports, packageSubpath) && !StringPrototypeIncludes(packageSubpath, "*") && !StringPrototypeEndsWith(packageSubpath, "/")) {
    const target = exports[packageSubpath];
    const resolveResult = resolvePackageTarget(
      packageJSONUrl,
      target,
      "",
      packageSubpath,
      base,
      false,
      false,
      conditions
    );
    if (resolveResult == null) {
      throwExportsNotFound(packageSubpath, packageJSONUrl, base);
    }
    return resolveResult;
  }
  let bestMatch = "";
  let bestMatchSubpath;
  const keys = ObjectGetOwnPropertyNames(exports);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const patternIndex = StringPrototypeIndexOf(key, "*");
    if (patternIndex !== -1 && StringPrototypeStartsWith(
      packageSubpath,
      StringPrototypeSlice(key, 0, patternIndex)
    )) {
      if (StringPrototypeEndsWith(packageSubpath, "/"))
        emitTrailingSlashPatternDeprecation(
          packageSubpath,
          packageJSONUrl,
          base
        );
      const patternTrailer = StringPrototypeSlice(key, patternIndex + 1);
      if (packageSubpath.length >= key.length && StringPrototypeEndsWith(packageSubpath, patternTrailer) && patternKeyCompare(bestMatch, key) === 1 && StringPrototypeLastIndexOf(key, "*") === patternIndex) {
        bestMatch = key;
        bestMatchSubpath = StringPrototypeSlice(
          packageSubpath,
          patternIndex,
          packageSubpath.length - patternTrailer.length
        );
      }
    }
  }
  if (bestMatch) {
    const target = exports[bestMatch];
    const resolveResult = resolvePackageTarget(
      packageJSONUrl,
      target,
      bestMatchSubpath,
      bestMatch,
      base,
      true,
      false,
      conditions
    );
    if (resolveResult == null) {
      throwExportsNotFound(packageSubpath, packageJSONUrl, base);
    }
    return resolveResult;
  }
  throwExportsNotFound(packageSubpath, packageJSONUrl, base);
}
function packageImportsResolve({ name, base, conditions, readFileSyncFn }) {
  if (name === "#" || StringPrototypeStartsWith(name, "#/") || StringPrototypeEndsWith(name, "/")) {
    const reason = "is not a valid internal imports specifier name";
    throw new ERR_INVALID_MODULE_SPECIFIER(name, reason, url.fileURLToPath(base));
  }
  let packageJSONUrl;
  const packageConfig = getPackageScopeConfig(base, readFileSyncFn);
  if (packageConfig.exists) {
    packageJSONUrl = url.pathToFileURL(packageConfig.pjsonPath);
    const imports = packageConfig.imports;
    if (imports) {
      if (ObjectPrototypeHasOwnProperty(imports, name) && !StringPrototypeIncludes(name, "*")) {
        const resolveResult = resolvePackageTarget(
          packageJSONUrl,
          imports[name],
          "",
          name,
          base,
          false,
          true,
          conditions
        );
        if (resolveResult != null) {
          return resolveResult;
        }
      } else {
        let bestMatch = "";
        let bestMatchSubpath;
        const keys = ObjectGetOwnPropertyNames(imports);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const patternIndex = StringPrototypeIndexOf(key, "*");
          if (patternIndex !== -1 && StringPrototypeStartsWith(
            name,
            StringPrototypeSlice(key, 0, patternIndex)
          )) {
            const patternTrailer = StringPrototypeSlice(key, patternIndex + 1);
            if (name.length >= key.length && StringPrototypeEndsWith(name, patternTrailer) && patternKeyCompare(bestMatch, key) === 1 && StringPrototypeLastIndexOf(key, "*") === patternIndex) {
              bestMatch = key;
              bestMatchSubpath = StringPrototypeSlice(
                name,
                patternIndex,
                name.length - patternTrailer.length
              );
            }
          }
        }
        if (bestMatch) {
          const target = imports[bestMatch];
          const resolveResult = resolvePackageTarget(
            packageJSONUrl,
            target,
            bestMatchSubpath,
            bestMatch,
            base,
            true,
            true,
            conditions
          );
          if (resolveResult != null) {
            return resolveResult;
          }
        }
      }
    }
  }
  throwImportNotDefined(name, packageJSONUrl, base);
}

const flagSymbol = Symbol('arg flag');

class ArgError extends Error {
	constructor(msg, code) {
		super(msg);
		this.name = 'ArgError';
		this.code = code;

		Object.setPrototypeOf(this, ArgError.prototype);
	}
}

function arg(
	opts,
	{
		argv = process.argv.slice(2),
		permissive = false,
		stopAtPositional = false
	} = {}
) {
	if (!opts) {
		throw new ArgError(
			'argument specification object is required',
			'ARG_CONFIG_NO_SPEC'
		);
	}

	const result = { _: [] };

	const aliases = {};
	const handlers = {};

	for (const key of Object.keys(opts)) {
		if (!key) {
			throw new ArgError(
				'argument key cannot be an empty string',
				'ARG_CONFIG_EMPTY_KEY'
			);
		}

		if (key[0] !== '-') {
			throw new ArgError(
				`argument key must start with '-' but found: '${key}'`,
				'ARG_CONFIG_NONOPT_KEY'
			);
		}

		if (key.length === 1) {
			throw new ArgError(
				`argument key must have a name; singular '-' keys are not allowed: ${key}`,
				'ARG_CONFIG_NONAME_KEY'
			);
		}

		if (typeof opts[key] === 'string') {
			aliases[key] = opts[key];
			continue;
		}

		let type = opts[key];
		let isFlag = false;

		if (
			Array.isArray(type) &&
			type.length === 1 &&
			typeof type[0] === 'function'
		) {
			const [fn] = type;
			type = (value, name, prev = []) => {
				prev.push(fn(value, name, prev[prev.length - 1]));
				return prev;
			};
			isFlag = fn === Boolean || fn[flagSymbol] === true;
		} else if (typeof type === 'function') {
			isFlag = type === Boolean || type[flagSymbol] === true;
		} else {
			throw new ArgError(
				`type missing or not a function or valid array type: ${key}`,
				'ARG_CONFIG_VAD_TYPE'
			);
		}

		if (key[1] !== '-' && key.length > 2) {
			throw new ArgError(
				`short argument keys (with a single hyphen) must have only one character: ${key}`,
				'ARG_CONFIG_SHORTOPT_TOOLONG'
			);
		}

		handlers[key] = [type, isFlag];
	}

	for (let i = 0, len = argv.length; i < len; i++) {
		const wholeArg = argv[i];

		if (stopAtPositional && result._.length > 0) {
			result._ = result._.concat(argv.slice(i));
			break;
		}

		if (wholeArg === '--') {
			result._ = result._.concat(argv.slice(i + 1));
			break;
		}

		if (wholeArg.length > 1 && wholeArg[0] === '-') {
			/* eslint-disable operator-linebreak */
			const separatedArguments =
				wholeArg[1] === '-' || wholeArg.length === 2
					? [wholeArg]
					: wholeArg
							.slice(1)
							.split('')
							.map((a) => `-${a}`);
			/* eslint-enable operator-linebreak */

			for (let j = 0; j < separatedArguments.length; j++) {
				const arg = separatedArguments[j];
				const [originalArgName, argStr] =
					arg[1] === '-' ? arg.split(/=(.*)/, 2) : [arg, undefined];

				let argName = originalArgName;
				while (argName in aliases) {
					argName = aliases[argName];
				}

				if (!(argName in handlers)) {
					if (permissive) {
						result._.push(arg);
						continue;
					} else {
						throw new ArgError(
							`unknown or unexpected option: ${originalArgName}`,
							'ARG_UNKNOWN_OPTION'
						);
					}
				}

				const [type, isFlag] = handlers[argName];

				if (!isFlag && j + 1 < separatedArguments.length) {
					throw new ArgError(
						`option requires argument (but was followed by another short argument): ${originalArgName}`,
						'ARG_MISSING_REQUIRED_SHORTARG'
					);
				}

				if (isFlag) {
					result[argName] = type(true, argName, result[argName]);
				} else if (argStr === undefined) {
					if (
						argv.length < i + 2 ||
						(argv[i + 1].length > 1 &&
							argv[i + 1][0] === '-' &&
							!(
								argv[i + 1].match(/^-?\d*(\.(?=\d))?\d*$/) &&
								(type === Number ||
									// eslint-disable-next-line no-undef
									(typeof BigInt !== 'undefined' && type === BigInt))
							))
					) {
						const extended =
							originalArgName === argName ? '' : ` (alias for ${argName})`;
						throw new ArgError(
							`option requires argument: ${originalArgName}${extended}`,
							'ARG_MISSING_REQUIRED_LONGARG'
						);
					}

					result[argName] = type(argv[i + 1], argName, result[argName]);
					++i;
				} else {
					result[argName] = type(argStr, argName, result[argName]);
				}
			}
		} else {
			result._.push(wholeArg);
		}
	}

	return result;
}

arg.flag = (fn) => {
	fn[flagSymbol] = true;
	return fn;
};

// Utility types
arg.COUNT = arg.flag((v, name, existingCount) => (existingCount || 0) + 1);

// Expose error class
arg.ArgError = ArgError;

var arg_1 = arg;

/**
  @license
  The MIT License (MIT)

  Copyright (c) 2014 Blake Embrey (hello@blakeembrey.com)

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
function getOptionValue(opt) {
  parseOptions();
  return options[opt];
}
let options;
function parseOptions() {
  if (!options) {
    options = {
      "--conditions": [],
      ...parseArgv(getNodeOptionsEnvArgv()),
      ...parseArgv(process.execArgv)
    };
  }
}
function parseArgv(argv) {
  return arg_1(
    {
      "--conditions": [String],
      "-C": "--conditions"
    },
    {
      argv,
      permissive: true
    }
  );
}
function getNodeOptionsEnvArgv() {
  const errors = [];
  const envArgv = ParseNodeOptionsEnvVar(process.env.NODE_OPTIONS || "", errors);
  if (errors.length !== 0) ;
  return envArgv;
}
function ParseNodeOptionsEnvVar(node_options, errors) {
  const env_argv = [];
  let is_in_string = false;
  let will_start_new_arg = true;
  for (let index = 0; index < node_options.length; ++index) {
    let c = node_options[index];
    if (c === "\\" && is_in_string) {
      if (index + 1 === node_options.length) {
        errors.push("invalid value for NODE_OPTIONS (invalid escape)\n");
        return env_argv;
      } else {
        c = node_options[++index];
      }
    } else if (c === " " && !is_in_string) {
      will_start_new_arg = true;
      continue;
    } else if (c === '"') {
      is_in_string = !is_in_string;
      continue;
    }
    if (will_start_new_arg) {
      env_argv.push(c);
      will_start_new_arg = false;
    } else {
      env_argv[env_argv.length - 1] += c;
    }
  }
  if (is_in_string) {
    errors.push("invalid value for NODE_OPTIONS (unterminated string)\n");
  }
  return env_argv;
}

function makeApi(runtimeState, opts) {
  const alwaysWarnOnFallback = Number(process.env.PNP_ALWAYS_WARN_ON_FALLBACK) > 0;
  const debugLevel = Number(process.env.PNP_DEBUG_LEVEL);
  const pathRegExp = /^(?![a-zA-Z]:[\\/]|\\\\|\.{0,2}(?:\/|$))((?:node:)?(?:@[^/]+\/)?[^/]+)\/*(.*|)$/;
  const isStrictRegExp = /^(\/|\.{1,2}(\/|$))/;
  const isDirRegExp = /\/$/;
  const isRelativeRegexp = /^\.{0,2}\//;
  const topLevelLocator = { name: null, reference: null };
  const fallbackLocators = [];
  const emittedWarnings = /* @__PURE__ */ new Set();
  if (runtimeState.enableTopLevelFallback === true)
    fallbackLocators.push(topLevelLocator);
  if (opts.compatibilityMode !== false) {
    for (const name of [`react-scripts`, `gatsby`]) {
      const packageStore = runtimeState.packageRegistry.get(name);
      if (packageStore) {
        for (const reference of packageStore.keys()) {
          if (reference === null) {
            throw new Error(`Assertion failed: This reference shouldn't be null`);
          } else {
            fallbackLocators.push({ name, reference });
          }
        }
      }
    }
  }
  const {
    ignorePattern,
    packageRegistry,
    packageLocatorsByLocations
  } = runtimeState;
  function makeLogEntry(name, args) {
    return {
      fn: name,
      args,
      error: null,
      result: null
    };
  }
  function trace(entry) {
    const colors = process.stderr?.hasColors?.() ?? process.stdout.isTTY;
    const c = (n, str) => `\x1B[${n}m${str}\x1B[0m`;
    const error = entry.error;
    if (error)
      console.error(c(`31;1`, `\u2716 ${entry.error?.message.replace(/\n.*/s, ``)}`));
    else
      console.error(c(`33;1`, `\u203C Resolution`));
    if (entry.args.length > 0)
      console.error();
    for (const arg of entry.args)
      console.error(`  ${c(`37;1`, `In \u2190`)} ${nodeUtils.inspect(arg, { colors, compact: true })}`);
    if (entry.result) {
      console.error();
      console.error(`  ${c(`37;1`, `Out \u2192`)} ${nodeUtils.inspect(entry.result, { colors, compact: true })}`);
    }
    const stack = new Error().stack.match(/(?<=^ +)at.*/gm)?.slice(2) ?? [];
    if (stack.length > 0) {
      console.error();
      for (const line of stack) {
        console.error(`  ${c(`38;5;244`, line)}`);
      }
    }
    console.error();
  }
  function maybeLog(name, fn) {
    if (opts.allowDebug === false)
      return fn;
    if (Number.isFinite(debugLevel)) {
      if (debugLevel >= 2) {
        return (...args) => {
          const logEntry = makeLogEntry(name, args);
          try {
            return logEntry.result = fn(...args);
          } catch (error) {
            throw logEntry.error = error;
          } finally {
            trace(logEntry);
          }
        };
      } else if (debugLevel >= 1) {
        return (...args) => {
          try {
            return fn(...args);
          } catch (error) {
            const logEntry = makeLogEntry(name, args);
            logEntry.error = error;
            trace(logEntry);
            throw error;
          }
        };
      }
    }
    return fn;
  }
  function getPackageInformationSafe(packageLocator) {
    const packageInformation = getPackageInformation(packageLocator);
    if (!packageInformation) {
      throw makeError(
        ErrorCode.INTERNAL,
        `Couldn't find a matching entry in the dependency tree for the specified parent (this is probably an internal error)`
      );
    }
    return packageInformation;
  }
  function isDependencyTreeRoot(packageLocator) {
    if (packageLocator.name === null)
      return true;
    for (const dependencyTreeRoot of runtimeState.dependencyTreeRoots)
      if (dependencyTreeRoot.name === packageLocator.name && dependencyTreeRoot.reference === packageLocator.reference)
        return true;
    return false;
  }
  const defaultExportsConditions = /* @__PURE__ */ new Set([
    `node`,
    `require`,
    ...getOptionValue(`--conditions`)
  ]);
  function applyNodeExportsResolution(unqualifiedPath, conditions = defaultExportsConditions, issuer) {
    const locator = findPackageLocator(ppath.join(unqualifiedPath, `internal.js`), {
      resolveIgnored: true,
      includeDiscardFromLookup: true
    });
    if (locator === null) {
      throw makeError(
        ErrorCode.INTERNAL,
        `The locator that owns the "${unqualifiedPath}" path can't be found inside the dependency tree (this is probably an internal error)`
      );
    }
    const { packageLocation } = getPackageInformationSafe(locator);
    const manifestPath = ppath.join(packageLocation, Filename.manifest);
    if (!opts.fakeFs.existsSync(manifestPath))
      return null;
    const pkgJson = JSON.parse(opts.fakeFs.readFileSync(manifestPath, `utf8`));
    if (pkgJson.exports == null)
      return null;
    let subpath = ppath.contains(packageLocation, unqualifiedPath);
    if (subpath === null) {
      throw makeError(
        ErrorCode.INTERNAL,
        `unqualifiedPath doesn't contain the packageLocation (this is probably an internal error)`
      );
    }
    if (subpath !== `.` && !isRelativeRegexp.test(subpath))
      subpath = `./${subpath}`;
    try {
      const resolvedExport = packageExportsResolve({
        packageJSONUrl: url.pathToFileURL(npath.fromPortablePath(manifestPath)),
        packageSubpath: subpath,
        exports: pkgJson.exports,
        base: issuer ? url.pathToFileURL(npath.fromPortablePath(issuer)) : null,
        conditions
      });
      return npath.toPortablePath(url.fileURLToPath(resolvedExport));
    } catch (error) {
      throw makeError(
        ErrorCode.EXPORTS_RESOLUTION_FAILED,
        error.message,
        { unqualifiedPath: getPathForDisplay(unqualifiedPath), locator, pkgJson, subpath: getPathForDisplay(subpath), conditions },
        error.code
      );
    }
  }
  function applyNodeExtensionResolution(unqualifiedPath, candidates, { extensions }) {
    let stat;
    try {
      candidates.push(unqualifiedPath);
      stat = opts.fakeFs.statSync(unqualifiedPath);
    } catch (error) {
    }
    if (stat && !stat.isDirectory())
      return opts.fakeFs.realpathSync(unqualifiedPath);
    if (stat && stat.isDirectory()) {
      let pkgJson;
      try {
        pkgJson = JSON.parse(opts.fakeFs.readFileSync(ppath.join(unqualifiedPath, Filename.manifest), `utf8`));
      } catch (error) {
      }
      let nextUnqualifiedPath;
      if (pkgJson && pkgJson.main)
        nextUnqualifiedPath = ppath.resolve(unqualifiedPath, pkgJson.main);
      if (nextUnqualifiedPath && nextUnqualifiedPath !== unqualifiedPath) {
        const resolution = applyNodeExtensionResolution(nextUnqualifiedPath, candidates, { extensions });
        if (resolution !== null) {
          return resolution;
        }
      }
    }
    for (let i = 0, length = extensions.length; i < length; i++) {
      const candidateFile = `${unqualifiedPath}${extensions[i]}`;
      candidates.push(candidateFile);
      if (opts.fakeFs.existsSync(candidateFile)) {
        return candidateFile;
      }
    }
    if (stat && stat.isDirectory()) {
      for (let i = 0, length = extensions.length; i < length; i++) {
        const candidateFile = ppath.format({ dir: unqualifiedPath, name: `index`, ext: extensions[i] });
        candidates.push(candidateFile);
        if (opts.fakeFs.existsSync(candidateFile)) {
          return candidateFile;
        }
      }
    }
    return null;
  }
  function makeFakeModule(path) {
    const fakeModule = new require$$0.Module(path, null);
    fakeModule.filename = path;
    fakeModule.paths = require$$0.Module._nodeModulePaths(path);
    return fakeModule;
  }
  function callNativeResolution(request, issuer) {
    if (issuer.endsWith(`/`))
      issuer = ppath.join(issuer, `internal.js`);
    return require$$0.Module._resolveFilename(npath.fromPortablePath(request), makeFakeModule(npath.fromPortablePath(issuer)), false, { plugnplay: false });
  }
  function isPathIgnored(path) {
    if (ignorePattern === null)
      return false;
    const subPath = ppath.contains(runtimeState.basePath, path);
    if (subPath === null)
      return false;
    if (ignorePattern.test(subPath.replace(/\/$/, ``))) {
      return true;
    } else {
      return false;
    }
  }
  const VERSIONS = { std: 3, resolveVirtual: 1, getAllLocators: 1 };
  const topLevel = topLevelLocator;
  function getPackageInformation({ name, reference }) {
    const packageInformationStore = packageRegistry.get(name);
    if (!packageInformationStore)
      return null;
    const packageInformation = packageInformationStore.get(reference);
    if (!packageInformation)
      return null;
    return packageInformation;
  }
  function findPackageDependents({ name, reference }) {
    const dependents = [];
    for (const [dependentName, packageInformationStore] of packageRegistry) {
      if (dependentName === null)
        continue;
      for (const [dependentReference, packageInformation] of packageInformationStore) {
        if (dependentReference === null)
          continue;
        const dependencyReference = packageInformation.packageDependencies.get(name);
        if (dependencyReference !== reference)
          continue;
        if (dependentName === name && dependentReference === reference)
          continue;
        dependents.push({
          name: dependentName,
          reference: dependentReference
        });
      }
    }
    return dependents;
  }
  function findBrokenPeerDependencies(dependency, initialPackage) {
    const brokenPackages = /* @__PURE__ */ new Map();
    const alreadyVisited = /* @__PURE__ */ new Set();
    const traversal = (currentPackage) => {
      const identifier = JSON.stringify(currentPackage.name);
      if (alreadyVisited.has(identifier))
        return;
      alreadyVisited.add(identifier);
      const dependents = findPackageDependents(currentPackage);
      for (const dependent of dependents) {
        const dependentInformation = getPackageInformationSafe(dependent);
        if (dependentInformation.packagePeers.has(dependency)) {
          traversal(dependent);
        } else {
          let brokenSet = brokenPackages.get(dependent.name);
          if (typeof brokenSet === `undefined`)
            brokenPackages.set(dependent.name, brokenSet = /* @__PURE__ */ new Set());
          brokenSet.add(dependent.reference);
        }
      }
    };
    traversal(initialPackage);
    const brokenList = [];
    for (const name of [...brokenPackages.keys()].sort())
      for (const reference of [...brokenPackages.get(name)].sort())
        brokenList.push({ name, reference });
    return brokenList;
  }
  function findPackageLocator(location, { resolveIgnored = false, includeDiscardFromLookup = false } = {}) {
    if (isPathIgnored(location) && !resolveIgnored)
      return null;
    let relativeLocation = ppath.relative(runtimeState.basePath, location);
    if (!relativeLocation.match(isStrictRegExp))
      relativeLocation = `./${relativeLocation}`;
    if (!relativeLocation.endsWith(`/`))
      relativeLocation = `${relativeLocation}/`;
    do {
      const entry = packageLocatorsByLocations.get(relativeLocation);
      if (typeof entry === `undefined` || entry.discardFromLookup && !includeDiscardFromLookup) {
        relativeLocation = relativeLocation.substring(0, relativeLocation.lastIndexOf(`/`, relativeLocation.length - 2) + 1);
        continue;
      }
      return entry.locator;
    } while (relativeLocation !== ``);
    return null;
  }
  function tryReadFile(filePath) {
    try {
      return opts.fakeFs.readFileSync(npath.toPortablePath(filePath), `utf8`);
    } catch (err) {
      if (err.code === `ENOENT`)
        return void 0;
      throw err;
    }
  }
  function resolveToUnqualified(request, issuer, { considerBuiltins = true } = {}) {
    if (request.startsWith(`#`))
      throw new Error(`resolveToUnqualified can not handle private import mappings`);
    if (request === `pnpapi`)
      return npath.toPortablePath(opts.pnpapiResolution);
    if (considerBuiltins && require$$0.isBuiltin(request))
      return null;
    const requestForDisplay = getPathForDisplay(request);
    const issuerForDisplay = issuer && getPathForDisplay(issuer);
    if (issuer && isPathIgnored(issuer)) {
      if (!ppath.isAbsolute(request) || findPackageLocator(request) === null) {
        const result = callNativeResolution(request, issuer);
        if (result === false) {
          throw makeError(
            ErrorCode.BUILTIN_NODE_RESOLUTION_FAILED,
            `The builtin node resolution algorithm was unable to resolve the requested module (it didn't go through the pnp resolver because the issuer was explicitely ignored by the regexp)

Require request: "${requestForDisplay}"
Required by: ${issuerForDisplay}
`,
            { request: requestForDisplay, issuer: issuerForDisplay }
          );
        }
        return npath.toPortablePath(result);
      }
    }
    let unqualifiedPath;
    const dependencyNameMatch = request.match(pathRegExp);
    if (!dependencyNameMatch) {
      if (ppath.isAbsolute(request)) {
        unqualifiedPath = ppath.normalize(request);
      } else {
        if (!issuer) {
          throw makeError(
            ErrorCode.API_ERROR,
            `The resolveToUnqualified function must be called with a valid issuer when the path isn't a builtin nor absolute`,
            { request: requestForDisplay, issuer: issuerForDisplay }
          );
        }
        const absoluteIssuer = ppath.resolve(issuer);
        if (issuer.match(isDirRegExp)) {
          unqualifiedPath = ppath.normalize(ppath.join(absoluteIssuer, request));
        } else {
          unqualifiedPath = ppath.normalize(ppath.join(ppath.dirname(absoluteIssuer), request));
        }
      }
    } else {
      if (!issuer) {
        throw makeError(
          ErrorCode.API_ERROR,
          `The resolveToUnqualified function must be called with a valid issuer when the path isn't a builtin nor absolute`,
          { request: requestForDisplay, issuer: issuerForDisplay }
        );
      }
      const [, dependencyName, subPath] = dependencyNameMatch;
      const issuerLocator = findPackageLocator(issuer);
      if (!issuerLocator) {
        const result = callNativeResolution(request, issuer);
        if (result === false) {
          throw makeError(
            ErrorCode.BUILTIN_NODE_RESOLUTION_FAILED,
            `The builtin node resolution algorithm was unable to resolve the requested module (it didn't go through the pnp resolver because the issuer doesn't seem to be part of the Yarn-managed dependency tree).

Require path: "${requestForDisplay}"
Required by: ${issuerForDisplay}
`,
            { request: requestForDisplay, issuer: issuerForDisplay }
          );
        }
        return npath.toPortablePath(result);
      }
      const issuerInformation = getPackageInformationSafe(issuerLocator);
      let dependencyReference = issuerInformation.packageDependencies.get(dependencyName);
      let fallbackReference = null;
      if (dependencyReference == null) {
        if (issuerLocator.name !== null) {
          const exclusionEntry = runtimeState.fallbackExclusionList.get(issuerLocator.name);
          const canUseFallbacks = !exclusionEntry || !exclusionEntry.has(issuerLocator.reference);
          if (canUseFallbacks) {
            for (let t = 0, T = fallbackLocators.length; t < T; ++t) {
              const fallbackInformation = getPackageInformationSafe(fallbackLocators[t]);
              const reference = fallbackInformation.packageDependencies.get(dependencyName);
              if (reference == null)
                continue;
              if (alwaysWarnOnFallback)
                fallbackReference = reference;
              else
                dependencyReference = reference;
              break;
            }
            if (runtimeState.enableTopLevelFallback) {
              if (dependencyReference == null && fallbackReference === null) {
                const reference = runtimeState.fallbackPool.get(dependencyName);
                if (reference != null) {
                  fallbackReference = reference;
                }
              }
            }
          }
        }
      }
      let error = null;
      if (dependencyReference === null) {
        if (isDependencyTreeRoot(issuerLocator)) {
          error = makeError(
            ErrorCode.MISSING_PEER_DEPENDENCY,
            `Your application tried to access ${dependencyName} (a peer dependency); this isn't allowed as there is no ancestor to satisfy the requirement. Use a devDependency if needed.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerForDisplay}
`,
            { request: requestForDisplay, issuer: issuerForDisplay, dependencyName }
          );
        } else {
          const brokenAncestors = findBrokenPeerDependencies(dependencyName, issuerLocator);
          if (brokenAncestors.every((ancestor) => isDependencyTreeRoot(ancestor))) {
            error = makeError(
              ErrorCode.MISSING_PEER_DEPENDENCY,
              `${issuerLocator.name} tried to access ${dependencyName} (a peer dependency) but it isn't provided by your application; this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuerForDisplay})
${brokenAncestors.map((ancestorLocator) => `Ancestor breaking the chain: ${ancestorLocator.name}@${ancestorLocator.reference}
`).join(``)}
`,
              { request: requestForDisplay, issuer: issuerForDisplay, issuerLocator: Object.assign({}, issuerLocator), dependencyName, brokenAncestors }
            );
          } else {
            error = makeError(
              ErrorCode.MISSING_PEER_DEPENDENCY,
              `${issuerLocator.name} tried to access ${dependencyName} (a peer dependency) but it isn't provided by its ancestors; this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuerForDisplay})

${brokenAncestors.map((ancestorLocator) => `Ancestor breaking the chain: ${ancestorLocator.name}@${ancestorLocator.reference}
`).join(``)}
`,
              { request: requestForDisplay, issuer: issuerForDisplay, issuerLocator: Object.assign({}, issuerLocator), dependencyName, brokenAncestors }
            );
          }
        }
      } else if (dependencyReference === void 0) {
        if (!considerBuiltins && require$$0.isBuiltin(request)) {
          if (isDependencyTreeRoot(issuerLocator)) {
            error = makeError(
              ErrorCode.UNDECLARED_DEPENDENCY,
              `Your application tried to access ${dependencyName}. While this module is usually interpreted as a Node builtin, your resolver is running inside a non-Node resolution context where such builtins are ignored. Since ${dependencyName} isn't otherwise declared in your dependencies, this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerForDisplay}
`,
              { request: requestForDisplay, issuer: issuerForDisplay, dependencyName }
            );
          } else {
            error = makeError(
              ErrorCode.UNDECLARED_DEPENDENCY,
              `${issuerLocator.name} tried to access ${dependencyName}. While this module is usually interpreted as a Node builtin, your resolver is running inside a non-Node resolution context where such builtins are ignored. Since ${dependencyName} isn't otherwise declared in ${issuerLocator.name}'s dependencies, this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerForDisplay}
`,
              { request: requestForDisplay, issuer: issuerForDisplay, issuerLocator: Object.assign({}, issuerLocator), dependencyName }
            );
          }
        } else {
          if (isDependencyTreeRoot(issuerLocator)) {
            error = makeError(
              ErrorCode.UNDECLARED_DEPENDENCY,
              `Your application tried to access ${dependencyName}, but it isn't declared in your dependencies; this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerForDisplay}
`,
              { request: requestForDisplay, issuer: issuerForDisplay, dependencyName }
            );
          } else {
            error = makeError(
              ErrorCode.UNDECLARED_DEPENDENCY,
              `${issuerLocator.name} tried to access ${dependencyName}, but it isn't declared in its dependencies; this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuerForDisplay})
`,
              { request: requestForDisplay, issuer: issuerForDisplay, issuerLocator: Object.assign({}, issuerLocator), dependencyName }
            );
          }
        }
      }
      if (dependencyReference == null) {
        if (fallbackReference === null || error === null)
          throw error || new Error(`Assertion failed: Expected an error to have been set`);
        dependencyReference = fallbackReference;
        const message = error.message.replace(/\n.*/g, ``);
        error.message = message;
        if (!emittedWarnings.has(message) && debugLevel !== 0) {
          emittedWarnings.add(message);
          process.emitWarning(error);
        }
      }
      const dependencyLocator = Array.isArray(dependencyReference) ? { name: dependencyReference[0], reference: dependencyReference[1] } : { name: dependencyName, reference: dependencyReference };
      const dependencyInformation = getPackageInformationSafe(dependencyLocator);
      if (!dependencyInformation.packageLocation) {
        throw makeError(
          ErrorCode.MISSING_DEPENDENCY,
          `A dependency seems valid but didn't get installed for some reason. This might be caused by a partial install, such as dev vs prod.

Required package: ${dependencyLocator.name}@${dependencyLocator.reference}${dependencyLocator.name !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuerForDisplay})
`,
          { request: requestForDisplay, issuer: issuerForDisplay, dependencyLocator: Object.assign({}, dependencyLocator) }
        );
      }
      const dependencyLocation = dependencyInformation.packageLocation;
      if (subPath) {
        unqualifiedPath = ppath.join(dependencyLocation, subPath);
      } else {
        unqualifiedPath = dependencyLocation;
      }
    }
    return ppath.normalize(unqualifiedPath);
  }
  function resolveUnqualifiedExport(request, unqualifiedPath, conditions = defaultExportsConditions, issuer) {
    if (isStrictRegExp.test(request))
      return unqualifiedPath;
    const unqualifiedExportPath = applyNodeExportsResolution(unqualifiedPath, conditions, issuer);
    if (unqualifiedExportPath) {
      return ppath.normalize(unqualifiedExportPath);
    } else {
      return unqualifiedPath;
    }
  }
  function resolveUnqualified(unqualifiedPath, { extensions = Object.keys(require$$0.Module._extensions) } = {}) {
    const candidates = [];
    const qualifiedPath = applyNodeExtensionResolution(unqualifiedPath, candidates, { extensions });
    if (qualifiedPath) {
      return ppath.normalize(qualifiedPath);
    } else {
      reportRequiredFilesToWatchMode(candidates.map((candidate) => npath.fromPortablePath(candidate)));
      const unqualifiedPathForDisplay = getPathForDisplay(unqualifiedPath);
      const containingPackage = findPackageLocator(unqualifiedPath);
      if (containingPackage) {
        const { packageLocation } = getPackageInformationSafe(containingPackage);
        let exists = true;
        try {
          opts.fakeFs.accessSync(packageLocation);
        } catch (err) {
          if (err?.code === `ENOENT`) {
            exists = false;
          } else {
            const readableError = (err?.message ?? err ?? `empty exception thrown`).replace(/^[A-Z]/, ($0) => $0.toLowerCase());
            throw makeError(ErrorCode.QUALIFIED_PATH_RESOLUTION_FAILED, `Required package exists but could not be accessed (${readableError}).

Missing package: ${containingPackage.name}@${containingPackage.reference}
Expected package location: ${getPathForDisplay(packageLocation)}
`, { unqualifiedPath: unqualifiedPathForDisplay, extensions });
          }
        }
        if (!exists) {
          const errorMessage = packageLocation.includes(`/unplugged/`) ? `Required unplugged package missing from disk. This may happen when switching branches without running installs (unplugged packages must be fully materialized on disk to work).` : `Required package missing from disk. If you keep your packages inside your repository then restarting the Node process may be enough. Otherwise, try to run an install first.`;
          throw makeError(
            ErrorCode.QUALIFIED_PATH_RESOLUTION_FAILED,
            `${errorMessage}

Missing package: ${containingPackage.name}@${containingPackage.reference}
Expected package location: ${getPathForDisplay(packageLocation)}
`,
            { unqualifiedPath: unqualifiedPathForDisplay, extensions }
          );
        }
      }
      throw makeError(
        ErrorCode.QUALIFIED_PATH_RESOLUTION_FAILED,
        `Qualified path resolution failed: we looked for the following paths, but none could be accessed.

Source path: ${unqualifiedPathForDisplay}
${candidates.map((candidate) => `Not found: ${getPathForDisplay(candidate)}
`).join(``)}`,
        { unqualifiedPath: unqualifiedPathForDisplay, extensions }
      );
    }
  }
  function resolvePrivateRequest(request, issuer, opts2) {
    if (!issuer)
      throw new Error(`Assertion failed: An issuer is required to resolve private import mappings`);
    const resolved = packageImportsResolve({
      name: request,
      base: url.pathToFileURL(npath.fromPortablePath(issuer)),
      conditions: opts2.conditions ?? defaultExportsConditions,
      readFileSyncFn: tryReadFile
    });
    if (resolved instanceof URL) {
      return resolveUnqualified(npath.toPortablePath(url.fileURLToPath(resolved)), { extensions: opts2.extensions });
    } else {
      if (resolved.startsWith(`#`))
        throw new Error(`Mapping from one private import to another isn't allowed`);
      return resolveRequest(resolved, issuer, opts2);
    }
  }
  function resolveRequest(request, issuer, opts2 = {}) {
    try {
      if (request.startsWith(`#`))
        return resolvePrivateRequest(request, issuer, opts2);
      const { considerBuiltins, extensions, conditions } = opts2;
      const unqualifiedPath = resolveToUnqualified(request, issuer, { considerBuiltins });
      if (request === `pnpapi`)
        return unqualifiedPath;
      if (unqualifiedPath === null)
        return null;
      const isIssuerIgnored = () => issuer !== null ? isPathIgnored(issuer) : false;
      const remappedPath = (!considerBuiltins || !require$$0.isBuiltin(request)) && !isIssuerIgnored() ? resolveUnqualifiedExport(request, unqualifiedPath, conditions, issuer) : unqualifiedPath;
      return resolveUnqualified(remappedPath, { extensions });
    } catch (error) {
      if (Object.hasOwn(error, `pnpCode`))
        Object.assign(error.data, { request: getPathForDisplay(request), issuer: issuer && getPathForDisplay(issuer) });
      throw error;
    }
  }
  function resolveVirtual(request) {
    const normalized = ppath.normalize(request);
    const resolved = VirtualFS.resolveVirtual(normalized);
    return resolved !== normalized ? resolved : null;
  }
  return {
    VERSIONS,
    topLevel,
    getLocator: (name, referencish) => {
      if (Array.isArray(referencish)) {
        return { name: referencish[0], reference: referencish[1] };
      } else {
        return { name, reference: referencish };
      }
    },
    getDependencyTreeRoots: () => {
      return [...runtimeState.dependencyTreeRoots];
    },
    getAllLocators() {
      const locators = [];
      for (const [name, entry] of packageRegistry)
        for (const reference of entry.keys())
          if (name !== null && reference !== null)
            locators.push({ name, reference });
      return locators;
    },
    getPackageInformation: (locator) => {
      const info = getPackageInformation(locator);
      if (info === null)
        return null;
      const packageLocation = npath.fromPortablePath(info.packageLocation);
      const nativeInfo = { ...info, packageLocation };
      return nativeInfo;
    },
    findPackageLocator: (path) => {
      return findPackageLocator(npath.toPortablePath(path));
    },
    resolveToUnqualified: maybeLog(`resolveToUnqualified`, (request, issuer, opts2) => {
      const portableIssuer = issuer !== null ? npath.toPortablePath(issuer) : null;
      const resolution = resolveToUnqualified(npath.toPortablePath(request), portableIssuer, opts2);
      if (resolution === null)
        return null;
      return npath.fromPortablePath(resolution);
    }),
    resolveUnqualified: maybeLog(`resolveUnqualified`, (unqualifiedPath, opts2) => {
      return npath.fromPortablePath(resolveUnqualified(npath.toPortablePath(unqualifiedPath), opts2));
    }),
    resolveRequest: maybeLog(`resolveRequest`, (request, issuer, opts2) => {
      const portableIssuer = issuer !== null ? npath.toPortablePath(issuer) : null;
      const resolution = resolveRequest(npath.toPortablePath(request), portableIssuer, opts2);
      if (resolution === null)
        return null;
      return npath.fromPortablePath(resolution);
    }),
    resolveVirtual: maybeLog(`resolveVirtual`, (path) => {
      const result = resolveVirtual(npath.toPortablePath(path));
      if (result !== null) {
        return npath.fromPortablePath(result);
      } else {
        return null;
      }
    })
  };
}

function makeManager(pnpapi, opts) {
  const initialApiPath = npath.toPortablePath(pnpapi.resolveToUnqualified(`pnpapi`, null));
  const initialApiStats = opts.fakeFs.statSync(npath.toPortablePath(initialApiPath));
  const apiMetadata = /* @__PURE__ */ new Map([
    [initialApiPath, {
      instance: pnpapi,
      stats: initialApiStats,
      lastRefreshCheck: Date.now()
    }]
  ]);
  function loadApiInstance(pnpApiPath) {
    const nativePath = npath.fromPortablePath(pnpApiPath);
    const module = new require$$0.Module(nativePath, null);
    module.load(nativePath);
    return module.exports;
  }
  function refreshApiEntry(pnpApiPath, apiEntry) {
    const timeNow = Date.now();
    if (timeNow - apiEntry.lastRefreshCheck < 500)
      return;
    apiEntry.lastRefreshCheck = timeNow;
    const stats = opts.fakeFs.statSync(pnpApiPath);
    if (stats.mtime > apiEntry.stats.mtime) {
      process.emitWarning(`[Warning] The runtime detected new information in a PnP file; reloading the API instance (${npath.fromPortablePath(pnpApiPath)})`);
      apiEntry.stats = stats;
      apiEntry.instance = loadApiInstance(pnpApiPath);
    }
  }
  function getApiEntry(pnpApiPath, refresh = false) {
    let apiEntry = apiMetadata.get(pnpApiPath);
    if (typeof apiEntry !== `undefined`) {
      if (refresh) {
        refreshApiEntry(pnpApiPath, apiEntry);
      }
    } else {
      apiMetadata.set(pnpApiPath, apiEntry = {
        instance: loadApiInstance(pnpApiPath),
        stats: opts.fakeFs.statSync(pnpApiPath),
        lastRefreshCheck: Date.now()
      });
    }
    return apiEntry;
  }
  const findApiPathCache = /* @__PURE__ */ new Map();
  function addToCacheAndReturn(start, end, target) {
    if (target !== null) {
      target = VirtualFS.resolveVirtual(target);
      target = opts.fakeFs.realpathSync(target);
    }
    let curr;
    let next = start;
    do {
      curr = next;
      findApiPathCache.set(curr, target);
      next = ppath.dirname(curr);
    } while (curr !== end);
    return target;
  }
  function findApiPathFor(modulePath) {
    let bestCandidate = null;
    for (const [apiPath, apiEntry] of apiMetadata) {
      const locator = apiEntry.instance.findPackageLocator(modulePath);
      if (!locator)
        continue;
      if (apiMetadata.size === 1)
        return apiPath;
      const packageInformation = apiEntry.instance.getPackageInformation(locator);
      if (!packageInformation)
        throw new Error(`Assertion failed: Couldn't get package information for '${modulePath}'`);
      if (!bestCandidate)
        bestCandidate = { packageLocation: packageInformation.packageLocation, apiPaths: [] };
      if (packageInformation.packageLocation === bestCandidate.packageLocation) {
        bestCandidate.apiPaths.push(apiPath);
      } else if (packageInformation.packageLocation.length > bestCandidate.packageLocation.length) {
        bestCandidate = { packageLocation: packageInformation.packageLocation, apiPaths: [apiPath] };
      }
    }
    if (bestCandidate) {
      if (bestCandidate.apiPaths.length === 1)
        return bestCandidate.apiPaths[0];
      const controlSegment = bestCandidate.apiPaths.map((apiPath) => `  ${npath.fromPortablePath(apiPath)}`).join(`
`);
      throw new Error(`Unable to locate pnpapi, the module '${modulePath}' is controlled by multiple pnpapi instances.
This is usually caused by using the global cache (enableGlobalCache: true)

Controlled by:
${controlSegment}
`);
    }
    const start = ppath.resolve(npath.toPortablePath(modulePath));
    let curr;
    let next = start;
    do {
      curr = next;
      const cached = findApiPathCache.get(curr);
      if (cached !== void 0)
        return addToCacheAndReturn(start, curr, cached);
      const cjsCandidate = ppath.join(curr, Filename.pnpCjs);
      if (opts.fakeFs.existsSync(cjsCandidate) && opts.fakeFs.statSync(cjsCandidate).isFile())
        return addToCacheAndReturn(start, curr, cjsCandidate);
      const legacyCjsCandidate = ppath.join(curr, Filename.pnpJs);
      if (opts.fakeFs.existsSync(legacyCjsCandidate) && opts.fakeFs.statSync(legacyCjsCandidate).isFile())
        return addToCacheAndReturn(start, curr, legacyCjsCandidate);
      next = ppath.dirname(curr);
    } while (curr !== PortablePath.root);
    return addToCacheAndReturn(start, curr, null);
  }
  const moduleToApiPathCache = /* @__PURE__ */ new WeakMap();
  function getApiPathFromParent(parent) {
    if (parent == null)
      return initialApiPath;
    let apiPath = moduleToApiPathCache.get(parent);
    if (typeof apiPath !== `undefined`)
      return apiPath;
    apiPath = parent.filename ? findApiPathFor(parent.filename) : null;
    moduleToApiPathCache.set(parent, apiPath);
    return apiPath;
  }
  return {
    getApiPathFromParent,
    findApiPathFor,
    getApiEntry
  };
}

const localFs = { ...fs__default.default };
const nodeFs = new NodeFS(localFs);
const defaultRuntimeState = $$SETUP_STATE(hydrateRuntimeState);
const defaultPnpapiResolution = __filename;
const defaultFsLayer = new VirtualFS({
  baseFs: new ZipOpenFS({
    baseFs: nodeFs,
    maxOpenFiles: 80,
    readOnlyArchives: true
  })
});
class DynamicFS extends ProxiedFS {
  baseFs = defaultFsLayer;
  constructor() {
    super(ppath);
  }
  mapToBase(p) {
    return p;
  }
  mapFromBase(p) {
    return p;
  }
}
const dynamicFsLayer = new DynamicFS();
let manager;
const defaultApi = Object.assign(makeApi(defaultRuntimeState, {
  fakeFs: dynamicFsLayer,
  pnpapiResolution: defaultPnpapiResolution
}), {
  /**
   * Can be used to generate a different API than the default one (for example
   * to map it on `/` rather than the local directory path, or to use a
   * different FS layer than the default one).
   */
  makeApi: ({
    basePath = void 0,
    fakeFs = dynamicFsLayer,
    pnpapiResolution = defaultPnpapiResolution,
    ...rest
  }) => {
    const apiRuntimeState = typeof basePath !== `undefined` ? $$SETUP_STATE(hydrateRuntimeState, basePath) : defaultRuntimeState;
    return makeApi(apiRuntimeState, {
      fakeFs,
      pnpapiResolution,
      ...rest
    });
  },
  /**
   * Will inject the specified API into the environment, monkey-patching FS. Is
   * automatically called when the hook is loaded through `--require`.
   */
  setup: (api) => {
    applyPatch(api || defaultApi, {
      fakeFs: defaultFsLayer,
      manager
    });
    dynamicFsLayer.baseFs = new NodeFS(fs__default.default);
  }
});
manager = makeManager(defaultApi, {
  fakeFs: dynamicFsLayer
});
if (module.parent && module.parent.id === `internal/preload`) {
  defaultApi.setup();
  if (module.filename) {
    delete require$$0__default.default._cache[module.filename];
  }
}
if (process.mainModule === module) {
  const reportError = (code, message, data) => {
    process.stdout.write(`${JSON.stringify([{ code, message, data }, null])}
`);
  };
  const reportSuccess = (resolution) => {
    process.stdout.write(`${JSON.stringify([null, resolution])}
`);
  };
  const processResolution = (request, issuer) => {
    try {
      reportSuccess(defaultApi.resolveRequest(request, issuer));
    } catch (error) {
      reportError(error.code, error.message, error.data);
    }
  };
  const processRequest = (data) => {
    try {
      const [request, issuer] = JSON.parse(data);
      processResolution(request, issuer);
    } catch (error) {
      reportError(`INVALID_JSON`, error.message, error.data);
    }
  };
  if (process.argv.length > 2) {
    if (process.argv.length !== 4) {
      process.stderr.write(`Usage: ${process.argv[0]} ${process.argv[1]} <request> <issuer>
`);
      process.exitCode = 64;
    } else {
      processResolution(process.argv[2], process.argv[3]);
    }
  } else {
    let buffer = ``;
    const decoder = new StringDecoder__default.default.StringDecoder();
    process.stdin.on(`data`, (chunk) => {
      buffer += decoder.write(chunk);
      do {
        const index = buffer.indexOf(`
`);
        if (index === -1)
          break;
        const line = buffer.slice(0, index);
        buffer = buffer.slice(index + 1);
        processRequest(line);
      } while (true);
    });
  }
}

module.exports = defaultApi;
