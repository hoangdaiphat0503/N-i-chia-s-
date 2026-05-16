#!/usr/bin/env python3
# Simple HTTP Server với data persistence
# Chạy với: python simple-server.py

import http.server
import socketserver
import json
import os
import urllib.parse
from datetime import datetime
import threading
import webbrowser
import time

PORT = 8080
DB_FILE = 'survey-data.json'

class SurveyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/survey-responses':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            data = read_database()
            responses = data['survey_responses']
            responses.sort(key=lambda x: x.get('created_at', ''), reverse=True)
            
            self.wfile.write(json.dumps(responses).encode('utf-8'))
        elif self.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            data = read_database()
            health_data = {
                "status": "ok",
                "timestamp": datetime.now().isoformat(),
                "total_responses": len(data['survey_responses'])
            }
            
            self.wfile.write(json.dumps(health_data).encode('utf-8'))
        else:
            super().do_GET()
    
    def do_POST(self):
        if self.path == '/api/survey-responses':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                new_record = json.loads(post_data.decode('utf-8'))
                
                # Lưu vào database
                data = read_database()
                new_record['id'] = len(data['survey_responses']) + 1
                new_record['created_at'] = datetime.now().isoformat()
                
                data['survey_responses'].append(new_record)
                write_database(data)
                
                print(f"✅ Đã lưu phản hồi từ: {new_record.get('name', 'Unknown')}")
                
                # Response
                self.send_response(201)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                self.wfile.write(json.dumps([new_record]).encode('utf-8'))
                
            except Exception as e:
                print(f"Lỗi: {e}")
                self.send_response(500)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def read_database():
    """Đọc dữ liệu từ file JSON"""
    try:
        if os.path.exists(DB_FILE):
            with open(DB_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            initial_data = {"survey_responses": []}
            write_database(initial_data)
            return initial_data
    except Exception as e:
        print(f"Lỗi đọc database: {e}")
        return {"survey_responses": []}

def write_database(data):
    """Ghi dữ liệu vào file JSON"""
    try:
        with open(DB_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Lỗi ghi database: {e}")

def open_browser():
    """Mở browser sau khi server khởi động"""
    time.sleep(2)
    webbrowser.open(f'http://localhost:{PORT}')
    webbrowser.open(f'http://localhost:{PORT}/admin.html')

if __name__ == "__main__":
    print("🚀 Khởi động Simple Server...")
    print(f"📊 Database file: {DB_FILE}")
    print(f"🔗 Server: http://localhost:{PORT}")
    print("🌐 Pages:")
    print(f"   http://localhost:{PORT}/index.html")
    print(f"   http://localhost:{PORT}/admin.html")
    print("📡 API:")
    print(f"   POST http://localhost:{PORT}/api/survey-responses")
    print(f"   GET  http://localhost:{PORT}/api/survey-responses")
    print()
    
    # Khởi động thread để mở browser
    threading.Thread(target=open_browser, daemon=True).start()
    
    # Khởi động server
    with socketserver.TCPServer(("", PORT), SurveyHandler) as httpd:
        print(f"✅ Server đang chạy tại port {PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server đã dừng")
