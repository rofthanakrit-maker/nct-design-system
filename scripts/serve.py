# -*- coding: utf-8 -*-
"""Static server for the demo, with caching turned off.

`python -m http.server` only sends Last-Modified, and browsers happily reuse a
cached @import - so a regenerated tokens.css keeps rendering the old palette
until a hard reload that also misses the import. Serving no-store makes the
edit -> refresh loop honest.
"""
import functools
import http.server
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.join(os.path.dirname(HERE), "web")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, fmt, *args):        # one line per request, no noise
        sys.stderr.write("  %s\n" % (fmt % args))


def main():
    handler = functools.partial(Handler, directory=WEB)
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler) as httpd:
        print("serving web/ at http://127.0.0.1:%d/demo/index.html" % PORT)
        httpd.serve_forever()


if __name__ == "__main__":
    main()
