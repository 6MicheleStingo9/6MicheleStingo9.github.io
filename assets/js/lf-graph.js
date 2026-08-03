/*
 * lf-graph.js — self-contained, dependency-free SVG force-directed graph.
 * Reads data from an inline <script type="application/json" id="lf-graph-data">
 * and renders into #lf-graph. Controls: toggle external sources, zoom (wheel),
 * pan (drag background), drag nodes, and "fit". Nodes are anchors (navigation +
 * a11y come for free); a real drag suppresses the click-navigation.
 */
(function () {
  "use strict";

  var SVGNS = "http://www.w3.org/2000/svg";
  var XLINK = "http://www.w3.org/1999/xlink";
  var COLOR = { post: "#eab308", note: "#3b82c4", external: "#9aa0a6" };
  var RAD = { post: 15, note: 12, external: 6 };
  var VB = 1000; // virtual viewBox size

  function el(name, attrs) {
    var e = document.createElementNS(SVGNS, name);
    if (attrs) for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    return e;
  }

  // Fruchterman–Reingold on the subset of nodes whose id is in `active`.
  function layout(nodes, links, active) {
    var list = nodes.filter(function (n) {
      return active[n.id];
    });
    var elinks = links.filter(function (l) {
      return active[l.source.id] && active[l.target.id];
    });
    var n = list.length || 1;
    var k = Math.sqrt((VB * VB) / n) * 0.85;
    list.forEach(function (v, i) {
      var a = (2 * Math.PI * i) / n;
      v.x = VB / 2 + Math.cos(a) * VB * 0.3;
      v.y = VB / 2 + Math.sin(a) * VB * 0.3;
    });
    var t = VB / 8;
    for (var it = 0; it < 500; it++) {
      list.forEach(function (v) {
        v.dx = 0;
        v.dy = 0;
      });
      for (var i = 0; i < list.length; i++) {
        for (var j = i + 1; j < list.length; j++) {
          var v = list[i],
            u = list[j];
          var dx = v.x - u.x,
            dy = v.y - u.y,
            d = Math.sqrt(dx * dx + dy * dy) || 0.01;
          var f = (k * k) / d,
            fx = (dx / d) * f,
            fy = (dy / d) * f;
          v.dx += fx;
          v.dy += fy;
          u.dx -= fx;
          u.dy -= fy;
        }
      }
      elinks.forEach(function (l) {
        var v = l.source,
          u = l.target;
        var dx = v.x - u.x,
          dy = v.y - u.y,
          d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        var f = (d * d) / k,
          fx = (dx / d) * f,
          fy = (dy / d) * f;
        v.dx -= fx;
        v.dy -= fy;
        u.dx += fx;
        u.dy += fy;
      });
      list.forEach(function (v) {
        v.dx += (VB / 2 - v.x) * 0.012;
        v.dy += (VB / 2 - v.y) * 0.012;
        var d = Math.sqrt(v.dx * v.dx + v.dy * v.dy) || 0.01;
        v.x += (v.dx / d) * Math.min(d, t);
        v.y += (v.dy / d) * Math.min(d, t);
      });
      t *= 0.985;
    }
  }

  function init() {
    var host = document.getElementById("lf-graph");
    var dataEl = document.getElementById("lf-graph-data");
    if (!host || !dataEl) return;
    var data;
    try {
      data = JSON.parse(dataEl.textContent);
    } catch (e) {
      return;
    }
    if (!data || !data.nodes) return;

    var baseurl = host.getAttribute("data-baseurl") || "";
    var nodes = data.nodes.map(function (n) {
      return { id: n.id, label: n.label, type: n.type, url: n.url, x: 0, y: 0 };
    });
    var byId = {};
    nodes.forEach(function (n) {
      byId[n.id] = n;
    });
    var links = (data.links || [])
      .filter(function (l) {
        return byId[l.source] && byId[l.target];
      })
      .map(function (l) {
        return { source: byId[l.source], target: byId[l.target] };
      });
    var nb = {};
    nodes.forEach(function (n) {
      nb[n.id] = {};
    });
    links.forEach(function (l) {
      nb[l.source.id][l.target.id] = 1;
      nb[l.target.id][l.source.id] = 1;
    });

    var svg = el("svg", {
      viewBox: "0 0 " + VB + " " + VB,
      preserveAspectRatio: "xMidYMid meet",
      class: "lf-svg",
      role: "img",
      "aria-label": "Map of the misplaced manifesto, its notes and sources",
    });
    var vp = el("g", { class: "lf-vp" });
    var gEdges = el("g", { class: "lf-edges" });
    var gNodes = el("g", { class: "lf-nodes" });
    vp.appendChild(gEdges);
    vp.appendChild(gNodes);
    svg.appendChild(vp);
    var legend = host.querySelector(".lf-legend");
    host.insertBefore(svg, legend); // legend null -> append

    var showSources = host.getAttribute("data-sources") === "on";
    var tf = { k: 1, x: 0, y: 0 };
    var edgeEls = [],
      nodeEls = {};

    function applyTransform() {
      vp.setAttribute("transform", "translate(" + tf.x + "," + tf.y + ") scale(" + tf.k + ")");
    }
    function toVB(cx, cy) {
      var m = svg.getScreenCTM();
      if (!m) return { x: 0, y: 0 };
      var i = m.inverse();
      return { x: i.a * cx + i.c * cy + i.e, y: i.b * cx + i.d * cy + i.f };
    }
    function active() {
      var a = {};
      nodes.forEach(function (n) {
        if (showSources || n.type !== "external") a[n.id] = true;
      });
      return a;
    }
    function positionNode(a) {
      var n = a.__n;
      a.__c.setAttribute("cx", n.x);
      a.__c.setAttribute("cy", n.y);
      a.__t.setAttribute("x", n.x);
      a.__t.setAttribute("y", n.y - RAD[n.type] - 7);
    }
    function positionEdge(line) {
      line.setAttribute("x1", line.__l.source.x);
      line.setAttribute("y1", line.__l.source.y);
      line.setAttribute("x2", line.__l.target.x);
      line.setAttribute("y2", line.__l.target.y);
    }
    function fit() {
      var ids = Object.keys(nodeEls);
      if (!ids.length) return;
      var minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
      ids.forEach(function (id) {
        var n = nodeEls[id].__n;
        if (n.x < minX) minX = n.x;
        if (n.x > maxX) maxX = n.x;
        if (n.y < minY) minY = n.y;
        if (n.y > maxY) maxY = n.y;
      });
      var pad = 90;
      minX -= pad;
      minY -= pad;
      maxX += pad;
      maxY += pad;
      var w = Math.max(1, maxX - minX),
        h = Math.max(1, maxY - minY);
      tf.k = Math.min(VB / w, VB / h);
      tf.x = -minX * tf.k + (VB - w * tf.k) / 2;
      tf.y = -minY * tf.k + (VB - h * tf.k) / 2;
      applyTransform();
    }

    function build() {
      gEdges.textContent = "";
      gNodes.textContent = "";
      edgeEls = [];
      nodeEls = {};
      var act = active();
      layout(nodes, links, act);
      links.forEach(function (l) {
        if (!act[l.source.id] || !act[l.target.id]) return;
        var line = el("line", {});
        line.__l = l;
        line.__a = l.source.id;
        line.__b = l.target.id;
        gEdges.appendChild(line);
        edgeEls.push(line);
        positionEdge(line);
      });
      nodes.forEach(function (n) {
        if (!act[n.id]) return;
        var href = n.type === "external" ? n.url : baseurl + n.url;
        var a = el("a", { class: "lf-node lf-node--" + n.type });
        a.setAttribute("href", href);
        a.setAttributeNS(XLINK, "xlink:href", href);
        if (n.type === "external") {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener");
        }
        var c = el("circle", { r: RAD[n.type], fill: COLOR[n.type] });
        var tx = el("text", { class: "lf-label" });
        tx.textContent = n.label;
        a.appendChild(c);
        a.appendChild(tx);
        a.__n = n;
        a.__c = c;
        a.__t = tx;
        positionNode(a);
        a.addEventListener("mouseenter", function () {
          highlight(n.id);
        });
        a.addEventListener("mouseleave", clearHi);
        a.addEventListener("pointerdown", nodeDown);
        a.addEventListener("click", function (ev) {
          if (a.__moved) {
            ev.preventDefault();
            a.__moved = false;
          }
        });
        gNodes.appendChild(a);
        nodeEls[n.id] = a;
      });
      fit();
    }

    function highlight(id) {
      svg.classList.add("lf-dim");
      for (var k in nodeEls) nodeEls[k].classList.toggle("lf-on", k === id || !!nb[id][k]);
      edgeEls.forEach(function (line) {
        line.classList.toggle("lf-on", line.__a === id || line.__b === id);
      });
    }
    function clearHi() {
      svg.classList.remove("lf-dim");
      for (var k in nodeEls) nodeEls[k].classList.remove("lf-on");
      edgeEls.forEach(function (line) {
        line.classList.remove("lf-on");
      });
    }

    // ---- panning ----
    var pan = null,
      drag = null;
    svg.addEventListener("pointerdown", function (ev) {
      if (drag) return;
      pan = { vb: toVB(ev.clientX, ev.clientY), x: tf.x, y: tf.y };
      try {
        svg.setPointerCapture(ev.pointerId);
      } catch (e) {}
    });
    svg.addEventListener("pointermove", function (ev) {
      if (drag) {
        var v = toVB(ev.clientX, ev.clientY);
        var n = drag.a.__n;
        n.x = drag.nx + (v.x - drag.vb.x) / tf.k;
        n.y = drag.ny + (v.y - drag.vb.y) / tf.k;
        if (Math.abs(v.x - drag.vb.x) + Math.abs(v.y - drag.vb.y) > 4) drag.a.__moved = true;
        positionNode(drag.a);
        edgeEls.forEach(function (line) {
          if (line.__a === n.id || line.__b === n.id) positionEdge(line);
        });
        return;
      }
      if (!pan) return;
      var p = toVB(ev.clientX, ev.clientY);
      tf.x = pan.x + (p.x - pan.vb.x);
      tf.y = pan.y + (p.y - pan.vb.y);
      applyTransform();
    });
    function endPointer(ev) {
      pan = null;
      if (drag) {
        try {
          drag.a.releasePointerCapture(ev.pointerId);
        } catch (e) {}
        drag = null;
      }
    }
    svg.addEventListener("pointerup", endPointer);
    svg.addEventListener("pointercancel", endPointer);

    // ---- node dragging ----
    function nodeDown(ev) {
      var a = ev.currentTarget;
      ev.stopPropagation();
      a.__moved = false;
      drag = { a: a, vb: toVB(ev.clientX, ev.clientY), nx: a.__n.x, ny: a.__n.y };
      try {
        a.setPointerCapture(ev.pointerId);
      } catch (e) {}
    }

    // ---- zoom ----
    svg.addEventListener(
      "wheel",
      function (ev) {
        ev.preventDefault();
        var p = toVB(ev.clientX, ev.clientY);
        var factor = ev.deltaY < 0 ? 1.15 : 1 / 1.15;
        var k2 = Math.max(0.3, Math.min(8, tf.k * factor));
        tf.x = p.x - ((p.x - tf.x) / tf.k) * k2;
        tf.y = p.y - ((p.y - tf.y) / tf.k) * k2;
        tf.k = k2;
        applyTransform();
      },
      { passive: false }
    );

    // ---- controls ----
    var toggle = host.querySelector(".lf-toggle-sources");
    if (toggle) {
      toggle.checked = showSources;
      toggle.addEventListener("change", function () {
        showSources = toggle.checked;
        build();
      });
    }
    var fitBtn = host.querySelector(".lf-fit");
    if (fitBtn) fitBtn.addEventListener("click", fit);

    build();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
