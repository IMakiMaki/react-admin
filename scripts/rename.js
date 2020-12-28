// 重命名打包后的build文件夹
/**
 * Q: 为什么不直接更改react-scripts打包文件夹名的配置？
 * A: react-scripts 在打包完之后还有对打包文件的分析，其中有一部分操作针对的是build/文件夹，只是更改打包文件夹名会造成分析报错，
 * 同时hack打包程序内部文件的配置有后续升级风险。所以选择了修改node-mv（https://github.com/andrewrk/node-mv）并写一个webpack插件
 * 来完成相应操作
 */
var fs = require("fs");
var ncp = require("ncp").ncp;
var path = require("path");
var rimraf = require("rimraf");
var mkdirp = require("mkdirp");

function mv(source, dest, options, cb) {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }
  var shouldMkdirp = !!options.mkdirp;
  var clobber = options.clobber !== false;
  var limit = options.limit || 16;
  var rmSource = options.rmSource === true;

  if (shouldMkdirp) {
    mkdirs();
  } else {
    doRename();
  }

  function mkdirs() {
    mkdirp(path.dirname(dest))
      .then((res) => {
        doRename();
      })
      .catch((err) => {
        return cb(err);
      });
  }

  function doRename() {
    if (clobber) {
      fs.rename(source, dest, function (err) {
        if (!err) return cb();
        if (err.code !== "EXDEV") return cb(err);
        moveFileAcrossDevice(source, dest, clobber, limit, cb, rmSource);
      });
    } else {
      fs.link(source, dest, function (err) {
        if (err) {
          if (err.code === "EXDEV") {
            moveFileAcrossDevice(source, dest, clobber, limit, cb, rmSource);
            return;
          }
          if (err.code === "EISDIR" || err.code === "EPERM") {
            moveDirAcrossDevice(source, dest, clobber, limit, cb, rmSource);
            return;
          }
          cb(err);
          return;
        }
        fs.unlink(source, cb);
      });
    }
  }
}

function moveFileAcrossDevice(source, dest, clobber, limit, cb, rmSource) {
  var outFlags = clobber ? "w" : "wx";
  var ins = fs.createReadStream(source);
  var outs = fs.createWriteStream(dest, { flags: outFlags });
  ins.on("error", function (err) {
    ins.destroy();
    outs.destroy();
    outs.removeListener("close", onClose);
    if (err.code === "EISDIR" || err.code === "EPERM") {
      moveDirAcrossDevice(source, dest, clobber, limit, cb, rmSource);
    } else {
      cb(err);
    }
  });
  outs.on("error", function (err) {
    ins.destroy();
    outs.destroy();
    outs.removeListener("close", onClose);
    cb(err);
  });
  outs.once("close", onClose);
  ins.pipe(outs);
  function onClose() {
    fs.unlink(source, cb);
  }
}

function moveDirAcrossDevice(source, dest, clobber, limit, cb, rmSource) {
  var options = {
    stopOnErr: true,
    clobber: false,
    limit: limit,
  };
  if (clobber) {
    rimraf(dest, { disableGlob: true }, function (err) {
      if (err) return cb(err);
      startNcp();
    });
  } else {
    startNcp();
  }
  function startNcp() {
    ncp(source, dest, options, function (errList) {
      if (errList) return cb(errList[0]);
      rmSource && rimraf(source, { disableGlob: true }, cb);
    });
  }
}

class RenameBuildDirectoryPlugin {
  constructor(options) {
    this.options = options || {
      source: "build",
      target: "dist",
    };
  }
  // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
  apply(compiler) {
    // 指定要附加到的事件钩子函数
    compiler.hooks.done.tap("RenameBuildDirectoryPlugin", (compilation) => {
      try {
        mv(
          path.join(__dirname, `../${this.options.source}`),
          path.join(__dirname, `../${this.options.target}`),
          { mkdirp: true, clobber: false, rmSource: false },
          function (err) {
            if (err !== null) {
              console.error(err, "err");
            }
          }
        );
      } catch (err) {
        console.error("Caught error", err);
      }
    });
  }
}

module.exports = RenameBuildDirectoryPlugin;
