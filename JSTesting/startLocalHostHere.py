import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

count = 5

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    #httpd.serve_forever()
    while(count > 0):
        httpd.handle_request() #blocking operation
        count -= 1