import http.client
import json
import urllib.parse

url = "script.google.com"
path = "/macros/s/AKfycbwKK8KTdognCoIlAwOSrY-o6fxkUq0iFw1Cmc9mHRvw3lxNOis6SKX6llvY_MKapCaEmg/exec"

data = json.dumps({
    "formType": "admission",
    "parentName": "Debug Test Parent",
    "childName": "Debug Test Child",
    "phone": "1234567890",
    "email": "debug@test.com",
    "grade": "Nursery",
    "message": "Debug redirect test"
}).encode('utf-8')

print("=== Step 1: Initial POST (no redirect following) ===")
conn = http.client.HTTPSConnection(url)
conn.request("POST", path, body=data, headers={
    "Content-Type": "text/plain;charset=utf-8",
    "User-Agent": "Mozilla/5.0"
})
resp = conn.getresponse()
print(f"Status: {resp.status} {resp.reason}")
print(f"Location: {resp.getheader('Location')}")
body = resp.read().decode('utf-8')
print(f"Body: {body[:300]}")
conn.close()

# If we got a redirect, follow it manually as POST
location = resp.getheader('Location')
if location and resp.status in (301, 302, 303, 307, 308):
    print(f"\n=== Step 2: Following redirect as POST to: {location[:100]}... ===")
    parsed = urllib.parse.urlparse(location)
    conn2 = http.client.HTTPSConnection(parsed.hostname)
    conn2.request("POST", parsed.path + "?" + (parsed.query or ""), body=data, headers={
        "Content-Type": "text/plain;charset=utf-8",
        "User-Agent": "Mozilla/5.0"
    })
    resp2 = conn2.getresponse()
    print(f"Status: {resp2.status} {resp2.reason}")
    print(f"Location: {resp2.getheader('Location')}")
    body2 = resp2.read().decode('utf-8')
    print(f"Body: {body2[:500]}")
    conn2.close()
    
    # If there's another redirect
    location2 = resp2.getheader('Location')
    if location2 and resp2.status in (301, 302, 303, 307, 308):
        print(f"\n=== Step 3: Following 2nd redirect as POST to: {location2[:100]}... ===")
        parsed2 = urllib.parse.urlparse(location2)
        conn3 = http.client.HTTPSConnection(parsed2.hostname)
        conn3.request("POST", parsed2.path + "?" + (parsed2.query or ""), body=data, headers={
            "Content-Type": "text/plain;charset=utf-8",
            "User-Agent": "Mozilla/5.0"
        })
        resp3 = conn3.getresponse()
        print(f"Status: {resp3.status} {resp3.reason}")
        body3 = resp3.read().decode('utf-8')
        print(f"Body: {body3[:500]}")
        conn3.close()
