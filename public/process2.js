!function(e, a) {
    "undefined" != typeof module ? module.exports = a() : "function" == typeof define && "object" == typeof define.amd ? define(a) : this.bTerminal = a()
}(0, function() {
    var e, a, r, c = cursY = 0, s = "#tdisplay", n = !1, o = !1, i = !0, t = [], b = [], k = !0, f = function() {
        $("#termstatus #termcaps").css("color", n ? "white" : "#777"),
        $("#termstatus #termcr").css("color", o ? "white" : "#777")
    }, u = function() {
        for (var e = "", a = 0; a < 80; a++)
            e += '<span class="col' + a + '"> </span>';
        var r = "";
        for (a = 0; a < 25; a++)
            r += '<div id="line' + a + '">' + e + "</div>";
        $(s).html(r),
        c = cursY = 0
    }, l = function(e, a, r) {
        t.push({
            line: e,
            pos: a,
            znak: r,
            render: w
        }),
        b[e][a] = r,
        k && O()
    }, d = function(e, a) {
        e == c && a == cursY || ($(s + " #line" + a + " .col" + e).removeClass("cursor"),
        $(s + " #line" + cursY + " .col" + c).addClass("cursor"))
    }, g = function() {
        k && O()
    }, v = 0, h = "", m = function() {
        80 == ++c && (c = 0,
        y()),
        g()
    }, p = function() {
        80 == ++c && (c = 79),
        g()
    }, Y = function() {
        --c < 0 && (c = 0),
        g()
    }, y = function() {
        cursY++,
        25 == cursY && (A(),
        cursY = 24)
    }, C = function() {
        cursY++,
        25 == cursY && (cursY = 24)
    }, S = function() {
        cursY > 0 && cursY--
    }, w = {
        fg: null,
        bg: null,
        bright: 0
    };
    doANSI = function(e) {
        if ("[" == e[0]) {
            var s, n = e[e.length - 1], o = e.substr(1, e.length - 2).trim(), i = o.split(";").map(function(e) {
                return parseInt(e)
            }), t = o.length > 0 ? i[0] : 1;
            switch (console.log(n, o, t),
            n) {
            case "A":
                for (s = 0; s < t; s++)
                    S();
                break;
            case "B":
                for (s = 0; s < t; s++)
                    C();
                break;
            case "C":
                for (s = 0; s < t; s++)
                    p();
                break;
            case "D":
                for (s = 0; s < t; s++)
                    Y();
                break;
            case "E":
                for (s = 0; s < t; s++)
                    y();
                break;
            case "F":
                for (s = 0; s < t; s++)
                    S();
                c = 0;
                break;
            case "G":
                (c = t) < 0 && (c = 0),
                c >= 80 && (c = 79);
                break;
            case "H":
            case "f":
                (c = i[0]) < 0 && (c = 0),
                c >= 80 && (c = 79),
                cursY = i[1],
                cursY < 0 && (cursY = 0),
                cursY >= 25 && (cursY = 24);
                break;
            case "J":
                u();
                break;
            case "S":
                for (s = 0; s < t; s++)
                    A();
                break;
            case "s":
                a = c,
                r = cursY;
                break;
            case "u":
                c = a,
                cursY = r;
                break;
            case "m":
                if (!o.length)
                    break;
                for (s = 0; s < i.length; s++) {
                    var b = i[s];
                    if (0 === b) {
                        w.bg = null,
                        w.fg = null,
                        w.bright = 0;
                        break
                    }
                    if (1 === b) {
                        w.bright = 1;
                        break
                    }
                    if (2 === b || 22 === b) {
                        w.bright = 0;
                        break
                    }
                    if (b >= 30 && b <= 37) {
                        w.fg = b - 30;
                        break
                    }
                    if (b >= 40 && b <= 47) {
                        w.bg = b - 40;
                        break
                    }
                }
            }
        }
    }
    ;
    var A = function() {
        O();
        for (e = 0; e < 24; e++)
            b[e] = b[e + 1].slice(0);
        for (var e = 0; e < 80; e++)
            b[24][e] = " ";
        var a = "";
        for (e = 0; e < 25; e++) {
            for (var r = "", c = 0; c < 80; c++) {
                if (e < 24)
                    var n = $("#line" + (e + 1) + " .col" + c).css("color")
                      , o = $("#line" + (e + 1) + " .col" + c).css("background-color");
                else
                    n = K[w.bright][w.fg],
                    o = K[w.bright][w.bg];
                r += '<span class="col' + c + '" style="color:' + n + ";background-color:" + o + '">' + b[e][c] + "</span>"
            }
            a += '<div id="line' + e + '">' + r + "</div>"
        }
        $(s).html(a)
    }
      , K = [["#000", "#800", "#080", "#880", "#008", "#808", "#088", "#888"], ["#000", "#f00", "#0f0", "#ff0", "#00f", "#f0f", "#0ff", "#fff"]]
      , O = function() {
        t.map(function(e) {
            $(s + " #line" + e.line + " .col" + e.pos).html(e.znak),
            null !== e.render.fg && $(s + " #line" + e.line + " .col" + e.pos).css("color", K[e.render.bright][e.render.fg]),
            null !== e.render.bg && $(s + " #line" + e.line + " .col" + e.pos).css("background-color", K[e.render.bright][e.render.bg])
        }),
        t = [],
        d(I, z),
        I = c,
        z = cursY
    };
    $(document).bind("keydown", function(a) {
        if (i) {
            var r = a.keyCode;
            switch (r) {
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 40:
            case 45:
            case 46:
            case 91:
            case 92:
            case 93:
                return;
            case 96:
                r = 48;
                break;
            case 97:
                r = 49;
                break;
            case 98:
                r = 50;
                break;
            case 99:
                r = 51;
                break;
            case 100:
                r = 52;
                break;
            case 101:
                r = 53;
                break;
            case 102:
                r = 54;
                break;
            case 103:
                r = 55;
                break;
            case 104:
                r = 56;
                break;
            case 105:
                r = 57;
                break;
            case 106:
                r = 42;
                break;
            case 107:
                r = 43;
                break;
            case 109:
                r = 45;
                break;
            case 110:
                r = 46;
                break;
            case 111:
                r = 47;
                break;
            case 112:
                r = "OP";
                break;
            case 113:
                r = "OQ";
                break;
            case 114:
                r = "OR";
                break;
            case 115:
                r = "OS";
                break;
            case 116:
                r = "[15~";
                break;
            case 117:
                r = "[17~";
                break;
            case 118:
                r = "[18~";
                break;
            case 119:
                r = "[19~";
                break;
            case 120:
                r = "[20~";
                break;
            case 121:
                r = "[21~";
                break;
            case 122:
                r = "[23~";
                break;
            case 123:
                r = "[24~";
                break;
            case 144:
                return;
            case 145:
                return void (o = !o);
            case 186:
                r = 59;
                break;
            case 187:
                r = 61;
                break;
            case 188:
                r = 44;
                break;
            case 189:
                r = 45;
                break;
            case 190:
                r = 46;
                break;
            case 191:
                r = 47;
                break;
            case 192:
                r = 96;
                break;
            case 219:
                r = 91;
                break;
            case 220:
                r = 92;
                break;
            case 221:
                r = 93;
                break;
            case 222:
                r = 39
            }
            if (r > 64 && r < 91 && (a.shiftKey || a.ctrlKey || n || (r += 32),
            !a.shiftKey && a.ctrlKey && (r -= 64)),
            a.shiftKey)
                switch (r) {
                case 39:
                    r = 34;
                    break;
                case 44:
                    r = 60;
                    break;
                case 45:
                    r = 95;
                    break;
                case 46:
                    r = 62;
                    break;
                case 47:
                    r = 63;
                    break;
                case 48:
                    r = 41;
                    break;
                case 49:
                    r = 33;
                    break;
                case 50:
                    r = 64;
                    break;
                case 51:
                    r = 35;
                    break;
                case 52:
                    r = 36;
                    break;
                case 53:
                    r = 37;
                    break;
                case 54:
                    r = 94;
                    break;
                case 55:
                    r = 38;
                    break;
                case 56:
                    r = 42;
                    break;
                case 57:
                    r = 40;
                    break;
                case 59:
                    r = 58;
                    break;
                case 61:
                    r = 43;
                    break;
                case 91:
                    r = 123;
                    break;
                case 92:
                    r = 124;
                    break;
                case 93:
                    r = 125;
                    break;
                case 96:
                    r = 126
                }
            r > 1 && r < 128 && a.preventDefault(),
            e(String.fromCharCode(r)),
            o && 13 == r && e(String.fromCharCode(10))
        }
    });
    var I, z;
    return {
        init: function(a, r, c) {
            s = a,
            e = r,
            c && (k = !1),
            u(),
            $(s).after('<div id="termstatus"><span id="termcaps">CAPS</span><span id="termcr">CRLF</span></div>'),
            f(),
            $("#termstatus #termcaps").click(function() {
                n = !n,
                f()
            }),
            $("#termstatus #termcr").click(function() {
                o = !o,
                f()
            });
            for (var i = 0; i < 25; i++) {
                b[i] = [];
                for (var t = 0; t < 80; t++)
                    b[i][t] = " "
            }
        },
        caps: function(e) {
            n = e,
            f()
        },
        keylock: function(e) {
            i = e
        },
        cls: u,
        animate: O,
        outchar: function(e) {
            var a = e.charCodeAt(0);
            return 1 == v ? (h += e,
            91 == a ? void (v = 2) : void (v = 0)) : 2 == v ? (h += e,
            void (a >= 64 && (v = 0,
            doANSI(h),
            h = ""))) : a > 31 ? (l(cursY, c, e),
            void m()) : 13 == a ? (c = 0,
            void g()) : 10 == a ? (y(),
            void g()) : void (8 != a ? 27 != a || (v = 1) : Y())
        }
    }
});
var getPorts = function(t) {
    var e = new WebSocket("ws://localhost:1311/_list");
    e.onerror = function(e) {
        UI_alert("WSCOM is not running. Please install <a href=https://www.npmjs.com/package/wscom>WSCOM tool</a>, run it and try it again!", "Error", "alert"),
        t && t("nowscom")
    }
    ,
    e.onmessage = function(o) {
        ports = JSON.parse(o.data),
        e.close(),
        t && t(null, ports),
        $("#comports").html("");
        for (var n = getXTparam(), a = 0; a < ports.length; a++) {
            var r = ports[a].comName.replace("/null/", "")
              , s = ports[a].comName == n.port;
            $("#comports").append("<option value='" + ports[a].comName + "'" + (s ? " selected" : "") + ">" + r + "</option>")
        }
        $("#comspeed option").removeAttr("selected").filter("[value=" + n.speed + "]").attr("selected", !0)
    }
}
  , getXTparam = function() {
    return void 0 !== window.localStorage.xTerm ? JSON.parse(window.localStorage.xTerm) : {
        port: null,
        speed: 115200
    }
}
  , xtConn = null
  , xtConnect = function(t, e) {
    (xtConn = new WebSocket("ws://localhost:1311" + t + "/8-N-1/" + e)).onerror = function(t) {
        UI_alert("WSCOM is not running. Please install <a href=https://www.npmjs.com/package/wscom>WSCOM tool</a>, run it and reload this page!", "Error", "alert")
    }
    ,
    xtConn.onopen = function(t) {
        xtWrite("Connection established.\r\n"),
        "disabled" !== $("#bCompile").attr("disabled") && $("#bCompileSend").button("enable")
    }
    ,
    xtConn.onclose = function() {
        $("#bCompileSend").button("disable")
    }
    ,
    xtConn.onmessage = function(t) {
        var e = JSON.parse(t.data);
        if (0 != e[0]) {
            for (o = 0; o < e.length; o++)
                bTerminal.outchar(String.fromCharCode(e[o]));
            if (1 == xtcapstate)
                for (var o = 0; o < e.length; o++)
                    xtcaptext += String.fromCharCode(e[o])
        }
    }
}
  , xtSendDo = 0
  , xtSend = function(t) {
    if (!t.length || -1 == xtSendDo)
        return xtSendDo = 0,
        void $("#xtscount").text("0");
    xtSendDo = 1,
    $("#xtscount").text(t.length - 1);
    var e = t[0];
    e.charCodeAt(0) < 32 ? xtConn.send(JSON.stringify({
        code: e.charCodeAt(0)
    })) : xtConn.send(JSON.stringify({
        key: e
    })),
    xtcapkey && (xtcaptext += e),
    t = t.substr(1),
    setTimeout(function() {
        xtSend(t)
    }, 1)
}
  , xtSendOff = function() {
    xtSendDo = -1
}
  , xtWrite = function(t) {
    for (var e = 0; e < t.length; e++)
        bTerminal.outchar(t[e])
}
  , compileAndSend = function() {
    if (compile(!0)) {
        var t = FS.load(fileEdit + ".hex");
        xtSend(t)
    }
}
  , xtcapstate = 0
  , xtcaptext = ""
  , xtcapkey = !1
  , xtCapStart = function() {
    $("#xtcstart").hide(),
    $("#xtcstop").show(),
    $("#xtcpause").show(),
    $("#xtcapture").text("|> ON"),
    xtcapkey = $("#xtckey").is(":checked"),
    xtcapstate = 1
}
  , xtCapPause = function() {
    $("#xtcstart").show(),
    $("#xtcstop").hide(),
    $("#xtcpause").show(),
    $("#xtcapture").text("|| PAUSED"),
    xtcapstate = 2
}
  , xtCapStop = function() {
    $("#xtcstart").show(),
    $("#xtcstop").hide(),
    $("#xtcpause").hide(),
    $("#xtcapture").text("OFF");
    var t = prompt("Save file as... (extension will be .txt)");
    FS.save(t + ".txt", xtcaptext),
    xtcaptext = "",
    xtcapstate = 0,
    updateFiles()
};
!function(e) {
    function t() {
        var e;
        i && (e = JSON.stringify(a),
        FS.save(i + ".__dbg__", e))
    }
    var o = []
      , a = {}
      , i = "";
    e.BPP = {
        init: function() {
            o = [],
            a = {}
        },
        setLinemap: function(e) {
            !function(e) {
                for (var t = 0, a = 0; a < 65536; a++)
                    t != e[a] && (t = e[a]) && (o[t] = a)
            }(e)
        },
        lmAddrByLine: function(e) {
            return o[e]
        },
        open: function(e) {
            isSource(e) ? (i = e,
            async function() {
                o = [],
                a = {};
                var e = FS.load(i + ".__dbg__");
                (e = "object" == typeof e ? await e : e) && (a = JSON.parse(e))
            }()) : i = null
        },
        save: function(e) {
            isSource(e) ? (i = e,
            t()) : i = null
        },
        addSL: function(e) {
            a[e] = !0,
            t()
        },
        remSL: function(e) {
            delete a[e],
            t()
        },
        getSL: function() {
            return JSON.parse(JSON.stringify(a))
        }
    }
}(window);
var FS, uiset = {
    save: function() {
        localStorage.localSettings = JSON.stringify(localSettings)
    },
    setEditor: function() {
        editor.setFontSize(localSettings.font),
        editor.setTheme("ace/theme/" + localSettings.theme),
        "xcode" === localSettings.theme ? $("body").addClass("light") : $("body").removeClass("light"),
        localSettings.wide ? $("body").addClass("wide") : $("body").removeClass("wide"),
        uiset.colorize()
    },
    setWide: function() {
        localSettings.wide = !0
    },
    setNormal: function() {
        localSettings.wide = !1
    },
    setDark: function() {
        localSettings.theme = "vibrant_ink"
    },
    setLight: function() {
        localSettings.theme = "xcode"
    },
    setFontXL: function() {
        localSettings.font = 20
    },
    setFontL: function() {
        localSettings.font = 16
    },
    setFontM: function() {
        localSettings.font = 12
    },
    colorize: function() {
        $("button[data-set]").removeClass("active"),
        (localSettings.wide ? $("button[data-set=wide][data-v=wide]") : $("button[data-set=wide][data-v=std]")).addClass("active"),
        $("button[data-set=font][data-v=" + localSettings.font + "]").addClass("active"),
        $("button[data-set=bright][data-v=" + localSettings.theme + "]").addClass("active")
    }
}, editor = null, changed = !1, fileEdit = null, workspaceName = localStorage.workspaceName || "Workspace", workspaceType = "browser", filecursor = {}, localSettings = {
    wide: !1,
    font: 12,
    theme: "vibrant_ink"
};
try {
    localSettings = JSON.parse(localStorage.localSettings)
} catch (e) {
    localStorage.localSettings = JSON.stringify(localSettings)
}
function UI_alert(e, t, a) {
    t = t || "Alert",
    e = e || "No Message to Display.",
    a = a || "info",
    $("<div></div>").html('<span class="ui-icon ui-icon-' + a + '" style="float: left; margin: 0 7px 50px 0;"></span>' + e).dialog({
        title: t,
        resizable: !1,
        modal: !0,
        buttons: {
            Ok: function() {
                $(this).dialog("close")
            }
        }
    })
}
var fileExt = function(e) {
    return e ? e.substr(e.lastIndexOf(".") + 1) : ""
}
  , isSource = function(e) {
    e = fileExt(e).toUpperCase();
    return "A08" === e || ("A80" === e || ("A68" === e || ("A18" === e || ("A09" === e || ("A65" === e || ("Z80" === e || "816" === e))))))
}
  , asmType = function() {
    var e = editor.getValue();
    try {
        var t = ASM.parse(e, {
            parseOpcode: function() {
                return {
                    opcode: ""
                }
            }
        });
        if ((t = t.filter(function(e) {
            return ".CPU" == e.opcode
        })) && 1 === t.length) {
            var a = t[0].params[0].toUpperCase();
            if ("6502" === a)
                return "C6502";
            if ("8080" === a)
                return "I8080";
            if ("Z80" === a)
                return "Z80";
            if ("8008" === a)
                return "I8008";
            if ("6800" === a)
                return "M6800";
            if ("1802" === a)
                return "CDP1802";
            if ("6809" === a)
                return "M6809";
            if ("65816" === a)
                return "C65816"
        }
    } catch (e) {}
    a = fileExt(fileEdit).toUpperCase();
    return "A08" === a ? "I8008" : "A80" === a ? "I8080" : "A68" === a ? "M6800" : "A18" === a ? "CDP1802" : "A09" === a ? "M6809" : "A65" === a ? "C6502" : "816" === a ? "C65816" : "Z80" === a ? "Z80" : "HEX" === a ? "HEX" : "LST" === a ? "LST" : "EMU" === a ? "EMU" : null
}
  , filetypeDepend = function() {
    var e = asmType();
    "HEX" == e || "LST" == e ? ($("#bCompile").button("disable"),
    $("#bCompileSend").button("disable"),
    $("#bEmu").button("disable"),
    $(".bSnap").button("disable"),
    $(".bBin").button("disable"),
    changeEditor({
        readOnly: !0,
        extraKeys: {}
    })) : "EMU" == e ? ($("#bCompile").button("disable"),
    $("#bCompileSend").button("disable"),
    $("#bEmu").button("disable"),
    $(".bSnap").button("disable"),
    $(".bBin").button("disable")) : ($("#bCompile").button("enable"),
    xtConn && 3 != xtConn.readyState && $("#bCompileSend").button("enable"),
    $("#bEmu").button("enable"),
    $("#bBeautify").button("enable"),
    $(".bBin").button("enable"),
    $(".bSnap").button("disable"),
    "I8080" == e && changeEditor({
        mode: "i8080"
    }),
    "I8008" == e ? changeEditor({
        mode: "i8080"
    }) : "Z80" == e ? (changeEditor({
        mode: "z80"
    }),
    $(".bSnap").button("enable")) : changeEditor("C6502" == e ? {
        mode: "c6502"
    } : "C65816" == e ? {
        mode: "c65816"
    } : "M6800" == e ? {
        mode: "m6800"
    } : "M6809" == e ? {
        mode: "m6809"
    } : "CDP1802" == e ? {
        mode: "cdp1802"
    } : {})),
    $("#aver").html(e)
}
  , saveFile = function() {
    var e;
    fileEdit ? (e = editor.getValue(),
    FS.save(fileEdit, e),
    BPP.save(fileEdit),
    changed = !1,
    $("#filesystem li a").removeClass("changed"),
    autosync && syncWorkspaceAlert(!0),
    updateFiles(),
    filetypeDepend()) : saveFileAs()
}
  , saveFileAs = async function() {
    var e = window.prompt("File name");
    if (!e)
        return !1;
    var t = FS.load(e);
    if ((t = "object" == typeof t ? await t : t) && !confirm("File " + e + " already exists. Are you sure to overwrite?"))
        return !1;
    fileEdit = e,
    $("#fn").html(e);
    t = editor.getValue();
    return FS.save(fileEdit, t),
    BPP.save(e),
    changed = !1,
    $("#filesystem li a").removeClass("changed"),
    autosync && syncWorkspaceAlert(!0),
    updateFiles(),
    filetypeDepend(),
    !0
}
  , clearWorkspace = function() {
    saveWorkspace();
    var e = prompt("Workspace name");
    e && (workspaceName = e,
    localStorage.workspaceName = e,
    $("#wkspnm").html(" (" + workspaceName + ")"),
    updateWksp(),
    FS.clear(),
    updateFiles(),
    saveWorkspace())
}
  , loadWorkspace = function(a, o) {
    JSERS.fileLoad(a + ".workspace", function(e, t) {
        e ? UI_alert(t) : (FS.restore(t),
        updateFiles(),
        workspaceName = a,
        localStorage.workspaceName = a,
        $("#wkspnm").html(" (" + workspaceName + ")"),
        UI_alert(o || "Workspace switched"))
    })
}
  , mergeWorkspace = function(l, c) {
    JSERS.fileLoad(l + ".workspace", function(e, t) {
        if (e)
            UI_alert(t);
        else {
            for (var t = JSON.parse(t), a = new LFS(t), o = a.dir(), i = FS.dir(), n = 0; n < o.length; n++) {
                var r, s = o[n];
                0 < s.indexOf(".--merge") || (r = a.load(s),
                i.indexOf(s) < 0 ? FS.save(s, r) : r != FS.load(s) && FS.save(s + ".--merge", r))
            }
            updateFiles(),
            workspaceName = l,
            localStorage.workspaceName = l,
            $("#wkspnm").html(" (" + workspaceName + ")"),
            UI_alert(c || "Workspace merged with remote version. \n\nConflicted file has been saved with '--merge' extension - merge it manually")
        }
    })
}
  , saveWorkspace = function() {
    var e = FS.backup();
    JSERS.fileSave(workspaceName + ".workspace", e, function(e, t) {
        e && UI_alert(t)
    })
}
  , saveWorkspaceAlert = function() {
    var e = FS.backup();
    JSERS.fileSave(workspaceName + ".workspace", e, function(e, t) {
        UI_alert(e ? t : "Workspace saved")
    })
}
  , syncWorkspaceAlert = function(c) {
    JSERS.fileLoad(workspaceName + ".workspace", function(e, t) {
        if (e)
            UI_alert(t);
        else
            for (var a = JSON.parse(t), o = new LFS(a), i = o.dir(), n = FS.dir(), r = 0; r < i.length; r++) {
                var s, l = i[r];
                0 < l.indexOf(".--merge") || (s = o.load(l),
                n.indexOf(l) < 0 ? FS.save(l, s) : s != FS.load(l) && FS.save(l + ".--merge", s))
            }
        a = FS.backup();
        JSERS.fileSave(workspaceName + ".workspace", a, function(e, t) {
            updateFiles(),
            c || UI_alert(e ? t : "Workspace synchronized.<br><br>Conflicted file has been saved with '--merge' extension - merge it manually, if needed")
        })
    })
}
  , updateWksp = function() {
    JST.user.workspaces(JSERS.isLoggedIn(), function(e, t) {
        if (!e) {
            t = JSON.parse(t),
            $("#remoteworkspaces").html("");
            for (var a = 0; a < t.length; a++)
                $("#remoteworkspaces").append('<li><a data-file="' + t[a] + '" class="load">' + t[a] + "</a></li>");
            $("#remoteworkspaces li a.load").click(function(e) {
                var t = $(this).attr("data-file");
                t == workspaceName ? confirm("Reopening the same workspace will merge remote and local versions. Do you want to do it?") && mergeWorkspace(t) : (confirm("You are about to open new workspace. Do you want to save currently opened prior to open another?") && saveWorkspace(),
                confirm("This workspace will be overwritten by another one. Proceed?") && loadWorkspace(t))
            })
        }
    })
}
  , onLogin = function(e, t) {
    $("#autosync").prop("checked", autosync),
    $("#wsmanager").show(),
    $("#autosync").unbind("click"),
    $("#autosync").click(function() {
        autosync = $("#autosync").prop("checked")
    }),
    $("#saveAsGist").unbind("click"),
    $("#saveAsGist").click(saveGist),
    $("#saveRemote").unbind("click"),
    $("#saveRemote").click(saveWorkspaceAlert),
    $("#syncRemote").unbind("click"),
    $("#syncRemote").click(syncWorkspaceAlert),
    $("#saveRemoteAs").unbind("click"),
    $("#saveRemoteAs").click(function() {
        var e = FS.backup()
          , a = prompt("Workspace name");
        a && JSERS.fileSave(a + ".workspace", e, function(e, t) {
            e ? UI_alert(t) : (UI_alert("Workspace saved"),
            workspaceName = a,
            localStorage.workspaceName = a,
            $("#wkspnm").html(" (" + workspaceName + ")"),
            updateWksp())
        })
    }),
    updateWksp(),
    $("#saveRemote").show(),
    $("#syncRemote").show(),
    $("#saveRemoteAs").show(),
    $("#saveAsGist").show(),
    $("#wsmanager").show(),
    $("#clearWorkspace").show()
}
  , onLogout = function() {
    autosync = !1,
    $("#saveRemote").hide(),
    $("#syncRemote").hide(),
    $("#saveRemoteAs").hide(),
    $("#clearWorkspace").hide(),
    $("#wsmanager").hide()
}
  , openFile = async function(t) {
    filecursor[fileEdit] = editor.getCursorPosition();
    var a = t.replace(/\./g, "-");
    if (!changed || confirm("Iniciando...")) {
        fileEdit = t,
        BPP.open(t),
        $("#fn").html(t);
        let e = FS.load(t);
        return "object" == typeof e && (e = await e),
        editor.setValue(e),
        $("#filesystem li a").removeClass("active"),
        $("#filesystem li a").removeClass("changed"),
        $("#filesystem li a[href=#" + a + "]").addClass("active"),
        filetypeDepend(),
        filecursor[t] && editor.gotoLine(filecursor[t].row + 1, filecursor[t].column),
        changed = !1
    }
    return !1
}
  , newFile = function() {
    if (changed && !confirm("Iniciando..."))
        return !1;
    $("#nfname").val(""),
    $("#newform").dialog("open")
}
  , newFileDo = function(e) {
    if (!e)
        return !1;
    fileEdit = e,
    $("#fn").html(e),
    editor.setValue(""),
    BPP.open(e),
    changed = !1,
    $("#filesystem li a").removeClass("changed"),
    FS.save(e, ""),
    updateFiles(),
    filetypeDepend()
}
  , refreshLocalWorkspaces = async function() {
    var e, t = await idbKeyval.entries();
    $("#localWorkspaces").html("");
    for (e of t)
        $("#localWorkspaces").append('<li><a href="#' + e[0] + '" data-localwksp="' + e[0] + '">' + e[0] + "</a></li>");
    $("[data-localwksp").on("click", async function(e) {
        var t = $(this).attr("data-localwksp");
        await fileAccess.getDirHandle(t),
        localStorage.wknm = t,
        workspaceName = t,
        setWorkspaceType("local"),
        $("#wkspnm").html(" (" + workspaceName + ")"),
        updateFiles()
    })
}
  , refreshFilesystem = function(e, t) {
    $(t).html("");
    for (var a = 0; a < e.length; a++) {
        var o = e[a].replace(/\./g, "-")
          , i = !1;
        0 < o.indexOf("-__dbg__") || 0 < o.indexOf("-pmdtape") || 0 < o.indexOf("-pmitape") || (0 < o.indexOf(".--merge") && (i = !0),
        $(t).append('<li><a href="#' + o + '" data-file="' + e[a] + '"' + (i ? ' data-merge="1"' : "") + ">" + e[a] + "</a></li>"))
    }
}
  , setWorkspaceType = function(e) {
    workspaceType = e,
    window.localStorage.wktp = e,
    "browser" == workspaceType ? ($(".fsbrowser").show(),
    $(".fslocal").hide(),
    $("#accordion").accordion("refresh"),
    $("body").removeClass("localfs")) : (window.localStorage.wknm = workspaceName,
    $(".fslocal").show(),
    $(".fsbrowser").hide(),
    $("#accordion").accordion("refresh"),
    $("body").addClass("localfs"))
}
  , updateFiles = async function() {
    var e;
    setWorkspaceType(workspaceType),
    window.localStorage.wktp = workspaceType,
    window.localStorage.wknm = workspaceName,
    "browser" == workspaceType ? (FS = new LFS(localStorage),
    $(".fsbrowser").show(),
    $(".fslocal").hide(),
    $("#accordion").accordion("refresh"),
    e = FS.dir().sort(),
    refreshFilesystem(e, "#filesystem")) : (FS = fileAccess,
    $(".fslocal").show(),
    $(".fsbrowser").hide(),
    $("#accordion").accordion("refresh"),
    e = await fileAccess.getFiles(),
    refreshFilesystem(e.map(function(e) {
        return e[0]
    }).sort(), "#filesystem"),
    refreshLocalWorkspaces()),
    $.contextMenu({
        selector: "#filesystem li a[data-file*=--merge]",
        zIndex: 10,
        position: function(e, t, a) {
            e.$menu.css({
                top: a,
                left: t + 10
            })
        },
        items: {
            diff: {
                name: "Diff",
                callback: function(e, t) {
                    var a = $(this).attr("data-file");
                    if (a) {
                        for (var o = a.replace(".--merge", ""), i = FS.load(o), a = FS.load(a), n = "<pre style='color:#DDF;background-color:#000'>", r = JsDiff.diffWords(i, a), s = 0; s < r.length; s++) {
                            var l = r[s];
                            l.removed ? n += "<span style='color:#FDD;text-decoration:line-through'>" + l.value + "</span>" : l.added ? n += "<span style='color:#dfd;background-color:#333'>" + l.value + "</span>" : n += "<span>" + l.value + "</span>"
                        }
                        n += "</pre>",
                        $.fancybox({
                            content: n,
                            title: "DIFF for " + o,
                            transitionIn: "elastic",
                            autoDimensions: !1,
                            transitionOut: "elastic",
                            width: "75%",
                            height: "75%"
                        })
                    }
                }
            },
            mrg: {
                name: "Merge down (have to edit)",
                callback: function(e, t) {
                    var a = $(this).attr("data-file");
                    if (a) {
                        var o = a.replace(".--merge", "");
                        if (confirm("Are you sure to merge changes into " + o + "?")) {
                            for (var i = FS.load(o), n = FS.load(a), r = JsDiff.diffLines(i, n), s = "", l = 0; l < r.length; l++) {
                                var c = r[l];
                                c.removed ? s += "\r\n; <<<<<<<< DELETE (local version)\r\n" + c.value + "; --------- DELETE\r\n" : c.added ? s += "\r\n; >>>>>>>> ADD NEW (remote version)\r\n" + c.value + "; --------- ADD NEW\r\n" : s += c.value
                            }
                            FS.save(o, s),
                            FS.rm(a),
                            FS.rm(a + ".hex"),
                            FS.rm(a + ".lst"),
                            updateFiles()
                        }
                    }
                }
            },
            acce: {
                name: "Accept changes",
                callback: function(e, t) {
                    var a, o, i = $(this).attr("data-file");
                    i && (a = i.replace(".--merge", ""),
                    confirm("Are you sure to overwrite file " + a + "?") && (o = FS.load(i),
                    FS.save(a, o),
                    FS.rm(i),
                    FS.rm(a + ".hex.--merge"),
                    FS.rm(a + ".lst.--merge"),
                    FS.rm(a + ".hex"),
                    FS.rm(a + ".lst"),
                    FS.rm(i + ".__dbg__"),
                    updateFiles()))
                }
            },
            dele: {
                name: "Reject",
                callback: function(e, t) {
                    var a, o = $(this).attr("data-file");
                    o && confirm("Are you sure to delete file " + o + "?") && (a = o.replace(".--merge", ""),
                    FS.rm(o),
                    FS.rm(a + ".hex.--merge"),
                    FS.rm(a + ".lst.--merge"),
                    FS.rm(o + ".__dbg__"),
                    FS.rm(o + ".__dbg__"),
                    updateFiles())
                }
            }
        }
    }),
    $.contextMenu({
        selector: "#filesystem li a",
        zIndex: 10,
        position: function(e, t, a) {
            e.$menu.css({
                top: a,
                left: t + 10
            })
        },
        items: {
            rename: {
                name: "Rename",
                callback: async function(e, t) {
                    var a, o, i = $(this).attr("data-file");
                    i && (a = prompt("New name for file " + i + "?"),
                    o = fileExt(i),
                    fileExt(a) != o && !confirm("New file type is different. Is this OK?") || ("object" == typeof (o = FS.load(i)) && (o = await o),
                    FS.save(a, o),
                    FS.rm(i),
                    FS.rm(i + ".hex"),
                    updateFiles()))
                }
            },
            down: {
                name: "Download",
                callback: function(e, t) {
                    var a, o, i = $(this).attr("data-file");
                    i && (a = fileExt(i),
                    o = FS.load(i),
                    ("com" != a && "prg" != a ? downloadString : download)(i, o))
                }
            },
            dele: {
                name: "Delete",
                callback: function(e, t) {
                    var a = $(this).attr("data-file");
                    a && confirm("Are you sure to delete file " + a + "?") && (FS.rm(a),
                    FS.rm(a + ".__dbg__"),
                    updateFiles())
                }
            },
            stt: {
                name: "Send to terminal",
                callback: async function(e, t) {
                    var a = $(this).attr("data-file");
                    a && (xtConn ? ("object" == typeof (a = FS.load(a)) && (a = await a),
                    xtSend(a)) : UI_alert("No terminal connection..."))
                }
            }
        }
    }),
    $("#filesystem li a").click(function(e) {
        var t = $(this).attr("data-file");
        openFile(t)
    })
}
  , compile = function(e) {
    fileEdit && saveFile();
    var t, a = editor.getValue(), o = asmType();
    switch (o) {
    case "I8008":
        t = ASM.compile(a, I8008);
        break;
    case "I8080":
        t = ASM.compile(a, I8080);
        break;
    case "C6502":
        t = ASM.compile(a, C6502);
        break;
    case "C65816":
        t = ASM.compile(a, C65816);
        break;
    case "Z80":
        t = ASM.compile(a, Z80);
        break;
    case "M6800":
        t = ASM.compile(a, M6800);
        break;
    case "CDP1802":
        t = ASM.compile(a, CDP1802);
        break;
    case "M6809":
        t = ASM.compile(a, H6309),
        ASM.PRAGMAS.indexOf("6309") < 0 && (t = ASM.compile(a, M6809));
        break;
    default:
        return UI_alert("Unrecognized ASM type", "Error", "alert"),
        !1
    }
    if (t[0])
        return null == t[0].s ? UI_alert("Error interno - " + t[0]) : t[0].s.includedFile ? UI_alert(t[0].msg + "\nFile: " + t[0].s.includedFile + " at line: " + t[0].s.numline, "Error", "alert") : (UI_alert(t[0].msg + "\nLine: " + t[0].s.numline, "Error", "alert"),
        editor.gotoLine(t[0].s.numline, 1),
        editor.focus()),
        !1;
    var i, n = t[1], r = ASM.hex(n[0]), s = ".hex";
    if (0 <= ASM.PRAGMAS.indexOf("SEGMENT") && (FS.save(fileEdit + ".hex", r),
    11 < (l = ASM.hex(n[0], "DSEG")).length && FS.save(fileEdit + ".dseg.hex", l),
    11 < (l = ASM.hex(n[0], "ESEG")).length && FS.save(fileEdit + ".eseg.hex", l)),
    0 <= ASM.PRAGMAS.indexOf("COM") && ("I8080" == o || "Z80" == o)) {
        var l = hextools.hex2com(r);
        FS.save(fileEdit + ".com", l),
        s = ".com"
    } else if (0 <= ASM.PRAGMAS.indexOf("PRG") && "C6502" == o)
        try {
            var c = hextools.hex2prg(r, ASM.ENT);
            FS.save(fileEdit + ".prg", c),
            s = ".prg"
        } catch (e) {
            return void UI_alert(e)
        }
    else
        "C65816" == o ? FS.save(fileEdit + ".s28", ASM.srec28(n[0])) : FS.save(fileEdit + ".hex", r);
    return 0 <= ASM.PRAGMAS.indexOf("SREC") && FS.save(fileEdit + ".s19", ASM.srec(n[0])),
    ASM.PRAGMAS.indexOf("HTML") < 0 ? (i = ASM.lst(n[0], n[1], !1, !1, t[2]),
    FS.save(fileEdit + ".lst", i)) : (i = ASM.html(n[0], n[1]),
    FS.save(fileEdit + ".html", i)),
    updateFiles(),
    e || UI_alert("OK, " + n[0].length + " lines compiled to file " + fileEdit + s, "Successfull", "check"),
    !0
}
  , makeSnap = function(e) {
    fileEdit && saveFile();
    var t, a = editor.getValue();
    switch (asmType()) {
    case "I8080":
        t = ASM.compile(a, I8080);
        break;
    case "I8008":
        t = ASM.compile(a, I8008);
        break;
    case "C6502":
        t = ASM.compile(a, C6502);
        break;
    case "C65816":
        t = ASM.compile(a, C65816);
        break;
    case "Z80":
        t = ASM.compile(a, Z80);
        break;
    case "M6800":
        t = ASM.compile(a, M6800);
        break;
    case "CDP1802":
        t = ASM.compile(a, CDP1802);
        break;
    case "M6809":
        t = ASM.compile(a, H6309),
        ASM.PRAGMAS.indexOf("6309") < 0 && (t = ASM.compile(a, M6809));
        break;
    default:
        return void UI_alert("Unrecognized ASM type", "Error", "alert")
    }
    if (t[0])
        null != t[0].s ? t[0].s.includedFile ? UI_alert(t[0].msg + "\nFile: " + t[0].s.includedFile + " at line: " + t[0].s.numline, "Error", "alert") : (UI_alert(t[0].msg + "\nLine: " + t[0].s.numline, "Error", "alert"),
        editor.gotoLine(t[0].s.numline, 1),
        editor.focus()) : UI_alert("Internal error - " + t[0]);
    else {
        var o = t[1];
        switch (e) {
        case "SNA":
            mkdown(makeSNA(o[0]), fileEdit + ".sna");
            break;
        case "TAP":
            mkdown(makeTAP(o[0]), fileEdit + ".tap");
            break;
        case "BIN":
            if (0 <= ASM.PRAGMAS.indexOf("SEGMENT"))
                return void UI_alert("Segmented code cannot be download as a binary blob", "Error", "alert");
            var i = ASM.hex(o[0])
              , n = 0
              , r = 65535;
            ASM.BINFROM && (n = ASM.BINFROM),
            ASM.BINTO && (r = ASM.BINTO - 1);
            r = hextools.hex2bin(i, n, r);
            download(fileEdit + ".bin", r)
        }
        updateFiles(),
        UI_alert("OK, " + o[0].length + " lines compiled to file " + fileEdit + "." + e, "Successfull", "check")
    }
}
  , beautify = function() {
    fileEdit && saveFile();
    var e, t = editor.getValue();
    switch (asmType()) {
    case "I8080":
        e = ASM.beautify(t, I8080);
        break;
    case "I8008":
        e = ASM.beautify(t, I8008);
        break;
    case "C6502":
        e = ASM.beautify(t, C6502);
        break;
    case "C65816":
        e = ASM.beautify(t, C65816);
        break;
    case "Z80":
        e = ASM.beautify(t, Z80);
        break;
    case "M6800":
        e = ASM.beautify(t, M6800);
        break;
    case "CDP1802":
        e = ASM.beautify(t, CDP1802);
        break;
    case "M6809":
        e = ASM.beautify(t, H6309),
        ASM.PRAGMAS.indexOf("6309") < 0 && (e = ASM.beautify(t, M6809));
        break;
    default:
        return void UI_alert("Unrecognized ASM type", "Error", "alert")
    }
    "object" == typeof e ? (UI_alert(e.msg + "\nLine: " + e.s.numline, "Error", "alert"),
    editor.gotoLine(e[0].s.numline, 1),
    editor.focus()) : editor.setValue(e)
}
  , saveEmu = null
  , goEmu = async function() {
    if ("block" == $("#emulator").css("display"))
        return $("aside #accordion").show(),
        $("aside #emulator").hide(),
        $("#bNew").button("enable"),
        $("#bBeauify").button("enable"),
        $("#bSave").button("enable"),
        $("#bSaveAs").button("enable"),
        $("#bCompile").button("enable"),
        saveEmu && editor.setValue(saveEmu),
        changeEditor(),
        void filetypeDepend();
    fileEdit && saveFile();
    var e, t = editor.getValue();
    switch (saveEmu = t,
    compile(!0),
    asmType()) {
    case "I8080":
        e = ASM.compile(t, I8080);
        break;
    case "I8008":
        e = ASM.compile(t, I8008);
        break;
    case "C6502":
        e = ASM.compile(t, C6502);
        break;
    case "Z80":
        e = ASM.compile(t, Z80);
        break;
    case "M6800":
        e = ASM.compile(t, M6800);
        break;
    case "CDP1802":
        e = ASM.compile(t, CDP1802);
        break;
    case "M6809":
        e = ASM.compile(t, H6309),
        ASM.PRAGMAS.indexOf("6309") < 0 && (e = ASM.compile(t, M6809));
        break;
    default:
        return void UI_alert("Unrecognized ASM type", "Error", "alert")
    }
    if (e[0])
        null != e[0].s ? e[0].s.includedFile ? UI_alert(e[0].msg + "\nFile: " + e[0].s.includedFile + " at line: " + e[0].s.numline, "Error", "alert") : (UI_alert(e[0].msg + "\nLine: " + e[0].s.numline, "Error", "alert"),
        editor.gotoLine(e[0].s.numline, 1),
        editor.focus()) : UI_alert("Internal error - " + e[0]);
    else {
        for (var a = e[1], o = ASM.hex(a[0]), i = [], n = 1, r = [], s = BPP.getSL(), l = 0; l < a[0].length; l++)
            for (var c = a[0][l].numline, d = a[0][l].addr; n <= c; )
                s[n] && r.push(d),
                i[n++] = d;
        if (ASM.ENGINE) {
            FS.save(fileEdit + ".hex", o);
            var u = ASM.lst(a[0], a[1]);
            FS.save(fileEdit + ".lst", u);
            var p = "/";
            if ("tec1" == ASM.ENGINE && (p = "tec1.html"),
            "pmi" == ASM.ENGINE && (p = "pmi80.html"),
            "pmd" == ASM.ENGINE && (p = "pmd85.html"),
            "bob" == ASM.ENGINE && (p = "bob85.html"),
            "jpr" == ASM.ENGINE && (p = "jpr.html"),
            "kim" == ASM.ENGINE && (p = "kim.html"),
            "sbcz80" == ASM.ENGINE && (p = "sbcz80.html"),
            "sbc6502" == ASM.ENGINE && (p = "sbc6502.html"),
            "sbc09" == ASM.ENGINE && (p = "sbc09.html"),
            "zxs" == ASM.ENGINE && (p = "zxsp.html"),
            "/" != (p = "cpm" == ASM.ENGINE ? "cpm.html" : p))
                return p += "#load/" + fileEdit,
                void (document.location.href = p);
            var f = FS.load(ASM.ENGINE + ".emu");
            if (!(f = "object" == typeof f ? await f : f))
                return void UI_alert("Unknown engine " + ASM.ENGINE, "Error", "alert");
            f = engineParser(f).cpu.toUpperCase().trim();
            return f && f.toUpperCase() == asmType() || "Z80" == f.toUpperCase() && "I8080" == asmType() ? (p = "generic.html#engine/" + ASM.ENGINE + "&load/" + fileEdit,
            void (document.location.href = p)) : void UI_alert("Engine " + ASM.ENGINE + " is for " + f + ", but this code is for " + asmType(), "Error", "alert")
        }
        u = ASM.lst(a[0], a[1], !0);
        switch (editor.setValue(u),
        linemap = ASM.linemap(a[0]),
        $("#newmem").val("0000"),
        $("aside #accordion").hide(),
        $("aside #emulator").show(),
        $("#bNew").button("disable"),
        $("#bBeautify").button("disable"),
        $("#bSave").button("disable"),
        $("#bSaveAs").button("disable"),
        $("#bCompile").button("disable"),
        $("#bCompileSend").button("disable"),
        $(".bSnap").button("disable"),
        $(".bBin").button("disable"),
        changeEditor({
            readOnly: !0,
            extraKeys: {}
        }, !0),
        asmType()) {
        case "I8080":
            DBG.reset(CPU8080);
            break;
        case "I8008":
            DBG.reset(CPU8008);
            break;
        case "C6502":
            DBG.reset(CPU6502);
            break;
        case "CDP1802":
            DBG.reset(CPU1802);
            break;
        case "M6800":
            DBG.reset(CPU6800);
            break;
        case "M6809":
            DBG.reset(CPU6809);
            break;
        case "Z80":
            DBG.reset(CPUZ80)
        }
        DBG.setBRK([]),
        BPP.setLinemap(linemap);
        for (l = 0; l < r.length; l++)
            editor.session.setBreakpoint(linemap[r[l]] - 1, "break"),
            DBG.addBRK(r[l]);
        DBG.readHex(o),
        ASM.ENT && DBG.CPUset("PC", ASM.ENT),
        DBG.redraw()
    }
}
  , engineParser = function(e) {
    var t, a = {}, o = e.split("\n");
    for (t in o) {
        var i, n = o[t];
        n && ";" != n[0] && (n = (i = n.split(" ")).shift(),
        i = i.join(" "),
        a[n] = i)
    }
    return a
}
  , linemap = null
  , activePhase = null
  , emuUI = function(e) {
    var t = linemap[e.pc];
    ASM.PHASES && ASM.PHASES[e.pc] && (activePhase = ASM.PHASES[e.pc].toUpperCase()),
    (t = "object" == typeof t ? t[activePhase] : t) && (editor.gotoLine(t, 0),
    editor.focus())
}
  , breaks = {}
  , findALabel = function(e) {
    e = e.toUpperCase();
    for (var t = editor.getValue().split("\n"), a = 0; a < t.length; a++) {
        var o = t[a].toUpperCase();
        if (0 === o.indexOf(e + ":"))
            return a + 1;
        if (0 === o.indexOf(e + " "))
            return a + 1
    }
    return 0
}
  , changeEditor = function(e, t) {
    breaks = {};
    var a, i = {
        showLineNumbers: !0,
        showGutter: !0,
        fixedWidthGutter: !0
    };
    for (o in e)
        i[o] = e[o];
    if (editor = ace.edit("code1", i),
    uiset.setEditor(),
    editor.session.setMode("ace/mode/assembler"),
    editor.selection.clearSelection(),
    editor.session.clearBreakpoints(),
    editor.commands.addCommand({
        name: "saveFile",
        bindKey: {
            win: "Ctrl-S",
            mac: "Command-S",
            sender: "editor|cli"
        },
        exec: saveFile
    }),
    editor.on("dblclick", function(e, t) {
        var a = editor.getSelectedText()
          , a = findALabel(a);
        a && editor.gotoLine(a, 0)
    }),
    t ? BPP.getSL() : editor.on("guttermousedown", function(e) {
        e.stop();
        var t = BPP.getSL()
          , e = e.getDocumentPosition().row;
        t[e + 1] ? (editor.session.clearBreakpoint(e),
        t[e + 1] = !1,
        BPP.remSL(e + 1)) : (editor.session.setBreakpoint(e, "break"),
        t[e + 1] = !0,
        BPP.addSL(e + 1))
    }),
    editor.on("change", function() {
        var e;
        fileEdit && (changed = !0,
        e = fileEdit.replace(/\./g, "-"),
        $("#filesystem li a[href=#" + e + "]").addClass("changed"))
    }),
    isSource(fileEdit) && !t)
        for (a in BPP.getSL())
            editor.session.setBreakpoint(a - 1, "break");
    fileEdit && (changed = !1,
    t = fileEdit.replace(/\./g, "-"),
    $("#filesystem li a[href=#" + t + "]").removeClass("changed"))
}
  , readHash = function() {
    var e = document.location.hash;
    if ("#demo/" == e.substr(0, 6)) {
        var t = e.substr(6);
        if (FS.load(t))
            return;
        $.get("./demo/" + t, {}, function(e) {
            FS.save(t, e),
            updateFiles(),
            UI_alert("File " + t + " has been added to your local workspace"),
            document.location.hash = ""
        })
    }
    "#load/" == e.substr(0, 6) && (t = e.substr(6),
    FS.load(t) && (document.location.hash = "",
    openFile(t)))
};
$(function() {
    fileAccess && fileAccess.test() ? ($("#openLocalWorkspace").on("click", async function() {
        let e = null;
        await fileAccess.setDirHandle(function() {
            return e = prompt("Workspace name?"),
            e
        }),
        workspaceType = "local",
        workspaceName = e,
        localStorage.wknm = e,
        localStorage.wktp = "local",
        setWorkspaceType("local"),
        await updateFiles()
    }),
    $("#convertToLocal").on("click", async function() {
        await fileAccess.setDirHandle(workspaceName);
        var e = await fileAccess.getFiles();
        if (!(0 < e.length) || confirm("Target directory is not empty, files may be overwritten. Is this OK?")) {
            for (var t of FS.dir())
                fileAccess.save(t, FS.load(t));
            $("#localReaccess").hide(),
            $("#backToBrowser").show(),
            workspaceType = "local",
            await updateFiles()
        }
    }),
    $("#backToBrowser").on("click", async function() {
        try {
            var e, t = new LFS(localStorage);
            await fileAccess.getDirHandle(workspaceName);
            for (e of await fileAccess.getFiles())
                t.save(e[0], await FS.load(e[0]))
        } catch (e) {
            alert("Browser does not support it, trying to go back without restoring")
        }
        workspaceType = "browser",
        FS = t,
        await updateFiles()
    })) : $(".fileaccess").remove(),
    $(".iframe").fancybox({
        width: "75%",
        height: "75%"
    }),
    $("#newform").dialog({
        autoOpen: !1,
        height: 200,
        width: 300,
        modal: !0,
        buttons: {
            "Listo": function() {
                var e, t = $("#nfname").val();
                t ? ((e = $("#nftype").val()) && (t += "."+e),
                $(this).dialog("close"),
                newFileDo(t)) : UI_alert("Name can't be empty")
            },
            Cancelar: function() {
                $(this).dialog("close")
            }
        },
        close: function() {}
    }),
    $("button[data-set]").click(function(e, t) {
        var a = $(this).attr("data-set")
          , o = $(this).attr("data-v");
        switch (a) {
        case "wide":
            "wide" == o ? uiset.setWide() : uiset.setNormal();
            break;
        case "font":
            localSettings.font = parseInt(o);
            break;
        case "bright":
            localSettings.theme = o
        }
        uiset.save(),
        uiset.setEditor()
    }),
    uiset.colorize(),
    $("#dsub-a80").hide(),
    $("#foo").hide(),
    $("#tabs ul").hide(),
    $("#bLibsearch").click(function() {
        var e = $("#libsearch").val()
          , t = $("#libsproc").val();
        $.get(JSERSendpoint + "/publero.php?s=" + encodeURIComponent(e) + "&p=" + encodeURIComponent(t), {}, function(e) {
            if (e) {
                for (var t = JSON.parse(e), a = "", o = 0; o < t.length; o++)
                    a += "<h1>" + t[o].luser + "/" + t[o].lname + "</h1>",
                    a += "<p>" + t[o].dt + ": " + t[o].lshort + "</p>",
                    a += t[o].llong + "<hr>";
                $.fancybox({
                    content: a,
                    title: "Libraries",
                    transitionIn: "elastic",
                    autoDimensions: !1,
                    transitionOut: "elastic",
                    width: "500",
                    height: "75%"
                })
            } else
                UI_alert("No libraries found")
        })
    }),
    $("#readremote").hide(),
    $("#readremote").click(function() {
        var a = prompt("Enter URL of remote file (not bigger than 100kB)");
        $.get("./proxy.php?url=" + encodeURIComponent(a), {}, function(e) {
            if (e) {
                var t = a.substr(a.lastIndexOf("/") + 1);
                return t ? (FS.load(t) && (t = prompt("File " + t + " already exists. Enter new name")),
                !(FS.load(t) && !confirm("File " + t + " already exists. Are you sure to overwrite?")) && (FS.save(t, e),
                void updateFiles())) : !1
            }
            UI_alert("An error occured during remote file downloading", "Error", "alert")
        })
    });
    $("#repoclone").click(function() {
        var e = prompt("Enter https GitHub link");
        e && (e = e.replace("github.com", "api.github.com/repos") + "/contents",
        $.get(e, {}, function(e) {
            if (e)
                for (var t = e, a = 0; a < t.length; a++) {
                    var o = t[a].name;
                    ".gitignore" !== o && (0 < o.indexOf(".png") || 0 < o.indexOf(".jpg") || 0 < o.indexOf(".gif") || function(t, e) {
                        $.get(e, {}, function(e) {
                            FS.save(t, e),
                            updateFiles()
                        })
                    }(o, t[a].download_url))
                }
            else
                UI_alert("An error occured during remote file downloading", "Error", "alert")
        }))
    }),
    $("#gistclone").click(function() {
        var e, t = prompt("Enter gist link");
        t && ((e = t.match(/\/[a-z0-9]+$/gi)) && 1 == e.length ? (t = "https://api.github.com/gists" + e[0],
        $.get(t, {}, function(e) {
            if (e) {
                var t = e.files;
                for (x in t) {
                    var a = t[x].filename;
                    ".gitignore" !== a && (0 < a.indexOf(".png") || 0 < a.indexOf(".jpg") || 0 < a.indexOf(".gif") || FS.save(a, t[x].content))
                }
                updateFiles()
            } else
                UI_alert("An error occured during remote file downloading", "Error", "alert")
        })) : UI_alert("Bad URL", "Error", "alert"))
    });
    if ($("#spacedl").click(function() {
        FS.zip(function(e) {
            var t, a;
            t = workspaceName + ".zip",
            a = e,
            (e = document.createElement("a")).setAttribute("href", "data:application/zip;base64," + a),
            e.setAttribute("download", t),
            document.body.appendChild(e),
            e.click(),
            document.body.removeChild(e)
        })
    }),
    changeEditor({}),
    $("#accordion").accordion({
        heightStyle: "fill"
    }),
    localStorage.wktp && (workspaceType = localStorage.wktp),
    localStorage.wknm && (workspaceName = localStorage.wknm),
    "browser" == workspaceType)
        FS = new LFS(localStorage),
        updateFiles(),
        refreshLocalWorkspaces();
    else
        try {
            setWorkspaceType("local"),
            console.log("NAME", workspaceName),
            (FS = fileAccess).getDirHandle(workspaceName),
            updateFiles(),
            refreshLocalWorkspaces(),
            $("#backToBrowser").hide()
        } catch (e) {
            workspaceType = "browser",
            FS = NFS,
            updateFiles()
        }
    $("#localReaccess").on("click", async function() {
        await fileAccess.getDirHandle(workspaceName),
        updateFiles(),
        $("#localReaccess").hide(),
        $("#backToBrowser").show(),
        refreshLocalWorkspaces()
    }),
    $("#wkspnm").html(" (" + workspaceName + ")"),
    ASM.fileGet(function(e) {
        if ("<" != e[0] || ">" != e[e.length - 1])
            return e = e.replace(/\"/g, ""),
            FS.load(e);
        e = e.substr(1, e.length - 2),
        e = libName(e),
        e = $.ajax(JSERSendpoint + "/publero.php?g=" + encodeURIComponent(e[1]) + "&u=" + encodeURIComponent(e[0]) + "&v=" + encodeURIComponent(e[2]), {
            async: !1
        });
        return 200 != e.status ? ".error No such library" : e.responseText
    }),
    $("menu button").button(),
    $(".terminals button").button(),
    $("button#bCompile").button("option", "icons", {
        primary: "ui-icon-gear"
    }),
    $("button#bCompile").button("disable"),
    $("button#bCompileSend").button("option", "icons", {
        primary: "ui-icon-transfer-e-w"
    }),
    $("button#bCompileSend").button("disable"),
    $("button#bBin").button("option", "icons", {
        primary: "ui-icon-arrowreturnthick-1-s"
    }),
    $("button#bBin").button("disable"),
    $("button#bSnap").button("option", "icons", {
        primary: "ui-icon-arrowreturnthick-1-s"
    }),
    $("button#bSnap").button("disable"),
    $("button#bSnapTap").button("option", "icons", {
        primary: "ui-icon-arrowreturnthick-1-s"
    }),
    $("button#bSnapTap").button("disable"),
    $("button#bSave").button("option", "icons", {
        primary: "ui-icon-disk"
    }),
    $("button#bBeautify").button("option", "icons", {
        primary: "ui-icon-clipboard"
    }),
    $("button#bSaveAs").button("option", "icons", {
        primary: "ui-icon-document-b"
    }),
    $("button#bNew").button("option", "icons", {
        primary: "ui-icon-document"
    }),
    $("button#bEmu").button("option", "icons", {
        primary: "ui-icon-lightbulb"
    }),
    $("button#bEmu").button("disable"),
    $(".lebox").button({
        disabled: !0
    }),
    readHash(),
    JSERS.init(JSERSendpoint, "#jsers", onLogin, onLogout),
    DBG.init("#emulator", emuUI)
}),
getGHtoken = function(t) {
    if (firebase && firebase.auth().currentUser) {
        var e = firebase.auth().currentUser.uid;
        return firebase.database().ref("/tokens/" + e).once("value").then(function(e) {
            e = e.val();
            t(e)
        })
    }
    t(null)
}
,
saveGist = function(e) {
    getGHtoken(async function(e) {
        if (e) {
            for (var t = {}, a = FS.dir(), o = 0; o < a.length; o++) {
                var i = FS.load(a[o]);
                "object" == typeof i && (i = await i),
                t[a[o]] = {
                    content: i
                }
            }
            var n = prompt("Gist description");
            $.ajax({
                type: "POST",
                method: "POST",
                url: "https://api.github.com/gists",
                headers: {
                    Authorization: "Basic " + btoa(e)
                },
                data: JSON.stringify({
                    description: n,
                    public: !0,
                    files: t
                }),
                success: function(e) {
                    FS.save("gist.id", e.id),
                    UI_alert("Gist saved, see gist.id file"),
                    updateFiles()
                }
            })
        } else
            UI_alert("Please log in and enter your GitHub username and token")
    })
}
,
$(window).on("hashchange", readHash),
$(window).keydown(function(e) {
    switch (e.keyCode) {
    case 121:
        return goEmu(),
        !1;
    case 120:
        return fileEdit ? $("#bCompile").attr("disabled") ? void 0 : (compile(),
        !1) : void 0
    }
});
var binclude, toHexN = function(e, t) {
    for (var a = e.toString(16); a.length < t; )
        a = "0" + a;
    return a.toUpperCase()
}, toHex2 = function(e) {
    return toHexN(255 & e, 2)
}, toHex4 = function(e) {
    return toHexN(65535 & e, 4)
};
function dragenter(e) {
    e.stopPropagation(),
    e.preventDefault()
}
function dragover(e) {
    e.stopPropagation(),
    e.preventDefault()
}
function drop(e) {
    e.stopPropagation(),
    e.preventDefault();
    var i = e.dataTransfer.files[0]
      , e = new FileReader;
    e.onload = function(e) {
        var t = e.target.result;
        if (t && t.length < 65536) {
            for (var a = "\n      ; Converted from " + i.name, o = 0; o < t.length; o++)
                o % 8 == 0 && (a += "\n      DB "),
                a += "0x" + toHex2(t.charCodeAt(o)),
                o % 8 < 7 && o < t.length - 1 && (a += ", ");
            if (a += "\n",
            !confirm("Insert data into editor at cursor position?")) {
                e = prompt("Data will be saved as file. Please enter file name");
                return e ? FS.load(e) && !confirm("Overwrite existing file?") ? void 0 : (FS.save(e, a),
                void updateFiles()) : void 0
            }
            editor.replaceRange(a, editor.getCursor())
        }
    }
    ,
    e.readAsBinaryString(i)
}
var intermInit = !1
  , intermWidth = null;
$("#xterm").mouseleave(function() {
    $("#xterm").css("zIndex", -20),
    bTerminal.keylock(!1)
}),
$("#xterm").mouseenter(function() {
    $("#xterm").css("zIndex", 20),
    bTerminal.keylock(!0)
}),
bTerminal.keylock(!1);
var inlineTerm = function() {
    var e = $("menu").position().left + $("menu").width()
      , e = $("#xterm-strip").position().left - e + $("#xterm-strip").width();
    intermWidth = e - 20,
    e < 970 && (e = 970),
    $("#xterm").width(e).show(),
    $("#xterm-strip").hide(),
    $("#xtcstart").show(),
    $("#xtcstop").hide(),
    $("#xtcpause").hide(),
    $("#xtcapture").text("OFF"),
    $("#xtckey").click(function() {
        xtcapkey = $("#xtckey").is(":checked")
    }),
    intermInit || (bTerminal.init("#tdisplay", function(e) {
        xtConn && (e.charCodeAt(0) < 32 ? xtConn.send(JSON.stringify({
            code: e.charCodeAt(0)
        })) : xtConn.send(JSON.stringify({
            key: e
        })),
        xtcapkey && (xtcaptext += e))
    }),
    intermInit = !0),
    getPorts(function(e, t) {
        e && inlineTermOff()
    })
}
  , inlineTermOff = function() {
    $("#xterm").hide(),
    $("#xterm-strip").show()
}
  , inlineTermConn = function() {
    var e = $("#comports").val()
      , t = $("#comspeed").val();
    window.localStorage.xTerm = JSON.stringify({
        port: e,
        speed: t
    }),
    $("#comport").hide(),
    $("#disport").show(),
    xtConnect(e, t)
}
  , inlineTermDisconn = function() {
    $("#comport").show(),
    $("#disport").hide(),
    xtConn.close()
}
  , myPost = function(e, t, a) {
    return $.ajax({
        type: "POST",
        url: e,
        data: t,
        success: a,
        fail: function(e) {
            console.log(e)
        },
        xhrFields: {
            withCredentials: !0
        }
    })
}
  , saveLib = function(a, o, i, n, r, s) {
    JSERS.signPayload(a, o, function(e, t) {
        e ? s(!0, t) : myPost(JSERSendpoint + "/publero.php", {
            name: a,
            nshort: o,
            nlong: i,
            nuser: n,
            data: r,
            sign: t.p,
            token: t.t,
            type: asmType()
        }, function(e) {
            $("#pub-name").val(""),
            $("#pub-short").val(""),
            $("#pub-long").val(""),
            s(!1, e)
        })
    })
}
  , libName = function(e) {
    var t = e.split(/\//);
    if (2 != t.length)
        return ".error No such library";
    var a = t[0]
      , o = 1
      , t = (e = t[1]).split(/#/);
    return 2 == t.length && (o = t[1],
    e = t[0]),
    [a, e, o]
};
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? exports.JsDiff = t() : e.JsDiff = t()
}(this, function() {
    return function(e) {
        function t(r) {
            if (n[r])
                return n[r].exports;
            var o = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return e[r].call(o.exports, o, o.exports, t),
            o.loaded = !0,
            o.exports
        }
        var n = {};
        return t.m = e,
        t.c = n,
        t.p = "",
        t(0)
    }([function(e, t, n) {
        "use strict";
        t.__esModule = !0;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(1))
          , o = n(3)
          , i = n(4)
          , u = n(5)
          , s = n(6)
          , f = n(7)
          , a = n(8)
          , d = n(9)
          , l = n(10)
          , c = n(12)
          , p = n(13);
        t.Diff = r.default,
        t.diffChars = o.diffChars,
        t.diffWords = i.diffWords,
        t.diffWordsWithSpace = i.diffWordsWithSpace,
        t.diffLines = u.diffLines,
        t.diffTrimmedLines = u.diffTrimmedLines,
        t.diffSentences = s.diffSentences,
        t.diffCss = f.diffCss,
        t.diffJson = a.diffJson,
        t.structuredPatch = l.structuredPatch,
        t.createTwoFilesPatch = l.createTwoFilesPatch,
        t.createPatch = l.createPatch,
        t.applyPatch = d.applyPatch,
        t.convertChangesToDMP = c.convertChangesToDMP,
        t.convertChangesToXML = p.convertChangesToXML,
        t.canonicalize = a.canonicalize
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            this.ignoreWhitespace = e
        }
        function o(e, t, n, r) {
            for (var o = 0, i = e.length, s = 0, f = 0; o < i; o++) {
                var a = e[o];
                if (a.removed) {
                    if (a.value = n.slice(f, f + a.count).join(""),
                    f += a.count,
                    o && e[o - 1].added) {
                        var d = e[o - 1];
                        e[o - 1] = e[o],
                        e[o] = d
                    }
                } else {
                    if (!a.added && r) {
                        var l = t.slice(s, s + a.count);
                        l = u.default(l, function(e, t) {
                            var r = n[f + t];
                            return r.length > e.length ? r : e
                        }),
                        a.value = l.join("")
                    } else
                        a.value = t.slice(s, s + a.count).join("");
                    s += a.count,
                    a.added || (f += a.count)
                }
            }
            return e
        }
        function i(e) {
            return {
                newPos: e.newPos,
                components: e.components.slice(0)
            }
        }
        t.__esModule = !0,
        t.default = r;
        var u = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(2));
        r.prototype = {
            diff: function(e, t, n) {
                function r(e) {
                    return n ? (setTimeout(function() {
                        n(void 0, e)
                    }, 0),
                    !0) : e
                }
                function u() {
                    for (var n = -1 * d; n <= d; n += 2) {
                        var u = void 0
                          , l = c[n - 1]
                          , p = c[n + 1]
                          , h = (p ? p.newPos : 0) - n;
                        l && (c[n - 1] = void 0);
                        var v = l && l.newPos + 1 < f
                          , g = p && 0 <= h && h < a;
                        if (v || g) {
                            if (!v || g && l.newPos < p.newPos ? (u = i(p),
                            s.pushComponent(u.components, void 0, !0)) : ((u = l).newPos++,
                            s.pushComponent(u.components, !0, void 0)),
                            h = s.extractCommon(u, t, e, n),
                            u.newPos + 1 >= f && h + 1 >= a)
                                return r(o(u.components, t, e, s.useLongestToken));
                            c[n] = u
                        } else
                            c[n] = void 0
                    }
                    d++
                }
                var s = this;
                if (e = this.castInput(e),
                (t = this.castInput(t)) === e)
                    return r([{
                        value: t
                    }]);
                if (!t)
                    return r([{
                        value: e,
                        removed: !0
                    }]);
                if (!e)
                    return r([{
                        value: t,
                        added: !0
                    }]);
                t = this.removeEmpty(this.tokenize(t)),
                e = this.removeEmpty(this.tokenize(e));
                var f = t.length
                  , a = e.length
                  , d = 1
                  , l = f + a
                  , c = [{
                    newPos: -1,
                    components: []
                }]
                  , p = this.extractCommon(c[0], t, e, 0);
                if (c[0].newPos + 1 >= f && p + 1 >= a)
                    return r([{
                        value: t.join("")
                    }]);
                if (n)
                    !function e() {
                        setTimeout(function() {
                            if (d > l)
                                return n();
                            u() || e()
                        }, 0)
                    }();
                else
                    for (; d <= l; ) {
                        var h = u();
                        if (h)
                            return h
                    }
            },
            pushComponent: function(e, t, n) {
                var r = e[e.length - 1];
                r && r.added === t && r.removed === n ? e[e.length - 1] = {
                    count: r.count + 1,
                    added: t,
                    removed: n
                } : e.push({
                    count: 1,
                    added: t,
                    removed: n
                })
            },
            extractCommon: function(e, t, n, r) {
                for (var o = t.length, i = n.length, u = e.newPos, s = u - r, f = 0; u + 1 < o && s + 1 < i && this.equals(t[u + 1], n[s + 1]); )
                    u++,
                    s++,
                    f++;
                return f && e.components.push({
                    count: f
                }),
                e.newPos = u,
                s
            },
            equals: function(e, t) {
                var n = /\S/;
                return e === t || this.ignoreWhitespace && !n.test(e) && !n.test(t)
            },
            removeEmpty: function(e) {
                for (var t = [], n = 0; n < e.length; n++)
                    e[n] && t.push(e[n]);
                return t
            },
            castInput: function(e) {
                return e
            },
            tokenize: function(e) {
                return e.split("")
            }
        },
        e.exports = t.default
    }
    , function(e, t) {
        "use strict";
        t.__esModule = !0,
        t.default = function(e, t, n) {
            if (Array.prototype.map)
                return Array.prototype.map.call(e, t, n);
            for (var r = new Array(e.length), o = 0, i = e.length; o < i; o++)
                r[o] = t.call(n, e[o], o, e);
            return r
        }
        ,
        e.exports = t.default
    }
    , function(e, t, n) {
        "use strict";
        t.__esModule = !0,
        t.diffChars = function(e, t, n) {
            return r.diff(e, t, n)
        }
        ;
        var r = new (function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(1)).default);
        t.characterDiff = r
    }
    , function(e, t, n) {
        "use strict";
        t.__esModule = !0,
        t.diffWords = function(e, t, n) {
            return i.diff(e, t, n)
        }
        ,
        t.diffWordsWithSpace = function(e, t, n) {
            return u.diff(e, t, n)
        }
        ;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(1))
          , o = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/
          , i = new r.default(!0);
        t.wordDiff = i;
        var u = new r.default;
        t.wordWithSpaceDiff = u,
        i.tokenize = u.tokenize = function(e) {
            for (var t = e.split(/(\s+|\b)/), n = 0; n < t.length - 1; n++)
                !t[n + 1] && t[n + 2] && o.test(t[n]) && o.test(t[n + 2]) && (t[n] += t[n + 2],
                t.splice(n + 1, 2),
                n--);
            return t
        }
    }
    , function(e, t, n) {
        "use strict";
        t.__esModule = !0,
        t.diffLines = function(e, t, n) {
            return o.diff(e, t, n)
        }
        ,
        t.diffTrimmedLines = function(e, t, n) {
            return i.diff(e, t, n)
        }
        ;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(1))
          , o = new r.default;
        t.lineDiff = o;
        var i = new r.default;
        t.trimmedLineDiff = i,
        i.ignoreTrim = !0,
        o.tokenize = i.tokenize = function(e) {
            for (var t = [], n = e.split(/^/m), r = 0; r < n.length; r++) {
                var o = n[r]
                  , i = n[r - 1]
                  , u = i && i[i.length - 1];
                "\n" === o && "\r" === u ? t[t.length - 1] = t[t.length - 1].slice(0, -1) + "\r\n" : (this.ignoreTrim && (o = o.trim(),
                r < n.length - 1 && (o += "\n")),
                t.push(o))
            }
            return t
        }
    }
    , function(e, t, n) {
        "use strict";
        t.__esModule = !0,
        t.diffSentences = function(e, t, n) {
            return r.diff(e, t, n)
        }
        ;
        var r = new (function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(1)).default);
        t.sentenceDiff = r,
        r.tokenize = function(e) {
            return e.split(/(\S.+?[.!?])(?=\s+|$)/)
        }
    }
    , function(e, t, n) {
        "use strict";
        t.__esModule = !0,
        t.diffCss = function(e, t, n) {
            return r.diff(e, t, n)
        }
        ;
        var r = new (function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(1)).default);
        t.cssDiff = r,
        r.tokenize = function(e) {
            return e.split(/([{}:;,]|\s+)/)
        }
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            t = t || [],
            n = n || [];
            var o = void 0;
            for (o = 0; o < t.length; o += 1)
                if (t[o] === e)
                    return n[o];
            var i = void 0;
            if ("[object Array]" === u.call(e)) {
                for (t.push(e),
                i = new Array(e.length),
                n.push(i),
                o = 0; o < e.length; o += 1)
                    i[o] = r(e[o], t, n);
                t.pop(),
                n.pop()
            } else if ("object" == typeof e && null !== e) {
                t.push(e),
                i = {},
                n.push(i);
                var s = []
                  , f = void 0;
                for (f in e)
                    e.hasOwnProperty(f) && s.push(f);
                for (s.sort(),
                o = 0; o < s.length; o += 1)
                    i[f = s[o]] = r(e[f], t, n);
                t.pop(),
                n.pop()
            } else
                i = e;
            return i
        }
        t.__esModule = !0,
        t.diffJson = function(e, t, n) {
            return s.diff(e, t, n)
        }
        ,
        t.canonicalize = r;
        var o = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(1))
          , i = n(5)
          , u = Object.prototype.toString
          , s = new o.default;
        t.jsonDiff = s,
        s.useLongestToken = !0,
        s.tokenize = i.lineDiff.tokenize,
        s.castInput = function(e) {
            return "string" == typeof e ? e : JSON.stringify(r(e), void 0, "  ")
        }
        ,
        s.equals = function(e, t) {
            return o.default.prototype.equals(e.replace(/,([\r\n])/g, "$1"), t.replace(/,([\r\n])/g, "$1"))
        }
    }
    , function(e, t) {
        "use strict";
        t.__esModule = !0,
        t.applyPatch = function(e, t) {
            for (var n = t.split("\n"), r = [], o = 0, i = !1, u = !1; o < n.length && !/^@@/.test(n[o]); )
                o++;
            for (; o < n.length; o++)
                if ("@" === n[o][0]) {
                    var s = n[o].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);
                    r.unshift({
                        start: s[3],
                        oldlength: +s[2],
                        removed: [],
                        newlength: s[4],
                        added: []
                    })
                } else
                    "+" === n[o][0] ? r[0].added.push(n[o].substr(1)) : "-" === n[o][0] ? r[0].removed.push(n[o].substr(1)) : " " === n[o][0] ? (r[0].added.push(n[o].substr(1)),
                    r[0].removed.push(n[o].substr(1))) : "\\" === n[o][0] && ("+" === n[o - 1][0] ? i = !0 : "-" === n[o - 1][0] && (u = !0));
            var f = e.split("\n");
            for (o = r.length - 1; o >= 0; o--) {
                for (var a = r[o], d = 0; d < a.oldlength; d++)
                    if (f[a.start - 1 + d] !== a.removed[d])
                        return !1;
                Array.prototype.splice.apply(f, [a.start - 1, a.oldlength].concat(a.added))
            }
            if (i)
                for (; !f[f.length - 1]; )
                    f.pop();
            else
                u && f.push("");
            return f.join("\n")
        }
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t, n, r, o, s, f) {
            function a(e) {
                return u.default(e, function(e) {
                    return " " + e
                })
            }
            f || (f = {
                context: 4
            });
            var d = i.patchDiff.diff(n, r);
            d.push({
                value: "",
                lines: []
            });
            for (var l = [], c = 0, p = 0, h = [], v = 1, g = 1, m = 0; m < d.length; m++)
                !function(e) {
                    var t = d[e]
                      , o = t.lines || t.value.replace(/\n$/, "").split("\n");
                    if (t.lines = o,
                    t.added || t.removed) {
                        if (!c) {
                            var i = d[e - 1];
                            c = v,
                            p = g,
                            i && (h = f.context > 0 ? a(i.lines.slice(-f.context)) : [],
                            c -= h.length,
                            p -= h.length)
                        }
                        h.push.apply(h, u.default(o, function(e) {
                            return (t.added ? "+" : "-") + e
                        })),
                        t.added ? g += o.length : v += o.length
                    } else {
                        if (c)
                            if (o.length <= 2 * f.context && e < d.length - 2)
                                h.push.apply(h, a(o));
                            else {
                                var s = Math.min(o.length, f.context);
                                h.push.apply(h, a(o.slice(0, s)));
                                var m = {
                                    oldStart: c,
                                    oldLines: v - c + s,
                                    newStart: p,
                                    newLines: g - p + s,
                                    lines: h
                                };
                                if (e >= d.length - 2 && o.length <= f.context) {
                                    var _ = /\n$/.test(n)
                                      , w = /\n$/.test(r);
                                    0 != o.length || _ ? _ && w || h.push("\\ No newline at end of file") : h.splice(m.oldLines, 0, "\\ No newline at end of file")
                                }
                                l.push(m),
                                c = 0,
                                p = 0,
                                h = []
                            }
                        v += o.length,
                        g += o.length
                    }
                }(m);
            return {
                oldFileName: e,
                newFileName: t,
                oldHeader: o,
                newHeader: s,
                hunks: l
            }
        }
        function o(e, t, n, o, i, u, s) {
            var f = r(e, t, n, o, i, u, s)
              , a = [];
            e == t && a.push("Index: " + e),
            a.push("==================================================================="),
            a.push("--- " + f.oldFileName + (void 0 === f.oldHeader ? "" : "\t" + f.oldHeader)),
            a.push("+++ " + f.newFileName + (void 0 === f.newHeader ? "" : "\t" + f.newHeader));
            for (var d = 0; d < f.hunks.length; d++) {
                var l = f.hunks[d];
                a.push("@@ -" + l.oldStart + "," + l.oldLines + " +" + l.newStart + "," + l.newLines + " @@"),
                a.push.apply(a, l.lines)
            }
            return a.join("\n") + "\n"
        }
        t.__esModule = !0,
        t.structuredPatch = r,
        t.createTwoFilesPatch = o,
        t.createPatch = function(e, t, n, r, i, u) {
            return o(e, e, t, n, r, i, u)
        }
        ;
        var i = n(11)
          , u = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(2))
    }
    , function(e, t, n) {
        "use strict";
        t.__esModule = !0;
        var r = new (function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(1)).default);
        t.patchDiff = r,
        r.tokenize = function(e) {
            var t = []
              , n = e.split(/(\n|\r\n)/);
            n[n.length - 1] || n.pop();
            for (var r = 0; r < n.length; r++) {
                var o = n[r];
                r % 2 ? t[t.length - 1] += o : t.push(o)
            }
            return t
        }
    }
    , function(e, t) {
        "use strict";
        t.__esModule = !0,
        t.convertChangesToDMP = function(e) {
            for (var t = [], n = void 0, r = void 0, o = 0; o < e.length; o++)
                r = (n = e[o]).added ? 1 : n.removed ? -1 : 0,
                t.push([r, n.value]);
            return t
        }
    }
    , function(e, t) {
        "use strict";
        function n(e) {
            var t = e;
            return t = t.replace(/&/g, "&amp;"),
            t = t.replace(/</g, "&lt;"),
            t = t.replace(/>/g, "&gt;"),
            t = t.replace(/"/g, "&quot;")
        }
        t.__esModule = !0,
        t.convertChangesToXML = function(e) {
            for (var t = [], r = 0; r < e.length; r++) {
                var o = e[r];
                o.added ? t.push("<ins>") : o.removed && t.push("<del>"),
                t.push(n(o.value)),
                o.added ? t.push("</ins>") : o.removed && t.push("</del>")
            }
            return t.join("")
        }
    }
    ])
});
(function() {
    var t = this
      , e = t._
      , i = {}
      , n = Array.prototype
      , o = Object.prototype
      , r = Function.prototype
      , s = n.push
      , a = n.slice
      , l = n.concat
      , c = o.toString
      , u = o.hasOwnProperty
      , h = n.forEach
      , p = n.map
      , f = n.reduce
      , d = n.reduceRight
      , g = n.filter
      , v = n.every
      , m = n.some
      , y = n.indexOf
      , b = n.lastIndexOf
      , w = Array.isArray
      , x = Object.keys
      , _ = r.bind
      , T = function(t) {
        return t instanceof T ? t : this instanceof T ? void (this._wrapped = t) : new T(t)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = T),
    exports._ = T) : t._ = T,
    T.VERSION = "1.4.4";
    var C = T.each = T.forEach = function(t, e, n) {
        if (null != t)
            if (h && t.forEach === h)
                t.forEach(e, n);
            else if (t.length === +t.length) {
                for (var o = 0, r = t.length; o < r; o++)
                    if (e.call(n, t[o], o, t) === i)
                        return
            } else
                for (var s in t)
                    if (T.has(t, s) && e.call(n, t[s], s, t) === i)
                        return
    }
    ;
    T.map = T.collect = function(t, e, i) {
        var n = [];
        return null == t ? n : p && t.map === p ? t.map(e, i) : (C(t, function(t, o, r) {
            n[n.length] = e.call(i, t, o, r)
        }),
        n)
    }
    ;
    var j = "Reduce of empty array with no initial value";
    T.reduce = T.foldl = T.inject = function(t, e, i, n) {
        var o = arguments.length > 2;
        if (null == t && (t = []),
        f && t.reduce === f)
            return n && (e = T.bind(e, n)),
            o ? t.reduce(e, i) : t.reduce(e);
        if (C(t, function(t, r, s) {
            o ? i = e.call(n, i, t, r, s) : (i = t,
            o = !0)
        }),
        !o)
            throw new TypeError(j);
        return i
    }
    ,
    T.reduceRight = T.foldr = function(t, e, i, n) {
        var o = arguments.length > 2;
        if (null == t && (t = []),
        d && t.reduceRight === d)
            return n && (e = T.bind(e, n)),
            o ? t.reduceRight(e, i) : t.reduceRight(e);
        var r = t.length;
        if (r !== +r) {
            var s = T.keys(t);
            r = s.length
        }
        if (C(t, function(a, l, c) {
            l = s ? s[--r] : --r,
            o ? i = e.call(n, i, t[l], l, c) : (i = t[l],
            o = !0)
        }),
        !o)
            throw new TypeError(j);
        return i
    }
    ,
    T.find = T.detect = function(t, e, i) {
        var n;
        return k(t, function(t, o, r) {
            if (e.call(i, t, o, r))
                return n = t,
                !0
        }),
        n
    }
    ,
    T.filter = T.select = function(t, e, i) {
        var n = [];
        return null == t ? n : g && t.filter === g ? t.filter(e, i) : (C(t, function(t, o, r) {
            e.call(i, t, o, r) && (n[n.length] = t)
        }),
        n)
    }
    ,
    T.reject = function(t, e, i) {
        return T.filter(t, function(t, n, o) {
            return !e.call(i, t, n, o)
        }, i)
    }
    ,
    T.every = T.all = function(t, e, n) {
        e || (e = T.identity);
        var o = !0;
        return null == t ? o : v && t.every === v ? t.every(e, n) : (C(t, function(t, r, s) {
            if (!(o = o && e.call(n, t, r, s)))
                return i
        }),
        !!o)
    }
    ;
    var k = T.some = T.any = function(t, e, n) {
        e || (e = T.identity);
        var o = !1;
        return null == t ? o : m && t.some === m ? t.some(e, n) : (C(t, function(t, r, s) {
            if (o || (o = e.call(n, t, r, s)))
                return i
        }),
        !!o)
    }
    ;
    T.contains = T.include = function(t, e) {
        return null != t && (y && t.indexOf === y ? -1 != t.indexOf(e) : k(t, function(t) {
            return t === e
        }))
    }
    ,
    T.invoke = function(t, e) {
        var i = a.call(arguments, 2)
          , n = T.isFunction(e);
        return T.map(t, function(t) {
            return (n ? e : t[e]).apply(t, i)
        })
    }
    ,
    T.pluck = function(t, e) {
        return T.map(t, function(t) {
            return t[e]
        })
    }
    ,
    T.where = function(t, e, i) {
        return T.isEmpty(e) ? i ? null : [] : T[i ? "find" : "filter"](t, function(t) {
            for (var i in e)
                if (e[i] !== t[i])
                    return !1;
            return !0
        })
    }
    ,
    T.findWhere = function(t, e) {
        return T.where(t, e, !0)
    }
    ,
    T.max = function(t, e, i) {
        if (!e && T.isArray(t) && t[0] === +t[0] && t.length < 65535)
            return Math.max.apply(Math, t);
        if (!e && T.isEmpty(t))
            return -1 / 0;
        var n = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return C(t, function(t, o, r) {
            var s = e ? e.call(i, t, o, r) : t;
            s >= n.computed && (n = {
                value: t,
                computed: s
            })
        }),
        n.value
    }
    ,
    T.min = function(t, e, i) {
        if (!e && T.isArray(t) && t[0] === +t[0] && t.length < 65535)
            return Math.min.apply(Math, t);
        if (!e && T.isEmpty(t))
            return 1 / 0;
        var n = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return C(t, function(t, o, r) {
            var s = e ? e.call(i, t, o, r) : t;
            s < n.computed && (n = {
                value: t,
                computed: s
            })
        }),
        n.value
    }
    ,
    T.shuffle = function(t) {
        var e, i = 0, n = [];
        return C(t, function(t) {
            e = T.random(i++),
            n[i - 1] = n[e],
            n[e] = t
        }),
        n
    }
    ;
    var q = function(t) {
        return T.isFunction(t) ? t : function(e) {
            return e[t]
        }
    };
    T.sortBy = function(t, e, i) {
        var n = q(e);
        return T.pluck(T.map(t, function(t, e, o) {
            return {
                value: t,
                index: e,
                criteria: n.call(i, t, e, o)
            }
        }).sort(function(t, e) {
            var i = t.criteria
              , n = e.criteria;
            if (i !== n) {
                if (i > n || void 0 === i)
                    return 1;
                if (i < n || void 0 === n)
                    return -1
            }
            return t.index < e.index ? -1 : 1
        }), "value")
    }
    ;
    var E = function(t, e, i, n) {
        var o = {}
          , r = q(e || T.identity);
        return C(t, function(e, s) {
            var a = r.call(i, e, s, t);
            n(o, a, e)
        }),
        o
    };
    T.groupBy = function(t, e, i) {
        return E(t, e, i, function(t, e, i) {
            (T.has(t, e) ? t[e] : t[e] = []).push(i)
        })
    }
    ,
    T.countBy = function(t, e, i) {
        return E(t, e, i, function(t, e) {
            T.has(t, e) || (t[e] = 0),
            t[e]++
        })
    }
    ,
    T.sortedIndex = function(t, e, i, n) {
        for (var o = (i = null == i ? T.identity : q(i)).call(n, e), r = 0, s = t.length; r < s; ) {
            var a = r + s >>> 1;
            i.call(n, t[a]) < o ? r = a + 1 : s = a
        }
        return r
    }
    ,
    T.toArray = function(t) {
        return t ? T.isArray(t) ? a.call(t) : t.length === +t.length ? T.map(t, T.identity) : T.values(t) : []
    }
    ,
    T.size = function(t) {
        return null == t ? 0 : t.length === +t.length ? t.length : T.keys(t).length
    }
    ,
    T.first = T.head = T.take = function(t, e, i) {
        if (null != t)
            return null == e || i ? t[0] : a.call(t, 0, e)
    }
    ,
    T.initial = function(t, e, i) {
        return a.call(t, 0, t.length - (null == e || i ? 1 : e))
    }
    ,
    T.last = function(t, e, i) {
        if (null != t)
            return null == e || i ? t[t.length - 1] : a.call(t, Math.max(t.length - e, 0))
    }
    ,
    T.rest = T.tail = T.drop = function(t, e, i) {
        return a.call(t, null == e || i ? 1 : e)
    }
    ,
    T.compact = function(t) {
        return T.filter(t, T.identity)
    }
    ;
    var S = function(t, e, i) {
        return C(t, function(t) {
            T.isArray(t) ? e ? s.apply(i, t) : S(t, e, i) : i.push(t)
        }),
        i
    };
    T.flatten = function(t, e) {
        return S(t, e, [])
    }
    ,
    T.without = function(t) {
        return T.difference(t, a.call(arguments, 1))
    }
    ,
    T.uniq = T.unique = function(t, e, i, n) {
        T.isFunction(e) && (n = i,
        i = e,
        e = !1);
        var o = i ? T.map(t, i, n) : t
          , r = []
          , s = [];
        return C(o, function(i, n) {
            (e ? n && s[s.length - 1] === i : T.contains(s, i)) || (s.push(i),
            r.push(t[n]))
        }),
        r
    }
    ,
    T.union = function() {
        return T.uniq(l.apply(n, arguments))
    }
    ,
    T.intersection = function(t) {
        var e = a.call(arguments, 1);
        return T.filter(T.uniq(t), function(t) {
            return T.every(e, function(e) {
                return T.indexOf(e, t) >= 0
            })
        })
    }
    ,
    T.difference = function(t) {
        var e = l.apply(n, a.call(arguments, 1));
        return T.filter(t, function(t) {
            return !T.contains(e, t)
        })
    }
    ,
    T.zip = function() {
        for (var t = a.call(arguments), e = T.max(T.pluck(t, "length")), i = new Array(e), n = 0; n < e; n++)
            i[n] = T.pluck(t, "" + n);
        return i
    }
    ,
    T.object = function(t, e) {
        if (null == t)
            return {};
        for (var i = {}, n = 0, o = t.length; n < o; n++)
            e ? i[t[n]] = e[n] : i[t[n][0]] = t[n][1];
        return i
    }
    ,
    T.indexOf = function(t, e, i) {
        if (null == t)
            return -1;
        var n = 0
          , o = t.length;
        if (i) {
            if ("number" != typeof i)
                return n = T.sortedIndex(t, e),
                t[n] === e ? n : -1;
            n = i < 0 ? Math.max(0, o + i) : i
        }
        if (y && t.indexOf === y)
            return t.indexOf(e, i);
        for (; n < o; n++)
            if (t[n] === e)
                return n;
        return -1
    }
    ,
    T.lastIndexOf = function(t, e, i) {
        if (null == t)
            return -1;
        var n = null != i;
        if (b && t.lastIndexOf === b)
            return n ? t.lastIndexOf(e, i) : t.lastIndexOf(e);
        for (var o = n ? i : t.length; o--; )
            if (t[o] === e)
                return o;
        return -1
    }
    ,
    T.range = function(t, e, i) {
        arguments.length <= 1 && (e = t || 0,
        t = 0),
        i = arguments[2] || 1;
        for (var n = Math.max(Math.ceil((e - t) / i), 0), o = 0, r = new Array(n); o < n; )
            r[o++] = t,
            t += i;
        return r
    }
    ,
    T.bind = function(t, e) {
        if (t.bind === _ && _)
            return _.apply(t, a.call(arguments, 1));
        var i = a.call(arguments, 2);
        return function() {
            return t.apply(e, i.concat(a.call(arguments)))
        }
    }
    ,
    T.partial = function(t) {
        var e = a.call(arguments, 1);
        return function() {
            return t.apply(this, e.concat(a.call(arguments)))
        }
    }
    ,
    T.bindAll = function(t) {
        var e = a.call(arguments, 1);
        return 0 === e.length && (e = T.functions(t)),
        C(e, function(e) {
            t[e] = T.bind(t[e], t)
        }),
        t
    }
    ,
    T.memoize = function(t, e) {
        var i = {};
        return e || (e = T.identity),
        function() {
            var n = e.apply(this, arguments);
            return T.has(i, n) ? i[n] : i[n] = t.apply(this, arguments)
        }
    }
    ,
    T.delay = function(t, e) {
        var i = a.call(arguments, 2);
        return setTimeout(function() {
            return t.apply(null, i)
        }, e)
    }
    ,
    T.defer = function(t) {
        return T.delay.apply(T, [t, 1].concat(a.call(arguments, 1)))
    }
    ,
    T.throttle = function(t, e) {
        var i, n, o, r, s = 0, a = function() {
            s = new Date,
            o = null,
            r = t.apply(i, n)
        };
        return function() {
            var l = new Date
              , c = e - (l - s);
            return i = this,
            n = arguments,
            c <= 0 ? (clearTimeout(o),
            o = null,
            s = l,
            r = t.apply(i, n)) : o || (o = setTimeout(a, c)),
            r
        }
    }
    ,
    T.debounce = function(t, e, i) {
        var n, o;
        return function() {
            var r = this
              , s = arguments
              , a = i && !n;
            return clearTimeout(n),
            n = setTimeout(function() {
                n = null,
                i || (o = t.apply(r, s))
            }, e),
            a && (o = t.apply(r, s)),
            o
        }
    }
    ,
    T.once = function(t) {
        var e, i = !1;
        return function() {
            return i ? e : (i = !0,
            e = t.apply(this, arguments),
            t = null,
            e)
        }
    }
    ,
    T.wrap = function(t, e) {
        return function() {
            var i = [t];
            return s.apply(i, arguments),
            e.apply(this, i)
        }
    }
    ,
    T.compose = function() {
        var t = arguments;
        return function() {
            for (var e = arguments, i = t.length - 1; i >= 0; i--)
                e = [t[i].apply(this, e)];
            return e[0]
        }
    }
    ,
    T.after = function(t, e) {
        return t <= 0 ? e() : function() {
            if (--t < 1)
                return e.apply(this, arguments)
        }
    }
    ,
    T.keys = x || function(t) {
        if (t !== Object(t))
            throw new TypeError("Invalid object");
        var e = [];
        for (var i in t)
            T.has(t, i) && (e[e.length] = i);
        return e
    }
    ,
    T.values = function(t) {
        var e = [];
        for (var i in t)
            T.has(t, i) && e.push(t[i]);
        return e
    }
    ,
    T.pairs = function(t) {
        var e = [];
        for (var i in t)
            T.has(t, i) && e.push([i, t[i]]);
        return e
    }
    ,
    T.invert = function(t) {
        var e = {};
        for (var i in t)
            T.has(t, i) && (e[t[i]] = i);
        return e
    }
    ,
    T.functions = T.methods = function(t) {
        var e = [];
        for (var i in t)
            T.isFunction(t[i]) && e.push(i);
        return e.sort()
    }
    ,
    T.extend = function(t) {
        return C(a.call(arguments, 1), function(e) {
            if (e)
                for (var i in e)
                    t[i] = e[i]
        }),
        t
    }
    ,
    T.pick = function(t) {
        var e = {}
          , i = l.apply(n, a.call(arguments, 1));
        return C(i, function(i) {
            i in t && (e[i] = t[i])
        }),
        e
    }
    ,
    T.omit = function(t) {
        var e = {}
          , i = l.apply(n, a.call(arguments, 1));
        for (var o in t)
            T.contains(i, o) || (e[o] = t[o]);
        return e
    }
    ,
    T.defaults = function(t) {
        return C(a.call(arguments, 1), function(e) {
            if (e)
                for (var i in e)
                    null == t[i] && (t[i] = e[i])
        }),
        t
    }
    ,
    T.clone = function(t) {
        return T.isObject(t) ? T.isArray(t) ? t.slice() : T.extend({}, t) : t
    }
    ,
    T.tap = function(t, e) {
        return e(t),
        t
    }
    ;
    var A = function(t, e, i, n) {
        if (t === e)
            return 0 !== t || 1 / t == 1 / e;
        if (null == t || null == e)
            return t === e;
        t instanceof T && (t = t._wrapped),
        e instanceof T && (e = e._wrapped);
        var o = c.call(t);
        if (o != c.call(e))
            return !1;
        switch (o) {
        case "[object String]":
            return t == String(e);
        case "[object Number]":
            return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
        case "[object Date]":
        case "[object Boolean]":
            return +t == +e;
        case "[object RegExp]":
            return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase
        }
        if ("object" != typeof t || "object" != typeof e)
            return !1;
        for (var r = i.length; r--; )
            if (i[r] == t)
                return n[r] == e;
        i.push(t),
        n.push(e);
        var s = 0
          , a = !0;
        if ("[object Array]" == o) {
            if (s = t.length,
            a = s == e.length)
                for (; s-- && (a = A(t[s], e[s], i, n)); )
                    ;
        } else {
            var l = t.constructor
              , u = e.constructor;
            if (l !== u && !(T.isFunction(l) && l instanceof l && T.isFunction(u) && u instanceof u))
                return !1;
            for (var h in t)
                if (T.has(t, h) && (s++,
                !(a = T.has(e, h) && A(t[h], e[h], i, n))))
                    break;
            if (a) {
                for (h in e)
                    if (T.has(e, h) && !s--)
                        break;
                a = !s
            }
        }
        return i.pop(),
        n.pop(),
        a
    };
    T.isEqual = function(t, e) {
        return A(t, e, [], [])
    }
    ,
    T.isEmpty = function(t) {
        if (null == t)
            return !0;
        if (T.isArray(t) || T.isString(t))
            return 0 === t.length;
        for (var e in t)
            if (T.has(t, e))
                return !1;
        return !0
    }
    ,
    T.isElement = function(t) {
        return !(!t || 1 !== t.nodeType)
    }
    ,
    T.isArray = w || function(t) {
        return "[object Array]" == c.call(t)
    }
    ,
    T.isObject = function(t) {
        return t === Object(t)
    }
    ,
    C(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(t) {
        T["is" + t] = function(e) {
            return c.call(e) == "[object " + t + "]"
        }
    }),
    T.isArguments(arguments) || (T.isArguments = function(t) {
        return !(!t || !T.has(t, "callee"))
    }
    ),
    "function" != typeof /./ && (T.isFunction = function(t) {
        return "function" == typeof t
    }
    ),
    T.isFinite = function(t) {
        return isFinite(t) && !isNaN(parseFloat(t))
    }
    ,
    T.isNaN = function(t) {
        return T.isNumber(t) && t != +t
    }
    ,
    T.isBoolean = function(t) {
        return !0 === t || !1 === t || "[object Boolean]" == c.call(t)
    }
    ,
    T.isNull = function(t) {
        return null === t
    }
    ,
    T.isUndefined = function(t) {
        return void 0 === t
    }
    ,
    T.has = function(t, e) {
        return u.call(t, e)
    }
    ,
    T.noConflict = function() {
        return t._ = e,
        this
    }
    ,
    T.identity = function(t) {
        return t
    }
    ,
    T.times = function(t, e, i) {
        for (var n = Array(t), o = 0; o < t; o++)
            n[o] = e.call(i, o);
        return n
    }
    ,
    T.random = function(t, e) {
        return null == e && (e = t,
        t = 0),
        t + Math.floor(Math.random() * (e - t + 1))
    }
    ;
    var O = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    O.unescape = T.invert(O.escape);
    var I = {
        escape: new RegExp("[" + T.keys(O.escape).join("") + "]","g"),
        unescape: new RegExp("(" + T.keys(O.unescape).join("|") + ")","g")
    };
    T.each(["escape", "unescape"], function(t) {
        T[t] = function(e) {
            return null == e ? "" : ("" + e).replace(I[t], function(e) {
                return O[t][e]
            })
        }
    }),
    T.result = function(t, e) {
        if (null == t)
            return null;
        var i = t[e];
        return T.isFunction(i) ? i.call(t) : i
    }
    ,
    T.mixin = function(t) {
        C(T.functions(t), function(e) {
            var i = T[e] = t[e];
            T.prototype[e] = function() {
                var t = [this._wrapped];
                return s.apply(t, arguments),
                F.call(this, i.apply(T, t))
            }
        })
    }
    ;
    var B = 0;
    T.uniqueId = function(t) {
        var e = ++B + "";
        return t ? t + e : e
    }
    ,
    T.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var z = /(.)^/
      , M = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\t": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }
      , $ = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    T.template = function(t, e, i) {
        var n;
        i = T.defaults({}, i, T.templateSettings);
        var o = new RegExp([(i.escape || z).source, (i.interpolate || z).source, (i.evaluate || z).source].join("|") + "|$","g")
          , r = 0
          , s = "__p+='";
        t.replace(o, function(e, i, n, o, a) {
            return s += t.slice(r, a).replace($, function(t) {
                return "\\" + M[t]
            }),
            i && (s += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'"),
            n && (s += "'+\n((__t=(" + n + "))==null?'':__t)+\n'"),
            o && (s += "';\n" + o + "\n__p+='"),
            r = a + e.length,
            e
        }),
        s += "';\n",
        i.variable || (s = "with(obj||{}){\n" + s + "}\n"),
        s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
        try {
            n = new Function(i.variable || "obj","_",s)
        } catch (t) {
            throw t.source = s,
            t
        }
        if (e)
            return n(e, T);
        var a = function(t) {
            return n.call(this, t, T)
        };
        return a.source = "function(" + (i.variable || "obj") + "){\n" + s + "}",
        a
    }
    ,
    T.chain = function(t) {
        return T(t).chain()
    }
    ;
    var F = function(t) {
        return this._chain ? T(t).chain() : t
    };
    T.mixin(T),
    C(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
        var e = n[t];
        T.prototype[t] = function() {
            var i = this._wrapped;
            return e.apply(i, arguments),
            "shift" != t && "splice" != t || 0 !== i.length || delete i[0],
            F.call(this, i)
        }
    }),
    C(["concat", "join", "slice"], function(t) {
        var e = n[t];
        T.prototype[t] = function() {
            return F.call(this, e.apply(this._wrapped, arguments))
        }
    }),
    T.extend(T.prototype, {
        chain: function() {
            return this._chain = !0,
            this
        },
        value: function() {
            return this._wrapped
        }
    })
}
).call(this),
function() {
    var t, e = this, i = e.Backbone, n = [], o = n.push, r = n.slice, s = n.splice;
    (t = "undefined" != typeof exports ? exports : e.Backbone = {}).VERSION = "1.0.0";
    var a = e._;
    a || "undefined" == typeof require || (a = require("underscore")),
    t.$ = e.jQuery || e.Zepto || e.ender || e.$,
    t.noConflict = function() {
        return e.Backbone = i,
        this
    }
    ,
    t.emulateHTTP = !1,
    t.emulateJSON = !1;
    var l = t.Events = {
        on: function(t, e, i) {
            return u(this, "on", t, [e, i]) && e ? (this._events || (this._events = {}),
            (this._events[t] || (this._events[t] = [])).push({
                callback: e,
                context: i,
                ctx: i || this
            }),
            this) : this
        },
        once: function(t, e, i) {
            if (!u(this, "once", t, [e, i]) || !e)
                return this;
            var n = this
              , o = a.once(function() {
                n.off(t, o),
                e.apply(this, arguments)
            });
            return o._callback = e,
            this.on(t, o, i)
        },
        off: function(t, e, i) {
            var n, o, r, s, l, c, h, p;
            if (!this._events || !u(this, "off", t, [e, i]))
                return this;
            if (!t && !e && !i)
                return this._events = {},
                this;
            for (l = 0,
            c = (s = t ? [t] : a.keys(this._events)).length; l < c; l++)
                if (t = s[l],
                r = this._events[t]) {
                    if (this._events[t] = n = [],
                    e || i)
                        for (h = 0,
                        p = r.length; h < p; h++)
                            o = r[h],
                            (e && e !== o.callback && e !== o.callback._callback || i && i !== o.context) && n.push(o);
                    n.length || delete this._events[t]
                }
            return this
        },
        trigger: function(t) {
            if (!this._events)
                return this;
            var e = r.call(arguments, 1);
            if (!u(this, "trigger", t, e))
                return this;
            var i = this._events[t]
              , n = this._events.all;
            return i && h(i, e),
            n && h(n, arguments),
            this
        },
        stopListening: function(t, e, i) {
            var n = this._listeners;
            if (!n)
                return this;
            var o = !e && !i;
            "object" == typeof e && (i = this),
            t && ((n = {})[t._listenerId] = t);
            for (var r in n)
                n[r].off(e, i, this),
                o && delete this._listeners[r];
            return this
        }
    }
      , c = /\s+/
      , u = function(t, e, i, n) {
        if (!i)
            return !0;
        if ("object" == typeof i) {
            for (var o in i)
                t[e].apply(t, [o, i[o]].concat(n));
            return !1
        }
        if (c.test(i)) {
            for (var r = i.split(c), s = 0, a = r.length; s < a; s++)
                t[e].apply(t, [r[s]].concat(n));
            return !1
        }
        return !0
    }
      , h = function(t, e) {
        var i, n = -1, o = t.length, r = e[0], s = e[1], a = e[2];
        switch (e.length) {
        case 0:
            for (; ++n < o; )
                (i = t[n]).callback.call(i.ctx);
            return;
        case 1:
            for (; ++n < o; )
                (i = t[n]).callback.call(i.ctx, r);
            return;
        case 2:
            for (; ++n < o; )
                (i = t[n]).callback.call(i.ctx, r, s);
            return;
        case 3:
            for (; ++n < o; )
                (i = t[n]).callback.call(i.ctx, r, s, a);
            return;
        default:
            for (; ++n < o; )
                (i = t[n]).callback.apply(i.ctx, e)
        }
    };
    a.each({
        listenTo: "on",
        listenToOnce: "once"
    }, function(t, e) {
        l[e] = function(e, i, n) {
            return (this._listeners || (this._listeners = {}))[e._listenerId || (e._listenerId = a.uniqueId("l"))] = e,
            "object" == typeof i && (n = this),
            e[t](i, n, this),
            this
        }
    }),
    l.bind = l.on,
    l.unbind = l.off,
    a.extend(t, l);
    var p = t.Model = function(t, e) {
        var i, n = t || {};
        e || (e = {}),
        this.cid = a.uniqueId("c"),
        this.attributes = {},
        a.extend(this, a.pick(e, f)),
        e.parse && (n = this.parse(n, e) || {}),
        (i = a.result(this, "defaults")) && (n = a.defaults({}, n, i)),
        this.set(n, e),
        this.changed = {},
        this.initialize.apply(this, arguments)
    }
      , f = ["url", "urlRoot", "collection"];
    a.extend(p.prototype, l, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function(t) {
            return a.clone(this.attributes)
        },
        sync: function() {
            return t.sync.apply(this, arguments)
        },
        get: function(t) {
            return this.attributes[t]
        },
        escape: function(t) {
            return a.escape(this.get(t))
        },
        has: function(t) {
            return null != this.get(t)
        },
        set: function(t, e, i) {
            var n, o, r, s, l, c, u, h;
            if (null == t)
                return this;
            if ("object" == typeof t ? (o = t,
            i = e) : (o = {})[t] = e,
            i || (i = {}),
            !this._validate(o, i))
                return !1;
            r = i.unset,
            l = i.silent,
            s = [],
            c = this._changing,
            this._changing = !0,
            c || (this._previousAttributes = a.clone(this.attributes),
            this.changed = {}),
            h = this.attributes,
            u = this._previousAttributes,
            this.idAttribute in o && (this.id = o[this.idAttribute]);
            for (n in o)
                e = o[n],
                a.isEqual(h[n], e) || s.push(n),
                a.isEqual(u[n], e) ? delete this.changed[n] : this.changed[n] = e,
                r ? delete h[n] : h[n] = e;
            if (!l) {
                s.length && (this._pending = !0);
                for (var p = 0, f = s.length; p < f; p++)
                    this.trigger("change:" + s[p], this, h[s[p]], i)
            }
            if (c)
                return this;
            if (!l)
                for (; this._pending; )
                    this._pending = !1,
                    this.trigger("change", this, i);
            return this._pending = !1,
            this._changing = !1,
            this
        },
        unset: function(t, e) {
            return this.set(t, void 0, a.extend({}, e, {
                unset: !0
            }))
        },
        clear: function(t) {
            var e = {};
            for (var i in this.attributes)
                e[i] = void 0;
            return this.set(e, a.extend({}, t, {
                unset: !0
            }))
        },
        hasChanged: function(t) {
            return null == t ? !a.isEmpty(this.changed) : a.has(this.changed, t)
        },
        changedAttributes: function(t) {
            if (!t)
                return !!this.hasChanged() && a.clone(this.changed);
            var e, i = !1, n = this._changing ? this._previousAttributes : this.attributes;
            for (var o in t)
                a.isEqual(n[o], e = t[o]) || ((i || (i = {}))[o] = e);
            return i
        },
        previous: function(t) {
            return null != t && this._previousAttributes ? this._previousAttributes[t] : null
        },
        previousAttributes: function() {
            return a.clone(this._previousAttributes)
        },
        fetch: function(t) {
            void 0 === (t = t ? a.clone(t) : {}).parse && (t.parse = !0);
            var e = this
              , i = t.success;
            return t.success = function(n) {
                if (!e.set(e.parse(n, t), t))
                    return !1;
                i && i(e, n, t),
                e.trigger("sync", e, n, t)
            }
            ,
            I(this, t),
            this.sync("read", this, t)
        },
        save: function(t, e, i) {
            var n, o, r, s = this.attributes;
            if (null == t || "object" == typeof t ? (n = t,
            i = e) : (n = {})[t] = e,
            n && (!i || !i.wait) && !this.set(n, i))
                return !1;
            if (i = a.extend({
                validate: !0
            }, i),
            !this._validate(n, i))
                return !1;
            n && i.wait && (this.attributes = a.extend({}, s, n)),
            void 0 === i.parse && (i.parse = !0);
            var l = this
              , c = i.success;
            return i.success = function(t) {
                l.attributes = s;
                var e = l.parse(t, i);
                if (i.wait && (e = a.extend(n || {}, e)),
                a.isObject(e) && !l.set(e, i))
                    return !1;
                c && c(l, t, i),
                l.trigger("sync", l, t, i)
            }
            ,
            I(this, i),
            "patch" === (o = this.isNew() ? "create" : i.patch ? "patch" : "update") && (i.attrs = n),
            r = this.sync(o, this, i),
            n && i.wait && (this.attributes = s),
            r
        },
        destroy: function(t) {
            var e = this
              , i = (t = t ? a.clone(t) : {}).success
              , n = function() {
                e.trigger("destroy", e, e.collection, t)
            };
            if (t.success = function(o) {
                (t.wait || e.isNew()) && n(),
                i && i(e, o, t),
                e.isNew() || e.trigger("sync", e, o, t)
            }
            ,
            this.isNew())
                return t.success(),
                !1;
            I(this, t);
            var o = this.sync("delete", this, t);
            return t.wait || n(),
            o
        },
        url: function() {
            var t = a.result(this, "urlRoot") || a.result(this.collection, "url") || O();
            return this.isNew() ? t : t + ("/" === t.charAt(t.length - 1) ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(t, e) {
            return t
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return null == this.id
        },
        isValid: function(t) {
            return this._validate({}, a.extend(t || {}, {
                validate: !0
            }))
        },
        _validate: function(t, e) {
            if (!e.validate || !this.validate)
                return !0;
            t = a.extend({}, this.attributes, t);
            var i = this.validationError = this.validate(t, e) || null;
            return !i || (this.trigger("invalid", this, i, a.extend(e || {}, {
                validationError: i
            })),
            !1)
        }
    });
    a.each(["keys", "values", "pairs", "invert", "pick", "omit"], function(t) {
        p.prototype[t] = function() {
            var e = r.call(arguments);
            return e.unshift(this.attributes),
            a[t].apply(a, e)
        }
    });
    var d = t.Collection = function(t, e) {
        e || (e = {}),
        e.url && (this.url = e.url),
        e.model && (this.model = e.model),
        void 0 !== e.comparator && (this.comparator = e.comparator),
        this._reset(),
        this.initialize.apply(this, arguments),
        t && this.reset(t, a.extend({
            silent: !0
        }, e))
    }
      , g = {
        add: !0,
        remove: !0,
        merge: !0
    }
      , v = {
        add: !0,
        merge: !1,
        remove: !1
    };
    a.extend(d.prototype, l, {
        model: p,
        initialize: function() {},
        toJSON: function(t) {
            return this.map(function(e) {
                return e.toJSON(t)
            })
        },
        sync: function() {
            return t.sync.apply(this, arguments)
        },
        add: function(t, e) {
            return this.set(t, a.defaults(e || {}, v))
        },
        remove: function(t, e) {
            t = a.isArray(t) ? t.slice() : [t],
            e || (e = {});
            var i, n, o, r;
            for (i = 0,
            n = t.length; i < n; i++)
                (r = this.get(t[i])) && (delete this._byId[r.id],
                delete this._byId[r.cid],
                o = this.indexOf(r),
                this.models.splice(o, 1),
                this.length--,
                e.silent || (e.index = o,
                r.trigger("remove", r, this, e)),
                this._removeReference(r));
            return this
        },
        set: function(t, e) {
            (e = a.defaults(e || {}, g)).parse && (t = this.parse(t, e)),
            a.isArray(t) || (t = t ? [t] : []);
            var i, n, r, l, c, u = e.at, h = this.comparator && null == u && !1 !== e.sort, p = a.isString(this.comparator) ? this.comparator : null, f = [], d = [], v = {};
            for (i = 0,
            n = t.length; i < n; i++)
                (r = this._prepareModel(t[i], e)) && ((l = this.get(r)) ? (e.remove && (v[l.cid] = !0),
                e.merge && (l.set(r.attributes, e),
                h && !c && l.hasChanged(p) && (c = !0))) : e.add && (f.push(r),
                r.on("all", this._onModelEvent, this),
                this._byId[r.cid] = r,
                null != r.id && (this._byId[r.id] = r)));
            if (e.remove) {
                for (i = 0,
                n = this.length; i < n; ++i)
                    v[(r = this.models[i]).cid] || d.push(r);
                d.length && this.remove(d, e)
            }
            if (f.length && (h && (c = !0),
            this.length += f.length,
            null != u ? s.apply(this.models, [u, 0].concat(f)) : o.apply(this.models, f)),
            c && this.sort({
                silent: !0
            }),
            e.silent)
                return this;
            for (i = 0,
            n = f.length; i < n; i++)
                (r = f[i]).trigger("add", r, this, e);
            return c && this.trigger("sort", this, e),
            this
        },
        reset: function(t, e) {
            e || (e = {});
            for (var i = 0, n = this.models.length; i < n; i++)
                this._removeReference(this.models[i]);
            return e.previousModels = this.models,
            this._reset(),
            this.add(t, a.extend({
                silent: !0
            }, e)),
            e.silent || this.trigger("reset", this, e),
            this
        },
        push: function(t, e) {
            return t = this._prepareModel(t, e),
            this.add(t, a.extend({
                at: this.length
            }, e)),
            t
        },
        pop: function(t) {
            var e = this.at(this.length - 1);
            return this.remove(e, t),
            e
        },
        unshift: function(t, e) {
            return t = this._prepareModel(t, e),
            this.add(t, a.extend({
                at: 0
            }, e)),
            t
        },
        shift: function(t) {
            var e = this.at(0);
            return this.remove(e, t),
            e
        },
        slice: function(t, e) {
            return this.models.slice(t, e)
        },
        get: function(t) {
            if (null != t)
                return this._byId[null != t.id ? t.id : t.cid || t]
        },
        at: function(t) {
            return this.models[t]
        },
        where: function(t, e) {
            return a.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function(e) {
                for (var i in t)
                    if (t[i] !== e.get(i))
                        return !1;
                return !0
            })
        },
        findWhere: function(t) {
            return this.where(t, !0)
        },
        sort: function(t) {
            if (!this.comparator)
                throw new Error("Cannot sort a set without a comparator");
            return t || (t = {}),
            a.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(a.bind(this.comparator, this)),
            t.silent || this.trigger("sort", this, t),
            this
        },
        sortedIndex: function(t, e, i) {
            e || (e = this.comparator);
            var n = a.isFunction(e) ? e : function(t) {
                return t.get(e)
            }
            ;
            return a.sortedIndex(this.models, t, n, i)
        },
        pluck: function(t) {
            return a.invoke(this.models, "get", t)
        },
        fetch: function(t) {
            void 0 === (t = t ? a.clone(t) : {}).parse && (t.parse = !0);
            var e = t.success
              , i = this;
            return t.success = function(n) {
                var o = t.reset ? "reset" : "set";
                i[o](n, t),
                e && e(i, n, t),
                i.trigger("sync", i, n, t)
            }
            ,
            I(this, t),
            this.sync("read", this, t)
        },
        create: function(t, e) {
            if (e = e ? a.clone(e) : {},
            !(t = this._prepareModel(t, e)))
                return !1;
            e.wait || this.add(t, e);
            var i = this
              , n = e.success;
            return e.success = function(o) {
                e.wait && i.add(t, e),
                n && n(t, o, e)
            }
            ,
            t.save(null, e),
            t
        },
        parse: function(t, e) {
            return t
        },
        clone: function() {
            return new this.constructor(this.models)
        },
        _reset: function() {
            this.length = 0,
            this.models = [],
            this._byId = {}
        },
        _prepareModel: function(t, e) {
            if (t instanceof p)
                return t.collection || (t.collection = this),
                t;
            e || (e = {}),
            e.collection = this;
            var i = new this.model(t,e);
            return i._validate(t, e) ? i : (this.trigger("invalid", this, t, e),
            !1)
        },
        _removeReference: function(t) {
            this === t.collection && delete t.collection,
            t.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(t, e, i, n) {
            ("add" !== t && "remove" !== t || i === this) && ("destroy" === t && this.remove(e, n),
            e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)],
            null != e.id && (this._byId[e.id] = e)),
            this.trigger.apply(this, arguments))
        }
    });
    a.each(["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"], function(t) {
        d.prototype[t] = function() {
            var e = r.call(arguments);
            return e.unshift(this.models),
            a[t].apply(a, e)
        }
    });
    a.each(["groupBy", "countBy", "sortBy"], function(t) {
        d.prototype[t] = function(e, i) {
            var n = a.isFunction(e) ? e : function(t) {
                return t.get(e)
            }
            ;
            return a[t](this.models, n, i)
        }
    });
    var m = t.View = function(t) {
        this.cid = a.uniqueId("view"),
        this._configure(t || {}),
        this._ensureElement(),
        this.initialize.apply(this, arguments),
        this.delegateEvents()
    }
      , y = /^(\S+)\s*(.*)$/
      , b = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    a.extend(m.prototype, l, {
        tagName: "div",
        $: function(t) {
            return this.$el.find(t)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            return this.$el.remove(),
            this.stopListening(),
            this
        },
        setElement: function(e, i) {
            return this.$el && this.undelegateEvents(),
            this.$el = e instanceof t.$ ? e : t.$(e),
            this.el = this.$el[0],
            !1 !== i && this.delegateEvents(),
            this
        },
        delegateEvents: function(t) {
            if (!t && !(t = a.result(this, "events")))
                return this;
            this.undelegateEvents();
            for (var e in t) {
                var i = t[e];
                if (a.isFunction(i) || (i = this[t[e]]),
                i) {
                    var n = e.match(y)
                      , o = n[1]
                      , r = n[2];
                    i = a.bind(i, this),
                    o += ".delegateEvents" + this.cid,
                    "" === r ? this.$el.on(o, i) : this.$el.on(o, r, i)
                }
            }
            return this
        },
        undelegateEvents: function() {
            return this.$el.off(".delegateEvents" + this.cid),
            this
        },
        _configure: function(t) {
            this.options && (t = a.extend({}, a.result(this, "options"), t)),
            a.extend(this, a.pick(t, b)),
            this.options = t
        },
        _ensureElement: function() {
            if (this.el)
                this.setElement(a.result(this, "el"), !1);
            else {
                var e = a.extend({}, a.result(this, "attributes"));
                this.id && (e.id = a.result(this, "id")),
                this.className && (e.class = a.result(this, "className"));
                var i = t.$("<" + a.result(this, "tagName") + ">").attr(e);
                this.setElement(i, !1)
            }
        }
    }),
    t.sync = function(e, i, n) {
        var o = w[e];
        a.defaults(n || (n = {}), {
            emulateHTTP: t.emulateHTTP,
            emulateJSON: t.emulateJSON
        });
        var r = {
            type: o,
            dataType: "json"
        };
        if (n.url || (r.url = a.result(i, "url") || O()),
        null != n.data || !i || "create" !== e && "update" !== e && "patch" !== e || (r.contentType = "application/json",
        r.data = JSON.stringify(n.attrs || i.toJSON(n))),
        n.emulateJSON && (r.contentType = "application/x-www-form-urlencoded",
        r.data = r.data ? {
            model: r.data
        } : {}),
        n.emulateHTTP && ("PUT" === o || "DELETE" === o || "PATCH" === o)) {
            r.type = "POST",
            n.emulateJSON && (r.data._method = o);
            var s = n.beforeSend;
            n.beforeSend = function(t) {
                if (t.setRequestHeader("X-HTTP-Method-Override", o),
                s)
                    return s.apply(this, arguments)
            }
        }
        "GET" === r.type || n.emulateJSON || (r.processData = !1),
        "PATCH" !== r.type || !window.ActiveXObject || window.external && window.external.msActiveXFilteringEnabled || (r.xhr = function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
        );
        var l = n.xhr = t.ajax(a.extend(r, n));
        return i.trigger("request", i, l, n),
        l
    }
    ;
    var w = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        delete: "DELETE",
        read: "GET"
    };
    t.ajax = function() {
        return t.$.ajax.apply(t.$, arguments)
    }
    ;
    var x = t.Router = function(t) {
        t || (t = {}),
        t.routes && (this.routes = t.routes),
        this._bindRoutes(),
        this.initialize.apply(this, arguments)
    }
      , _ = /\((.*?)\)/g
      , T = /(\(\?)?:\w+/g
      , C = /\*\w+/g
      , j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    a.extend(x.prototype, l, {
        initialize: function() {},
        route: function(e, i, n) {
            a.isRegExp(e) || (e = this._routeToRegExp(e)),
            a.isFunction(i) && (n = i,
            i = ""),
            n || (n = this[i]);
            var o = this;
            return t.history.route(e, function(r) {
                var s = o._extractParameters(e, r);
                n && n.apply(o, s),
                o.trigger.apply(o, ["route:" + i].concat(s)),
                o.trigger("route", i, s),
                t.history.trigger("route", o, i, s)
            }),
            this
        },
        navigate: function(e, i) {
            return t.history.navigate(e, i),
            this
        },
        _bindRoutes: function() {
            if (this.routes) {
                this.routes = a.result(this, "routes");
                for (var t, e = a.keys(this.routes); null != (t = e.pop()); )
                    this.route(t, this.routes[t])
            }
        },
        _routeToRegExp: function(t) {
            return t = t.replace(j, "\\$&").replace(_, "(?:$1)?").replace(T, function(t, e) {
                return e ? t : "([^/]+)"
            }).replace(C, "(.*?)"),
            new RegExp("^" + t + "$")
        },
        _extractParameters: function(t, e) {
            var i = t.exec(e).slice(1);
            return a.map(i, function(t) {
                return t ? decodeURIComponent(t) : null
            })
        }
    });
    var k = t.History = function() {
        this.handlers = [],
        a.bindAll(this, "checkUrl"),
        "undefined" != typeof window && (this.location = window.location,
        this.history = window.history)
    }
      , q = /^[#\/]|\s+$/g
      , E = /^\/+|\/+$/g
      , S = /msie [\w.]+/
      , A = /\/$/;
    k.started = !1,
    a.extend(k.prototype, l, {
        interval: 50,
        getHash: function(t) {
            var e = (t || this).location.href.match(/#(.*)$/);
            return e ? e[1] : ""
        },
        getFragment: function(t, e) {
            if (null == t)
                if (this._hasPushState || !this._wantsHashChange || e) {
                    t = this.location.pathname;
                    var i = this.root.replace(A, "");
                    t.indexOf(i) || (t = t.substr(i.length))
                } else
                    t = this.getHash();
            return t.replace(q, "")
        },
        start: function(e) {
            if (k.started)
                throw new Error("Backbone.history has already been started");
            k.started = !0,
            this.options = a.extend({}, {
                root: "/"
            }, this.options, e),
            this.root = this.options.root,
            this._wantsHashChange = !1 !== this.options.hashChange,
            this._wantsPushState = !!this.options.pushState,
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var i = this.getFragment()
              , n = document.documentMode
              , o = S.exec(navigator.userAgent.toLowerCase()) && (!n || n <= 7);
            this.root = ("/" + this.root + "/").replace(E, "/"),
            o && this._wantsHashChange && (this.iframe = t.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,
            this.navigate(i)),
            this._hasPushState ? t.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange"in window && !o ? t.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)),
            this.fragment = i;
            var r = this.location
              , s = r.pathname.replace(/[^\/]$/, "$&/") === this.root;
            return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !s ? (this.fragment = this.getFragment(null, !0),
            this.location.replace(this.root + this.location.search + "#" + this.fragment),
            !0) : (this._wantsPushState && this._hasPushState && s && r.hash && (this.fragment = this.getHash().replace(q, ""),
            this.history.replaceState({}, document.title, this.root + this.fragment + r.search)),
            this.options.silent ? void 0 : this.loadUrl())
        },
        stop: function() {
            t.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl),
            clearInterval(this._checkUrlInterval),
            k.started = !1
        },
        route: function(t, e) {
            this.handlers.unshift({
                route: t,
                callback: e
            })
        },
        checkUrl: function(t) {
            var e = this.getFragment();
            if (e === this.fragment && this.iframe && (e = this.getFragment(this.getHash(this.iframe))),
            e === this.fragment)
                return !1;
            this.iframe && this.navigate(e),
            this.loadUrl() || this.loadUrl(this.getHash())
        },
        loadUrl: function(t) {
            var e = this.fragment = this.getFragment(t);
            return a.any(this.handlers, function(t) {
                if (t.route.test(e))
                    return t.callback(e),
                    !0
            })
        },
        navigate: function(t, e) {
            if (!k.started)
                return !1;
            if (e && !0 !== e || (e = {
                trigger: e
            }),
            t = this.getFragment(t || ""),
            this.fragment !== t) {
                this.fragment = t;
                var i = this.root + t;
                if (this._hasPushState)
                    this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, i);
                else {
                    if (!this._wantsHashChange)
                        return this.location.assign(i);
                    this._updateHash(this.location, t, e.replace),
                    this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(),
                    this._updateHash(this.iframe.location, t, e.replace))
                }
                e.trigger && this.loadUrl(t)
            }
        },
        _updateHash: function(t, e, i) {
            if (i) {
                var n = t.href.replace(/(javascript:|#).*$/, "");
                t.replace(n + "#" + e)
            } else
                t.hash = "#" + e
        }
    }),
    t.history = new k;
    p.extend = d.extend = x.extend = m.extend = k.extend = function(t, e) {
        var i, n = this;
        i = t && a.has(t, "constructor") ? t.constructor : function() {
            return n.apply(this, arguments)
        }
        ,
        a.extend(i, n, e);
        var o = function() {
            this.constructor = i
        };
        return o.prototype = n.prototype,
        i.prototype = new o,
        t && a.extend(i.prototype, t),
        i.__super__ = n.prototype,
        i
    }
    ;
    var O = function() {
        throw new Error('A "url" property or function must be specified')
    }
      , I = function(t, e) {
        var i = e.error;
        e.error = function(n) {
            i && i(t, n, e),
            t.trigger("error", t, n, e)
        }
    }
}
.call(this),
function(t, e, i) {
    !function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : jQuery && !jQuery.fn.qtip && t(jQuery)
    }(function(n) {
        function o(i) {
            g = {
                pageX: i.pageX,
                pageY: i.pageY,
                type: "mousemove",
                scrollX: t.pageXOffset || e.body.scrollLeft || e.documentElement.scrollLeft,
                scrollY: t.pageYOffset || e.body.scrollTop || e.documentElement.scrollTop
            }
        }
        function r(t) {
            var e = function(t) {
                return t === b || "object" != typeof t
            }
              , i = function(t) {
                return !n.isFunction(t) && (!t && !t.attr || t.length < 1 || "object" == typeof t && !t.jquery && !t.then)
            };
            return t && "object" == typeof t ? (e(t.metadata) && (t.metadata = {
                type: t.metadata
            }),
            "content"in t && ((e(t.content) || t.content.jquery) && (t.content = {
                text: t.content
            }),
            i(t.content.text || y) && (t.content.text = y),
            "title"in t.content && (e(t.content.title) && (t.content.title = {
                text: t.content.title
            }),
            i(t.content.title.text || y) && (t.content.title.text = y))),
            "position"in t && e(t.position) && (t.position = {
                my: t.position,
                at: t.position
            }),
            "show"in t && e(t.show) && (t.show = t.show.jquery ? {
                target: t.show
            } : t.show === m ? {
                ready: m
            } : {
                event: t.show
            }),
            "hide"in t && e(t.hide) && (t.hide = t.hide.jquery ? {
                target: t.hide
            } : {
                event: t.hide
            }),
            "style"in t && e(t.style) && (t.style = {
                classes: t.style
            }),
            n.each(d, function() {
                this.sanitize && this.sanitize(t)
            }),
            t) : y
        }
        function s(i, s, a, l) {
            function c(t) {
                for (var e, i = 0, n = s, o = t.split("."); n = n[o[i++]]; )
                    i < o.length && (e = n);
                return [e || s, o.pop()]
            }
            function u(t) {
                return M.concat("").join(t ? "-" + t + " " : " ")
            }
            function h() {
                var t = s.style.widget
                  , e = Q.hasClass(G);
                Q.removeClass(G),
                G = t ? "ui-state-disabled" : "qtip-disabled",
                Q.toggleClass(G, e),
                Q.toggleClass("ui-helper-reset " + u(), t).toggleClass(F, s.style.def && !t),
                W.content && W.content.toggleClass(u("content"), t),
                W.titlebar && W.titlebar.toggleClass(u("header"), t),
                W.button && W.button.toggleClass(I + "-icon", !t)
            }
            function p(t) {
                W.title && (W.titlebar.remove(),
                W.titlebar = W.title = W.button = b,
                t !== y && U.reposition())
            }
            function w() {
                var t = s.content.title.button
                  , e = "string" == typeof t ? t : "Close tooltip";
                W.button && W.button.remove(),
                t.jquery ? W.button = t : W.button = n("<a />", {
                    class: "qtip-close " + (s.style.widget ? "" : I + "-icon"),
                    title: e,
                    "aria-label": e
                }).prepend(n("<span />", {
                    class: "ui-icon ui-icon-close",
                    html: "&times;"
                })),
                W.button.appendTo(W.titlebar || Q).attr("role", "button").click(function(t) {
                    return Q.hasClass(G) || U.hide(t),
                    y
                })
            }
            function x() {
                var t = X + "-title";
                W.titlebar && p(),
                W.titlebar = n("<div />", {
                    class: I + "-titlebar " + (s.style.widget ? u("header") : "")
                }).append(W.title = n("<div />", {
                    id: t,
                    class: I + "-title",
                    "aria-atomic": m
                })).insertBefore(W.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function(t) {
                    n(this).toggleClass("ui-state-active ui-state-focus", "down" === t.type.substr(-4))
                }).delegate(".qtip-close", "mouseover mouseout", function(t) {
                    n(this).toggleClass("ui-state-hover", "mouseover" === t.type)
                }),
                s.content.title.button && w()
            }
            function _(t) {
                var e = W.button;
                if (!U.rendered)
                    return y;
                t ? w() : e.remove()
            }
            function T(t, e) {
                var o = W.title;
                return U.rendered && t ? (n.isFunction(t) && (t = t.call(i, D.event, U)),
                t === y || !t && "" !== t ? p(y) : (t.jquery && t.length > 0 ? o.empty().append(t.css({
                    display: "block"
                })) : o.html(t),
                void (e !== y && U.rendered && Q[0].offsetWidth > 0 && U.reposition(D.event)))) : y
            }
            function S(t) {
                t && n.isFunction(t.done) && t.done(function(t) {
                    A(t, null, y)
                })
            }
            function A(t, e, o) {
                function r(t) {
                    function e(e) {
                        e.src !== O && -1 === n.inArray(e, r) && (r.push(e),
                        n.data(e, "imagesLoaded", {
                            src: e.src
                        }),
                        o.length === r.length && (setTimeout(t),
                        o.unbind(".imagesLoaded")))
                    }
                    var i = n(this)
                      , o = i.find("img").add(i.filter("img"))
                      , r = [];
                    if (!o.length)
                        return t();
                    o.bind("load.imagesLoaded error.imagesLoaded", function(t) {
                        e(t.target)
                    }).each(function(t, i) {
                        var o = i.src
                          , r = n.data(i, "imagesLoaded");
                        r && r.src === o || i.complete && i.naturalWidth ? e(i) : (i.readyState || i.complete) && (i.src = O,
                        i.src = o)
                    })
                }
                var a = W.content;
                return U.rendered && t ? (n.isFunction(t) && (t = t.call(i, D.event, U) || ""),
                o !== y && S(s.content.deferred),
                t.jquery && t.length > 0 ? a.empty().append(t.css({
                    display: "block"
                })) : a.html(t),
                U.rendered < 0 ? Q.queue("fx", r) : (Y = 0,
                r.call(Q[0], n.noop)),
                U) : y
            }
            function L() {
                function r(t) {
                    if (Q.hasClass(G))
                        return y;
                    clearTimeout(U.timers.show),
                    clearTimeout(U.timers.hide);
                    var e = function() {
                        U.toggle(m, t)
                    };
                    s.show.delay > 0 ? U.timers.show = setTimeout(e, s.show.delay) : e()
                }
                function l(t) {
                    if (Q.hasClass(G) || J || Y)
                        return y;
                    var e = n(t.relatedTarget)
                      , i = e.closest($)[0] === Q[0]
                      , o = e[0] === p.show[0];
                    if (clearTimeout(U.timers.show),
                    clearTimeout(U.timers.hide),
                    this !== e[0] && "mouse" === h.target && i || s.hide.fixed && /mouse(out|leave|move)/.test(t.type) && (i || o))
                        try {
                            t.preventDefault(),
                            t.stopImmediatePropagation()
                        } catch (t) {}
                    else
                        s.hide.delay > 0 ? U.timers.hide = setTimeout(function() {
                            U.hide(t)
                        }, s.hide.delay) : U.hide(t)
                }
                function c(t) {
                    if (Q.hasClass(G))
                        return y;
                    clearTimeout(U.timers.inactive),
                    U.timers.inactive = setTimeout(function() {
                        U.hide(t)
                    }, s.hide.inactive)
                }
                function u(t) {
                    U.rendered && Q[0].offsetWidth > 0 && U.reposition(t)
                }
                var h = s.position
                  , p = {
                    show: s.show.target,
                    hide: s.hide.target,
                    viewport: n(h.viewport),
                    document: n(e),
                    body: n(e.body),
                    window: n(t)
                }
                  , v = {
                    show: n.trim("" + s.show.event).split(" "),
                    hide: n.trim("" + s.hide.event).split(" ")
                }
                  , b = 6 === d.ie;
                Q.bind("mouseenter" + V + " mouseleave" + V, function(t) {
                    var e = "mouseenter" === t.type;
                    e && U.focus(t),
                    Q.toggleClass(N, e)
                }),
                /mouse(out|leave)/i.test(s.hide.event) && "window" === s.hide.leave && p.document.bind("mouseout" + V + " blur" + V, function(t) {
                    /select|option/.test(t.target.nodeName) || t.relatedTarget || U.hide(t)
                }),
                s.hide.fixed ? (p.hide = p.hide.add(Q),
                Q.bind("mouseover" + V, function() {
                    Q.hasClass(G) || clearTimeout(U.timers.hide)
                })) : /mouse(over|enter)/i.test(s.show.event) && p.hide.bind("mouseleave" + V, function(t) {
                    clearTimeout(U.timers.show)
                }),
                ("" + s.hide.event).indexOf("unfocus") > -1 && h.container.closest("html").bind("mousedown" + V + " touchstart" + V, function(t) {
                    var e = n(t.target)
                      , o = U.rendered && !Q.hasClass(G) && Q[0].offsetWidth > 0
                      , r = e.parents($).filter(Q[0]).length > 0;
                    e[0] === i[0] || e[0] === Q[0] || r || i.has(e[0]).length || !o || U.hide(t)
                }),
                "number" == typeof s.hide.inactive && (p.show.bind("qtip-" + a + "-inactive", c),
                n.each(f.inactiveEvents, function(t, e) {
                    p.hide.add(W.tooltip).bind(e + V + "-inactive", c)
                })),
                n.each(v.hide, function(t, e) {
                    var i = n.inArray(e, v.show)
                      , o = n(p.hide);
                    i > -1 && o.add(p.show).length === o.length || "unfocus" === e ? (p.show.bind(e + V, function(t) {
                        Q[0].offsetWidth > 0 ? l(t) : r(t)
                    }),
                    delete v.show[i]) : p.hide.bind(e + V, l)
                }),
                n.each(v.show, function(t, e) {
                    p.show.bind(e + V, r)
                }),
                "number" == typeof s.hide.distance && p.show.add(Q).bind("mousemove" + V, function(t) {
                    var e = D.origin || {}
                      , i = s.hide.distance
                      , n = Math.abs;
                    (n(t.pageX - e.pageX) >= i || n(t.pageY - e.pageY) >= i) && U.hide(t)
                }),
                "mouse" === h.target && (p.show.bind("mousemove" + V, o),
                h.adjust.mouse && (s.hide.event && (Q.bind("mouseleave" + V, function(t) {
                    (t.relatedTarget || t.target) !== p.show[0] && U.hide(t)
                }),
                W.target.bind("mouseenter" + V + " mouseleave" + V, function(t) {
                    D.onTarget = "mouseenter" === t.type
                })),
                p.document.bind("mousemove" + V, function(t) {
                    U.rendered && D.onTarget && !Q.hasClass(G) && Q[0].offsetWidth > 0 && U.reposition(t || g)
                }))),
                (h.adjust.resize || p.viewport.length) && (n.event.special.resize ? p.viewport : p.window).bind("resize" + V, u),
                (p.viewport.length && 0 != h.adjust.scroll || b && "fixed" === Q.css("position")) && p.window.add(h.container).bind("scroll" + V, u)
            }
            function R() {
                var i = [s.show.target[0], s.hide.target[0], U.rendered && W.tooltip[0], s.position.container[0], s.position.viewport[0], s.position.container.closest("html")[0], t, e];
                U.rendered ? n([]).pushStack(n.grep(i, function(t) {
                    return "object" == typeof t
                })).unbind(V) : s.show.target.unbind(V + "-create")
            }
            var W, D, U = this, X = (e.body,
            I + "-" + a), J = 0, Y = 0, Q = n(), V = ".qtip-" + a, G = "qtip-disabled";
            U.id = a,
            U.rendered = y,
            U.destroyed = y,
            U.elements = W = {
                target: i
            },
            U.timers = {
                img: {}
            },
            U.options = s,
            U.checks = {},
            U.plugins = {},
            U.cache = D = {
                event: {},
                target: n(),
                disabled: y,
                attr: l,
                onTarget: y,
                lastClass: ""
            },
            U.checks.builtin = {
                "^id$": function(t, e, i) {
                    var o = i === m ? f.nextid : i
                      , r = I + "-" + o;
                    o !== y && o.length > 0 && !n("#" + r).length && (Q[0].id = r,
                    W.content[0].id = r + "-content",
                    W.title[0].id = r + "-title")
                },
                "^content.text$": function(t, e, i) {
                    A(s.content.text)
                },
                "^content.deferred$": function(t, e, i) {
                    S(s.content.deferred)
                },
                "^content.title.text$": function(t, e, i) {
                    if (!i)
                        return p();
                    !W.title && i && x(),
                    T(i)
                },
                "^content.title.button$": function(t, e, i) {
                    _(i)
                },
                "^position.(my|at)$": function(t, e, i) {
                    "string" == typeof i && (t[e] = new d.Corner(i))
                },
                "^position.container$": function(t, e, i) {
                    U.rendered && Q.appendTo(i)
                },
                "^show.ready$": function() {
                    U.rendered ? U.toggle(m) : U.render(1)
                },
                "^style.classes$": function(t, e, i) {
                    Q.attr("class", I + " qtip " + i)
                },
                "^style.width|height": function(t, e, i) {
                    Q.css(e, i)
                },
                "^style.widget|content.title": h,
                "^events.(render|show|move|hide|focus|blur)$": function(t, e, i) {
                    Q[(n.isFunction(i) ? "" : "un") + "bind"]("tooltip" + e, i)
                },
                "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
                    var t = s.position;
                    Q.attr("tracking", "mouse" === t.target && t.adjust.mouse),
                    R(),
                    L()
                }
            },
            n.extend(U, {
                _triggerEvent: function(t, e, i) {
                    var o = n.Event("tooltip" + t);
                    return o.originalEvent = (i ? n.extend({}, i) : b) || D.event || b,
                    Q.trigger(o, [U].concat(e || [])),
                    !o.isDefaultPrevented()
                },
                render: function(t) {
                    if (U.rendered)
                        return U;
                    var e = s.content.text
                      , o = s.content.title
                      , r = s.position;
                    return n.attr(i[0], "aria-describedby", X),
                    Q = W.tooltip = n("<div/>", {
                        id: X,
                        class: [I, F, s.style.classes, I + "-pos-" + s.position.my.abbrev()].join(" "),
                        width: s.style.width || "",
                        height: s.style.height || "",
                        tracking: "mouse" === r.target && r.adjust.mouse,
                        role: "alert",
                        "aria-live": "polite",
                        "aria-atomic": y,
                        "aria-describedby": X + "-content",
                        "aria-hidden": m
                    }).toggleClass(G, D.disabled).data("qtip", U).appendTo(s.position.container).append(W.content = n("<div />", {
                        class: I + "-content",
                        id: X + "-content",
                        "aria-atomic": m
                    })),
                    U.rendered = -1,
                    J = 1,
                    o.text ? (x(),
                    n.isFunction(o.text) || T(o.text, y)) : o.button && w(),
                    n.isFunction(e) && !e.then || A(e),
                    U.rendered = m,
                    h(),
                    n.each(s.events, function(t, e) {
                        n.isFunction(e) && Q.bind("toggle" === t ? "tooltipshow tooltiphide" : "tooltip" + t, e)
                    }),
                    n.each(d, function() {
                        "render" === this.initialize && this(U)
                    }),
                    L(),
                    Q.queue("fx", function(e) {
                        U._triggerEvent("render"),
                        J = 0,
                        (s.show.ready || t) && U.toggle(m, D.event, y),
                        e()
                    }),
                    U
                },
                get: function(t) {
                    var e, i;
                    switch (t.toLowerCase()) {
                    case "dimensions":
                        e = {
                            height: Q.outerHeight(y),
                            width: Q.outerWidth(y)
                        };
                        break;
                    case "offset":
                        e = d.offset(Q, s.position.container);
                        break;
                    default:
                        e = (e = (i = c(t.toLowerCase()))[0][i[1]]).precedance ? e.string() : e
                    }
                    return e
                },
                set: function(t, e) {
                    var i, o = /^position\.(my|at|adjust|target|container)|style|content|show\.ready/i, a = y, l = U.checks;
                    return "string" == typeof t ? (i = t,
                    (t = {})[i] = e) : t = n.extend(m, {}, t),
                    n.each(t, function(e, i) {
                        var r, s = c(e.toLowerCase());
                        r = s[0][s[1]],
                        s[0][s[1]] = "object" == typeof i && i.nodeType ? n(i) : i,
                        t[e] = [s[0], s[1], i, r],
                        a = o.test(e) || a
                    }),
                    r(s),
                    J = 1,
                    n.each(t, function(t, e) {
                        var i, n, o;
                        for (i in l)
                            for (n in l[i])
                                (o = new RegExp(n,"i").exec(t)) && (e.push(o),
                                l[i][n].apply(U, e))
                    }),
                    J = 0,
                    U.rendered && Q[0].offsetWidth > 0 && a && U.reposition("mouse" === s.position.target ? b : D.event),
                    U
                },
                toggle: function(t, i) {
                    function r() {
                        t ? (d.ie && Q[0].style.removeAttribute("filter"),
                        Q.css("overflow", ""),
                        "string" == typeof c.autofocus && n(c.autofocus, Q).focus(),
                        c.target.trigger("qtip-" + a + "-inactive")) : Q.css({
                            display: "",
                            visibility: "",
                            opacity: "",
                            left: "",
                            top: ""
                        }),
                        U._triggerEvent(t ? "visible" : "hidden")
                    }
                    if (i) {
                        if (/over|enter/.test(i.type) && /out|leave/.test(D.event.type) && s.show.target.add(i.target).length === s.show.target.length && Q.has(i.relatedTarget).length)
                            return U;
                        D.event = n.extend({}, i)
                    }
                    if (!U.rendered)
                        return t ? U.render(1) : U;
                    var l = t ? "show" : "hide"
                      , c = s[l]
                      , u = (s[t ? "hide" : "show"],
                    s.position)
                      , h = s.content
                      , p = Q.css("width")
                      , f = Q[0].offsetWidth > 0
                      , b = t || 1 === c.target.length
                      , w = !i || c.target.length < 2 || D.target[0] === i.target;
                    return (typeof t).search("boolean|number") && (t = !f),
                    !Q.is(":animated") && f === t && w ? U : U._triggerEvent(l, [90]) ? (n.attr(Q[0], "aria-hidden", !t),
                    t ? (D.origin = n.extend({}, g),
                    U.focus(i),
                    n.isFunction(h.text) && A(h.text),
                    n.isFunction(h.title.text) && T(h.title.text, y),
                    !v && "mouse" === u.target && u.adjust.mouse && (n(e).bind("mousemove.qtip", o),
                    v = m),
                    p || Q.css("width", Q.outerWidth()),
                    U.reposition(i, arguments[2]),
                    p || Q.css("width", ""),
                    c.solo && ("string" == typeof c.solo ? n(c.solo) : n($, c.solo)).not(Q).not(c.target).qtip("hide", n.Event("tooltipsolo"))) : (clearTimeout(U.timers.show),
                    delete D.origin,
                    v && !n($ + '[tracking="true"]:visible', c.solo).not(Q).length && (n(e).unbind("mousemove.qtip"),
                    v = y),
                    U.blur(i)),
                    c.effect === y || b === y ? (Q[l](),
                    r.call(Q)) : n.isFunction(c.effect) ? (Q.stop(1, 1),
                    c.effect.call(Q, U),
                    Q.queue("fx", function(t) {
                        r(),
                        t()
                    })) : Q.fadeTo(90, t ? 1 : 0, r),
                    t && c.target.trigger("qtip-" + a + "-inactive"),
                    U) : U
                },
                show: function(t) {
                    return U.toggle(m, t)
                },
                hide: function(t) {
                    return U.toggle(y, t)
                },
                focus: function(t) {
                    if (!U.rendered)
                        return U;
                    var e = n($)
                      , i = parseInt(Q[0].style.zIndex, 10)
                      , o = (s.zindex || f.zindex) + e.length
                      , r = n.extend({}, t);
                    return Q.hasClass(P) || U._triggerEvent("focus", [o], r) && (i !== o && (e.each(function() {
                        this.style.zIndex > i && (this.style.zIndex = this.style.zIndex - 1)
                    }),
                    e.filter("." + P).qtip("blur", r)),
                    Q.addClass(P)[0].style.zIndex = o),
                    U
                },
                blur: function(t) {
                    return Q.removeClass(P),
                    U._triggerEvent("blur", [Q.css("zIndex")], t),
                    U
                },
                reposition: function(i, o) {
                    if (!U.rendered || J)
                        return U;
                    J = 1;
                    var r, a, l = s.position.target, c = s.position, u = c.my, h = c.at, p = c.adjust, f = p.method.split(" "), v = Q.outerWidth(y), m = Q.outerHeight(y), b = 0, w = 0, x = Q.css("position"), _ = c.viewport, T = {
                        left: 0,
                        top: 0
                    }, S = c.container, A = Q[0].offsetWidth > 0, O = i && "scroll" === i.type, I = n(t);
                    if (n.isArray(l) && 2 === l.length)
                        h = {
                            x: j,
                            y: C
                        },
                        T = {
                            left: l[0],
                            top: l[1]
                        };
                    else if ("mouse" === l && (i && i.pageX || D.event.pageX))
                        h = {
                            x: j,
                            y: C
                        },
                        i = !g || !g.pageX || !p.mouse && i && i.pageX ? (!i || "resize" !== i.type && "scroll" !== i.type ? i && i.pageX && "mousemove" === i.type ? i : (!p.mouse || s.show.distance) && D.origin && D.origin.pageX ? D.origin : i : D.event) || i || D.event || g || {} : {
                            pageX: g.pageX,
                            pageY: g.pageY
                        },
                        "static" !== x && (T = S.offset()),
                        T = {
                            left: i.pageX - T.left,
                            top: i.pageY - T.top
                        },
                        p.mouse && O && (T.left -= g.scrollX - I.scrollLeft(),
                        T.top -= g.scrollY - I.scrollTop());
                    else {
                        if ("event" === l && i && i.target && "scroll" !== i.type && "resize" !== i.type ? D.target = n(i.target) : "event" !== l && (D.target = n(l.jquery ? l : W.target)),
                        l = D.target,
                        0 === (l = n(l).eq(0)).length)
                            return U;
                        l[0] === e || l[0] === t ? (b = d.iOS ? t.innerWidth : l.width(),
                        w = d.iOS ? t.innerHeight : l.height(),
                        l[0] === t && (T = {
                            top: (_ || l).scrollTop(),
                            left: (_ || l).scrollLeft()
                        })) : d.imagemap && l.is("area") ? r = d.imagemap(U, l, h, d.viewport ? f : y) : d.svg && l[0].ownerSVGElement ? r = d.svg(U, l, h, d.viewport ? f : y) : (b = l.outerWidth(y),
                        w = l.outerHeight(y),
                        T = d.offset(l, S)),
                        r && (b = r.width,
                        w = r.height,
                        a = r.offset,
                        T = r.position),
                        (d.iOS > 3.1 && d.iOS < 4.1 || d.iOS >= 4.3 && d.iOS < 4.33 || !d.iOS && "fixed" === x) && (T.left -= I.scrollLeft(),
                        T.top -= I.scrollTop()),
                        T.left += h.x === q ? b : h.x === E ? b / 2 : 0,
                        T.top += h.y === k ? w : h.y === E ? w / 2 : 0
                    }
                    return T.left += p.x + (u.x === q ? -v : u.x === E ? -v / 2 : 0),
                    T.top += p.y + (u.y === k ? -m : u.y === E ? -m / 2 : 0),
                    d.viewport ? (T.adjusted = d.viewport(U, T, c, b, w, v, m),
                    a && T.adjusted.left && (T.left += a.left),
                    a && T.adjusted.top && (T.top += a.top)) : T.adjusted = {
                        left: 0,
                        top: 0
                    },
                    U._triggerEvent("move", [T, _.elem || _], i) ? (delete T.adjusted,
                    o === y || !A || isNaN(T.left) || isNaN(T.top) || "mouse" === l || !n.isFunction(c.effect) ? Q.css(T) : n.isFunction(c.effect) && (c.effect.call(Q, U, n.extend({}, T)),
                    Q.queue(function(t) {
                        n(this).css({
                            opacity: "",
                            height: ""
                        }),
                        d.ie && this.style.removeAttribute("filter"),
                        t()
                    })),
                    J = 0,
                    U) : U
                },
                disable: function(t) {
                    return "boolean" != typeof t && (t = !(Q.hasClass(G) || D.disabled)),
                    U.rendered ? (Q.toggleClass(G, t),
                    n.attr(Q[0], "aria-disabled", t)) : D.disabled = !!t,
                    U
                },
                enable: function() {
                    return U.disable(y)
                },
                destroy: function(t) {
                    function e() {
                        var t = i[0]
                          , e = n.attr(t, H)
                          , o = i.data("qtip");
                        U.rendered && (n.each(U.plugins, function(t) {
                            this.destroy && this.destroy(),
                            delete U.plugins[t]
                        }),
                        Q.stop(1, 0).find("*").remove().end().remove(),
                        U.rendered = y),
                        clearTimeout(U.timers.show),
                        clearTimeout(U.timers.hide),
                        R(),
                        o && U !== o || (i.removeData("qtip").removeAttr(B),
                        s.suppress && e && (i.attr("title", e),
                        i.removeAttr(H)),
                        i.removeAttr("aria-describedby")),
                        i.unbind(".qtip-" + a),
                        delete z[U.id],
                        delete U.options,
                        delete U.elements,
                        delete U.cache,
                        delete U.timers,
                        delete U.checks
                    }
                    if (!U.destroyed)
                        return U.destroyed = m,
                        t === m ? e() : (Q.bind("tooltiphidden", e),
                        U.hide()),
                        i
                }
            })
        }
        function a(t, i, o) {
            var a, l, c, u, h, p = n(e.body), g = t[0] === e ? p : t, v = t.metadata ? t.metadata(o.metadata) : b, w = "html5" === o.metadata.type && v ? v[o.metadata.name] : b, x = t.data(o.metadata.name || "qtipopts");
            try {
                x = "string" == typeof x ? n.parseJSON(x) : x
            } catch (t) {}
            if (u = n.extend(m, {}, f.defaults, o, "object" == typeof x ? r(x) : b, r(w || v)),
            l = u.position,
            u.id = i,
            "boolean" == typeof u.content.text) {
                if (c = t.attr(u.content.attr),
                u.content.attr === y || !c)
                    return y;
                u.content.text = c
            }
            if (l.container.length || (l.container = p),
            l.target === y && (l.target = g),
            u.show.target === y && (u.show.target = g),
            u.show.solo === m && (u.show.solo = l.container.closest("body")),
            u.hide.target === y && (u.hide.target = g),
            u.position.viewport === m && (u.position.viewport = l.container),
            l.container = l.container.eq(0),
            l.at = new d.Corner(l.at),
            l.my = new d.Corner(l.my),
            t.data("qtip"))
                if (u.overwrite)
                    t.qtip("destroy");
                else if (u.overwrite === y)
                    return y;
            return t.attr(B, !0),
            u.suppress && (h = t.attr("title")) && t.removeAttr("title").attr(H, h).attr("title", ""),
            a = new s(t,u,i,!!c),
            t.data("qtip", a),
            t.one("remove.qtip-" + i + " removeqtip.qtip-" + i, function() {
                var t;
                (t = n(this).data("qtip")) && t.destroy()
            }),
            a
        }
        function l(t) {
            var e, i = this, o = t.elements.tooltip, r = t.options.content.ajax, s = f.defaults.content.ajax, a = m, l = y;
            t.checks.ajax = {
                "^content.ajax": function(t, e, n) {
                    "ajax" === e && (r = n),
                    "once" === e ? i.init() : r && r.url ? i.load() : o.unbind(W)
                }
            },
            n.extend(i, {
                init: function() {
                    return r && r.url && o.unbind(W)[r.once ? "one" : "bind"]("tooltipshow" + W, i.load),
                    i
                },
                load: function(o) {
                    if (l)
                        l = y;
                    else {
                        var c, u = r.url.lastIndexOf(" "), h = r.url, p = !r.loading && a;
                        if (p)
                            try {
                                o.preventDefault()
                            } catch (t) {}
                        else if (o && o.isDefaultPrevented())
                            return i;
                        e && e.abort && e.abort(),
                        u > -1 && (c = h.substr(u),
                        h = h.substr(0, u)),
                        e = n.ajax(n.extend({
                            error: s.error || function(e, i, n) {
                                t.destroyed || 0 === e.status || t.set("content.text", i + ": " + n)
                            }
                            ,
                            context: t
                        }, r, {
                            url: h,
                            success: function(e, i, o) {
                                var a;
                                t.destroyed || (c && "string" == typeof e && (e = n("<div/>").append(e.replace(D, "")).find(c)),
                                (a = s.success || r.success) && n.isFunction(a) ? a.call(r.context || t, e, i, o) : t.set("content.text", e))
                            },
                            complete: function() {
                                var e;
                                t.destroyed || (a = y,
                                p && (l = m,
                                t.show(o.originalEvent)),
                                (e = s.complete || r.complete) && n.isFunction(e) && e.apply(r.context || t, arguments))
                            }
                        }))
                    }
                },
                destroy: function() {
                    e && e.abort && e.abort(),
                    t.destroyed = m
                }
            }),
            i.init()
        }
        function c(t, e, i) {
            var n = Math.ceil(e / 2)
              , o = Math.ceil(i / 2)
              , r = {
                bottomright: [[0, 0], [e, i], [e, 0]],
                bottomleft: [[0, 0], [e, 0], [0, i]],
                topright: [[0, i], [e, 0], [e, i]],
                topleft: [[0, 0], [0, i], [e, i]],
                topcenter: [[0, i], [n, 0], [e, i]],
                bottomcenter: [[0, 0], [e, 0], [n, i]],
                rightcenter: [[0, 0], [e, o], [0, i]],
                leftcenter: [[e, 0], [e, i], [0, o]]
            };
            return r.lefttop = r.bottomright,
            r.righttop = r.bottomleft,
            r.leftbottom = r.topright,
            r.rightbottom = r.topleft,
            r[t.string()]
        }
        function u(t, e) {
            function o(t) {
                var e = I.is(":visible");
                I.show(),
                t(),
                I.toggle(e)
            }
            function r() {
                z.width = S.height,
                z.height = S.width
            }
            function s() {
                z.width = S.width,
                z.height = S.height
            }
            function a(e, n, o, r) {
                if (O.tip) {
                    var s, a, l = v.corner.clone(), c = o.adjusted, h = t.options.position.adjust.method.split(" "), p = h[0], f = h[1] || h[0], d = {
                        left: y,
                        top: y,
                        x: 0,
                        y: 0
                    }, g = {};
                    v.corner.fixed !== m && (p === A && l.precedance === w && c.left && l.y !== E ? l.precedance = l.precedance === w ? x : w : p !== A && c.left && (l.x = l.x === E ? c.left > 0 ? j : q : l.x === j ? q : j),
                    f === A && l.precedance === x && c.top && l.x !== E ? l.precedance = l.precedance === x ? w : x : f !== A && c.top && (l.y = l.y === E ? c.top > 0 ? C : k : l.y === C ? k : C),
                    l.string() === B.corner.string() || B.top === c.top && B.left === c.left || v.update(l, y)),
                    (s = v.position(l, c))[l.x] += u(l, l.x),
                    s[l.y] += u(l, l.y),
                    s.right !== i && (s.left = -s.right),
                    s.bottom !== i && (s.top = -s.bottom),
                    s.user = Math.max(0, S.offset),
                    (d.left = p === A && !!c.left) && (l.x === E ? g["margin-left"] = d.x = s["margin-left"] - c.left : (a = s.right !== i ? [c.left, -s.left] : [-c.left, s.left],
                    (d.x = Math.max(a[0], a[1])) > a[0] && (o.left -= c.left,
                    d.left = y),
                    g[s.right !== i ? q : j] = d.x)),
                    (d.top = f === A && !!c.top) && (l.y === E ? g["margin-top"] = d.y = s["margin-top"] - c.top : (a = s.bottom !== i ? [c.top, -s.top] : [-c.top, s.top],
                    (d.y = Math.max(a[0], a[1])) > a[0] && (o.top -= c.top,
                    d.top = y),
                    g[s.bottom !== i ? k : C] = d.y)),
                    O.tip.css(g).toggle(!(d.x && d.y || l.x === E && d.y || l.y === E && d.x)),
                    o.left -= s.left.charAt ? s.user : p !== A || d.top || !d.left && !d.top ? s.left : 0,
                    o.top -= s.top.charAt ? s.user : f !== A || d.left || !d.left && !d.top ? s.top : 0,
                    B.left = c.left,
                    B.top = c.top,
                    B.corner = l.clone()
                }
            }
            function l() {
                var e = S.corner
                  , i = t.options.position
                  , n = i.at
                  , o = i.my.string ? i.my.string() : i.my;
                return e === y || o === y && n === y ? y : (e === m ? v.corner = new d.Corner(o) : e.string || (v.corner = new d.Corner(e),
                v.corner.fixed = m),
                B.corner = new d.Corner(v.corner.string()),
                "centercenter" !== v.corner.string())
            }
            function u(t, e, i) {
                e = e || t[t.precedance];
                var n, r = O.titlebar && t.y === C ? O.titlebar : I, s = "border-" + e + "-width", a = function(t) {
                    return parseInt(t.css(s), 10)
                };
                return o(function() {
                    n = (i ? a(i) : a(O.content) || a(r) || a(I)) || 0
                }),
                n
            }
            function h(t) {
                var e, i = O.titlebar && t.y === C ? O.titlebar : O.content, n = "-webkit-", r = "border-radius-" + t.y + t.x, s = "border-" + t.y + "-" + t.x + "-radius", a = function(t) {
                    return parseInt(i.css(t), 10) || parseInt(I.css(t), 10)
                };
                return o(function() {
                    e = a(s) || a(r) || a("-moz-" + s) || a("-moz-" + r) || a(n + s) || a(n + r) || 0
                }),
                e
            }
            function p(t) {
                function e(t, e, i) {
                    var n = t.css(e) || c;
                    return i && n === t.css(i) ? y : s.test(n) ? y : n
                }
                var i = O.tip.css("cssText", "")
                  , r = t || v.corner
                  , s = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i
                  , a = "border-" + r[r.precedance] + "-color"
                  , l = "background-color"
                  , c = "transparent"
                  , u = " !important"
                  , h = O.titlebar
                  , p = h && (r.y === C || r.y === E && i.position().top + z.height / 2 + S.offset < h.outerHeight(m)) ? h : O.content;
                o(function() {
                    M.fill = e(i, l) || e(p, l) || e(O.content, l) || e(I, l) || i.css(l),
                    M.border = e(i, a, "color") || e(p, a, "color") || e(O.content, a, "color") || e(I, a, "color") || I.css(a),
                    n("*", i).add(i).css("cssText", l + ":" + c + u + ";border:0" + u + ";")
                })
            }
            function f(t) {
                var e, i, n, o = t.precedance === x, r = z[o ? _ : T], s = z[o ? T : _], a = t.string().indexOf(E) > -1, l = r * (a ? .5 : 1), c = Math.pow, u = Math.round, h = Math.sqrt(c(l, 2) + c(s, 2)), p = [$ / l * h, $ / s * h];
                return p[2] = Math.sqrt(c(p[0], 2) - c($, 2)),
                p[3] = Math.sqrt(c(p[1], 2) - c($, 2)),
                e = h + p[2] + p[3] + (a ? 0 : p[0]),
                i = e / h,
                n = [u(i * s), u(i * r)],
                {
                    height: n[o ? 0 : 1],
                    width: n[o ? 1 : 0]
                }
            }
            function g(t, e, i) {
                return "<qvml:" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (e || "") + ' style="behavior: url(#default#VML); ' + (i || "") + '" />'
            }
            var v = this
              , S = t.options.style.tip
              , O = t.elements
              , I = O.tooltip
              , B = {
                top: 0,
                left: 0
            }
              , z = {
                width: S.width,
                height: S.height
            }
              , M = {}
              , $ = S.border || 0;
            v.corner = b,
            v.mimic = b,
            v.border = $,
            v.offset = S.offset,
            v.size = z,
            t.checks.tip = {
                "^position.my|style.tip.(corner|mimic|border)$": function() {
                    v.init() || v.destroy(),
                    t.reposition()
                },
                "^style.tip.(height|width)$": function() {
                    z = {
                        width: S.width,
                        height: S.height
                    },
                    v.create(),
                    v.update(),
                    t.reposition()
                },
                "^content.title.text|style.(classes|widget)$": function() {
                    O.tip && O.tip.length && v.update()
                }
            },
            n.extend(v, {
                init: function() {
                    var t = l() && (J || d.ie);
                    return t && (v.create(),
                    v.update(),
                    I.unbind(X).bind("tooltipmove" + X, a)),
                    t
                },
                create: function() {
                    var t, e = z.width, i = z.height;
                    O.tip && O.tip.remove(),
                    O.tip = n("<div />", {
                        class: "qtip-tip"
                    }).css({
                        width: e,
                        height: i
                    }).prependTo(I),
                    J ? n("<canvas />").appendTo(O.tip)[0].getContext("2d").save() : (t = g("shape", 'coordorigin="0,0"', "position:absolute;"),
                    O.tip.html(t + t),
                    n("*", O.tip).bind("click" + X + " mousedown" + X, function(t) {
                        t.stopPropagation()
                    }))
                },
                update: function(t, e) {
                    var i, o, a, l, h = O.tip, _ = h.children(), T = z.width, A = z.height, F = S.mimic, P = Math.round;
                    t || (t = B.corner || v.corner),
                    F === y ? F = t : ((F = new d.Corner(F)).precedance = t.precedance,
                    "inherit" === F.x ? F.x = t.x : "inherit" === F.y ? F.y = t.y : F.x === F.y && (F[t.precedance] = t[t.precedance])),
                    F.precedance,
                    t.precedance === w ? r() : s(),
                    O.tip.css({
                        width: T = z.width,
                        height: A = z.height
                    }),
                    p(t),
                    "transparent" !== M.border ? ($ = u(t, b),
                    0 === S.border && $ > 0 && (M.fill = M.border),
                    v.border = $ = S.border !== m ? S.border : $) : v.border = $ = 0,
                    o = c(F, T, A),
                    v.size = l = f(t),
                    h.css(l).css("line-height", l.height + "px"),
                    a = t.precedance === x ? [P(F.x === j ? $ : F.x === q ? l.width - T - $ : (l.width - T) / 2), P(F.y === C ? l.height - A : 0)] : [P(F.x === j ? l.width - T : 0), P(F.y === C ? $ : F.y === k ? l.height - A - $ : (l.height - A) / 2)],
                    J ? (_.attr(l),
                    (i = _[0].getContext("2d")).restore(),
                    i.save(),
                    i.clearRect(0, 0, 3e3, 3e3),
                    i.fillStyle = M.fill,
                    i.strokeStyle = M.border,
                    i.lineWidth = 2 * $,
                    i.lineJoin = "miter",
                    i.miterLimit = 100,
                    i.translate(a[0], a[1]),
                    i.beginPath(),
                    i.moveTo(o[0][0], o[0][1]),
                    i.lineTo(o[1][0], o[1][1]),
                    i.lineTo(o[2][0], o[2][1]),
                    i.closePath(),
                    $ && ("border-box" === I.css("background-clip") && (i.strokeStyle = M.fill,
                    i.stroke()),
                    i.strokeStyle = M.border,
                    i.stroke()),
                    i.fill()) : (o = "m" + o[0][0] + "," + o[0][1] + " l" + o[1][0] + "," + o[1][1] + " " + o[2][0] + "," + o[2][1] + " xe",
                    a[2] = $ && /^(r|b)/i.test(t.string()) ? 8 === d.ie ? 2 : 1 : 0,
                    _.css({
                        coordsize: T + $ + " " + (A + $),
                        antialias: "" + (F.string().indexOf(E) > -1),
                        left: a[0],
                        top: a[1],
                        width: T + $,
                        height: A + $
                    }).each(function(t) {
                        var e = n(this);
                        e[e.prop ? "prop" : "attr"]({
                            coordsize: T + $ + " " + (A + $),
                            path: o,
                            fillcolor: M.fill,
                            filled: !!t,
                            stroked: !t
                        }).toggle(!(!$ && !t)),
                        t || "" !== e.html() || e.html(g("stroke", 'weight="' + 2 * $ + 'px" color="' + M.border + '" miterlimit="1000" joinstyle="miter"'))
                    })),
                    setTimeout(function() {
                        O.tip.css({
                            display: "inline-block",
                            visibility: "visible"
                        })
                    }, 1),
                    e !== y && v.position(t)
                },
                position: function(t) {
                    var e, i, o, r = O.tip, s = {}, a = Math.max(0, S.offset);
                    return S.corner !== y && r ? (t = t || v.corner,
                    e = t.precedance,
                    i = f(t),
                    o = [t.x, t.y],
                    e === w && o.reverse(),
                    n.each(o, function(n, o) {
                        var r, l, c;
                        o === E ? (s[r = e === x ? j : C] = "50%",
                        s["margin-" + r] = -Math.round(i[e === x ? _ : T] / 2) + a) : (r = u(t, o),
                        l = u(t, o, O.content),
                        c = h(t),
                        s[o] = n ? l : a + (c > r ? c : -r))
                    }),
                    s[t[e]] -= i[e === w ? _ : T],
                    r.css({
                        top: "",
                        bottom: "",
                        left: "",
                        right: "",
                        margin: ""
                    }).css(s),
                    s) : y
                },
                destroy: function() {
                    I.unbind(X),
                    O.tip && O.tip.find("*").remove().end().remove(),
                    delete v.corner,
                    delete v.mimic,
                    delete v.size
                }
            }),
            v.init()
        }
        function h(t) {
            var i, o = this, r = t.options.show.modal, s = t.elements, a = s.tooltip, l = Z + t.id;
            t.checks.modal = {
                "^show.modal.(on|blur)$": function() {
                    o.destroy(),
                    o.init(),
                    i.toggle(a.is(":visible"))
                }
            },
            n.extend(o, {
                init: function() {
                    return r.on ? (i = s.overlay = Q.elem,
                    a.attr(V, m).css("z-index", d.modal.zindex + n(G).length).bind("tooltipshow" + l + " tooltiphide" + l, function(t, e, r) {
                        var s = t.originalEvent;
                        if (t.target === a[0])
                            if (s && "tooltiphide" === t.type && /mouse(leave|enter)/.test(s.type) && n(s.relatedTarget).closest(i[0]).length)
                                try {
                                    t.preventDefault()
                                } catch (t) {}
                            else
                                (!s || s && !s.solo) && o.toggle(t, "tooltipshow" === t.type, r)
                    }).bind("tooltipfocus" + l, function(t, e) {
                        if (!t.isDefaultPrevented() && t.target === a[0]) {
                            var o = n(G)
                              , r = d.modal.zindex + o.length
                              , s = parseInt(a[0].style.zIndex, 10);
                            i[0].style.zIndex = r - 1,
                            o.each(function() {
                                this.style.zIndex > s && (this.style.zIndex -= 1)
                            }),
                            o.filter("." + P).qtip("blur", t.originalEvent),
                            a.addClass(P)[0].style.zIndex = r,
                            Q.update(e);
                            try {
                                t.preventDefault()
                            } catch (t) {}
                        }
                    }).bind("tooltiphide" + l, function(t) {
                        t.target === a[0] && n(G).filter(":visible").not(a).last().qtip("focus", t)
                    }),
                    o) : o
                },
                toggle: function(e, i, n) {
                    return e && e.isDefaultPrevented() ? o : (Q.toggle(t, !!i, n),
                    o)
                },
                destroy: function() {
                    n([e, a]).removeAttr(V).unbind(l),
                    Q.toggle(t, y),
                    delete s.overlay
                }
            }),
            o.init()
        }
        function p(i) {
            var o, r = this, s = i.elements, a = i.options, l = s.tooltip, c = ".ie6-" + i.id, u = n("select, object").length < 1, h = 0, p = y;
            i.checks.ie6 = {
                "^content|style$": function(t, e, i) {
                    redraw()
                }
            },
            n.extend(r, {
                init: function() {
                    var i, a = n(t);
                    u && (s.bgiframe = n('<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>'),
                    s.bgiframe.appendTo(l),
                    l.bind("tooltipmove" + c, r.adjustBGIFrame)),
                    o = n("<div/>", {
                        id: "qtip-rcontainer"
                    }).appendTo(e.body),
                    r.redraw(),
                    s.overlay && !p && (i = function() {
                        s.overlay[0].style.top = a.scrollTop() + "px"
                    }
                    ,
                    a.bind("scroll.qtip-ie6, resize.qtip-ie6", i),
                    i(),
                    s.overlay.addClass("qtipmodal-ie6fix"),
                    p = m)
                },
                adjustBGIFrame: function() {
                    var t, e, n = i.get("dimensions"), o = i.plugins.tip, r = s.tip;
                    e = {
                        left: -(e = parseInt(l.css("border-left-width"), 10) || 0),
                        top: -e
                    },
                    o && r && (e[(t = "x" === o.corner.precedance ? ["width", "left"] : ["height", "top"])[1]] -= r[t[0]]()),
                    s.bgiframe.css(e).css(n)
                },
                redraw: function() {
                    if (i.rendered < 1 || h)
                        return r;
                    var t, e, n, s, c = a.style, u = a.position.container;
                    return h = 1,
                    c.height && l.css(T, c.height),
                    c.width ? l.css(_, c.width) : (l.css(_, "").appendTo(o),
                    (e = l.width()) % 2 < 1 && (e += 1),
                    t = ((n = l.css("max-width") || "") + (s = l.css("min-width") || "")).indexOf("%") > -1 ? u.width() / 100 : 0,
                    e = (n = (n.indexOf("%") > -1 ? t : 1) * parseInt(n, 10) || e) + (s = (s.indexOf("%") > -1 ? t : 1) * parseInt(s, 10) || 0) ? Math.min(Math.max(e, s), n) : e,
                    l.css(_, Math.round(e)).appendTo(u)),
                    h = 0,
                    r
                },
                destroy: function() {
                    u && s.bgiframe.remove(),
                    l.unbind(c)
                }
            }),
            r.init()
        }
        var f, d, g, v, m = !0, y = !1, b = null, w = "x", x = "y", _ = "width", T = "height", C = "top", j = "left", k = "bottom", q = "right", E = "center", S = "flipinvert", A = "shift", O = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", I = "qtip", B = "data-hasqtip", z = {}, M = ["ui-widget", "ui-tooltip"], $ = "div.qtip." + I, F = I + "-default", P = I + "-focus", N = I + "-hover", L = "_replacedByqTip", H = "oldtitle";
        (f = n.fn.qtip = function(t, e, o) {
            var s = ("" + t).toLowerCase()
              , a = b
              , l = n.makeArray(arguments).slice(1)
              , c = l[l.length - 1]
              , u = this[0] ? n.data(this[0], "qtip") : b;
            return !arguments.length && u || "api" === s ? u : "string" == typeof t ? (this.each(function() {
                var t = n.data(this, "qtip");
                if (!t)
                    return m;
                if (c && c.timeStamp && (t.cache.event = c),
                "option" !== s && "options" !== s || !e)
                    t[s] && t[s].apply(t[s], l);
                else {
                    if (!n.isPlainObject(e) && o === i)
                        return a = t.get(e),
                        y;
                    t.set(e, o)
                }
            }),
            a !== b ? a : this) : "object" != typeof t && arguments.length ? void 0 : (u = r(n.extend(m, {}, t)),
            f.bind.call(this, u, c))
        }
        ).bind = function(t, e) {
            return this.each(function(r) {
                function s(t) {
                    function e() {
                        p.render("object" == typeof t || l.show.ready),
                        c.show.add(c.hide).unbind(h)
                    }
                    if (p.cache.disabled)
                        return y;
                    p.cache.event = n.extend({}, t),
                    p.cache.target = t ? n(t.target) : [i],
                    l.show.delay > 0 ? (clearTimeout(p.timers.show),
                    p.timers.show = setTimeout(e, l.show.delay),
                    u.show !== u.hide && c.hide.bind(u.hide, function() {
                        clearTimeout(p.timers.show)
                    })) : e()
                }
                var l, c, u, h, p, g;
                if (g = n.isArray(t.id) ? t.id[r] : t.id,
                g = !g || g === y || g.length < 1 || z[g] ? f.nextid++ : z[g] = g,
                h = ".qtip-" + g + "-create",
                (p = a(n(this), g, t)) === y)
                    return m;
                l = p.options,
                n.each(d, function() {
                    "initialize" === this.initialize && this(p)
                }),
                c = {
                    show: l.show.target,
                    hide: l.hide.target
                },
                u = {
                    show: n.trim("" + l.show.event).replace(/ /g, h + " ") + h,
                    hide: n.trim("" + l.hide.event).replace(/ /g, h + " ") + h
                },
                /mouse(over|enter)/i.test(u.show) && !/mouse(out|leave)/i.test(u.hide) && (u.hide += " mouseleave" + h),
                c.show.bind("mousemove" + h, function(t) {
                    o(t),
                    p.cache.onTarget = m
                }),
                c.show.bind(u.show, s),
                (l.show.ready || l.prerender) && s(e)
            })
        }
        ,
        d = f.plugins = {
            Corner: function(t) {
                t = ("" + t).replace(/([A-Z])/, " $1").replace(/middle/gi, E).toLowerCase(),
                this.x = (t.match(/left|right/i) || t.match(/center/) || ["inherit"])[0].toLowerCase(),
                this.y = (t.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase();
                var e = t.charAt(0);
                this.precedance = "t" === e || "b" === e ? x : w,
                this.string = function() {
                    return this.precedance === x ? this.y + this.x : this.x + this.y
                }
                ,
                this.abbrev = function() {
                    var t = this.x.substr(0, 1)
                      , e = this.y.substr(0, 1);
                    return t === e ? t : this.precedance === x ? e + t : t + e
                }
                ,
                this.invertx = function(t) {
                    this.x = this.x === j ? q : this.x === q ? j : t || this.x
                }
                ,
                this.inverty = function(t) {
                    this.y = this.y === C ? k : this.y === k ? C : t || this.y
                }
                ,
                this.clone = function() {
                    return {
                        x: this.x,
                        y: this.y,
                        precedance: this.precedance,
                        string: this.string,
                        abbrev: this.abbrev,
                        clone: this.clone,
                        invertx: this.invertx,
                        inverty: this.inverty
                    }
                }
            },
            offset: function(t, i) {
                var o, r, s, a = t.offset(), l = t.closest("body"), c = d.ie && "CSS1Compat" !== e.compatMode, u = i;
                if (u) {
                    do {
                        "static" !== u.css("position") && (r = u.position(),
                        a.left -= r.left + (parseInt(u.css("borderLeftWidth"), 10) || 0) + (parseInt(u.css("marginLeft"), 10) || 0),
                        a.top -= r.top + (parseInt(u.css("borderTopWidth"), 10) || 0) + (parseInt(u.css("marginTop"), 10) || 0),
                        o || "hidden" === (s = u.css("overflow")) || "visible" === s || (o = u))
                    } while ((u = n(u[0].offsetParent)).length);
                    (o && o[0] !== l[0] || c) && function(t, e) {
                        a.left += e * t.scrollLeft(),
                        a.top += e * t.scrollTop()
                    }(o || l, 1)
                }
                return a
            },
            ie: function() {
                for (var t = 3, i = e.createElement("div"); (i.innerHTML = "\x3c!--[if gt IE " + ++t + "]><i></i><![endif]--\x3e") && i.getElementsByTagName("i")[0]; )
                    ;
                return t > 4 ? t : y
            }(),
            iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || y,
            fn: {
                attr: function(t, e) {
                    if (this.length) {
                        var i = this[0]
                          , o = n.data(i, "qtip");
                        if ("title" === t && o && "object" == typeof o && o.options.suppress)
                            return arguments.length < 2 ? n.attr(i, H) : (o && "title" === o.options.content.attr && o.cache.attr && o.set("content.text", e),
                            this.attr(H, e))
                    }
                    return n.fn["attr" + L].apply(this, arguments)
                },
                clone: function(t) {
                    n([]);
                    var e = n.fn["clone" + L].apply(this, arguments);
                    return t || e.filter("[" + H + "]").attr("title", function() {
                        return n.attr(this, H)
                    }).removeAttr(H),
                    e
                }
            }
        },
        n.each(d.fn, function(t, e) {
            if (!e || n.fn[t + L])
                return m;
            var i = n.fn[t + L] = n.fn[t];
            n.fn[t] = function() {
                return e.apply(this, arguments) || i.apply(this, arguments)
            }
        }),
        n.ui || (n["cleanData" + L] = n.cleanData,
        n.cleanData = function(t) {
            for (var e, o = 0; (e = t[o]) !== i && e.getAttribute(B); o++)
                try {
                    n(e).triggerHandler("removeqtip")
                } catch (t) {}
            n["cleanData" + L](t)
        }
        ),
        f.version = "2.0.1-27-",
        f.nextid = 0,
        f.inactiveEvents = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),
        f.zindex = 15e3,
        f.defaults = {
            prerender: y,
            id: y,
            overwrite: m,
            suppress: m,
            content: {
                text: m,
                attr: "title",
                deferred: y,
                title: {
                    text: y,
                    button: y
                }
            },
            position: {
                my: "top left",
                at: "bottom right",
                target: y,
                container: y,
                viewport: y,
                adjust: {
                    x: 0,
                    y: 0,
                    mouse: m,
                    scroll: m,
                    resize: m,
                    method: "flipinvert flipinvert"
                },
                effect: function(t, e, i) {
                    n(this).animate(e, {
                        duration: 200,
                        queue: y
                    })
                }
            },
            show: {
                target: y,
                event: "mouseenter",
                effect: m,
                delay: 90,
                solo: y,
                ready: y,
                autofocus: y
            },
            hide: {
                target: y,
                event: "mouseleave",
                effect: m,
                delay: 0,
                fixed: y,
                inactive: y,
                leave: "window",
                distance: y
            },
            style: {
                classes: "",
                widget: y,
                width: y,
                height: y,
                def: m
            },
            events: {
                render: b,
                move: b,
                show: b,
                hide: b,
                toggle: b,
                visible: b,
                hidden: b,
                focus: b,
                blur: b
            }
        },
        d.svg = function(t, i, o, r) {
            for (var s, a, l, c, u, h = n(e), p = i[0], f = {
                width: 0,
                height: 0,
                position: {
                    top: 1e10,
                    left: 1e10
                }
            }; !p.getBBox; )
                p = p.parentNode;
            if (p.getBBox && p.parentNode) {
                if (s = p.getBBox(),
                a = p.getScreenCTM(),
                !(l = p.farthestViewportElement || p).createSVGPoint)
                    return f;
                (c = l.createSVGPoint()).x = s.x,
                c.y = s.y,
                u = c.matrixTransform(a),
                f.position.left = u.x,
                f.position.top = u.y,
                c.x += s.width,
                c.y += s.height,
                u = c.matrixTransform(a),
                f.width = u.x - f.position.left,
                f.height = u.y - f.position.top,
                f.position.left += h.scrollLeft(),
                f.position.top += h.scrollTop()
            }
            return f
        }
        ;
        var R, W = ".qtip-ajax", D = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        (R = d.ajax = function(t) {
            var e = t.plugins.ajax;
            return "object" == typeof e ? e : t.plugins.ajax = new l(t)
        }
        ).initialize = "render",
        R.sanitize = function(t) {
            var e, i = t.content;
            i && "ajax"in i && ("object" != typeof (e = i.ajax) && (e = t.content.ajax = {
                url: e
            }),
            "boolean" != typeof e.once && e.once && (e.once = !!e.once))
        }
        ,
        n.extend(m, f.defaults, {
            content: {
                ajax: {
                    loading: m,
                    once: m
                }
            }
        });
        var U, X = ".qtip-tip", J = !!e.createElement("canvas").getContext;
        (U = d.tip = function(t) {
            var e = t.plugins.tip;
            return "object" == typeof e ? e : t.plugins.tip = new u(t)
        }
        ).initialize = "render",
        U.sanitize = function(t) {
            var e, i = t.style;
            i && "tip"in i && ("object" != typeof (e = t.style.tip) && (t.style.tip = {
                corner: e
            }),
            /string|boolean/i.test(typeof e.corner) || (e.corner = m),
            "number" != typeof e.width && delete e.width,
            "number" != typeof e.height && delete e.height,
            "number" != typeof e.border && e.border !== m && delete e.border,
            "number" != typeof e.offset && delete e.offset)
        }
        ,
        n.extend(m, f.defaults, {
            style: {
                tip: {
                    corner: m,
                    mimic: y,
                    width: 6,
                    height: 6,
                    border: m,
                    offset: 0
                }
            }
        });
        var Y, Q, V = "is-modal-qtip", G = $ + "[" + V + "]", Z = ".qtipmodal";
        Q = new (Q = function() {
            function i(t) {
                if (n.expr[":"].focusable)
                    return n.expr[":"].focusable;
                var e, i, o, r = !isNaN(n.attr(t, "tabindex")), s = t.nodeName.toLowerCase();
                return "area" === s ? (e = t.parentNode,
                i = e.name,
                !(!t.href || !i || "map" !== e.nodeName.toLowerCase()) && (!!(o = n("img[usemap=#" + i + "]")[0]) && o.is(":visible"))) : /input|select|textarea|button|object/.test(s) ? !t.disabled : "a" === s ? t.href || r : r
            }
            function o(t) {
                h.length < 1 && t.length ? t.not("body").blur() : h.first().focus()
            }
            function r(t) {
                if (c.is(":visible")) {
                    var e = n(t.target)
                      , i = s.elements.tooltip
                      , r = e.closest($);
                    (r.length < 1 ? y : parseInt(r[0].style.zIndex, 10) > parseInt(i[0].style.zIndex, 10)) || e.closest($)[0] === i[0] || o(e),
                    a = t.target === h[h.length - 1]
                }
            }
            var s, a, l, c, u = this, h = {};
            n.extend(u, {
                init: function() {
                    function i() {
                        var t = n(this);
                        c.css({
                            height: t.height(),
                            width: t.width()
                        })
                    }
                    return c = u.elem = n("<div />", {
                        id: "qtip-overlay",
                        html: "<div></div>",
                        mousedown: function() {
                            return y
                        }
                    }).hide(),
                    n(t).bind("resize" + Z, i),
                    i(),
                    n(e.body).bind("focusin" + Z, r),
                    n(e).bind("keydown" + Z, function(t) {
                        s && s.options.show.modal.escape && 27 === t.keyCode && s.hide(t)
                    }),
                    c.bind("click" + Z, function(t) {
                        s && s.options.show.modal.blur && s.hide(t)
                    }),
                    u
                },
                update: function(t) {
                    s = t,
                    h = t.options.show.modal.stealfocus !== y ? t.elements.tooltip.find("*").filter(function() {
                        return i(this)
                    }) : []
                },
                toggle: function(t, i, r) {
                    n(e.body);
                    var a = t.elements.tooltip
                      , h = t.options.show.modal
                      , p = h.effect
                      , f = i ? "show" : "hide"
                      , d = c.is(":visible")
                      , g = n(G).filter(":visible:not(:animated)").not(a);
                    return u.update(t),
                    i && h.stealfocus !== y && o(n(":focus")),
                    c.toggleClass("blurs", h.blur),
                    i && c.css({
                        left: 0,
                        top: 0
                    }).appendTo(e.body),
                    c.is(":animated") && d === i && l !== y || !i && g.length ? u : (c.stop(m, y),
                    n.isFunction(p) ? p.call(c, i) : p === y ? c[f]() : c.fadeTo(parseInt(r, 10) || 90, i ? 1 : 0, function() {
                        i || c.hide()
                    }),
                    i || c.queue(function(t) {
                        c.css({
                            left: "",
                            top: ""
                        }),
                        g.length || c.detach(),
                        t()
                    }),
                    l = i,
                    s.destroyed && (s = b),
                    u)
                }
            }),
            u.init()
        }
        ),
        (Y = d.modal = function(t) {
            var e = t.plugins.modal;
            return "object" == typeof e ? e : t.plugins.modal = new h(t)
        }
        ).sanitize = function(t) {
            t.show && ("object" != typeof t.show.modal ? t.show.modal = {
                on: !!t.show.modal
            } : void 0 === t.show.modal.on && (t.show.modal.on = m))
        }
        ,
        Y.zindex = f.zindex - 200,
        Y.initialize = "render",
        n.extend(m, f.defaults, {
            show: {
                modal: {
                    on: y,
                    effect: m,
                    blur: m,
                    stealfocus: m,
                    escape: m
                }
            }
        }),
        d.viewport = function(i, n, o, r, s, a, l) {
            function c(t, e, i, o, r, s, a, l, c) {
                var u = n[r]
                  , p = g[t]
                  , f = v[t]
                  , d = i === A
                  , m = -z.offset[r] + B.offset[r] + B["scroll" + r]
                  , y = p === r ? c : p === s ? -c : -c / 2
                  , b = f === r ? l : f === s ? -l : -l / 2
                  , w = $ && $.size ? $.size[a] || 0 : 0
                  , x = $ && $.corner && $.corner.precedance === t && !d ? w : 0
                  , _ = m - u + x
                  , T = u + c - B[a] - m + x
                  , C = y - (g.precedance === t || p === g[e] ? b : 0) - (f === E ? l / 2 : 0);
                return d ? (x = $ && $.corner && $.corner.precedance === e ? w : 0,
                C = (p === r ? 1 : -1) * y - x,
                n[r] += _ > 0 ? _ : T > 0 ? -T : 0,
                n[r] = Math.max(-z.offset[r] + B.offset[r] + (x && $.corner[t] === E ? $.offset : 0), u - C, Math.min(Math.max(-z.offset[r] + B.offset[r] + B[a], u + C), n[r]))) : (o *= i === S ? 2 : 0,
                _ > 0 && (p !== r || T > 0) ? (n[r] -= C + o,
                h["invert" + t](r)) : T > 0 && (p !== s || _ > 0) && (n[r] -= (p === E ? -C : C) + o,
                h["invert" + t](s)),
                n[r] < m && -n[r] > T && (n[r] = u,
                h = g.clone())),
                n[r] - u
            }
            var u, h, p, f = o.target, d = i.elements.tooltip, g = o.my, v = o.at, m = o.adjust, y = m.method.split(" "), b = y[0], O = y[1] || y[0], B = o.viewport, z = o.container, M = i.cache, $ = i.plugins.tip, F = {
                left: 0,
                top: 0
            };
            return B.jquery && f[0] !== t && f[0] !== e.body && "none" !== m.method ? (u = "fixed" === d.css("position"),
            B = {
                elem: B,
                height: B[(B[0] === t ? "h" : "outerH") + "eight"](),
                width: B[(B[0] === t ? "w" : "outerW") + "idth"](),
                scrollleft: u ? 0 : B.scrollLeft(),
                scrolltop: u ? 0 : B.scrollTop(),
                offset: B.offset() || {
                    left: 0,
                    top: 0
                }
            },
            z = {
                elem: z,
                scrollLeft: z.scrollLeft(),
                scrollTop: z.scrollTop(),
                offset: z.offset() || {
                    left: 0,
                    top: 0
                }
            },
            "shift" === b && "shift" === O || (h = g.clone()),
            F = {
                left: "none" !== b ? c(w, x, b, m.x, j, q, _, r, a) : 0,
                top: "none" !== O ? c(x, w, O, m.y, C, k, T, s, l) : 0
            },
            h && M.lastClass !== (p = I + "-pos-" + h.abbrev()) && d.removeClass(i.cache.lastClass).addClass(i.cache.lastClass = p),
            F) : F
        }
        ,
        d.imagemap = function(t, e, i, o) {
            function r(t, e, i) {
                for (var n = 0, o = 1, r = 1, s = 0, a = 0, l = t.width, c = t.height; l > 0 && c > 0 && o > 0 && r > 0; )
                    for (l = Math.floor(l / 2),
                    c = Math.floor(c / 2),
                    i.x === j ? o = l : i.x === q ? o = t.width - l : o += Math.floor(l / 2),
                    i.y === C ? r = c : i.y === k ? r = t.height - c : r += Math.floor(c / 2),
                    n = e.length; n-- && !(e.length < 2); )
                        s = e[n][0] - t.position.left,
                        a = e[n][1] - t.position.top,
                        (i.x === j && s >= o || i.x === q && s <= o || i.x === E && (s < o || s > t.width - o) || i.y === C && a >= r || i.y === k && a <= r || i.y === E && (a < r || a > t.height - r)) && e.splice(n, 1);
                return {
                    left: e[0][0],
                    top: e[0][1]
                }
            }
            e.jquery || (e = n(e));
            var s = t.cache.areas = {}
              , a = (e[0].shape || e.attr("shape")).toLowerCase()
              , l = e[0].coords || e.attr("coords")
              , c = l.split(",")
              , u = []
              , h = n('img[usemap="#' + e.parent("map").attr("name") + '"]')
              , p = h.offset()
              , f = {
                width: 0,
                height: 0,
                position: {
                    top: 1e10,
                    right: 0,
                    bottom: 0,
                    left: 1e10
                }
            }
              , d = 0
              , g = 0;
            if (p.left += Math.ceil((h.outerWidth() - h.width()) / 2),
            p.top += Math.ceil((h.outerHeight() - h.height()) / 2),
            "poly" === a)
                for (d = c.length; d--; )
                    (g = [parseInt(c[--d], 10), parseInt(c[d + 1], 10)])[0] > f.position.right && (f.position.right = g[0]),
                    g[0] < f.position.left && (f.position.left = g[0]),
                    g[1] > f.position.bottom && (f.position.bottom = g[1]),
                    g[1] < f.position.top && (f.position.top = g[1]),
                    u.push(g);
            else
                for (d = -1; d++ < c.length; )
                    u.push(parseInt(c[d], 10));
            switch (a) {
            case "rect":
                f = {
                    width: Math.abs(u[2] - u[0]),
                    height: Math.abs(u[3] - u[1]),
                    position: {
                        left: Math.min(u[0], u[2]),
                        top: Math.min(u[1], u[3])
                    }
                };
                break;
            case "circle":
                f = {
                    width: u[2] + 2,
                    height: u[2] + 2,
                    position: {
                        left: u[0],
                        top: u[1]
                    }
                };
                break;
            case "poly":
                f.width = Math.abs(f.position.right - f.position.left),
                f.height = Math.abs(f.position.bottom - f.position.top),
                "c" === i.abbrev() ? f.position = {
                    left: f.position.left + f.width / 2,
                    top: f.position.top + f.height / 2
                } : (s[i + l] || (f.position = r(f, u.slice(), i),
                !o || "flip" !== o[0] && "flip" !== o[1] || (f.offset = r(f, u.slice(), {
                    x: i.x === j ? q : i.x === q ? j : E,
                    y: i.y === C ? k : i.y === k ? C : E
                }),
                f.offset.left -= f.position.left,
                f.offset.top -= f.position.top),
                s[i + l] = f),
                f = s[i + l]),
                f.width = f.height = 0
            }
            return f.position.left += p.left,
            f.position.top += p.top,
            f
        }
        ;
        (d.ie6 = function(t) {
            var e = t.plugins.ie6;
            return 6 !== d.ie ? y : "object" == typeof e ? e : t.plugins.ie6 = new p(t)
        }
        ).initialize = "render"
    })
}(window, document),
function() {
    var t, e, i, n, o = {}.hasOwnProperty, r = function(t, e) {
        function i() {
            this.constructor = t
        }
        for (var n in e)
            o.call(e, n) && (t[n] = e[n]);
        return i.prototype = e.prototype,
        t.prototype = new i,
        t.__super__ = e.prototype,
        t
    }, s = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    };
    window.Tourist = window.Tourist || {},
    Tourist.Model = function(e) {
        function i() {
            return t = i.__super__.constructor.apply(this, arguments)
        }
        return r(i, e),
        i.prototype._module = "Tourist",
        i
    }(Backbone.Model),
    window.Tourist.Tip = window.Tourist.Tip || {},
    Tourist.Tip.Base = function() {
        function t(t) {
            this.options = null != t ? t : {},
            this.onClickNext = s(this.onClickNext, this),
            this.onClickClose = s(this.onClickClose, this),
            this.el = $("<div/>"),
            this.initialize(t),
            this._bindClickEvents(),
            Tourist.Tip.Base._cacheTip(this)
        }
        return t.prototype._module = "Tourist",
        _.extend(t.prototype, Backbone.Events),
        t.prototype.skipButtonTemplate = '<button class="btn btn-default btn-sm pull-right tour-next">Skip this step →</button>',
        t.prototype.nextButtonTemplate = '<button class="btn btn-primary btn-sm pull-right tour-next">Next step →</button>',
        t.prototype.finalButtonTemplate = '<button class="btn btn-primary btn-sm pull-right tour-next">Finish up</button>',
        t.prototype.closeButtonTemplate = '<a class="btn btn-close tour-close" href="#"><i class="icon icon-remove"></i></a>',
        t.prototype.okButtonTemplate = '<button class="btn btn-sm tour-close btn-primary">Okay</button>',
        t.prototype.actionLabelTemplate = _.template('<h4 class="action-label"><%= label %></h4>'),
        t.prototype.actionLabels = ["Do this:", "Then this:", "Next this:"],
        t.prototype.highlightClass = "tour-highlight",
        t.prototype.template = _.template('<div>\n  <div class="tour-container">\n    <%= close_button %>\n    <%= content %>\n    <p class="tour-counter <%= counter_class %>"><%= counter%></p>\n  </div>\n  <div class="tour-buttons">\n    <%= buttons %>\n  </div>\n</div>'),
        t.prototype.destroy = function() {
            return this.el.remove()
        }
        ,
        t.prototype.render = function(t) {
            return this.hide(),
            t && (this._setTarget(t.target || !1, t),
            this._setZIndex(""),
            this._renderContent(t, this._buildContentElement(t)),
            t.target && this.show(),
            t.zIndex && this._setZIndex(t.zIndex, t)),
            this
        }
        ,
        t.prototype.show = function() {}
        ,
        t.prototype.hide = function() {}
        ,
        t.prototype.setTarget = function(t, e) {
            return this._setTarget(t, e)
        }
        ,
        t.prototype.cleanupCurrentTarget = function() {
            return this.target && this.target.removeClass && this.target.removeClass(this.highlightClass),
            this.target = null
        }
        ,
        t.prototype.onClickClose = function(t) {
            return this.trigger("click:close", this, t),
            !1
        }
        ,
        t.prototype.onClickNext = function(t) {
            return this.trigger("click:next", this, t),
            !1
        }
        ,
        t.prototype._getTipElement = function() {}
        ,
        t.prototype._renderContent = function() {}
        ,
        t.prototype._bindClickEvents = function() {
            var t;
            return (t = this._getTipElement()).delegate(".tour-close", "click", this.onClickClose),
            t.delegate(".tour-next", "click", this.onClickNext)
        }
        ,
        t.prototype._setTarget = function(t, e) {
            return this.cleanupCurrentTarget(),
            t && e && e.highlightTarget && t.addClass(this.highlightClass),
            this.target = t
        }
        ,
        t.prototype._setZIndex = function(t) {
            return this._getTipElement().css("z-index", t || "")
        }
        ,
        t.prototype._buildContentElement = function(t) {
            var e, i;
            return e = this._buildButtons(t),
            i = $($.parseHTML(this.template({
                content: t.content,
                buttons: e,
                close_button: this._buildCloseButton(t),
                counter: t.final ? "" : "step " + (t.index + 1) + " of " + t.total,
                counter_class: t.final ? "final" : ""
            }))),
            e || i.find(".tour-buttons").addClass("no-buttons"),
            this._renderActionLabels(i),
            i
        }
        ,
        t.prototype._buildButtons = function(t) {
            var e;
            return e = "",
            t.okButton && (e += this.okButtonTemplate),
            t.skipButton && (e += this.skipButtonTemplate),
            t.nextButton && (e += t.final ? this.finalButtonTemplate : this.nextButtonTemplate),
            e
        }
        ,
        t.prototype._buildCloseButton = function(t) {
            return t.closeButton ? this.closeButtonTemplate : ""
        }
        ,
        t.prototype._renderActionLabels = function(t) {
            var e, i, n, o, r, s;
            for (i = 0,
            s = [],
            o = 0,
            r = (n = t.find(".action")).length; r > o; o++)
                e = n[o],
                $($.parseHTML(this.actionLabelTemplate({
                    label: this.actionLabels[i]
                }))).insertBefore(e),
                s.push(i++);
            return s
        }
        ,
        t._cacheTip = function(t) {
            return Tourist.Tip.Base._cachedTips || (Tourist.Tip.Base._cachedTips = []),
            Tourist.Tip.Base._cachedTips.push(t)
        }
        ,
        t.destroy = function() {
            var t, e, i;
            if (Tourist.Tip.Base._cachedTips) {
                for (t = 0,
                e = (i = Tourist.Tip.Base._cachedTips).length; e > t; t++)
                    i[t].destroy();
                return Tourist.Tip.Base._cachedTips = null
            }
        }
        ,
        t
    }(),
    Tourist.Tip.Bootstrap = function(t) {
        function i() {
            return e = i.__super__.constructor.apply(this, arguments)
        }
        return r(i, t),
        i.prototype.initialize = function(t) {
            var e;
            return e = {
                showEffect: null,
                hideEffect: null
            },
            this.options = _.extend(e, t),
            this.tip = new Tourist.Tip.BootstrapTip
        }
        ,
        i.prototype.destroy = function() {
            return this.tip.destroy(),
            i.__super__.destroy.call(this)
        }
        ,
        i.prototype.show = function() {
            return this.options.showEffect ? Tourist.Tip.Bootstrap.effects[this.options.showEffect].call(this, this.tip, this.tip.el) : this.tip.show()
        }
        ,
        i.prototype.hide = function() {
            return this.options.hideEffect ? Tourist.Tip.Bootstrap.effects[this.options.hideEffect].call(this, this.tip, this.tip.el) : this.tip.hide()
        }
        ,
        i.prototype._getTipElement = function() {
            return this.tip.el
        }
        ,
        i.prototype._setTarget = function(t, e) {
            return i.__super__._setTarget.call(this, t, e),
            this.tip.setTarget(t)
        }
        ,
        i.prototype._renderContent = function(t, e) {
            var i, n;
            return n = t.my || "left center",
            i = t.at || "right center",
            this.tip.setContainer(t.container || $("body")),
            this.tip.setContent(e),
            this.tip.setPosition(t.target || !1, n, i)
        }
        ,
        i
    }(Tourist.Tip.Base),
    Tourist.Tip.Bootstrap.effects = {
        slidein: function(t, e) {
            var i, n, o, r, s, a, l, c;
            for (r = {
                top: 80,
                left: 80,
                right: -80,
                bottom: -80
            }[s = (s = t.my.split(" ")[0]) || "top"],
            "bottom" === s && (s = "top"),
            "right" === s && (s = "left"),
            a = parseInt(e.css(s)),
            e.stop(),
            (i = {})[s] = a + r,
            e.css(i),
            e.show(),
            i[s] = a,
            l = 0,
            c = (o = ["easeOutCubic", "swing", "linear"]).length; c > l && (n = o[l],
            !$.easing[n]); l++)
                ;
            return e.animate(i, 300, n),
            null
        }
    },
    Tourist.Tip.BootstrapTip = function() {
        function t(t) {
            var e;
            e = {
                offset: 10,
                tipOffset: 10
            },
            this.options = _.extend(e, t),
            this.el = $($.parseHTML(this.template)),
            this.hide()
        }
        return t.prototype.template = '<div class="popover">\n  <div class="arrow"></div>\n  <div class="popover-content"></div>\n</div>',
        t.prototype.FLIP_POSITION = {
            bottom: "top",
            top: "bottom",
            left: "right",
            right: "left"
        },
        t.prototype.destroy = function() {
            return this.el.remove()
        }
        ,
        t.prototype.show = function() {
            return this.el.show().addClass("visible")
        }
        ,
        t.prototype.hide = function() {
            return this.el.hide().removeClass("visible")
        }
        ,
        t.prototype.setTarget = function(t) {
            return this.target = t,
            this._setPosition(this.target, this.my, this.at)
        }
        ,
        t.prototype.setPosition = function(t, e, i) {
            return this.target = t,
            this.my = e,
            this.at = i,
            this._setPosition(this.target, this.my, this.at)
        }
        ,
        t.prototype.setContainer = function(t) {
            return t.append(this.el)
        }
        ,
        t.prototype.setContent = function(t) {
            return this._getContentElement().html(t)
        }
        ,
        t.prototype._getContentElement = function() {
            return this.el.find(".popover-content")
        }
        ,
        t.prototype._getTipElement = function() {
            return this.el.find(".arrow")
        }
        ,
        t.prototype._setPosition = function(t, e, i) {
            var n, o, r, s, a, l, c, u, h, p;
            return null == e && (e = "left center"),
            null == i && (i = "right center"),
            t && (p = e.split(" "),
            n = p[0],
            a = p[1],
            r = this.el.css("display"),
            this.el.css({
                top: 0,
                left: 0,
                margin: 0,
                display: "block"
            }).removeClass("top").removeClass("bottom").removeClass("left").removeClass("right").addClass(this.FLIP_POSITION[n]),
            t) ? (c = this._getTipElement().css({
                left: "",
                right: "",
                top: "",
                bottom: ""
            }),
            "center" !== a && (u = {
                left: c[0].offsetWidth / 2,
                right: 0,
                top: c[0].offsetHeight / 2,
                bottom: 0
            },
            o = {},
            o[a] = u[a] + this.options.tipOffset,
            o[this.FLIP_POSITION[a]] = "auto",
            c.css(o)),
            l = this._caculateTargetPosition(i, t),
            h = this._caculateTipPosition(e, l),
            s = this._adjustForArrow(e, h),
            this.el.css(s),
            this.el.css({
                display: r
            })) : void 0
        }
        ,
        t.prototype._caculateTargetPosition = function(t, e) {
            var i, n;
            return "[object Array]" === Object.prototype.toString.call(e) ? {
                left: e[0],
                top: e[1]
            } : (i = this._getTargetBounds(e),
            n = this._lookupPosition(t, i.width, i.height),
            {
                left: i.left + n[0],
                top: i.top + n[1]
            })
        }
        ,
        t.prototype._caculateTipPosition = function(t, e) {
            var i, n, o;
            return o = this.el[0].offsetWidth,
            i = this.el[0].offsetHeight,
            n = this._lookupPosition(t, o, i),
            {
                left: e.left - n[0],
                top: e.top - n[1]
            }
        }
        ,
        t.prototype._adjustForArrow = function(t, e) {
            var i, n, o, r, s, a, l;
            switch (l = t.split(" "),
            i = l[0],
            r = l[1],
            s = this._getTipElement(),
            a = s[0].offsetWidth,
            n = s[0].offsetHeight,
            o = {
                top: e.top,
                left: e.left
            },
            i) {
            case "top":
                o.top += n + this.options.offset;
                break;
            case "bottom":
                o.top -= n + this.options.offset;
                break;
            case "left":
                o.left += a + this.options.offset;
                break;
            case "right":
                o.left -= a + this.options.offset
            }
            switch (r) {
            case "left":
                o.left -= a / 2 + this.options.tipOffset;
                break;
            case "right":
                o.left += a / 2 + this.options.tipOffset;
                break;
            case "top":
                o.top -= n / 2 + this.options.tipOffset;
                break;
            case "bottom":
                o.top += n / 2 + this.options.tipOffset
            }
            return o
        }
        ,
        t.prototype._lookupPosition = function(t, e, i) {
            var n, o;
            return o = e / 2,
            n = i / 2,
            {
                "top left": [0, 0],
                "left top": [0, 0],
                "top right": [e, 0],
                "right top": [e, 0],
                "bottom left": [0, i],
                "left bottom": [0, i],
                "bottom right": [e, i],
                "right bottom": [e, i],
                "top center": [o, 0],
                "left center": [0, n],
                "right center": [e, n],
                "bottom center": [o, i]
            }[t]
        }
        ,
        t.prototype._getTargetBounds = function(t) {
            var e, i;
            return e = t[0],
            i = "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
                width: e.offsetWidth,
                height: e.offsetHeight
            },
            $.extend({}, i, t.offset())
        }
        ,
        t
    }(),
    Tourist.Tip.QTip = function(t) {
        function e() {
            return this._renderTipBackground = s(this._renderTipBackground, this),
            i = e.__super__.constructor.apply(this, arguments)
        }
        var n;
        return r(e, t),
        6,
        14,
        10,
        n = {
            top: 80,
            left: 80,
            right: -80,
            bottom: -80
        },
        e.prototype.QTIP_DEFAULTS = {
            content: {
                text: " "
            },
            show: {
                ready: !1,
                delay: 0,
                effect: function(t) {
                    var e, i, o, r, s;
                    return i = $(this),
                    (r = t.options.position.my) && (r = r[r.precedance]),
                    r = r || "top",
                    o = n[r],
                    "bottom" === r && (r = "top"),
                    "right" === r && (r = "left"),
                    s = parseInt(i.css(r)),
                    e = {},
                    e[r] = s + o,
                    i.css(e),
                    i.show(),
                    e[r] = s,
                    i.animate(e, 300, "easeOutCubic"),
                    null
                },
                autofocus: !1
            },
            hide: {
                event: null,
                delay: 0,
                effect: !1
            },
            position: {
                adjust: {
                    method: "shift shift",
                    scroll: !1
                }
            },
            style: {
                classes: "ui-tour-tip",
                tip: {
                    height: 6,
                    width: 14
                }
            },
            events: {},
            zindex: 2e3
        },
        e.prototype.initialize = function(t) {
            return t = $.extend(!0, {}, this.QTIP_DEFAULTS, t),
            this.el.qtip(t),
            this.qtip = this.el.qtip("api"),
            this.qtip.render()
        }
        ,
        e.prototype.destroy = function() {
            return this.qtip && this.qtip.destroy(),
            e.__super__.destroy.call(this)
        }
        ,
        e.prototype.show = function() {
            return this.qtip.show()
        }
        ,
        e.prototype.hide = function() {
            return this.qtip.hide()
        }
        ,
        e.prototype._getTipElement = function() {
            return $("#qtip-" + this.qtip.id)
        }
        ,
        e.prototype._setTarget = function(t, i) {
            return e.__super__._setTarget.call(this, t, i),
            this.qtip.set("position.target", t || !1)
        }
        ,
        e.prototype._renderContent = function(t, e) {
            var i, n, o = this;
            return n = t.my || "left center",
            i = t.at || "right center",
            this._adjustPlacement(n, i),
            this.qtip.set("content.text", e),
            this.qtip.set("position.container", t.container || $("body")),
            this.qtip.set("position.my", n),
            this.qtip.set("position.at", i),
            this.qtip.set("position.viewport", t.viewport || !1),
            this.qtip.set("position.target", t.target || !1),
            setTimeout(function() {
                return o._renderTipBackground(n.split(" ")[0])
            }, 10)
        }
        ,
        e.prototype._adjustPlacement = function(t) {
            return 0 === t.indexOf("top") ? this._adjust(0, 10) : 0 === t.indexOf("bottom") ? this._adjust(0, -10) : 0 === t.indexOf("right") ? this._adjust(-10, 0) : this._adjust(10, 0)
        }
        ,
        e.prototype._adjust = function(t, e) {
            return this.qtip.set("position.adjust.x", t),
            this.qtip.set("position.adjust.y", e)
        }
        ,
        e.prototype._renderTipBackground = function(t) {
            var e, i;
            return i = $("#qtip-" + this.qtip.id + " .qtip-tip"),
            (e = i.find(".qtip-tip-bg")).length || (e = $("<div/>", {
                class: "icon icon-tip qtip-tip-bg"
            }),
            i.append(e)),
            e.removeClass("top left right bottom"),
            e.addClass(t)
        }
        ,
        e
    }(Tourist.Tip.Base),
    Tourist.Tip.Simple = function(t) {
        function e() {
            return n = e.__super__.constructor.apply(this, arguments)
        }
        return r(e, t),
        e.prototype.initialize = function() {
            return $("body").append(this.el)
        }
        ,
        e.prototype.show = function() {
            return this.el.show()
        }
        ,
        e.prototype.hide = function() {
            return this.el.hide()
        }
        ,
        e.prototype._getTipElement = function() {
            return this.el
        }
        ,
        e.prototype._renderContent = function(t, e) {
            return this.el.html(e)
        }
        ,
        e
    }(Tourist.Tip.Base),
    Tourist.Tour = function() {
        function t(t) {
            var e, i;
            this.options = null != t ? t : {},
            this.onChangeCurrentStep = s(this.onChangeCurrentStep, this),
            this.next = s(this.next, this),
            e = {
                tipClass: "Bootstrap"
            },
            this.options = _.extend(e, this.options),
            this.model = new Tourist.Model({
                current_step: null
            }),
            i = _.extend({
                model: this.model
            }, this.options.tipOptions),
            this.view = new Tourist.Tip[this.options.tipClass](i),
            this.view.bind("click:close", _.bind(this.stop, this, !0)),
            this.view.bind("click:next", this.next),
            this.model.bind("change:current_step", this.onChangeCurrentStep)
        }
        return _.extend(t.prototype, Backbone.Events),
        t.prototype.start = function() {
            return this.trigger("start", this),
            this.next()
        }
        ,
        t.prototype.stop = function(t) {
            return t ? this._showCancelFinalStep() : this._stop()
        }
        ,
        t.prototype.next = function() {
            var t, e;
            return t = this._teardownCurrentStep(),
            e = 0,
            t && (e = t.index + 1),
            e < this.options.steps.length ? this._showStep(this.options.steps[e], e) : e === this.options.steps.length ? this._showSuccessFinalStep() : this._stop()
        }
        ,
        t.prototype.setStepOptions = function(t) {
            return this.options.stepOptions = t
        }
        ,
        t.prototype.onChangeCurrentStep = function(t, e) {
            return this.view.render(e)
        }
        ,
        t.prototype._showCancelFinalStep = function() {
            return this._showFinalStep(!1)
        }
        ,
        t.prototype._showSuccessFinalStep = function() {
            return this._showFinalStep(!0)
        }
        ,
        t.prototype._teardownCurrentStep = function() {
            var t;
            return t = this.model.get("current_step"),
            this._teardownStep(t),
            t
        }
        ,
        t.prototype._stop = function() {
            return this._teardownCurrentStep(),
            this.model.set({
                current_step: null
            }),
            this.trigger("stop", this)
        }
        ,
        t.prototype._showFinalStep = function(t) {
            var e, i;
            return e = this._teardownCurrentStep(),
            i = t ? this.options.successStep : this.options.cancelStep,
            _.isFunction(i) && (i.call(this, this, this.options.stepOptions),
            i = null),
            i ? e && e.final ? this._stop() : (i.final = !0,
            this._showStep(i, this.options.steps.length)) : this._stop()
        }
        ,
        t.prototype._showStep = function(t, e) {
            return t ? (t = _.clone(t),
            t.index = e,
            t.total = this.options.steps.length,
            t.final || (t.final = this.options.steps.length === e + 1 && !this.options.successStep),
            t = _.extend(t, this._setupStep(t)),
            this.model.set({
                current_step: t
            })) : void 0
        }
        ,
        t.prototype._setupStep = function(t) {
            var e, i, n, o;
            if (!t || !t.setup)
                return {};
            if (t.bind)
                for (o = t.bind,
                i = 0,
                n = o.length; n > i; i++)
                    e = o[i],
                    t[e] = _.bind(t[e], t, this, this.options.stepOptions);
            return t.setup.call(t, this, this.options.stepOptions) || {}
        }
        ,
        t.prototype._teardownStep = function(t) {
            return t && t.teardown && t.teardown.call(t, this, this.options.stepOptions),
            this.view.cleanupCurrentTarget()
        }
        ,
        t
    }()
}
.call(this);
$(document).ready(function() {
    STEPS = [{
        content: "<p>Welcome! Here is a quick tour on ASM80 IDE basic parts.</p>",
        highlightTarget: !0,
        nextButton: !0,
        target: $("h2 img"),
        my: "left top",
        at: "right bottom"
    }, {
        content: '<p>First of all you have to set a new file. To do this, simply click on this button and enter a file name</p><p class="action">Click on the button and enter TEST.A80 as file name</p>',
        highlightTarget: !0,
        nextButton: !0,
        target: $("#bNew"),
        my: "left top",
        at: "right bottom"
    }, {
        content: '<p>This is an editor area.</p><p class="action">Write your assembler code here.</p>',
        highlightTarget: !0,
        nextButton: !0,
        target: $("article"),
        my: "left center",
        at: "right center"
    }, {
        content: "<p>Don't forget to save your work!</p>",
        highlightTarget: !0,
        nextButton: !0,
        target: $("#bSave"),
        my: "left top",
        at: "right bottom"
    }, {
        content: "<p>Here are your files. Files are stored locally in your browser!</p>",
        highlightTarget: !0,
        nextButton: !0,
        target: $("#filesystem"),
        my: "left top",
        at: "right center"
    }, {
        content: "<p>You can download all your files as one ZIP file, just press this button.</p>",
        highlightTarget: !0,
        nextButton: !0,
        target: $("#downloadify"),
        my: "left top",
        at: "right center"
    }, {
        content: "<p>When you're done editing, here is the magic button to compile.</p>",
        highlightTarget: !0,
        nextButton: !0,
        target: $("#bCompile"),
        my: "right top",
        at: "left center"
    }, {
        content: '<p>Click here to emulate your code.<p class="action">Click the button now and see what happens. Click again to dismiss the emulator panel</p></p>',
        highlightTarget: !0,
        nextButton: !0,
        target: $("#bEmu"),
        my: "right top",
        at: "left center"
    }, {
        content: "<p>Here are emulators for 8bit systems...</p>",
        highlightTarget: !0,
        nextButton: !0,
        target: $("h3"),
        my: "top center",
        at: "bottom center"
    }, {
        content: "<p>When you are in trouble, check the manual</p>",
        highlightTarget: !0,
        nextButton: !0,
        target: $("footer a"),
        my: "bottom center",
        at: "top center"
    }],
    TOUR = new Tourist.Tour({
        steps: STEPS,
        tipClass: "QTip",
        tipOptions: {
            style: {
                classes: "qtip-tour qtip-bootstrap"
            }
        }
    }),
    $("#qtour").click(function() {
        TOUR.start()
    })
});
var rle1Decode = function(e) {
    var o = [];
    return e.forEach(function(e) {
        if ("number" != typeof e)
            for (var t = 0; t < e[0]; t++)
                o.push(e[1]);
        else
            o.push(e)
    }),
    o
}
  , download = function(e, o) {
    var t = document.createElement("a");
    t.setAttribute("href", "data:text/plain;charset=utf-8," + o),
    t.setAttribute("download", e),
    document.body.appendChild(t),
    t.click(),
    document.body.removeChild(t)
}
  , downloadString = function(e, o) {
    for (var t = "", n = 0; n < o.length; n++)
        t += "%" + toHex2(o.charCodeAt(n));
    download(e, t)
}
  , makeSNA = function(e, o) {
    for (var t = [], n = rle1Decode([63, 56, 0, 184, 0, 15, 23, 68, 0, 168, 16, 185, 92, 33, 23, 58, 92, 212, 3, 4, 202, 92, 0, 240, 127, 1, 15, [4576, 0], 124, 60, 66, 120, 60, 66, 62, [2, 126], 0, 66, 60, 124, [3, 0], 16, 64, [238, 0], [2, 66], 98, 68, 66, 102, 8, 4, 64, 0, 66, 64, 66, 0, 56, 120, 56, 64, [238, 0], [2, 66], 82, [2, 66], 90, [2, 8], 124, 0, 66, 60, 66, 0, [2, 68], 16, 64, [238, 0], 124, 126, 74, [3, 66], 8, 16, 64, 0, 66, 2, 124, 0, 120, 68, 16, 64, [238, 0], 68, 66, 70, 68, [2, 66], 8, 32, 64, 0, [2, 66], 68, 0, 64, 68, 16, 64, [238, 0], [3, 66], 120, 60, 66, 62, [2, 126], 0, [2, 60], 66, 0, 60, 68, 12, 126, [270, 0], [753, 56], 184, [14, 56], [256, 0], 255, 0, 29, 249, 255, 0, 33, [2, 116], 35, 5, [5, 0], 1, 0, 6, 0, 11, 0, 1, 0, 1, 0, 6, 0, 16, [26, 0], 60, 64, 0, 255, 204, 1, 248, 127, 252, 127, [3, 0], 255, 254, 255, 1, 56, [2, 0], 203, 92, 218, 92, 182, 92, 182, 92, 203, 92, 234, 92, 202, 92, 212, 92, 217, 92, 233, 92, [2, 0], 219, 92, 219, 92, 219, 92, 0, 146, 92, 16, 2, [6, 0], 37, 74, 125, 26, [2, 0], 121, 10, 0, 88, 255, [2, 0], 33, 0, 91, 15, 23, 0, 64, 224, 80, 33, 24, 33, 23, 1, 56, 0, 56, [34, 0], 255, 127, [2, 255], 244, 9, 168, 16, 75, 244, 9, 196, 21, 83, 129, 15, 196, 21, 82, 244, 9, 196, 21, 80, 128, 165, 110, 244, [2, 0], 64, 156, 0, 128, 249, 192, 101, 110, 116, 13, 128, 110, [2, 48], 14, [2, 0], 64, 156, 0, 13, 128, [2, 0], 64, 156, [8918, 0], 243, 13, 206, 11, 236, 80, 206, 11, 237, 80, 20, 23, 220, 10, 206, 11, 241, 80, 16, 23, 220, 10, 215, 24, 56, 0, 56, 0, 13, 25, 217, 92, 169, 24, 219, 2, 77, 0, 185, 92, 219, 2, 77, 0, 184, 0, 15, 23, 254, 21, [2, 0], 225, 21, 59, 15, 127, 16, 252, 127, 180, 18, 0, 62, [32536, 0], 243, 13, 206, 11, 228, 80, 206, 11, 229, 80, 28, 23, 220, 10, 206, 11, 235, 80, 22, 23, 220, 10, 215, 24, 177, 51, 222, 92, 5, 0, 219, 2, 219, 2, 77, 0, 208, 82, 48, 0, 207, 82, 4, 2, 92, 14, 192, 87, 113, 14, 243, 13, 33, 23, 198, 30, 255, 127, 118, 27, 3, 19, 0, 62, 0, 60, [2, 66], 126, [2, 66], [2, 0], 124, 66, 124, [2, 66], 124, [2, 0], 60, 66, [2, 64], 66, 60, [2, 0], 120, 68, [2, 66], 68, 120, [2, 0], 126, 64, 124, [2, 64], 126, [2, 0], 126, 64, 124, [3, 64], [2, 0], 60, 66, 64, 78, 66, 60, [2, 0], [2, 66], 126, [3, 66], [2, 0], 62, [4, 8], 62, [2, 0], [3, 2], [2, 66], 60, [2, 0], 68, 72, 112, 72, 68, 66, [2, 0], [5, 64], 126, [2, 0], 66, 102, 90, [3, 66], [2, 0], 66, 98, 82, 74, 70, 66, [2, 0], 60, [4, 66], 60, [2, 0], 124, [2, 66], 124, [2, 64], [2, 0], 60, [2, 66], 82, 74, 60, [2, 0], 124, [2, 66], 124, 68, 66, [2, 0], 60, 64, 60, 2, 66, 60, [2, 0], 254, [5, 16], [2, 0], [5, 66], 60, 0]), r = 0; r < n.length; r++)
        t[r] = n[r];
    for (r = 0; r < e.length; r++) {
        var a = e[r]
          , h = a.addr;
        if (a.lens)
            for (var l = 0; l < a.lens.length; l++)
                t[l + h - 16384 + 27] = a.lens[l]
    }
    return ASM.ENT && (t[7403] = 255 & ASM.ENT,
    t[7404] = ASM.ENT >> 8 & 255),
    t
}
  , aconcat = function(e, o) {
    var t, n = [];
    for (t = 0; t < e.length; t++)
        n.push(e[t]);
    for (t = 0; t < o.length; t++)
        n.push(o[t]);
    return n
}
  , mkdown = function(e, o) {
    for (var t = function(e, o) {
        for (var t = e.toString(16); t.length < o; )
            t = "0" + t;
        return t.toUpperCase()
    }, n = "", r = 0; r < e.length; r++)
        n += "%" + function(e) {
            return t(255 & e, 2)
        }(e[r]);
    o || (o = "asm80.sna"),
    download(o, n)
}
  , tapdata = function(e, o) {
    var t, n = [], r = o;
    n[0] = o;
    for (var a = 0; a < e.length; a++)
        n.push(e[a]),
        r = 255 & (r ^ e[a]);
    return n.push(r),
    t = n.length,
    n.unshift(t >> 8),
    n.unshift(255 & t),
    n
}
  , makeTapBlock = function(e, o, t) {
    var n = o.length
      , r = [3, 67, 79, 68, 69, 48 + Math.floor(t / 10), 48 + t % 10, 32, 32, 32, 32, 255 & n, n >> 8, 255 & e, e >> 8, 0, 128];
    return aconcat(tapdata(r, 0), tapdata(o, 255))
}
  , makeTAP = function(e) {
    for (var o, t = null, n = 0, r = [], a = [], h = 0, l = 0, s = e.length; l < s; l++) {
        var u = (o = e[l]).addr;
        if (o.phase && (u -= o.phase),
        void 0 !== u && 0 === n && (t = u),
        u != t + n && (n && (a = aconcat(a, makeTapBlock(t, r, h++))),
        t = u,
        n = 0,
        r = []),
        o.lens) {
            for (var f = 0; f < o.lens.length; f++)
                r.push(o.lens[f]);
            n += o.lens.length
        } else
            ;
    }
    return r.length && (a = aconcat(a, makeTapBlock(t, r, h++))),
    a
}
  , hextools = {
    RAM: [],
    hexLine: function(e, o) {
        if (":" != e[0])
            return !1;
        var t = parseInt(e[1] + e[2], 16)
          , n = parseInt(e[3] + e[4] + e[5] + e[6], 16)
          , r = parseInt(e[7] + e[8], 16);
        o = o || 0;
        var a;
        if (0 == r)
            for (i = 0; i < t; i++)
                hextools.RAM[n + i + o] = parseInt(e[9 + 2 * i] + e[10 + 2 * i], 16),
                a = n + i;
        return a
    },
    readHex: function(e, o) {
        for (var t = e.split(/\n/), n = 0, r = 0; r < t.length; r++) {
            var a = hextools.hexLine(t[r], o);
            a > n && (n = a)
        }
        return n
    },
    hex2com: function(e) {
        hextools.RAM = [];
        for (var o = hextools.readHex(e, 0) + 1, t = "", n = 256; n < o; n++)
            t += "%" + toHex2(hextools.RAM[n]);
        return t
    },
    hex2bin: function(e, o, t) {
        hextools.RAM = [];
        hextools.readHex(e, 0);
        for (var n = "", r = o; r < t + 1; r++)
            n += "%" + toHex2(hextools.RAM[r]);
        return n
    },
    hex2prg: function(e, o) {
        if (o < 2064)
            throw "ENT must be above $810";
        hextools.RAM = [];
        var t = hextools.readHex(e, 0) + 1
          , n = ""
          , r = o + "";
        hextools.RAM[2047] = 1,
        hextools.RAM[2048] = 8,
        hextools.RAM[2049] = 12,
        hextools.RAM[2050] = 8,
        hextools.RAM[2051] = 10,
        hextools.RAM[2052] = 0,
        hextools.RAM[2053] = 158,
        hextools.RAM[2054] = r.charCodeAt(0),
        hextools.RAM[2055] = r.charCodeAt(1),
        hextools.RAM[2056] = r.charCodeAt(2),
        hextools.RAM[2057] = r.charCodeAt(3),
        hextools.RAM[2058] = 0,
        hextools.RAM[2059] = 0,
        hextools.RAM[2060] = 0;
        for (var a = 2047; a < t; a++)
            n += "%" + toHex2(hextools.RAM[a]);
        return n
    }
};
