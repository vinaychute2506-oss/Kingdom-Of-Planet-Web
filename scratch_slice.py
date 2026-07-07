from PIL import Image

img_path = "C:\\Users\\Takemichi\\.gemini\\antigravity\\brain\\539ab8e5-8da5-46aa-a173-5815a632507b\\media__1783446533370.png"
img = Image.open(img_path)
w, h = img.size

# Slicing from 20% to 45% height to capture the full deployment ID
img.crop((0, int(h * 0.20), w, int(h * 0.45))).save("C:\\Users\\Takemichi\\.gemini\\antigravity\\brain\\539ab8e5-8da5-46aa-a173-5815a632507b\\strip_real_id.png")
print("Real ID strip saved.")
