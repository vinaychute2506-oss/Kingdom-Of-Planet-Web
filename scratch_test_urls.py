import urllib.request
import json
import itertools

# Base characters from image:
# AKfycbwKK8KTdognCollAwOSrY-o6fxkUq0iFw1Cmc9mHRvw3lxNOis6SKX6llvY_MKapCaEmg

candidates_part1 = [
    "AKfycbw", "AKfycby", "AKfycbx", "AKfycbz"
]
candidates_part2 = [
    "KK8KTdogn"
]
candidates_part3 = [
    "CollAwOSrY", "ColIAwOSrY", "Col1AwOSrY", "ColLAwOSrY"
]
candidates_part4 = [
    "-o6fxkUq0iFw1Cmc9mHRvw3lxNOis6SKX6llvY_MKapCaEmg",
    "-o6fxkUq0iFw1Cmc9mHRvw3lxN0is6SKX6llvY_MKapCaEmg",
    "-o6fxkUq0iFw1Cmc9mHRvw3lxNOis6SKX611vY_MKapCaEmg",
    "-o6fxkUq0iFw1Cmc9mHRvw3lxNOis6SKX6l1vY_MKapCaEmg",
    "-o6fxkUq0iFw1Cmc9mHRvw3lxNOis6SKX61lvY_MKapCaEmg"
]

all_combinations = list(itertools.product(
    candidates_part1,
    candidates_part2,
    candidates_part3,
    candidates_part4
))

print(f"Total combinations to test: {len(all_combinations)}")

payload = json.dumps({
    "formType": "admission",
    "parentName": "Test",
    "childName": "Test",
    "phone": "9876543210",
    "email": "test@gmail.com",
    "grade": "Playgroup",
    "message": "Test"
}).encode('utf-8')

for p1, p2, p3, p4 in all_combinations:
    dep_id = f"{p1}{p2}{p3}{p4}"
    url = f"https://script.google.com/macros/s/{dep_id}/exec"
    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "text/plain;charset=utf-8"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=5) as response:
            status = response.status
            body = response.read().decode('utf-8')
            if "Sorry, the file you have requested does not exist" not in body and "Page not found" not in body:
                print(f"SUCCESS FOUND! URL: {url}")
                print(f"Response snippet: {body[:200]}")
                break
    except urllib.error.HTTPError as e:
        if e.code != 404:
            print(f"HTTP {e.code} for URL: {url}")
    except Exception as e:
        pass
else:
    print("Done testing all combinations, none succeeded.")
