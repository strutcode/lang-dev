import Server from std/http

new Server
  request >> (head, body, response):
    when head.path:
      ~= "/foo":
        response << 200
        response << "Page 1"
      ~= "/bar":
        response << 200
        response << "Page 2"
      else:
        response << 404
        response << "Not Found"