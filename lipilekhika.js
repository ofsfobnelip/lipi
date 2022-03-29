/* शुभमानन्दगुप्तेन तु भगवत्प्रसादाद्भारते रचितः */
class लिपिलेखिकासहायक {
    constructor() {
        this.akSharAH = {
            "Normal": {}
        };
        this.k = null;
        this.sanchit = "https://cdn.jsdelivr.net/gh/ofsfobnelip/lipi@latest/src/dattAMsh";
        this.font_loca = this.substring(this.sanchit, 0, -8) + "fonts";
        this.image_loca = this.substring(this.sanchit, 0, -12) + "img/lang";
        this.alph = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"];
        this.lang_in = (x) => x in this.akSharAH;
        this.elms = [];
        this.pUrNasarve = this.alph[0] + this.alph[1] + "01234567890'$.#?";
        this.init = false;
        let mobile_check = function () {
            let nav = (x) => navigator.userAgent.match(x),
                g = false;
            if (nav(/Android/i) || nav(/webOS/i) || nav(/iPhone/i) || nav(/iPad/i) || nav(/iPod/i) || nav(/BlackBerry/i) || nav(/Windows Phone/i))
                g = true;
            return g;
        };
        this.is_mobile = mobile_check();
    }
    load_lang(lang, callback = null, block = false) {
        lang = lang == "Devanagari" ? "Sanskrit" : lang;
        if (!(lang in this.akSharAH)) {
            return $.get({
                url: this.sanchit + `/${lang}.json`,
                dataType: "json",
                'async': !block,
                success: (result) => {
                    this.akSharAH[lang] = result;
                    this.k.clear_all_val(true);
                    this.k.add_font(lang);
                    if (callback != null)
                        callback();
                }
            });
        } else if (callback != null)
            callback();
        return new Promise(r => r("loaded"));
    } in (val, in_what) {
        return val.indexOf(in_what) != -1;
    }
    reg_index(str, pattern) {
        let ind = [],
            mtch = 0;
        while ((mtch = pattern.exec(str)) != null)
            ind.push([mtch.index, mtch[0]]);
        return ind;
    }
    is_lower(b) {
        return this.in(this.alph[1], b);
    }
    is_null(k) {
        return k == null || k == undefined;
    }
    is_upper(b) {
        return this.in(this.alph[0], b);
    }
    to_lower(b) {
        return this.alph[1][this.alph[0].indexOf(b)];
    }
    to_upper(b) {
        return this.alph[0][this.alph[1].indexOf(b)];
    }
    time() {
        let a = new Date();
        return a.getTime() / 1000;
    }
    replace_all(str, replaceWhat, replaceTo) {
        replaceWhat = replaceWhat.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        var re = new RegExp(replaceWhat, "g");
        return str.replace(re, replaceTo);
    }
    clear(e) {
        if (this.is_mobile)
            return;
        let key = e.key;
        if (this.in(["ArrowDown", "ArrowLeft", "ArrowUp", "ArrowRight"], key))
            LipiLekhikA.clear_all_val(true);
    }
    text_to_html(v, l = "div") {
        return this.replace_all(`<${l} style="text-align:center;">` + v + `</${l}>`, "\n", `</${l}><${l} style="text-align:center;">`);
    }
    last(s, l = -1) {
        if (s == null || s == undefined)
            return "";
        let r = s[s.length + l];
        return r;
    }
    dict_rev(d) {
        let res = {};
        for (let x in d) {
            res[d[x]] = x;
        }
        return res;
    }
    substring(val, from, to = null) {
        if (to == null)
            to = val.length;
        if (to > 0)
            return val.substring(from, to)
        else if (to < 0)
            return val.substring(from, val.length + to)
    };
    format(val, l) {
        for (let x = 0; x < l.length; x++)
            val = this.replace_all(val, `{${x}}`, l[x]);
        return val;
    }
    get_Text_from_div(t) {
        t = this.replace_all(t, "&nbsp;", " ");
        t = this.replace_all(t, "&amp;", "");
        t = this.replace_all(t, "<br>", "\n");
        t = this.replace_all(t, "<br/>", "\n");
        t = this.replace_all(t, "<br />", "\n");
        t = this.replace_all(t, "</p>", "觀");
        let res = "",
            st = false;
        for (let x of t) {
            if (x == "<")
                st = true;
            if (st) {
                if (x == ">")
                    st = false;
                continue;
            }
            res += x;
        }
        res = this.replace_all(res, "觀\n", "\n");
        res = this.replace_all(res, "觀", "\n");
        return res;
    }
}
let लिपि = new लिपिलेखिकासहायक();
class लिपिलेखिकापरिवर्तक {
    constructor() {
        this.k = लिपि;
        this.karya = true;
        this.time = लिपि.time();
        this.back_space = 0;
        this.sahayika_usage = true;
        this.halant_add_status = false;
        this.script = "Hindi";
        //[key record, output, whats on screen]
        this.varna = ["", "", ""];
        this.next_chars = "";
        this.d = false;
        this.mAtrA_sthiti = false;
        this.capital = [0, "", -1, -1, 0, 0, false];
        this.store_last_of_3 = "";
        this.added_fonts = [];
        this.last_of_3_status_for_mAtrA = false;
        this.special_ved_s = false;
        this.usage_table_link = (lang) => {
            let y = lang;
            y = लिपि.in(["Devanagari", "Marathi", "Konkani", "Sanskrit", "Nepali"], y) ? "Hindi" : y;
            return `${लिपि.image_loca}/${y}.png`;
        };
        this.pUrva_lekhit = [
            ["", -1],
            ["", -1],
            ["", -1],
            ["", -1],
            ["", -1]
        ];
        this.second_cap_time = 0;
        this.sahayika = new लिपिलेखिकालेखनसहायिका();
        this.set_interface_lang = (lang = "English") => this.sahayika.set_lang(lang);
        this.hide = () => this.sahayika.elm.hide();
        this.from_click = false;
        this.font_scripts = ["Sharada", "Modi", "Brahmi", "Siddham", "Granth"];
    };
    mukhya(elmt, e) {
        if (!this.karya)
            return;
        if (elmt.attr("lipi-lekhika") != "on")
            return;
        e = e.data;
        if (e == null || e == undefined) {
            this.clear_all_val(true);
            return;
        }
        e = e.substring(e.length - 1);
        let elf = this.elphased_time() < 15.0;
        if (this.k.in(this.k.pUrNasarve, e)) {
            if (!elf)
                this.clear_all_val(true);
            let lng = elmt.attr("lipi-lang") == undefined ? this.script : elmt.attr("lipi-lang");
            this.prakriyA({
                text: e,
                typing: 1,
                lang: lng,
                mode: elmt.attr("lipi-mode") == undefined ? this.k.akSharAH[lng].sa : elmt.attr("lipi-mode"),
                element: elmt
            })
        } else
            this.clear_all_val(true);
    };
    elphased_time() {
        let t = this.time,
            c = this.k.time();
        let t1 = c - t;
        this.time = c;
        return t1;
    };
    prakriyA(args) {
        let code = "",
            mode = 0,
            lang = "",
            elm = null,
            html = false,
            l = this.k;
        if (this.k.in([undefined, null, ""], args.text))
            return "";
        else
            code = args.text;
        lang = args.lang;
        if (args.typing != undefined)
            mode = 1;
        if (args.html == true)
            html = true;
        if (args.element != undefined)
            elm = args.element;
        this.akSharANi = l.akSharAH[lang];
        this.halant = !l.in(["Normal", "Romanized", "Urdu"], lang) ? this.akSharANi["."][".x"][0] : "";
        let sa = (args.mode == 0 && mode == 1) ? 0 : 1;
        this.dev_text = [];
        html = mode == 0 && html ? true : false;
        if (html) {
            let t = code;
            let vl = {
                "&nbsp;": " ",
                "&amp;": "",
                "<br>": "\n",
                "<br/>": "\n",
                "<br />": "\n"
            };
            for (let x in vl)
                t = l.replace_all(t, x, vl[x]);
            code = t;
        }
        var add_dev = (v) => {
            if (mode == 0)
                for (let x of v)
                    this.dev_text.push(x);
        }
        let html_st = false,
            ignore_st = false;
        for (let k = 0; k < code.length; k++) {
            let key = code[k];
            if (key == "<" && html) {
                html_st = true;
                add_dev(key)
                this.clear_all_val(true);
                continue;
            }
            if (html_st) {
                if (key == ">")
                    html_st = false;
                add_dev(key)
                continue;
            }
            if (key == "#" && code[k + 1] == "^" && mode == 0 && !ignore_st) {
                ignore_st = true;
                this.clear_all_val(true);
                k++;
                continue;
            }
            if (ignore_st) {
                if (key == "^" && code[k + 1] == "#") {
                    ignore_st = false;
                    k++;
                    continue;
                }
                add_dev(key)
                continue;
            }
            if (this.next_chars == "" && key in this.akSharANi) {
                this.varna[2] = "";
                this.vitaraNa(key, mode, sa, elm, lang);
            } else if (this.next_chars == "" && l.is_upper(key) && l.to_lower(key) in this.akSharANi) {
                this.varna[2] = "";
                this.vitaraNa(l.to_lower(key), mode, sa, elm, lang);
            } else if (this.next_chars != "") {
                if (l.in(this.next_chars, key)) {
                    if (this.d) {
                        this.halant_add_status = true;
                        this.d = false;
                    }
                    this.varna[2] = this.varna[1];
                    key = this.varna[0] + key;
                    this.vitaraNa(key, mode, sa, elm, lang);
                } else if (key == ";" || key == "q") {
                    this.clear_all_val(true);
                    if (mode == 1)
                        this.back_space++;
                    else if (mode == 0 && lang == "Romanized")
                        this.dev_text.push(";");
                } else if (key in this.akSharANi) {
                    this.clear_all_val();
                    this.varna[2] = "";
                    if (this.store_last_of_3 != "" && this.pUrva_lekhit[4][1] != 0 && lang == "Tamil-Extended" && key == "#")
                        this.clear_all_val(true)
                    this.vitaraNa(key, mode, sa, elm, lang);
                } else if (l.is_upper(key) && l.to_lower(key) in this.akSharANi) {
                    this.clear_all_val();
                    this.vitaraNa(l.to_lower(key), mode, sa, elm, lang);
                } else {
                    add_dev(key)
                    this.clear_all_val(true);
                }
            } else {
                add_dev(key)
                this.clear_all_val(true);
            }
        }
        if (mode == 0) {
            let vl = this.dev_text.join("");
            this.dev_text = [];
            this.clear_all_val(true);
            return vl;
        }
    };
    vitaraNa(key, mode, sa, elm, lang) {
        let l = this.k;
        if (lang == "Urdu" && l.in(["a", "i", "u"], key) && this.pUrva_lekhit[4][1] == -1)
            key += "1";
        let cap_0_from_1 = [false, ["", -1]];
        let data = this.akSharANi[key[0]];
        let current = data[key];
        let prev_temp = this.pUrva_lekhit[3][1];
        let temp = this.pUrva_lekhit[4][1];
        let varna_sthiti = l.last(current);
        if (this.capital[0] == 2 && mode == 1) {
            if (key == this.capital[1]) {
                if (l.time() - this.capital[4] <= 4.0) {
                    key = l.to_upper(key);
                    data = this.akSharANi[key];
                    current = data[key];
                    temp = this.capital[3];
                    varna_sthiti = l.last(current);
                    this.back_space += 2 * this.capital[5];
                    if (varna_sthiti == 0 && l.in([1, 3], this.pUrva_lekhit[2][1]))
                        cap_0_from_1 = [true, this.pUrva_lekhit[2]];
                    if (l.in(["Brahmi", "Modi", "Sharada", "Siddham", "Granth"], lang)) {
                        this.back_space++;
                        if (temp == 1) {
                            this.back_space++;
                        }
                        if (sa == 1) {
                            this.back_space -= 2;
                            if (temp != 1)
                                this.back_space++;
                        }
                    }
                    if (this.capital[6]) {
                        this.back_space--;
                        if (sa == 1) {
                            if (this.capital[3] == 1)
                                this.back_space--;
                            if (this.capital[2] == 1)
                                this.back_space += 2;
                        }
                        if (this.capital[3] != 1 && this.capital[2] == 1)
                            this.back_space--;
                    }
                    if (sa == 0)
                        if (this.capital[2] == 1) {
                            this.back_space++;
                            if (this.capital[3] == 1 && !this.capital[6])
                                this.back_space++;
                        }
                    if (sa == 1 && this.capital[3] == 3)
                        this.back_space--;
                    this.capital = [3, "", -1, -1, 0, 0, false];
                } else
                    this.capital = [
                        2,
                        key,
                        varna_sthiti,
                        this.pUrva_lekhit[3][1],
                        this.second_cap_time,
                        this.capital[5],
                        false,
                    ];
            } else
                this.capital = [0, "", -1, -1, 0, 0, false];
        }
        if (this.mAtrA_sthiti && l.in([1, 2], varna_sthiti)) {
            this.clear_all_val(true);
            this.vitaraNa(l.last(key), mode, sa, elm, lang);
            return;
        }
        this.varna[0] = key;
        this.varna[1] = current[0];
        if (temp == 1 || temp == 3) {
            if (varna_sthiti == 1 && !l.in(this.next_chars, l.last(key)) && sa == 0) {
                this.halant_add_status = true;
                if (temp == 3) {
                    this.back_space++;
                    this.varna[1] = this.store_last_of_3 + this.varna[1];
                }
            } else if (varna_sthiti == 0)
                this.mAtrA_sthiti = true;
        }
        if (this.capital[0] == 1 && mode == 1) {
            if (key == this.capital[1]) {
                this.capital[0] = 2;
                this.second_cap_time = l.time();
            } else if (l.last(key) == this.capital[1] && this.akSharANi[l.to_upper(this.capital[1])][l.to_upper(this.capital[1])][0] != this.varna[1]) {
                this.capital[6] = true;
                this.capital[0] = 2;
                this.capital[2] = varna_sthiti;
                this.capital[5] = this.varna[1].length;
                this.second_cap_time = l.time();
            } else
                this.capital = [0, "", -1, -1, 0, 0];
        }
        if ((key == "LR" || key == "r3") && varna_sthiti == 0) {
            if (prev_temp != 1)
                this.mAtrA_sthiti = false;
            else if (sa == 0)
                this.back_space++;
            if (l.in(["Modi", "Sharada"], lang)) {
                this.back_space++;
            }
        }
        if (this.mAtrA_sthiti) {
            this.varna[1] = current[1];
            if (temp == 1 && sa == 1)
                this.back_space += this.halant.length;
            if (temp == 3) {
                this.back_space++;
                if (sa == 1)
                    this.back_space++;
                this.varna[1] += this.store_last_of_3;
                this.last_of_3_status_for_mAtrA = true;
            } else if (temp == 0 && this.last_of_3_status_for_mAtrA) {
                this.varna[1] += this.store_last_of_3;
                this.last_of_3_status_for_mAtrA = true;
            }
        }
        if (lang == "Tamil-Extended" && key == "M" && (
                (
                    (
                        prev_temp == 3 ||
                        (prev_temp == 0 && this.pUrva_lekhit[2][1] == 3)
                    ) &&
                    temp == 0
                ) ||
                (
                    this.capital[0] == 3 &&
                    (
                        (
                            this.pUrva_lekhit[1][1] == 3 ||
                            (
                                this.pUrva_lekhit[1][1] == 0 &&
                                this.pUrva_lekhit[0][1] == 3
                            )
                        ) &&
                        this.pUrva_lekhit[2][1] == 0
                    )
                )
            )) {
            this.varna[1] += this.store_last_of_3;
            this.back_space++;
        }
        if (lang == "Tamil-Extended" && l.in(["#an", "#s"], key)) {
            if (key == "#an" && (
                    (
                        this.pUrva_lekhit[1][1] == 3 ||
                        (this.pUrva_lekhit[1][1] == 0 && this.pUrva_lekhit[0][1] == 3)
                    ) &&
                    this.pUrva_lekhit[2][1] == 0
                )) {
                this.varna[1] += this.store_last_of_3;
                this.back_space++;
            } else if (key == "#s" &&
                (
                    (
                        this.pUrva_lekhit[2][1] == 3 || (this.pUrva_lekhit[2][1] == 0 || this.pUrva_lekhit[1][1] == 3)
                    ) && this.pUrva_lekhit[3][1] == 0
                )) {
                this.varna[1] += this.store_last_of_3;
                this.back_space++;
                this.special_ved_s = true;
            }
        }
        if (lang == "Tamil" && key == "R" && temp == 1 && varna_sthiti == 2) this.back_space++;
        if (lang == "Tamil-Extended" && l.in(["#ss", "#sss"], key) && this.special_ved_s)
            this.varna[1] += this.store_last_of_3;
        if (temp == 1 && varna_sthiti == 2 && key.length == 1 && Object.keys(data).length > 1 && sa == 0) {
            for (let v of l.last(current, -2)) {
                if (key + v in data) {
                    if (l.last(data[key + v]) == 1)
                        this.d = true;
                    break;
                }
            }
        }
        if (
            (l.in(lang, "Tamil") || lang == "Punjabi") &&
            l.in(["R", "LR", "LRR", "RR"], key) &&
            varna_sthiti == 1
        )
            varna_sthiti = 2;
        if (sa == 1) {
            if (varna_sthiti == 1)
                this.varna[1] += this.halant;
            else if (varna_sthiti == 3)
                this.varna[1] = l.substring(this.varna[1], 0, -1) + this.halant + l.last(this.varna[1]);
        }
        let val = this.likha(this.varna[1], this.varna[2], this.back_space, this.halant_add_status);
        if (mode == 0) {
            for (let p = 0; p < val[1]; p++)
                this.dev_text.pop();
            for (let x of val[0])
                this.dev_text.push(x);
        }
        else if (mode == 1) {
            let is_input = false;
            if (l.in(["input", "textarea"], elm[0].tagName.toLowerCase()))
                is_input = true;
            if (is_input) {
                let dyn = elm.val();
                let current_cursor_pos = elm[0].selectionStart + 1;
                let ex = 0;
                if (this.from_click) {
                    current_cursor_pos++;
                    ex = 1;
                };
                let pre_part = dyn.substring(0, current_cursor_pos - val[1] - 2);
                let changing_part = val[0];
                let post_part = "";
                if (dyn.length + 1 + (this.from_click ? 1 : 0) == current_cursor_pos)
                    post_part = dyn.substring(current_cursor_pos + 1);
                else if (dyn.length + 1 != current_cursor_pos)
                    post_part = dyn.substring(current_cursor_pos - 1 - ex);
                let length = pre_part.length + changing_part.length;
                elm.val(pre_part + changing_part + post_part)
                elm.focus();
                elm[0].selectionStart = length;
                elm[0].selectionEnd = length;
                if (this.from_click)
                    this.from_click = false;
            } else {
                let dyn = elm.html();
                let caret = new VanillaCaret(elm[0]);
                let current_cursor_pos = caret.getPos() + 1;
                if (this.from_click)
                    current_cursor_pos = this.sahayika.abhisthAnam;
                let st = false;
                let rs = [],
                    x1 = 0;
                dyn = l.replace_all(dyn, "&nbsp;", "<费费费费>");
                dyn = l.replace_all(dyn, "&amp;", "<费费费>");
                let record = true,
                    recorder = 0,
                    t_rec = 0,
                    prv = "";
                for (let x = 0; x < dyn.length; x++) {
                    let v = dyn[x];
                    if (v == "<")
                        st = true;
                    else if (st && v == ">") {
                        if (prv == "费") {
                            x1++;
                            if (record) recorder++;
                            t_rec++;
                        }
                        st = false;
                        rs.push(v);
                        continue;
                    }
                    if (x1 >= current_cursor_pos - 2 - val[1] && x1 < current_cursor_pos - 2 && !st) {
                        x1++;
                        if (record) recorder++;
                        t_rec++;
                        continue;
                    }
                    if (x1 == current_cursor_pos - 2 && !st) {
                        rs.push("梵");
                        if (this.from_click)
                            rs.push(v);
                        record = false;
                    } else
                        rs.push(v);
                    if (!st) {
                        x1++;
                        if (record) recorder++;
                        t_rec++;
                    }
                    prv = v;
                };
                // console.log(rs)
                rs = rs.join("");
                rs = l.replace_all(rs, "<费费费费>", "&nbsp;");
                rs = l.replace_all(rs, "<费费费>", "&amp;");
                rs = rs.split("梵");
                let pre_part = rs[0];
                let a = 0;
                let changing_part = val[0];
                let post_part = "";
                if (rs[1] == undefined || rs[1] == null)
                    rs[1] = "";
                post_part = rs[1];
                // console.log([pre_part, changing_part, post_part], val)
                let r = pre_part + changing_part + post_part;
                elm.html(r);
                if (this.from_click)
                    this.from_click = false;
                caret.setPos(recorder + changing_part.length - val[1] - a);
            }
        }
        if (this.capital[0] == 3)
            this.capital = [0, "", -1, -1, 0, 0, false];
        if (key.length == 1 && l.is_lower(key) && l.to_upper(key) in this.akSharANi && this.capital[0] == 0 && mode == 1) {
            let a = [0, "", -1, -1, 0, 0, false];
            let b = [1, key, varna_sthiti, temp, l.time(), this.varna[1].length, false];
            if ((key + key) in data) {
                if (this.akSharANi[l.to_upper(key)][l.to_upper(key)][0] != data[key + key][0])
                    this.capital = b;
                else
                    this.capital = a;
            } else
                this.capital = b;
        }
        this.next_chars = current[current.length - 2];
        if (this.sahayika_usage && mode == 1) {
            let a = {
                "key": [key, this.next_chars],
                "status": [temp, varna_sthiti],
                "elm": elm,
                "mAtrA": this.mAtrA_sthiti,
                "special_cap": cap_0_from_1,
                "lang": lang,
                "sa": sa
            };
            if (this.capital[0] == 1)
                a["cap"] = true;
            this.sahayika.show(a);
        }
        if (varna_sthiti == 3)
            this.store_last_of_3 = l.last(this.varna[1]);
        if (this.next_chars == "")
            this.clear_all_val();
        this.pUrva_lekhit[0] = this.pUrva_lekhit[1];
        this.pUrva_lekhit[1] = this.pUrva_lekhit[2];
        this.pUrva_lekhit[2] = this.pUrva_lekhit[3];
        this.pUrva_lekhit[3] = this.pUrva_lekhit[4];
        this.pUrva_lekhit[4] = [key, varna_sthiti];
    };
    likha(b, a, bk, hal) {
        // a = what is currently on screen
        // b = it is that to which a has to be replaced
        let back = 0;
        let lekha = "";
        if (a == "" || b == "") {
            lekha = b;
            back = a.length;
        } else if (b[0] != a[0]) {
            lekha = b;
            back = a.length;
        } else {
            let x = 0;
            for (let n in a) {
                let v = a[n];
                if (b.length == x)
                    break;
                if (b[x] != a[x])
                    break;
                x++;
            }
            lekha = b.substring(x);
            back = a.length - x;
        }
        back += bk;
        if (hal)
            lekha = this.halant + lekha;
        this.back_space = 0;
        this.halant_add_status = false;
        return [lekha, back];
    };
    clear_all_val(spl) {
        this.next_chars = "";
        this.varna = ["", "", ""];
        this.mAtrA_sthiti = false;
        this.last_of_3_status_for_mAtrA = false;
        this.special_ved_s = false;
        this.back_space = 0;
        if (spl) {
            this.pUrva_lekhit = [
                ["", -1],
                ["", -1],
                ["", -1],
                ["", -1],
                ["", -1]
            ];
            this.store_last_of_3 = "";
            this.capital = [0, "", -1, -1, 0, 0, false];
            this.sahayika.pUrvavarNa = [("", "", -1), ""]
            this.hide();
        }
    };
    parivartak(val, from, to, html = false) {
        if (from == "Devanagari")
            from = "Sanskrit";
        if (to == "Devanagari")
            to = "Sanskrit";
        if (from == to)
            return val;
        var l = लिपि;
        var convert = (ln, t) => this.prakriyA({
            lang: ln,
            text: t
        });
        if (from == "Normal")
            return convert(to, val);
        var get_antar_kram = (ln, type = 0) => {
            let or = ["antar", "kram"];
            if (!(or[type] in l.akSharAH[ln]))
                return [{},
                    []
                ][type];
            return l.akSharAH[ln][or[type]];
        }
        var pUrva = [
                ["", "", -1],
                ["", "", -1],
                ["", "", -1],
                ["", "", -1],
                ["", "", -1],
            ], //5 purva varna references
            db = get_antar_kram(from),
            db2 = get_antar_kram(to),
            ord1 = get_antar_kram(from, 1),
            ord2 = get_antar_kram(to, 1),
            res = "",
            next = "",
            chr = "";
        var get_hal = (d) => {
            if (!l.in(["Normal", "Romanized", "Urdu"], d))
                return l.akSharAH[d]["."][".x"][0];
            return "";
        };
        var get_nukta = (d) => {
            if ("." in l.akSharAH[d])
                if (".z" in l.akSharAH[d]["."])
                    return l.akSharAH[d]["."][".z"][0];
            return "";
        };
        var hal = {
                from: get_hal(from),
                to: get_hal(to)
            },
            nukta = {
                from: get_nukta(from),
                to: get_nukta(to)
            };
        var gt = (v) => { // get value for scannded text
            if (l.in(["Romanized", "Urdu"], from) || l.in(["Normal", "Romanized", "Urdu"], to)) {
                let vl = db[v][0],
                    rom = [
                        ["o", "e"],
                        ["O", "E"]
                    ];
                if (to != "Urdu" && l.in(rom[0], vl))
                    if (!l.in(["Tamil", "Telugu", "Kannada", "Malayalam", "Sinhala", "Purna-Devanagari"], from))
                        // ^ scripts in which there is differnce of dirgha and hrasva 'e' and 'o'
                        vl = rom[1][rom[0].indexOf(vl)]
                if (v == hal.from)
                    vl = "";
                return vl
            }
            if (l.in(ord1, v)) {
                let vl = ord2[ord1.indexOf(v)];
                return vl == 1 ? "" : vl;
            } else if (db[v].length == 4) {
                let vl = ord2[db[v][3]];
                return vl == 1 ? "" : vl;
            }
            if (l.in([0.1, 2.1, 1.1], db[v][1])) {
                let r = "";
                for (let x of v) {
                    let vl = ord2[ord1.indexOf(x)]
                    r += vl == 1 ? "" : vl;
                }
                return r;
            }
            if (pUrva[0][0].length == 1 && l.in([1, 3], pUrva[1][2]) && pUrva[0][2] == 0)
                this.pUrva_lekhit[4] = [pUrva[1][1], pUrva[1][2]];
            let vl = convert(to, db[v][0]);
            if (l.in([1, 3], pUrva[0][2]))
                if (vl[0] in db2)
                    if (l.in([1, 3], Math.floor(db2[v][1])))
                        vl = hal.to + vl;
            return vl == 1 ? "" : vl;
        };
        var loop = (x, i, last = false, no_more = false) => {
            if (!no_more && l.in(["\ud805", "\ud804"], x) &&
                l.in(["Modi", "Sharada", "Brahmi", "Siddham", "Granth"], from))
                // ^ also adding support for the above languages through a simple fix
                return 1;
            let done = false,
                sthiti = -1,
                continued = false;
            if (next != "") {
                if (!last && l.in(next, x)) {
                    chr += x;
                    let dt = db[chr];
                    next = dt.length == 2 ? "" : dt[2];
                    sthiti = Math.floor(dt[1]);
                    done = true;
                    continued = true;
                } else {
                    let vl = gt(chr);
                    pUrva[0][1] = vl;
                    res += vl;
                }
            }
            if (!last && !done && x in db) {
                let dt = db[x];
                next = dt.length == 2 ? "" : dt[2]
                sthiti = Math.floor(dt[1]);
                chr = x;
                done = true;
            }
            if (!continued && l.in(["Normal", "Romanized", "Urdu"], to) &&
                (l.in([1, 3], pUrva[0][2]) && sthiti != 0 && !l.in([hal.from, nukta.from], x))) // condition if vyanjana is not follwed by svar matra
                res += "a";
            if (!last && !done) {
                res += x;
                chr = "";
                next = "";
                sthiti = -1
            }
            if (!last) {
                if (!continued)
                    for (let j = 4; j >= 1; j--)
                        pUrva[j] = pUrva[j - 1];
                pUrva[0] = ["", "", -1];
                pUrva[0][0] = chr;
                pUrva[0][2] = sthiti;
            }
            if (done && next == "") {
                let vl = gt(chr);
                pUrva[0][1] = vl;
                res += vl;
            }
        };
        let tamil_ex = (v1, type) => { // Preparing text for conversions in Tamil Extended
            let mtr = "ாிீுூெேைொோௌ்", // all matras and halant
                num = ["²³⁴", "₂₃₄"],
                sva_anu = "॒॑᳚᳛", // anudAttA followed by three svarits
                tml = "கசஜடதப",
                reg = type == "to" ? `[${tml}][${num[0]}][${mtr}]` : `[${tml}][${mtr}][${num[0]+num[1]}]`,
                x2 = type == "to" ? 1 : 2,
                d1 = type == "to" ? db2 : db;
            let r1 = v1.split("");
            for (let x1 of l.reg_index(v1, new RegExp(reg, "gm"))) {
                let x = x1[0],
                    k = d1[r1[x]];
                if (k.length > 2) {
                    let k1 = r1[x + x2];
                    if (l.in(num[1], k1)) // if subscript nums then make it superscript
                        k1 = (r1[x + x2] = num[0][num[1].indexOf(k1)]);
                    if (l.in(k[2], k1)) {
                        let tmp = r1[x + 1];
                        r1[x + 1] = r1[x + 2];
                        r1[x + 2] = tmp;
                    }
                }
            }
            return r1.join("");
        }
        if (from == "Tamil-Extended")
            val = tamil_ex(val, "from");
        for (let i = 0; i < val.length; i++) {
            if (1 == loop(val[i], i))
                loop(val[i] + val[i + 1], ++i);
        }
        loop(" ", val.length, true);
        if (to == "Tamil-Extended")
            return tamil_ex(res, "to");
        else if (l.in([from, to], "Urdu") || l.in([from, to], "Romanized"))
            return convert(to, res);
        return res;
    };
    add_font(lang) {
        let script = this.font_scripts;
        if (!लिपि.in(script, lang) || लिपि.in(this.added_fonts, lang))
            return;
        let name = `LipiFont${lang}`;
        var font = new FontFace(name, `url(${लिपि.font_loca}/${lang}.woff2)`);
        let fnt = this.sahayika.elm.css("font-family");
        this.sahayika.elm.css("font-family", `${fnt},"${name}"`);
        font.load().then(function (loaded_face) {
            document.fonts.add(loaded_face);
        }).catch(function (error) {
            // error occurred
        });
        this.added_fonts.push(lang);
    };
};
jQuery.fn.lipi_lekhika_add = (attri = false) => {
    let k = LipiLekhikA;
    let m = k.k;
    if (m.elms.indexOf(this) != -1)
        return;
    else
        m.elms.push(this);
    if (!attri) {
        this.on("input", function () {
            k.mukhya($(this), event);
        });
        this.on("keydown", function () {
            m.clear(event);
        });
    } else {
        this.attr("oninput", "LipiLekhikA.mukhya($(this), event);");
        this.attr("onkeydown", "लिपि.clear(event);");
    }
};
jQuery.lipi_lekhika = (time = 60) => {
    let k = LipiLekhikA;
    let m = k.k;
    if (k.init)
        return;

    function mn() {
        let elm = $(".Lipi-LekhikA");
        let lek = ["lipi-lekhika", "lekhan-sahayika"];
        for (let x of elm) {
            let e = $(x);
            if (m.elms.indexOf(x) != -1)
                continue;
            else
                m.elms.push(x);
            if (!m.in(["span", "div", "textarea", "input"], x.tagName.toLowerCase()))
                continue;
            for (let v of lek) {
                if (e.attr(v) == undefined)
                    e.attr(v, "on");
            }
            elm.attr({
                autocapitalize: "none",
                autocomplete: "off",
                autocorrect: "off"
            });
            x.oninput = function () {
                k.mukhya($(x), event);
            };
            x.onkeydown = function () {
                m.clear(event);
            };
            if (e.attr("lipi-lang") != undefined)
                m.load_lang(e.attr("lipi-lang"))
        };
    }
    mn();
    setInterval(() => mn(), time * 1000);
    if (!k.init)
        k.init = true;
    return k;
};
jQuery.load_lekhika_lang = (lang, call = null) => {
    LipiLekhikA.k.load_lang(lang, call);
};
jQuery.lekhika_convert = (text, from, to) => {
    return LipiLekhikA.parivartak(text, from, to);
};
class लिपिलेखिकालेखनसहायिका {
    constructor() {
        this.c = 0;
        this.d = 0;
        this.k = लिपि;
        this.idAnIma = 0;
        this.reset_capital_status = false;
        this.pUrvavarNa = [
            ["", "", -1], ""
        ];
        this.ins_msg = "";
        this.display = {};
        this.set_lang("English");
        this.abhisthAnam = 0;
        let id = "లిಪಿலேഖിକା";
        this.elm = jQuery(`<div id="${id}"></div>`).appendTo("body");
        if (true) { // making and adding html
            let row1 = "",
                row2 = "",
                r = [`<svg style="enable-background:new 0 0 26 26;" height="18px" width="18px" viewBox="96 160 320 192"><polygon points="396.6,`,
                    `160 416,180.7 256,352 96,180.7 115.3,160 256,310.5`, `352 416,331.3 256,160 96,331.3 115.3,352 256,201.5`, `"/></svg>`
                ],
                img = ["", ""];
            img[0] = `${r[0] + r[1] + r[3]}`;
            img[1] = `${r[0] + r[2] + r[3]}`;
            row1 += `<td><span>${img[0]}</span><span>${img[1]}</span></td>`;
            row2 += `<td><a rel="noopener" href="https://rebrand.ly/lekhika" target="_blank"></a></td>`;
            row1 += `<td></td>`;
            row2 += `<td></td>`;
            for (let x = 0; x <= 60; x++) {
                row1 += `<td></td>`;
                row2 += `<td></td>`;
            };
            let table = `<table><tbody><tr>${row2}</tr><tr>${row1}</tr></tbody></table><div></div>`;
            this.elm.append(table);
        }
        setTimeout(() => {
            if (true) { // adding css
                let css = [];

                function add_css(pre, dct) {
                    let v = pre + " {\n";
                    for (let x in dct)
                        v += `${x}:${dct[x]};\n`
                    css.push(v + "}");
                    return pre;
                }
                add_css(`#${id}`, {
                    "position": "absolute",
                    "background-color": "white",
                    "padding": "2.5px",
                    "border": "2px solid black",
                    "border-radius": "4.5px",
                    "font-weight": "bold",
                    "display": "none",
                    "z-index": "1000000",
                    "user-select": "none",
                    "cursor": "default",
                    "background-color": "white",
                    "min-width": "58px",
                    "max-width": "fit-content",
                    "box-shadow": "0 4px 8.25px 0 #00000033, 0 6px 20px 0 #00000030",
                    "font-family": `"Nirmala UI","Calibri"`,
                    "transition-duration": "500ms"
                });
                add_css(`#${id} table`, {
                    "display": "block",
                    "max-width": "210px",
                    "overflow-x": "scroll"
                });
                if (!this.k.is_mobile) {
                    add_css(`#${id} table::-webkit-scrollbar`, {
                        height: "4.5px"
                    })
                    add_css(`#${id} table::-webkit-scrollbar-track`, {
                        "background-color": "#e9e9e9",
                        "border-radius": "10px"
                    })
                    add_css(`#${id} table::-webkit-scrollbar-thumb`, {
                        "background-color": "#5353ff",
                        "border-radius": "10px"
                    })
                    add_css(`#${id} table::-webkit-scrollbar-thumb:hover`, {
                        "background-color": "blue"
                    })
                }
                let e = `#${id} table tbody tr`; // defined for reusing
                add_css(`${e}:nth-child(2) td:nth-child(1) span`, {
                    cursor: "pointer",
                    display: "none",
                    position: "absolute",
                    top: "37px",
                    left: "5px"
                }); // adding css for up down pointers
                add_css(`${e} td`, {
                    "font-size": "18px",
                    "text-align": "center",
                    cursor: "grab"
                });
                add_css(`${e}:nth-child(1) td`, {
                    color: "black"
                });
                add_css(`${e}:nth-child(2) td`, {
                    color: "green"
                });
                let t = add_css(`${e} td:not(:nth-child(1)):not(:nth-child(2))`, {
                    display: "none"
                });
                add_css(`${t}:hover`, {
                    color: "blue"
                }); // adding hover effect
                add_css(`${e} td:nth-child(2)`, {
                    "text-align": "center",
                    "padding-left": "22.5px",
                    "padding-right": "5.6px",
                    cursor: "default"
                });
                add_css(`${e}:nth-child(1) td:nth-child(2)`, {
                    color: "brown",
                    "font-size": "19.5px"
                });
                add_css(`${e}:nth-child(2) td:nth-child(2)`, {
                    color: "red",
                    "font-size": "15px"
                });
                add_css(`${e}:nth-child(1) td:nth-child(1) a`, {
                    display: "inline-block",
                    height: "20px",
                    width: "20px",
                    position: "absolute",
                    left: "4px",
                    top: "10px",
                    "background-image": `url(${this.k.sanchit}/icon.png)`,
                    "background-size": "20px 20px"
                })
                add_css(`#${id} table+div`, {
                    "font-size": "10.5px",
                    color: "purple",
                    "max-width": "fit-content",
                    "min-width": "200px",
                    display: "none"
                })
                this.elm.append(`<style>${css.join("\n")}</style>`);
            }
            if (true) { // storing elements and adding handlers
                this.bhaNDAra_index = ["sahayika", "pashchAta", "akShara", "key1", "key2"];
                let e = `#${id} table tbody tr`; // defined for reusing
                this.bhaNDAra = {
                    "sahayika": $(`#${id} table+div`)[0],
                    "key1": $(`${e}:nth-child(1) td:nth-child(2)`)[0],
                    "key2": $(`${e}:nth-child(2) td:nth-child(2)`)[0],
                    "pashchAta": $(`${e}:nth-child(1) td`),
                    "akShara": $(`${e}:nth-child(2) td`),
                    "table": $(`#${id} table`),
                    "tbody": [$(`${e}:nth-child(1)`)[0], $(`${e}:nth-child(2)`)[0]]
                };
                this.adhar = 0;
                let img = $(`${e}:nth-child(2) td:nth-child(1)`).children()
                this.ins_button = [$(img[1]), $(img[0])];
                this.ins_sthiti = 1;
                this.ins_button[this.ins_sthiti].show();
                this.ins_button[0].on("click", () => this.change_ins(0));
                this.ins_button[1].on("click", () => this.change_ins(1));
                if (this.ins_sthiti == 1)
                    this.bhaNDAra.sahayika.style.display = "none";
                this.objs = {
                    "down": $(img[0]),
                    "up": $(img[1]),
                    "icon": $(`${e}:nth-child(1) td:nth-child(1) a`)
                };
            }
            $("body").on("click", (event) => {
                let obj = LipiLekhikA;
                let o = obj.sahayika;
                let bh = o.bhaNDAra;
                if (o.elm.css("display") == "none")
                    return;
                let trgt = event.target;
                let p = $(trgt).parents();
                let sah = p.index(o.elm[0]) != -1; // seeing if the click is inside lekhan sahayika
                p = $(trgt).parent()[0];
                if (this.k.in(bh.tbody, p) && !this.k.in([bh.key1, bh.key2], trgt)) {
                    // above -> checking if a varna has been clicked
                    sah = true;
                    let el = o.adhar;
                    for (let x of trgt.value) {
                        if (this.k.in(["input", "textarea"], el[0].tagName.toLowerCase())) {
                            obj.from_click = true;
                            let lng = el.attr("lipi-lang") == undefined ? this.k.k.script : el.attr("lipi-lang");
                            obj.prakriyA({
                                text: x,
                                typing: 1,
                                lang: lng,
                                mode: el.attr("lipi-mode") == undefined ? this.k.akSharAH[lng].sa : el.attr("lipi-mode"),
                                element: el
                            })
                        }
                    };
                }
                if (!sah)
                    obj.clear_all_val(true);
            });
        }, 1);
    };
    hide_other() {
        let elm = LipiLekhikA.sahayika;
        if (elm.c == 1)
            elm.elm.hide();
        elm.c--;
    };
    change_ins(i) {
        let elm = LipiLekhikA.sahayika;
        elm.ins_button[i].hide();
        let t = Math.abs(i - 1);
        elm.ins_sthiti = t;
        elm.ins_button[Math.abs(i - 1)].show();
        let el = elm.bhaNDAra.sahayika;
        elm.set_labels(1, t == 0 ? elm.ins_msg : "");
        el.style.display = t == 1 ? "" : "block";
    };
    show(v) {
        if (v["elm"].attr("lekhan-sahayika") != "on")
            return;
        this.reset_capital_status = false;
        let l = this.k;

        function reset_capital(k) {
            let elm = LipiLekhikA.sahayika;
            elm.d--;
            if (!elm.reset_capital_status)
                return;
            if (elm.d == 0) {
                for (let x = k[0]; x < k[1]; x++) {
                    elm.set_labels(2, "", x);
                    elm.set_labels(3, "", x);
                    elm.hide_elm(1, x);
                    elm.hide_elm(2, x);
                    elm.idAnIma--;
                };
            }
            LipiLekhikA.capital = [0, "", -1, -1, 0, 0, false];
        };
        let next = v["key"][1],
            key = v["key"][0];
        let matra = v["mAtrA"],
            extra_cap = v["special_cap"],
            lang = v["lang"],
            sa = v["sa"];
        if (extra_cap[0])
            this.pUrvavarNa = [
                [
                    l.akSharAH[lang][extra_cap[1][0]][extra_cap[1][0]][0],
                    "",
                    extra_cap[1][1],
                ],
                extra_cap[1][0]
            ];
        this.adhar = v.elm;
        let cordinate = v.elm.caret("offset");
        let top = cordinate.top,
            hieght = cordinate.height,
            left = cordinate.left;
        if (l.in(["input", "textarea"], v.elm[0].tagName.toLowerCase())) {
            this.abhisthAnam = v.elm.selectionStart + 1;
        } else {
            let caret = new VanillaCaret(v.elm[0]);
            this.abhisthAnam = caret.getPos() + 2;
        }
        this.elm[0].style.top = `${top + hieght}px`;
        this.elm[0].style.left = `${left + 8}px`;
        let halant = ["", false];
        if (!l.in(["Urdu", "Romanized", "Normal"], lang))
            halant = [l.akSharAH[lang]["."][".x"][0], sa == 1];
        let a = new Map(),
            b = l.akSharAH[lang][key[0]],
            count = 0;
        for (let x of next) {
            if ((key + x) in b) {
                a.set(x, b[key + x]);
                for (let y of l.last(b[key + x], -2))
                    if ((key + x + y) in b) {
                        a.set(x + y, b[key + x + y]);
                        count++;
                    }
                count++;
            }
        }
        let c = 0,
            cap_count = [0, 0];
        if ("cap" in v) {
            cap_count[0] = count;
            let tmp = l.to_upper(key);
            let b1 = l.akSharAH[lang][tmp];
            a.set(key + key, b1[tmp]);
            let next = l.last(a.get(key + key), -2);
            for (let x of next)
                if ((tmp + x) in b1) {
                    a.set(key + key + x, b1[tmp + x]);
                    for (let y of l.last(b1[tmp + x], -2))
                        if ((tmp + x + y) in b1) {
                            a.set(key + key + x + y, b1[tmp + x + y]);
                            count++;
                        }
                    count++;
                }
            cap_count[1] = count + 1;
        }
        if ((l.in([1, 3], l.last(this.pUrvavarNa[0])) || matra) && l.last(b[key]) == 0) {
            let k12 = this.pUrvavarNa[0][0] + b[key][1];
            if (l.last(this.pUrvavarNa[0]) == 3 && key != "a")
                k12 = l.substring(k12, 0, -2) + l.last(k12) + l.last(k12, -2);
            else if (l.last(this.pUrvavarNa[0]) == 3 && key == "a")
                k12 = l.last(k12, 0, -1) + l.last(k12);
            this.set_labels(4, this.pUrvavarNa[1] + key);
            this.set_labels(5, k12);
        } else {
            this.set_labels(4, key);
            let l12 = b[key][0] + (l.in([1, 3], l.last(b[key])) ? halant[0] : "");
            if (l.last(b[key]) == 3)
                l12 = l.substring(l12, 0, -2) + l.last(l12) + l.last(l12, -2);
            this.set_labels(5, l12);
        }
        let extra = 0;
        for (let x of a.keys()) {
            if (matra && l.in([1, 2], l.last(a.get(x)))) {
                extra++;
                continue;
            }
            this.set_labels(2, x, c);
            let k = a.get(x)[0];
            if (l.last(a.get(x)) == 0 && l.in([1, 3], l.last(this.pUrvavarNa[0])))
                k = a.get(x)[1];
            if (l.in([1, 3], l.last(a.get(x))) && halant[1]) {
                k += halant[0];
                if (l.last(a.get(x)) == 3)
                    k = l.substring(k, 0, -2) + l.last(k) + l.last(k, -2);
            }
            if ((l.in([1, 3], l.last(this.pUrvavarNa[0])) || matra) && l.last(a.get(x)) == 0) {
                k = this.pUrvavarNa[0][0] + k;
                if (l.last(this.pUrvavarNa[0]) == 3)
                    k = l.substring(k, 0, -2) + l.last(k) + l.last(k, -2);
            }
            this.set_labels(3, k, c);
            c++;
        }
        let len = 0;
        for (let x of a.keys())
            len++;
        len -= extra;
        if (len >= this.idAnIma) {
            for (let x = this.idAnIma; x < len; x++) {
                this.show_elm(1, x);
                this.show_elm(2, x);
            };
        } else {
            for (let x = len; x < this.idAnIma; x++) {
                this.hide_elm(1, x);
                this.hide_elm(2, x);
            };
        }
        this.idAnIma = len;
        this.c++;
        if (!matra)
            this.pUrvavarNa = [b[key], key];
        this.elm.show();
        if ("cap" in v) {
            this.d++;
            this.reset_capital_status = true;
            setTimeout(function () {
                reset_capital(cap_count);
            }, 4000);
        }
        let klj = this.hide_other;
        setTimeout(function () {
            klj();
        }, 15000);
    };
    hide_elm(type, x) {
        this.bhaNDAra[["pashchAta", "akShara"][type - 1]][x + 2].style.removeProperty("display");
    };
    show_elm(type, x) {
        this.bhaNDAra[["pashchAta", "akShara"][type - 1]][x + 2].style.display = "table-cell";
    };
    set_labels(type, txt, index = -1) {
        if (index != -1 && (type == 3 || type == 2)) {
            index += 2;
            type--;
            this.bhaNDAra[this.bhaNDAra_index[type]][index].innerHTML = txt;
            if (type == 2)
                this.bhaNDAra.pashchAta[index].title = txt;
            else if (type == 1) {
                this.bhaNDAra.akShara[index].title = txt;
                this.bhaNDAra.akShara[index].value = txt;
                this.bhaNDAra.pashchAta[index].value = txt;
            }
        } else
            this.bhaNDAra[this.bhaNDAra_index[type - 1]].innerHTML = txt;
    };
    set_lang(l) {
        let gh = () => {
            let data = this.display[l];
            this.ins_msg = this.k.text_to_html(data["ins"], "li");
            this.elm.attr("title", data["title"]);
            for (let x in this.objs)
                this.objs[x].attr("title", data[x]);
            if (this.ins_sthiti == 0)
                this.set_labels(1, this.ins_msg);
        };
        if (!(l in this.display)) {
            $.get({
                url: `${this.k.sanchit}/sahayika/${l}.json`,
                dataType: "json",
                success: (result) => {
                    this.display[l] = result;
                    gh();
                }
            });
        } else
            gh();
    };
};
let LipiLekhikA = new लिपिलेखिकापरिवर्तक();
लिपि.k = LipiLekhikA;
!function(t,e){if("function"==typeof define&&define.amd)define("VanillaCaret",["module"],e);else if("undefined"!=typeof exports)e(module);else{var n={exports:{}};e(n),t.VanillaCaret=n.exports}}(this,function(t){"use strict";var e=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),n=function(){function t(e){(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")})(this,t),this.target=e,this.isContentEditable=e&&e.contentEditable}return e(t,[{key:"getPos",value:function(){if(document.activeElement!==this.target)return-1;if(this.isContentEditable){this.target.focus();var t=document.getSelection().getRangeAt(0),e=t.cloneRange();return e.selectNodeContents(this.target),e.setEnd(t.endContainer,t.endOffset),e.toString().length}return this.target.selectionStart}},{key:"setPos",value:function(t){if(this.isContentEditable){if(t>=0){var e=window.getSelection(),n=this.createRange(this.target,{count:t});n&&(n.collapse(!1),e.removeAllRanges(),e.addRange(n))}}else this.target.setSelectionRange(t,t)}},{key:"createRange",value:function(t,e,n){if(n||((n=document.createRange()).selectNode(t),n.setStart(t,0)),0===e.count)n.setEnd(t,e.count);else if(t&&e.count>0)if(t.nodeType===Node.TEXT_NODE)t.textContent.length<e.count?e.count-=t.textContent.length:(n.setEnd(t,e.count),e.count=0);else for(var o=0;o<t.childNodes.length&&(n=this.createRange(t.childNodes[o],e,n),0!==e.count);o++);return n}}]),t}();t.exports=n}),function(t,e){"function"==typeof define&&define.amd?define(["jquery"],function(n){return t.returnExportsGlobal=e(n)}):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(this,function(t){var e,n,o,r,i,s,a,l;e=function(){function e(t){this.$inputor=t,this.domInputor=this.$inputor[0]}return e.prototype.setPos=function(t){var e,n,o,r;return(r=a.getSelection())&&(o=0,n=!1,(e=function(t,i){var a,l,c,u,f,p;for(p=[],c=0,u=(f=i.childNodes).length;c<u&&(a=f[c],!n);c++)if(3===a.nodeType){if(o+a.length>=t){n=!0,(l=s.createRange()).setStart(a,t-o),r.removeAllRanges(),r.addRange(l);break}p.push(o+=a.length)}else p.push(e(t,a));return p})(t,this.domInputor)),this.domInputor},e.prototype.getIEPosition=function(){return this.getPosition()},e.prototype.getPosition=function(){var t,e;return e=this.getOffset(),t=this.$inputor.offset(),e.left-=t.left,e.top-=t.top,e},e.prototype.getOldIEPos=function(){var t,e;return e=s.selection.createRange(),(t=s.body.createTextRange()).moveToElementText(this.domInputor),t.setEndPoint("EndToEnd",e),t.text.length},e.prototype.getPos=function(){var t,e,n;return(n=this.range())?((t=n.cloneRange()).selectNodeContents(this.domInputor),t.setEnd(n.endContainer,n.endOffset),e=t.toString().length,t.detach(),e):s.selection?this.getOldIEPos():void 0},e.prototype.getOldIEOffset=function(){var t,e;return(t=s.selection.createRange().duplicate()).moveStart("character",-1),{height:(e=t.getBoundingClientRect()).bottom-e.top,left:e.left,top:e.top}},e.prototype.getOffset=function(e){var n,o,r,i,l;return a.getSelection&&(r=this.range())?(r.endOffset-1>0&&r.endContainer!==this.domInputor&&((n=r.cloneRange()).setStart(r.endContainer,r.endOffset-1),n.setEnd(r.endContainer,r.endOffset),o={height:(i=n.getBoundingClientRect()).height,left:i.left+i.width,top:i.top},n.detach()),o&&0!==(null!=o?o.height:void 0)||(n=r.cloneRange(),l=t(s.createTextNode("|")),n.insertNode(l[0]),n.selectNode(l[0]),o={height:(i=n.getBoundingClientRect()).height,left:i.left,top:i.top},l.remove(),n.detach())):s.selection&&(o=this.getOldIEOffset()),o&&(o.top+=t(a).scrollTop(),o.left+=t(a).scrollLeft()),o},e.prototype.range=function(){var t;if(a.getSelection)return(t=a.getSelection()).rangeCount>0?t.getRangeAt(0):null},e}(),n=function(){function e(t){this.$inputor=t,this.domInputor=this.$inputor[0]}return e.prototype.getIEPos=function(){var t,e,n,o,r,i;return e=this.domInputor,o=0,(r=s.selection.createRange())&&r.parentElement()===e&&(n=e.value.replace(/\r\n/g,"\n").length,(i=e.createTextRange()).moveToBookmark(r.getBookmark()),(t=e.createTextRange()).collapse(!1),o=i.compareEndPoints("StartToEnd",t)>-1?n:-i.moveStart("character",-n)),o},e.prototype.getPos=function(){return s.selection?this.getIEPos():this.domInputor.selectionStart},e.prototype.setPos=function(t){var e,n;return e=this.domInputor,s.selection?((n=e.createTextRange()).move("character",t),n.select()):e.setSelectionRange&&e.setSelectionRange(t,t),e},e.prototype.getIEOffset=function(t){var e;return e=this.domInputor.createTextRange(),t||(t=this.getPos()),e.move("character",t),{left:e.boundingLeft,top:e.boundingTop,height:e.boundingHeight}},e.prototype.getOffset=function(e){var n,o,r;return n=this.$inputor,s.selection?((o=this.getIEOffset(e)).top+=t(a).scrollTop()+n.scrollTop(),o.left+=t(a).scrollLeft()+n.scrollLeft(),o):(o=n.offset(),r=this.getPosition(e),{left:o.left+r.left-n.scrollLeft(),top:o.top+r.top-n.scrollTop(),height:r.height})},e.prototype.getPosition=function(t){var e,n,r,i,s;return e=this.$inputor,r=function(t){return t=t.replace(/<|>|`|"|&/g,"?").replace(/\r\n|\r|\n/g,"<br/>"),/firefox/i.test(navigator.userAgent)&&(t=t.replace(/\s/g,"&nbsp;")),t},void 0===t&&(t=this.getPos()),s=e.val().slice(0,t),n=e.val().slice(t),i="<span style='position: relative; display: inline;'>"+r(s)+"</span>",i+="<span id='caret' style='position: relative; display: inline;'>|</span>",i+="<span style='position: relative; display: inline;'>"+r(n)+"</span>",new o(e).create(i).rect()},e.prototype.getIEPosition=function(t){var e,n;return n=this.getIEOffset(t),e=this.$inputor.offset(),{left:n.left-e.left,top:n.top-e.top,height:n.height}},e}(),o=function(){function e(t){this.$inputor=t}return e.prototype.css_attr=["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopStyle","borderRightStyle","borderBottomStyle","borderLeftStyle","borderTopWidth","boxSizing","fontFamily","fontSize","fontWeight","height","letterSpacing","lineHeight","marginBottom","marginLeft","marginRight","marginTop","outlineWidth","overflow","overflowX","overflowY","paddingBottom","paddingLeft","paddingRight","paddingTop","textAlign","textOverflow","textTransform","whiteSpace","wordBreak","wordWrap"],e.prototype.mirrorCss=function(){var e,n=this;return e={position:"absolute",left:-9999,top:0,zIndex:-2e4},"TEXTAREA"===this.$inputor.prop("tagName")&&this.css_attr.push("width"),t.each(this.css_attr,function(t,o){return e[o]=n.$inputor.css(o)}),e},e.prototype.create=function(e){return this.$mirror=t("<div></div>"),this.$mirror.css(this.mirrorCss()),this.$mirror.html(e),this.$inputor.after(this.$mirror),this},e.prototype.rect=function(){var t,e,n;return n={left:(e=(t=this.$mirror.find("#caret")).position()).left,top:e.top,height:t.height()},this.$mirror.remove(),n},e}(),r={contentEditable:function(t){return!(!t[0].contentEditable||"true"!==t[0].contentEditable)}},i={pos:function(t){return t||0===t?this.setPos(t):this.getPos()},position:function(t){return s.selection?this.getIEPosition(t):this.getPosition(t)},offset:function(t){return this.getOffset(t)}},s=null,a=null,l=function(t){var e;return(e=null!=t?t.iframe:void 0)?(e,a=e.contentWindow,s=e.contentDocument||a.document):(void 0,a=window,s=document)},t.fn.caret=function(o,s,a){var c;return i[o]?(t.isPlainObject(s)?(l(s),s=void 0):l(a),c=r.contentEditable(this)?new e(this):new n(this),i[o].apply(c,[s])):t.error("Method "+o+" does not exist on jQuery.caret")},t.fn.caret.EditableCaret=e,t.fn.caret.InputCaret=n,t.fn.caret.Utils=r,t.fn.caret.apis=i});