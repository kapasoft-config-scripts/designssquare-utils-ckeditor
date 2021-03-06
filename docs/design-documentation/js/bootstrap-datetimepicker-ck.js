/* =========================================================
 * bootstrap-datetimepicker.js
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Improvements by Sébastien Malot
 * Improvements by Yun Lai
 * Project URL : http://www.malot.fr/bootstrap-datetimepicker
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */!function(e) {
    function t() {
        return new Date(Date.UTC.apply(Date, arguments));
    }
    function n() {
        var e = new Date;
        return t(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), 0);
    }
    var r = function(t, n) {
        var r = this;
        this.element = e(t);
        this.language = n.language || this.element.data("date-language") || "en";
        this.language = this.language in i ? this.language : "en";
        this.isRTL = i[this.language].rtl || !1;
        this.formatType = n.formatType || this.element.data("format-type") || "standard";
        this.format = s.parseFormat(n.format || this.element.data("date-format") || i[this.language].format || s.getDefaultFormat(this.formatType, "input"), this.formatType);
        this.isInline = !1;
        this.isVisible = !1;
        this.isInput = this.element.is("input");
        this.component = this.element.is(".date") ? this.element.find(".add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar").parent() : !1;
        this.componentReset = this.element.is(".date") ? this.element.find(".add-on .icon-remove").parent() : !1;
        this.hasInput = this.component && this.element.find("input").length;
        this.component && this.component.length === 0 && (this.component = !1);
        this.linkField = n.linkField || this.element.data("link-field") || !1;
        this.linkFormat = s.parseFormat(n.linkFormat || this.element.data("link-format") || s.getDefaultFormat(this.formatType, "link"), this.formatType);
        this.minuteStep = n.minuteStep || this.element.data("minute-step") || 5;
        this.pickerPosition = n.pickerPosition || this.element.data("picker-position") || "bottom-right";
        this.showMeridian = n.showMeridian || this.element.data("show-meridian") || !1;
        this.initialDate = n.initialDate || new Date;
        this._attachEvents();
        this.formatViewType = "datetime";
        "formatViewType" in n ? this.formatViewType = n.formatViewType : "formatViewType" in this.element.data() && (this.formatViewType = this.element.data("formatViewType"));
        this.minView = 0;
        "minView" in n ? this.minView = n.minView : "minView" in this.element.data() && (this.minView = this.element.data("min-view"));
        this.minView = s.convertViewMode(this.minView);
        this.maxView = s.modes.length - 1;
        "maxView" in n ? this.maxView = n.maxView : "maxView" in this.element.data() && (this.maxView = this.element.data("max-view"));
        this.maxView = s.convertViewMode(this.maxView);
        this.wheelViewModeNavigation = !1;
        "wheelViewModeNavigation" in n ? this.wheelViewModeNavigation = n.wheelViewModeNavigation : "wheelViewModeNavigation" in this.element.data() && (this.wheelViewModeNavigation = this.element.data("view-mode-wheel-navigation"));
        this.wheelViewModeNavigationInverseDirection = !1;
        "wheelViewModeNavigationInverseDirection" in n ? this.wheelViewModeNavigationInverseDirection = n.wheelViewModeNavigationInverseDirection : "wheelViewModeNavigationInverseDirection" in this.element.data() && (this.wheelViewModeNavigationInverseDirection = this.element.data("view-mode-wheel-navigation-inverse-dir"));
        this.wheelViewModeNavigationDelay = 100;
        "wheelViewModeNavigationDelay" in n ? this.wheelViewModeNavigationDelay = n.wheelViewModeNavigationDelay : "wheelViewModeNavigationDelay" in this.element.data() && (this.wheelViewModeNavigationDelay = this.element.data("view-mode-wheel-navigation-delay"));
        this.startViewMode = 2;
        "startView" in n ? this.startViewMode = n.startView : "startView" in this.element.data() && (this.startViewMode = this.element.data("start-view"));
        this.startViewMode = s.convertViewMode(this.startViewMode);
        this.viewMode = this.startViewMode;
        this.viewSelect = this.minView;
        "viewSelect" in n ? this.viewSelect = n.viewSelect : "viewSelect" in this.element.data() && (this.viewSelect = this.element.data("view-select"));
        this.viewSelect = s.convertViewMode(this.viewSelect);
        this.forceParse = !0;
        "forceParse" in n ? this.forceParse = n.forceParse : "dateForceParse" in this.element.data() && (this.forceParse = this.element.data("date-force-parse"));
        this.picker = e(s.template).appendTo(this.isInline ? this.element : "body").on({
            click: e.proxy(this.click, this),
            mousedown: e.proxy(this.mousedown, this)
        });
        this.wheelViewModeNavigation && (e.fn.mousewheel ? this.picker.on({
            mousewheel: e.proxy(this.mousewheel, this)
        }) : console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option"));
        this.isInline ? this.picker.addClass("datetimepicker-inline") : this.picker.addClass("datetimepicker-dropdown-" + this.pickerPosition + " dropdown-menu");
        if (this.isRTL) {
            this.picker.addClass("datetimepicker-rtl");
            this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right");
        }
        e(document).on("mousedown", function(t) {
            e(t.target).closest(".datetimepicker").length === 0 && r.hide();
        });
        this.autoclose = !1;
        "autoclose" in n ? this.autoclose = n.autoclose : "dateAutoclose" in this.element.data() && (this.autoclose = this.element.data("date-autoclose"));
        this.keyboardNavigation = !0;
        "keyboardNavigation" in n ? this.keyboardNavigation = n.keyboardNavigation : "dateKeyboardNavigation" in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation"));
        this.todayBtn = n.todayBtn || this.element.data("date-today-btn") || !1;
        this.todayHighlight = n.todayHighlight || this.element.data("date-today-highlight") || !1;
        this.weekStart = (n.weekStart || this.element.data("date-weekstart") || i[this.language].weekStart || 0) % 7;
        this.weekEnd = (this.weekStart + 6) % 7;
        this.startDate = -Infinity;
        this.endDate = Infinity;
        this.daysOfWeekDisabled = [];
        this.setStartDate(n.startDate || this.element.data("date-startdate"));
        this.setEndDate(n.endDate || this.element.data("date-enddate"));
        this.setDaysOfWeekDisabled(n.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled"));
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
        this.isInline && this.show();
    };
    r.prototype = {
        constructor: r,
        _events: [],
        _attachEvents: function() {
            this._detachEvents();
            if (this.isInput) this._events = [ [ this.element, {
                focus: e.proxy(this.show, this),
                keyup: e.proxy(this.update, this),
                keydown: e.proxy(this.keydown, this)
            } ] ]; else if (this.component && this.hasInput) {
                this._events = [ [ this.element.find("input"), {
                    focus: e.proxy(this.show, this),
                    keyup: e.proxy(this.update, this),
                    keydown: e.proxy(this.keydown, this)
                } ], [ this.component, {
                    click: e.proxy(this.show, this)
                } ] ];
                this.componentReset && this._events.push([ this.componentReset, {
                    click: e.proxy(this.reset, this)
                } ]);
            } else this.element.is("div") ? this.isInline = !0 : this._events = [ [ this.element, {
                click: e.proxy(this.show, this)
            } ] ];
            for (var t = 0, n, r; t < this._events.length; t++) {
                n = this._events[t][0];
                r = this._events[t][1];
                n.on(r);
            }
        },
        _detachEvents: function() {
            for (var e = 0, t, n; e < this._events.length; e++) {
                t = this._events[e][0];
                n = this._events[e][1];
                t.off(n);
            }
            this._events = [];
        },
        show: function(t) {
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.forceParse && this.update();
            this.place();
            e(window).on("resize", e.proxy(this.place, this));
            if (t) {
                t.stopPropagation();
                t.preventDefault();
            }
            this.isVisible = !0;
            this.element.trigger({
                type: "show",
                date: this.date
            });
        },
        hide: function(t) {
            if (!this.isVisible) return;
            if (this.isInline) return;
            this.picker.hide();
            e(window).off("resize", this.place);
            this.viewMode = this.startViewMode;
            this.showMode();
            this.isInput || e(document).off("mousedown", this.hide);
            this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue();
            this.isVisible = !1;
            this.element.trigger({
                type: "hide",
                date: this.date
            });
        },
        remove: function() {
            this._detachEvents();
            this.picker.remove();
            delete this.picker;
            delete this.element.data().datetimepicker;
        },
        getDate: function() {
            var e = this.getUTCDate();
            return new Date(e.getTime() + e.getTimezoneOffset() * 6e4);
        },
        getUTCDate: function() {
            return this.date;
        },
        setDate: function(e) {
            this.setUTCDate(new Date(e.getTime() - e.getTimezoneOffset() * 6e4));
        },
        setUTCDate: function(e) {
            if (e >= this.startDate && e <= this.endDate) {
                this.date = e;
                this.setValue();
                this.viewDate = this.date;
                this.fill();
            } else this.element.trigger({
                type: "outOfRange",
                date: e,
                startDate: this.startDate,
                endDate: this.endDate
            });
        },
        setFormat: function(e) {
            this.format = s.parseFormat(e, this.formatType);
            var t;
            this.isInput ? t = this.element : this.component && (t = this.element.find("input"));
            t && t.val() && this.setValue();
        },
        setValue: function() {
            var t = this.getFormattedDate();
            if (!this.isInput) {
                this.component && this.element.find("input").val(t);
                this.element.data("date", t);
            } else this.element.val(t);
            this.linkField && e("#" + this.linkField).val(this.getFormattedDate(this.linkFormat));
        },
        getFormattedDate: function(e) {
            e == undefined && (e = this.format);
            return s.formatDate(this.date, e, this.language, this.formatType);
        },
        setStartDate: function(e) {
            this.startDate = e || -Infinity;
            this.startDate !== -Infinity && (this.startDate = s.parseDate(this.startDate, this.format, this.language, this.formatType));
            this.update();
            this.updateNavArrows();
        },
        setEndDate: function(e) {
            this.endDate = e || Infinity;
            this.endDate !== Infinity && (this.endDate = s.parseDate(this.endDate, this.format, this.language, this.formatType));
            this.update();
            this.updateNavArrows();
        },
        setDaysOfWeekDisabled: function(t) {
            this.daysOfWeekDisabled = t || [];
            e.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/));
            this.daysOfWeekDisabled = e.map(this.daysOfWeekDisabled, function(e) {
                return parseInt(e, 10);
            });
            this.update();
            this.updateNavArrows();
        },
        place: function() {
            if (this.isInline) return;
            var t = parseInt(this.element.parents().filter(function() {
                return e(this).css("z-index") != "auto";
            }).first().css("z-index")) + 10, n, r, i;
            if (this.component) {
                n = this.component.offset();
                i = n.left;
                if (this.pickerPosition == "bottom-left" || this.pickerPosition == "top-left") i += this.component.outerWidth() - this.picker.outerWidth();
            } else {
                n = this.element.offset();
                i = n.left;
            }
            this.pickerPosition == "top-left" || this.pickerPosition == "top-right" ? r = n.top - this.picker.outerHeight() : r = n.top + this.height;
            this.picker.css({
                top: r,
                left: i,
                zIndex: t
            });
        },
        update: function() {
            var e, t = !1;
            if (arguments && arguments.length && (typeof arguments[0] == "string" || arguments[0] instanceof Date)) {
                e = arguments[0];
                t = !0;
            } else e = this.element.data("date") || (this.isInput ? this.element.val() : this.element.find("input").val()) || this.initialDate;
            if (!e) {
                e = new Date;
                t = !1;
            }
            this.date = s.parseDate(e, this.format, this.language, this.formatType);
            t && this.setValue();
            this.date < this.startDate ? this.viewDate = new Date(this.startDate) : this.date > this.endDate ? this.viewDate = new Date(this.endDate) : this.viewDate = new Date(this.date);
            this.fill();
        },
        fillDow: function() {
            var e = this.weekStart, t = "<tr>";
            while (e < this.weekStart + 7) t += '<th class="dow">' + i[this.language].daysMin[e++ % 7] + "</th>";
            t += "</tr>";
            this.picker.find(".datetimepicker-days thead").append(t);
        },
        fillMonths: function() {
            var e = "", t = 0;
            while (t < 12) e += '<span class="month">' + i[this.language].monthsShort[t++] + "</span>";
            this.picker.find(".datetimepicker-months td").html(e);
        },
        fill: function() {
            if (this.date == null || this.viewDate == null) return;
            var n = new Date(this.viewDate), r = n.getUTCFullYear(), o = n.getUTCMonth(), u = n.getUTCDate(), a = n.getUTCHours(), f = n.getUTCMinutes(), l = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity, c = this.startDate !== -Infinity ? this.startDate.getUTCMonth() : -Infinity, h = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity, p = this.endDate !== Infinity ? this.endDate.getUTCMonth() : Infinity, d = (new t(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate())).valueOf(), v = new Date;
            this.picker.find(".datetimepicker-days thead th:eq(1)").text(i[this.language].months[o] + " " + r);
            if (this.formatViewType == "time") {
                var m = a % 12 ? a % 12 : 12, g = (m < 10 ? "0" : "") + m, y = (f < 10 ? "0" : "") + f, b = i[this.language].meridiem[a < 12 ? 0 : 1];
                this.picker.find(".datetimepicker-hours thead th:eq(1)").text(g + ":" + y + " " + b.toUpperCase());
                this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(g + ":" + y + " " + b.toUpperCase());
            } else {
                this.picker.find(".datetimepicker-hours thead th:eq(1)").text(u + " " + i[this.language].months[o] + " " + r);
                this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(u + " " + i[this.language].months[o] + " " + r);
            }
            this.picker.find("tfoot th.today").text(i[this.language].today).toggle(this.todayBtn !== !1);
            this.updateNavArrows();
            this.fillMonths();
            var w = t(r, o - 1, 28, 0, 0, 0, 0), E = s.getDaysInMonth(w.getUTCFullYear(), w.getUTCMonth());
            w.setUTCDate(E);
            w.setUTCDate(E - (w.getUTCDay() - this.weekStart + 7) % 7);
            var S = new Date(w);
            S.setUTCDate(S.getUTCDate() + 42);
            S = S.valueOf();
            var x = [], T;
            while (w.valueOf() < S) {
                w.getUTCDay() == this.weekStart && x.push("<tr>");
                T = "";
                if (w.getUTCFullYear() < r || w.getUTCFullYear() == r && w.getUTCMonth() < o) T += " old"; else if (w.getUTCFullYear() > r || w.getUTCFullYear() == r && w.getUTCMonth() > o) T += " new";
                this.todayHighlight && w.getUTCFullYear() == v.getFullYear() && w.getUTCMonth() == v.getMonth() && w.getUTCDate() == v.getDate() && (T += " today");
                w.valueOf() == d && (T += " active");
                if (w.valueOf() + 864e5 <= this.startDate || w.valueOf() > this.endDate || e.inArray(w.getUTCDay(), this.daysOfWeekDisabled) !== -1) T += " disabled";
                x.push('<td class="day' + T + '">' + w.getUTCDate() + "</td>");
                w.getUTCDay() == this.weekEnd && x.push("</tr>");
                w.setUTCDate(w.getUTCDate() + 1);
            }
            this.picker.find(".datetimepicker-days tbody").empty().append(x.join(""));
            x = [];
            var N = "", C = "", k = "";
            for (var L = 0; L < 24; L++) {
                var A = t(r, o, u, L);
                T = "";
                A.valueOf() + 36e5 <= this.startDate || A.valueOf() > this.endDate ? T += " disabled" : a == L && (T += " active");
                if (this.showMeridian && i[this.language].meridiem.length == 2) {
                    C = L < 12 ? i[this.language].meridiem[0] : i[this.language].meridiem[1];
                    if (C != k) {
                        k != "" && x.push("</fieldset>");
                        x.push('<fieldset class="hour"><legend>' + C.toUpperCase() + "</legend>");
                    }
                    k = C;
                    N = L % 12 ? L % 12 : 12;
                    x.push('<span class="hour' + T + " hour_" + (L < 12 ? "am" : "pm") + '">' + N + "</span>");
                    L == 23 && x.push("</fieldset>");
                } else {
                    N = L + ":00";
                    x.push('<span class="hour' + T + '">' + N + "</span>");
                }
            }
            this.picker.find(".datetimepicker-hours td").html(x.join(""));
            x = [];
            N = "", C = "", k = "";
            for (var L = 0; L < 60; L += this.minuteStep) {
                var A = t(r, o, u, a, L, 0);
                T = "";
                A.valueOf() < this.startDate || A.valueOf() > this.endDate ? T += " disabled" : Math.floor(f / this.minuteStep) == Math.floor(L / this.minuteStep) && (T += " active");
                if (this.showMeridian && i[this.language].meridiem.length == 2) {
                    C = a < 12 ? i[this.language].meridiem[0] : i[this.language].meridiem[1];
                    if (C != k) {
                        k != "" && x.push("</fieldset>");
                        x.push('<fieldset class="minute"><legend>' + C.toUpperCase() + "</legend>");
                    }
                    k = C;
                    N = a % 12 ? a % 12 : 12;
                    x.push('<span class="minute' + T + '">' + N + ":" + (L < 10 ? "0" + L : L) + "</span>");
                    L == 59 && x.push("</fieldset>");
                } else {
                    N = L + ":00";
                    x.push('<span class="minute' + T + '">' + a + ":" + (L < 10 ? "0" + L : L) + "</span>");
                }
            }
            this.picker.find(".datetimepicker-minutes td").html(x.join(""));
            var O = this.date.getUTCFullYear(), M = this.picker.find(".datetimepicker-months").find("th:eq(1)").text(r).end().find("span").removeClass("active");
            O == r && M.eq(this.date.getUTCMonth()).addClass("active");
            (r < l || r > h) && M.addClass("disabled");
            r == l && M.slice(0, c).addClass("disabled");
            r == h && M.slice(p + 1).addClass("disabled");
            x = "";
            r = parseInt(r / 10, 10) * 10;
            var _ = this.picker.find(".datetimepicker-years").find("th:eq(1)").text(r + "-" + (r + 9)).end().find("td");
            r -= 1;
            for (var L = -1; L < 11; L++) {
                x += '<span class="year' + (L == -1 || L == 10 ? " old" : "") + (O == r ? " active" : "") + (r < l || r > h ? " disabled" : "") + '">' + r + "</span>";
                r += 1;
            }
            _.html(x);
            this.place();
        },
        updateNavArrows: function() {
            var e = new Date(this.viewDate), t = e.getUTCFullYear(), n = e.getUTCMonth(), r = e.getUTCDate(), i = e.getUTCHours();
            switch (this.viewMode) {
              case 0:
                this.startDate !== -Infinity && t <= this.startDate.getUTCFullYear() && n <= this.startDate.getUTCMonth() && r <= this.startDate.getUTCDate() && i <= this.startDate.getUTCHours() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                });
                this.endDate !== Infinity && t >= this.endDate.getUTCFullYear() && n >= this.endDate.getUTCMonth() && r >= this.endDate.getUTCDate() && i >= this.endDate.getUTCHours() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                });
                break;
              case 1:
                this.startDate !== -Infinity && t <= this.startDate.getUTCFullYear() && n <= this.startDate.getUTCMonth() && r <= this.startDate.getUTCDate() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                });
                this.endDate !== Infinity && t >= this.endDate.getUTCFullYear() && n >= this.endDate.getUTCMonth() && r >= this.endDate.getUTCDate() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                });
                break;
              case 2:
                this.startDate !== -Infinity && t <= this.startDate.getUTCFullYear() && n <= this.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                });
                this.endDate !== Infinity && t >= this.endDate.getUTCFullYear() && n >= this.endDate.getUTCMonth() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                });
                break;
              case 3:
              case 4:
                this.startDate !== -Infinity && t <= this.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                });
                this.endDate !== Infinity && t >= this.endDate.getUTCFullYear() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                });
            }
        },
        mousewheel: function(t) {
            t.preventDefault();
            t.stopPropagation();
            if (this.wheelPause) return;
            this.wheelPause = !0;
            var n = t.originalEvent, r = n.wheelDelta, i = r > 0 ? 1 : r === 0 ? 0 : -1;
            this.wheelViewModeNavigationInverseDirection && (i = -i);
            this.showMode(i);
            setTimeout(e.proxy(function() {
                this.wheelPause = !1;
            }, this), this.wheelViewModeNavigationDelay);
        },
        click: function(n) {
            n.stopPropagation();
            n.preventDefault();
            var r = e(n.target).closest("span, td, th, legend");
            if (r.length == 1) {
                if (r.is(".disabled")) {
                    this.element.trigger({
                        type: "outOfRange",
                        date: this.viewDate,
                        startDate: this.startDate,
                        endDate: this.endDate
                    });
                    return;
                }
                switch (r[0].nodeName.toLowerCase()) {
                  case "th":
                    switch (r[0].className) {
                      case "switch":
                        this.showMode(1);
                        break;
                      case "prev":
                      case "next":
                        var i = s.modes[this.viewMode].navStep * (r[0].className == "prev" ? -1 : 1);
                        switch (this.viewMode) {
                          case 0:
                            this.viewDate = this.moveHour(this.viewDate, i);
                            break;
                          case 1:
                            this.viewDate = this.moveDate(this.viewDate, i);
                            break;
                          case 2:
                            this.viewDate = this.moveMonth(this.viewDate, i);
                            break;
                          case 3:
                          case 4:
                            this.viewDate = this.moveYear(this.viewDate, i);
                        }
                        this.fill();
                        break;
                      case "today":
                        var o = new Date;
                        o = t(o.getFullYear(), o.getMonth(), o.getDate(), o.getHours(), o.getMinutes(), o.getSeconds(), 0);
                        this.viewMode = this.startViewMode;
                        this.showMode(0);
                        this._setDate(o);
                        this.fill();
                        this.autoclose && this.hide();
                    }
                    break;
                  case "span":
                    if (!r.is(".disabled")) {
                        var u = this.viewDate.getUTCFullYear(), a = this.viewDate.getUTCMonth(), f = this.viewDate.getUTCDate(), l = this.viewDate.getUTCHours(), c = this.viewDate.getUTCMinutes(), h = this.viewDate.getUTCSeconds();
                        if (r.is(".month")) {
                            this.viewDate.setUTCDate(1);
                            a = r.parent().find("span").index(r);
                            f = this.viewDate.getUTCDate();
                            this.viewDate.setUTCMonth(a);
                            this.element.trigger({
                                type: "changeMonth",
                                date: this.viewDate
                            });
                            this.viewSelect >= 3 && this._setDate(t(u, a, f, l, c, h, 0));
                        } else if (r.is(".year")) {
                            this.viewDate.setUTCDate(1);
                            u = parseInt(r.text(), 10) || 0;
                            this.viewDate.setUTCFullYear(u);
                            this.element.trigger({
                                type: "changeYear",
                                date: this.viewDate
                            });
                            this.viewSelect >= 4 && this._setDate(t(u, a, f, l, c, h, 0));
                        } else if (r.is(".hour")) {
                            l = parseInt(r.text(), 10) || 0;
                            if (r.hasClass("hour_am") || r.hasClass("hour_pm")) l == 12 && r.hasClass("hour_am") ? l = 0 : l != 12 && r.hasClass("hour_pm") && (l += 12);
                            this.viewDate.setUTCHours(l);
                            this.element.trigger({
                                type: "changeHour",
                                date: this.viewDate
                            });
                            this.viewSelect >= 1 && this._setDate(t(u, a, f, l, c, h, 0));
                        } else if (r.is(".minute")) {
                            c = parseInt(r.text().substr(r.text().indexOf(":") + 1), 10) || 0;
                            this.viewDate.setUTCMinutes(c);
                            this.element.trigger({
                                type: "changeMinute",
                                date: this.viewDate
                            });
                            this.viewSelect >= 0 && this._setDate(t(u, a, f, l, c, h, 0));
                        }
                        if (this.viewMode != 0) {
                            var p = this.viewMode;
                            this.showMode(-1);
                            this.fill();
                            p == this.viewMode && this.autoclose && this.hide();
                        } else {
                            this.fill();
                            this.autoclose && this.hide();
                        }
                    }
                    break;
                  case "td":
                    if (r.is(".day") && !r.is(".disabled")) {
                        var f = parseInt(r.text(), 10) || 1, u = this.viewDate.getUTCFullYear(), a = this.viewDate.getUTCMonth(), l = this.viewDate.getUTCHours(), c = this.viewDate.getUTCMinutes(), h = this.viewDate.getUTCSeconds();
                        if (r.is(".old")) if (a === 0) {
                            a = 11;
                            u -= 1;
                        } else a -= 1; else if (r.is(".new")) if (a == 11) {
                            a = 0;
                            u += 1;
                        } else a += 1;
                        this.viewDate.setUTCFullYear(u);
                        this.viewDate.setUTCMonth(a);
                        this.viewDate.setUTCDate(f);
                        this.element.trigger({
                            type: "changeDay",
                            date: this.viewDate
                        });
                        this.viewSelect >= 2 && this._setDate(t(u, a, f, l, c, h, 0));
                    }
                    var p = this.viewMode;
                    this.showMode(-1);
                    this.fill();
                    p == this.viewMode && this.autoclose && this.hide();
                }
            }
        },
        _setDate: function(e, t) {
            if (!t || t == "date") this.date = e;
            if (!t || t == "view") this.viewDate = e;
            this.fill();
            this.setValue();
            var n;
            this.isInput ? n = this.element : this.component && (n = this.element.find("input"));
            if (n) {
                n.change();
                this.autoclose && (!t || t == "date");
            }
            this.element.trigger({
                type: "changeDate",
                date: this.date
            });
        },
        moveMinute: function(e, t) {
            if (!t) return e;
            var n = new Date(e.valueOf());
            n.setUTCMinutes(n.getUTCMinutes() + t * this.minuteStep);
            return n;
        },
        moveHour: function(e, t) {
            if (!t) return e;
            var n = new Date(e.valueOf());
            n.setUTCHours(n.getUTCHours() + t);
            return n;
        },
        moveDate: function(e, t) {
            if (!t) return e;
            var n = new Date(e.valueOf());
            n.setUTCDate(n.getUTCDate() + t);
            return n;
        },
        moveMonth: function(e, t) {
            if (!t) return e;
            var n = new Date(e.valueOf()), r = n.getUTCDate(), i = n.getUTCMonth(), s = Math.abs(t), o, u;
            t = t > 0 ? 1 : -1;
            if (s == 1) {
                u = t == -1 ? function() {
                    return n.getUTCMonth() == i;
                } : function() {
                    return n.getUTCMonth() != o;
                };
                o = i + t;
                n.setUTCMonth(o);
                if (o < 0 || o > 11) o = (o + 12) % 12;
            } else {
                for (var a = 0; a < s; a++) n = this.moveMonth(n, t);
                o = n.getUTCMonth();
                n.setUTCDate(r);
                u = function() {
                    return o != n.getUTCMonth();
                };
            }
            while (u()) {
                n.setUTCDate(--r);
                n.setUTCMonth(o);
            }
            return n;
        },
        moveYear: function(e, t) {
            return this.moveMonth(e, t * 12);
        },
        dateWithinRange: function(e) {
            return e >= this.startDate && e <= this.endDate;
        },
        keydown: function(e) {
            if (this.picker.is(":not(:visible)")) {
                e.keyCode == 27 && this.show();
                return;
            }
            var t = !1, n, r, i, s, o;
            switch (e.keyCode) {
              case 27:
                this.hide();
                e.preventDefault();
                break;
              case 37:
              case 39:
                if (!this.keyboardNavigation) break;
                n = e.keyCode == 37 ? -1 : 1;
                viewMode = this.viewMode;
                e.ctrlKey ? viewMode += 2 : e.shiftKey && (viewMode += 1);
                if (viewMode == 4) {
                    s = this.moveYear(this.date, n);
                    o = this.moveYear(this.viewDate, n);
                } else if (viewMode == 3) {
                    s = this.moveMonth(this.date, n);
                    o = this.moveMonth(this.viewDate, n);
                } else if (viewMode == 2) {
                    s = this.moveDate(this.date, n);
                    o = this.moveDate(this.viewDate, n);
                } else if (viewMode == 1) {
                    s = this.moveHour(this.date, n);
                    o = this.moveHour(this.viewDate, n);
                } else if (viewMode == 0) {
                    s = this.moveMinute(this.date, n);
                    o = this.moveMinute(this.viewDate, n);
                }
                if (this.dateWithinRange(s)) {
                    this.date = s;
                    this.viewDate = o;
                    this.setValue();
                    this.update();
                    e.preventDefault();
                    t = !0;
                }
                break;
              case 38:
              case 40:
                if (!this.keyboardNavigation) break;
                n = e.keyCode == 38 ? -1 : 1;
                viewMode = this.viewMode;
                e.ctrlKey ? viewMode += 2 : e.shiftKey && (viewMode += 1);
                if (viewMode == 4) {
                    s = this.moveYear(this.date, n);
                    o = this.moveYear(this.viewDate, n);
                } else if (viewMode == 3) {
                    s = this.moveMonth(this.date, n);
                    o = this.moveMonth(this.viewDate, n);
                } else if (viewMode == 2) {
                    s = this.moveDate(this.date, n * 7);
                    o = this.moveDate(this.viewDate, n * 7);
                } else if (viewMode == 1) if (this.showMeridian) {
                    s = this.moveHour(this.date, n * 6);
                    o = this.moveHour(this.viewDate, n * 6);
                } else {
                    s = this.moveHour(this.date, n * 4);
                    o = this.moveHour(this.viewDate, n * 4);
                } else if (viewMode == 0) {
                    s = this.moveMinute(this.date, n * 4);
                    o = this.moveMinute(this.viewDate, n * 4);
                }
                if (this.dateWithinRange(s)) {
                    this.date = s;
                    this.viewDate = o;
                    this.setValue();
                    this.update();
                    e.preventDefault();
                    t = !0;
                }
                break;
              case 13:
                if (this.viewMode != 0) {
                    var u = this.viewMode;
                    this.showMode(-1);
                    this.fill();
                    u == this.viewMode && this.autoclose && this.hide();
                } else {
                    this.fill();
                    this.autoclose && this.hide();
                }
                e.preventDefault();
                break;
              case 9:
                this.hide();
            }
            if (t) {
                var a;
                this.isInput ? a = this.element : this.component && (a = this.element.find("input"));
                a && a.change();
                this.element.trigger({
                    type: "changeDate",
                    date: this.date
                });
            }
        },
        showMode: function(e) {
            if (e) {
                var t = Math.max(0, Math.min(s.modes.length - 1, this.viewMode + e));
                if (t >= this.minView && t <= this.maxView) {
                    this.element.trigger({
                        type: "changeMode",
                        date: this.viewDate,
                        oldViewMode: this.viewMode,
                        newViewMode: t
                    });
                    this.viewMode = t;
                }
            }
            this.picker.find(">div").hide().filter(".datetimepicker-" + s.modes[this.viewMode].clsName).css("display", "block");
            this.updateNavArrows();
        },
        reset: function(e) {
            this._setDate(null, "date");
        }
    };
    e.fn.datetimepicker = function(t) {
        var n = Array.apply(null, arguments);
        n.shift();
        return this.each(function() {
            var i = e(this), s = i.data("datetimepicker"), o = typeof t == "object" && t;
            s || i.data("datetimepicker", s = new r(this, e.extend({}, e.fn.datetimepicker.defaults, o)));
            typeof t == "string" && typeof s[t] == "function" && s[t].apply(s, n);
        });
    };
    e.fn.datetimepicker.defaults = {};
    e.fn.datetimepicker.Constructor = r;
    var i = e.fn.datetimepicker.dates = {
        en: {
            days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
            daysShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
            daysMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su" ],
            months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            monthsShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            meridiem: [ "am", "pm" ],
            suffix: [ "st", "nd", "rd", "th" ],
            today: "Today"
        }
    }, s = {
        modes: [ {
            clsName: "minutes",
            navFnc: "Hours",
            navStep: 1
        }, {
            clsName: "hours",
            navFnc: "Date",
            navStep: 1
        }, {
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        }, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        } ],
        isLeapYear: function(e) {
            return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
        },
        getDaysInMonth: function(e, t) {
            return [ 31, s.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][t];
        },
        getDefaultFormat: function(e, t) {
            if (e == "standard") return t == "input" ? "yyyy-mm-dd hh:ii" : "yyyy-mm-dd hh:ii:ss";
            if (e == "php") return t == "input" ? "Y-m-d H:i" : "Y-m-d H:i:s";
            throw new Error("Invalid format type.");
        },
        validParts: function(e) {
            if (e == "standard") return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
            if (e == "php") return /[dDjlNwzFmMnStyYaABgGhHis]/g;
            throw new Error("Invalid format type.");
        },
        nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
        parseFormat: function(e, t) {
            var n = e.replace(this.validParts(t), "\0").split("\0"), r = e.match(this.validParts(t));
            if (!n || !n.length || !r || r.length == 0) throw new Error("Invalid date format.");
            return {
                separators: n,
                parts: r
            };
        },
        parseDate: function(n, s, o, u) {
            if (n instanceof Date) {
                var a = new Date(n.valueOf() - n.getTimezoneOffset() * 6e4);
                a.setMilliseconds(0);
                return a;
            }
            /^\d{4}\-\d{1,2}\-\d{1,2}$/.test(n) && (s = this.parseFormat("yyyy-mm-dd", u));
            /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(n) && (s = this.parseFormat("yyyy-mm-dd hh:ii", u));
            /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(n) && (s = this.parseFormat("yyyy-mm-dd hh:ii:ss", u));
            if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(n)) {
                var f = /([-+]\d+)([dmwy])/, l = n.match(/([-+]\d+)([dmwy])/g), c, h;
                n = new Date;
                for (var p = 0; p < l.length; p++) {
                    c = f.exec(l[p]);
                    h = parseInt(c[1]);
                    switch (c[2]) {
                      case "d":
                        n.setUTCDate(n.getUTCDate() + h);
                        break;
                      case "m":
                        n = r.prototype.moveMonth.call(r.prototype, n, h);
                        break;
                      case "w":
                        n.setUTCDate(n.getUTCDate() + h * 7);
                        break;
                      case "y":
                        n = r.prototype.moveYear.call(r.prototype, n, h);
                    }
                }
                return t(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds(), 0);
            }
            var l = n && n.match(this.nonpunctuation) || [], n = new Date(0, 0, 0, 0, 0, 0, 0), d = {}, v = [ "hh", "h", "ii", "i", "ss", "s", "yyyy", "yy", "M", "MM", "m", "mm", "D", "DD", "d", "dd", "H", "HH", "p", "P" ], m = {
                hh: function(e, t) {
                    return e.setUTCHours(t);
                },
                h: function(e, t) {
                    return e.setUTCHours(t);
                },
                HH: function(e, t) {
                    return e.setUTCHours(t == 12 ? 0 : t);
                },
                H: function(e, t) {
                    return e.setUTCHours(t == 12 ? 0 : t);
                },
                ii: function(e, t) {
                    return e.setUTCMinutes(t);
                },
                i: function(e, t) {
                    return e.setUTCMinutes(t);
                },
                ss: function(e, t) {
                    return e.setUTCSeconds(t);
                },
                s: function(e, t) {
                    return e.setUTCSeconds(t);
                },
                yyyy: function(e, t) {
                    return e.setUTCFullYear(t);
                },
                yy: function(e, t) {
                    return e.setUTCFullYear(2e3 + t);
                },
                m: function(e, t) {
                    t -= 1;
                    while (t < 0) t += 12;
                    t %= 12;
                    e.setUTCMonth(t);
                    while (e.getUTCMonth() != t) e.setUTCDate(e.getUTCDate() - 1);
                    return e;
                },
                d: function(e, t) {
                    return e.setUTCDate(t);
                },
                p: function(e, t) {
                    return e.setUTCHours(t == 1 ? e.getUTCHours() + 12 : e.getUTCHours());
                }
            }, g, y, c;
            m.M = m.MM = m.mm = m.m;
            m.dd = m.d;
            m.P = m.p;
            n = t(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds());
            if (l.length == s.parts.length) {
                for (var p = 0, b = s.parts.length; p < b; p++) {
                    g = parseInt(l[p], 10);
                    c = s.parts[p];
                    if (isNaN(g)) switch (c) {
                      case "MM":
                        y = e(i[o].months).filter(function() {
                            var e = this.slice(0, l[p].length), t = l[p].slice(0, e.length);
                            return e == t;
                        });
                        g = e.inArray(y[0], i[o].months) + 1;
                        break;
                      case "M":
                        y = e(i[o].monthsShort).filter(function() {
                            var e = this.slice(0, l[p].length), t = l[p].slice(0, e.length);
                            return e == t;
                        });
                        g = e.inArray(y[0], i[o].monthsShort) + 1;
                        break;
                      case "p":
                      case "P":
                        g = e.inArray(l[p].toLowerCase(), i[o].meridiem);
                    }
                    d[c] = g;
                }
                for (var p = 0, w; p < v.length; p++) {
                    w = v[p];
                    w in d && !isNaN(d[w]) && m[w](n, d[w]);
                }
            }
            return n;
        },
        formatDate: function(t, n, r, o) {
            if (t == null) return "";
            var u;
            if (o == "standard") {
                u = {
                    yy: t.getUTCFullYear().toString().substring(2),
                    yyyy: t.getUTCFullYear(),
                    m: t.getUTCMonth() + 1,
                    M: i[r].monthsShort[t.getUTCMonth()],
                    MM: i[r].months[t.getUTCMonth()],
                    d: t.getUTCDate(),
                    D: i[r].daysShort[t.getUTCDay()],
                    DD: i[r].days[t.getUTCDay()],
                    p: i[r].meridiem.length == 2 ? i[r].meridiem[t.getUTCHours() < 12 ? 0 : 1] : "",
                    h: t.getUTCHours(),
                    i: t.getUTCMinutes(),
                    s: t.getUTCSeconds()
                };
                i[r].meridiem.length == 2 ? u.H = u.h % 12 == 0 ? 12 : u.h % 12 : u.H = u.h;
                u.HH = (u.H < 10 ? "0" : "") + u.H;
                u.P = u.p.toUpperCase();
                u.hh = (u.h < 10 ? "0" : "") + u.h;
                u.ii = (u.i < 10 ? "0" : "") + u.i;
                u.ss = (u.s < 10 ? "0" : "") + u.s;
                u.dd = (u.d < 10 ? "0" : "") + u.d;
                u.mm = (u.m < 10 ? "0" : "") + u.m;
            } else {
                if (o != "php") throw new Error("Invalid format type.");
                u = {
                    y: t.getUTCFullYear().toString().substring(2),
                    Y: t.getUTCFullYear(),
                    F: i[r].months[t.getUTCMonth()],
                    M: i[r].monthsShort[t.getUTCMonth()],
                    n: t.getUTCMonth() + 1,
                    t: s.getDaysInMonth(t.getUTCFullYear(), t.getUTCMonth()),
                    j: t.getUTCDate(),
                    l: i[r].days[t.getUTCDay()],
                    D: i[r].daysShort[t.getUTCDay()],
                    w: t.getUTCDay(),
                    N: t.getUTCDay() == 0 ? 7 : t.getUTCDay(),
                    S: t.getUTCDate() % 10 <= i[r].suffix.length ? i[r].suffix[t.getUTCDate() % 10 - 1] : "",
                    a: i[r].meridiem.length == 2 ? i[r].meridiem[t.getUTCHours() < 12 ? 0 : 1] : "",
                    g: t.getUTCHours() % 12 == 0 ? 12 : t.getUTCHours() % 12,
                    G: t.getUTCHours(),
                    i: t.getUTCMinutes(),
                    s: t.getUTCSeconds()
                };
                u.m = (u.n < 10 ? "0" : "") + u.n;
                u.d = (u.j < 10 ? "0" : "") + u.j;
                u.A = u.a.toString().toUpperCase();
                u.h = (u.g < 10 ? "0" : "") + u.g;
                u.H = (u.G < 10 ? "0" : "") + u.G;
                u.i = (u.i < 10 ? "0" : "") + u.i;
                u.s = (u.s < 10 ? "0" : "") + u.s;
            }
            var t = [], a = e.extend([], n.separators);
            for (var f = 0, l = n.parts.length; f < l; f++) {
                a.length && t.push(a.shift());
                t.push(u[n.parts[f]]);
            }
            return t.join("");
        },
        convertViewMode: function(e) {
            switch (e) {
              case 4:
              case "decade":
                e = 4;
                break;
              case 3:
              case "year":
                e = 3;
                break;
              case 2:
              case "month":
                e = 2;
                break;
              case 1:
              case "day":
                e = 1;
                break;
              case 0:
              case "hour":
                e = 0;
            }
            return e;
        },
        headTemplate: '<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
    };
    s.template = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-hours">' + '<table class=" table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-days">' + '<table class=" table-condensed">' + s.headTemplate + "<tbody></tbody>" + s.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-months">' + '<table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-years">' + '<table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + "</table>" + "</div>" + "</div>";
    e.fn.datetimepicker.DPGlobal = s;
    e.fn.datetimepicker.noConflict = function() {
        e.fn.datetimepicker = old;
        return this;
    };
    e(document).on("focus.datetimepicker.data-api click.datetimepicker.data-api", '[data-provide="datetimepicker"]', function(t) {
        var n = e(this);
        if (n.data("datetimepicker")) return;
        t.preventDefault();
        n.datetimepicker("show");
    });
    e(function() {
        e('[data-provide="datetimepicker-inline"]').datetimepicker();
    });
}(window.jQuery);