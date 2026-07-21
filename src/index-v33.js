import site from "./index-v32.js";

const VERSION = "v33";
const JS = String.raw`(function () {
  const form = document.getElementById('calForm');
  const eventsBox = document.getElementById('events');
  const placeholder = document.getElementById('placeholder');
  const downloadButton = document.getElementById('downloadIcs');
  const printButton = document.getElementById('printCalendar');
  let generated = [];

  if (!form || !eventsBox || !placeholder || !downloadButton || !printButton) {
    console.error('Compliance calendar controls were not found.');
    return;
  }

  function lastDay(year, month) {
    return new Date(year, month, 0);
  }

  function addEvent(date, title, note, tag) {
    generated.push({ date, title, note, tag });
  }

  function formatDate(date) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[character];
    });
  }

  function buildCalendar() {
    generated = [];

    const year = Number(document.getElementById('year').value);
    const frequency = document.getElementById('frequency').value;
    const irpMonth = Number(document.getElementById('irpMonth').value || 0);
    const fleetSize = Number(document.getElementById('fleetSize').value || 1);

    if (frequency === 'monthly') {
      for (let month = 1; month <= 12; month += 1) {
        addEvent(
          lastDay(year, month + 1),
          'New York HUT monthly return',
          'Return for ' + new Date(year, month - 1, 1).toLocaleString('en-US', { month: 'long' }) + ' reporting period.',
          'HUT'
        );
      }
    } else if (frequency === 'quarterly') {
      [[3, 4], [6, 7], [9, 10], [12, 13]].forEach(function (pair) {
        addEvent(
          lastDay(year, pair[1]),
          'New York HUT quarterly return',
          'Return for quarter ending ' + new Date(year, pair[0] - 1, 1).toLocaleString('en-US', { month: 'long' }) + '.',
          'HUT'
        );
      });
    } else {
      addEvent(new Date(year + 1, 0, 31), 'New York HUT annual return', 'Annual filing planning date.', 'HUT');
    }

    if (document.getElementById('ifta').checked) {
      [[3, 4], [6, 7], [9, 10], [12, 13]].forEach(function (pair) {
        addEvent(
          lastDay(year, pair[1]),
          'IFTA quarterly return',
          'Quarter ending ' + new Date(year, pair[0] - 1, 1).toLocaleString('en-US', { month: 'long' }) + '.',
          'IFTA'
        );
      });
    }

    if (document.getElementById('ucr').checked) {
      addEvent(new Date(year, 10, 15), 'UCR renewal review', 'Confirm registration for the following registration year.', 'UCR');
    }

    if (document.getElementById('records').checked) {
      for (let month = 0; month < 12; month += 1) {
        addEvent(
          new Date(year, month, 15),
          'Monthly mileage and fuel review',
          'Review records for ' + fleetSize + ' vehicle' + (fleetSize === 1 ? '' : 's') + '.',
          'Records'
        );
      }
    }

    if (document.getElementById('fleetAudit').checked) {
      [0, 3, 6, 9].forEach(function (month) {
        addEvent(new Date(year, month, 10), 'Quarterly fleet reconciliation', 'Reconcile active, added, sold, and retired vehicles.', 'Fleet');
      });
    }

    if (irpMonth) {
      let preparationMonth = irpMonth - 3;
      let preparationYear = year;
      if (preparationMonth < 0) {
        preparationMonth += 12;
        preparationYear -= 1;
      }
      addEvent(new Date(preparationYear, preparationMonth, 1), 'Begin IRP renewal preparation', 'Start vehicle, mileage, and credential reconciliation.', 'IRP');
      addEvent(new Date(year, irpMonth - 1, 1), 'IRP renewal month', 'Confirm renewal completion and cab-card distribution.', 'IRP');
    }

    generated.sort(function (a, b) {
      return a.date - b.date;
    });

    placeholder.hidden = true;
    eventsBox.innerHTML = generated.map(function (event) {
      return '<div class="event">' +
        '<div class="date">' + escapeHtml(formatDate(event.date)) + '</div>' +
        '<div><div class="title">' + escapeHtml(event.title) + '</div>' +
        '<div class="note">' + escapeHtml(event.note) + '</div></div>' +
        '<div class="tag">' + escapeHtml(event.tag) + '</div>' +
        '</div>';
    }).join('');
  }

  function icsDate(date) {
    return date.getFullYear() +
      String(date.getMonth() + 1).padStart(2, '0') +
      String(date.getDate()).padStart(2, '0');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    buildCalendar();
  });

  printButton.addEventListener('click', function () {
    if (!generated.length) buildCalendar();
    window.print();
  });

  downloadButton.addEventListener('click', function () {
    if (!generated.length) buildCalendar();

    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//NewYorkHUT.com//Fleet Compliance Calendar//EN'];
    generated.forEach(function (event, index) {
      lines.push(
        'BEGIN:VEVENT',
        'UID:' + event.date.getTime() + '-' + index + '@newyorkhut.com',
        'DTSTART;VALUE=DATE:' + icsDate(event.date),
        'SUMMARY:' + event.title.replace(/,/g, '\\,'),
        'DESCRIPTION:' + event.note.replace(/,/g, '\\,'),
        'END:VEVENT'
      );
    });
    lines.push('END:VCALENDAR');

    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'newyorkhut-compliance-calendar.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  });
})();`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/assets/compliance-calendar-v33.js") {
      return new Response(JS, {
        headers: {
          "content-type": "application/javascript; charset=UTF-8",
          "cache-control": "no-store",
          "x-newyorkhut-version": VERSION
        }
      });
    }

    if (url.pathname === "/tools/compliance-calendar") {
      const response = await site.fetch(request, env, ctx);
      let html = await response.text();
      html = html.replace(/<script>\s*\(function\(\)\{[\s\S]*?<\/script>/, '<script src="/assets/compliance-calendar-v33.js"></script>');

      const headers = new Headers(response.headers);
      headers.set("content-type", "text/html; charset=UTF-8");
      headers.set("cache-control", "no-store");
      headers.set("x-newyorkhut-version", VERSION);
      return new Response(html, { status: response.status, statusText: response.statusText, headers });
    }

    if (url.pathname === "/__version" || url.pathname === "/api/version") {
      return new Response(JSON.stringify({
        application: "NewYorkHUT.com",
        version: VERSION,
        deployedAt: "2026-07-21",
        features: [
          "/tools/vin-decoder",
          "/tools/compliance-calendar",
          "/tools/fleet-compliance",
          "/fleet-toolkit",
          "/tools/compliance-assistant"
        ]
      }, null, 2), {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "cache-control": "no-store",
          "x-newyorkhut-version": VERSION
        }
      });
    }

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set("x-newyorkhut-version", VERSION);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};