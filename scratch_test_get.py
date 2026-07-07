import urllib.request

url = "https://script.google.com/macros/s/AKfycbwKK8KTdognCollAwOSrY-o6fxkUq0iFw1Cmc9mHRvw3lxNOis6SKX6llvY_MKapCaEmg/exec"

print("Testing GET request...")
try:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0"}
    )
    with urllib.request.urlopen(req, timeout=10) as response:
        print("Status Code:", response.status)
        print("Final URL:", response.url)
        body = response.read().decode('utf-8')
        print("Body snippet:\n", body[:500])
except urllib.error.HTTPError as e:
    print("HTTPError Status:", e.code)
    print("HTTPError Headers:\n", e.headers)
    try:
        print("HTTPError Body:\n", e.read().decode('utf-8')[:500])
    except:
        pass
except Exception as e:
    print("Error:", e)
